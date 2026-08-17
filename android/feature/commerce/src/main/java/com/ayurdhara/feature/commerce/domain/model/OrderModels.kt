package com.ayurdhara.feature.commerce.domain.model

enum class OrderStatus {
    PENDING_PAYMENT, PAYMENT_FAILED, PAYMENT_VERIFICATION, CONFIRMED, PROCESSING, PACKED, SHIPPED, OUT_FOR_DELIVERY, DELIVERED, CANCELLED, REFUNDED
}

data class Order(
    val id: String,
    val displayId: String,
    val subtotal: Double,
    val discount: Double,
    val shippingFee: Double,
    val total: Double,
    val status: OrderStatus,
    val customerSnapshot: CustomerSnapshot,
    val items: List<OrderItem>
)

data class OrderItem(
    val productId: String,
    val quantity: Int,
    val unitPrice: Double,
    val productSnapshot: ProductSnapshot
)

data class CustomerSnapshot(
    val name: String,
    val phone: String,
    val email: String,
    val shippingAddress: Address
)

data class ProductSnapshot(
    val name: String,
    val image: String,
    val sku: String
)