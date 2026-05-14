# 🚀 NexaCore Deployment Guide

Your code is now **live on GitHub** at: https://github.com/kenny-web-254/pharmaos

Follow these steps to deploy to Render (Backend) and Vercel (Frontend).

---

## 📋 Prerequisites

- ✅ GitHub Personal Access Token (you already have this)
- Render.com account (free)
- Vercel account (free)
- MongoDB Atlas account (free)

---

## 🗄️ Step 1: Set Up MongoDB Atlas (Database)

MongoDB is where all your data is stored. You need this for both backend and frontend.

### 1.1 Create MongoDB Atlas Account
1. Go to https://www.mongodb.com/cloud/atlas
2. Click "Try Free"
3. Sign up with email/GitHub
4. Create a free cluster (M0 - free forever)

### 1.2 Get Your Connection String
1. After cluster is created, click "Connect"
2. Choose "Connect your application"
3. Copy the connection string (looks like: `mongodb+srv://username:password@cluster.mongodb.net/nexacore`)
4. Replace `<username>` and `<password>` with your MongoDB credentials
5. Keep this handy - you'll need it for Render

### 1.3 Create Database User
1. In MongoDB Atlas, go to "Database Access"
2. Click "Add New User"
3. Username: `nexacore_user`
4. Password: `(generate secure password)`
5. Role: `Atlas Admin`
6. Click "Create User"

### 1.4 Whitelist IP Address
1. Go to "Network Access"
2. Click "Add IP Address"
3. Click "Allow access from anywhere" (or add specific Render IP)
4. Confirm

✅ **MongoDB is ready!**

---

## 🔧 Step 2: Deploy Backend to Render

Render hosts your API and connects to MongoDB.

### 2.1 Create Render Account
1. Go to https://render.com
2. Sign up with GitHub
3. Connect your GitHub account
4. Authorize integration

### 2.2 Create New Web Service
1. Dashboard → New+ → Web Service
2. Connect to your repository: `kenny-web-254/pharmaos`
3. Select repository

### 2.3 Configure Service
- **Name**: `pharmaos-backend`
- **Environment**: `Node`
- **Build Command**: `cd backend && npm install`
- **Start Command**: `cd backend && npm start`
- **Plan**: Free (or Starter for more power)

### 2.4 Add Environment Variables
In Render dashboard, under "Environment" → "Environment Variables", add:

```
NODE_ENV=production
PORT=5000
JWT_SECRET=your_super_secret_jwt_key_min_32_chars_long
JWT_EXPIRE=7d
MONGODB_URI=mongodb+srv://nexacore_user:YOUR_PASSWORD@cluster.mongodb.net/nexacore?retryWrites=true&w=majority
FRONTEND_URL=https://pharmaos.vercel.app
```

**Replace with your actual values:**
- `your_super_secret_jwt_key_min_32_chars_long` → Choose a long random string
- `YOUR_PASSWORD` → Your MongoDB password
- `cluster.mongodb.net` → Your MongoDB cluster full address

### 2.5 Deploy
1. Click "Create Web Service"
2. Wait for deployment (takes 2-3 minutes)
3. You'll get a URL like: `https://pharmaos-backend.onrender.com`
4. **Copy this URL** - you need it for Vercel

✅ **Backend deployed!**

---

## 🎨 Step 3: Deploy Frontend to Vercel

Vercel hosts your React app.

### 3.1 Create Vercel Account
1. Go to https://vercel.com
2. Sign up with GitHub
3. Connect your GitHub account

### 3.2 Import Project
1. Dashboard → Add New → Project
2. Select your repository: `kenny-web-254/pharmaos`
3. Click "Import"

### 3.3 Configure Project
- **Framework**: Vite
- **Root Directory**: `./frontend`
- **Build Command**: `npm run build`
- **Output Directory**: `dist`
- **Install Command**: `npm install`

### 3.4 Add Environment Variables
Under "Environment Variables", add:

```
VITE_API_URL=https://pharmaos-backend.onrender.com
```

**Replace with your actual Render backend URL from Step 2.5**

### 3.5 Deploy
1. Click "Deploy"
2. Wait for deployment (takes 1-2 minutes)
3. You'll get a URL like: `https://pharmaos.vercel.app`
4. Your app is live! 🎉

✅ **Frontend deployed!**

---

## 🧪 Step 4: Test Your Live App

1. Visit: https://pharmaos.vercel.app
2. Login with demo credentials:
   - **Email**: `demo@nexacore.com`
   - **Password**: `demo123456`

3. Create a new account to test registration (this creates a new organization)

4. Test features:
   - Dashboard (analytics)
   - Inventory (products)
   - POS (shopping cart)
   - Customers
   - Reports

✅ **Everything working?** You're done! 🚀

---

## 📝 Update Backend URL in Frontend (If Needed)

If you deploy backend after frontend, update the environment variable:

1. Go to Vercel Dashboard
2. Select `pharmaos` project
3. Project Settings → Environment Variables
4. Edit `VITE_API_URL`
5. Update with your Render backend URL
6. Redeploy (click "Redeploy" in Deployments)

---

## 🔄 Continuous Deployment

Every time you push to GitHub (`git push`), both services automatically redeploy!

1. **Backend**: Render pulls latest code from `backend/` folder
2. **Frontend**: Vercel pulls latest code from `frontend/` folder

---

## 🐛 Troubleshooting

### Backend Deploy Fails
- Check that `backend/package.json` exists
- Check that `backend/src/server.js` starts properly
- Review Render logs for errors

### Frontend Won't Load
- Check `VITE_API_URL` environment variable
- Clear browser cache (Ctrl+Shift+Delete)
- Check browser console for errors (F12)
- Ensure backend is running (visit backend URL directly)

### Can't Login After Deploy
- Verify MongoDB connection string in Render
- Check JWT_SECRET is set correctly
- Check FRONTEND_URL points to your Vercel domain

### API Calls Fail
- Check backend URL in Vercel environment variables
- Ensure CORS is enabled (it is in our backend)
- Check browser network tab (F12 → Network)

---

## 📊 Monitoring & Logs

### Backend Logs (Render)
1. Dashboard → `pharmaos-backend` service
2. Click "Logs" tab
3. See real-time server logs

### Frontend Logs (Vercel)
1. Dashboard → `pharmaos` project
2. Click "Deployments" → Latest
3. Click "Logs" to see build logs
4. Use browser console (F12) for runtime logs

---

## 🎯 Quick Links

- **GitHub Repository**: https://github.com/kenny-web-254/pharmaos
- **Live Backend**: https://pharmaos-backend.onrender.com
- **Live Frontend**: https://pharmaos.vercel.app
- **MongoDB Atlas**: https://cloud.mongodb.com
- **Render Dashboard**: https://dashboard.render.com
- **Vercel Dashboard**: https://vercel.com/dashboard

---

## 📞 Next Steps

1. **Customize your app** (change colors, business name, etc.)
2. **Add your real products** to inventory
3. **Invite team members** to your organization
4. **Configure your branch settings** (address, logo)
5. **Set up payment processing** (optional)
6. **Create backup strategy** (MongoDB Atlas backups)

---

## 🎉 You're Live!

Your NexaCore multi-tenant business OS is now deployed and accessible worldwide. Share your app link with team members and customers!

**Happy selling! 🚀**
