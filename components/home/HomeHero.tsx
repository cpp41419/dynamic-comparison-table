"use client"

import Link from "next/link"
import { ArrowRight, ShieldCheck, TrendingUp, Eye } from "lucide-react"

export default function HomeHero() {
  return (
    <section
      className="relative min-h-[92vh] flex flex-col justify-center overflow-hidden"
      style={{
        background: "linear-gradient(135deg, hsl(var(--primary)) 0%, hsl(212 100% 8%) 60%, hsl(212 100% 5%) 100%)",
      }}
    >
      {/* Hero background image overlay */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-20"
        style={{ backgroundImage: "url('/hero-bg.jpg')" }}
        aria-hidden="true"
      />

      {/* Grid texture overlay */}
      <div
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage:
            "linear-gradient(hsl(var(--secondary)) 1px, transparent 1px), linear-gradient(90deg, hsl(var(--secondary)) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
        aria-hidden="true"
      />

      {/* Gold accent bar top */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-secondary" aria-hidden="true" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        {/* Alert badge */}
        <div className="inline-flex items-center gap-2 bg-secondary/15 border border-secondary/30 rounded-full px-4 py-2 mb-8">
          <span className="w-2 h-2 rounded-full bg-secondary animate-pulse" aria-hidden="true" />
          <span className="text-secondary text-sm font-semibold tracking-wide uppercase">
            95% of RTOs hide their pricing — we expose the real costs
          </span>
        </div>

        <div className="max-w-4xl">
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-white leading-tight text-balance mb-6">
            Australia&apos;s Independent{" "}
            <span
              className="text-secondary"
              style={{ textShadow: "0 0 40px rgba(201,162,39,0.4)" }}
            >
              RTO Comparison
            </span>{" "}
            Platform
          </h1>

          <p className="text-lg sm:text-xl text-white/70 leading-relaxed mb-10 max-w-2xl text-pretty">
            We analyse, compare, and audit Registered Training Organisations to protect consumers and
            drive transparency across Australian vocational education. Not an RTO — fully independent.
          </p>

          <div className="flex flex-wrap gap-4 mb-16">
            <Link
              href="#courses"
              className="inline-flex items-center gap-2 bg-secondary text-primary font-bold px-8 py-4 rounded-lg text-base hover:bg-secondary/90 transition-colors"
            >
              Compare RTOs Now
              <ArrowRight className="w-5 h-5" />
            </Link>
            <Link
              href="https://cpp41419.com.au/about"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 border border-white/20 text-white font-semibold px-8 py-4 rounded-lg text-base hover:bg-white/10 transition-colors"
            >
              About the Platform
            </Link>
          </div>

          {/* Trust stats row */}
          <div className="flex flex-wrap gap-8 sm:gap-12">
            {[
              { value: "25K+", label: "Students Guided" },
              { value: "12+", label: "Courses Analysed" },
              { value: "95%", label: "Compliance Score" },
              { value: "100%", label: "Independent" },
            ].map((stat) => (
              <div key={stat.label}>
                <div className="text-3xl font-bold text-secondary">{stat.value}</div>
                <div className="text-sm text-white/60 mt-0.5">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Feature strip */}
      <div className="relative z-10 border-t border-white/10 bg-black/30 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-3 divide-y sm:divide-y-0 sm:divide-x divide-white/10">
            {[
              {
                icon: <Eye className="w-5 h-5 text-secondary" />,
                title: "Price Transparency",
                desc: "We surface hidden fees and true costs across providers",
              },
              {
                icon: <ShieldCheck className="w-5 h-5 text-secondary" />,
                title: "Compliance Intelligence",
                desc: "ASQA regulatory signals tracked in real time",
              },
              {
                icon: <TrendingUp className="w-5 h-5 text-secondary" />,
                title: "Market Analysis",
                desc: "Live market-mean pricing and risk profiling per course",
              },
            ].map((feat) => (
              <div key={feat.title} className="flex items-start gap-4 px-6 py-5">
                <div className="mt-0.5 shrink-0">{feat.icon}</div>
                <div>
                  <div className="text-white font-semibold text-sm">{feat.title}</div>
                  <div className="text-white/55 text-sm leading-relaxed mt-0.5">{feat.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
