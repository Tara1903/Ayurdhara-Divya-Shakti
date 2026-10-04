package com.ayurdhara.feature.search.presentation.ui

import androidx.compose.foundation.background
import androidx.compose.foundation.clickable
import androidx.compose.foundation.layout.*
import androidx.compose.foundation.lazy.LazyColumn
import androidx.compose.foundation.lazy.LazyRow
import androidx.compose.foundation.lazy.grid.GridCells
import androidx.compose.foundation.lazy.grid.GridItemSpan
import androidx.compose.foundation.lazy.grid.LazyVerticalGrid
import androidx.compose.foundation.lazy.grid.itemsIndexed
import androidx.compose.foundation.lazy.items
import androidx.compose.foundation.shape.CircleShape
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.AccessibilityNew
import androidx.compose.material.icons.filled.AutoStories
import androidx.compose.material.icons.filled.Balance
import androidx.compose.material.icons.filled.Clear
import androidx.compose.material.icons.filled.Close
import androidx.compose.material.icons.filled.History
import androidx.compose.material.icons.filled.LocalCafe
import androidx.compose.material.icons.filled.LocalFireDepartment
import androidx.compose.material.icons.filled.Mic
import androidx.compose.material.icons.filled.Opacity
import androidx.compose.material.icons.filled.Schedule
import androidx.compose.material.icons.filled.Search
import androidx.compose.material.icons.filled.Shield
import androidx.compose.material.icons.filled.Spa
import androidx.compose.material3.CircularProgressIndicator
import androidx.compose.material3.Icon
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.runtime.collectAsState
import androidx.compose.runtime.getValue
import androidx.compose.runtime.mutableStateListOf
import androidx.compose.runtime.remember
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.draw.clip
import androidx.compose.ui.graphics.Brush
import androidx.compose.ui.graphics.vector.ImageVector
import androidx.compose.ui.platform.LocalFocusManager
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.text.style.TextAlign
import androidx.compose.ui.text.style.TextOverflow
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import androidx.hilt.navigation.compose.hiltViewModel
import com.ayurdhara.core.common.domain.model.Product
import com.ayurdhara.core.common.result.UiState
import com.ayurdhara.core.designsystem.components.AyAvatar
import com.ayurdhara.core.designsystem.components.AyCatalogProductCard
import com.ayurdhara.core.designsystem.components.AyIconButton
import com.ayurdhara.core.designsystem.components.AyLogoMark
import com.ayurdhara.core.designsystem.components.AySearchBox
import com.ayurdhara.core.designsystem.components.ayCard
import com.ayurdhara.core.designsystem.components.ayDiscountPercent
import com.ayurdhara.core.designsystem.theme.AyTheme
import com.ayurdhara.core.designsystem.theme.NotoSerif
import com.ayurdhara.core.designsystem.theme.PlusJakartaSans
import com.ayurdhara.feature.search.presentation.viewmodel.SearchViewModel

private data class Concern(
    val title: String,
    val description: String,
    val items: Int,
    val icon: ImageVector,
    val query: String
)

private val concerns = listOf(
    Concern("Hair & Scalp Health", "Bhringraj & Brahmi solutions for root revitalization and lustrous density.", 18, Icons.Filled.Opacity, "Hair"),
    Concern("Joint & Muscle Relief", "Mahanarayan & Eucalyptus for deep neuromuscular tranquility.", 12, Icons.Filled.AccessibilityNew, "Joint"),
    Concern("Digestion & Gut Cleanse", "Triphala & Hingwashtak soothing daily Agni stimulation and detox.", 15, Icons.Filled.LocalCafe, "Digest"),
    Concern("Immunity & Vitality", "Pure Gold Grade Chyawanprash & Ojas elixir for vitality.", 22, Icons.Filled.Shield, "Immunity")
)

private val trending = listOf(
    "Cold Pressed Sesame Oil", "Pure Himalayan Shilajit", "Ashwagandha Root Churna", "Aroma Diffuser Oils", "Triphala Juice"
)

@Composable
fun SearchScreen(
    viewModel: SearchViewModel = hiltViewModel(),
    onAddToCart: (Product) -> Unit = {},
    onProductClick: (String) -> Unit = {}
) {
    val searchQuery by viewModel.searchQuery.collectAsState()
    val searchResults by viewModel.searchResults.collectAsState()
    val focusManager = LocalFocusManager.current
    val c = AyTheme.colors
    // Seeded with the design's sample trail; new searches are prepended.
    val recents = remember {
        mutableStateListOf("Kumkumadi Tailam saffron drops", "Organic Triphala churna 250g", "Pure wild honey unprocessed")
    }

    fun commitSearch() {
        val q = searchQuery.trim()
        if (q.isNotEmpty()) {
            recents.remove(q)
            recents.add(0, q)
            while (recents.size > 6) recents.removeAt(recents.size - 1)
        }
        focusManager.clearFocus()
    }

    Column(Modifier.fillMaxSize().background(c.canvas)) {
        // Header: logo + "Search" + actions
        Row(
            Modifier.fillMaxWidth().background(c.bar).statusBarsPadding().padding(horizontal = 20.dp, vertical = 12.dp),
            verticalAlignment = Alignment.CenterVertically
        ) {
            AyLogoMark(32.dp)
            Spacer(Modifier.width(10.dp))
            Text("Search", Modifier.weight(1f), fontFamily = NotoSerif, fontWeight = FontWeight.Bold, fontSize = 22.sp, color = c.heading)
            AyIconButton(Icons.Filled.Search, "Search", onClick = {})
            AyAvatar(32.dp)
        }

        Column(Modifier.padding(horizontal = 20.dp).padding(top = 16.dp, bottom = 4.dp)) {
            Row(verticalAlignment = Alignment.CenterVertically) {
                Box(Modifier.size(6.dp).background(c.accent, CircleShape))
                Spacer(Modifier.width(6.dp))
                Text(
                    "DIVINE HEALING DIRECTORY", fontFamily = PlusJakartaSans, fontWeight = FontWeight.Bold,
                    fontSize = 11.sp, letterSpacing = 1.5.sp, color = c.accent
                )
            }
            Spacer(Modifier.height(4.dp))
            Text(
                "Explore Vedic Formulations", fontFamily = NotoSerif, fontWeight = FontWeight.Bold,
                fontSize = 26.sp, lineHeight = 32.sp, color = c.heading
            )
            Spacer(Modifier.height(12.dp))
            AySearchBox(
                value = searchQuery,
                onValueChange = { viewModel.updateSearchQuery(it) },
                placeholder = "Search oils, single herbs, churnas, kadha...",
                height = 52.dp,
                onSearch = { commitSearch() },
                trailing = {
                    if (searchQuery.isNotEmpty()) {
                        AyIconButton(Icons.Filled.Clear, "Clear", onClick = { viewModel.updateSearchQuery("") }, modifier = Modifier.size(32.dp))
                    }
                    Box(
                        Modifier.size(32.dp).background(c.goldFill, CircleShape),
                        contentAlignment = Alignment.Center
                    ) {
                        Icon(Icons.Filled.Mic, "Voice search", tint = c.onGoldFill, modifier = Modifier.size(18.dp))
                    }
                }
            )
        }

        if (searchQuery.isBlank()) {
            // ───── Explorer: trending, concerns, recents, prakriti ─────
            LazyColumn(Modifier.fillMaxSize(), contentPadding = PaddingValues(top = 24.dp, bottom = 24.dp)) {
                // Trending Remedies
                item {
                    Column {
                    Row(
                        Modifier.fillMaxWidth().padding(horizontal = 20.dp).padding(bottom = 8.dp),
                        verticalAlignment = Alignment.CenterVertically
                    ) {
                        Icon(Icons.Filled.LocalFireDepartment, null, tint = c.accent, modifier = Modifier.size(18.dp))
                        Spacer(Modifier.width(6.dp))
                        Text("Trending Remedies", Modifier.weight(1f), fontFamily = PlusJakartaSans, fontWeight = FontWeight.Bold, fontSize = 16.sp, color = c.heading)
                        Text("DAILY VEDA", fontFamily = PlusJakartaSans, fontSize = 11.sp, color = c.textMuted)
                    }
                    LazyRow(
                        contentPadding = PaddingValues(horizontal = 20.dp, vertical = 4.dp),
                        horizontalArrangement = Arrangement.spacedBy(10.dp)
                    ) {
                        items(trending) { t ->
                            Row(
                                Modifier
                                    .ayCard(RoundedCornerShape(50), color = c.cardLow, elevation = 1.dp)
                                    .clickable { viewModel.updateSearchQuery(t) }
                                    .padding(horizontal = 14.dp, vertical = 8.dp),
                                verticalAlignment = Alignment.CenterVertically
                            ) {
                                Text("🔥", fontSize = 12.sp)
                                Spacer(Modifier.width(6.dp))
                                Text(t, fontFamily = PlusJakartaSans, fontWeight = FontWeight.Medium, fontSize = 14.sp, color = c.text, maxLines = 1)
                            }
                        }
                    }
                    }
                }

                // Consult by Health Concern
                item {
                    Column(Modifier.padding(horizontal = 20.dp).padding(top = 24.dp)) {
                        Row(verticalAlignment = Alignment.CenterVertically) {
                            Column(Modifier.weight(1f)) {
                                Text("Consult by Health Concern", fontFamily = PlusJakartaSans, fontWeight = FontWeight.Bold, fontSize = 16.sp, color = c.heading)
                                Text(
                                    "Targeted botanical balancing for Vata, Pitta & Kapha",
                                    fontFamily = PlusJakartaSans, fontSize = 12.sp, color = c.textSub
                                )
                            }
                            Box(Modifier.size(32.dp).background(c.chip, CircleShape), contentAlignment = Alignment.Center) {
                                Icon(Icons.Filled.Balance, null, tint = if (c.isDark) c.accent else c.heading, modifier = Modifier.size(18.dp))
                            }
                        }
                        Spacer(Modifier.height(16.dp))
                        concerns.chunked(2).forEachIndexed { rowIndex, pair ->
                            if (rowIndex > 0) Spacer(Modifier.height(12.dp))
                            Row(Modifier.fillMaxWidth().height(IntrinsicSize.Max), horizontalArrangement = Arrangement.spacedBy(12.dp)) {
                                pair.forEach { concern ->
                                    ConcernTile(concern, Modifier.weight(1f).fillMaxHeight()) { viewModel.updateSearchQuery(concern.query) }
                                }
                            }
                        }
                    }
                }

                // Recent searches
                item {
                    Column(Modifier.padding(horizontal = 20.dp).padding(top = 24.dp)) {
                        Row(verticalAlignment = Alignment.CenterVertically) {
                            Icon(Icons.Filled.History, null, tint = c.textSub, modifier = Modifier.size(18.dp))
                            Spacer(Modifier.width(6.dp))
                            Text("Recent Searches", Modifier.weight(1f), fontFamily = PlusJakartaSans, fontWeight = FontWeight.Bold, fontSize = 16.sp, color = c.heading)
                            if (recents.isNotEmpty()) {
                                Text(
                                    "Clear All", Modifier.clickable { recents.clear() }.padding(4.dp),
                                    fontFamily = PlusJakartaSans, fontWeight = FontWeight.SemiBold, fontSize = 13.sp, color = c.accent
                                )
                            }
                        }
                        Spacer(Modifier.height(8.dp))
                        if (recents.isEmpty()) {
                            Column(
                                Modifier.fillMaxWidth().ayCard(RoundedCornerShape(12.dp), color = c.cardLow, elevation = 1.dp).padding(vertical = 24.dp, horizontal = 16.dp),
                                horizontalAlignment = Alignment.CenterHorizontally
                            ) {
                                Box(Modifier.size(40.dp).background(c.chip, CircleShape), contentAlignment = Alignment.Center) {
                                    Icon(Icons.Filled.Spa, null, tint = c.accent, modifier = Modifier.size(20.dp))
                                }
                                Spacer(Modifier.height(8.dp))
                                Text("Sacred Slate Cleared", fontFamily = PlusJakartaSans, fontWeight = FontWeight.Bold, fontSize = 14.sp, color = c.heading)
                                Text("Your exploration trail is peaceful and empty.", fontFamily = PlusJakartaSans, fontSize = 12.sp, color = c.textSub)
                            }
                        } else {
                            Column(verticalArrangement = Arrangement.spacedBy(8.dp)) {
                                recents.toList().forEach { r ->
                                    Row(
                                        Modifier.fillMaxWidth()
                                            .ayCard(RoundedCornerShape(8.dp), color = c.cardLow, elevation = 1.dp)
                                            .clickable { viewModel.updateSearchQuery(r) }
                                            .padding(start = 12.dp, top = 8.dp, bottom = 8.dp, end = 8.dp),
                                        verticalAlignment = Alignment.CenterVertically
                                    ) {
                                        Icon(Icons.Filled.Schedule, null, tint = c.textMuted, modifier = Modifier.size(18.dp))
                                        Spacer(Modifier.width(12.dp))
                                        Text(
                                            r, Modifier.weight(1f), fontFamily = PlusJakartaSans, fontSize = 14.sp, color = c.text,
                                            maxLines = 1, overflow = TextOverflow.Ellipsis
                                        )
                                        Box(
                                            Modifier.size(28.dp).clip(CircleShape).clickable { recents.remove(r) },
                                            contentAlignment = Alignment.Center
                                        ) {
                                            Icon(Icons.Filled.Close, "Remove", tint = c.textSub, modifier = Modifier.size(16.dp))
                                        }
                                    }
                                }
                            }
                        }
                    }
                }

                // Prakriti assessment card
                item {
                    Row(
                        Modifier.padding(horizontal = 20.dp).padding(top = 32.dp).fillMaxWidth()
                            .ayCard(RoundedCornerShape(12.dp), color = c.chip, elevation = 1.dp)
                            .padding(16.dp),
                        verticalAlignment = Alignment.CenterVertically
                    ) {
                        Box(Modifier.size(40.dp).background(c.primaryBtn, CircleShape), contentAlignment = Alignment.Center) {
                            Icon(Icons.Filled.AutoStories, null, tint = c.onPrimaryBtn, modifier = Modifier.size(20.dp))
                        }
                        Spacer(Modifier.width(12.dp))
                        Column(Modifier.weight(1f)) {
                            Text("Unsure of your Dosha?", fontFamily = PlusJakartaSans, fontWeight = FontWeight.Bold, fontSize = 14.sp, color = c.heading)
                            Text("Take the 2-minute Ayurvedic Prakriti assessment.", fontFamily = PlusJakartaSans, fontSize = 12.sp, lineHeight = 16.sp, color = c.textSub)
                        }
                        Spacer(Modifier.width(8.dp))
                        Text(
                            "Start",
                            Modifier.background(c.primaryBtn, RoundedCornerShape(50)).padding(horizontal = 14.dp, vertical = 6.dp),
                            fontFamily = PlusJakartaSans, fontWeight = FontWeight.SemiBold, fontSize = 13.sp, color = c.onPrimaryBtn
                        )
                    }
                }
            }
        } else {
            // ───── Live results ─────
            when (val state = searchResults) {
                is UiState.Loading, is UiState.Idle -> {
                    Box(Modifier.fillMaxSize(), contentAlignment = Alignment.Center) {
                        CircularProgressIndicator(color = c.accent)
                    }
                }
                is UiState.Error -> {
                    Box(Modifier.fillMaxSize().padding(32.dp), contentAlignment = Alignment.Center) {
                        Text("Unable to fetch results", fontFamily = PlusJakartaSans, fontSize = 14.sp, color = c.error)
                    }
                }
                is UiState.Success -> {
                    if (state.data.isEmpty()) {
                        Box(Modifier.fillMaxSize().padding(32.dp), contentAlignment = Alignment.Center) {
                            Column(horizontalAlignment = Alignment.CenterHorizontally) {
                                Box(Modifier.size(40.dp).background(c.chip, CircleShape), contentAlignment = Alignment.Center) {
                                    Icon(Icons.Filled.Spa, null, tint = c.accent, modifier = Modifier.size(20.dp))
                                }
                                Spacer(Modifier.height(8.dp))
                                Text(
                                    "No products found for '$searchQuery'", fontFamily = PlusJakartaSans, fontSize = 14.sp,
                                    color = c.textSub, textAlign = TextAlign.Center
                                )
                            }
                        }
                    } else {
                        LazyVerticalGrid(
                            columns = GridCells.Fixed(2),
                            modifier = Modifier.fillMaxSize(),
                            contentPadding = PaddingValues(top = 16.dp, bottom = 24.dp),
                            horizontalArrangement = Arrangement.spacedBy(12.dp),
                            verticalArrangement = Arrangement.spacedBy(12.dp)
                        ) {
                            item(span = { GridItemSpan(maxLineSpan) }) {
                                Text(
                                    "${state.data.size} results", Modifier.padding(horizontal = 20.dp),
                                    fontFamily = PlusJakartaSans, fontWeight = FontWeight.Bold, fontSize = 13.sp, color = c.textSub
                                )
                            }
                            itemsIndexed(state.data, key = { _, p -> p.id }) { index, p ->
                                AyCatalogProductCard(
                                    title = p.title,
                                    categoryLabel = p.category,
                                    price = p.price,
                                    originalPrice = p.originalPrice,
                                    discount = ayDiscountPercent(p.price, p.originalPrice, p.discount),
                                    rating = p.rating,
                                    reviewCount = p.reviewCount,
                                    badge = p.badge,
                                    imageUrl = p.imageUrl,
                                    onClick = { commitSearch(); onProductClick(p.slug) },
                                    onAdd = { onAddToCart(p) },
                                    modifier = Modifier.fillMaxWidth().padding(
                                        start = if (index % 2 == 0) 20.dp else 0.dp,
                                        end = if (index % 2 == 0) 0.dp else 20.dp
                                    )
                                )
                            }
                        }
                    }
                }
            }
        }
    }
}

@Composable
private fun ConcernTile(concern: Concern, modifier: Modifier, onClick: () -> Unit) {
    val c = AyTheme.colors
    Column(
        modifier
            .ayCard(RoundedCornerShape(12.dp), color = c.cardLow, elevation = 1.dp)
            .clickable(onClick = onClick)
            .padding(14.dp)
    ) {
        Box(
            Modifier.fillMaxWidth().height(96.dp).clip(RoundedCornerShape(8.dp))
                .background(Brush.linearGradient(listOf(c.heroStart, c.heroEnd)))
        ) {
            Icon(concern.icon, null, tint = c.goldFill.copy(alpha = 0.35f), modifier = Modifier.align(Alignment.Center).size(48.dp))
            Box(
                Modifier.align(Alignment.TopStart).padding(6.dp).size(28.dp).background(c.card.copy(alpha = 0.9f), CircleShape),
                contentAlignment = Alignment.Center
            ) {
                Icon(concern.icon, null, tint = if (c.isDark) c.accent else c.heading, modifier = Modifier.size(16.dp))
            }
            Text(
                "${concern.items} items",
                Modifier.align(Alignment.BottomEnd).padding(6.dp)
                    .background(c.heroMid.copy(alpha = 0.85f), RoundedCornerShape(50))
                    .padding(horizontal = 8.dp, vertical = 2.dp),
                fontFamily = PlusJakartaSans, fontSize = 11.sp, color = c.onHero
            )
        }
        Spacer(Modifier.height(10.dp))
        Text(
            concern.title, fontFamily = NotoSerif, fontWeight = FontWeight.Bold, fontSize = 15.sp, color = c.heading,
            maxLines = 1, overflow = TextOverflow.Ellipsis
        )
        Spacer(Modifier.height(2.dp))
        Text(
            concern.description, fontFamily = PlusJakartaSans, fontSize = 12.sp, lineHeight = 16.sp, color = c.textSub,
            maxLines = 2, overflow = TextOverflow.Ellipsis
        )
    }
}
