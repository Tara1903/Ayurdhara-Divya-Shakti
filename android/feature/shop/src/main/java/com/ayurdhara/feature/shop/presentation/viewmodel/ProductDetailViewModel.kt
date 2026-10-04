package com.ayurdhara.feature.shop.presentation.viewmodel

import androidx.lifecycle.SavedStateHandle
import androidx.lifecycle.ViewModel
import androidx.lifecycle.viewModelScope
import com.ayurdhara.core.common.domain.model.Product
import com.ayurdhara.core.common.domain.repository.SupabaseAyurdharaRepositoryImpl
import com.ayurdhara.core.common.result.AppResult
import com.ayurdhara.core.common.result.UiState
import dagger.hilt.android.lifecycle.HiltViewModel
import kotlinx.coroutines.flow.MutableStateFlow
import kotlinx.coroutines.flow.StateFlow
import kotlinx.coroutines.launch
import javax.inject.Inject

/** Loads a single product by the `slug` navigation argument. */
@HiltViewModel
class ProductDetailViewModel @Inject constructor(
    savedStateHandle: SavedStateHandle,
    private val ayurdharaRepository: SupabaseAyurdharaRepositoryImpl
) : ViewModel() {

    private val slug: String = savedStateHandle.get<String>("slug").orEmpty()

    private val _uiState = MutableStateFlow<UiState<Product>>(UiState.Loading)
    val uiState: StateFlow<UiState<Product>> = _uiState

    init {
        load()
    }

    fun load() {
        if (slug.isBlank()) {
            _uiState.value = UiState.Error("This product could not be found.")
            return
        }
        viewModelScope.launch {
            _uiState.value = UiState.Loading
            when (val result = ayurdharaRepository.getProductBySlug(slug)) {
                is AppResult.Success -> _uiState.value = UiState.Success(result.data)
                is AppResult.Error -> _uiState.value =
                    UiState.Error(result.message ?: "We couldn't load this product. Please try again.")
                AppResult.Loading -> _uiState.value = UiState.Loading
            }
        }
    }
}
