package com.ayurdhara.feature.auth.presentation.ui

import androidx.compose.foundation.clickable
import androidx.compose.foundation.layout.*
import androidx.compose.foundation.text.KeyboardOptions
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.automirrored.filled.ArrowForward
import androidx.compose.material.icons.filled.Email
import androidx.compose.material.icons.filled.Lock
import androidx.compose.material.icons.filled.Visibility
import androidx.compose.material.icons.filled.VisibilityOff
import androidx.compose.material3.Icon
import androidx.compose.material3.Text
import androidx.compose.runtime.*
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.draw.clip
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.text.input.ImeAction
import androidx.compose.ui.text.input.KeyboardType
import androidx.compose.ui.text.input.PasswordVisualTransformation
import androidx.compose.ui.text.input.VisualTransformation
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import androidx.hilt.navigation.compose.hiltViewModel
import com.ayurdhara.core.designsystem.components.*
import com.ayurdhara.core.designsystem.theme.AyTheme
import com.ayurdhara.core.designsystem.theme.PlusJakartaSans
import com.ayurdhara.feature.auth.presentation.viewmodel.AuthState
import com.ayurdhara.feature.auth.presentation.viewmodel.AuthViewModel

import androidx.compose.ui.graphics.Color
import androidx.compose.ui.text.style.TextDecoration

@Composable
fun LoginScreen(
    onNavigateToRegister: () -> Unit,
    onNavigateToHome: () -> Unit,
    onNavigateToForgot: () -> Unit = {},
    viewModel: AuthViewModel = hiltViewModel()
) {
    val c = AyTheme.colors
    val email by viewModel.email.collectAsState()
    val password by viewModel.password.collectAsState()
    val uiState by viewModel.uiState.collectAsState()
    var showPassword by remember { mutableStateOf(false) }
    val comingSoon = rememberAyComingSoon()

    LaunchedEffect(uiState) {
        if (uiState is AuthState.Success) {
            onNavigateToHome()
            viewModel.resetState()
        }
    }

    AyAuthScaffold(title = "", onBack = onNavigateToHome) {
        Spacer(Modifier.height(4.dp))
        AyAuthBrandHeader()
        Spacer(Modifier.height(16.dp))
        AyAuthTitle(
            title = "Enter the Sanctuary",
            subtitle = "Sign in to continue your Ayurvedic wellness journey."
        )
        Spacer(Modifier.height(18.dp))

        AyAuthField(
            value = email,
            onValueChange = { viewModel.email.value = it },
            label = "Email Address",
            placeholder = "you@example.com",
            leadingIcon = Icons.Filled.Email,
            keyboardOptions = KeyboardOptions(keyboardType = KeyboardType.Email, imeAction = ImeAction.Next)
        )
        Spacer(Modifier.height(12.dp))
        AyAuthField(
            value = password,
            onValueChange = { viewModel.password.value = it },
            label = "Password",
            placeholder = "Enter your password",
            leadingIcon = Icons.Filled.Lock,
            trailing = {
                Icon(
                    if (showPassword) Icons.Filled.VisibilityOff else Icons.Filled.Visibility,
                    contentDescription = if (showPassword) "Hide password" else "Show password",
                    modifier = Modifier.clickable { showPassword = !showPassword }
                )
            },
            visualTransformation = if (showPassword) VisualTransformation.None else PasswordVisualTransformation(),
            keyboardOptions = KeyboardOptions(keyboardType = KeyboardType.Password, imeAction = ImeAction.Done),
            isError = uiState is AuthState.Error
        )
        Spacer(Modifier.height(8.dp))
        Text(
            "Forgot password?",
            modifier = Modifier
                .align(Alignment.End)
                .clickable(onClick = onNavigateToForgot)
                .padding(vertical = 4.dp, horizontal = 2.dp),
            fontFamily = PlusJakartaSans,
            fontWeight = FontWeight.SemiBold,
            fontSize = 13.sp,
            color = if (c.isDark) c.accent else Color(0xFF1B4332)
        )

        Spacer(Modifier.height(18.dp))
        AyAuthButton(
            text = "Sign In",
            onClick = { viewModel.login() },
            loading = uiState is AuthState.Loading,
            enabled = email.isNotBlank() && password.isNotBlank(),
            trailingIcon = Icons.AutoMirrored.Filled.ArrowForward
        )
        (uiState as? AuthState.Error)?.let {
            Spacer(Modifier.height(12.dp))
            AyAuthError(it.message)
        }

        Spacer(Modifier.height(18.dp))
        AyAuthOrDivider()
        Spacer(Modifier.height(14.dp))
        AyGoogleButton(onClick = comingSoon)

        Spacer(Modifier.height(16.dp))
        Row(
            Modifier.fillMaxWidth(),
            horizontalArrangement = Arrangement.Center,
            verticalAlignment = Alignment.CenterVertically
        ) {
            Text(
                "New to Ayurdhara? ",
                fontFamily = PlusJakartaSans,
                fontSize = 14.sp,
                color = if (c.isDark) c.textSub else Color(0xFF5A6860)
            )
            Text(
                "Create an Account",
                modifier = Modifier
                    .clip(androidx.compose.foundation.shape.RoundedCornerShape(6.dp))
                    .clickable(onClick = onNavigateToRegister)
                    .padding(horizontal = 4.dp, vertical = 6.dp),
                fontFamily = PlusJakartaSans,
                fontWeight = FontWeight.Bold,
                fontSize = 14.sp,
                color = if (c.isDark) c.accent else Color(0xFF1B4332),
                textDecoration = TextDecoration.Underline
            )
        }

        Spacer(Modifier.height(10.dp))
        AyOutlineButton(
            text = "Explore Sanctuary as Guest →",
            onClick = onNavigateToHome,
            modifier = Modifier.fillMaxWidth().height(48.dp)
        )

        Spacer(Modifier.height(16.dp))
        AyAuthAssuranceCard()
        Spacer(Modifier.height(14.dp))
        AyAuthTerms()
    }
}