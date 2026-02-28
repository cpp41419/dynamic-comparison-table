"use client"

import { ShieldAlert, Scale, Newspaper, BookOpen, ArrowRight, TrendingUp, TrendingDown, Activity, CheckCircle2 } from "lucide-react"
import Link from "next/link"
import { useState, useEffect, useRef } from "react"

const pillars = [
  {
    icon: Scale,
    tag: "Analysis",
    title: "Independent Analysis",
    body: "We examine publicly available RTO data, website performance, and compliance signals — with no commercial relationships affecting editorial judgement.",
    href: "https://cpp41419.com.au/about",
  },
  {
    icon: ShieldAlert,
    tag: "Protection",
    title: "Consumer Protection",
    body: "We surface hidden costs, flag compliance risks, and give students the information they need to choose a safe, quality provider.",
    href: "https://cpp41419.com.au",
  },
  {
    icon: Newspaper,
    tag: "Journalism",
    title: "Tribune Reporting",
    body: "Investigative reporting on the vocational education sector, following Australian Press Council editorial standards with full independence.",
    href: "https://cpp41419.com.au",
  },
  {
    icon: BookOpen,
    tag: "Resources",
    title: "Educational Guides",
    body: "State-by-state licensing guides, career pathways, cost breakdowns, and tools for planning your CPP41419 and related qualifications.",
    href: "https://cpp41419.com.au",
  },
]

const steps = [
  {
    step: "01",
    title: "Select a Course",
    label: "COURSE SELECT",
    signal: "+12 RTOs tracked",
    trend: "up" as const,
    metric: "12 quals",
    metricLabel: "Indexed",
    desc: "Choose from our index of nationally recognised qualifications tracked by the platform. Updated weekly from training.gov.au.",
    detail: "CPP41419 · CPP51122 · BSB50820 · FNS50322 · HLT54121 + more",
  },
  {
    step: "02",
    title: "Compare Providers",
    label: "RTO COMPARE",
    signal: "Risk-adjusted data",
    trend: "up" as const,
    metric: "38 RTOs",
    metricLabel: "Analysed",
    desc: "Review side-by-side RTO data: pricing, delivery mode, compliance history, and risk profile. No affiliate commissions.",
    detail: "Price · Compliance · Delivery Mode · Risk Score",
  },
  {
    step: "03",
    title: "Verify & Enrol",
    label: "VERIFY",
    signal: "Gov-confirmed",
    trend: "neutral" as const,
    metric: "100%",
    metricLabel: "Transparent",
    desc: "Confirm your chosen RTO on training.gov.au, then enrol directly — no middlemen, no referral fees.",
    detail: "training.gov.au · asqa.gov.au · myskills.gov.au",
  },
]

// Continuous ticker items — market-style data points
const tickerItems = [
  { label: "CPP41419", value: "38 RTOs", change: "+3 this qtr", up: true },
  { label: "CPP51122", value: "19 RTOs", change: "+1 this qtr", up: true },
  { label: "BSB50820", value: "24 RTOs", change: "Stable", up: true },
  { label: "FNS50322", value: "15 RTOs", change: "+2 this qtr", up: true },
  { label: "HLT54121", value: "11 RTOs", change: "New entry", up: true },
  { label: "BSB50420", value: "17 RTOs", change: "-1 suspended", up: false },
  { label: "AVG PRICE", value: "$1,890", change: "+4.2% YoY", up: false },
  { label: "COMPLIANCE RATE", value: "84.6%", change: "+1.1pp", up: true },
  { label: "ASQA ALERTS", value: "3 active", change: "Updated today", up: false },
  { label: "STATES COVERED", value: "All 8", change: "National", up: true },
]

function Ticker() {
  const trackRef = useRef<HTMLDivElement>(null)

  // Duplicate for seamless loop
  const items = [...tickerItems, ...tickerItems]

  return (
    <div className="overflow-hidden border-y border-white/10 bg-white/4 py-0" aria-label="Live market data ticker">
      <div
        ref={trackRef}
        className="flex whitespace-nowrap animate-ticker"
        style={{ willChange: "transform" }}
      >
        {items.map((item, i) => (
          <div
            key={`${item.label}-${i}`}
            className="inline-flex items-center gap-2.5 px-6 py-3 border-r border-white/8 shrink-0"
          >
            <span className="text-white/40 text-[10px] font-bold uppercase tracking-widest">{item.label}</span>
            <span className="text-white font-semibold text-sm font-mono">{item.value}</span>
            <span className={`flex items-center gap-0.5 text-[10px] font-semibold ${item.up ? "text-emerald-400" : "text-red-400"}`}>
              {item.up ? <TrendingUp className="w-2.5 h-2.5" /> : <TrendingDown className="w-2.5 h-2.5" />}
              {item.change}
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}

function StepTicker() {
  const [active, setActive] = useState(0)
  const [animating, setAnimating] = useState(false)

  useEffect(() => {
    const id = setInterval(() => {
      setAnimating(true)
      setTimeout(() => {
        setActive((a) => (a + 1) % steps.length)
        setAnimating(false)
      }, 300)
    }, 4000)
    return () => clearInterval(id)
  }, [])

  const step = steps[active]

  return (
    <div className="relative overflow-hidden">
      {/* Mini ticker rail */}
      <Ticker />

      {/* Step cards grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="flex items-center justify-between mb-8 flex-wrap gap-3">
          <div>
            <div className="flex items-center gap-2 text-secondary text-[10px] font-bold uppercase tracking-[0.18em] mb-3">
              <Activity className="w-3 h-3" />
              Market Intelligence
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold text-white text-balance leading-tight">
              Three Steps to the Right RTO
            </h2>
          </div>
          {/* Step progress indicators */}
          <div className="flex items-center gap-2">
            {steps.map((s, i) => (
              <button
                key={s.step}
                onClick={() => setActive(i)}
                aria-label={`Step ${s.step}: ${s.title}`}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  i === active ? "w-8 bg-secondary" : "w-3 bg-white/20 hover:bg-white/40"
                }`}
              />
            ))}
          </div>
        </div>

        {/* Card grid — all three always visible, active one highlighted */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {steps.map((s, i) => {
            const isActive = i === active
            return (
              <button
                key={s.step}
                onClick={() => setActive(i)}
                className={`text-left rounded-xl border p-6 transition-all duration-300 cursor-pointer ${
                  isActive
                    ? "bg-white/8 border-secondary/40 shadow-lg shadow-secondary/10"
                    : "bg-white/4 border-white/8 hover:bg-white/6 hover:border-white/18"
                }`}
              >
                {/* Top row */}
                <div className="flex items-center justify-between mb-5">
                  <div className="flex items-center gap-2">
                    <span className={`text-[9px] font-bold font-mono tracking-widest uppercase px-2 py-0.5 rounded border ${
                      isActive ? "text-secondary border-secondary/40 bg-secondary/10" : "text-white/35 border-white/10 bg-white/4"
                    }`}>
                      {s.label}
                    </span>
                  </div>
                  <span className={`font-mono font-bold text-[9px] uppercase tracking-widest ${
                    s.trend === "up" ? "text-emerald-400" : "text-blue-400"
                  }`}>
                    {s.signal}
                  </span>
                </div>

                {/* Step number + title */}
                <div className="mb-4">
                  <div className={`font-mono text-5xl font-bold leading-none mb-1 transition-colors ${
                    isActive ? "text-secondary" : "text-white/15"
                  }`}>
                    {s.step}
                  </div>
                  <h3 className={`font-bold text-lg leading-tight transition-colors ${
                    isActive ? "text-white" : "text-white/50"
                  }`}>
                    {s.title}
                  </h3>
                </div>

                {/* Metric pill */}
                <div className={`inline-flex items-center gap-2 rounded px-3 py-1.5 mb-4 border transition-colors ${
                  isActive ? "bg-secondary/10 border-secondary/25" : "bg-white/4 border-white/8"
                }`}>
                  <span className={`font-mono font-bold text-base ${isActive ? "text-secondary" : "text-white/30"}`}>{s.metric}</span>
                  <span className={`text-[10px] uppercase tracking-widest font-semibold ${isActive ? "text-white/60" : "text-white/20"}`}>{s.metricLabel}</span>
                </div>

                {/* Description */}
                <p className={`text-sm leading-relaxed mb-4 transition-colors ${isActive ? "text-white/70" : "text-white/30"}`}>
                  {s.desc}
                </p>

                {/* Data tags */}
                <div className={`text-[9px] font-mono uppercase tracking-wider transition-colors ${isActive ? "text-white/35" : "text-white/15"}`}>
                  {s.detail}
                </div>

                {/* Active indicator */}
                {isActive && (
                  <div className="mt-4 flex items-center gap-1.5 text-xs text-secondary font-semibold">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    Active step
                  </div>
                )}
              </button>
            )
          })}
        </div>

        {/* CTA */}
        <div className="mt-10 flex flex-col sm:flex-row items-center gap-4 justify-center">
          <Link
            href="#courses"
            className="inline-flex items-center gap-2 bg-secondary text-primary font-bold px-8 py-3.5 rounded text-sm hover:bg-secondary/90 transition-colors"
          >
            Browse Courses
            <ArrowRight className="w-4 h-4" />
          </Link>
          <span className="text-white/25 text-xs">
            No sign-up required — free and independent
          </span>
        </div>
      </div>
    </div>
  )
}

export default function HomeTrustBar() {
  return (
    <>
      {/* ── Pillar section ── */}
      <section id="about" className="bg-background py-20 scroll-mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-12">
            <div>
              <div className="flex items-center gap-2 text-secondary text-[10px] font-bold uppercase tracking-[0.18em] mb-3">
                <span className="w-6 h-px bg-secondary" aria-hidden="true" />
                What We Do
              </div>
              <h2 className="text-3xl sm:text-4xl font-bold text-foreground text-balance leading-tight">
                Built for Transparency.{" "}
                <span className="text-secondary">Trusted by Students.</span>
              </h2>
            </div>
            <p className="text-muted-foreground text-sm max-w-xs sm:text-right leading-relaxed text-pretty">
              CPP41419.com.au is not a training provider. We are an independent analysis platform dedicated to protecting Australians navigating vocational education.
            </p>
          </div>

          {/* Pillar cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            {pillars.map((p) => {
              const Icon = p.icon
              return (
                <a
                  key={p.title}
                  href={p.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative bg-card border border-border rounded-xl p-6 flex flex-col gap-4 hover:border-secondary/35 hover:shadow-lg hover:shadow-primary/5 transition-all duration-200 cursor-pointer"
                >
                  {/* Tag */}
                  <span className="inline-flex self-start text-[9px] font-bold uppercase tracking-[0.16em] text-secondary/80 bg-secondary/8 border border-secondary/15 px-2 py-0.5 rounded-full">
                    {p.tag}
                  </span>

                  {/* Icon */}
                  <div className="w-10 h-10 rounded-lg bg-primary/6 border border-primary/10 flex items-center justify-center group-hover:bg-secondary/8 group-hover:border-secondary/20 transition-colors shrink-0">
                    <Icon className="w-5 h-5 text-secondary" />
                  </div>

                  <div>
                    <h3 className="font-bold text-foreground mb-1.5 text-[15px]">{p.title}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">{p.body}</p>
                  </div>

                  <div className="mt-auto flex items-center gap-1 text-xs text-secondary/70 font-semibold group-hover:text-secondary transition-colors">
                    Learn more
                    <ArrowRight className="w-3 h-3 transition-transform group-hover:translate-x-0.5" />
                  </div>
                </a>
              )
            })}
          </div>

          {/* Legal disclaimer */}
          <div className="flex items-start gap-3 bg-secondary/6 border border-secondary/18 rounded-lg px-5 py-4">
            <ShieldAlert className="w-4 h-4 text-secondary shrink-0 mt-px" aria-hidden="true" />
            <p className="text-xs text-foreground/70 leading-relaxed">
              <strong className="text-foreground font-semibold">LEGAL NOTICE:</strong> CPP41419.com.au is NOT a Registered Training Organisation (RTO). We do not deliver training, issue certificates, or process enrolments. For actual CPP41419 training, enrol with an ASQA-registered RTO — verify at{" "}
              <a
                href="https://training.gov.au"
                target="_blank"
                rel="noopener noreferrer"
                className="underline underline-offset-2 hover:text-secondary transition-colors font-medium"
              >
                training.gov.au
              </a>
              .
            </p>
          </div>
        </div>
      </section>

      {/* ── Market Mover: Three Steps ── */}
      <section className="bg-primary">
        <StepTicker />
      </section>
    </>
  )
}
