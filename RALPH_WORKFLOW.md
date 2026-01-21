# Ralph Workflow - Comparison Engine Integration

## Ralph's Role in the Network

Ralph is your site generation and management system that:
1. Reads course data from `market_intelligence/{COURSE_CODE}.json`
2. Generates course-specific sites from templates
3. Injects data, environment variables, and configurations
4. Manages the entire network of 12+ course sites

## What Ralph Now Does (After Integration)

### Before Integration
```javascript
// Ralph generated:
- Course site structure
- FAQ data injection
- Environment variables
- Package dependencies
```

### After Integration ✅
```javascript
// Ralph now ALSO generates:
- /compare route for each site
- Comparison engine environment variables
- @comparison-engine workspace dependency
- Course-specific comparison metadata
```

## Ralph's Enhanced Generation Process

```javascript
// scripts/generate_sites.cjs - Line 287-339

function generateSite(templateDir, siteNamePrefix, jsonData, courseCode, siteMode) {
    // ... existing Ralph logic ...
    
    // NEW: Comparison Engine Variables (Line 300-303)
    const envContent = [
        // ... existing vars ...
        `NEXT_PUBLIC_SITE_URL=https://${courseCode.toLowerCase()}.com.au/compare`,
        `NEXT_PUBLIC_DEPLOYMENT_MODE=route`,
        `NEXT_PUBLIC_STATE=NSW`,
    ].join('\n');
    
    // NEW: Create /compare Route (Line 310-339)
    const compareDir = path.join(targetDir, 'src', 'app', 'compare');
    fs.mkdirSync(compareDir, { recursive: true });
    
    const comparePageContent = `"use client"
    import HeroSection from "@/components/comparison/HeroSection"
    import CourseGrid from "@/components/comparison/CourseGrid"
    import Footer from "@/components/comparison/Footer"
    
    export default function ComparePage() {
        return (<><HeroSection /><CourseGrid /><Footer /></>)
    }`;
    
    fs.writeFileSync(path.join(compareDir, 'page.tsx'), comparePageContent);
    
    // NEW: Add Comparison Engine Dependency (Line 357)
    packageJson.dependencies['@comparison-engine'] = 'workspace:*';
}
```

## Ralph Commands

### Generate All Sites
```bash
cd /Users/cappadonna/nextjs-template-extractor
node scripts/generate_sites.cjs
```

**What happens:**
- Reads all JSON files from `market_intelligence/`
- Generates main site for each course
- Generates answers site for each course
- **NEW:** Creates `/compare` route in each site
- **NEW:** Injects comparison engine variables
- **NEW:** Adds comparison engine dependency

### Generate Specific Course
```bash
node scripts/generate_sites.cjs BSB40520
```

**What happens:**
- Generates only BSB40520 sites (main + answers)
- Creates `/compare` route
- Sets `NEXT_PUBLIC_COURSE_CODE=BSB40520`
- Configures unique SEO metadata

### Generate Multiple Courses
```bash
node scripts/generate_sites.cjs BSB40520 CHC33021 CPP41419
```

**What happens:**
- Generates specified courses only
- Each gets unique `/compare` route
- Each gets course-specific configuration

## Ralph's Data Flow

```
market_intelligence/BSB40520.json
        │
        ├─ Course metadata
        ├─ FAQ data
        ├─ Provider information
        └─ Market intelligence
                │
                ▼
    Ralph (generate_sites.cjs)
                │
                ├─ Generate main site
                ├─ Generate answers site
                ├─ Inject FAQ data
                ├─ Create /compare route ← NEW
                ├─ Add env variables ← NEW
                └─ Link comparison engine ← NEW
                │
                ▼
    bsb40520-site/
        ├─ src/app/compare/page.tsx ← NEW
        ├─ .env.local (with comparison vars) ← UPDATED
        └─ package.json (with @comparison-engine) ← UPDATED
```

## Ralph + Comparison Engine Integration Points

### 1. Environment Variables
**Location:** `generate_sites.cjs` Line 288-304

Ralph injects:
```bash
NEXT_PUBLIC_COURSE_CODE=BSB40520          # Course identifier
NEXT_PUBLIC_SITE_URL=https://bsb40520.com.au/compare  # Canonical URL
NEXT_PUBLIC_DEPLOYMENT_MODE=route         # Deployment type
NEXT_PUBLIC_STATE=NSW                     # Default state filter
```

### 2. Route Generation
**Location:** `generate_sites.cjs` Line 310-339

Ralph creates:
```
{course}-site/src/app/compare/page.tsx
```

### 3. Dependency Management
**Location:** `generate_sites.cjs` Line 342-361

Ralph adds to package.json:
```json
{
  "dependencies": {
    "@comparison-engine": "workspace:*"
  }
}
```

### 4. Template Copying
**Location:** `generate_sites.cjs` Line 234-235

Ralph copies from:
- `main-master/` → course sites
- `answers-master/` → answers sites
- **NEW:** Comparison components linked via workspace

## Ralph's Protected Sites

### CPP41419 (Protected)
```javascript
// Line 14-15
const PROTECTED_MAIN_SITES = ['CPP41419'];

// Line 434-438
if (!PROTECTED_MAIN_SITES.includes(courseCode)) {
    generateSite(MAIN_TEMPLATE_DIR, 'site', jsonData, courseCode, 'main');
} else {
    console.log(`Skipping Main Site generation for ${courseCode} (Protected).`);
}
```

**Why:** CPP41419 has custom modifications that shouldn't be overwritten.

**Solution:** Manually add comparison engine to cpp41419-site.

## Ralph Workflow Examples

### Example 1: Add New Course with Comparison

```bash
# 1. Add course data
echo '{"metadata": {"title": "New Course"}}' > market_intelligence/ABC12345.json

# 2. Run Ralph
node scripts/generate_sites.cjs ABC12345

# 3. Ralph automatically creates:
abc12345-site/
├─ src/app/compare/page.tsx ✅
├─ .env.local (with comparison vars) ✅
└─ package.json (with @comparison-engine) ✅

# 4. Build and deploy
cd abc12345-site
npm install
npm run build
```

### Example 2: Update All Sites

```bash
# 1. Update comparison engine
cd packages/comparison-engine
# Make changes to components...

# 2. Regenerate all sites (picks up new comparison engine)
cd ../..
node scripts/generate_sites.cjs

# 3. All sites now have updated comparison engine
./scripts/manage_network.sh build all
```

### Example 3: Fix Single Site

```bash
# 1. Regenerate just one site
node scripts/generate_sites.cjs BSB40520

# 2. Verify comparison route
ls -la bsb40520-site/src/app/compare/

# 3. Test build
cd bsb40520-site
npm install
npm run build
```

## Ralph's Output

When you run Ralph, you'll see:

```
Generating site for BSB40520 at /Users/cappadonna/nextjs-template-extractor/bsb40520-site...
  Found existing faq.json, preparing to merge...
  Merging data (Existing: 45 FAQs, Source: 48 FAQs)
  Updated qualification.json with Strategic Fields
  Updated faq.json & research.json (Manufactured Facts)
  Removed package-lock.json
  Generated llms.txt
  Injected SITE_MODE and Identity Variables into .env.production and .env.local
  Created /compare route at bsb40520-site/src/app/compare/page.tsx ← NEW
  Updated package.json with comparison engine dependency ← NEW
  Simplified getManifest.ts
  Pruned irrelevant content directories
  Generating posts for BSB40520...
✓ Successfully created bsb40520-site

Generating answers-site for BSB40520...
  Created /compare route at bsb40520-answers-site/src/app/compare/page.tsx ← NEW
  Updated package.json with comparison engine dependency ← NEW
✓ Successfully created bsb40520-answers-site
```

## Next Steps with Ralph

### 1. Test Ralph Integration
```bash
cd /Users/cappadonna/nextjs-template-extractor
node scripts/generate_sites.cjs BSB40520
```

### 2. Verify Output
```bash
# Check compare route exists
ls -la bsb40520-site/src/app/compare/page.tsx

# Check environment variables
cat bsb40520-site/.env.local | grep NEXT_PUBLIC_SITE_URL

# Check dependency
cat bsb40520-site/package.json | grep comparison-engine
```

### 3. Build Test Site
```bash
cd bsb40520-site
npm install
npm run build
```

### 4. Deploy All Sites
```bash
cd ..
./scripts/manage_network.sh deploy all
```

## Ralph Maintenance

### Update Comparison Engine
```bash
# 1. Update engine
cd packages/comparison-engine
# Make changes...

# 2. Regenerate sites (optional - only if structure changed)
cd ../..
node scripts/generate_sites.cjs

# 3. Sites automatically use updated engine via workspace link
```

### Add New Course
```bash
# 1. Add course data to market_intelligence/
# 2. Run Ralph
node scripts/generate_sites.cjs NEWCODE123

# 3. Comparison engine automatically included
```

### Remove Course
```bash
# 1. Delete course directory
rm -rf oldcourse-site

# 2. Remove from market_intelligence
rm market_intelligence/OLDCODE.json
```

## Summary

Ralph now:
✅ Auto-generates `/compare` routes
✅ Injects comparison engine variables
✅ Links workspace dependencies
✅ Creates course-specific configurations
✅ Maintains unique SEO per site

**All managed through one command:** `node scripts/generate_sites.cjs` 🚀
