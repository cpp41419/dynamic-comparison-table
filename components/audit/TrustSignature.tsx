"use client"

import React from "react"
import { Badge } from "@/components/ui/badge"
import { Shield, RefreshCcw, Search, ExternalLink } from "lucide-react"
import { cn } from "@/lib/utils"

interface TrustSignatureProps {
    lastRegistrySync: string
    lastPublisherAudit: string
    className?: string
    variant?: "compact" | "full"
}

export function TrustSignature({
    lastRegistrySync,
    lastPublisherAudit,
    className,
    variant = "full"
}: TrustSignatureProps) {
    return (
        <div className={cn(
            "flex flex-col gap-2 p-3 rounded-lg border bg-card/50 backdrop-blur-md shadow-sm",
            variant === "compact" ? "p-1.5 border-none bg-transparent" : "",
            className
        )}>
            <div className="flex items-center justify-between gap-4">
                {/* Registry Sync Signal */}
                <div className="flex items-center gap-2">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-emerald-500/10 text-emerald-600">
                        <RefreshCcw className="h-4 w-4 animate-spin-slow" />
                    </div>
                    <div className="flex flex-col">
                        <span className="text-[10px] uppercase tracking-wider font-bold text-muted-foreground/70">Registry Sync</span>
                        <span className="text-xs font-semibold">{lastRegistrySync}</span>
                    </div>
                </div>

                {/* Publisher Audit Signature */}
                <div className="flex items-center gap-2">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-orange-500/10 text-orange-600">
                        <Shield className="h-4 w-4" />
                    </div>
                    <div className="flex flex-col">
                        <span className="text-[10px] uppercase tracking-wider font-bold text-muted-foreground/70">Publisher Audit</span>
                        <span className="text-xs font-semibold">{lastPublisherAudit}</span>
                    </div>
                </div>

                {variant === "full" && (
                    <div className="ml-auto flex items-center gap-2">
                        <Badge variant="outline" className="bg-orange-500/5 border-orange-200 text-orange-700 text-[10px] gap-1 px-2 py-0.5">
                            <span className="h-1.5 w-1.5 rounded-full bg-orange-500 animate-pulse" />
                            OVERSIGHT HUB
                        </Badge>
                    </div>
                )}
            </div>

            {variant === "full" && (
                <div className="flex items-center gap-2 pt-2 border-t text-[10px] text-muted-foreground/60 italic">
                    <Search className="h-3 w-3" />
                    <span>Cross-verified against training.gov.au @id metadata</span>
                    <a href="#" className="flex items-center gap-0.5 ml-auto text-orange-600 font-medium hover:underline">
                        Methodology <ExternalLink className="h-2.5 w-2.5" />
                    </a>
                </div>
            )}
        </div>
    )
}
