/**
 * Example: Integrating Comparison Engine into Hub Site (main-master)
 * 
 * The hub site shows ALL courses and providers, not course-specific data.
 * This is different from course-specific sites which filter to one course.
 */

// ============================================
// STEP 1: Configure Hub Site Environment
// ============================================
// sites/main-master/.env.local

/*
# Hub site uses GENERIC mode to show all courses
NEXT_PUBLIC_COURSE_CODE=GENERIC
NEXT_PUBLIC_SITE_URL=https://yourdomain.com.au/compare
NEXT_PUBLIC_DEPLOYMENT_MODE=standalone
*/

// ============================================
// STEP 2: Create Hub Compare Route
// ============================================
// sites/main-master/src/app/compare/page.tsx

import CourseSelection from "@course-network/comparison-engine"
import { parseData } from "@course-network/comparison-engine/lib/parse-data"
import type { Metadata } from "next"

// Hub site metadata - shows ALL courses
export const metadata: Metadata = {
    title: "Compare VET Training Providers | All Courses",
    description: "Compare training providers across all VET qualifications. Independent analysis with registry-validated data, sustainability metrics, and true cost transparency.",
    alternates: {
        canonical: "https://yourdomain.com.au/compare",
    },
}

export default function HubComparePage() {
    // Show ALL providers across ALL courses
    const allProviders = parseData()

    return (
        <main className="min-h-screen bg-background">
            {/* Optional: Add hub navigation */}
            {/* <HubHeader /> */}

            <CourseSelection
                providers={allProviders}
                showAllCourses={true}
            />

            {/* Optional: Add course directory */}
            {/* <CourseDirectory /> */}
        </main>
    )
}

// ============================================
// STEP 3: Add Course Directory (Optional)
// ============================================
// Show links to individual course comparison pages

import Link from "next/link"
import { COURSE_METADATA } from "@course-network/shared-config/course-metadata"

function CourseDirectory() {
    return (
        <section className="container mx-auto px-4 py-12">
            <h2 className="text-3xl font-bold mb-8">Compare by Course</h2>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {Object.entries(COURSE_METADATA).map(([code, info]) => (
                    <Link
                        key={code}
                        href={`https://${code.toLowerCase()}.com.au/compare`}
                        className="p-6 border rounded-lg hover:shadow-lg transition-shadow"
                    >
                        <h3 className="font-bold text-lg mb-2">{code}</h3>
                        <p className="text-sm text-muted-foreground">{info.name}</p>
                        <p className="text-xs text-primary mt-2">
                            Compare {code} Providers →
                        </p>
                    </Link>
                ))}
            </div>
        </section>
    )
}

// ============================================
// STEP 4: Hub vs Course Site Comparison
// ============================================

/*
┌─────────────────────────────────────────────────────────────────┐
│ HUB SITE (main-master)                                          │
├─────────────────────────────────────────────────────────────────┤
│ URL: yourdomain.com.au/compare                                  │
│ Shows: ALL courses and providers                                │
│ Use Case: General comparison across entire network              │
│ SEO: Generic VET comparison keywords                            │
│ Metadata: "Compare VET Training Providers | All Courses"        │
└─────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────┐
│ COURSE SITE (cpp41419-site)                                     │
├─────────────────────────────────────────────────────────────────┤
│ URL: cpp41419.com.au/compare                                    │
│ Shows: Only CPP41419 providers                                  │
│ Use Case: Course-specific provider comparison                   │
│ SEO: CPP41419-specific keywords                                 │
│ Metadata: "Compare CPP41419 Providers | Real Estate Practice"   │
└─────────────────────────────────────────────────────────────────┘
*/

// ============================================
// STEP 5: Hub-Specific Features
// ============================================

// Add course filter to hub comparison
export function HubComparisonWithFilter() {
    const [selectedCourse, setSelectedCourse] = useState<string | null>(null)
    const allProviders = parseData()

    // Filter providers by selected course
    const filteredProviders = selectedCourse
        ? allProviders.filter(p => p.courses?.includes(selectedCourse))
        : allProviders

    return (
        <div>
            {/* Course filter dropdown */}
            <CourseFilter
                onCourseSelect={setSelectedCourse}
                selectedCourse={selectedCourse}
            />

            {/* Comparison table with filtered providers */}
            <CourseSelection providers={filteredProviders} />
        </div>
    )
}

// ============================================
// STEP 6: Internal Linking Strategy
// ============================================

/*
Hub Site Links:
- Link to specific course comparisons from course directory
- Breadcrumb: Home → Compare → [Course Code]

Course Site Links:
- Link back to hub for "Compare All Courses"
- Link to hub from course-specific comparison
- Breadcrumb: Home → [Course] → Compare Providers

Example:
*/

// In hub site
<Link href="/compare">Compare All Providers</Link>
<Link href="https://cpp41419.com.au/compare">Compare CPP41419 Providers</Link>

// In course site
<Link href="/">CPP41419 Home</Link>
<Link href="/compare">Compare Providers</Link>
<Link href="https://yourdomain.com.au/compare">Compare All Courses</Link>

// ============================================
// STEP 7: SEO Strategy
// ============================================

/*
Hub Site SEO:
- Target: "VET training provider comparison"
- Target: "compare RTO courses Australia"
- Target: "best training providers"

Course Site SEO:
- Target: "CPP41419 training providers"
- Target: "compare CPP41419 courses"
- Target: "best CPP41419 RTO"

This ensures no keyword cannibalization between hub and course sites.
*/

// ============================================
// STEP 8: Sitemap Configuration
// ============================================

// Hub site sitemap
export default function sitemap() {
    return [
        {
            url: 'https://yourdomain.com.au',
            lastModified: new Date(),
            priority: 1.0,
        },
        {
            url: 'https://yourdomain.com.au/compare',
            lastModified: new Date(),
            priority: 0.9,
            changeFrequency: 'weekly',
        },
        // Add links to course-specific comparisons
        ...Object.keys(COURSE_METADATA).map(code => ({
            url: `https://${code.toLowerCase()}.com.au/compare`,
            lastModified: new Date(),
            priority: 0.8,
        }))
    ]
}

// ============================================
// SUMMARY
// ============================================

/*
Hub Site (main-master):
✓ Shows ALL courses and providers
✓ Generic comparison engine
✓ Course directory with links to specific sites
✓ Targets broad VET comparison keywords
✓ Acts as central discovery point

Course Sites (cpp41419-site, etc.):
✓ Shows ONLY course-specific providers
✓ Course-specific metadata and SEO
✓ Filtered comparison data
✓ Targets course-specific keywords
✓ Links back to hub for broader comparison

Both use the same comparison engine package, just configured differently!
*/
