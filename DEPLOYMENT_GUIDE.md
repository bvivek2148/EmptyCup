# Deployment Guide

This guide will help you deploy your EmptyCup Property Listings application with the frontend on Netlify and the backend on Render.

## Prerequisites

1. GitHub account (to host your code)
2. Netlify account (free tier available)
3. Render account (free tier available)

## Step 1: Prepare Your Repository

1. Push your code to a GitHub repository
2. Make sure all the files are committed and pushed

## Step 2: Deploy Backend on Render

1. **Create a Render Account**: Go to [render.com](https://render.com) and sign up
2. **Connect GitHub**: Link your GitHub account to Render
3. **Create a New Web Service**:
   - Click "New +" → "Web Service"
   - Connect your GitHub repository
   - Configure the service:
     - **Name**: `emptycup-backend` (or your preferred name)
     - **Environment**: `Python 3`
     - **Build Command**: `pip install -r requirements.txt`
     - **Start Command**: `gunicorn --bind 0.0.0.0:$PORT backend.app:app`
     - **Instance Type**: Free tier is fine for testing

4. **Environment Variables**:
   - Add `FLASK_ENV` = `production`
   - Add `PYTHONPATH` = `/opt/render/project/src`

5. **Deploy**: Click "Create Web Service"
6. **Note the URL**: After deployment, copy the URL (e.g., `https://your-app-name.onrender.com`)

## Step 3: Update Frontend Configuration

1. **Update config.js**: Replace the production API URL in `frontend/config.js`:
   ```javascript
   production: {
       API_BASE_URL: 'https://emptycup-backend-17wz.onrender.com'  // Your actual Render URL
   }
   ```

## 🌐 Live Application URLs

- **Frontend (Netlify)**: https://emptycup-assignment-vivek.netlify.app/
- **Backend (Render)**: https://emptycup-backend-17wz.onrender.com
- **API Endpoint**: https://emptycup-backend-17wz.onrender.com/api/listings

## Step 4: Deploy Frontend on Netlify

1. **Create a Netlify Account**: Go to [netlify.com](https://netlify.com) and sign up
2. **Deploy from GitHub**:
   - Click "New site from Git"
   - Choose GitHub and authorize
   - Select your repository
   - Configure build settings:
     - **Base directory**: `frontend`
     - **Publish directory**: `frontend` (or leave empty if deploying from frontend folder)
     - **Build command**: Leave empty (static site)

3. **Deploy**: Click "Deploy site"
4. **Custom Domain** (Optional): You can set up a custom domain in site settings

## Step 5: Test Your Deployment

1. **Test Backend**: Visit your Render URL + `/api/listings` to ensure the API works
2. **Test Frontend**: Visit your Netlify URL to ensure the frontend loads and can fetch data
3. **Test Integration**: Make sure the frontend can successfully fetch data from the backend

## Important Notes

### CORS Configuration
The backend is already configured with CORS to allow requests from any origin. In production, you might want to restrict this to your specific Netlify domain.

### Environment Variables
- The backend automatically detects the PORT from Render's environment
- The frontend automatically detects the environment and uses the appropriate API URL

### Free Tier Limitations
- **Render**: Free tier services sleep after 15 minutes of inactivity
- **Netlify**: 100GB bandwidth per month on free tier

## Troubleshooting

### Backend Issues
- Check Render logs for any Python/Flask errors
- Ensure all dependencies are in requirements.txt
- Verify the start command is correct

### Frontend Issues
- Check browser console for JavaScript errors
- Verify the API URL in config.js is correct
- Ensure CORS is properly configured

### API Connection Issues
- Check if the backend URL is accessible
- Verify the frontend is using the correct API endpoint
- Check for any CORS errors in browser console

## File Structure After Deployment

```
project/
├── backend/
│   ├── app.py (updated for production)
│   └── listings.json
├── frontend/
│   ├── config.js (new - environment configuration)
│   ├── netlify.toml (new - Netlify configuration)
│   ├── *.html (updated to include config.js)
│   ├── script.js (updated to use config)
│   └── styles.css
├── requirements.txt (updated with gunicorn)
├── render.yaml (new - Render configuration)
└── DEPLOYMENT_GUIDE.md (this file)
```

## Next Steps

After successful deployment:
1. Test all functionality thoroughly
2. Set up monitoring for your services
3. Consider setting up a custom domain
4. Plan for scaling if needed
5. Set up proper error logging and monitoring
