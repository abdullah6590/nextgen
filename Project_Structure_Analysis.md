# Project Structure Analysis - E-Shop Microservices Platform

## Overview

This is a modern e-commerce platform built as a microservices architecture using **Nx Monorepo** with **TypeScript**, **Node.js**, and **Next.js**. The project follows a modular approach with separate services for different business domains, connected via an API Gateway and Kafka for event-driven communication.

## Root Configuration Files

### 1. **package.json** (`/package.json`)

- **Project Name**: `@eshop/source`
- **Package Manager**: Workspaces configured with `apps/*` (monorepo)
- **Key Dependencies**:
  - **Frontend**: React 19, Next.js 16, TailwindCSS 4, Framer Motion
  - **Backend**: Express, Prisma, MongoDB, PostgreSQL, KafkaJS
  - **Authentication**: JWT, bcryptjs, speakeasy (2FA)
  - **AI/ML**: TensorFlow.js, MobileNet for visual search
  - **Development**: Nx 22.5.4 with extensive plugins
- **Workspace Setup**: Uses npm/yarn workspaces pattern with all apps under `apps/` directory

### 2. **nx.json** (`/nx.json`)

- **Nx Configuration**: Defines project graph, caching, and task orchestration
- **Cloud Integration**: Connected to Nx Cloud (`nxCloudId: 69bc2830e071c9039e0d8588`)
- **Plugins**:
  - `@nx/webpack` - For bundling Node.js/Express apps
  - `@nx/js/typescript` - TypeScript compilation
  - `@nx/next` - Next.js applications
  - `@nx/nest` - NestJS framework support
- **Target Defaults**: Production builds exclude test files

### 3. **docker-compose.yml** (`/docker-compose.yml`)

- **Infrastructure Services**:
  - **MongoDB**: Port 27017 (for auth, recommendations)
  - **PostgreSQL**: Port 5432 (for orders, products with Prisma)
  - **Redis**: Port 6379 (caching, sessions)
  - **Kafka + Zookeeper**: Ports 9092/2181 (event streaming)
- **Volume Management**: Persistent storage for databases

### 4. **Environment Configuration**

- **.env.example**: Template for environment variables
- **.prettierrc**: Code formatting rules
- **.editorconfig**: Editor consistency
- **jest.config.ts**: Testing configuration

## Applications Directory (`/apps/`)

### 1. **API Gateway** (`api-gateway/`)

- **Purpose**: Single entry point for all microservices
- **Tech Stack**: Express.js with HTTP proxy middleware
- **Features**:
  - CORS configuration for multiple frontend origins
  - Rate limiting (100 requests/15 min per IP)
  - Request logging with Morgan
  - Service routing to backend microservices
- **Proxied Services**: Routes requests to auth, order, product, etc.

### 2. **Authentication Service** (`auth-service/`)

- **Purpose**: User authentication, registration, JWT management
- **Database**: MongoDB (via Mongoose)
- **Features**:
  - JWT-based authentication
  - Role-based access (customer, vendor, admin)
  - 2FA with speakeasy
  - Email verification
- **Prisma Schema**: User models with roles and permissions

### 3. **Order Service** (`order-service/`)

- **Purpose**: Order processing, inventory management
- **Database**: PostgreSQL with Prisma ORM
- **Key Files**:
  - `prisma/schema.prisma`: Order, OrderItem, Payment models
  - `src/generated/client/`: Prisma client types
- **Features**: Order lifecycle, payment integration, inventory updates

### 4. **Product Service** (`product-service/`)

- **Purpose**: Product catalog management
- **Tech Stack**: Express.js with webpack bundling
- **Features**: CRUD operations, product search, categorization

### 5. **Recommendation Service** (`recommendation-service/`)

- **Purpose**: AI-powered product recommendations
- **Database**: PostgreSQL with Prisma
- **Features**: Collaborative filtering, user behavior analysis
- **Generated Client**: Prisma Edge client for serverless deployment

### 6. **Visual Search Service** (`visual-search-service/`)

- **Purpose**: Image-based product search using TensorFlow
- **AI Stack**: TensorFlow.js, MobileNet model
- **Features**: Image upload, feature extraction, similarity matching
- **Use Case**: "Search by photo" functionality

### 7. **Kafka Consumer** (`kafka-consumer/`)

- **Purpose**: Event-driven architecture consumer
- **Tech Stack**: KafkaJS for message processing
- **Events Handled**: Order created, user registered, inventory updated
- **Integration**: Connects to Kafka cluster defined in docker-compose

### 8. **Storefront** (`storefront/`)

- **Purpose**: Customer-facing e-commerce website
- **Tech Stack**: Next.js 16 with App Router, TailwindCSS, TypeScript
- **Key Pages**:
  - `/` - Homepage with neural components
  - `/products` - Product listing
  - `/product/[id]` - Product details
  - `/checkout` - Checkout process
  - `/login`, `/register` - Authentication
  - `/orders` - Order history
  - `/profile` - User profile
- **Neural Components** (under `src/components/neural/`):
  - `VisualSearch` - AI-powered image search
  - `Chatbot` - AI shopping assistant
  - `CentralSearchHub` - Unified search interface
  - `SystemMetrics` - Real-time dashboard
  - `TrendingProducts` - AI-curated recommendations
- **Context Providers**: `AuthContext`, `CartContext`
- **API Routes**: `/api/chat` (AI chat), `/api/hello` (test)

### 9. **Vendor Dashboard** (`vendor-dashboard/`)

- **Purpose**: Vendor management interface
- **Tech Stack**: Next.js with Playwright for E2E testing
- **Features**: Inventory management, order fulfillment, analytics
- **E2E Tests**: Playwright configuration for vendor workflows

### 10. **E2E Test Applications**

Each service has corresponding `-e2e` directory with:

- **Jest configuration** for integration testing
- **Test setup/teardown** scripts
- **Global test utilities**
- **Service-specific test suites**

## Shared Libraries (`/libs/shared/`)

### 1. **authMiddleware.ts**

- **Purpose**: Reusable authentication middleware for Express services
- **Features**:
  - JWT verification with secret from environment
  - Role-based authorization (customer, vendor, admin)
  - TypeScript interfaces for authenticated requests
- **Export**: `authMiddleware`, `ROLES`, `AuthenticatedRequest`

### 2. **validation.ts**

- **Purpose**: Input validation using Zod schemas
- **Features**: User registration, login, product creation validators
- **Integration**: Used across all services for request validation

### 3. **index.ts**

- **Purpose**: Barrel exports for easy imports
- **Export**: All shared utilities from the library

## Development & DevOps

### 1. **Nx Workspace Management**

- **Project Graph**: Visualizes dependencies between services
- **Caching**: Smart rebuilds based on affected changes
- **Task Orchestration**: Parallel execution of builds/tests
- **Code Generation**: Scaffolding with `nx generate`

### 2. **Testing Strategy**

- **Unit Tests**: Jest with TypeScript support
- **E2E Tests**: Separate e2e projects for each service
- **Integration Tests**: Service-to-service communication
- **Playwright**: For frontend E2E testing

### 3. **Build & Deployment**

- **Webpack**: Bundling for Node.js services
- **SWC**: Fast compilation for Next.js apps
- **Docker**: Containerization of each service
- **Nx Cloud**: Distributed task execution and caching

## AI/ML Components

### 1. **Visual Search Pipeline**

```
Image Upload → TensorFlow MobileNet → Feature Vector → Similarity Search → Product Results
```

### 2. **Recommendation Engine**

- **Collaborative Filtering**: User-product interactions
- **Content-Based**: Product attributes matching
- **Real-time Updates**: Kafka events trigger recalculations

### 3. **Neural Storefront Features**

- **AI Chatbot**: Product recommendations via natural language
- **Visual Search**: Camera/image upload for product discovery
- **Trending Detection**: Real-time popularity analysis
- **Personalization**: User behavior-based UI adaptations

## Data Flow Architecture

```
Frontend (Storefront/Vendor Dashboard)
        ↓
    API Gateway (Routing, Rate Limiting, CORS)
        ↓
    Microservices (Auth, Order, Product, etc.)
        ↓
    Kafka Events (Order Created, User Registered)
        ↓
    Kafka Consumer (Async Processing)
        ↓
    Databases (PostgreSQL, MongoDB, Redis)
```

## Key Technical Decisions

1. **Monorepo with Nx**: Single codebase for all services with shared tooling
2. **TypeScript Everywhere**: Type safety across frontend and backend
3. **Prisma ORM**: Type-safe database access with auto-generated clients
4. **Event-Driven Architecture**: Kafka for loose coupling between services
5. **AI-First Approach**: TensorFlow integration for advanced features
6. **Modern Frontend**: Next.js 16 App Router with server components
7. **Containerized Development**: Docker Compose for local infrastructure

## Development Workflow

1. **Local Setup**:

   ```bash
   docker-compose up -d  # Start databases, Redis, Kafka
   npm install           # Install dependencies
   nx run-many --target=serve --all  # Start all services
   ```

2. **Code Generation**:

   ```bash
   nx g @nx/express:app new-service
   nx g @nx/next:component NewComponent
   ```

3. **Testing**:

   ```bash
   nx test auth-service
   nx run storefront-e2e:e2e
   ```

4. **Building**:
   ```bash
   nx build --prod --parallel
   ```

## Presentation Points

1. **Scalability**: Microservices can be deployed independently
2. **Developer Experience**: Nx provides fast builds and intelligent caching
3. **AI Integration**: Cutting-edge features differentiate from traditional e-commerce
4. **Type Safety**: End-to-end TypeScript reduces runtime errors
5. **Event-Driven**: Kafka enables real-time updates and analytics
6. **Modern UI**: TailwindCSS + Framer Motion for polished interactions
7. **Testing Coverage**: Comprehensive test suite ensures reliability

## Future Considerations

1. **Kubernetes Deployment**: For production scaling
2. **GraphQL Federation**: Alternative to REST API Gateway
3. **Enhanced AI**: More ML models for pricing, fraud detection
4. **Mobile App**: React Native using shared business logic
5. **Internationalization**: Multi-language support
6. **Payment Integration**: Stripe/PayPal connectors

---

_This analysis provides a comprehensive understanding of the e-shop platform's architecture, suitable for technical presentations and onboarding new developers._
