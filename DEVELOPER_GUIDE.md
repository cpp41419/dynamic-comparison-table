# Developer Guide - EdTech FinTech Course Comparison Platform

## Quick Start

### Project Structure
```
/app
  /layout.tsx                 # Root layout with global metadata & schemas
  /page.tsx                   # Home page with course selection
  /sitemap.ts                 # Dynamic sitemap generation
  /globals.css                # Design tokens and utilities
  /courses
    /[code]/page.tsx         # Course detail page (template)
  /compare/page.tsx           # Comparison page
  /rto/page.tsx               # RTO directory page

/components
  /course-selection.tsx       # Main course listing component
  /features
    /FinTechBadge.tsx        # Badge component (3 variants)
    /EnhancedCourseCard.tsx   # Course card with audit action
    /AuditPanel.tsx           # Slide-in audit detail panel
    /ComparisonView.tsx       # Side-by-side comparison view
  /course-detail/
    /CourseDetailPage.tsx    # Course detail template
  /shared/
    /FAQSection.tsx          # FAQ with schema integration
    /SEOFooter.tsx           # Semantic footer

/lib
  /structured-data.ts        # JSON-LD schema generators
  /seo-helpers.ts            # SEO utility functions
  /course-data-helper.ts     # Course data management utilities
  /courses.ts                # Course data (from existing)
  /course-config.ts          # Course configuration (from existing)

/public
  /robots.txt                # Crawler directives

/styles
  (Handled via Tailwind CSS + globals.css)
```

## Key Components

### 1. EnhancedCourseCard
Display individual courses with all FinTech features.

```tsx
import { EnhancedCourseCard } from "@/components/features/EnhancedCourseCard"

<EnhancedCourseCard
  course={courseData}
  onAudit={(code) => setAuditCourse(code)}
  onCompareSelect={(code, selected) => updateSelection(code, selected)}
  isSelected={isSelected}
  showCompareCheckbox={true}
/>
```

### 2. FinTechBadge
Display individual or multiple FinTech feature badges.

```tsx
import { FinTechBadge, FinTechBadgeList } from "@/components/features/FinTechBadge"

// Single badge
<FinTechBadge feature="crypto-accepted" size="md" />

// Multiple badges
<FinTechBadgeList 
  features={["crypto-accepted", "nft-credential"]} 
  size="sm" 
/>
```

### 3. AuditPanel
Slide-in panel with audit details.

```tsx
import { AuditPanel } from "@/components/features/AuditPanel"

<AuditPanel
  course={selectedCourse}
  isOpen={isOpen}
  onClose={handleClose}
/>
```

### 4. ComparisonView
Side-by-side course comparison.

```tsx
import { ComparisonView } from "@/components/features/ComparisonView"

<ComparisonView courses={selectedCourses} />
```

### 5. FAQSection
FAQ with schema integration.

```tsx
import { FAQSection } from "@/components/shared/FAQSection"

<FAQSection />
```

## Color Palette

### CSS Variables
All colors defined in `app/globals.css`:

```css
--background: 0 0% 100%;        /* Pure white */
--foreground: 210 8% 15%;       /* Dark navy */
--primary: 172 48% 45%;         /* Muted teal */
--secondary: 14 86% 61%;        /* Soft coral */
--accent: 263 68% 78%;          /* Light lavender */
--muted: 210 5% 88%;            /* Soft grey */
```

### Using Colors
```tsx
// In JSX
<div className="bg-primary text-primary-foreground">
  Muted teal background with white text
</div>

<div className="border-soft-grey">
  Light grey border
</div>
```

## SEO Implementation

### Adding Schema to Pages

```tsx
import { generateCourseSchema, renderSchemaScript } from "@/lib/structured-data"

export default function CourseDetail() {
  const schema = generateCourseSchema({
    code: "BSB50820",
    title: "Diploma of Project Management",
    description: "...",
    url: "https://...",
    qualification: "...",
    marketMean: 4200
  })

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: renderSchemaScript(schema)
        }}
      />
      {/* Page content */}
    </>
  )
}
```

### Metadata Generation

```tsx
import { generateCoursePageMetadata } from "@/lib/seo-helpers"

export const metadata: Metadata = {
  ...generateCoursePageMetadata("BSB50820", "Diploma of Project Management")
}
```

## Course Data Management

### Filtering Courses

```tsx
import { 
  searchCourses, 
  filterByPriceRange,
  filterByRiskProfile,
  sortByPrice,
  getPriceStats
} from "@/lib/course-data-helper"

const filtered = searchCourses(courses, "BSB")
const byPrice = filterByPriceRange(filtered, 3000, 5000)
const sorted = sortByPrice(byPrice)
const stats = getPriceStats(sorted)
```

### Exporting Data

```tsx
import { 
  exportCoursesAsJSON,
  exportCoursesAsCSV,
  downloadFile
} from "@/lib/course-data-helper"

// Export as JSON
const json = exportCoursesAsJSON(courses)
downloadFile("courses.json", json, "application/json")

// Export as CSV
const csv = exportCoursesAsCSV(courses)
downloadFile("courses.csv", csv, "text/csv")
```

## Styling & Design System

### Design Tokens Usage

```tsx
// Text colors
<p className="text-foreground">Main text</p>
<p className="text-muted-foreground">Muted text</p>

// Backgrounds
<div className="bg-background">White background</div>
<div className="bg-soft-grey">Soft grey background</div>

// Cards
<div className="bg-white rounded-lg card-shadow-md card-hover">
  Card with hover effect
</div>

// FinTech badges
<div className="badge-crypto">Crypto Accepted</div>
<div className="badge-nft">NFT Credential</div>
<div className="badge-defi">DeFi Rewards</div>
```

### Responsive Classes

```tsx
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
  {/* 1 column mobile, 2 tablet, 3 desktop */}
</div>

<h1 className="text-2xl md:text-3xl lg:text-4xl">
  Responsive heading
</h1>
```

## Authentication & User Data (Future)

When implementing user accounts:

```tsx
// Protected course comparison
const [isLoggedIn, setIsLoggedIn] = useState(false)
const [userComparisons, setUserComparisons] = useState([])

// Save comparison
if (isLoggedIn) {
  saveComparison(selectedCourses, userId)
}
```

## Performance Optimization

### Image Loading

```tsx
// Lazy load images
<img src="/course.jpg" alt="Course" loading="lazy" />

// With responsive sizing
<img
  src="/course.jpg"
  alt="Course"
  srcSet="/course-sm.jpg 500w, /course-lg.jpg 1000w"
  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
  loading="lazy"
/>
```

### Component Memoization

```tsx
import { memo } from "react"

export const CourseCard = memo(function CourseCard({ course }) {
  return (
    // Component content
  )
})
```

## Testing Checklist

Before committing changes:

- [ ] Component renders without errors
- [ ] Schema validates (schema.org/validator)
- [ ] Mobile responsive (tested on 320px+)
- [ ] Keyboard navigation works
- [ ] Screen reader accessible
- [ ] All links functional
- [ ] Images load correctly
- [ ] No console errors/warnings

## Common Tasks

### Add New FinTech Feature

1. Add to `FinTechFeature` type in `components/features/FinTechBadge.tsx`
2. Add icon and colors to `config` object
3. Update course data with feature

```tsx
// Update type
type FinTechFeature = 
  | "crypto-accepted"
  | "nft-credential"
  | "new-feature"  // Add here

// Add config
const config = {
  ...
  "new-feature": {
    label: "New Feature",
    icon: NewIcon,
    color: "bg-green-50 text-green-700 border-green-200"
  }
}
```

### Create New Page

1. Create route file: `app/[route]/page.tsx`
2. Add metadata
3. Add breadcrumb schema
4. Include FAQSection and SEOFooter

```tsx
import { Metadata } from "next"
import { generateBreadcrumbSchema, renderSchemaScript } from "@/lib/structured-data"

export const metadata: Metadata = {
  title: "Page Title | Course Comparison",
  description: "Page description..."
}

export default function Page() {
  return (
    <>
      <script type="application/ld+json" ... />
      <main>Content</main>
    </>
  )
}
```

### Update Course Data

1. Modify `/lib/courses.ts` (existing file)
2. Run validation:

```tsx
import { validateCourseData } from "@/lib/course-data-helper"

const { valid, errors } = validateCourseData(newCourse)
if (!valid) console.error(errors)
```

## Debugging

### Enable Debug Logging

```tsx
// In components
console.log("[v0] Component mounted:", props)

// In utilities
console.log("[v0] Filtering courses:", {
  input: courses.length,
  output: filtered.length
})
```

### Check Schema Validity

1. Go to https://schema.org/validator
2. Paste page URL or HTML
3. Check for errors/warnings
4. Fix issues in structured-data.ts

### Mobile Testing

```bash
# Use Next.js dev server
npm run dev

# Open in Chrome DevTools
# Device > iPhone 12/13 Pro
# Check responsive design
```

## Deployment

### Pre-deployment Checklist

- [ ] All files committed to git
- [ ] No console errors in production build
- [ ] Sitemap generates correctly
- [ ] Robots.txt accessible
- [ ] All images optimized
- [ ] Metadata complete on all pages
- [ ] Schema validation passes
- [ ] Lighthouse score > 90
- [ ] Mobile-friendly test passes

### Deploy Steps

1. Push to main branch
2. Vercel auto-deploys
3. Visit deployment URL
4. Run Lighthouse audit
5. Submit sitemap to Google Search Console

## Resources

### Documentation
- [Next.js Docs](https://nextjs.org/docs)
- [Tailwind CSS](https://tailwindcss.com)
- [Schema.org Types](https://schema.org)
- [Web.dev Best Practices](https://web.dev)

### Tools
- [Google Search Console](https://search.google.com/search-console)
- [Bing Webmaster Tools](https://www.bing.com/webmasters)
- [Lighthouse](https://developers.google.com/web/tools/lighthouse)
- [Schema Validator](https://schema.org/validator)

### Related Files
- `SEO_IMPLEMENTATION.md` - Comprehensive SEO guide
- `IMPLEMENTATION_SUMMARY.md` - Implementation overview
- `tailwind.config.ts` - Tailwind configuration
- `package.json` - Dependencies

## Support & Contributions

For issues or improvements:
1. Check existing documentation
2. Review component examples
3. Test changes locally
4. Submit PR with description

---

**Last Updated**: February 26, 2026  
**Version**: 1.0  
**Maintained By**: EdTech FinTech Platform Team
