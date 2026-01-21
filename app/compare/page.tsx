"use client"

import React from "react"
import HeroSection from "@/components/comparison/HeroSection"
import CourseGrid from "@/components/comparison/CourseGrid"
import Footer from "@/components/comparison/Footer"
import "@/app/course-page.css"


export default function ComparePage() {
    return (
        <>
            <HeroSection />
            <CourseGrid />
            <Footer />
        </>
    )
}
