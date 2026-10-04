package com.ayurdhara.feature.cart.presentation.ui

import androidx.compose.foundation.background
import androidx.compose.foundation.border
import androidx.compose.foundation.clickable
import androidx.compose.foundation.layout.*
import androidx.compose.foundation.rememberScrollState
import androidx.compose.foundation.shape.CircleShape
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.foundation.text.KeyboardOptions
import androidx.compose.foundation.verticalScroll
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.*
import androidx.compose.material3.*
import androidx.compose.runtime.*
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.draw.clip
import androidx.compose.ui.graphics.Brush
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.text.input.KeyboardType
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import com.ayurdhara.core.designsystem.components.*
import com.ayurdhara.core.designsystem.theme.AyTheme
import com.ayurdhara.core.designsystem.theme.NotoSerif
import com.ayurdhara.core.designsystem.theme.PlusJakartaSans
import com.ayurdhara.core.designsystem.utils.rememberAyurdharaHapticFeedback
import com.ayurdhara.feature.cart.presentation.viewmodel.CartViewModel

@Composable
fun CheckoutScreen(
    cartViewModel: CartViewModel,
    onBackClick: () -> Unit = {},
    onProceedToStarPay: (amount: Double, name: String, phone: String, address: String) -> Unit
) {
    val c = AyTheme.colors
    val cartItems by cartViewModel.cartState.collectAsState()
    val subtotal = cartItems.sumOf { it.product.price * it.quantity }
    val haptic = rememberAyurdharaHapticFeedback()

    var fullName by remember { mutableStateOf("Rahul Sharma") }
    var phone by remember { mutableStateOf("9876543210") }
    var addressLine by remember { mutableStateOf("402, Green Avenue, Sector 15") }
    var city by remember { mutableStateOf("Jaipur") }
    var pincode by remember { mutableStateOf("302001") }

    val scrollState = rememberScrollState()

    Column(
        modifier = Modifier
            .fillMaxSize()
            .background(c.canvas)
    ) {
        AyBackBar(
            title = "Checkout",
            onBack = onBackClick
        )

        Column(
            modifier = Modifier
                .weight(1f)
                .fillMaxWidth()
                .verticalScroll(scrollState)
                .padding(16.dp),
            verticalArrangement = Arrangement.spacedBy(16.dp)
        ) {
            // ── Delivery Address Section ──
            Column(
                modifier = Modifier
                    .fillMaxWidth()
                    .ayCard(RoundedCornerShape(16.dp))
                    .padding(16.dp),
                verticalArrangement = Arrangement.spacedBy(12.dp)
            ) {
                Row(verticalAlignment = Alignment.CenterVertically) {
                    Icon(
                        Icons.Default.LocationOn,
                        contentDescription = null,
                        tint = c.accent,
                        modifier = Modifier.size(20.dp)
                    )
                    Spacer(Modifier.width(8.dp))
                    Text(
                        "Delivery Address",
                        fontFamily = NotoSerif,
                        fontWeight = FontWeight.Bold,
                        fontSize = 17.sp,
                        color = c.heading
                    )
                }

                AyTextField(
                    value = fullName,
                    onValueChange = { fullName = it },
                    label = "Full Name",
                    leadingIcon = Icons.Default.Person,
                    modifier = Modifier.fillMaxWidth()
                )

                AyTextField(
                    value = phone,
                    onValueChange = { phone = it.filter { ch -> ch.isDigit() }.take(10) },
                    label = "Phone Number",
                    leadingIcon = Icons.Default.Phone,
                    keyboardOptions = KeyboardOptions(keyboardType = KeyboardType.Phone),
                    modifier = Modifier.fillMaxWidth()
                )

                AyTextField(
                    value = addressLine,
                    onValueChange = { addressLine = it },
                    label = "Flat / House / Street",
                    leadingIcon = Icons.Default.Home,
                    modifier = Modifier.fillMaxWidth()
                )

                Row(
                    modifier = Modifier.fillMaxWidth(),
                    horizontalArrangement = Arrangement.spacedBy(12.dp)
                ) {
                    AyTextField(
                        value = city,
                        onValueChange = { city = it },
                        label = "City",
                        modifier = Modifier.weight(1f)
                    )
                    AyTextField(
                        value = pincode,
                        onValueChange = { pincode = it.filter { ch -> ch.isDigit() }.take(6) },
                        label = "PIN Code",
                        keyboardOptions = KeyboardOptions(keyboardType = KeyboardType.Number),
                        modifier = Modifier.weight(1f)
                    )
                }
            }

            // ── Payment Method Section ──
            Column(
                modifier = Modifier
                    .fillMaxWidth()
                    .ayCard(RoundedCornerShape(16.dp))
                    .padding(16.dp),
                verticalArrangement = Arrangement.spacedBy(12.dp)
            ) {
                Row(
                    modifier = Modifier.fillMaxWidth(),
                    horizontalArrangement = Arrangement.SpaceBetween,
                    verticalAlignment = Alignment.CenterVertically
                ) {
                    Text(
                        "Payment Method",
                        fontFamily = NotoSerif,
                        fontWeight = FontWeight.Bold,
                        fontSize = 17.sp,
                        color = c.heading
                    )
                    AyBadge("Direct UPI", gold = true)
                }

                Box(
                    modifier = Modifier
                        .fillMaxWidth()
                        .clip(RoundedCornerShape(14.dp))
                        .background(Color(0xFF0F172A))
                        .border(1.5.dp, Color(0xFF8B5CF6), RoundedCornerShape(14.dp))
                        .padding(14.dp)
                ) {
                    Row(
                        modifier = Modifier.fillMaxWidth(),
                        verticalAlignment = Alignment.CenterVertically,
                        horizontalArrangement = Arrangement.SpaceBetween
                    ) {
                        Row(verticalAlignment = Alignment.CenterVertically) {
                            Box(
                                modifier = Modifier
                                    .size(40.dp)
                                    .clip(RoundedCornerShape(10.dp))
                                    .background(
                                        Brush.linearGradient(
                                            listOf(Color(0xFF8B5CF6), Color(0xFF06B6D4))
                                        )
                                    ),
                                contentAlignment = Alignment.Center
                            ) {
                                Text("⚡", fontSize = 18.sp)
                            }
                            Spacer(Modifier.width(12.dp))
                            Column {
                                Row(verticalAlignment = Alignment.CenterVertically) {
                                    Text(
                                        "StarPay UPI",
                                        color = Color.White,
                                        fontFamily = PlusJakartaSans,
                                        fontWeight = FontWeight.Bold,
                                        fontSize = 15.sp
                                    )
                                    Spacer(Modifier.width(6.dp))
                                    Box(
                                        modifier = Modifier
                                            .clip(CircleShape)
                                            .background(Color(0xFF10B981))
                                            .padding(horizontal = 6.dp, vertical = 2.dp)
                                    ) {
                                        Text(
                                            "0% FEE",
                                            color = Color.White,
                                            fontSize = 9.sp,
                                            fontWeight = FontWeight.ExtraBold
                                        )
                                    }
                                }
                                Spacer(Modifier.height(2.dp))
                                Text(
                                    "GPay, PhonePe, Paytm, BHIM & QR",
                                    color = Color(0xFF94A3B8),
                                    fontSize = 12.sp,
                                    fontFamily = PlusJakartaSans
                                )
                            }
                        }

                        Box(
                            modifier = Modifier
                                .size(22.dp)
                                .clip(CircleShape)
                                .background(Color(0xFF8B5CF6)),
                            contentAlignment = Alignment.Center
                        ) {
                            Icon(
                                Icons.Default.Check,
                                contentDescription = null,
                                tint = Color.White,
                                modifier = Modifier.size(14.dp)
                            )
                        }
                    }
                }
            }

            // ── Order Summary Section ──
            Column(
                modifier = Modifier
                    .fillMaxWidth()
                    .ayCard(RoundedCornerShape(16.dp))
                    .padding(16.dp),
                verticalArrangement = Arrangement.spacedBy(10.dp)
            ) {
                Text(
                    "Order Summary",
                    fontFamily = NotoSerif,
                    fontWeight = FontWeight.Bold,
                    fontSize = 17.sp,
                    color = c.heading
                )

                cartItems.forEach { item ->
                    Row(
                        modifier = Modifier.fillMaxWidth(),
                        horizontalArrangement = Arrangement.SpaceBetween,
                        verticalAlignment = Alignment.CenterVertically
                    ) {
                        Text(
                            "${item.product.title} × ${item.quantity}",
                            fontFamily = PlusJakartaSans,
                            fontSize = 14.sp,
                            color = c.textSub,
                            modifier = Modifier.weight(1f)
                        )
                        Text(
                            ayRupees(item.product.price * item.quantity),
                            fontFamily = PlusJakartaSans,
                            fontWeight = FontWeight.SemiBold,
                            fontSize = 14.sp,
                            color = c.text
                        )
                    }
                }

                AyDivider(Modifier.padding(vertical = 4.dp))

                Row(
                    modifier = Modifier.fillMaxWidth(),
                    horizontalArrangement = Arrangement.SpaceBetween
                ) {
                    Text("Items Total", fontFamily = PlusJakartaSans, fontSize = 14.sp, color = c.textSub)
                    Text(ayRupees(subtotal), fontFamily = PlusJakartaSans, fontSize = 14.sp, color = c.text)
                }

                Row(
                    modifier = Modifier.fillMaxWidth(),
                    horizontalArrangement = Arrangement.SpaceBetween
                ) {
                    Text("Delivery Fee", fontFamily = PlusJakartaSans, fontSize = 14.sp, color = c.textSub)
                    Text("FREE", fontFamily = PlusJakartaSans, fontWeight = FontWeight.Bold, fontSize = 14.sp, color = c.success)
                }

                AyDivider(Modifier.padding(vertical = 4.dp))

                Row(
                    modifier = Modifier.fillMaxWidth(),
                    horizontalArrangement = Arrangement.SpaceBetween,
                    verticalAlignment = Alignment.CenterVertically
                ) {
                    Text(
                        "Final Amount",
                        fontFamily = NotoSerif,
                        fontWeight = FontWeight.Bold,
                        fontSize = 16.sp,
                        color = c.heading
                    )
                    Text(
                        ayRupees(subtotal),
                        fontFamily = NotoSerif,
                        fontWeight = FontWeight.Bold,
                        fontSize = 20.sp,
                        color = c.price
                    )
                }
            }
        }

        // ── Sticky Checkout Bar ──
        AyStickyBar(navPadding = true, color = c.card) {
            Row(
                modifier = Modifier.fillMaxWidth(),
                horizontalArrangement = Arrangement.SpaceBetween,
                verticalAlignment = Alignment.CenterVertically
            ) {
                Column {
                    Text(
                        "Total to Pay",
                        fontFamily = PlusJakartaSans,
                        fontSize = 12.sp,
                        color = c.textSub
                    )
                    Text(
                        ayRupees(subtotal),
                        fontFamily = NotoSerif,
                        fontWeight = FontWeight.Bold,
                        fontSize = 22.sp,
                        color = c.price
                    )
                }

                AyPrimaryButton(
                    text = "Pay with StarPay UPI ⚡",
                    onClick = {
                        try { haptic.medium() } catch (_: Exception) {}
                        val fullAddress = "$addressLine, $city - $pincode"
                        onProceedToStarPay(subtotal.toDouble(), fullName, phone, fullAddress)
                    },
                    modifier = Modifier.widthIn(min = 200.dp)
                )
            }
        }
    }
}