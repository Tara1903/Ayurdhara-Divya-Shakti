package com.ayurdhara.divyashakti

import android.os.Bundle
import androidx.activity.ComponentActivity
import androidx.activity.compose.setContent
import androidx.core.view.WindowCompat
import dagger.hilt.android.AndroidEntryPoint
import com.ayurdhara.core.designsystem.theme.AyurdharaTheme
import com.ayurdhara.divyashakti.navigation.AppNavigation

import androidx.core.splashscreen.SplashScreen.Companion.installSplashScreen
import androidx.activity.viewModels
import androidx.compose.runtime.collectAsState
import com.ayurdhara.divyashakti.presentation.MainViewModel

@AndroidEntryPoint
class MainActivity : ComponentActivity() {
    private val viewModel: MainViewModel by viewModels()

    override fun onCreate(savedInstanceState: Bundle?) {
        val splashScreen = installSplashScreen()
        super.onCreate(savedInstanceState)
        
        splashScreen.setKeepOnScreenCondition {
            viewModel.startDestination.value == null
        }

        WindowCompat.setDecorFitsSystemWindows(window, false)
        window.statusBarColor = android.graphics.Color.TRANSPARENT
        window.navigationBarColor = android.graphics.Color.TRANSPARENT
        setContent {
            AyurdharaTheme {
                val dark = androidx.compose.foundation.isSystemInDarkTheme()
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
}