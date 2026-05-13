# NexaCore - Enterprise Multi-Tenant Business Operating System

**A futuristic, premium-grade PWA platform for managing multi-industry businesses**

---

## 🚀 Overview

NexaCore is a complete, production-ready SaaS platform that serves as a unified business operating system for multiple industries. It combines enterprise-grade architecture with stunning, modern UI/UX in one comprehensive solution.

### ✨ Key Features

- **Multi-Tenant Architecture** - Complete data isolation between organizations
- **Many Support for Multiple Industries** - Pharmacy, Retail, Restaurant, Clinic, Beauty, etc.
- **Universal POS System** - Fast, intuitive point-of-sale with barcode scanning
- **Advanced Inventory Management** - Stock tracking, expiry alerts, low stock notifications
- **Customer Management** - Profiles, loyalty programs, purchase history
- **Beautiful Analytics Dashboard** - Real-time insights and business intelligence
- **Premium UI/UX** - Glassmorphism design, smooth animations, dark mode
- **Progressive Web App (PWA)** - Installable, offline-capable, mobile-first
- **RBAC & Permissions** - Role-based access control with granular permissions
- **Multi-Branch Support** - Manage multiple locations with unified inventory
- **Responsive Design** - Works perfectly on desktop, tablet, and mobile
- **AI-Ready** - Architecture prepared for AI analytics and predictions

---

## 📋 Tech Stack

### Frontend
- **React 18** - UI library
- **Vite** - Lightning-fast build tool
- **TypeScript** - Type-safe JavaScript
- **Tailwind CSS** - Utility-first styling
- **Shadcn UI** - Premium UI components
- **Framer Motion** - Smooth animations
- **Zustand** - State management
- **React Query** - Server state management
- **Recharts** - Data visualization
- **React Router** - Navigation
- **Axios** - HTTP client

### Backend
- **Node.js & Express** - REST API server
- **MongoDB Atlas** - NoSQL database
- **JWT** - Authentication
- **Bcrypt** - Password hashing
- **Mongoose** - ODM

### PWA
- **Vite PWA Plugin** - PWA setup
- **Service Workers** - Offline support
- **Web Manifest** - App metadata

---

## 🏗️ Project Structure

```
NexaCore/
├── backend/
│   ├── src/
│   │   ├── config/              # Database & constants
│   │   ├── controllers/         # Business logic
│   │   ├── middleware/          # Auth, errors, etc.
│   │   ├── models/              # MongoDB schemas
│   │   ├── routes/              # API routes
│   │   ├── services/            # Business services
│   │   ├── utils/               # Helper functions
│   │   ├── server.js            # Express server
│   │   └── seed.js              # Database seeding
│   ├── package.json
│   ├── .env.example
│   └── README.md
│
├── frontend/
│   ├── src/
│   │   ├── components/          # React components
│   │   ├── pages/               # Page components
│   │   ├── store/               # Zustand stores
│   │   ├── services/            # API services
│   │   ├── types/               # TypeScript types
│   │   ├── hooks/               # Custom hooks
│   │   ├── App.tsx              # Main app
│   │   ├── main.tsx             # Entry point
│   │   └── index.css            # Global styles
│   ├── public/
│   │   ├── sw.js                # Service worker
│   │   └── manifest.json        # PWA manifest
│   ├── index.html
│   ├── package.json
│   ├── vite.config.js
│   ├── tsconfig.json
│   ├── tailwind.config.js
│   ├── .env.example
│   └── README.md
│
└── README.md                     # This file
```

---

## ⚙️ Installation & Setup

### Prerequisites
- **Node.js** 16+ 
- **MongoDB Atlas** account (or local MongoDB)
- **npm** or **yarn**

### Backend Setup

1. **Navigate to backend directory**
   ```bash
   cd backend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure environment**
   ```bash
   cp .env.example .env
   # Edit .env with your MongoDB URI and JWT secret
   ```

4. **Seed demo data (optional)**
   ```bash
   npm run seed
   ```

5. **Start development server**
   ```bash
   npm run dev
   ```
   Server runs on `http://localhost:5000`

### Frontend Setup

1. **Navigate to frontend directory**
   ```bash
   cd frontend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure environment**
   ```bash
   cp .env.example .env
   # Ensure API URL points to backend
   ```

4. **Start development server**
   ```bash
   npm run dev
   ```
   App runs on `http://localhost:5173`

---

## 🔐 Demo Credentials

After seeding, use these credentials to login:

```
Email: demo@nexacore.com
Password: demo123456
Role: Owner
Organization: NexaCore Demo Pharmacy
```

---

## 📚 API Documentation

### Authentication Endpoints

```
POST   /api/v1/auth/register              - Register new user
POST   /api/v1/auth/login                 - Login user
GET    /api/v1/auth/me                    - Get current user
PUT    /api/v1/auth/profile               - Update profile
POST   /api/v1/auth/change-password       - Change password
POST   /api/v1/auth/logout                - Logout
```

### Organization Endpoints

```
GET    /api/v1/organizations/:orgId       - Get organization
PUT    /api/v1/organizations/:orgId/settings - Update settings
GET    /api/v1/organizations/:orgId/users   - Get users
POST   /api/v1/organizations/:orgId/users/invite - Invite user
GET    /api/v1/organizations/:orgId/branches - Get branches
POST   /api/v1/organizations/:orgId/branches   - Create branch
```

### Inventory Endpoints

```
GET    /api/v1/inventory/:orgId/products  - Get products
POST   /api/v1/inventory/:orgId/products  - Create product
PUT    /api/v1/inventory/:orgId/products/:id - Update product
DELETE /api/v1/inventory/:orgId/products/:id - Delete product
POST   /api/v1/inventory/:orgId/products/:id/adjust-stock - Adjust stock
GET    /api/v1/inventory/:orgId/categories - Get categories
```

### POS Endpoints

```
POST   /api/v1/pos/:orgId/branches/:bid/sales - Create sale
GET    /api/v1/pos/:orgId/branches/:bid/sales - Get sales
POST   /api/v1/pos/:orgId/sales/:id/void      - Void sale
```

### Customer Endpoints

```
GET    /api/v1/managers/:orgId/customers  - Get customers
POST   /api/v1/managers/:orgId/customers  - Create customer
PUT    /api/v1/managers/:orgId/customers/:id - Update customer
```

---

## 🎨 Features

### 1. **Multi-Tenant Architecture**
- Complete data isolation
- Tenant-aware APIs
- Organization switching
- Role-based access control

### 2. **Inventory Management**
- Product catalog
- Stock tracking
- Expiry date management (pharmacy)
- Low stock alerts
- Batch tracking
- CSV import/export

### 3. **POS System**
- Barcode scanning
- Quick product search
- Cart management
- Multiple payment methods
- Receipt printing
- Transaction history

### 4. **Analytics Dashboard**
- Revenue tracking
- Sales charts
- Top products
- Low stock alerts
- Customer insights
- Daily/monthly reports

### 5. **Customer Management**
- Customer profiles
- Purchase history
- Loyalty points
- Transaction tracking

### 6. **User & Roles**
- Multiple roles (Owner, Manager, Cashier, etc.)
- Granular permissions
- Activity logging
- Login history

### 7. **PWA Capabilities**
- Installable on any device
- Works offline
- Push notifications ready
- Background sync ready
- Responsive design

---

## 🚀 Deployment

### Backend Deployment (Render.com)

1. Create account on [render.com](https://render.com)
2. Connect GitHub repository
3. Create new Web Service
4. Set environment variables
5. Deploy!

### Frontend Deployment (Vercel)

1. Create account on [vercel.com](https://vercel.com)
2. Import project
3. Set environment variables
4. Deploy!

### Database (MongoDB Atlas)

1. Create cluster on [mongodb.com](https://mongodb.com)
2. Get connection string
3. Add to backend .env
4. Done!

---

## 🔧 Configuration

### Organization Business Types

- Pharmacy
- Retail
- Restaurant
- Hardware
- Beauty
- Electronics
- Warehouse
- Clinic
- Supermarket
- Salon
- Cafe

### Subscription Plans

- **Free** - 1 branch, 1 user, 100 products
- **Pro** - 5 branches, 20 users, 10K products
- **Enterprise** - Unlimited everything

### User Roles

- Super Admin
- Owner
- Manager
- Cashier
- Staff
- Pharmacist
- Storekeeper
- Branch Manager

---

## 📱 Mobile & PWA

NexaCore is fully responsive and PWA-enabled:

1. **Install on Mobile:**
   - On Chrome: Menu → Install app
   - On Safari: Share → Add to Home Screen
   - On Android: Similar to Chrome

2. **Offline Support:**
   - View cached data
   - Create offline transactions
   - Auto-sync when online

3. **Installable on Desktop:**
   - Windows/Mac/Linux
   - Desktop shortcut
   - Standalone window

---

## 🛠️ Development

### Project Setup
```bash
# Backend
cd backend && npm install
npm run dev

# Frontend (in another terminal)
cd frontend && npm install
npm run dev
```

### Building for Production

```bash
# Backend
npm run build

# Frontend
npm run build
```

### Environment Variables

**Backend (.env)**
```
NODE_ENV=development
PORT=5000
MONGODB_URI=mongodb+srv://...
JWT_SECRET=your_secret_key
JWT_EXPIRE=7d
FRONTEND_URL=http://localhost:5173
```

**Frontend (.env)**
```
VITE_API_URL=http://localhost:5000/api/v1
```

---

## 📊 Database Models

### Core Models
- **Organization** - Business entity
- **User** - Platform users
- **Branch** - Multi-location support
- **Product** - Inventory items
- **ProductCategory** - Product organization
- **Customer** - Customer profiles
- **Supplier** - Supplier information
- **Sale** - POS transactions
- **PurchaseOrder** - Stock purchasing
- **InventoryLog** - Stock tracking
- **Notification** - System alerts

---

## 🔒 Security

- **JWT Authentication**
- **Password Hashing** (bcrypt)
- **CORS Protection**
- **Input Validation**
- **SQL Injection Prevention**
- **XSS Protection**
- **Rate Limiting Ready**
- **HTTPS Ready**

---

## 📈 Performance

- **Optimized Bundle Size** - ~200KB gzipped
- **Image Optimization** - Lazy loading
- **Code Splitting** - Route-based
- **Caching Strategy** - Service workers
- **Database Indexing** - MongoDB indexes
- **API Pagination** - Efficient data loading

---

## 🐛 Troubleshooting

### Backend won't start
- Check MongoDB connection
- Verify .env variables
- Clear node_modules: `rm -rf node_modules && npm install`

### Frontend not connecting to backend
- Check VITE_API_URL
- Ensure backend is running
- Check CORS settings

### Database errors
- Verify MongoDB URI
- Check credentials
- Ensure network access is enabled

---

## 🤝 Contributing

Contributions welcome! Please:
1. Fork repository
2. Create feature branch
3. Commit changes
4. Push to branch
5. Open pull request

---

## 📄 License

MIT License - feel free to use in personal and commercial projects

---

## 📞 Support & Contact

- 📧 Email: support@nexacore.com
- 💬 Discord: [Join Server]
- 🐛 Issues: [GitHub Issues]

---

## 🙏 Acknowledgments

Built with modern web technologies and best practices for enterprise-grade SaaS platforms.

---

**NexaCore - Enterprise Business Operating System**
*Making business management simple, powerful, and beautiful.*
