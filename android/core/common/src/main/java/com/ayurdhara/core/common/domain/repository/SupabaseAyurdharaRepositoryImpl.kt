package com.ayurdhara.core.common.domain.repository

import com.ayurdhara.core.common.domain.model.Category
import com.ayurdhara.core.common.domain.model.Product
import com.ayurdhara.core.common.domain.model.ProductVariant
import com.ayurdhara.core.common.result.AppResult
import com.ayurdhara.core.network.model.CategoryDto
import com.ayurdhara.core.network.model.ProductDto
import io.github.jan.supabase.SupabaseClient
import io.github.jan.supabase.postgrest.postgrest
import io.github.jan.supabase.postgrest.query.Columns
import io.github.jan.supabase.realtime.PostgresAction
import io.github.jan.supabase.realtime.channel
import io.github.jan.supabase.realtime.postgresChangeFlow
import io.github.jan.supabase.realtime.realtime
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.channels.awaitClose
import kotlinx.coroutines.flow.Flow
import kotlinx.coroutines.flow.callbackFlow
import kotlinx.coroutines.flow.catch
import kotlinx.coroutines.flow.flowOn
import kotlinx.coroutines.launch
import kotlinx.coroutines.withContext
import javax.inject.Inject
import javax.inject.Singleton

@Singleton
class SupabaseAyurdharaRepositoryImpl @Inject constructor(
    private val supabaseClient: SupabaseClient
) {
    private val productColumns = """
        id, slug, name, short_description, full_description, story, primary_benefit, rating, review_count, badge, is_active,
        categories(id, name, slug, description, image_url),
        product_variants(id, size, price, original_price, gold_member_price, sku, stock_quantity, is_active),
        product_images(url, alt_text, display_order, variant_id)
    """.trimIndent()

    @Volatile
    private var cachedProducts: List<Product> = emptyList()

    suspend fun getFeaturedProducts(): AppResult<List<Product>> {
        if (cachedProducts.isNotEmpty()) {
            return AppResult.Success(cachedProducts)
        }
        return withContext(Dispatchers.IO) {
            try {
                val dtoList = supabaseClient.postgrest["products"]
                    .select(columns = Columns.raw(productColumns)) {
                        filter {
                            eq("is_active", true)
                        }
                    }.decodeList<ProductDto>()

                val products = dtoList.map { it.toDomain() }
                if (products.isNotEmpty()) {
                    cachedProducts = products
                }
                AppResult.Success(products)
            } catch (e: Exception) {
                AppResult.Error(e, e.message)
            }
        }
    }

    suspend fun getAllProducts(): AppResult<List<Product>> {
        if (cachedProducts.isNotEmpty()) {
            return AppResult.Success(cachedProducts)
        }
        return withContext(Dispatchers.IO) {
            try {
                val dtoList = supabaseClient.postgrest["products"]
                    .select(columns = Columns.raw(productColumns)) {
                        filter {
                            eq("is_active", true)
                        }
                    }.decodeList<ProductDto>()

                val products = dtoList.map { it.toDomain() }
                if (products.isNotEmpty()) {
                    cachedProducts = products
                }
                AppResult.Success(products)
            } catch (e: Exception) {
                AppResult.Error(e, e.message)
            }
        }
    }

    suspend fun getCategories(): AppResult<List<Category>> {
        return withContext(Dispatchers.IO) {
            try {
                val dtoList = supabaseClient.postgrest["categories"]
                    .select {
                        filter {
                            eq("is_active", true)
                        }
                    }
                    .decodeList<CategoryDto>()
                val categories = dtoList.map { dto ->
                    Category(
                        id = dto.id,
                        title = dto.name,
                        slug = dto.slug,
                        imageUrl = dto.imageUrl?.toAbsoluteUrl() ?: "",
                        description = dto.description
                    )
                }
                AppResult.Success(categories)
            } catch (e: Exception) {
                AppResult.Error(e, e.message)
            }
        }
    }

    suspend fun searchProducts(query: String): AppResult<List<Product>> {
        return withContext(Dispatchers.IO) {
            try {
                val dtoList = supabaseClient.postgrest["products"].select(columns = Columns.raw(productColumns)) {
                    filter {
                        eq("is_active", true)
                        ilike("name", "%$query%")
                    }
                }.decodeList<ProductDto>()

                val products = dtoList.map { it.toDomain() }
                AppResult.Success(products)
            } catch (e: Exception) {
                AppResult.Error(e, e.message)
            }
        }
    }

    suspend fun getProductBySlug(slug: String): AppResult<Product> {
        val inCache = cachedProducts.find { it.slug.equals(slug, ignoreCase = true) || it.id == slug }
        if (inCache != null) {
            return AppResult.Success(inCache)
        }
        return withContext(Dispatchers.IO) {
            try {
                val dtoList = supabaseClient.postgrest["products"]
                    .select(columns = Columns.raw(productColumns)) {
                        filter {
                            eq("slug", slug)
                        }
                    }.decodeList<ProductDto>()

                val product = dtoList.firstOrNull()?.toDomain()
                if (product != null) {
                    return@withContext AppResult.Success(product)
                }
            } catch (e: Exception) {
                // Ignore and fall back to local/cached list
            }

            try {
                val all = getAllProducts()
                if (all is AppResult.Success && all.data.isNotEmpty()) {
                    val match = all.data.find { it.slug.equals(slug, ignoreCase = true) || it.id == slug }
                    if (match != null) {
                        return@withContext AppResult.Success(match)
                    }
                    val first = all.data.firstOrNull()
                    if (first != null) {
                        return@withContext AppResult.Success(first)
                    }
                }
            } catch (_: Exception) {}

            AppResult.Error(Exception("Product not found: $slug"), "Product not found: $slug")
        }
    }

    /**
     * Realtime flow that emits current products and updates dynamically when backend/admin alters products
     */
    fun getProductsRealtimeFlow(): Flow<List<Product>> = callbackFlow {
        // Initial load
        val initial = getAllProducts()
        if (initial is AppResult.Success) {
            trySend(initial.data)
        } else {
            trySend(emptyList())
        }

        var channel = supabaseClient.realtime.channel("public:products_live_feed")
        val changeFlow = try {
            channel.postgresChangeFlow<PostgresAction>(schema = "public") {
                table = "products"
            }
        } catch (_: Exception) {
            null
        }

        val job = launch {
            try {
                changeFlow?.collect {
                    val fresh = getAllProducts()
                    if (fresh is AppResult.Success) {
                        trySend(fresh.data)
                    }
                }
            } catch (_: Exception) {}
        }

        launch {
            try {
                channel.subscribe()
            } catch (_: Exception) {}
        }

        awaitClose {
            job.cancel()
            launch {
                try {
                    channel.unsubscribe()
                } catch (_: Exception) {}
            }
        }
    }.catch { emit(emptyList()) }.flowOn(Dispatchers.IO)

    /**
     * Realtime flow for categories
     */
    fun getCategoriesRealtimeFlow(): Flow<List<Category>> = callbackFlow {
        val initial = getCategories()
        if (initial is AppResult.Success) {
            trySend(initial.data)
        } else {
            trySend(emptyList())
        }

        val channel = supabaseClient.realtime.channel("public:categories_live_feed")
        val changeFlow = try {
            channel.postgresChangeFlow<PostgresAction>(schema = "public") {
                table = "categories"
            }
        } catch (_: Exception) {
            null
        }

        val job = launch {
            try {
                changeFlow?.collect {
                    val fresh = getCategories()
                    if (fresh is AppResult.Success) {
                        trySend(fresh.data)
                    }
                }
            } catch (_: Exception) {}
        }

        launch {
            try {
                channel.subscribe()
            } catch (_: Exception) {}
        }

        awaitClose {
            job.cancel()
            launch {
                try {
                    channel.unsubscribe()
                } catch (_: Exception) {}
            }
        }
    }.catch { emit(emptyList()) }.flowOn(Dispatchers.IO)

    private fun String.toAbsoluteUrl(): String {
        return if (this.startsWith("/")) {
            "https://ayurdhara-divya-shakti-9gre.vercel.app$this"
        } else {
            this
        }
    }

    private fun ProductDto.toDomain(): Product {
        val activeVariants = variants.filter { it.isActive }.ifEmpty { variants }
        val primaryVariant = activeVariants.firstOrNull()
        val allImages = images.sortedBy { it.displayOrder ?: 0 }.map { it.url.toAbsoluteUrl() }
        val firstImg = allImages.firstOrNull() ?: ""

        val original = primaryVariant?.originalPrice
        val current = primaryVariant?.price ?: 0.0
        val discount = if (original != null && original > current) {
            (((original - current) / original) * 100).toInt()
        } else 0

        val primaryCatDto = category
        val junctionCatNames = productCategories.mapNotNull { it.categories?.name }
        val allCatNames = if (junctionCatNames.isNotEmpty()) {
            junctionCatNames.distinct()
        } else if (primaryCatDto?.name != null) {
            listOf(primaryCatDto.name)
        } else {
            emptyList()
        }
        val primaryCat = allCatNames.firstOrNull() ?: primaryCatDto?.name ?: "Ayurvedic Wellness"

        return Product(
            id = id,
            slug = slug,
            title = name,
            shortDescription = shortDescription,
            fullDescription = fullDescription,
            story = story,
            primaryBenefit = primaryBenefit,
            price = current,
            originalPrice = original,
            goldMemberPrice = primaryVariant?.goldMemberPrice,
            discount = discount,
            rating = rating ?: 5.0,
            reviewCount = reviewCount ?: 1,
            badge = badge ?: "100% NATURAL",
            category = primaryCat,
            categories = allCatNames,
            imageUrl = firstImg,
            images = allImages,
            variants = activeVariants.map {
                ProductVariant(
                    id = it.id,
                    size = it.size,
                    price = it.price,
                    originalPrice = it.originalPrice,
                    goldMemberPrice = it.goldMemberPrice
                )
            }
        )
    }
}