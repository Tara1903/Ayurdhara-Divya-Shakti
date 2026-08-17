package com.ayurdhara.feature.commerce.domain.repository

import com.ayurdhara.feature.commerce.domain.model.Order
import kotlinx.coroutines.flow.Flow

interface OrderRepository {
    suspend fun createOrder(cartItems: List<Any>, addressId: String, couponCode: String?): Result<Order>
    fun getOrderHistory(): Flow<List<Order>>
    suspend fun getOrderById(orderId: String): Result<Order>
    suspend fun repeatOrder(orderId: String): Result<Unit>
}