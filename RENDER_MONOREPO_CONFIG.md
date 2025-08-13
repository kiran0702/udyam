# 🚀 Render Deployment Configuration - Monorepo Style

## 📦 Monorepo Package.json Setup (LingoVibe Style)

Your root `package.json` now handles both frontend and backend installations and builds with single commands!

### 🔧 Available Commands:

```bash
# Install all dependencies (both frontend & backend)
npm install

# Build both services
npm run build

# Start backend (for production)
npm start

# Development (runs both frontend & backend)
npm run dev

# Test both services
npm test
```

## 🌐 Render Deployment Configuration

### **1. Backend (Web Service)**

| Field | Value |
|-------|--------|
| **Repository** | `kiran0702/udyam` |
| **Root Directory** | `backend` |
| **Environment** | `Node` |
| **Build Command** | `npm install && npm run build` |
| **Start Command** | `npm start` |
| **Instance Type** | `Free` or `Starter` |

**Environment Variables:**
```bash
DATABASE_URL=<postgresql-url-from-render>
NODE_ENV=production
PORT=10000
FRONTEND_URL=https://udyam-frontend.onrender.com
LOG_LEVEL=info
```

### **2. Frontend (Static Site)**

| Field | Value |
|-------|--------|
| **Repository** | `kiran0702/udyam` |
| **Root Directory** | `frontend` |
| **Build Command** | `npm install && npm run build` |
| **Publish Directory** | `dist` |

**Environment Variables:**
```bash
VITE_API_URL=https://udyam-backend.onrender.com/registration
VITE_APP_NAME=Udyam Registration Portal
VITE_NODE_ENV=production
VITE_ENABLE_PIN_AUTOFILL=true
VITE_ENABLE_PROGRESS_TRACKER=true
```

### **3. Alternative: Full Stack Deployment (Single Service)**

If you want to deploy as a single service (backend serving frontend):

| Field | Value |
|-------|--------|
| **Repository** | `kiran0702/udyam` |
| **Root Directory** | `.` (root) |
| **Environment** | `Node` |
| **Build Command** | `npm install && npm run build && cp -r frontend/dist backend/public` |
| **Start Command** | `npm start` |

## ⚡ Build Process Explanation

### What happens when Render runs `npm install && npm run build`:

1. **npm install:**
   - Installs root dependencies (including `concurrently`)
   - Triggers `postinstall` script
   - Automatically runs `npm run install:all`
   - Installs backend dependencies (`cd backend && npm install`)
   - Installs frontend dependencies (`cd frontend && npm install`)

2. **npm run build:**
   - Runs `npm run build:backend` (Prisma generate + migrate)
   - Runs `npm run build:frontend` (Vite build → dist folder)

### Backend-specific build process:
```bash
cd backend && npm run build
# Executes: prisma generate && prisma migrate deploy
```

### Frontend-specific build process:
```bash
cd frontend && npm run build  
# Executes: vite build (creates dist/ folder)
```

## 🔄 Deployment Workflow

### Development Workflow:
```bash
# Clone repo
git clone https://github.com/kiran0702/udyam.git
cd udyam

# Install everything
npm install

# Start development (both services)
npm run dev
```

### Production Deployment (Render):
```bash
# Render automatically runs:
npm install          # Installs all dependencies
npm run build        # Builds both services
npm start            # Starts backend (frontend is static)
```

## 🎯 Benefits of This Setup

### ✅ **Single Command Installation:**
- No need to install frontend and backend separately
- Consistent dependency management
- Faster CI/CD pipeline

### ✅ **Unified Build Process:**
- Both services build with one command
- Consistent deployment across environments
- Easy to manage and maintain

### ✅ **LingoVibe-Style Efficiency:**
- Same pattern as successful LingoVibe deployment
- Proven monorepo architecture
- Scalable for future features

## 📋 Render Configuration Summary

### Quick Copy-Paste Configuration:

#### **Backend Web Service:**
```
Build Command: npm install && npm run build
Start Command: npm start
Root Directory: backend
```

#### **Frontend Static Site:**
```
Build Command: npm install && npm run build
Publish Directory: dist
Root Directory: frontend
```

## 🚨 Important Notes

1. **Package.json Location:** Root package.json manages both services
2. **Dependencies:** Each service has its own package.json + root has shared tools
3. **Build Order:** Backend builds first (database migrations), then frontend
4. **Environment Variables:** Set separately for each service in Render
5. **Auto-deployment:** Push to GitHub triggers both deployments

## ✅ Pre-Deployment Checklist

- [ ] Root package.json is configured with monorepo scripts
- [ ] Backend package.json has correct build and start scripts
- [ ] Frontend package.json has correct build script
- [ ] All environment variables are documented
- [ ] .gitignore protects sensitive files
- [ ] Repository is pushed to GitHub

## 🎉 Ready for Deployment!

Your monorepo is now configured exactly like LingoVibe with unified installation and build processes. Deploy with confidence! 🚀
