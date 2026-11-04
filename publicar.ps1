# Publica o site da Contelb na KingHost por FTP (usa o curl.exe que ja vem no Windows 10 e 11).
# Uso: dois cliques em publicar.bat e escolha a opcao no menu. Ou no PowerShell:
#   .\publicar.ps1 listar     mostra o que existe hoje no FTP (nao muda nada)
#   .\publicar.ps1 reserva    move o conteudo atual da www (menos wd e .well-known) para uma pasta de reserva FORA do publico
#   .\publicar.ps1 publicar   envia a pasta site\ para a www
#   .\publicar.ps1 instalar   cria um codigo de instalacao (24 h) para criar ou redefinir as contas do painel do blog
# Usuario e senha ficam no arquivo kinghost.env (que nunca vai para o Git). Sem senha no arquivo, ela e pedida na tela.
# Este script nunca apaga nada no servidor: so cria pastas, envia arquivos e move (renomeia) itens com confirmacao.
param([string]$Acao = '')
$ErrorActionPreference = 'Stop'
$raiz = $PSScriptRoot

function Parar([string]$msg) { Write-Host $msg -ForegroundColor Red; exit 1 }

$envArq = Join-Path $raiz 'kinghost.env'
if (-not (Test-Path $envArq)) { Parar 'Falta o arquivo kinghost.env. Copie kinghost.env.exemplo para kinghost.env e preencha o usuario (a senha pode ficar em branco).' }
$cfg = @{}
foreach ($linha in Get-Content $envArq) { if ($linha -match '^\s*([A-Z_]+)\s*=\s*(.*?)\s*$') { $cfg[$matches[1]] = $matches[2] } }
$servidor = if ($cfg['KH_HOST']) { $cfg['KH_HOST'] } else { 'web10f33.kinghost.net' }
$usuario = if ($cfg['KH_USUARIO']) { $cfg['KH_USUARIO'] } else { 'contelb' }
$senha = $cfg['KH_SENHA']
$tls = if ($cfg['KH_TLS'] -eq 'nao') { @() } else { @('ssl-reqd') }   # "nao" so se a KingHost recusar conexao protegida
$curl = (Get-Command curl.exe -ErrorAction SilentlyContinue)
if (-not $curl) { Parar 'Nao encontrei o curl.exe (vem no Windows 10 e 11). Atualize o Windows e tente de novo.' }

if (-not $Acao) {
  Write-Host ''
  Write-Host 'Publicacao do site da Contelb na KingHost' -ForegroundColor Cyan
  Write-Host '  1  Listar o que existe hoje no FTP (so olha, nao muda nada)'
  Write-Host '  2  Mover o site antigo para a pasta de reserva (pede confirmacao)'
  Write-Host '  3  Publicar o site novo (pede confirmacao)'
  Write-Host '  4  Criar codigo de instalacao das contas do painel'
  $op = Read-Host 'Digite o numero da opcao'
  $Acao = @{ '1' = 'listar'; '2' = 'reserva'; '3' = 'publicar'; '4' = 'instalar' }[$op.Trim()]
  if (-not $Acao) { Parar 'Opcao invalida.' }
}
if ($Acao -notin 'listar', 'reserva', 'publicar', 'instalar') { Parar "Acao desconhecida: $Acao" }

if (-not $senha) {
  $seg = Read-Host "Senha do FTP do usuario $usuario (nao aparece na tela)" -AsSecureString
  $senha = [Runtime.InteropServices.Marshal]::PtrToStringBSTR([Runtime.InteropServices.Marshal]::SecureStringToBSTR($seg))
}

function Aspas([string]$s) { '"' + $s.Replace('\', '\\').Replace('"', '\"') + '"' }

# Na KingHost o FTP entra em /www, nao na raiz. Por isso todos os caminhos sao absolutos:
# nas URLs, a barra dupla (ftp://servidor//www/) parte da raiz; nos comandos MKD, RNFR e RNTO, a barra inicial faz o mesmo.

# Roda o curl lendo a configuracao pela entrada padrao: a senha nao aparece na linha de comando nem fica gravada em disco.
# Os arquivos sao enviados com caminho relativo, para nao depender de acentos no nome da pasta do Windows.
$OutputEncoding = New-Object Text.UTF8Encoding $false
function Ftp([string[]]$linhas) {
  # tls-max 1.2: com TLS 1.3, o curl do Windows (Schannel) cortou arquivos no envio, sem avisar erro, em multiplos de 16 KB
  $conteudo = @("user = $(Aspas "${usuario}:$senha")", 'ssl-no-revoke', 'silent', 'show-error', 'connect-timeout = 30', 'tls-max = "1.2"') + $tls + $linhas
  $saida = $conteudo | & $curl.Source --config -
  $cod = $LASTEXITCODE
  if ($cod -eq 60) { Parar "O certificado do FTP nao confere com $servidor. Troque KH_HOST no kinghost.env para web10f33.kinghost.net e tente de novo." }
  if ($cod -eq 64) { Parar 'O FTP nao aceitou conexao protegida (TLS). Confira o endereco em KH_HOST; so em ultimo caso coloque KH_TLS=nao no kinghost.env (a senha passaria sem protecao).' }
  if ($cod -eq 67) { Parar 'Usuario ou senha do FTP incorretos.' }
  if ($cod -eq 7 -or $cod -eq 28) { Parar "Nao consegui conectar em $servidor. Se o painel da KingHost mostrar 'Ip_nao_liberado', libere seu IP em Politica de IPs." }
  if ($cod -ne 0) { Parar "O FTP respondeu com erro (codigo $cod do curl)." }
  return $saida
}

function Nomes([string]$pasta) {
  Ftp @("url = $(Aspas "ftp://$servidor/$pasta")", 'request = "NLST -a"') |
    ForEach-Object { ($_ -split '/')[-1].Trim() } | Where-Object { $_ -and $_ -ne '.' -and $_ -ne '..' }
}

switch ($Acao) {

  'listar' {
    Write-Host "`nRaiz do FTP ($servidor):" -ForegroundColor Cyan
    Ftp @("url = $(Aspas "ftp://$servidor//")", 'request = "LIST -a"') | Write-Host
    Write-Host "`nPasta www (o que aparece no site):" -ForegroundColor Cyan
    Ftp @("url = $(Aspas "ftp://$servidor//www/")", 'request = "LIST -a"') | Write-Host
  }

  'reserva' {
    $manter = 'wd', '.well-known'
    $itens = @(Nomes '/www/' | Where-Object { $manter -notcontains $_ })
    if (-not $itens) { Write-Host 'A pasta www ja esta vazia (fora wd). Nada para mover.'; break }
    $destino = 'www_antigo_' + (Get-Date -Format 'yyyyMMdd-HHmm')
    Write-Host "`nEstes itens da www vao ser MOVIDOS (nada e apagado) para /$destino, fora do site publico:" -ForegroundColor Yellow
    $itens | ForEach-Object { Write-Host "  $_" }
    Write-Host "Continuam na www: $($manter -join ', ')" -ForegroundColor Yellow
    Write-Host 'Durante a troca o site fica fora do ar por alguns minutos, ate a publicacao do site novo.'
    if ((Read-Host 'Para confirmar, digite MOVER') -cne 'MOVER') { Parar 'Cancelado. Nada foi movido.' }
    $cmds = @("quote = $(Aspas "MKD /$destino")")
    foreach ($i in $itens) { $cmds += "quote = $(Aspas "RNFR /www/$i")"; $cmds += "quote = $(Aspas "RNTO /$destino/$i")" }
    Ftp (@("url = $(Aspas "ftp://$servidor//")", 'list-only') + $cmds) | Out-Null
    Write-Host "Pronto. O site antigo esta guardado em /$destino (inclusive o blog antigo)." -ForegroundColor Green
    Write-Host 'Para voltar atras: no WebFTP da KingHost, mova os itens dessa pasta de volta para a www.'
  }

  'publicar' {
    if (-not (Test-Path (Join-Path $raiz 'site\index.html'))) { Parar 'Nao encontrei site\index.html. Rode "git pull" na pasta do projeto.' }
    $site = (Resolve-Path (Join-Path $raiz 'site')).Path
    # site\blog\ e a copia estatica usada so no Netlify; na KingHost o blog e montado pelo blog.php
    $arquivos = Get-ChildItem $site -Recurse -File -Force | Where-Object {
      $rel = $_.FullName.Substring($site.Length + 1).Replace('\', '/')
      -not ($rel -like 'blog/*')
    }
    Write-Host "`nVou enviar $($arquivos.Count) arquivos de site\ para a pasta www de $servidor." -ForegroundColor Yellow
    Write-Host 'Arquivos com o mesmo nome na www serao substituidos. A pasta wd nao e tocada.'
    if ((Read-Host 'Para confirmar, digite PUBLICAR') -cne 'PUBLICAR') { Parar 'Cancelado. Nada foi enviado.' }
    # Envia, confere o tamanho de cada arquivo no servidor e reenvia os que chegaram diferentes (ate 3 tentativas)
    $pendentes = @($arquivos)
    for ($tentativa = 1; $tentativa -le 3 -and $pendentes.Count -gt 0; $tentativa++) {
      Write-Host "`nTentativa ${tentativa}: enviando $($pendentes.Count) arquivos..." -ForegroundColor Cyan
      $linhas = @('ftp-create-dirs', 'write-out = "enviado %{url_effective}\n"')
      foreach ($a in $pendentes) {
        $rel = $a.FullName.Substring($site.Length + 1).Replace('\', '/')
        $linhas += "upload-file = $(Aspas $rel)"
        $linhas += "url = $(Aspas "ftp://$servidor//www/$rel")"
      }
      Push-Location $site
      try { Ftp $linhas | ForEach-Object { Write-Host $_.Replace("ftp://$servidor//www/", '  ') } } finally { Pop-Location }
      $tamanhos = @{}
      $pastas = @($arquivos | ForEach-Object { $_.DirectoryName.Substring($site.Length).Replace('\', '/') } | Sort-Object -Unique)
      foreach ($p in $pastas) {
        Ftp @("url = $(Aspas "ftp://$servidor//www$p/")", 'request = "LIST -a"') | ForEach-Object {
          if ($_ -match '^-\S+\s+\d+\s+\S+\s+\S+\s+(\d+)\s+\S+\s+\S+\s+\S+\s+(.+?)\s*$') { $tamanhos["$p/$($matches[2])"] = [long]$matches[1] }
        }
      }
      $pendentes = @($arquivos | Where-Object { $tamanhos[$_.FullName.Substring($site.Length).Replace('\', '/')] -ne $_.Length })
      if ($pendentes.Count -gt 0) {
        Write-Host "Chegaram com tamanho diferente: $($pendentes.Count) arquivos." -ForegroundColor Yellow
      }
    }
    if ($pendentes.Count -gt 0) {
      $pendentes | ForEach-Object { Write-Host "  $($_.FullName.Substring($site.Length + 1))" -ForegroundColor Red }
      Parar 'A publicacao NAO terminou: os arquivos acima continuam diferentes no servidor.'
    }
    Write-Host "`nConferido: $($arquivos.Count) arquivos com o tamanho certo no servidor." -ForegroundColor Green
    Ftp @("url = $(Aspas "ftp://$servidor//")", 'list-only', "quote = $(Aspas '*MKD /dados-blog')") | Out-Null
    Write-Host "`nPublicado. Se o Varnish estiver ativo no painel da KingHost, limpe o cache. Depois teste em uma janela anonima." -ForegroundColor Green
  }

  'instalar' {
    $letras = 'abcdefghijkmnpqrstuvwxyzABCDEFGHJKLMNPQRSTUVWXYZ23456789'
    $bytes = New-Object byte[] 24
    [Security.Cryptography.RandomNumberGenerator]::Create().GetBytes($bytes)
    $codigo = -join ($bytes | ForEach-Object { $letras[$_ % $letras.Length] })
    Push-Location $raiz
    try {
      [IO.File]::WriteAllText((Join-Path $raiz 'instalar.codigo.tmp'), $codigo, (New-Object Text.UTF8Encoding $false))
      Ftp @('ftp-create-dirs', 'upload-file = "instalar.codigo.tmp"', "url = $(Aspas "ftp://$servidor//dados-blog/instalar.codigo")") | Out-Null
    } finally { Remove-Item (Join-Path $raiz 'instalar.codigo.tmp') -Force -ErrorAction SilentlyContinue; Pop-Location }
    Write-Host "`nCodigo de instalacao (vale 24 horas e so pode ser usado uma vez):" -ForegroundColor Cyan
    Write-Host "  $codigo" -ForegroundColor White
    Write-Host 'Abra https://www.contelb.com.br/admin/instalar.php, cole o codigo e crie as contas do painel.'
    Write-Host 'Nao cole este codigo em chats nem e-mails.'
  }
}
