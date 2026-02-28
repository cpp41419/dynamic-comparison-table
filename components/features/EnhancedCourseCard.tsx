"use client"

import { useState } from "react"
import Link from "next/link"
import { TrendingUp, TrendingDown, Minus, Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { FinTechBadge, type FinTechFeature } from "@/components/features/FinTechBadge"
import type { Course } from "@/lib/courses"

interface EnhancedCourseCardProps {
  course: Course
  onAudit?: (courseCode: string) => void
  onCompareSelect?: (courseCode: string, selected: boolean) => void
  isSelected?: boolean
  showCompareCheckbox?: boolean
}

export function EnhancedCourseCard({
  course,
  onAudit,
  onCompareSelect,
  isSelected = false,
  showCompareCheckbox = false,
}: EnhancedCourseCardProps) {
  const [isHovered, setIsHovered] = useState(false)

  // Parse trend direction
  const getTrendIcon = () => {
    const lowerTrend = course.trend.toLowerCase()
    if (lowerTrend.includes("drop") || lowerTrend.includes("volatility")) {
      return <TrendingDown className="h-4 w-4 text-red-500" aria-hidden="true" />
    }
    if (lowerTrend.includes("stable") || lowerTrend.includes("signal")) {
      return <Minus className="h-4 w-4 text-gray-400" aria-hidden="true" />
    }
    return <TrendingUp className="h-4 w-4 text-green-500" aria-hidden="true" />
  }

  // Get volatility badge styling
  const getVolatilityBadge = () => {
    const volatility = course.riskProfile?.toLowerCase() || ""
    if (volatility.includes("critical") || volatility.includes("high")) {
      return "destructive"
    }
    if (volatility.includes("safe") || volatility.includes("harbour")) {
      return "secondary"
    }
    return "default"
  }

  const finTechFeatures: FinTechFeature[] = [
    "crypto-accepted",
    "nft-credential",
  ]

  return (
    <article
      className="relative h-full rounded-lg border border-soft-grey bg-white card-shadow-md card-hover group transition-all duration-200 flex flex-col"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Comparison Checkbox */}
      {showCompareCheckbox && (
        <div className="absolute top-3 right-3 z-10">
          <button
            onClick={() => onCompareSelect?.(course.code, !isSelected)}
            className={`p-2 rounded-lg transition-all ${
              isSelected
                ? "bg-primary text-white"
                : "bg-gray-100 text-gray-600 hover:bg-gray-200"
            }`}
            aria-label={`${isSelected ? "Deselect" : "Select"} ${course.code}`}
          >
            <div
              className={`w-5 h-5 rounded border-2 flex items-center justify-center transition-all ${
                isSelected
                  ? "border-primary bg-primary"
                  : "border-gray-400 bg-white"
              }`}
            >
              {isSelected && (
                <Check className="h-3 w-3 text-white" aria-hidden="true" />
              )}
            </div>
          </button>
        </div>
      )}

      {/* Card Header */}
      <div className="p-4 border-b border-soft-grey">
        <div className="flex items-start justify-between gap-2 mb-2">
          <div className="flex-1">
            <h3 className="text-lg font-bold text-foreground leading-tight">
              {course.code}
            </h3>
            <p className="text-sm text-muted-foreground font-medium mt-1">
              {course.qualification}
            </p>
          </div>
        </div>

        {/* Risk Badge */}
        <Badge variant={getVolatilityBadge()} className="mt-3 text-xs">
          {course.riskProfile}
        </Badge>
      </div>

      {/* Card Body */}
      <div className="p-4 flex-1 space-y-4">
        {/* Market Data */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
              Market Mean
            </span>
            <span className="text-lg font-bold marker-highlight">
              ${course.marketMean.toLocaleString()}
            </span>
          </div>

          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
              Trend
            </span>
            <div className="flex items-center gap-1.5">
              {getTrendIcon()}
              <span className="text-sm font-semibold text-foreground">
                {course.trend}
              </span>
            </div>
          </div>
        </div>

        {/* FinTech Features */}
        {finTechFeatures.length > 0 && (
          <div className="pt-2 border-t border-soft-grey">
            <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-2">
              FinTech Features
            </p>
            <div className="flex flex-wrap gap-1.5">
              {finTechFeatures.map((feature) => (
                <FinTechBadge key={feature} feature={feature} size="sm" />
              ))}
            </div>
          </div>
        )}

        {/* Audit Action */}
        <div className="pt-2 border-t border-soft-grey">
          <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-2">
            Audit
          </p>
          <p className="text-sm font-medium text-foreground">
            {course.auditAction}
          </p>
        </div>
      </div>

      {/* Card Footer - Action Buttons */}
      <div className="p-4 border-t border-soft-grey space-y-2">
        <Button
          onClick={() => onAudit?.(course.code)}
          variant="outline"
          size="sm"
          className="w-full text-xs"
        >
          View Audit
        </Button>

        <Button asChild size="sm" className="w-full text-xs">
          <Link href={`/courses/${course.code}`}>
            Compare Providers
          </Link>
        </Button>
      </div>

      {/* Hover effect indicator */}
      {isHovered && (
        <div className="absolute inset-0 rounded-lg bg-gradient-to-b from-primary/5 to-transparent pointer-events-none" />
      )}
    </article>
  )
}
