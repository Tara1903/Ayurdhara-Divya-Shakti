package com.ayurdhara.feature.commerce.data.repository

import com.ayurdhara.feature.cart.domain.CartItem
import com.ayurdhara.feature.commerce.domain.model.*
import com.ayurdhara.feature.commerce.domain.repository.OrderRepository
import com.ayurdhara.core.network.model.CreateOrderItemPayload
import com.ayurdhara.core.network.model.OrderDto
import io.github.jan.supabase.SupabaseClient
import io.github.jan.supabase.gotrue.auth
import io.github.jan.supabase.postgrest.postgrest
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.flow.Flow
import kotlinx.coroutines.flow.flow
import kotlinx.coroutines.flow.flowOn
import kotlinx.coroutines.withContext
import kotlinx.serialization.json.buildJsonObject
import kotlinx.serialization.json.put
import java.text.SimpleDateFormat
import java.util.Date
import java.util.Locale
import javax.inject.Inject

class SupabaseOrderRepositoryImpl @Inject constructor(
    private val supabase: SupabaseClient
) : OrderRepository {

    override suspend fun createOrder(
        cartItems: List<Any>,
        addressId: String,
        couponCode: String?
    ): Result<Order> = runCatching {
        withContext(Dispatchers.IO) {
            val userId = supabase.auth.currentUserOrNull()?.id ?: error("Not logged in")
            val items = cartItems.filterIsInstance<CartItem>()

            // Fetch address snapshot for storage
            val address = supabase.postgrest["addresses"]
                .select { filter { eq("id", addressId) } }
                .decodeSingle<com.ayurdhara.core.network.model.AddressDto>()

            val subtotal = items.sumOf { it.product.price * it.quantity }
            val shippingFee = if (subtotal >= 999) 0.0 else 99.0
            val total = subtotal + shippingFee

            // Generate display ID like ADS-2026-000001
            val year = SimpleDateFormat("yyyy", Locale.getDefault()).format(Date())
            val displayId = "ADS-$year-${System.currentTimeMillis().toString().takeLast(6)}"

            val addressSnapshot = buildJsonObject {
                put("name", address.name)
                put("phone", address.phone)
                put("line1", address.line1)
                put("city", address.city)
                put("state", address.state)
                put("pincode", address.pincode)
                address.landmark?.let { put("landmark", it) }
            }

            // Insert the order
            val orderPayload = buildJsonObject {
                put("display_id", displayId)
                put("user_id", userId)
                put("address_id", addressId)
                put("subtotal", subtotal)
                put("discount", 0.0)
                put("shipping_fee", shippingFee)
                put("total", total)
                put("status", "CONFIRMED")
                put("shipping_address_snapshot", addressSnapshot)
            }

            val insertedOrder = supabase.postgrest["orders"]
                .insert(orderPayload)
                .decodeSingle<OrderDto>()

            // Insert order items
            val orderItemPayloads = items.map { cartItem ->
                CreateOrderItemPayload(
                    orderId = insertedOrder.id,
                    productId = cartItem.product.id,
                    productNameSnapshot = cartItem.product.title,
                    variantSnapshot = "${cartItem.product.price}",
                    imageSnapshot = cartItem.product.imageUrl,
                    quantity = cartItem.quantity,
                    unitPrice = cartItem.product.price,
                    originalUnitPrice = cartItem.product.originalPrice ?: cartItem.product.price,
                    lineTotal = cartItem.product.price * cartItem.quantity
                )
            }
            supabase.postgrest["order_items"].insert(orderItemPayloads)

            insertedOrder.toDomain()
        }
    }

    override fun getOrderHistory(): Flow<List<Order>> = flow {
        val userId = supabase.auth.currentUserOrNull()?.id ?: run {
            emit(emptyList())
            return@flow
        }
        val dtos = supabase.postgrest["orders"]
            .select(columns = io.github.jan.supabase.postgrest.query.Columns.raw(
                "id, display_id, subtotal, discount, shipping_fee, total, status, customer_name, customer_phone, customer_email, shipping_address_snapshot, created_at, order_items(id, order_id, product_id, quantity, unit_price, product_name_snapshot, image_snapshot, variant_snapshot)"
            )) {
                filter { eq("user_id", userId) }
                order("created_at", io.github.jan.supabase.postgrest.query.Order.DESCENDING)
            }
            .decodeList<OrderDto>()
        emit(dtos.map { it.toDomain() })
    }.flowOn(Dispatchers.IO)

    override suspend fun getOrderById(orderId: String): Result<Order> = runCatching {
        withContext(Dispatchers.IO) {
            val dto = supabase.postgrest["orders"]
                .select(columns = io.github.jan.supabase.postgrest.query.Columns.raw(
                    "id, display_id, subtotal, discount, shipping_fee, total, status, customer_name, customer_phone, customer_email, shipping_address_snapshot, created_at, order_items(id, order_id, product_id, quantity, unit_price, product_name_snapshot, image_snapshot, variant_snapshot)"
                )) {
                    filter { eq("id", orderId) }
                }
                .decodeSingle<OrderDto>()
            dto.toDomain()
        }
    }

    override suspend fun repeatOrder(orderId: String): Result<Unit> = runCatching {
        // For now, this is a no-op: cart manipulation happens in CartViewModel
    }

    private fun OrderDto.toDomain(): Order {
        val snapshot = CustomerSnapshot(
            name = customerName ?: "",
            phone = customerPhone ?: "",
            email = customerEmail ?: "",
            shippingAddress = Address(
                id = "", type = "home", name = customerName ?: "",
                phone = customerPhone ?: "", pincode = "", state = "",
                city = "", line1 = "", landmark = null, isDefault = false
            )
        )
        return Order(
            id = id,
            displayId = displayId,
            subtotal = subtotal,
            discount = discount,
            shippingFee = shippingFee,
            total = total,
            status = try { OrderStatus.valueOf(status) } catch (e: Exception) { OrderStatus.CONFIRMED },
            customerSnapshot = snapshot,
            items = items.map { item ->
                OrderItem(
                    productId = item.productId ?: "",
                    quantity = item.quantity,
                    unitPrice = item.unitPrice,
                    productSnapshot = ProductSnapshot(
                        name = item.productNameSnapshot,
                        image = item.imageSnapshot ?: "",
                        sku = item.variantSnapshot
                    )
                )
            }
        )
    }
}
