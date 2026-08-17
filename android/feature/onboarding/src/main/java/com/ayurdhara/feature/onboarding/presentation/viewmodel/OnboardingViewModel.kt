package com.ayurdhara.feature.onboarding.presentation.viewmodel

import androidx.lifecycle.ViewModel
import androidx.lifecycle.viewModelScope
import com.ayurdhara.core.datastore.SessionManager
import dagger.hilt.android.lifecycle.HiltViewModel
import kotlinx.coroutines.launch
import javax.inject.Inject

@HiltViewModel
class OnboardingViewModel @Inject constructor(
    private val sessionManager: SessionManager
) : ViewModel() {
    
    fun completeOnboarding() {
        viewModelScope.launch {
            sessionManager.setOnboardingCompleted(true)
        }
    }
}