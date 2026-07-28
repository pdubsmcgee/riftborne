param(
  [switch]$NoBrowser,
  [switch]$Rebuild
)

$ErrorActionPreference = 'Stop'
$projectRoot = Split-Path -Parent $PSScriptRoot
$appUrl = 'http://127.0.0.1:4317'
$healthUrl = "$appUrl/api/health"
$dataDirectory = Join-Path $projectRoot 'data'
$pidPath = Join-Path $dataDirectory 'riftborne-command.pid'
$logPath = Join-Path $dataDirectory 'riftborne-command.log'
$errorLogPath = Join-Path $dataDirectory 'riftborne-command.error.log'

function Test-AppReady {
  try {
    $response = Invoke-WebRequest -UseBasicParsing -Uri $healthUrl -TimeoutSec 2
    return $response.StatusCode -eq 200
  } catch {
    return $false
  }
}

function Show-LauncherError([string]$message) {
  try {
    Add-Type -AssemblyName PresentationFramework
    [System.Windows.MessageBox]::Show($message, 'Riftborne Command', 'OK', 'Error') | Out-Null
  } catch {
    Write-Error $message
  }
}

try {
  Set-Location -LiteralPath $projectRoot

  if (Test-AppReady) {
    if (-not $NoBrowser) { Start-Process $appUrl }
    exit 0
  }

  $node = Get-Command node.exe -ErrorAction SilentlyContinue
  $npm = Get-Command npm.cmd -ErrorAction SilentlyContinue
  if (-not $node -or -not $npm) {
    throw 'Node.js is required. Install the current Node.js LTS release, then open Riftborne Command again.'
  }

  if (-not (Test-Path -LiteralPath (Join-Path $projectRoot 'node_modules'))) {
    & $npm.Source install
    if ($LASTEXITCODE -ne 0) { throw 'Dependency installation failed. Check your internet connection and try again.' }
  }

  $serverEntry = Join-Path $projectRoot 'dist-server\server\index.js'
  $webEntry = Join-Path $projectRoot 'dist\index.html'
  if ($Rebuild -or -not (Test-Path -LiteralPath $serverEntry) -or -not (Test-Path -LiteralPath $webEntry)) {
    & $npm.Source run build
    if ($LASTEXITCODE -ne 0) { throw 'The application build failed. Run npm.cmd run build in the project folder for details.' }
  }

  New-Item -ItemType Directory -Force -Path $dataDirectory | Out-Null
  if (Test-Path -LiteralPath $pidPath) { Remove-Item -LiteralPath $pidPath -Force }
  $process = Start-Process -FilePath $node.Source -ArgumentList 'dist-server/server/index.js' -WorkingDirectory $projectRoot -WindowStyle Hidden -RedirectStandardOutput $logPath -RedirectStandardError $errorLogPath -PassThru
  @{
    pid = $process.Id
    startedAtUtc = $process.StartTime.ToUniversalTime().ToString('o')
  } | ConvertTo-Json -Compress | Set-Content -LiteralPath $pidPath -Encoding ASCII

  $ready = $false
  for ($attempt = 0; $attempt -lt 40; $attempt++) {
    Start-Sleep -Milliseconds 250
    if ($process.HasExited) { break }
    if (Test-AppReady) { $ready = $true; break }
  }

  if (-not $ready) {
    if (-not $process.HasExited) { Stop-Process -Id $process.Id -ErrorAction SilentlyContinue }
    throw 'Riftborne Command did not start in time. Run npm.cmd start in the project folder for diagnostic output.'
  }

  if (-not $NoBrowser) { Start-Process $appUrl }
} catch {
  Show-LauncherError $_.Exception.Message
  exit 1
}
