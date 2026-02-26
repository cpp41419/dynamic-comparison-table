"use client"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Search, Filter, X } from "lucide-react"
import Link from "next/link"
import { courses, type Course } from "@/lib/courses"
import { EnhancedCourseCard } from "@/components/features/EnhancedCourseCard"
import { AuditPanel } from "@/components/features/AuditPanel"

export type { Course }

export default function CourseSelection() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCourses, setSelectedCourses] = useState<Set<string>>(new Set())
  const [compareMode, setCompareMode] = useState(false)
  const [selectedCourseForAudit, setSelectedCourseForAudit] = useState<Course | null>(null)
  const [isAuditOpen, setIsAuditOpen] = useState(false)
  const scrollRef = useRef<HTMLDivElement>(null)
  const [isScrolling, setIsScrolling] = useState(false)

  // Auto-scroll course pills
  useEffect(() => {
    const scrollContainer = scrollRef.current
    if (!scrollContainer || isScrolling) return

    let animationId: number
    let scrollPosition = 0
    const scrollSpeed = 0.5

    const animate = () => {
      if (scrollContainer && !isScrolling) {
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
  }, [isScrolling])

  const filteredCourses = courses.filter(
    (course) =>
      course.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
      course.qualification.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const handleCompareSelect = (courseCode: string, selected: boolean) => {
    const newSelected = new Set(selectedCourses)
    if (selected) {
      newSelected.add(courseCode)
    } else {
      newSelected.delete(courseCode)
    }
    setSelectedCourses(newSelected)
  }

  const handleAudit = (courseCode: string) => {
    const course = courses.find((c) => c.code === courseCode)
    if (course) {
      setSelectedCourseForAudit(course)
      setIsAuditOpen(true)
    }
  }

  const handleCompare = () => {
    if (selectedCourses.size >= 2) {
      const params = new URLSearchParams()
      selectedCourses.forEach((code) => params.append("compare", code))
      window.location.href = `/compare?${params.toString()}`
    }
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="border-b border-soft-grey sticky top-0 bg-white/80 backdrop-blur-md z-30">
        <div className="max-w-7xl mx-auto px-4 md:px-8 py-6">
          <div className="mb-6">
            <h1 className="text-4xl md:text-5xl font-bold text-foreground text-balance">
              Compare Vocational Courses
            </h1>
            <p className="text-lg text-muted-foreground mt-2">
              Explore DeFi-enabled programs with NFT credentials and crypto-friendly providers
            </p>
          </div>

          {/* Search Bar */}
          <div className="relative">
            <Search className="absolute left-4 top-3.5 h-5 w-5 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Search by course code or qualification..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-12 h-12 text-base border-soft-grey focus:ring-2 focus:ring-primary"
              aria-label="Search courses"
            />
          </div>
        </div>

        {/* Quick Course Pills */}
        <div
          className="border-t border-soft-grey overflow-hidden relative"
          onMouseEnter={() => setIsScrolling(true)}
          onMouseLeave={() => setIsScrolling(false)}
        >
          <div className="absolute left-0 top-0 bottom-0 w-8 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-8 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none" />

          <div
            ref={scrollRef}
            className="flex gap-2 px-4 md:px-8 py-3 overflow-x-auto scrollbar-hide"
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
                <Link href={`#${course.code}`}>{course.code}</Link>
              </Button>
            ))}
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-12">
        {/* Results Info & Actions */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <p className="text-sm text-muted-foreground">
              Showing <span className="font-semibold">{filteredCourses.length}</span> of{" "}
              <span className="font-semibold">{courses.length}</span> courses
            </p>
          </div>

          {/* Compare Button */}
          {selectedCourses.size > 0 && (
            <div className="flex items-center gap-2 bg-blue-50 border border-blue-200 rounded-lg px-4 py-3">
              <span className="text-sm font-medium text-blue-900">
                {selectedCourses.size} selected
              </span>
              {selectedCourses.size >= 2 && (
                <Button
                  onClick={handleCompare}
                  size="sm"
                  className="bg-blue-600 hover:bg-blue-700"
                >
                  Compare
                </Button>
              )}
              <button
                onClick={() => setSelectedCourses(new Set())}
                className="p-1 hover:bg-blue-100 rounded"
                aria-label="Clear selection"
              >
                <X className="h-4 w-4 text-blue-600" />
              </button>
            </div>
          )}
        </div>

        {/* Course Grid */}
        {filteredCourses.length > 0 ? (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {filteredCourses.map((course) => (
              <EnhancedCourseCard
                key={course.code}
                course={course}
                onAudit={handleAudit}
                onCompareSelect={handleCompareSelect}
                isSelected={selectedCourses.has(course.code)}
                showCompareCheckbox={true}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <p className="text-lg text-muted-foreground mb-4">
              No courses found matching &quot;{searchTerm}&quot;
            </p>
            <Button
              variant="outline"
              onClick={() => setSearchTerm("")}
            >
              Clear Search
            </Button>
          </div>
        )}
      </div>

      {/* Audit Panel */}
      <AuditPanel
        course={selectedCourseForAudit}
        isOpen={isAuditOpen}
        onClose={() => {
          setIsAuditOpen(false)
          setSelectedCourseForAudit(null)
        }}
      />
    </div>
  )
}
