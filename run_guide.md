# Nextgen E-Shop — Dev Startup Guide

Open a terminal at `c:\Users\Mujahid\.gemini\antigravity\scratch\eshop`

## Step 1: Start Infrastructure (Docker)

```powershell
docker-compose up -d
```

```bash
sudo docker-compose up -d
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

```bash
    npx nx run-many -t serve
```

Runs: API Gateway (:8080), Auth (:3001), Product (:3002), Order (:3003)

## Step 4: Start Frontends (new terminal)

```powershell
PowerShell -ExecutionPolicy Bypass -Command "npx nx run storefront:dev"
```

```bash
# Run the public Storefront
npx nx dev storefront:dev

# Run the Vendor Dashboard (in a separate terminal)
npx nx dev vendor-dashboard:dev
```


Runs: Next.js Frontend applications at `http://localhost:3000` and the next available port.

> **Feature Note:** The new _Neural Architect Spatial Product Deep-Dive_ is available on BOTH frontends at `/product/[id]`!
> (Example: `http://localhost:3000/product/neural-core-v2`)

## Ports Summary

| Service              | Port          |
| -------------------- | ------------- |
| Storefront (Next.js) | 3000 / 3001\* |
| Vendor Dashboard     | 3000 / 4200\* |
| API Gateway          | 8080          |
| Auth Service         | 3001\*        |
| Product Service      | 3002          |
| Order Service        | 3003          |
| PostgreSQL           | 5432          |
| MongoDB              | 27017         |
| Redis                | 6379          |
| Kafka                | 9092          |

> ⚠️ Auth-service and frontend both default to 3001. Nx usually auto-assigns the next available port for the auth-service.

Since the AI microservice code is fully integrated, here is the exact step-by-step process to run and test it:

### 1. Let the Background Installation Finish

The `npm install` for `@tensorflow/tfjs-node` is still running in the background. It takes an unusually long time (often 2-5 minutes) because it has to compile native C++ bindings for TensorFlow. Once that finishes, you are ready to go.

### 2. Start the Monorepo Services

Use the standard Nx command to spin up all your microservices, the API gateway, and the frontend concurrently:

```bash
npx nx run-many -t serve
```

### 3. Generate Vectors for Existing Inventory (One-time)

Because your MongoDB products don't currently have the `featureVector` array populated, the search won't work out of the box. I built a warm-up endpoint that uses the AI model to generate vectors for your entire current catalog!
While the servers are running, open a new terminal tab and run:

```bash
curl -X POST http://localhost:8080/visual-search/generate-vectors
```

_You will immediately get a JSON response confirming that vectors were generated for all products._

### 4. Test the AI Visual Search!

- Navigate to your storefront UI: `http://localhost:4200/neural`.
- Drag and drop any image into the **Visual Search** dashboard component.
- You will see the state change to _"Analyzing Neural Patterns..."_
- The API will query the MongoDB catalog and instantly populate your `FeaturedProduct` list with the top matches (and their scores will dynamically update based on how mathematically similar they are to the image you uploaded).
- **To test the threshold:** Upload a picture of something completely unrelated (like a houseplant or a sandwich). The AI will detect the similarity is below 40% (0.40) and will display the stylish _"Neural scan complete: No similar assets found in the network"_ message we just added!
