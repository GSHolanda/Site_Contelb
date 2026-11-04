#!/bin/bash
# Publica o site da Contelb na KingHost por FTP (versão Mac/Linux do publicar.ps1, mesmas opções).
#   ./publicar.sh listar     mostra o que existe hoje no FTP (não muda nada)
#   ./publicar.sh reserva    move o conteúdo atual da www (menos wd e .well-known) para uma pasta de reserva FORA do público
#   ./publicar.sh publicar   envia a pasta site/ para a www
#   ./publicar.sh instalar   cria um código de instalação (24 h) para criar ou redefinir as contas do painel do blog
# Usuário e senha ficam em kinghost.env (que nunca vai para o Git). Sem senha no arquivo, ela é pedida na tela.
# Este script nunca apaga nada no servidor: só cria pastas, envia arquivos e move (renomeia) itens com confirmação.
set -euo pipefail
RAIZ="$(cd "$(dirname "$0")" && pwd)"
parar() { echo "$1" >&2; exit 1; }

[ -f "$RAIZ/kinghost.env" ] || parar "Falta o arquivo kinghost.env. Copie kinghost.env.exemplo para kinghost.env e preencha o usuário (a senha pode ficar em branco)."
ler() { sed -n "s/^[[:space:]]*$1[[:space:]]*=[[:space:]]*//p" "$RAIZ/kinghost.env" | tail -1 | sed 's/[[:space:]]*$//'; }
SERVIDOR="$(ler KH_HOST)"; SERVIDOR="${SERVIDOR:-web10f33.kinghost.net}"
USUARIO="$(ler KH_USUARIO)"; USUARIO="${USUARIO:-contelb}"
SENHA="$(ler KH_SENHA)"
TLS="$(ler KH_TLS)"   # "nao" só se a KingHost recusar conexão protegida
ESQUEMA=ftp

ACAO="${1:-}"
case "$ACAO" in listar|reserva|publicar|instalar) ;; *) parar "Use: ./publicar.sh listar | reserva | publicar | instalar" ;; esac
if [ -z "$SENHA" ]; then read -rsp "Senha do FTP do usuário $USUARIO (não aparece na tela): " SENHA; echo; fi

aspas() { local s="${1//\\/\\\\}"; printf '"%s"' "${s//\"/\\\"}"; }

# Roda o curl lendo a configuração pela entrada padrão: a senha não aparece na linha de comando nem fica gravada em disco
ftp() {
  local cod=0
  curl --config - < <(echo "user = $(aspas "$USUARIO:$SENHA")"; [ "$TLS" = nao ] || echo ssl-reqd; printf '%s\n' ssl-no-revoke silent show-error 'connect-timeout = 30' "$@") || cod=$?
  case $cod in
    0) ;;
    60) parar "O certificado do FTP não confere com $SERVIDOR. Troque KH_HOST no kinghost.env para web10f33.kinghost.net e tente de novo." ;;
    64) parar "O FTP não aceitou conexão protegida (TLS). Confira o endereço em KH_HOST; só em último caso coloque KH_TLS=nao no kinghost.env (a senha passaria sem proteção)." ;;
    67) parar "Usuário ou senha do FTP incorretos." ;;
    7|28) parar "Não consegui conectar em $SERVIDOR. Se o painel da KingHost mostrar 'Ip_nao_liberado', libere seu IP em Política de IPs." ;;
    *) parar "O FTP respondeu com erro (código $cod do curl)." ;;
  esac
}
# Na KingHost o FTP entra em /www, não na raiz. Por isso todos os caminhos são absolutos:
# nas URLs, a barra dupla (ftp://servidor//www/) parte da raiz; nos comandos MKD, RNFR e RNTO, a barra inicial faz o mesmo.
url() { echo "url = $(aspas "$ESQUEMA://$SERVIDOR//$1")"; }

case "$ACAO" in

listar)
  echo; echo "Raiz do FTP ($SERVIDOR):"; ftp "$(url '')" 'request = "LIST -a"'
  echo; echo "Pasta www (o que aparece no site):"; ftp "$(url www/)" 'request = "LIST -a"'
  ;;

reserva)
  mapfile -t ITENS < <(ftp "$(url www/)" 'request = "NLST -a"' | tr -d '\r' | sed 's#.*/##' | grep -vxE '\.|\.\.|wd|\.well-known|')
  [ ${#ITENS[@]} -gt 0 ] || { echo "A pasta www já está vazia (fora wd). Nada para mover."; exit 0; }
  DESTINO="www_antigo_$(date +%Y%m%d-%H%M)"
  echo; echo "Estes itens da www vão ser MOVIDOS (nada é apagado) para /$DESTINO, fora do site público:"
  printf '  %s\n' "${ITENS[@]}"
  echo "Continuam na www: wd, .well-known"
  echo "Durante a troca o site fica fora do ar por alguns minutos, até a publicação do site novo."
  read -rp "Para confirmar, digite MOVER: " OK; [ "$OK" = MOVER ] || parar "Cancelado. Nada foi movido."
  CMDS=("quote = $(aspas "MKD /$DESTINO")")
  for i in "${ITENS[@]}"; do CMDS+=("quote = $(aspas "RNFR /www/$i")" "quote = $(aspas "RNTO /$DESTINO/$i")"); done
  ftp "$(url '')" list-only "${CMDS[@]}" > /dev/null
  echo "Pronto. O site antigo está guardado em /$DESTINO (inclusive o blog antigo)."
  echo "Para voltar atrás: no WebFTP da KingHost, mova os itens dessa pasta de volta para a www."
  ;;

publicar)
  SITE="$RAIZ/site"
  [ -f "$SITE/index.html" ] || parar "Não encontrei site/index.html. Rode \"git pull\" na pasta do projeto."
  # site/blog/ é a cópia estática usada só no Netlify; na KingHost o blog é montado pelo blog.php
  mapfile -t ARQS < <(cd "$SITE" && find . -type f ! -path './blog/*' | sed 's#^\./##' | sort)
  echo; echo "Vou enviar ${#ARQS[@]} arquivos de site/ para a pasta www de $SERVIDOR."
  echo "Arquivos com o mesmo nome na www serão substituídos. A pasta wd não é tocada."
  read -rp "Para confirmar, digite PUBLICAR: " OK; [ "$OK" = PUBLICAR ] || parar "Cancelado. Nada foi enviado."
  LINHAS=(ftp-create-dirs 'write-out = "enviado %{url_effective}\n"')
  for a in "${ARQS[@]}"; do LINHAS+=("upload-file = $(aspas "$SITE/$a")" "$(url "www/$a")"); done
  ftp "${LINHAS[@]}" | sed "s#$ESQUEMA://$SERVIDOR//www/#  #"
  ftp "$(url '')" list-only "quote = $(aspas '*MKD /dados-blog')" > /dev/null
  echo; echo "Publicado. Se o Varnish estiver ativo no painel da KingHost, limpe o cache. Depois teste em uma janela anônima."
  ;;

instalar)
  CODIGO="$(set +o pipefail; LC_ALL=C tr -dc 'abcdefghijkmnpqrstuvwxyzABCDEFGHJKLMNPQRSTUVWXYZ23456789' < /dev/urandom | head -c 24)"
  [ ${#CODIGO} -eq 24 ] || parar "Não consegui gerar o código."
  TMP="$(mktemp)"; printf '%s' "$CODIGO" > "$TMP"
  ftp ftp-create-dirs "upload-file = $(aspas "$TMP")" "$(url dados-blog/instalar.codigo)" > /dev/null
  rm -f "$TMP"
  echo; echo "Código de instalação (vale 24 horas e só pode ser usado uma vez):"; echo "  $CODIGO"
  echo "Abra https://www.contelb.com.br/admin/instalar.php, cole o código e crie as contas do painel."
  echo "Não cole este código em chats nem e-mails."
  ;;
esac
