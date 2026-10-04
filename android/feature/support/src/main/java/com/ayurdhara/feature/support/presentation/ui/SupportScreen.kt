package com.ayurdhara.feature.support.presentation.ui

import androidx.compose.animation.AnimatedVisibility
import androidx.compose.animation.animateContentSize
import androidx.compose.foundation.background
import androidx.compose.foundation.clickable
import androidx.compose.foundation.layout.*
import androidx.compose.foundation.lazy.LazyColumn
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.Email
import androidx.compose.material.icons.filled.ExpandMore
import androidx.compose.material.icons.filled.Phone
import androidx.compose.material3.Icon
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.runtime.getValue
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.saveable.rememberSaveable
import androidx.compose.runtime.setValue
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.draw.rotate
import androidx.compose.ui.graphics.vector.ImageVector
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import androidx.compose.animation.core.animateFloatAsState
import com.ayurdhara.core.designsystem.components.AyBackBar
import com.ayurdhara.core.designsystem.components.AyGroupLabel
import com.ayurdhara.core.designsystem.components.AyMenuRow
import com.ayurdhara.core.designsystem.components.ayCard
import com.ayurdhara.core.designsystem.theme.AyTheme
import com.ayurdhara.core.designsystem.theme.NotoSerif
import com.ayurdhara.core.designsystem.theme.PlusJakartaSans

@Composable
fun SupportScreen(onBackClick: (() -> Unit)? = null) {
    val c = AyTheme.colors
    Column(Modifier.fillMaxSize().background(c.canvas)) {
        AyBackBar(title = "Help & Support", onBack = onBackClick)
        LazyColumn(
            Modifier.weight(1f).fillMaxWidth(),
            contentPadding = PaddingValues(start = 16.dp, end = 16.dp, top = 8.dp, bottom = 24.dp),
            verticalArrangement = Arrangement.spacedBy(24.dp)
        ) {
            item {
                Text("We're here to help", fontFamily = NotoSerif, fontWeight = FontWeight.Bold, fontSize = 26.sp, color = c.heading)
                Spacer(Modifier.height(16.dp))
                AyGroupLabel("Contact Us")
                ContactCard(title = "Email Support", value = "support@ayurdhara.com", icon = Icons.Default.Email)
                Spacer(Modifier.height(10.dp))
                ContactCard(title = "Phone Support", value = "+91 1800-123-4567", icon = Icons.Default.Phone)
            }

            item {
                AyGroupLabel("Frequently Asked Questions")
                Column(verticalArrangement = Arrangement.spacedBy(10.dp)) {
                    FaqItem("How do I track my order?", "You can track your order in the 'My Orders' section under your Profile.")
                    FaqItem("What is your return policy?", "We accept returns within 7 days of delivery for unused products in their original packaging.")
                    FaqItem("Are the products 100% natural?", "Yes, all Ayurdhara products are crafted using 100% natural Ayurvedic ingredients.")
                }
            }
        }
    }
}

@Composable
fun ContactCard(title: String, value: String, icon: ImageVector) {
    val c = AyTheme.colors
    AyMenuRow(
        icon = icon, title = value, subtitle = title,
        trailing = {}
    )
}

@Composable
fun FaqItem(question: String, answer: String) {
    val c = AyTheme.colors
    var expanded by rememberSaveable(question) { mutableStateOf(false) }
    val rotation by animateFloatAsState(if (expanded) 180f else 0f, label = "faqChevron")
    Column(
        Modifier
            .fillMaxWidth()
            .ayCard(RoundedCornerShape(16.dp))
            .clickable { expanded = !expanded }
            .animateContentSize()
            .padding(16.dp)
    ) {
        Row(verticalAlignment = Alignment.CenterVertically) {
            Text(
                question, Modifier.weight(1f), fontFamily = NotoSerif, fontWeight = FontWeight.Bold,
                fontSize = 16.sp, lineHeight = 22.sp, color = c.heading
            )
            Icon(Icons.Filled.ExpandMore, null, Modifier.size(22.dp).rotate(rotation), tint = c.accent)
        }
        AnimatedVisibility(visible = expanded) {
            Text(
                answer, Modifier.padding(top = 8.dp), fontFamily = PlusJakartaSans,
                fontSize = 14.sp, lineHeight = 21.sp, color = c.textSub
            )
        }
    }
}