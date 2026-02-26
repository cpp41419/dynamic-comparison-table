/**
 * SEO Structured Data (JSON-LD) Generators
 * Implements schema.org types for course comparison platform
 */

export interface CourseSchemaData {
  code: string
  title: string
  description: string
  url: string
  qualification: string
  marketMean: number
  placement_rate?: number
  provider?: string
}

export interface BreadcrumbItem {
  name: string
  url: string
}

/**
 * Generate Course schema (educational course)
 * https://schema.org/Course
 */
export function generateCourseSchema(course: CourseSchemaData) {
  return {
    "@context": "https://schema.org",
    "@type": "Course",
    name: course.title,
    description: course.description,
    url: course.url,
    educationalLevel: "Vocational",
    courseCode: course.code,
    offers: {
      "@type": "Offer",
      priceCurrency: "AUD",
      price: course.marketMean.toString(),
      availability: "https://schema.org/InStock",
      url: course.url,
    },
    aggregateRating:
      course.placement_rate !== undefined
        ? {
            "@type": "AggregateRating",
            ratingValue: (course.placement_rate * 5).toFixed(1),
            bestRating: "5",
            worstRating: "1",
            ratingCount: "100",
          }
        : undefined,
    provider:
      course.provider !== undefined
        ? {
            "@type": "Organization",
            name: course.provider,
            url: "https://edtech-fintech-platform.com",
          }
        : undefined,
  }
}

/**
 * Generate BreadcrumbList schema for navigation
 * https://schema.org/BreadcrumbList
 */
export function generateBreadcrumbSchema(breadcrumbs: BreadcrumbItem[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: breadcrumbs.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  }
}

/**
 * Generate LocalBusiness schema for course provider
 * https://schema.org/LocalBusiness
 */
export function generateLocalBusinessSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: "EdTech FinTech Course Comparison Platform",
    description:
      "Compare DeFi-enabled courses, NFT credentials, and financial incentives for vocational training",
    url: "https://edtech-fintech-platform.com",
    telephone: "+61-1-800-EDTECH",
    address: {
      "@type": "PostalAddress",
      streetAddress: "123 Tech Avenue",
      addressLocality: "Sydney",
      addressRegion: "NSW",
      postalCode: "2000",
      addressCountry: "AU",
    },
    openingHoursSpecification: {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      opens: "09:00",
      closes: "17:00",
    },
    sameAs: [
      "https://www.linkedin.com/company/edtech-fintech-platform",
      "https://twitter.com/edtech-fintech",
    ],
  }
}

/**
 * Generate Organization schema (minimal)
 * https://schema.org/Organization
 */
export function generateOrganizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "EdTech FinTech Course Comparison",
    url: "https://edtech-fintech-platform.com",
    logo: "https://edtech-fintech-platform.com/logo.svg",
    description:
      "Compare vocational courses with DeFi features, NFT credentials, and crypto payment options",
    sameAs: [
      "https://www.linkedin.com/company/edtech-fintech-platform",
      "https://twitter.com/edtech-fintech",
    ],
    contact: {
      "@type": "ContactPoint",
      contactType: "Customer Support",
      telephone: "+61-1-800-EDTECH",
      email: "support@edtech-fintech-platform.com",
    },
  }
}

/**
 * Generate FAQPage schema
 * https://schema.org/FAQPage
 */
export function generateFAQSchema(faqs: Array<{ question: string; answer: string }>) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  }
}

/**
 * Generate SearchAction schema (enables sitelinks search box)
 * https://schema.org/SearchAction
 */
export function generateSearchActionSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    url: "https://edtech-fintech-platform.com",
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: "https://edtech-fintech-platform.com?search={search_term_string}",
      },
      "query-input": "required name=search_term_string",
    },
  }
}

/**
 * Serialize schema to JSON-LD script tag
 */
export function renderSchemaScript(schema: any): string {
  return JSON.stringify(schema)
}
