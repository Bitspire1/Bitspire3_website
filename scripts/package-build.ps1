param(
    [string]$Output = "deploy.zip"
)

Write-Host "Packaging production build into $Output"

if (Test-Path $Output) { Remove-Item $Output -Force }

Write-Host "Running: npm ci --production"
npm ci --production

Write-Host "Running: npm run build"
npm run build

$items = @(
  ".next",
  "public",
  "package.json",
  "package-lock.json",
  "node_modules",
  "scripts",
  "shims",
  "postcss.config.cjs",
  "postcss.config.js",
  "next.config.ts",
  "app.js",
  "tina"
)

# Filter items that exist
$toCompress = $items | Where-Object { Test-Path $_ }

if ($toCompress.Count -eq 0) {
    Write-Error "No files found to compress"
    exit 1
}

Write-Host "Compressing: $($toCompress -join ', ')"
Compress-Archive -Path $toCompress -DestinationPath $Output -Force

Write-Host "Created $Output"
