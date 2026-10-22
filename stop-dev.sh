#!/bin/bash
# stop-dev.sh — shuts down everything start-dev.sh started.
# Place this at the root of your speed-reader repo, next to start-dev.sh.
# No "set -e" here on purpose: if one step fails, we still want the others to run.

SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"

echo "==> Stopping Express server (if still running)..."
pkill -f "tsx src/server.ts" && echo "    server stopped" || echo "    server was not running"

echo "==> Stopping app Postgres container..."
docker stop speed-reader-db-container || echo "    could not stop speed-reader-db-container"

echo "==> Stopping ichiran Docker stack..."
cd "$SCRIPT_DIR/ichiran" || exit 1
docker compose --env-file ../server/.env stop

echo "==> Containers still running:"
docker ps

echo "==> Done. Your data is kept. Run ./start-dev.sh to start again."
