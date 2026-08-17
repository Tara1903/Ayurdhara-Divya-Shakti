package com.ayurdhara.feature.profile.presentation.ui

import androidx.compose.foundation.layout.*
import androidx.compose.material3.Card
import androidx.compose.material3.CardDefaults
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.unit.dp
import com.ayurdhara.core.designsystem.components.AyurdharaButton
import com.ayurdhara.core.designsystem.theme.LocalSpacing

@Composable
fun GoldMembershipScreen(
    modifier: Modifier = Modifier
) {
    val spacing = LocalSpacing.current
    Column(
        modifier = modifier.fillMaxSize().padding(spacing.medium),
        horizontalAlignment = Alignment.CenterHorizontally
    ) {
        Text("Gold Membership", style = MaterialTheme.typography.headlineMedium, color = MaterialTheme.colorScheme.secondary)
        Spacer(modifier = Modifier.height(spacing.medium))
        
        Card(
            modifier = Modifier.fillMaxWidth(),
            colors = CardDefaults.cardColors(containerColor = MaterialTheme.colorScheme.primaryContainer)
        ) {
            Column(modifier = Modifier.padding(spacing.large)) {
                Text("Current Plan: Inactive", style = MaterialTheme.typography.titleLarge)
                Spacer(modifier = Modifier.height(spacing.small))
                Text("Upgrade to Gold to unlock exclusive 10% savings on all products and free shipping on orders over ₹499.", style = MaterialTheme.typography.bodyLarge)
                Spacer(modifier = Modifier.height(spacing.medium))
                AyurdharaButton(text = "Upgrade to Gold Now", onClick = { /* Future Upgrade Flow */ })
            }
        }
    }
}