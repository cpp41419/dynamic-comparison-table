#!/bin/bash
# Deployment script for integrating comparison engine into Ralph monorepo
# Run this from /Users/cappadonna/nextjs-template-extractor

set -e

echo "🚀 Deploying Comparison Engine to Monorepo..."

# Step 1: Create comparison engine package structure
echo "📦 Creating comparison engine package..."
mkdir -p packages/comparison-engine/components
mkdir -p packages/comparison-engine/lib
mkdir -p packages/comparison-engine/styles

# Step 2: Copy comparison engine files
echo "📋 Copying comparison engine files..."
cp -r "/Users/cappadonna/Downloads/dynamic-comparison-table 2/components/"* packages/comparison-engine/components/
cp -r "/Users/cappadonna/Downloads/dynamic-comparison-table 2/lib/"* packages/comparison-engine/lib/
cp -r "/Users/cappadonna/Downloads/dynamic-comparison-table 2/styles/"* packages/comparison-engine/styles/

# Step 3: Create package.json
echo "📝 Creating package.json..."
cat > packages/comparison-engine/package.json << 'EOF'
{
  "name": "@comparison-engine",
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
    "@radix-ui/react-tabs": "1.1.2",
    "@radix-ui/react-progress": "1.1.1",
    "@supabase/supabase-js": "2.90.1",
    "lucide-react": "^0.454.0",
    "recharts": "2.15.4",
    "sonner": "^1.7.4",
    "class-variance-authority": "^0.7.1",
    "clsx": "^2.1.1",
    "tailwind-merge": "^3.3.1"
  },
  "peerDependencies": {
    "next": ">=14.0.0",
    "react": ">=18.0.0",
    "react-dom": ">=18.0.0"
  }
}
EOF

# Step 4: Create index.ts
echo "📝 Creating index.ts..."
cat > packages/comparison-engine/index.ts << 'EOF'
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
export type { EnrichedProvider } from './lib/types'
EOF

# Step 5: Install dependencies
echo "📦 Installing workspace dependencies..."
npm install

echo "✅ Comparison engine package created successfully!"
echo ""
echo "Next steps:"
echo "1. Update scripts/generate_sites.cjs to inject /compare routes"
echo "2. Add comparison to main-master"
echo "3. Regenerate course sites"
echo ""
echo "Run: node scripts/generate_sites.cjs to regenerate all sites with comparison engine"
