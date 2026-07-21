$project = "ayurdhara-divya-shakti"

Write-Host "Ayurdhara Divya Shakti - Production Deployment Configurator" -ForegroundColor Cyan
Write-Host "--------------------------------------------------------"

$siteUrl = Read-Host "Enter your Production Domain (e.g. https://ayurdharadivyashakti.com)"
$supaUrl = Read-Host "Enter your Supabase Project URL (e.g. https://xyz.supabase.co)"
$supaAnon = Read-Host "Enter your Supabase public/anon key"
$supaRole = Read-Host "Enter your Supabase service_role key (HIDDEN)" -AsSecureString

$supaRolePlain = [System.Runtime.InteropServices.Marshal]::PtrToStringAuto([System.Runtime.InteropServices.Marshal]::SecureStringToBSTR($supaRole))

Write-Host "`nUploading to Vercel... Please wait." -ForegroundColor Yellow

$env:Path = [System.Environment]::GetEnvironmentVariable("Path","Machine") + ";" + [System.Environment]::GetEnvironmentVariable("Path","User")

echo $siteUrl | vercel env add NEXT_PUBLIC_SITE_URL production
echo $siteUrl | vercel env add NEXT_PUBLIC_SITE_URL preview
echo $siteUrl | vercel env add NEXT_PUBLIC_SITE_URL development

echo $supaUrl | vercel env add NEXT_PUBLIC_SUPABASE_URL production
echo $supaUrl | vercel env add NEXT_PUBLIC_SUPABASE_URL preview
echo $supaUrl | vercel env add NEXT_PUBLIC_SUPABASE_URL development

echo $supaAnon | vercel env add NEXT_PUBLIC_SUPABASE_ANON_KEY production
echo $supaAnon | vercel env add NEXT_PUBLIC_SUPABASE_ANON_KEY preview
echo $supaAnon | vercel env add NEXT_PUBLIC_SUPABASE_ANON_KEY development

echo $supaRolePlain | vercel env add SUPABASE_SERVICE_ROLE_KEY production
echo $supaRolePlain | vercel env add SUPABASE_SERVICE_ROLE_KEY preview

Write-Host "`nEnvironment variables uploaded successfully!" -ForegroundColor Green
Write-Host "You can now run 'vercel --prod' to deploy your application." -ForegroundColor Cyan
