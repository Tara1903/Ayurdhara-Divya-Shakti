enableFeaturePreview("TYPESAFE_PROJECT_ACCESSORS")
pluginManagement {
    repositories {
        google()
        mavenCentral()
        gradlePluginPortal()
    }
}
dependencyResolutionManagement {
    repositoriesMode.set(RepositoriesMode.FAIL_ON_PROJECT_REPOS)
    repositories {
        google()
        mavenCentral()
    }
}

rootProject.name = "AyurdharaDivyaShakti"
include(":app")
include(":core:common")
include(":core:designsystem")
include(":core:network")
include(":core:database")
include(":core:datastore")
include(":core:testing")
include(":core:logging")

include(":feature:auth")
include(":feature:home")
include(":feature:shop")
include(":feature:cart")
include(":feature:profile")
include(":feature:search")
include(":feature:orders")
include(":feature:commerce")
include(":feature:settings")
include(":feature:blog")
include(":feature:support")
include(":feature:onboarding")