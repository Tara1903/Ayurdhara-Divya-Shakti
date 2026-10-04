package com.ayurdhara.feature.orders.presentation.ui

import androidx.compose.runtime.Composable

@Composable
fun OrdersScreen(onBackClick: () -> Unit = {}) {
    OrderHistoryScreen(onBackClick = onBackClick)
}