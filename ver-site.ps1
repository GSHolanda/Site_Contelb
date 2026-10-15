# Servidor local para pre-visualizar o site da Contelb (usa so o PowerShell do Windows).
# Uso: dois cliques em ver-site.bat. Para desligar, feche esta janela.
$ErrorActionPreference = 'Stop'
$raiz = Join-Path $PSScriptRoot 'site'
if (-not (Test-Path (Join-Path $raiz 'index.html'))) {
  Write-Host 'Nao encontrei a pasta site com o index.html.' -ForegroundColor Red
  Write-Host 'Rode "git pull" na pasta do projeto e tente de novo.'
  Read-Host 'Aperte Enter para fechar'; exit 1
}
$tipos = @{
  '.html'='text/html; charset=utf-8'; '.css'='text/css; charset=utf-8'; '.js'='text/javascript; charset=utf-8'
  '.json'='application/json'; '.xml'='application/xml'; '.txt'='text/plain; charset=utf-8'
  '.svg'='image/svg+xml'; '.png'='image/png'; '.jpg'='image/jpeg'; '.jpeg'='image/jpeg'
  '.webp'='image/webp'; '.avif'='image/avif'; '.ico'='image/x-icon'; '.woff2'='font/woff2'
}
$listener = $null
foreach ($porta in 8080, 8081, 8090, 5500) {
  try {
    $l = New-Object System.Net.HttpListener
    $l.Prefixes.Add("http://localhost:$porta/")
    $l.Start(); $listener = $l; break
  } catch { }
}
if (-not $listener) { Write-Host 'Nenhuma porta livre (8080, 8081, 8090, 5500).' -ForegroundColor Red; Read-Host 'Enter para fechar'; exit 1 }
$url = $listener.Prefixes | Select-Object -First 1
Write-Host ''
Write-Host "  Site da Contelb no ar em $url" -ForegroundColor Green
Write-Host '  Deixe esta janela aberta enquanto olha o site. Para desligar, feche a janela.'
Write-Host ''
try { Start-Process $url } catch { Write-Host "  Abra no navegador: $url" }
while ($listener.IsListening) {
  $ctx = $listener.GetContext()
  $res = $ctx.Response
  try {
    $caminho = [Uri]::UnescapeDataString($ctx.Request.Url.AbsolutePath).TrimStart('/').Replace('/', [string][IO.Path]::DirectorySeparatorChar)
    $arquivo = Join-Path $raiz $caminho
    if ((Test-Path $arquivo -PathType Container)) {
      if (-not $ctx.Request.Url.AbsolutePath.EndsWith('/')) {
        $res.StatusCode = 301; $res.RedirectLocation = $ctx.Request.Url.AbsolutePath + '/'
        $arquivo = $null
      } else {
        $arquivo = Join-Path $arquivo 'index.html'
      }
    }
    if ($arquivo) {
    $cheio = [IO.Path]::GetFullPath($arquivo)
    if (-not $cheio.StartsWith([IO.Path]::GetFullPath($raiz)) -or -not (Test-Path $cheio -PathType Leaf)) {
      $res.StatusCode = 404; $cheio = Join-Path $raiz '404.html'
    }
    $bytes = [IO.File]::ReadAllBytes($cheio)
    $ext = [IO.Path]::GetExtension($cheio).ToLower()
    $res.ContentType = if ($tipos.ContainsKey($ext)) { $tipos[$ext] } else { 'application/octet-stream' }
    $res.ContentLength64 = $bytes.Length
    $res.OutputStream.Write($bytes, 0, $bytes.Length)
    Write-Host ("  {0} {1}" -f $res.StatusCode, $ctx.Request.Url.AbsolutePath)
    }
  } catch { $res.StatusCode = 500 } finally { $res.Close() }
}
