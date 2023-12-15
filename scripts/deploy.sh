#!/bin/sh

echo "[log] - Compiling project to build folder ..."
npm run build
echo "[log] - Build process done"

echo "[log] - Deploying files to server"
scp -r dist/* root@alnlabs.com:/var/www/html/frontend-apps/liveinhomes-admin
echo "[log] - Deployment completed"