package com.ayurdhara.feature.orders.presentation.ui

import androidx.compose.foundation.background
import androidx.compose.foundation.layout.*
import androidx.compose.foundation.rememberScrollState
import androidx.compose.foundation.verticalScroll
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.Inventory2
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.runtime.getValue
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import androidx.hilt.navigation.compose.hiltViewModel
import androidx.lifecycle.compose.collectAsStateWithLifecycle
import com.ayurdhara.core.designsystem.components.AyBackBar
import com.ayurdhara.core.designsystem.components.AyEmptyPanel
import com.ayurdhara.core.designsystem.components.AyErrorPanel
import com.ayurdhara.core.designsystem.components.AyLoading
import com.ayurdhara.core.designsystem.theme.AyTheme
import com.ayurdhara.core.designsystem.theme.PlusJakartaSans
import com.ayurdhara.feature.orders.presentation.viewmodel.OrdersUiState
import com.ayurdhara.feature.orders.presentation.viewmodel.OrdersViewModel

/** Single-order view: live delivery tracker, delivery partner, items, totals, Invoice / Reorder. */
@Composable
fun OrderDetailsScreen(
    orderId: String,
    modifier: Modifier = Modifier,
    onBackClick: (() -> Unit)? = null,
    viewModel: OrdersViewModel = hiltViewModel()
) {
    val c = AyTheme.colors
    val uiState by viewModel.uiState.collectAsStateWithLifecycle()

    Column(modifier.fillMaxSize().background(c.canvas)) {
        AyBackBar(title = "Order Details", onBack = onBackClick)
        Box(Modifier.weight(1f).fillMaxWidth()) {
            when (val state = uiState) {
                is OrdersUiState.Loading -> AyLoading()
                is OrdersUiState.Error -> AyErrorPanel(state.message, onRetry = { viewModel.loadOrders() })
                is OrdersUiState.Success -> {
                    val order = state.orders.firstOrNull { it.id == orderId || it.displayId == orderId }
                    if (order == null) {
                        AyEmptyPanel(Icons.Filled.Inventory2, "Order not found", "We couldn't find this order. It may have been removed.")
                    } else {
                        Column(
                            Modifier.fillMaxSize().verticalScroll(rememberScrollState()).padding(16.dp),
                            verticalArrangement = Arrangement.spacedBy(14.dp)
                        ) {
                            Row(verticalAlignment = Alignment.CenterVertically) {
                                Column(Modifier.weight(1f)) {
                                    Text(
                                        "ORDER REFERENCE", fontFamily = PlusJakartaSans, fontWeight = FontWeight.Bold,
                                        fontSize = 10.sp, letterSpacing = 1.4.sp, color = c.accent
                                    )
                                    Text(
                                        order.displayId, fontFamily = PlusJakartaSans, fontWeight = FontWeight.Bold,
                                        fontSize = 18.sp, color = c.heading
                                    )
                                }
                                Text(
                                    statusLabel(order.status), fontFamily = PlusJakartaSans, fontWeight = FontWeight.Bold,
                                    fontSize = 13.sp, color = statusColor(order.status)
                                )
                            }
                            OrderExpandedContent(order)
                            Spacer(Modifier.navigationBarsPadding())
                        }
                    }
                }
            }
        }
    }
}