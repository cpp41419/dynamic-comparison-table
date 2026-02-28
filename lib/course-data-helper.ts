/**
 * Course Data Helper Functions
 * Utilities for managing, filtering, and transforming course data
 */

import type { Course } from "@/lib/courses"

/**
 * Filter courses by search term
 */
export function searchCourses(courses: Course[], term: string): Course[] {
  const lowerTerm = term.toLowerCase()
  return courses.filter(
    (course) =>
      course.code.toLowerCase().includes(lowerTerm) ||
      course.qualification.toLowerCase().includes(lowerTerm) ||
      course.title?.toLowerCase().includes(lowerTerm)
  )
}

/**
 * Filter courses by price range
 */
export function filterByPriceRange(
  courses: Course[],
  minPrice: number,
  maxPrice: number
): Course[] {
  return courses.filter((course) => course.marketMean >= minPrice && course.marketMean <= maxPrice)
}

/**
 * Filter courses by risk profile
 */
export function filterByRiskProfile(
  courses: Course[],
  profiles: Course["riskProfile"][]
): Course[] {
  return courses.filter((course) => profiles.includes(course.riskProfile))
}

/**
 * Sort courses by price (ascending/descending)
 */
export function sortByPrice(courses: Course[], ascending = true): Course[] {
  return [...courses].sort((a, b) =>
    ascending ? a.marketMean - b.marketMean : b.marketMean - a.marketMean
  )
}

/**
 * Sort courses by trend
 */
export function sortByTrend(courses: Course[]): Course[] {
  const trendOrder = {
    "Strong Growth": 3,
    "Steady Growth": 2,
    "Stable": 1,
    "Volatility Alert": -1,
    "Price Drop": -2,
  }

  return [...courses].sort((a, b) => {
    const aScore = trendOrder[a.trend as keyof typeof trendOrder] ?? 0
    const bScore = trendOrder[b.trend as keyof typeof trendOrder] ?? 0
    return bScore - aScore
  })
}

/**
 * Get price statistics for a set of courses
 */
export function getPriceStats(courses: Course[]) {
  if (courses.length === 0) return null

  const prices = courses.map((c) => c.marketMean)
  const sorted = [...prices].sort((a, b) => a - b)
  const sum = prices.reduce((a, b) => a + b, 0)

  return {
    min: Math.min(...prices),
    max: Math.max(...prices),
    avg: Math.round(sum / prices.length),
    median: sorted.length % 2 === 0 ? (sorted[sorted.length / 2 - 1] + sorted[sorted.length / 2]) / 2 : sorted[Math.floor(sorted.length / 2)],
    count: courses.length,
  }
}

/**
 * Get unique qualifications
 */
export function getUniqueQualifications(courses: Course[]): string[] {
  return [...new Set(courses.map((c) => c.qualification))].sort()
}

/**
 * Get unique risk profiles
 */
export function getUniqueRiskProfiles(courses: Course[]): Course["riskProfile"][] {
  return [...new Set(courses.map((c) => c.riskProfile))] as Course["riskProfile"][]
}

/**
 * Format market mean as currency
 */
export function formatPrice(price: number): string {
  return new Intl.NumberFormat("en-AU", {
    style: "currency",
    currency: "AUD",
    minimumFractionDigits: 0,
  }).format(price)
}

/**
 * Get trend color class
 */
export function getTrendColorClass(trend: string): string {
  const lowerTrend = trend.toLowerCase()
  if (lowerTrend.includes("drop") || lowerTrend.includes("alert")) {
    return "text-red-600"
  }
  if (lowerTrend.includes("stable")) {
    return "text-gray-600"
  }
  if (lowerTrend.includes("growth")) {
    return "text-green-600"
  }
  return "text-gray-600"
}

/**
 * Get risk profile color
 */
export function getRiskProfileColor(
  profile: Course["riskProfile"]
): "default" | "secondary" | "destructive" {
  switch (profile) {
    case "CRITICAL":
    case "HIGH RISK":
      return "destructive"
    case "SAFE HARBOUR":
      return "secondary"
    default:
      return "default"
  }
}

/**
 * Generate comparison data for multiple courses
 */
export function generateComparisonData(courses: Course[]) {
  return {
    count: courses.length,
    courses: courses.map((c) => ({
      code: c.code,
      title: c.title,
      qualification: c.qualification,
      marketMean: c.marketMean,
      trend: c.trend,
      riskProfile: c.riskProfile,
    })),
    priceStats: getPriceStats(courses),
    allProfiles: getUniqueRiskProfiles(courses),
  }
}

/**
 * Check if course is a good deal (below average price)
 */
export function isGoodDeal(course: Course, allCourses: Course[]): boolean {
  const stats = getPriceStats(allCourses)
  return stats ? course.marketMean < stats.avg : false
}

/**
 * Get similar courses (same qualification type)
 */
export function getSimilarCourses(course: Course, allCourses: Course[], limit = 3): Course[] {
  return allCourses
    .filter((c) => c.qualification === course.qualification && c.code !== course.code)
    .slice(0, limit)
}

/**
 * Export course data as JSON
 */
export function exportCoursesAsJSON(courses: Course[]): string {
  return JSON.stringify(courses, null, 2)
}

/**
 * Export course data as CSV
 */
export function exportCoursesAsCSV(courses: Course[]): string {
  if (courses.length === 0) return ""

  const headers = ["Code", "Title", "Qualification", "Market Mean", "Trend", "Risk Profile", "Audit Action"]
  const rows = courses.map((c) => [
    c.code,
    c.title || "",
    c.qualification,
    c.marketMean,
    c.trend,
    c.riskProfile,
    c.auditAction,
  ])

  const csvContent = [
    headers.join(","),
    ...rows.map((row) => row.map((cell) => `"${cell}"`).join(",")),
  ].join("\n")

  return csvContent
}

/**
 * Create a downloadable file
 */
export function downloadFile(filename: string, content: string, mimeType = "text/plain"): void {
  const element = document.createElement("a")
  element.setAttribute("href", `data:${mimeType};charset=utf-8,${encodeURIComponent(content)}`)
  element.setAttribute("download", filename)
  element.style.display = "none"
  document.body.appendChild(element)
  element.click()
  document.body.removeChild(element)
}

/**
 * Validate course data
 */
export function validateCourseData(course: Partial<Course>): { valid: boolean; errors: string[] } {
  const errors: string[] = []

  if (!course.code) errors.push("Course code is required")
  if (!course.qualification) errors.push("Qualification is required")
  if (typeof course.marketMean !== "number") errors.push("Market mean must be a number")
  if (!course.trend) errors.push("Trend is required")
  if (!course.riskProfile) errors.push("Risk profile is required")
  if (!course.auditAction) errors.push("Audit action is required")

  return {
    valid: errors.length === 0,
    errors,
  }
}
