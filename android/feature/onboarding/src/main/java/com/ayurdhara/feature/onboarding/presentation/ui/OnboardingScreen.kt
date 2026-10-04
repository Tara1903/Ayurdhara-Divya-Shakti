package com.ayurdhara.feature.onboarding.presentation.ui

import androidx.compose.animation.animateColorAsState
import androidx.compose.animation.core.animateDpAsState
import androidx.compose.foundation.ExperimentalFoundationApi
import androidx.compose.foundation.background
import androidx.compose.foundation.border
import androidx.compose.foundation.clickable
import androidx.compose.foundation.interaction.MutableInteractionSource
import androidx.compose.foundation.layout.*
import androidx.compose.foundation.pager.HorizontalPager
import androidx.compose.foundation.pager.rememberPagerState
import androidx.compose.foundation.shape.CircleShape
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.automirrored.filled.ArrowForward
import androidx.compose.material.icons.filled.AutoAwesome
import androidx.compose.material.icons.filled.Eco
import androidx.compose.material.icons.filled.LocalShipping
import androidx.compose.material.icons.filled.Science
import androidx.compose.material.icons.filled.Spa
import androidx.compose.material.icons.filled.Verified
import androidx.compose.material.icons.filled.WaterDrop
import androidx.compose.material3.Icon
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.runtime.getValue
import androidx.compose.runtime.remember
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.draw.clip
import androidx.compose.ui.draw.drawBehind
import androidx.compose.ui.draw.rotate
import androidx.compose.ui.draw.shadow
import androidx.compose.ui.geometry.Offset
import androidx.compose.ui.graphics.Brush
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.graphics.drawscope.Stroke
import androidx.compose.ui.graphics.vector.ImageVector
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.text.style.TextAlign
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import androidx.hilt.navigation.compose.hiltViewModel
import com.ayurdhara.core.designsystem.components.AyHeroBrush
import com.ayurdhara.core.designsystem.components.AyLogoMark
import com.ayurdhara.core.designsystem.components.AyPrimaryButton
import com.ayurdhara.core.designsystem.theme.AyTheme
import com.ayurdhara.core.designsystem.theme.NotoSerif
import com.ayurdhara.core.designsystem.theme.PlusJakartaSans
import com.ayurdhara.feature.onboarding.presentation.viewmodel.OnboardingViewModel

private data class OnboardingPage(
    val title: String,
    val description: String,
    val chip: String,
    val topBadge: String,
    val bottomBadge: String,
    val icon: ImageVector?,
    val bottomIcon: ImageVector
)

private val pages = listOf(
    OnboardingPage(
        title = "Pure Ayurveda, Rooted in Tradition",
        description = "Handcrafted cold-pressed oils, raw herbs, and wellness blends certified for absolute purity.",
        chip = "100% Pure Vedic Sourcing",
        topBadge = "100% Certified Vedic Pure",
        bottomBadge = "First Cold Press",
        icon = null, // brand mark
        bottomIcon = Icons.Filled.WaterDrop
    ),
    OnboardingPage(
        title = "Sourced from Sacred Soils",
        description = "Every herb is traced to heritage farms and gathered in season, honouring centuries of Vedic practice.",
        chip = "Ethically Traceable Botanicals",
        topBadge = "Farm-to-Ritual Sourcing",
        bottomBadge = "Wild Harvested",
        icon = Icons.Filled.Eco,
        bottomIcon = Icons.Filled.Spa
    ),
    OnboardingPage(
        title = "Lab-Tested, Delivered with Care",
        description = "Purity verified batch by batch, then carried to your doorstep in sustainable, protective packaging.",
        chip = "Certified Safe & Pure",
        topBadge = "Lab Tested for Purity",
        bottomBadge = "Doorstep Delivery",
        icon = Icons.Filled.Science,
        bottomIcon = Icons.Filled.LocalShipping
    )
)

@OptIn(ExperimentalFoundationApi::class)
@Composable
fun OnboardingScreen(
    onFinish: () -> Unit,
    onSkip: () -> Unit = onFinish,
    viewModel: OnboardingViewModel = hiltViewModel()
) {
    val c = AyTheme.colors
    val pagerState = rememberPagerState(pageCount = { pages.size })

    Column(
        Modifier
            .fillMaxSize()
            .background(c.canvas)
            .drawBehind {
                val ring = c.accent.copy(alpha = if (c.isDark) 0.10f else 0.14f)
                val stroke = Stroke(1.dp.toPx())
                for (i in 1..5) drawCircle(ring, radius = size.width * 0.12f * i, center = Offset(size.width * 0.98f, size.height * 0.02f), style = stroke)
                for (i in 1..4) drawCircle(ring.copy(alpha = ring.alpha * 0.7f), radius = size.width * 0.11f * i, center = Offset(-size.width * 0.05f, size.height * 0.40f), style = stroke)
            }
            .statusBarsPadding()
            .navigationBarsPadding()
            .padding(horizontal = 20.dp)
            .padding(bottom = 16.dp),
        horizontalAlignment = Alignment.CenterHorizontally
    ) {
        // Brand
        Spacer(Modifier.height(8.dp))
        AyLogoMark(44.dp)
        Spacer(Modifier.height(8.dp))
        Row(verticalAlignment = Alignment.CenterVertically) {
            Box(Modifier.width(24.dp).height(1.dp).background(c.accent.copy(alpha = 0.5f)))
            Spacer(Modifier.width(8.dp))
            Text("VEDIC BOTANICALS", fontFamily = PlusJakartaSans, fontWeight = FontWeight.Bold, fontSize = 11.sp, letterSpacing = 2.sp, color = c.accent)
            Spacer(Modifier.width(8.dp))
            Box(Modifier.width(24.dp).height(1.dp).background(c.accent.copy(alpha = 0.5f)))
        }
        Spacer(Modifier.height(12.dp))

        HorizontalPager(state = pagerState, modifier = Modifier.weight(1f)) { page ->
            OnboardingSlide(pages[page])
        }

        // Progress indicator
        Spacer(Modifier.height(16.dp))
        Row(horizontalArrangement = Arrangement.spacedBy(8.dp), verticalAlignment = Alignment.CenterVertically) {
            repeat(pages.size) { i ->
                val active = pagerState.currentPage == i
                val width by animateDpAsState(if (active) 28.dp else 6.dp, label = "dotWidth")
                val color by animateColorAsState(if (active) c.accent else c.outline.copy(alpha = 0.6f), label = "dotColor")
                Box(Modifier.height(6.dp).width(width).background(color, RoundedCornerShape(50)))
            }
        }
        Spacer(Modifier.height(20.dp))

        // Actions
        AyPrimaryButton(
            text = "Begin Wellness Journey",
            onClick = {
                viewModel.completeOnboarding()
                onFinish()
            },
            modifier = Modifier.fillMaxWidth(),
            trailingIcon = Icons.AutoMirrored.Filled.ArrowForward,
            height = 56.dp
        )
        Spacer(Modifier.height(4.dp))
        Box(
            Modifier
                .fillMaxWidth()
                .clickable(interactionSource = remember { MutableInteractionSource() }, indication = null) {
                    viewModel.completeOnboarding()
                    onSkip()
                }
                .padding(vertical = 12.dp),
            contentAlignment = Alignment.Center
        ) {
            Text("Skip to Explore", fontFamily = PlusJakartaSans, fontWeight = FontWeight.Medium, fontSize = 15.sp, color = c.textSub)
        }
    }
}

@Composable
private fun OnboardingSlide(page: OnboardingPage) {
    val c = AyTheme.colors
    Column(
        Modifier.fillMaxSize(),
        horizontalAlignment = Alignment.CenterHorizontally
    ) {
        // Hero visual
        val heroShape = RoundedCornerShape(24.dp)
        Box(
            Modifier
                .fillMaxWidth()
                .weight(1f)
                .heightIn(min = 140.dp, max = 340.dp)
                .clip(heroShape)
                .background(AyHeroBrush(), heroShape)
                .then(if (c.isDark) Modifier.border(1.dp, c.border, heroShape) else Modifier)
                .drawBehind {
                    val gold = c.goldFill
                    val centre = Offset(size.width / 2f, size.height / 2f)
                    drawCircle(
                        Brush.radialGradient(listOf(gold.copy(alpha = 0.30f), Color.Transparent), center = centre, radius = size.minDimension * 0.62f),
                        radius = size.minDimension * 0.62f, center = centre
                    )
                    val stroke = Stroke(1.dp.toPx())
                    for (i in 1..4) drawCircle(gold.copy(alpha = 0.16f), radius = size.minDimension * (0.22f + 0.13f * i), center = centre, style = stroke)
                    // gentle depth: green wash toward the bottom
                    drawRect(Brush.verticalGradient(listOf(Color.Transparent, c.heroStart.copy(alpha = 0.45f))))
                }
        ) {
            // decorative leaves
            Icon(Icons.Filled.Eco, null, tint = c.goldFill.copy(alpha = 0.35f), modifier = Modifier.align(Alignment.CenterStart).padding(start = 22.dp).size(30.dp).rotate(-25f))
            Icon(Icons.Filled.Spa, null, tint = c.goldFill.copy(alpha = 0.35f), modifier = Modifier.align(Alignment.CenterEnd).padding(end = 22.dp).size(30.dp).rotate(15f))

            // centre emblem
            Box(
                Modifier
                    .align(Alignment.Center)
                    .size(132.dp)
                    .shadow(10.dp, CircleShape)
                    .background(c.canvas, CircleShape)
                    .border(2.dp, c.goldFill, CircleShape),
                contentAlignment = Alignment.Center
            ) {
                if (page.icon == null) AyLogoMark(78.dp)
                else Icon(page.icon, null, tint = if (c.isDark) c.accent else c.heading, modifier = Modifier.size(64.dp))
            }

            // top-left badge
            Row(
                Modifier
                    .align(Alignment.TopStart)
                    .padding(16.dp)
                    .shadow(4.dp, RoundedCornerShape(50))
                    .background(c.card.copy(alpha = 0.95f), RoundedCornerShape(50))
                    .padding(horizontal = 12.dp, vertical = 6.dp),
                verticalAlignment = Alignment.CenterVertically
            ) {
                Icon(Icons.Filled.Eco, null, tint = c.accent, modifier = Modifier.size(15.dp))
                Spacer(Modifier.width(6.dp))
                Text(page.topBadge, fontFamily = PlusJakartaSans, fontWeight = FontWeight.Bold, fontSize = 12.sp, color = c.accent, maxLines = 1)
            }

            // bottom-right badge
            Row(
                Modifier
                    .align(Alignment.BottomEnd)
                    .padding(16.dp)
                    .background(c.heroEnd.copy(alpha = 0.92f), RoundedCornerShape(50))
                    .border(1.dp, c.goldFill.copy(alpha = 0.5f), RoundedCornerShape(50))
                    .padding(horizontal = 10.dp, vertical = 5.dp),
                verticalAlignment = Alignment.CenterVertically
            ) {
                Icon(page.bottomIcon, null, tint = c.goldFill, modifier = Modifier.size(13.dp))
                Spacer(Modifier.width(4.dp))
                Text(page.bottomBadge, fontFamily = PlusJakartaSans, fontWeight = FontWeight.SemiBold, fontSize = 11.sp, color = c.onHero, maxLines = 1)
            }
        }

        Spacer(Modifier.height(16.dp))

        // Tag chip
        Row(
            Modifier
                .background(c.chipHigh.copy(alpha = 0.8f), RoundedCornerShape(50))
                .padding(horizontal = 12.dp, vertical = 5.dp),
            verticalAlignment = Alignment.CenterVertically
        ) {
            Icon(if (page.icon == null) Icons.Filled.AutoAwesome else Icons.Filled.Verified, null, tint = c.accent, modifier = Modifier.size(14.dp))
            Spacer(Modifier.width(6.dp))
            Text(page.chip.uppercase(), fontFamily = PlusJakartaSans, fontWeight = FontWeight.Bold, fontSize = 11.sp, letterSpacing = 0.8.sp, color = c.accent, maxLines = 1)
        }

        Spacer(Modifier.height(12.dp))
        Text(
            page.title,
            fontFamily = NotoSerif, fontWeight = FontWeight.SemiBold, fontSize = 28.sp, lineHeight = 36.sp,
            color = c.heading, textAlign = TextAlign.Center
        )
        Spacer(Modifier.height(8.dp))
        Text(
            page.description,
            modifier = Modifier.widthIn(max = 320.dp),
            fontFamily = PlusJakartaSans, fontSize = 15.sp, lineHeight = 23.sp,
            color = c.textSub, textAlign = TextAlign.Center
        )
    }
}