"use client";

import React, { useState, useEffect } from "react";
import { X, TrendingUp, TrendingDown } from "lucide-react";
import { Button } from "@/components/ui/button";

interface PriceData {
    symbol: string;
    name: string;
    price: number;
    change: number;
    changePercent: number;
}

const mockPriceData: PriceData[] = [
    { symbol: "AUD/USD", name: "Australian Dollar", price: 0.6542, change: 0.0012, changePercent: 0.18 },
    { symbol: "Course Index", name: "Global Index", price: 2847, change: 125, changePercent: 4.59 },
    { symbol: "Enrollment", name: "Rate", price: 94.2, change: 2.3, changePercent: 2.51 },
    { symbol: "Quality Score", name: "Avg Rating", price: 8.7, change: 0.2, changePercent: 2.35 },
];

export default function PriceIndexTicker() {
    const [isVisible, setIsVisible] = useState(true);
    const [isPaused, setIsPaused] = useState(false);

    if (!isVisible) return null;

    return (
        <div className="fixed top-0 left-0 right-0 z-50 bg-gradient-to-r from-primary/95 via-primary to-primary/95 border-b border-secondary/20 shadow-lg backdrop-blur-sm">
            <div className="max-w-7xl mx-auto px-4 py-2">
                <div className="flex items-center justify-between gap-3">
                    {/* Live Badge */}
                    <div className="flex items-center gap-2 min-w-fit">
                        <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-500/20 border border-emerald-500/40 backdrop-blur-sm">
                            <span className="relative flex h-2 w-2">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                            </span>
                            <span className="text-xs font-bold text-emerald-300 uppercase tracking-wide">Live Data</span>
                        </div>
                    </div>

                    {/* Scrolling Ticker */}
                    <div 
                        className="flex-1 overflow-hidden"
                        onMouseEnter={() => setIsPaused(true)}
                        onMouseLeave={() => setIsPaused(false)}
                    >
                        <div className={`flex gap-4 ${isPaused ? "" : "animate-scroll"}`}>
                            {[...mockPriceData, ...mockPriceData].map((item, idx) => (
                                <div
                                    key={`${item.symbol}-${idx}`}
                                    className="flex items-center gap-2.5 min-w-max px-3 py-1 rounded-lg bg-white/8 hover:bg-white/12 transition-all duration-200 group cursor-pointer border border-white/10 hover:border-white/20"
                                >
                                    <div className="flex flex-col gap-0.5">
                                        <span className="text-xs font-semibold text-primary-foreground/90 leading-none">{item.symbol}</span>
                                        <span className="text-xs text-primary-foreground/60 leading-none">{item.name}</span>
                                    </div>
                                    <div className="w-px h-6 bg-white/10" />
                                    <span className="text-sm font-bold text-primary-foreground font-mono">{typeof item.price === 'number' && item.price > 100 ? item.price.toFixed(0) : item.price.toFixed(2)}</span>
                                    <div className={`flex items-center gap-1 px-2 py-0.5 rounded-md ${
                                        item.changePercent >= 0
                                            ? "bg-emerald-500/25 text-emerald-300"
                                            : "bg-red-500/25 text-red-300"
                                    }`}>
                                        {item.changePercent >= 0 ? (
                                            <TrendingUp className="w-3 h-3" />
                                        ) : (
                                            <TrendingDown className="w-3 h-3" />
                                        )}
                                        <span className="text-xs font-semibold">{item.changePercent > 0 ? "+" : ""}{item.changePercent.toFixed(2)}%</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Close Button */}
                    <Button
                        onClick={() => setIsVisible(false)}
                        variant="ghost"
                        size="sm"
                        className="h-6 w-6 p-0 min-w-fit text-primary-foreground/60 hover:text-primary-foreground hover:bg-white/10 rounded-md"
                    >
                        <X className="h-4 w-4" />
                    </Button>
                </div>
            </div>

            {/* Bottom gradient accent line */}
            <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-secondary/30 to-transparent" />

            <style jsx>{`
                @keyframes scroll {
                    0% {
                        transform: translateX(0);
                    }
                    100% {
                        transform: translateX(-50%);
                    }
                }
                .animate-scroll {
                    animation: scroll 40s linear infinite;
                }
            `}</style>
        </div>
    );
}
