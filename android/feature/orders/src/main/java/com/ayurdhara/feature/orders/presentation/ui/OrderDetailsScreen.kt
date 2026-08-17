package com.ayurdhara.feature.orders.presentation.ui

import androidx.compose.foundation.layout.*
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.CheckCircle
import androidx.compose.material3.*
import androidx.compose.runtime.Composable
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.unit.dp
import com.ayurdhara.core.designsystem.theme.LocalSpacing

@Composable
fun OrderDetailsScreen(
    orderId: String,
    modifier: Modifier = Modifier
) {
    val spacing = LocalSpacing.current
    Column(modifier = modifier.fillMaxSize().padding(spacing.medium)) {
        Text("Order Details", style = MaterialTheme.typography.headlineMedium)
        Text(orderId, style = MaterialTheme.typography.bodyLarge, color = MaterialTheme.colorScheme.onSurfaceVariant)
        Spacer(modifier = Modifier.height(spacing.medium))

        Card(modifier = Modifier.fillMaxWidth()) {
            Column(modifier = Modifier.padding(spacing.medium)) {
                Text("Status Timeline", style = MaterialTheme.typography.titleMedium)
                Spacer(modifier = Modifier.height(spacing.small))
                
                Row(verticalAlignment = Alignment.CenterVertically) {
                    Icon(Icons.Default.CheckCircle, contentDescription = "Created", tint = MaterialTheme.colorScheme.primary)
                    Spacer(modifier = Modifier.width(8.dp))
                    Text("Order Created")
                }
                Divider(modifier = Modifier.padding(start = 12.dp, top = 4.dp, bottom = 4.dp).height(20.dp).width(2.dp))
                Row(verticalAlignment = Alignment.CenterVertically) {
                    Icon(Icons.Default.CheckCircle, contentDescription = "Pending", tint = MaterialTheme.colorScheme.error)
                    Spacer(modifier = Modifier.width(8.dp))
                    Text("Pending Payment")
                }
            }
        }
        
        Spacer(modifier = Modifier.height(spacing.medium))
        Button(onClick = { /* Handle Payment Placeholder */ }, modifier = Modifier.fillMaxWidth()) {
            Text("Complete Payment (Placeholder)")
        }
    }
}