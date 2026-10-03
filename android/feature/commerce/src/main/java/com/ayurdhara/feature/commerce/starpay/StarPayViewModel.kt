package com.ayurdhara.feature.commerce.starpay

import androidx.lifecycle.ViewModel
import androidx.lifecycle.viewModelScope
import dagger.hilt.android.lifecycle.HiltViewModel
import kotlinx.coroutines.Job
import kotlinx.coroutines.delay
import kotlinx.coroutines.flow.MutableStateFlow
import kotlinx.coroutines.flow.StateFlow
import kotlinx.coroutines.flow.asStateFlow
import kotlinx.coroutines.flow.update
import kotlinx.coroutines.isActive
import kotlinx.coroutines.launch
import java.text.SimpleDateFormat
import java.util.Date
import java.util.Locale
import java.util.TimeZone
import javax.inject.Inject

sealed interface StarPayUiState {
    data class Loading(val message: String = "Initializing payment...") : StarPayUiState
    data class AwaitingPayment(
        val order: StarPayOrderDetails,
        val qrData: StarPayQrData? = null,
        val timeRemainingSeconds: Long = 1800L,
        val utrInput: String = "",
        val utrNotes: String = "",
        val showManualSheet: Boolean = false,
        val utrError: String? = null,
        val isSubmittingUtr: Boolean = false,
        val snackbarMessage: String? = null
    ) : StarPayUiState
    data class Verifying(
        val order: StarPayOrderDetails,
        val currentStep: Int = 1
    ) : StarPayUiState
    data class PendingVerification(
        val order: StarPayOrderDetails
    ) : StarPayUiState
    data class Paid(
        val order: StarPayOrderDetails
    ) : StarPayUiState
    data class Failed(
        val order: StarPayOrderDetails? = null,
        val errorMessage: String
    ) : StarPayUiState
}

@HiltViewModel
class StarPayViewModel @Inject constructor(
    private val apiClient: StarPayApiClient
) : ViewModel() {

    private val _uiState = MutableStateFlow<StarPayUiState>(StarPayUiState.Loading())
    val uiState: StateFlow<StarPayUiState> = _uiState.asStateFlow()

    private var currentOrderId: String? = null
    private var currentPaymentToken: String? = null
    private var pollingJob: Job? = null
    private var timerJob: Job? = null

    fun initializePayment(
        amount: Double,
        orderRef: String? = null,
        description: String? = null,
        customerName: String? = null,
        customerEmail: String? = null,
        customerPhone: String? = null,
        metadata: Map<String, String>? = null
    ) {
        viewModelScope.launch {
            _uiState.value = StarPayUiState.Loading("Reserving unique UPI amount...")
            val req = CreateOrderRequest(
                amount = amount,
                currency = "INR",
                description = description ?: "Order $orderRef",
                customerName = customerName,
                customerEmail = customerEmail,
                customerPhone = customerPhone,
                metadata = metadata
            )

            apiClient.createOrder(req).fold(
                onSuccess = { created ->
                    currentOrderId = created.orderId
                    currentPaymentToken = created.paymentToken
                    loadOrderAndQr(created.orderId, created.paymentToken)
                },
                onFailure = { error ->
                    _uiState.value = StarPayUiState.Failed(
                        errorMessage = error.message ?: "Failed to initiate StarPay transaction"
                    )
                }
            )
        }
    }

    fun loadExistingPayment(orderId: String, paymentToken: String) {
        currentOrderId = orderId
        currentPaymentToken = paymentToken
        viewModelScope.launch {
            _uiState.value = StarPayUiState.Loading("Fetching payment details...")
            loadOrderAndQr(orderId, paymentToken)
        }
    }

    private suspend fun loadOrderAndQr(orderId: String, paymentToken: String) {
        val orderResult = apiClient.getOrderStatus(orderId, paymentToken)
        val qrResult = apiClient.getQrData(orderId, paymentToken)

        if (orderResult.isSuccess) {
            val order = orderResult.getOrThrow()
            handleOrderStateTransition(order, qrResult.getOrNull())
            startPolling(orderId, paymentToken)
            startCountdownTimer(order.expiresAt)
        } else {
            _uiState.value = StarPayUiState.Failed(
                errorMessage = orderResult.exceptionOrNull()?.message ?: "Order not found or expired"
            )
        }
    }

    fun refreshOnResume() {
        val orderId = currentOrderId ?: return
        val token = currentPaymentToken ?: return
        viewModelScope.launch {
            val result = apiClient.getOrderStatus(orderId, token)
            result.onSuccess { updated ->
                handleOrderStateTransition(updated)
            }
        }
    }

    private fun startPolling(orderId: String, paymentToken: String) {
        pollingJob?.cancel()
        pollingJob = viewModelScope.launch {
            while (isActive) {
                delay(3000)
                val result = apiClient.getOrderStatus(orderId, paymentToken)
                result.onSuccess { updated ->
                    handleOrderStateTransition(updated)
                    if (updated.status == StarPayOrderStatus.PAID || updated.status == StarPayOrderStatus.FAILED) {
                        pollingJob?.cancel()
                        timerJob?.cancel()
                    }
                }
            }
        }
    }

    private fun startCountdownTimer(expiresAtIso: String?) {
        timerJob?.cancel()
        if (expiresAtIso == null) return

        val targetTimeMs = parseIsoDate(expiresAtIso)
        if (targetTimeMs <= 0) return

        timerJob = viewModelScope.launch {
            while (isActive) {
                val now = System.currentTimeMillis()
                val remainingSeconds = ((targetTimeMs - now) / 1000).coerceAtLeast(0)

                _uiState.update { current ->
                    if (current is StarPayUiState.AwaitingPayment) {
                        current.copy(timeRemainingSeconds = remainingSeconds)
                    } else {
                        current
                    }
                }

                if (remainingSeconds <= 0) {
                    _uiState.update { current ->
                        when (current) {
                            is StarPayUiState.AwaitingPayment -> StarPayUiState.Failed(
                                order = current.order,
                                errorMessage = "Payment session expired. Please create a new payment."
                            )
                            else -> current
                        }
                    }
                    break
                }
                delay(1000)
            }
        }
    }

    private fun handleOrderStateTransition(order: StarPayOrderDetails, qrData: StarPayQrData? = null) {
        when (order.status) {
            StarPayOrderStatus.CREATED, StarPayOrderStatus.AWAITING_PAYMENT -> {
                val current = _uiState.value
                val existingQr = if (current is StarPayUiState.AwaitingPayment) current.qrData else qrData
                val remainingSeconds = if (current is StarPayUiState.AwaitingPayment) current.timeRemainingSeconds else calculateRemaining(order.expiresAt)
                _uiState.value = StarPayUiState.AwaitingPayment(
                    order = order,
                    qrData = existingQr ?: qrData,
                    timeRemainingSeconds = remainingSeconds
                )
            }
            StarPayOrderStatus.VERIFYING -> {
                _uiState.value = StarPayUiState.Verifying(order = order, currentStep = 2)
            }
            StarPayOrderStatus.PENDING_VERIFICATION -> {
                _uiState.value = StarPayUiState.PendingVerification(order = order)
            }
            StarPayOrderStatus.PAID -> {
                _uiState.value = StarPayUiState.Paid(order = order)
            }
            StarPayOrderStatus.FAILED, StarPayOrderStatus.REFUNDED -> {
                _uiState.value = StarPayUiState.Failed(
                    order = order,
                    errorMessage = "This payment session has expired or failed."
                )
            }
        }
    }

    fun setManualSheetVisible(visible: Boolean) {
        _uiState.update { current ->
            if (current is StarPayUiState.AwaitingPayment) {
                current.copy(showManualSheet = visible, utrError = null)
            } else {
                current
            }
        }
    }

    fun onUtrChanged(input: String) {
        val digitsOnly = input.filter { it.isDigit() }.take(12)
        _uiState.update { current ->
            if (current is StarPayUiState.AwaitingPayment) {
                current.copy(utrInput = digitsOnly, utrError = null)
            } else {
                current
            }
        }
    }

    fun onUtrNotesChanged(notes: String) {
        _uiState.update { current ->
            if (current is StarPayUiState.AwaitingPayment) {
                current.copy(utrNotes = notes)
            } else {
                current
            }
        }
    }

    fun submitManualUtr() {
        val currentState = _uiState.value as? StarPayUiState.AwaitingPayment ?: return
        val utr = currentState.utrInput.trim()
        val orderId = currentOrderId ?: return
        val token = currentPaymentToken ?: return

        if (utr.length != 12) {
            _uiState.update { currentState.copy(utrError = "UTR must be exactly 12 digits") }
            return
        }

        _uiState.update { currentState.copy(isSubmittingUtr = true, utrError = null) }

        viewModelScope.launch {
            val req = ManualVerificationRequest(
                orderId = orderId,
                utrEntered = utr,
                notes = currentState.utrNotes.ifBlank { null }
            )

            val result = apiClient.submitManualVerification(req, token)
            result.fold(
                onSuccess = {
                    _uiState.value = StarPayUiState.PendingVerification(currentState.order)
                },
                onFailure = { error ->
                    _uiState.update {
                        currentState.copy(
                            isSubmittingUtr = false,
                            utrError = error.message ?: "Failed to submit UTR verification"
                        )
                    }
                }
            )
        }
    }

    fun showSnackbar(message: String) {
        _uiState.update { current ->
            if (current is StarPayUiState.AwaitingPayment) {
                current.copy(snackbarMessage = message)
            } else {
                current
            }
        }
    }

    fun clearSnackbar() {
        _uiState.update { current ->
            if (current is StarPayUiState.AwaitingPayment) {
                current.copy(snackbarMessage = null)
            } else {
                current
            }
        }
    }

    private fun calculateRemaining(expiresAtIso: String?): Long {
        if (expiresAtIso == null) return 1800L
        val target = parseIsoDate(expiresAtIso)
        return if (target > 0) ((target - System.currentTimeMillis()) / 1000).coerceAtLeast(0) else 1800L
    }

    private fun parseIsoDate(isoString: String): Long {
        return try {
            val format = SimpleDateFormat("yyyy-MM-dd'T'HH:mm:ss.SSS'Z'", Locale.US).apply {
                timeZone = TimeZone.getTimeZone("UTC")
            }
            format.parse(isoString)?.time ?: 0L
        } catch (e: Exception) {
            try {
                val fallbackFormat = SimpleDateFormat("yyyy-MM-dd'T'HH:mm:ss'Z'", Locale.US).apply {
                    timeZone = TimeZone.getTimeZone("UTC")
                }
                fallbackFormat.parse(isoString)?.time ?: 0L
            } catch (e2: Exception) {
                0L
            }
        }
    }

    override fun onCleared() {
        super.onCleared()
        pollingJob?.cancel()
        timerJob?.cancel()
    }
}
