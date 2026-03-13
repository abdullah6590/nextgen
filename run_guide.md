# Nextgen E-Shop — Dev Startup Guide

Open a terminal at `c:\Users\Mujahid\.gemini\antigravity\scratch\eshop`

## Step 1: Start Infrastructure (Docker)
```powershell
docker-compose up -d
```
Starts: PostgreSQL, MongoDB, Redis, Zookeeper, Kafka

## Step 2: Push Prisma Schemas (only if first time or schema changed)
```powershell
npx prisma db push --schema=apps/auth-service/prisma/schema.prisma
npx prisma db push --schema=apps/order-service/prisma/schema.prisma
```

## Step 3: Start Backend Services
```powershell
PowerShell -ExecutionPolicy Bypass -Command "npx nx run-many --target=serve --projects=api-gateway,auth-service,order-service,product-service"
```
Runs: API Gateway (:8080), Auth (:3001), Product (:3002), Order (:3003)

## Step 4: Start Frontend (new terminal)
```powershell
PowerShell -ExecutionPolicy Bypass -Command "npx nx dev storefront"
```
Runs: Frontend at http://localhost:3001

## Ports Summary
| Service | Port |
|---------|------|
| Frontend (Next.js) | 3001 |
| API Gateway | 8080 |
| Auth Service | 3001* |
| Product Service | 3002 |
| Order Service | 3003 |
| PostgreSQL | 5432 |
| MongoDB | 27017 |
| Redis | 6379 |
| Kafka | 9092 |

> ⚠️ Auth-service and frontend both default to 3001. Nx usually auto-assigns the next available port for the auth-service.
