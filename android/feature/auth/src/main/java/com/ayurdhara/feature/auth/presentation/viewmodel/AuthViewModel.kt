package com.ayurdhara.feature.auth.presentation.viewmodel

import androidx.lifecycle.ViewModel
import androidx.lifecycle.viewModelScope
import com.ayurdhara.core.common.result.AppResult
import com.ayurdhara.feature.auth.domain.repository.AuthRepository
import dagger.hilt.android.lifecycle.HiltViewModel
import kotlinx.coroutines.flow.MutableStateFlow
import kotlinx.coroutines.flow.StateFlow
import kotlinx.coroutines.launch
import javax.inject.Inject

sealed class AuthState {
    object Idle : AuthState()
    object Loading : AuthState()
    object Success : AuthState()
    data class Error(val message: String) : AuthState()
}

@HiltViewModel
class AuthViewModel @Inject constructor(
    private val authRepository: AuthRepository
) : ViewModel() {

    val email = MutableStateFlow("")
    val password = MutableStateFlow("")
    
    private val _uiState = MutableStateFlow<AuthState>(AuthState.Idle)
    val uiState: StateFlow<AuthState> = _uiState

    fun login() {
        viewModelScope.launch {
            _uiState.value = AuthState.Loading
            when (val result = authRepository.login(email.value, password.value)) {
                is AppResult.Success -> _uiState.value = AuthState.Success
                is AppResult.Error -> _uiState.value = AuthState.Error(result.message ?: "An error occurred")
                is AppResult.Loading -> {}
            }
        }
    }
    
    fun register(name: String) {
        viewModelScope.launch {
            _uiState.value = AuthState.Loading
            when (val result = authRepository.register(name, email.value, password.value)) {
                is AppResult.Success -> _uiState.value = AuthState.Success
                is AppResult.Error -> _uiState.value = AuthState.Error(result.message ?: "An error occurred")
                is AppResult.Loading -> {}
            }
        }
    }
    
    fun resetState() {
        _uiState.value = AuthState.Idle
    }
}