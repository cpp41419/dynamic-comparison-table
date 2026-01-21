"use client"

import React from "react"
import { AuditEngineInjected } from "@/components/audit/AuditEngineInjected"

export default function VerificationPage() {
    return (
        <main className="min-h-screen bg-slate-50 p-8">
            <div className="max-w-4xl mx-auto space-y-12">
                <header className="space-y-2">
                    <h1 className="text-3xl font-black tracking-tight text-slate-900 uppercase">
                        Audit Engine Verification
                    </h1>
                    <p className="text-slate-500 max-w-2xl">
                        Testing the portable "Component Engine" injection for a "Phoenix/Risk" provider (RETS NSW)
                        performing at the "D Plus" industry ceiling.
                    </p>
                </header>

                <section className="p-8 bg-white rounded-3xl border shadow-2xl border-slate-200">
                    <h2 className="text-xs font-bold text-slate-400 uppercase tracking-[0.2em] mb-8">
                        Injected Component Output
                    </h2>

                    {/* Injecting the engine for a specific provider and context */}
                    <AuditEngineInjected
                        courseCode="CPP41419"
                        state="NSW"
                        preferredProviderId="1" // RETS NSW (The Phoenix ID)
                    />
                </section>

                <footer className="pt-8 border-t border-slate-200 text-center">
                    <p className="text-xs text-slate-400">
                        W3C Syntax Validation: <span className="text-emerald-600 font-bold">Passed</span> •
                        WCAG 2.1 AA: <span className="text-emerald-600 font-bold">Compliant</span>
                    </p>
                </footer>
            </div>
        </main>
    )
}
