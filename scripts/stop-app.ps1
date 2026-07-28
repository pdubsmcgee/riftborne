$ErrorActionPreference = 'Stop'
$projectRoot = Split-Path -Parent $PSScriptRoot
$pidPath = Join-Path $projectRoot 'data\riftborne-command.pid'

try {
  if (-not (Test-Path -LiteralPath $pidPath)) { exit 0 }
  $record = Get-Content -LiteralPath $pidPath -Raw | ConvertFrom-Json
  $savedPid = [int]$record.pid
  $expectedStart = [DateTime]::Parse([string]$record.startedAtUtc).ToUniversalTime()
  $process = Get-Process -Id $savedPid -ErrorAction SilentlyContinue
  if ($process -and $process.ProcessName -eq 'node') {
    $actualStart = $process.StartTime.ToUniversalTime()
    if ([Math]::Abs(($actualStart - $expectedStart).TotalSeconds) -lt 2) {
      Stop-Process -Id $savedPid -ErrorAction Stop
    }
  }
  Remove-Item -LiteralPath $pidPath -Force -ErrorAction SilentlyContinue
} catch {
  try {
    Add-Type -AssemblyName PresentationFramework
    [System.Windows.MessageBox]::Show($_.Exception.Message, 'Riftborne Command', 'OK', 'Error') | Out-Null
  } catch {
    Write-Error $_.Exception.Message
  }
  exit 1
}
