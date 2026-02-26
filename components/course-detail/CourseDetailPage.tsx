"use client"

import { ReactNode } from "react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { TrendingUp, TrendingDown, Minus, ExternalLink } from "lucide-react"
import Link from "next/link"
import { FinTechBadgeList, type FinTechFeature } from "@/components/features/FinTechBadge"
import type { Course } from "@/lib/courses"

interface CourseDetailPageProps {
  course: Course
  providers?: Array<{
    name: string
    website: string
    rating: number
    reviews: number
  }>
  children?: ReactNode
}

export function CourseDetailPage({
  course,
  providers = [],
  children,
}: CourseDetailPageProps) {
  const getTrendIcon = () => {
    const lowerTrend = course.trend.toLowerCase()
    if (lowerTrend.includes("drop") || lowerTrend.includes("volatility")) {
      return <TrendingDown className="h-5 w-5 text-red-500" aria-hidden="true" />
    }
    if (lowerTrend.includes("stable") || lowerTrend.includes("signal")) {
      return <Minus className="h-5 w-5 text-gray-400" aria-hidden="true" />
    }
    return <TrendingUp className="h-5 w-5 text-green-500" aria-hidden="true" />
  }

  const finTechFeatures: FinTechFeature[] = [
    "crypto-accepted",
    "nft-credential",
  ]

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="border-b border-soft-grey sticky top-0 bg-white/80 backdrop-blur-md z-30">
        <div className="max-w-5xl mx-auto px-4 md:px-8 py-8">
          <nav className="mb-4">
            <Link href="/" className="text-sm text-muted-foreground hover:text-foreground">
              ← Back to Courses
            </Link>
          </nav>

          <div className="flex items-start justify-between gap-4">
            <div className="flex-1">
              <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-2 text-balance">
                {course.code}
              </h1>
              <p className="text-lg text-muted-foreground font-medium">
                {course.qualification}
              </p>
            </div>
            <Badge variant="secondary" className="mt-2">
              {course.riskProfile}
            </Badge>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-5xl mx-auto px-4 md:px-8 py-12">
        {/* Quick Stats */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="bg-gray-50 rounded-lg p-6 border border-soft-grey">
            <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-2">
              Market Mean
            </p>
            <p className="text-3xl font-bold text-foreground marker-highlight">
              ${course.marketMean.toLocaleString()}
            </p>
          </div>

          <div className="bg-gray-50 rounded-lg p-6 border border-soft-grey">
            <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-2">
              Trend
            </p>
            <div className="flex items-center gap-2">
              {getTrendIcon()}
              <span className="text-2xl font-bold text-foreground">{course.trend}</span>
            </div>
          </div>

          <div className="bg-gray-50 rounded-lg p-6 border border-soft-grey">
            <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-2">
              Audit Action
            </p>
            <p className="text-lg font-semibold text-foreground">{course.auditAction}</p>
          </div>
        </section>

        {/* FinTech Features */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-foreground mb-4">FinTech Features</h2>
          <div className="bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-200 rounded-lg p-6">
            <FinTechBadgeList features={finTechFeatures} size="md" className="gap-3" />
            <p className="text-sm text-blue-900 mt-4 leading-relaxed">
              This course supports cryptocurrency payments, offers NFT-based credentials upon completion, and provides
              integration with DeFi protocols for funding and rewards.
            </p>
          </div>
        </section>

        {/* Provider Listings */}
        {providers.length > 0 && (
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-foreground mb-6">Training Providers</h2>
            <div className="grid gap-4">
              {providers.map((provider) => (
                <div
                  key={provider.name}
                  className="flex items-center justify-between p-6 border border-soft-grey rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-foreground mb-1">
                      {provider.name}
                    </h3>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <span className="font-medium">★ {provider.rating}/5</span>
                      <span className="text-gray-300">•</span>
                      <span>{provider.reviews} reviews</span>
                    </div>
                  </div>
                  <Button
                    asChild
                    variant="default"
                    className="gap-2"
                  >
                    <a href={provider.website} target="_blank" rel="noopener noreferrer">
                      Visit Provider
                      <ExternalLink className="h-4 w-4" />
                    </a>
                  </Button>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Children Content */}
        {children && <section className="mb-12">{children}</section>}

        {/* CTA Section */}
        <section className="bg-gradient-to-r from-primary to-teal-600 rounded-lg p-12 text-white text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Compare?</h2>
          <p className="text-lg mb-6 opacity-90">
            Compare this course with other vocational programs to find the best fit for your career.
          </p>
          <div className="flex gap-3 justify-center flex-wrap">
            <Button asChild variant="secondary" size="lg">
              <Link href={`/?compare=${course.code}`}>Add to Comparison</Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="border-white text-white hover:bg-white/20">
              <Link href="/">Browse All Courses</Link>
            </Button>
          </div>
        </section>
      </main>
    </div>
  )
}

/**
 * Generate course detail metadata
 */
export function getCourseDetailMetadata(course: Course) {
  return {
    title: `${course.code} - ${course.qualification} | Course Comparison`,
    description: `Explore ${course.code} (${course.qualification}). Market price: $${course.marketMean.toLocaleString()}. Compare RTOs, placement rates, and DeFi-enabled learning options.`,
    keywords: [
      course.code,
      course.qualification,
      "vocational training",
      "course comparison",
      "RTO",
      "placement outcomes",
    ],
    canonical: `https://edtech-fintech-platform.com/courses/${course.code}`,
    openGraph: {
      title: `${course.code} - ${course.qualification}`,
      description: `Compare RTOs offering ${course.code}. Learn about market pricing, placement rates, and DeFi features.`,
      url: `https://edtech-fintech-platform.com/courses/${course.code}`,
    },
  }
}
