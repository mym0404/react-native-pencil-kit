#!/usr/bin/env bash
set -e
echo '⚒️ eslint .'
yarn lint:js
yarn lint:ios
echo '🐋 typescript .'
yarn typecheck
