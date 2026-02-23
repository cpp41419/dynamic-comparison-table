"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ChevronDown, Sparkles, TrendingUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface BestCourse {
    code: string;
    title: string;
    provider: string;
    score: number;
    highlight: string;
}

const bestCourses: BestCourse[] = [
    {
        code: "BSB50215",
        title: "Diploma of Business",
        provider: "TechLearn Australia",
        score: 94,
        highlight: "Best Overall Compliance",
    },
    {
        code: "SIT50419",
        title: "Diploma of Travel & Tourism",
        provider: "Expert Training Co",
        score: 91,
        highlight: "Best Technical Implementation",
    },
    {
        code: "ICT60220",
        title: "Advanced Diploma IT",
        provider: "Innovation Institute",
        score: 89,
        highlight: "Best Content Quality",
    },
];

export default function MiniHeroComparison() {
    const [isExpanded, setIsExpanded] = useState(true);

    return (
        <div className="relative mt-20 mb-8">
            <button
                onClick={() => setIsExpanded(!isExpanded)}
                className="w-full md:hidden mb-4 p-3 bg-gradient-to-r from-blue-500/10 to-purple-500/10 border border-blue-300/20 rounded-lg flex items-center justify-between hover:bg-blue-500/15 transition-colors"
            >
                <span className="text-sm font-semibold text-slate-900 dark:text-slate-50">
                    {isExpanded ? "Hide" : "Show"} Best Courses
                </span>
                <ChevronDown
                    className={`h-4 w-4 transition-transform duration-300 ${
                        isExpanded ? "rotate-180" : ""
                    } text-blue-600 dark:text-blue-400`}
                />
            </button>

            {/* Container - Hidden on mobile when collapsed */}
            <div
                className={`transition-all duration-300 ease-out overflow-hidden ${
                    isExpanded ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0 md:max-h-[500px] md:opacity-100"
                }`}
            >
                <div className="bg-gradient-to-br from-blue-50 to-purple-50 dark:from-slate-900/50 dark:to-purple-900/20 rounded-xl border border-blue-200/50 dark:border-slate-700/50 p-6 md:p-8 shadow-lg">
                    {/* Header */}
                    <div className="mb-6 space-y-2">
                        <div className="flex items-center gap-2">
                            <div className="p-2 bg-blue-500/10 rounded-lg">
                                <Sparkles className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                            </div>
                            <h2 className="text-2xl md:text-3xl font-bold text-slate-900 dark:text-slate-50">
                                Best Courses Across All Domains
                            </h2>
                        </div>
                        <p className="text-sm md:text-base text-slate-600 dark:text-slate-400 ml-12">
                            Top-rated comparison tools used for every training domain
                        </p>
                    </div>

                    {/* Courses Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 mb-6">
                        {bestCourses.map((course, idx) => (
                            <div
                                key={course.code}
                                className="group relative bg-white dark:bg-slate-800 rounded-lg p-4 md:p-5 border border-slate-200 dark:border-slate-700 hover:border-blue-300 dark:hover:border-blue-500 transition-all hover:shadow-md hover:shadow-blue-200 dark:hover:shadow-blue-900/20"
                            >
                                {/* Top badge */}
                                <div className="flex items-center justify-between mb-3">
                                    <Badge
                                        variant="secondary"
                                        className="text-xs font-bold bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 border-blue-200 dark:border-blue-700"
                                    >
                                        #{idx + 1} Best
                                    </Badge>
                                    <div className="flex items-center gap-1 px-2 py-1 bg-emerald-100 dark:bg-emerald-900/20 rounded-full">
                                        <TrendingUp className="h-3 w-3 text-emerald-600 dark:text-emerald-400" />
                                        <span className="text-xs font-bold text-emerald-700 dark:text-emerald-300">
                                            {course.score}
                                        </span>
                                    </div>
                                </div>

                                {/* Content */}
                                <div className="space-y-2">
                                    <div>
                                        <span className="text-xs font-mono font-bold text-slate-500 dark:text-slate-400">
                                            {course.code}
                                        </span>
                                        <h3 className="text-sm md:text-base font-bold text-slate-900 dark:text-slate-50 leading-snug mt-1">
                                            {course.title}
                                        </h3>
                                    </div>

                                    <p className="text-xs md:text-sm text-slate-600 dark:text-slate-400">
                                        {course.provider}
                                    </p>

                                    <div className="pt-2 border-t border-slate-200 dark:border-slate-700">
                                        <p className="text-xs text-blue-600 dark:text-blue-400 font-semibold">
                                            {course.highlight}
                                        </p>
                                    </div>
                                </div>

                                {/* Hover effect */}
                                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/0 to-purple-500/0 group-hover:from-blue-500/5 group-hover:to-purple-500/5 rounded-lg transition-all pointer-events-none" />
                            </div>
                        ))}
                    </div>

                    {/* CTA */}
                    <div className="flex flex-col sm:flex-row items-center gap-3 pt-4 border-t border-slate-200 dark:border-slate-700">
                        <p className="text-sm text-slate-600 dark:text-slate-400 flex-1">
                            Compare these top courses and discover the perfect training provider for your domain.
                        </p>
                        <Link href="#courses">
                            <Button className="w-full sm:w-auto bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold shadow-lg hover:shadow-blue-500/50">
                                Compare All
                            </Button>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
