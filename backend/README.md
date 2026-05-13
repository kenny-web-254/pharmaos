# NexaCore Backend

RESTful API server for NexaCore SaaS platform.

## Quick Start

### Installation
```bash
npm install
```

### Configuration
```bash
cp .env.example .env
# Edit with your MongoDB URI
```

### Run Development Server
```bash
npm run dev
```

### Seed Demo Data
```bash
npm run seed
```

### Start Production
```bash
npm start
```

## API Endpoints

### Auth
- `POST /api/v1/auth/register` - Register
- `POST /api/v1/auth/login` - Login
- `GET /api/v1/auth/me` - Current user

### Organizations
- `GET /api/v1/organizations/:orgId` - Get org
- `PUT /api/v1/organizations/:orgId/settings` - Update settings
- `GET /api/v1/organizations/:orgId/users` - Get users
- `POST /api/v1/organizations/:orgId/branches` - Create branch

### Inventory
- `GET /api/v1/inventory/:orgId/products` - Get products
- `POST /api/v1/inventory/:orgId/products` - Add product
- `PUT /api/v1/inventory/:orgId/products/:id` - Update
- `POST /api/v1/inventory/:orgId/products/:id/adjust-stock` - Adjust stock

### POS/Sales
- `POST /api/v1/pos/:orgId/branches/:bid/sales` - Create sale
- `GET /api/v1/pos/:orgId/branches/:bid/sales` - Get sales
- `POST /api/v1/pos/:orgId/sales/:id/void` - Void sale

### Customers & Suppliers
- `GET /api/v1/managers/:orgId/customers` - Get customers
- `POST /api/v1/managers/:orgId/customers` - Add customer
- `GET /api/v1/managers/:orgId/suppliers` - Get suppliers

## Environment Variables

```
NODE_ENV=development
PORT=5000
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/nexacore
JWT_SECRET=your_secret_key
JWT_EXPIRE=7d
FRONTEND_URL=http://localhost:5173
```

## Project Structure

```
src/
├── config/         # Database & constants
├── controllers/    # Request handlers
├── middleware/     # Auth, errors
├── models/         # MongoDB schemas
├── routes/         # API routes
├── services/       # Business logic
└── utils/          # Helpers
```

## Technology

- Express.js
- MongoDB + Mongoose
- JWT Authentication
- Bcrypt Password Hashing
- CORS & Security Headers

## Notes

- Multi-tenant architecture with organization isolation
- Role-based access control (RBAC)
- Comprehensive error handling
- Input validation on all routes
- Audit logging support

For more info, see main README.md
