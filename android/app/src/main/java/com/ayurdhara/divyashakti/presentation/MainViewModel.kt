package com.ayurdhara.divyashakti.presentation

import androidx.lifecycle.ViewModel
import androidx.lifecycle.viewModelScope
import com.ayurdhara.core.datastore.SessionManager
import com.ayurdhara.divyashakti.navigation.Routes
import com.ayurdhara.feature.profile.data.SupabaseProfileRepository
import dagger.hilt.android.lifecycle.HiltViewModel
import io.github.jan.supabase.SupabaseClient
import io.github.jan.supabase.gotrue.auth
import kotlinx.coroutines.flow.MutableStateFlow
import kotlinx.coroutines.flow.StateFlow
import kotlinx.coroutines.flow.first
import kotlinx.coroutines.flow.stateIn
import kotlinx.coroutines.launch
import kotlinx.coroutines.withTimeoutOrNull
import javax.inject.Inject

@HiltViewModel
class MainViewModel @Inject constructor(
    private val networkMonitor: com.ayurdhara.core.network.monitor.NetworkMonitor,
    private val sessionManager: SessionManager,
    private val supabaseClient: SupabaseClient,
    private val profileRepository: SupabaseProfileRepository
) : ViewModel() {

    private val _startDestination = MutableStateFlow<String?>(null)
    val startDestination: StateFlow<String?> = _startDestination

    private val _userName = MutableStateFlow<String?>(null)
    val userName: StateFlow<String?> = _userName

    val networkState = networkMonitor.isOnline.stateIn(
        scope = viewModelScope,
        started = kotlinx.coroutines.flow.SharingStarted.WhileSubscribed(5_000),
        initialValue = com.ayurdhara.core.network.monitor.NetworkState.Online
    )

    init {
        // Load cached username immediately from SessionManager
        viewModelScope.launch {
            try {
                val cached = sessionManager.userName.first()
                if (!cached.isNullOrBlank()) {
                    _userName.value = cached
                }
            } catch (_: Exception) {}
        }

        // Observe profile changes in realtime
        viewModelScope.launch {
            try {
                profileRepository.getProfileRealtimeFlow().collect { profile ->
                    if (profile != null) {
                        _userName.value = profile.fullName
                        sessionManager.setUserName(profile.fullName)
                    } else if (!profileRepository.isLoggedIn()) {
                        _userName.value = null
                        sessionManager.setUserName(null)
                    }
                }
            } catch (_: Exception) {}
        }
        viewModelScope.launch {
            try {
                withTimeoutOrNull(2000L) {
                    val onboardingCompleted = try {
                        sessionManager.isOnboardingCompleted.first()
                    } catch (_: Exception) {
                        false
                    }

                    if (!onboardingCompleted) {
                        _startDestination.value = Routes.ONBOARDING
                    } else {
                        _startDestination.value = Routes.MAIN_GRAPH
                    }
                }
            } catch (_: Exception) {
                // Silently fallback on any error
            } finally {
                if (_startDestination.value == null) {
                    _startDestination.value = Routes.MAIN_GRAPH
                }
            }
        }
    }
}