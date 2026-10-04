package com.ayurdhara.core.designsystem.utils

import android.os.Build
import android.view.HapticFeedbackConstants
import android.view.View
import androidx.compose.runtime.Composable
import androidx.compose.runtime.remember
import androidx.compose.ui.platform.LocalView

class AyurdharaHapticFeedback(private val view: View) {
    private val isEmulator: Boolean = runCatching {
        Build.FINGERPRINT.startsWith("generic") ||
        Build.FINGERPRINT.startsWith("unknown") ||
        Build.MODEL.contains("google_sdk") ||
        Build.MODEL.contains("Emulator") ||
        Build.MODEL.contains("Android SDK built for x86") ||
        Build.HARDWARE.contains("goldfish") ||
        Build.HARDWARE.contains("ranchu") ||
        Build.PRODUCT.contains("sdk") ||
        Build.PRODUCT.contains("google_sdk") ||
        Build.PRODUCT.contains("emu64x")
    }.getOrDefault(false)

    fun light() {
        if (isEmulator) return
        runCatching { view.post { view.performHapticFeedback(HapticFeedbackConstants.KEYBOARD_TAP) } }
    }

    fun medium() {
        if (isEmulator) return
        runCatching { view.post { view.performHapticFeedback(HapticFeedbackConstants.VIRTUAL_KEY) } }
    }

    fun heavy() {
        if (isEmulator) return
        runCatching { view.post { view.performHapticFeedback(HapticFeedbackConstants.LONG_PRESS) } }
    }

    fun selection() {
        if (isEmulator) return
        runCatching { view.post { view.performHapticFeedback(HapticFeedbackConstants.KEYBOARD_TAP) } }
    }

    fun reject() {
        if (isEmulator) return
        runCatching { view.post { view.performHapticFeedback(HapticFeedbackConstants.REJECT) } }
    }
}

@Composable
fun rememberAyurdharaHapticFeedback(): AyurdharaHapticFeedback {
    val view = LocalView.current
    return remember(view) { AyurdharaHapticFeedback(view) }
}