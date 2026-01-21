"use client"

import { useState, useRef, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Search, TrendingUp, TrendingDown, Minus, AlertTriangle, CheckCircle, AlertCircle } from "lucide-react"
import Link from "next/link"
import { courses, type Course } from "@/lib/courses"

export type { Course }

export default function CourseSelection() {
  const [searchTerm, setSearchTerm] = useState("")
  const scrollRef = useRef<HTMLDivElement>(null)
  const [isHovered, setIsHovered] = useState(false)

  useEffect(() => {
    const scrollContainer = scrollRef.current
    if (!scrollContainer || isHovered) return

    let animationId: number
    let scrollPosition = 0
    const scrollSpeed = 0.5

    const animate = () => {
      if (scrollContainer && !isHovered) {
        scrollPosition += scrollSpeed
        if (scrollPosition >= scrollContainer.scrollWidth - scrollContainer.clientWidth) {
          scrollPosition = 0
        }
        scrollContainer.scrollLeft = scrollPosition
      }
      animationId = requestAnimationFrame(animate)
    }

    animationId = requestAnimationFrame(animate)

    return () => cancelAnimationFrame(animationId)
  }, [isHovered])

  const filteredCourses = courses.filter(
    (course) =>
      course.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
      course.qualification.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const getRiskBadgeVariant = (risk: Course["riskProfile"]) => {
    switch (risk) {
      case "HIGH RISK":
        return "destructive"
      case "CRITICAL":
        return "destructive"
      case "MODERATE":
        return "default"
      case "SAFE HARBOUR":
        return "secondary"
      default:
        return "default"
    }
  }

  const getRiskIcon = (risk: Course["riskProfile"]) => {
    switch (risk) {
      case "HIGH RISK":
      case "CRITICAL":
        return <AlertTriangle className="h-3 w-3" />
      case "MODERATE":
        return <AlertCircle className="h-3 w-3" />
      case "SAFE HARBOUR":
        return <CheckCircle className="h-3 w-3" />
      default:
        return null
    }
  }

  const getTrendIcon = (trend: string) => {
    const lowerTrend = trend.toLowerCase()
    if (lowerTrend.includes("drop") || lowerTrend.includes("volatility")) {
      return <TrendingDown className="h-3 w-3 text-red-500" />
    }
    if (lowerTrend.includes("stable") || lowerTrend.includes("signal")) {
      return <Minus className="h-3 w-3 text-gray-500" />
    }
    return <TrendingUp className="h-3 w-3 text-green-500" />
  }

  return (
    <div className="min-h-screen bg-background p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">Select Your Course</h1>
          <p className="text-muted-foreground text-lg">
            Choose a course to compare RTOs and find the best training provider
          </p>
        </div>

        <div
          className="mb-6 overflow-hidden relative"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <div className="absolute left-0 top-0 bottom-0 w-8 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-8 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none" />

          <div
            ref={scrollRef}
            className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide"
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
          >
            {[...courses, ...courses].map((course, index) => (
              <Button
                key={`${course.code}-${index}`}
                variant="outline"
                size="sm"
                asChild
                className="whitespace-nowrap font-mono font-semibold hover:bg-primary hover:text-primary-foreground flex-shrink-0"
              >
                <Link href={`/courses/${course.code}`}>
                  {course.code}
                </Link>
              </Button>
            ))}
          </div>
        </div>

        <div className="mb-6">
          <div className="relative">
            <Search className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Search by course code or qualification..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 h-12 text-lg"
            />
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {filteredCourses.map((course) => (
            <Card key={course.code} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-start justify-between gap-2 mb-2">
                  <CardTitle className="text-xl">{course.code}</CardTitle>
                  <Badge variant={getRiskBadgeVariant(course.riskProfile)} className="flex items-center gap-1">
                    {getRiskIcon(course.riskProfile)}
                    {course.riskProfile}
                  </Badge>
                </div>
                <CardDescription className="text-base font-medium text-foreground">
                  {course.qualification}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Market Mean</span>
                    <span className="font-bold text-lg marker-highlight">{course.marketMean}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Trend</span>
                    <div className="flex items-center gap-1">
                      {getTrendIcon(course.trend)}
                      <span className="font-medium">{course.trend}</span>
                    </div>
                  </div>
                  <div className="pt-2 border-t">
                    <p className="text-sm text-muted-foreground mb-2">Audit Action</p>
                    <p className="text-sm font-medium">{course.auditAction}</p>
                  </div>
                  <Button asChild className="w-full mt-2" size="lg">
                    <Link href={`/courses/${course.code}`}>
                      Compare RTOs
                    </Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredCourses.length === 0 && (
          <div className="text-center py-12">
            <p className="text-muted-foreground text-lg">No courses found matching your search.</p>
          </div>
        )}
      </div>
    </div>
  )
}
