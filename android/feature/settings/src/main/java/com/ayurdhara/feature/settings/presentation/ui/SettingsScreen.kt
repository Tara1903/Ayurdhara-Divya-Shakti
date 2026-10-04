package com.ayurdhara.feature.settings.presentation.ui

import androidx.compose.foundation.background
import androidx.compose.foundation.layout.*
import androidx.compose.foundation.lazy.LazyColumn
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.automirrored.filled.Logout
import androidx.compose.material.icons.filled.DarkMode
import androidx.compose.material.icons.filled.Notifications
import androidx.compose.material3.Text
import androidx.compose.runtime.*
import androidx.compose.ui.Modifier
import androidx.compose.ui.text.style.TextAlign
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import com.ayurdhara.core.designsystem.components.AyBackBar
import com.ayurdhara.core.designsystem.components.AyGroupLabel
import com.ayurdhara.core.designsystem.components.AyMenuRow
import com.ayurdhara.core.designsystem.components.AySwitchRow
import com.ayurdhara.core.designsystem.theme.AyTheme
import com.ayurdhara.core.designsystem.theme.PlusJakartaSans

@Composable
fun SettingsScreen(
    onLogout: () -> Unit = {},
    onBackClick: (() -> Unit)? = null
) {
    var notificationsEnabled by remember { mutableStateOf(true) }
    var darkModeEnabled by remember { mutableStateOf(false) }
    val c = AyTheme.colors

    Column(Modifier.fillMaxSize().background(c.canvas)) {
        AyBackBar(title = "Settings", onBack = onBackClick)
        LazyColumn(
            Modifier.weight(1f).fillMaxWidth(),
            contentPadding = PaddingValues(start = 16.dp, end = 16.dp, top = 8.dp, bottom = 24.dp),
            verticalArrangement = Arrangement.spacedBy(10.dp)
        ) {
            item { AyGroupLabel("Preferences") }
            item {
                SettingToggleItem(
                    title = "Push Notifications",
                    description = "Receive updates on orders and offers",
                    checked = notificationsEnabled,
                    onCheckedChange = { notificationsEnabled = it }
                )
            }
            item {
                SettingToggleItem(
                    title = "Dark Mode",
                    description = "Toggle dark theme for the app",
                    checked = darkModeEnabled,
                    onCheckedChange = { darkModeEnabled = it },
                    iconIsDark = true
                )
            }

            item {
                Spacer(Modifier.height(14.dp))
                AyGroupLabel("Account")
                AyMenuRow(Icons.AutoMirrored.Filled.Logout, "Log Out", onClick = onLogout, destructive = true, trailing = {})
            }

            item {
                Spacer(Modifier.height(24.dp))
                Text(
                    "App Version 1.0.0",
                    fontFamily = PlusJakartaSans, fontSize = 12.sp, color = c.textMuted,
                    modifier = Modifier.fillMaxWidth(),
                    textAlign = TextAlign.Center
                )
            }
        }
    }
}

@Composable
fun SettingToggleItem(
    title: String,
    description: String,
    checked: Boolean,
    onCheckedChange: (Boolean) -> Unit,
    iconIsDark: Boolean = false
) {
    AySwitchRow(
        title = title,
        description = description,
        checked = checked,
        onCheckedChange = onCheckedChange,
        icon = if (iconIsDark) Icons.Filled.DarkMode else Icons.Filled.Notifications
    )
}