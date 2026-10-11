package com.ayurdhara.divyashakti

import android.app.Application
import android.app.NotificationChannel
import android.app.NotificationManager
import android.content.Context
import android.os.Build
import coil.ImageLoader
import coil.ImageLoaderFactory
import coil.disk.DiskCache
import coil.memory.MemoryCache
import dagger.hilt.android.HiltAndroidApp

@HiltAndroidApp
class AyurdharaApp : Application(), ImageLoaderFactory {

    override fun onCreate() {
        super.onCreate()
        createNotificationChannels()
    }

    private fun createNotificationChannels() {
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.O) {
            val notificationManager = getSystemService(Context.NOTIFICATION_SERVICE) as NotificationManager

            // 1. Order Updates (High Importance with Sound & Vibration)
            val ordersChannel = NotificationChannel(
                CHANNEL_ORDERS,
                "Order Updates",
                NotificationManager.IMPORTANCE_HIGH
            ).apply {
                description = "Status alerts for your Ayurvedic remedies, order confirmation, dispatch, and delivery updates."
                enableVibration(true)
            }

            // 2. Offers & Promotions (Default Importance)
            val offersChannel = NotificationChannel(
                CHANNEL_PROMOTIONS,
                "Offers & Special Launches",
                NotificationManager.IMPORTANCE_DEFAULT
            ).apply {
                description = "Seasonal wellness discounts, Ayurvedic bundles, and new product announcements."
            }

            // 3. Wellness & Ayurvedic Tips (Default Importance)
            val wellnessChannel = NotificationChannel(
                CHANNEL_WELLNESS,
                "Ayurvedic Health & Wellness",
                NotificationManager.IMPORTANCE_DEFAULT
            ).apply {
                description = "Daily holistic wellness, seasonal regimen (Ritucharya), and sacred remedies guidance."
            }

            notificationManager.createNotificationChannels(listOf(ordersChannel, offersChannel, wellnessChannel))
        }
    }

    override fun newImageLoader(): ImageLoader {
        return ImageLoader.Builder(this)
            .memoryCache {
                MemoryCache.Builder(this)
                    .maxSizePercent(0.25)
                    .build()
            }
            .diskCache {
                DiskCache.Builder()
                    .directory(cacheDir.resolve("image_cache"))
                    .maxSizePercent(0.02)
                    .build()
            }
            .respectCacheHeaders(false) // aggressively cache
            .build()
    }

    companion object {
        const val CHANNEL_ORDERS = "ayurdhara_order_updates"
        const val CHANNEL_PROMOTIONS = "ayurdhara_promotions"
        const val CHANNEL_WELLNESS = "ayurdhara_wellness"
    }
}