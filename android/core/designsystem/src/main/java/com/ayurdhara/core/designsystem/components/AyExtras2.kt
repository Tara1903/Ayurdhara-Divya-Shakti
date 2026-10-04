package com.ayurdhara.core.designsystem.components

import androidx.compose.foundation.background
import androidx.compose.foundation.border
import androidx.compose.foundation.clickable
import androidx.compose.foundation.layout.*
import androidx.compose.foundation.shape.CircleShape
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.Add
import androidx.compose.material.icons.filled.Remove
import androidx.compose.material3.HorizontalDivider
import androidx.compose.material3.Icon
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.draw.clip
import androidx.compose.ui.draw.shadow
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.graphics.RectangleShape
import androidx.compose.ui.graphics.vector.ImageVector
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.text.style.TextAlign
import androidx.compose.ui.unit.Dp
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import com.ayurdhara.core.designsystem.theme.AyTheme
import com.ayurdhara.core.designsystem.theme.NotoSerif
import com.ayurdhara.core.designsystem.theme.PlusJakartaSans

/** Formats a rupee amount: "₹1,097" (no decimals when the value is whole, otherwise 2 decimals). */
fun ayRupees(value: Double): String =
    if (value % 1.0 == 0.0) "₹" + String.format("%,d", value.toLong()) else "₹" + String.format("%,.2f", value)

/** Percentage discount between a selling price and its MRP, or 0 when there is none. */
fun ayDiscountPct(price: Double, original: Double?): Int =
    if (original != null && original > price && original > 0.0) ((original - price) / original * 100).toInt() else 0

/** Compact quantity stepper (− 1 +) used on Cart items and the product page. */
@Composable
fun AyStepper(
    quantity: Int,
    onMinus: () -> Unit,
    onPlus: () -> Unit,
    modifier: Modifier = Modifier,
    buttonSize: Dp = 28.dp
) {
    val c = AyTheme.colors
    val shape = RoundedCornerShape(10.dp)
    Row(
        modifier
            .clip(shape)
            .background(c.cardLow, shape)
            .border(1.dp, c.border.copy(alpha = if (c.isDark) 0.5f else 0.9f), shape)
            .padding(2.dp),
        verticalAlignment = Alignment.CenterVertically
    ) {
        AyStepButton(Icons.Filled.Remove, "Decrease quantity", onMinus, buttonSize)
        Text(
            quantity.toString(),
            Modifier.widthIn(min = 28.dp).padding(horizontal = 6.dp),
            fontFamily = NotoSerif, fontWeight = FontWeight.Bold, fontSize = 15.sp,
            color = c.text, textAlign = TextAlign.Center, maxLines = 1
        )
        AyStepButton(Icons.Filled.Add, "Increase quantity", onPlus, buttonSize)
    }
}

@Composable
private fun AyStepButton(icon: ImageVector, description: String, onClick: () -> Unit, size: Dp) {
    val c = AyTheme.colors
    Box(
        Modifier
            .size(size)
            .clip(RoundedCornerShape(8.dp))
            .background(c.card)
            .clickable(onClick = onClick),
        contentAlignment = Alignment.Center
    ) {
        Icon(icon, description, Modifier.size(16.dp), tint = if (c.isDark) c.accent else c.heading)
    }
}

/**
 * Sticky bottom action tray (shadow in light mode, gold hairline in dark mode).
 * Pass `navPadding = false` when the screen already sits above a navigation bar.
 */
@Composable
fun AyStickyBar(
    modifier: Modifier = Modifier,
    navPadding: Boolean = true,
    color: Color = AyTheme.colors.bar,
    content: @Composable ColumnScope.() -> Unit
) {
    val c = AyTheme.colors
    Column(
        modifier
            .fillMaxWidth()
            .background(color)
    ) {
        HorizontalDivider(
            color = if (c.isDark) c.border.copy(alpha = 0.35f) else Color(0x1F000000),
            thickness = 1.dp
        )
        Column(
            Modifier
                .fillMaxWidth()
                .then(if (navPadding) Modifier.navigationBarsPadding() else Modifier)
                .padding(horizontal = 20.dp, vertical = 12.dp),
            content = content
        )
    }
}

/** Centered illustration + title + message (+ optional action) for empty / error states. */
@Composable
fun AyMessagePanel(
    icon: ImageVector,
    title: String,
    message: String,
    modifier: Modifier = Modifier,
    actionText: String? = null,
    onAction: () -> Unit = {}
) {
    val c = AyTheme.colors
    Column(
        modifier.fillMaxSize().padding(horizontal = 32.dp),
        verticalArrangement = Arrangement.Center,
        horizontalAlignment = Alignment.CenterHorizontally
    ) {
        Box(
            Modifier.size(96.dp).background(c.chip, CircleShape).border(1.dp, c.border, CircleShape),
            contentAlignment = Alignment.Center
        ) {
            Icon(icon, null, Modifier.size(44.dp), tint = c.accent)
        }
        Spacer(Modifier.height(24.dp))
        Text(
            title, fontFamily = NotoSerif, fontWeight = FontWeight.Bold, fontSize = 22.sp,
            color = c.heading, textAlign = TextAlign.Center
        )
        Spacer(Modifier.height(8.dp))
        Text(
            message, fontFamily = PlusJakartaSans, fontSize = 14.sp, lineHeight = 21.sp,
            color = c.textSub, textAlign = TextAlign.Center
        )
        if (actionText != null) {
            Spacer(Modifier.height(28.dp))
            AyPrimaryButton(actionText, onAction)
        }
    }
}
