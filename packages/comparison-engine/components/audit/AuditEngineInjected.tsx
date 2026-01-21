"use client"

import React, { useMemo } from "react"
import { parseData } from "@/lib/parse-data"
import { calculateMarketAlpha, getSustainabilityVerdict } from "@/lib/audit-engine"
import { TrustSignature } from "./TrustSignature"
import { AccountabilityScorecard } from "./AccountabilityScorecard"
import { SustainabilityGauge } from "./SustainabilityGauge"
import { SchemaInjector } from "./SchemaInjector"
import { EnrichedProvider } from "@/lib/types"

interface AuditEngineInjectedProps {
    courseCode: string
    state: string
    preferredProviderId?: string
    layout?: "compact" | "full"
}

export function AuditEngineInjected({
    courseCode,
    state,
    preferredProviderId,
    layout = "full"
}: AuditEngineInjectedProps) {
    // Load and memoize data
    const providers = useMemo(() => parseData(), [])
    const market = useMemo(() => calculateMarketAlpha(providers, state), [providers, state])

    const preferredProvider = useMemo(() =>
        providers.find(p => p.id === preferredProviderId),
        [providers, preferredProviderId]
    )

    // Find the "Top" provider for this context (or use the one provided)
    const displayProvider = preferredProvider || providers[0]

    if (!displayProvider) return null

    const verdict = getSustainabilityVerdict(displayProvider, market)

    return (
        <div className="audit-engine-container space-y-6">
            {/* 1. SEO & Entity Integrity Layer */}
            <SchemaInjector provider={displayProvider} courseCode={courseCode} />

            {/* 2. Trust HUD */}
            <TrustSignature
                lastRegistrySync="Validated 24h ago"
                lastPublisherAudit={displayProvider.audit.last_audit}
                variant={layout === "compact" ? "compact" : "full"}
            />

            {/* 3. The Accountability Gear */}
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                <AccountabilityScorecard
                    provider={displayProvider}
                    market={market}
                    className="lg:col-span-2"
                />

                <div className="space-y-4">
                    <SustainabilityGauge
                        value={displayProvider.audit.sustainability?.attrition_risk || 0.8}
                        label="Attrition Benchmark"
                        subLabel="12-Month Projection"
                    />
                    <SustainabilityGauge
                        value={displayProvider.audit.sustainability?.failure_rate || 0.7}
                        label="Assessment Failure Rate"
                        subLabel="Calculated Probability"
                        color="orange"
                    />
                </div>
            </div>

            {/* 4. The "Investigation" Hook (Tribune Link) */}
            <div className="p-4 rounded-lg bg-slate-900 text-slate-100 shadow-xl border border-slate-800">
                <div className="flex items-center gap-2 mb-2">
                    <span className="h-2 w-2 rounded-full bg-red-500 animate-pulse" />
                    <span className="text-[10px] uppercase font-black tracking-widest text-slate-400">Tribune Investigation</span>
                </div>
                <h4 className="text-sm font-bold mb-1 italic">"The Completion Rate Cover-Up"</h4>
                <p className="text-xs text-slate-400 mb-3 leading-relaxed">
                    Why 80% of students quit 'D Plus' inventory courses within their first year of study.
                </p>
                <button className="text-xs font-bold text-orange-400 hover:text-orange-300 transition-colors uppercase tracking-wider">
                    Read Audit Records →
                </button>
            </div>
        </div>
    )
}
