package com.ayurdhara.feature.cart.domain

import com.ayurdhara.core.common.domain.model.Product
import kotlinx.serialization.Serializable

@Serializable
data class CartItem(
    val product: Product,
    val quantity: Int = 1,
    val savedForLater: Boolean = false
)