package com.ayurdhara.core.network.model

import kotlinx.serialization.SerialName
import kotlinx.serialization.Serializable
import kotlinx.serialization.json.JsonElement

@Serializable
data class AddressDto(
    val id: String = "",
    @SerialName("user_id") val userId: String = "",
    @SerialName("type") val type: String = "home",
    val name: String = "",
    val phone: String = "",
    val pincode: String = "",
    val state: String = "",
    val city: String = "",
    @SerialName("line1") val line1: String = "",
    val landmark: String? = null,
    @SerialName("is_default") val isDefault: Boolean = false,
    @SerialName("created_at") val createdAt: String? = null
)

@Serializable
data class ProfileDto(
    val id: String = "",
    @SerialName("full_name") val fullName: String? = null,
    val mobile: String? = null,
    val role: String = "customer",
    @SerialName("is_gold_member") val isGoldMember: Boolean = false,
    @SerialName("gold_membership_status") val goldMembershipStatus: String = "inactive",
    @SerialName("created_at") val createdAt: String? = null,
    @SerialName("updated_at") val updatedAt: String? = null
)

@Serializable
data class OrderDto(
    val id: String = "",
    @SerialName("display_id") val displayId: String = "",
    @SerialName("user_id") val userId: String? = null,
    val subtotal: Double = 0.0,
    val discount: Double = 0.0,
    @SerialName("shipping_fee") val shippingFee: Double = 0.0,
    val total: Double = 0.0,
    val status: String = "PENDING_PAYMENT",
    @SerialName("customer_name") val customerName: String? = null,
    @SerialName("customer_phone") val customerPhone: String? = null,
    @SerialName("customer_email") val customerEmail: String? = null,
    @SerialName("shipping_address_snapshot") val shippingAddressSnapshot: JsonElement? = null,
    @SerialName("created_at") val createdAt: String? = null,
    @SerialName("order_items") val items: List<OrderItemDto> = emptyList()
)

@Serializable
data class OrderItemDto(
    val id: String = "",
    @SerialName("order_id") val orderId: String = "",
    @SerialName("product_id") val productId: String? = null,
    val quantity: Int = 1,
    @SerialName("unit_price") val unitPrice: Double = 0.0,
    @SerialName("product_name_snapshot") val productNameSnapshot: String = "",
    @SerialName("image_snapshot") val imageSnapshot: String? = null,
    @SerialName("variant_snapshot") val variantSnapshot: String = ""
)

@Serializable
data class CreateOrderItemPayload(
    @SerialName("order_id") val orderId: String,
    @SerialName("product_id") val productId: String?,
    @SerialName("product_name_snapshot") val productNameSnapshot: String,
    @SerialName("variant_snapshot") val variantSnapshot: String,
    @SerialName("image_snapshot") val imageSnapshot: String?,
    val quantity: Int,
    @SerialName("unit_price") val unitPrice: Double,
    @SerialName("original_unit_price") val originalUnitPrice: Double,
    @SerialName("line_total") val lineTotal: Double
)
