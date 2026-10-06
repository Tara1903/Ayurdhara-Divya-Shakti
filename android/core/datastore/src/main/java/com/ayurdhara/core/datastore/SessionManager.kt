package com.ayurdhara.core.datastore

import android.content.Context
import androidx.datastore.preferences.core.booleanPreferencesKey
import androidx.datastore.preferences.core.stringPreferencesKey
import androidx.datastore.preferences.core.edit
import androidx.datastore.preferences.core.emptyPreferences
import androidx.datastore.preferences.preferencesDataStore
import kotlinx.coroutines.flow.Flow
import kotlinx.coroutines.flow.catch
import kotlinx.coroutines.flow.map
import java.io.IOException
import javax.inject.Inject
import javax.inject.Singleton

private val Context.dataStore by preferencesDataStore("settings")

@Singleton
class SessionManager @Inject constructor(
    private val context: Context
) {
    private val ONBOARDING_COMPLETED = booleanPreferencesKey("onboarding_completed")
    private val USER_NAME = stringPreferencesKey("user_name")
    private val THEME_MODE = stringPreferencesKey("theme_mode") // "SYSTEM", "LIGHT", "DARK"
    private val NOTIFS_ENABLED = booleanPreferencesKey("notifs_enabled")
    private val ORDER_NOTIFS_ENABLED = booleanPreferencesKey("order_notifs_enabled")
    private val PROMO_NOTIFS_ENABLED = booleanPreferencesKey("promo_notifs_enabled")
    private val AYURVEDA_TIPS_ENABLED = booleanPreferencesKey("ayurveda_tips_enabled")
    private val APP_LANGUAGE = stringPreferencesKey("app_language") // "English", "हिन्दी"
    private val BIOMETRIC_LOCK = booleanPreferencesKey("biometric_lock")
    private val USER_PHONE = stringPreferencesKey("user_phone")
    private val USER_ADDRESS = stringPreferencesKey("user_address")
    private val USER_CITY = stringPreferencesKey("user_city")
    private val DELIVERY_PINCODE = stringPreferencesKey("delivery_pincode")

    val isOnboardingCompleted: Flow<Boolean> = context.dataStore.data
        .catch { exception ->
            if (exception is IOException) emit(emptyPreferences()) else throw exception
        }
        .map { preferences -> preferences[ONBOARDING_COMPLETED] ?: false }

    val userName: Flow<String?> = context.dataStore.data
        .catch { exception ->
            if (exception is IOException) emit(emptyPreferences()) else throw exception
        }
        .map { preferences -> preferences[USER_NAME] }

    val themeMode: Flow<String> = context.dataStore.data
        .catch { exception ->
            if (exception is IOException) emit(emptyPreferences()) else throw exception
        }
        .map { preferences -> preferences[THEME_MODE] ?: "SYSTEM" }

    val notificationsEnabled: Flow<Boolean> = context.dataStore.data
        .catch { exception ->
            if (exception is IOException) emit(emptyPreferences()) else throw exception
        }
        .map { preferences -> preferences[NOTIFS_ENABLED] ?: true }

    val orderNotifsEnabled: Flow<Boolean> = context.dataStore.data
        .catch { exception ->
            if (exception is IOException) emit(emptyPreferences()) else throw exception
        }
        .map { preferences -> preferences[ORDER_NOTIFS_ENABLED] ?: true }

    val promoNotifsEnabled: Flow<Boolean> = context.dataStore.data
        .catch { exception ->
            if (exception is IOException) emit(emptyPreferences()) else throw exception
        }
        .map { preferences -> preferences[PROMO_NOTIFS_ENABLED] ?: true }

    val ayurvedaTipsEnabled: Flow<Boolean> = context.dataStore.data
        .catch { exception ->
            if (exception is IOException) emit(emptyPreferences()) else throw exception
        }
        .map { preferences -> preferences[AYURVEDA_TIPS_ENABLED] ?: true }

    val appLanguage: Flow<String> = context.dataStore.data
        .catch { exception ->
            if (exception is IOException) emit(emptyPreferences()) else throw exception
        }
        .map { preferences -> preferences[APP_LANGUAGE] ?: "English" }

    val biometricLockEnabled: Flow<Boolean> = context.dataStore.data
        .catch { exception ->
            if (exception is IOException) emit(emptyPreferences()) else throw exception
        }
        .map { preferences -> preferences[BIOMETRIC_LOCK] ?: false }

    val userPhone: Flow<String?> = context.dataStore.data
        .catch { exception ->
            if (exception is IOException) emit(emptyPreferences()) else throw exception
        }
        .map { preferences -> preferences[USER_PHONE] }

    val userAddress: Flow<String?> = context.dataStore.data
        .catch { exception ->
            if (exception is IOException) emit(emptyPreferences()) else throw exception
        }
        .map { preferences -> preferences[USER_ADDRESS] }

    val userCity: Flow<String?> = context.dataStore.data
        .catch { exception ->
            if (exception is IOException) emit(emptyPreferences()) else throw exception
        }
        .map { preferences -> preferences[USER_CITY] }

    val deliveryPincode: Flow<String?> = context.dataStore.data
        .catch { exception ->
            if (exception is IOException) emit(emptyPreferences()) else throw exception
        }
        .map { preferences -> preferences[DELIVERY_PINCODE] }

    suspend fun setOnboardingCompleted(completed: Boolean) {
        try {
            context.dataStore.edit { preferences ->
                preferences[ONBOARDING_COMPLETED] = completed
            }
        } catch (_: Exception) {}
    }

    suspend fun setUserName(name: String?) {
        try {
            context.dataStore.edit { preferences ->
                if (name != null) {
                    preferences[USER_NAME] = name
                } else {
                    preferences.remove(USER_NAME)
                }
            }
        } catch (_: Exception) {}
    }

    suspend fun setThemeMode(mode: String) {
        try {
            context.dataStore.edit { preferences ->
                preferences[THEME_MODE] = mode
            }
        } catch (_: Exception) {}
    }

    suspend fun setNotificationsEnabled(enabled: Boolean) {
        try {
            context.dataStore.edit { preferences ->
                preferences[NOTIFS_ENABLED] = enabled
            }
        } catch (_: Exception) {}
    }

    suspend fun setOrderNotifsEnabled(enabled: Boolean) {
        try {
            context.dataStore.edit { preferences ->
                preferences[ORDER_NOTIFS_ENABLED] = enabled
            }
        } catch (_: Exception) {}
    }

    suspend fun setPromoNotifsEnabled(enabled: Boolean) {
        try {
            context.dataStore.edit { preferences ->
                preferences[PROMO_NOTIFS_ENABLED] = enabled
            }
        } catch (_: Exception) {}
    }

    suspend fun setAyurvedaTipsEnabled(enabled: Boolean) {
        try {
            context.dataStore.edit { preferences ->
                preferences[AYURVEDA_TIPS_ENABLED] = enabled
            }
        } catch (_: Exception) {}
    }

    suspend fun setAppLanguage(language: String) {
        try {
            context.dataStore.edit { preferences ->
                preferences[APP_LANGUAGE] = language
            }
        } catch (_: Exception) {}
    }

    suspend fun setBiometricLockEnabled(enabled: Boolean) {
        try {
            context.dataStore.edit { preferences ->
                preferences[BIOMETRIC_LOCK] = enabled
            }
        } catch (_: Exception) {}
    }

    suspend fun setUserPhone(phone: String?) {
        try {
            context.dataStore.edit { preferences ->
                if (phone != null) preferences[USER_PHONE] = phone else preferences.remove(USER_PHONE)
            }
        } catch (_: Exception) {}
    }

    suspend fun setUserAddress(address: String?) {
        try {
            context.dataStore.edit { preferences ->
                if (address != null) preferences[USER_ADDRESS] = address else preferences.remove(USER_ADDRESS)
            }
        } catch (_: Exception) {}
    }

    suspend fun setUserCity(city: String?) {
        try {
            context.dataStore.edit { preferences ->
                if (city != null) preferences[USER_CITY] = city else preferences.remove(USER_CITY)
            }
        } catch (_: Exception) {}
    }

    suspend fun setDeliveryPincode(pincode: String?) {
        try {
            context.dataStore.edit { preferences ->
                if (pincode != null) preferences[DELIVERY_PINCODE] = pincode else preferences.remove(DELIVERY_PINCODE)
            }
        } catch (_: Exception) {}
    }
}