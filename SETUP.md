# SkillBridge - Complete Setup Guide

## Table of Contents

1. [Prerequisites](#prerequisites)
2. [Installation](#installation)
3. [Environment Configuration](#environment-configuration)
4. [MongoDB Setup](#mongodb-setup)
5. [Running the Application](#running-the-application)
6. [Deployment](#deployment)
7. [Troubleshooting](#troubleshooting)
8. [API Reference](#api-reference)

## Prerequisites

- **Node.js**: 18.x or higher ([Download](https://nodejs.org))
- **npm**: 9.x or higher (comes with Node.js)
- **Git**: For version control
- **MongoDB Account**: Free tier available at [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
- **Code Editor**: VS Code recommended

### Verify Installation

```bash
node --version
npm --version
git --version
```

## Installation

### Step 1: Clone Repository

```bash
git clone <your-repository-url>
cd skillbridge
```

### Step 2: Install Dependencies

```bash
npm install
```

This command uses npm workspaces to install dependencies for both frontend and backend.

### Step 3: Verify Installation

```bash
npm list --all --depth=0
```

## Environment Configuration

### Create Environment Files

Create `.env` files in three locations:

#### Root Directory (.env)
```bash
cd skillbridge
cp .env.example .env
```

#### Backend Directory (.env)
```bash
cd apps/backend
cp .env.example .env
```

#### Frontend Directory (.env)
```bash
cd apps/frontend
cp .env.example .env
```

### Configure Environment Variables

#### Backend Configuration (apps/backend/.env)

```
# ============================================
# MONGODB CONFIGURATION
# ============================================
# Connection string to MongoDB Atlas
# Format: mongodb+srv://username:password@cluster.mongodb.net/database
MONGODB_URI=mongodb+srv://your_username:your_password@your_cluster.mongodb.net/skillbridge

# ============================================
# SERVER CONFIGURATION
# ============================================
PORT=5000
NODE_ENV=development

# ============================================
# JWT CONFIGURATION
# ============================================
# Generate a strong secret key (at least 32 characters)
# Linux/Mac: openssl rand -base64 32
# Windows: Create a strong random string
JWT_SECRET=your_very_secure_random_string_here_change_this_in_production
JWT_EXPIRE=7d

# ============================================
# CORS CONFIGURATION
# ============================================
CLIENT_URL=http://localhost:3000
```

#### Frontend Configuration (apps/frontend/.env)

```
REACT_APP_API_URL=http://localhost:5000/api
```

#### Root Configuration (.env)

```
# Frontend Environment
REACT_APP_API_URL=http://localhost:5000/api

# Backend Environment
MONGODB_URI=mongodb+srv://your_username:your_password@your_cluster.mongodb.net/skillbridge
PORT=5000
NODE_ENV=development
JWT_SECRET=your_very_secure_random_string_here_change_this_in_production
JWT_EXPIRE=7d
CLIENT_URL=http://localhost:3000
```

## MongoDB Setup

### Option 1: MongoDB Atlas (Cloud - Recommended)

#### Step 1: Create Account

1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Click "Sign Up for free"
3. Fill in the registration form
4. Verify your email

#### Step 2: Create Organization and Project

1. Create an Organization (optional)
2. Create a Project named "skillbridge"

#### Step 3: Create a Cluster

1. Click "Build a Database"
2. Choose "M0 Sandbox" (free tier)
3. Select a region closest to you
4. Click "Create Cluster"
5. Wait for cluster to be created (2-5 minutes)

#### Step 4: Set Up Authentication

1. Go to "Database Access"
2. Click "Add New Database User"
3. Choose "Password" as authentication method
4. Enter username: `skillbridge_user`
5. Generate or enter password (save this!)
6. Click "Add User"

#### Step 5: Configure Network Access

1. Go to "Network Access"
2. Click "Add IP Address"
3. Click "Add Current IP Address" (for development)
4. For production, add `0.0.0.0/0` (to allow all IPs - not recommended)
5. Click "Confirm"

#### Step 6: Get Connection String

1. Go back to "Databases"
2. Click "Connect" button
3. Choose "MongoDB for VS Code" or "Drivers"
4. Copy the connection string
5. Replace `<password>` with your database password
6. Replace `myFirstDatabase` with `skillbridge`

Example:
```
mongodb+srv://skillbridge_user:yourpassword@cluster0.xxxxx.mongodb.net/skillbridge
```

7. Add this to your `.env` file as `MONGODB_URI`

### Option 2: Local MongoDB (Development Only)

#### macOS (using Homebrew)

```bash
brew tap mongodb/brew
brew install mongodb-community
brew services start mongodb-community
```

#### Windows

1. Download [MongoDB Community Server](https://www.mongodb.com/try/download/community)
2. Run the installer
3. Follow installation wizard
4. MongoDB runs as a Windows Service

#### Linux (Ubuntu)

```bash
curl -fsSL https://www.mongodb.org/static/pgp/server-6.0.asc | sudo apt-key add -
echo "deb [ arch=amd64,arm64 ] https://repo.mongodb.org/apt/ubuntu focal/mongodb-org/6.0 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-6.0.list
sudo apt-get update
sudo apt-get install -y mongodb-org
sudo systemctl start mongod
```

#### Connection String

```
mongodb://localhost:27017/skillbridge
```

Add this to your `.env` file as `MONGODB_URI`

## Running the Application

### Development Mode (Both Services)

Start both backend and frontend concurrently:

```bash
npm run dev
```

The application will be available at:
- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:5000
- **API Health**: http://localhost:5000/api/health

### Run Frontend Only

```bash
npm run frontend
```

Available at: http://localhost:3000

### Run Backend Only

```bash
npm run backend
```

Available at: http://localhost:5000

### Run Specific Workspace

```bash
npm run dev --workspace=apps/frontend
npm start --workspace=apps/backend
```

## Production Build

### Build Both Frontend and Backend

```bash
npm run build
```

### Build Frontend Only

```bash
npm run build --workspace=apps/frontend
```

### Output Files

- **Frontend**: `apps/frontend/build/` - Ready for static hosting
- **Backend**: All source files - Ready for server deployment

## Deployment

### Frontend Deployment on Vercel

#### 1. Push Code to GitHub

```bash
git add .
git commit -m "Initial commit"
git push origin main
```

#### 2. Connect to Vercel

1. Go to [Vercel](https://vercel.com)
2. Sign in with GitHub
3. Click "New Project"
4. Select your repository
5. Click "Import"

#### 3. Configure Project Settings

**Settings to configure:**

| Setting | Value |
|---------|-------|
| Framework | React |
| Root Directory | `./` (or `.`) |
| Build Command | `npm run build --workspace=apps/frontend` |
| Output Directory | `apps/frontend/build` |
| Install Command | `npm install --legacy-peer-deps` |

#### 4. Environment Variables

Add these environment variables in Vercel dashboard:

```
REACT_APP_API_URL=https://your-backend-url.com/api
```

(Replace with your actual backend URL)

#### 5. Deploy

Click "Deploy" and wait for deployment to complete.

### Backend Deployment Options

#### Option 1: Render (Recommended for Node.js)

1. Push your code to GitHub
2. Go to [Render](https://render.com)
3. Create a new account or sign in
4. Click "New" → "Web Service"
5. Connect your GitHub repository
6. Configure:
   - **Name**: skillbridge-api
   - **Region**: Choose nearest region
   - **Branch**: main
   - **Runtime**: Node
   - **Root Directory**: `apps/backend`
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`

7. Add environment variables:
```
MONGODB_URI=mongodb+srv://...
JWT_SECRET=your_production_secret
NODE_ENV=production
CLIENT_URL=https://your-vercel-app.vercel.app
```

8. Click "Create Web Service"

#### Option 2: Railway

1. Go to [Railway](https://railway.app)
2. Connect GitHub account
3. Create new project
4. Deploy with GitHub repo
5. Add environment variables
6. Deploy

#### Option 3: AWS Elastic Beanstalk

```bash
# Install AWS CLI
pip install awsebcli --upgrade --user

# Initialize
eb init

# Create environment
eb create skillbridge-api

# Deploy
eb deploy
```

#### Option 4: DigitalOcean App Platform

1. Go to [DigitalOcean](https://www.digitalocean.com)
2. Create an App
3. Connect GitHub
4. Configure:
   - Source: GitHub repository
   - Resource: Node.js
   - HTTP Routes: /
   - Environment Variables: Add all from .env

5. Deploy

### Update Frontend After Backend Deployment

Once backend is deployed:

1. Update `REACT_APP_API_URL` in Vercel environment variables
2. Redeploy frontend
3. Test API endpoints

## API Testing

### Using cURL

```bash
# Sign up
curl -X POST http://localhost:5000/api/auth/signup \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Doe",
    "email": "john@example.com",
    "password": "password123"
  }'

# Login
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "john@example.com",
    "password": "password123"
  }'

# Get Profile (replace TOKEN with actual token)
curl -X GET http://localhost:5000/api/auth/profile \
  -H "Authorization: Bearer TOKEN"
```

### Using Postman

1. Download [Postman](https://www.postman.com/downloads/)
2. Create a new collection
3. Add requests with:
   - **Method**: POST/GET/PUT
   - **URL**: http://localhost:5000/api/...
   - **Headers**: Content-Type: application/json
   - **Authorization**: Bearer token (in Authorization tab)
   - **Body**: JSON data

## Troubleshooting

### MongoDB Connection Issues

**Error: "connect ECONNREFUSED"**

```bash
# Check if MongoDB is running
# For local MongoDB
mongosh

# For MongoDB Atlas, verify:
# 1. Connection string is correct
# 2. Username and password are correct
# 3. IP address is whitelisted
# 4. Network connectivity
```

### CORS Errors

**Error: "Access to XMLHttpRequest blocked by CORS"**

```bash
# Check backend/.env
CLIENT_URL=http://localhost:3000

# For production, update to your Vercel URL
CLIENT_URL=https://your-app.vercel.app
```

### Port Already in Use

**Error: "Port 3000/5000 is already in use"**

Windows:
```bash
# Find process using port 5000
netstat -ano | findstr :5000

# Kill process (replace PID with actual ID)
taskkill /PID <PID> /F
```

macOS/Linux:
```bash
# Find process using port 5000
lsof -i :5000

# Kill process (replace PID with actual ID)
kill -9 <PID>
```

### Dependencies Not Installing

```bash
# Clear npm cache
npm cache clean --force

# Remove node_modules and package-lock.json
rm -rf node_modules package-lock.json

# Reinstall
npm install
```

### Frontend Can't Connect to Backend

1. Check backend is running: http://localhost:5000/api/health
2. Check REACT_APP_API_URL in `.env`
3. Check browser console for CORS errors
4. Check backend CORS configuration

### Environment Variables Not Loading

```bash
# For .env to reload, restart dev server
# Kill the process and run again
npm run dev
```

## File Structure Reference

```
skillbridge/
├── apps/
│   ├── frontend/
│   │   ├── public/
│   │   │   ├── index.html
│   │   │   └── manifest.json
│   │   ├── src/
│   │   │   ├── pages/
│   │   │   │   ├── Home.js
│   │   │   │   ├── Login.js
│   │   │   │   ├── Signup.js
│   │   │   │   ├── Explore.js
│   │   │   │   └── Resources.js
│   │   │   ├── components/
│   │   │   │   └── Navbar.js
│   │   │   ├── services/
│   │   │   │   └── api.js
│   │   │   ├── assets/
│   │   │   ├── App.js
│   │   │   └── index.js
│   │   ├── .env.example
│   │   └── package.json
│   │
│   └── backend/
│       ├── src/
│       │   ├── config/
│       │   │   └── database.js
│       │   ├── controllers/
│       │   │   └── authController.js
│       │   ├── models/
│       │   │   └── User.js
│       │   ├── routes/
│       │   │   └── auth.js
│       │   └── middleware/
│       │       └── auth.js
│       ├── .env.example
│       ├── .gitignore
│       ├── server.js
│       └── package.json
│
├── .env.example
├── .gitignore
├── vercel.json
├── package.json
└── README.md
```

## Security Checklist

- [ ] Change JWT_SECRET to strong random string
- [ ] Use environment variables for all secrets
- [ ] Don't commit `.env` files
- [ ] Enable HTTPS in production
- [ ] Set strong MongoDB password
- [ ] Whitelist only necessary IPs in MongoDB Atlas
- [ ] Use strong user passwords in MongoDB
- [ ] Update NODE_ENV to "production" in production
- [ ] Enable rate limiting in production
- [ ] Add input validation

## Next Steps

1. Complete setup following this guide
2. Test login/signup functionality
3. Deploy frontend to Vercel
4. Deploy backend to Render or similar
5. Update environment variables in production
6. Test deployed application
7. Set up custom domain (optional)
8. Configure monitoring and logging (optional)

## Support & Resources

- [MongoDB Documentation](https://docs.mongodb.com)
- [Express.js Guide](https://expressjs.com)
- [React Documentation](https://react.dev)
- [Vercel Deployment](https://vercel.com/docs)
- [Node.js Best Practices](https://nodejs.org/en/docs/guides/)

## Questions?

Create an issue in the repository or contact the development team.
