package com.ayurdhara.feature.auth.domain.repository

import com.ayurdhara.core.common.result.AppResult

interface AuthRepository {
    suspend fun login(email: String, pass: String): AppResult<Unit>
    suspend fun register(name: String, email: String, pass: String): AppResult<Unit>
    suspend fun sendOtp(email: String): AppResult<Unit>
    suspend fun verifyOtp(otp: String): AppResult<Unit>
    suspend fun resetPassword(newPass: String): AppResult<Unit>
}