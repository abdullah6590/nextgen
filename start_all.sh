#!/bin/bash

# Nextgen E-Shop Unified Startup Script
# This script starts the databases, waits for them, runs migrations, and starts all services.

echo "==================================================="
echo "🚀 Starting Nextgen E-Shop Platform..."
echo "==================================================="

# 1. Start Docker Infrastructure
echo -e "\n📦 [1/4] Starting Docker infrastructure (PostgreSQL, MongoDB, Redis, Kafka)..."
docker compose up -d

# Wait for databases to be ready
echo "⏳ Waiting for PostgreSQL to initialize (10 seconds)..."
sleep 10

# 2. Push Prisma Schemas
echo -e "\n🗄️ [2/4] Syncing database schemas..."
echo "-> Syncing Auth Service DB..."
(cd apps/auth-service && npx prisma db push)

echo "-> Syncing Order Service DB..."
(cd apps/order-service && npx prisma db push)

if [ -d "apps/recommendation-service/prisma" ]; then
  echo "-> Syncing Recommendation Service DB..."
  (cd apps/recommendation-service && npx prisma db push)
fi

# 3. Seed Database
echo -e "\n🌱 [3/4] Seeding the database with vendor accounts..."
node seed_vendors.js

# 4. Start all Nx services concurrently
echo -e "\n🌐 [4/4] Starting all backend microservices and frontends..."
echo "==================================================="
echo "To stop everything later, press Ctrl+C"
echo "==================================================="

# Run everything concurrently using Nx
npx nx run-many -t serve --projects=api-gateway,auth-service,order-service,product-service,recommendation-service,storefront,vendor-dashboard --parallel
