package com.ayurdhara.feature.profile.data

import com.ayurdhara.core.network.model.ProfileDto
import io.github.jan.supabase.SupabaseClient
import io.github.jan.supabase.gotrue.auth
import io.github.jan.supabase.postgrest.postgrest
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.withContext
import kotlinx.serialization.json.buildJsonObject
import kotlinx.serialization.json.put
import javax.inject.Inject
import javax.inject.Singleton

data class UserProfile(
    val id: String,
    val fullName: String,
    val email: String,
    val mobile: String?,
    val isGoldMember: Boolean,
    val goldMembershipStatus: String
)

@Singleton
class SupabaseProfileRepository @Inject constructor(
    private val supabase: SupabaseClient
) {
    suspend fun getCurrentProfile(): Result<UserProfile> = runCatching {
        withContext(Dispatchers.IO) {
            val user = supabase.auth.currentUserOrNull()
                ?: error("Not logged in")
            val dto = supabase.postgrest["profiles"]
                .select {
                    filter { eq("id", user.id) }
                }
                .decodeSingle<ProfileDto>()
            UserProfile(
                id = dto.id,
                fullName = dto.fullName ?: "Guest",
                email = user.email ?: "",
                mobile = dto.mobile,
                isGoldMember = dto.isGoldMember,
                goldMembershipStatus = dto.goldMembershipStatus
            )
        }
    }

    suspend fun updateProfile(fullName: String, mobile: String?): Result<Unit> = runCatching {
        withContext(Dispatchers.IO) {
            val userId = supabase.auth.currentUserOrNull()?.id ?: error("Not logged in")
            supabase.postgrest["profiles"].update(
                buildJsonObject {
                    put("full_name", fullName)
                    mobile?.let { put("mobile", it) }
                }
            ) {
                filter { eq("id", userId) }
            }
        }
    }

    suspend fun signOut() {
        supabase.auth.signOut()
    }

    fun isLoggedIn(): Boolean = supabase.auth.currentUserOrNull() != null
}
