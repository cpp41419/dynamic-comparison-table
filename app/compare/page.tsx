"use client"

import React, { useState } from "react"
import PriceIndexTicker from "@/components/comparison/PriceIndexTicker"
import HeroSection from "@/components/comparison/HeroSection"
import MiniHeroComparison from "@/components/comparison/MiniHeroComparison"
import ExpertScenarios from "@/components/comparison/ExpertScenarios"
import CourseGrid from "@/components/comparison/CourseGrid"
import Footer from "@/components/comparison/Footer"
import { ExpertType } from "@/lib/expertFilters"
import "@/app/course-page.css"


export default function ComparePage() {
    const [selectedExpert, setSelectedExpert] = useState<ExpertType>(null)

    return (
        <>
            <PriceIndexTicker />
            <div className="pt-14">
                <HeroSection />
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <MiniHeroComparison />
                    <ExpertScenarios 
                        onSelectExpert={setSelectedExpert}
                        selectedExpert={selectedExpert}
                    />
                </div>
                <CourseGrid selectedExpert={selectedExpert} />
                <Footer />
            </div>
        </>
    )
}
