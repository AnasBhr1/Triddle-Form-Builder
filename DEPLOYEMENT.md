# Triddle Deployment Guide

This guide covers deploying Triddle to production environments.

## Overview

Recommended deployment setup:
- **Backend**: Render (or Railway, Heroku)
- **Frontend**: Vercel (or Netlify)
- **Database**: MongoDB Atlas
- **File Storage**: Cloudinary

## Prerequisites

Before deploying, ensure you have:
- GitHub repository with your code
- Production MongoDB Atlas database
- Cloudinary account for file uploads
- Domain name (optional)

## Backend Deployment on Render

### 1. Prepare for Deployment

```bash
cd triddle-backend

# Ensure your package.json has the start script
# "start": "node dist/server.js"

# Make sure your build script works
npm run build
```

### 2. Create Render Service

1. Go to [render.com](https://render.com) and sign in
2. Click "New +" → "Web Service"
3. Connect your GitHub repository
4. Configure the service:
   - **Name**: `triddle-backend`
   - **Environment**: `Node`
   - **Build Command**: `npm install && npm run build`
   - **Start Command**: `npm start`
   - **Plan**: Choose based on your needs

### 3. Environment Variables

Add these environment variables in Render:

```env
NODE_ENV=production
PORT=10000
MONGODB_URI=your-mongodb-atlas-connection-string
JWT_SECRET=your-production-jwt-secret
COOKIE_SECRET=your-production-cookie-secret
FRONTEND_URL=https://your-frontend-domain.vercel.app
CLOUDINARY_CLOUD_NAME=your-cloudinary-cloud-name
CLOUDINARY_API_KEY=your-cloudinary-api-key
CLOUDINARY_API_SECRET=your-cloudinary-api-secret
```

### 4. Deploy

1. Click "Create Web Service"
2. Render will automatically deploy your backend
3. Note the service URL (e.g., `https://triddle-backend.onrender.com`)

## Frontend Deployment on Vercel

### 1. Prepare for Deployment

```bash
cd triddle-frontend

# Update your environment variables for production
# Create .env.production file
```

### 2. Create Vercel Project

1. Go to [vercel.com](https://vercel.com) and sign in
2. Click "New Project"
3. Import your GitHub repository
4. Configure the project:
   - **Framework Preset**: Create React App
   - **Root Directory**: `triddle-frontend`
   - **Build Command**: `npm run build`
   - **Output Directory**: `build`

### 3. Environment Variables

Add these environment variables in Vercel:

```env
REACT_APP_API_URL=https://your-backend-url.onrender.com/api
REACT_APP_APP_NAME=Triddle
REACT_APP_ENABLE_ANALYTICS=true
REACT_APP_ENABLE_FILE_UPLOADS=true
```

### 4. Deploy

1. Click "Deploy"
2. Vercel will build and deploy your frontend
3. You'll get a URL like `https://triddle-frontend.vercel.app`

## MongoDB Atlas Setup

### 1. Create Cluster

1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create a free cluster
3. Choose a cloud provider and region
4. Create cluster

### 2. Configure Access

1. **Database Access**:
   - Create a database user
   - Set username and password
   - Grant read/write access

2. **Network Access**:
   - Add IP address `0.0.0.0/0` (allow from anywhere)
   - Or add your Render service IP

### 3. Get Connection String

1. Click "Connect" → "Connect your application"
2. Copy the connection string
3. Replace `<password>` with your database user password
4. Use this in your `MONGODB_URI` environment variable

## Custom Domain (Optional)

### For Frontend (Vercel)

1. Go to your Vercel project settings
2. Navigate to "Domains"
3. Add your custom domain
4. Configure DNS records as instructed

### For Backend (Render)

1. Go to your Render service settings
2. Navigate to "Custom Domains"
3. Add your custom domain
4. Configure DNS records as instructed

## SSL Certificates

Both Render and Vercel automatically provide SSL certificates for your domains.

## Monitoring and Logging

### Render
- Built-in logs and metrics
- Set up alerts for service health
- Monitor resource usage

### Vercel
- Analytics dashboard
- Function logs
- Performance monitoring

## Environment-Specific Configurations

### Production Optimizations

**Backend**:
```typescript
// In your server config
if (process.env.NODE_ENV === 'production') {
  // Enable compression
  app.use(compression());
  
  // Add security headers
  app.use(helmet());
  
  // Set stricter CORS
  app.use(cors({
    origin: process.env.FRONTEND_URL,
    credentials: true
  }));
}
```

**Frontend**:
```typescript
// Create different configs for environments
const config = {
  development: {
    API_URL: 'http://localhost:5000/api',
  },
  production: {
    API_URL: process.env.REACT_APP_API_URL,
  }
};
```

## Deployment Checklist

- [ ] MongoDB Atlas cluster created and configured
- [ ] Cloudinary account set up
- [ ] Backend deployed to Render with environment variables
- [ ] Frontend deployed to Vercel with environment variables
- [ ] CORS configured properly
- [ ] SSL certificates active
- [ ] Custom domains configured (if applicable)
- [ ] Database connection working
- [ ] File uploads working
- [ ] Authentication flow tested
- [ ] Form creation and submission tested

## Troubleshooting

### Common Issues

1. **CORS Errors**
   - Ensure `FRONTEND_URL` matches exactly
   - Check if `credentials: true` is set in CORS config

2. **Database Connection Failed**
   - Verify MongoDB Atlas IP whitelist
   - Check connection string format
   - Ensure database user has proper permissions

3. **File Upload Issues**
   - Verify Cloudinary credentials
   - Check file size limits
   - Ensure proper CORS settings for file uploads

4. **Build Failures**
   - Check build logs for specific errors
   - Ensure all dependencies are listed in package.json
   - Verify TypeScript compilation

### Debug Production Issues

1. **Check Logs**:
   ```bash
   # Render logs
   # Available in Render dashboard
   
   # Vercel logs
   # Available in Vercel dashboard
   ```

2. **Test API Endpoints**:
   ```bash
   # Test backend health
   curl https://your-backend-url.onrender.com/api/health
   
   # Test frontend
   curl https://your-frontend-url.vercel.app
   ```

## Scaling Considerations

### Backend Scaling
- Monitor response times and error rates
- Consider upgrading Render plan for more resources
- Implement database indexing for better performance

### Frontend Scaling
- Vercel handles scaling automatically
- Consider implementing a CDN for static assets
- Optimize bundle size with code splitting

## Backup Strategy

1. **Database Backups**:
   - MongoDB Atlas provides automatic backups
   - Consider additional backup solutions for critical data

2. **Code Backups**:
   - Ensure code is pushed to GitHub
   - Tag releases for easy rollbacks

3. **Environment Variables**:
   - Keep secure backup of production environment variables
   - Document all required variables

## Security Best Practices

1. **Environment Variables**:
   - Never commit secrets to version control
   - Use different secrets for production
   - Rotate secrets regularly

2. **Database Security**:
   - Use strong passwords
   - Limit database user permissions
   - Enable MongoDB Atlas security features

3. **API Security**:
   - Implement rate limiting
   - Use HTTPS everywhere
   - Validate all inputs

## Monitoring and Maintenance

1. **Set up monitoring** for:
   - Uptime
   - Response times
   - Error rates
   - Resource usage

2. **Regular maintenance**:
   - Update dependencies
   - Monitor security vulnerabilities
   - Review and rotate secrets

3. **Backup verification**:
   - Test restore procedures
   - Verify backup integrity

---

## Support

If you encounter issues during deployment:
1. Check the troubleshooting section
2. Review service logs
3. Consult platform documentation (Render, Vercel, MongoDB Atlas)
4. Create an issue in the repository with deployment logs

**Good luck with your deployment! 🚀**