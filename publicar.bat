@echo off
rem Publica o site da Contelb na KingHost (abre um menu com as opcoes).
powershell -NoProfile -ExecutionPolicy Bypass -File "%~dp0publicar.ps1" %*
pause
