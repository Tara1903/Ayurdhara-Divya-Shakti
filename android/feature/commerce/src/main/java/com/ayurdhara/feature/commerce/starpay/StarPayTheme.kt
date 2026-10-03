package com.ayurdhara.feature.commerce.starpay

import androidx.compose.ui.graphics.Brush
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.text.font.FontFamily

object StarPayColors {
    val Surface0 = Color(0xFF020617) // Deep slate near-black
    val Surface1 = Color(0xFF0D1125) // Card surface
    val Surface2 = Color(0xFF161C34) // Elevated card / Quick actions
    val BorderSubtle = Color.White.copy(alpha = 0.08f)
    val BorderHighlight = Color(0xFF8B5CF6).copy(alpha = 0.35f)

    val BrandViolet = Color(0xFF8B5CF6)
    val BrandVioletLight = Color(0xFFA78BFA)
    val BrandCyan = Color(0xFF06B6D4)

    val BrandGradient = Brush.linearGradient(
        listOf(BrandViolet, BrandCyan)
    )

    val BrandVioletSoft = Color(0xFF8B5CF6).copy(alpha = 0.12f)

    // Stitch design tokens
    val Surface3 = Color(0xFF1E2542) // Highest container (inputs, chips on cards)
    val SurfaceLowest = Color(0xFF010309)
    val Cyan = Color(0xFF4CD7F6) // Stitch "secondary" accent
    val CyanSoft = Color(0xFF4CD7F6).copy(alpha = 0.14f)
    val CyanBorder = Color(0xFF4CD7F6).copy(alpha = 0.28f)
    val OnCyan = Color(0xFF00212A)
    val CtaGradient = Brush.horizontalGradient(
        listOf(BrandViolet, BrandVioletLight, Cyan)
    )

    val TextPrimary = Color(0xFFF8FAFC)
    val TextSecondary = Color(0xFF94A3B8)
    val TextMuted = Color(0xFF475569)

    // Status Colors
    val Emerald = Color(0xFF34D399)
    val EmeraldSoft = Color(0xFF34D399).copy(alpha = 0.12f)

    val Amber = Color(0xFFFBBF24)
    val AmberSoft = Color(0xFFFBBF24).copy(alpha = 0.12f)

    val Red = Color(0xFFF87171)
    val RedSoft = Color(0xFFF87171).copy(alpha = 0.12f)
}

object StarPayFonts {
    val Monospace = FontFamily.Monospace
}
