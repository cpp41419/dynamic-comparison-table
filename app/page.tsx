import type { Metadata } from "next"
import CourseSelection from "@/components/course-selection"
import { FAQSection } from "@/components/shared/FAQSection"
import { SEOFooter } from "@/components/shared/SEOFooter"
import { generateBreadcrumbSchema, renderSchemaScript } from "@/lib/structured-data"

export const metadata: Metadata = {
  title: "EdTech FinTech Course Comparison | Find DeFi Programs & NFT Credentials",
  description:
    "Compare vocational courses with DeFi features, NFT credentials, and crypto payment options. Find the best RTO providers and compare placement rates, salaries, and financial incentives.",
  keywords: [
    "course comparison",
    "EdTech platform",
    "FinTech courses",
    "DeFi education",
    "NFT credentials",
    "vocational training",
    "RTO comparison",
    "crypto learning",
    "blockchain education",
  ],
  openGraph: {
    title: "EdTech FinTech Course Comparison Platform",
    description: "Compare DeFi-enabled vocational courses with NFT credentials and financial incentives",
    type: "website",
    url: "https://edtech-fintech-platform.com",
  },
}

export default function Home() {
  const breadcrumbs = [
    { name: "Home", url: "https://edtech-fintech-platform.com" },
    { name: "Courses", url: "https://edtech-fintech-platform.com" },
  ]

  return (
    <>
      {/* Breadcrumb Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: renderSchemaScript(generateBreadcrumbSchema(breadcrumbs)),
        }}
      />

      <main className="min-h-screen bg-white">
        <CourseSelection />
        <FAQSection />
      </main>

      <SEOFooter />
    </>
  )
}
