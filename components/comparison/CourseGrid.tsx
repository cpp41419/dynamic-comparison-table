"use client"

import React from "react"
import CourseCard from "@/components/comparison/CourseCard"
import { Course, ExpertType, filterAndRankCourses, getExpertBadgeText, experts } from "@/lib/expertFilters"
import "@/app/course-page.css"

interface CourseGridProps {
    selectedExpert?: ExpertType;
}

// Enhanced course data with expert metrics
const courses: Course[] = [
    {
        id: "1",
        code: "ADS-101",
        title: "Advanced Data Science",
        provider: "Tech Institute Australia",
        description: "Master ML, AI, and big‑data pipelines.",
        imageUrl: "/images/datasci.jpg",
        href: "/compare/advanced-data-science",
        price: 4500,
        duration: "12 weeks",
        rating: 4.8,
        reviews: 324,
        highlight: "Industry-leading AI curriculum",
        score: 8.9,
        complianceScore: 95,
        costEffectiveness: 82,
        qualityScore: 92,
        uxRating: 88,
        registrationStatus: "active",
        trustScore: 91,
        mobileUXScore: 85,
    },
    {
        id: "2",
        code: "FSW-200",
        title: "Full‑Stack Web Development",
        provider: "Web Academy",
        description: "From React to Node – build production‑ready apps.",
        imageUrl: "/images/webdev.jpg",
        href: "/compare/full-stack",
        price: 3200,
        duration: "10 weeks",
        rating: 4.7,
        reviews: 512,
        highlight: "Modern tech stack focus",
        score: 8.6,
        complianceScore: 88,
        costEffectiveness: 90,
        qualityScore: 87,
        uxRating: 92,
        registrationStatus: "active",
        trustScore: 85,
        mobileUXScore: 94,
    },
    {
        id: "3",
        code: "PMP-150",
        title: "Project Management Professional",
        provider: "Leadership Institute",
        description: "Gain the skills to lead complex projects.",
        imageUrl: "/images/pm.jpg",
        href: "/compare/project-management",
        price: 2800,
        duration: "8 weeks",
        rating: 4.6,
        reviews: 289,
        highlight: "PMI-aligned certification path",
        score: 8.4,
        complianceScore: 98,
        costEffectiveness: 88,
        qualityScore: 89,
        uxRating: 78,
        registrationStatus: "active",
        trustScore: 90,
        mobileUXScore: 72,
    },
    {
        id: "4",
        code: "UXD-300",
        title: "Advanced UX/UI Design",
        provider: "Design Collective",
        description: "Master user-centered design principles and modern tools.",
        imageUrl: "/images/uxdesign.jpg",
        href: "/compare/ux-ui-design",
        price: 3800,
        duration: "10 weeks",
        rating: 4.9,
        reviews: 456,
        highlight: "Portfolio-building projects",
        score: 9.1,
        complianceScore: 85,
        costEffectiveness: 75,
        qualityScore: 96,
        uxRating: 98,
        registrationStatus: "active",
        trustScore: 94,
        mobileUXScore: 96,
    },
]

export default function CourseGrid({ selectedExpert }: CourseGridProps) {
    const sortedCourses = filterAndRankCourses(courses, selectedExpert)
    const expert = experts.find((e) => e.id === selectedExpert)

    return (
        <section id="courses" className="course-grid">
            {/* Expert Filter Indicator */}
            {selectedExpert && expert && (
                <div className="col-span-full mb-8 p-4 bg-gradient-to-r from-secondary/10 to-accent/10 border border-secondary/20 rounded-lg">
                    <div className="flex items-center gap-3">
                        <span className="text-2xl">{expert.icon}</span>
                        <div>
                            <p className="text-sm font-semibold text-foreground">
                                Sorted by {expert.title}
                            </p>
                            <p className="text-xs text-muted-foreground">
                                {expert.description}
                            </p>
                        </div>
                    </div>
                </div>
            )}

            {sortedCourses.map((c, idx) => (
                <CourseCard 
                    key={c.id} 
                    {...c}
                    rank={idx + 1}
                    expertBadge={selectedExpert ? getExpertBadgeText(selectedExpert, c) : undefined}
                    expertIcon={expert?.icon}
                />
            ))}
        </section>
    )
}
