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

    val isOnboardingCompleted: Flow<Boolean> = context.dataStore.data
        .catch { exception ->
            if (exception is IOException) {
                emit(emptyPreferences())
            } else {
                throw exception
            }
        }
        .map { preferences ->
            preferences[ONBOARDING_COMPLETED] ?: false
        }

    val userName: Flow<String?> = context.dataStore.data
        .catch { exception ->
            if (exception is IOException) {
                emit(emptyPreferences())
            } else {
                throw exception
            }
        }
        .map { preferences ->
            preferences[USER_NAME]
        }

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
}