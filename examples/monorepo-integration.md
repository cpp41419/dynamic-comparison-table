# Monorepo Integration Guide

Deploy the comparison engine across multiple course sites in a monorepo architecture.

---

## Overview

This guide shows how to integrate the comparison engine into a monorepo containing multiple course sites, where each site gets its own `/compare` route with unique SEO indexing.

**Monorepo Structure:**
```
course-network/
├── packages/
│   ├── comparison-engine/        # Shared comparison engine
│   ├── shared-components/         # Shared UI components
│   └── shared-config/             # Shared configuration
├── sites/
│   ├── main-master/              # Course hub (lists all courses)
│   ├── cpp41419-site/            # CPP41419 course-specific site
│   ├── bsb40520-site/            # BSB40520 course-specific site
│   ├── chc43015-site/            # CHC43015 course-specific site
│   └── uee30820-site/            # UEE30820 course-specific site
├── scripts/
│   ├── generate_sites.cjs        # Site generation script
│   └── manage_network.sh         # Network management
├── package.json                   # Root package.json
├── turbo.json                     # Turborepo config (optional)
└── pnpm-workspace.yaml           # pnpm workspace config
```

**Site Types:**
- **main-master**: Course hub site that lists all available courses (generic comparison)
- **Course sites**: Individual course-specific sites with course-specific comparison

---

## Step 1: Set Up Comparison Engine Package

### Create Package Structure

```bash
mkdir -p packages/comparison-engine
cd packages/comparison-engine
```

### Package Configuration

Create `packages/comparison-engine/package.json`:

```json
{
  "name": "@course-network/comparison-engine",
  "version": "1.0.0",
  "private": true,
  "main": "./index.ts",
  "types": "./index.ts",
  "exports": {
    ".": "./index.ts",
    "./components/*": "./components/*.tsx",
    "./lib/*": "./lib/*.ts",
    "./styles/*": "./styles/*.css"
  },
  "dependencies": {
    "@radix-ui/react-dialog": "1.1.4",
    "@radix-ui/react-select": "2.1.4",
    "@radix-ui/react-toast": "1.2.4",
    "@supabase/supabase-js": "2.90.1",
    "lucide-react": "^0.454.0",
    "recharts": "2.15.4",
    "sonner": "^1.7.4"
  },
  "peerDependencies": {
    "next": ">=14.0.0",
    "react": ">=18.0.0",
    "react-dom": ">=18.0.0"
  }
}
```

### Copy Comparison Engine Files

```bash
# From your comparison engine repository
cp -r components packages/comparison-engine/
cp -r lib packages/comparison-engine/
cp -r styles packages/comparison-engine/
```

### Create Package Entry Point

Create `packages/comparison-engine/index.ts`:

```typescript
// Main components
export { default as CourseSelection } from './components/course-selection'
export { default as ComparisonTable } from './components/ComparisonTable'

// Comparison components
export { ComparisonHeader } from './components/comparison/ComparisonHeader'
export { CourseGrid } from './components/comparison/CourseGrid'
export { HeroSection } from './components/comparison/HeroSection'
export { Footer } from './components/comparison/Footer'

// Audit components
export { AuditEngineInjected } from './components/audit/AuditEngineInjected'
export { TrustSignature } from './components/audit/TrustSignature'
export { AccountabilityScorecard } from './components/audit/AccountabilityScorecard'
export { SustainabilityGauge } from './components/audit/SustainabilityGauge'
export { SchemaInjector } from './components/audit/SchemaInjector'

// Utilities
export { parseData } from './lib/parse-data'
export { calculateMarketAlpha, getSustainabilityVerdict } from './lib/audit-engine'
export { getCourseConfig, generateCourseMetadata, detectCourseContext } from './lib/course-config'

// Types
export type { EnrichedProvider, CourseConfig } from './lib/types'
```

---

## Step 2: Configure Workspace

### pnpm Workspace (Recommended)

Create `pnpm-workspace.yaml` at root:

```yaml
packages:
  - 'packages/*'
  - 'sites/*'
```

### npm/yarn Workspace

Update root `package.json`:

```json
{
  "name": "course-network",
  "private": true,
  "workspaces": [
    "packages/*",
    "sites/*"
  ]
}
```

### Install Dependencies

```bash
# From root
pnpm install
# or
npm install
```

---

## Step 3: Integrate into Course Sites

### Add Package Dependency

In each course site's `package.json`:

```json
{
  "name": "cpp41419-site",
  "dependencies": {
    "@course-network/comparison-engine": "workspace:*",
    "next": "15.5.9",
    "react": "19.2.0"
  }
}
```

### Create Compare Route

Create `sites/cpp41419-site/src/app/compare/page.tsx`:

```typescript
"use client"

import React from "react"
import { 
  HeroSection, 
  CourseGrid, 
  Footer 
} from "@course-network/comparison-engine"
import "@course-network/comparison-engine/styles/course-page.css"

export default function ComparePage() {
  return (
    <>
      <HeroSection />
      <CourseGrid />
      <Footer />
    </>
  )
}
```

### Configure Environment Variables

Create `sites/cpp41419-site/.env.local`:

```bash
NEXT_PUBLIC_COURSE_CODE=CPP41419
NEXT_PUBLIC_SITE_URL=https://cpp41419.com.au/compare
NEXT_PUBLIC_DEPLOYMENT_MODE=route
NEXT_PUBLIC_STATE=NSW
```

### Update Site Layout (Optional)

If you want course-specific metadata in the layout:

```typescript
// sites/cpp41419-site/src/app/layout.tsx
import { getCourseConfig, generateCourseMetadata } from '@course-network/comparison-engine'

const courseConfig = getCourseConfig()
const courseMetadata = generateCourseMetadata(courseConfig)

export const metadata = {
  // ... your existing metadata
  // Optionally merge with courseMetadata for /compare route
}
```

---

## Step 4: Automate Site Generation

### Update Site Generation Script

Modify `scripts/generate_sites.cjs` to inject comparison engine:

```javascript
const fs = require('fs')
const path = require('path')

const COURSES = [
  { code: 'CPP41419', name: 'Certificate IV in Real Estate Practice', state: 'NSW' },
  { code: 'BSB40520', name: 'Certificate IV in Leadership and Management', state: 'VIC' },
  { code: 'CHC43015', name: 'Certificate IV in Ageing Support', state: 'QLD' },
]

function generateSite(course) {
  const siteDir = `sites/${course.code.toLowerCase()}-site`
  
  // Create compare route
  const compareDir = path.join(siteDir, 'src/app/compare')
  fs.mkdirSync(compareDir, { recursive: true })
  
  // Generate compare page
  const comparePageContent = `"use client"

import React from "react"
import { HeroSection, CourseGrid, Footer } from "@course-network/comparison-engine"
import "@course-network/comparison-engine/styles/course-page.css"

export default function ComparePage() {
  return (
    <>
      <HeroSection />
      <CourseGrid />
      <Footer />
    </>
  )
}
`
  
  fs.writeFileSync(
    path.join(compareDir, 'page.tsx'),
    comparePageContent
  )
  
  // Generate .env.local
  const envContent = `NEXT_PUBLIC_COURSE_CODE=${course.code}
NEXT_PUBLIC_SITE_URL=https://${course.code.toLowerCase()}.com.au/compare
NEXT_PUBLIC_DEPLOYMENT_MODE=route
NEXT_PUBLIC_STATE=${course.state}
`
  
  fs.writeFileSync(
    path.join(siteDir, '.env.local'),
    envContent
  )
  
  console.log(`✓ Generated comparison route for ${course.code}`)
}

// Generate for all courses
COURSES.forEach(generateSite)
```

### Update Network Management Script

Modify `scripts/manage_network.sh`:

```bash
#!/bin/bash

COMMAND=$1
SITE=$2

build_site() {
  local site=$1
  echo "Building $site..."
  cd "sites/$site"
  
  # Ensure comparison engine is linked
  pnpm install
  
  # Build the site
  pnpm build
  
  cd ../..
}

deploy_site() {
  local site=$1
  echo "Deploying $site..."
  
  # Build first
  build_site "$site"
  
  # Deploy (example using Vercel)
  cd "sites/$site"
  vercel --prod
  cd ../..
}

case $COMMAND in
  build)
    if [ "$SITE" = "all" ]; then
      for site in sites/*-site; do
        build_site "$(basename $site)"
      done
    else
      build_site "$SITE"
    fi
    ;;
  deploy)
    if [ "$SITE" = "all" ]; then
      for site in sites/*-site; do
        deploy_site "$(basename $site)"
      done
    else
      deploy_site "$SITE"
    fi
    ;;
  *)
    echo "Usage: $0 {build|deploy} {site-name|all}"
    exit 1
    ;;
esac
```

---

## Step 5: Shared Configuration

### Create Shared Config Package

Create `packages/shared-config/course-metadata.ts`:

```typescript
export const COURSE_METADATA = {
  CPP41419: {
    name: "Certificate IV in Real Estate Practice",
    description: "Compare CPP41419 training providers with registry-validated compliance data.",
    state: "NSW"
  },
  BSB40520: {
    name: "Certificate IV in Leadership and Management",
    description: "Compare BSB40520 training providers with independent audit data.",
    state: "VIC"
  },
  CHC43015: {
    name: "Certificate IV in Ageing Support",
    description: "Compare CHC43015 training providers with compliance verification.",
    state: "QLD"
  },
  // Add more courses...
}
```

### Update Comparison Engine to Use Shared Config

Modify `packages/comparison-engine/lib/course-config.ts`:

```typescript
import { COURSE_METADATA } from '@course-network/shared-config/course-metadata'

// Use imported COURSE_METADATA instead of local definition
export function detectCourseContext(): CourseConfig {
  // ... existing code using COURSE_METADATA
}
```

---

## Step 6: TypeScript Configuration

### Root tsconfig.json

```json
{
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@course-network/comparison-engine": ["./packages/comparison-engine"],
      "@course-network/comparison-engine/*": ["./packages/comparison-engine/*"],
      "@course-network/shared-config/*": ["./packages/shared-config/*"]
    }
  }
}
```

### Site-Specific tsconfig.json

```json
{
  "extends": "../../tsconfig.json",
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@/*": ["./src/*"],
      "@course-network/comparison-engine": ["../../packages/comparison-engine"],
      "@course-network/comparison-engine/*": ["../../packages/comparison-engine/*"]
    }
  }
}
```

---

## Step 7: Build and Deploy

### Build All Sites

```bash
# From root
./scripts/manage_network.sh build all
```

### Build Single Site

```bash
./scripts/manage_network.sh build cpp41419-site
```

### Deploy All Sites

```bash
./scripts/manage_network.sh deploy all
```

---

## Step 8: Turborepo Optimization (Optional)

### Install Turborepo

```bash
pnpm add -D turbo
```

### Create turbo.json

```json
{
  "$schema": "https://turbo.build/schema.json",
  "pipeline": {
    "build": {
      "dependsOn": ["^build"],
      "outputs": [".next/**", "!.next/cache/**"]
    },
    "dev": {
      "cache": false,
      "persistent": true
    },
    "lint": {
      "outputs": []
    }
  }
}
```

### Update Root package.json

```json
{
  "scripts": {
    "build": "turbo run build",
    "dev": "turbo run dev",
    "build:cpp41419": "turbo run build --filter=cpp41419-site",
    "build:all-sites": "turbo run build --filter='*-site'"
  }
}
```

### Build with Turbo

```bash
# Build all sites with caching
pnpm build

# Build specific site
pnpm build:cpp41419

# Build all sites in parallel
pnpm build:all-sites
```

---

## Monorepo Benefits

### ✅ Code Sharing
- Single comparison engine shared across all sites
- Consistent UI/UX across course network
- Shared utilities and configurations

### ✅ Centralized Updates
- Update comparison engine once, affects all sites
- Easy to add new features network-wide
- Consistent versioning

### ✅ Unique SEO Per Site
- Each site has unique metadata via environment variables
- Independent canonical URLs
- Course-specific Schema.org markup

### ✅ Efficient Builds
- Turborepo caching speeds up builds
- Only rebuild changed sites
- Parallel builds for faster CI/CD

---

## Example: Adding a New Course

### 1. Add Course Metadata

```typescript
// packages/shared-config/course-metadata.ts
export const COURSE_METADATA = {
  // ... existing courses
  FNS40821: {
    name: "Certificate IV in Accounting and Bookkeeping",
    description: "Compare FNS40821 training providers...",
    state: "NSW"
  }
}
```

### 2. Generate Site

```bash
# Run site generation script
node scripts/generate_sites.cjs

# Or manually create site structure
mkdir -p sites/fns40821-site/src/app/compare
```

### 3. Build and Deploy

```bash
./scripts/manage_network.sh build fns40821-site
./scripts/manage_network.sh deploy fns40821-site
```

---

## Troubleshooting

### Package Not Found

```bash
# Reinstall dependencies
pnpm install

# Check workspace links
pnpm list @course-network/comparison-engine
```

### Build Errors

```bash
# Clear all build caches
rm -rf sites/*/.next
rm -rf .turbo

# Rebuild
pnpm build
```

### Environment Variables Not Loading

- Ensure `.env.local` exists in each site directory
- Verify `NEXT_PUBLIC_` prefix for client-side variables
- Restart dev server after changing env vars

---

## CI/CD Integration

### GitHub Actions Example

```yaml
name: Build and Deploy Network

on:
  push:
    branches: [main]

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      
      - uses: pnpm/action-setup@v2
        with:
          version: 8
      
      - uses: actions/setup-node@v3
        with:
          node-version: 18
          cache: 'pnpm'
      
      - run: pnpm install
      
      - run: pnpm build
      
      - name: Deploy Sites
        run: |
          for site in sites/*-site; do
            cd "$site"
            vercel --prod --token=${{ secrets.VERCEL_TOKEN }}
            cd ../..
          done
```

---

## Best Practices

1. **Version Control** - Use semantic versioning for comparison engine package
2. **Testing** - Test comparison engine changes before deploying to all sites
3. **Documentation** - Keep course metadata up to date
4. **Monitoring** - Track builds and deployments per site
5. **Caching** - Use Turborepo for faster builds

---

## Summary

Your monorepo now has:
- ✅ Shared comparison engine package
- ✅ Unique `/compare` routes per course site
- ✅ Course-specific SEO metadata
- ✅ Automated site generation
- ✅ Efficient build pipeline
- ✅ Easy course addition process

Each course site maintains its unique identity while sharing the same powerful comparison engine! 🚀
