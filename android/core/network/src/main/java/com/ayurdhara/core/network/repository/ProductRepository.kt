package com.ayurdhara.core.network.repository

import com.ayurdhara.core.network.model.ProductDto
import io.github.jan.supabase.SupabaseClient
import io.github.jan.supabase.postgrest.postgrest
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.withContext
import javax.inject.Inject
import javax.inject.Singleton

@Singleton
class ProductRepository @Inject constructor(
    private val supabase: SupabaseClient
) {
    suspend fun getActiveProducts(): List<ProductDto> {
        return withContext(Dispatchers.IO) {
            val columns = """
                id, slug, name, short_description, primary_image_url, rating, review_count, is_active,
                categories(id, name, slug, description),
                product_variants(id, size, price, original_price, is_active),
                product_images(url, display_order, variant_id)
            """.trimIndent()
            
            supabase.postgrest["products"]
                .select(columns = io.github.jan.supabase.postgrest.query.Columns.raw(columns)) {
                    filter {
                        eq("is_active", true)
                    }
                }
                .decodeList<ProductDto>()
        }
    }
}
