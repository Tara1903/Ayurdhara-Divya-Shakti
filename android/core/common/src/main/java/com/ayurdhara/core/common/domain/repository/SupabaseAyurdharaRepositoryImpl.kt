package com.ayurdhara.core.common.domain.repository

import com.ayurdhara.core.common.domain.model.Category
import com.ayurdhara.core.common.domain.model.Product
import com.ayurdhara.core.common.result.AppResult
import com.ayurdhara.core.network.model.ProductDto
import com.ayurdhara.core.network.model.CategoryDto
import io.github.jan.supabase.SupabaseClient
import io.github.jan.supabase.postgrest.postgrest
import io.github.jan.supabase.postgrest.query.Columns
import javax.inject.Inject
import javax.inject.Singleton

@Singleton
class SupabaseAyurdharaRepositoryImpl @Inject constructor(
    private val supabaseClient: SupabaseClient
) {
    suspend fun getFeaturedProducts(): AppResult<List<Product>> {
        return try {
            val columns = """
                id, slug, name, short_description, primary_image_url, rating, review_count, is_active,
                categories(id, name, slug, description),
                product_variants(id, size, price, original_price, is_active),
                product_images(url, display_order, variant_id)
            """.trimIndent()

            val dtoList = supabaseClient.postgrest["products"]
                .select(columns = Columns.raw(columns)) {
                    filter {
                        eq("is_active", true)
                    }
                }.decodeList<ProductDto>()

            val products = dtoList.map { dto ->
                val variant = dto.variants.firstOrNull { it.isActive }
                Product(
                    id = dto.id,
                    slug = dto.slug,
                    title = dto.name,
                    shortDescription = dto.shortDescription,
                    price = variant?.price ?: 0.0,
                    originalPrice = variant?.originalPrice,
                    imageUrl = dto.images.minByOrNull { it.displayOrder ?: Int.MAX_VALUE }?.url ?: dto.primaryImageUrl ?: ""
                )
            }.take(5) // Limit to 5 featured products

            AppResult.Success(products)
        } catch (e: Exception) {
            AppResult.Error(e, e.message)
        }
    }

    suspend fun getCategories(): AppResult<List<Category>> {
        return try {
            val dtoList = supabaseClient.postgrest["categories"].select().decodeList<CategoryDto>()
            val categories = dtoList.map { dto ->
                Category(
                    id = dto.id,
                    title = dto.name,
                    slug = dto.slug,
                    imageUrl = dto.imageUrl ?: ""
                )
            }
            AppResult.Success(categories)
        } catch (e: Exception) {
            AppResult.Error(e, e.message)
        }
    }

    suspend fun searchProducts(query: String): AppResult<List<Product>> {
        return try {
            val columns = """
                id, slug, name, short_description, primary_image_url, rating, review_count, is_active,
                categories(id, name, slug, description),
                product_variants(id, size, price, original_price, is_active),
                product_images(url, display_order, variant_id)
            """.trimIndent()

            val dtoList = supabaseClient.postgrest["products"].select(columns = Columns.raw(columns)) {
                filter {
                    eq("is_active", true)
                    ilike("name", "%$query%")
                }
            }.decodeList<ProductDto>()

            val products = dtoList.map { dto ->
                val variant = dto.variants.firstOrNull { it.isActive }
                Product(
                    id = dto.id,
                    slug = dto.slug,
                    title = dto.name,
                    shortDescription = dto.shortDescription,
                    price = variant?.price ?: 0.0,
                    originalPrice = variant?.originalPrice,
                    imageUrl = dto.images.minByOrNull { it.displayOrder ?: Int.MAX_VALUE }?.url ?: dto.primaryImageUrl ?: ""
                )
            }
            AppResult.Success(products)
        } catch (e: Exception) {
            AppResult.Error(e, e.message)
        }
    }
}