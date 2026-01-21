"use client"

import React from "react"
import { cn } from "@/lib/utils"

interface SustainabilityGaugeProps {
    value: number // Value from 0 to 1
    label: string
    subLabel?: string
    color?: "red" | "orange" | "emerald"
    className?: string
}

export function SustainabilityGauge({
    value,
    label,
    subLabel,
    color = "red",
    className
}: SustainabilityGaugeProps) {
    const percentage = Math.round(value * 100)

    // Color mapping
    const colors = {
        red: "from-red-500 to-red-600 bg-red-100 ring-red-500/20",
        orange: "from-orange-500 to-orange-600 bg-orange-100 ring-orange-500/20",
        emerald: "from-emerald-500 to-emerald-600 bg-emerald-100 ring-emerald-500/20"
    }

    const textColors = {
        red: "text-red-700",
        orange: "text-orange-700",
        emerald: "text-emerald-700"
    }

    return (
        <div className={cn("relative p-4 rounded-xl border bg-background/50 shadow-inner group", className)}>
            <div className="flex items-end justify-between mb-2">
                <div className="flex flex-col">
                    <span className="text-[10px] font-black uppercase tracking-tighter text-muted-foreground/80 leading-none">
                        {subLabel || "Sector Profile"}
                    </span>
                    <span className={cn("text-sm font-bold", textColors[color])}>{label}</span>
                </div>
                <div className="flex items-baseline gap-0.5">
                    <span className={cn("text-3xl font-black tracking-tighter", textColors[color])}>
                        {percentage}
                    </span>
                    <span className={cn("text-sm font-black italic", textColors[color])}>%</span>
                </div>
            </div>

            {/* The Gauge Bar */}
            <div className="h-3 w-full bg-muted rounded-full overflow-hidden ring-4 ring-muted/50 border border-muted-foreground/10">
                <div
                    className={cn("h-full rounded-full transition-all duration-1000 ease-out bg-gradient-to-r", colors[color])}
                    style={{ width: `${percentage}%` }}
                />
            </div>

            {/* Decorative Marks */}
            <div className="flex justify-between mt-1 px-1">
                <div className="h-1.5 w-0.5 bg-muted-foreground/20 rounded-full" />
                <div className="h-1.5 w-0.5 bg-muted-foreground/20 rounded-full" />
                <div className="h-1.5 w-0.5 bg-muted-foreground/20 rounded-full" />
                <div className="h-1.5 w-0.5 bg-muted-foreground/20 rounded-full" />
                <div className="h-1.5 w-0.5 bg-muted-foreground/20 rounded-full border-2 border-red-500/50" />
            </div>

            {/* Risk Indicator Tag */}
            {percentage >= 70 && (
                <div className="absolute -top-2 -right-2 rotate-12 scale-90 group-hover:rotate-0 transition-transform">
                    <div className="bg-red-600/90 text-white text-[9px] font-black px-2 py-0.5 rounded shadow-lg border border-red-400/50 uppercase tracking-tighter">
                        Sector Discontinuity
                    </div>
                </div>
            )}
        </div>
    )
}
