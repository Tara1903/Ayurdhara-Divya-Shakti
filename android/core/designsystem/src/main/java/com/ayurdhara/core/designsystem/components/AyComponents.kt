package com.ayurdhara.core.designsystem.components

import androidx.compose.foundation.BorderStroke
import androidx.compose.foundation.Canvas
import androidx.compose.foundation.background
import androidx.compose.foundation.border
import androidx.compose.foundation.clickable
import androidx.compose.foundation.interaction.MutableInteractionSource
import androidx.compose.foundation.layout.*
import androidx.compose.foundation.shape.CircleShape
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.foundation.text.KeyboardOptions
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.automirrored.filled.ArrowBack
import androidx.compose.material.icons.filled.Notifications
import androidx.compose.material.icons.filled.Star
import androidx.compose.material3.*
import androidx.compose.runtime.Composable
import androidx.compose.runtime.remember
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.draw.clip
import androidx.compose.ui.draw.shadow
import androidx.compose.ui.geometry.Offset
import androidx.compose.ui.graphics.Brush
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.graphics.Path
import androidx.compose.ui.graphics.Shape
import androidx.compose.ui.graphics.drawscope.Stroke
import androidx.compose.ui.graphics.vector.ImageVector
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.text.input.VisualTransformation
import androidx.compose.ui.text.style.TextOverflow
import androidx.compose.ui.unit.Dp
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import com.ayurdhara.core.designsystem.theme.AyTheme
import com.ayurdhara.core.designsystem.theme.NotoSerif
import com.ayurdhara.core.designsystem.theme.PlusJakartaSans
import coil.compose.AsyncImage
import androidx.compose.ui.layout.ContentScale

// ───────────────────────────── Surfaces ─────────────────────────────

/** Card surface: soft shadow in light mode, 1dp gold-alpha hairline in dark mode. */
@Composable
fun Modifier.ayCard(
    shape: Shape = RoundedCornerShape(16.dp),
    color: Color = AyTheme.colors.card,
    elevation: Dp = 3.dp
): Modifier {
    val c = AyTheme.colors
    return if (c.isDark) {
        this.clip(shape).background(color, shape).border(1.dp, c.border, shape)
    } else {
        this.shadow(elevation, shape)
            .background(color, shape).clip(shape)
    }
}

@Composable
fun AyDivider(modifier: Modifier = Modifier) {
    HorizontalDivider(modifier, color = AyTheme.colors.border.copy(alpha = if (AyTheme.colors.isDark) 0.25f else 0.8f))
}

// ───────────────────────────── Brand ─────────────────────────────

/** Leaf logo mark: gold-outlined leaf with a gold seed. */
@Composable
fun AyLogoMark(size: Dp = 36.dp, modifier: Modifier = Modifier) {
    val c = AyTheme.colors
    val fill = if (c.isDark) c.card else c.heading
    val gold = if (c.isDark) c.accent else Color(0xFFD4AF37)
    Canvas(modifier.size(size)) {
        val w = this.size.width
        val h = this.size.height
        val leaf = Path().apply {
            moveTo(w * 0.5f, h * 0.02f)
            cubicTo(w * 1.02f, h * 0.30f, w * 0.92f, h * 0.80f, w * 0.5f, h * 0.98f)
            cubicTo(w * 0.08f, h * 0.80f, -w * 0.02f, h * 0.30f, w * 0.5f, h * 0.02f)
            close()
        }
        drawPath(leaf, fill)
        drawPath(leaf, gold, style = Stroke(width = w * 0.07f))
        drawLine(gold, Offset(w * 0.5f, h * 0.42f), Offset(w * 0.5f, h * 0.88f), strokeWidth = w * 0.04f)
        drawCircle(gold, radius = w * 0.075f, center = Offset(w * 0.5f, h * 0.36f))
    }
}

/** Top bar with logo, "Ayurdhara / DIVYA SHAKTI" wordmark and trailing actions. */
@Composable
fun AyBrandBar(
    modifier: Modifier = Modifier,
    trailing: @Composable RowScope.() -> Unit = {}
) {
    val c = AyTheme.colors
    Row(
        modifier = modifier
            .fillMaxWidth()
            .background(c.bar)
            .statusBarsPadding()
            .padding(horizontal = 20.dp, vertical = 10.dp),
        verticalAlignment = Alignment.CenterVertically
    ) {
        AyLogoMark(34.dp)
        Spacer(Modifier.width(10.dp))
        Column(Modifier.weight(1f)) {
            Text("Ayurdhara", fontFamily = NotoSerif, fontWeight = FontWeight.Bold, fontSize = 20.sp, color = c.heading, lineHeight = 22.sp)
            Text("DIVYA SHAKTI", fontFamily = PlusJakartaSans, fontWeight = FontWeight.Bold, fontSize = 9.sp, letterSpacing = 2.sp, color = c.accent)
        }
        trailing()
    }
}

@Composable
fun AyIconButton(icon: ImageVector, contentDescription: String?, onClick: () -> Unit, modifier: Modifier = Modifier, badge: Boolean = false) {
    val c = AyTheme.colors
    Box(
        modifier
            .size(40.dp)
            .clip(CircleShape)
            .clickable(onClick = onClick),
        contentAlignment = Alignment.Center
    ) {
        Icon(icon, contentDescription, tint = c.heading, modifier = Modifier.size(24.dp))
        if (badge) Box(Modifier.align(Alignment.TopEnd).padding(9.dp).size(8.dp).background(c.accent, CircleShape))
    }
}

/** Back-arrow top bar used on secondary screens. */
@Composable
fun AyBackBar(
    title: String,
    onBack: (() -> Unit)?,
    modifier: Modifier = Modifier,
    actions: @Composable RowScope.() -> Unit = {}
) {
    val c = AyTheme.colors
    Row(
        modifier = modifier
            .fillMaxWidth()
            .background(c.bar)
            .statusBarsPadding()
            .padding(horizontal = 8.dp, vertical = 6.dp),
        verticalAlignment = Alignment.CenterVertically
    ) {
        if (onBack != null) AyIconButton(Icons.AutoMirrored.Filled.ArrowBack, "Back", onBack) else Spacer(Modifier.width(12.dp))
        Text(
            title, Modifier.weight(1f).padding(horizontal = 8.dp),
            fontFamily = NotoSerif, fontWeight = FontWeight.Bold, fontSize = 20.sp, color = c.heading,
            maxLines = 1, overflow = TextOverflow.Ellipsis
        )
        actions()
    }
}

// ───────────────────────────── Buttons ─────────────────────────────

@Composable
fun AyPrimaryButton(
    text: String,
    onClick: () -> Unit,
    modifier: Modifier = Modifier,
    enabled: Boolean = true,
    leadingIcon: ImageVector? = null,
    trailingIcon: ImageVector? = null,
    height: Dp = 54.dp,
    gold: Boolean = false
) {
    val c = AyTheme.colors
    val bg = if (gold) c.goldFill else c.primaryBtn
    val fg = if (gold) c.onGoldFill else c.onPrimaryBtn
    Button(
        onClick = onClick,
        enabled = enabled,
        modifier = modifier.height(height),
        shape = RoundedCornerShape(16.dp),
        colors = ButtonDefaults.buttonColors(
            containerColor = bg, contentColor = fg,
            disabledContainerColor = bg.copy(alpha = 0.4f), disabledContentColor = fg.copy(alpha = 0.6f)
        ),
        contentPadding = PaddingValues(horizontal = 20.dp)
    ) {
        if (leadingIcon != null) { Icon(leadingIcon, null, Modifier.size(20.dp)); Spacer(Modifier.width(8.dp)) }
        Text(text, fontFamily = PlusJakartaSans, fontWeight = FontWeight.Bold, fontSize = 15.sp, maxLines = 1)
        if (trailingIcon != null) { Spacer(Modifier.width(8.dp)); Icon(trailingIcon, null, Modifier.size(20.dp)) }
    }
}

@Composable
fun AyGoldButton(
    text: String,
    onClick: () -> Unit,
    modifier: Modifier = Modifier,
    enabled: Boolean = true,
    leadingIcon: ImageVector? = null,
    trailingIcon: ImageVector? = null,
    height: Dp = 54.dp
) = AyPrimaryButton(text, onClick, modifier, enabled, leadingIcon, trailingIcon, height, gold = true)

@Composable
fun AyOutlineButton(
    text: String,
    onClick: () -> Unit,
    modifier: Modifier = Modifier,
    leadingIcon: ImageVector? = null,
    height: Dp = 54.dp
) {
    val c = AyTheme.colors
    OutlinedButton(
        onClick = onClick,
        modifier = modifier.height(height),
        shape = RoundedCornerShape(16.dp),
        border = BorderStroke(1.5.dp, if (c.isDark) c.accent.copy(alpha = 0.6f) else c.heading),
        colors = ButtonDefaults.outlinedButtonColors(contentColor = if (c.isDark) c.accent else c.heading),
        contentPadding = PaddingValues(horizontal = 20.dp)
    ) {
        if (leadingIcon != null) { Icon(leadingIcon, null, Modifier.size(20.dp)); Spacer(Modifier.width(8.dp)) }
        Text(text, fontFamily = PlusJakartaSans, fontWeight = FontWeight.Bold, fontSize = 15.sp, maxLines = 1)
    }
}

// ───────────────────────────── Chips / labels ─────────────────────────────

@Composable
fun AyChip(
    text: String,
    selected: Boolean,
    onClick: () -> Unit,
    modifier: Modifier = Modifier,
    leadingIcon: ImageVector? = null
) {
    val c = AyTheme.colors
    val shape = RoundedCornerShape(50)
    val bg = if (selected) (if (c.isDark) c.goldFill else c.heading) else c.chip
    val fg = if (selected) (if (c.isDark) c.onGoldFill else Color.White) else c.textSub
    Row(
        modifier
            .clip(shape)
            .background(bg, shape)
            .then(if (!selected) Modifier.border(1.dp, c.border.copy(alpha = if (c.isDark) 0.5f else 0.8f), shape) else Modifier)
            .clickable(onClick = onClick)
            .padding(horizontal = 16.dp, vertical = 9.dp),
        verticalAlignment = Alignment.CenterVertically
    ) {
        if (leadingIcon != null) { Icon(leadingIcon, null, Modifier.size(16.dp), tint = fg); Spacer(Modifier.width(6.dp)) }
        Text(text, fontFamily = PlusJakartaSans, fontWeight = FontWeight.SemiBold, fontSize = 13.sp, color = fg, maxLines = 1)
    }
}

@Composable
fun AyBadge(text: String, modifier: Modifier = Modifier, gold: Boolean = true) {
    val c = AyTheme.colors
    val bg = if (gold) c.goldFill else c.heading
    val fg = if (gold) c.onGoldFill else Color.White
    Text(
        text.uppercase(), modifier.background(bg, RoundedCornerShape(50)).padding(horizontal = 8.dp, vertical = 3.dp),
        fontFamily = PlusJakartaSans, fontWeight = FontWeight.Bold, fontSize = 9.sp, letterSpacing = 0.8.sp, color = fg, maxLines = 1
    )
}

@Composable
fun AyRating(rating: Double, reviewCount: Int? = null, modifier: Modifier = Modifier) {
    val c = AyTheme.colors
    Row(modifier, verticalAlignment = Alignment.CenterVertically) {
        Icon(Icons.Filled.Star, null, tint = if (c.isDark) c.accent else Color(0xFFD4A017), modifier = Modifier.size(14.dp))
        Spacer(Modifier.width(3.dp))
        Text(String.format("%.1f", rating), fontFamily = PlusJakartaSans, fontWeight = FontWeight.Bold, fontSize = 12.sp, color = c.text)
        if (reviewCount != null) Text(" ($reviewCount)", fontFamily = PlusJakartaSans, fontSize = 11.sp, color = c.textMuted)
    }
}

@Composable
fun AySectionHeader(
    title: String,
    modifier: Modifier = Modifier,
    action: String? = null,
    onAction: () -> Unit = {}
) {
    val c = AyTheme.colors
    Row(modifier.fillMaxWidth(), verticalAlignment = Alignment.CenterVertically) {
        Text(title, Modifier.weight(1f), fontFamily = NotoSerif, fontWeight = FontWeight.Bold, fontSize = 20.sp, color = c.heading)
        if (action != null) {
            Text(
                action, Modifier.clickable(onClick = onAction).padding(4.dp),
                fontFamily = PlusJakartaSans, fontWeight = FontWeight.Bold, fontSize = 13.sp, color = c.accent
            )
        }
    }
}

// ───────────────────────────── Inputs ─────────────────────────────

@Composable
fun AyTextField(
    value: String,
    onValueChange: (String) -> Unit,
    label: String,
    modifier: Modifier = Modifier,
    placeholder: String? = null,
    leadingIcon: ImageVector? = null,
    trailing: (@Composable () -> Unit)? = null,
    singleLine: Boolean = true,
    keyboardOptions: KeyboardOptions = KeyboardOptions.Default,
    visualTransformation: VisualTransformation = VisualTransformation.None,
    isError: Boolean = false,
    minLines: Int = 1
) {
    val c = AyTheme.colors
    OutlinedTextField(
        value = value,
        onValueChange = onValueChange,
        modifier = modifier,
        label = { Text(label, fontFamily = PlusJakartaSans) },
        placeholder = placeholder?.let { { Text(it, fontFamily = PlusJakartaSans) } },
        leadingIcon = leadingIcon?.let { { Icon(it, null) } },
        trailingIcon = trailing,
        singleLine = singleLine,
        minLines = minLines,
        isError = isError,
        keyboardOptions = keyboardOptions,
        visualTransformation = visualTransformation,
        shape = RoundedCornerShape(16.dp),
        colors = OutlinedTextFieldDefaults.colors(
            focusedBorderColor = if (c.isDark) c.accent else c.heading,
            unfocusedBorderColor = c.outline,
            focusedLabelColor = if (c.isDark) c.accent else c.heading,
            unfocusedLabelColor = c.textMuted,
            focusedTextColor = c.text,
            unfocusedTextColor = c.text,
            cursorColor = c.accent,
            focusedContainerColor = c.card,
            unfocusedContainerColor = c.card,
            focusedLeadingIconColor = c.accent,
            unfocusedLeadingIconColor = c.textMuted,
            errorBorderColor = c.error
        )
    )
}

// ───────────────────────────── Image ─────────────────────────────

@Composable
fun AyImage(
    url: String?,
    contentDescription: String?,
    modifier: Modifier = Modifier,
    contentScale: ContentScale = ContentScale.Crop
) {
    val c = AyTheme.colors
    Box(modifier.background(c.chip), contentAlignment = Alignment.Center) {
        if (url.isNullOrBlank()) {
            AyLogoMark(40.dp)
        } else {
            AsyncImage(url, contentDescription, Modifier.matchParentSize(), contentScale = contentScale)
        }
    }
}

// ───────────────────────────── Bottom navigation ─────────────────────────────

data class AyNavItem(val label: String, val icon: ImageVector, val badge: Int = 0)

@Composable
fun AyBottomBar(
    items: List<AyNavItem>,
    selectedIndex: Int,
    onSelect: (Int) -> Unit,
    modifier: Modifier = Modifier
) {
    val c = AyTheme.colors
    Column(modifier.background(c.bar)) {
        HorizontalDivider(color = c.border.copy(alpha = if (c.isDark) 0.3f else 0.7f))
        Row(
            Modifier.fillMaxWidth().navigationBarsPadding().padding(horizontal = 8.dp, vertical = 8.dp),
            horizontalArrangement = Arrangement.SpaceAround
        ) {
            items.forEachIndexed { i, item ->
                val selected = i == selectedIndex
                val tint = if (selected) (if (c.isDark) c.accent else c.heading) else c.textMuted
                Column(
                    Modifier
                        .weight(1f)
                        .clip(RoundedCornerShape(16.dp))
                        .clickable(interactionSource = remember { MutableInteractionSource() }, indication = null) { onSelect(i) }
                        .padding(vertical = 4.dp),
                    horizontalAlignment = Alignment.CenterHorizontally
                ) {
                    Box(
                        Modifier
                            .height(30.dp).width(56.dp)
                            .background(if (selected) (if (c.isDark) c.chipHigh else c.goldFill.copy(alpha = 0.55f)) else Color.Transparent, RoundedCornerShape(50)),
                        contentAlignment = Alignment.Center
                    ) {
                        BadgedBox(badge = {
                            if (item.badge > 0) Badge(containerColor = c.accent, contentColor = c.onGoldFill) { Text(item.badge.toString()) }
                        }) { Icon(item.icon, item.label, tint = tint, modifier = Modifier.size(24.dp)) }
                    }
                    Text(
                        item.label, fontFamily = PlusJakartaSans, fontSize = 11.sp,
                        fontWeight = if (selected) FontWeight.Bold else FontWeight.Medium, color = tint
                    )
                }
            }
        }
    }
}

// ───────────────────────────── Product card ─────────────────────────────

/** 2-column catalogue card matching the Stitch design (pedestal image, rating, serif title, price, Add to Bag). */
@Composable
fun AyProductCard(
    title: String,
    price: Double,
    originalPrice: Double?,
    rating: Double,
    reviewCount: Int,
    badge: String?,
    imageUrl: String?,
    onClick: () -> Unit,
    onAddToBag: () -> Unit,
    modifier: Modifier = Modifier,
    subtitle: String? = null
) {
    val c = AyTheme.colors
    Column(
        modifier
            .ayCard(RoundedCornerShape(20.dp))
            .clickable(onClick = onClick)
    ) {
        Box(Modifier.fillMaxWidth().height(150.dp)) {
            AyImage(imageUrl, title, Modifier.fillMaxSize())
            if (!badge.isNullOrBlank()) AyBadge(badge, Modifier.align(Alignment.TopStart).padding(8.dp))
        }
        Column(Modifier.padding(12.dp)) {
            AyRating(rating, reviewCount)
            Spacer(Modifier.height(4.dp))
            Text(
                title, fontFamily = NotoSerif, fontWeight = FontWeight.Bold, fontSize = 15.sp, lineHeight = 20.sp,
                color = c.heading, maxLines = 2, overflow = TextOverflow.Ellipsis, minLines = 2
            )
            if (subtitle != null) Text(subtitle, fontFamily = PlusJakartaSans, fontSize = 11.sp, color = c.textMuted, maxLines = 1, overflow = TextOverflow.Ellipsis)
            Spacer(Modifier.height(6.dp))
            Row(verticalAlignment = Alignment.Bottom) {
                Text("₹" + price.toInt(), fontFamily = PlusJakartaSans, fontWeight = FontWeight.ExtraBold, fontSize = 17.sp, color = c.price)
                if (originalPrice != null && originalPrice > price) {
                    Spacer(Modifier.width(6.dp))
                    Text(
                        "₹" + originalPrice.toInt(), fontFamily = PlusJakartaSans, fontSize = 12.sp, color = c.textMuted,
                        textDecoration = androidx.compose.ui.text.style.TextDecoration.LineThrough
                    )
                    val off = ((originalPrice - price) / originalPrice * 100).toInt()
                    if (off > 0) {
                        Spacer(Modifier.width(6.dp))
                        Text("$off% off", fontFamily = PlusJakartaSans, fontWeight = FontWeight.Bold, fontSize = 11.sp, color = c.success)
                    }
                }
            }
            Spacer(Modifier.height(10.dp))
            AyGoldButton("Add to Bag", onAddToBag, Modifier.fillMaxWidth(), height = 40.dp)
        }
    }
}

/** Circular category tile used on the Home screen. */
@Composable
fun AyCategoryCircle(title: String, imageUrl: String?, onClick: () -> Unit, modifier: Modifier = Modifier) {
    val c = AyTheme.colors
    Column(modifier.clickable(onClick = onClick).padding(4.dp), horizontalAlignment = Alignment.CenterHorizontally) {
        Box(
            Modifier.size(72.dp).clip(CircleShape).background(c.chip, CircleShape).border(2.dp, if (c.isDark) c.border else c.goldFill, CircleShape),
            contentAlignment = Alignment.Center
        ) {
            AyImage(imageUrl, title, Modifier.fillMaxSize().clip(CircleShape))
        }
        Spacer(Modifier.height(6.dp))
        Text(title, fontFamily = PlusJakartaSans, fontWeight = FontWeight.SemiBold, fontSize = 12.sp, color = c.text, maxLines = 2, lineHeight = 15.sp, textAlign = androidx.compose.ui.text.style.TextAlign.Center, modifier = Modifier.width(80.dp))
    }
}

@Composable
fun AyHeroBrush(): Brush {
    val c = AyTheme.colors
    return Brush.linearGradient(listOf(c.heroStart, c.heroMid, c.heroEnd))
}

@Composable
fun AyNotificationBell(onClick: () -> Unit = {}) = AyIconButton(Icons.Filled.Notifications, "Notifications", onClick, badge = true)
