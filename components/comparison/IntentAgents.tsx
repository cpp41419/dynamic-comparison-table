"use client"

import React from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Shield, Zap, Sparkles, Target, Award } from "lucide-react"
import { cn } from "@/lib/utils"

export type IntentType = "compliance" | "value" | "authority" | "student-first"

export interface Agent {
    id: IntentType
    name: string
    role: string
    description: string
    advice: string
    icon: React.ReactNode
    color: string
    accent: string
}

const AGENTS: Agent[] = [
    {
        id: "compliance",
        name: "Guardian",
        role: "Compliance Specialist",
        description: "Focuses on regulatory alignment, status, and registration validity.",
        advice: "I've selected providers with active ASQA status and high regulatory scores to ensure your qualification is fully recognized.",
        icon: <Shield className="w-5 h-5" />,
        color: "bg-blue-500",
        accent: "text-blue-600",
    },
    {
        id: "value",
        name: "Optimizer",
        role: "Budget Strategist",
        description: "Prioritizes cost-efficiency without compromising registration status.",
        advice: "I've found the most competitive pricing in your state while maintaining a baseline of digital maturity and compliance.",
        icon: <Target className="w-5 h-5" />,
        color: "bg-emerald-500",
        accent: "text-emerald-600",
    },
    {
        id: "authority",
        name: "Authority",
        role: "Quality Auditor",
        description: "Highlights providers with the highest trust scores and reviews.",
        advice: "These providers lead the market in social proof, review recency, and overall trust signals. Recommended for institutional prestige.",
        icon: <Award className="w-5 h-5" />,
        color: "bg-amber-500",
        accent: "text-amber-600",
    },
    {
        id: "student-first",
        name: "Sonic",
        role: "UX Researcher",
        description: "Focuses on digital experience, speed, and mobile usability.",
        advice: "For the best mobile experience and modern learning interfaces, these providers have the highest UX and Performance scores.",
        icon: <Zap className="w-5 h-5" />,
        color: "bg-purple-500",
        accent: "text-purple-600",
    },
]

interface IntentAgentsProps {
    onSelectAgent: (intent: IntentType) => void
    activeAgent: IntentType | null
}

export function IntentAgents({ onSelectAgent, activeAgent }: IntentAgentsProps) {
    const activeAgentData = AGENTS.find(a => a.id === activeAgent)

    return (
        <div className="space-y-6">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
                <div className="space-y-2">
                    <h3 className="text-lg font-bold text-primary flex items-center gap-2">
                        <Sparkles className="w-5 h-5 text-secondary" />
                        Select Your Assistant
                    </h3>
                    <p className="text-sm text-muted-foreground">
                        Choose an agent to automatically select the best RTOs based on your specific requirements.
                    </p>
                </div>

                {activeAgentData && (
                    <div className="animate-in fade-in slide-in-from-right-4 duration-300">
                        <div className={cn(
                            "px-4 py-2 rounded-lg border flex items-center gap-3 bg-white shadow-sm",
                            activeAgentData.accent.replace("text-", "border-").replace("600", "200")
                        )}>
                            <div className={cn("w-2 h-2 rounded-full animate-pulse", activeAgentData.color)} />
                            <p className="text-xs font-medium">
                                <span className="font-bold">{activeAgentData.name}:</span> {activeAgentData.advice}
                            </p>
                        </div>
                    </div>
                )}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {AGENTS.map((agent) => (
                    <Card
                        key={agent.id}
                        className={cn(
                            "relative overflow-hidden cursor-pointer transition-all duration-300 group hover:shadow-lg border-2",
                            activeAgent === agent.id
                                ? "border-primary bg-primary/5 ring-1 ring-primary/20 scale-[1.02]"
                                : "border-transparent hover:border-primary/20 bg-white/50 shadow-sm"
                        )}
                        onClick={() => onSelectAgent(agent.id)}
                    >
                        <CardContent className="p-5 space-y-4">
                            <div className="flex items-start justify-between">
                                <div className={cn(
                                    "p-2.5 rounded-xl transition-transform duration-300 group-hover:scale-110",
                                    agent.color,
                                    "text-white shadow-md shadow-black/10"
                                )}>
                                    {agent.icon}
                                </div>
                                {activeAgent === agent.id && (
                                    <div className="bg-primary text-primary-foreground text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-tighter animate-pulse">
                                        Assisting
                                    </div>
                                )}
                            </div>

                            <div className="space-y-1">
                                <h4 className="font-bold text-lg text-primary">{agent.name}</h4>
                                <p className={cn("text-[10px] font-bold uppercase tracking-widest", agent.accent)}>
                                    {agent.role}
                                </p>
                            </div>

                            <p className="text-xs text-muted-foreground leading-relaxed min-h-[3rem]">
                                {agent.description}
                            </p>

                            <Button
                                variant={activeAgent === agent.id ? "default" : "outline"}
                                className={cn(
                                    "w-full h-auto min-h-8 py-2 px-3 text-[11px] font-bold uppercase tracking-wider transition-all whitespace-normal",
                                    activeAgent === agent.id ? "bg-primary" : "hover:bg-primary/5 border-primary/20 text-primary"
                                )}
                                size="sm"
                            >
                                {activeAgent === agent.id ? "Analyzing Insights" : "Consult Agent"}
                            </Button>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>
    )
}
