package com.ayurdhara.feature.auth.data.repository

import com.ayurdhara.core.common.result.AppResult
import com.ayurdhara.feature.auth.domain.repository.AuthRepository
import io.github.jan.supabase.SupabaseClient
import io.github.jan.supabase.gotrue.auth
import io.github.jan.supabase.gotrue.providers.builtin.Email
import javax.inject.Inject

class SupabaseAuthRepositoryImpl @Inject constructor(
    private val supabaseClient: SupabaseClient
) : AuthRepository {
    
    override suspend fun login(email: String, pass: String): AppResult<Unit> {
        return try {
            supabaseClient.auth.signInWith(Email) {
                this.email = email
                this.password = pass
            }
            AppResult.Success(Unit)
        } catch (e: Exception) {
            AppResult.Error(e, e.message)
        }
    }

    override suspend fun register(name: String, email: String, pass: String): AppResult<Unit> {
        return try {
            supabaseClient.auth.signUpWith(Email) {
                this.email = email
                this.password = pass
            }
            AppResult.Success(Unit)
        } catch (e: Exception) {
            AppResult.Error(e, e.message)
        }
    }

    override suspend fun sendOtp(email: String): AppResult<Unit> {
        return AppResult.Success(Unit)
    }

    override suspend fun verifyOtp(otp: String): AppResult<Unit> {
        return AppResult.Success(Unit)
    }

    override suspend fun resetPassword(newPass: String): AppResult<Unit> {
        return AppResult.Success(Unit)
    }
}