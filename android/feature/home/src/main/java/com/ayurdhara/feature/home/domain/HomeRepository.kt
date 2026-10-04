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
    suspend fun getHomeData(): AppResult<HomeData> = coroutineScope {
        val productsDeferred = async { ayurdharaRepository.getFeaturedProducts() }
        val categoriesDeferred = async { ayurdharaRepository.getCategories() }

        val productsResult = productsDeferred.await()
        val categoriesResult = categoriesDeferred.await()

        if (productsResult is AppResult.Success && categoriesResult is AppResult.Success) {
            AppResult.Success(
                HomeData(
                    featuredProducts = productsResult.data,
                    categories = categoriesResult.data
                )
            )
        } else if (productsResult is AppResult.Success) {
            AppResult.Success(
                HomeData(
                    featuredProducts = productsResult.data,
                    categories = emptyList()
                )
            )
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