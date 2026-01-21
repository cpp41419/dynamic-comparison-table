#!/bin/bash
# Test script to verify Ralph generates sites with comparison engine

cd /Users/cappadonna/nextjs-template-extractor

echo "🧪 Testing Ralph with comparison engine integration..."
echo ""

# Generate a test site (BSB40520)
echo "📦 Generating BSB40520 site..."
node scripts/generate_sites.cjs BSB40520

echo ""
echo "✅ Generation complete!"
echo ""
echo "Verification checklist:"
echo "1. Check if bsb40520-site/src/app/compare/page.tsx exists"
echo "2. Check if .env.local contains NEXT_PUBLIC_SITE_URL"
echo "3. Check if package.json includes @comparison-engine dependency"
echo ""

# Verify the files were created
if [ -f "bsb40520-site/src/app/compare/page.tsx" ]; then
    echo "✅ /compare route created successfully"
else
    echo "❌ /compare route NOT found"
fi

if grep -q "NEXT_PUBLIC_SITE_URL" "bsb40520-site/.env.local" 2>/dev/null; then
    echo "✅ Comparison engine environment variables added"
else
    echo "❌ Environment variables NOT found"
fi

if grep -q "@comparison-engine" "bsb40520-site/package.json" 2>/dev/null; then
    echo "✅ Comparison engine dependency added to package.json"
else
    echo "❌ Dependency NOT found in package.json"
fi

echo ""
echo "To build and test the site:"
echo "  cd bsb40520-site"
echo "  npm install"
echo "  npm run build"
