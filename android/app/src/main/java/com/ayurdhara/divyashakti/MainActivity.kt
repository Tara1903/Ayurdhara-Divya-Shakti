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
        setContent {
            AyurdharaTheme {
                val startDestination = viewModel.startDestination.collectAsState().value
                val networkState = viewModel.networkState.collectAsState().value
                if (startDestination != null) {
                    AppNavigation(startDestination, networkState)
                }
            }
        }
    }
}