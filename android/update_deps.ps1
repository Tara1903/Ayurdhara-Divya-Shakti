$LibsToml = Join-Path $PSScriptRoot "gradle\libs.versions.toml"
$Content = Get-Content $LibsToml -Raw
$Content = $Content -replace '\[versions\]', "[versions]
coreSplashscreen = `"1.0.1`""
$Content = $Content -replace '\[libraries\]', "[libraries]
androidx-core-splashscreen = { group = `"androidx.core`", name = `"core-splashscreen`", version.ref = `"coreSplashscreen`" }"
[System.IO.File]::WriteAllText($LibsToml, $Content, [System.Text.Encoding]::UTF8)

$AppBuild = Join-Path $PSScriptRoot "app\build.gradle.kts"
$AppContent = Get-Content $AppBuild -Raw
$AppContent = $AppContent -replace 'implementation\(libs.androidx.core.ktx\)', "implementation(libs.androidx.core.ktx)
    implementation(libs.androidx.core.splashscreen)
    implementation(libs.coil.compose)"
[System.IO.File]::WriteAllText($AppBuild, $AppContent, [System.Text.Encoding]::UTF8)