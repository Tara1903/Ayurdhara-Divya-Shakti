package com.ayurdhara.core.designsystem.theme

import androidx.compose.material3.Typography
import androidx.compose.ui.text.TextStyle
import androidx.compose.ui.text.font.FontFamily
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.unit.sp

/** Headline face from the Stitch design system (Native Android Serif = Noto Serif). */
val NotoSerif: FontFamily = FontFamily.Serif

/** Body / label face from the Stitch design system (Native Android Sans-Serif). */
val PlusJakartaSans: FontFamily = FontFamily.SansSerif

// Kept for source-compat with older code.
val CormorantGaramond = NotoSerif
val Outfit = PlusJakartaSans

private fun serif(w: FontWeight, size: Int, lh: Int) =
    TextStyle(fontFamily = NotoSerif, fontWeight = w, fontSize = size.sp, lineHeight = lh.sp)

private fun sans(w: FontWeight, size: Int, lh: Int, ls: Double = 0.0) =
    TextStyle(fontFamily = PlusJakartaSans, fontWeight = w, fontSize = size.sp, lineHeight = lh.sp, letterSpacing = ls.sp)

val AppTypography = Typography(
    displayLarge = serif(FontWeight.Bold, 44, 52),
    displayMedium = serif(FontWeight.Bold, 36, 44),
    displaySmall = serif(FontWeight.Bold, 30, 38),
    headlineLarge = serif(FontWeight.Bold, 28, 36),
    headlineMedium = serif(FontWeight.SemiBold, 24, 32),
    headlineSmall = serif(FontWeight.SemiBold, 20, 28),
    titleLarge = serif(FontWeight.SemiBold, 20, 28),
    titleMedium = sans(FontWeight.SemiBold, 16, 24, 0.1),
    titleSmall = sans(FontWeight.SemiBold, 14, 20, 0.1),
    bodyLarge = sans(FontWeight.Normal, 16, 24, 0.2),
    bodyMedium = sans(FontWeight.Normal, 14, 21, 0.2),
    bodySmall = sans(FontWeight.Normal, 12, 18, 0.2),
    labelLarge = sans(FontWeight.SemiBold, 14, 20, 0.1),
    labelMedium = sans(FontWeight.SemiBold, 12, 16, 0.4),
    labelSmall = sans(FontWeight.Bold, 10, 14, 1.0)
)