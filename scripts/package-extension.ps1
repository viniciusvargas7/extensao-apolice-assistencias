[CmdletBinding()]
param(
  [string]$Name = 'gerador-apolices-qa'
)

$projectRoot = Split-Path -Parent $PSScriptRoot
$extensionPath = [System.IO.Path]::GetFullPath((Join-Path $projectRoot 'extension'))
$distPath = [System.IO.Path]::GetFullPath((Join-Path $projectRoot 'dist'))

if (-not (Test-Path -LiteralPath (Join-Path $extensionPath 'manifest.json'))) {
  throw 'A pasta extension não contém manifest.json.'
}

if (-not $distPath.StartsWith([System.IO.Path]::GetFullPath($projectRoot), [System.StringComparison]::OrdinalIgnoreCase)) {
  throw 'O diretório de saída está fora do projeto.'
}

New-Item -ItemType Directory -Path $distPath -Force | Out-Null
$zipPath = Join-Path $distPath "$Name.zip"

if (Test-Path -LiteralPath $zipPath) {
  Remove-Item -LiteralPath $zipPath -Force
}

Compress-Archive -Path (Join-Path $extensionPath '*') -DestinationPath $zipPath -CompressionLevel Optimal
Write-Output $zipPath
