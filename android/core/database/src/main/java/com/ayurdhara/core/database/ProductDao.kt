package com.ayurdhara.core.database

import androidx.room.Dao
import androidx.room.Query

@Dao
interface ProductDao {
    @Query("SELECT * FROM products")
    suspend fun getProducts(): List<ProductEntity>
}