package com.ayurdhara.feature.commerce.domain.provider

interface PaymentProvider {
    suspend fun initializePayment(orderId: String, amount: Double): PaymentResult
    suspend fun verifyPayment(paymentId: String): Boolean
}

sealed class PaymentResult {
    data class Success(val transactionId: String) : PaymentResult()
    data class Failure(val error: String) : PaymentResult()
    object Cancelled : PaymentResult()
}