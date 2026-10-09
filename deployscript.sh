#!/bin/bash

# Exit immediately if a command exits with a non-zero status (e.g., build failure)
set -e

echo "========================================="
echo "  Starting IoT Website Deployment"
echo "========================================="

# 1. Navigate to the main project directory
echo "[1/4] Navigating to IoTwebsite..."
if [ ! -d "IoTwebsite" ]; then
    echo "Error: IoTwebsite directory not found. Please run this script from 'group_project'."
    exit 1
fi
cd IoTwebsite

# 2. Build the frontend
echo "[2/4] Building frontend (npm run build)..."
npm run build

# 3. Navigate to backend directory
echo "[3/4] Navigating to backend..."
cd backend

# 4. Stop existing PM2 process (ignore error if process doesn't exist yet)
echo "[4/4] Restarting PM2 process..."
pm2 delete IoTwebsite || true

# 5. Start new PM2 process with specific PORT
PORT=7300 pm2 start server.js --name "IoTwebsite"

echo "========================================="
echo "  Deployment Complete!"
echo "========================================="

# Show final status
pm2 status
