package com.ayurdhara.feature.cart.domain

import android.content.Context
import androidx.datastore.preferences.core.edit
import androidx.datastore.preferences.core.stringPreferencesKey
import androidx.datastore.preferences.preferencesDataStore
import dagger.hilt.android.qualifiers.ApplicationContext
import kotlinx.coroutines.flow.Flow
import kotlinx.coroutines.flow.map
import kotlinx.serialization.encodeToString
import kotlinx.serialization.json.Json
import javax.inject.Inject
import javax.inject.Singleton

private val Context.cartDataStore by preferencesDataStore("cart_prefs")

@Singleton
class CartRepository @Inject constructor(
    @ApplicationContext private val context: Context
) {
    private val CART_KEY = stringPreferencesKey("cart_items")

    val cartItems: Flow<List<CartItem>> = context.cartDataStore.data.map { prefs ->
        val jsonString = prefs[CART_KEY] ?: "[]"
        try {
            Json.decodeFromString(jsonString)
        } catch (e: Exception) {
            emptyList()
        }
    }

    suspend fun updateCart(items: List<CartItem>) {
        context.cartDataStore.edit { prefs ->
            prefs[CART_KEY] = Json.encodeToString(items)
        }
    }
}