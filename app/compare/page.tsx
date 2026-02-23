"use client"

import React from "react"
import PriceIndexTicker from "@/components/comparison/PriceIndexTicker"
import HeroSection from "@/components/comparison/HeroSection"
import MiniHeroComparison from "@/components/comparison/MiniHeroComparison"
import CourseGrid from "@/components/comparison/CourseGrid"
import Footer from "@/components/comparison/Footer"
import "@/app/course-page.css"


export default function ComparePage() {
    return (
        <>
            <PriceIndexTicker />
            <div className="pt-14">
                <HeroSection />
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <MiniHeroComparison />
                </div>
                <CourseGrid />
                <Footer />
            </div>
        </>
    )
}
