package com.ayurdhara.divyashakti.startup

import android.content.Context
import androidx.startup.Initializer

class SyncInitializer : Initializer<Unit> {
    override fun create(context: Context) {
        // Initialize background sync workers here
    }

    override fun dependencies(): List<Class<out Initializer<*>>> = listOf(CoilInitializer::class.java)
}