#!/bin/sh
# SYOS — Automatik einrichten. Einmal aufrufen: sh ~/syos/automatik.sh
# Danach schiebt dieser Rechner alle 5 Minuten von selbst zu GitHub,
# solange er an und wach ist. Der Aufruf ist beliebig oft wiederholbar.

ORDNER="$(cd "$(dirname "$0")" && pwd)"
ZEILE="*/5 * * * * /bin/sh $ORDNER/push.sh >> $ORDNER/push.log 2>&1"

# Alte Syos-Einträge entfernen, neuen setzen — so entstehen keine Doppelungen.
( crontab -l 2>/dev/null | grep -v "syos/push.sh" ; echo "$ZEILE" ) | crontab -

echo "Eingerichtet. Dieser Rechner pusht ab jetzt alle 5 Minuten:"
crontab -l | grep "syos/push.sh"
echo ""
echo "Und einmal sofort:"
sh "$ORDNER/push.sh"
