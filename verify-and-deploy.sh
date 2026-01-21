#!/bin/bash
# Manual deployment verification and execution

echo "🔍 Checking if comparison engine package exists..."
cd /Users/cappadonna/nextjs-template-extractor

if [ -d "packages/comparison-engine" ]; then
    echo "✅ Comparison engine package found!"
    echo ""
    echo "📦 Regenerating BSB40520 site as test..."
    node scripts/generate_sites.cjs BSB40520
    echo ""
    echo "🔍 Verifying /compare route was created..."
    if [ -f "bsb40520-site/src/app/compare/page.tsx" ]; then
        echo "✅ /compare route created successfully!"
        cat bsb40520-site/src/app/compare/page.tsx
    else
        echo "❌ /compare route not found"
    fi
    echo ""
    echo "🔍 Checking environment variables..."
    grep "NEXT_PUBLIC_SITE_URL" bsb40520-site/.env.local
    echo ""
    echo "🔍 Checking package.json dependency..."
    grep "comparison-engine" bsb40520-site/package.json
else
    echo "❌ Comparison engine package not found at packages/comparison-engine"
    echo "The deploy-to-monorepo.sh script may not have completed successfully."
    echo ""
    echo "Try running it again:"
    echo "  cd /Users/cappadonna/Downloads/dynamic-comparison-table\ 2"
    echo "  bash deploy-to-monorepo.sh"
fi
