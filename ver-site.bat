@echo off
rem Abre a pre-visualizacao do site da Contelb no navegador (nao precisa instalar nada).
powershell -NoProfile -ExecutionPolicy Bypass -File "%~dp0ver-site.ps1"
if errorlevel 1 pause
