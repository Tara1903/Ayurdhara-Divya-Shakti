package com.ayurdhara.feature.orders.presentation.ui

import android.widget.Toast
import androidx.compose.animation.AnimatedVisibility
import androidx.compose.animation.animateContentSize
import androidx.compose.animation.core.RepeatMode
import androidx.compose.animation.core.animateFloat
import androidx.compose.animation.core.animateFloatAsState
import androidx.compose.animation.core.infiniteRepeatable
import androidx.compose.animation.core.rememberInfiniteTransition
import androidx.compose.animation.core.tween
import androidx.compose.foundation.background
import androidx.compose.foundation.border
import androidx.compose.foundation.clickable
import androidx.compose.foundation.horizontalScroll
import androidx.compose.foundation.layout.*
import androidx.compose.foundation.lazy.LazyColumn
import androidx.compose.foundation.lazy.items
import androidx.compose.foundation.rememberScrollState
import androidx.compose.foundation.shape.CircleShape
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.Autorenew
import androidx.compose.material.icons.filled.Check
import androidx.compose.material.icons.filled.Description
import androidx.compose.material.icons.filled.ExpandMore
import androidx.compose.material.icons.filled.FlightTakeoff
import androidx.compose.material.icons.filled.Inventory2
import androidx.compose.material.icons.filled.LocalShipping
import androidx.compose.material.icons.filled.LocationOn
import androidx.compose.material.icons.filled.Map
import androidx.compose.material.icons.filled.Sensors
import androidx.compose.material.icons.filled.Spa
import androidx.compose.material.icons.filled.SupportAgent
import androidx.compose.material.icons.filled.VerifiedUser
import androidx.compose.material.icons.filled.Warning
import androidx.compose.material.icons.filled.Inventory
import androidx.compose.material3.Icon
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.runtime.getValue
import androidx.compose.runtime.mutableIntStateOf
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.saveable.rememberSaveable
import androidx.compose.runtime.setValue
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.draw.alpha
import androidx.compose.ui.draw.clip
import androidx.compose.ui.draw.rotate
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.graphics.vector.ImageVector
import androidx.compose.ui.platform.LocalContext
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.text.style.TextOverflow
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import androidx.hilt.navigation.compose.hiltViewModel
import androidx.lifecycle.compose.collectAsStateWithLifecycle
import com.ayurdhara.core.designsystem.components.AyBackBar
import com.ayurdhara.core.designsystem.components.AyChip
import com.ayurdhara.core.designsystem.components.AyDivider
import com.ayurdhara.core.designsystem.components.AyEmptyPanel
import com.ayurdhara.core.designsystem.components.AyErrorPanel
import com.ayurdhara.core.designsystem.components.AyIconButton
import com.ayurdhara.core.designsystem.components.AyImage
import com.ayurdhara.core.designsystem.components.AyLoading
import com.ayurdhara.core.designsystem.components.AyOutlineButton
import com.ayurdhara.core.designsystem.components.AyPrimaryButton
import com.ayurdhara.core.designsystem.components.ayCard
import com.ayurdhara.core.designsystem.theme.AyTheme
import com.ayurdhara.core.designsystem.theme.NotoSerif
import com.ayurdhara.core.designsystem.theme.PlusJakartaSans
import com.ayurdhara.feature.commerce.domain.model.Order
import com.ayurdhara.feature.commerce.domain.model.OrderStatus
import com.ayurdhara.feature.orders.presentation.viewmodel.OrdersUiState
import com.ayurdhara.feature.orders.presentation.viewmodel.OrdersViewModel

// ───────────────────────────── Status helpers ─────────────────────────────

private val ActiveStatuses = setOf(
    OrderStatus.PENDING_PAYMENT, OrderStatus.PAYMENT_VERIFICATION, OrderStatus.CONFIRMED,
    OrderStatus.PROCESSING, OrderStatus.PACKED, OrderStatus.SHIPPED, OrderStatus.OUT_FOR_DELIVERY
)
private val ClosedStatuses = setOf(OrderStatus.CANCELLED, OrderStatus.PAYMENT_FAILED, OrderStatus.REFUNDED)

internal fun OrderStatus.isActive() = this in ActiveStatuses

/** How many tracker steps (Placed → Packed → In Transit → Delivered) are fully completed. */
private fun OrderStatus.stepsDone(): Int = when (this) {
    OrderStatus.PENDING_PAYMENT, OrderStatus.PAYMENT_VERIFICATION, OrderStatus.PAYMENT_FAILED -> 0
    OrderStatus.CONFIRMED, OrderStatus.PROCESSING -> 1
    OrderStatus.PACKED, OrderStatus.SHIPPED, OrderStatus.OUT_FOR_DELIVERY -> 2
    OrderStatus.DELIVERED -> 4
    OrderStatus.CANCELLED, OrderStatus.REFUNDED -> 0
}

private fun OrderStatus.isPaid() = this in setOf(
    OrderStatus.CONFIRMED, OrderStatus.PROCESSING, OrderStatus.PACKED,
    OrderStatus.SHIPPED, OrderStatus.OUT_FOR_DELIVERY, OrderStatus.DELIVERED
)

@Composable
fun statusColor(status: OrderStatus): Color {
    val c = AyTheme.colors
    return when (status) {
        OrderStatus.DELIVERED -> c.success
        OrderStatus.CANCELLED, OrderStatus.PAYMENT_FAILED -> c.error
        OrderStatus.PENDING_PAYMENT, OrderStatus.PAYMENT_VERIFICATION, OrderStatus.REFUNDED -> c.warning
        else -> if (c.isDark) c.accent else c.heading
    }
}

@Composable
fun statusLabel(status: OrderStatus): String {
    return when (status) {
        OrderStatus.PENDING_PAYMENT -> "Pending Payment"
        OrderStatus.PAYMENT_FAILED -> "Payment Failed"
        OrderStatus.PAYMENT_VERIFICATION -> "Verifying Payment"
        OrderStatus.CONFIRMED -> "Confirmed"
        OrderStatus.PROCESSING -> "Processing"
        OrderStatus.PACKED -> "Packed"
        OrderStatus.SHIPPED -> "Shipped"
        OrderStatus.OUT_FOR_DELIVERY -> "Out for Delivery"
        OrderStatus.DELIVERED -> "Delivered"
        OrderStatus.CANCELLED -> "Cancelled"
        OrderStatus.REFUNDED -> "Refunded"
    }
}

// ───────────────────────────── Screen ─────────────────────────────

private enum class OrderFilter(val label: String) {
    All("All"), Active("In Progress"), Delivered("Delivered"), Closed("Cancelled");

    fun matches(s: OrderStatus) = when (this) {
        All -> true
        Active -> s.isActive()
        Delivered -> s == OrderStatus.DELIVERED
        Closed -> s in ClosedStatuses
    }
}

@Composable
fun OrderHistoryScreen(
    onBackClick: () -> Unit = {},
    onOrderClick: (String) -> Unit = {},
    viewModel: OrdersViewModel = hiltViewModel()
) {
    val uiState by viewModel.uiState.collectAsStateWithLifecycle()
    val context = LocalContext.current
    val c = AyTheme.colors

    Column(Modifier.fillMaxSize().background(c.canvas)) {
        AyBackBar(
            title = "My Orders",
            onBack = onBackClick,
            actions = {
                AyIconButton(Icons.Filled.SupportAgent, "Help", {
                    Toast.makeText(context, "Need help? Reach us from Profile → Help & Support", Toast.LENGTH_SHORT).show()
                })
            }
        )
        Box(Modifier.weight(1f).fillMaxWidth()) {
            when (val state = uiState) {
                is OrdersUiState.Loading -> AyLoading()
                is OrdersUiState.Error -> AyErrorPanel(state.message, onRetry = { viewModel.loadOrders() })
                is OrdersUiState.Success -> {
                    val orders = state.orders
                    if (orders.isEmpty()) {
                        AyEmptyPanel(
                            icon = Icons.Filled.Inventory2,
                            title = "No orders yet",
                            message = "Your sacred offerings and their live delivery journey will appear here once you place an order.",
                            actionText = "Start Shopping",
                            onAction = onBackClick
                        )
                    } else {
                        OrderList(orders, onOrderClick)
                    }
                }
            }
        }
    }
}

@Composable
private fun OrderList(orders: List<Order>, onOrderClick: (String) -> Unit) {
    val c = AyTheme.colors
    var filterIdx by rememberSaveable { mutableIntStateOf(0) }
    // null = auto (first active order open); "" = everything collapsed; otherwise the open order id
    var selection by rememberSaveable { mutableStateOf<String?>(null) }
    val filter = OrderFilter.entries[filterIdx]
    val visible = orders.filter { filter.matches(it.status) }
    val openId = selection ?: orders.firstOrNull { it.status.isActive() }?.id

    LazyColumn(
        Modifier.fillMaxSize(),
        contentPadding = PaddingValues(start = 16.dp, end = 16.dp, top = 8.dp, bottom = 24.dp),
        verticalArrangement = Arrangement.spacedBy(16.dp)
    ) {
        item {
            Column {
                Text(
                    "Your Orders", fontFamily = NotoSerif, fontWeight = FontWeight.Bold,
                    fontSize = 26.sp, color = c.heading
                )
                Text(
                    "${orders.size} ${if (orders.size == 1) "order" else "orders"} · live delivery tracking",
                    fontFamily = PlusJakartaSans, fontSize = 13.sp, color = c.textMuted
                )
                Spacer(Modifier.height(14.dp))
                Row(Modifier.horizontalScroll(rememberScrollState()), horizontalArrangement = Arrangement.spacedBy(8.dp)) {
                    OrderFilter.entries.forEachIndexed { i, f ->
                        AyChip(f.label, selected = i == filterIdx, onClick = { filterIdx = i })
                    }
                }
            }
        }
        if (visible.isEmpty()) {
            item {
                Text(
                    "No ${filter.label.lowercase()} orders.",
                    Modifier.fillMaxWidth().padding(vertical = 32.dp),
                    fontFamily = PlusJakartaSans, fontSize = 14.sp, color = c.textMuted,
                    textAlign = androidx.compose.ui.text.style.TextAlign.Center
                )
            }
        }
        items(visible, key = { it.id }) { order ->
            OrderHistoryItem(
                order = order,
                expanded = order.id == openId,
                onClick = {
                    selection = if (order.id == openId) "" else order.id
                    onOrderClick(order.id)
                }
            )
        }
        item { Spacer(Modifier.navigationBarsPadding()) }
    }
}

// ───────────────────────────── Order card ─────────────────────────────

@Composable
private fun CapsLabel(text: String, color: Color = AyTheme.colors.accent, modifier: Modifier = Modifier) {
    Text(
        text.uppercase(), modifier, fontFamily = PlusJakartaSans, fontWeight = FontWeight.Bold,
        fontSize = 10.sp, letterSpacing = 1.4.sp, color = color, maxLines = 1
    )
}

@Composable
private fun StatusPill(status: OrderStatus, pulse: Float = 1f) {
    val color = statusColor(status)
    Row(
        Modifier
            .background(color.copy(alpha = 0.14f), RoundedCornerShape(50))
            .padding(horizontal = 10.dp, vertical = 5.dp),
        verticalAlignment = Alignment.CenterVertically
    ) {
        Box(Modifier.size(7.dp).alpha(if (status.isActive()) pulse else 1f).background(color, CircleShape))
        Spacer(Modifier.width(6.dp))
        Text(
            statusLabel(status), fontFamily = PlusJakartaSans, fontWeight = FontWeight.Bold,
            fontSize = 11.sp, color = color, maxLines = 1
        )
    }
}

@Composable
fun OrderHistoryItem(
    order: Order,
    onClick: () -> Unit,
    expanded: Boolean = false
) {
    val c = AyTheme.colors
    val pulse by rememberInfiniteTransition(label = "pulse").animateFloat(
        initialValue = 0.3f, targetValue = 1f,
        animationSpec = infiniteRepeatable(tween(900), RepeatMode.Reverse), label = "pulseAlpha"
    )
    val rotation by animateFloatAsState(if (expanded) 180f else 0f, label = "chevron")
    val itemCount = order.items.sumOf { it.quantity }

    Column(
        Modifier
            .fillMaxWidth()
            .ayCard(RoundedCornerShape(20.dp))
            .animateContentSize()
    ) {
        Column(Modifier.clickable(onClick = onClick).padding(16.dp)) {
            Row(Modifier.fillMaxWidth(), verticalAlignment = Alignment.CenterVertically) {
                Column(Modifier.weight(1f)) {
                    CapsLabel("Order Reference")
                    Text(
                        order.displayId, fontFamily = PlusJakartaSans, fontWeight = FontWeight.Bold,
                        fontSize = 16.sp, color = c.heading, maxLines = 1, overflow = TextOverflow.Ellipsis
                    )
                }
                Spacer(Modifier.width(8.dp))
                StatusPill(order.status, pulse)
            }
            Spacer(Modifier.height(14.dp))
            Row(Modifier.fillMaxWidth(), verticalAlignment = Alignment.CenterVertically) {
                if (order.items.isNotEmpty()) {
                    Row(horizontalArrangement = Arrangement.spacedBy((-14).dp)) {
                        order.items.take(3).forEach { item ->
                            AyImage(
                                item.productSnapshot.image, item.productSnapshot.name,
                                Modifier.size(46.dp).clip(CircleShape).border(2.dp, c.card, CircleShape)
                            )
                        }
                    }
                    Spacer(Modifier.width(14.dp))
                }
                Column(Modifier.weight(1f)) {
                    Text(
                        "$itemCount ${if (itemCount == 1) "item" else "items"}",
                        fontFamily = PlusJakartaSans, fontWeight = FontWeight.SemiBold, fontSize = 14.sp, color = c.text
                    )
                    if (order.items.isNotEmpty()) {
                        Text(
                            order.items.take(2).joinToString(", ") { it.productSnapshot.name } +
                                if (order.items.size > 2) "…" else "",
                            fontFamily = PlusJakartaSans, fontSize = 12.sp, color = c.textMuted,
                            maxLines = 1, overflow = TextOverflow.Ellipsis
                        )
                    }
                }
                Column(horizontalAlignment = Alignment.End) {
                    Text(
                        "₹%.2f".format(order.total), fontFamily = PlusJakartaSans, fontWeight = FontWeight.ExtraBold,
                        fontSize = 17.sp, color = c.price
                    )
                    Icon(
                        Icons.Filled.ExpandMore, if (expanded) "Collapse" else "Expand",
                        Modifier.size(22.dp).rotate(rotation), tint = c.textMuted
                    )
                }
            }
        }
        AnimatedVisibility(visible = expanded) {
            Column(Modifier.padding(start = 16.dp, end = 16.dp, bottom = 16.dp)) {
                AyDivider()
                Spacer(Modifier.height(16.dp))
                OrderExpandedContent(order)
            }
        }
    }
}

// ───────────────────────────── Expanded content ─────────────────────────────

/** Live tracker + delivery partner + items + totals + Invoice/Reorder actions. Shared with [OrderDetailsScreen]. */
@Composable
internal fun OrderExpandedContent(order: Order, modifier: Modifier = Modifier) {
    val context = LocalContext.current
    Column(modifier, verticalArrangement = Arrangement.spacedBy(14.dp)) {
        OrderTracker(order)
        if (order.status == OrderStatus.SHIPPED || order.status == OrderStatus.OUT_FOR_DELIVERY) {
            DeliveryPartnerCard {
                Toast.makeText(context, "Live map tracking is coming soon", Toast.LENGTH_SHORT).show()
            }
        }
        OrderItemsCard(order)
        Column(verticalArrangement = Arrangement.spacedBy(10.dp)) {
            AyOutlineButton(
                "Download Invoice (PDF)",
                onClick = {
                    val msg = if (order.status.isPaid()) "Invoice will be available shortly" else "Invoice is generated after payment"
                    Toast.makeText(context, msg, Toast.LENGTH_SHORT).show()
                },
                modifier = Modifier.fillMaxWidth(), leadingIcon = Icons.Filled.Description, height = 48.dp
            )
            AyPrimaryButton(
                "Reorder All Items",
                onClick = { Toast.makeText(context, "Reorder is coming soon", Toast.LENGTH_SHORT).show() },
                modifier = Modifier.fillMaxWidth(), leadingIcon = Icons.Filled.Autorenew, height = 52.dp
            )
        }
    }
}

private data class TrackStep(val title: String, val subtitle: String, val icon: ImageVector)

@Composable
private fun OrderTracker(order: Order) {
    val c = AyTheme.colors
    val status = order.status
    val pulse by rememberInfiniteTransition(label = "trackerPulse").animateFloat(
        initialValue = 0.25f, targetValue = 1f,
        animationSpec = infiniteRepeatable(tween(1000), RepeatMode.Reverse), label = "trackerPulseAlpha"
    )
    val addr = order.customerSnapshot.shippingAddress
    val place = listOf(addr.city, addr.state).filter { it.isNotBlank() }.joinToString(", ")
    val done = status.stepsDone()

    val steps = listOf(
        TrackStep(
            if (done == 0) "Order Placed" else "Order Placed & Paid",
            if (done == 0) "Awaiting payment confirmation" else "Payment verified securely via StarPay UPI",
            Icons.Filled.Inventory
        ),
        TrackStep(
            "Handcrafted & Packed",
            if (status == OrderStatus.PROCESSING || status == OrderStatus.CONFIRMED) "Your batch is being prepared and consecrated"
            else "Cold-pressed, hand-blended and packed with care",
            Icons.Filled.Spa
        ),
        TrackStep(
            if (status == OrderStatus.OUT_FOR_DELIVERY) "Out for Delivery" else "In Transit / Dispatched",
            when (status) {
                OrderStatus.OUT_FOR_DELIVERY -> "Our delivery partner is on the way to you"
                OrderStatus.SHIPPED -> "Dispatched and travelling to your city"
                else -> "Handed to our delivery partner once packed"
            },
            Icons.Filled.LocalShipping
        ),
        TrackStep(
            if (status == OrderStatus.DELIVERED) "Delivered" else "Expected Delivery",
            if (place.isNotBlank()) "Delivering to ${addr.line1.takeIf { it.isNotBlank() }?.plus(", ") ?: ""}$place"
            else "To your doorstep",
            Icons.Filled.LocationOn
        )
    )

    Column(
        Modifier.fillMaxWidth().background(c.cardLow, RoundedCornerShape(16.dp))
            .then(if (c.isDark) Modifier.border(1.dp, c.border, RoundedCornerShape(16.dp)) else Modifier)
            .padding(16.dp)
    ) {
        Row(verticalAlignment = Alignment.Top) {
            Column(Modifier.weight(1f)) {
                Row(verticalAlignment = Alignment.CenterVertically) {
                    Icon(Icons.Filled.Spa, null, tint = c.accent, modifier = Modifier.size(18.dp))
                    Spacer(Modifier.width(6.dp))
                    Text("Live Order Journey", fontFamily = NotoSerif, fontWeight = FontWeight.Bold, fontSize = 17.sp, color = c.heading)
                }
                Text(
                    "Consecrated Vedic post-purchase fulfillment", fontFamily = PlusJakartaSans,
                    fontSize = 12.sp, lineHeight = 17.sp, color = c.textMuted
                )
            }
        }
        Spacer(Modifier.height(14.dp))

        if (status in ClosedStatuses) {
            val msg = when (status) {
                OrderStatus.CANCELLED -> "This order was cancelled."
                OrderStatus.PAYMENT_FAILED -> "Payment for this order did not go through."
                else -> "This order was refunded to your original payment method."
            }
            Row(
                Modifier.fillMaxWidth().background(statusColor(status).copy(alpha = 0.12f), RoundedCornerShape(12.dp)).padding(12.dp),
                verticalAlignment = Alignment.CenterVertically
            ) {
                Icon(Icons.Filled.Warning, null, tint = statusColor(status), modifier = Modifier.size(20.dp))
                Spacer(Modifier.width(10.dp))
                Text(msg, fontFamily = PlusJakartaSans, fontSize = 13.sp, color = c.text)
            }
        } else {
            steps.forEachIndexed { i, step ->
                TrackerStepRow(
                    step = step,
                    complete = i < done,
                    active = i == done,
                    isLast = i == steps.lastIndex,
                    lineDone = i < done,
                    pulse = pulse
                )
            }
        }
    }
}

@Composable
private fun TrackerStepRow(
    step: TrackStep,
    complete: Boolean,
    active: Boolean,
    isLast: Boolean,
    lineDone: Boolean,
    pulse: Float
) {
    val c = AyTheme.colors
    Row(Modifier.fillMaxWidth().height(IntrinsicSize.Min)) {
        Column(Modifier.width(30.dp).fillMaxHeight(), horizontalAlignment = Alignment.CenterHorizontally) {
            Box(Modifier.size(30.dp), contentAlignment = Alignment.Center) {
                when {
                    complete -> Box(
                        Modifier.size(28.dp).background(c.primaryBtn, CircleShape),
                        contentAlignment = Alignment.Center
                    ) { Icon(Icons.Filled.Check, null, tint = c.onPrimaryBtn, modifier = Modifier.size(16.dp)) }
                    active -> {
                        Box(Modifier.size(30.dp).alpha(pulse * 0.6f).background(c.goldFill.copy(alpha = 0.55f), CircleShape))
                        Box(
                            Modifier.size(24.dp).background(c.goldFill, CircleShape),
                            contentAlignment = Alignment.Center
                        ) { Icon(step.icon, null, tint = c.onGoldFill, modifier = Modifier.size(14.dp)) }
                    }
                    else -> Box(
                        Modifier.size(28.dp).background(c.chipHigh, CircleShape),
                        contentAlignment = Alignment.Center
                    ) { Icon(step.icon, null, tint = c.textMuted, modifier = Modifier.size(15.dp)) }
                }
            }
            if (!isLast) {
                Box(
                    Modifier.width(2.dp).weight(1f)
                        .background(if (lineDone) c.accent else c.border)
                )
            }
        }
        Spacer(Modifier.width(12.dp))
        Column(Modifier.weight(1f).padding(bottom = if (isLast) 0.dp else 18.dp)) {
            Row(Modifier.fillMaxWidth(), verticalAlignment = Alignment.CenterVertically) {
                Text(
                    step.title, Modifier.weight(1f), fontFamily = PlusJakartaSans,
                    fontWeight = if (complete || active) FontWeight.Bold else FontWeight.Medium,
                    fontSize = 14.sp, color = if (active) c.accent else if (complete) c.text else c.textSub
                )
                if (active) {
                    Text(
                        "LIVE", fontFamily = PlusJakartaSans, fontWeight = FontWeight.ExtraBold,
                        fontSize = 10.sp, letterSpacing = 1.4.sp, color = c.accent, modifier = Modifier.alpha(0.5f + pulse * 0.5f)
                    )
                }
            }
            Text(
                step.subtitle, fontFamily = PlusJakartaSans, fontSize = 12.sp, lineHeight = 17.sp,
                color = if (active) c.text else c.textMuted
            )
            if (active) {
                Spacer(Modifier.height(6.dp))
                Row(
                    Modifier.background(c.chipHigh, RoundedCornerShape(8.dp)).padding(horizontal = 8.dp, vertical = 3.dp),
                    verticalAlignment = Alignment.CenterVertically
                ) {
                    Icon(Icons.Filled.Sensors, null, tint = c.accent, modifier = Modifier.size(13.dp))
                    Spacer(Modifier.width(5.dp))
                    CapsLabel("Live status updates", c.textSub)
                }
            }
        }
    }
}

@Composable
private fun DeliveryPartnerCard(onTrack: () -> Unit) {
    val c = AyTheme.colors
    Row(
        Modifier.fillMaxWidth().background(c.cardLow, RoundedCornerShape(16.dp))
            .then(if (c.isDark) Modifier.border(1.dp, c.border, RoundedCornerShape(16.dp)) else Modifier)
            .padding(14.dp),
        verticalAlignment = Alignment.CenterVertically
    ) {
        Box(
            Modifier.size(42.dp).background(c.chipHigh, RoundedCornerShape(12.dp)),
            contentAlignment = Alignment.Center
        ) { Icon(Icons.Filled.FlightTakeoff, null, tint = c.accent, modifier = Modifier.size(24.dp)) }
        Spacer(Modifier.width(12.dp))
        Column(Modifier.weight(1f)) {
            Row(verticalAlignment = Alignment.CenterVertically) {
                Text(
                    "Delivery Partner", fontFamily = NotoSerif, fontWeight = FontWeight.Bold,
                    fontSize = 15.sp, color = c.heading, maxLines = 1
                )
                Spacer(Modifier.width(4.dp))
                Icon(Icons.Filled.VerifiedUser, null, tint = c.accent, modifier = Modifier.size(15.dp))
            }
            Text("Tracking updates sent by SMS", fontFamily = PlusJakartaSans, fontSize = 11.sp, color = c.textMuted)
        }
        Row(
            Modifier.clip(RoundedCornerShape(10.dp)).background(c.chipHigh).clickable(onClick = onTrack)
                .padding(horizontal = 10.dp, vertical = 7.dp),
            verticalAlignment = Alignment.CenterVertically
        ) {
            Icon(Icons.Filled.Map, null, tint = c.accent, modifier = Modifier.size(16.dp))
            Spacer(Modifier.width(4.dp))
            Text("Track on Map", fontFamily = PlusJakartaSans, fontWeight = FontWeight.Bold, fontSize = 12.sp, color = c.accent, maxLines = 1)
        }
    }
}

@Composable
private fun OrderItemsCard(order: Order) {
    val c = AyTheme.colors
    val count = order.items.sumOf { it.quantity }
    Column(
        Modifier.fillMaxWidth().background(c.cardLow, RoundedCornerShape(16.dp))
            .then(if (c.isDark) Modifier.border(1.dp, c.border, RoundedCornerShape(16.dp)) else Modifier)
            .padding(14.dp)
    ) {
        Row(Modifier.fillMaxWidth(), verticalAlignment = Alignment.CenterVertically) {
            Icon(Icons.Filled.Inventory2, null, tint = c.accent, modifier = Modifier.size(18.dp))
            Spacer(Modifier.width(6.dp))
            Text("Sacred Offerings", Modifier.weight(1f), fontFamily = NotoSerif, fontWeight = FontWeight.Bold, fontSize = 17.sp, color = c.heading)
            CapsLabel("$count ${if (count == 1) "item" else "items"}", c.textMuted)
        }
        Spacer(Modifier.height(12.dp))
        Column(verticalArrangement = Arrangement.spacedBy(8.dp)) {
            order.items.forEach { item ->
                Row(
                    Modifier.fillMaxWidth().background(c.card, RoundedCornerShape(12.dp)).padding(8.dp),
                    verticalAlignment = Alignment.CenterVertically
                ) {
                    AyImage(item.productSnapshot.image, item.productSnapshot.name, Modifier.size(54.dp).clip(RoundedCornerShape(10.dp)))
                    Spacer(Modifier.width(12.dp))
                    Column(Modifier.weight(1f)) {
                        Text(
                            item.productSnapshot.name, fontFamily = PlusJakartaSans, fontWeight = FontWeight.SemiBold,
                            fontSize = 14.sp, color = c.text, maxLines = 2, overflow = TextOverflow.Ellipsis
                        )
                        Text(
                            "Qty: ${item.quantity}", fontFamily = PlusJakartaSans, fontSize = 12.sp, color = c.textMuted
                        )
                    }
                    Text(
                        "₹%.2f".format(item.unitPrice * item.quantity), fontFamily = PlusJakartaSans,
                        fontWeight = FontWeight.Bold, fontSize = 14.sp, color = c.text
                    )
                }
            }
        }
        Spacer(Modifier.height(12.dp))
        // Financial reconciliation banner
        Column(Modifier.fillMaxWidth().background(c.chipHigh.copy(alpha = 0.7f), RoundedCornerShape(12.dp)).padding(12.dp)) {
            PriceLine("Subtotal", "₹%.2f".format(order.subtotal))
            if (order.discount > 0) PriceLine("Discount", "−₹%.2f".format(order.discount), c.success)
            PriceLine("Shipping", if (order.shippingFee <= 0) "Free" else "₹%.2f".format(order.shippingFee))
            Spacer(Modifier.height(8.dp))
            AyDivider()
            Spacer(Modifier.height(8.dp))
            Row(Modifier.fillMaxWidth(), verticalAlignment = Alignment.CenterVertically) {
                Icon(Icons.Filled.VerifiedUser, null, tint = c.accent, modifier = Modifier.size(18.dp))
                Spacer(Modifier.width(6.dp))
                Text(
                    if (order.status.isPaid()) "Total Paid" else "Order Total", Modifier.weight(1f),
                    fontFamily = PlusJakartaSans, fontWeight = FontWeight.SemiBold, fontSize = 13.sp, color = c.text
                )
                Text(
                    "₹%.2f".format(order.total), fontFamily = PlusJakartaSans, fontWeight = FontWeight.ExtraBold,
                    fontSize = 19.sp, color = c.price
                )
            }
        }
    }
}

@Composable
private fun PriceLine(label: String, value: String, valueColor: Color = AyTheme.colors.text) {
    val c = AyTheme.colors
    Row(Modifier.fillMaxWidth().padding(vertical = 2.dp)) {
        Text(label, Modifier.weight(1f), fontFamily = PlusJakartaSans, fontSize = 13.sp, color = c.textSub)
        Text(value, fontFamily = PlusJakartaSans, fontWeight = FontWeight.SemiBold, fontSize = 13.sp, color = valueColor)
    }
}