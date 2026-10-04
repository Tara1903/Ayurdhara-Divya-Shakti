package com.ayurdhara.core.designsystem.theme

import androidx.compose.runtime.Composable
import androidx.compose.runtime.staticCompositionLocalOf
import androidx.compose.ui.graphics.Color

/**
 * Semantic colour tokens taken from the Stitch "Ayurdhara Ayurvedic Mobile App" designs.
 * Light = "Vedic Luxury Botanical" (cream + forest green + gold).
 * Dark  = deep forest canvas (#081510) with gold (#D4AF37) accents.
 */
data class AyColors(
    val isDark: Boolean,
    val canvas: Color,
    val bar: Color,
    val card: Color,
    val cardLow: Color,
    val chip: Color,
    val chipHigh: Color,
    val outline: Color,
    val border: Color,
    val text: Color,
    val textSub: Color,
    val textMuted: Color,
    /** Headline colour (forest green in light, cream in dark). */
    val heading: Color,
    /** Gold accent for labels/links/icons (readable on the canvas). */
    val accent: Color,
    val goldFill: Color,
    val onGoldFill: Color,
    /** Primary CTA button (forest green w/ gold text in light, gold w/ forest text in dark). */
    val primaryBtn: Color,
    val onPrimaryBtn: Color,
    val price: Color,
    val heroStart: Color,
    val heroMid: Color,
    val heroEnd: Color,
    val onHero: Color,
    val onHeroSub: Color,
    val bannerBg: Color,
    val onBanner: Color,
    val success: Color,
    val successBg: Color,
    val warning: Color,
    val error: Color,
)

val AyLightColors = AyColors(
    isDark = false,
    canvas = Color(0xFFFCF9F4),
    bar = Color(0xFFFCF9F4),
    card = Color(0xFFFFFFFF),
    cardLow = Color(0xFFF6F3EE),
    chip = Color(0xFFF0EDE9),
    chipHigh = Color(0xFFEBE8E3),
    outline = Color(0xFFC1C8C2),
    border = Color(0xFFE5E2DD),
    text = Color(0xFF1C1C19),
    textSub = Color(0xFF414844),
    textMuted = Color(0xFF717973),
    heading = Color(0xFF1B4332),
    accent = Color(0xFF735C00),
    goldFill = Color(0xFFFFE088),
    onGoldFill = Color(0xFF241A00),
    primaryBtn = Color(0xFF1B4332),
    onPrimaryBtn = Color(0xFFFFE088),
    price = Color(0xFF1B4332),
    heroStart = Color(0xFF012D1D),
    heroMid = Color(0xFF1B4332),
    heroEnd = Color(0xFF2D5A45),
    onHero = Color(0xFFFFFFFF),
    onHeroSub = Color(0xFFC1ECD4),
    bannerBg = Color(0xFF00452E),
    onBanner = Color(0xFFFFFFFF),
    success = Color(0xFF2E7D4F),
    successBg = Color(0xFFD8F0E0),
    warning = Color(0xFFB7791F),
    error = Color(0xFFBA1A1A),
)

val AyDarkColors = AyColors(
    isDark = true,
    canvas = Color(0xFF081510),
    bar = Color(0xFF081510),
    card = Color(0xFF132C22),
    cardLow = Color(0xFF0D221A),
    chip = Color(0xFF132C22),
    chipHigh = Color(0xFF17382B),
    outline = Color(0x40D4AF37),
    border = Color(0x40D4AF37),
    text = Color(0xFFF4EFE6),
    textSub = Color(0xFFA2B6AC),
    textMuted = Color(0xFF8A9E93),
    heading = Color(0xFFF4EFE6),
    accent = Color(0xFFD4AF37),
    goldFill = Color(0xFFD4AF37),
    onGoldFill = Color(0xFF081510),
    primaryBtn = Color(0xFFD4AF37),
    onPrimaryBtn = Color(0xFF081510),
    price = Color(0xFFD4AF37),
    heroStart = Color(0xFF0B2319),
    heroMid = Color(0xFF081510),
    heroEnd = Color(0xFF102D21),
    onHero = Color(0xFFF4EFE6),
    onHeroSub = Color(0xFFA2B6AC),
    bannerBg = Color(0xFF132C22),
    onBanner = Color(0xFFF4EFE6),
    success = Color(0xFF6FCF97),
    successBg = Color(0xFF17382B),
    warning = Color(0xFFFBBF24),
    error = Color(0xFFF87171),
)

val LocalAyColors = staticCompositionLocalOf { AyLightColors }

/** Access the active Ayurdhara colour tokens: `AyTheme.colors.canvas`. */
object AyTheme {
    val colors: AyColors
        @Composable get() = LocalAyColors.current
}