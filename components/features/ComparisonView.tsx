"use client"

import { useMemo } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { FinTechBadgeList, type FinTechFeature } from "@/components/features/FinTechBadge"
import { Check, X } from "lucide-react"
import type { Course } from "@/lib/courses"

interface ComparisonViewProps {
  courses: Course[]
}

interface ComparisonMetric {
  label: string
  key: keyof Course
  type: "numeric" | "text" | "boolean" | "badge"
  isHigherBetter?: boolean
}

const metrics: ComparisonMetric[] = [
  { label: "Market Mean", key: "marketMean", type: "numeric", isHigherBetter: false },
  { label: "Risk Profile", key: "riskProfile", type: "badge" },
  { label: "Audit Action", key: "auditAction", type: "text" },
  { label: "Trend", key: "trend", type: "text" },
]

export function ComparisonView({ courses }: ComparisonViewProps) {
  const hasMultiple = courses.length > 1

  const comparisonData = useMemo(() => {
    return metrics.map((metric) => {
      const values = courses.map((course) => ({
        course: course.code,
        value: course[metric.key],
      }))

      let best = null
      if (metric.type === "numeric" && metric.isHigherBetter === false) {
        // Lower is better (e.g., cost)
        const minValue = Math.min(...values.map((v) => (typeof v.value === "number" ? v.value : 0)))
        best = values.find((v) => v.value === minValue)?.course
      }

      return { ...metric, values, best }
    })
  }, [courses])

  return (
    <div className="space-y-8">
      {/* Header with course codes */}
      <section>
        <h2 className="text-2xl font-bold text-foreground mb-4">Course Comparison</h2>
        <div className="grid gap-4" style={{ gridTemplateColumns: `repeat(${courses.length}, 1fr)` }}>
          {courses.map((course) => (
            <Card key={course.code} className="bg-gradient-to-br from-gray-50 to-white">
              <CardHeader>
                <CardTitle className="text-lg">{course.code}</CardTitle>
                <CardDescription>{course.qualification}</CardDescription>
              </CardHeader>
              <CardContent>
                <Badge variant="secondary">{course.riskProfile}</Badge>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Comparison Table */}
      <section>
        <div className="border border-soft-grey rounded-lg overflow-hidden">
          {comparisonData.map((metric) => (
            <div key={metric.label} className="border-b border-soft-grey last:border-b-0">
              <div className="bg-gray-50 border-b border-soft-grey px-6 py-3">
                <h3 className="text-sm font-semibold text-foreground">{metric.label}</h3>
              </div>
              <div className="grid gap-px p-4" style={{ gridTemplateColumns: `repeat(${courses.length}, 1fr)` }}>
                {metric.values.map((item) => {
                  const isHighlighted = metric.best === item.course && hasMultiple
                  return (
                    <div
                      key={item.course}
                      className={`p-4 rounded-lg transition-colors ${
                        isHighlighted ? "bg-green-50 border border-green-200" : "bg-white"
                      }`}
                    >
                      {metric.type === "numeric" && (
                        <p className="text-lg font-bold text-foreground">
                          ${typeof item.value === "number" ? item.value.toLocaleString() : item.value}
                        </p>
                      )}

                      {metric.type === "text" && (
                        <p className="text-sm text-foreground font-medium">{String(item.value)}</p>
                      )}

                      {metric.type === "badge" && (
                        <Badge variant="default">{String(item.value)}</Badge>
                      )}

                      {metric.type === "boolean" && (
                        <div className="flex items-center">
                          {item.value ? (
                            <Check className="h-5 w-5 text-green-600" />
                          ) : (
                            <X className="h-5 w-5 text-gray-400" />
                          )}
                        </div>
                      )}

                      {isHighlighted && (
                        <p className="text-xs text-green-700 font-semibold mt-2">Best Value</p>
                      )}
                    </div>
                  )
                })}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Feature Comparison */}
      <section>
        <h3 className="text-xl font-bold text-foreground mb-4">FinTech Features</h3>
        <div className="grid gap-4" style={{ gridTemplateColumns: `repeat(${courses.length}, 1fr)` }}>
          {courses.map((course) => {
            const finTechFeatures: FinTechFeature[] = [
              "crypto-accepted",
              "nft-credential",
            ]
            return (
              <Card key={course.code}>
                <CardHeader>
                  <CardTitle className="text-base">{course.code}</CardTitle>
                </CardHeader>
                <CardContent>
                  <FinTechBadgeList features={finTechFeatures} size="sm" />
                </CardContent>
              </Card>
            )
          })}
        </div>
      </section>

      {/* Action Buttons */}
      <section className="flex gap-3">
        <Button asChild className="flex-1">
          <a href="/">Back to Courses</a>
        </Button>
        <Button variant="outline" asChild>
          <a href="/compare">View All Comparisons</a>
        </Button>
      </section>
    </div>
  )
}
