package com.ayurdhara.feature.home.domain

import com.ayurdhara.core.common.domain.repository.SupabaseAyurdharaRepositoryImpl
import com.ayurdhara.core.common.result.AppResult
import kotlinx.coroutines.async
import kotlinx.coroutines.coroutineScope
import kotlinx.coroutines.flow.Flow
import kotlinx.coroutines.flow.combine
import javax.inject.Inject
import javax.inject.Singleton

@Singleton
class HomeRepository @Inject constructor(
    private val ayurdharaRepository: SupabaseAyurdharaRepositoryImpl
) {
    suspend fun getHomeData(forceRefresh: Boolean = false): AppResult<HomeData> = coroutineScope {
        val productsDeferred = async { ayurdharaRepository.getFeaturedProducts(forceRefresh) }
        val categoriesDeferred = async { ayurdharaRepository.getCategories() }

        val productsResult = productsDeferred.await()
        val categoriesResult = categoriesDeferred.await()

        val prods = if (productsResult is AppResult.Success) productsResult.data else emptyList()
        val cats = if (categoriesResult is AppResult.Success) categoriesResult.data else emptyList()

        if (prods.isNotEmpty() || cats.isNotEmpty()) {
            AppResult.Success(
                HomeData(
                    featuredProducts = prods,
                    categories = cats
                )
            )
        } else if (productsResult is AppResult.Error) {
            AppResult.Error(productsResult.exception, productsResult.message)
        } else if (categoriesResult is AppResult.Error) {
            AppResult.Error(categoriesResult.exception, categoriesResult.message)
        } else {
            AppResult.Error(Exception("Failed to fetch home data"))
        }
    }

    /**
     * Realtime home data stream combining products and categories
     */
    fun getHomeDataRealtimeFlow(): Flow<HomeData> {
        return combine(
            ayurdharaRepository.getProductsRealtimeFlow(),
            ayurdharaRepository.getCategoriesRealtimeFlow()
        ) { products, categories ->
            HomeData(
                featuredProducts = products,
                categories = categories
            )
        }
    }
}