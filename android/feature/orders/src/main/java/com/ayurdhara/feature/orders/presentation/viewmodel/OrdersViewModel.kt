package com.ayurdhara.feature.orders.presentation.viewmodel

import androidx.lifecycle.ViewModel
import androidx.lifecycle.viewModelScope
import com.ayurdhara.feature.commerce.domain.model.Order
import com.ayurdhara.feature.commerce.domain.repository.OrderRepository
import dagger.hilt.android.lifecycle.HiltViewModel
import kotlinx.coroutines.flow.MutableStateFlow
import kotlinx.coroutines.flow.StateFlow
import kotlinx.coroutines.flow.catch
import kotlinx.coroutines.launch
import javax.inject.Inject

sealed interface OrdersUiState {
    object Loading : OrdersUiState
    data class Success(val orders: List<Order>) : OrdersUiState
    data class Error(val message: String) : OrdersUiState
}

@HiltViewModel
class OrdersViewModel @Inject constructor(
    private val orderRepository: OrderRepository
) : ViewModel() {

    private val _uiState = MutableStateFlow<OrdersUiState>(OrdersUiState.Loading)
    val uiState: StateFlow<OrdersUiState> = _uiState

    init {
        loadOrders()
    }

    fun loadOrders() {
        viewModelScope.launch {
            _uiState.value = OrdersUiState.Loading
            orderRepository.getOrderHistory()
                .catch { e -> _uiState.value = OrdersUiState.Error(e.message ?: "Failed to load orders") }
                .collect { orders -> _uiState.value = OrdersUiState.Success(orders) }
        }
    }
}
