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
        <div className="relative mt-20 mb-12">
            {/* Mobile Toggle Button */}
            <button
                onClick={() => setIsExpanded(!isExpanded)}
                className="w-full md:hidden mb-4 p-3 bg-gradient-to-r from-secondary/15 to-accent/15 border border-secondary/30 rounded-lg flex items-center justify-between hover:from-secondary/25 hover:to-accent/25 transition-all duration-200 group"
            >
                <span className="text-sm font-semibold text-foreground">
                    {isExpanded ? "Hide" : "Show"} Top Courses
                </span>
                <ChevronDown
                    className={`h-4 w-4 transition-transform duration-300 text-secondary group-hover:text-accent ${
                        isExpanded ? "rotate-180" : ""
                    }`}
                />
            </button>

            {/* Expandable Container */}
            <div
                className={`transition-all duration-300 ease-out overflow-hidden ${
                    isExpanded ? "max-h-[600px] opacity-100" : "max-h-0 opacity-0 md:max-h-[600px] md:opacity-100"
                }`}
            >
                <div className="relative bg-gradient-to-br from-card via-card to-card/80 dark:from-primary/5 dark:via-primary/8 dark:to-primary/5 rounded-xl border border-border/50 p-6 md:p-8 shadow-xl overflow-hidden">
                    {/* Decorative background element */}
                    <div className="absolute -top-40 -right-40 w-80 h-80 bg-secondary/10 rounded-full blur-3xl pointer-events-none" />
                    <div className="absolute -bottom-20 -left-40 w-60 h-60 bg-accent/10 rounded-full blur-3xl pointer-events-none" />

                    <div className="relative z-10">
                        {/* Header Section */}
                        <div className="mb-8 space-y-3">
                            <div className="flex items-start gap-3">
                                <div className="p-2.5 bg-secondary/20 rounded-lg flex-shrink-0">
                                    <Sparkles className="h-5 w-5 text-secondary" />
                                </div>
                                <div>
                                    <h2 className="text-2xl md:text-3xl font-bold text-foreground">
                                        Top Rated Courses
                                    </h2>
                                    <p className="text-sm md:text-base text-muted-foreground mt-1">
                                        Excellence across all training domains, verified by industry experts
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Courses Grid */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-5 mb-8">
                            {bestCourses.map((course, idx) => (
                                <div
                                    key={course.code}
                                    className="group relative bg-card hover:bg-card/80 rounded-lg p-5 border border-border hover:border-secondary/60 transition-all duration-300 hover:shadow-lg hover:shadow-secondary/10"
                                >
                                    {/* Rank Badge */}
                                    <div className="flex items-center justify-between mb-3">
                                        <Badge
                                            className="text-xs font-bold bg-secondary/20 text-secondary border-0 px-2.5 py-1"
                                        >
                                            #{idx + 1}
                                        </Badge>
                                        <div className="flex items-center gap-1.5 px-2.5 py-1 bg-emerald-500/20 rounded-full border border-emerald-500/30">
                                            <TrendingUp className="h-3.5 w-3.5 text-emerald-500" />
                                            <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400">
                                                {course.score}
                                            </span>
                                        </div>
                                    </div>

                                    {/* Course Info */}
                                    <div className="space-y-3">
                                        <div>
                                            <span className="text-xs font-mono font-semibold text-muted-foreground/70">
                                                {course.code}
                                            </span>
                                            <h3 className="text-sm md:text-base font-bold text-foreground leading-snug mt-1.5">
                                                {course.title}
                                            </h3>
                                        </div>

                                        <p className="text-xs md:text-sm text-muted-foreground">
                                            {course.provider}
                                        </p>

                                        <div className="pt-3 border-t border-border">
                                            <p className="text-xs font-semibold text-secondary">
                                                ✓ {course.highlight}
                                            </p>
                                        </div>
                                    </div>

                                    {/* Hover gradient overlay */}
                                    <div className="absolute inset-0 bg-gradient-to-br from-secondary/0 to-accent/0 group-hover:from-secondary/5 group-hover:to-accent/5 rounded-lg transition-all pointer-events-none" />
                                </div>
                            ))}
                        </div>

                        {/* CTA Section */}
                        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-6 border-t border-border/50">
                            <p className="text-sm text-muted-foreground flex-1">
                                Explore detailed comparisons and select the ideal training provider for your organization.
                            </p>
                            <Link href="#courses">
                                <Button className="w-full sm:w-auto bg-gradient-to-r from-secondary to-accent hover:from-secondary/90 hover:to-accent/90 text-secondary-foreground font-semibold shadow-md hover:shadow-lg transition-all">
                                    Compare All Courses
                                </Button>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
