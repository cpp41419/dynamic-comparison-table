# Quick Start Guide - Comparison Engine Deployment

## Already Completed ✅

1. ✅ Comparison engine package created at `packages/comparison-engine`
2. ✅ Ralph's `generate_sites.cjs` updated to auto-inject `/compare` routes
3. ✅ Environment variables configured
4. ✅ Workspace dependencies set up

## Next: Deploy to All Course Sites

### Option 1: Automatic Deployment (Recommended)

Run the complete deployment script:

```bash
cd /Users/cappadonna/nextjs-template-extractor
chmod +x "/Users/cappadonna/Downloads/dynamic-comparison-table 2/deploy-all-sites.sh"
bash "/Users/cappadonna/Downloads/dynamic-comparison-table 2/deploy-all-sites.sh"
```

This will regenerate all sites with comparison engine.

### Option 2: Manual Step-by-Step

```bash
cd /Users/cappadonna/nextjs-template-extractor

# 1. Regenerate all sites
node scripts/generate_sites.cjs

# 2. Install dependencies
npm install

# 3. Test a single site
cd bsb40520-site
npm install
npm run build

# 4. Build all sites
cd ..
./scripts/manage_network.sh build all

# 5. Deploy all sites
./scripts/manage_network.sh deploy all
```

### Option 3: Deploy Single Site for Testing

```bash
cd /Users/cappadonna/nextjs-template-extractor

# Generate just BSB40520
node scripts/generate_sites.cjs BSB40520

# Build it
cd bsb40520-site
npm install
npm run build

# Deploy it
cd ..
./scripts/manage_network.sh deploy bsb40520
```

## Special Cases

### CPP41419 (Protected Site)

Since CPP41419 is protected from regeneration, manually add comparison:

```bash
cd /Users/cappadonna/nextjs-template-extractor/cpp41419-site

# 1. Create compare route
mkdir -p src/app/compare

# 2. Create page.tsx
cat > src/app/compare/page.tsx << 'EOF'
"use client"

import React from "react"
import HeroSection from "@/components/comparison/HeroSection"
import CourseGrid from "@/components/comparison/CourseGrid"
import Footer from "@/components/comparison/Footer"

export default function ComparePage() {
    return (
        <>
            <HeroSection />
            <CourseGrid />
            <Footer />
        </>
    )
}
EOF

# 3. Add to .env.local
echo "NEXT_PUBLIC_SITE_URL=https://cpp41419.com.au/compare" >> .env.local
echo "NEXT_PUBLIC_DEPLOYMENT_MODE=route" >> .env.local

# 4. Add dependency to package.json (manually edit)
# Add: "@comparison-engine": "workspace:*"

# 5. Install and build
npm install
npm run build
```

### Main-Master (Hub Site)

Add generic comparison showing ALL courses:

```bash
cd /Users/cappadonna/nextjs-template-extractor/main-master

# 1. Create compare route
mkdir -p src/app/compare

# 2. Create page.tsx with GENERIC mode
cat > src/app/compare/page.tsx << 'EOF'
"use client"

import React from "react"
import HeroSection from "@/components/comparison/HeroSection"
import CourseGrid from "@/components/comparison/CourseGrid"
import Footer from "@/components/comparison/Footer"

export default function ComparePage() {
    return (
        <>
            <HeroSection />
            <CourseGrid />
            <Footer />
        </>
    )
}
EOF

# 3. Add to .env.local
echo "NEXT_PUBLIC_COURSE_CODE=GENERIC" >> .env.local
echo "NEXT_PUBLIC_SITE_URL=https://yourdomain.com.au/compare" >> .env.local
echo "NEXT_PUBLIC_DEPLOYMENT_MODE=standalone" >> .env.local

# 4. Install and build
npm install
npm run build
```

## Verification

After deployment, verify each site:

```bash
# Check files were created
ls -la bsb40520-site/src/app/compare/
cat bsb40520-site/.env.local | grep NEXT_PUBLIC_SITE_URL
cat bsb40520-site/package.json | grep comparison-engine

# Build test
cd bsb40520-site
npm run build

# Check for errors
echo $?  # Should be 0
```

## Live Site Verification

Once deployed, check:

1. **Visit comparison page**: `https://bsb40520.com.au/compare`
2. **View page source**: Look for course-specific metadata
3. **Check Schema.org**: Search for `EducationalOccupationalCredential`
4. **Test functionality**: Try comparing providers

## Troubleshooting

### "Cannot find module '@comparison-engine'"

```bash
cd /Users/cappadonna/nextjs-template-extractor
npm install
```

### "Page not found" on /compare route

```bash
# Regenerate the site
node scripts/generate_sites.cjs BSB40520
cd bsb40520-site
npm install
npm run build
```

### Wrong course metadata showing

```bash
# Check environment variables
cat bsb40520-site/.env.local | grep NEXT_PUBLIC_COURSE_CODE
# Should show: NEXT_PUBLIC_COURSE_CODE=BSB40520
```

## Summary

**Sites that will auto-regenerate with /compare:**
- bsb40520-site ✅
- chc33021-site ✅
- chc43015-site ✅
- uee30820-site ✅
- fns40821-site ✅
- fns50322-site ✅
- hlt54121-site ✅
- bsb50420-site ✅
- bsb50820-site ✅
- cpp40521-site ✅
- cpp51122-site ✅

**Sites requiring manual integration:**
- cpp41419-site (protected)
- main-master (hub)

**Total sites with comparison:** 13+ sites 🚀
