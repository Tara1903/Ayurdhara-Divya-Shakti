-keep class com.ayurdhara.** { *; }
-keepclassmembers class * {
    @androidx.annotation.Keep *;
}
# Optimize and obfuscate
-repackageclasses ''
-allowaccessmodification
-optimizations !code/simplification/arithmetic,!field/*,!class/merging/*
-keepattributes Signature,*Annotation*,Exceptions