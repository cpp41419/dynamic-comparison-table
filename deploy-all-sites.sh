#!/bin/bash
# ONE-COMMAND DEPLOYMENT
# Run this to deploy comparison engine across entire network

set -e

echo "╔════════════════════════════════════════════════════════════════╗"
echo "║   COMPARISON ENGINE - FULL NETWORK DEPLOYMENT                  ║"
echo "╚════════════════════════════════════════════════════════════════╝"
echo ""

MONOREPO="/Users/cappadonna/nextjs-template-extractor"
COMPARISON_SRC="/Users/cappadonna/Downloads/dynamic-comparison-table 2"

# Step 1: Verify setup
echo "📋 Step 1/5: Verifying setup..."
if [ ! -d "$MONOREPO/packages/comparison-engine" ]; then
    echo "❌ Comparison engine package not found!"
    echo "   Run: bash '$COMPARISON_SRC/deploy-to-monorepo.sh' first"
    exit 1
fi
echo "   ✅ Comparison engine package exists"

# Step 2: Regenerate all sites
echo ""
echo "📦 Step 2/5: Regenerating all course sites..."
cd "$MONOREPO"
node scripts/generate_sites.cjs

# Step 3: Install dependencies
echo ""
echo "📦 Step 3/5: Installing workspace dependencies..."
npm install

# Step 4: Verify sample sites
echo ""
echo "🔍 Step 4/5: Verifying generated sites..."

VERIFIED=0
FAILED=0

for site in bsb40520-site chc33021-site uee30820-site; do
    echo ""
    echo "Checking $site..."
    
    if [ -f "$site/src/app/compare/page.tsx" ]; then
        echo "  ✅ /compare route exists"
        ((VERIFIED++))
    else
        echo "  ❌ /compare route missing"
        ((FAILED++))
    fi
    
    if grep -q "NEXT_PUBLIC_SITE_URL" "$site/.env.local" 2>/dev/null; then
        echo "  ✅ Environment variables configured"
    else
        echo "  ❌ Environment variables missing"
        ((FAILED++))
    fi
    
    if grep -q "@comparison-engine" "$site/package.json" 2>/dev/null; then
        echo "  ✅ Comparison engine dependency added"
    else
        echo "  ❌ Dependency missing"
        ((FAILED++))
    fi
done

# Step 5: Build test site
echo ""
echo "🛠️  Step 5/5: Building test site (BSB40520)..."
cd bsb40520-site
npm install
npm run build

if [ $? -eq 0 ]; then
    echo "  ✅ Build successful!"
else
    echo "  ❌ Build failed!"
    exit 1
fi

# Summary
echo ""
echo "╔════════════════════════════════════════════════════════════════╗"
echo "║   DEPLOYMENT COMPLETE!                                         ║"
echo "╚════════════════════════════════════════════════════════════════╝"
echo ""
echo "📊 Results:"
echo "   Sites verified: $VERIFIED"
echo "   Issues found: $FAILED"
echo ""
echo "🎯 Next Steps:"
echo ""
echo "1. Deploy all sites to production:"
echo "   cd $MONOREPO"
echo "   ./scripts/manage_network.sh deploy all"
echo ""
echo "2. Manually add to CPP41419 (protected site):"
echo "   See: $COMPARISON_SRC/QUICK_START.md"
echo ""
echo "3. Add to main-master (hub site):"
echo "   See: $COMPARISON_SRC/QUICK_START.md"
echo ""
echo "4. Verify live sites:"
echo "   https://bsb40520.com.au/compare"
echo "   https://chc33021.com.au/compare"
echo "   https://uee30820.com.au/compare"
echo ""
echo "📖 Documentation:"
echo "   $COMPARISON_SRC/DEPLOYMENT_SUMMARY.md"
echo ""
