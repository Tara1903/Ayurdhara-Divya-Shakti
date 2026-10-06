package com.ayurdhara.feature.shop.presentation.ui

import androidx.compose.foundation.background
import androidx.compose.foundation.clickable
import androidx.compose.foundation.layout.*
import androidx.compose.foundation.lazy.LazyRow
import androidx.compose.foundation.lazy.grid.GridCells
import androidx.compose.foundation.lazy.grid.GridItemSpan
import androidx.compose.foundation.lazy.grid.LazyVerticalGrid
import androidx.compose.foundation.lazy.grid.items
import androidx.compose.foundation.lazy.grid.itemsIndexed
import androidx.compose.foundation.lazy.items
import androidx.compose.foundation.shape.CircleShape
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.CheckCircle
import androidx.compose.material.icons.filled.Clear
import androidx.compose.material.icons.filled.ExpandMore
import androidx.compose.material.icons.filled.Mic
import androidx.compose.material.icons.filled.Notifications
import androidx.compose.material.icons.filled.ShoppingBag
import androidx.compose.material.icons.filled.Tune
import androidx.compose.material.icons.filled.Verified
import androidx.compose.material.icons.filled.VerifiedUser
import androidx.compose.material3.DropdownMenu
import androidx.compose.material3.DropdownMenuItem
import androidx.compose.material3.Icon
import androidx.compose.material3.Text
import androidx.compose.runtime.*
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.draw.clip
import androidx.compose.ui.platform.LocalFocusManager
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.text.style.TextAlign
import androidx.compose.ui.text.style.TextOverflow
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import androidx.hilt.navigation.compose.hiltViewModel
import com.ayurdhara.core.common.domain.model.Product
import com.ayurdhara.core.common.result.UiState
import com.ayurdhara.core.designsystem.components.AyBrandBar
import com.ayurdhara.core.designsystem.components.AyCatalogProductCard
import com.ayurdhara.core.designsystem.components.AyIconButton
import com.ayurdhara.core.designsystem.components.AyOutlineButton
import com.ayurdhara.core.designsystem.components.AySearchBox
import com.ayurdhara.core.designsystem.components.ayCard
import com.ayurdhara.core.designsystem.components.ayDiscountPercent
import com.ayurdhara.core.designsystem.theme.AyTheme
import com.ayurdhara.core.designsystem.theme.NotoSerif
import com.ayurdhara.core.designsystem.theme.PlusJakartaSans
import com.ayurdhara.feature.shop.presentation.viewmodel.ShopViewModel

private enum class ShopSort(val label: String) {
    BESTSELLING("Bestselling"),
    PRICE_LOW("Price: Low to High"),
    PRICE_HIGH("Price: High to Low"),
    TOP_RATED("Top Rated")
}

private enum class QuickFilter(val label: String) {
    UNDER_500("Under ₹500"),
    ORGANIC("Certified Organic"),
    DOSHA("Dosha Balancing"),
    LAB_TESTED("Lab Tested")
}

private fun Product.text(): String =
    (listOfNotNull(title, shortDescription, primaryBenefit, badge, category) + categories).joinToString(" ").lowercase()

private fun Product.passes(filter: QuickFilter): Boolean = when (filter) {
    QuickFilter.UNDER_500 -> price < 500
    QuickFilter.ORGANIC -> "organic" in text()
    QuickFilter.DOSHA -> "dosha" in text() || "vata" in text() || "pitta" in text() || "kapha" in text()
    QuickFilter.LAB_TESTED -> "lab" in text() || "tested" in text()
}

@Composable
fun ShopScreen(
    viewModel: ShopViewModel = hiltViewModel(),
    onProductClick: (String) -> Unit = {},
    onAddToCart: (Product) -> Unit = {},
    onCartClick: () -> Unit = {},
    initialCategorySlug: String? = null
) {
    val uiState by viewModel.uiState.collectAsState()
    val c = AyTheme.colors
    val focusManager = LocalFocusManager.current

    var selectedSlug by remember(initialCategorySlug) { mutableStateOf(initialCategorySlug) }
    var query by remember { mutableStateOf("") }
    var sort by remember { mutableStateOf(ShopSort.BESTSELLING) }
    var sortMenu by remember { mutableStateOf(false) }
    var quick by remember { mutableStateOf(setOf<QuickFilter>()) }

    val data = (uiState as? UiState.Success)?.data
    val categories = data?.categories.orEmpty()
    val allProducts = data?.products.orEmpty()

    val products = remember(allProducts, categories, selectedSlug, query, sort, quick) {
        val cat = categories.firstOrNull { it.slug == selectedSlug }
        val q = query.trim().lowercase()
        val filtered = allProducts.filter { p ->
            val matchesCategory = cat == null ||
                p.category.equals(cat.title, true) ||
                p.category.equals(cat.slug, true) ||
                p.categories.any { it.equals(cat.title, true) || it.equals(cat.slug, true) }
            matchesCategory &&
                (q.isEmpty() || p.text().contains(q)) &&
                quick.all { p.passes(it) }
        }
        when (sort) {
            ShopSort.BESTSELLING -> filtered.sortedByDescending { it.reviewCount }
            ShopSort.PRICE_LOW -> filtered.sortedBy { it.price }
            ShopSort.PRICE_HIGH -> filtered.sortedByDescending { it.price }
            ShopSort.TOP_RATED -> filtered.sortedByDescending { it.rating }
        }
    }

    Column(Modifier.fillMaxSize().background(c.canvas)) {
        AyBrandBar(
            trailing = {
                AyIconButton(Icons.Filled.Notifications, "Notifications", onClick = {})
                AyIconButton(Icons.Filled.ShoppingBag, "Bag", onClick = onCartClick)
            }
        )
        LazyVerticalGrid(
            columns = GridCells.Fixed(2),
            modifier = Modifier.fillMaxSize(),
            contentPadding = PaddingValues(bottom = 24.dp),
            horizontalArrangement = Arrangement.spacedBy(12.dp),
            verticalArrangement = Arrangement.spacedBy(12.dp)
        ) {
            // Title + search
            item(span = { GridItemSpan(maxLineSpan) }) {
                Column(Modifier.padding(start = 20.dp, end = 20.dp, top = 4.dp, bottom = 8.dp)) {
                    Row(Modifier.fillMaxWidth(), verticalAlignment = Alignment.Bottom) {
                        Column(Modifier.weight(1f)) {
                            Text(
                                "Ayurvedic Apothecary", fontFamily = NotoSerif, fontWeight = FontWeight.Bold,
                                fontSize = 24.sp, color = c.heading, maxLines = 1, overflow = TextOverflow.Ellipsis
                            )
                            Text(
                                "Sattvic preparations, traditionally churned",
                                fontFamily = PlusJakartaSans, fontSize = 12.sp, color = c.textSub
                            )
                        }
                        Spacer(Modifier.width(8.dp))
                        Text(
                            "${products.size} Remedies",
                            Modifier.background(c.goldFill.copy(alpha = 0.5f), RoundedCornerShape(50)).padding(horizontal = 8.dp, vertical = 2.dp),
                            fontFamily = PlusJakartaSans, fontWeight = FontWeight.Bold, fontSize = 12.sp,
                            color = if (c.isDark) c.accent else c.onGoldFill, maxLines = 1
                        )
                    }
                    Spacer(Modifier.height(12.dp))
                    AySearchBox(
                        value = query,
                        onValueChange = { query = it },
                        placeholder = "Search oils, single herbs, churna, kadha...",
                        onSearch = { focusManager.clearFocus() },
                        trailing = {
                            if (query.isNotEmpty()) {
                                AyIconButton(Icons.Filled.Clear, "Clear", onClick = { query = "" }, modifier = Modifier.size(32.dp))
                            } else {
                                Icon(
                                    Icons.Filled.Mic, null, tint = c.heading,
                                    modifier = Modifier.padding(end = 4.dp).size(19.dp)
                                )
                            }
                        }
                    )
                }
            }

            // Category tabs
            item(span = { GridItemSpan(maxLineSpan) }) {
                LazyRow(
                    contentPadding = PaddingValues(horizontal = 20.dp),
                    horizontalArrangement = Arrangement.spacedBy(24.dp)
                ) {
                    item { CategoryTab("All Items", selectedSlug == null) { selectedSlug = null } }
                    items(categories, key = { it.id }) { cat ->
                        CategoryTab(cat.title, selectedSlug == cat.slug) {
                            selectedSlug = if (selectedSlug == cat.slug) null else cat.slug
                        }
                    }
                }
            }

            // Filter & sorting bar
            item(span = { GridItemSpan(maxLineSpan) }) {
                Column(Modifier.padding(horizontal = 20.dp), verticalArrangement = Arrangement.spacedBy(8.dp)) {
                    Row(Modifier.fillMaxWidth(), verticalAlignment = Alignment.CenterVertically) {
                        Row(
                            Modifier.height(36.dp)
                                .ayCard(RoundedCornerShape(8.dp), color = c.chipHigh, elevation = 1.dp)
                                .clickable { quick = emptySet() }
                                .padding(horizontal = 12.dp),
                            verticalAlignment = Alignment.CenterVertically
                        ) {
                            Icon(Icons.Filled.Tune, null, tint = c.heading, modifier = Modifier.size(16.dp))
                            Spacer(Modifier.width(6.dp))
                            Text("Filters", fontFamily = PlusJakartaSans, fontWeight = FontWeight.Medium, fontSize = 13.sp, color = c.heading)
                            if (quick.isNotEmpty()) {
                                Spacer(Modifier.width(6.dp))
                                Box(Modifier.size(16.dp).background(c.accent, CircleShape), contentAlignment = Alignment.Center) {
                                    Text(quick.size.toString(), fontFamily = PlusJakartaSans, fontWeight = FontWeight.Bold, fontSize = 10.sp, color = c.canvas)
                                }
                            }
                        }
                        Spacer(Modifier.width(8.dp))
                        Box {
                            Row(
                                Modifier.height(36.dp)
                                    .ayCard(RoundedCornerShape(8.dp), elevation = 1.dp)
                                    .clickable { sortMenu = true }
                                    .padding(horizontal = 12.dp),
                                verticalAlignment = Alignment.CenterVertically
                            ) {
                                Text("Sort:", fontFamily = PlusJakartaSans, fontSize = 13.sp, color = c.textSub)
                                Spacer(Modifier.width(4.dp))
                                Text(sort.label, fontFamily = PlusJakartaSans, fontWeight = FontWeight.Bold, fontSize = 13.sp, color = c.heading, maxLines = 1)
                                Icon(Icons.Filled.ExpandMore, null, tint = c.heading, modifier = Modifier.size(16.dp))
                            }
                            DropdownMenu(expanded = sortMenu, onDismissRequest = { sortMenu = false }, modifier = Modifier.background(c.card)) {
                                ShopSort.values().forEach { option ->
                                    DropdownMenuItem(
                                        text = {
                                            Text(
                                                option.label, fontFamily = PlusJakartaSans, fontSize = 14.sp,
                                                fontWeight = if (option == sort) FontWeight.Bold else FontWeight.Normal,
                                                color = if (option == sort) c.heading else c.text
                                            )
                                        },
                                        onClick = { sort = option; sortMenu = false }
                                    )
                                }
                            }
                        }
                    }
                    LazyRow(horizontalArrangement = Arrangement.spacedBy(8.dp), contentPadding = PaddingValues(vertical = 2.dp)) {
                        item {
                            Row(
                                Modifier.height(28.dp)
                                    .ayCard(RoundedCornerShape(50), elevation = 1.dp)
                                    .padding(horizontal = 10.dp),
                                verticalAlignment = Alignment.CenterVertically
                            ) {
                                Icon(Icons.Filled.CheckCircle, null, tint = if (c.isDark) c.accent else c.success, modifier = Modifier.size(14.dp))
                                Spacer(Modifier.width(4.dp))
                                Text("In Stock", fontFamily = PlusJakartaSans, fontSize = 11.sp, color = c.heading, maxLines = 1)
                            }
                        }
                        items(QuickFilter.values().toList()) { f ->
                            QuickChip(f.label, f in quick, showBadge = f == QuickFilter.ORGANIC) {
                                quick = if (f in quick) quick - f else quick + f
                            }
                        }
                    }
                }
            }

            // Product grid
            when (val state = uiState) {
                is UiState.Success -> {
                    if (products.isEmpty()) {
                        item(span = { GridItemSpan(maxLineSpan) }) {
                            Box(Modifier.fillMaxWidth().padding(32.dp), contentAlignment = Alignment.Center) {
                                Text(
                                    "No products found.", fontFamily = PlusJakartaSans, fontSize = 14.sp,
                                    color = c.textSub, textAlign = TextAlign.Center
                                )
                            }
                        }
                    } else {
                        itemsIndexed(products, key = { _, p -> p.id }) { index, p ->
                            AyCatalogProductCard(
                                title = p.title,
                                categoryLabel = categoryLabel(p),
                                price = p.price,
                                originalPrice = p.originalPrice,
                                discount = ayDiscountPercent(p.price, p.originalPrice, p.discount),
                                rating = p.rating,
                                reviewCount = p.reviewCount,
                                badge = p.badge,
                                imageUrl = p.imageUrl,
                                onClick = { onProductClick(p.slug) },
                                onAdd = { onAddToCart(p) },
                                modifier = Modifier.fillMaxWidth().padding(
                                    start = if (index % 2 == 0) 20.dp else 0.dp,
                                    end = if (index % 2 == 0) 0.dp else 20.dp
                                )
                            )
                        }
                    }
                }
                is UiState.Error -> {
                    item(span = { GridItemSpan(maxLineSpan) }) {
                        Column(
                            Modifier.fillMaxWidth().padding(32.dp),
                            horizontalAlignment = Alignment.CenterHorizontally,
                            verticalArrangement = Arrangement.spacedBy(12.dp)
                        ) {
                            Text(state.message, fontFamily = PlusJakartaSans, fontSize = 14.sp, color = c.error, textAlign = TextAlign.Center)
                            AyOutlineButton("Retry", onClick = { viewModel.fetchFallbackData() }, height = 44.dp)
                        }
                    }
                }
                else -> {
                    items(4) { i ->
                        Column(
                            Modifier.fillMaxWidth()
                                .padding(start = if (i % 2 == 0) 20.dp else 0.dp, end = if (i % 2 == 0) 0.dp else 20.dp)
                                .ayCard(RoundedCornerShape(12.dp), elevation = 2.dp)
                        ) {
                            val sk = if (c.isDark) c.chipHigh else c.chip
                            Box(Modifier.fillMaxWidth().aspectRatio(1f).background(sk))
                            Column(Modifier.padding(10.dp), verticalArrangement = Arrangement.spacedBy(8.dp)) {
                                Box(Modifier.fillMaxWidth(0.5f).height(10.dp).background(sk, RoundedCornerShape(4.dp)))
                                Box(Modifier.fillMaxWidth().height(34.dp).background(sk, RoundedCornerShape(4.dp)))
                                Box(Modifier.fillMaxWidth(0.6f).height(20.dp).background(sk, RoundedCornerShape(4.dp)))
                            }
                        }
                    }
                }
            }

            // Purity assurance banner
            item(span = { GridItemSpan(maxLineSpan) }) {
                Row(
                    Modifier.padding(horizontal = 20.dp, vertical = 8.dp).fillMaxWidth()
                        .ayCard(RoundedCornerShape(12.dp), color = c.chip, elevation = 1.dp)
                        .padding(16.dp),
                    verticalAlignment = Alignment.CenterVertically
                ) {
                    Box(Modifier.size(40.dp).background(c.canvas, CircleShape), contentAlignment = Alignment.Center) {
                        Icon(Icons.Filled.VerifiedUser, null, tint = c.accent, modifier = Modifier.size(24.dp))
                    }
                    Spacer(Modifier.width(12.dp))
                    Column {
                        Text(
                            "Ayurvedic Pharmacopoeia Verified", fontFamily = PlusJakartaSans, fontWeight = FontWeight.Bold,
                            fontSize = 14.sp, color = c.heading
                        )
                        Text(
                            "Cold harvested • 100% natural wild herbs • Zero chemicals",
                            fontFamily = PlusJakartaSans, fontSize = 12.sp, lineHeight = 17.sp, color = c.textSub
                        )
                    }
                }
            }
        }
    }
}

private fun categoryLabel(p: Product): String {
    val benefit = p.primaryBenefit?.takeIf { it.isNotBlank() && it.length <= 24 }
    return if (benefit != null) "${p.category} • $benefit" else p.category
}

@Composable
private fun CategoryTab(title: String, selected: Boolean, onClick: () -> Unit) {
    val c = AyTheme.colors
    Box(Modifier.clickable(onClick = onClick), contentAlignment = Alignment.BottomCenter) {
        Text(
            title, Modifier.padding(vertical = 8.dp), fontFamily = PlusJakartaSans, fontSize = 14.sp, maxLines = 1,
            fontWeight = if (selected) FontWeight.Bold else FontWeight.Medium,
            color = if (selected) c.heading else c.textSub
        )
        if (selected) {
            Box(Modifier.fillMaxWidth().height(2.5.dp).background(c.accent, RoundedCornerShape(50)))
        }
    }
}
@Composable
private fun QuickChip(text: String, selected: Boolean, showBadge: Boolean, onClick: () -> Unit) {
    val c = AyTheme.colors
    val shape = RoundedCornerShape(50)
    Row(
        Modifier.height(28.dp).clip(shape)
            .background(if (selected) c.goldFill.copy(alpha = if (c.isDark) 0.25f else 0.4f) else c.cardLow, shape)
            .clickable(onClick = onClick)
            .padding(horizontal = 12.dp),
        verticalAlignment = Alignment.CenterVertically
    ) {
        if (showBadge) {
            Icon(Icons.Filled.Verified, null, tint = c.accent, modifier = Modifier.size(13.dp))
            Spacer(Modifier.width(4.dp))
        }
        Text(
            text, fontFamily = PlusJakartaSans, fontSize = 11.sp, maxLines = 1,
            fontWeight = if (selected) FontWeight.SemiBold else FontWeight.Medium,
            color = if (selected) c.text else c.textSub
        )
    }
}