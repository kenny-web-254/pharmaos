# NexaCore - Complete Setup Guide

## Table of Contents
1. [Local Development Setup](#local-development-setup)
2. [Production Deployment](#production-deployment)
3. [Database Setup](#database-setup)
4. [Troubleshooting](#troubleshooting)
5. [First Steps](#first-steps)

---

## Local Development Setup

### Prerequisites
- Node.js 16+ ([Download](https://nodejs.org))
- MongoDB (local or Atlas account)
- Git
- VS Code (optional but recommended)

### Step 1: Clone Repository
```bash
git clone <repository-url>
cd NexaCore
```

### Step 2: Backend Setup

```bash
# Navigate to backend
cd backend

# Install dependencies
npm install

# Create .env file
cp .env.example .env

# Edit .env with your settings
nano .env
```

**.env Configuration:**
```env
NODE_ENV=development
PORT=5000
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/nexacore?retryWrites=true&w=majority
JWT_SECRET=your-super-secret-key-change-this
JWT_EXPIRE=7d
FRONTEND_URL=http://localhost:5173
```

```bash
# Seed demo data (creates test org and users)
npm run seed

# Start development server
npm run dev
```

✅ Backend running on `http://localhost:5000`

### Step 3: Frontend Setup

```bash
# Navigate to frontend (new terminal)
cd frontend

# Install dependencies
npm install

# Create .env file
cp .env.example .env

# Start development server
npm run dev
```

✅ Frontend running on `http://localhost:5173`

### Step 4: Login

Visit `http://localhost:5173` and login with:
```
Email: demo@nexacore.com
Password: demo123456
```

---

## Production Deployment

### Backend Deployment (Render.com)

1. **Create Render Account**
   - Visit [render.com](https://render.com)
   - Sign up

2. **Connect GitHub**
   - GitHub → Settings → Connected applications
   - Authorize Render

3. **Create Web Service**
   - Render Dashboard → New → Web Service
   - Connect your NexaCore repository
   - Select `backend` directory
   - Build Command: `npm install`
   - Start Command: `npm start`

4. **Environment Variables**
   - Add to Render:
   ```
   NODE_ENV=production
   MONGODB_URI=your_mongodb_uri
   JWT_SECRET=your_secret_key
   FRONTEND_URL=your_frontend_url
   ```

5. **Deploy**
   - Click Deploy
   - Wait for build to complete

✅ Backend deployed to `https://your-app.onrender.com`

### Frontend Deployment (Vercel)

1. **Create Vercel Account**
   - Visit [vercel.com](https://vercel.com)
   - Sign up with GitHub

2. **Import Project**
   - Vercel Dashboard → Add New → Project
   - Select your NexaCore repository
   - Select `frontend` directory
   - Framework: Vite

3. **Environment Variables**
   - Add variable:
   ```
   VITE_API_URL=https://your-backend-url/api/v1
   ```

4. **Deploy**
   - Click Deploy
   - Wait for build

✅ Frontend deployed to `https://your-app.vercel.app`

### Database Setup (MongoDB Atlas)

1. **Create MongoDB Account**
   - Visit [mongodb.com](https://mongodb.com)
   - Click Sign Up

2. **Create Organization & Project**
   - Create new organization
   - Create new project
   - Create cluster
   - Choose free tier (M0)

3. **Configure Access**
   - Network → Add IP Address → Allow from anywhere (0.0.0.0/0)
   - Database Access → Add user
     - Username: `nexacore`
     - Password: Generate password
   - Click Add User

4. **Get Connection String**
   - Databases → Connect
   - Select "Drivers"
   - Copy connection string
   - Replace placeholders with your credentials

5. **Test Connection**
   ```bash
   # In backend directory
   npm run seed  # Uses MONGODB_URI from .env
   ```

---

## Database Setup

### MongoDB Collections

After seeding, you'll have:

- **organizations** - Business entities
- **users** - Platform users
- **branches** - Store locations
- **products** - Inventory items
- **productcategories** - Product categories
- **customers** - Customer profiles
- **suppliers** - Supplier information
- **sales** - POS transactions
- **purchaseorders** - Stock orders
- **inventorylogs** - Stock tracking
- **notifications** - System alerts

### Database Backups

**Automatic Backups:**
- MongoDB Atlas: Enabled by default
- Backups kept for 35 days

**Manual Export:**
```bash
# Export all data
mongodump --uri="your-mongodb-uri" --out=./backup

# Import data
mongorestore ./backup --uri="your-mongodb-uri"
```

---

## Troubleshooting

### Backend Issues

**Port Already in Use**
```bash
# Kill process on port 5000
# Linux/Mac:
lsof -ti:5000 | xargs kill -9

# Windows:
netstat -ano | findstr :5000
taskkill /PID <PID> /F
```

**MongoDB Connection Failed**
- Verify connection string
- Check firewall/network
- Ensure IP is whitelisted in Atlas
- Test with:
  ```bash
  mongo "your-connection-string"
  ```

**JWT Errors**
- Generate new JWT_SECRET
- Ensure same secret in .env
- Clear browser storage and re-login

### Frontend Issues

**API Not Connecting**
- Check VITE_API_URL
- Ensure backend is running
- Check browser console for CORS errors
- Verify API response

**Build Fails**
```bash
# Clear cache and rebuild
rm -rf node_modules dist
npm install
npm run build
```

**PWA Not Installing**
- Check manifest.json is valid
- Ensure HTTPS in production
- Clear browser cache
- Try different browser

### Database Issues

**Slow Queries**
- Add indices to frequently queried fields
- Check MongoDB cluster resources
- Upgrade to larger instance

**Storage Full**
- Delete old transaction logs
- Archive historical data
- Upgrade storage

---

## First Steps

### 1. Customize Organization
- Login with demo account
- Go to Settings
- Update organization name, logo, colors
- Configure tax rates, currency

### 2. Add Your Products
- Go to Inventory
- Click "Add Product"
- Add your items with prices
- Group by categories

### 3. Create Team Members
- Go to Settings → Users
- Invite teammates
- Assign roles (Cashier, Manager, etc.)

### 4. Set Up Branches
- Go to Settings → Branches
- Add your store locations
- Assign managers

### 5. Create Customers
- Go to Customers
- Add your regular customers
- Set loyalty programs

### 6. First Sale
- Go to POS
- Search for products
- Add to cart
- Complete sale

### 7. Check Reports
- Go to Reports
- View sales trends
- Export data as PDF/Excel

---

## Performance Tips

### Frontend
- Use dark mode for battery savings
- Enable PWA for faster loading
- Clear browser cache monthly
- Use latest browser version

### Backend
- Monitor MongoDB indexes
- Use connection pooling
- Enable gzip compression
- Cache API responses

### Database
- Regular backups
- Delete old logs
- Optimize queries
- Monitor storage usage

---

## Security Checklist

- [ ] Change JWT_SECRET in production
- [ ] Enable HTTPS everywhere
- [ ] Use strong passwords
- [ ] Enable 2FA in MongoDB Atlas
- [ ] Whitelist IP addresses
- [ ] Regular security updates
- [ ] Monitor API logs
- [ ] Encrypt sensitive data
- [ ] Use environment variables
- [ ] Regular backups

---

## Need Help?

### Documentation
- See main [README.md](../README.md)
- Backend docs: [backend/README.md](../backend/README.md)
- Frontend docs: [frontend/README.md](../frontend/README.md)

### Common Questions

**Q: Can I use SQLite instead of MongoDB?**
A: Yes, but you'd need to rewrite the models. MongoDB is recommended for multi-tenancy.

**Q: What's the maximum number of users/organizations?**
A: Unlimited! System scales horizontally on MongoDB Atlas.

**Q: How do I backup data?**
A: MongoDB Atlas handles automated backups. Use mongodump for manual backups.

**Q: Can I self-host the backend?**
A: Yes! Deploy to any Node.js compatible platform (Heroku, AWS, DigitalOcean, etc.)

**Q: Is the frontend PWA required?**
A: No. You can use it as a regular web app. PWA is optional but recommended.

---

## Version History

- **v1.0.0** - Initial release
  - Multi-tenant architecture
  - Core CRUD operations
  - POS system
  - PWA support

---

**Happy Deploying! 🚀**
