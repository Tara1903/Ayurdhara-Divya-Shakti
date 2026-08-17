package com.ayurdhara.core.common.config

import com.ayurdhara.core.common.result.AppResult
import javax.inject.Inject
import javax.inject.Singleton

data class AppConfig(
    val maintenanceMode: Boolean = false,
    val minAppVersion: Int = 1,
    val featuredBannerUrl: String? = null
)

interface AppConfigRepository {
    suspend fun fetchConfig(): AppResult<AppConfig>
}

@Singleton
class AppConfigRepositoryImpl @Inject constructor() : AppConfigRepository {
    override suspend fun fetchConfig(): AppResult<AppConfig> {
        // Stub implementation. Can be replaced with Firebase Remote Config or Supabase
        return AppResult.Success(AppConfig())
    }
}