package com.ayurdhara.core.common.domain.model
import kotlinx.serialization.Serializable

@Serializable
data class Product(
    val id: String,
    val slug: String,
    val title: String,
    val shortDescription: String?,
    val price: Double,
    val originalPrice: Double?,
    val imageUrl: String
)

@Serializable
data class Category(
    val id: String,
    val title: String,
    val slug: String,
    val imageUrl: String
)