package com.ayurdhara.core.network.model

import kotlinx.serialization.SerialName
import kotlinx.serialization.Serializable

@Serializable
data class CategoryDto(
    val id: String = "",
    val name: String = "",
    val slug: String = "",
    @SerialName("description") val description: String? = null,
    @SerialName("image_url") val imageUrl: String? = null,
    @SerialName("display_order") val displayOrder: Int? = 0,
    @SerialName("is_active") val isActive: Boolean = true
)

@Serializable
data class ProductVariantDto(
    val id: String = "",
    val size: String = "",
    val price: Double = 0.0,
    @SerialName("original_price") val originalPrice: Double? = null,
    @SerialName("gold_member_price") val goldMemberPrice: Double? = null,
    @SerialName("sku") val sku: String? = null,
    @SerialName("stock_quantity") val stockQuantity: Int? = 0,
    @SerialName("is_active") val isActive: Boolean = true
)

@Serializable
data class ProductImageDto(
    val url: String = "",
    @SerialName("alt_text") val altText: String? = null,
    @SerialName("display_order") val displayOrder: Int? = null,
    @SerialName("variant_id") val variantId: String? = null
)

@Serializable
data class ProductCategoryDto(
    @SerialName("category_id") val categoryId: String? = null,
    val categories: CategoryDto? = null
)

@Serializable
data class ProductDto(
    val id: String = "",
    val slug: String = "",
    val name: String = "",
    @SerialName("category_id") val categoryId: String? = null,
    @SerialName("short_description") val shortDescription: String? = null,
    @SerialName("full_description") val fullDescription: String? = null,
    val story: String? = null,
    @SerialName("primary_benefit") val primaryBenefit: String? = null,
    val rating: Double? = null,
    @SerialName("review_count") val reviewCount: Int? = null,
    val badge: String? = null,
    @SerialName("is_active") val isActive: Boolean = true,
    @SerialName("categories") val category: CategoryDto? = null,
    @SerialName("product_categories") val productCategories: List<ProductCategoryDto> = emptyList(),
    @SerialName("product_variants") val variants: List<ProductVariantDto> = emptyList(),
    @SerialName("product_images") val images: List<ProductImageDto> = emptyList()
)
