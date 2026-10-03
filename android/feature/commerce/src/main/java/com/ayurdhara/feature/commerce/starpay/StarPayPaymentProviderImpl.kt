package com.ayurdhara.feature.commerce.starpay

import com.ayurdhara.feature.commerce.domain.provider.PaymentProvider
import com.ayurdhara.feature.commerce.domain.provider.PaymentResult
import javax.inject.Inject
import javax.inject.Singleton

@Singleton
class StarPayPaymentProviderImpl @Inject constructor(
    private val starPayApiClient: StarPayApiClient
) : PaymentProvider {

    override suspend fun initializePayment(orderId: String, amount: Double): PaymentResult {
        val request = CreateOrderRequest(
            amount = amount,
            description = "Ayurdhara Order $orderId",
            metadata = mapOf("internalOrderId" to orderId)
        )
        val result = starPayApiClient.createOrder(request)
        return result.fold(
            onSuccess = { response ->
                PaymentResult.Success(response.orderId)
            },
            onFailure = { error ->
                PaymentResult.Failure(error.message ?: "Failed to initialize StarPay")
            }
        )
    }

    override suspend fun verifyPayment(paymentId: String): Boolean {
        // StarPay verification is handled via polling and webhook
        return true
    }
}
