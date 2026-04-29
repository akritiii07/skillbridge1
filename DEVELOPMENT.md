# SkillBridge Development Guide

## Quick Commands Reference

### Development Commands
```bash
npm run dev           # Run both frontend and backend
npm run frontend      # Run only frontend (http://localhost:3000)
npm run backend       # Run only backend (http://localhost:5000)
```

### Production Commands
```bash
npm run build         # Build both frontend and backend
npm start             # Start frontend (after build)
```

### Workspace-Specific Commands
```bash
npm install --workspace=apps/frontend
npm install --workspace=apps/backend
npm test --workspace=apps/frontend
npm run build --workspace=apps/frontend
```

## Project Architecture

### Frontend (React)
- **Framework**: React 19
- **Routing**: React Router v7
- **HTTP Client**: Axios
- **Styling**: CSS
- **State Management**: React Hooks

### Backend (Node.js)
- **Framework**: Express.js
- **Database**: MongoDB with Mongoose
- **Authentication**: JWT (JSON Web Tokens)
- **Password Hashing**: bcryptjs
- **CORS**: Enabled and configured

### Database (MongoDB)
- **Hosted**: MongoDB Atlas (Cloud) or Local
- **ODM**: Mongoose
- **Collections**: Users

## API Architecture

### Authentication Flow

1. **Signup**
   - User submits name, email, password
   - Password hashed with bcryptjs
   - User created in MongoDB
   - JWT token returned

2. **Login**
   - User submits email, password
   - Password compared with hashed version
   - JWT token generated and returned
   - Token stored in localStorage

3. **Protected Routes**
   - Token sent in Authorization header
   - Middleware verifies token
   - User ID extracted from token

### Request Format

```javascript
// Headers
{
  "Content-Type": "application/json",
  "Authorization": "Bearer <token>"
}

// Body (example)
{
  "email": "user@example.com",
  "password": "password123"
}
```

## Development Workflow

### 1. Making Changes

#### Frontend
```bash
# Edit files in apps/frontend/src/
# Changes auto-reload in browser
# Test in http://localhost:3000
```

#### Backend
```bash
# Edit files in apps/backend/src/
# Nodemon auto-restarts server
# Test with curl/Postman
```

### 2. Testing

```bash
# Frontend tests
npm test --workspace=apps/frontend

# Backend (create tests in apps/backend/tests/)
npm test --workspace=apps/backend
```

### 3. Building

```bash
# Production build
npm run build

# Verify builds
ls -la apps/frontend/build/
ls -la apps/backend/dist/  # if using TypeScript
```

## Common Tasks

### Add a New API Route

1. Create controller in `apps/backend/src/controllers/`
2. Create route in `apps/backend/src/routes/`
3. Import route in `apps/backend/server.js`
4. Test with curl/Postman

Example:
```javascript
// Controller
export const getUsers = async (req, res) => {
  const users = await User.find();
  res.json({ success: true, users });
};

// Route
router.get('/users', protect, getUsers);
```

### Modify Database Schema

1. Edit schema in `apps/backend/src/models/`
2. Add new fields with proper types
3. Add validation rules
4. Test with API calls

### Change Frontend UI

1. Edit component files in `apps/frontend/src/`
2. Changes appear instantly in browser
3. Check console for errors
4. Test responsive design

### Update Environment Variables

1. Edit `.env` files
2. Restart dev server (`npm run dev`)
3. Verify changes with console logs

## Git Workflow

```bash
# Create feature branch
git checkout -b feature/your-feature

# Make changes
git add .
git commit -m "description of changes"

# Push to remote
git push origin feature/your-feature

# Create Pull Request on GitHub
```

## Debugging

### Frontend Debugging
1. Open DevTools (F12)
2. Check Console for errors
3. Use Network tab to see API calls
4. Use React DevTools extension

### Backend Debugging
1. Check terminal output
2. Add console.log() for debugging
3. Use Postman to test API
4. Check MongoDB data directly

### MongoDB Debugging
1. Use MongoDB Atlas UI
2. Browse collections and documents
3. Run queries in Atlas UI
4. Use MongoDB Compass (desktop client)

## Performance Tips

### Frontend
- Use React.memo for expensive components
- Implement code splitting with lazy()
- Optimize images
- Use production build for deployment

### Backend
- Add database indexes for frequently queried fields
- Implement caching for repeated queries
- Use connection pooling
- Monitor server logs

## Security Best Practices

1. **Never commit secrets**
   - Use .env files
   - Add to .gitignore

2. **Validate all inputs**
   - Server-side validation required
   - Sanitize user input

3. **Use HTTPS in production**
   - Vercel provides free SSL
   - Configure in backend

4. **Keep dependencies updated**
   ```bash
   npm outdated
   npm update
   ```

5. **Change default passwords**
   - MongoDB password
   - JWT secret

## Troubleshooting Common Issues

| Issue | Solution |
|-------|----------|
| Port already in use | Kill process on port or change PORT env var |
| MongoDB connection fails | Check URI, credentials, whitelist IP |
| CORS errors | Verify CLIENT_URL in backend .env |
| Token not working | Check JWT_SECRET matches, token format |
| Node modules not installing | Clear cache: `npm cache clean --force` |
| Changes not appearing | Restart dev server, clear browser cache |

## Resources

- [Express.js Documentation](https://expressjs.com)
- [MongoDB Mongoose Guide](https://mongoosejs.com)
- [React Docs](https://react.dev)
- [JWT Introduction](https://jwt.io/introduction)
- [REST API Best Practices](https://restfulapi.net)

## Next Steps

1. Set up local development environment
2. Create MongoDB Atlas account and cluster
3. Configure environment variables
4. Start development: `npm run dev`
5. Test signup/login functionality
6. Deploy to Vercel/Render
7. Monitor production application

## Support

For issues:
1. Check error messages in console
2. Review logs on server
3. Check MongoDB data
4. Create GitHub issue with details
