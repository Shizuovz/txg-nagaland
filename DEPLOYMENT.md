# Production Deployment Guide

## Environment Setup

1. **Create production environment file:**
   ```bash
   cp .env.production.example .env.production
   ```

2. **Update production values:**
   - Firebase configuration from your production Firebase project
   - EmailJS configuration from your EmailJS account
   - Production domain URL

## Build for Production

```bash
npm run build:prod
```

## Deployment Options

### Option 1: Static Hosting (Vercel, Netlify, etc.)
1. Run `npm run build:prod`
2. Deploy the `dist` folder to your hosting provider
3. Set environment variables in your hosting dashboard

### Option 2: VPS/Dedicated Server
1. Build the project: `npm run build:prod`
2. Serve the `dist` folder using nginx, apache, or similar
3. Configure SSL certificate
4. Set up environment variables

### Option 3: Docker Deployment
```dockerfile
FROM node:18-alpine as builder
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY . .
RUN npm run build:prod

FROM nginx:alpine
COPY --from=builder /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/nginx.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
```

## Pre-Deployment Checklist

- [ ] Environment variables configured
- [ ] Firebase rules updated for production
- [ ] EmailJS templates tested
- [ ] SSL certificate installed
- [ ] Domain DNS configured
- [ ] Error monitoring set up
- [ ] Analytics configured
- [ ] Performance testing completed

## Post-Deployment

1. **Test all functionality:**
   - User registration
   - Admin dashboard
   - Email notifications
   - Authentication flow

2. **Monitor:**
   - Error rates
   - Performance metrics
   - User feedback

3. **Security:**
   - Enable security headers
   - Set up rate limiting
   - Monitor for suspicious activity

## Environment Variables Required

| Variable | Description | Required |
|----------|-------------|-----------|
| `VITE_FIREBASE_API_KEY` | Firebase API key | Yes |
| `VITE_FIREBASE_AUTH_DOMAIN` | Firebase auth domain | Yes |
| `VITE_FIREBASE_PROJECT_ID` | Firebase project ID | Yes |
| `VITE_FIREBASE_STORAGE_BUCKET` | Firebase storage bucket | Yes |
| `VITE_FIREBASE_MESSAGING_SENDER_ID` | Firebase sender ID | Yes |
| `VITE_FIREBASE_APP_ID` | Firebase app ID | Yes |
| `VITE_FIREBASE_MEASUREMENT_ID` | Firebase measurement ID | Yes |
| `VITE_EMAILJS_PUBLIC_KEY` | EmailJS public key | Yes |
| `VITE_EMAILJS_SERVICE_ID` | EmailJS service ID | Yes |
| `VITE_EMAILJS_TEMPLATE_ID_APPROVAL` | EmailJS approval template | Yes |
| `VITE_EMAILJS_TEMPLATE_ID_REJECTION` | EmailJS rejection template | Yes |
| `VITE_DEV_SERVER_URL` | Production URL | Yes |
