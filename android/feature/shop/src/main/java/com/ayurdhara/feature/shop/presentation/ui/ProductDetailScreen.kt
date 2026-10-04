package com.ayurdhara.feature.shop.presentation.ui

import android.content.Intent
import androidx.compose.animation.AnimatedVisibility
import androidx.compose.animation.core.animateDpAsState
import androidx.compose.animation.fadeIn
import androidx.compose.animation.fadeOut
import androidx.compose.animation.slideInVertically
import androidx.compose.foundation.background
import androidx.compose.foundation.border
import androidx.compose.foundation.clickable
import androidx.compose.foundation.layout.*
import androidx.compose.foundation.lazy.LazyRow
import androidx.compose.foundation.lazy.itemsIndexed
import androidx.compose.foundation.rememberScrollState
import androidx.compose.foundation.shape.CircleShape
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.foundation.verticalScroll
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.automirrored.filled.ArrowForward
import androidx.compose.material.icons.filled.*
import androidx.compose.material3.CircularProgressIndicator
import androidx.compose.material3.Icon
import androidx.compose.material3.Text
import androidx.compose.runtime.*
import androidx.compose.runtime.saveable.rememberSaveable
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.draw.clip
import androidx.compose.ui.graphics.vector.ImageVector
import androidx.compose.ui.platform.LocalContext
import androidx.compose.ui.text.font.FontStyle
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.text.style.TextDecoration
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
import com.ayurdhara.core.designsystem.utils.rememberAyurdharaHapticFeedback
import com.ayurdhara.feature.shop.presentation.viewmodel.ProductDetailViewModel
import kotlinx.coroutines.delay

private val ScreenMargin = 20.dp

@Composable
fun ProductDetailScreen(
    onBackClick: () -> Unit,
    onAddToCart: (Product) -> Unit,
    onGoToCart: () -> Unit = {},
    viewModel: ProductDetailViewModel = hiltViewModel()
) {
    val c = AyTheme.colors
    val state by viewModel.uiState.collectAsState()

    Column(Modifier.fillMaxSize().background(c.canvas)) {
        when (val s = state) {
            is UiState.Success -> PdpContent(s.data, onBackClick, onAddToCart, onGoToCart)
            is UiState.Error -> {
                PdpTopBar(onBackClick, null)
                AyMessagePanel(
                    icon = Icons.Filled.CloudOff,
                    title = "Couldn't open this remedy",
                    message = s.message,
                    actionText = "Try Again",
                    onAction = viewModel::load
                )
            }
            else -> {
                PdpTopBar(onBackClick, null)
                Column(
                    Modifier.fillMaxSize(),
                    verticalArrangement = Arrangement.Center,
                    horizontalAlignment = Alignment.CenterHorizontally
                ) {
                    CircularProgressIndicator(color = c.accent, trackColor = c.chip)
                    Spacer(Modifier.height(16.dp))
                    Text(
                        "Preparing your remedy…", fontFamily = NotoSerif, fontWeight = FontWeight.Bold,
                        fontSize = 16.sp, color = c.heading
                    )
                }
            }
        }
    }
}

@Composable
private fun PdpTopBar(onBackClick: () -> Unit, product: Product?) {
    var favourite by rememberSaveable { mutableStateOf(false) }
    val context = LocalContext.current
    AyBackBar(title = "Product Detail", onBack = onBackClick) {
        if (product != null) {
            AyIconButton(
                if (favourite) Icons.Filled.Favorite else Icons.Filled.FavoriteBorder,
                "Favourite", { favourite = !favourite }
            )
            AyIconButton(Icons.Filled.Share, "Share", {
                val send = Intent(Intent.ACTION_SEND).apply {
                    type = "text/plain"
                    putExtra(Intent.EXTRA_TEXT, "${product.title} — ${ayRupees(product.price)} on Ayurdhara Divya Shakti")
                }
                context.startActivity(Intent.createChooser(send, null).addFlags(Intent.FLAG_ACTIVITY_NEW_TASK))
            })
        }
    }
}

@Composable
private fun PdpContent(
    product: Product,
    onBackClick: () -> Unit,
    onAddToCart: (Product) -> Unit,
    onGoToCart: () -> Unit
) {
    val c = AyTheme.colors
    val haptic = rememberAyurdharaHapticFeedback()

    var selectedVariant by remember(product.id) {
        mutableIntStateOf(product.variants.indexOfFirst { it.price == product.price }.coerceAtLeast(0))
    }
    var quantity by remember(product.id) { mutableIntStateOf(1) }
    var toastTick by remember { mutableIntStateOf(0) }
    var toastVisible by remember { mutableStateOf(false) }
    LaunchedEffect(toastTick) {
        if (toastTick > 0) {
            toastVisible = true
            delay(1800)
            toastVisible = false
        }
    }

    val variant = product.variants.getOrNull(selectedVariant)
    val price = variant?.price ?: product.price
    val mrp = variant?.originalPrice ?: product.originalPrice
    val pct = ayDiscountPct(price, mrp)
    val savingPerUnit = if (mrp != null && mrp > price) mrp - price else 0.0
    val selectedProduct = if (variant == null) product else product.copy(
        price = variant.price,
        originalPrice = variant.originalPrice,
        goldMemberPrice = variant.goldMemberPrice ?: product.goldMemberPrice,
        discount = pct
    )

    fun addSelected() {
        repeat(quantity) { onAddToCart(selectedProduct) }
    }

    Box(Modifier.fillMaxSize()) {
        Column(Modifier.fillMaxSize()) {
            PdpTopBar(onBackClick, product)

            Column(Modifier.weight(1f).verticalScroll(rememberScrollState())) {
                PdpGallery(product)

                // ── Core details ──
                Column(Modifier.padding(horizontal = ScreenMargin).padding(top = 20.dp, bottom = 16.dp), verticalArrangement = Arrangement.spacedBy(12.dp)) {
                    Row(Modifier.fillMaxWidth(), verticalAlignment = Alignment.CenterVertically, horizontalArrangement = Arrangement.SpaceBetween) {
                        Row(
                            Modifier.background(c.chip, RoundedCornerShape(50)).padding(horizontal = 10.dp, vertical = 5.dp),
                            verticalAlignment = Alignment.CenterVertically
                        ) {
                            Icon(Icons.Filled.Star, null, Modifier.size(16.dp), tint = c.accent)
                            Spacer(Modifier.width(4.dp))
                            if (product.rating > 0.0) {
                                Text(String.format("%.1f", product.rating), fontFamily = NotoSerif, fontWeight = FontWeight.Bold, fontSize = 15.sp, color = c.text)
                                if (product.reviewCount > 0) {
                                    Text(
                                        "  (${product.reviewCount} verified reviews)", fontFamily = PlusJakartaSans,
                                        fontSize = 12.sp, color = c.textSub, maxLines = 1
                                    )
                                }
                            } else {
                                Text("New arrival", fontFamily = PlusJakartaSans, fontWeight = FontWeight.SemiBold, fontSize = 12.sp, color = c.textSub)
                            }
                        }
                        Spacer(Modifier.width(8.dp))
                        Text(
                            product.category.uppercase(),
                            Modifier.background(c.goldFill.copy(alpha = if (c.isDark) 0.18f else 0.45f), RoundedCornerShape(4.dp)).padding(horizontal = 8.dp, vertical = 3.dp),
                            fontFamily = PlusJakartaSans, fontWeight = FontWeight.Bold, fontSize = 10.sp,
                            letterSpacing = 0.8.sp, color = c.accent, maxLines = 1, overflow = TextOverflow.Ellipsis
                        )
                    }

                    Column(verticalArrangement = Arrangement.spacedBy(4.dp)) {
                        Text(
                            product.title, fontFamily = NotoSerif, fontWeight = FontWeight.Bold,
                            fontSize = 26.sp, lineHeight = 33.sp, color = c.heading
                        )
                        val subtitle = product.shortDescription?.takeIf { it.isNotBlank() } ?: product.primaryBenefit
                        if (!subtitle.isNullOrBlank()) {
                            Text(subtitle, fontFamily = PlusJakartaSans, fontSize = 14.sp, lineHeight = 21.sp, color = c.textSub)
                        }
                    }

                    // Pricing card
                    Column(
                        Modifier.fillMaxWidth().ayCard(RoundedCornerShape(12.dp), color = c.cardLow, elevation = 1.dp).padding(16.dp),
                        verticalArrangement = Arrangement.spacedBy(8.dp)
                    ) {
                        Row(verticalAlignment = Alignment.Bottom, horizontalArrangement = Arrangement.spacedBy(10.dp)) {
                            Text(ayRupees(price), fontFamily = NotoSerif, fontWeight = FontWeight.Bold, fontSize = 32.sp, color = c.price)
                            if (mrp != null && mrp > price) {
                                Text(
                                    ayRupees(mrp), Modifier.padding(bottom = 4.dp), fontFamily = PlusJakartaSans, fontSize = 16.sp,
                                    color = c.textMuted, textDecoration = TextDecoration.LineThrough
                                )
                            }
                            if (pct > 0) {
                                Text(
                                    "$pct% OFF",
                                    Modifier.padding(bottom = 6.dp).background(c.goldFill, RoundedCornerShape(50)).padding(horizontal = 8.dp, vertical = 2.dp),
                                    fontFamily = PlusJakartaSans, fontWeight = FontWeight.Bold, fontSize = 11.sp, color = c.onGoldFill
                                )
                            }
                        }
                        if (savingPerUnit > 0.0) {
                            Text(
                                "You save ${ayRupees(savingPerUnit)} on every unit", fontFamily = PlusJakartaSans,
                                fontWeight = FontWeight.SemiBold, fontSize = 12.sp, color = c.success
                            )
                        }
                        Row(verticalAlignment = Alignment.CenterVertically) {
                            Icon(Icons.Filled.LocalShipping, null, Modifier.size(16.dp), tint = c.success)
                            Spacer(Modifier.width(8.dp))
                            Text(
                                "Inclusive of all taxes • In Stock (Ships in 24 hrs)", fontFamily = PlusJakartaSans,
                                fontSize = 12.sp, color = c.textSub
                            )
                        }
                    }
                }

                // ── Variants ──
                if (product.variants.isNotEmpty()) {
                    Column(Modifier.padding(horizontal = ScreenMargin).padding(vertical = 8.dp)) {
                        Row(Modifier.fillMaxWidth(), verticalAlignment = Alignment.CenterVertically) {
                            Text(
                                "Select Volume", Modifier.weight(1f), fontFamily = PlusJakartaSans,
                                fontWeight = FontWeight.Bold, fontSize = 16.sp, color = c.text
                            )
                            Icon(Icons.Filled.Eco, null, Modifier.size(14.dp), tint = c.accent)
                            Spacer(Modifier.width(4.dp))
                            Text("Freshly Hand-Poured", fontFamily = PlusJakartaSans, fontWeight = FontWeight.SemiBold, fontSize = 12.sp, color = c.accent)
                        }
                        Spacer(Modifier.height(18.dp))
                        product.variants.chunked(3).forEachIndexed { rowIdx, rowItems ->
                            Row(
                                Modifier.fillMaxWidth().padding(top = if (rowIdx == 0) 0.dp else 14.dp),
                                horizontalArrangement = Arrangement.spacedBy(10.dp)
                            ) {
                                rowItems.forEachIndexed { i, v ->
                                    val index = rowIdx * 3 + i
                                    VariantCard(
                                        size = v.size.ifBlank { "Standard" },
                                        price = v.price,
                                        originalPrice = v.originalPrice,
                                        selected = index == selectedVariant,
                                        mostLoved = index == 1 && product.variants.size >= 3,
                                        onClick = { haptic.selection(); selectedVariant = index },
                                        modifier = Modifier.weight(1f)
                                    )
                                }
                                repeat(3 - rowItems.size) { Spacer(Modifier.weight(1f)) }
                            }
                        }
                    }
                }

                // ── Quantity ──
                Row(
                    Modifier.fillMaxWidth().padding(horizontal = ScreenMargin).padding(top = 16.dp),
                    verticalAlignment = Alignment.CenterVertically
                ) {
                    Text("Quantity", Modifier.weight(1f), fontFamily = PlusJakartaSans, fontWeight = FontWeight.Bold, fontSize = 16.sp, color = c.text)
                    AyStepper(
                        quantity = quantity,
                        onMinus = { if (quantity > 1) { haptic.light(); quantity-- } },
                        onPlus = { if (quantity < 10) { haptic.light(); quantity++ } },
                        buttonSize = 34.dp
                    )
                }

                // ── Ingredients / benefits ──
                IngredientsSection(product)

                // ── Ritual ──
                RitualSection()

                // ── Authentic promise ──
                Row(
                    Modifier.padding(horizontal = ScreenMargin).padding(top = 24.dp).fillMaxWidth()
                        .ayCard(RoundedCornerShape(12.dp), color = c.chipHigh, elevation = 1.dp).padding(16.dp),
                    verticalAlignment = Alignment.CenterVertically
                ) {
                    Box(Modifier.size(48.dp).background(c.goldFill, CircleShape), contentAlignment = Alignment.Center) {
                        Icon(Icons.Filled.WorkspacePremium, null, Modifier.size(26.dp), tint = c.onGoldFill)
                    }
                    Spacer(Modifier.width(14.dp))
                    Column {
                        Row(verticalAlignment = Alignment.CenterVertically) {
                            Text("Pharmacopoeia Verified", fontFamily = NotoSerif, fontWeight = FontWeight.Bold, fontSize = 16.sp, color = c.heading)
                            Spacer(Modifier.width(6.dp))
                            Icon(Icons.Filled.CheckCircle, null, Modifier.size(16.dp), tint = c.accent)
                        }
                        Spacer(Modifier.height(2.dp))
                        Text(
                            "Slow-infused using classical Kshir Pak Vidhi in brass cauldrons.", fontFamily = PlusJakartaSans,
                            fontSize = 12.sp, lineHeight = 18.sp, color = c.textSub
                        )
                    }
                }

                // ── Accordions ──
                Column(Modifier.padding(horizontal = ScreenMargin).padding(top = 24.dp, bottom = 28.dp), verticalArrangement = Arrangement.spacedBy(10.dp)) {
                    PdpAccordion(
                        Icons.Filled.HistoryEdu, "Ancient Ayurvedic Text Reference",
                        "Formulated based on classical references from Bhavaprakasha Nighantu (Vedic Botanical Lexicon), specifically invoking the cooling Sheeta Virya qualities to pacify aggravated Pitta Dosha."
                    )
                    PdpAccordion(
                        Icons.Filled.Recycling, "Conscious Glass Packaging",
                        "UV-protective dark amber apothecary bottle preserves active phytonutrients from photodecomposition without artificial preservatives. 100% recyclable glass and FSC-certified bamboo packaging."
                    )
                }
            }

            // ── Sticky action tray ──
            AyStickyBar {
                Row(Modifier.fillMaxWidth(), verticalAlignment = Alignment.CenterVertically) {
                    Column(Modifier.weight(1f).padding(end = 8.dp)) {
                        Row(verticalAlignment = Alignment.Bottom) {
                            Text(ayRupees(price * quantity), fontFamily = NotoSerif, fontWeight = FontWeight.Bold, fontSize = 22.sp, color = c.price, maxLines = 1)
                            if (mrp != null && mrp > price) {
                                Spacer(Modifier.width(6.dp))
                                Text(
                                    ayRupees(mrp * quantity), Modifier.padding(bottom = 2.dp), fontFamily = PlusJakartaSans, fontSize = 12.sp,
                                    color = c.textMuted, textDecoration = TextDecoration.LineThrough, maxLines = 1
                                )
                            }
                        }
                        Row(verticalAlignment = Alignment.CenterVertically) {
                            Icon(Icons.Filled.DoneAll, null, Modifier.size(13.dp), tint = c.success)
                            Spacer(Modifier.width(3.dp))
                            Text(
                                "Free Ayurvedic Delivery", fontFamily = PlusJakartaSans, fontWeight = FontWeight.SemiBold,
                                fontSize = 11.sp, color = c.success, maxLines = 1, overflow = TextOverflow.Ellipsis
                            )
                        }
                    }
                    AyGoldButton(
                        "Add", onClick = { haptic.medium(); addSelected(); toastTick++ },
                        leadingIcon = Icons.Filled.ShoppingBag, height = 48.dp
                    )
                    Spacer(Modifier.width(8.dp))
                    AyPrimaryButton(
                        "Buy Now", onClick = { haptic.medium(); addSelected(); onGoToCart() },
                        trailingIcon = Icons.AutoMirrored.Filled.ArrowForward, height = 48.dp
                    )
                }
            }
        }

        AnimatedVisibility(
            visible = toastVisible,
            modifier = Modifier.align(Alignment.BottomCenter).padding(bottom = 112.dp),
            enter = fadeIn() + slideInVertically { it / 2 },
            exit = fadeOut()
        ) {
            Row(
                Modifier.background(c.primaryBtn, RoundedCornerShape(50)).padding(horizontal = 16.dp, vertical = 10.dp),
                verticalAlignment = Alignment.CenterVertically
            ) {
                Icon(Icons.Filled.CheckCircle, null, Modifier.size(18.dp), tint = c.onPrimaryBtn)
                Spacer(Modifier.width(8.dp))
                Text("Added to sacred bag", fontFamily = PlusJakartaSans, fontWeight = FontWeight.SemiBold, fontSize = 14.sp, color = c.onPrimaryBtn)
            }
        }
    }
}

@Composable
private fun PdpGallery(product: Product) {
    val c = AyTheme.colors
    val images = remember(product) {
        (listOf(product.imageUrl) + product.images).filter { it.isNotBlank() }.distinct().ifEmpty { listOf("") }
    }
    var selectedIndex by remember(product.id) { mutableIntStateOf(0) }

    Box(Modifier.fillMaxWidth().background(c.cardLow)) {
        AyImage(
            images.getOrElse(selectedIndex) { images.firstOrNull().orEmpty() },
            product.title,
            Modifier.fillMaxWidth().aspectRatio(4f / 3f)
        )
        Row(
            Modifier.align(Alignment.TopStart).padding(start = ScreenMargin, top = 16.dp)
                .background(c.card.copy(alpha = 0.92f), RoundedCornerShape(50)).padding(horizontal = 12.dp, vertical = 6.dp),
            verticalAlignment = Alignment.CenterVertically
        ) {
            Icon(Icons.Filled.Verified, null, Modifier.size(15.dp), tint = c.accent)
            Spacer(Modifier.width(6.dp))
            Text(
                "100% Chemical Free & Wild Harvested", fontFamily = PlusJakartaSans, fontWeight = FontWeight.SemiBold,
                fontSize = 11.sp, color = c.heading, maxLines = 1
            )
        }
        if (!product.badge.isNullOrBlank()) {
            AyBadge(product.badge!!, Modifier.align(Alignment.TopEnd).padding(top = 60.dp, end = ScreenMargin))
        }
        if (images.size > 1) {
            Row(
                Modifier.align(Alignment.BottomCenter).padding(bottom = 12.dp),
                horizontalArrangement = Arrangement.spacedBy(6.dp),
                verticalAlignment = Alignment.CenterVertically
            ) {
                repeat(images.size) { i ->
                    val active = selectedIndex == i
                    val w by animateDpAsState(if (active) 24.dp else 6.dp, label = "dot")
                    Box(
                        Modifier
                            .height(6.dp)
                            .width(w)
                            .clip(CircleShape)
                            .background(
                                if (active) (if (c.isDark) c.accent else c.heading) else c.outline.copy(alpha = 0.7f)
                            )
                            .clickable { selectedIndex = i }
                    )
                }
            }
        }
    }
}

@Composable
private fun VariantCard(
    size: String,
    price: Double,
    originalPrice: Double?,
    selected: Boolean,
    mostLoved: Boolean,
    onClick: () -> Unit,
    modifier: Modifier = Modifier
) {
    val c = AyTheme.colors
    val shape = RoundedCornerShape(12.dp)
    val accent = if (c.isDark) c.accent else c.heading
    val pct = ayDiscountPct(price, originalPrice)
    Box(modifier) {
        Column(
            Modifier.fillMaxWidth().clip(shape)
                .background(if (selected) (if (c.isDark) c.chipHigh else c.heading.copy(alpha = 0.08f)) else c.card, shape)
                .border(if (selected) 2.dp else 1.dp, if (selected) accent else c.border.copy(alpha = if (c.isDark) 0.5f else 0.9f), shape)
                .clickable(onClick = onClick)
                .padding(horizontal = 6.dp, vertical = 14.dp),
            horizontalAlignment = Alignment.CenterHorizontally
        ) {
            Text(size, fontFamily = PlusJakartaSans, fontWeight = if (selected) FontWeight.ExtraBold else FontWeight.SemiBold, fontSize = 15.sp, color = if (selected) accent else c.text, maxLines = 1, overflow = TextOverflow.Ellipsis)
            Spacer(Modifier.height(2.dp))
            Text(ayRupees(price), fontFamily = PlusJakartaSans, fontWeight = if (selected) FontWeight.Bold else FontWeight.Medium, fontSize = 13.sp, color = if (selected) accent else c.textSub, maxLines = 1)
            Spacer(Modifier.height(4.dp))
            Text(
                if (pct > 0) "$pct% OFF" else " ", fontFamily = PlusJakartaSans, fontWeight = FontWeight.Bold,
                fontSize = 11.sp, color = c.success, maxLines = 1
            )
        }
        if (mostLoved) {
            Text(
                "Most Loved",
                Modifier.align(Alignment.TopCenter).offset(y = (-9).dp).background(c.primaryBtn, RoundedCornerShape(50)).padding(horizontal = 8.dp, vertical = 2.dp),
                fontFamily = PlusJakartaSans, fontWeight = FontWeight.Bold, fontSize = 10.sp, color = c.onPrimaryBtn, maxLines = 1
            )
        }
    }
}

private data class InfoCard(val icon: ImageVector, val title: String, val subtitle: String, val body: String, val tag: String, val tagIcon: ImageVector)

@Composable
private fun IngredientsSection(product: Product) {
    val c = AyTheme.colors
    val cards = remember(product) {
        buildList {
            add(
                InfoCard(
                    Icons.Filled.Spa, "Primary Benefit",
                    product.primaryBenefit?.takeIf { it.isNotBlank() } ?: "Ayurvedic Formulation",
                    product.shortDescription?.takeIf { it.isNotBlank() } ?: "Crafted from pure botanicals using time-honoured Ayurvedic methods.",
                    "Core Benefit", Icons.Filled.EnergySavingsLeaf
                )
            )
            product.fullDescription?.takeIf { it.isNotBlank() }?.let {
                add(InfoCard(Icons.Filled.SelfImprovement, "About this Remedy", "Product Details", it, "Pharmacopoeia", Icons.Filled.WaterDrop))
            }
            product.story?.takeIf { it.isNotBlank() }?.let {
                add(InfoCard(Icons.Filled.Opacity, "Our Story", "Heritage & Sourcing", it, "Vedic Heritage", Icons.Filled.Spa))
            }
        }
    }
    Column(Modifier.padding(top = 28.dp), verticalArrangement = Arrangement.spacedBy(12.dp)) {
        Row(Modifier.padding(horizontal = ScreenMargin).fillMaxWidth(), verticalAlignment = Alignment.CenterVertically) {
            Column(Modifier.weight(1f)) {
                Text("Sacred Vedic Ingredients", fontFamily = NotoSerif, fontWeight = FontWeight.Bold, fontSize = 20.sp, color = c.heading)
                Text(
                    "Potent botanicals harvested under auspicious lunar cycles", fontFamily = PlusJakartaSans,
                    fontSize = 12.sp, color = c.textSub
                )
            }
            Box(Modifier.size(32.dp).background(c.chip, CircleShape), contentAlignment = Alignment.Center) {
                Icon(Icons.Filled.Spa, null, Modifier.size(18.dp), tint = if (c.isDark) c.accent else c.heading)
            }
        }
        LazyRow(contentPadding = PaddingValues(horizontal = ScreenMargin), horizontalArrangement = Arrangement.spacedBy(12.dp)) {
            itemsIndexed(cards) { index, card ->
                val bubble = when (index % 3) {
                    0 -> c.chipHigh
                    1 -> c.goldFill.copy(alpha = if (c.isDark) 0.2f else 0.5f)
                    else -> c.chip
                }
                Column(
                    Modifier.width(256.dp).ayCard(RoundedCornerShape(12.dp), elevation = 2.dp).padding(16.dp),
                    verticalArrangement = Arrangement.spacedBy(10.dp)
                ) {
                    Row(verticalAlignment = Alignment.CenterVertically) {
                        Box(Modifier.size(40.dp).background(bubble, CircleShape), contentAlignment = Alignment.Center) {
                            Icon(card.icon, null, Modifier.size(20.dp), tint = if (c.isDark) c.accent else c.heading)
                        }
                        Spacer(Modifier.width(12.dp))
                        Column {
                            Text(card.title, fontFamily = NotoSerif, fontWeight = FontWeight.Bold, fontSize = 16.sp, color = c.text, maxLines = 1, overflow = TextOverflow.Ellipsis)
                            Text(card.subtitle, fontFamily = PlusJakartaSans, fontStyle = FontStyle.Italic, fontSize = 12.sp, color = c.textSub, maxLines = 1, overflow = TextOverflow.Ellipsis)
                        }
                    }
                    Text(
                        card.body, fontFamily = PlusJakartaSans, fontSize = 14.sp, lineHeight = 21.sp,
                        color = c.textSub, maxLines = 6, overflow = TextOverflow.Ellipsis
                    )
                    Row(verticalAlignment = Alignment.CenterVertically) {
                        Icon(card.tagIcon, null, Modifier.size(14.dp), tint = c.accent)
                        Spacer(Modifier.width(6.dp))
                        Text(card.tag.uppercase(), fontFamily = PlusJakartaSans, fontWeight = FontWeight.SemiBold, fontSize = 11.sp, letterSpacing = 0.8.sp, color = c.accent)
                    }
                }
            }
        }
    }
}

@Composable
private fun RitualSection() {
    val c = AyTheme.colors
    Column(Modifier.padding(horizontal = ScreenMargin).padding(top = 28.dp), verticalArrangement = Arrangement.spacedBy(14.dp)) {
        Column(verticalArrangement = Arrangement.spacedBy(4.dp)) {
            Text("VIDHI • THE APPLICATION", fontFamily = PlusJakartaSans, fontWeight = FontWeight.Bold, fontSize = 11.sp, letterSpacing = 1.5.sp, color = c.accent)
            Text("Sacred Daily Ritual", fontFamily = NotoSerif, fontWeight = FontWeight.Bold, fontSize = 20.sp, color = c.heading)
        }
        Column(Modifier.fillMaxWidth().ayCard(RoundedCornerShape(16.dp), color = c.cardLow, elevation = 1.dp).padding(20.dp)) {
            RitualStep(1, "Prepare Mindfully", "Take the recommended serving as directed on the pack, with a calm and present mind.", gold = false)
            RitualConnector()
            RitualStep(2, "Apply with Intention", "Follow the traditional method for this product, ideally at the same time each day to honour your body's rhythm.", gold = false)
            RitualConnector()
            RitualStep(3, "Deep Absorption", "Allow the botanicals time to work. Steady, consistent use reveals the fullest benefits.", gold = true)
        }
    }
}

@Composable
private fun RitualConnector() {
    val c = AyTheme.colors
    Box(Modifier.padding(start = 21.dp, top = 6.dp, bottom = 6.dp).width(2.dp).height(20.dp).background(c.outline.copy(alpha = 0.6f)))
}

@Composable
private fun RitualStep(number: Int, title: String, body: String, gold: Boolean) {
    val c = AyTheme.colors
    Row(verticalAlignment = Alignment.Top) {
        Box(
            Modifier.size(44.dp).background(if (gold) c.goldFill else c.primaryBtn, CircleShape),
            contentAlignment = Alignment.Center
        ) {
            Text(
                number.toString(), fontFamily = NotoSerif, fontWeight = FontWeight.Bold, fontSize = 17.sp,
                color = if (gold) c.onGoldFill else c.onPrimaryBtn
            )
        }
        Spacer(Modifier.width(16.dp))
        Column {
            Text(title, fontFamily = PlusJakartaSans, fontWeight = FontWeight.Bold, fontSize = 15.sp, color = c.text)
            Text(body, Modifier.padding(top = 2.dp), fontFamily = PlusJakartaSans, fontSize = 14.sp, lineHeight = 21.sp, color = c.textSub)
        }
    }
}

@Composable
private fun PdpAccordion(icon: ImageVector, title: String, body: String) {
    val c = AyTheme.colors
    var open by rememberSaveable(title) { mutableStateOf(false) }
    val shape = RoundedCornerShape(12.dp)
    Column(
        Modifier.fillMaxWidth().clip(shape).background(c.cardLow, shape)
            .border(1.dp, c.border.copy(alpha = if (c.isDark) 0.4f else 0.7f), shape)
    ) {
        Row(
            Modifier.fillMaxWidth().clickable { open = !open }.padding(14.dp),
            verticalAlignment = Alignment.CenterVertically
        ) {
            Icon(icon, null, Modifier.size(20.dp), tint = if (c.isDark) c.accent else c.heading)
            Spacer(Modifier.width(10.dp))
            Text(title, Modifier.weight(1f), fontFamily = PlusJakartaSans, fontWeight = FontWeight.Bold, fontSize = 15.sp, color = c.text)
            Icon(if (open) Icons.Filled.ExpandLess else Icons.Filled.ExpandMore, null, Modifier.size(20.dp), tint = c.textSub)
        }
        AnimatedVisibility(open) {
            Text(
                body, Modifier.padding(start = 16.dp, end = 16.dp, bottom = 14.dp),
                fontFamily = PlusJakartaSans, fontSize = 14.sp, lineHeight = 21.sp, color = c.textSub
            )
        }
    }
}