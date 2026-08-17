package com.ayurdhara.core.designsystem.components

import androidx.compose.foundation.layout.*
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material3.*
import androidx.compose.runtime.Composable
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.draw.clip
import androidx.compose.ui.layout.ContentScale
import androidx.compose.ui.unit.dp
import coil.compose.AsyncImage
import com.ayurdhara.core.designsystem.theme.LocalSpacing
import com.ayurdhara.core.designsystem.utils.rememberAyurdharaHapticFeedback

@Composable
fun ProductCard(
    title: String,
    price: Double,
    imageUrl: String,
    onAddToCart: () -> Unit,
    modifier: Modifier = Modifier
) {
    val spacing = LocalSpacing.current
    val haptic = rememberAyurdharaHapticFeedback()
    Card(
        modifier = modifier
            .width(160.dp)
            .padding(spacing.small),
        elevation = CardDefaults.cardElevation(defaultElevation = 4.dp),
        shape = RoundedCornerShape(12.dp),
        colors = CardDefaults.cardColors(containerColor = MaterialTheme.colorScheme.surface)
    ) {
        Column {
            AsyncImage(
                model = imageUrl,
                contentDescription = title,
                modifier = Modifier
                    .fillMaxWidth()
                    .height(140.dp)
                    .clip(RoundedCornerShape(topStart = 12.dp, topEnd = 12.dp)),
                contentScale = ContentScale.Crop
            )
            Column(modifier = Modifier.padding(spacing.small)) {
                Text(
                    text = title,
                    style = MaterialTheme.typography.titleMedium,
                    maxLines = 2
                )
                Spacer(modifier = Modifier.height(spacing.extraSmall))
                Text(
                    text = "₹$price",
                    style = MaterialTheme.typography.bodyMedium,
                    color = MaterialTheme.colorScheme.primary
                )
                Spacer(modifier = Modifier.height(spacing.small))
                AyurdharaButton(
                    text = "Add",
                    onClick = {
                        haptic.medium()
                        onAddToCart()
                    },
                    modifier = Modifier.fillMaxWidth()
                )
            }
        }
    }
}