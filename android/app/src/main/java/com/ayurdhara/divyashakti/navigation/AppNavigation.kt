package com.ayurdhara.divyashakti.navigation

import androidx.compose.foundation.layout.*
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.Person
import androidx.compose.material.icons.filled.Search
import androidx.compose.material.icons.filled.ShoppingBag
import androidx.compose.material.icons.filled.Spa
import androidx.compose.material.icons.filled.Storefront
import androidx.compose.foundation.layout.WindowInsets
import com.ayurdhara.core.designsystem.components.AyBottomBar
import com.ayurdhara.core.designsystem.components.AyNavItem
import com.ayurdhara.core.designsystem.theme.AyTheme
import androidx.compose.material3.*
import androidx.compose.runtime.*
import androidx.compose.ui.Modifier
import androidx.hilt.navigation.compose.hiltViewModel
import androidx.navigation.NavDestination.Companion.hierarchy
import androidx.navigation.compose.*
import com.ayurdhara.core.designsystem.components.NetworkBanner
import com.ayurdhara.core.network.monitor.NetworkState
import com.ayurdhara.feature.auth.presentation.ui.*
import com.ayurdhara.feature.cart.presentation.ui.CartScreen
import com.ayurdhara.feature.cart.presentation.viewmodel.CartViewModel
import com.ayurdhara.feature.home.presentation.ui.HomeScreen
import com.ayurdhara.feature.orders.presentation.ui.OrderHistoryScreen
import com.ayurdhara.feature.profile.presentation.ui.ProfileScreen
import com.ayurdhara.feature.search.presentation.ui.SearchScreen
import com.ayurdhara.feature.shop.presentation.ui.ShopScreen
import com.ayurdhara.feature.shop.presentation.ui.ProductDetailScreen
import com.ayurdhara.feature.onboarding.presentation.ui.OnboardingScreen
import com.ayurdhara.core.designsystem.utils.rememberAyurdharaHapticFeedback

@Composable
fun AppNavigation(
    startDestination: String,
    networkState: NetworkState,
    userName: String? = null
) {
    val navController = rememberNavController()
    val haptic = rememberAyurdharaHapticFeedback()
    val cartViewModel: CartViewModel = hiltViewModel()

    val cartItems by cartViewModel.cartState.collectAsState()
    val bagCount = cartItems.filter { !it.savedForLater }.sumOf { it.quantity }
    val tabs = remember(bagCount) {
        listOf(
            Triple(Routes.HOME, AyNavItem("Home", Icons.Filled.Spa), 0),
            Triple(Routes.SHOP, AyNavItem("Shop", Icons.Filled.Storefront), 1),
            Triple(Routes.SEARCH, AyNavItem("Search", Icons.Filled.Search), 2),
            Triple(Routes.CART, AyNavItem("Bag", Icons.Filled.ShoppingBag, bagCount), 3),
            Triple(Routes.PROFILE, AyNavItem("Profile", Icons.Filled.Person), 4)
        )
    }
    val navTo: (String) -> Unit = { route ->
        navController.navigate(route) {
            popUpTo(Routes.HOME) { inclusive = false }
            launchSingleTop = true
        }
    }

    Scaffold(
        containerColor = AyTheme.colors.canvas,
        contentWindowInsets = WindowInsets(0, 0, 0, 0),
        bottomBar = {
            val navBackStackEntry by navController.currentBackStackEntryAsState()
            val currentDestination = navBackStackEntry?.destination
            val selected = tabs.indexOfFirst { it.first == currentDestination?.route }
            if (selected >= 0) {
                AyBottomBar(
                    items = tabs.map { it.second },
                    selectedIndex = selected,
                    onSelect = { i ->
                        haptic.selection()
                        navTo(tabs[i].first)
                    }
                )
            }
        }
    ) { innerPadding ->
        Box(
            modifier = Modifier
                .fillMaxSize()
                .padding(innerPadding)
        ) {
            NavHost(
                navController = navController,
                startDestination = startDestination,
                modifier = Modifier.fillMaxSize()
            ) {
                composable(Routes.ONBOARDING) {
                    OnboardingScreen(
                        onFinish = {
                            navController.navigate(Routes.MAIN_GRAPH) {
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
                                if (!navController.popBackStack(Routes.HOME, false)) {
                                    navController.navigate(Routes.MAIN_GRAPH) {
                                        popUpTo(Routes.AUTH_GRAPH) { inclusive = true }
                                    }
                                }
                            },
                            onNavigateToForgot = { navController.navigate(Routes.FORGOT_PASSWORD) }
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
                            onNavigateToReset = { navController.popBackStack(Routes.LOGIN, false) },
                            onBack = { navController.popBackStack() }
                        )
                    }
                }

                navigation(startDestination = Routes.HOME, route = Routes.MAIN_GRAPH) {
                    composable(Routes.HOME) {
                        HomeScreen(
                            userName = userName,
                            onAddToCart = { product ->
                                cartViewModel.addToCart(product)
                            },
                            onProductClick = { slug -> navController.navigate(Routes.productRoute(slug)) },
                            onShopClick = { navTo(Routes.SHOP) },
                            onCartClick = { navTo(Routes.CART) }
                        )
                    }
                    composable(Routes.SHOP) {
                        ShopScreen(
                            onAddToCart = { product ->
                                cartViewModel.addToCart(product)
                            },
                            onProductClick = { slug -> navController.navigate(Routes.productRoute(slug)) },
                            onCartClick = { navTo(Routes.CART) }
                        )
                    }
                    composable(Routes.SEARCH) {
                        SearchScreen(
                            onAddToCart = { product ->
                                cartViewModel.addToCart(product)
                            },
                            onProductClick = { slug -> navController.navigate(Routes.productRoute(slug)) }
                        )
                    }
                    composable(Routes.CART) {
                        CartScreen(
                            viewModel = cartViewModel,
                            onNavigateToCheckout = {
                                navController.navigate(Routes.CHECKOUT)
                            },
                            onProductClick = { slug -> navController.navigate(Routes.productRoute(slug)) },
                            onContinueShopping = { navTo(Routes.SHOP) }
                        )
                    }
                    composable(Routes.PROFILE) {
                        ProfileScreen(
                            onNavigateToOrders = { navController.navigate(Routes.ORDER_HISTORY) },
                            onSignedOut = {
                                navController.navigate(Routes.AUTH_GRAPH) {
                                    popUpTo(Routes.MAIN_GRAPH) { inclusive = true }
                                }
                            }
                        )
                    }
                }

                composable(Routes.CHECKOUT) {
                    com.ayurdhara.feature.cart.presentation.ui.CheckoutScreen(
                        cartViewModel = cartViewModel,
                        onBackClick = { navController.popBackStack() },
                        onProceedToStarPay = { amount, name, phone, address ->
                            val encName = java.net.URLEncoder.encode(name.ifBlank { "Rahul Sharma" }, "UTF-8")
                            val encPhone = java.net.URLEncoder.encode(phone.ifBlank { "9876543210" }, "UTF-8")
                            navController.navigate("${Routes.STARPAY_PAYMENT}?amount=$amount&name=$encName&phone=$encPhone&orderId=&token=")
                        }
                    )
                }

                composable(
                    route = "${Routes.STARPAY_PAYMENT}?amount={amount}&name={name}&phone={phone}&orderId={orderId}&token={token}",
                    arguments = listOf(
                        androidx.navigation.navArgument("amount") {
                            type = androidx.navigation.NavType.StringType
                            defaultValue = "0.0"
                        },
                        androidx.navigation.navArgument("name") {
                            type = androidx.navigation.NavType.StringType
                            defaultValue = ""
                        },
                        androidx.navigation.navArgument("phone") {
                            type = androidx.navigation.NavType.StringType
                            defaultValue = ""
                        },
                        androidx.navigation.navArgument("orderId") {
                            type = androidx.navigation.NavType.StringType
                            defaultValue = ""
                        },
                        androidx.navigation.navArgument("token") {
                            type = androidx.navigation.NavType.StringType
                            defaultValue = ""
                        }
                    )
                ) { backStackEntry ->
                    val amountStr = backStackEntry.arguments?.getString("amount") ?: "0.0"
                    val rawName = backStackEntry.arguments?.getString("name") ?: ""
                    val name = try { java.net.URLDecoder.decode(rawName, "UTF-8") } catch (_: Exception) { rawName }
                    val phone = backStackEntry.arguments?.getString("phone") ?: ""
                    val orderId = backStackEntry.arguments?.getString("orderId") ?: ""
                    val token = backStackEntry.arguments?.getString("token") ?: ""
                    val amount = amountStr.toDoubleOrNull() ?: 0.0

                    com.ayurdhara.feature.commerce.starpay.StarPayPaymentScreen(
                        orderId = orderId.ifBlank { null },
                        paymentToken = token.ifBlank { null },
                        baseAmount = amount,
                        customerName = name.ifBlank { null },
                        customerPhone = phone.ifBlank { null },
                        onClose = { navController.popBackStack() },
                        onPaymentSuccess = { orderDetails ->
                            cartViewModel.clearCart()
                            navController.navigate(Routes.ORDER_HISTORY) {
                                popUpTo(Routes.CART) { inclusive = true }
                            }
                        }
                    )
                }

                composable(Routes.ORDER_HISTORY) {
                    OrderHistoryScreen(
                        onBackClick = { navController.popBackStack() }
                    )
                }

                composable(
                    route = "product/{slug}",
                    arguments = listOf(androidx.navigation.navArgument("slug") { type = androidx.navigation.NavType.StringType })
                ) {
                    ProductDetailScreen(
                        onBackClick = { navController.popBackStack() },
                        onAddToCart = { product -> cartViewModel.addToCart(product) },
                        onGoToCart = { navTo(Routes.CART) }
                    )
                }
            }
            NetworkBanner(isOffline = networkState == NetworkState.Offline)
        }
    }
}