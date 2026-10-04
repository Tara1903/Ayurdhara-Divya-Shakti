package com.ayurdhara.core.designsystem.components

import androidx.compose.foundation.background
import androidx.compose.foundation.border
import androidx.compose.foundation.clickable
import androidx.compose.foundation.layout.*
import androidx.compose.foundation.shape.CircleShape
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.automirrored.filled.KeyboardArrowRight
import androidx.compose.material.icons.filled.Notifications
import androidx.compose.material3.CircularProgressIndicator
import androidx.compose.material3.Icon
import androidx.compose.material3.Switch
import androidx.compose.material3.SwitchColors
import androidx.compose.material3.SwitchDefaults
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.draw.clip
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.graphics.vector.ImageVector
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.text.style.TextAlign
import androidx.compose.ui.text.style.TextOverflow
import androidx.compose.ui.unit.Dp
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import com.ayurdhara.core.designsystem.theme.AyTheme
import com.ayurdhara.core.designsystem.theme.NotoSerif
import com.ayurdhara.core.designsystem.theme.PlusJakartaSans

/** Avatar with initials inside a gold ring. */
@Composable
fun AyAvatarRing(initials: String, modifier: Modifier = Modifier, size: Dp = 96.dp) {
    val c = AyTheme.colors
    Box(
        modifier
            .size(size)
            .border(2.5.dp, if (c.isDark) c.accent else c.goldFill, CircleShape)
            .padding(5.dp)
            .clip(CircleShape)
            .background(if (c.isDark) c.chipHigh else c.heading, CircleShape),
        contentAlignment = Alignment.Center
    ) {
        Text(
            initials.take(2).uppercase().ifBlank { "?" },
            fontFamily = NotoSerif, fontWeight = FontWeight.Bold, fontSize = (size.value * 0.34f).sp,
            color = if (c.isDark) c.accent else c.goldFill
        )
    }
}

/** Small gold uppercase label that introduces a group of rows/cards. */
@Composable
fun AyGroupLabel(text: String, modifier: Modifier = Modifier) {
    Text(
        text.uppercase(), modifier.padding(start = 4.dp, bottom = 8.dp),
        fontFamily = PlusJakartaSans, fontWeight = FontWeight.Bold, fontSize = 11.sp,
        letterSpacing = 1.6.sp, color = AyTheme.colors.accent
    )
}

/** Card row with a tinted icon tile, title, optional subtitle and a trailing chevron (or custom trailing). */
@Composable
fun AyMenuRow(
    icon: ImageVector,
    title: String,
    modifier: Modifier = Modifier,
    subtitle: String? = null,
    onClick: (() -> Unit)? = null,
    destructive: Boolean = false,
    trailing: (@Composable () -> Unit)? = null
) {
    val c = AyTheme.colors
    val tint = if (destructive) c.error else (if (c.isDark) c.accent else c.heading)
    val tile = if (destructive) c.error.copy(alpha = 0.12f) else (if (c.isDark) c.chipHigh else c.goldFill.copy(alpha = 0.45f))
    Row(
        modifier
            .fillMaxWidth()
            .ayCard(RoundedCornerShape(16.dp))
            .then(if (onClick != null) Modifier.clickable(onClick = onClick) else Modifier)
            .padding(horizontal = 14.dp, vertical = 12.dp),
        verticalAlignment = Alignment.CenterVertically
    ) {
        Box(Modifier.size(42.dp).background(tile, RoundedCornerShape(12.dp)), contentAlignment = Alignment.Center) {
            Icon(icon, null, tint = tint, modifier = Modifier.size(22.dp))
        }
        Spacer(Modifier.width(14.dp))
        Column(Modifier.weight(1f)) {
            Text(
                title, fontFamily = PlusJakartaSans, fontWeight = FontWeight.SemiBold, fontSize = 15.sp,
                color = if (destructive) c.error else c.text, maxLines = 1, overflow = TextOverflow.Ellipsis
            )
            if (subtitle != null) {
                Text(subtitle, fontFamily = PlusJakartaSans, fontSize = 12.sp, lineHeight = 17.sp, color = c.textMuted)
            }
        }
        if (trailing != null) trailing()
        else if (onClick != null) Icon(Icons.AutoMirrored.Filled.KeyboardArrowRight, null, tint = c.textMuted)
    }
}

@Composable
fun aySwitchColors(): SwitchColors {
    val c = AyTheme.colors
    return SwitchDefaults.colors(
        checkedThumbColor = c.onGoldFill,
        checkedTrackColor = if (c.isDark) c.goldFill else c.heading,
        checkedBorderColor = Color.Transparent,
        uncheckedThumbColor = c.textMuted,
        uncheckedTrackColor = c.chipHigh,
        uncheckedBorderColor = c.outline
    )
}

/** Card row with title/description and a themed switch. */
@Composable
fun AySwitchRow(
    title: String,
    description: String,
    checked: Boolean,
    onCheckedChange: (Boolean) -> Unit,
    modifier: Modifier = Modifier,
    icon: ImageVector? = null
) {
    AyMenuRow(
        icon = icon ?: Icons.Filled.Notifications,
        title = title, subtitle = description, modifier = modifier,
        trailing = { Switch(checked = checked, onCheckedChange = onCheckedChange, colors = aySwitchColors()) }
    )
}

@Composable
fun AyLoading(modifier: Modifier = Modifier) {
    Box(modifier.fillMaxSize(), contentAlignment = Alignment.Center) {
        CircularProgressIndicator(color = AyTheme.colors.accent)
    }
}

/** Centered empty state: gold icon medallion, serif title, supporting text and optional gold button. */
@Composable
fun AyEmptyPanel(
    icon: ImageVector,
    title: String,
    message: String,
    modifier: Modifier = Modifier,
    actionText: String? = null,
    onAction: () -> Unit = {}
) {
    val c = AyTheme.colors
    Column(
        modifier.fillMaxSize().padding(32.dp),
        horizontalAlignment = Alignment.CenterHorizontally,
        verticalArrangement = Arrangement.Center
    ) {
        Box(
            Modifier.size(104.dp).background(if (c.isDark) c.chipHigh else c.goldFill.copy(alpha = 0.4f), CircleShape),
            contentAlignment = Alignment.Center
        ) { Icon(icon, null, tint = if (c.isDark) c.accent else c.heading, modifier = Modifier.size(46.dp)) }
        Spacer(Modifier.height(24.dp))
        Text(title, fontFamily = NotoSerif, fontWeight = FontWeight.Bold, fontSize = 22.sp, color = c.heading, textAlign = TextAlign.Center)
        Spacer(Modifier.height(8.dp))
        Text(message, fontFamily = PlusJakartaSans, fontSize = 14.sp, lineHeight = 21.sp, color = c.textSub, textAlign = TextAlign.Center)
        if (actionText != null) {
            Spacer(Modifier.height(24.dp))
            AyGoldButton(actionText, onAction, height = 48.dp)
        }
    }
}

/** Centered error message with retry button. */
@Composable
fun AyErrorPanel(message: String, onRetry: () -> Unit, modifier: Modifier = Modifier) {
    val c = AyTheme.colors
    Column(
        modifier.fillMaxSize().padding(32.dp),
        horizontalAlignment = Alignment.CenterHorizontally,
        verticalArrangement = Arrangement.Center
    ) {
        Text(message, fontFamily = PlusJakartaSans, fontSize = 14.sp, color = c.error, textAlign = TextAlign.Center)
        Spacer(Modifier.height(16.dp))
        AyPrimaryButton("Retry", onRetry, height = 46.dp)
    }
}
