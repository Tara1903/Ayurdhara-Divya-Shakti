package com.ayurdhara.divyashakti.navigation

import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.padding
import androidx.compose.material3.*
import androidx.compose.runtime.*
import androidx.compose.ui.Modifier
import androidx.navigation.NavDestination.Companion.hierarchy
import androidx.navigation.compose.*
import com.ayurdhara.core.designsystem.components.NetworkBanner
import com.ayurdhara.core.network.monitor.NetworkState
import com.ayurdhara.feature.auth.presentation.ui.*
import com.ayurdhara.feature.home.presentation.ui.HomeScreen
import com.ayurdhara.feature.search.presentation.ui.SearchScreen
import com.ayurdhara.feature.onboarding.presentation.ui.OnboardingScreen
import com.ayurdhara.core.designsystem.utils.rememberAyurdharaHapticFeedback

@Composable
fun AppNavigation(startDestination: String, networkState: NetworkState) {
    val navController = rememberNavController()
    val haptic = rememberAyurdharaHapticFeedback()

    Scaffold(
        bottomBar = {
            val navBackStackEntry by navController.currentBackStackEntryAsState()
            val currentDestination = navBackStackEntry?.destination
            val isMainGraph = currentDestination?.hierarchy?.any { it.route == Routes.MAIN_GRAPH || it.route == Routes.HOME || it.route == Routes.SEARCH || it.route == Routes.CART || it.route == Routes.PROFILE } == true

            if (isMainGraph) {
                NavigationBar {
                    NavigationBarItem(
                        selected = currentDestination?.route == Routes.HOME,
                        onClick = {
                            navController.navigate(Routes.HOME) {
                                popUpTo(Routes.HOME) { inclusive = false }
                                launchSingleTop = true
                            }
                        },
                        icon = { Text("Home") }
                    )
                    NavigationBarItem(
                        selected = currentDestination?.route == Routes.SEARCH,
                        onClick = {
                            navController.navigate(Routes.SEARCH) {
                                popUpTo(Routes.HOME) { inclusive = false }
                                launchSingleTop = true
                            }
                        },
                        icon = { Text("Search") }
                    )
                    NavigationBarItem(
                        selected = currentDestination?.route == Routes.CART,
                        onClick = {
                            navController.navigate(Routes.CART) {
                                popUpTo(Routes.HOME) { inclusive = false }
                                launchSingleTop = true
                            }
                        },
                        icon = { Text("Cart") }
                    )
                    NavigationBarItem(
                        selected = currentDestination?.route == Routes.PROFILE,
                        onClick = {
                            navController.navigate(Routes.PROFILE) {
                                popUpTo(Routes.HOME) { inclusive = false }
                                launchSingleTop = true
                            }
                        },
                        icon = { Text("Profile") }
                    )
                }
            }
        }
    ) { innerPadding ->
        Column(modifier = Modifier.padding(innerPadding)) {
            NetworkBanner(isOffline = networkState == NetworkState.Offline)
            
            NavHost(
                navController = navController,
                startDestination = startDestination,
                modifier = Modifier.weight(1f)
            ) {
                composable(Routes.ONBOARDING) {
                    OnboardingScreen(
                        onFinish = {
                            navController.navigate(Routes.AUTH_GRAPH) {
                                popUpTo(Routes.ONBOARDING) { inclusive = true }
                            }
                        }
                    )
                }

                navigation(startDestination = Routes.LOGIN, route = Routes.AUTH_GRAPH) {
                    composable(Routes.LOGIN) {
                        LoginScreen(
                            onNavigateToRegister = { navController.navigate(Routes.REGISTER) },
                            onNavigateToHome = {
                                navController.navigate(Routes.MAIN_GRAPH) {
                                    popUpTo(Routes.AUTH_GRAPH) { inclusive = true }
                                }
                            }
                        )
                    }
                    composable(Routes.REGISTER) {
                        RegisterScreen(
                            onNavigateToLogin = { navController.popBackStack() }
                        )
                    }
                    composable(Routes.FORGOT_PASSWORD) {
                        ForgotPasswordScreen(
                            onNavigateToOtp = { navController.navigate(Routes.OTP) }
                        )
                    }
                    composable(Routes.OTP) {
                        OtpScreen(
                            onNavigateToReset = { /* Reset Password Flow */ }
                        )
                    }
                }

                navigation(startDestination = Routes.HOME, route = Routes.MAIN_GRAPH) {
                    composable(Routes.HOME) {
                        HomeScreen()
                    }
                    composable(Routes.SEARCH) {
                        SearchScreen()
                    }
                    composable(Routes.CART) {
                        // CartScreen()
                    }
                    composable(Routes.PROFILE) {
                        // ProfileScreen()
                    }
                }
            }
        }
    }
}