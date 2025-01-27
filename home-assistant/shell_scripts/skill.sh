#!/usr/bin/env sh

curl \
    --silent \
    --request POST \
    --header "Content-Type: application/json" \
    http://localhost:3000/"${1}" -d "${2}" | jq -r ".message"