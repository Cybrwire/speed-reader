#!/bin/bash
# start-dev.sh — spins up everything speed-reader needs for local dev.
# Place this at the root of your speed-reader repo (next to /ichiran and /server).

set -e  # stop immediately if any command fails, instead of plowing ahead

# Get the folder this script lives in, so it works no matter where you run it from
SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"

echo "==> Starting ichiran Docker stack..."
cd "$SCRIPT_DIR/ichiran"
docker compose --env-file ../server/.env up -d

echo "==> Starting app Postgres container..."
docker start speed-reader-db-container

echo "==> Giving containers a moment to finish starting..."
sleep 3

echo "==> Current container status:"
docker ps

echo "==> Starting Express server (Ctrl+C to stop)...('npx tsx src/server.ts' to start again)"
cd "$SCRIPT_DIR/server"
npm run start
