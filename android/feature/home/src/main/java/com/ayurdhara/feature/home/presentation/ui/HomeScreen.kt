@file:OptIn(androidx.compose.foundation.ExperimentalFoundationApi::class)

package com.ayurdhara.feature.home.presentation.ui

import androidx.compose.foundation.background
import androidx.compose.foundation.border
import androidx.compose.foundation.clickable
import androidx.compose.foundation.layout.*
import androidx.compose.foundation.lazy.LazyColumn
import androidx.compose.foundation.lazy.LazyRow
import androidx.compose.foundation.lazy.items
import androidx.compose.foundation.pager.HorizontalPager
import androidx.compose.foundation.pager.rememberPagerState
import androidx.compose.foundation.shape.CircleShape
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.foundation.text.KeyboardOptions
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.automirrored.filled.ArrowForward
import androidx.compose.material.icons.automirrored.filled.KeyboardArrowRight
import androidx.compose.material.icons.filled.Adjust
import androidx.compose.material.icons.filled.Balance
import androidx.compose.material.icons.filled.CardGiftcard
import androidx.compose.material.icons.filled.Check
import androidx.compose.material.icons.filled.ChildCare
import androidx.compose.material.icons.filled.DirectionsWalk
import androidx.compose.material.icons.filled.Eco
import androidx.compose.material.icons.filled.Elderly
import androidx.compose.material.icons.filled.EmojiFoodBeverage
import androidx.compose.material.icons.filled.ExpandMore
import androidx.compose.material.icons.filled.Favorite
import androidx.compose.material.icons.filled.FitnessCenter
import androidx.compose.material.icons.filled.Grain
import androidx.compose.material.icons.filled.Grass
import androidx.compose.material.icons.filled.Hive
import androidx.compose.material.icons.filled.LocalFireDepartment
import androidx.compose.material.icons.filled.LocalFlorist
import androidx.compose.material.icons.filled.LocationOn
import androidx.compose.material.icons.filled.Notifications
import androidx.compose.material.icons.filled.Opacity
import androidx.compose.material.icons.filled.Park
import androidx.compose.material.icons.filled.Restaurant
import androidx.compose.material.icons.filled.Search
import androidx.compose.material.icons.filled.SelfImprovement
import androidx.compose.material.icons.filled.Spa
import androidx.compose.material.icons.filled.WorkspacePremium
import androidx.compose.material3.AlertDialog
import androidx.compose.material3.Icon
import androidx.compose.material3.OutlinedTextField
import androidx.compose.material3.Text
import androidx.compose.material3.TextButton
import androidx.compose.runtime.*
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.draw.alpha
import androidx.compose.ui.draw.clip
import androidx.compose.ui.graphics.Brush
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.graphics.vector.ImageVector
import androidx.compose.ui.text.font.FontStyle
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.text.input.KeyboardType
import androidx.compose.ui.text.style.TextAlign
import androidx.compose.ui.text.style.TextOverflow
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import androidx.hilt.navigation.compose.hiltViewModel
import com.ayurdhara.core.common.domain.model.Product
import com.ayurdhara.core.common.result.UiState
import com.ayurdhara.core.designsystem.components.*
import com.ayurdhara.core.designsystem.theme.AyTheme
import com.ayurdhara.core.designsystem.theme.NotoSerif
import com.ayurdhara.core.designsystem.theme.PlusJakartaSans
import com.ayurdhara.feature.home.presentation.viewmodel.HomeViewModel
import kotlinx.coroutines.delay
import java.util.Calendar

// ─── Data Models ─────────────────────────────────────────────────────────────

private data class Remedy(val label: String, val keywords: List<String>)

private val remedies = listOf(
    Remedy("Hair Fall Control", listOf("hair", "bhringraj", "scalp")),
    Remedy("Joint & Muscle Pain", listOf("joint", "muscle", "pain", "mahanarayan")),
    Remedy("Digestive Health", listOf("digest", "gut", "triphala", "churna")),
    Remedy("Immunity Booster", listOf("immun", "chyawanprash", "giloy", "tulsi")),
    Remedy("Deep Sleep", listOf("sleep", "ashwagandha", "brahmi", "stress"))
)

/**
 * Clean data model representing a promotional slide in the dynamic carousel.
 */
data class PromoSlide(
    val id: String,
    val badge: String,
    val title: String,
    val subtitle: String,
    val ctaText: String = "Shop Now",
    val destination: String = "",
    val backgroundBrush: Brush,
    val icon: ImageVector = Icons.Filled.Spa
)

/**
 * Curated Ayurdhara promotional slides aligned with the authentic brand catalog.
 */
private val defaultPromoSlides = listOf(
    PromoSlide(
        id = "cold-pressed-oils",
        badge = "100% RAW & UNREFINED",
        title = "Divya Shakti Cold Pressed Sesame & Herbal Oils",
        subtitle = "Extracted in slow traditional stone ghani mills without heat, synthetic solvents, or chemical preservatives.",
        ctaText = "Shop Now",
        destination = "cold-pressed-oils",
        backgroundBrush = Brush.linearGradient(listOf(Color(0xFF0C3829), Color(0xFF07241A))),
        icon = Icons.Filled.Spa
    ),
    PromoSlide(
        id = "herbal-teas",
        badge = "SACRED BOTANICALS",
        title = "Immunity Kadhas & Pure Herbal Teas",
        subtitle = "Hand-crafted blends with wild tulsi, giloy, and sun-dried mountain spices for circadian vitality.",
        ctaText = "Explore Teas",
        destination = "Herbal Teas",
        backgroundBrush = Brush.linearGradient(listOf(Color(0xFF1D3E24), Color(0xFF0E2314))),
        icon = Icons.Filled.EmojiFoodBeverage
    ),
    PromoSlide(
        id = "herbal-powders",
        badge = "DAILY VEDA ESSENTIALS",
        title = "Authentic Churnas & Single Herbs",
        subtitle = "Time-tested micronized herbs for gentle digestive balance, natural Agni stimulation, and deep calm.",
        ctaText = "View Powders",
        destination = "Natural Herbs Powder",
        backgroundBrush = Brush.linearGradient(listOf(Color(0xFF382C1B), Color(0xFF1E170C))),
        icon = Icons.Filled.Grain
    ),
    PromoSlide(
        id = "super-foods",
        badge = "100% PURE OJAS",
        title = "Artisanal Superfoods & Natural Vitality",
        subtitle = "Pure botanical and organic nutrient-dense superfoods crafted to uplift your sacred personal sanctuary.",
        ctaText = "Discover More",
        destination = "Super Foods",
        backgroundBrush = Brush.linearGradient(listOf(Color(0xFF173238), Color(0xFF0A1C20))),
        icon = Icons.Filled.Eco
    )
)

/** Fallback categories shown until realtime categories load from Supabase. */
private val defaultCategories = listOf(
    "Cold Pressed Oils", "Hebs Natural Raw", "Herbal Teas", "Natural Herbs Powder",
    "Super Foods", "Kids wellness products", "Dry Fruits And Nuts", "Combo Trial Packs"
)

private fun categoryIcon(title: String): ImageVector {
    val t = title.lowercase().trim()
    return when {
        "ghee" in t -> Icons.Filled.Restaurant
        "honey" in t || "sweet" in t -> Icons.Filled.Hive
        "nut" in t || "fruit" in t -> Icons.Filled.Park
        "seed" in t -> Icons.Filled.Grain
        "spice" in t -> Icons.Filled.LocalFireDepartment
        "powder" in t || "churna" in t -> Icons.Filled.Grain
        "tea" in t || "kadha" in t -> Icons.Filled.EmojiFoodBeverage
        "nabhi" in t -> Icons.Filled.Adjust
        "feet" in t || "foot" in t -> Icons.Filled.DirectionsWalk
        "massage" in t || "body" in t -> Icons.Filled.SelfImprovement
        "kid" in t || "child" in t -> Icons.Filled.ChildCare
        "men" in t -> Icons.Filled.FitnessCenter
        "women" in t -> Icons.Filled.Favorite
        "senior" in t -> Icons.Filled.Elderly
        "combo" in t || "pack" in t || "trial" in t -> Icons.Filled.CardGiftcard
        "cup" in t || "aroma" in t || "flor" in t -> Icons.Filled.LocalFlorist
        "oil" in t -> Icons.Filled.Opacity
        "super" in t || "food" in t -> Icons.Filled.Eco
        "herb" in t || "jadi" in t -> Icons.Filled.Grass
        else -> Icons.Filled.Spa
    }
}

private fun Product.matches(keywords: List<String>): Boolean {
    val catNames = categories.ifEmpty { listOf(category) }.joinToString(" ")
    val haystack = listOfNotNull(title, shortDescription, primaryBenefit, catNames).joinToString(" ").lowercase()
    return keywords.any { it in haystack }
}

// ─── Main HomeScreen Composable ──────────────────────────────────────────────

@Composable
fun HomeScreen(
    viewModel: HomeViewModel = hiltViewModel(),
    onAddToCart: (Product) -> Unit = {},
    onProductClick: (String) -> Unit = {},
    onShopClick: () -> Unit = {},
    onCartClick: () -> Unit = {},
    /** Display name passed from the navigation host (from Supabase auth profile). */
    userName: String? = null,
    onSearchClick: () -> Unit = {},
    onProfileClick: () -> Unit = {},
    /** Receives the tapped category slug (empty for the built-in fallback circles). */
    onCategoryClick: (String) -> Unit = { onShopClick() },
    cartQuantities: Map<String, Int> = emptyMap(),
    onUpdateCartQuantity: (Product, Int) -> Unit = { _, _ -> }
) {
    val uiState by viewModel.uiState.collectAsState()
    val savedPincode by viewModel.deliveryPincode.collectAsState()
    var showPincodeDialog by remember { mutableStateOf(false) }
    var pincodeInput by remember { mutableStateOf("") }

    val c = AyTheme.colors
    var selectedRemedy by remember { mutableIntStateOf(0) }

    // Dynamic time-of-day greeting
    val hour = Calendar.getInstance().get(Calendar.HOUR_OF_DAY)
    val greetingPrefix = when (hour) {
        in 5..11 -> "Good Morning"
        in 12..16 -> "Good Afternoon"
        in 17..20 -> "Good Evening"
        else -> "Good Night"
    }
    val cleanName = userName?.trim()?.takeIf {
        it.isNotBlank() && !it.equals("null", ignoreCase = true) && !it.equals("undefined", ignoreCase = true)
    }
    val greetingText = if (!cleanName.isNullOrBlank()) "$greetingPrefix, $cleanName" else greetingPrefix

    Column(Modifier.fillMaxSize().background(c.canvas)) {
        // TOP APP HEADER
        AyBrandBar(
            trailing = {
                AyIconButton(Icons.Filled.Notifications, "Notifications", onClick = {})
                AyAvatar(32.dp, onClick = onProfileClick)
            }
        )

        LazyColumn(
            modifier = Modifier.fillMaxSize(),
            contentPadding = PaddingValues(top = 4.dp, bottom = 24.dp),
            verticalArrangement = Arrangement.spacedBy(16.dp)
        ) {
            // 1. INLINE GREETING + DISCREET DELIVERY LOCATION CHIP
            item {
                HomeGreetingRow(
                    greetingText = greetingText,
                    deliveryPincode = savedPincode,
                    onPincodeClick = {
                        pincodeInput = savedPincode ?: ""
                        showPincodeDialog = true
                    }
                )
            }

            // 2. COMPACT DYNAMIC PROMOTIONAL CAROUSEL
            item {
                HomePromoCarousel(
                    slides = defaultPromoSlides,
                    onSlideClick = { slide ->
                        if (slide.destination.isNotBlank()) {
                            onCategoryClick(slide.destination)
                        } else {
                            onShopClick()
                        }
                    }
                )
            }

            // 3. SACRED FORMULATIONS — 4-COLUMN VERTICALLY EXPANDING GRID
            item {
                val liveCategories = (uiState as? UiState.Success)?.data?.categories.orEmpty()
                val circles = if (liveCategories.isNotEmpty()) {
                    liveCategories.map { it.title to it.id }
                } else {
                    defaultCategories.map { it to it }
                }

                SacredFormulationsSection(
                    categories = circles,
                    onCategoryClick = onCategoryClick,
                    onExploreAllClick = onShopClick
                )
            }

            // 4. TARGETED REMEDIES CHIPS
            item {
                TargetedRemediesSection(
                    remedies = remedies,
                    selectedIndex = selectedRemedy,
                    onSelect = { selectedRemedy = it }
                )
            }

            // 5. AYURVEDIC BESTSELLERS
            item {
                val products = (uiState as? UiState.Success)?.data?.featuredProducts.orEmpty()
                AyurvedicBestsellersSection(
                    uiState = uiState,
                    products = products,
                    selectedRemedy = remedies[selectedRemedy],
                    onProductClick = onProductClick,
                    onAddToCart = onAddToCart,
                    onViewAllClick = onShopClick,
                    onRetry = { viewModel.fetchHomeData(forceRefresh = true) }
                )
            }

            // 6. BUSINESS OPPORTUNITY BANNER
            item {
                BusinessOpportunityBanner(onShopClick = onShopClick)
            }

            // 7. RITUAL OF THE DAY
            item {
                RitualOfTheDayCard()
            }
        }
    }

    // Dynamic pincode dialog
    if (showPincodeDialog) {
        DeliveryPincodeDialog(
            pincodeInput = pincodeInput,
            onPincodeInputChange = { input ->
                if (input.length <= 6 && input.all { it.isDigit() }) {
                    pincodeInput = input
                }
            },
            onApply = {
                if (pincodeInput.length == 6) {
                    viewModel.setDeliveryPincode(pincodeInput)
                    showPincodeDialog = false
                }
            },
            onDismiss = { showPincodeDialog = false }
        )
    }
}

// ─── Component: Inline Greeting Row ──────────────────────────────────────────

@Composable
private fun HomeGreetingRow(
    greetingText: String,
    deliveryPincode: String?,
    onPincodeClick: () -> Unit
) {
    val c = AyTheme.colors
    Row(
        modifier = Modifier
            .fillMaxWidth()
            .padding(horizontal = 20.dp, vertical = 2.dp),
        verticalAlignment = Alignment.CenterVertically,
        horizontalArrangement = Arrangement.SpaceBetween
    ) {
        // Compact inline greeting (no colored card, no illustration, minimal vertical space)
        Text(
            text = greetingText,
            fontFamily = PlusJakartaSans,
            fontWeight = FontWeight.SemiBold,
            fontSize = 15.sp,
            color = c.textSub,
            maxLines = 1,
            overflow = TextOverflow.Ellipsis,
            modifier = Modifier.weight(1f, fill = false)
        )

        Spacer(Modifier.width(8.dp))

        // Discreet delivery location chip
        Row(
            modifier = Modifier
                .ayCard(RoundedCornerShape(50), color = c.chip, elevation = 0.dp)
                .clickable(onClick = onPincodeClick)
                .padding(horizontal = 10.dp, vertical = 5.dp),
            verticalAlignment = Alignment.CenterVertically
        ) {
            Icon(Icons.Filled.LocationOn, "Delivery Location", tint = c.accent, modifier = Modifier.size(13.dp))
            Spacer(Modifier.width(4.dp))
            Text(
                text = if (!deliveryPincode.isNullOrBlank()) deliveryPincode else "Jaipur 302001",
                fontFamily = PlusJakartaSans,
                fontWeight = FontWeight.Medium,
                fontSize = 11.sp,
                color = c.text,
                maxLines = 1
            )
            Spacer(Modifier.width(2.dp))
            Icon(Icons.Filled.ExpandMore, null, tint = c.textSub, modifier = Modifier.size(12.dp))
        }
    }
}

// ─── Component: Compact Dynamic Promotional Carousel ─────────────────────────

@Composable
private fun HomePromoCarousel(
    slides: List<PromoSlide>,
    onSlideClick: (PromoSlide) -> Unit
) {
    if (slides.isEmpty()) return

    val c = AyTheme.colors
    val pagerState = rememberPagerState(pageCount = { slides.size })

    // Auto-rotation every 5 seconds; skips scroll if user is actively interacting/scrolling
    LaunchedEffect(pagerState, slides.size) {
        if (slides.size <= 1) return@LaunchedEffect
        while (true) {
            delay(5000L)
            if (!pagerState.isScrollInProgress) {
                val nextPage = (pagerState.currentPage + 1) % slides.size
                pagerState.animateScrollToPage(nextPage)
            }
        }
    }

    if (slides.size == 1) {
        // Single slide: static banner without pager or animation overhead
        Box(Modifier.padding(horizontal = 20.dp)) {
            PromoSlideCard(slide = slides[0], onClick = { onSlideClick(slides[0]) })
        }
    } else {
        // Multiple slides: smooth horizontal pager with auto-rotation and pagination
        Column(Modifier.fillMaxWidth()) {
            HorizontalPager(
                state = pagerState,
                contentPadding = PaddingValues(horizontal = 20.dp),
                pageSpacing = 12.dp,
                modifier = Modifier
                    .fillMaxWidth()
                    .height(154.dp)
            ) { page ->
                val slide = slides[page]
                PromoSlideCard(
                    slide = slide,
                    onClick = { onSlideClick(slide) },
                    pagination = {
                        // Pagination dots aligned in the bottom bar of each card
                        Row(
                            horizontalArrangement = Arrangement.spacedBy(5.dp),
                            verticalAlignment = Alignment.CenterVertically
                        ) {
                            repeat(slides.size) { index ->
                                val isActive = index == pagerState.currentPage
                                Box(
                                    modifier = Modifier
                                        .height(5.dp)
                                        .width(if (isActive) 16.dp else 5.dp)
                                        .clip(RoundedCornerShape(50))
                                        .background(
                                            if (isActive) c.goldFill else Color.White.copy(alpha = 0.35f)
                                        )
                                )
                            }
                        }
                    }
                )
            }
        }
    }
}

@Composable
private fun PromoSlideCard(
    slide: PromoSlide,
    onClick: () -> Unit,
    pagination: @Composable (() -> Unit)? = null
) {
    val c = AyTheme.colors
    val shape = RoundedCornerShape(16.dp)

    Box(
        modifier = Modifier
            .fillMaxWidth()
            .height(154.dp)
            .clip(shape)
            .background(slide.backgroundBrush, shape)
            .clickable(onClick = onClick)
    ) {
        // Subtle watermark botanical icon in the background
        Icon(
            imageVector = slide.icon,
            contentDescription = null,
            tint = Color.White,
            modifier = Modifier
                .align(Alignment.TopEnd)
                .offset(x = 16.dp, y = (-8).dp)
                .size(136.dp)
                .alpha(0.08f)
        )

        // Radial gold highlight shimmer in top right
        Box(
            modifier = Modifier
                .align(Alignment.TopEnd)
                .size(110.dp)
                .background(
                    Brush.radialGradient(
                        listOf(c.goldFill.copy(alpha = 0.18f), Color.Transparent)
                    ),
                    CircleShape
                )
        )

        // Content layout
        Column(
            modifier = Modifier
                .fillMaxSize()
                .padding(horizontal = 16.dp, vertical = 12.dp),
            verticalArrangement = Arrangement.SpaceBetween
        ) {
            // Upper content: Badge + Title + Subtitle
            Column(verticalArrangement = Arrangement.spacedBy(4.dp)) {
                // Badge
                Text(
                    text = slide.badge,
                    modifier = Modifier
                        .background(c.goldFill, RoundedCornerShape(50))
                        .padding(horizontal = 8.dp, vertical = 2.dp),
                    fontFamily = PlusJakartaSans,
                    fontWeight = FontWeight.Bold,
                    fontSize = 9.5.sp,
                    letterSpacing = 0.8.sp,
                    color = c.onGoldFill,
                    maxLines = 1
                )

                // Title
                Text(
                    text = slide.title,
                    fontFamily = NotoSerif,
                    fontWeight = FontWeight.Bold,
                    fontSize = 16.sp,
                    lineHeight = 20.sp,
                    color = Color.White,
                    maxLines = 2,
                    overflow = TextOverflow.Ellipsis
                )

                // Subtitle
                Text(
                    text = slide.subtitle,
                    fontFamily = PlusJakartaSans,
                    fontSize = 11.sp,
                    lineHeight = 14.sp,
                    color = Color.White.copy(alpha = 0.82f),
                    maxLines = 2,
                    overflow = TextOverflow.Ellipsis,
                    modifier = Modifier.fillMaxWidth(0.85f)
                )
            }

            // Lower content: CTA Button on Left, Pagination Dots on Right
            Row(
                modifier = Modifier.fillMaxWidth(),
                horizontalArrangement = Arrangement.SpaceBetween,
                verticalAlignment = Alignment.CenterVertically
            ) {
                // Compact CTA button
                Row(
                    modifier = Modifier
                        .clip(RoundedCornerShape(8.dp))
                        .background(c.goldFill, RoundedCornerShape(8.dp))
                        .padding(horizontal = 12.dp, vertical = 5.dp),
                    verticalAlignment = Alignment.CenterVertically
                ) {
                    Text(
                        text = slide.ctaText,
                        fontFamily = PlusJakartaSans,
                        fontWeight = FontWeight.Bold,
                        fontSize = 12.sp,
                        color = c.onGoldFill
                    )
                    Spacer(Modifier.width(4.dp))
                    Icon(
                        Icons.AutoMirrored.Filled.ArrowForward,
                        contentDescription = null,
                        tint = c.onGoldFill,
                        modifier = Modifier.size(13.dp)
                    )
                }

                // Pagination indicator
                pagination?.invoke()
            }
        }
    }
}

// ─── Component: Sacred Formulations (4-Column Grid) ──────────────────────────

@Composable
private fun SacredFormulationsSection(
    categories: List<Pair<String, String>>,
    onCategoryClick: (String) -> Unit,
    onExploreAllClick: () -> Unit
) {
    val c = AyTheme.colors

    Column(verticalArrangement = Arrangement.spacedBy(10.dp)) {
        // Section Header
        Row(
            modifier = Modifier
                .fillMaxWidth()
                .padding(horizontal = 20.dp),
            verticalAlignment = Alignment.CenterVertically
        ) {
            Text(
                text = "Sacred Formulations",
                modifier = Modifier.weight(1f),
                fontFamily = NotoSerif,
                fontWeight = FontWeight.Bold,
                fontSize = 20.sp,
                color = c.heading
            )
            Text(
                text = "EXPLORE ALL",
                modifier = Modifier.clickable(onClick = onExploreAllClick),
                fontFamily = PlusJakartaSans,
                fontWeight = FontWeight.Bold,
                fontSize = 11.sp,
                letterSpacing = 0.8.sp,
                color = c.accent
            )
        }

        // 4-Column Vertically Expanding Grid (No horizontal scrolling!)
        Column(
            modifier = Modifier
                .fillMaxWidth()
                .padding(horizontal = 14.dp),
            verticalArrangement = Arrangement.spacedBy(14.dp)
        ) {
            categories.chunked(4).forEach { rowItems ->
                Row(
                    modifier = Modifier.fillMaxWidth(),
                    horizontalArrangement = Arrangement.spacedBy(8.dp)
                ) {
                    rowItems.forEach { (title, slug) ->
                        Column(
                            modifier = Modifier
                                .weight(1f)
                                .clip(RoundedCornerShape(12.dp))
                                .clickable { onCategoryClick(slug) }
                                .padding(vertical = 4.dp, horizontal = 2.dp),
                            horizontalAlignment = Alignment.CenterHorizontally,
                            verticalArrangement = Arrangement.spacedBy(6.dp)
                        ) {
                            // Circular icon container
                            Box(
                                modifier = Modifier
                                    .size(52.dp)
                                    .ayCard(CircleShape, color = c.chipHigh, elevation = 1.dp),
                                contentAlignment = Alignment.Center
                            ) {
                                Icon(
                                    imageVector = categoryIcon(title),
                                    contentDescription = title,
                                    tint = c.heading,
                                    modifier = Modifier.size(24.dp)
                                )
                            }

                            // Centered label allowing natural 2-line wrapping
                            Text(
                                text = title,
                                fontFamily = PlusJakartaSans,
                                fontWeight = FontWeight.Medium,
                                fontSize = 11.sp,
                                lineHeight = 14.sp,
                                color = c.text,
                                maxLines = 2,
                                minLines = 2,
                                textAlign = TextAlign.Center,
                                overflow = TextOverflow.Ellipsis,
                                modifier = Modifier.fillMaxWidth()
                            )
                        }
                    }

                    // Pad empty slots if last row has fewer than 4 items so column widths remain equal
                    if (rowItems.size < 4) {
                        repeat(4 - rowItems.size) {
                            Spacer(Modifier.weight(1f))
                        }
                    }
                }
            }
        }
    }
}

// ─── Component: Targeted Remedies ────────────────────────────────────────────

@Composable
private fun TargetedRemediesSection(
    remedies: List<Remedy>,
    selectedIndex: Int,
    onSelect: (Int) -> Unit
) {
    val c = AyTheme.colors

    Column(verticalArrangement = Arrangement.spacedBy(8.dp)) {
        Text(
            text = "TARGETED REMEDIES",
            modifier = Modifier.padding(horizontal = 20.dp),
            fontFamily = PlusJakartaSans,
            fontWeight = FontWeight.Bold,
            fontSize = 11.sp,
            letterSpacing = 0.8.sp,
            color = c.textSub
        )
        LazyRow(
            contentPadding = PaddingValues(horizontal = 20.dp, vertical = 2.dp),
            horizontalArrangement = Arrangement.spacedBy(8.dp)
        ) {
            items(remedies.size) { i ->
                AyPill(
                    text = remedies[i].label,
                    selected = i == selectedIndex,
                    onClick = { onSelect(i) },
                    leadingIcon = if (i == selectedIndex) Icons.Filled.Check else null
                )
            }
        }
    }
}

// ─── Component: Ayurvedic Bestsellers ────────────────────────────────────────

@Composable
private fun AyurvedicBestsellersSection(
    uiState: UiState<*>,
    products: List<Product>,
    selectedRemedy: Remedy,
    onProductClick: (String) -> Unit,
    onAddToCart: (Product) -> Unit,
    onViewAllClick: () -> Unit,
    onRetry: () -> Unit
) {
    val c = AyTheme.colors

    Column(
        modifier = Modifier.padding(horizontal = 20.dp),
        verticalArrangement = Arrangement.spacedBy(12.dp)
    ) {
        Row(verticalAlignment = Alignment.CenterVertically) {
            Column(Modifier.weight(1f)) {
                Text(
                    text = "Ayurvedic Bestsellers",
                    fontFamily = NotoSerif,
                    fontWeight = FontWeight.Bold,
                    fontSize = 20.sp,
                    color = c.heading
                )
                Text(
                    text = "Time-tested potent artisanal batches",
                    fontFamily = PlusJakartaSans,
                    fontSize = 12.sp,
                    color = c.textSub
                )
            }
            Row(
                modifier = Modifier.clickable(onClick = onViewAllClick),
                verticalAlignment = Alignment.CenterVertically
            ) {
                Text(
                    text = if (products.isNotEmpty()) "VIEW ${products.size}" else "VIEW ALL",
                    fontFamily = PlusJakartaSans,
                    fontWeight = FontWeight.Bold,
                    fontSize = 11.sp,
                    letterSpacing = 0.8.sp,
                    color = c.accent
                )
                Icon(
                    Icons.AutoMirrored.Filled.KeyboardArrowRight,
                    contentDescription = null,
                    tint = c.accent,
                    modifier = Modifier.size(14.dp)
                )
            }
        }

        when (uiState) {
            is UiState.Success -> {
                val keywords = selectedRemedy.keywords
                val ordered = products.sortedByDescending { it.matches(keywords) }.take(6)
                ordered.chunked(2).forEach { pair ->
                    Row(
                        modifier = Modifier.fillMaxWidth(),
                        horizontalArrangement = Arrangement.spacedBy(12.dp)
                    ) {
                        pair.forEach { p ->
                            AyHomeProductCard(
                                title = p.title,
                                price = p.price,
                                originalPrice = p.originalPrice,
                                discount = ayDiscountPercent(p.price, p.originalPrice, p.discount),
                                rating = p.rating,
                                reviewCount = p.reviewCount,
                                badge = p.badge,
                                imageUrl = p.imageUrl,
                                onClick = { onProductClick(p.slug) },
                                onAddToBag = { onAddToCart(p) },
                                modifier = Modifier.weight(1f)
                            )
                        }
                        if (pair.size == 1) Spacer(Modifier.weight(1f))
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
                        text = "Cannot reach our servers",
                        fontFamily = NotoSerif,
                        fontWeight = FontWeight.Bold,
                        fontSize = 16.sp,
                        color = c.heading
                    )
                    Text(
                        text = uiState.message,
                        fontFamily = PlusJakartaSans,
                        fontSize = 12.sp,
                        color = c.error,
                        textAlign = TextAlign.Center
                    )
                    AyOutlineButton("Retry", onClick = onRetry, height = 44.dp)
                }
            }
            else -> {
                Row(Modifier.fillMaxWidth(), horizontalArrangement = Arrangement.spacedBy(12.dp)) {
                    repeat(2) { SkeletonCard(Modifier.weight(1f)) }
                }
            }
        }
    }
}

// ─── Component: Business Opportunity Banner ──────────────────────────────────

@Composable
private fun BusinessOpportunityBanner(onShopClick: () -> Unit) {
    val c = AyTheme.colors
    val shape = RoundedCornerShape(16.dp)

    Box(
        modifier = Modifier
            .padding(horizontal = 20.dp)
            .fillMaxWidth()
            .clip(shape)
            .background(c.bannerBg, shape)
            .then(if (c.isDark) Modifier.border(1.dp, c.border, shape) else Modifier)
    ) {
        Box(
            modifier = Modifier
                .align(Alignment.BottomEnd)
                .offset(x = 40.dp, y = 40.dp)
                .size(160.dp)
                .background(
                    Brush.radialGradient(listOf(c.goldFill.copy(alpha = 0.25f), c.goldFill.copy(alpha = 0f))),
                    CircleShape
                )
        )
        Column(Modifier.padding(20.dp), verticalArrangement = Arrangement.spacedBy(8.dp)) {
            Row(verticalAlignment = Alignment.CenterVertically) {
                Icon(Icons.Filled.WorkspacePremium, null, tint = c.goldFill, modifier = Modifier.size(20.dp))
                Spacer(Modifier.width(8.dp))
                Text(
                    text = "DIVYA SHAKTI NETWORK",
                    fontFamily = PlusJakartaSans,
                    fontWeight = FontWeight.Bold,
                    fontSize = 11.sp,
                    letterSpacing = 0.8.sp,
                    color = c.goldFill
                )
            }
            Text(
                text = "Natural Aroma & Business Opportunity",
                fontFamily = NotoSerif,
                fontWeight = FontWeight.Bold,
                fontSize = 20.sp,
                lineHeight = 26.sp,
                color = c.onBanner
            )
            Text(
                text = "Partner with Ayurdhara as a certified Ayurvedic Wellness Consultant & Distributor to grow together in sacred health.",
                fontFamily = PlusJakartaSans,
                fontSize = 12.sp,
                lineHeight = 19.sp,
                color = c.onBanner.copy(alpha = 0.85f)
            )
            Row(
                modifier = Modifier
                    .padding(top = 8.dp)
                    .clickable(onClick = onShopClick),
                verticalAlignment = Alignment.CenterVertically
            ) {
                Text(
                    text = "Learn More",
                    fontFamily = PlusJakartaSans,
                    fontWeight = FontWeight.Bold,
                    fontSize = 14.sp,
                    color = c.goldFill
                )
                Spacer(Modifier.width(6.dp))
                Icon(Icons.AutoMirrored.Filled.ArrowForward, null, tint = c.goldFill, modifier = Modifier.size(16.dp))
            }
        }
    }
}

// ─── Component: Ritual of the Day Card ───────────────────────────────────────

@Composable
private fun RitualOfTheDayCard() {
    val c = AyTheme.colors
    Row(
        modifier = Modifier
            .padding(horizontal = 20.dp)
            .fillMaxWidth()
            .ayCard(RoundedCornerShape(12.dp), color = c.chipHigh, elevation = 1.dp)
            .padding(14.dp),
        verticalAlignment = Alignment.CenterVertically
    ) {
        Box(Modifier.size(40.dp).background(c.card, CircleShape), contentAlignment = Alignment.Center) {
            Icon(Icons.Filled.Spa, null, tint = c.accent, modifier = Modifier.size(20.dp))
        }
        Spacer(Modifier.width(12.dp))
        Column(Modifier.weight(1f)) {
            Text(
                text = "RITUAL OF THE DAY",
                fontFamily = PlusJakartaSans,
                fontWeight = FontWeight.Bold,
                fontSize = 10.sp,
                letterSpacing = 1.5.sp,
                color = c.accent
            )
            Text(
                text = "\"Swasthyasya swasthya rakshanam — Nurture your natural rhythm.\"",
                fontFamily = PlusJakartaSans,
                fontStyle = FontStyle.Italic,
                fontSize = 12.sp,
                color = c.text,
                maxLines = 1,
                overflow = TextOverflow.Ellipsis
            )
        }
    }
}

// ─── Component: Delivery Pincode Dialog ──────────────────────────────────────

@Composable
private fun DeliveryPincodeDialog(
    pincodeInput: String,
    onPincodeInputChange: (String) -> Unit,
    onApply: () -> Unit,
    onDismiss: () -> Unit
) {
    val c = AyTheme.colors
    AlertDialog(
        onDismissRequest = onDismiss,
        title = {
            Text("Delivery Location", fontFamily = NotoSerif, fontWeight = FontWeight.Bold, color = c.heading)
        },
        text = {
            Column(verticalArrangement = Arrangement.spacedBy(8.dp)) {
                Text(
                    text = "Enter your 6-digit postal code to check product availability & fastest delivery.",
                    fontFamily = PlusJakartaSans,
                    fontSize = 13.sp,
                    color = c.textSub
                )
                OutlinedTextField(
                    value = pincodeInput,
                    onValueChange = onPincodeInputChange,
                    placeholder = { Text("e.g. 302001", color = c.textMuted) },
                    singleLine = true,
                    keyboardOptions = KeyboardOptions(keyboardType = KeyboardType.Number),
                    modifier = Modifier.fillMaxWidth()
                )
            }
        },
        confirmButton = {
            TextButton(onClick = onApply) {
                Text("Apply", fontWeight = FontWeight.Bold, color = c.accent)
            }
        },
        dismissButton = {
            TextButton(onClick = onDismiss) {
                Text("Cancel", color = c.textMuted)
            }
        }
    )
}

// ─── Component: Skeleton Placeholder Card ────────────────────────────────────

@Composable
private fun SkeletonCard(modifier: Modifier = Modifier) {
    val c = AyTheme.colors
    Column(
        modifier = modifier
            .ayCard(RoundedCornerShape(16.dp), elevation = 2.dp)
            .padding(12.dp),
        verticalArrangement = Arrangement.spacedBy(8.dp)
    ) {
        Box(Modifier.fillMaxWidth().aspectRatio(1f).background(if (c.isDark) c.chipHigh else c.chip, RoundedCornerShape(12.dp)))
        Box(Modifier.fillMaxWidth(0.4f).height(10.dp).background(if (c.isDark) c.chipHigh else c.chip, RoundedCornerShape(4.dp)))
        Box(Modifier.fillMaxWidth().height(32.dp).background(if (c.isDark) c.chipHigh else c.chip, RoundedCornerShape(4.dp)))
        Box(Modifier.fillMaxWidth().height(36.dp).background(if (c.isDark) c.chipHigh else c.chip, RoundedCornerShape(12.dp)))
    }
}
