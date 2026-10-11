# ──────────────────────────────────────────────────────────────────────────────
# Ayurdhara Divya Shakti — ProGuard / R8 Rules
# ──────────────────────────────────────────────────────────────────────────────

# ── 1. App package: keep everything ──────────────────────────────────────────
-keep class com.ayurdhara.** { *; }
-keepclassmembers class com.ayurdhara.** { *; }

# ── 2. Kotlin reflection & coroutines ────────────────────────────────────────
-keep class kotlin.** { *; }
-keep class kotlin.Metadata { *; }
-keepclassmembers class kotlin.Metadata { *; }
-dontwarn kotlin.**
-keepclassmembers class kotlinx.coroutines.** { *; }
-dontwarn kotlinx.coroutines.**

# ── 3. Kotlinx Serialization ─────────────────────────────────────────────────
-keepattributes *Annotation*, InnerClasses
-dontnote kotlinx.serialization.AnnotationsKt
-keepclassmembers class kotlinx.serialization.json.** { *** Companion; }
-keepclasseswithmembers class kotlinx.serialization.** { *; }
-keep class kotlinx.serialization.** { *; }
-keep @kotlinx.serialization.Serializable class * { *; }
-keepclassmembers @kotlinx.serialization.Serializable class * {
    *** Companion;
    *** serializer();
    static ** $serializer;
    private static final ** $childSerializers;
}
-dontwarn kotlinx.serialization.**

# ── 4. Supabase (gotrue + postgrest + storage + realtime) ────────────────────
-keep class io.github.jan.supabase.** { *; }
-keepclassmembers class io.github.jan.supabase.** { *; }
-keep interface io.github.jan.supabase.** { *; }
-keepnames class io.github.jan.supabase.** { *; }
-dontwarn io.github.jan.supabase.**
# Supabase uses reflection to access internal KClass descriptors
-keepattributes Signature, RuntimeVisibleAnnotations, AnnotationDefault
# GoTrue auth objects
-keep class io.github.jan.supabase.gotrue.** { *; }
-keep class io.github.jan.supabase.gotrue.user.** { *; }
-keep class io.github.jan.supabase.gotrue.providers.** { *; }

# ── 5. Ktor HTTP Client ───────────────────────────────────────────────────────
-keep class io.ktor.** { *; }
-keepclassmembers class io.ktor.** { *; }
-keep interface io.ktor.** { *; }
-keep class io.ktor.client.** { *; }
-keep class io.ktor.client.engine.cio.** { *; }
-keep class io.ktor.client.plugins.** { *; }
-keep class io.ktor.http.** { *; }
-keep class io.ktor.utils.** { *; }
-dontwarn io.ktor.**
-dontwarn org.slf4j.**

# ── 6. Hilt / Dagger ─────────────────────────────────────────────────────────
-keep class dagger.** { *; }
-keep class dagger.hilt.** { *; }
-keepclassmembers class dagger.hilt.** { *; }
-keep class javax.inject.** { *; }
-keep @dagger.hilt.android.HiltAndroidApp class * { *; }
-keep @dagger.hilt.android.AndroidEntryPoint class * { *; }
-dontwarn dagger.**
-dontwarn dagger.hilt.**

# ── 7. AndroidX Compose Navigation ───────────────────────────────────────────
-keep class androidx.navigation.** { *; }
-keepclassmembers class androidx.navigation.** { *; }
-dontwarn androidx.navigation.**

# ── 8. AndroidX Compose ──────────────────────────────────────────────────────
-keep class androidx.compose.** { *; }
-keepclassmembers class androidx.compose.** { *; }
-dontwarn androidx.compose.**

# ── 9. Lifecycle / ViewModel ─────────────────────────────────────────────────
-keep class androidx.lifecycle.** { *; }
-keepclassmembers class * extends androidx.lifecycle.ViewModel { <init>(); }
-keepclassmembers class * implements androidx.lifecycle.LifecycleOwner { *; }
-dontwarn androidx.lifecycle.**

# ── 10. Firebase & Google Services ───────────────────────────────────────────
-keep class com.google.firebase.** { *; }
-keepclassmembers class com.google.firebase.** { *; }
-keep class com.google.android.gms.** { *; }
-keepclassmembers class com.google.android.gms.** { *; }
-dontwarn com.google.firebase.**
-dontwarn com.google.android.gms.**

# ── 11. Coil image loader ─────────────────────────────────────────────────────
-keep class coil.** { *; }
-keepclassmembers class coil.** { *; }
-dontwarn coil.**

# ── 12. Annotations — keep all metadata needed for reflection ────────────────
-keepattributes Signature
-keepattributes *Annotation*
-keepattributes Exceptions
-keepattributes InnerClasses
-keepattributes EnclosingMethod

# ── 13. Data / Model classes — keep field names for JSON deserialization ──────
-keepclassmembers class * {
    @com.google.gson.annotations.SerializedName <fields>;
}
# Generic: keep any class whose fields are annotated (Supabase / kotlinx.serialization)
-keepclassmembers class * {
    @kotlinx.serialization.SerialName <fields>;
    @kotlinx.serialization.Serializable <fields>;
}

# ── 14. Misc third-party warnings ─────────────────────────────────────────────
-dontwarn javax.annotation.**
-dontwarn sun.misc.**
-dontwarn java.lang.instrument.**
-dontwarn okhttp3.**
-dontwarn okio.**
-dontnote **

# ── 15. Keep @Keep annotated members ─────────────────────────────────────────
-keepclassmembers class * {
    @androidx.annotation.Keep *;
}
-keep @androidx.annotation.Keep class * { *; }