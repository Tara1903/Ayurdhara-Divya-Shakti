package com.ayurdhara.divyashakti.services

import android.app.NotificationManager
import android.app.PendingIntent
import android.content.Context
import android.content.Intent
import android.media.RingtoneManager
import android.net.Uri
import android.util.Log
import androidx.core.app.NotificationCompat
import com.ayurdhara.divyashakti.AyurdharaApp
import com.ayurdhara.divyashakti.MainActivity
import com.ayurdhara.divyashakti.R
import com.google.firebase.messaging.FirebaseMessagingService
import com.google.firebase.messaging.RemoteMessage

class AyurdharaFirebaseMessagingService : FirebaseMessagingService() {

    override fun onNewToken(token: String) {
        super.onNewToken(token)
        Log.d(TAG, "New Firebase FCM Registration Token: $token")
        // Token is logged and can be synchronized to the backend / user profile
    }

    override fun onMessageReceived(remoteMessage: RemoteMessage) {
        super.onMessageReceived(remoteMessage)
        Log.d(TAG, "Push message received from: ${remoteMessage.from}")

        val title = remoteMessage.notification?.title
            ?: remoteMessage.data["title"]
            ?: "Ayurdhara Divya Shakti"

        val body = remoteMessage.notification?.body
            ?: remoteMessage.data["body"]
            ?: "New Ayurvedic wellness update"

        val type = remoteMessage.data["type"] ?: "order"
        val targetUrl = remoteMessage.data["target_url"]

        sendNotification(title, body, type, targetUrl)
    }

    private fun sendNotification(title: String, body: String, type: String, targetUrl: String?) {
        val channelId = when (type.lowercase()) {
            "order", "order_update" -> AyurdharaApp.CHANNEL_ORDERS
            "promo", "offer", "discount" -> AyurdharaApp.CHANNEL_PROMOTIONS
            else -> AyurdharaApp.CHANNEL_WELLNESS
        }

        val intent = Intent(this, MainActivity::class.java).apply {
            flags = Intent.FLAG_ACTIVITY_CLEAR_TOP or Intent.FLAG_ACTIVITY_SINGLE_TOP
            if (!targetUrl.isNullOrBlank()) {
                data = Uri.parse(targetUrl)
            }
        }

        val pendingIntent = PendingIntent.getActivity(
            this,
            System.currentTimeMillis().toInt(),
            intent,
            PendingIntent.FLAG_ONE_SHOT or PendingIntent.FLAG_IMMUTABLE
        )

        val defaultSoundUri = RingtoneManager.getDefaultUri(RingtoneManager.TYPE_NOTIFICATION)
        val notificationBuilder = NotificationCompat.Builder(this, channelId)
            .setSmallIcon(R.drawable.ic_stat_notification)
            .setColor(getColor(R.color.primary))
            .setContentTitle(title)
            .setContentText(body)
            .setAutoCancel(true)
            .setSound(defaultSoundUri)
            .setContentIntent(pendingIntent)
            .setPriority(NotificationCompat.PRIORITY_HIGH)
            .setStyle(NotificationCompat.BigTextStyle().bigText(body))

        val notificationManager = getSystemService(Context.NOTIFICATION_SERVICE) as NotificationManager
        val notificationId = (System.currentTimeMillis() % 100000).toInt()
        notificationManager.notify(notificationId, notificationBuilder.build())
    }

    companion object {
        private const val TAG = "AyurdharaFCM"
    }
}
