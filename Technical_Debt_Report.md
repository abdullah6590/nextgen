# Technical Debt Report - E-Shop Microservices Architecture
**Date:** 2026-03-23  
**Architect:** Senior Solutions Architect  
**Scope:** Full workspace analysis (Storefront, Auth/Product/Order Services, PostgreSQL/MongoDB, Kafka)

## Executive Summary

The e-shop microservices architecture demonstrates solid foundational patterns with proper service separation, API Gateway routing, and event-driven components. However, critical gaps exist in the AI recommendation system, vendor dashboard functionality, and security hardening. This report identifies 12 actionable items across three priority levels.

---

## 1. Connectivity Audit Results

### ✅ **API Gateway Routing** - **FUNCTIONAL**
- **Status:** Correctly configured
- **Details:** API Gateway (`apps/api-gateway`) routes:
  - `/auth` → `localhost:3001` (Auth Service)
  - `/products` → `localhost:3002` (Product Service)  
  - `/orders` → `localhost:3003` (Order Service)
- **Storefront Integration:** Frontend correctly uses `http://localhost:8080` base URL with Axios interceptors for token attachment.

### ✅ **Order ↔ Product Service Integration** - **FUNCTIONAL**
- **Status:** Properly implemented with stock validation
- **Details:** Order service calls Product service internal endpoints:
  - `GET /internal/:id/stock` - Stock availability check
  - `PATCH /internal/:id/decrement` - Stock reduction
- **Pattern:** Synchronous HTTP calls with proper error handling for insufficient stock scenarios.

### ⚠️ **Kafka Producers** - **PARTIAL**
- **Status:** Producers exist but limited to one service
- **Details:**
  - **Product Service:** Emits `product-views` events to Kafka topic when products are viewed with `userId`
  - **Missing Producers:** No order creation events, user activity events, or cart events
  - **Consumer Gap:** Zero Kafka consumers found in the entire workspace

---

## 2. Auth & Verification Deep-Dive

### ✅ **Bcrypt Hashing** - **SECURE**
- **Status:** Correctly implemented
- **Details:** Auth service uses `bcryptjs` with salt rounds = 10
  - Registration: `bcrypt.hash(password, 10)`
  - Login: `bcrypt.compare(password, storedHash)`
- **Recommendation:** Consider increasing salt rounds to 12 for production.

### ✅ **JWT Implementation** - **FUNCTIONAL**
- **Status:** Properly implemented across stack
- **Details:**
  - **Auth Service:** Issues 1-hour tokens with `userId` and `role` claims
  - **Middleware:** Shared `authMiddleware` validates `Authorization: Bearer` header
  - **Frontend:** Token stored in localStorage, attached via Axios interceptors
- **Security Note:** Default secret `'supersecret'` in code - **HIGH RISK**

### ❌ **Email Verification & MFA** - **MISSING**
- **Status:** Critical security gap
- **Details:**
  - **Database Schema:** No `emailVerified`, `verificationToken`, or `mfaSecret` fields in User model
  - **API Endpoints:** No `/verify-email`, `/send-verification`, or `/enable-mfa` routes
  - **Frontend:** No verification UI components
- **Impact:** Users can register without email confirmation; no 2FA available.

---

## 3. Gap Analysis

### ❌ **AI Recommendation Engine** - **INCOMPLETE**
- **Status:** Frontend UI exists with no backend support
- **Details:**
  - **UI Components:** `NeuralMarketplacePage` with visual search, match scores, AI recommendations
  - **Kafka Events:** `product-views` topic exists but **NO CONSUMERS**
  - **Missing Service:** No AI/ML service to process events and generate recommendations
  - **Data Pipeline:** Events are emitted but never consumed or stored for training

### ❌ **Vendor Dashboard Dead Ends** - **SEVERE**
- **Status:** UI-only implementation with zero backend integration
- **Details:**
  - **Frontend:** Fully styled vendor dashboard (`apps/vendor-dashboard`) with metrics, charts, inventory
  - **Backend Gap:** No vendor-specific API routes in any service
  - **Database:** No vendor-specific tables or relationships
  - **Authentication:** No role-based access control for vendor vs customer
- **Impact:** Dashboard is a static mockup with no real data or functionality.

### ❌ **Profile Center** - **MISSING**
- **Status:** UI references exist but no dedicated profile management
- **Details:**
  - **UI Elements:** Profile images displayed throughout storefront
  - **Missing:** No `/profile` route, no user profile editing, no order history aggregation
  - **Data:** User schema lacks profile fields (name, address, phone, preferences)

---

## 4. Technical Debt Prioritization Matrix

### 🟥 **PRIORITY 1 - CRITICAL** (Security & Core Business)
1. **JWT Secret Hardening** - Move secret to environment variables
2. **Email Verification System** - Add verification flow to auth service
3. **Role-Based Access Control** - Implement vendor/customer/admin permissions
4. **Vendor API Foundation** - Create vendor endpoints in product/order services

### 🟧 **PRIORITY 2 - HIGH** (Business Features)
5. **AI Recommendation Consumer** - Build Kafka consumer for `product-views`
6. **Profile Management** - Add user profile API and UI
7. **Order Events Producer** - Emit `order-created` events for analytics
8. **Vendor Dashboard Integration** - Connect UI to real vendor APIs

### 🟨 **PRIORITY 3 - MEDIUM** (Enhancements)
9. **MFA Implementation** - Add TOTP-based 2FA
10. **Kafka Consumer Service** - Dedicated service for event processing
11. **API Gateway Enhancements** - Rate limiting, request logging
12. **Database Indexing** - Review and optimize query performance

Added API Gateway enhancements:

Rate limiting (100 req/15 min per IP)
Request logging with Morgan
Implemented in apps/api-gateway/src/main.ts
Implemented database indexing optimizations:

Added index on verificationToken field
Updated apps/auth-service/prisma/schema.prisma
Kafka Consumer Service:

Created initial service structure
Kafka connection configured in apps/kafka-consumer/src/main.ts
Plugin installation issues remain (requires further investigation)

---

## 5. Detailed Action Items

### **P1.1 - JWT Secret Hardening**
```bash
# 1. Add to .env files
JWT_SECRET=complex_random_string_here

# 2. Update auth service and middleware to use process.env.JWT_SECRET
# 3. Remove hardcoded 'supersecret' from codebase
```

### **P1.2 - Email Verification System**
```prisma
// Add to User schema
model User {
  // ... existing fields
  emailVerified Boolean @default(false)
  verificationToken String?
  verificationTokenExpires DateTime?
}
```
- **API Endpoints Needed:** `/auth/send-verification`, `/auth/verify/:token`
- **Frontend:** Verification prompt after registration

### **P1.3 - Role-Based Access Control**
- Extend `authMiddleware` to check `req.user.role`
- Add vendor-specific middleware: `vendorMiddleware`
- Update product creation to require `vendor` role

### **P2.1 - AI Recommendation Consumer**
```typescript
// New service: apps/recommendation-service
// Consumes: product-views, order-created topics
// Generates: user-product affinity scores
// Exposes: GET /recommendations/:userId
```

### **P2.2 - Vendor API Foundation**
```typescript
// Add to product-service:
GET /vendor/products - List vendor's products
POST /vendor/products - Create product (vendor only)
PATCH /vendor/products/:id - Update product stock/details

// Add to order-service:
GET /vendor/orders - Orders for vendor's products
```

---

## 6. Architecture Recommendations

### **Immediate (Next Sprint)**
1. **Security First:** Address P1 items before production deployment
2. **Minimum Viable Vendor:** Implement basic vendor APIs to unblock dashboard
3. **Event Pipeline:** Stand up Kafka consumer skeleton

### **Medium Term (Next Quarter)**
1. **Service Discovery:** Consider Consul or Kubernetes services
2. **Monitoring:** Add OpenTelemetry instrumentation
3. **Caching:** Redis for product catalog and recommendations
4. **Async Communication:** Replace some HTTP calls with events

### **Long Term**
1. **GraphQL Gateway:** Consider Apollo Federation for frontend data needs
2. **Machine Learning Pipeline:** Dedicated ML service for recommendations
3. **Multi-tenancy:** Support multiple storefronts/vendors

---

## 7. Risk Assessment

| Risk | Impact | Likelihood | Mitigation |
|------|--------|------------|------------|
| No email verification | High | High | Implement before public launch |
| Hardcoded JWT secret | Critical | High | Environment variables immediately |
| Missing Kafka consumers | Medium | High | Build consumer service next sprint |
| Vendor dashboard dead end | High | Certain | Prioritize vendor API development |
| No AI recommendations | Medium | Medium | Start with simple collaborative filtering |

---

## 8. Success Metrics

- **Security:** 100% of users verified via email before first purchase
- **Performance:** <100ms response time for 95% of API calls
- **Reliability:** 99.9% uptime for core services (auth, products, orders)
- **Business:** Vendor onboarding < 10 minutes from signup to first product listing
- **AI:** >30% click-through rate on recommended products

---

**Report Generated:** 2026-03-23  
**Next Review:** 30 days from implementation of P1 items