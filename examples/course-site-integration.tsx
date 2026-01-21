/**
 * Example: Integrating Comparison Engine into Existing Course Site
 * 
 * This example shows how to add the comparison engine as a /compare route
 * on an existing Next.js course site (e.g., cpp41419.com.au/compare)
 */

// ============================================
// STEP 1: Copy Required Files
// ============================================
// Copy these directories from the comparison engine:
// - /components (all comparison components)
// - /lib (utilities and configuration)
// - /styles (if not already present)

// ============================================
// STEP 2: Create app/compare/page.tsx
// ============================================

import CourseSelection from "@/components/course-selection"
import { getCourseConfig } from "@/lib/course-config"
import type { Metadata } from "next"

// Generate course-specific metadata for this page
export async function generateMetadata(): Promise<Metadata> {
    const config = getCourseConfig()

    return {
        title: `Compare ${config.courseCode} Training Providers`,
        description: `Independent comparison of ${config.courseCode} providers with registry-validated data and sustainability metrics.`,
        alternates: {
            canonical: `${config.siteUrl}`,
        },
    }
}

export default function ComparePage() {
    return (
        <main className="min-h-screen bg-background">
            {/* Optional: Add your site's header/navigation */}
            {/* <SiteHeader /> */}

            <CourseSelection />

            {/* Optional: Add your site's footer */}
            {/* <SiteFooter /> */}
        </main>
    )
}

// ============================================
// STEP 3: Update .env.local
// ============================================
// Add these environment variables:
/*
NEXT_PUBLIC_COURSE_CODE=CPP41419
NEXT_PUBLIC_SITE_URL=https://cpp41419.com.au/compare
NEXT_PUBLIC_DEPLOYMENT_MODE=route
NEXT_PUBLIC_STATE=NSW
*/

// ============================================
// STEP 4: Update next.config.js (if needed)
// ============================================
// Ensure your Next.js config allows the comparison route:
/*
module.exports = {
  // ... other config
  async rewrites() {
    return [
      // Your existing rewrites
    ]
  },
}
*/

// ============================================
// STEP 5: Add Internal Links
// ============================================
// Link to the comparison page from relevant course pages:
/*
// In your course info page:
<Link href="/compare" className="btn-primary">
  Compare Training Providers
</Link>

// In your navigation:
<nav>
  <Link href="/">Home</Link>
  <Link href="/about">About</Link>
  <Link href="/compare">Compare Providers</Link>
</nav>
*/

// ============================================
// STEP 6: Update Sitemap (Optional)
// ============================================
// Add the compare route to your sitemap.xml:
/*
export default function sitemap() {
  return [
    {
      url: 'https://cpp41419.com.au',
      lastModified: new Date(),
    },
    {
      url: 'https://cpp41419.com.au/compare',
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
  ]
}
*/

// ============================================
// STEP 7: Test Locally
// ============================================
// 1. Run: npm run dev
// 2. Visit: http://localhost:3000/compare
// 3. Verify course-specific metadata in page source
// 4. Check that canonical URL is correct

// ============================================
// STEP 8: Deploy
// ============================================
// Build and deploy your course site as normal:
// npm run build
// Deploy to your hosting platform

// ============================================
// ADVANCED: Custom Styling
// ============================================
// To match your course site's design, you can:
// 1. Override CSS variables in your globals.css
// 2. Wrap components with your design system
// 3. Customize the ComparisonHeader component

// Example: Override colors
/*
// In your globals.css:
:root {
  --primary: 210 100% 20%;  // Your course brand color
  --secondary: 45 100% 50%; // Your accent color
}
*/

// ============================================
// ADVANCED: Data Customization
// ============================================
// To show only providers for your course:
/*
// In app/compare/page.tsx:
import { parseData } from "@/lib/parse-data"
import { getCourseConfig } from "@/lib/course-config"

export default function ComparePage() {
  const config = getCourseConfig()
  const allProviders = parseData()
  
  // Filter to only show providers offering this course
  const courseProviders = allProviders.filter(p => 
    p.courses?.includes(config.courseCode)
  )
  
  return (
    <main className="min-h-screen bg-background">
      <CourseSelection initialProviders={courseProviders} />
    </main>
  )
}
*/
