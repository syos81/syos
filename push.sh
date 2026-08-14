#!/bin/sh
# SYOS — Evolution zu GitHub schieben. Aufruf: sh ~/syos/push.sh
cd "$(dirname "$0")" || exit 1
git checkout -q -B main 2>/dev/null
git add -A
MSG=$(cat .commitmsg 2>/dev/null || echo "Evolution push")
git commit -m "$MSG" || echo "Nichts Neues zu committen."
git push -u origin main
echo ""
echo "SYOS: Evolution ist live → https://syos81.github.io/syos/"
