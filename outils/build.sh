#!/usr/bin/env bash
# Prépare le dossier public/ que Cloudflare met en ligne (voir wrangler.jsonc).
# Seuls les fichiers du site y sont copiés (pas le README, ni outils/, ni .git).
set -euo pipefail
cd "$(dirname "$0")/.."

rm -rf public
mkdir public
cp -r index.html ressources.html mentions-legales.html 404.html _headers assets data salaries it public/

if grep -q "À compléter" public/mentions-legales.html; then
  echo "ATTENTION : les mentions légales contiennent encore des champs « À compléter »." >&2
fi
echo "Dossier public/ prêt."
