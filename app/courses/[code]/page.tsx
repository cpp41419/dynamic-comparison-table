"use client"

import { notFound } from "next/navigation"
import ComparisonTable from "@/components/ComparisonTable"
import { courses } from "@/lib/courses"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"

import { use } from "react"

interface PageProps {
    params: Promise<{
        code: string
    }>
}

export default function CoursePage({ params }: PageProps) {
    const { code } = use(params)
    const course = courses.find((c) => c.code === code)

    if (!course) {
        notFound()
    }

    return (
        <main className="min-h-screen bg-background">
            <div className="p-4 border-b bg-card">
                <div className="max-w-7xl mx-auto flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <Button variant="outline" asChild size="sm">
                            <Link href="/">
                                <ArrowLeft className="h-4 w-4 mr-2" />
                                Change Course
                            </Link>
                        </Button>
                        <div>
                            <h2 className="font-semibold text-lg">{course.qualification}</h2>
                            <p className="text-sm text-muted-foreground">
                                {course.code} • {course.marketMean}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
            <ComparisonTable selectedCourse={course} />
        </main>
    )
}
