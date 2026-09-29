@echo off
rem Abre a pre-visualizacao do site da Contelb no navegador.
cd /d "%~dp0site"
start "" http://localhost:8080
where py >nul 2>nul && (py -m http.server 8080 & goto :eof)
where python >nul 2>nul && (python -m http.server 8080 & goto :eof)
where npx >nul 2>nul && (npx --yes http-server -p 8080 & goto :eof)
echo Nao encontrei Python nem Node.js neste computador.
echo Instale o Python em https://www.python.org/downloads/ e rode este arquivo de novo.
pause
