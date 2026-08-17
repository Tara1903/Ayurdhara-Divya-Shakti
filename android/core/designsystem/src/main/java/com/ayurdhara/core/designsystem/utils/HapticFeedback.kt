package com.ayurdhara.core.designsystem.utils

import android.view.HapticFeedbackConstants
import android.view.View
import androidx.compose.runtime.Composable
import androidx.compose.runtime.remember
import androidx.compose.ui.platform.LocalView

class AyurdharaHapticFeedback(private val view: View) {
    fun light() {
        view.performHapticFeedback(HapticFeedbackConstants.KEYBOARD_TAP)
    }

    fun medium() {
        view.performHapticFeedback(HapticFeedbackConstants.VIRTUAL_KEY)
    }

    fun heavy() {
        view.performHapticFeedback(HapticFeedbackConstants.LONG_PRESS)
    }

    fun reject() {
        view.performHapticFeedback(HapticFeedbackConstants.REJECT)
    }
}

@Composable
fun rememberAyurdharaHapticFeedback(): AyurdharaHapticFeedback {
    val view = LocalView.current
    return remember(view) { AyurdharaHapticFeedback(view) }
}