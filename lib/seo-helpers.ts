/**
 * SEO Helper Functions for optimal search engine visibility
 */

export interface PageMetadata {
  title: string
  description: string
  keywords: string[]
  canonicalUrl: string
  ogImage?: string
  ogType?: "website" | "article" | "product"
  twitterHandle?: string
  author?: string
  publishedDate?: string
  modifiedDate?: string
}

/**
 * Generate metadata for course comparison pages
 */
export function generateCoursePageMetadata(
  courseCode: string,
  qualification: string,
): PageMetadata {
  return {
    title: `${courseCode} | ${qualification} - Compare Providers & FinTech Options`,
    description: `Compare RTOs offering ${courseCode} (${qualification}). View market pricing, placement rates, DeFi features, and NFT credentials. Find the best training provider.`,
    keywords: [
      courseCode,
      qualification,
      "RTO comparison",
      "course pricing",
      "placement rates",
      "vocational training",
      "DeFi education",
    ],
    canonicalUrl: `https://edtech-fintech-platform.com/courses/${courseCode}`,
    ogType: "website",
  }
}

/**
 * Generate metadata for comparison pages
 */
export function generateComparisonMetadata(
  courseCodes: string[],
): PageMetadata {
  return {
    title: `Compare ${courseCodes.join(", ")} | Course Comparison`,
    description: `Side-by-side comparison of ${courseCodes.join(", ")}. Compare market pricing, placement outcomes, FinTech features, and RTO providers.`,
    keywords: [
      "course comparison",
      ...courseCodes,
      "RTO comparison",
      "vocational education",
      "DeFi courses",
    ],
    canonicalUrl: `https://edtech-fintech-platform.com/compare?courses=${courseCodes.join(",")}`,
    ogType: "website",
  }
}

/**
 * Generate metadata for RTO directory pages
 */
export function generateRTOMetadata(
  rtoName?: string,
): PageMetadata {
  if (rtoName) {
    return {
      title: `${rtoName} | RTO Provider Directory`,
      description: `Find courses, ratings, and reviews for ${rtoName}. Compare DeFi-enabled programs, placement rates, and student outcomes.`,
      keywords: [
        "RTO",
        rtoName,
        "training provider",
        "vocational education",
        "course reviews",
      ],
      canonicalUrl: `https://edtech-fintech-platform.com/rto/${rtoName.toLowerCase().replace(/\s+/g, "-")}`,
      ogType: "website",
    }
  }

  return {
    title: "RTO Provider Directory | Find Accredited Training Providers",
    description: "Browse and compare registered training organizations (RTOs) offering vocational courses with DeFi features, NFT credentials, and crypto payment options.",
    keywords: [
      "RTO directory",
      "training providers",
      "vocational education",
      "accredited providers",
      "DeFi education",
    ],
    canonicalUrl: "https://edtech-fintech-platform.com/rto",
    ogType: "website",
  }
}

/**
 * Generate breadcrumb text for SEO
 */
export function generateBreadcrumbText(path: string[]): string {
  return path.join(" > ")
}

/**
 * Create SEO-friendly URL slugs
 */
export function slugify(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "") // Remove special characters
    .replace(/[\s_-]+/g, "-") // Replace spaces with hyphens
    .replace(/^-+|-+$/g, "") // Remove leading/trailing hyphens
}

/**
 * Validate and sanitize user search queries
 */
export function sanitizeSearchQuery(query: string): string {
  return query
    .trim()
    .replace(/[<>]/g, "") // Remove potential XSS vectors
    .substring(0, 100) // Limit length
}

/**
 * Generate structured data for local SEO
 */
export function generateLocalSEOData(location: string, phone: string) {
  return {
    type: "LocalBusiness",
    location,
    phone,
    address: `Education Hub, ${location}`,
    openingHours: "Monday-Friday: 9:00 AM - 5:00 PM",
  }
}

/**
 * Get internal links for SEO
 */
export function getInternalLinks() {
  return [
    { text: "Course Comparison", href: "/" },
    { text: "Advanced Compare", href: "/compare" },
    { text: "RTO Directory", href: "/rto" },
    { text: "DeFi Features", href: "/#defi-features" },
    { text: "NFT Credentials", href: "/#nft-credentials" },
  ]
}

/**
 * Generate rel tags for link attributes
 */
export function getLinkRelAttributes(
  external: boolean = false,
  nofollow: boolean = false,
): string {
  const attrs: string[] = []
  if (external) {
    attrs.push("noopener", "noreferrer")
  }
  if (nofollow) {
    attrs.push("nofollow")
  }
  return attrs.join(" ")
}

/**
 * Generate canonical tag content
 */
export function getCanonicalUrl(path: string): string {
  const baseUrl = "https://edtech-fintech-platform.com"
  return `${baseUrl}${path}`
}
