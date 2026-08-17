package com.ayurdhara.feature.auth.data.repository

import com.ayurdhara.feature.auth.domain.repository.AuthRepository
import kotlinx.coroutines.delay
import javax.inject.Inject

import com.ayurdhara.core.common.result.AppResult

class FakeAuthRepository @Inject constructor() : AuthRepository {
    override suspend fun login(email: String, pass: String): AppResult<Unit> {
        delay(1000)
        return if (email == "test@test.com" && pass == "password") AppResult.Success(Unit)
        else AppResult.Error(Exception("Invalid credentials"))
    }
    override suspend fun register(name: String, email: String, pass: String): AppResult<Unit> {
        delay(1000)
        return AppResult.Success(Unit)
    }
    override suspend fun sendOtp(email: String): AppResult<Unit> {
        delay(1000)
        return AppResult.Success(Unit)
    }
    override suspend fun verifyOtp(otp: String): AppResult<Unit> {
        delay(1000)
        return if (otp == "1234") AppResult.Success(Unit) else AppResult.Error(Exception("Invalid OTP"))
    }
    override suspend fun resetPassword(newPass: String): AppResult<Unit> {
        delay(1000)
        return AppResult.Success(Unit)
    }
}