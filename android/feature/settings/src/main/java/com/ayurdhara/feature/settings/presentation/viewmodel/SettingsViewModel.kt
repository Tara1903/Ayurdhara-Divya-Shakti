package com.ayurdhara.feature.settings.presentation.viewmodel

import androidx.lifecycle.ViewModel
import androidx.lifecycle.viewModelScope
import com.ayurdhara.core.datastore.SessionManager
import dagger.hilt.android.lifecycle.HiltViewModel
import kotlinx.coroutines.flow.SharingStarted
import kotlinx.coroutines.flow.StateFlow
import kotlinx.coroutines.flow.stateIn
import kotlinx.coroutines.launch
import javax.inject.Inject

@HiltViewModel
class SettingsViewModel @Inject constructor(
    private val sessionManager: SessionManager
) : ViewModel() {

    val themeMode: StateFlow<String> = sessionManager.themeMode.stateIn(
        scope = viewModelScope,
        started = SharingStarted.WhileSubscribed(5_000),
        initialValue = "SYSTEM"
    )

    val notificationsEnabled: StateFlow<Boolean> = sessionManager.notificationsEnabled.stateIn(
        scope = viewModelScope,
        started = SharingStarted.WhileSubscribed(5_000),
        initialValue = true
    )

    val orderNotifsEnabled: StateFlow<Boolean> = sessionManager.orderNotifsEnabled.stateIn(
        scope = viewModelScope,
        started = SharingStarted.WhileSubscribed(5_000),
        initialValue = true
    )

    val promoNotifsEnabled: StateFlow<Boolean> = sessionManager.promoNotifsEnabled.stateIn(
        scope = viewModelScope,
        started = SharingStarted.WhileSubscribed(5_000),
        initialValue = true
    )

    val ayurvedaTipsEnabled: StateFlow<Boolean> = sessionManager.ayurvedaTipsEnabled.stateIn(
        scope = viewModelScope,
        started = SharingStarted.WhileSubscribed(5_000),
        initialValue = true
    )

    val appLanguage: StateFlow<String> = sessionManager.appLanguage.stateIn(
        scope = viewModelScope,
        started = SharingStarted.WhileSubscribed(5_000),
        initialValue = "English"
    )

    val biometricLockEnabled: StateFlow<Boolean> = sessionManager.biometricLockEnabled.stateIn(
        scope = viewModelScope,
        started = SharingStarted.WhileSubscribed(5_000),
        initialValue = false
    )

    val userName: StateFlow<String?> = sessionManager.userName.stateIn(
        scope = viewModelScope,
        started = SharingStarted.WhileSubscribed(5_000),
        initialValue = null
    )

    fun setThemeMode(mode: String) {
        viewModelScope.launch {
            sessionManager.setThemeMode(mode)
        }
    }

    fun setNotificationsEnabled(enabled: Boolean) {
        viewModelScope.launch {
            sessionManager.setNotificationsEnabled(enabled)
        }
    }

    fun setOrderNotifsEnabled(enabled: Boolean) {
        viewModelScope.launch {
            sessionManager.setOrderNotifsEnabled(enabled)
        }
    }

    fun setPromoNotifsEnabled(enabled: Boolean) {
        viewModelScope.launch {
            sessionManager.setPromoNotifsEnabled(enabled)
        }
    }

    fun setAyurvedaTipsEnabled(enabled: Boolean) {
        viewModelScope.launch {
            sessionManager.setAyurvedaTipsEnabled(enabled)
        }
    }

    fun setAppLanguage(language: String) {
        viewModelScope.launch {
            sessionManager.setAppLanguage(language)
        }
    }

    fun setBiometricLockEnabled(enabled: Boolean) {
        viewModelScope.launch {
            sessionManager.setBiometricLockEnabled(enabled)
        }
    }
}
