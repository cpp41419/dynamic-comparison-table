# COMMAND REFERENCE CARD
# Quick reference for all comparison engine deployment commands

## INITIAL SETUP (Already Done ✅)

```bash
# Create comparison engine package
cd /Users/cappadonna/Downloads/dynamic-comparison-table\ 2
chmod +x deploy-to-monorepo.sh
bash deploy-to-monorepo.sh
```

---

## FULL DEPLOYMENT (Run This Now)

```bash
# Deploy to all course sites
cd /Users/cappadonna/Downloads/dynamic-comparison-table\ 2
chmod +x deploy-all-sites.sh
bash deploy-all-sites.sh
```

---

## RALPH COMMANDS

### Generate All Sites
```bash
cd /Users/cappadonna/nextjs-template-extractor
node scripts/generate_sites.cjs
```

### Generate Single Site
```bash
node scripts/generate_sites.cjs BSB40520
```

### Generate Multiple Sites
```bash
node scripts/generate_sites.cjs BSB40520 CHC33021 UEE30820
```

---

## BUILD COMMANDS

### Build All Sites
```bash
cd /Users/cappadonna/nextjs-template-extractor
./scripts/manage_network.sh build all
```

### Build Single Site
```bash
./scripts/manage_network.sh build bsb40520
```

### Build Manually
```bash
cd bsb40520-site
npm install
npm run build
```

---

## DEPLOY COMMANDS

### Deploy All Sites
```bash
cd /Users/cappadonna/nextjs-template-extractor
./scripts/manage_network.sh deploy all
```

### Deploy Single Site
```bash
./scripts/manage_network.sh deploy bsb40520
```

### Deploy Manually
```bash
cd bsb40520-site
npx vercel deploy --prod
```

---

## VERIFICATION COMMANDS

### Check Compare Route Exists
```bash
ls -la bsb40520-site/src/app/compare/page.tsx
```

### Check Environment Variables
```bash
cat bsb40520-site/.env.local | grep NEXT_PUBLIC_SITE_URL
```

### Check Dependency
```bash
cat bsb40520-site/package.json | grep comparison-engine
```

### Test Build
```bash
cd bsb40520-site
npm install
npm run build
echo $?  # Should be 0
```

---

## MANUAL INTEGRATION

### CPP41419 (Protected Site)
```bash
cd /Users/cappadonna/nextjs-template-extractor/cpp41419-site

# Create compare route
mkdir -p src/app/compare
cat > src/app/compare/page.tsx << 'EOF'
"use client"
import React from "react"
import HeroSection from "@/components/comparison/HeroSection"
import CourseGrid from "@/components/comparison/CourseGrid"
import Footer from "@/components/comparison/Footer"

export default function ComparePage() {
    return (<><HeroSection /><CourseGrid /><Footer /></>)
}
EOF

# Add environment variables
echo "NEXT_PUBLIC_SITE_URL=https://cpp41419.com.au/compare" >> .env.local
echo "NEXT_PUBLIC_DEPLOYMENT_MODE=route" >> .env.local

# Add dependency (edit package.json manually)
# Add: "@comparison-engine": "workspace:*"

npm install && npm run build
```

### Main-Master (Hub Site)
```bash
cd /Users/cappadonna/nextjs-template-extractor/main-master

# Create compare route
mkdir -p src/app/compare
cat > src/app/compare/page.tsx << 'EOF'
"use client"
import React from "react"
import HeroSection from "@/components/comparison/HeroSection"
import CourseGrid from "@/components/comparison/CourseGrid"
import Footer from "@/components/comparison/Footer"

export default function ComparePage() {
    return (<><HeroSection /><CourseGrid /><Footer /></>)
}
EOF

# Add environment variables (GENERIC mode)
echo "NEXT_PUBLIC_COURSE_CODE=GENERIC" >> .env.local
echo "NEXT_PUBLIC_SITE_URL=https://yourdomain.com.au/compare" >> .env.local
echo "NEXT_PUBLIC_DEPLOYMENT_MODE=standalone" >> .env.local

npm install && npm run build
```

---

## TROUBLESHOOTING COMMANDS

### Clear Build Cache
```bash
cd bsb40520-site
rm -rf .next node_modules
npm install
npm run build
```

### Reinstall Workspace Dependencies
```bash
cd /Users/cappadonna/nextjs-template-extractor
rm -rf node_modules
npm install
```

### Check Workspace Links
```bash
cd bsb40520-site
npm list @comparison-engine
```

### View Ralph Output
```bash
node scripts/generate_sites.cjs BSB40520 2>&1 | tee ralph-output.log
```

---

## QUICK TESTS

### Test Single Site End-to-End
```bash
cd /Users/cappadonna/nextjs-template-extractor
node scripts/generate_sites.cjs BSB40520
cd bsb40520-site
npm install
npm run build
npm run dev  # Visit http://localhost:3000/compare
```

### Verify All Sites Have Compare Routes
```bash
cd /Users/cappadonna/nextjs-template-extractor
find . -name "page.tsx" -path "*/app/compare/*" | grep -E "(bsb|chc|cpp|uee|fns|hlt)"
```

### Check All Environment Files
```bash
grep -r "NEXT_PUBLIC_SITE_URL" *-site/.env.local
```

---

## ONE-LINERS

### Full Deployment
```bash
cd /Users/cappadonna/Downloads/dynamic-comparison-table\ 2 && chmod +x deploy-all-sites.sh && bash deploy-all-sites.sh
```

### Quick Test
```bash
cd /Users/cappadonna/nextjs-template-extractor && node scripts/generate_sites.cjs BSB40520 && cd bsb40520-site && npm install && npm run build
```

### Deploy Everything
```bash
cd /Users/cappadonna/nextjs-template-extractor && node scripts/generate_sites.cjs && ./scripts/manage_network.sh build all && ./scripts/manage_network.sh deploy all
```

---

## FILE LOCATIONS

| Item | Location |
|------|----------|
| Monorepo | `/Users/cappadonna/nextjs-template-extractor` |
| Comparison Engine | `packages/comparison-engine/` |
| Ralph Script | `scripts/generate_sites.cjs` |
| Deploy Scripts | `/Users/cappadonna/Downloads/dynamic-comparison-table 2/` |
| Documentation | `/Users/cappadonna/Downloads/dynamic-comparison-table 2/*.md` |

---

## DOCUMENTATION

| File | Purpose |
|------|---------|
| `DEPLOYMENT_SUMMARY.md` | Complete summary |
| `QUICK_START.md` | Quick deployment guide |
| `RALPH_WORKFLOW.md` | Ralph-specific workflow |
| `RALPH_INTEGRATION.md` | Integration details |
| `ARCHITECTURE.md` | System architecture |

---

## SUPPORT

### Check Status
```bash
cd /Users/cappadonna/nextjs-template-extractor
./scripts/manage_network.sh build bsb40520
```

### View Logs
```bash
cd bsb40520-site
npm run build 2>&1 | tee build.log
```

### Get Help
```bash
./scripts/manage_network.sh --help
```
