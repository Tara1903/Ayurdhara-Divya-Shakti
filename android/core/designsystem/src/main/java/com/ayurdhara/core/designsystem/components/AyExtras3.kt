package com.ayurdhara.core.designsystem.components

import android.app.Activity
import android.content.Context
import android.content.ContextWrapper
import android.widget.Toast
import androidx.compose.foundation.background
import androidx.compose.foundation.border
import androidx.compose.foundation.clickable
import androidx.compose.foundation.interaction.MutableInteractionSource
import androidx.compose.foundation.layout.*
import androidx.compose.foundation.rememberScrollState
import androidx.compose.foundation.shape.CircleShape
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.foundation.text.BasicTextField
import androidx.compose.foundation.text.KeyboardOptions
import androidx.compose.foundation.verticalScroll
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.automirrored.filled.ArrowBack
import androidx.compose.material.icons.filled.ErrorOutline
import androidx.compose.material.icons.filled.VerifiedUser
import androidx.compose.material3.CircularProgressIndicator
import androidx.compose.material3.Button
import androidx.compose.material3.ButtonDefaults
import androidx.compose.material3.HorizontalDivider
import androidx.compose.material3.Icon
import androidx.compose.material3.OutlinedTextField
import androidx.compose.material3.OutlinedTextFieldDefaults
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.runtime.LaunchedEffect
import androidx.compose.runtime.getValue
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.remember
import androidx.compose.runtime.setValue
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.draw.clip
import androidx.compose.ui.draw.drawBehind
import androidx.compose.ui.focus.FocusRequester
import androidx.compose.ui.focus.focusRequester
import androidx.compose.ui.focus.onFocusChanged
import androidx.compose.ui.geometry.Offset
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.graphics.SolidColor
import androidx.compose.ui.graphics.drawscope.Stroke
import androidx.compose.ui.graphics.vector.ImageVector
import androidx.compose.ui.platform.LocalContext
import androidx.compose.ui.text.SpanStyle
import androidx.compose.ui.text.buildAnnotatedString
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.text.input.KeyboardType
import androidx.compose.ui.text.input.VisualTransformation
import androidx.compose.ui.text.style.TextAlign
import androidx.compose.ui.text.style.TextDecoration
import androidx.compose.ui.text.withStyle
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import com.ayurdhara.core.designsystem.theme.AyTheme
import com.ayurdhara.core.designsystem.theme.NotoSerif
import com.ayurdhara.core.designsystem.theme.PlusJakartaSans

// ───────────────────────── Auth scaffold & chrome ─────────────────────────

/**
 * Stitch auth screen frame: canvas + faint mandala rings, header (optional back arrow, logo, serif title)
 * and a scrollable, keyboard-aware content column with 20dp margins.
 */
@Composable
fun AyAuthScaffold(
    title: String,
    onBack: (() -> Unit)?,
    modifier: Modifier = Modifier,
    content: @Composable ColumnScope.() -> Unit
) {
    val c = AyTheme.colors
    Box(
        modifier
            .fillMaxSize()
            .background(c.canvas)
    ) {
        Column(
            Modifier
                .fillMaxSize()
                .statusBarsPadding()
                .navigationBarsPadding()
        ) {
            Row(
                Modifier
                    .fillMaxWidth()
                    .height(56.dp)
                    .padding(horizontal = 8.dp),
                verticalAlignment = Alignment.CenterVertically
            ) {
                if (onBack != null) {
                    AyIconButton(Icons.AutoMirrored.Filled.ArrowBack, "Back", onBack)
                } else {
                    Spacer(Modifier.width(8.dp))
                }
                if (title.isNotBlank()) {
                    AyLogoMark(26.dp)
                    Spacer(Modifier.width(10.dp))
                    Text(title, fontFamily = NotoSerif, fontWeight = FontWeight.SemiBold, fontSize = 19.sp, color = c.heading, maxLines = 1)
                }
            }
            Column(
                Modifier
                    .weight(1f)
                    .fillMaxWidth()
                    .imePadding()
                    .verticalScroll(rememberScrollState())
                    .padding(horizontal = 20.dp)
                    .padding(bottom = 32.dp),
                content = content
            )
        }
    }
}

/** "● STEP 1 OF 2" pill with segmented progress bars on the right. */
@Composable
fun AyAuthStepPill(step: Int, total: Int, modifier: Modifier = Modifier) {
    val c = AyTheme.colors
    Row(modifier.fillMaxWidth(), horizontalArrangement = Arrangement.SpaceBetween, verticalAlignment = Alignment.CenterVertically) {
        Row(
            Modifier.background(c.goldFill.copy(alpha = if (c.isDark) 0.18f else 0.45f), RoundedCornerShape(50)).padding(horizontal = 12.dp, vertical = 5.dp),
            verticalAlignment = Alignment.CenterVertically
        ) {
            Box(Modifier.size(6.dp).background(c.accent, CircleShape))
            Spacer(Modifier.width(6.dp))
            Text("STEP $step OF $total", fontFamily = PlusJakartaSans, fontWeight = FontWeight.Bold, fontSize = 11.sp, letterSpacing = 1.5.sp, color = c.accent)
        }
        Row(horizontalArrangement = Arrangement.spacedBy(4.dp), verticalAlignment = Alignment.CenterVertically) {
            for (i in 1..total) {
                val done = i <= step
                Box(
                    Modifier
                        .height(6.dp)
                        .width(if (done) 32.dp else 16.dp)
                        .background(if (done) (if (c.isDark) c.accent else c.heading) else c.chipHigh, RoundedCornerShape(50))
                )
            }
        }
    }
}

/** Centred logo with soft gold glow and a "SACRED VEDIC WELLNESS" caption. */
@Composable
fun AyAuthBrandHeader(modifier: Modifier = Modifier, caption: String = "SACRED VEDIC WELLNESS") {
    val c = AyTheme.colors
    Column(modifier.fillMaxWidth(), horizontalAlignment = Alignment.CenterHorizontally) {
        Box(contentAlignment = Alignment.Center) {
            Box(Modifier.size(72.dp).background(c.goldFill.copy(alpha = if (c.isDark) 0.14f else 0.35f), CircleShape))
            AyLogoMark(46.dp)
        }
        Spacer(Modifier.height(8.dp))
        Text(
            caption,
            fontFamily = PlusJakartaSans,
            fontWeight = FontWeight.SemiBold,
            fontSize = 11.sp,
            letterSpacing = 2.sp,
            color = if (c.isDark) c.accent else Color(0xFF8A6D1B)
        )
    }
}

/** Big serif headline + muted subtitle. */
@Composable
fun AyAuthTitle(title: String, subtitle: String, modifier: Modifier = Modifier) {
    val c = AyTheme.colors
    Column(modifier.fillMaxWidth()) {
        Text(title, fontFamily = NotoSerif, fontWeight = FontWeight.Bold, fontSize = 28.sp, lineHeight = 36.sp, color = c.heading)
        Spacer(Modifier.height(6.dp))
        Text(subtitle, fontFamily = PlusJakartaSans, fontSize = 14.sp, lineHeight = 20.sp, color = if (c.isDark) c.textSub else Color(0xFF4A554E))
    }
}

// ───────────────────────── Fields & buttons ─────────────────────────

/** Rounded card-style field with a small caps label above, matching the Stitch auth inputs. */
@Composable
fun AyAuthField(
    value: String,
    onValueChange: (String) -> Unit,
    label: String,
    modifier: Modifier = Modifier,
    placeholder: String? = null,
    leadingIcon: ImageVector? = null,
    trailing: (@Composable () -> Unit)? = null,
    keyboardOptions: KeyboardOptions = KeyboardOptions.Default,
    visualTransformation: VisualTransformation = VisualTransformation.None,
    isError: Boolean = false,
    errorText: String? = null
) {
    val c = AyTheme.colors
    val shape = RoundedCornerShape(16.dp)
    Column(modifier.fillMaxWidth()) {
        Text(
            label.uppercase(),
            fontFamily = PlusJakartaSans,
            fontWeight = FontWeight.Bold,
            fontSize = 11.5.sp,
            letterSpacing = 1.sp,
            color = if (c.isDark) c.textSub else Color(0xFF2C3E35)
        )
        Spacer(Modifier.height(6.dp))
        OutlinedTextField(
            value = value,
            onValueChange = onValueChange,
            modifier = Modifier
                .fillMaxWidth()
                .ayCard(shape, elevation = 1.dp),
            placeholder = placeholder?.let { { Text(it, fontFamily = PlusJakartaSans, color = if (c.isDark) c.textMuted else Color(0xFF8A938D)) } },
            leadingIcon = leadingIcon?.let { { Icon(it, null) } },
            trailingIcon = trailing,
            singleLine = true,
            isError = isError,
            keyboardOptions = keyboardOptions,
            visualTransformation = visualTransformation,
            shape = shape,
            colors = OutlinedTextFieldDefaults.colors(
                focusedBorderColor = if (c.isDark) c.accent else Color(0xFF1B4332),
                unfocusedBorderColor = if (c.isDark) c.border.copy(alpha = 0.4f) else Color(0xFFDED8CE),
                errorBorderColor = c.error,
                focusedTextColor = c.text,
                unfocusedTextColor = c.text,
                errorTextColor = c.text,
                cursorColor = if (c.isDark) c.accent else Color(0xFF1B4332),
                focusedContainerColor = c.card,
                unfocusedContainerColor = c.card,
                errorContainerColor = c.card,
                focusedLeadingIconColor = if (c.isDark) c.accent else Color(0xFF1B4332),
                unfocusedLeadingIconColor = if (c.isDark) c.textSub else Color(0xFF5A6860),
                errorLeadingIconColor = c.error,
                focusedTrailingIconColor = if (c.isDark) c.accent else Color(0xFF1B4332),
                unfocusedTrailingIconColor = if (c.isDark) c.textSub else Color(0xFF5A6860)
            )
        )
        if (errorText != null) {
            Spacer(Modifier.height(4.dp))
            Text(errorText, fontFamily = PlusJakartaSans, fontSize = 12.sp, color = c.error, modifier = Modifier.padding(start = 4.dp))
        }
    }
}

/** Full-width CTA (56dp, rounded-2xl) with an inline loading spinner. */
@Composable
fun AyAuthButton(
    text: String,
    onClick: () -> Unit,
    modifier: Modifier = Modifier,
    enabled: Boolean = true,
    loading: Boolean = false,
    trailingIcon: ImageVector? = null,
    gold: Boolean = false
) {
    val c = AyTheme.colors
    val bg = if (gold) c.goldFill else c.primaryBtn
    val fg = if (gold) c.onGoldFill else c.onPrimaryBtn
    Button(
        onClick = onClick,
        enabled = enabled && !loading,
        modifier = modifier.fillMaxWidth().height(54.dp),
        shape = RoundedCornerShape(16.dp),
        colors = ButtonDefaults.buttonColors(
            containerColor = bg, contentColor = fg,
            disabledContainerColor = if (loading) bg.copy(alpha = 0.85f) else (if (c.isDark) Color(0xFF162D24) else Color(0xFFE2E8E4)),
            disabledContentColor = if (loading) fg else (if (c.isDark) Color(0xFF637D71) else Color(0xFF7A8F83))
        ),
        elevation = ButtonDefaults.buttonElevation(defaultElevation = if (enabled) 3.dp else 0.dp, pressedElevation = 1.dp, disabledElevation = 0.dp)
    ) {
        if (loading) {
            CircularProgressIndicator(Modifier.size(22.dp), color = fg, strokeWidth = 2.5.dp)
        } else {
            Text(text, fontFamily = PlusJakartaSans, fontWeight = FontWeight.Bold, fontSize = 16.sp, maxLines = 1)
            if (trailingIcon != null) { Spacer(Modifier.width(8.dp)); Icon(trailingIcon, null, Modifier.size(20.dp)) }
        }
    }
}

/** Soft error banner used under the CTA on auth screens. */
@Composable
fun AyAuthError(message: String, modifier: Modifier = Modifier) {
    val c = AyTheme.colors
    Row(
        modifier
            .fillMaxWidth()
            .background(c.error.copy(alpha = 0.12f), RoundedCornerShape(12.dp))
            .border(1.dp, c.error.copy(alpha = 0.35f), RoundedCornerShape(12.dp))
            .padding(12.dp),
        verticalAlignment = Alignment.CenterVertically
    ) {
        Icon(Icons.Filled.ErrorOutline, null, tint = c.error, modifier = Modifier.size(20.dp))
        Spacer(Modifier.width(8.dp))
        Text(message, fontFamily = PlusJakartaSans, fontWeight = FontWeight.Medium, fontSize = 13.sp, color = c.error)
    }
}

/** "──── OR CONTINUE WITH ────" */
@Composable
fun AyAuthOrDivider(modifier: Modifier = Modifier, label: String = "Or continue with") {
    val c = AyTheme.colors
    Row(modifier.fillMaxWidth(), verticalAlignment = Alignment.CenterVertically) {
        HorizontalDivider(Modifier.weight(1f), color = if (c.isDark) c.border.copy(alpha = 0.35f) else Color(0xFFDED8CE))
        Text(
            label.uppercase(), Modifier.padding(horizontal = 12.dp),
            fontFamily = PlusJakartaSans, fontWeight = FontWeight.SemiBold, fontSize = 11.sp, letterSpacing = 1.5.sp, color = if (c.isDark) c.textSub else Color(0xFF5A6860)
        )
        HorizontalDivider(Modifier.weight(1f), color = if (c.isDark) c.border.copy(alpha = 0.35f) else Color(0xFFDED8CE))
    }
}

/** White pill "Continue with Google" button (UI only). */
@Composable
fun AyGoogleButton(onClick: () -> Unit, modifier: Modifier = Modifier) {
    val c = AyTheme.colors
    val shape = RoundedCornerShape(16.dp)
    Row(
        modifier
            .fillMaxWidth()
            .height(52.dp)
            .background(if (c.isDark) c.card else Color.White, shape)
            .border(1.dp, if (c.isDark) c.border.copy(alpha = 0.4f) else Color(0xFFDED8CE), shape)
            .clip(shape)
            .clickable(onClick = onClick),
        horizontalArrangement = Arrangement.Center,
        verticalAlignment = Alignment.CenterVertically
    ) {
        Box(Modifier.size(24.dp).background(Color.White, CircleShape), contentAlignment = Alignment.Center) {
            Text("G", fontFamily = PlusJakartaSans, fontWeight = FontWeight.ExtraBold, fontSize = 15.sp, color = Color(0xFF4285F4))
        }
        Spacer(Modifier.width(12.dp))
        Text("Continue with Google", fontFamily = PlusJakartaSans, fontWeight = FontWeight.SemiBold, fontSize = 15.sp, color = if (c.isDark) c.text else Color(0xFF1F2922))
    }
}

/** "PRAKRITI VAULT PROTECTION" assurance micro-card. */
@Composable
fun AyAuthAssuranceCard(
    modifier: Modifier = Modifier,
    title: String = "Prakriti Vault Protection",
    subtitle: String = "Ayurvedic records encrypted with 256-bit security"
) {
    val c = AyTheme.colors
    Row(
        modifier
            .fillMaxWidth()
            .background(c.cardLow, RoundedCornerShape(12.dp))
            .then(if (c.isDark) Modifier.border(1.dp, c.border.copy(alpha = 0.5f), RoundedCornerShape(12.dp)) else Modifier)
            .padding(12.dp),
        verticalAlignment = Alignment.CenterVertically
    ) {
        Box(Modifier.size(32.dp).background(c.goldFill.copy(alpha = if (c.isDark) 0.2f else 0.5f), CircleShape), contentAlignment = Alignment.Center) {
            Icon(Icons.Filled.VerifiedUser, null, tint = c.accent, modifier = Modifier.size(18.dp))
        }
        Spacer(Modifier.width(12.dp))
        Column(Modifier.weight(1f)) {
            Text(title.uppercase(), fontFamily = PlusJakartaSans, fontWeight = FontWeight.SemiBold, fontSize = 11.sp, letterSpacing = 0.8.sp, color = c.heading)
            Text(subtitle, fontFamily = PlusJakartaSans, fontSize = 12.sp, color = c.textSub)
        }
    }
}

/** "By continuing, you agree to our Terms of Service & Privacy Policy" footer. */
@Composable
fun AyAuthTerms(modifier: Modifier = Modifier) {
    val c = AyTheme.colors
    val link = SpanStyle(fontWeight = FontWeight.SemiBold, color = c.heading, textDecoration = TextDecoration.Underline)
    Text(
        buildAnnotatedString {
            append("By continuing, you agree to our ")
            withStyle(link) { append("Terms of Service") }
            append(" & ")
            withStyle(link) { append("Privacy Policy") }
        },
        modifier.fillMaxWidth().padding(horizontal = 8.dp),
        fontFamily = PlusJakartaSans, fontSize = 12.sp, lineHeight = 18.sp, color = c.textMuted, textAlign = TextAlign.Center
    )
}

// ───────────────────────── OTP ─────────────────────────

/**
 * 6-cell OTP entry. A hidden [BasicTextField] owns the input; cells are drawn from [value]
 * (filled = soft card + serif digit, active = outlined with dot, empty = chip with dot).
 */
@Composable
fun AyOtpField(
    value: String,
    onValueChange: (String) -> Unit,
    modifier: Modifier = Modifier,
    length: Int = 6,
    isError: Boolean = false,
    autoFocus: Boolean = true
) {
    val c = AyTheme.colors
    val focusRequester = remember { FocusRequester() }
    var focused by remember { mutableStateOf(false) }
    val cellShape = RoundedCornerShape(16.dp)
    LaunchedEffect(autoFocus) { if (autoFocus) runCatching { focusRequester.requestFocus() } }
    BasicTextField(
        value = value,
        onValueChange = { v -> onValueChange(v.filter { it.isDigit() }.take(length)) },
        modifier = modifier.focusRequester(focusRequester).onFocusChanged { focused = it.isFocused },
        keyboardOptions = KeyboardOptions(keyboardType = KeyboardType.Number),
        singleLine = true,
        cursorBrush = SolidColor(Color.Transparent),
        decorationBox = {
            Row(
                Modifier
                    .fillMaxWidth()
                    .clickable(interactionSource = remember { MutableInteractionSource() }, indication = null) {
                        runCatching { focusRequester.requestFocus() }
                    },
                horizontalArrangement = Arrangement.spacedBy(8.dp)
            ) {
                for (i in 0 until length) {
                    val char = value.getOrNull(i)
                    val active = focused && i == value.length.coerceAtMost(length - 1)
                    val base = Modifier.weight(1f).height(56.dp)
                    val cell = when {
                        isError -> base.background(c.error.copy(alpha = 0.08f), cellShape).border(1.5.dp, c.error, cellShape)
                        active -> base.background(c.card, cellShape).border(1.5.dp, c.accent, cellShape)
                        char != null -> base.background(c.cardLow, cellShape).then(
                            if (c.isDark) Modifier.border(1.dp, c.border.copy(alpha = 0.5f), cellShape) else Modifier
                        )
                        else -> base.background(c.chip, cellShape)
                    }
                    Box(cell, contentAlignment = Alignment.Center) {
                        if (char != null) {
                            Column(horizontalAlignment = Alignment.CenterHorizontally) {
                                Text(char.toString(), fontFamily = NotoSerif, fontWeight = FontWeight.Bold, fontSize = 24.sp, color = c.heading)
                                Box(Modifier.width(10.dp).height(2.dp).background(c.accent.copy(alpha = 0.7f), RoundedCornerShape(50)))
                            }
                        } else if (active) {
                            Box(Modifier.size(8.dp).background(c.accent, CircleShape))
                        } else {
                            Box(Modifier.size(6.dp).background(c.textMuted.copy(alpha = 0.5f), CircleShape))
                        }
                    }
                }
            }
        }
    )
}

// ───────────────────────── Helpers ─────────────────────────

/** Returns a lambda that shows a short "Coming soon" toast (or any [message]). */
@Composable
fun rememberAyComingSoon(message: String = "Coming soon"): () -> Unit {
    val ctx = LocalContext.current
    return remember(ctx, message) { { Toast.makeText(ctx, message, Toast.LENGTH_SHORT).show() } }
}

/** Returns a lambda that triggers the host Activity's back press (for screens without a nav callback). */
@Composable
fun rememberAyBack(): () -> Unit {
    val ctx = LocalContext.current
    return remember(ctx) { { ctx.pressAyBack() } }
}

@Suppress("DEPRECATION")
private fun Context.pressAyBack() {
    findAyActivity()?.onBackPressed()
}

private fun Context.findAyActivity(): Activity? {
    var c: Context? = this
    while (c is ContextWrapper) {
        if (c is Activity) return c
        c = c.baseContext
    }
    return null
}
