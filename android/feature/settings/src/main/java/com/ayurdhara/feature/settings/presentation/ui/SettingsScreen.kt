package com.ayurdhara.feature.settings.presentation.ui

import android.widget.Toast
import androidx.compose.foundation.background
import androidx.compose.foundation.border
import androidx.compose.foundation.clickable
import androidx.compose.foundation.layout.*
import androidx.compose.foundation.lazy.LazyColumn
import androidx.compose.foundation.shape.CircleShape
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.automirrored.filled.ArrowForward
import androidx.compose.material.icons.automirrored.filled.KeyboardArrowRight
import androidx.compose.material.icons.automirrored.filled.Logout
import androidx.compose.material.icons.filled.BrightnessAuto
import androidx.compose.material.icons.filled.CleaningServices
import androidx.compose.material.icons.filled.CurrencyRupee
import androidx.compose.material.icons.filled.DarkMode
import androidx.compose.material.icons.filled.Description
import androidx.compose.material.icons.filled.Fingerprint
import androidx.compose.material.icons.filled.LightMode
import androidx.compose.material.icons.filled.LocalOffer
import androidx.compose.material.icons.filled.LocalShipping
import androidx.compose.material.icons.filled.LocationOn
import androidx.compose.material.icons.filled.Notifications
import androidx.compose.material.icons.filled.Person
import androidx.compose.material.icons.filled.Security
import androidx.compose.material.icons.filled.Spa
import androidx.compose.material.icons.filled.StarRate
import androidx.compose.material.icons.filled.SupportAgent
import androidx.compose.material.icons.filled.Translate
import androidx.compose.material3.*
import androidx.compose.runtime.*
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.draw.clip
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.graphics.vector.ImageVector
import androidx.compose.ui.platform.LocalContext
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.text.style.TextAlign
import androidx.compose.ui.text.style.TextOverflow
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import androidx.hilt.navigation.compose.hiltViewModel
import com.ayurdhara.core.designsystem.components.AyAvatarRing
import com.ayurdhara.core.designsystem.components.AyBackBar
import com.ayurdhara.core.designsystem.components.AyGroupLabel
import com.ayurdhara.core.designsystem.components.AyHeroBrush
import com.ayurdhara.core.designsystem.components.AyLogoMark
import com.ayurdhara.core.designsystem.components.AyMenuRow
import com.ayurdhara.core.designsystem.components.AySwitchRow
import com.ayurdhara.core.designsystem.components.ayCard
import com.ayurdhara.core.designsystem.theme.AyTheme
import com.ayurdhara.core.designsystem.theme.NotoSerif
import com.ayurdhara.core.designsystem.theme.PlusJakartaSans
import com.ayurdhara.core.designsystem.utils.rememberAyurdharaHapticFeedback
import com.ayurdhara.feature.settings.presentation.viewmodel.SettingsViewModel

@Composable
fun SettingsScreen(
    onNavigateToProfile: () -> Unit = {},
    onNavigateToOrders: () -> Unit = {},
    onLogout: () -> Unit = {},
    onBackClick: (() -> Unit)? = null,
    viewModel: SettingsViewModel = hiltViewModel()
) {
    val context = LocalContext.current
    val haptic = rememberAyurdharaHapticFeedback()
    val c = AyTheme.colors

    val themeMode by viewModel.themeMode.collectAsState()
    val notificationsEnabled by viewModel.notificationsEnabled.collectAsState()
    val orderNotifsEnabled by viewModel.orderNotifsEnabled.collectAsState()
    val promoNotifsEnabled by viewModel.promoNotifsEnabled.collectAsState()
    val ayurvedaTipsEnabled by viewModel.ayurvedaTipsEnabled.collectAsState()
    val appLanguage by viewModel.appLanguage.collectAsState()
    val biometricLockEnabled by viewModel.biometricLockEnabled.collectAsState()
    val userName by viewModel.userName.collectAsState()

    var showLanguageDialog by remember { mutableStateOf(false) }
    var showLogoutDialog by remember { mutableStateOf(false) }
    var cacheClearedMessage by remember { mutableStateOf<String?>(null) }

    if (showLanguageDialog) {
        AlertDialog(
            onDismissRequest = { showLanguageDialog = false },
            title = {
                Text(
                    "Select App Language",
                    fontFamily = NotoSerif,
                    fontWeight = FontWeight.Bold,
                    fontSize = 18.sp,
                    color = c.heading
                )
            },
            text = {
                Column(verticalArrangement = Arrangement.spacedBy(8.dp)) {
                    listOf("English", "हिन्दी (Hindi)").forEach { lang ->
                        val selected = appLanguage.startsWith(lang.take(2)) || appLanguage == lang
                        Row(
                            Modifier
                                .fillMaxWidth()
                                .clip(RoundedCornerShape(12.dp))
                                .clickable {
                                    haptic.selection()
                                    viewModel.setAppLanguage(lang)
                                    showLanguageDialog = false
                                    Toast.makeText(context, "Language set to $lang", Toast.LENGTH_SHORT).show()
                                }
                                .background(if (selected) c.goldFill.copy(alpha = 0.35f) else Color.Transparent)
                                .padding(horizontal = 14.dp, vertical = 12.dp),
                            verticalAlignment = Alignment.CenterVertically
                        ) {
                            RadioButton(
                                selected = selected,
                                onClick = {
                                    haptic.selection()
                                    viewModel.setAppLanguage(lang)
                                    showLanguageDialog = false
                                    Toast.makeText(context, "Language set to $lang", Toast.LENGTH_SHORT).show()
                                },
                                colors = RadioButtonDefaults.colors(
                                    selectedColor = c.accent,
                                    unselectedColor = c.textMuted
                                )
                            )
                            Spacer(Modifier.width(8.dp))
                            Text(
                                lang,
                                fontFamily = PlusJakartaSans,
                                fontWeight = if (selected) FontWeight.Bold else FontWeight.Medium,
                                fontSize = 15.sp,
                                color = c.text
                            )
                        }
                    }
                }
            },
            confirmButton = {
                TextButton(onClick = { showLanguageDialog = false }) {
                    Text("Done", color = c.accent, fontWeight = FontWeight.Bold)
                }
            },
            containerColor = c.card,
            shape = RoundedCornerShape(20.dp)
        )
    }

    if (showLogoutDialog) {
        AlertDialog(
            onDismissRequest = { showLogoutDialog = false },
            title = {
                Text("Log Out", fontFamily = NotoSerif, fontWeight = FontWeight.Bold, color = c.heading)
            },
            text = {
                Text(
                    "Are you sure you want to sign out of your Ayurdhara account on this device?",
                    fontFamily = PlusJakartaSans,
                    fontSize = 14.sp,
                    color = c.textSub
                )
            },
            confirmButton = {
                TextButton(
                    onClick = {
                        showLogoutDialog = false
                        onLogout()
                    }
                ) {
                    Text("Log Out", color = c.error, fontWeight = FontWeight.Bold)
                }
            },
            dismissButton = {
                TextButton(onClick = { showLogoutDialog = false }) {
                    Text("Cancel", color = c.textMuted)
                }
            },
            containerColor = c.card,
            shape = RoundedCornerShape(20.dp)
        )
    }

    Column(Modifier.fillMaxSize().background(c.canvas)) {
        AyBackBar(title = "Settings", onBack = onBackClick)

        LazyColumn(
            modifier = Modifier.weight(1f).fillMaxWidth(),
            contentPadding = PaddingValues(start = 16.dp, end = 16.dp, top = 8.dp, bottom = 32.dp),
            verticalArrangement = Arrangement.spacedBy(16.dp)
        ) {
            // 1. Profile Account Card
            item {
                Row(
                    modifier = Modifier
                        .fillMaxWidth()
                        .clip(RoundedCornerShape(20.dp))
                        .background(AyHeroBrush(), RoundedCornerShape(20.dp))
                        .clickable {
                            haptic.selection()
                            onNavigateToProfile()
                        }
                        .padding(16.dp),
                    verticalAlignment = Alignment.CenterVertically
                ) {
                    Box(
                        Modifier
                            .size(52.dp)
                            .clip(CircleShape)
                            .background(c.goldFill.copy(alpha = 0.85f), CircleShape),
                        contentAlignment = Alignment.Center
                    ) {
                        Icon(
                            Icons.Filled.Person,
                            contentDescription = null,
                            tint = c.onGoldFill,
                            modifier = Modifier.size(30.dp)
                        )
                    }

                    Spacer(Modifier.width(14.dp))

                    Column(Modifier.weight(1f)) {
                        Text(
                            text = userName?.ifBlank { null } ?: "Ayurdhara Wellness",
                            fontFamily = NotoSerif,
                            fontWeight = FontWeight.Bold,
                            fontSize = 17.sp,
                            color = c.onHero,
                            maxLines = 1,
                            overflow = TextOverflow.Ellipsis
                        )
                        Spacer(Modifier.height(2.dp))
                        Text(
                            text = if (!userName.isNullOrBlank()) "Manage Profile & Orders" else "Tap to view account details",
                            fontFamily = PlusJakartaSans,
                            fontSize = 12.sp,
                            color = c.onHeroSub
                        )
                    }

                    Icon(
                        Icons.AutoMirrored.Filled.KeyboardArrowRight,
                        contentDescription = "Open Profile",
                        tint = c.onHeroSub,
                        modifier = Modifier.size(20.dp)
                    )
                }
            }

            // 2. Appearance & Theme Selection
            item {
                Column(verticalArrangement = Arrangement.spacedBy(8.dp)) {
                    AyGroupLabel("Appearance & Theme")

                    Row(
                        modifier = Modifier.fillMaxWidth(),
                        horizontalArrangement = Arrangement.spacedBy(10.dp)
                    ) {
                        ThemeOptionTile(
                            title = "System",
                            subtitle = "Auto",
                            icon = Icons.Filled.BrightnessAuto,
                            selected = themeMode == "SYSTEM",
                            onClick = {
                                haptic.selection()
                                viewModel.setThemeMode("SYSTEM")
                            },
                            modifier = Modifier.weight(1f)
                        )

                        ThemeOptionTile(
                            title = "Light",
                            subtitle = "Ivory",
                            icon = Icons.Filled.LightMode,
                            selected = themeMode == "LIGHT",
                            onClick = {
                                haptic.selection()
                                viewModel.setThemeMode("LIGHT")
                            },
                            modifier = Modifier.weight(1f)
                        )

                        ThemeOptionTile(
                            title = "Dark",
                            subtitle = "Midnight",
                            icon = Icons.Filled.DarkMode,
                            selected = themeMode == "DARK",
                            onClick = {
                                haptic.selection()
                                viewModel.setThemeMode("DARK")
                            },
                            modifier = Modifier.weight(1f)
                        )
                    }
                }
            }

            // 3. Notifications & Wellness Reminders
            item {
                Column(verticalArrangement = Arrangement.spacedBy(8.dp)) {
                    AyGroupLabel("Notifications & Alerts")

                    AySwitchRow(
                        title = "Push Notifications",
                        description = "Enable all notifications & order messages",
                        checked = notificationsEnabled,
                        onCheckedChange = {
                            haptic.selection()
                            viewModel.setNotificationsEnabled(it)
                        },
                        icon = Icons.Filled.Notifications
                    )

                    AySwitchRow(
                        title = "Order & Dispatch Updates",
                        description = "Live tracking of packages and delivery times",
                        checked = orderNotifsEnabled && notificationsEnabled,
                        onCheckedChange = {
                            haptic.selection()
                            viewModel.setOrderNotifsEnabled(it)
                        },
                        icon = Icons.Filled.LocalShipping
                    )

                    AySwitchRow(
                        title = "Ayurvedic Daily Rituals",
                        description = "Dinacharya morning, Pitta & Vata evening wellness tips",
                        checked = ayurvedaTipsEnabled && notificationsEnabled,
                        onCheckedChange = {
                            haptic.selection()
                            viewModel.setAyurvedaTipsEnabled(it)
                        },
                        icon = Icons.Filled.Spa
                    )

                    AySwitchRow(
                        title = "Exclusive Offers & Harvests",
                        description = "Subscriber discounts and seasonal herbal oils updates",
                        checked = promoNotifsEnabled && notificationsEnabled,
                        onCheckedChange = {
                            haptic.selection()
                            viewModel.setPromoNotifsEnabled(it)
                        },
                        icon = Icons.Filled.LocalOffer
                    )
                }
            }

            // 4. Regional & Preferences
            item {
                Column(verticalArrangement = Arrangement.spacedBy(8.dp)) {
                    AyGroupLabel("Preferences & Region")

                    AyMenuRow(
                        icon = Icons.Filled.Translate,
                        title = "App Language",
                        subtitle = appLanguage,
                        onClick = {
                            haptic.selection()
                            showLanguageDialog = true
                        }
                    )

                    AyMenuRow(
                        icon = Icons.Filled.CurrencyRupee,
                        title = "Default Currency",
                        subtitle = "INR (₹) Indian Rupee",
                        onClick = {
                            Toast.makeText(context, "Currency fixed to INR (₹)", Toast.LENGTH_SHORT).show()
                        }
                    )

                    AyMenuRow(
                        icon = Icons.Filled.LocationOn,
                        title = "Delivery Pincode",
                        subtitle = "Jaipur 302001, Rajasthan",
                        onClick = {
                            Toast.makeText(context, "Currently delivering to Jaipur 302001", Toast.LENGTH_SHORT).show()
                        }
                    )
                }
            }

            // 5. Security & Storage
            item {
                Column(verticalArrangement = Arrangement.spacedBy(8.dp)) {
                    AyGroupLabel("Security & Storage")

                    AySwitchRow(
                        title = "Biometric App Lock",
                        description = "Prompt Fingerprint or Face unlock on app launch",
                        checked = biometricLockEnabled,
                        onCheckedChange = {
                            haptic.selection()
                            viewModel.setBiometricLockEnabled(it)
                        },
                        icon = Icons.Filled.Fingerprint
                    )

                    AyMenuRow(
                        icon = Icons.Filled.CleaningServices,
                        title = "Clear Image Cache",
                        subtitle = cacheClearedMessage ?: "Free up temporary cache storage (~18 MB)",
                        onClick = {
                            haptic.selection()
                            cacheClearedMessage = "Cache cleared successfully (0 MB)"
                            Toast.makeText(context, "Temporary cache cleared!", Toast.LENGTH_SHORT).show()
                        }
                    )
                }
            }

            // 6. Support & Legal
            item {
                Column(verticalArrangement = Arrangement.spacedBy(8.dp)) {
                    AyGroupLabel("Support & Legal")

                    AyMenuRow(
                        icon = Icons.Filled.SupportAgent,
                        title = "Ayurvedic Support & Care",
                        subtitle = "Chat with doctors & consult our care team",
                        onClick = {
                            Toast.makeText(context, "Connecting to Ayurdhara Support...", Toast.LENGTH_SHORT).show()
                        }
                    )

                    AyMenuRow(
                        icon = Icons.Filled.StarRate,
                        title = "Rate on Google Play",
                        subtitle = "Support pure traditional ghani-pressed wellness",
                        onClick = {
                            Toast.makeText(context, "Thank you for rating Ayurdhara!", Toast.LENGTH_SHORT).show()
                        }
                    )

                    AyMenuRow(
                        icon = Icons.Filled.Security,
                        title = "Privacy Policy",
                        subtitle = "Your Ayurvedic data & health privacy pledge",
                        onClick = {
                            Toast.makeText(context, "Opening Privacy Policy", Toast.LENGTH_SHORT).show()
                        }
                    )

                    AyMenuRow(
                        icon = Icons.Filled.Description,
                        title = "Terms & Conditions",
                        subtitle = "Service guidelines, authentic purity guarantee",
                        onClick = {
                            Toast.makeText(context, "Opening Terms & Conditions", Toast.LENGTH_SHORT).show()
                        }
                    )
                }
            }

            // 7. Account Actions
            item {
                Column(verticalArrangement = Arrangement.spacedBy(8.dp)) {
                    AyGroupLabel("Account")

                    AyMenuRow(
                        icon = Icons.AutoMirrored.Filled.Logout,
                        title = "Sign Out",
                        subtitle = "Log out from this device",
                        destructive = true,
                        onClick = {
                            showLogoutDialog = true
                        }
                    )
                }
            }

            // 8. Footer Info
            item {
                Spacer(Modifier.height(12.dp))
                Column(
                    modifier = Modifier.fillMaxWidth(),
                    horizontalAlignment = Alignment.CenterHorizontally,
                    verticalArrangement = Arrangement.spacedBy(4.dp)
                ) {
                    AyLogoMark(36.dp)
                    Spacer(Modifier.height(4.dp))
                    Text(
                        "Ayurdhara Divya Shakti",
                        fontFamily = NotoSerif,
                        fontWeight = FontWeight.Bold,
                        fontSize = 15.sp,
                        color = c.heading
                    )
                    Text(
                        "Version 1.0.4 (Build 42) • Made with 🌿 in India",
                        fontFamily = PlusJakartaSans,
                        fontSize = 12.sp,
                        color = c.textMuted
                    )
                    Text(
                        "100% Traditional Stone Ghani Cold Pressed Purity",
                        fontFamily = PlusJakartaSans,
                        fontSize = 11.sp,
                        color = c.accent
                    )
                }
            }
        }
    }
}

@Composable
private fun ThemeOptionTile(
    title: String,
    subtitle: String,
    icon: ImageVector,
    selected: Boolean,
    onClick: () -> Unit,
    modifier: Modifier = Modifier
) {
    val c = AyTheme.colors
    val shape = RoundedCornerShape(16.dp)
    val bg = if (selected) {
        if (c.isDark) c.chipHigh else c.goldFill.copy(alpha = 0.45f)
    } else {
        c.card
    }
    val border = if (selected) {
        c.accent
    } else {
        c.border.copy(alpha = if (c.isDark) 0.3f else 0.6f)
    }

    Column(
        modifier = modifier
            .clip(shape)
            .background(bg, shape)
            .border(if (selected) 1.5.dp else 1.dp, border, shape)
            .clickable(onClick = onClick)
            .padding(vertical = 12.dp, horizontal = 8.dp),
        horizontalAlignment = Alignment.CenterHorizontally,
        verticalArrangement = Arrangement.spacedBy(6.dp)
    ) {
        Box(
            modifier = Modifier
                .size(36.dp)
                .background(
                    if (selected) c.accent.copy(alpha = 0.2f) else c.chip,
                    CircleShape
                ),
            contentAlignment = Alignment.Center
        ) {
            Icon(
                icon,
                contentDescription = null,
                tint = if (selected) c.accent else c.textSub,
                modifier = Modifier.size(20.dp)
            )
        }

        Text(
            title,
            fontFamily = PlusJakartaSans,
            fontWeight = if (selected) FontWeight.Bold else FontWeight.SemiBold,
            fontSize = 13.sp,
            color = if (selected) c.heading else c.text
        )

        Text(
            subtitle,
            fontFamily = PlusJakartaSans,
            fontSize = 11.sp,
            color = if (selected) c.accent else c.textMuted
        )
    }
}