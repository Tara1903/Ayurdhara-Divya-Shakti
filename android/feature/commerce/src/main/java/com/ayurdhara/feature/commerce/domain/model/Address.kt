package com.ayurdhara.feature.commerce.domain.model

data class Address(
    val id: String,
    val type: String,
    val name: String,
    val phone: String,
    val pincode: String,
    val state: String,
    val city: String,
    val line1: String,
    val landmark: String?,
    val isDefault: Boolean
)