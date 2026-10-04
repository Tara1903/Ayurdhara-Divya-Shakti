package com.ayurdhara.core.common.domain.model

import kotlinx.serialization.Serializable

@Serializable
data class ProductVariant(
    val id: String = "",
    val size: String = "",
    val price: Double = 0.0,
    val originalPrice: Double? = null,
    val goldMemberPrice: Double? = null
)

@Serializable
data class Product(
    val id: String,
    val slug: String,
    val title: String,
    val shortDescription: String? = null,
    val fullDescription: String? = null,
    val story: String? = null,
    val primaryBenefit: String? = null,
    val price: Double,
    val originalPrice: Double? = null,
    val goldMemberPrice: Double? = null,
    val discount: Int = 0,
    val rating: Double = 0.0,
    val reviewCount: Int = 0,
    val badge: String? = null,
    val category: String = "Ayurvedic Wellness",
    val imageUrl: String = "",
    val images: List<String> = emptyList(),
    val variants: List<ProductVariant> = emptyList()
)

@Serializable
data class Category(
    val id: String,
    val title: String,
    val slug: String,
    val imageUrl: String = "",
    val description: String? = null
)