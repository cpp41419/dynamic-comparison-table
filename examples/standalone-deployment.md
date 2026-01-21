# Standalone Subdomain Deployment Guide

Deploy the comparison engine as a dedicated subdomain (e.g., `compare.cpp41419.com.au`)

---

## Prerequisites

- Domain with DNS access (e.g., `cpp41419.com.au`)
- Hosting platform account (Vercel, Netlify, AWS, etc.)
- Git repository (optional but recommended)

---

## Deployment Steps

### 1. Clone the Comparison Engine

```bash
# Clone or copy the comparison engine repository
git clone <comparison-engine-repo>
cd dynamic-comparison-table-2

# Install dependencies
npm install
```

### 2. Configure Environment Variables

Create `.env.local` with your course-specific settings:

```bash
# Course Configuration
NEXT_PUBLIC_COURSE_CODE=CPP41419
NEXT_PUBLIC_SITE_URL=https://compare.cpp41419.com.au
NEXT_PUBLIC_DEPLOYMENT_MODE=subdomain
NEXT_PUBLIC_STATE=NSW

# Optional: Supabase (if using enquiry forms)
NEXT_PUBLIC_SUPABASE_URL=your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
```

### 3. Test Locally

```bash
# Start development server
npm run dev

# Visit http://localhost:3000
# Verify course-specific metadata in page source
```

### 4. Build for Production

```bash
# Create production build
npm run build

# Test production build locally
npm start
```

### 5. Deploy to Hosting Platform

#### Option A: Vercel (Recommended)

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel

# Follow prompts to:
# - Link to your Vercel account
# - Set environment variables
# - Deploy to production
```

**Set environment variables in Vercel dashboard:**
1. Go to Project Settings → Environment Variables
2. Add all variables from `.env.local`
3. Redeploy

#### Option B: Netlify

```bash
# Install Netlify CLI
npm i -g netlify-cli

# Deploy
netlify deploy --prod

# Set environment variables in Netlify dashboard
```

#### Option C: Docker

```dockerfile
# Dockerfile
FROM node:18-alpine

WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY . .
RUN npm run build

EXPOSE 3000
CMD ["npm", "start"]
```

```bash
# Build and run
docker build -t comparison-engine .
docker run -p 3000:3000 \
  -e NEXT_PUBLIC_COURSE_CODE=CPP41419 \
  -e NEXT_PUBLIC_SITE_URL=https://compare.cpp41419.com.au \
  comparison-engine
```

### 6. Configure DNS

Add a CNAME record pointing to your hosting platform:

**For Vercel:**
```
Type: CNAME
Name: compare
Value: cname.vercel-dns.com
```

**For Netlify:**
```
Type: CNAME
Name: compare
Value: <your-site>.netlify.app
```

**For Custom Server:**
```
Type: A
Name: compare
Value: <your-server-ip>
```

### 7. Configure SSL

Most hosting platforms (Vercel, Netlify) automatically provision SSL certificates.

For custom servers, use Let's Encrypt:
```bash
certbot --nginx -d compare.cpp41419.com.au
```

### 8. Verify Deployment

- ✅ Visit `https://compare.cpp41419.com.au`
- ✅ Check page source for course-specific metadata
- ✅ Verify canonical URL points to subdomain
- ✅ Test comparison functionality
- ✅ Check SSL certificate is valid

---

## Multi-Course Deployment

To deploy for multiple courses, create separate deployments:

### Automated Deployment Script

```bash
#!/bin/bash
# deploy-all-courses.sh

COURSES=("CPP41419" "BSB40520" "CHC43015" "UEE30820")

for COURSE in "${COURSES[@]}"; do
  echo "Deploying $COURSE..."
  
  # Set environment variables
  export NEXT_PUBLIC_COURSE_CODE=$COURSE
  export NEXT_PUBLIC_SITE_URL="https://compare.${COURSE,,}.com.au"
  export NEXT_PUBLIC_DEPLOYMENT_MODE=subdomain
  
  # Deploy to Vercel with project name
  vercel --prod --name "compare-${COURSE,,}"
done
```

### Vercel Project Configuration

Create `vercel.json` for each course:

```json
{
  "env": {
    "NEXT_PUBLIC_COURSE_CODE": "CPP41419",
    "NEXT_PUBLIC_SITE_URL": "https://compare.cpp41419.com.au",
    "NEXT_PUBLIC_DEPLOYMENT_MODE": "subdomain"
  },
  "build": {
    "env": {
      "NEXT_PUBLIC_COURSE_CODE": "CPP41419"
    }
  }
}
```

---

## Monitoring & Maintenance

### 1. Set Up Analytics

The engine includes Vercel Analytics by default. To enable:

```typescript
// app/layout.tsx (already configured)
import { Analytics } from '@vercel/analytics/next'

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        {children}
        <Analytics />
      </body>
    </html>
  )
}
```

### 2. Monitor Search Console

1. Add property in Google Search Console
2. Verify ownership via DNS or HTML file
3. Submit sitemap: `https://compare.cpp41419.com.au/sitemap.xml`
4. Monitor indexing status

### 3. Update Provider Data

Provider data is in `lib/parse-data.ts`. To update:

```bash
# Edit provider data
vim lib/parse-data.ts

# Rebuild and redeploy
npm run build
vercel --prod
```

### 4. Performance Monitoring

Use Vercel Analytics or add custom monitoring:

```typescript
// lib/analytics.ts
export function trackComparison(providers: string[]) {
  if (typeof window !== 'undefined') {
    window.gtag?.('event', 'comparison_made', {
      providers: providers.join(','),
      course: process.env.NEXT_PUBLIC_COURSE_CODE
    })
  }
}
```

---

## Troubleshooting

### DNS not resolving?
- Wait 24-48 hours for DNS propagation
- Check DNS configuration with `dig compare.cpp41419.com.au`
- Verify CNAME points to correct hosting platform

### Environment variables not working?
- Rebuild after changing variables: `npm run build`
- Check variables are prefixed with `NEXT_PUBLIC_` for client-side access
- Verify variables are set in hosting platform dashboard

### Wrong metadata showing?
- Clear Next.js cache: `rm -rf .next`
- Verify `NEXT_PUBLIC_COURSE_CODE` is set correctly
- Check `lib/course-config.ts` includes your course

### Build failing?
- Check Node.js version: `node --version` (should be 18+)
- Clear node_modules: `rm -rf node_modules && npm install`
- Check build logs for specific errors

---

## Cost Estimates

### Vercel (Recommended)
- **Hobby Plan**: Free for personal projects
- **Pro Plan**: $20/month (includes analytics, custom domains)
- **Enterprise**: Custom pricing

### Netlify
- **Starter**: Free (100GB bandwidth)
- **Pro**: $19/month (400GB bandwidth)

### AWS/DigitalOcean
- **VPS**: $5-10/month
- **Requires manual SSL and server management**

---

## Security Checklist

- [ ] SSL certificate installed and valid
- [ ] Environment variables not committed to git
- [ ] API keys stored securely (use hosting platform secrets)
- [ ] CORS configured correctly (if using external APIs)
- [ ] Rate limiting enabled (if using enquiry forms)
- [ ] Security headers configured (CSP, HSTS, etc.)

---

## Next Steps

After deployment:
1. Test all functionality on production URL
2. Submit sitemap to Google Search Console
3. Add internal links from main course site
4. Monitor analytics and search performance
5. Set up uptime monitoring (e.g., UptimeRobot)

---

## Support Resources

- [Next.js Deployment Docs](https://nextjs.org/docs/deployment)
- [Vercel Documentation](https://vercel.com/docs)
- [Netlify Documentation](https://docs.netlify.com)
- Review `INTEGRATION_GUIDE.md` for general setup
