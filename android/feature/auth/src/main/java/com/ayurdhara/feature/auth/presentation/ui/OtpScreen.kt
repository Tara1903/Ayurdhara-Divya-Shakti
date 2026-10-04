package com.ayurdhara.feature.auth.presentation.ui

import androidx.compose.foundation.clickable
import androidx.compose.foundation.layout.*
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.automirrored.filled.ArrowForward
import androidx.compose.material.icons.filled.LockOpen
import androidx.compose.material.icons.filled.Schedule
import androidx.compose.material3.Icon
import androidx.compose.material3.Text
import androidx.compose.runtime.*
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import androidx.hilt.navigation.compose.hiltViewModel
import com.ayurdhara.core.designsystem.components.*
import com.ayurdhara.core.designsystem.theme.AyTheme
import com.ayurdhara.core.designsystem.theme.PlusJakartaSans
import com.ayurdhara.feature.auth.presentation.viewmodel.AuthState
import com.ayurdhara.feature.auth.presentation.viewmodel.AuthViewModel
import kotlinx.coroutines.delay

private const val OTP_LENGTH = 6
private const val RESEND_SECONDS = 30

@Composable
fun OtpScreen(
    onNavigateToReset: () -> Unit,
    onBack: (() -> Unit)? = null,
    viewModel: AuthViewModel = hiltViewModel()
) {
    val c = AyTheme.colors
    val uiState by viewModel.uiState.collectAsState()
    val back = onBack ?: rememberAyBack()
    val comingSoon = rememberAyComingSoon()

    var otp by remember { mutableStateOf("") }
    var secondsLeft by remember { mutableIntStateOf(RESEND_SECONDS) }
    var timerKey by remember { mutableIntStateOf(0) }

    LaunchedEffect(timerKey) {
        secondsLeft = RESEND_SECONDS
        while (secondsLeft > 0) {
            delay(1000)
            secondsLeft--
        }
    }

    LaunchedEffect(uiState) {
        if (uiState is AuthState.Success) {
            onNavigateToReset()
            viewModel.resetState()
        }
    }

    val isError = uiState is AuthState.Error
    val loading = uiState is AuthState.Loading

    AyAuthScaffold(title = "Auth Verification", onBack = back) {
        AyAuthStepPill(step = 2, total = 2)
        Spacer(Modifier.height(20.dp))
        AyAuthBrandHeader()
        Spacer(Modifier.height(24.dp))
        AyAuthTitle(
            title = "Verify Your Code",
            subtitle = "We sent a 6-digit verification code to keep your wellness profile secure."
        )
        Spacer(Modifier.height(24.dp))

        // OTP card
        Column(
            Modifier
                .fillMaxWidth()
                .ayCard(RoundedCornerShape(24.dp))
                .padding(16.dp)
        ) {
            Row(Modifier.fillMaxWidth(), verticalAlignment = Alignment.CenterVertically) {
                Icon(Icons.Filled.LockOpen, null, tint = c.accent, modifier = Modifier.size(18.dp))
                Spacer(Modifier.width(6.dp))
                Text(
                    "Enter 6-digit OTP code", Modifier.weight(1f),
                    fontFamily = PlusJakartaSans, fontWeight = FontWeight.SemiBold, fontSize = 14.sp, color = c.text, maxLines = 1
                )
                Text(
                    "EDIT EMAIL",
                    modifier = Modifier.clickable(onClick = back).padding(4.dp),
                    fontFamily = PlusJakartaSans, fontWeight = FontWeight.Bold, fontSize = 11.sp, letterSpacing = 1.sp, color = c.accent
                )
            }
            Spacer(Modifier.height(16.dp))
            AyOtpField(
                value = otp,
                onValueChange = {
                    otp = it
                    if (uiState is AuthState.Error) viewModel.resetState()
                },
                length = OTP_LENGTH,
                isError = isError
            )
            Spacer(Modifier.height(16.dp))
            Row(Modifier.fillMaxWidth(), verticalAlignment = Alignment.CenterVertically) {
                Icon(Icons.Filled.Schedule, null, tint = c.accent, modifier = Modifier.size(16.dp))
                Spacer(Modifier.width(6.dp))
                if (secondsLeft > 0) {
                    Text(
                        "Resend in ", fontFamily = PlusJakartaSans, fontWeight = FontWeight.Medium, fontSize = 12.sp, color = c.accent
                    )
                    Text(
                        "00:%02d".format(secondsLeft),
                        fontFamily = PlusJakartaSans, fontWeight = FontWeight.Bold, fontSize = 12.sp, color = c.text
                    )
                } else {
                    Text(
                        "Resend code",
                        modifier = Modifier.clickable {
                            otp = ""
                            viewModel.sendOtp()
                            timerKey++
                        },
                        fontFamily = PlusJakartaSans, fontWeight = FontWeight.Bold, fontSize = 12.sp, color = c.heading
                    )
                }
            }
        }

        Spacer(Modifier.height(24.dp))
        AyAuthButton(
            text = "Verify & Proceed",
            onClick = { viewModel.verifyOtp(otp) },
            loading = loading,
            enabled = otp.length == OTP_LENGTH,
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
        AyAuthAssuranceCard()
        Spacer(Modifier.height(16.dp))
        AyAuthTerms()
    }
}