# Nextgen E-Shop — Dev Startup Guide

Follow these steps to run the complete microservices architecture, frontend applications, and AI models locally.

## Prerequisites

Before starting, ensure you have the following installed:
- Docker and Docker Compose
- Node.js and npm (or pnpm/yarn)
- An active terminal at the project root (`/home/shah/nextgen`)

---

## 🚀 Quick Start (Automated Script)

If you want to start EVERYTHING automatically (Docker, database schemas, database seeding, all microservices, and frontends), simply run the included bash script:

```bash
./start_all.sh
```

*(If you prefer to start services individually or want to understand what the script does, follow the manual steps below.)*

---

## Step 1: Start Infrastructure (Docker)

Spin up the core infrastructure (PostgreSQL, MongoDB, Redis, Zookeeper, Kafka):

```bash
docker compose up -d
```
*(Note: If you encounter permission issues on Linux, you may need to use `sudo docker compose up -d`)*

---

## Step 2: Push Database Schemas & Seed Data (First Time Only)

Sync the Prisma schemas with your running PostgreSQL instance. Since Prisma 7 uses configuration files, run these from within their respective app directories:

```bash
# Push Auth Service Schema
cd apps/auth-service && npx prisma db push && cd ../..

# Push Order Service Schema
cd apps/order-service && npx prisma db push && cd ../..

# Push Recommendation Service Schema (if applicable)
cd apps/recommendation-service && npx prisma db push && cd ../..
```

**Seed the Database:**
Populate the database with initial vendor accounts and products:
```bash
node seed_vendors.js
```

---

## Step 3: Start Backend Services

Use Nx to spin up the API gateway and all microservices concurrently:

```bash
npx nx run-many -t serve --projects=api-gateway,auth-service,order-service,product-service,recommendation-service
```
*(You can also simply run `npx nx run-many -t serve` to start everything, including the frontends.)*

---

## Step 4: Start Frontend Applications

If you didn't start the frontends in the previous step, open a new terminal and run:

```bash
# Run the public Storefront
npx nx dev storefront

# Run the Vendor Dashboard (in a separate terminal)
npx nx dev vendor-dashboard
```

---

## Ports & Services Summary

| Service                 | Port          | Access URL                       |
| ----------------------- | ------------- | -------------------------------- |
| **Storefront**          | 3000          | `http://localhost:3000`          |
| **Vendor Dashboard**    | 3000 / 4200*  | `http://localhost:4200`          |
| **API Gateway**         | 8080          | `http://localhost:8080`          |
| **Auth Service**        | 3001          | *(Internal / Proxied via 8080)*  |
| **Product Service**     | 3002          | *(Internal / Proxied via 8080)*  |
| **Order Service**       | 3003          | *(Internal / Proxied via 8080)*  |
| **Visual Search API**   | 3004          | *(Internal / Proxied via 8080)*  |
| PostgreSQL              | 5432          | `postgresql://admin:password...` |
| MongoDB                 | 27017         | `mongodb://localhost:27017...`   |
| Redis                   | 6379          | `localhost:6379`                 |
| Kafka                   | 9092          | `localhost:9092`                 |

> ⚠️ **Note:** If `storefront` and `vendor-dashboard` both try to use port 3000, Nx will auto-assign the next available port (e.g., 4200) for the second app. Similarly, if `auth-service` conflicts with a frontend on 3001, it will auto-assign a new port.

---

## Vendor Access & Credentials

You can log in to the **Vendor Dashboard** using any of these seeded test accounts:

- **Email:** `vendor1@example.com` | **Password:** `password123` (TechVault)
- **Email:** `vendor2@example.com` | **Password:** `password123` (UrbanGear)
- **Email:** `vendor3@example.com` | **Password:** `password123` (QuantumEdge)
- **Email:** `vendor4@example.com` | **Password:** `password123` (NeonWave)
- **Email:** `vendor5@example.com` | **Password:** `password123` (CyberForge)

---

## Testing AI & Core Features

### 1. Visual Search Engine (Neural Cart)
To test the visual search, you first need to generate vector embeddings for your existing MongoDB products.
Once all services are running, execute this command in a new terminal:
```bash
curl -X POST http://localhost:8080/visual-search/generate-vectors
```
*You will receive a JSON response confirming that vectors were generated. You can now go to the Storefront UI (`/neural`) to test dragging and dropping images for similar product recommendations.*

### 2. Email Verification Workflow
1. Register a new user in the Storefront.
2. Check the `auth-service` terminal logs for the fake verification token URL.
3. Click the link (or paste it into your browser: `/verify-email?token=...`) to verify.
4. Log in with the newly verified user.

### 3. Recommendation Service
Check that the AI recommendation service is working by navigating to:
`http://localhost:8080/recommendations`
