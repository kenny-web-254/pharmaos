# 🚀 LIVE DEPLOYMENT WALKTHROUGH

## Your Credentials (Keep Safe)
```
MongoDB URI: mongodb+srv://kenrodgersutugi_db_user:pharmasystem@cluster0.kxqnw0u.mongodb.net/?appName=Cluster0
JWT Secret: f0bcb90d385894a0a6e3f116cbdf4801d0f98a7304505f47a1fc3669ed260782
MongoDB Password: pharmasystem
```

---

## ⚡ DEPLOY BACKEND TO RENDER (5 minutes)

### Step 1: Login to Render
1. Open: https://render.com/login
2. Click "GitHub" button
3. Authorize with your GitHub account (kenny-web-254)
4. You'll be redirected to Render Dashboard

### Step 2: Create New Service
1. On Dashboard, click **"New +"** (top right)
2. Select **"Web Service"**
3. Select your repository: **kenny-web-254/pharmaos**
4. Click **"Connect"**

### Step 3: Configure Service
Fill in these settings:
- **Name**: `pharmaos-backend`
- **Environment**: `Node`
- **Region**: `Oregon` (default)
- **Branch**: `main`
- **Build Command**: `cd backend && npm install`
- **Start Command**: `cd backend && npm start`
- **Plan**: `Free` (or Starter if you want better performance)

### Step 4: Add Environment Variables
After clicking "Create Web Service", you'll see "Environment Variables" section.

Click **"Add Environment Variable"** and add these (one by one):

| Key | Value |
|-----|-------|
| `NODE_ENV` | `production` |
| `PORT` | `5000` |
| `JWT_SECRET` | `f0bcb90d385894a0a6e3f116cbdf4801d0f98a7304505f47a1fc3669ed260782` |
| `JWT_EXPIRE` | `7d` |
| `MONGODB_URI` | `mongodb+srv://kenrodgersutugi_db_user:pharmasystem@cluster0.kxqnw0u.mongodb.net/?appName=Cluster0` |
| `FRONTEND_URL` | `https://pharmaos.vercel.app` |

### Step 5: Deploy
1. Click **"Create Web Service"** button
2. Wait 2-3 minutes for deployment
3. You'll see a URL like: `https://pharmaos-backend.onrender.com`
4. **COPY THIS URL** - you need it for Vercel!

✅ **Backend deployed!**

---

## 🎨 DEPLOY FRONTEND TO VERCEL (3 minutes)

### Step 1: Login to Vercel
1. Open: https://vercel.com/login
2. Click **"Continue with GitHub"**
3. Authorize with your GitHub account
4. You'll see Vercel Dashboard

### Step 2: Import Project
1. Click **"Add New"** (top right)
2. Select **"Project"**
3. Search for: `pharmaos`
4. Select: **kenny-web-254/pharmaos**
5. Click **"Import"**

### Step 3: Configure Project
You'll see a configuration form. Set these:

**Root Directory**:
- Click dropdown
- Select: `./frontend`

**Build Command**:
- Should show: `npm run build`
- Keep as is ✅

**Output Directory**:
- Should show: `dist`
- Keep as is ✅

**Install Command**:
- Should show: `npm install`
- Keep as is ✅

### Step 4: Add Environment Variable
Scroll down to **"Environment Variables"** section.

Click **"Add"** and fill:
- **Name**: `VITE_API_URL`
- **Value**: `https://pharmaos-backend.onrender.com` (from Step 5 above)
- Select **"Production"** checkbox
- Click **"Add"**

### Step 5: Deploy
1. Click **"Deploy"** button
2. Wait 1-2 minutes
3. You'll see: `Congratulations! Your project has been successfully deployed`
4. You'll get a URL like: `https://pharmaos.vercel.app`

✅ **Frontend deployed!**

---

## 🧪 TEST YOUR LIVE APP (1 minute)

### Visit Your App
1. Open: **https://pharmaos.vercel.app**
2. You should see the NexaCore login page

### Login with Demo Account
- **Email**: `demo@nexacore.com`
- **Password**: `demo123456`

### Test Features
- ✅ Dashboard (see analytics)
- ✅ Inventory (see products)
- ✅ POS (add items to cart)
- ✅ Customers (view customer list)
- ✅ Reports (see charts)

### Create New Organization
1. Click "Create Account" on login page
2. Fill in your details
3. Create a new organization
4. This tests the registration flow

✅ **Everything working? You're live!** 🎉

---

## 📊 MONITORING YOUR DEPLOYMENT

### Backend Logs (Render)
1. Go to: https://dashboard.render.com
2. Click on `pharmaos-backend` service
3. Click **"Logs"** tab
4. See real-time server events

### Frontend Logs (Vercel)
1. Go to: https://vercel.com/dashboard
2. Click on `pharmaos` project
3. Click **"Deployments"** tab
4. Click latest build for details

### Database Status (MongoDB)
1. Go to: https://cloud.mongodb.com
2. View your cluster status
3. Check connection metrics

---

## 🔄 MAKING CHANGES & REDEPLOYING

### To Deploy Changes
1. Make changes to code
2. Commit: `git add . && git commit -m "Your message"`
3. Push: `git push`
4. Both services auto-redeploy! ✅

**Render** watches `backend/` folder
**Vercel** watches `frontend/` folder

---

## 🐛 TROUBLESHOOTING

### "Backend deployment failed"
- Check Render logs for errors
- Verify build command includes `cd backend`
- Check all environment variables are set
- Ensure port is 5000

### "Frontend won't load"
- Check VITE_API_URL environment variable in Vercel
- Verify backend URL is correct
- Open browser console (F12) for errors
- Check if backend is running

### "Can't login"
- Verify MongoDB connection string
- Check JWT_SECRET is set
- Ensure MONGODB_URI is complete
- Check MongoDB Atlas whitelist includes Render IP

### "API calls failing"
- Check backend logs for errors
- Verify CORS is enabled (it is!)
- Check browser network tab (F12)
- Ensure backend URL in frontend env vars

---

## 📞 YOUR LIVE URLS

| Service | URL |
|---------|-----|
| **App** | https://pharmaos.vercel.app |
| **Backend API** | https://pharmaos-backend.onrender.com |
| **GitHub Repo** | https://github.com/kenny-web-254/pharmaos |
| **Render Dashboard** | https://dashboard.render.com |
| **Vercel Dashboard** | https://vercel.com/dashboard |
| **MongoDB Atlas** | https://cloud.mongodb.com |

---

## ✨ NEXT STEPS AFTER DEPLOYMENT

1. **Customize Your Organization**
   - Change business name
   - Upload logo
   - Set business type (Pharmacy, Retail, etc.)

2. **Add Your Products**
   - Import your product catalog
   - Set prices and margins
   - Configure inventory

3. **Invite Team Members**
   - Add users with different roles
   - Set permissions
   - Assign branches

4. **Configure Branches**
   - Add multiple locations
   - Set branch details
   - Assign inventory

5. **Enable Features**
   - Set up notifications
   - Configure payment methods
   - Enable barcode scanning

---

## 🎉 YOU'RE LIVE!

Your enterprise SaaS platform is now accessible worldwide.

Share your app link: **https://pharmaos.vercel.app**

**Happy selling!** 🚀

---

## ❓ QUICK CHECKLIST

Before going live in production:

- [ ] MongoDB backup enabled
- [ ] JWT_SECRET is strong (32+ chars)
- [ ] CORS is configured correctly
- [ ] Error logs are monitored
- [ ] Environment variables are secure
- [ ] Database connection string works
- [ ] APIs respond correctly
- [ ] Frontend connects to backend
- [ ] Demo account works
- [ ] New organization creation works

All ✅? You're ready to onboard real users!
