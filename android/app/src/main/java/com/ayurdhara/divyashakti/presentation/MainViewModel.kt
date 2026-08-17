package com.ayurdhara.divyashakti.presentation

import androidx.lifecycle.ViewModel
import androidx.lifecycle.viewModelScope
import com.ayurdhara.core.datastore.SessionManager
import com.ayurdhara.divyashakti.navigation.Routes
import dagger.hilt.android.lifecycle.HiltViewModel
import io.github.jan.supabase.SupabaseClient
import io.github.jan.supabase.gotrue.auth
import io.github.jan.supabase.gotrue.SessionStatus
import kotlinx.coroutines.flow.MutableStateFlow
import kotlinx.coroutines.flow.StateFlow
import kotlinx.coroutines.flow.stateIn
import kotlinx.coroutines.launch
import javax.inject.Inject

@HiltViewModel
class MainViewModel @Inject constructor(
    private val networkMonitor: com.ayurdhara.core.network.monitor.NetworkMonitor,
    private val sessionManager: SessionManager,
    private val supabaseClient: SupabaseClient
) : ViewModel() {

    private val _startDestination = MutableStateFlow<String?>(null)
    val startDestination: StateFlow<String?> = _startDestination

    val networkState = networkMonitor.isOnline.stateIn(
        scope = viewModelScope,
        started = kotlinx.coroutines.flow.SharingStarted.WhileSubscribed(5_000),
        initialValue = com.ayurdhara.core.network.monitor.NetworkState.Online
    )

    init {
        viewModelScope.launch {
            // First check if onboarding is completed
            sessionManager.isOnboardingCompleted.collect { completed ->
                if (!completed) {
                    _startDestination.value = Routes.ONBOARDING
                } else {
                    // Check Supabase session
                    supabaseClient.auth.sessionStatus.collect { status ->
                        when (status) {
                            is SessionStatus.Authenticated -> _startDestination.value = Routes.MAIN_GRAPH
                            is SessionStatus.NotAuthenticated -> _startDestination.value = Routes.AUTH_GRAPH
                            else -> {} // Loading/Initializing
                        }
                    }
                }
            }
        }
    }
}