package com.ayurdhara.feature.auth.presentation.ui

import androidx.compose.foundation.clickable
import androidx.compose.foundation.layout.*
import androidx.compose.foundation.text.KeyboardOptions
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.automirrored.filled.ArrowForward
import androidx.compose.material.icons.filled.Email
import androidx.compose.material.icons.filled.Lock
import androidx.compose.material.icons.filled.Person
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
import androidx.compose.ui.text.input.KeyboardCapitalization
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import androidx.hilt.navigation.compose.hiltViewModel
import com.ayurdhara.core.designsystem.components.*
import com.ayurdhara.core.designsystem.theme.AyTheme
import com.ayurdhara.core.designsystem.theme.PlusJakartaSans
import com.ayurdhara.feature.auth.presentation.viewmodel.AuthState
import com.ayurdhara.feature.auth.presentation.viewmodel.AuthViewModel

@Composable
fun RegisterScreen(
    onNavigateToLogin: () -> Unit,
    viewModel: AuthViewModel = hiltViewModel()
) {
    val c = AyTheme.colors
    val email by viewModel.email.collectAsState()
    val password by viewModel.password.collectAsState()
    val uiState by viewModel.uiState.collectAsState()

    var name by remember { mutableStateOf("") }
    var confirmPassword by remember { mutableStateOf("") }
    var showPassword by remember { mutableStateOf(false) }
    val comingSoon = rememberAyComingSoon()

    LaunchedEffect(uiState) {
        if (uiState is AuthState.Success) {
            onNavigateToLogin()
            viewModel.resetState()
        }
    }

    val mismatch = confirmPassword.isNotEmpty() && password != confirmPassword

    AyAuthScaffold(title = "Join Ayurdhara", onBack = onNavigateToLogin) {
        AyAuthStepPill(step = 1, total = 2)
        Spacer(Modifier.height(20.dp))
        AyAuthBrandHeader()
        Spacer(Modifier.height(24.dp))
        AyAuthTitle(
            title = "Begin Your Wellness Journey",
            subtitle = "Create your account to unlock authentic Vedic botanicals."
        )
        Spacer(Modifier.height(24.dp))

        AyAuthField(
            value = name,
            onValueChange = { name = it },
            label = "Full Name",
            placeholder = "Your full name",
            leadingIcon = Icons.Filled.Person,
            keyboardOptions = KeyboardOptions(capitalization = KeyboardCapitalization.Words, imeAction = ImeAction.Next)
        )
        Spacer(Modifier.height(16.dp))
        AyAuthField(
            value = email,
            onValueChange = { viewModel.email.value = it },
            label = "Email Address",
            placeholder = "you@example.com",
            leadingIcon = Icons.Filled.Email,
            keyboardOptions = KeyboardOptions(keyboardType = KeyboardType.Email, imeAction = ImeAction.Next)
        )
        Spacer(Modifier.height(16.dp))
        AyAuthField(
            value = password,
            onValueChange = { viewModel.password.value = it },
            label = "Password",
            placeholder = "Create a password",
            leadingIcon = Icons.Filled.Lock,
            trailing = {
                Icon(
                    if (showPassword) Icons.Filled.VisibilityOff else Icons.Filled.Visibility,
                    contentDescription = if (showPassword) "Hide password" else "Show password",
                    modifier = Modifier.clickable { showPassword = !showPassword }
                )
            },
            visualTransformation = if (showPassword) VisualTransformation.None else PasswordVisualTransformation(),
            keyboardOptions = KeyboardOptions(keyboardType = KeyboardType.Password, imeAction = ImeAction.Next)
        )
        Spacer(Modifier.height(16.dp))
        AyAuthField(
            value = confirmPassword,
            onValueChange = { confirmPassword = it },
            label = "Confirm Password",
            placeholder = "Re-enter your password",
            leadingIcon = Icons.Filled.Lock,
            visualTransformation = if (showPassword) VisualTransformation.None else PasswordVisualTransformation(),
            keyboardOptions = KeyboardOptions(keyboardType = KeyboardType.Password, imeAction = ImeAction.Done),
            isError = mismatch,
            errorText = if (mismatch) "Passwords do not match" else null
        )

        Spacer(Modifier.height(24.dp))
        AyAuthButton(
            text = "Create Account",
            onClick = { viewModel.register(name) },
            loading = uiState is AuthState.Loading,
            enabled = password == confirmPassword && name.isNotBlank(),
            trailingIcon = Icons.AutoMirrored.Filled.ArrowForward
        )
        (uiState as? AuthState.Error)?.let {
            Spacer(Modifier.height(12.dp))
            AyAuthError(it.message)
        }

        Spacer(Modifier.height(24.dp))
        AyAuthOrDivider()
        Spacer(Modifier.height(16.dp))
        AyGoogleButton(onClick = comingSoon)

        Spacer(Modifier.height(20.dp))
        Row(Modifier.fillMaxWidth(), horizontalArrangement = Arrangement.Center, verticalAlignment = Alignment.CenterVertically) {
            Text("Already a member? ", fontFamily = PlusJakartaSans, fontSize = 14.sp, color = c.textSub)
            Text(
                "Sign In",
                modifier = Modifier
                    .clip(androidx.compose.foundation.shape.RoundedCornerShape(6.dp))
                    .clickable(onClick = onNavigateToLogin)
                    .padding(horizontal = 6.dp, vertical = 8.dp),
                fontFamily = PlusJakartaSans, fontWeight = FontWeight.Bold, fontSize = 14.sp, color = c.heading
            )
        }

        Spacer(Modifier.height(16.dp))
        AyAuthAssuranceCard()
        Spacer(Modifier.height(16.dp))
        AyAuthTerms()
    }
}