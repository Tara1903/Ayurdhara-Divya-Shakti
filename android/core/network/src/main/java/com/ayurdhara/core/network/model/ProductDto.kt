package com.ayurdhara.core.network.model

import kotlinx.serialization.SerialName
import kotlinx.serialization.Serializable

@Serializable
data class CategoryDto(
    val id: String,
    val name: String,
    val slug: String,
    @SerialName("description") val description: String? = null,
    @SerialName("image_url") val imageUrl: String? = null
)

@Serializable
data class ProductVariantDto(
    val id: String,
    val size: String,
    val price: Double,
    @SerialName("original_price") val originalPrice: Double? = null,
    @SerialName("is_active") val isActive: Boolean = true
)

@Serializable
data class ProductImageDto(
    val url: String,
    @SerialName("display_order") val displayOrder: Int? = null,
    @SerialName("variant_id") val variantId: String? = null
)

@Serializable
data class ProductDto(
    val id: String,
    val slug: String,
    val name: String,
    @SerialName("short_description") val shortDescription: String? = null,
    @SerialName("primary_image_url") val primaryImageUrl: String? = null,
    val rating: Double? = null,
    @SerialName("review_count") val reviewCount: Int? = null,
    @SerialName("is_active") val isActive: Boolean = true,
    @SerialName("categories") val category: CategoryDto? = null,
    @SerialName("product_variants") val variants: List<ProductVariantDto> = emptyList(),
    @SerialName("product_images") val images: List<ProductImageDto> = emptyList()
)
