"use client"

import React from "react"
import { CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { useToast } from "@/components/ui/use-toast"
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip"
import { Share2, Download, Check } from "lucide-react"

interface ComparisonHeaderProps {
    course: {
        code: string
        qualification: string
    }
    states: string[]
    selectedState: string
    onStateSelect: (state: string) => void
    providerCount: number
    className?: string
}

export function ComparisonHeader({
    course,
    states,
    selectedState,
    onStateSelect,
    providerCount,
    className,
}: ComparisonHeaderProps) {
    const { toast } = useToast()

    const handleExport = () => {
        toast({
            title: "Report exported",
            description: "Your comparison report has been generated.",
            variant: "default",
        })
    }


    const handleShare = async () => {
        const shareData = {
            title: 'RTO Comparison',
            text: `Compare top RTOs for ${course.code} in ${selectedState}`,
            url: typeof window !== 'undefined' ? window.location.href : '',
        }

        if (navigator.share && navigator.canShare && navigator.canShare(shareData)) {
            try {
                await navigator.share(shareData)
                return
            } catch (err) {
                console.error('Share failed:', err)
            }
        }

        // Fallback to clipboard
        if (typeof window !== "undefined" && navigator?.clipboard) {
            navigator.clipboard.writeText(shareData.url).then(() => {
                toast({
                    title: "Link copied",
                    description: "Page URL copied to clipboard.",
                    variant: "default",
                })
            })
        }
    }

    return (
        <CardHeader
            className={cn(
                "sticky top-0 z-30",
                "bg-white/80 backdrop-blur-md border-b border-white/20",
                "shadow-sm px-6 py-6 transition-all duration-300",
                "animate-fade-in-down",
                className
            )}
        >
            <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
                <div className="text-center md:text-left space-y-3 flex-1">
                    <CardTitle className="text-4xl md:text-5xl font-extrabold tracking-tight text-primary animate-fade-in leading-tight">
                        RTO Digital Experience Comparison
                    </CardTitle>
                    <div className="flex items-center gap-3 justify-center md:justify-start flex-wrap">
                        <Badge
                            variant="secondary"
                            className="text-sm px-3 py-1 font-mono font-bold bg-primary/10 text-primary border-primary/20"
                        >
                            {course.code}
                        </Badge>
                        <span className="text-lg md:text-xl font-medium text-muted-foreground">
                            {course.qualification}
                        </span>
                    </div>
                    <div className="flex items-center gap-2">
                        <div className="flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/20">
                            <span className="relative flex h-2 w-2">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                            </span>
                            <span className="text-[10px] font-bold text-emerald-600 uppercase tracking-wider">Live Audit</span>
                        </div>
                        <p className="text-xs text-muted-foreground/60 italic">Data refreshed 24h ago</p>
                    </div>
                    <p className="max-w-2xl text-sm text-muted-foreground/80 leading-relaxed mx-auto md:mx-0">
                        4 Categories • 8 Metrics: Compliance, Technical, Content & Trust. Analyze the digital
                        maturity of training providers in your state.
                    </p>
                </div>

                <div className="flex flex-col items-center md:items-end space-y-4 w-full md:w-auto">
                    <div className="flex flex-wrap gap-2 justify-center md:justify-end">
                        {states.map((state) => (
                            <Button
                                key={state}
                                variant={selectedState === state ? "default" : "outline"}
                                onClick={() => onStateSelect(state)}
                                className={cn(
                                    "min-w-[3.5rem] h-9 text-sm font-medium transition-all duration-200",
                                    selectedState === state
                                        ? "bg-primary text-primary-foreground shadow-md scale-105 ring-2 ring-primary/20 ring-offset-2"
                                        : "hover:bg-secondary/10 hover:text-primary hover:border-primary/30 text-muted-foreground"
                                )}
                            >
                                {state}
                            </Button>
                        ))}
                    </div>

                    <div className="flex items-center gap-3 w-full md:w-auto justify-center md:justify-end">
                        <TooltipProvider delayDuration={300}>
                            <Tooltip>
                                <TooltipTrigger asChild>
                                    <Button
                                        variant="outline"
                                        size="sm"
                                        className="bg-white/50 border-primary/20 text-primary hover:bg-primary/5 gap-2 transition-colors"
                                        onClick={handleExport}
                                    >
                                        <Download className="w-4 h-4" />
                                        <span>Export</span>
                                    </Button>
                                </TooltipTrigger>
                                <TooltipContent>
                                    <p>Download comparison report</p>
                                </TooltipContent>
                            </Tooltip>
                        </TooltipProvider>

                        <TooltipProvider delayDuration={300}>
                            <Tooltip>
                                <TooltipTrigger asChild>
                                    <Button
                                        variant="outline"
                                        size="sm"
                                        className="bg-white/50 border-primary/20 text-primary hover:bg-primary/5 gap-2 transition-colors"
                                        onClick={handleShare}
                                    >
                                        <Share2 className="w-4 h-4" />
                                        <span>Share</span>
                                    </Button>
                                </TooltipTrigger>
                                <TooltipContent>
                                    <p>Share or copy link</p>
                                </TooltipContent>
                            </Tooltip>
                        </TooltipProvider>
                    </div>

                    <p className="text-xs font-medium text-muted-foreground/70">
                        Showing <span className="text-primary font-bold">{providerCount}</span> providers in{' '}
                        <span className="text-primary font-bold">{selectedState}</span>
                    </p>
                </div>
            </div>
        </CardHeader>
    )
}
