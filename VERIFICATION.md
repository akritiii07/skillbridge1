# SkillBridge - Post-Setup Verification Checklist

Use this checklist to verify your setup is correct before starting development.

## Prerequisites ✓

- [ ] Node.js 18.x or higher installed
- [ ] npm 9.x or higher installed
- [ ] Git installed
- [ ] Code editor (VS Code recommended)
- [ ] MongoDB account created

## Repository Setup ✓

- [ ] Repository cloned successfully
- [ ] In project root directory
- [ ] All files visible in file explorer

## Dependencies Installation ✓

```bash
npm install
```

- [ ] Installation completed without errors
- [ ] node_modules folder created
- [ ] No conflicting peer dependencies warnings

Verify with:
```bash
npm list --all --depth=0
```

## Environment Configuration ✓

### .env Files Created

- [ ] Root `.env` file created from `.env.example`
- [ ] `apps/backend/.env` file created from `.env.example`
- [ ] `apps/frontend/.env` file created from `.env.example`

### Environment Variables Set

**Backend (.env)**
- [ ] MONGODB_URI is set
- [ ] JWT_SECRET is set (minimum 32 characters)
- [ ] PORT is set to 5000
- [ ] CLIENT_URL is set to http://localhost:3000

**Frontend (.env)**
- [ ] REACT_APP_API_URL is set to http://localhost:5000/api

### Values Verification

```bash
# Check backend .env
cat apps/backend/.env

# Check frontend .env
cat apps/frontend/.env
```

- [ ] All values are non-empty
- [ ] No placeholder values remaining
- [ ] Quotes are properly matched

## MongoDB Configuration ✓

### Connection String Format

Verify your MONGODB_URI format:

**For MongoDB Atlas:**
```
mongodb+srv://username:password@cluster.mongodb.net/skillbridge
```

- [ ] Connection string starts with `mongodb+srv://`
- [ ] Username and password are included
- [ ] Database name is `skillbridge` (or your chosen name)
- [ ] No special characters are missing

**For Local MongoDB:**
```
mongodb://localhost:27017/skillbridge
```

- [ ] Local MongoDB is running (if using local)
- [ ] Port 27017 is accessible

### MongoDB Atlas Setup (if using cloud)

- [ ] Cluster created
- [ ] Database user created
- [ ] IP address whitelisted
- [ ] Connection string copied correctly
- [ ] Special characters in password are URL-encoded

Verify connection:
```bash
# Test connection from backend
npm run backend
# Look for: "MongoDB Connected: cluster.mongodb.net"
```

## Backend Verification ✓

### File Structure

```bash
ls -la apps/backend/src/
```

- [ ] `config/database.js` exists
- [ ] `models/User.js` exists
- [ ] `controllers/authController.js` exists
- [ ] `routes/auth.js` exists
- [ ] `middleware/auth.js` exists
- [ ] `server.js` exists

### Server Startup

```bash
npm run backend
```

- [ ] No startup errors
- [ ] Console shows: "MongoDB Connected"
- [ ] Console shows: "Server running on http://localhost:5000"
- [ ] No port already in use errors

### Health Check

In another terminal:
```bash
curl http://localhost:5000/api/health
```

Or visit in browser: http://localhost:5000/api/health

- [ ] Response: `{"success":true,"message":"Server is running"}`

## Frontend Verification ✓

### File Structure

```bash
ls -la apps/frontend/src/
```

- [ ] `pages/` folder contains all pages
- [ ] `components/` folder exists
- [ ] `services/api.js` exists
- [ ] `App.js` and `index.js` exist

### Dependencies Installed

```bash
npm list --workspace=apps/frontend react react-router-dom axios
```

- [ ] react 19.2.5 or higher
- [ ] react-router-dom 7.14.2 or higher
- [ ] axios installed

### Frontend Startup

```bash
npm run frontend
```

- [ ] Compilation successful
- [ ] No errors in console
- [ ] Application opens at http://localhost:3000
- [ ] All pages load without errors

## Integration Testing ✓

### Start Both Services

In one terminal:
```bash
npm run dev
```

- [ ] Both backend and frontend start
- [ ] No port conflicts
- [ ] Both services running simultaneously

### Test API Connection from Frontend

Visit http://localhost:3000/login

- [ ] Page loads without CORS errors
- [ ] Can see login form

### Test Signup

1. Fill in signup form with:
   - Name: Test User
   - Email: test@example.com
   - Password: password123

2. Click "Create Account"

- [ ] No errors in console
- [ ] Request goes to backend (check Network tab)
- [ ] Redirected to home page on success
- [ ] User can see logged-in state

### Verify MongoDB Data

```bash
# Use MongoDB Atlas UI or local tool
# Collection: users
# Check if test user was created
```

- [ ] User document created in MongoDB
- [ ] Password is hashed (not plain text)
- [ ] All required fields present

### Test Login

1. Log out (clear localStorage in DevTools)
2. Go to login page
3. Enter credentials:
   - Email: test@example.com
   - Password: password123
4. Click "Log In"

- [ ] Login successful
- [ ] Token stored in localStorage
- [ ] Redirected to home
- [ ] No errors in console

## Production Configuration ✓

### Build Verification

```bash
npm run build
```

- [ ] Build completes without errors
- [ ] `apps/frontend/build/` folder created
- [ ] `apps/frontend/build/index.html` exists
- [ ] All assets bundled

### Build Size Check

```bash
du -sh apps/frontend/build/
```

- [ ] Frontend build is reasonable size (< 5MB)

## Deployment Readiness ✓

### Git Setup

```bash
git status
```

- [ ] All files tracked (except .env and node_modules)
- [ ] `.gitignore` configured properly
- [ ] Ready to push to GitHub

### Environment Variables for Production

- [ ] Have production MongoDB URI ready
- [ ] Have strong JWT_SECRET ready
- [ ] Have backend domain name/URL ready
- [ ] Have frontend domain name/URL ready

### Vercel Configuration

- [ ] `vercel.json` exists at root
- [ ] Contains proper build commands
- [ ] Contains proper output directories

## Security Checklist ✓

- [ ] JWT_SECRET is not "secret" or default value
- [ ] MongoDB password is strong (12+ characters)
- [ ] `.env` files in `.gitignore`
- [ ] node_modules in `.gitignore`
- [ ] build/ in `.gitignore`
- [ ] No console.log() with sensitive data
- [ ] No API keys in frontend code

## Troubleshooting Checks ✓

If something isn't working:

### Port Issues
```bash
# Check what's using ports
# Windows: netstat -ano | findstr :5000
# Mac/Linux: lsof -i :5000
```

- [ ] Port 5000 is free for backend
- [ ] Port 3000 is free for frontend

### Module Issues
```bash
npm list
npm install
npm cache clean --force
```

- [ ] All dependencies installed
- [ ] No missing packages
- [ ] No version conflicts

### Environment Issues
```bash
# Verify .env files are read
# Add to server.js temporarily: console.log(process.env.MONGODB_URI)
# Add to App.js temporarily: console.log(process.env.REACT_APP_API_URL)
```

- [ ] Environment variables loaded
- [ ] No undefined values
- [ ] Correct format

### MongoDB Issues
```bash
# Verify connection string
# Test credentials in MongoDB Atlas UI
# Check IP whitelist
# Check network connectivity
```

- [ ] Can access MongoDB Atlas UI
- [ ] Credentials work in UI
- [ ] IP address whitelisted
- [ ] No firewall blocking

## Documentation ✓

- [ ] README.md reviewed
- [ ] SETUP.md reviewed
- [ ] DEVELOPMENT.md reviewed
- [ ] Environment file examples understood

## Ready to Deploy? ✓

Before deploying to production, verify:

- [ ] All tests passing
- [ ] All features working locally
- [ ] No console errors
- [ ] No security issues
- [ ] Environment variables configured
- [ ] Database backups in place
- [ ] Error logging setup (optional)
- [ ] Monitoring setup (optional)

## Next Steps

1. If all checks pass: Ready for development! 🎉
2. If any check fails: Review troubleshooting section
3. Review DEVELOPMENT.md for daily workflow
4. Follow SETUP.md for deployment steps

## Quick Reference URLs

During development:
- Frontend: http://localhost:3000
- Backend API: http://localhost:5000
- Health Check: http://localhost:5000/api/health
- MongoDB Atlas: https://cloud.mongodb.com

## Support

If issues persist:
1. Check terminal output for error messages
2. Review browser console (F12)
3. Check MongoDB logs
4. Verify all .env values
5. Reinstall dependencies if needed
6. Create GitHub issue with error details

---

**Last Updated**: 2024
**Setup Version**: 1.0.0
