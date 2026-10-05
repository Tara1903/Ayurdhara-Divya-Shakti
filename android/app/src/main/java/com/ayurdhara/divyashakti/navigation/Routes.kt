package com.ayurdhara.divyashakti.navigation

object Routes {
    // Top-Level Graphs
    const val ROOT_GRAPH = "root_graph"
    const val AUTH_GRAPH = "auth_graph"
    const val MAIN_GRAPH = "main_graph"

    // Screens
    const val SPLASH = "splash"
    const val ONBOARDING = "onboarding"
    
    // Auth Screens
    const val LOGIN = "login"
    const val REGISTER = "register"
    const val FORGOT_PASSWORD = "forgot_password"
    const val OTP = "otp"

    // Main Tabs
    const val HOME = "home"
    const val SHOP = "shop"
    const val SEARCH = "search"
    const val CART = "cart"
    const val SETTINGS = "settings"
    const val PROFILE = "profile"

    // Detail & Flow Screens
    const val PRODUCT_DETAILS = "product_details"
    fun productRoute(slug: String): String = "product/$slug"
    const val CHECKOUT = "checkout"
    const val STARPAY_PAYMENT = "starpay_payment"
    const val ORDER_SUCCESS = "order_success"
    const val ORDER_HISTORY = "order_history"
}