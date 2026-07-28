@echo off
start "Riftborne Command" powershell.exe -NoProfile -ExecutionPolicy Bypass -WindowStyle Hidden -File "%~dp0scripts\stop-app.ps1"
