package com.ayurdhara.feature.profile.presentation.ui

import androidx.compose.foundation.background
import androidx.compose.foundation.layout.*
import androidx.compose.foundation.lazy.LazyColumn
import androidx.compose.foundation.shape.CircleShape
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.automirrored.filled.Logout
import androidx.compose.material.icons.filled.Info
import androidx.compose.material.icons.filled.List
import androidx.compose.material.icons.filled.LocationOn
import androidx.compose.material.icons.filled.Settings
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.runtime.getValue
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.vector.ImageVector
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.text.style.TextAlign
import androidx.compose.ui.text.style.TextOverflow
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import androidx.hilt.navigation.compose.hiltViewModel
import androidx.lifecycle.compose.collectAsStateWithLifecycle
import com.ayurdhara.core.designsystem.components.AyAvatarRing
import com.ayurdhara.core.designsystem.components.AyBackBar
import com.ayurdhara.core.designsystem.components.AyBadge
import com.ayurdhara.core.designsystem.components.AyErrorPanel
import com.ayurdhara.core.designsystem.components.AyGroupLabel
import com.ayurdhara.core.designsystem.components.AyHeroBrush
import com.ayurdhara.core.designsystem.components.AyLoading
import com.ayurdhara.core.designsystem.components.AyLogoMark
import com.ayurdhara.core.designsystem.components.AyMenuRow
import com.ayurdhara.core.designsystem.components.AyPrimaryButton
import com.ayurdhara.core.designsystem.theme.AyTheme
import com.ayurdhara.core.designsystem.theme.NotoSerif
import com.ayurdhara.core.designsystem.theme.PlusJakartaSans
import com.ayurdhara.feature.profile.presentation.viewmodel.ProfileUiState
import com.ayurdhara.feature.profile.presentation.viewmodel.ProfileViewModel

@Composable
fun ProfileScreen(
    onNavigateToOrders: () -> Unit = {},
    onNavigateToSettings: () -> Unit = {},
    onNavigateToSupport: () -> Unit = {},
    onSignedOut: () -> Unit = {},
    viewModel: ProfileViewModel = hiltViewModel()
) {
    val uiState by viewModel.uiState.collectAsStateWithLifecycle()
    val c = AyTheme.colors

    Column(Modifier.fillMaxSize().background(c.canvas)) {
        AyBackBar(title = "Profile", onBack = null)
        Box(Modifier.weight(1f).fillMaxWidth()) {
            when (val state = uiState) {
                is ProfileUiState.Loading -> AyLoading()

                is ProfileUiState.Error -> AyErrorPanel(state.message, onRetry = { viewModel.loadProfile() })

                is ProfileUiState.LoggedOut -> {
                    LazyColumn(
                        Modifier.fillMaxSize(),
                        contentPadding = PaddingValues(start = 16.dp, end = 16.dp, top = 8.dp, bottom = 24.dp),
                        verticalArrangement = Arrangement.spacedBy(16.dp)
                    ) {
                        item {
                            Column(
                                Modifier
                                    .fillMaxWidth()
                                    .background(AyHeroBrush(), RoundedCornerShape(24.dp))
                                    .padding(horizontal = 20.dp, vertical = 28.dp),
                                horizontalAlignment = Alignment.CenterHorizontally
                            ) {
                                Box(
                                    Modifier.size(72.dp).background(c.goldFill.copy(alpha = 0.3f), CircleShape),
                                    contentAlignment = Alignment.Center
                                ) {
                                    AyLogoMark(46.dp)
                                }
                                Spacer(Modifier.height(14.dp))
                                Text(
                                    "Welcome to Ayurdhara",
                                    fontFamily = NotoSerif,
                                    fontWeight = FontWeight.Bold,
                                    fontSize = 22.sp,
                                    color = c.onHero,
                                    textAlign = TextAlign.Center
                                )
                                Spacer(Modifier.height(6.dp))
                                Text(
                                    "Sign in to access your Prakriti profile, track orders, and sync cart across devices.",
                                    fontFamily = PlusJakartaSans,
                                    fontSize = 13.sp,
                                    color = c.onHeroSub,
                                    textAlign = TextAlign.Center
                                )
                                Spacer(Modifier.height(18.dp))
                                AyPrimaryButton(
                                    text = "Sign In or Register →",
                                    onClick = onSignedOut,
                                    modifier = Modifier.fillMaxWidth().height(48.dp),
                                    gold = true
                                )
                            }
                        }
                        item {
                            AyGroupLabel("Preferences")
                            Column(verticalArrangement = Arrangement.spacedBy(10.dp)) {
                                AyMenuRow(Icons.Default.Settings, "Settings", subtitle = "Notifications & appearance", onClick = onNavigateToSettings)
                                AyMenuRow(Icons.Default.Info, "Help & Support", subtitle = "FAQs and contact", onClick = onNavigateToSupport)
                            }
                        }
                    }
                }

                is ProfileUiState.Success -> {
                    val profile = state.profile
                    LazyColumn(
                        Modifier.fillMaxSize(),
                        contentPadding = PaddingValues(start = 16.dp, end = 16.dp, top = 8.dp, bottom = 24.dp),
                        verticalArrangement = Arrangement.spacedBy(8.dp)
                    ) {
                        item {
                            // User header
                            Column(
                                Modifier
                                    .fillMaxWidth()
                                    .background(AyHeroBrush(), RoundedCornerShape(24.dp))
                                    .padding(horizontal = 20.dp, vertical = 24.dp),
                                horizontalAlignment = Alignment.CenterHorizontally
                            ) {
                                AyAvatarRing(initialsOf(profile.fullName))
                                Spacer(Modifier.height(14.dp))
                                Text(
                                    profile.fullName, fontFamily = NotoSerif, fontWeight = FontWeight.Bold,
                                    fontSize = 24.sp, color = c.onHero, textAlign = TextAlign.Center,
                                    maxLines = 2, overflow = TextOverflow.Ellipsis
                                )
                                Spacer(Modifier.height(2.dp))
                                Text(
                                    profile.email, fontFamily = PlusJakartaSans, fontSize = 14.sp,
                                    color = c.onHeroSub, textAlign = TextAlign.Center
                                )
                                if (profile.mobile != null) {
                                    Text(
                                        profile.mobile, fontFamily = PlusJakartaSans, fontSize = 13.sp,
                                        color = c.onHeroSub, textAlign = TextAlign.Center
                                    )
                                }
                                // Gold Membership pill
                                if (profile.isGoldMember) {
                                    Spacer(Modifier.height(14.dp))
                                    AyBadge("✦ Gold Member")
                                }
                            }
                            Spacer(Modifier.height(16.dp))
                        }

                        item {
                            AyGroupLabel("Account Details")
                            Column(verticalArrangement = Arrangement.spacedBy(10.dp)) {
                                AyMenuRow(Icons.Default.List, "My Orders", subtitle = "Track live deliveries & reorder", onClick = onNavigateToOrders)
                                AyMenuRow(Icons.Default.LocationOn, "Saved Addresses", subtitle = "Manage delivery locations", onClick = {})
                            }
                            Spacer(Modifier.height(20.dp))
                            AyGroupLabel("Preferences")
                            Column(verticalArrangement = Arrangement.spacedBy(10.dp)) {
                                AyMenuRow(Icons.Default.Settings, "Settings", subtitle = "Notifications & appearance", onClick = onNavigateToSettings)
                                AyMenuRow(Icons.Default.Info, "Help & Support", subtitle = "FAQs and contact", onClick = onNavigateToSupport)
                            }
                            Spacer(Modifier.height(20.dp))
                            // Sign out
                            AyMenuRow(
                                Icons.AutoMirrored.Filled.Logout, "Sign Out",
                                onClick = {
                                    viewModel.signOut()
                                    onSignedOut()
                                }, destructive = true, trailing = {}
                            )
                            Spacer(Modifier.height(16.dp))
                        }
                    }
                }
            }
        }
    }
}

private fun initialsOf(name: String): String {
    val parts = name.trim().split(Regex("\\s+")).filter { it.isNotEmpty() }
    return when {
        parts.isEmpty() -> "?"
        parts.size == 1 -> parts[0].take(1)
        else -> "${parts[0].first()}${parts[1].first()}"
    }
}

/** Kept for source compatibility; delegates to the shared design-system menu row. */
@Composable
fun ProfileMenuItem(
    title: String,
    icon: ImageVector,
    onClick: () -> Unit
) {
    AyMenuRow(icon, title, onClick = onClick)
}