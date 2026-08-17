package com.ayurdhara.core.database

import androidx.room.Database
import androidx.room.RoomDatabase

@Database(entities = [ProductEntity::class], version = 1)
abstract class AyurdharaDatabase : RoomDatabase() {
    abstract fun productDao(): ProductDao
}