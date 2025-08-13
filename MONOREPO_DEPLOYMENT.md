# 🚀 Monorepo Deployment Guide - Deploy Both Frontend & Backend at Once

## 📋 Overview

Your Udyam Registration Portal is structured as a monorepo with both frontend and backend in one repository. Here's how to deploy both services simultaneously on Render.

## 🗂️ Repository Structure

```
udyam/ (Repository: kiran0702/udyam)
├── frontend/          ← Static Site deployment
├── backend/           ← Web Service deployment
├── .gitignore         ← Root protection
└── README.md
```

## 🚀 Deployment Steps (Deploy Both at Once)

### Step 1: Create PostgreSQL Database First

1. Go to Render Dashboard
2. Click **New** → **PostgreSQL**
3. **Name:** `udyam-database`
4. **Database:** `udyamdb`
5. **User:** `udyam_user`
6. **Region:** Same as your services
7. **Instance Type:** Free
8. **Copy the Internal Database URL** (you'll need this)

### Step 2: Deploy Backend (Web Service)

1. Go to Render Dashboard
2. Click **New** → **Web Service**
3. **Connect Repository:** `kiran0702/udyam`
4. **Configuration:**

| Field              | Value                          |
| ------------------ | ------------------------------ |
| **Name**           | `udyam-backend`                |
| **Root Directory** | `backend`                      |
| **Environment**    | `Node`                         |
| **Build Command**  | `npm install && npm run build` |
| **Start Command**  | `npm start`                    |
| **Instance Type**  | `Free`                         |

**Environment Variables:**

```bash
DATABASE_URL=<your-postgresql-internal-url>
NODE_ENV=production
PORT=10000
FRONTEND_URL=https://udyam-frontend.onrender.com
LOG_LEVEL=info
```

### Step 3: Deploy Frontend (Static Site)

1. Go to Render Dashboard
2. Click **New** → **Static Site**
3. **Connect Repository:** `kiran0702/udyam` (same repo)
4. **Configuration:**

| Field                 | Value                          |
| --------------------- | ------------------------------ |
| **Name**              | `udyam-frontend`               |
| **Root Directory**    | `frontend`                     |
| **Build Command**     | `npm install && npm run build` |
| **Publish Directory** | `dist`                         |

**Environment Variables:**

```bash
VITE_API_URL=https://udyam-backend.onrender.com/registration
VITE_APP_NAME=Udyam Registration Portal
VITE_NODE_ENV=production
VITE_ENABLE_PIN_AUTOFILL=true
VITE_ENABLE_PROGRESS_TRACKER=true
```

## ⚡ Quick Commands Reference

### Backend Commands:

```bash
# Build Command
npm install && npm run build

# Start Command
npm start
```

### Frontend Commands:

```bash
# Build Command
npm install && npm run build

# Publish Directory
dist
```

## 🔗 Service Dependencies (Deploy in this order)

1. **Database** → Creates first (independent)
2. **Backend** → Needs database URL
3. **Frontend** → Needs backend URL

## 🌐 Expected URLs After Deployment

- **Frontend:** `https://udyam-frontend.onrender.com`
- **Backend:** `https://udyam-backend.onrender.com`
- **API Health:** `https://udyam-backend.onrender.com/health`
- **Database:** Internal only (not publicly accessible)

## ✅ Environment Variables Checklist

### Backend Environment Variables:

- [ ] `DATABASE_URL` - From PostgreSQL service
- [ ] `NODE_ENV=production`
- [ ] `PORT=10000`
- [ ] `FRONTEND_URL` - Your frontend URL for CORS

### Frontend Environment Variables:

- [ ] `VITE_API_URL` - Your backend URL + `/registration`
- [ ] `VITE_APP_NAME=Udyam Registration Portal`
- [ ] `VITE_NODE_ENV=production`

## 🔄 Deployment Process Timeline

1. **Database Creation:** ~2-3 minutes
2. **Backend Deployment:** ~5-7 minutes
   - Install dependencies
   - Run Prisma migrations
   - Start server
3. **Frontend Deployment:** ~3-5 minutes
   - Install dependencies
   - Build React app
   - Deploy static files

**Total Time:** ~10-15 minutes for both services

## 🧪 Testing After Deployment

### 1. Backend Health Check

```bash
curl https://udyam-backend.onrender.com/health
```

**Expected Response:**

```json
{
  "status": "OK",
  "environment": "production",
  "timestamp": "2025-08-14T..."
}
```

### 2. Frontend Load Test

- Visit: `https://udyam-frontend.onrender.com`
- Should see: Government portal with Udyam branding
- Test: Form submission should work

### 3. Full Integration Test

1. Open frontend URL
2. Fill Aadhaar form (Step 1)
3. Submit → Should go to Step 2
4. Fill PAN form (Step 2)
5. Submit → Should save to database

## 🚨 Common Issues & Solutions

### Issue 1: Backend Build Fails

**Solution:** Check if all dependencies are in `package.json`

```bash
# In backend directory locally:
npm install
npm run build
```

### Issue 2: Frontend Build Fails

**Solution:** Check if all dependencies are in `package.json`

```bash
# In frontend directory locally:
npm install
npm run build
```

### Issue 3: CORS Errors

**Solution:** Update `FRONTEND_URL` in backend environment variables

### Issue 4: Database Connection Fails

**Solution:** Check `DATABASE_URL` format and ensure database is created

## 🎯 Deployment Success Criteria

- [ ] Database is created and accessible
- [ ] Backend service is running and healthy
- [ ] Frontend is built and serving static files
- [ ] API calls from frontend to backend work
- [ ] Form submissions save data to database
- [ ] CORS is properly configured
- [ ] All environment variables are set

## 🔧 Post-Deployment Configuration

### Custom Domain (Optional)

1. **Backend:** Add custom domain in Render dashboard
2. **Frontend:** Add custom domain in Render dashboard
3. **Update:** Environment variables with new domains

### SSL Certificates

- ✅ **Automatic:** Render provides SSL certificates for all services
- ✅ **HTTPS:** All traffic is automatically encrypted

## 🎉 Success!

Once deployed, your Udyam Registration Portal will be:

- ✅ **Fully functional** on production URLs
- ✅ **Secure** with HTTPS and proper CORS
- ✅ **Scalable** with Render's auto-scaling
- ✅ **Backed up** with automatic database backups
- ✅ **Monitored** with built-in health checks

**Your government-grade portal is now live! 🇮🇳**
