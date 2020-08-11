#!/bin/bash

SERVER="${1:-http://localhost:3000}"
PLUNZO_WEBHOOK="${2:-INCOMING}"

case $PLUNZO_WEBHOOK in
  "BALANCE")
    ENDPOINT="balance"
    DATA_FILE="balance.json"
    ;;
  "TX-OUTGOING")
    ENDPOINT="tx"
    DATA_FILE="tx-outgoing.json"
    ;;
  "TX-INCOMING" | *)
    ENDPOINT="tx"
    DATA_FILE="tx-incoming.json"
    ;;
esac

DATA=$(cat test/plunzo/$DATA_FILE)
URL="$SERVER/$ENDPOINT"

curl --request POST \
  --url "$URL" \
  --header 'content-type: application/json' \
  --data "$DATA"