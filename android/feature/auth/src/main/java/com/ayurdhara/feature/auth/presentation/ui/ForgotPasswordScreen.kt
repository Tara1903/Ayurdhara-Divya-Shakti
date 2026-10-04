package com.ayurdhara.feature.auth.presentation.ui

import androidx.compose.foundation.layout.*
import androidx.compose.foundation.text.KeyboardOptions
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.automirrored.filled.ArrowForward
import androidx.compose.material.icons.filled.Email
import androidx.compose.runtime.*
import androidx.compose.ui.Modifier
import androidx.compose.ui.text.input.ImeAction
import androidx.compose.ui.text.input.KeyboardType
import androidx.compose.ui.unit.dp
import androidx.hilt.navigation.compose.hiltViewModel
import com.ayurdhara.core.designsystem.components.*
import com.ayurdhara.feature.auth.presentation.viewmodel.AuthState
import com.ayurdhara.feature.auth.presentation.viewmodel.AuthViewModel

@Composable
fun ForgotPasswordScreen(
    onNavigateToOtp: () -> Unit,
    onBack: (() -> Unit)? = null,
    viewModel: AuthViewModel = hiltViewModel()
) {
    val email by viewModel.email.collectAsState()
    val uiState by viewModel.uiState.collectAsState()
    val back = onBack ?: rememberAyBack()

    LaunchedEffect(uiState) {
        if (uiState is AuthState.Success) {
            onNavigateToOtp()
            viewModel.resetState()
        }
    }

    AyAuthScaffold(title = "Reset Password", onBack = back) {
        AyAuthStepPill(step = 1, total = 2)
        Spacer(Modifier.height(20.dp))
        AyAuthBrandHeader()
        Spacer(Modifier.height(24.dp))
        AyAuthTitle(
            title = "Forgot Your Password?",
            subtitle = "Enter your email address and we will send a 6-digit verification code to keep your wellness profile secure."
        )
        Spacer(Modifier.height(24.dp))
        AyAuthField(
            value = email,
            onValueChange = { viewModel.email.value = it },
            label = "Email Address",
            placeholder = "you@example.com",
            leadingIcon = Icons.Filled.Email,
            keyboardOptions = KeyboardOptions(keyboardType = KeyboardType.Email, imeAction = ImeAction.Done),
            isError = uiState is AuthState.Error
        )
        Spacer(Modifier.height(24.dp))
        AyAuthButton(
            text = "Send Code",
            onClick = { viewModel.sendOtp() },
            loading = uiState is AuthState.Loading,
            enabled = email.isNotBlank(),
            trailingIcon = Icons.AutoMirrored.Filled.ArrowForward
        )
        (uiState as? AuthState.Error)?.let {
            Spacer(Modifier.height(12.dp))
            AyAuthError(it.message)
        }
        Spacer(Modifier.height(28.dp))
        AyAuthAssuranceCard()
        Spacer(Modifier.height(16.dp))
        AyAuthTerms()
    }
}