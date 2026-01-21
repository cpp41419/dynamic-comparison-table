"use client"

import React from "react"
import {
    Radar,
    RadarChart,
    PolarGrid,
    PolarAngleAxis,
    PolarRadiusAxis,
    ResponsiveContainer,
    Legend,
    Tooltip,
} from "recharts"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Sparkles } from "lucide-react"

import { IntentAgents, type IntentType } from "./IntentAgents"

interface ComparisonVisualsProps {
    compareProviders: any[]
    activeAgent?: IntentType | null
}

export function ComparisonVisuals({ compareProviders, activeAgent }: ComparisonVisualsProps) {
    if (compareProviders.length === 0) return null

    const getAgentAnalysis = () => {
        if (!activeAgent) return "Select an agent above for a specialized AI deep-dive into these providers."

        switch (activeAgent) {
            case "compliance":
                return "The Guardian has verified these providers against ASQA registration markers. We prioritize active status and clean regulatory history to ensure your qualification is secure."
            case "value":
                return "The Optimizer has analyzed the cost-to-quality ratio. These providers offer the most competitive pricing while maintaining high digital baseline standards."
            case "authority":
                return "The Quality Auditor has scanned social proof and review recency. These providers are current market leaders in student satisfaction and institutional trust."
            case "student-first":
                return "Our UX Researcher has benchmarked mobile usability and page speed. These providers offer the friction-less digital learning experience required for modern study."
            default:
                return "Tailoring analysis to your specific intent markers."
        }
    }

    const categories = [
        { name: 'Compliance', key: 'compliance' },
        { name: 'Technical', key: 'technical' },
        { name: 'Content', key: 'content' },
        { name: 'Trust', key: 'trust' },
        { name: 'Authority', key: 'authority' }
    ]

    const data = categories.map(cat => {
        const entry: any = { subject: cat.name }
        compareProviders.forEach(p => {
            // Calculate category score (0-100)
            let score = 0
            if (cat.key === 'compliance') {
                const passCount = [p.data["ASQA Registration"], p.data["Scope Match"]].filter(v => v === "Pass").length
                score = (passCount / 2) * 100
            } else if (cat.key === 'technical') {
                score = (p.data["Page Speed"] + p.data["Mobile Usability"]) / 2
            } else if (cat.key === 'content') {
                score = ((p.data["Course Completeness"] + p.data["Price Transparency"]) / 10) * 100
            } else if (cat.key === 'trust') {
                const reviewsScore = (p.data["Google Reviews"] / 5) * 100
                const recencyScore = (p.data["Review Recency"] / 5) * 100
                score = (reviewsScore + recencyScore) / 2
            } else if (cat.key === 'authority') {
                score = p.score || 0
            }
            entry[p.name] = Math.round(score)
        })
        return entry
    })

    const colors = [
        "hsl(var(--primary))",
        "hsl(var(--secondary))",
        "hsl(var(--chart-1))",
    ]

    return (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 animate-in fade-in slide-in-from-bottom-4 duration-700">
            <Card className="bg-white/50 backdrop-blur-sm border-primary/10 overflow-hidden">
                <CardHeader className="pb-2">
                    <CardTitle className="text-lg font-bold flex items-center gap-2">
                        <Sparkles className="h-5 w-5 text-secondary" />
                        Market Authority Index
                    </CardTitle>
                </CardHeader>
                <CardContent className="h-[350px]">
                    <ResponsiveContainer width="100%" height="100%">
                        <RadarChart cx="50%" cy="50%" outerRadius="80%" data={data}>
                            <PolarGrid stroke="hsl(var(--primary)/0.1)" />
                            <PolarAngleAxis
                                dataKey="subject"
                                tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 12, fontWeight: 600 }}
                            />
                            <PolarRadiusAxis angle={30} domain={[0, 100]} tick={false} axisLine={false} />
                            {compareProviders.map((p, i) => (
                                <Radar
                                    key={p.id}
                                    name={p.name}
                                    dataKey={p.name}
                                    stroke={colors[i % colors.length]}
                                    fill={colors[i % colors.length]}
                                    fillOpacity={0.3}
                                />
                            ))}
                            <Tooltip
                                contentStyle={{
                                    backgroundColor: 'hsl(var(--card))',
                                    borderColor: 'hsl(var(--border))',
                                    borderRadius: '12px',
                                    fontSize: '12px'
                                }}
                            />
                            <Legend />
                        </RadarChart>
                    </ResponsiveContainer>
                </CardContent>
            </Card>

            <Card className="bg-white/50 backdrop-blur-sm border-primary/10 flex flex-col">
                <CardHeader className="pb-2">
                    <CardTitle className="text-lg font-bold">AI Comparison Analysis</CardTitle>
                </CardHeader>
                <CardContent className="flex-1 overflow-y-auto space-y-4 text-sm leading-relaxed">
                    <div className="p-4 rounded-xl bg-primary/5 border border-primary/10">
                        <h4 className="font-bold text-primary mb-2 flex items-center gap-2">
                            <span className="h-2 w-2 rounded-full bg-secondary animate-pulse" />
                            {activeAgent ? 'Agent Strategic Insight' : `Key Advantage: ${compareProviders[0]?.name}`}
                        </h4>
                        <p className="text-muted-foreground text-xs">
                            {getAgentAnalysis()}
                        </p>
                    </div>

                    <div className="space-y-3">
                        <h4 className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Comparative Insights</h4>
                        <ul className="space-y-3">
                            {compareProviders.map((p, i) => (
                                <li key={p.id} className="flex gap-3">
                                    <div className={`w-1 h-12 rounded-full shrink-0 ${i === 0 ? 'bg-secondary' : 'bg-primary/20'}`} />
                                    <div>
                                        <p className="font-bold text-xs">{p.name}</p>
                                        <p className="text-[11px] text-muted-foreground italic">
                                            {p.data["Google Reviews"] >= 4.5
                                                ? "Highly trusted by the community with exceptional feedback recency."
                                                : p.data["Page Speed"] > 85
                                                    ? "Best-in-class mobile and desktop performance markers."
                                                    : "Solid reliable baseline across all regulatory benchmarks."}
                                        </p>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div className="mt-auto pt-4 border-t border-primary/5 italic text-[10px] text-muted-foreground">
                        * Analysis generated based on live MDPA (Market Digital Performance Audit) scores.
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}
