package com.ayurdhara.core.designsystem.theme

import androidx.compose.foundation.isSystemInDarkTheme
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.darkColorScheme
import androidx.compose.material3.lightColorScheme
import androidx.compose.runtime.Composable
import androidx.compose.runtime.CompositionLocalProvider

private fun AyColors.toScheme() = if (isDark) darkColorScheme(
    primary = accent,
    onPrimary = onGoldFill,
    primaryContainer = chipHigh,
    onPrimaryContainer = text,
    secondary = accent,
    onSecondary = onGoldFill,
    background = canvas,
    onBackground = text,
    surface = canvas,
    onSurface = text,
    surfaceVariant = card,
    onSurfaceVariant = textSub,
    surfaceContainer = card,
    surfaceContainerHigh = chipHigh,
    outline = textMuted,
    outlineVariant = outline,
    error = error
) else lightColorScheme(
    primary = primaryBtn,
    onPrimary = onPrimaryBtn,
    primaryContainer = Shape.primaryFixed,
    onPrimaryContainer = Shape.onPrimaryFixed,
    secondary = accent,
    onSecondary = onGoldFill,
    secondaryContainer = goldFill,
    onSecondaryContainer = onGoldFill,
    background = canvas,
    onBackground = text,
    surface = canvas,
    onSurface = text,
    surfaceVariant = chip,
    onSurfaceVariant = textSub,
    surfaceContainer = chip,
    surfaceContainerHigh = chipHigh,
    outline = textMuted,
    outlineVariant = outline,
    error = error
)

@Composable
fun AyurdharaTheme(
    darkTheme: Boolean = isSystemInDarkTheme(),
    content: @Composable () -> Unit
) {
    val ay = if (darkTheme) AyDarkColors else AyLightColors
    CompositionLocalProvider(
        LocalSpacing provides Spacing(),
        LocalAyColors provides ay
    ) {
        MaterialTheme(
            colorScheme = ay.toScheme(),
            typography = AppTypography,
            shapes = AppShapes,
            content = content
        )
    }
}