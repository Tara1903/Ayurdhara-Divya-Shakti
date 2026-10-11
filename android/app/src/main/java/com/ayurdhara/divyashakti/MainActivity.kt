package com.ayurdhara.divyashakti

import android.Manifest
import android.content.pm.PackageManager
import android.os.Build
import android.os.Bundle
import android.util.Log
import androidx.activity.ComponentActivity
import androidx.activity.compose.setContent
import androidx.activity.result.contract.ActivityResultContracts
import androidx.activity.viewModels
import androidx.compose.runtime.collectAsState
import androidx.core.content.ContextCompat
import androidx.core.splashscreen.SplashScreen.Companion.installSplashScreen
import androidx.core.view.WindowCompat
import com.ayurdhara.core.designsystem.theme.AyurdharaTheme
import com.ayurdhara.divyashakti.navigation.AppNavigation
import com.ayurdhara.divyashakti.presentation.MainViewModel
import com.google.firebase.messaging.FirebaseMessaging
import dagger.hilt.android.AndroidEntryPoint

@AndroidEntryPoint
class MainActivity : ComponentActivity() {
    private val viewModel: MainViewModel by viewModels()

    private val notificationPermissionLauncher = registerForActivityResult(
        ActivityResultContracts.RequestPermission()
    ) { isGranted ->
        Log.d("AyurdharaApp", "Notification permission status: $isGranted")
    }

    override fun onCreate(savedInstanceState: Bundle?) {
        val splashScreen = installSplashScreen()
        super.onCreate(savedInstanceState)

        requestNotificationPermission()
        fetchFcmToken()

        splashScreen.setKeepOnScreenCondition {
            viewModel.startDestination.value == null
        }

        WindowCompat.setDecorFitsSystemWindows(window, false)
        window.statusBarColor = android.graphics.Color.TRANSPARENT
        window.navigationBarColor = android.graphics.Color.TRANSPARENT
        setContent {
            val themeMode = viewModel.themeMode.collectAsState().value
            val systemDark = androidx.compose.foundation.isSystemInDarkTheme()
            val dark = when (themeMode) {
                "LIGHT" -> false
                "DARK" -> true
                else -> systemDark
            }
            AyurdharaTheme(darkTheme = dark) {
                androidx.compose.runtime.LaunchedEffect(dark) {
                    val c = WindowCompat.getInsetsController(window, window.decorView)
                    c.isAppearanceLightStatusBars = !dark
                    c.isAppearanceLightNavigationBars = !dark
                }
                val startDestination = viewModel.startDestination.collectAsState().value
                val networkState = viewModel.networkState.collectAsState().value
                val userName = viewModel.userName.collectAsState().value
                if (startDestination != null) {
                    AppNavigation(startDestination, networkState, userName = userName)
                }
            }
        }
    }

    private fun requestNotificationPermission() {
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.TIRAMISU) {
            if (ContextCompat.checkSelfPermission(
                    this,
                    Manifest.permission.POST_NOTIFICATIONS
                ) != PackageManager.PERMISSION_GRANTED
            ) {
                notificationPermissionLauncher.launch(Manifest.permission.POST_NOTIFICATIONS)
            }
        }
    }

    private fun fetchFcmToken() {
        try {
            FirebaseMessaging.getInstance().token.addOnCompleteListener { task ->
                if (task.isSuccessful) {
                    val token = task.result
                    Log.d("AyurdharaApp", "Firebase Messaging Token: $token")
                } else {
                    Log.w("AyurdharaApp", "Fetching FCM token failed", task.exception)
                }
            }
        } catch (e: Exception) {
            Log.w("AyurdharaApp", "Firebase initialization deferred: ${e.message}")
        }
    }
}