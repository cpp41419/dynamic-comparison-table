"use client"

import React from "react"
import CourseCard from "@/components/comparison/CourseCard"
import "@/app/course-page.css"

// Dummy data – replace with real API or JSON later
const courses = [
    {
        title: "Advanced Data Science",
        description: "Master ML, AI, and big‑data pipelines.",
        imageUrl: "/images/datasci.jpg",
        href: "/compare/advanced-data-science",
    },
    {
        title: "Full‑Stack Web Development",
        description: "From React to Node – build production‑ready apps.",
        imageUrl: "/images/webdev.jpg",
        href: "/compare/full-stack",
    },
    {
        title: "Project Management Professional",
        description: "Gain the skills to lead complex projects.",
        imageUrl: "/images/pm.jpg",
        href: "/compare/project-management",
    },
]

export default function CourseGrid() {
    return (
        <section id="courses" className="course-grid">
            {courses.map((c) => (
                <CourseCard key={c.title} {...c} />
            ))}
        </section>
    )
}
