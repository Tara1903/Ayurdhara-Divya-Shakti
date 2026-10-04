package com.ayurdhara.feature.blog.presentation.ui

import androidx.compose.foundation.background
import androidx.compose.foundation.clickable
import androidx.compose.foundation.layout.*
import androidx.compose.foundation.lazy.LazyColumn
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.Schedule
import androidx.compose.material3.Icon
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import com.ayurdhara.core.designsystem.components.AyBackBar
import com.ayurdhara.core.designsystem.components.AyBadge
import com.ayurdhara.core.designsystem.components.AyImage
import com.ayurdhara.core.designsystem.components.ayCard
import com.ayurdhara.core.designsystem.theme.AyTheme
import com.ayurdhara.core.designsystem.theme.NotoSerif
import com.ayurdhara.core.designsystem.theme.PlusJakartaSans

@Composable
fun BlogScreen(onBackClick: (() -> Unit)? = null) {
    val c = AyTheme.colors
    Column(Modifier.fillMaxSize().background(c.canvas)) {
        AyBackBar(title = "Ayurveda Journal", onBack = onBackClick)
        LazyColumn(
            Modifier.weight(1f).fillMaxWidth(),
            contentPadding = PaddingValues(start = 16.dp, end = 16.dp, top = 8.dp, bottom = 24.dp),
            verticalArrangement = Arrangement.spacedBy(20.dp)
        ) {
            item {
                BlogCard(
                    title = "The Secret of Ashwagandha: Ancient Wisdom for Modern Stress",
                    category = "Wellness",
                    readTime = "5 min read",
                    imageUrl = "https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&q=80&w=600"
                )
            }
            item {
                BlogCard(
                    title = "Daily Routine (Dinacharya): Aligning with the Sun",
                    category = "Lifestyle",
                    readTime = "7 min read",
                    imageUrl = "https://images.unsplash.com/photo-1447452001602-7090c7ab2db3?auto=format&fit=crop&q=80&w=600"
                )
            }
            item {
                BlogCard(
                    title = "Understanding Your Dosha: Vata, Pitta, Kapha",
                    category = "Basics",
                    readTime = "10 min read",
                    imageUrl = "https://images.unsplash.com/photo-1582845512747-e42001c95638?auto=format&fit=crop&q=80&w=600"
                )
            }
        }
    }
}

@Composable
fun BlogCard(
    title: String,
    category: String,
    readTime: String,
    imageUrl: String
) {
    val c = AyTheme.colors
    Column(
        Modifier
            .fillMaxWidth()
            .ayCard(RoundedCornerShape(24.dp))
            .clickable { }
    ) {
        Box(Modifier.fillMaxWidth().height(200.dp)) {
            AyImage(imageUrl, title, Modifier.fillMaxSize())
            AyBadge(category, Modifier.align(Alignment.TopStart).padding(12.dp))
        }
        Column(Modifier.padding(16.dp)) {
            Row(verticalAlignment = Alignment.CenterVertically) {
                Icon(Icons.Filled.Schedule, null, tint = c.accent, modifier = Modifier.size(14.dp))
                Spacer(Modifier.width(4.dp))
                Text(readTime, fontFamily = PlusJakartaSans, fontWeight = FontWeight.SemiBold, fontSize = 12.sp, color = c.textMuted)
            }
            Spacer(Modifier.height(8.dp))
            Text(title, fontFamily = NotoSerif, fontWeight = FontWeight.Bold, fontSize = 19.sp, lineHeight = 26.sp, color = c.heading)
        }
    }
}