import java.util.Properties

val localProperties = Properties()
val localPropertiesFile = rootProject.file("local.properties")
if (localPropertiesFile.exists()) {
    localProperties.load(localPropertiesFile.inputStream())
}

val supabaseUrl: String = localProperties.getProperty("SUPABASE_URL") ?: "https://placeholder.supabase.co"
val supabaseAnonKey: String = localProperties.getProperty("SUPABASE_ANON_KEY") ?: "placeholder_key"
plugins {
    alias(libs.plugins.android.library)
    alias(libs.plugins.jetbrains.kotlin.android)
    alias(libs.plugins.hilt)
    alias(libs.plugins.ksp)
    alias(libs.plugins.serialization)
}

android {
    namespace = "com.ayurdhara.core.network"
    compileSdk = 34

    buildFeatures {
        buildConfig = true
    }
    defaultConfig {
        buildConfigField("String", "SUPABASE_URL", "\"$supabaseUrl\"")
        buildConfigField("String", "SUPABASE_ANON_KEY", "\"$supabaseAnonKey\"")
        minSdk = 34
    }

    compileOptions {
        sourceCompatibility = JavaVersion.VERSION_17
        targetCompatibility = JavaVersion.VERSION_17
    }
    kotlinOptions {
        jvmTarget = "17"
    }
}

dependencies {
    implementation("com.russhwolf:multiplatform-settings:1.1.1")
    implementation(libs.androidx.core.ktx)
    implementation(libs.hilt.android)
    ksp(libs.hilt.compiler)

    // Supabase
    api(libs.supabase.gotrue)
    api(libs.supabase.postgrest)
    api(libs.supabase.storage)
    api(libs.supabase.realtime)

    // Ktor
    implementation(libs.ktor.client.core)
    implementation(libs.ktor.client.cio)

    // Serialization
    api(libs.kotlinx.serialization.json)
}