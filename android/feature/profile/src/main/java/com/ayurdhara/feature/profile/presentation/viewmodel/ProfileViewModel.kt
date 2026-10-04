package com.ayurdhara.feature.profile.presentation.viewmodel

import androidx.lifecycle.ViewModel
import androidx.lifecycle.viewModelScope
import com.ayurdhara.feature.profile.data.SupabaseProfileRepository
import com.ayurdhara.feature.profile.data.UserProfile
import dagger.hilt.android.lifecycle.HiltViewModel
import kotlinx.coroutines.flow.MutableStateFlow
import kotlinx.coroutines.flow.StateFlow
import kotlinx.coroutines.flow.catch
import kotlinx.coroutines.launch
import javax.inject.Inject

sealed interface ProfileUiState {
    object Loading : ProfileUiState
    data class Success(val profile: UserProfile) : ProfileUiState
    object LoggedOut : ProfileUiState
    data class Error(val message: String) : ProfileUiState
}

@HiltViewModel
class ProfileViewModel @Inject constructor(
    private val profileRepository: SupabaseProfileRepository
) : ViewModel() {

    private val _uiState = MutableStateFlow<ProfileUiState>(ProfileUiState.Loading)
    val uiState: StateFlow<ProfileUiState> = _uiState

    init {
        listenToProfileRealtime()
    }

    fun listenToProfileRealtime() {
        if (!profileRepository.isLoggedIn()) {
            _uiState.value = ProfileUiState.LoggedOut
            return
        }
        viewModelScope.launch {
            _uiState.value = ProfileUiState.Loading
            profileRepository.getProfileRealtimeFlow()
                .catch { loadProfile() }
                .collect { profile ->
                    if (profile != null) {
                        _uiState.value = ProfileUiState.Success(profile)
                    } else if (profileRepository.isLoggedIn()) {
                        loadProfile()
                    } else {
                        _uiState.value = ProfileUiState.LoggedOut
                    }
                }
        }
    }

    fun loadProfile() {
        if (!profileRepository.isLoggedIn()) {
            _uiState.value = ProfileUiState.LoggedOut
            return
        }
        viewModelScope.launch {
            profileRepository.getCurrentProfile()
                .onSuccess { _uiState.value = ProfileUiState.Success(it) }
                .onFailure { _uiState.value = ProfileUiState.Error(it.message ?: "Failed to load profile") }
        }
    }

    fun signOut() {
        viewModelScope.launch {
            profileRepository.signOut()
            _uiState.value = ProfileUiState.LoggedOut
        }
    }

    fun updateProfile(name: String, mobile: String?) {
        viewModelScope.launch {
            profileRepository.updateProfile(name, mobile)
                .onSuccess { loadProfile() }
                .onFailure { _uiState.value = ProfileUiState.Error(it.message ?: "Update failed") }
        }
    }
}
