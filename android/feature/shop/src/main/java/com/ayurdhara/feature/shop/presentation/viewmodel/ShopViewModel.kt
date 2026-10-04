package com.ayurdhara.feature.shop.presentation.viewmodel

import androidx.lifecycle.ViewModel
import androidx.lifecycle.viewModelScope
import com.ayurdhara.core.common.domain.model.Category
import com.ayurdhara.core.common.domain.model.Product
import com.ayurdhara.core.common.domain.repository.SupabaseAyurdharaRepositoryImpl
import com.ayurdhara.core.common.result.AppResult
import com.ayurdhara.core.common.result.UiState
import dagger.hilt.android.lifecycle.HiltViewModel
import kotlinx.coroutines.flow.MutableStateFlow
import kotlinx.coroutines.flow.StateFlow
import kotlinx.coroutines.flow.catch
import kotlinx.coroutines.flow.combine
import kotlinx.coroutines.launch
import javax.inject.Inject

data class ShopData(
    val products: List<Product>,
    val categories: List<Category>
)

@HiltViewModel
class ShopViewModel @Inject constructor(
    private val ayurdharaRepository: SupabaseAyurdharaRepositoryImpl
) : ViewModel() {

    private val _uiState = MutableStateFlow<UiState<ShopData>>(UiState.Loading)
    val uiState: StateFlow<UiState<ShopData>> = _uiState

    init {
        listenToCatalogRealtime()
    }

    fun listenToCatalogRealtime() {
        viewModelScope.launch {
            _uiState.value = UiState.Loading

            // Immediate fast load
            fetchFallbackData()

            // Stream realtime updates
            combine(
                ayurdharaRepository.getProductsRealtimeFlow(),
                ayurdharaRepository.getCategoriesRealtimeFlow()
            ) { products, categories ->
                ShopData(products = products, categories = categories)
            }.catch {
                // Failures in realtime channel do not interrupt already loaded data
            }.collect { data ->
                if (data.products.isNotEmpty() || data.categories.isNotEmpty()) {
                    _uiState.value = UiState.Success(data)
                }
            }
        }
    }

    fun fetchFallbackData() {
        viewModelScope.launch {
            val productsResult = ayurdharaRepository.getAllProducts()
            val categoriesResult = ayurdharaRepository.getCategories()
            if (productsResult is AppResult.Success) {
                val cats = if (categoriesResult is AppResult.Success) categoriesResult.data else emptyList()
                _uiState.value = UiState.Success(ShopData(products = productsResult.data, categories = cats))
            } else if (productsResult is AppResult.Error) {
                _uiState.value = UiState.Error(productsResult.message ?: "Failed to load products")
            }
        }
    }
}
