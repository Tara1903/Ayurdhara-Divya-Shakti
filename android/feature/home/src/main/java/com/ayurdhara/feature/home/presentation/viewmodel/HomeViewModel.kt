package com.ayurdhara.feature.home.presentation.viewmodel

import androidx.lifecycle.ViewModel
import androidx.lifecycle.viewModelScope
import com.ayurdhara.core.common.result.AppResult
import com.ayurdhara.core.common.result.UiState
import com.ayurdhara.feature.home.domain.HomeData
import com.ayurdhara.feature.home.domain.HomeRepository
import dagger.hilt.android.lifecycle.HiltViewModel
import kotlinx.coroutines.flow.MutableStateFlow
import kotlinx.coroutines.flow.StateFlow
import kotlinx.coroutines.launch
import javax.inject.Inject

@HiltViewModel
class HomeViewModel @Inject constructor(
    private val homeRepository: HomeRepository
) : ViewModel() {

    private val _uiState = MutableStateFlow<UiState<HomeData>>(UiState.Loading)
    val uiState: StateFlow<UiState<HomeData>> = _uiState

    init {
        fetchHomeData()
    }

    fun fetchHomeData() {
        viewModelScope.launch {
            _uiState.value = UiState.Loading
            when (val result = homeRepository.getHomeData()) {
                is AppResult.Success -> _uiState.value = UiState.Success(result.data)
                is AppResult.Error -> _uiState.value = UiState.Error(result.message ?: "Failed to fetch data")
                is AppResult.Loading -> _uiState.value = UiState.Loading
            }
        }
    }
}