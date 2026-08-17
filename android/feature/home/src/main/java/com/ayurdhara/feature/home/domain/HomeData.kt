package com.ayurdhara.feature.home.domain

import com.ayurdhara.core.common.domain.model.Category
import com.ayurdhara.core.common.domain.model.Product

data class HomeData(
    val featuredProducts: List<Product> = emptyList(),
    val categories: List<Category> = emptyList()
)