# SkillBridge - Monorepo Project

A modern full-stack application for skill exchange and community learning, built with React, Node.js/Express, and MongoDB.

## 🚀 Quick Start

### Installation

```bash
git clone <repository-url>
cd skillbridge
npm install
```

### Setup Environment Variables

```bash
cp .env.example .env
cp apps/backend/.env.example apps/backend/.env
cp apps/frontend/.env.example apps/frontend/.env
```

Edit the `.env` files with your MongoDB URI and other configurations.

### Run Development Servers

```bash
npm run dev
```

This starts both backend (port 5000) and frontend (port 3000) concurrently.

## 📁 Project Structure

```
skillbridge/
├── apps/
│   ├── frontend/          # React SPA
│   │   ├── src/
│   │   │   ├── pages/     # Page components
│   │   │   ├── components/  # Reusable components
│   │   │   ├── services/  # API utilities
│   │   │   └── assets/    # Images
│   │   └── package.json
│   └── backend/           # Express API
│       ├── src/
│       │   ├── config/    # Database config
│       │   ├── controllers/  # Route handlers
│       │   ├── models/    # MongoDB schemas
│       │   ├── routes/    # API routes
│       │   └── middleware/  # Auth middleware
│       ├── server.js
│       └── package.json
├── .env.example
├── vercel.json
└── package.json
```

## 🗄️ MongoDB Setup

1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create a cluster and database
3. Get your connection string
4. Add to `.env`: `MONGODB_URI=mongodb+srv://user:pass@cluster.mongodb.net/skillbridge`

## 🔧 Available Commands

| Command | Description |
|---------|-------------|
| `npm run dev` | Run frontend + backend concurrently |
| `npm run frontend` | Run React app only |
| `npm run backend` | Run Express server only |
| `npm run build` | Build both for production |

## 🔌 API Endpoints

### Authentication
- `POST /api/auth/signup` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/profile` - Get user profile (requires token)
- `PUT /api/auth/profile` - Update profile (requires token)

### Health
- `GET /api/health` - Server health check

## 📦 Deployment on Vercel

### Frontend
1. Push to GitHub
2. Connect to Vercel
3. Set environment: `REACT_APP_API_URL=https://your-api.com/api`
4. Deploy

### Backend (Recommended: Use Render or Railway)
1. Deploy to separate service
2. Add MongoDB URI and JWT_SECRET as env vars
3. Update frontend REACT_APP_API_URL

## 📋 Features Included

✅ User authentication with JWT  
✅ MongoDB integration  
✅ RESTful API  
✅ Responsive React frontend  
✅ Password hashing with bcryptjs  
✅ CORS enabled  
✅ Error handling  
✅ Environment variable management  

## 🔒 Security

- Passwords hashed with bcryptjs (10 rounds)
- JWT authentication tokens
- CORS protection
- Input validation
- Environment variable isolation

## 📖 Full Documentation

See [SETUP.md](./SETUP.md) for detailed setup instructions and troubleshooting.

## 💡 Environment Variables

### Backend (.env)
```
MONGODB_URI=mongodb+srv://...
JWT_SECRET=your_secret_key
PORT=5000
NODE_ENV=development
CLIENT_URL=http://localhost:3000
JWT_EXPIRE=7d
```

### Frontend (.env)
```
REACT_APP_API_URL=http://localhost:5000/api
```

## 🤝 Contributing

1. Create feature branch
2. Make changes
3. Test thoroughly
4. Submit PR

## 📝 License

MIT
