"use client"

import Link from "next/link"
import { ArrowRight, ShieldCheck, TrendingUp, Eye, ChevronDown } from "lucide-react"

const stats = [
  { value: "25,000+", label: "Students Guided" },
  { value: "12+", label: "Courses Analysed" },
  { value: "73%", label: "RTO Fail Rate Exposed" },
  { value: "100%", label: "Editorially Independent" },
]

const features = [
  {
    icon: <Eye className="w-4 h-4 text-secondary" />,
    title: "Price Transparency",
    desc: "Hidden fees surfaced. True costs revealed.",
  },
  {
    icon: <ShieldCheck className="w-4 h-4 text-secondary" />,
    title: "Compliance Intelligence",
    desc: "ASQA regulatory signals tracked in real time.",
  },
  {
    icon: <TrendingUp className="w-4 h-4 text-secondary" />,
    title: "Market Analysis",
    desc: "Live market-mean pricing and risk profiling.",
  },
]

export default function HomeHero() {
  return (
    <section
      className="relative flex flex-col justify-between overflow-hidden"
      style={{ minHeight: "100svh" }}
      aria-labelledby="hero-heading"
    >
      {/* Background */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "hsl(212 100% 7%)",
        }}
        aria-hidden="true"
      />

      {/* Subtle dot grid */}
      <div
        className="absolute inset-0 opacity-[0.06]"
        style={{
          backgroundImage: "radial-gradient(hsl(var(--secondary)) 1px, transparent 1px)",
          backgroundSize: "32px 32px",
        }}
        aria-hidden="true"
      />

      {/* Gold accent bar on left — visual anchor */}
      <div
        className="absolute left-0 top-[17vh] bottom-[17vh] w-[3px] bg-secondary/60 hidden lg:block"
        aria-hidden="true"
      />

      {/* Top rule */}
      <div className="absolute top-0 left-0 right-0 h-[3px] bg-secondary" aria-hidden="true" />

      {/* Main content */}
      <div className="relative z-10 flex flex-col justify-center flex-1 pt-28 pb-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 w-full">

          {/* Alert strip */}
          <div className="inline-flex items-center gap-2.5 border border-secondary/25 bg-secondary/8 rounded-full px-4 py-1.5 mb-10">
            <span className="w-1.5 h-1.5 rounded-full bg-secondary animate-pulse shrink-0" aria-hidden="true" />
            <span className="text-secondary text-xs font-bold uppercase tracking-wider">
              95% of RTOs hide their true pricing — we expose it
            </span>
          </div>

          {/* Two-column layout on large screens */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">
            {/* Left: heading + CTA */}
            <div>
              <h1
                id="hero-heading"
                className="text-5xl sm:text-6xl xl:text-7xl font-bold text-white leading-[1.05] text-balance mb-7"
              >
                Australia&apos;s{" "}
                <span className="text-secondary" style={{ textShadow: "0 0 48px rgba(201,162,39,0.35)" }}>
                  Independent
                </span>{" "}
                RTO Comparison Platform
              </h1>

              <p className="text-white/60 text-lg leading-relaxed mb-10 max-w-lg text-pretty">
                We analyse, audit, and compare Registered Training Organisations across every state — protecting consumers and driving transparency through rigorous, editorially independent research.
              </p>

              <div className="flex flex-wrap gap-3">
                <Link
                  href="#courses"
                  className="inline-flex items-center gap-2 bg-secondary text-primary font-bold px-7 py-3.5 rounded text-sm hover:bg-secondary/90 transition-colors"
                >
                  Compare RTOs Now
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <a
                  href="https://cpp41419.com.au/about"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 border border-white/18 text-white/75 font-semibold px-7 py-3.5 rounded text-sm hover:bg-white/8 hover:text-white transition-colors"
                >
                  About the Platform
                </a>
              </div>

              {/* Independence badge */}
              <div className="mt-8 flex items-center gap-3">
                <div className="flex items-center justify-center w-9 h-9 rounded-full bg-white/6 border border-white/10 shrink-0">
                  <ShieldCheck className="w-4 h-4 text-secondary" />
                </div>
                <p className="text-white/40 text-xs leading-snug">
                  Not an RTO. Not affiliated with any training provider.{" "}
                  <a
                    href="https://cpp41419.com.au/about"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="underline underline-offset-2 hover:text-secondary transition-colors"
                  >
                    Learn more about our independence.
                  </a>
                </p>
              </div>
            </div>

            {/* Right: stat grid */}
            <div className="grid grid-cols-2 gap-3">
              {stats.map((stat) => (
                <div
                  key={stat.label}
                  className="bg-white/4 border border-white/10 rounded-xl p-6 flex flex-col gap-2 hover:bg-white/6 hover:border-secondary/25 transition-all duration-200"
                >
                  <span className="text-4xl font-bold text-secondary leading-none">{stat.value}</span>
                  <span className="text-white/55 text-sm leading-tight">{stat.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Feature strip — bottom of hero */}
      <div className="relative z-10 border-t border-white/10 bg-black/25 backdrop-blur-sm mt-auto">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10">
          <div className="grid grid-cols-1 sm:grid-cols-3 divide-y sm:divide-y-0 sm:divide-x divide-white/10">
            {features.map((feat) => (
              <div key={feat.title} className="flex items-start gap-3.5 px-6 py-5">
                <div className="w-8 h-8 rounded bg-white/6 border border-white/10 flex items-center justify-center shrink-0 mt-0.5">
                  {feat.icon}
                </div>
                <div>
                  <div className="text-white text-sm font-semibold">{feat.title}</div>
                  <div className="text-white/45 text-xs leading-relaxed mt-0.5">{feat.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Scroll cue */}
      <a
        href="#about"
        className="absolute bottom-[88px] right-6 sm:right-10 hidden md:flex items-center justify-center w-9 h-9 rounded-full border border-white/15 bg-white/5 hover:bg-white/10 transition-colors"
        aria-label="Scroll down"
      >
        <ChevronDown className="w-4 h-4 text-white/50" />
      </a>
    </section>
  )
}
