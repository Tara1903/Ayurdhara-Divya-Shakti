package com.ayurdhara.core.designsystem.theme

import androidx.compose.foundation.isSystemInDarkTheme
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.darkColorScheme
import androidx.compose.material3.lightColorScheme
import androidx.compose.runtime.Composable
import androidx.compose.ui.graphics.Color

private val LightColorScheme = lightColorScheme(
    primary = AyurdharaPrimary,
    primaryContainer = AyurdharaPrimaryContainer,
    secondary = AyurdharaSecondary,
    background = AyurdharaBackground,
    surface = AyurdharaSurface,
    surfaceVariant = AyurdharaSurfaceVariant,
    onPrimary = AyurdharaOnPrimary,
    onBackground = AyurdharaOnBackground,
    error = AyurdharaError
)

private val DarkColorScheme = darkColorScheme(
    primary = Color(0xFF81C784), // Lighter Green for Dark Mode
    primaryContainer = Color(0xFF1B3020),
    secondary = Color(0xFFFFD54F),
    background = Color(0xFF121212),
    surface = Color(0xFF1E1E1E),
    surfaceVariant = Color(0xFF2C2C2C),
    onPrimary = Color(0xFF003300),
    onBackground = Color(0xFFE0E0E0),
    error = Color(0xFFCF6679)
)

@Composable
fun AyurdharaTheme(
    darkTheme: Boolean = isSystemInDarkTheme(),
    content: @Composable () -> Unit
) {
    val colorScheme = if (darkTheme) DarkColorScheme else LightColorScheme
    androidx.compose.runtime.CompositionLocalProvider(
        LocalSpacing provides Spacing()
    ) {
        MaterialTheme(
            colorScheme = colorScheme,
            typography = AppTypography,
            shapes = AppShapes,
            content = content
        )
    }
}