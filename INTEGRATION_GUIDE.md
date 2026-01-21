# Comparison Engine Integration Guide

This guide shows how to deploy the comparison engine in two ways:

1. **As a `/compare` route** on your existing course site (e.g., `cpp41419.com.au/compare`)
2. **As a standalone subdomain** (e.g., `compare.cpp41419.com.au`)

Both deployments will have **unique SEO indexing** thanks to course-specific metadata.

---

## Quick Start

### Option A: Deploy as `/compare` Route on Course Site

**Best for:** Adding comparison functionality to an existing course website.

1. **Copy the comparison engine** into your course site's repository
2. **Set environment variables** in `.env.local`:
   ```bash
   NEXT_PUBLIC_COURSE_CODE=CPP41419
   NEXT_PUBLIC_SITE_URL=https://cpp41419.com.au/compare
   NEXT_PUBLIC_DEPLOYMENT_MODE=route
   ```

3. **Create the route** at `app/compare/page.tsx`:
   ```typescript
   import CourseSelection from "@/components/course-selection"
   
   export default function ComparePage() {
     return (
       <main className="min-h-screen bg-background">
         <CourseSelection />
       </main>
     )
   }
   ```

4. **Build and deploy** your course site as normal

✅ **Result:** Your comparison engine is now live at `cpp41419.com.au/compare`

---

### Option B: Deploy as Standalone Subdomain

**Best for:** Dedicated comparison site with its own subdomain.

1. **Clone the comparison engine** repository
2. **Set environment variables** in `.env.local`:
   ```bash
   NEXT_PUBLIC_COURSE_CODE=CPP41419
   NEXT_PUBLIC_SITE_URL=https://compare.cpp41419.com.au
   NEXT_PUBLIC_DEPLOYMENT_MODE=subdomain
   ```

3. **Build the project**:
   ```bash
   npm install
   npm run build
   ```

4. **Deploy to your hosting** (Vercel, Netlify, etc.)
5. **Configure DNS** to point `compare.cpp41419.com.au` to your deployment

✅ **Result:** Your comparison engine is now live at `compare.cpp41419.com.au`

---

## How SEO Uniqueness Works

Each deployment gets unique metadata based on the `NEXT_PUBLIC_COURSE_CODE`:

### Example: CPP41419 Deployment

```html
<title>Compare CPP41419 Providers | Certificate IV in Real Estate Practice</title>
<meta name="description" content="Compare CPP41419 training providers with registry-validated compliance data, sustainability metrics, and true cost analysis.">
<link rel="canonical" href="https://cpp41419.com.au/compare">
```

### Example: BSB40520 Deployment

```html
<title>Compare BSB40520 Providers | Certificate IV in Leadership and Management</title>
<meta name="description" content="Compare BSB40520 training providers with independent audit data, market intelligence, and institutional accountability scores.">
<link rel="canonical" href="https://bsb40520.com.au/compare">
```

**Google sees these as completely different pages** with unique content and purpose.

---

## Environment Variables Reference

| Variable | Required | Description | Example |
|----------|----------|-------------|---------|
| `NEXT_PUBLIC_COURSE_CODE` | Yes | Course identifier | `CPP41419` |
| `NEXT_PUBLIC_SITE_URL` | Yes | Full URL for canonical links | `https://cpp41419.com.au/compare` |
| `NEXT_PUBLIC_DEPLOYMENT_MODE` | No | Deployment type | `route`, `subdomain`, or `standalone` |
| `NEXT_PUBLIC_STATE` | No | Default state filter | `NSW`, `VIC`, `QLD`, etc. |

---

## Adding New Courses

To add support for a new course, edit `lib/course-config.ts`:

```typescript
const COURSE_METADATA: Record<string, { name: string; description: string }> = {
  // ... existing courses ...
  
  FNS40821: {
    name: "Certificate IV in Accounting and Bookkeeping",
    description: "Compare FNS40821 training providers with registry-validated data, sustainability metrics, and true cost analysis."
  },
}
```

---

## SEO Best Practices

### 1. **Unique Canonical URLs**
Each deployment must have its own canonical URL:
- ✅ `cpp41419.com.au/compare`
- ✅ `compare.cpp41419.com.au`
- ❌ Don't use the same canonical for multiple deployments

### 2. **Robots.txt Configuration**

**For course sites with `/compare` route:**
```txt
# Allow indexing of comparison page
User-agent: *
Allow: /compare
```

**For standalone subdomain:**
```txt
# Allow full indexing
User-agent: *
Allow: /
```

### 3. **Internal Linking**
Link to your comparison page from relevant course pages:
```html
<a href="/compare">Compare Training Providers</a>
```

### 4. **Schema.org Markup**
The engine automatically injects course-specific Schema.org markup via the `SchemaInjector` component. No additional configuration needed.

---

## Deployment Checklist

- [ ] Set `NEXT_PUBLIC_COURSE_CODE` environment variable
- [ ] Set `NEXT_PUBLIC_SITE_URL` to full canonical URL
- [ ] Verify metadata in page source shows course-specific content
- [ ] Check canonical URL points to correct deployment
- [ ] Test that Schema.org markup includes course code
- [ ] Submit sitemap to Google Search Console
- [ ] Monitor indexing in Search Console

---

## Troubleshooting

### Metadata not updating?
- Clear Next.js cache: `rm -rf .next`
- Restart dev server: `npm run dev`
- Check environment variables are loaded: `console.log(process.env.NEXT_PUBLIC_COURSE_CODE)`

### Wrong canonical URL?
- Verify `NEXT_PUBLIC_SITE_URL` is set correctly
- Check for trailing slashes (should not have one)
- Rebuild the project: `npm run build`

### Course not recognized?
- Ensure course code is added to `COURSE_METADATA` in `lib/course-config.ts`
- Course code must match pattern: 3-6 letters + 5 digits (e.g., `CPP41419`)

---

## Advanced: Multi-Course Network

If you're deploying across multiple courses, consider:

1. **Centralized configuration** - Store course metadata in a shared package
2. **Automated deployment** - Use CI/CD to deploy to multiple subdomains
3. **Shared components** - Keep comparison engine as an npm package
4. **Centralized data** - Use a shared API for provider data

See `examples/course-site-integration.tsx` for a complete example.

---

## Support

For questions or issues:
- Review the implementation plan
- Check `examples/` directory for reference code
- Verify environment variables are set correctly
