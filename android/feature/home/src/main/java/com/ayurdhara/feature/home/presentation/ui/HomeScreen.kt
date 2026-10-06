package com.ayurdhara.feature.home.presentation.ui

import android.widget.Toast
import androidx.compose.animation.AnimatedVisibility
import androidx.compose.animation.core.*
import androidx.compose.foundation.background
import androidx.compose.foundation.border
import androidx.compose.foundation.clickable
import androidx.compose.foundation.layout.*
import androidx.compose.foundation.lazy.LazyColumn
import androidx.compose.foundation.lazy.LazyRow
import androidx.compose.foundation.lazy.items
import androidx.compose.foundation.shape.CircleShape
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.foundation.text.KeyboardOptions
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.automirrored.filled.ArrowForward
import androidx.compose.material.icons.automirrored.filled.KeyboardArrowRight
import androidx.compose.material.icons.filled.*
import androidx.compose.material.icons.outlined.FavoriteBorder
import androidx.compose.material3.*
import androidx.compose.runtime.*
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.draw.alpha
import androidx.compose.ui.draw.clip
import androidx.compose.ui.draw.scale
import androidx.compose.ui.graphics.Brush
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.graphics.vector.ImageVector
import androidx.compose.ui.layout.ContentScale
import androidx.compose.ui.platform.LocalContext
import androidx.compose.ui.text.font.FontStyle
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.text.input.KeyboardType
import androidx.compose.ui.text.style.TextAlign
import androidx.compose.ui.text.style.TextDecoration
import androidx.compose.ui.text.style.TextOverflow
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import androidx.hilt.navigation.compose.hiltViewModel
import com.ayurdhara.core.common.domain.model.Product
import com.ayurdhara.core.common.result.UiState
import com.ayurdhara.core.designsystem.components.AyAvatar
import com.ayurdhara.core.designsystem.components.AyImage
import com.ayurdhara.core.designsystem.components.AyOutlineButton
import com.ayurdhara.core.designsystem.components.ayCard
import com.ayurdhara.core.designsystem.theme.AyTheme
import com.ayurdhara.core.designsystem.theme.NotoSerif
import com.ayurdhara.core.designsystem.theme.PlusJakartaSans
import com.ayurdhara.core.designsystem.utils.rememberAyurdharaHapticFeedback
import com.ayurdhara.feature.home.presentation.viewmodel.HomeViewModel

private enum class VidhiTab(val label: String, val icon: ImageVector, val keywords: List<String>) {
    ALL("All Vidhis", Icons.Filled.AllInclusive, emptyList()),
    GHANI("Wood Ghani Oils", Icons.Filled.Opacity, listOf("oil", "tailam", "sesame", "bhringraj", "mustard", "ghani")),
    CHURNAS("Pure Churnas", Icons.Filled.LocalFlorist, listOf("churna", "powder", "ashwagandha", "triphala", "shatavari", "herb", "root")),
    RASAYANA("Rasayana & Ojas", Icons.Filled.Spa, listOf("rasayana", "ojas", "chyawanprash", "kwath", "vitality", "honey", "immunity")),
    SHILAJIT("Temple Shilajit", Icons.Filled.AutoAwesome, listOf("shilajit", "gold", "kesar", "saffron", "resin"))
}

private data class ArchedVidhi(
    val badge: String,
    val title: String,
    val sub: String,
    val icon: ImageVector,
    val tab: VidhiTab
)

private val archedVidhis = listOf(
    ArchedVidhi("Ghani", "Pure Oils", "Tailam", Icons.Filled.Opacity, VidhiTab.GHANI),
    ArchedVidhi("Ayur", "Roots & Herbs", "Churnas", Icons.Filled.LocalFlorist, VidhiTab.CHURNAS),
    ArchedVidhi("Vitality", "Ojas & Kwath", "Rasayana", Icons.Filled.Spa, VidhiTab.RASAYANA),
    ArchedVidhi("Pure", "Kesar & Gold", "Shilajit", Icons.Filled.AutoAwesome, VidhiTab.SHILAJIT)
)

private fun Product.matchesVidhi(tab: VidhiTab): Boolean {
    if (tab == VidhiTab.ALL) return true
    val text = (listOfNotNull(title, shortDescription, primaryBenefit, category) + categories).joinToString(" ").lowercase()
    return tab.keywords.any { it in text }
}

@Composable
fun HomeScreen(
    viewModel: HomeViewModel = hiltViewModel(),
    onAddToCart: (Product) -> Unit = {},
    onUpdateCartQuantity: (Product, Int) -> Unit = { _, _ -> },
    cartQuantities: Map<String, Int> = emptyMap(),
    onProductClick: (String) -> Unit = {},
    onShopClick: () -> Unit = {},
    onCartClick: () -> Unit = {},
    userName: String? = null,
    onSearchClick: () -> Unit = {},
    onProfileClick: () -> Unit = {},
    onCategoryClick: (String) -> Unit = { onShopClick() }
) {
    val uiState by viewModel.uiState.collectAsState()
    val deliveryPincode by viewModel.deliveryPincode.collectAsState()
    val c = AyTheme.colors
    val context = LocalContext.current
    val haptic = rememberAyurdharaHapticFeedback()

    var selectedTab by remember { mutableStateOf(VidhiTab.ALL) }
    var wishlistIds by remember { mutableStateOf(setOf<String>()) }
    var showPincodeDialog by remember { mutableStateOf(false) }
    var pincodeInput by remember(deliveryPincode) { mutableStateOf(deliveryPincode.orEmpty()) }
    var showDoshaQuizDialog by remember { mutableStateOf(false) }

    // Breathing pulse for sacred aura
    val infiniteTransition = rememberInfiniteTransition(label = "AuraBreathing")
    val auraScale by infiniteTransition.animateFloat(
        initialValue = 1f,
        targetValue = 1.06f,
        animationSpec = infiniteRepeatable(
            animation = tween(3800, easing = FastOutSlowInEasing),
            repeatMode = RepeatMode.Reverse
        ),
        label = "AuraScale"
    )
    val auraAlpha by infiniteTransition.animateFloat(
        initialValue = 0.15f,
        targetValue = 0.35f,
        animationSpec = infiniteRepeatable(
            animation = tween(3800, easing = FastOutSlowInEasing),
            repeatMode = RepeatMode.Reverse
        ),
        label = "AuraAlpha"
    )

    val cleanName = userName?.trim()?.takeIf { it.isNotBlank() }
    val greetingSubtitle = if (!cleanName.isNullOrBlank()) "Namaste, $cleanName" else "Divya Shakti • Pure Ayurvedic Formulations"

    Column(
        modifier = Modifier
            .fillMaxSize()
            .background(c.canvas)
    ) {
        // ── BESPOKE LUXURY VEDIC HEADER (Both Dark Sanctuary & Light Botanical) ──
        Surface(
            color = c.bar,
            tonalElevation = 2.dp,
            shadowElevation = if (c.isDark) 8.dp else 2.dp,
            modifier = Modifier.fillMaxWidth()
        ) {
            Column(
                modifier = Modifier
                    .fillMaxWidth()
                    .statusBarsPadding()
                    .padding(horizontal = 16.dp, vertical = 10.dp)
            ) {
                // Top Brand Crest Row
                Row(
                    modifier = Modifier.fillMaxWidth(),
                    horizontalArrangement = Arrangement.SpaceBetween,
                    verticalAlignment = Alignment.CenterVertically
                ) {
                    // Crest + Vedic Wordmark
                    Row(
                        verticalAlignment = Alignment.CenterVertically,
                        horizontalArrangement = Arrangement.spacedBy(10.dp)
                    ) {
                        // Sacred Lotus Crest
                        Box(
                            modifier = Modifier
                                .size(40.dp)
                                .clip(CircleShape)
                                .background(
                                    Brush.linearGradient(
                                        listOf(
                                            if (c.isDark) Color(0xFF1C2E25) else Color(0xFF1B4332),
                                            if (c.isDark) Color(0xFF07130E) else Color(0xFF012D1D)
                                        )
                                    )
                                )
                                .border(1.dp, c.accent.copy(alpha = 0.5f), CircleShape),
                            contentAlignment = Alignment.Center
                        ) {
                            Icon(
                                Icons.Filled.Spa,
                                contentDescription = "Ayurdhara Crest",
                                tint = if (c.isDark) Color(0xFFF2CA50) else Color(0xFFFED65B),
                                modifier = Modifier.size(22.dp)
                            )
                        }

                        Column {
                            Row(
                                verticalAlignment = Alignment.CenterVertically,
                                horizontalArrangement = Arrangement.spacedBy(6.dp)
                            ) {
                                Text(
                                    "AYURDHARA",
                                    fontFamily = NotoSerif,
                                    fontWeight = FontWeight.Bold,
                                    fontSize = 18.sp,
                                    letterSpacing = 0.5.sp,
                                    color = c.heading
                                )
                                Box(
                                    modifier = Modifier
                                        .clip(RoundedCornerShape(4.dp))
                                        .background(c.accent.copy(alpha = 0.15f))
                                        .border(1.dp, c.accent.copy(alpha = 0.4f), RoundedCornerShape(4.dp))
                                        .padding(horizontal = 6.dp, vertical = 1.dp)
                                ) {
                                    Text(
                                        "VEDA",
                                        fontFamily = PlusJakartaSans,
                                        fontWeight = FontWeight.ExtraBold,
                                        fontSize = 9.sp,
                                        letterSpacing = 1.5.sp,
                                        color = c.accent
                                    )
                                }
                            }
                            Text(
                                greetingSubtitle,
                                fontFamily = PlusJakartaSans,
                                fontSize = 10.5.sp,
                                color = c.textSub,
                                maxLines = 1,
                                overflow = TextOverflow.Ellipsis
                            )
                        }
                    }

                    // Wallet Credits & Profile Avatar
                    Row(
                        verticalAlignment = Alignment.CenterVertically,
                        horizontalArrangement = Arrangement.spacedBy(8.dp)
                    ) {
                        // Wallet Pill
                        Row(
                            modifier = Modifier
                                .clip(RoundedCornerShape(50))
                                .background(if (c.isDark) Color(0xFF111E19) else Color(0xFFF6F3EE))
                                .border(1.dp, c.accent.copy(alpha = 0.35f), RoundedCornerShape(50))
                                .clickable {
                                    Toast.makeText(context, "Ayurdhara Vedic Credits: ₹50", Toast.LENGTH_SHORT).show()
                                }
                                .padding(horizontal = 10.dp, vertical = 5.dp),
                            verticalAlignment = Alignment.CenterVertically,
                            horizontalArrangement = Arrangement.spacedBy(4.dp)
                        ) {
                            Text(
                                "₹",
                                fontFamily = NotoSerif,
                                fontWeight = FontWeight.Bold,
                                fontSize = 11.sp,
                                color = c.accent
                            )
                            Text(
                                "50",
                                fontFamily = PlusJakartaSans,
                                fontWeight = FontWeight.Bold,
                                fontSize = 11.sp,
                                color = c.text
                            )
                            Text(
                                "Credits",
                                fontFamily = PlusJakartaSans,
                                fontSize = 9.5.sp,
                                color = c.textMuted
                            )
                        }

                        // Avatar
                        Box(
                            modifier = Modifier
                                .size(34.dp)
                                .clip(CircleShape)
                                .background(c.card)
                                .border(1.5.dp, c.accent.copy(alpha = 0.6f), CircleShape)
                                .clickable(onClick = onProfileClick),
                            contentAlignment = Alignment.Center
                        ) {
                            AyAvatar(size = 32.dp, onClick = onProfileClick)
                        }
                    }
                }

                // Subtle Provenance & Location Bar (No demo city, dynamic Pincode)
                Row(
                    modifier = Modifier
                        .fillMaxWidth()
                        .padding(top = 8.dp),
                    horizontalArrangement = Arrangement.SpaceBetween,
                    verticalAlignment = Alignment.CenterVertically
                ) {
                    Row(
                        modifier = Modifier
                            .clickable {
                                haptic.selection()
                                pincodeInput = deliveryPincode.orEmpty()
                                showPincodeDialog = true
                            },
                        verticalAlignment = Alignment.CenterVertically,
                        horizontalArrangement = Arrangement.spacedBy(4.dp)
                    ) {
                        Icon(
                            Icons.Filled.LocationOn,
                            contentDescription = null,
                            tint = c.accent,
                            modifier = Modifier.size(14.dp)
                        )
                        Text(
                            "Delivering to",
                            fontFamily = PlusJakartaSans,
                            fontSize = 11.sp,
                            color = c.textSub
                        )
                        Text(
                            text = if (!deliveryPincode.isNullOrBlank()) "$deliveryPincode • Pan-India" else "Deliver Pan-India • Set Pincode",
                            fontFamily = PlusJakartaSans,
                            fontWeight = FontWeight.SemiBold,
                            fontSize = 11.sp,
                            color = c.text,
                            textDecoration = TextDecoration.Underline
                        )
                        Icon(
                            Icons.Filled.ExpandMore,
                            contentDescription = null,
                            tint = c.accent,
                            modifier = Modifier.size(14.dp)
                        )
                    }

                    Text(
                        "Artisanal Ghani Batch No. 108",
                        fontFamily = PlusJakartaSans,
                        fontStyle = FontStyle.Italic,
                        fontSize = 10.sp,
                        color = c.textMuted
                    )
                }

                // Sophisticated Vedic Herbal Search Bar
                Spacer(Modifier.height(8.dp))
                Row(
                    modifier = Modifier
                        .fillMaxWidth()
                        .height(42.dp)
                        .clip(RoundedCornerShape(12.dp))
                        .background(if (c.isDark) Color(0xFF0F221B) else Color(0xFFFFFFFF))
                        .border(1.dp, c.accent.copy(alpha = 0.3f), RoundedCornerShape(12.dp))
                        .clickable(onClick = onSearchClick)
                        .padding(horizontal = 12.dp),
                    verticalAlignment = Alignment.CenterVertically,
                    horizontalArrangement = Arrangement.spacedBy(8.dp)
                ) {
                    Icon(
                        Icons.Filled.Search,
                        contentDescription = "Search",
                        tint = c.accent.copy(alpha = 0.85f),
                        modifier = Modifier.size(18.dp)
                    )
                    Text(
                        "Search botanical formulations, tailam, churnas, rasayana...",
                        fontFamily = PlusJakartaSans,
                        fontSize = 11.5.sp,
                        color = c.textMuted,
                        maxLines = 1,
                        overflow = TextOverflow.Ellipsis,
                        modifier = Modifier.weight(1f)
                    )
                    Icon(
                        if (c.isDark) Icons.Filled.FilterVintage else Icons.Filled.Mic,
                        contentDescription = null,
                        tint = c.accent,
                        modifier = Modifier.size(17.dp)
                    )
                }
            }

            // Sacred Vedic Ritual Navigation Tabs (With gold active indicator)
            LazyRow(
                modifier = Modifier
                    .fillMaxWidth()
                    .background(if (c.isDark) Color(0xFF07140E) else Color(0xFFF6F3EE).copy(alpha = 0.6f))
                    .padding(horizontal = 16.dp, vertical = 2.dp),
                horizontalArrangement = Arrangement.spacedBy(20.dp)
            ) {
                items(VidhiTab.values()) { tab ->
                    val isSelected = selectedTab == tab
                    Column(
                        modifier = Modifier
                            .clickable {
                                haptic.selection()
                                selectedTab = tab
                            }
                            .padding(vertical = 6.dp),
                        horizontalAlignment = Alignment.CenterHorizontally
                    ) {
                        Row(
                            verticalAlignment = Alignment.CenterVertically,
                            horizontalArrangement = Arrangement.spacedBy(5.dp)
                        ) {
                            Icon(
                                tab.icon,
                                contentDescription = tab.label,
                                tint = if (isSelected) c.accent else c.textMuted,
                                modifier = Modifier.size(14.dp)
                            )
                            Text(
                                tab.label,
                                fontFamily = PlusJakartaSans,
                                fontWeight = if (isSelected) FontWeight.Bold else FontWeight.Medium,
                                fontSize = 11.sp,
                                color = if (isSelected) c.accent else c.textMuted
                            )
                        }
                        Spacer(Modifier.height(4.dp))
                        Box(
                            modifier = Modifier
                                .width(if (isSelected) 36.dp else 0.dp)
                                .height(2.dp)
                                .clip(RoundedCornerShape(50))
                                .background(if (isSelected) c.accent else Color.Transparent)
                        )
                    }
                }
            }
        }

        // ── SCROLLABLE HOME CONTENT ──
        LazyColumn(
            modifier = Modifier.fillMaxSize(),
            contentPadding = PaddingValues(start = 16.dp, end = 16.dp, top = 16.dp, bottom = 32.dp),
            verticalArrangement = Arrangement.spacedBy(20.dp)
        ) {
            // SECTION 1: Curated Consecration / Seasonal Harvest Spotlight (Hero Feature)
            item {
                Box(
                    modifier = Modifier
                        .fillMaxWidth()
                        .clip(RoundedCornerShape(18.dp))
                        .background(
                            Brush.linearGradient(
                                listOf(
                                    if (c.isDark) Color(0xFF1B2B22) else Color(0xFF012D1D),
                                    if (c.isDark) Color(0xFF112119) else Color(0xFF1B4332),
                                    if (c.isDark) Color(0xFF0A1611) else Color(0xFF2D5A45)
                                )
                            )
                        )
                        .border(1.dp, c.accent.copy(alpha = 0.4f), RoundedCornerShape(18.dp))
                        .padding(16.dp)
                ) {
                    // Soft background glow
                    Box(
                        modifier = Modifier
                            .align(Alignment.TopEnd)
                            .offset(x = 20.dp, y = (-20).dp)
                            .size(140.dp)
                            .scale(auraScale)
                            .alpha(auraAlpha)
                            .background(c.accent, CircleShape)
                    )

                    Column {
                        // Top badges
                        Row(
                            modifier = Modifier.fillMaxWidth(),
                            horizontalArrangement = Arrangement.SpaceBetween,
                            verticalAlignment = Alignment.CenterVertically
                        ) {
                            Row(
                                verticalAlignment = Alignment.CenterVertically,
                                horizontalArrangement = Arrangement.spacedBy(6.dp)
                            ) {
                                Box(
                                    modifier = Modifier
                                        .size(6.dp)
                                        .clip(CircleShape)
                                        .background(c.accent)
                                )
                                Text(
                                    "SACRED ASHWINA HARVEST",
                                    fontFamily = PlusJakartaSans,
                                    fontWeight = FontWeight.Bold,
                                    fontSize = 10.sp,
                                    letterSpacing = 1.sp,
                                    color = c.accent
                                )
                            }
                            Box(
                                modifier = Modifier
                                    .clip(RoundedCornerShape(50))
                                    .background(Color.Black.copy(alpha = 0.4f))
                                    .border(1.dp, c.accent.copy(alpha = 0.3f), RoundedCornerShape(50))
                                    .padding(horizontal = 8.dp, vertical = 2.dp)
                            ) {
                                Text(
                                    "• Vedic Consecrated",
                                    fontFamily = PlusJakartaSans,
                                    fontSize = 9.5.sp,
                                    color = if (c.isDark) Color(0xFFA2B6AC) else Color(0xFFC1ECD4)
                                )
                            }
                        }

                        Spacer(Modifier.height(10.dp))

                        Row(
                            modifier = Modifier.fillMaxWidth(),
                            verticalAlignment = Alignment.CenterVertically,
                            horizontalArrangement = Arrangement.spacedBy(12.dp)
                        ) {
                            Column(modifier = Modifier.weight(1f)) {
                                Text(
                                    "Wood Ghani Cold-Pressed Tailam",
                                    fontFamily = NotoSerif,
                                    fontWeight = FontWeight.Bold,
                                    fontSize = 17.sp,
                                    lineHeight = 22.sp,
                                    color = Color(0xFFF4EFE6)
                                )
                                Spacer(Modifier.height(4.dp))
                                Text(
                                    "Extracted slowly in neem-wood mortars at <38°C to retain living prana and natural medicinal terpenes.",
                                    fontFamily = PlusJakartaSans,
                                    fontSize = 11.5.sp,
                                    lineHeight = 16.sp,
                                    color = if (c.isDark) Color(0xFFACCEBD) else Color(0xFFC1ECD4),
                                    maxLines = 2,
                                    overflow = TextOverflow.Ellipsis
                                )
                                Spacer(Modifier.height(12.dp))
                                Row(
                                    verticalAlignment = Alignment.CenterVertically,
                                    horizontalArrangement = Arrangement.spacedBy(10.dp)
                                ) {
                                    Box(
                                        modifier = Modifier
                                            .clip(RoundedCornerShape(8.dp))
                                            .background(
                                                Brush.horizontalGradient(
                                                    listOf(Color(0xFFD4AF37), Color(0xFFE7C268))
                                                )
                                            )
                                            .clickable {
                                                haptic.medium()
                                                onCategoryClick("cold-pressed-oils")
                                            }
                                            .padding(horizontal = 12.dp, vertical = 7.dp)
                                    ) {
                                        Text(
                                            "Explore Batch 108",
                                            fontFamily = PlusJakartaSans,
                                            fontWeight = FontWeight.Bold,
                                            fontSize = 11.sp,
                                            color = Color(0xFF091611)
                                        )
                                    }
                                    Row(
                                        verticalAlignment = Alignment.CenterVertically,
                                        horizontalArrangement = Arrangement.spacedBy(3.dp)
                                    ) {
                                        Icon(
                                            Icons.Filled.Verified,
                                            contentDescription = null,
                                            tint = c.accent,
                                            modifier = Modifier.size(13.dp)
                                        )
                                        Text(
                                            "Haridwar Ashram",
                                            fontFamily = PlusJakartaSans,
                                            fontWeight = FontWeight.Medium,
                                            fontSize = 10.sp,
                                            color = Color(0xFFD0C5AF)
                                        )
                                    }
                                }
                            }

                            // Artisanal Thumbnail with breathing border aura
                            Box(
                                modifier = Modifier
                                    .width(82.dp)
                                    .height(98.dp)
                                    .clip(RoundedCornerShape(12.dp))
                                    .background(Color(0xFF091611))
                                    .border(1.dp, c.accent.copy(alpha = 0.5f), RoundedCornerShape(12.dp))
                            ) {
                                AyImage(
                                    url = "https://lh3.googleusercontent.com/aida-public/AB6AXuChgoVx7iKSTYuYhbMpYYbRF9g8XyqMgriHRQaMSdPF_RbUd_vJnzJdSJy5rFu-wchtkCxXPoZDDTv9DlQeB_z3aDwmsg0l1yPEp5D_87YcLDjYArOpO5M4N_mv0CvP_yf3Afr08gjpdjOcwgy5-JTN4BJf8y9MNJG2tWdPyC0laqSJr0ld80WbaQ36SDoICq4xW6WBIrD0IK-j5POzVXCkOXSI2-QqLUXnK86xg6ZrC1m6F_1drQ2y",
                                    contentDescription = "Wood Ghani Oil",
                                    modifier = Modifier.fillMaxSize(),
                                    contentScale = ContentScale.Crop
                                )
                                Box(
                                    modifier = Modifier
                                        .align(Alignment.BottomCenter)
                                        .fillMaxWidth()
                                        .background(Color(0xFF091611).copy(alpha = 0.85f))
                                        .padding(vertical = 2.dp),
                                    contentAlignment = Alignment.Center
                                ) {
                                    Text(
                                        "100% RAW",
                                        fontFamily = PlusJakartaSans,
                                        fontWeight = FontWeight.Bold,
                                        fontSize = 8.sp,
                                        color = Color(0xFFF2CA50)
                                    )
                                }
                            }
                        }
                    }
                }
            }

            // SECTION 2: Ritual by Dosha & Sacred Needs (4 Arched Aesthetic Cards)
            item {
                Column(verticalArrangement = Arrangement.spacedBy(10.dp)) {
                    Row(
                        modifier = Modifier.fillMaxWidth(),
                        horizontalArrangement = Arrangement.SpaceBetween,
                        verticalAlignment = Alignment.Bottom
                    ) {
                        Column {
                            Text(
                                "Sacred Formulations by Vidhi",
                                fontFamily = NotoSerif,
                                fontWeight = FontWeight.Bold,
                                fontSize = 17.sp,
                                color = c.heading
                            )
                            Text(
                                "Rooted in Charaka Samhita scriptures",
                                fontFamily = PlusJakartaSans,
                                fontSize = 11.sp,
                                color = c.textSub
                            )
                        }
                        Row(
                            modifier = Modifier.clickable(onClick = onShopClick),
                            verticalAlignment = Alignment.CenterVertically
                        ) {
                            Text(
                                "DIRECTORY",
                                fontFamily = PlusJakartaSans,
                                fontWeight = FontWeight.Bold,
                                fontSize = 11.sp,
                                letterSpacing = 0.8.sp,
                                color = c.accent
                            )
                            Icon(
                                Icons.AutoMirrored.Filled.ArrowForward,
                                contentDescription = null,
                                tint = c.accent,
                                modifier = Modifier.size(12.dp)
                            )
                        }
                    }

                    // 4 Arched Cards in Grid
                    Row(
                        modifier = Modifier.fillMaxWidth(),
                        horizontalArrangement = Arrangement.spacedBy(8.dp)
                    ) {
                        archedVidhis.forEach { av ->
                            val isSelected = selectedTab == av.tab
                            val archShape = RoundedCornerShape(
                                topStart = 32.dp,
                                topEnd = 32.dp,
                                bottomStart = 12.dp,
                                bottomEnd = 12.dp
                            )
                            Column(
                                modifier = Modifier
                                    .weight(1f)
                                    .clickable {
                                        haptic.selection()
                                        selectedTab = av.tab
                                    },
                                horizontalAlignment = Alignment.CenterHorizontally
                            ) {
                                Box(
                                    modifier = Modifier
                                        .fillMaxWidth()
                                        .height(84.dp)
                                        .clip(archShape)
                                        .background(
                                            Brush.verticalGradient(
                                                listOf(
                                                    if (isSelected) c.accent.copy(alpha = 0.25f) else (if (c.isDark) Color(0xFF183125) else Color(0xFFF3EDE2)),
                                                    if (isSelected) c.accent.copy(alpha = 0.15f) else (if (c.isDark) Color(0xFF0E2118) else Color(0xFFE8F2EC))
                                                )
                                            )
                                        )
                                        .border(
                                            if (isSelected) 1.5.dp else 1.dp,
                                            if (isSelected) c.accent else c.accent.copy(alpha = 0.35f),
                                            archShape
                                        )
                                        .padding(4.dp),
                                    contentAlignment = Alignment.Center
                                ) {
                                    Column(
                                        horizontalAlignment = Alignment.CenterHorizontally,
                                        verticalArrangement = Arrangement.Center
                                    ) {
                                        Box(
                                            modifier = Modifier
                                                .size(38.dp)
                                                .clip(CircleShape)
                                                .background(if (c.isDark) Color(0xFF091611) else Color(0xFFFFFFFF))
                                                .border(1.dp, c.accent.copy(alpha = 0.3f), CircleShape),
                                            contentAlignment = Alignment.Center
                                        ) {
                                            Icon(
                                                av.icon,
                                                contentDescription = av.title,
                                                tint = c.accent,
                                                modifier = Modifier.size(20.dp)
                                            )
                                        }
                                        Spacer(Modifier.height(4.dp))
                                        Text(
                                            av.badge.uppercase(),
                                            fontFamily = PlusJakartaSans,
                                            fontWeight = FontWeight.Bold,
                                            fontSize = 8.sp,
                                            letterSpacing = 0.5.sp,
                                            color = if (c.isDark) Color(0xFFACCEBD) else c.heading
                                        )
                                    }
                                }
                                Spacer(Modifier.height(4.dp))
                                Text(
                                    av.title,
                                    fontFamily = NotoSerif,
                                    fontWeight = FontWeight.SemiBold,
                                    fontSize = 11.sp,
                                    color = if (isSelected) c.accent else c.text,
                                    textAlign = TextAlign.Center,
                                    maxLines = 1,
                                    overflow = TextOverflow.Ellipsis
                                )
                                Text(
                                    av.sub,
                                    fontFamily = PlusJakartaSans,
                                    fontSize = 9.sp,
                                    color = c.textMuted,
                                    textAlign = TextAlign.Center
                                )
                            }
                        }
                    }
                }
            }

            // SECTION 3: Vaidya Consultation & Prakriti Dosha Quiz Banner
            item {
                Row(
                    modifier = Modifier
                        .fillMaxWidth()
                        .clip(RoundedCornerShape(16.dp))
                        .background(
                            Brush.horizontalGradient(
                                listOf(
                                    if (c.isDark) Color(0xFF14291F) else Color(0xFFE8F2EC),
                                    if (c.isDark) Color(0xFF0F221A) else Color(0xFFF3EDE2),
                                    if (c.isDark) Color(0xFF0B1B14) else Color(0xFFFDF8EC)
                                )
                            )
                        )
                        .border(1.dp, c.accent.copy(alpha = 0.3f), RoundedCornerShape(16.dp))
                        .padding(14.dp),
                    verticalAlignment = Alignment.CenterVertically,
                    horizontalArrangement = Arrangement.SpaceBetween
                ) {
                    Row(
                        modifier = Modifier.weight(1f),
                        verticalAlignment = Alignment.CenterVertically,
                        horizontalArrangement = Arrangement.spacedBy(10.dp)
                    ) {
                        Box(
                            modifier = Modifier
                                .size(40.dp)
                                .clip(CircleShape)
                                .background(if (c.isDark) Color(0xFF1B3427) else Color(0xFF1B4332))
                                .border(1.dp, c.accent.copy(alpha = 0.5f), CircleShape),
                            contentAlignment = Alignment.Center
                        ) {
                            Icon(
                                Icons.Filled.MedicalServices,
                                contentDescription = null,
                                tint = if (c.isDark) Color(0xFFF2CA50) else Color(0xFFFED65B),
                                modifier = Modifier.size(20.dp)
                            )
                        }

                        Column {
                            Row(
                                verticalAlignment = Alignment.CenterVertically,
                                horizontalArrangement = Arrangement.spacedBy(6.dp)
                            ) {
                                Text(
                                    "Know Your Prakriti Dosha",
                                    fontFamily = NotoSerif,
                                    fontWeight = FontWeight.Bold,
                                    fontSize = 13.sp,
                                    color = c.heading
                                )
                                Box(
                                    modifier = Modifier
                                        .clip(RoundedCornerShape(4.dp))
                                        .background(c.accent.copy(alpha = 0.15f))
                                        .border(1.dp, c.accent.copy(alpha = 0.4f), RoundedCornerShape(4.dp))
                                        .padding(horizontal = 4.dp, vertical = 1.dp)
                                ) {
                                    Text(
                                        "FREE",
                                        fontFamily = PlusJakartaSans,
                                        fontWeight = FontWeight.ExtraBold,
                                        fontSize = 8.5.sp,
                                        color = c.accent
                                    )
                                }
                            }
                            Text(
                                "3-min Vedic questionnaire or consult our certified Vaidya",
                                fontFamily = PlusJakartaSans,
                                fontSize = 10.5.sp,
                                color = c.textSub,
                                maxLines = 1,
                                overflow = TextOverflow.Ellipsis
                            )
                        }
                    }

                    Spacer(Modifier.width(8.dp))

                    Box(
                        modifier = Modifier
                            .clip(RoundedCornerShape(8.dp))
                            .background(if (c.isDark) Color(0xFF1A382B) else Color(0xFF1B4332))
                            .border(1.dp, c.accent.copy(alpha = 0.5f), RoundedCornerShape(8.dp))
                            .clickable {
                                haptic.medium()
                                showDoshaQuizDialog = true
                            }
                            .padding(horizontal = 10.dp, vertical = 7.dp)
                    ) {
                        Text(
                            "Start Quiz",
                            fontFamily = PlusJakartaSans,
                            fontWeight = FontWeight.Bold,
                            fontSize = 10.5.sp,
                            color = if (c.isDark) c.accent else Color.White
                        )
                    }
                }
            }

            // SECTION 4: Authentic Apothecary Essentials (2-Column Grid with Live Steppers)
            item {
                Column(verticalArrangement = Arrangement.spacedBy(12.dp)) {
                    Row(
                        modifier = Modifier.fillMaxWidth(),
                        horizontalArrangement = Arrangement.SpaceBetween,
                        verticalAlignment = Alignment.Bottom
                    ) {
                        Column {
                            Text(
                                "Authentic Apothecary Essentials",
                                fontFamily = NotoSerif,
                                fontWeight = FontWeight.Bold,
                                fontSize = 17.sp,
                                color = c.heading
                            )
                            Text(
                                "Prepared according to Sharangadhara Samhita",
                                fontFamily = PlusJakartaSans,
                                fontSize = 11.sp,
                                color = c.textSub
                            )
                        }
                        Row(
                            modifier = Modifier.clickable(onClick = onShopClick),
                            verticalAlignment = Alignment.CenterVertically
                        ) {
                            Text(
                                "VIEW ALL",
                                fontFamily = PlusJakartaSans,
                                fontWeight = FontWeight.Bold,
                                fontSize = 11.sp,
                                letterSpacing = 0.8.sp,
                                color = c.accent
                            )
                            Icon(
                                Icons.AutoMirrored.Filled.ArrowForward,
                                contentDescription = null,
                                tint = c.accent,
                                modifier = Modifier.size(12.dp)
                            )
                        }
                    }

                    when (val state = uiState) {
                        is UiState.Success -> {
                            val allProducts = state.data.featuredProducts
                            val filtered = allProducts.filter { it.matchesVidhi(selectedTab) }
                            val displayList = if (filtered.isNotEmpty()) filtered else allProducts

                            Column(verticalArrangement = Arrangement.spacedBy(12.dp)) {
                                displayList.chunked(2).forEach { pair ->
                                    Row(
                                        modifier = Modifier.fillMaxWidth(),
                                        horizontalArrangement = Arrangement.spacedBy(12.dp)
                                    ) {
                                        pair.forEach { prod ->
                                            val qty = cartQuantities[prod.id] ?: 0
                                            val isWishlisted = wishlistIds.contains(prod.id)

                                            LuxuryApothecaryCard(
                                                product = prod,
                                                quantityInCart = qty,
                                                isWishlisted = isWishlisted,
                                                onToggleWishlist = {
                                                    haptic.selection()
                                                    wishlistIds = if (isWishlisted) wishlistIds - prod.id else wishlistIds + prod.id
                                                },
                                                onProductClick = { onProductClick(prod.slug) },
                                                onAddToCart = {
                                                    haptic.medium()
                                                    onAddToCart(prod)
                                                },
                                                onUpdateQuantity = { newQty ->
                                                    haptic.selection()
                                                    onUpdateCartQuantity(prod, newQty)
                                                },
                                                modifier = Modifier.weight(1f)
                                            )
                                        }
                                        if (pair.size == 1) {
                                            Spacer(Modifier.weight(1f))
                                        }
                                    }
                                }
                            }
                        }
                        is UiState.Error -> {
                            Column(
                                modifier = Modifier
                                    .fillMaxWidth()
                                    .ayCard(RoundedCornerShape(16.dp))
                                    .padding(16.dp),
                                horizontalAlignment = Alignment.CenterHorizontally,
                                verticalArrangement = Arrangement.spacedBy(8.dp)
                            ) {
                                Text(
                                    "Cannot reach formulation database",
                                    fontFamily = NotoSerif,
                                    fontWeight = FontWeight.Bold,
                                    fontSize = 15.sp,
                                    color = c.heading
                                )
                                Text(
                                    state.message,
                                    fontFamily = PlusJakartaSans,
                                    fontSize = 12.sp,
                                    color = c.error,
                                    textAlign = TextAlign.Center
                                )
                                AyOutlineButton(
                                    "Retry Connection",
                                    onClick = { viewModel.fetchHomeData() },
                                    height = 40.dp
                                )
                            }
                        }
                        else -> {
                            Row(
                                modifier = Modifier.fillMaxWidth(),
                                horizontalArrangement = Arrangement.spacedBy(12.dp)
                            ) {
                                repeat(2) {
                                    Box(
                                        modifier = Modifier
                                            .weight(1f)
                                            .height(260.dp)
                                            .clip(RoundedCornerShape(16.dp))
                                            .background(c.card)
                                            .border(1.dp, c.border, RoundedCornerShape(16.dp))
                                    )
                                }
                            }
                        }
                    }
                }
            }

            // SECTION 5: Purity & Provenance Seals (The Ayurdhara Purity Standard)
            item {
                Box(
                    modifier = Modifier
                        .fillMaxWidth()
                        .clip(RoundedCornerShape(16.dp))
                        .background(if (c.isDark) Color(0xFF0C1C15) else Color(0xFFFAF7F2))
                        .border(1.dp, c.accent.copy(alpha = 0.25f), RoundedCornerShape(16.dp))
                        .padding(14.dp)
                ) {
                    Column {
                        Text(
                            "The Ayurdhara Purity Standard",
                            fontFamily = NotoSerif,
                            fontWeight = FontWeight.Bold,
                            fontSize = 13.sp,
                            color = c.heading,
                            modifier = Modifier.fillMaxWidth(),
                            textAlign = TextAlign.Center
                        )
                        Spacer(Modifier.height(10.dp))
                        Row(
                            modifier = Modifier.fillMaxWidth(),
                            horizontalArrangement = Arrangement.SpaceBetween
                        ) {
                            // Column 1
                            Column(
                                modifier = Modifier.weight(1f),
                                horizontalAlignment = Alignment.CenterHorizontally
                            ) {
                                Icon(
                                    Icons.Filled.DeviceThermostat,
                                    contentDescription = null,
                                    tint = c.accent,
                                    modifier = Modifier.size(20.dp)
                                )
                                Spacer(Modifier.height(4.dp))
                                Text(
                                    "Zero Thermal Heat",
                                    fontFamily = PlusJakartaSans,
                                    fontWeight = FontWeight.Bold,
                                    fontSize = 10.sp,
                                    color = c.text,
                                    textAlign = TextAlign.Center
                                )
                                Text(
                                    "<38°C slow ghani press",
                                    fontFamily = PlusJakartaSans,
                                    fontSize = 8.5.sp,
                                    color = c.textMuted,
                                    textAlign = TextAlign.Center
                                )
                            }

                            // Column 2
                            Column(
                                modifier = Modifier
                                    .weight(1f)
                                    .padding(horizontal = 4.dp),
                                horizontalAlignment = Alignment.CenterHorizontally
                            ) {
                                Icon(
                                    Icons.Filled.Forest,
                                    contentDescription = null,
                                    tint = c.accent,
                                    modifier = Modifier.size(20.dp)
                                )
                                Spacer(Modifier.height(4.dp))
                                Text(
                                    "Wildcrafted Botanicals",
                                    fontFamily = PlusJakartaSans,
                                    fontWeight = FontWeight.Bold,
                                    fontSize = 10.sp,
                                    color = c.text,
                                    textAlign = TextAlign.Center
                                )
                                Text(
                                    "Himalayas & Ghats",
                                    fontFamily = PlusJakartaSans,
                                    fontSize = 8.5.sp,
                                    color = c.textMuted,
                                    textAlign = TextAlign.Center
                                )
                            }

                            // Column 3
                            Column(
                                modifier = Modifier.weight(1f),
                                horizontalAlignment = Alignment.CenterHorizontally
                            ) {
                                Icon(
                                    Icons.Filled.PanTool,
                                    contentDescription = null,
                                    tint = c.accent,
                                    modifier = Modifier.size(20.dp)
                                )
                                Spacer(Modifier.height(4.dp))
                                Text(
                                    "Hand-Poured",
                                    fontFamily = PlusJakartaSans,
                                    fontWeight = FontWeight.Bold,
                                    fontSize = 10.sp,
                                    color = c.text,
                                    textAlign = TextAlign.Center
                                )
                                Text(
                                    "Small artisanal batches",
                                    fontFamily = PlusJakartaSans,
                                    fontSize = 8.5.sp,
                                    color = c.textMuted,
                                    textAlign = TextAlign.Center
                                )
                            }
                        }
                    }
                }
            }

            // SECTION 6: Divya Shakti Network Opportunity
            item {
                Box(
                    modifier = Modifier
                        .fillMaxWidth()
                        .clip(RoundedCornerShape(16.dp))
                        .background(c.bannerBg)
                        .border(1.dp, c.accent.copy(alpha = 0.35f), RoundedCornerShape(16.dp))
                        .padding(16.dp)
                ) {
                    Column(verticalArrangement = Arrangement.spacedBy(6.dp)) {
                        Row(verticalAlignment = Alignment.CenterVertically) {
                            Icon(
                                Icons.Filled.WorkspacePremium,
                                contentDescription = null,
                                tint = if (c.isDark) Color(0xFFF2CA50) else Color(0xFFFED65B),
                                modifier = Modifier.size(16.dp)
                            )
                            Spacer(Modifier.width(6.dp))
                            Text(
                                "DIVYA SHAKTI NETWORK",
                                fontFamily = PlusJakartaSans,
                                fontWeight = FontWeight.Bold,
                                fontSize = 10.5.sp,
                                letterSpacing = 1.sp,
                                color = if (c.isDark) Color(0xFFF2CA50) else Color(0xFFFED65B)
                            )
                        }
                        Text(
                            "Natural Aroma & Business Opportunity",
                            fontFamily = NotoSerif,
                            fontWeight = FontWeight.Bold,
                            fontSize = 18.sp,
                            lineHeight = 24.sp,
                            color = c.onBanner
                        )
                        Text(
                            "Partner with Ayurdhara as a certified Ayurvedic Wellness Consultant & Distributor to grow together in sacred health.",
                            fontFamily = PlusJakartaSans,
                            fontSize = 11.5.sp,
                            lineHeight = 17.sp,
                            color = c.onBanner.copy(alpha = 0.85f)
                        )
                        Spacer(Modifier.height(4.dp))
                        Row(
                            modifier = Modifier
                                .clickable(onClick = onShopClick),
                            verticalAlignment = Alignment.CenterVertically
                        ) {
                            Text(
                                "Learn More",
                                fontFamily = PlusJakartaSans,
                                fontWeight = FontWeight.Bold,
                                fontSize = 13.sp,
                                color = if (c.isDark) Color(0xFFF2CA50) else Color(0xFFFED65B)
                            )
                            Spacer(Modifier.width(4.dp))
                            Icon(
                                Icons.AutoMirrored.Filled.ArrowForward,
                                contentDescription = null,
                                tint = if (c.isDark) Color(0xFFF2CA50) else Color(0xFFFED65B),
                                modifier = Modifier.size(14.dp)
                            )
                        }
                    }
                }
            }

            // SECTION 7: Daily Ritual Shloka
            item {
                Row(
                    modifier = Modifier
                        .fillMaxWidth()
                        .clip(RoundedCornerShape(12.dp))
                        .background(c.cardLow)
                        .border(1.dp, c.border, RoundedCornerShape(12.dp))
                        .padding(14.dp),
                    verticalAlignment = Alignment.CenterVertically,
                    horizontalArrangement = Arrangement.spacedBy(10.dp)
                ) {
                    Box(
                        modifier = Modifier
                            .size(36.dp)
                            .clip(CircleShape)
                            .background(c.card),
                        contentAlignment = Alignment.Center
                    ) {
                        Icon(
                            Icons.Filled.Spa,
                            contentDescription = null,
                            tint = c.accent,
                            modifier = Modifier.size(18.dp)
                        )
                    }
                    Column(modifier = Modifier.weight(1f)) {
                        Text(
                            "RITUAL OF THE DAY",
                            fontFamily = PlusJakartaSans,
                            fontWeight = FontWeight.Bold,
                            fontSize = 9.5.sp,
                            letterSpacing = 1.2.sp,
                            color = c.accent
                        )
                        Text(
                            "\"Swasthyasya swasthya rakshanam — Nurture your natural rhythm.\"",
                            fontFamily = PlusJakartaSans,
                            fontStyle = FontStyle.Italic,
                            fontSize = 11.5.sp,
                            color = c.text,
                            maxLines = 1,
                            overflow = TextOverflow.Ellipsis
                        )
                    }
                }
            }
        }
    }

    // ── INTERACTIVE DELIVERY PINCODE DIALOG ──
    if (showPincodeDialog) {
        AlertDialog(
            onDismissRequest = { showPincodeDialog = false },
            title = {
                Text(
                    "Set Delivery Pincode",
                    fontFamily = NotoSerif,
                    fontWeight = FontWeight.Bold,
                    fontSize = 18.sp,
                    color = c.heading
                )
            },
            text = {
                Column(verticalArrangement = Arrangement.spacedBy(8.dp)) {
                    Text(
                        "Enter your 6-digit postal pincode to check dispatch availability & artisanal batch tracking.",
                        fontFamily = PlusJakartaSans,
                        fontSize = 13.sp,
                        color = c.textSub
                    )
                    OutlinedTextField(
                        value = pincodeInput,
                        onValueChange = { pincodeInput = it.filter { ch -> ch.isDigit() }.take(6) },
                        placeholder = { Text("e.g. 110001", color = c.textMuted) },
                        singleLine = true,
                        keyboardOptions = KeyboardOptions(keyboardType = KeyboardType.Number),
                        colors = OutlinedTextFieldDefaults.colors(
                            focusedBorderColor = c.accent,
                            unfocusedBorderColor = c.border,
                            focusedTextColor = c.text,
                            unfocusedTextColor = c.text
                        ),
                        modifier = Modifier.fillMaxWidth()
                    )
                }
            },
            confirmButton = {
                TextButton(
                    onClick = {
                        if (pincodeInput.length == 6) {
                            viewModel.setDeliveryPincode(pincodeInput)
                            Toast.makeText(context, "Delivery pincode set to $pincodeInput", Toast.LENGTH_SHORT).show()
                            showPincodeDialog = false
                        } else {
                            Toast.makeText(context, "Please enter a valid 6-digit pincode", Toast.LENGTH_SHORT).show()
                        }
                    }
                ) {
                    Text("Save", color = c.accent, fontWeight = FontWeight.Bold)
                }
            },
            dismissButton = {
                TextButton(onClick = { showPincodeDialog = false }) {
                    Text("Cancel", color = c.textSub)
                }
            },
            containerColor = c.card,
            shape = RoundedCornerShape(20.dp)
        )
    }

    // ── INTERACTIVE PRAKRITI DOSHA QUIZ DIALOG ──
    if (showDoshaQuizDialog) {
        PrakritiDoshaQuizDialog(
            onDismiss = { showDoshaQuizDialog = false },
            onComplete = { doshaResult ->
                showDoshaQuizDialog = false
                Toast.makeText(context, "Your primary Prakriti: $doshaResult. Formulations tailored!", Toast.LENGTH_LONG).show()
            }
        )
    }
}

/**
 * 2-Column Luxury Apothecary Product Card matching Stitch Designs:
 * Arched/rounded-2xl card, seal badge, wishlist heart, rating, serif title,
 * italics botanical note, price + MRP strikethrough, and live + ADD / stepper.
 */
@Composable
private fun LuxuryApothecaryCard(
    product: Product,
    quantityInCart: Int,
    isWishlisted: Boolean,
    onToggleWishlist: () -> Unit,
    onProductClick: () -> Unit,
    onAddToCart: () -> Unit,
    onUpdateQuantity: (Int) -> Unit,
    modifier: Modifier = Modifier
) {
    val c = AyTheme.colors
    val seal: String = remember(product) {
        val title = product.title.lowercase()
        when {
            "sesame" in title || "oil" in title || "tailam" in title -> "GHANI PRESSED"
            "ashwagandha" in title || "root" in title -> "NAGORI ROOT"
            "bhringraj" in title -> "KSHIR PAK VIDHI"
            "triphala" in title || "kadha" in title -> "TRI-DOSHIC"
            !product.badge.isNullOrBlank() -> product.badge.orEmpty()
            else -> "100% PURE"
        }
    }

    val botanicalSub = remember(product) {
        val title = product.title.lowercase()
        when {
            "oil" in title || "tailam" in title -> "Wood-churned • Unrefined"
            "ashwagandha" in title -> "Moon-harvested • Ground"
            "bhringraj" in title -> "Slow simmered in copper pots"
            "triphala" in title -> "Gentle colon & gut reset"
            else -> "Artisanal small batch"
        }
    }

    val provenanceMeta = remember(product) {
        val title = product.title.lowercase()
        when {
            "oil" in title || "tailam" in title -> "Black Sesame • 500ml Flagon"
            "ashwagandha" in title -> "Wildcrafted • 200g Jar"
            "bhringraj" in title -> "Brahmi Infused • 200ml Bottle"
            "triphala" in title -> "Amla & Haritaki • 100g Pouch"
            else -> "Wildcrafted • Pure Extract"
        }
    }

    Column(
        modifier = modifier
            .clip(RoundedCornerShape(16.dp))
            .background(c.card)
            .border(1.dp, c.accent.copy(alpha = 0.3f), RoundedCornerShape(16.dp))
            .clickable(onClick = onProductClick)
            .padding(10.dp),
        verticalArrangement = Arrangement.SpaceBetween
    ) {
        Column {
            // Image Box
            Box(
                modifier = Modifier
                    .fillMaxWidth()
                    .aspectRatio(1f)
                    .clip(RoundedCornerShape(12.dp))
                    .background(if (c.isDark) Color(0xFF06120C) else Color(0xFFFAF7F2))
                    .border(1.dp, c.accent.copy(alpha = 0.2f), RoundedCornerShape(12.dp))
            ) {
                AyImage(
                    url = product.imageUrl,
                    contentDescription = product.title,
                    modifier = Modifier.fillMaxSize(),
                    contentScale = ContentScale.Crop
                )

                // Seal Tag
                Box(
                    modifier = Modifier
                        .align(Alignment.TopStart)
                        .padding(6.dp)
                        .clip(RoundedCornerShape(4.dp))
                        .background(if (c.isDark) Color(0xFF091611).copy(alpha = 0.9f) else Color(0xFFFFFFFF).copy(alpha = 0.95f))
                        .border(0.8.dp, c.accent.copy(alpha = 0.4f), RoundedCornerShape(4.dp))
                        .padding(horizontal = 5.dp, vertical = 2.dp)
                ) {
                    Text(
                        seal,
                        fontFamily = PlusJakartaSans,
                        fontWeight = FontWeight.Bold,
                        fontSize = 8.sp,
                        letterSpacing = 0.5.sp,
                        color = c.accent
                    )
                }

                // Wishlist Button
                Box(
                    modifier = Modifier
                        .align(Alignment.TopEnd)
                        .padding(6.dp)
                        .size(26.dp)
                        .clip(CircleShape)
                        .background(if (c.isDark) Color(0xFF091611).copy(alpha = 0.8f) else Color.White.copy(alpha = 0.9f))
                        .border(0.8.dp, c.accent.copy(alpha = 0.35f), CircleShape)
                        .clickable(onClick = onToggleWishlist),
                    contentAlignment = Alignment.Center
                ) {
                    Icon(
                        if (isWishlisted) Icons.Filled.Favorite else Icons.Outlined.FavoriteBorder,
                        contentDescription = "Wishlist",
                        tint = if (isWishlisted) Color(0xFFF2CA50) else c.accent,
                        modifier = Modifier.size(14.dp)
                    )
                }

                // Star Rating
                Box(
                    modifier = Modifier
                        .align(Alignment.BottomEnd)
                        .padding(6.dp)
                        .clip(RoundedCornerShape(4.dp))
                        .background(if (c.isDark) Color(0xFF091611).copy(alpha = 0.85f) else Color.White.copy(alpha = 0.95f))
                        .border(0.8.dp, c.accent.copy(alpha = 0.25f), RoundedCornerShape(4.dp))
                        .padding(horizontal = 5.dp, vertical = 1.dp)
                ) {
                    Text(
                        "★ ${String.format("%.1f", product.rating)}",
                        fontFamily = PlusJakartaSans,
                        fontWeight = FontWeight.Bold,
                        fontSize = 8.5.sp,
                        color = c.text
                    )
                }
            }

            Spacer(Modifier.height(6.dp))

            // Provenance Meta
            Text(
                provenanceMeta,
                fontFamily = PlusJakartaSans,
                fontSize = 9.sp,
                color = c.textSub,
                maxLines = 1,
                overflow = TextOverflow.Ellipsis
            )

            // Title
            Spacer(Modifier.height(2.dp))
            Text(
                product.title,
                fontFamily = NotoSerif,
                fontWeight = FontWeight.Bold,
                fontSize = 12.5.sp,
                lineHeight = 17.sp,
                color = c.heading,
                maxLines = 2,
                minLines = 2,
                overflow = TextOverflow.Ellipsis
            )

            // Botanical Subtitle
            Text(
                botanicalSub,
                fontFamily = PlusJakartaSans,
                fontStyle = FontStyle.Italic,
                fontSize = 9.sp,
                color = c.textMuted,
                maxLines = 1,
                overflow = TextOverflow.Ellipsis
            )
        }

        // Price & Live Stepper Slot
        Column(modifier = Modifier.padding(top = 8.dp)) {
            Divider(color = c.accent.copy(alpha = 0.15f), thickness = 0.8.dp)
            Spacer(Modifier.height(6.dp))
            Row(
                modifier = Modifier.fillMaxWidth(),
                horizontalArrangement = Arrangement.SpaceBetween,
                verticalAlignment = Alignment.CenterVertically
            ) {
                Column {
                    Text(
                        "₹${product.price.toInt()}",
                        fontFamily = PlusJakartaSans,
                        fontWeight = FontWeight.Bold,
                        fontSize = 13.5.sp,
                        color = c.price
                    )
                    val origPrice = product.originalPrice
                    if (origPrice != null && origPrice > product.price) {
                        Text(
                            "₹${origPrice.toInt()}",
                            fontFamily = PlusJakartaSans,
                            fontSize = 9.5.sp,
                            color = c.textMuted,
                            textDecoration = TextDecoration.LineThrough
                        )
                    }
                }

                // Interactive Live Stepper or + ADD button
                if (quantityInCart == 0) {
                    Box(
                        modifier = Modifier
                            .clip(RoundedCornerShape(8.dp))
                            .background(c.goldFill)
                            .clickable(onClick = onAddToCart)
                            .padding(horizontal = 10.dp, vertical = 5.dp)
                    ) {
                        Text(
                            "+ ADD",
                            fontFamily = PlusJakartaSans,
                            fontWeight = FontWeight.ExtraBold,
                            fontSize = 10.sp,
                            color = c.onGoldFill
                        )
                    }
                } else {
                    Row(
                        modifier = Modifier
                            .clip(RoundedCornerShape(8.dp))
                            .background(c.goldFill)
                            .padding(horizontal = 4.dp, vertical = 2.dp),
                        verticalAlignment = Alignment.CenterVertically
                    ) {
                        Box(
                            modifier = Modifier
                                .size(20.dp)
                                .clickable { onUpdateQuantity(quantityInCart - 1) },
                            contentAlignment = Alignment.Center
                        ) {
                            Text(
                                "－",
                                fontFamily = PlusJakartaSans,
                                fontWeight = FontWeight.ExtraBold,
                                fontSize = 11.sp,
                                color = c.onGoldFill
                            )
                        }
                        Text(
                            "$quantityInCart",
                            fontFamily = PlusJakartaSans,
                            fontWeight = FontWeight.Bold,
                            fontSize = 11.sp,
                            color = c.onGoldFill,
                            modifier = Modifier.padding(horizontal = 5.dp)
                        )
                        Box(
                            modifier = Modifier
                                .size(20.dp)
                                .clickable { onUpdateQuantity(quantityInCart + 1) },
                            contentAlignment = Alignment.Center
                        ) {
                            Text(
                                "＋",
                                fontFamily = PlusJakartaSans,
                                fontWeight = FontWeight.ExtraBold,
                                fontSize = 11.sp,
                                color = c.onGoldFill
                            )
                        }
                    }
                }
            }
        }
    }
}

/**
 * Prakriti Dosha Quiz Dialog:
 * Authentically assesses user's dominant Vedic Dosha (Vata, Pitta, Kapha)
 * with instant practical recommendations.
 */
@Composable
private fun PrakritiDoshaQuizDialog(
    onDismiss: () -> Unit,
    onComplete: (String) -> Unit
) {
    val c = AyTheme.colors
    var q1Index by remember { mutableIntStateOf(-1) }
    var q2Index by remember { mutableIntStateOf(-1) }
    var q3Index by remember { mutableIntStateOf(-1) }

    AlertDialog(
        onDismissRequest = onDismiss,
        title = {
            Row(verticalAlignment = Alignment.CenterVertically) {
                Icon(Icons.Filled.Spa, contentDescription = null, tint = c.accent, modifier = Modifier.size(20.dp))
                Spacer(Modifier.width(8.dp))
                Text(
                    "Prakriti Dosha Diagnostic",
                    fontFamily = NotoSerif,
                    fontWeight = FontWeight.Bold,
                    fontSize = 18.sp,
                    color = c.heading
                )
            }
        },
        text = {
            Column(
                modifier = Modifier.fillMaxWidth(),
                verticalArrangement = Arrangement.spacedBy(14.dp)
            ) {
                // Q1
                Column(verticalArrangement = Arrangement.spacedBy(4.dp)) {
                    Text("1. Body Frame & Build", fontFamily = PlusJakartaSans, fontWeight = FontWeight.Bold, fontSize = 12.sp, color = c.text)
                    listOf("Lean, slender, quick to fatigue (Vata)", "Medium build, athletic, warm (Pitta)", "Broad, sturdy, steady endurance (Kapha)").forEachIndexed { index, opt ->
                        QuizOption(opt, selected = q1Index == index, onSelect = { q1Index = index })
                    }
                }

                // Q2
                Column(verticalArrangement = Arrangement.spacedBy(4.dp)) {
                    Text("2. Appetite & Digestion (Agni)", fontFamily = PlusJakartaSans, fontWeight = FontWeight.Bold, fontSize = 12.sp, color = c.text)
                    listOf("Variable, sensitive, prone to dryness (Vata)", "Strong, intense, can't skip meals (Pitta)", "Slow, steady, feeling heavy after eating (Kapha)").forEachIndexed { index, opt ->
                        QuizOption(opt, selected = q2Index == index, onSelect = { q2Index = index })
                    }
                }

                // Q3
                Column(verticalArrangement = Arrangement.spacedBy(4.dp)) {
                    Text("3. Mind Temperament & Sleep", fontFamily = PlusJakartaSans, fontWeight = FontWeight.Bold, fontSize = 12.sp, color = c.text)
                    listOf("Creative, restless, light sleeper (Vata)", "Sharp, goal-driven, vivid dreams (Pitta)", "Calm, affectionate, deep heavy sleep (Kapha)").forEachIndexed { index, opt ->
                        QuizOption(opt, selected = q3Index == index, onSelect = { q3Index = index })
                    }
                }
            }
        },
        confirmButton = {
            TextButton(
                onClick = {
                    if (q1Index >= 0 && q2Index >= 0 && q3Index >= 0) {
                        val counts = intArrayOf(0, 0, 0)
                        counts[q1Index]++
                        counts[q2Index]++
                        counts[q3Index]++
                        val winner = when (counts.indices.maxByOrNull { counts[it] } ?: 0) {
                            0 -> "Vata"
                            1 -> "Pitta"
                            else -> "Kapha"
                        }
                        onComplete(winner)
                    }
                },
                enabled = q1Index >= 0 && q2Index >= 0 && q3Index >= 0
            ) {
                Text(
                    "Discover Prakriti",
                    color = if (q1Index >= 0 && q2Index >= 0 && q3Index >= 0) c.accent else c.textMuted,
                    fontWeight = FontWeight.Bold
                )
            }
        },
        dismissButton = {
            TextButton(onClick = onDismiss) {
                Text("Close", color = c.textSub)
            }
        },
        containerColor = c.card,
        shape = RoundedCornerShape(20.dp)
    )
}

@Composable
private fun QuizOption(
    text: String,
    selected: Boolean,
    onSelect: () -> Unit
) {
    val c = AyTheme.colors
    Row(
        modifier = Modifier
            .fillMaxWidth()
            .clip(RoundedCornerShape(8.dp))
            .background(if (selected) c.accent.copy(alpha = 0.15f) else c.canvas)
            .border(if (selected) 1.dp else 0.5.dp, if (selected) c.accent else c.border, RoundedCornerShape(8.dp))
            .clickable(onClick = onSelect)
            .padding(horizontal = 10.dp, vertical = 6.dp),
        verticalAlignment = Alignment.CenterVertically
    ) {
        RadioButton(
            selected = selected,
            onClick = onSelect,
            colors = RadioButtonDefaults.colors(
                selectedColor = c.accent,
                unselectedColor = c.textMuted
            ),
            modifier = Modifier.size(16.dp)
        )
        Spacer(Modifier.width(8.dp))
        Text(
            text,
            fontFamily = PlusJakartaSans,
            fontSize = 11.sp,
            color = if (selected) c.heading else c.text
        )
    }
}
