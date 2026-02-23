"use client";

import React, { useState, useEffect } from "react";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";

interface PriceData {
    symbol: string;
    name: string;
    price: number;
    change: number;
    changePercent: number;
}

const mockPriceData: PriceData[] = [
    { symbol: "AUSTD", name: "AUD/USD", price: 0.6542, change: 0.0012, changePercent: 0.18 },
    { symbol: "AUSJPY", name: "AUD/JPY", price: 105.23, change: 0.45, changePercent: 0.43 },
    { symbol: "AUSEUR", name: "AUD/EUR", price: 0.6145, change: -0.0008, changePercent: -0.13 },
    { symbol: "AUGBP", name: "AUD/GBP", price: 0.5234, change: 0.0015, changePercent: 0.29 },
];

export default function PriceIndexTicker() {
    const [isVisible, setIsVisible] = useState(true);
    const [scrolling, setScrolling] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setScrolling(window.scrollY > 100);
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    if (!isVisible) return null;

    return (
        <div
            className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
                scrolling ? "shadow-lg" : "shadow-md"
            } bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 border-b border-slate-700/50`}
        >
            <div className="max-w-7xl mx-auto px-4 py-2.5">
                <div className="flex items-center justify-between gap-4">
                    {/* Ticker Label */}
                    <div className="flex items-center gap-2 min-w-fit">
                        <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30">
                            <span className="relative flex h-1.5 w-1.5">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-500"></span>
                            </span>
                            <span className="text-[10px] font-bold text-emerald-400 uppercase tracking-widest">Live</span>
                        </div>
                        <span className="text-xs font-semibold text-slate-300 uppercase tracking-widest hidden sm:inline">Market Data</span>
                    </div>

                    {/* Scrolling Prices */}
                    <div className="flex-1 overflow-hidden">
                        <div className="flex gap-6 animate-scroll">
                            {[...mockPriceData, ...mockPriceData].map((item, idx) => (
                                <div
                                    key={`${item.symbol}-${idx}`}
                                    className="flex items-center gap-3 min-w-max px-3 py-1.5 rounded-lg bg-slate-700/30 hover:bg-slate-700/50 transition-colors"
                                >
                                    <span className="text-xs font-bold text-slate-200 uppercase">{item.symbol}</span>
                                    <span className="text-sm font-semibold text-white">${item.price.toFixed(4)}</span>
                                    <span
                                        className={`text-xs font-semibold ${
                                            item.change >= 0
                                                ? "text-emerald-400"
                                                : "text-red-400"
                                        }`}
                                    >
                                        {item.change >= 0 ? "+" : ""}{item.change.toFixed(4)} ({item.changePercent > 0 ? "+" : ""}{item.changePercent.toFixed(2)}%)
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Close Button */}
                    <Button
                        onClick={() => setIsVisible(false)}
                        variant="ghost"
                        size="sm"
                        className="h-6 w-6 p-0 min-w-fit text-slate-400 hover:text-slate-200 hover:bg-slate-700/30"
                    >
                        <X className="h-4 w-4" />
                    </Button>
                </div>
            </div>

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
                    animation: scroll 30s linear infinite;
                }
                .animate-scroll:hover {
                    animation-play-state: paused;
                }
            `}</style>
        </div>
    );
}
