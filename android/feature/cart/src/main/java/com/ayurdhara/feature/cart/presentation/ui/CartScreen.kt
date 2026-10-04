package com.ayurdhara.feature.cart.presentation.ui

import androidx.compose.foundation.background
import androidx.compose.foundation.clickable
import androidx.compose.foundation.layout.*
import androidx.compose.foundation.lazy.LazyColumn
import androidx.compose.foundation.lazy.itemsIndexed
import androidx.compose.foundation.lazy.rememberLazyListState
import androidx.compose.foundation.shape.CircleShape
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.automirrored.filled.ArrowForward
import androidx.compose.material.icons.filled.*
import androidx.compose.material3.Icon
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.runtime.collectAsState
import androidx.compose.runtime.getValue
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.remember
import androidx.compose.runtime.rememberCoroutineScope
import androidx.compose.runtime.setValue
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.draw.clip
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.text.style.TextAlign
import androidx.compose.ui.text.style.TextDecoration
import androidx.compose.ui.text.style.TextOverflow
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import androidx.hilt.navigation.compose.hiltViewModel
import com.ayurdhara.core.designsystem.components.*
import com.ayurdhara.core.designsystem.theme.AyTheme
import com.ayurdhara.core.designsystem.theme.NotoSerif
import com.ayurdhara.core.designsystem.theme.PlusJakartaSans
import com.ayurdhara.core.designsystem.utils.rememberAyurdharaHapticFeedback
import com.ayurdhara.feature.cart.domain.CartItem
import com.ayurdhara.feature.cart.presentation.viewmodel.CartViewModel
import kotlinx.coroutines.launch

/** Cart value at which the "free express delivery" progress bar completes. */
private const val FREE_DELIVERY_THRESHOLD = 499.0

@Composable
fun CartScreen(
    viewModel: CartViewModel = hiltViewModel(),
    onNavigateToCheckout: () -> Unit = {},
    onProductClick: (String) -> Unit = {},
    onContinueShopping: () -> Unit = {}
) {
    val c = AyTheme.colors
    val cartItems by viewModel.cartState.collectAsState()
    val subtotal = cartItems.sumOf { it.product.price * it.quantity }
    val mrpTotal = cartItems.sumOf { item ->
        (item.product.originalPrice?.takeIf { it > item.product.price } ?: item.product.price) * item.quantity
    }
    val savings = mrpTotal - subtotal
    val haptic = rememberAyurdharaHapticFeedback()
    val listState = rememberLazyListState()
    val scope = rememberCoroutineScope()

    Column(Modifier.fillMaxSize().background(c.canvas)) {
        AyBackBar(title = "Your Bag", onBack = null)

        if (cartItems.isEmpty()) {
            EmptyCartState(onContinueShopping)
        } else {
            LazyColumn(
                modifier = Modifier.weight(1f).fillMaxWidth(),
                state = listState,
                contentPadding = PaddingValues(start = 20.dp, end = 20.dp, top = 16.dp, bottom = 24.dp),
                verticalArrangement = Arrangement.spacedBy(16.dp)
            ) {
                item(key = "delivery") { DeliveryProgressCard(subtotal) }

                item(key = "header") {
                    Row(Modifier.fillMaxWidth().padding(top = 4.dp), verticalAlignment = Alignment.CenterVertically) {
                        Text("Sacred Offerings", fontFamily = NotoSerif, fontWeight = FontWeight.Bold, fontSize = 20.sp, color = c.heading)
                        Spacer(Modifier.width(8.dp))
                        Text(
                            if (cartItems.size == 1) "1 Item" else "${cartItems.size} Items",
                            Modifier.background(c.goldFill.copy(alpha = if (c.isDark) 0.2f else 0.55f), RoundedCornerShape(50)).padding(horizontal = 8.dp, vertical = 2.dp),
                            fontFamily = PlusJakartaSans, fontWeight = FontWeight.SemiBold, fontSize = 12.sp,
                            color = if (c.isDark) c.accent else c.heading
                        )
                        Spacer(Modifier.weight(1f))
                        Row(
                            Modifier.clip(RoundedCornerShape(8.dp)).clickable {
                                haptic.reject()
                                viewModel.clearCart()
                            }.padding(4.dp),
                            verticalAlignment = Alignment.CenterVertically
                        ) {
                            Icon(Icons.Filled.DeleteSweep, null, Modifier.size(16.dp), tint = c.textSub)
                            Spacer(Modifier.width(4.dp))
                            Text("Clear Bag", fontFamily = PlusJakartaSans, fontWeight = FontWeight.SemiBold, fontSize = 12.sp, color = c.textSub)
                        }
                    }
                }

                itemsIndexed(cartItems, key = { _, it -> it.product.id }) { _, item ->
                    CartItemRow(
                        item = item,
                        onClick = { onProductClick(item.product.slug) },
                        onIncreaseQuantity = {
                            haptic.light()
                            viewModel.updateQuantity(item.product.id, item.quantity + 1)
                        },
                        onDecreaseQuantity = {
                            haptic.light()
                            viewModel.updateQuantity(item.product.id, item.quantity - 1)
                        },
                        onRemove = {
                            haptic.reject()
                            viewModel.removeFromCart(item.product.id)
                        }
                    )
                }

                item(key = "coupon") { CouponCard() }

                item(key = "bill") { BillCard(mrpTotal = mrpTotal, subtotal = subtotal, savings = savings) }

                item(key = "assurance") {
                    Row(Modifier.fillMaxWidth().padding(vertical = 8.dp), horizontalArrangement = Arrangement.SpaceAround) {
                        AssuranceItem(Icons.Filled.VerifiedUser, "100% Authentic Herbs")
                        AssuranceItem(Icons.Filled.Lock, "Sacred Encrypted Checkout")
                        AssuranceItem(Icons.Filled.EnergySavingsLeaf, "Biodegradable Pack")
                    }
                }
            }

            // Sticky checkout bar (the bottom navigation bar sits below this screen, so no nav-bar inset here).
            AyStickyBar(navPadding = false, color = c.card) {
                Row(Modifier.fillMaxWidth(), verticalAlignment = Alignment.CenterVertically, horizontalArrangement = Arrangement.SpaceBetween) {
                    Column {
                        Row(verticalAlignment = Alignment.Bottom) {
                            Text("Total ", Modifier.padding(bottom = 3.dp), fontFamily = PlusJakartaSans, fontWeight = FontWeight.SemiBold, fontSize = 12.sp, color = c.textSub)
                            Text(ayRupees(subtotal), fontFamily = NotoSerif, fontWeight = FontWeight.Bold, fontSize = 24.sp, color = c.price, maxLines = 1)
                        }
                        Row(
                            Modifier.clip(RoundedCornerShape(6.dp)).clickable {
                                scope.launch { listState.animateScrollToItem(cartItems.size + 3) }
                            },
                            verticalAlignment = Alignment.CenterVertically
                        ) {
                            Text("View Details", fontFamily = PlusJakartaSans, fontWeight = FontWeight.SemiBold, fontSize = 12.sp, color = c.accent)
                            Icon(Icons.Filled.ExpandMore, null, Modifier.size(14.dp), tint = c.accent)
                        }
                    }
                    AyPrimaryButton(
                        text = "Proceed to Checkout",
                        onClick = {
                            haptic.medium()
                            onNavigateToCheckout()
                        },
                        trailingIcon = Icons.AutoMirrored.Filled.ArrowForward
                    )
                }
            }
        }
    }
}

@Composable
private fun DeliveryProgressCard(subtotal: Double) {
    val c = AyTheme.colors
    val remaining = (FREE_DELIVERY_THRESHOLD - subtotal).coerceAtLeast(0.0)
    val unlocked = remaining <= 0.0
    val progress = (subtotal / FREE_DELIVERY_THRESHOLD).toFloat().coerceIn(0f, 1f)
    Column(
        Modifier.fillMaxWidth().ayCard(RoundedCornerShape(12.dp)).padding(16.dp),
        verticalArrangement = Arrangement.spacedBy(8.dp)
    ) {
        Row(verticalAlignment = Alignment.CenterVertically) {
            Icon(Icons.Filled.LocalShipping, null, Modifier.size(20.dp), tint = c.accent)
            Spacer(Modifier.width(8.dp))
            Text("Express Vedic Delivery", Modifier.weight(1f), fontFamily = NotoSerif, fontWeight = FontWeight.Bold, fontSize = 16.sp, color = c.text)
            Text(
                if (unlocked) "Unlocked" else "Almost There",
                Modifier.background(c.goldFill.copy(alpha = if (c.isDark) 0.2f else 0.6f), RoundedCornerShape(50)).padding(horizontal = 8.dp, vertical = 2.dp),
                fontFamily = PlusJakartaSans, fontWeight = FontWeight.SemiBold, fontSize = 11.sp,
                color = if (c.isDark) c.accent else c.onGoldFill
            )
        }
        if (unlocked) {
            Text("You've unlocked FREE Express Delivery! 🚚", fontFamily = PlusJakartaSans, fontWeight = FontWeight.Bold, fontSize = 14.sp, color = c.accent)
        } else {
            Text(
                androidx.compose.ui.text.buildAnnotatedString {
                    append("Add ")
                    pushStyle(androidx.compose.ui.text.SpanStyle(fontWeight = FontWeight.Bold, color = c.price))
                    append(ayRupees(remaining))
                    pop()
                    append(" more to unlock ")
                    pushStyle(androidx.compose.ui.text.SpanStyle(fontWeight = FontWeight.Bold, color = c.accent))
                    append("FREE Express Delivery!")
                    pop()
                    append(" 🚚")
                },
                fontFamily = PlusJakartaSans, fontSize = 14.sp, lineHeight = 20.sp, color = c.textSub
            )
        }
        Box(Modifier.fillMaxWidth().padding(top = 2.dp).height(10.dp).clip(CircleShape).background(c.chipHigh)) {
            Box(Modifier.fillMaxWidth(progress).fillMaxHeight().clip(CircleShape).background(c.accent))
        }
    }
}

@Composable
fun CartItemRow(
    item: CartItem,
    onIncreaseQuantity: () -> Unit,
    onDecreaseQuantity: () -> Unit,
    onRemove: () -> Unit,
    onClick: () -> Unit = {}
) {
    val c = AyTheme.colors
    val product = item.product
    val subtitle = listOfNotNull(
        product.category.takeIf { it.isNotBlank() },
        product.primaryBenefit?.takeIf { it.isNotBlank() }
    ).joinToString(" • ")
    Row(
        Modifier.fillMaxWidth().ayCard(RoundedCornerShape(12.dp)).clickable(onClick = onClick).padding(14.dp),
        horizontalArrangement = Arrangement.spacedBy(14.dp)
    ) {
        Box(Modifier.size(width = 80.dp, height = 96.dp).clip(RoundedCornerShape(8.dp)).background(c.cardLow)) {
            AyImage(product.imageUrl, product.title, Modifier.fillMaxSize())
            if (!product.badge.isNullOrBlank()) {
                Text(
                    product.badge!!.uppercase(),
                    Modifier.align(Alignment.TopStart).padding(4.dp).background(c.card.copy(alpha = 0.9f), RoundedCornerShape(4.dp)).padding(horizontal = 4.dp, vertical = 1.dp),
                    fontFamily = PlusJakartaSans, fontWeight = FontWeight.Bold, fontSize = 9.sp, letterSpacing = 0.5.sp,
                    color = if (c.isDark) c.accent else c.heading, maxLines = 1, overflow = TextOverflow.Ellipsis
                )
            }
        }
        Column(Modifier.weight(1f).heightIn(min = 96.dp), verticalArrangement = Arrangement.SpaceBetween) {
            Column {
                Row(verticalAlignment = Alignment.Top) {
                    Text(
                        product.title, Modifier.weight(1f), fontFamily = NotoSerif, fontWeight = FontWeight.Bold,
                        fontSize = 16.sp, lineHeight = 20.sp, color = c.heading, maxLines = 2, overflow = TextOverflow.Ellipsis
                    )
                    Box(
                        Modifier.padding(start = 6.dp).size(28.dp).clip(CircleShape).clickable(onClick = onRemove),
                        contentAlignment = Alignment.Center
                    ) {
                        Icon(Icons.Filled.DeleteOutline, "Remove", Modifier.size(18.dp), tint = c.textSub)
                    }
                }
                if (subtitle.isNotBlank()) {
                    Text(subtitle, Modifier.padding(top = 2.dp), fontFamily = PlusJakartaSans, fontSize = 12.sp, color = c.textSub, maxLines = 1, overflow = TextOverflow.Ellipsis)
                }
            }
            Spacer(Modifier.height(8.dp))
            Row(Modifier.fillMaxWidth(), verticalAlignment = Alignment.CenterVertically, horizontalArrangement = Arrangement.SpaceBetween) {
                Row(Modifier.weight(1f), verticalAlignment = Alignment.Bottom) {
                    Text(ayRupees(product.price * item.quantity), fontFamily = PlusJakartaSans, fontWeight = FontWeight.ExtraBold, fontSize = 16.sp, color = c.price, maxLines = 1)
                    val mrp = product.originalPrice
                    if (mrp != null && mrp > product.price) {
                        Spacer(Modifier.width(6.dp))
                        Text(
                            ayRupees(mrp * item.quantity), Modifier.padding(bottom = 1.dp), fontFamily = PlusJakartaSans, fontSize = 12.sp,
                            color = c.textMuted, textDecoration = TextDecoration.LineThrough, maxLines = 1
                        )
                    }
                }
                AyStepper(item.quantity, onDecreaseQuantity, onIncreaseQuantity)
            }
        }
    }
}

@Composable
private fun CouponCard() {
    val c = AyTheme.colors
    var code by remember { mutableStateOf("") }
    var message by remember { mutableStateOf<String?>(null) }
    Column(
        Modifier.fillMaxWidth().ayCard(RoundedCornerShape(12.dp)).padding(16.dp),
        verticalArrangement = Arrangement.spacedBy(12.dp)
    ) {
        Row(verticalAlignment = Alignment.CenterVertically) {
            Icon(Icons.Filled.Redeem, null, Modifier.size(20.dp), tint = c.accent)
            Spacer(Modifier.width(8.dp))
            Text("Vedic Coupon & Blessings", fontFamily = NotoSerif, fontWeight = FontWeight.Bold, fontSize = 16.sp, color = c.text)
        }
        Row(verticalAlignment = Alignment.CenterVertically, horizontalArrangement = Arrangement.spacedBy(10.dp)) {
            AyTextField(
                value = code,
                onValueChange = { code = it.uppercase().take(20); message = null },
                label = "Enter coupon code",
                modifier = Modifier.weight(1f),
                leadingIcon = Icons.Filled.Stars
            )
            AyOutlineButton("Apply", onClick = {
                message = if (code.isBlank()) "Please enter a coupon code." else "Coupon codes are coming soon to the app ✨"
            }, height = 56.dp)
        }
        message?.let {
            Row(
                Modifier.fillMaxWidth().background(c.chip, RoundedCornerShape(8.dp)).padding(horizontal = 10.dp, vertical = 6.dp),
                verticalAlignment = Alignment.CenterVertically
            ) {
                Icon(Icons.Filled.AutoAwesome, null, Modifier.size(14.dp), tint = c.accent)
                Spacer(Modifier.width(6.dp))
                Text(it, fontFamily = PlusJakartaSans, fontWeight = FontWeight.Medium, fontSize = 12.sp, color = c.textSub)
            }
        }
    }
}

@Composable
private fun BillCard(mrpTotal: Double, subtotal: Double, savings: Double) {
    val c = AyTheme.colors
    Column(
        Modifier.fillMaxWidth().ayCard(RoundedCornerShape(12.dp)).padding(16.dp),
        verticalArrangement = Arrangement.spacedBy(10.dp)
    ) {
        Row(verticalAlignment = Alignment.CenterVertically) {
            Text("Payment Summary", Modifier.weight(1f), fontFamily = NotoSerif, fontWeight = FontWeight.Bold, fontSize = 20.sp, color = c.heading)
            Icon(Icons.Filled.ReceiptLong, null, Modifier.size(18.dp), tint = c.textMuted)
        }
        BillRow("Item Total", ayRupees(mrpTotal), valueColor = c.text)
        if (savings > 0.0) BillRow("Discount on MRP", "-" + ayRupees(savings), labelColor = c.accent, valueColor = c.accent)
        Row(Modifier.fillMaxWidth(), verticalAlignment = Alignment.CenterVertically) {
            Text("Delivery Fee", Modifier.weight(1f), fontFamily = PlusJakartaSans, fontSize = 14.sp, color = c.textSub)
            Text("₹80", fontFamily = PlusJakartaSans, fontSize = 12.sp, color = c.textMuted, textDecoration = TextDecoration.LineThrough)
            Spacer(Modifier.width(6.dp))
            Text("FREE", fontFamily = PlusJakartaSans, fontWeight = FontWeight.Bold, fontSize = 14.sp, color = c.success)
        }
        Row(Modifier.fillMaxWidth(), verticalAlignment = Alignment.CenterVertically) {
            Text("Packaging & Ayurvedic Seal", Modifier.weight(1f), fontFamily = PlusJakartaSans, fontSize = 14.sp, color = c.textSub)
            Text("FREE", fontFamily = PlusJakartaSans, fontWeight = FontWeight.Bold, fontSize = 14.sp, color = c.success)
        }
        AyDivider(Modifier.padding(vertical = 2.dp))
        Row(Modifier.fillMaxWidth(), verticalAlignment = Alignment.CenterVertically) {
            Column(Modifier.weight(1f)) {
                Text("Total Payable", fontFamily = NotoSerif, fontWeight = FontWeight.Bold, fontSize = 20.sp, color = c.heading)
                Text("Inclusive of all sacred taxes", fontFamily = PlusJakartaSans, fontSize = 11.sp, color = c.textSub)
            }
            Text(ayRupees(subtotal), fontFamily = NotoSerif, fontWeight = FontWeight.Bold, fontSize = 28.sp, color = c.price)
        }
        if (savings > 0.0) {
            Row(
                Modifier.fillMaxWidth().padding(top = 2.dp)
                    .background(if (c.isDark) c.successBg else c.successBg.copy(alpha = 0.7f), RoundedCornerShape(8.dp)).padding(12.dp),
                horizontalArrangement = Arrangement.Center, verticalAlignment = Alignment.CenterVertically
            ) {
                Icon(Icons.Filled.Eco, null, Modifier.size(18.dp), tint = c.success)
                Spacer(Modifier.width(8.dp))
                Text("You saved ${ayRupees(savings)} on this order 🌿", fontFamily = PlusJakartaSans, fontWeight = FontWeight.Bold, fontSize = 14.sp, color = c.success)
            }
        }
    }
}

@Composable
private fun BillRow(
    label: String,
    value: String,
    labelColor: androidx.compose.ui.graphics.Color = AyTheme.colors.textSub,
    valueColor: androidx.compose.ui.graphics.Color = AyTheme.colors.text
) {
    Row(Modifier.fillMaxWidth(), verticalAlignment = Alignment.CenterVertically) {
        Text(label, Modifier.weight(1f), fontFamily = PlusJakartaSans, fontSize = 14.sp, color = labelColor)
        Text(value, fontFamily = PlusJakartaSans, fontWeight = FontWeight.Bold, fontSize = 14.sp, color = valueColor)
    }
}

@Composable
private fun AssuranceItem(icon: androidx.compose.ui.graphics.vector.ImageVector, label: String) {
    val c = AyTheme.colors
    Column(Modifier.width(96.dp), horizontalAlignment = Alignment.CenterHorizontally, verticalArrangement = Arrangement.spacedBy(4.dp)) {
        Icon(icon, null, Modifier.size(20.dp), tint = c.accent)
        Text(label, fontFamily = PlusJakartaSans, fontSize = 11.sp, lineHeight = 14.sp, color = c.textSub, textAlign = TextAlign.Center)
    }
}

@Composable
fun EmptyCartState(onContinueShopping: () -> Unit = {}) {
    AyMessagePanel(
        icon = Icons.Filled.ShoppingBag,
        title = "Your bag feels light",
        message = "Add some Ayurvedic goodness to it.",
        actionText = "Explore Products",
        onAction = onContinueShopping
    )
}