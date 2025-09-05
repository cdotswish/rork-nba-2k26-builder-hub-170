# NBA 2K26 Builder Backend

## Render Deployment Instructions

### 1. Repository Setup
Your repository should have this structure:
```
/backend/
  /src/
    server-simple.js
  package.json
  .gitignore
```

### 2. Render Service Configuration

**Important**: Update your Render service settings:

1. **Root Directory**: Set to `backend` (not `backend/` or `/backend`)
2. **Build Command**: `npm install`
3. **Start Command**: `npm start`
4. **Health Check Path**: `/health`

### 3. Current Issue Fix

The error "Service Root Directory '/opt/render/project/src/backend' is missing" means:
- Your Render service Root Directory is set incorrectly
- It should be set to `backend` (the folder name in your repo)
- NOT `src/backend` or any other path

### 4. Files to Copy

Copy these files to your GitHub repository:

1. Copy `backend-package-example.json` → `backend/package.json`
2. The `backend/src/server-simple.js` file is already created
3. The `backend/.gitignore` file is already created

### 5. Deploy Steps

1. Push the backend folder to your GitHub repository
2. In Render dashboard, update the Root Directory to `backend`
3. Trigger a new deployment

### 6. Verification

Once deployed, test these endpoints:
- `https://nba2k26-backend.onrender.com/health` - Should return status OK
- `https://nba2k26-backend.onrender.com/` - Should return API documentation
- `https://nba2k26-backend.onrender.com/api/builds` - Should return empty builds array

The server includes extensive logging to help debug any issues.