package com.ayurdhara.feature.payment.presentation.ui

import androidx.compose.foundation.layout.*
import androidx.compose.material3.*
import androidx.compose.runtime.*
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.unit.dp
import com.ayurdhara.core.designsystem.theme.LocalSpacing
import com.ayurdhara.core.designsystem.components.AyurdharaButton

@Composable
fun ManualVerificationScreen(
    orderId: String,
    onSubmit: (utr: String) -> Unit,
    modifier: Modifier = Modifier
) {
    val spacing = LocalSpacing.current
    var utrNumber by remember { mutableStateOf("") }
    
    Column(modifier = modifier.fillMaxSize().padding(spacing.medium)) {
        Text("Manual Verification", style = MaterialTheme.typography.headlineMedium)
        Spacer(modifier = Modifier.height(spacing.small))
        Text("If your money was deducted but the order is still pending, please enter your UTR number below.", style = MaterialTheme.typography.bodyMedium)
        
        Spacer(modifier = Modifier.height(spacing.large))
        OutlinedTextField(
            value = utrNumber,
            onValueChange = { utrNumber = it },
            label = { Text("12-digit UTR/Reference Number") },
            modifier = Modifier.fillMaxWidth(),
            singleLine = true
        )
        
        Spacer(modifier = Modifier.height(spacing.medium))
        OutlinedButton(onClick = { /* Handle Screenshot Upload */ }, modifier = Modifier.fillMaxWidth()) {
            Text("Upload Screenshot (Optional)")
        }

        Spacer(modifier = Modifier.weight(1f))
        AyurdharaButton(
            text = "Submit Verification",
            onClick = { onSubmit(utrNumber) },
            enabled = utrNumber.length == 12,
            modifier = Modifier.fillMaxWidth()
        )
    }
}