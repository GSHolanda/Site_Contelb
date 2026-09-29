#!/bin/bash
# Publica a pasta site/ no public_html da HostGator via FTP.
# Requer hostgator.env ao lado deste script (veja hostgator.env.exemplo).
set -e
source "$(dirname "$0")/hostgator.env"
DEPLOY="$(cd "$(dirname "$0")/site" && pwd)"
cd "$DEPLOY"
find . -type f | while read -r f; do
  remote="${f#./}"
  echo "subindo $remote"
  curl -sS --ssl --ftp-create-dirs -u "$HG_USER:$HG_PASS" \
    -T "$f" "ftp://$HG_HOST/public_html/$remote"
done
echo "publicado em $SITE_URL"
