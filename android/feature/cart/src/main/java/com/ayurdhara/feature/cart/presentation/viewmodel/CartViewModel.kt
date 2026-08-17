package com.ayurdhara.feature.cart.presentation.viewmodel

import androidx.lifecycle.ViewModel
import androidx.lifecycle.viewModelScope
import com.ayurdhara.core.common.domain.model.Product
import com.ayurdhara.feature.cart.domain.CartItem
import com.ayurdhara.feature.cart.domain.CartRepository
import dagger.hilt.android.lifecycle.HiltViewModel
import kotlinx.coroutines.flow.SharingStarted
import kotlinx.coroutines.flow.StateFlow
import kotlinx.coroutines.flow.first
import kotlinx.coroutines.flow.stateIn
import kotlinx.coroutines.launch
import javax.inject.Inject

@HiltViewModel
class CartViewModel @Inject constructor(
    private val cartRepository: CartRepository
) : ViewModel() {

    val cartState: StateFlow<List<CartItem>> = cartRepository.cartItems.stateIn(
        scope = viewModelScope,
        started = SharingStarted.WhileSubscribed(5000),
        initialValue = emptyList()
    )

    fun addToCart(product: Product) {
        viewModelScope.launch {
            val currentCart = cartRepository.cartItems.first().toMutableList()
            val existingIndex = currentCart.indexOfFirst { it.product.id == product.id }
            if (existingIndex >= 0) {
                val existing = currentCart[existingIndex]
                currentCart[existingIndex] = existing.copy(quantity = existing.quantity + 1)
            } else {
                currentCart.add(CartItem(product = product, quantity = 1))
            }
            cartRepository.updateCart(currentCart)
        }
    }

    fun removeFromCart(productId: String) {
        viewModelScope.launch {
            val currentCart = cartRepository.cartItems.first().toMutableList()
            currentCart.removeAll { it.product.id == productId }
            cartRepository.updateCart(currentCart)
        }
    }

    fun updateQuantity(productId: String, quantity: Int) {
        if (quantity <= 0) {
            removeFromCart(productId)
            return
        }
        viewModelScope.launch {
            val currentCart = cartRepository.cartItems.first().toMutableList()
            val existingIndex = currentCart.indexOfFirst { it.product.id == productId }
            if (existingIndex >= 0) {
                currentCart[existingIndex] = currentCart[existingIndex].copy(quantity = quantity)
                cartRepository.updateCart(currentCart)
            }
        }
    }

    fun toggleSaveForLater(productId: String) {
        viewModelScope.launch {
            val currentCart = cartRepository.cartItems.first().toMutableList()
            val existingIndex = currentCart.indexOfFirst { it.product.id == productId }
            if (existingIndex >= 0) {
                val existing = currentCart[existingIndex]
                currentCart[existingIndex] = existing.copy(savedForLater = !existing.savedForLater)
                cartRepository.updateCart(currentCart)
            }
        }
    }
}