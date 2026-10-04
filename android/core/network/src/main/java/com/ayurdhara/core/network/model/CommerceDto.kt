package com.ayurdhara.core.network.model

import kotlinx.serialization.SerialName
import kotlinx.serialization.Serializable
import kotlinx.serialization.json.JsonElement

@Serializable
data class AddressDto(
    val id: String = "",
    @SerialName("user_id") val userId: String = "",
    @SerialName("address_type") val addressType: String? = null,
    val type: String = "home",
    @SerialName("full_name") val fullName: String? = null,
    val name: String = "",
    val mobile: String? = null,
    val phone: String = "",
    val pincode: String = "",
    val state: String = "",
    val city: String = "",
    @SerialName("address_line_1") val addressLine1: String? = null,
    val line1: String = "",
    val landmark: String? = null,
    @SerialName("is_default") val isDefault: Boolean = false,
    @SerialName("created_at") val createdAt: String? = null
) {
    val resolvedType: String
        get() = addressType ?: type

    val resolvedName: String
        get() = fullName ?: name

    val resolvedPhone: String
        get() = mobile ?: phone

    val resolvedLine1: String
        get() = addressLine1 ?: line1
}

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
    @SerialName("order_ref") val orderRef: String? = null,
    @SerialName("display_id") val displayId: String? = null,
    @SerialName("customer_id") val customerId: String? = null,
    @SerialName("user_id") val userId: String? = null,
    val subtotal: Double = 0.0,
    @SerialName("item_discount") val itemDiscount: Double = 0.0,
    @SerialName("discount") val discount: Double = 0.0,
    @SerialName("shipping_charge") val shippingCharge: Double = 0.0,
    @SerialName("shipping_fee") val shippingFee: Double = 0.0,
    @SerialName("final_total") val finalTotal: Double = 0.0,
    @SerialName("total") val total: Double = 0.0,
    @SerialName("order_status") val orderStatus: String? = null,
    @SerialName("status") val status: String? = null,
    @SerialName("payment_status") val paymentStatus: String? = null,
    @SerialName("customer_name") val customerName: String? = null,
    @SerialName("customer_phone") val customerPhone: String? = null,
    @SerialName("customer_email") val customerEmail: String? = null,
    @SerialName("guest_email") val guestEmail: String? = null,
    @SerialName("guest_mobile") val guestMobile: String? = null,
    @SerialName("shipping_address_snapshot") val shippingAddressSnapshot: JsonElement? = null,
    @SerialName("created_at") val createdAt: String? = null,
    @SerialName("order_items") val items: List<OrderItemDto> = emptyList()
) {
    val resolvedDisplayId: String
        get() = orderRef ?: displayId ?: "AYD-ORD"

    val resolvedTotal: Double
        get() = if (finalTotal > 0.0) finalTotal else total

    val resolvedStatus: String
        get() = orderStatus ?: status ?: "CONFIRMED"
}

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
