package com.ayurdhara.feature.home.presentation.viewmodel

import androidx.lifecycle.ViewModel
import androidx.lifecycle.viewModelScope
import com.ayurdhara.core.common.result.AppResult
import com.ayurdhara.core.common.result.UiState
import com.ayurdhara.feature.home.domain.HomeData
import com.ayurdhara.feature.home.domain.HomeRepository
import com.ayurdhara.core.datastore.SessionManager
import dagger.hilt.android.lifecycle.HiltViewModel
import kotlinx.coroutines.flow.MutableStateFlow
import kotlinx.coroutines.flow.SharingStarted
import kotlinx.coroutines.flow.StateFlow
import kotlinx.coroutines.flow.catch
import kotlinx.coroutines.flow.stateIn
import kotlinx.coroutines.launch
import javax.inject.Inject

@HiltViewModel
class HomeViewModel @Inject constructor(
    private val homeRepository: HomeRepository,
    private val sessionManager: SessionManager
) : ViewModel() {

    private val _uiState = MutableStateFlow<UiState<HomeData>>(UiState.Loading)
    val uiState: StateFlow<UiState<HomeData>> = _uiState

    val deliveryPincode: StateFlow<String?> = sessionManager.deliveryPincode.stateIn(
        scope = viewModelScope,
        started = SharingStarted.WhileSubscribed(5_000),
        initialValue = null
    )

    fun setDeliveryPincode(pincode: String) {
        viewModelScope.launch {
            sessionManager.setDeliveryPincode(pincode.trim().take(6))
        }
    }

    init {
        listenToHomeDataRealtime()
    }

    fun listenToHomeDataRealtime() {
        viewModelScope.launch {
            _uiState.value = UiState.Loading
            
            // Immediate fast fetch so data shows up instantly
            fetchHomeData()

            // Collect real-time flow for live updates
            homeRepository.getHomeDataRealtimeFlow()
                .catch {
                    // Failures in realtime channel do not interrupt already loaded data
                }
                .collect { data ->
                    if (data.featuredProducts.isNotEmpty() || data.categories.isNotEmpty()) {
                        _uiState.value = UiState.Success(data)
                    }
                }
        }
    }

    fun fetchHomeData() {
        viewModelScope.launch {
            when (val result = homeRepository.getHomeData()) {
                is AppResult.Success -> _uiState.value = UiState.Success(result.data)
                is AppResult.Error -> _uiState.value = UiState.Error(result.message ?: "Failed to fetch data")
                is AppResult.Loading -> _uiState.value = UiState.Loading
            }
        }
    }
}