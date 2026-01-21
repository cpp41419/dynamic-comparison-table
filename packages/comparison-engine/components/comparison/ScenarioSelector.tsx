"use client"

import React from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { MapPin, Zap, Shield, Target, Award } from "lucide-react"
import { cn } from "@/lib/utils"
import { type IntentType } from "./IntentAgents"

export interface Scenario {
    id: string
    title: string
    description: string
    state: string
    intent: IntentType
}

const SCENARIOS: Scenario[] = [
    {
        id: "quality-nsw",
        title: "Authority First",
        description: "Focus on NSW top-tier providers with institutional authority.",
        state: "NSW",
        intent: "authority"
    },
    {
        id: "budget-vic",
        title: "Budget Optimiser",
        description: "Fastest path to Victoria qualifications at the best price.",
        state: "VIC",
        intent: "value"
    },
    {
        id: "compliance-qld",
        title: "Safety First",
        description: "QLD providers with strictly audited compliance markers.",
        state: "QLD",
        intent: "compliance"
    }
]

interface ScenarioSelectorProps {
    onSelectScenario: (scenario: Scenario) => void
    currentScenario: string | null
}

export function ScenarioSelector({ onSelectScenario, currentScenario }: ScenarioSelectorProps) {
    return (
        <div className="space-y-4">
            <div className="flex flex-col space-y-1">
                <h4 className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Expert Scenarios</h4>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {SCENARIOS.map((scenario) => (
                    <Button
                        key={scenario.id}
                        variant="outline"
                        onClick={() => onSelectScenario(scenario)}
                        className={cn(
                            "h-auto py-3 px-4 flex flex-col items-start gap-1.5 transition-all border-dashed hover:border-solid w-full whitespace-normal",
                            currentScenario === scenario.id
                                ? "border-secondary bg-secondary/5 ring-1 ring-secondary/20"
                                : "border-primary/20 hover:border-primary/40"
                        )}
                    >
                        <div className="flex items-center gap-2 w-full">
                            <Badge variant="secondary" className="px-1.5 py-0 text-[10px] bg-primary/10 text-primary font-bold shrink-0">
                                {scenario.state}
                            </Badge>
                            <span className="font-bold text-xs text-primary truncate">{scenario.title}</span>
                        </div>
                        <p className="text-[10px] text-muted-foreground text-left leading-snug line-clamp-2">
                            {scenario.description}
                        </p>
                    </Button>
                ))}
            </div>
        </div>
    )
}
