# 🚀 Environment Setup Guide

## Quick Start

### 1. Backend Setup

```bash
cd backend
npm install
cp .env.example .env
# Edit .env with your actual values
npm run dev
```

### 2. Frontend Setup

```bash
cd frontend
npm install
cp .env.example .env
# Edit .env with your actual values
npm run dev
```

## 🔐 Environment Variables

### Required Backend Variables (.env)

```bash
DATABASE_URL="postgresql://username:password@localhost:5432/udyamdb"
NODE_ENV="development"
PORT=3000
```

### Required Frontend Variables (.env)

```bash
VITE_API_URL="http://localhost:3000/registration"
VITE_APP_NAME="Udyam Registration Portal"
```

## 🚨 Security Notice

- **NEVER** commit `.env` files
- **NEVER** commit `node_modules/`
- **ALWAYS** use environment variables for sensitive data
- **ALWAYS** use `.env.example` files to document required variables

## 📂 Project Structure

```
Udyam/
├── backend/
│   ├── .env (NEVER COMMIT)
│   ├── .env.example ✅
│   ├── node_modules/ (NEVER COMMIT)
│   └── src/
├── frontend/
│   ├── .env (NEVER COMMIT)
│   ├── .env.example ✅
│   ├── node_modules/ (NEVER COMMIT)
│   └── src/
└── .gitignore ✅
```

## 🛡️ What's Protected

Your `.gitignore` files protect:

- 🔒 Environment variables (.env files)
- 📦 Dependencies (node_modules/)
- 🏗️ Build outputs (dist/, build/)
- 💾 Database files
- 🔧 IDE configurations
- 📊 Logs and cache files

## ✅ Ready for Production!

Your application is properly configured for secure deployment on Render or any cloud platform.
