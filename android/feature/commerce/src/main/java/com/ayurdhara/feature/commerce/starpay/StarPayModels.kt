package com.ayurdhara.feature.commerce.starpay

import kotlinx.serialization.Serializable

@Serializable
enum class StarPayOrderStatus {
    CREATED,
    AWAITING_PAYMENT,
    VERIFYING,
    PAID,
    PENDING_VERIFICATION,
    FAILED,
    REFUNDED
}

@Serializable
data class StarPayApiResponse<T>(
    val success: Boolean,
    val data: T? = null,
    val error: StarPayApiError? = null
)

@Serializable
data class StarPayApiError(
    val code: String? = null,
    val message: String? = null
)

@Serializable
data class CreateOrderRequest(
    val amount: Double,
    val currency: String = "INR",
    val description: String? = null,
    val businessName: String? = "Ayurdhara Divya Shakti",
    val appName: String? = "Ayurdhara Divya Shakti",
    val customerName: String? = null,
    val customerEmail: String? = null,
    val customerPhone: String? = null,
    val metadata: Map<String, String>? = null,
    val webhookUrl: String? = null
)

@Serializable
data class CreateOrderResponse(
    val orderId: String,
    val orderRef: String,
    val amount: Double,
    val reservedAmount: Double,
    val currency: String = "INR",
    val paymentToken: String,
    val upiTxnRef: String? = null,
    val expiresAt: String? = null,
    val checkoutUrl: String? = null
)

@Serializable
data class StarPayQrData(
    val qrDataUrl: String,
    val upiUrl: String,
    val upiId: String,
    val amount: Double,
    val expiresAt: String? = null
)

@Serializable
data class StarPayOrderDetails(
    val orderId: String,
    val orderRef: String,
    val amount: Double,
    val reservedAmount: Double,
    val currency: String = "INR",
    val description: String? = null,
    val status: StarPayOrderStatus,
    val upiTxnRef: String? = null,
    val expiresAt: String? = null,
    val paidAt: String? = null,
    val createdAt: String? = null,
    val returnUrl: String? = null,
    val webhookUrl: String? = null
)

@Serializable
data class ManualVerificationRequest(
    val orderId: String,
    val utrEntered: String,
    val notes: String? = null,
    val screenshotUrl: String? = null
)

@Serializable
data class ManualVerificationResponse(
    val manualVerificationId: String? = null,
    val status: String? = null
)
