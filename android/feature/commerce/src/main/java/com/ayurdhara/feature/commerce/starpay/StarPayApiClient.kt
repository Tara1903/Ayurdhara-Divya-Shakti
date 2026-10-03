package com.ayurdhara.feature.commerce.starpay

import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.withContext
import kotlinx.serialization.encodeToString
import kotlinx.serialization.json.Json
import java.io.BufferedReader
import java.io.InputStreamReader
import java.io.OutputStreamWriter
import java.net.HttpURLConnection
import java.net.URL
import javax.inject.Inject
import javax.inject.Singleton

@Singleton
class StarPayApiClient @Inject constructor() {

    companion object {
        const val BASE_URL = "https://payment-gateway-web-kappa.vercel.app"
        const val INTERNAL_API_KEY = "508d0154d38e49c5a4a7e489310218e77e1be6468eac4123a532ba9e0cfac26f"
        private const val CONNECT_TIMEOUT_MS = 15000
        private const val READ_TIMEOUT_MS = 15000
    }

    private val json = Json {
        ignoreUnknownKeys = true
        coerceInputValues = true
        isLenient = true
        encodeDefaults = true
        explicitNulls = false
    }

    suspend fun createOrder(request: CreateOrderRequest): Result<CreateOrderResponse> = withContext(Dispatchers.IO) {
        try {
            val url = URL("$BASE_URL/api/orders")
            val conn = (url.openConnection() as HttpURLConnection).apply {
                requestMethod = "POST"
                connectTimeout = CONNECT_TIMEOUT_MS
                readTimeout = READ_TIMEOUT_MS
                doOutput = true
                setRequestProperty("Content-Type", "application/json")
                setRequestProperty("Accept", "application/json")
                setRequestProperty("X-API-Key", INTERNAL_API_KEY)
            }

            val payload = json.encodeToString(request)
            OutputStreamWriter(conn.outputStream, "UTF-8").use { it.write(payload) }

            val responseCode = conn.responseCode
            val stream = if (responseCode in 200..299) conn.inputStream else conn.errorStream
            val responseBody = BufferedReader(InputStreamReader(stream, "UTF-8")).use { it.readText() }

            if (responseCode in 200..299) {
                val parsed = json.decodeFromString<StarPayApiResponse<CreateOrderResponse>>(responseBody)
                if (parsed.success && parsed.data != null) {
                    Result.success(parsed.data)
                } else {
                    Result.failure(Exception(parsed.error?.message ?: "Order creation failed"))
                }
            } else {
                Result.failure(Exception("HTTP $responseCode: $responseBody"))
            }
        } catch (e: Exception) {
            Result.failure(e)
        }
    }

    suspend fun getQrData(orderId: String, paymentToken: String): Result<StarPayQrData> = withContext(Dispatchers.IO) {
        try {
            val url = URL("$BASE_URL/api/orders/$orderId/qr?token=$paymentToken")
            val conn = (url.openConnection() as HttpURLConnection).apply {
                requestMethod = "GET"
                connectTimeout = CONNECT_TIMEOUT_MS
                readTimeout = READ_TIMEOUT_MS
                setRequestProperty("Accept", "application/json")
                setRequestProperty("X-Payment-Token", paymentToken)
            }

            val responseCode = conn.responseCode
            val stream = if (responseCode in 200..299) conn.inputStream else conn.errorStream
            val responseBody = BufferedReader(InputStreamReader(stream, "UTF-8")).use { it.readText() }

            if (responseCode in 200..299) {
                val parsed = json.decodeFromString<StarPayApiResponse<StarPayQrData>>(responseBody)
                if (parsed.success && parsed.data != null) {
                    Result.success(parsed.data)
                } else {
                    Result.failure(Exception(parsed.error?.message ?: "Failed to generate QR"))
                }
            } else {
                Result.failure(Exception("HTTP $responseCode: $responseBody"))
            }
        } catch (e: Exception) {
            Result.failure(e)
        }
    }

    suspend fun getOrderStatus(orderId: String, paymentToken: String): Result<StarPayOrderDetails> = withContext(Dispatchers.IO) {
        try {
            val url = URL("$BASE_URL/api/orders/$orderId?token=$paymentToken")
            val conn = (url.openConnection() as HttpURLConnection).apply {
                requestMethod = "GET"
                connectTimeout = CONNECT_TIMEOUT_MS
                readTimeout = READ_TIMEOUT_MS
                setRequestProperty("Accept", "application/json")
                setRequestProperty("X-Payment-Token", paymentToken)
            }

            val responseCode = conn.responseCode
            val stream = if (responseCode in 200..299) conn.inputStream else conn.errorStream
            val responseBody = BufferedReader(InputStreamReader(stream, "UTF-8")).use { it.readText() }

            if (responseCode in 200..299) {
                val parsed = json.decodeFromString<StarPayApiResponse<StarPayOrderDetails>>(responseBody)
                if (parsed.success && parsed.data != null) {
                    Result.success(parsed.data)
                } else {
                    Result.failure(Exception(parsed.error?.message ?: "Failed to fetch order status"))
                }
            } else {
                Result.failure(Exception("HTTP $responseCode: $responseBody"))
            }
        } catch (e: Exception) {
            Result.failure(e)
        }
    }

    suspend fun submitManualVerification(
        request: ManualVerificationRequest,
        paymentToken: String
    ): Result<ManualVerificationResponse> = withContext(Dispatchers.IO) {
        try {
            val url = URL("$BASE_URL/api/manual-verifications")
            val conn = (url.openConnection() as HttpURLConnection).apply {
                requestMethod = "POST"
                connectTimeout = CONNECT_TIMEOUT_MS
                readTimeout = READ_TIMEOUT_MS
                doOutput = true
                setRequestProperty("Content-Type", "application/json")
                setRequestProperty("Accept", "application/json")
                setRequestProperty("X-Payment-Token", paymentToken)
            }

            val payload = json.encodeToString(request)
            OutputStreamWriter(conn.outputStream, "UTF-8").use { it.write(payload) }

            val responseCode = conn.responseCode
            val stream = if (responseCode in 200..299) conn.inputStream else conn.errorStream
            val responseBody = BufferedReader(InputStreamReader(stream, "UTF-8")).use { it.readText() }

            if (responseCode in 200..299) {
                val parsed = json.decodeFromString<StarPayApiResponse<ManualVerificationResponse>>(responseBody)
                if (parsed.success && parsed.data != null) {
                    Result.success(parsed.data)
                } else {
                    Result.failure(Exception(parsed.error?.message ?: "Failed to submit verification"))
                }
            } else {
                Result.failure(Exception("HTTP $responseCode: $responseBody"))
            }
        } catch (e: Exception) {
            Result.failure(e)
        }
    }
}
