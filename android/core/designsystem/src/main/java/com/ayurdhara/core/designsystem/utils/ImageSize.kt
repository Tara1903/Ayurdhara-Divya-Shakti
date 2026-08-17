package com.ayurdhara.core.designsystem.utils

enum class ImageSize {
    Thumbnail, Medium, HighRes
}

fun String.optimizeForSize(size: ImageSize): String {
    // For now, this is a placeholder. If using Supabase Storage transformations, 
    // we would append transform params here (e.g. ?width=200).
    return this
}