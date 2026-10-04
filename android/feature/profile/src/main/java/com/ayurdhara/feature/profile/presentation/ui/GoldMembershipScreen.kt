package com.ayurdhara.feature.profile.presentation.ui

import androidx.compose.foundation.background
import androidx.compose.foundation.layout.*
import androidx.compose.foundation.rememberScrollState
import androidx.compose.foundation.shape.CircleShape
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.foundation.verticalScroll
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.LocalShipping
import androidx.compose.material.icons.filled.Savings
import androidx.compose.material.icons.filled.Star
import androidx.compose.material3.Icon
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import com.ayurdhara.core.designsystem.components.AyBackBar
import com.ayurdhara.core.designsystem.components.AyGoldButton
import com.ayurdhara.core.designsystem.components.AyGroupLabel
import com.ayurdhara.core.designsystem.components.AyHeroBrush
import com.ayurdhara.core.designsystem.components.AyMenuRow
import com.ayurdhara.core.designsystem.theme.AyTheme
import com.ayurdhara.core.designsystem.theme.NotoSerif
import com.ayurdhara.core.designsystem.theme.PlusJakartaSans

@Composable
fun GoldMembershipScreen(
    modifier: Modifier = Modifier,
    onBackClick: (() -> Unit)? = null
) {
    val c = AyTheme.colors
    Column(modifier.fillMaxSize().background(c.canvas)) {
        AyBackBar(title = "Gold Membership", onBack = onBackClick)
        Column(
            Modifier.weight(1f).fillMaxWidth().verticalScroll(rememberScrollState())
                .padding(start = 16.dp, end = 16.dp, top = 8.dp, bottom = 24.dp)
        ) {
            Column(
                Modifier.fillMaxWidth().background(AyHeroBrush(), RoundedCornerShape(24.dp)).padding(24.dp),
                horizontalAlignment = Alignment.CenterHorizontally
            ) {
                Box(Modifier.size(64.dp).background(c.goldFill, CircleShape), contentAlignment = Alignment.Center) {
                    Icon(Icons.Filled.Star, null, tint = c.onGoldFill, modifier = Modifier.size(34.dp))
                }
                Spacer(Modifier.height(14.dp))
                Text("Current Plan: Inactive", fontFamily = NotoSerif, fontWeight = FontWeight.Bold, fontSize = 22.sp, color = c.onHero)
                Spacer(Modifier.height(6.dp))
                Text(
                    "Upgrade to Gold to unlock exclusive 10% savings on all products and free shipping on orders over ₹499.",
                    fontFamily = PlusJakartaSans, fontSize = 14.sp, lineHeight = 21.sp, color = c.onHeroSub,
                    textAlign = androidx.compose.ui.text.style.TextAlign.Center
                )
                Spacer(Modifier.height(20.dp))
                AyGoldButton("Upgrade to Gold Now", onClick = { /* Future Upgrade Flow */ }, modifier = Modifier.fillMaxWidth())
            }
            Spacer(Modifier.height(24.dp))
            AyGroupLabel("Member Benefits")
            Column(verticalArrangement = Arrangement.spacedBy(10.dp)) {
                AyMenuRow(Icons.Filled.Savings, "10% Savings", subtitle = "On every product in the store")
                AyMenuRow(Icons.Filled.LocalShipping, "Free Shipping", subtitle = "On all orders over ₹499")
            }
        }
    }
}