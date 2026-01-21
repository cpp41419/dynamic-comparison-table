"use client"

import React from "react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Trophy, ExternalLink, GraduationCap, Sparkles } from "lucide-react"
import { cn } from "@/lib/utils"

interface ProviderTableProps {
    compareProviders: any[]
    categories: Record<string, string[]>
    getWinner: (providers: any[], metric: string) => string | null
    formatMetricValue: (metric: string, value: any) => string
    onEnquiry: (provider: any) => void
    winnerProvider: any
    highlightCategory?: string
    stickyOffset?: number
}

export function ProviderTable({
    compareProviders,
    categories,
    getWinner,
    formatMetricValue,
    onEnquiry,
    winnerProvider,
    highlightCategory,
    stickyOffset = 0,
}: ProviderTableProps) {
    return (
        <TooltipProvider>
            {/* Desktop Table */}
            <div className="hidden md:block overflow-x-auto rounded-xl border border-border bg-card shadow-sm">
                <table className="w-full border-collapse">
                    <thead
                        className="sticky z-20 bg-card/95 backdrop-blur-md shadow-sm"
                        style={{ top: stickyOffset }}
                    >
                        <tr className="border-b">
                            <th className="p-6 text-left font-bold text-primary text-lg w-1/4 bg-card/50">Feature Analysis</th>
                            {compareProviders.map((provider: any) => (
                                <th key={provider.id} className="p-6 text-center font-semibold min-w-[220px] border-l">
                                    <div className="space-y-3">
                                        <div className="text-lg font-bold text-primary line-clamp-1">{provider.name}</div>
                                        <div className="flex flex-wrap justify-center gap-2">
                                            {/* Dynamic Badge based on top performance */}
                                            {provider.data["Page Speed"] > 90 && (
                                                <Badge className="bg-green-500/10 text-green-600 border-green-500/20 text-[10px] h-5">Fastest</Badge>
                                            )}
                                            {provider.data["Google Reviews"] >= 4.8 && (
                                                <Badge className="bg-yellow-500/10 text-yellow-600 border-yellow-500/20 text-[10px] h-5">Top Rated</Badge>
                                            )}
                                            <Badge variant="secondary" className="bg-secondary text-secondary-foreground">
                                                MDPA: {provider.overallScore}
                                            </Badge>
                                            {provider.price && (
                                                <Badge variant="outline" className="border-secondary text-secondary-foreground font-bold">
                                                    ${provider.price}
                                                </Badge>
                                            )}
                                        </div>
                                        <div className="grid grid-cols-1 gap-2 pt-2">
                                            <div className="flex gap-2">
                                                {provider.website && (
                                                    <Button
                                                        variant="outline"
                                                        size="sm"
                                                        className="flex-1 h-9 text-xs border-primary/20 hover:bg-primary/5"
                                                        onClick={() => window.open(provider.website, "_blank")}
                                                    >
                                                        <ExternalLink className="h-3 w-3 mr-1" />
                                                        Site
                                                    </Button>
                                                )}
                                                {provider.website_secondary && (
                                                    <Button
                                                        variant="outline"
                                                        size="sm"
                                                        className="flex-1 h-9 text-xs border-primary/20 hover:bg-primary/5"
                                                        onClick={() => window.open(provider.website_secondary, "_blank")}
                                                    >
                                                        <GraduationCap className="h-3 w-3 mr-1" />
                                                        Course
                                                    </Button>
                                                )}
                                            </div>
                                            <Button
                                                variant="default"
                                                size="sm"
                                                className="w-full h-10 bg-secondary hover:bg-secondary/90 text-secondary-foreground font-bold"
                                                onClick={() => onEnquiry(provider)}
                                            >
                                                Enquire Now
                                            </Button>
                                        </div>
                                    </div>
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody className="divide-y">
                        {Object.entries(categories).map(([category, metrics]) => {
                            const isHighlighted = category === highlightCategory
                            return (
                                <React.Fragment key={category}>
                                    <tr className={isHighlighted ? "bg-secondary/10" : "bg-primary/5"}>
                                        <td colSpan={compareProviders.length + 1} className={`px-6 py-3 font-bold uppercase tracking-wider text-xs flex items-center gap-2 ${isHighlighted ? "text-primary" : "text-primary/60"}`}>
                                            {isHighlighted && <Sparkles className="h-3 w-3 text-secondary animate-pulse" />}
                                            {category}
                                            {isHighlighted && <Badge variant="outline" className="ml-2 border-secondary/30 text-[9px] h-4">Agent Priority</Badge>}
                                        </td>
                                    </tr>
                                    {(metrics as string[]).map((metric) => {
                                        const winner = getWinner(compareProviders, metric)
                                        return (
                                            <tr key={metric} className={`transition-colors ${isHighlighted ? "bg-secondary/5 hover:bg-secondary/10" : "hover:bg-muted/30"}`}>
                                                <td className={`px-6 py-4 font-medium ${isHighlighted ? "text-primary font-bold" : "text-muted-foreground"}`}>{metric}</td>
                                                {compareProviders.map((provider: any) => {
                                                    const isWinner = winner === provider.id
                                                    return (
                                                        <td
                                                            key={provider.id}
                                                            className={`px-6 py-4 text-center border-l ${isWinner ? "bg-secondary/10" : ""
                                                                }`}
                                                        >
                                                            {isWinner ? (
                                                                <Tooltip>
                                                                    <TooltipTrigger asChild>
                                                                        <div className="flex items-center justify-center gap-2 cursor-help font-bold text-primary">
                                                                            <Trophy className="h-4 w-4 text-secondary" />
                                                                            {formatMetricValue(metric, provider.data[metric])}
                                                                        </div>
                                                                    </TooltipTrigger>
                                                                    <TooltipContent className="bg-primary text-primary-foreground border-none">
                                                                        <p>Market Leader in {metric}</p>
                                                                    </TooltipContent>
                                                                </Tooltip>
                                                            ) : (
                                                                <div className={`flex items-center justify-center gap-2 ${isHighlighted ? "text-primary/80 font-medium" : "text-muted-foreground"}`}>
                                                                    {formatMetricValue(metric, provider.data[metric])}
                                                                </div>
                                                            )}
                                                        </td>
                                                    )
                                                })}
                                            </tr>
                                        )
                                    })}
                                </React.Fragment>
                            )
                        })}
                    </tbody>
                </table>
            </div>

            {/* Mobile View - Winner Focused + Sideways Scroll Matrix */}
            <div className="md:hidden space-y-6 animate-in slide-in-from-bottom-4 duration-500">
                {winnerProvider ? (
                    <div className="space-y-8">
                        {/* Featured Winner Card */}
                        <div className="p-6 bg-gradient-to-br from-primary to-primary/90 border border-secondary/30 rounded-3xl shadow-xl relative overflow-hidden">
                            <div className="absolute top-0 right-0 p-4 opacity-10">
                                <Trophy className="h-24 w-24 text-secondary scale-125" />
                            </div>
                            <div className="relative z-10 space-y-4">
                                <Badge className="bg-secondary text-secondary-foreground hover:bg-secondary font-bold px-4 py-1 text-[10px] tracking-widest">
                                    TOP RECOMMENDATION
                                </Badge>
                                <div>
                                    <h3 className="text-2xl font-black text-white leading-tight uppercase tracking-tight">
                                        {winnerProvider.name}
                                    </h3>
                                    <p className="text-white/60 text-[10px] font-mono mt-1">
                                        RTO CODE: {winnerProvider.rto_code || "PRIVATE"}
                                    </p>
                                </div>
                                <div className="flex gap-6 items-end">
                                    <div className="space-y-1 text-center">
                                        <p className="text-[10px] text-white/50 uppercase font-black tracking-tighter">Authority</p>
                                        <div className="text-3xl font-black text-secondary leading-none">
                                            {winnerProvider.overallScore}
                                        </div>
                                    </div>
                                    {winnerProvider.price && (
                                        <div className="space-y-1">
                                            <p className="text-[10px] text-white/50 uppercase font-black tracking-tighter">Course Fee</p>
                                            <div className="text-xl font-bold text-white leading-none">
                                                ${winnerProvider.price}
                                            </div>
                                        </div>
                                    )}
                                </div>
                                <div className="grid grid-cols-2 gap-3 pt-4 border-t border-white/10">
                                    <Button
                                        variant="default"
                                        className="w-full bg-secondary hover:bg-secondary/90 text-secondary-foreground font-black uppercase text-[10px] h-10 rounded-xl shadow-lg"
                                        onClick={() => onEnquiry(winnerProvider)}
                                    >
                                        Enquire Now
                                    </Button>
                                    <Button
                                        variant="outline"
                                        className="w-full bg-white/5 border-white/20 text-white hover:bg-white/10 font-bold uppercase text-[10px] h-10 rounded-xl"
                                        onClick={() => winnerProvider.website && window.open(winnerProvider.website, "_blank")}
                                    >
                                        Website
                                    </Button>
                                </div>
                            </div>
                        </div>

                        {/* Sideways Scrolling Comparison Matrix */}
                        <div className="space-y-4">
                            <div className="flex items-center justify-between px-2">
                                <h4 className="text-[10px] font-black text-primary uppercase tracking-widest">Side-by-Side Comparison</h4>
                                <span className="text-[10px] text-muted-foreground animate-pulse">Swipe left →</span>
                            </div>

                            <div className="overflow-x-auto pb-4 -mx-1 px-1 scrollbar-hide">
                                <div className="inline-flex min-w-full gap-4">
                                    {/* Feature Column */}
                                    <div className="flex-none w-32 space-y-3">
                                        <div className="h-12 flex items-end pb-2">
                                            <span className="text-[10px] font-bold text-muted-foreground uppercase">Metrics</span>
                                        </div>
                                        {Object.entries(categories).map(([category, metrics]) => {
                                            const isHighlight = category === highlightCategory
                                            return (
                                                <React.Fragment key={category}>
                                                    <div className={cn(
                                                        "h-8 flex items-center rounded-lg px-2 transition-colors",
                                                        isHighlight ? "bg-secondary/20 ring-1 ring-secondary/30" : "bg-primary/5"
                                                    )}>
                                                        <span className={cn(
                                                            "text-[9px] font-black uppercase flex items-center gap-1",
                                                            isHighlight ? "text-primary" : "text-primary/60"
                                                        )}>
                                                            {isHighlight && <Sparkles className="h-2 w-2 text-secondary h-min" />}
                                                            {category}
                                                        </span>
                                                    </div>
                                                    {(metrics as string[]).map(metric => (
                                                        <div key={metric} className={cn(
                                                            "h-10 flex items-center px-1 border-b border-primary/5 transition-colors",
                                                            isHighlight ? "bg-secondary/5" : ""
                                                        )}>
                                                            <span className={cn(
                                                                "text-[10px] leading-tight",
                                                                isHighlight ? "font-bold text-primary" : "font-medium text-muted-foreground"
                                                            )}>{metric}</span>
                                                        </div>
                                                    ))}
                                                </React.Fragment>
                                            )
                                        })}
                                    </div>

                                    {/* Provider Columns */}
                                    {compareProviders.map((provider: any) => {
                                        const isOverallWinner = provider.id === winnerProvider.id
                                        return (
                                            <div key={provider.id} className={`flex-none w-48 rounded-2xl border transition-all ${isOverallWinner ? "border-secondary bg-secondary/5 ring-1 ring-secondary" : "border-primary/10 bg-white"
                                                }`}>
                                                <div className="p-3 space-y-3">
                                                    <div className="h-12 flex flex-col justify-center">
                                                        <span className="text-xs font-black text-primary line-clamp-1 uppercase">{provider.name}</span>
                                                        <div className="flex items-center gap-1 mt-1">
                                                            <div className="h-1 w-full bg-primary/10 rounded-full overflow-hidden">
                                                                <div
                                                                    className={`h-full ${isOverallWinner ? "bg-secondary" : "bg-primary"}`}
                                                                    style={{ width: `${provider.overallScore}%` }}
                                                                />
                                                            </div>
                                                            <span className="text-[9px] font-bold text-primary">{provider.overallScore}</span>
                                                        </div>
                                                    </div>

                                                    {Object.entries(categories).map(([category, metrics]) => {
                                                        const isHighlight = category === highlightCategory
                                                        return (
                                                            <React.Fragment key={category}>
                                                                <div className="h-8" /> {/* Category Spacer */}
                                                                {(metrics as string[]).map(metric => {
                                                                    const isMetricWinner = getWinner(compareProviders, metric) === provider.id
                                                                    return (
                                                                        <div key={metric} className={cn(
                                                                            "h-10 flex items-center justify-center transition-colors",
                                                                            isHighlight ? "bg-secondary/5" : ""
                                                                        )}>
                                                                            <div className={`px-2 py-1 rounded-md flex items-center gap-1 ${isMetricWinner ? "bg-secondary/20 text-primary font-bold" : "text-muted-foreground"
                                                                                }`}>
                                                                                {isMetricWinner && <Trophy className="h-2.5 w-2.5 text-secondary" />}
                                                                                <span className="text-[10px]">
                                                                                    {formatMetricValue(metric, provider.data[metric])}
                                                                                </span>
                                                                            </div>
                                                                        </div>
                                                                    )
                                                                })}
                                                            </React.Fragment>
                                                        )
                                                    })}

                                                    <Button
                                                        size="sm"
                                                        className={`w-full h-8 text-[9px] font-bold uppercase rounded-lg mt-2 ${isOverallWinner ? "bg-secondary text-secondary-foreground" : "bg-primary/5 text-primary hover:bg-primary/10"
                                                            }`}
                                                        onClick={() => onEnquiry(provider)}
                                                    >
                                                        Enquire
                                                    </Button>
                                                </div>
                                            </div>
                                        )
                                    })}
                                </div>
                            </div>
                        </div>
                    </div>
                ) : (
                    <div className="p-12 text-center bg-muted/20 rounded-3xl border-2 border-dashed border-primary/5">
                        <p className="text-[10px] font-bold text-primary/40 uppercase tracking-widest">Select providers to compare performance</p>
                    </div>
                )}
            </div>
        </TooltipProvider>
    )
}
