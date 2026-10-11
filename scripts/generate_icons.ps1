Add-Type -AssemblyName System.Drawing

$srcPath = "C:\Users\taras\.gemini\antigravity\brain\9863e115-fa61-4ee9-8795-c2c5c4b2dade\.user_uploaded\media_1791393496055.jpg"
$source = [System.Drawing.Bitmap]::FromFile($srcPath)

function Generate-Image {
    param (
        [System.Drawing.Bitmap]$src,
        [int]$targetW,
        [int]$targetH,
        [float]$scale,
        [string]$outPath,
        [bool]$transparent = $true
    )
    $dir = Split-Path $outPath
    if (!(Test-Path $dir)) {
        New-Item -ItemType Directory -Path $dir -Force | Out-Null
    }
    $canvas = New-Object System.Drawing.Bitmap($targetW, $targetH, [System.Drawing.Imaging.PixelFormat]::Format32bppArgb)
    $g = [System.Drawing.Graphics]::FromImage($canvas)
    $g.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
    $g.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::HighQuality
    $g.PixelOffsetMode = [System.Drawing.Drawing2D.PixelOffsetMode]::HighQuality

    if ($transparent) {
        $g.Clear([System.Drawing.Color]::Transparent)
    } else {
        $g.Clear([System.Drawing.Color]::White)
    }

    $destW = [int]($targetW * $scale)
    $destH = [int]($targetH * $scale)
    $destX = [int](($targetW - $destW) / 2)
    $destY = [int](($targetH - $destH) / 2)

    $rect = New-Object System.Drawing.Rectangle($destX, $destY, $destW, $destH)
    $g.DrawImage($src, $rect)
    $g.Dispose()

    $canvas.Save($outPath, [System.Drawing.Imaging.ImageFormat]::Png)
    $canvas.Dispose()
    Write-Output "Generated: $outPath ($targetW x $targetH, scale: $scale)"
}

# 1. High-Res in-app logo drawables (1024x1024, scale 1.0, uncropped full logo)
Generate-Image $source 1024 1024 1.0 "C:\Web Apps\Ayurdhara Divya Shakti\android\core\designsystem\src\main\res\drawable\ic_ayurdhara_logo.png" $false
Generate-Image $source 1024 1024 1.0 "C:\Web Apps\Ayurdhara Divya Shakti\android\app\src\main\res\drawable\ic_ayurdhara_logo.png" $false

# 2. Adaptive Icon Foreground (1024x1024 canvas, scale 0.62 so 100% inside circular/squircle mask)
Generate-Image $source 1024 1024 0.62 "C:\Web Apps\Ayurdhara Divya Shakti\android\app\src\main\res\drawable\ic_launcher_foreground.png" $true

# 3. Density-specific mipmap adaptive foregrounds (108dp at various densities)
# mdpi = 108px, hdpi = 162px, xhdpi = 216px, xxhdpi = 324px, xxxhdpi = 432px
Generate-Image $source 108 108 0.62 "C:\Web Apps\Ayurdhara Divya Shakti\android\app\src\main\res\mipmap-mdpi\ic_launcher_foreground.png" $true
Generate-Image $source 162 162 0.62 "C:\Web Apps\Ayurdhara Divya Shakti\android\app\src\main\res\mipmap-hdpi\ic_launcher_foreground.png" $true
Generate-Image $source 216 216 0.62 "C:\Web Apps\Ayurdhara Divya Shakti\android\app\src\main\res\mipmap-xhdpi\ic_launcher_foreground.png" $true
Generate-Image $source 324 324 0.62 "C:\Web Apps\Ayurdhara Divya Shakti\android\app\src\main\res\mipmap-xxhdpi\ic_launcher_foreground.png" $true
Generate-Image $source 432 432 0.62 "C:\Web Apps\Ayurdhara Divya Shakti\android\app\src\main\res\mipmap-xxxhdpi\ic_launcher_foreground.png" $true

# 4. Standard legacy mipmap icons (48, 72, 96, 144, 192) - slightly padded scale 0.90 so clean
Generate-Image $source 48 48 0.90 "C:\Web Apps\Ayurdhara Divya Shakti\android\app\src\main\res\mipmap-mdpi\ic_launcher.png" $false
Generate-Image $source 48 48 0.82 "C:\Web Apps\Ayurdhara Divya Shakti\android\app\src\main\res\mipmap-mdpi\ic_launcher_round.png" $false

Generate-Image $source 72 72 0.90 "C:\Web Apps\Ayurdhara Divya Shakti\android\app\src\main\res\mipmap-hdpi\ic_launcher.png" $false
Generate-Image $source 72 72 0.82 "C:\Web Apps\Ayurdhara Divya Shakti\android\app\src\main\res\mipmap-hdpi\ic_launcher_round.png" $false

Generate-Image $source 96 96 0.90 "C:\Web Apps\Ayurdhara Divya Shakti\android\app\src\main\res\mipmap-xhdpi\ic_launcher.png" $false
Generate-Image $source 96 96 0.82 "C:\Web Apps\Ayurdhara Divya Shakti\android\app\src\main\res\mipmap-xhdpi\ic_launcher_round.png" $false

Generate-Image $source 144 144 0.90 "C:\Web Apps\Ayurdhara Divya Shakti\android\app\src\main\res\mipmap-xxhdpi\ic_launcher.png" $false
Generate-Image $source 144 144 0.82 "C:\Web Apps\Ayurdhara Divya Shakti\android\app\src\main\res\mipmap-xxhdpi\ic_launcher_round.png" $false

Generate-Image $source 192 192 0.90 "C:\Web Apps\Ayurdhara Divya Shakti\android\app\src\main\res\mipmap-xxxhdpi\ic_launcher.png" $false
Generate-Image $source 192 192 0.82 "C:\Web Apps\Ayurdhara Divya Shakti\android\app\src\main\res\mipmap-xxxhdpi\ic_launcher_round.png" $false

# 5. Play Store Icon (512x512)
Generate-Image $source 512 512 0.92 "C:\Web Apps\Ayurdhara Divya Shakti\android\play_store_icon.png" $false
Generate-Image $source 512 512 0.92 "C:\Web Apps\Ayurdhara Divya Shakti\public\play_store_icon.png" $false

# 6. Web Storefront Logos
Generate-Image $source 1024 1024 1.0 "C:\Web Apps\Ayurdhara Divya Shakti\public\images\logo.png" $false
Generate-Image $source 1024 1024 1.0 "C:\Web Apps\Ayurdhara Divya Shakti\public\images\full-logo.png" $false
Generate-Image $source 1024 1024 1.0 "C:\Web Apps\Ayurdhara Divya Shakti\public\images\raw_logo.png" $false

$source.Dispose()
Write-Output "ALL ASSETS GENERATED SUCCESSFULLY!"
