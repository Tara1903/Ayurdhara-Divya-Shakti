package com.ayurdhara.feature.home.presentation.ui

import androidx.compose.foundation.background
import androidx.compose.foundation.layout.*
import androidx.compose.foundation.lazy.LazyColumn
import androidx.compose.foundation.lazy.LazyRow
import androidx.compose.foundation.lazy.items
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material3.*
import androidx.compose.runtime.Composable
import androidx.compose.runtime.collectAsState
import androidx.compose.runtime.getValue
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.draw.clip
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.layout.ContentScale
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.unit.dp
import androidx.hilt.navigation.compose.hiltViewModel
import coil.compose.AsyncImage
import com.ayurdhara.core.common.result.UiState
import com.ayurdhara.core.designsystem.components.CategoryCard
import com.ayurdhara.core.designsystem.components.ProductCard
import com.ayurdhara.core.designsystem.components.shimmerEffect
import com.ayurdhara.feature.home.presentation.viewmodel.HomeViewModel

@OptIn(ExperimentalMaterial3Api::class)
@Composable
fun HomeScreen(
    viewModel: HomeViewModel = hiltViewModel(),
    onAddToCart: (com.ayurdhara.core.common.domain.model.Product) -> Unit = {}
) {
    val uiState by viewModel.uiState.collectAsState()

    Scaffold(
        topBar = {
            CenterAlignedTopAppBar(
                title = { 
                    Text("AYURDHARA", style = MaterialTheme.typography.headlineMedium) 
                },
                colors = TopAppBarDefaults.centerAlignedTopAppBarColors(
                    containerColor = MaterialTheme.colorScheme.background
                )
            )
        }
    ) { paddingValues ->
        when (uiState) {
            is UiState.Loading -> {
                HomeSkeleton(modifier = Modifier.padding(paddingValues))
            }
            is UiState.Error -> {
                val message = (uiState as UiState.Error).message
                Column(
                    modifier = Modifier.fillMaxSize().padding(paddingValues),
                    verticalArrangement = Arrangement.Center,
                    horizontalAlignment = Alignment.CenterHorizontally
                ) {
                    Text(text = "Cannot reach our servers", style = MaterialTheme.typography.titleMedium)
                    Spacer(modifier = Modifier.height(8.dp))
                    Text(text = message, color = MaterialTheme.colorScheme.error)
                    Spacer(modifier = Modifier.height(16.dp))
                    Button(onClick = { viewModel.fetchHomeData() }) {
                        Text("Retry")
                    }
                }
            }
            is UiState.Success -> {
                val homeData = (uiState as UiState.Success).data
                LazyColumn(
                    modifier = Modifier.fillMaxSize().padding(paddingValues),
                    contentPadding = PaddingValues(bottom = 80.dp)
                ) {
                    item {
                        HeroBanner()
                    }
                    item {
                        Spacer(modifier = Modifier.height(24.dp))
                        SectionTitle("Shop by Category")
                        LazyRow(
                            contentPadding = PaddingValues(horizontal = 16.dp),
                            horizontalArrangement = Arrangement.spacedBy(16.dp)
                        ) {
                            items(homeData.categories, key = { it.title }) { category ->
                                CategoryPill(title = category.title, imageUrl = category.imageUrl)
                            }
                        }
                    }
                    item {
                        Spacer(modifier = Modifier.height(32.dp))
                        SectionTitle("Featured Wellness")
                        LazyRow(
                            contentPadding = PaddingValues(horizontal = 16.dp),
                            horizontalArrangement = Arrangement.spacedBy(16.dp)
                        ) {
                            items(homeData.featuredProducts, key = { it.id }) { product ->
                                ProductCard(
                                    title = product.title,
                                    price = product.price,
                                    imageUrl = product.imageUrl,
                                    onAddToCart = { onAddToCart(product) }
                                )
                            }
                        }
                    }
                    item {
                        Spacer(modifier = Modifier.height(32.dp))
                        SectionTitle("Ayurvedic Blends")
                        LazyRow(
                            contentPadding = PaddingValues(horizontal = 16.dp),
                            horizontalArrangement = Arrangement.spacedBy(16.dp)
                        ) {
                            items(homeData.featuredProducts.reversed(), key = { it.id + "_blend" }) { product ->
                                ProductCard(
                                    title = product.title,
                                    price = product.price,
                                    imageUrl = product.imageUrl,
                                    onAddToCart = { onAddToCart(product) }
                                )
                            }
                        }
                    }
                }
            }
            is UiState.Idle -> {}
        }
    }
}

@Composable
fun HeroBanner() {
    Box(
        modifier = Modifier
            .fillMaxWidth()
            .height(220.dp)
            .padding(horizontal = 16.dp)
            .clip(RoundedCornerShape(16.dp))
            .background(MaterialTheme.colorScheme.primaryContainer)
    ) {
        AsyncImage(
            model = "https://images.unsplash.com/photo-1608228064619-7988350d18bc?q=80&w=1000&auto=format&fit=crop", // placeholder elegant image
            contentDescription = "Hero Banner",
            modifier = Modifier.fillMaxSize(),
            contentScale = ContentScale.Crop
        )
        Box(
            modifier = Modifier
                .fillMaxSize()
                .background(Color.Black.copy(alpha = 0.3f))
        )
        Column(
            modifier = Modifier
                .align(Alignment.Center)
                .padding(16.dp),
            horizontalAlignment = Alignment.CenterHorizontally
        ) {
            Text(
                "Awaken Your Inner Glow",
                style = MaterialTheme.typography.headlineMedium.copy(color = Color.White)
            )
            Spacer(modifier = Modifier.height(8.dp))
            Button(
                onClick = { /* Navigate to shop */ },
                colors = ButtonDefaults.buttonColors(containerColor = MaterialTheme.colorScheme.primary)
            ) {
                Text("Explore Collection", color = MaterialTheme.colorScheme.onPrimary)
            }
        }
    }
}

@Composable
fun CategoryPill(title: String, imageUrl: String) {
    Column(horizontalAlignment = Alignment.CenterHorizontally) {
        AsyncImage(
            model = imageUrl.takeIf { it.isNotBlank() } ?: "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=150&h=150&fit=crop",
            contentDescription = title,
            modifier = Modifier
                .size(72.dp)
                .clip(RoundedCornerShape(36.dp))
                .background(MaterialTheme.colorScheme.surfaceVariant),
            contentScale = ContentScale.Crop
        )
        Spacer(modifier = Modifier.height(8.dp))
        Text(
            text = title,
            style = MaterialTheme.typography.labelMedium,
            fontWeight = FontWeight.Medium
        )
    }
}

@Composable
fun SectionTitle(title: String) {
    Text(
        text = title,
        style = MaterialTheme.typography.titleLarge,
        modifier = Modifier.padding(horizontal = 16.dp, vertical = 8.dp)
    )
}

@Composable
fun HomeSkeleton(modifier: Modifier = Modifier) {
    Column(modifier = modifier.fillMaxSize().padding(16.dp)) {
        Box(modifier = Modifier.fillMaxWidth().height(220.dp).clip(RoundedCornerShape(16.dp)).shimmerEffect())
        Spacer(modifier = Modifier.height(32.dp))
        Box(modifier = Modifier.width(150.dp).height(24.dp).shimmerEffect())
        Spacer(modifier = Modifier.height(16.dp))
        Row(horizontalArrangement = Arrangement.spacedBy(16.dp)) {
            Box(modifier = Modifier.size(72.dp).clip(RoundedCornerShape(36.dp)).shimmerEffect())
            Box(modifier = Modifier.size(72.dp).clip(RoundedCornerShape(36.dp)).shimmerEffect())
            Box(modifier = Modifier.size(72.dp).clip(RoundedCornerShape(36.dp)).shimmerEffect())
            Box(modifier = Modifier.size(72.dp).clip(RoundedCornerShape(36.dp)).shimmerEffect())
        }
        Spacer(modifier = Modifier.height(32.dp))
        Box(modifier = Modifier.width(180.dp).height(24.dp).shimmerEffect())
        Spacer(modifier = Modifier.height(16.dp))
        Row(horizontalArrangement = Arrangement.spacedBy(16.dp)) {
            Box(modifier = Modifier.width(160.dp).height(240.dp).clip(RoundedCornerShape(12.dp)).shimmerEffect())
            Box(modifier = Modifier.width(160.dp).height(240.dp).clip(RoundedCornerShape(12.dp)).shimmerEffect())
        }
    }
}