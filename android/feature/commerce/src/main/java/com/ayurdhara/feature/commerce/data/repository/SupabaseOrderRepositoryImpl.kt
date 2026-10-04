package com.ayurdhara.feature.commerce.data.repository

import com.ayurdhara.feature.cart.domain.CartItem
import com.ayurdhara.feature.commerce.domain.model.*
import com.ayurdhara.feature.commerce.domain.repository.OrderRepository
import com.ayurdhara.core.network.model.CreateOrderItemPayload
import com.ayurdhara.core.network.model.OrderDto
import io.github.jan.supabase.SupabaseClient
import io.github.jan.supabase.gotrue.auth
import io.github.jan.supabase.postgrest.postgrest
import io.github.jan.supabase.realtime.PostgresAction
import io.github.jan.supabase.realtime.channel
import io.github.jan.supabase.realtime.postgresChangeFlow
import io.github.jan.supabase.realtime.realtime
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.channels.awaitClose
import kotlinx.coroutines.flow.Flow
import kotlinx.coroutines.flow.callbackFlow
import kotlinx.coroutines.flow.catch
import kotlinx.coroutines.flow.flowOn
import kotlinx.coroutines.launch
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

            val year = SimpleDateFormat("yyyy", Locale.getDefault()).format(Date())
            val orderRef = "AYD-$year-${System.currentTimeMillis().toString().takeLast(6)}"

            val addressSnapshot = buildJsonObject {
                put("name", address.fullName ?: address.name)
                put("phone", address.mobile ?: address.phone)
                put("line1", address.addressLine1 ?: address.line1)
                put("city", address.city)
                put("state", address.state)
                put("pincode", address.pincode)
                address.landmark?.let { put("landmark", it) }
                put("platform", "android")
                put("app_version", "1.0.0")
            }

            // Insert the order
            val orderPayload = buildJsonObject {
                put("order_ref", orderRef)
                put("customer_id", userId)
                put("subtotal", subtotal)
                put("item_discount", 0.0)
                put("shipping_charge", shippingFee)
                put("final_total", total)
                put("order_status", "confirmed")
                put("payment_status", "pending")
                put("payment_method", "online")
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
            if (orderItemPayloads.isNotEmpty()) {
                supabase.postgrest["order_items"].insert(orderItemPayloads)
            }

            insertedOrder.toDomain()
        }
    }

    override fun getOrderHistory(): Flow<List<Order>> = callbackFlow {
        val user = supabase.auth.currentUserOrNull()
        if (user == null) {
            trySend(emptyList())
            awaitClose {}
            return@callbackFlow
        }

        suspend fun fetchOrders(): List<Order> {
            return try {
                val dtos = supabase.postgrest["orders"]
                    .select(columns = io.github.jan.supabase.postgrest.query.Columns.raw(
                        "*, order_items(*)"
                    )) {
                        filter {
                            or {
                                eq("customer_id", user.id)
                                eq("user_id", user.id)
                            }
                        }
                        order("created_at", io.github.jan.supabase.postgrest.query.Order.DESCENDING)
                    }
                    .decodeList<OrderDto>()
                dtos.map { it.toDomain() }
            } catch (e: Exception) {
                emptyList()
            }
        }

        // Emit initial
        launch {
            trySend(fetchOrders())
        }

        // Realtime updates
        val channel = supabase.realtime.channel("public:orders_realtime_feed")
        val changeFlow = channel.postgresChangeFlow<PostgresAction>(schema = "public") {
            table = "orders"
        }

        val job = launch {
            changeFlow.collect {
                trySend(fetchOrders())
            }
        }

        launch {
            try {
                channel.subscribe()
            } catch (_: Exception) {}
        }

        awaitClose {
            job.cancel()
            launch {
                try {
                    channel.unsubscribe()
                } catch (_: Exception) {}
            }
        }
    }.catch { emit(emptyList()) }.flowOn(Dispatchers.IO)

    override suspend fun getOrderById(orderId: String): Result<Order> = runCatching {
        withContext(Dispatchers.IO) {
            val dto = supabase.postgrest["orders"]
                .select(columns = io.github.jan.supabase.postgrest.query.Columns.raw(
                    "*, order_items(*)"
                )) {
                    filter { eq("id", orderId) }
                }
                .decodeSingle<OrderDto>()
            dto.toDomain()
        }
    }

    override suspend fun repeatOrder(orderId: String): Result<Unit> = runCatching {
        // Handled via CartViewModel
    }

    private fun OrderDto.toDomain(): Order {
        val snapshot = CustomerSnapshot(
            name = customerName ?: "",
            phone = customerPhone ?: guestMobile ?: "",
            email = customerEmail ?: guestEmail ?: "",
            shippingAddress = Address(
                id = "", type = "home", name = customerName ?: "",
                phone = customerPhone ?: "", pincode = "", state = "",
                city = "", line1 = "", landmark = null, isDefault = false
            )
        )
        return Order(
            id = id,
            displayId = resolvedDisplayId,
            subtotal = subtotal,
            discount = if (itemDiscount > 0.0) itemDiscount else discount,
            shippingFee = if (shippingCharge > 0.0) shippingCharge else shippingFee,
            total = resolvedTotal,
            status = mapStringToOrderStatus(resolvedStatus),
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

    private fun mapStringToOrderStatus(statusStr: String): OrderStatus {
        return when (statusStr.lowercase()) {
            "delivered" -> OrderStatus.DELIVERED
            "shipped" -> OrderStatus.SHIPPED
            "out_for_delivery" -> OrderStatus.OUT_FOR_DELIVERY
            "processing", "packed" -> OrderStatus.PROCESSING
            "confirmed" -> OrderStatus.CONFIRMED
            "cancelled" -> OrderStatus.CANCELLED
            "refunded" -> OrderStatus.REFUNDED
            "failed" -> OrderStatus.PAYMENT_FAILED
            else -> OrderStatus.CONFIRMED
        }
    }
}
