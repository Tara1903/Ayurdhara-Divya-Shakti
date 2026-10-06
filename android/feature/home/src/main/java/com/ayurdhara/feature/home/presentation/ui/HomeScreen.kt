package com.ayurdhara.feature.home.presentation.ui

import androidx.compose.foundation.background
import androidx.compose.foundation.border
import androidx.compose.foundation.clickable
import androidx.compose.foundation.layout.*
import androidx.compose.foundation.lazy.LazyColumn
import androidx.compose.foundation.lazy.LazyRow
import androidx.compose.foundation.lazy.items
import androidx.compose.foundation.shape.CircleShape
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.automirrored.filled.ArrowForward
import androidx.compose.material.icons.automirrored.filled.KeyboardArrowRight
import androidx.compose.material.icons.filled.Balance
import androidx.compose.material.icons.filled.Check
import androidx.compose.material.icons.filled.EmojiFoodBeverage
import androidx.compose.material.icons.filled.ExpandMore
import androidx.compose.material.icons.filled.Eco
import androidx.compose.material.icons.filled.Grain
import androidx.compose.material.icons.filled.Grass
import androidx.compose.material.icons.filled.LocalFlorist
import androidx.compose.material.icons.filled.LocationOn
import androidx.compose.material.icons.filled.Notifications
import androidx.compose.material.icons.filled.Opacity
import androidx.compose.material.icons.filled.Search
import androidx.compose.material.icons.filled.Spa
import androidx.compose.material.icons.filled.WorkspacePremium
import androidx.compose.material3.Icon
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.runtime.collectAsState
import androidx.compose.runtime.getValue
import androidx.compose.runtime.mutableIntStateOf
import androidx.compose.runtime.remember
import androidx.compose.runtime.setValue
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.draw.alpha
import androidx.compose.ui.draw.clip
import androidx.compose.ui.graphics.Brush
import androidx.compose.ui.graphics.vector.ImageVector
import androidx.compose.ui.text.font.FontStyle
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.text.style.TextAlign
import androidx.compose.ui.text.style.TextOverflow
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import androidx.hilt.navigation.compose.hiltViewModel
import com.ayurdhara.core.common.domain.model.Product
import com.ayurdhara.core.common.result.UiState
import com.ayurdhara.core.designsystem.components.AyBrandBar
import com.ayurdhara.core.designsystem.components.AyAvatar
import com.ayurdhara.core.designsystem.components.AyHeroBrush
import com.ayurdhara.core.designsystem.components.AyHomeProductCard
import com.ayurdhara.core.designsystem.components.AyIconButton
import com.ayurdhara.core.designsystem.components.AyOutlineButton
import com.ayurdhara.core.designsystem.components.AyPill
import com.ayurdhara.core.designsystem.components.ayCard
import com.ayurdhara.core.designsystem.components.ayDiscountPercent
import com.ayurdhara.core.designsystem.theme.AyTheme
import com.ayurdhara.core.designsystem.theme.NotoSerif
import com.ayurdhara.core.designsystem.theme.PlusJakartaSans
import com.ayurdhara.feature.home.presentation.viewmodel.HomeViewModel
import java.util.Calendar

private data class Remedy(val label: String, val keywords: List<String>)

private val remedies = listOf(
    Remedy("Hair Fall Control", listOf("hair", "bhringraj", "scalp")),
    Remedy("Joint & Muscle Pain", listOf("joint", "muscle", "pain", "mahanarayan")),
    Remedy("Digestive Health", listOf("digest", "gut", "triphala", "churna")),
    Remedy("Immunity Booster", listOf("immun", "chyawanprash", "giloy", "tulsi")),
    Remedy("Deep Sleep", listOf("sleep", "ashwagandha", "brahmi", "stress"))
)

/** Fallback circles shown until the realtime categories arrive. */
private val defaultCategories = listOf("Cold Pressed Oils", "Raw Herbs", "Teas & Kadha", "Powders", "Superfoods", "Natural Aroma")

private fun categoryIcon(title: String): ImageVector {
    val t = title.lowercase()
    return when {
        "oil" in t -> Icons.Filled.Opacity
        "herb" in t -> Icons.Filled.Grass
        "tea" in t || "kadha" in t -> Icons.Filled.EmojiFoodBeverage
        "powder" in t || "churna" in t -> Icons.Filled.Grain
        "super" in t || "food" in t -> Icons.Filled.Eco
        "aroma" in t || "flor" in t -> Icons.Filled.LocalFlorist
        else -> Icons.Filled.Spa
    }
}

private fun Product.matches(keywords: List<String>): Boolean {
    val haystack = (listOfNotNull(title, shortDescription, primaryBenefit, category) + categories).joinToString(" ").lowercase()
    return keywords.any { it in haystack }
}

@Composable
fun HomeScreen(
    viewModel: HomeViewModel = hiltViewModel(),
    onAddToCart: (Product) -> Unit = {},
    onProductClick: (String) -> Unit = {},
    onShopClick: () -> Unit = {},
    onCartClick: () -> Unit = {},
    /** Profile name for the greeting; falls back to "Rahul" when unavailable. */
    userName: String? = null,
    onSearchClick: () -> Unit = {},
    onProfileClick: () -> Unit = {},
    /** Receives the tapped category slug (empty for the built-in fallback circles). */
    onCategoryClick: (String) -> Unit = { onShopClick() }
) {
    val uiState by viewModel.uiState.collectAsState()
    val c = AyTheme.colors
    var selectedRemedy by remember { mutableIntStateOf(0) }

    val hour = Calendar.getInstance().get(Calendar.HOUR_OF_DAY)
    val (greeting, doshaBadge, doshaAdvice) = remember(hour) {
        when (hour) {
            in 5..11 -> Triple(
                "Good Morning",
                "Kapha Awaken",
                "Awaken your vitality today with energizing herbal infusions and fresh morning rituals."
            )
            in 12..16 -> Triple(
                "Good Afternoon",
                "Pitta Balance",
                "Soothe your internal fire today and stay centered with cooling herbal preparations."
            )
            in 17..20 -> Triple(
                "Good Evening",
                "Vata-Pitta Balance",
                "Balance your Vata dosha today with warm sesame oil rituals and herbal soothing infusions."
            )
            else -> Triple(
                "Good Night",
                "Sattva Rest",
                "Unwind your senses tonight with tranquil rest rituals and soothing herbal elixirs."
            )
        }
    }
    val displayName = userName?.trim()?.takeIf { it.isNotBlank() }
    val greetingText = if (!displayName.isNullOrBlank()) "$greeting, $displayName 🌿" else "$greeting 🌿"

    Column(Modifier.fillMaxSize().background(c.canvas)) {
        AyBrandBar(
            trailing = {
                AyIconButton(Icons.Filled.Notifications, "Notifications", onClick = {})
                AyAvatar(32.dp, onClick = onProfileClick)
            }
        )
        LazyColumn(
            modifier = Modifier.fillMaxSize(),
            contentPadding = PaddingValues(top = 8.dp, bottom = 24.dp),
            verticalArrangement = Arrangement.spacedBy(20.dp)
        ) {
            // 1. Delivery location + search action (single profile icon preserved in top bar)
            item {
                Row(
                    Modifier.fillMaxWidth().padding(horizontal = 20.dp),
                    verticalAlignment = Alignment.CenterVertically
                ) {
                    Row(
                        Modifier
                            .ayCard(RoundedCornerShape(50), color = c.cardLow, elevation = 1.dp)
                            .padding(horizontal = 12.dp, vertical = 6.dp),
                        verticalAlignment = Alignment.CenterVertically
                    ) {
                        Icon(Icons.Filled.LocationOn, null, tint = c.accent, modifier = Modifier.size(16.dp))
                        Spacer(Modifier.width(6.dp))
                        Text("Deliver to: ", fontFamily = PlusJakartaSans, fontSize = 12.sp, color = c.textSub)
                        Text("Jaipur 302001", fontFamily = PlusJakartaSans, fontWeight = FontWeight.SemiBold, fontSize = 12.sp, color = c.text)
                        Spacer(Modifier.width(4.dp))
                        Icon(Icons.Filled.ExpandMore, null, tint = c.textSub, modifier = Modifier.size(14.dp))
                    }
                    Spacer(Modifier.weight(1f))
                    QuickAction(Icons.Filled.Search, "Search", dot = false, onClick = onSearchClick)
                }
            }

            // 2. Greeting card
            item {
                val shape = RoundedCornerShape(16.dp)
                Box(
                    Modifier
                        .padding(horizontal = 20.dp)
                        .fillMaxWidth()
                        .clip(shape)
                        .background(Brush.horizontalGradient(listOf(c.cardLow, c.chip, c.goldFill.copy(alpha = 0.2f))), shape)
                ) {
                    Box(
                        Modifier.align(Alignment.BottomEnd).offset(x = 24.dp, y = 24.dp).size(96.dp)
                            .background(Brush.radialGradient(listOf(c.goldFill.copy(alpha = 0.4f), c.goldFill.copy(alpha = 0f))), CircleShape)
                    )
                    Column(Modifier.padding(16.dp), verticalArrangement = Arrangement.spacedBy(8.dp)) {
                        Row(verticalAlignment = Alignment.CenterVertically) {
                            Text(
                                greetingText, Modifier.weight(1f),
                                fontFamily = NotoSerif, fontWeight = FontWeight.Bold, fontSize = 20.sp, lineHeight = 26.sp, color = c.heading
                            )
                            Spacer(Modifier.width(8.dp))
                            Row(
                                Modifier.background(c.goldFill, RoundedCornerShape(50)).padding(horizontal = 10.dp, vertical = 2.dp),
                                verticalAlignment = Alignment.CenterVertically
                            ) {
                                Icon(Icons.Filled.Balance, null, tint = c.onGoldFill, modifier = Modifier.size(12.dp))
                                Spacer(Modifier.width(4.dp))
                                Text(
                                    doshaBadge, fontFamily = PlusJakartaSans, fontWeight = FontWeight.SemiBold,
                                    fontSize = 11.sp, color = c.onGoldFill, maxLines = 1
                                )
                            }
                        }
                        Text(
                            doshaAdvice,
                            Modifier.padding(end = 16.dp),
                            fontFamily = PlusJakartaSans, fontSize = 14.sp, lineHeight = 20.sp, color = c.textSub
                        )
                    }
                }
            }

            // 3. Hero banner
            item {
                val shape = RoundedCornerShape(16.dp)
                Box(
                    Modifier.padding(horizontal = 20.dp).fillMaxWidth().clip(shape).background(AyHeroBrush(), shape)
                ) {
                    Icon(
                        Icons.Filled.Spa, null, tint = c.goldFill,
                        modifier = Modifier.align(Alignment.TopEnd).size(144.dp).alpha(0.10f)
                    )
                    Column(Modifier.padding(20.dp), verticalArrangement = Arrangement.spacedBy(10.dp)) {
                        Text(
                            "100% RAW & UNREFINED",
                            Modifier.background(c.goldFill, RoundedCornerShape(50)).padding(horizontal = 10.dp, vertical = 2.dp),
                            fontFamily = PlusJakartaSans, fontWeight = FontWeight.Bold, fontSize = 11.sp, letterSpacing = 0.8.sp, color = c.onGoldFill
                        )
                        Text(
                            "Divya Shakti Cold Pressed Sesame & Herbal Oils",
                            fontFamily = NotoSerif, fontWeight = FontWeight.Bold, fontSize = 24.sp, lineHeight = 30.sp, color = c.onHero
                        )
                        Text(
                            "Extracted in slow traditional stone ghani mills without heat, synthetic solvents, or chemical preservatives.",
                            Modifier.widthIn(max = 270.dp),
                            fontFamily = PlusJakartaSans, fontSize = 12.sp, lineHeight = 18.sp, color = c.onHeroSub
                        )
                        Row(
                            Modifier.padding(top = 2.dp)
                                .clip(RoundedCornerShape(12.dp))
                                .background(c.goldFill, RoundedCornerShape(12.dp))
                                .clickable(onClick = onShopClick)
                                .padding(horizontal = 16.dp, vertical = 10.dp),
                            verticalAlignment = Alignment.CenterVertically
                        ) {
                            Text("Shop Now", fontFamily = PlusJakartaSans, fontWeight = FontWeight.Bold, fontSize = 14.sp, color = c.onGoldFill)
                            Spacer(Modifier.width(6.dp))
                            Icon(Icons.AutoMirrored.Filled.ArrowForward, null, tint = c.onGoldFill, modifier = Modifier.size(16.dp))
                        }
                    }
                }
            }

            // 4. Sacred Formulations (category circles)
            item {
                Column(verticalArrangement = Arrangement.spacedBy(10.dp)) {
                    Row(Modifier.fillMaxWidth().padding(horizontal = 20.dp), verticalAlignment = Alignment.CenterVertically) {
                        Text("Sacred Formulations", Modifier.weight(1f), fontFamily = NotoSerif, fontWeight = FontWeight.Bold, fontSize = 20.sp, color = c.heading)
                        Text(
                            "EXPLORE ALL", Modifier.clickable(onClick = onShopClick),
                            fontFamily = PlusJakartaSans, fontWeight = FontWeight.Bold, fontSize = 11.sp, letterSpacing = 0.8.sp, color = c.accent
                        )
                    }
                    val liveCategories = (uiState as? UiState.Success)?.data?.categories.orEmpty()
                    val circles = if (liveCategories.isNotEmpty()) liveCategories.map { it.title to it.slug } else defaultCategories.map { it to "" }
                    LazyRow(
                        contentPadding = PaddingValues(horizontal = 20.dp, vertical = 4.dp),
                        horizontalArrangement = Arrangement.spacedBy(14.dp)
                    ) {
                        items(circles) { (title, slug) ->
                            Column(
                                Modifier.width(64.dp).clickable { onCategoryClick(slug) },
                                horizontalAlignment = Alignment.CenterHorizontally,
                                verticalArrangement = Arrangement.spacedBy(6.dp)
                            ) {
                                Box(
                                    Modifier.size(56.dp).ayCard(CircleShape, color = c.chipHigh, elevation = 1.dp),
                                    contentAlignment = Alignment.Center
                                ) {
                                    Icon(categoryIcon(title), null, tint = c.heading, modifier = Modifier.size(24.dp))
                                }
                                Text(
                                    title, fontFamily = PlusJakartaSans, fontWeight = FontWeight.Medium, fontSize = 11.sp,
                                    lineHeight = 14.sp, color = c.text, maxLines = 2, textAlign = TextAlign.Center, overflow = TextOverflow.Ellipsis
                                )
                            }
                        }
                    }
                }
            }

            // 5. Targeted Remedies chips
            item {
                Column(verticalArrangement = Arrangement.spacedBy(8.dp)) {
                    Text(
                        "TARGETED REMEDIES", Modifier.padding(horizontal = 20.dp),
                        fontFamily = PlusJakartaSans, fontWeight = FontWeight.Bold, fontSize = 11.sp, letterSpacing = 0.8.sp, color = c.textSub
                    )
                    LazyRow(
                        contentPadding = PaddingValues(horizontal = 20.dp, vertical = 2.dp),
                        horizontalArrangement = Arrangement.spacedBy(8.dp)
                    ) {
                        items(remedies.size) { i ->
                            AyPill(
                                text = remedies[i].label,
                                selected = i == selectedRemedy,
                                onClick = { selectedRemedy = i },
                                leadingIcon = if (i == selectedRemedy) Icons.Filled.Check else null
                            )
                        }
                    }
                }
            }

            // 6. Ayurvedic Bestsellers
            item {
                val products = (uiState as? UiState.Success)?.data?.featuredProducts.orEmpty()
                Column(Modifier.padding(horizontal = 20.dp), verticalArrangement = Arrangement.spacedBy(12.dp)) {
                    Row(verticalAlignment = Alignment.CenterVertically) {
                        Column(Modifier.weight(1f)) {
                            Text("Ayurvedic Bestsellers", fontFamily = NotoSerif, fontWeight = FontWeight.Bold, fontSize = 20.sp, color = c.heading)
                            Text("Time-tested potent artisanal batches", fontFamily = PlusJakartaSans, fontSize = 12.sp, color = c.textSub)
                        }
                        Row(Modifier.clickable(onClick = onShopClick), verticalAlignment = Alignment.CenterVertically) {
                            Text(
                                if (products.isNotEmpty()) "VIEW ${products.size}" else "VIEW ALL",
                                fontFamily = PlusJakartaSans, fontWeight = FontWeight.Bold, fontSize = 11.sp, letterSpacing = 0.8.sp, color = c.accent
                            )
                            Icon(Icons.AutoMirrored.Filled.KeyboardArrowRight, null, tint = c.accent, modifier = Modifier.size(14.dp))
                        }
                    }
                    when (val state = uiState) {
                        is UiState.Success -> {
                            val keywords = remedies[selectedRemedy].keywords
                            // Products matching the chosen concern float to the top; nothing is hidden.
                            val ordered = products.sortedByDescending { it.matches(keywords) }.take(6)
                            ordered.chunked(2).forEach { pair ->
                                Row(Modifier.fillMaxWidth(), horizontalArrangement = Arrangement.spacedBy(12.dp)) {
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
                                Modifier.fillMaxWidth().ayCard(RoundedCornerShape(16.dp)).padding(16.dp),
                                horizontalAlignment = Alignment.CenterHorizontally,
                                verticalArrangement = Arrangement.spacedBy(8.dp)
                            ) {
                                Text("Cannot reach our servers", fontFamily = NotoSerif, fontWeight = FontWeight.Bold, fontSize = 16.sp, color = c.heading)
                                Text(state.message, fontFamily = PlusJakartaSans, fontSize = 12.sp, color = c.error, textAlign = TextAlign.Center)
                                AyOutlineButton("Retry", onClick = { viewModel.fetchHomeData() }, height = 44.dp)
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

            // 7. Business Opportunity banner
            item {
                val shape = RoundedCornerShape(16.dp)
                Box(
                    Modifier.padding(horizontal = 20.dp).fillMaxWidth().clip(shape)
                        .background(c.bannerBg, shape)
                        .then(if (c.isDark) Modifier.border(1.dp, c.border, shape) else Modifier)
                ) {
                    Box(
                        Modifier.align(Alignment.BottomEnd).offset(x = 40.dp, y = 40.dp).size(160.dp)
                            .background(Brush.radialGradient(listOf(c.goldFill.copy(alpha = 0.25f), c.goldFill.copy(alpha = 0f))), CircleShape)
                    )
                    Column(Modifier.padding(20.dp), verticalArrangement = Arrangement.spacedBy(8.dp)) {
                        Row(verticalAlignment = Alignment.CenterVertically) {
                            Icon(Icons.Filled.WorkspacePremium, null, tint = c.goldFill, modifier = Modifier.size(20.dp))
                            Spacer(Modifier.width(8.dp))
                            Text(
                                "DIVYA SHAKTI NETWORK", fontFamily = PlusJakartaSans, fontWeight = FontWeight.Bold,
                                fontSize = 11.sp, letterSpacing = 0.8.sp, color = c.goldFill
                            )
                        }
                        Text(
                            "Natural Aroma & Business Opportunity",
                            fontFamily = NotoSerif, fontWeight = FontWeight.Bold, fontSize = 20.sp, lineHeight = 26.sp, color = c.onBanner
                        )
                        Text(
                            "Partner with Ayurdhara as a certified Ayurvedic Wellness Consultant & Distributor to grow together in sacred health.",
                            fontFamily = PlusJakartaSans, fontSize = 12.sp, lineHeight = 19.sp, color = c.onBanner.copy(alpha = 0.85f)
                        )
                        Row(Modifier.padding(top = 8.dp), verticalAlignment = Alignment.CenterVertically) {
                            Text("Learn More", fontFamily = PlusJakartaSans, fontWeight = FontWeight.Bold, fontSize = 14.sp, color = c.goldFill)
                            Spacer(Modifier.width(6.dp))
                            Icon(Icons.AutoMirrored.Filled.ArrowForward, null, tint = c.goldFill, modifier = Modifier.size(16.dp))
                        }
                    }
                }
            }

            // Ritual of the Day
            item {
                Row(
                    Modifier.padding(horizontal = 20.dp).fillMaxWidth()
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
                            "RITUAL OF THE DAY", fontFamily = PlusJakartaSans, fontWeight = FontWeight.Bold,
                            fontSize = 10.sp, letterSpacing = 1.5.sp, color = c.accent
                        )
                        Text(
                            "\"Swasthyasya swasthya rakshanam — Nurture your natural rhythm.\"",
                            fontFamily = PlusJakartaSans, fontStyle = FontStyle.Italic, fontSize = 12.sp, color = c.text,
                            maxLines = 1, overflow = TextOverflow.Ellipsis
                        )
                    }
                }
            }
        }
    }
}

/** 36dp round action button (search / notifications) with an optional gold dot. */
@Composable
private fun QuickAction(icon: ImageVector, description: String, dot: Boolean, onClick: () -> Unit) {
    val c = AyTheme.colors
    Box(
        Modifier.size(36.dp).ayCard(CircleShape, color = c.chip, elevation = 1.dp).clickable(onClick = onClick),
        contentAlignment = Alignment.Center
    ) {
        Icon(icon, description, tint = c.heading, modifier = Modifier.size(18.dp))
        if (dot) Box(Modifier.align(Alignment.TopEnd).padding(6.dp).size(8.dp).background(c.accent, CircleShape))
    }
}

@Composable
private fun SkeletonCard(modifier: Modifier = Modifier) {
    val c = AyTheme.colors
    Column(modifier.ayCard(RoundedCornerShape(16.dp), elevation = 2.dp).padding(12.dp), verticalArrangement = Arrangement.spacedBy(8.dp)) {
        Box(Modifier.fillMaxWidth().aspectRatio(1f).background(if (c.isDark) c.chipHigh else c.chip, RoundedCornerShape(12.dp)))
        Box(Modifier.fillMaxWidth(0.4f).height(10.dp).background(if (c.isDark) c.chipHigh else c.chip, RoundedCornerShape(4.dp)))
        Box(Modifier.fillMaxWidth().height(32.dp).background(if (c.isDark) c.chipHigh else c.chip, RoundedCornerShape(4.dp)))
        Box(Modifier.fillMaxWidth().height(36.dp).background(if (c.isDark) c.chipHigh else c.chip, RoundedCornerShape(12.dp)))
    }
}
