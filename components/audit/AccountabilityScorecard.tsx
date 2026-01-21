"use client"

import React from "react"
import { EnrichedProvider } from "@/lib/types"
import { MarketMetrics, getSustainabilityVerdict, getNetworkAffinityLabel } from "@/lib/audit-engine"
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { AlertTriangle, Info, ShieldAlert, BarChart3, AlertCircle } from "lucide-react"
import { cn } from "@/lib/utils"

interface AccountabilityScorecardProps {
    provider: EnrichedProvider
    market: MarketMetrics
    className?: string
}

export function AccountabilityScorecard({
    provider,
    market,
    className
}: AccountabilityScorecardProps) {
    const verdict = getSustainabilityVerdict(provider, market)
    const networkLabel = getNetworkAffinityLabel(provider)
    const s = provider.audit.sustainability

    return (
        <Card className={cn("overflow-hidden border-2 transition-all hover:shadow-lg",
            verdict.status === "CRITICAL" ? "border-red-500/20 shadow-red-500/5" : "border-primary/10",
            className
        )}>
            <CardHeader className="bg-muted/50 pb-3">
                <div className="flex items-center justify-between">
                    <Badge variant="outline" className="text-[10px] font-bold uppercase tracking-widest bg-background">
                        Audit Scorecard
                    </Badge>
                    <div className="flex items-center gap-1.5">
                        <div className={cn("h-2 w-2 rounded-full animate-pulse",
                            verdict.status === "CRITICAL" ? "bg-red-500" :
                                verdict.status === "CAUTION" ? "bg-orange-500" : "bg-emerald-500"
                        )} />
                        <span className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
                            {verdict.status}
                        </span>
                    </div>
                </div>
                <CardTitle className="text-xl flex items-center justify-between group">
                    <span>{provider.name}</span>
                    <span className="text-2xl font-black text-primary/20 group-hover:text-primary/40 transition-colors">
                        {provider.mdpa_score}
                    </span>
                </CardTitle>
            </CardHeader>

            <CardContent className="space-y-4 pt-4">
                {/* Risk Alerts */}
                <div className="space-y-2">
                    {networkLabel && (
                        <div className="flex items-start gap-2 p-2 rounded bg-orange-500/10 text-orange-700 text-xs border border-orange-500/20">
                            <ShieldAlert className="h-4 w-4 shrink-0 mt-0.5" />
                            <p><span className="font-bold">Operational Pattern Detected:</span> {networkLabel}</p>
                        </div>
                    )}

                    {verdict.status === "CRITICAL" && (
                        <div className="flex items-start gap-2 p-2 rounded bg-red-500/10 text-red-700 text-xs border border-red-500/20">
                            <AlertTriangle className="h-4 w-4 shrink-0 mt-0.5" />
                            <p><span className="font-bold">Sustainability Risk:</span> Highly ambiguous inventory depth identified.</p>
                        </div>
                    )}
                </div>

                {/* Audit Metrics */}
                <div className="grid grid-cols-2 gap-3">
                    <div className="p-2 rounded-md bg-muted/30 border">
                        <p className="text-[10px] uppercase font-bold text-muted-foreground tracking-wider mb-1">Content Inventory</p>
                        <div className="flex items-center justify-between">
                            <span className="text-lg font-bold">{s?.inventory_depth || "N/A"}</span>
                            <Badge variant="secondary" className="text-[10px] h-5">Fidelity</Badge>
                        </div>
                    </div>
                    <div className="p-2 rounded-md bg-muted/30 border">
                        <p className="text-[10px] uppercase font-bold text-muted-foreground tracking-wider mb-1">Inclusion Index</p>
                        <div className="flex items-center justify-between">
                            <span className={cn("text-lg font-bold", (s?.wcag_barrier_count ?? 0) > 20 ? "text-red-600" : "text-emerald-600")}>
                                {s?.wcag_barrier_count ?? 0}
                            </span>
                            <span className="text-[10px] font-medium text-muted-foreground">Barriers</span>
                        </div>
                    </div>
                </div>

                {/* Market Insights */}
                <div className="p-3 bg-primary/5 rounded-lg border border-primary/10 relative overflow-hidden group">
                    <Info className="absolute -right-1 -bottom-1 h-12 w-12 text-primary/5 rotate-12 group-hover:rotate-0 transition-transform" />
                    <p className="text-[11px] leading-relaxed text-primary/80 relative z-10">
                        {verdict.insight}
                    </p>
                </div>
            </CardContent>

            <CardFooter className="bg-muted/30 pt-3 border-t">
                <div className="flex items-center gap-4 w-full">
                    <div className="flex flex-col">
                        <span className="text-[9px] uppercase font-bold text-muted-foreground tracking-tight">Continuity Profile</span>
                        <span className="text-xs font-bold text-red-600/80">{verdict.attritionLabel}</span>
                    </div>
                    <div className="flex flex-col">
                        <span className="text-[9px] uppercase font-bold text-muted-foreground tracking-tight">Non-Completion Sig.</span>
                        <span className="text-xs font-bold text-red-500/80">{verdict.failureLabel}</span>
                    </div>
                    <div className="ml-auto">
                        <AlertCircle className="h-4 w-4 text-muted-foreground/30 hover:text-primary transition-colors cursor-help" />
                    </div>
                </div>
            </CardFooter>
        </Card>
    )
}
