package com.ayurdhara.core.designsystem.components

import androidx.compose.foundation.background
import androidx.compose.foundation.clickable
import androidx.compose.foundation.layout.*
import androidx.compose.foundation.shape.CircleShape
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.foundation.text.BasicTextField
import androidx.compose.foundation.text.KeyboardActions
import androidx.compose.foundation.text.KeyboardOptions
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.AddShoppingCart
import androidx.compose.material.icons.filled.Add
import androidx.compose.material.icons.filled.Favorite
import androidx.compose.material.icons.filled.FavoriteBorder
import androidx.compose.material.icons.filled.Person
import androidx.compose.material.icons.filled.Search
import androidx.compose.material.icons.filled.Star
import androidx.compose.material3.Icon
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.runtime.getValue
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.remember
import androidx.compose.runtime.setValue
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.draw.clip
import androidx.compose.ui.graphics.SolidColor
import androidx.compose.ui.graphics.vector.ImageVector
import androidx.compose.ui.text.TextStyle
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.text.input.ImeAction
import androidx.compose.ui.text.style.TextDecoration
import androidx.compose.ui.text.style.TextOverflow
import androidx.compose.ui.unit.Dp
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import com.ayurdhara.core.designsystem.theme.AyTheme
import com.ayurdhara.core.designsystem.theme.NotoSerif
import com.ayurdhara.core.designsystem.theme.PlusJakartaSans

// ───────────────────────────── Helpers ─────────────────────────────

/** Percentage off, from the original price when available, otherwise the declared discount. */
fun ayDiscountPercent(price: Double, originalPrice: Double?, declared: Int = 0): Int =
    if (originalPrice != null && originalPrice > price) ((originalPrice - price) / originalPrice * 100).toInt() else declared

/** 840 -> "840", 1240 -> "1.2k" (compact) or "1,240" (full). */
fun ayFormatCount(n: Int, compact: Boolean): String =
    if (compact && n >= 1000) String.format("%.1fk", n / 1000.0) else String.format("%,d", n)

// ───────────────────────────── Avatar ─────────────────────────────

/** Circular profile avatar placeholder (gold ring + person glyph). */
@Composable
fun AyAvatar(size: Dp = 32.dp, modifier: Modifier = Modifier, onClick: (() -> Unit)? = null) {
    val c = AyTheme.colors
    Box(
        modifier
            .size(size)
            .clip(CircleShape)
            .background(if (c.isDark) c.chipHigh else c.goldFill, CircleShape)
            .then(if (onClick != null) Modifier.clickable(onClick = onClick) else Modifier),
        contentAlignment = Alignment.Center
    ) {
        Icon(Icons.Filled.Person, null, tint = if (c.isDark) c.accent else c.onGoldFill, modifier = Modifier.size(size * 0.6f))
    }
}

// ───────────────────────────── Search box ─────────────────────────────

/** Pill-less rounded search input used on Shop and Search. [trailing] is laid out at the end. */
@Composable
fun AySearchBox(
    value: String,
    onValueChange: (String) -> Unit,
    placeholder: String,
    modifier: Modifier = Modifier,
    height: Dp = 44.dp,
    onSearch: () -> Unit = {},
    trailing: @Composable RowScope.() -> Unit = {}
) {
    val c = AyTheme.colors
    val shape = RoundedCornerShape(12.dp)
    Row(
        modifier
            .fillMaxWidth()
            .height(height)
            .ayCard(shape, elevation = 1.dp)
            .padding(start = 14.dp, end = 8.dp),
        verticalAlignment = Alignment.CenterVertically
    ) {
        Icon(Icons.Filled.Search, null, tint = if (c.isDark) c.accent else c.heading, modifier = Modifier.size(22.dp))
        Spacer(Modifier.width(10.dp))
        Box(Modifier.weight(1f), contentAlignment = Alignment.CenterStart) {
            if (value.isEmpty()) {
                Text(
                    placeholder, fontFamily = PlusJakartaSans, fontSize = 14.sp, color = c.textMuted,
                    maxLines = 1, overflow = TextOverflow.Ellipsis
                )
            }
            BasicTextField(
                value = value,
                onValueChange = onValueChange,
                singleLine = true,
                textStyle = TextStyle(fontFamily = PlusJakartaSans, fontSize = 14.sp, color = c.text),
                cursorBrush = SolidColor(c.accent),
                keyboardOptions = KeyboardOptions(imeAction = ImeAction.Search),
                keyboardActions = KeyboardActions(onSearch = { onSearch() }),
                modifier = Modifier.fillMaxWidth()
            )
        }
        trailing()
    }
}

// ───────────────────────────── Compact pill ─────────────────────────────

/** Compact pill (≈32dp tall) used for "Targeted Remedies" and similar chip rows. */
@Composable
fun AyPill(
    text: String,
    selected: Boolean,
    onClick: () -> Unit,
    modifier: Modifier = Modifier,
    leadingIcon: ImageVector? = null,
    textSize: Int = 13
) {
    val c = AyTheme.colors
    val shape = RoundedCornerShape(50)
    val bg = if (selected) c.primaryBtn else c.chip
    val fg = if (selected) c.onPrimaryBtn else c.text
    Row(
        modifier
            .clip(shape)
            .background(bg, shape)
            .clickable(onClick = onClick)
            .padding(horizontal = 12.dp, vertical = 7.dp),
        verticalAlignment = Alignment.CenterVertically
    ) {
        if (leadingIcon != null) {
            Icon(leadingIcon, null, Modifier.size(14.dp), tint = fg)
            Spacer(Modifier.width(4.dp))
        }
        Text(
            text, fontFamily = PlusJakartaSans, fontSize = textSize.sp, color = fg, maxLines = 1,
            fontWeight = if (selected) FontWeight.SemiBold else FontWeight.Medium
        )
    }
}

// ───────────────────────────── Product cards ─────────────────────────────

/** Home "Ayurvedic Bestsellers" card: padded card, square image, rating, serif title, price, full-width Add to Bag. */
@Composable
fun AyHomeProductCard(
    title: String,
    price: Double,
    originalPrice: Double?,
    discount: Int,
    rating: Double,
    reviewCount: Int,
    badge: String?,
    imageUrl: String?,
    onClick: () -> Unit,
    onAddToBag: () -> Unit,
    modifier: Modifier = Modifier
) {
    val c = AyTheme.colors
    Column(
        modifier
            .ayCard(RoundedCornerShape(16.dp), elevation = 2.dp)
            .clickable(onClick = onClick)
            .padding(12.dp)
    ) {
        Box(Modifier.fillMaxWidth().aspectRatio(1f).clip(RoundedCornerShape(12.dp))) {
            AyImage(imageUrl, title, Modifier.fillMaxSize())
            if (!badge.isNullOrBlank()) {
                Text(
                    badge, Modifier.align(Alignment.TopStart).padding(8.dp)
                        .background(c.card.copy(alpha = 0.9f), RoundedCornerShape(50))
                        .padding(horizontal = 8.dp, vertical = 2.dp),
                    fontFamily = PlusJakartaSans, fontWeight = FontWeight.Bold, fontSize = 9.sp, color = c.heading,
                    maxLines = 1, overflow = TextOverflow.Ellipsis
                )
            }
        }
        Spacer(Modifier.height(8.dp))
        Row(verticalAlignment = Alignment.CenterVertically) {
            Icon(Icons.Filled.Star, null, tint = c.accent, modifier = Modifier.size(13.dp))
            Spacer(Modifier.width(4.dp))
            Text(String.format("%.1f", rating), fontFamily = PlusJakartaSans, fontWeight = FontWeight.Bold, fontSize = 11.sp, color = c.text)
            Spacer(Modifier.width(4.dp))
            Text("(" + ayFormatCount(reviewCount, compact = false) + ")", fontFamily = PlusJakartaSans, fontSize = 11.sp, color = c.textMuted)
        }
        Spacer(Modifier.height(4.dp))
        Text(
            title, fontFamily = NotoSerif, fontWeight = FontWeight.Bold, fontSize = 14.sp, lineHeight = 19.sp,
            color = c.text, maxLines = 2, minLines = 2, overflow = TextOverflow.Ellipsis
        )
        Spacer(Modifier.height(4.dp))
        Row(verticalAlignment = Alignment.Bottom) {
            Text("₹" + price.toInt(), fontFamily = PlusJakartaSans, fontWeight = FontWeight.ExtraBold, fontSize = 16.sp, color = c.price)
            if (originalPrice != null && originalPrice > price) {
                Spacer(Modifier.width(6.dp))
                Text(
                    "₹" + originalPrice.toInt(), fontFamily = PlusJakartaSans, fontSize = 11.sp, color = c.textMuted,
                    textDecoration = TextDecoration.LineThrough
                )
            }
            if (discount > 0) {
                Spacer(Modifier.width(6.dp))
                Text("$discount% off", fontFamily = PlusJakartaSans, fontWeight = FontWeight.Bold, fontSize = 10.sp, color = c.accent)
            }
        }
        Spacer(Modifier.height(12.dp))
        Row(
            Modifier.fillMaxWidth().height(36.dp)
                .clip(RoundedCornerShape(12.dp))
                .background(c.goldFill, RoundedCornerShape(12.dp))
                .clickable(onClick = onAddToBag),
            horizontalArrangement = Arrangement.Center,
            verticalAlignment = Alignment.CenterVertically
        ) {
            Icon(Icons.Filled.AddShoppingCart, null, tint = c.onGoldFill, modifier = Modifier.size(16.dp))
            Spacer(Modifier.width(4.dp))
            Text("Add to Bag", fontFamily = PlusJakartaSans, fontWeight = FontWeight.Bold, fontSize = 12.sp, color = c.onGoldFill)
        }
    }
}

/** Shop catalogue card: edge-to-edge square image, discount badge, wishlist heart, price + compact "Add" pill. */
@Composable
fun AyCatalogProductCard(
    title: String,
    categoryLabel: String?,
    price: Double,
    originalPrice: Double?,
    discount: Int,
    rating: Double,
    reviewCount: Int,
    badge: String?,
    imageUrl: String?,
    onClick: () -> Unit,
    onAdd: () -> Unit,
    modifier: Modifier = Modifier
) {
    val c = AyTheme.colors
    var favourite by remember { mutableStateOf(false) }
    val topBadge = if (discount > 0) "$discount% OFF" else badge
    Column(
        modifier
            .ayCard(RoundedCornerShape(12.dp), elevation = 2.dp)
            .clickable(onClick = onClick)
    ) {
        Box(Modifier.fillMaxWidth().aspectRatio(1f)) {
            AyImage(imageUrl, title, Modifier.fillMaxSize())
            if (!topBadge.isNullOrBlank()) {
                Text(
                    topBadge.uppercase(), Modifier.align(Alignment.TopStart).padding(8.dp)
                        .background(c.goldFill, RoundedCornerShape(50))
                        .padding(horizontal = 8.dp, vertical = 2.dp),
                    fontFamily = PlusJakartaSans, fontWeight = FontWeight.Bold, fontSize = 10.sp, color = c.onGoldFill,
                    maxLines = 1, overflow = TextOverflow.Ellipsis
                )
            }
            Box(
                Modifier.align(Alignment.TopEnd).padding(8.dp).size(28.dp)
                    .clip(CircleShape)
                    .background(c.canvas.copy(alpha = 0.85f), CircleShape)
                    .clickable { favourite = !favourite },
                contentAlignment = Alignment.Center
            ) {
                Icon(
                    if (favourite) Icons.Filled.Favorite else Icons.Filled.FavoriteBorder, "Wishlist",
                    tint = if (favourite) c.accent else c.heading, modifier = Modifier.size(16.dp)
                )
            }
        }
        Column(Modifier.padding(10.dp)) {
            if (!categoryLabel.isNullOrBlank()) {
                Text(
                    categoryLabel.uppercase(), fontFamily = PlusJakartaSans, fontWeight = FontWeight.Bold, fontSize = 10.sp,
                    letterSpacing = 0.8.sp, color = c.accent, maxLines = 1, overflow = TextOverflow.Ellipsis
                )
                Spacer(Modifier.height(4.dp))
            }
            Text(
                title, fontFamily = NotoSerif, fontWeight = FontWeight.Bold, fontSize = 15.sp, lineHeight = 19.sp,
                color = c.heading, maxLines = 2, minLines = 2, overflow = TextOverflow.Ellipsis
            )
            Spacer(Modifier.height(6.dp))
            Row(verticalAlignment = Alignment.CenterVertically) {
                Icon(Icons.Filled.Star, null, tint = c.accent, modifier = Modifier.size(14.dp))
                Spacer(Modifier.width(4.dp))
                Text(String.format("%.1f", rating), fontFamily = PlusJakartaSans, fontWeight = FontWeight.Bold, fontSize = 11.sp, color = c.text)
                Spacer(Modifier.width(4.dp))
                Text("(" + ayFormatCount(reviewCount, compact = true) + ")", fontFamily = PlusJakartaSans, fontSize = 11.sp, color = c.textSub)
            }
            Spacer(Modifier.height(10.dp))
            Row(Modifier.fillMaxWidth(), verticalAlignment = Alignment.CenterVertically) {
                Column(Modifier.weight(1f)) {
                    Text("₹" + price.toInt(), fontFamily = PlusJakartaSans, fontWeight = FontWeight.ExtraBold, fontSize = 16.sp, color = c.price, maxLines = 1)
                    if (originalPrice != null && originalPrice > price) {
                        Text(
                            "₹" + originalPrice.toInt(), fontFamily = PlusJakartaSans, fontSize = 11.sp, color = c.textSub,
                            textDecoration = TextDecoration.LineThrough, maxLines = 1
                        )
                    }
                }
                Row(
                    Modifier.height(28.dp).clip(RoundedCornerShape(8.dp))
                        .background(c.accent, RoundedCornerShape(8.dp))
                        .clickable(onClick = onAdd)
                        .padding(horizontal = 10.dp),
                    verticalAlignment = Alignment.CenterVertically
                ) {
                    Icon(Icons.Filled.Add, null, tint = c.canvas, modifier = Modifier.size(14.dp))
                    Text("Add", fontFamily = PlusJakartaSans, fontWeight = FontWeight.SemiBold, fontSize = 12.sp, color = c.canvas)
                }
            }
        }
    }
}
