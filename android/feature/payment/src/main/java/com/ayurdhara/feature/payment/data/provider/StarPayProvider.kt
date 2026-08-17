package com.ayurdhara.feature.payment.data.provider

import com.ayurdhara.feature.commerce.domain.provider.PaymentProvider
import com.ayurdhara.feature.commerce.domain.provider.PaymentResult
import kotlinx.coroutines.delay

class StarPayProvider : PaymentProvider {
    // In reality, this communicates with C:\Web Apps\Payment Gateway APIs
    override suspend fun initializePayment(orderId: String, amount: Double): PaymentResult {
        // Network call to POST /api/starpay/session
        delay(500)
        return PaymentResult.Success(transactionId = "SP-\")
    }

    override suspend fun verifyPayment(paymentId: String): Boolean {
        // Typically replaced by Supabase Realtime WebSocket listener,
        // but can be used as a manual poll fallback
        delay(500)
        return true
    }
}