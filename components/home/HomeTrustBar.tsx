import { ShieldAlert, Scale, Newspaper, BookOpen, ArrowRight } from "lucide-react"
import Link from "next/link"

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

const howItWorks = [
  { step: "01", title: "Select a Course", desc: "Choose from our index of nationally recognised qualifications tracked by the platform." },
  { step: "02", title: "Compare Providers", desc: "Review side-by-side RTO data: pricing, delivery mode, compliance history, and risk profile." },
  { step: "03", title: "Verify & Enrol", desc: "Confirm your chosen RTO on training.gov.au, then enrol directly — no middlemen." },
]

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

      {/* ── How it works ── */}
      <section className="bg-primary py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <div className="flex items-center justify-center gap-2 text-secondary text-[10px] font-bold uppercase tracking-[0.18em] mb-3">
              <span className="w-6 h-px bg-secondary" aria-hidden="true" />
              How It Works
              <span className="w-6 h-px bg-secondary" aria-hidden="true" />
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold text-white text-balance">
              Three Steps to the Right RTO
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-0 relative">
            {/* Connector line */}
            <div
              className="absolute top-10 left-[16.67%] right-[16.67%] h-px bg-white/10 hidden md:block"
              aria-hidden="true"
            />

            {howItWorks.map((step, i) => (
              <div key={step.step} className="relative flex flex-col items-center text-center px-8 pb-10 md:pb-0">
                {/* Step number */}
                <div className="relative z-10 flex items-center justify-center w-20 h-20 rounded-2xl bg-primary border-2 border-secondary/30 mb-6">
                  <span className="text-secondary font-mono font-bold text-2xl">{step.step}</span>
                </div>
                <h3 className="font-bold text-white text-lg mb-3">{step.title}</h3>
                <p className="text-white/50 text-sm leading-relaxed max-w-[220px]">{step.desc}</p>

                {/* Connector arrow (mobile) */}
                {i < howItWorks.length - 1 && (
                  <div className="md:hidden mt-6 text-white/20 text-2xl" aria-hidden="true">↓</div>
                )}
              </div>
            ))}
          </div>

          <div className="mt-14 text-center">
            <Link
              href="#courses"
              className="inline-flex items-center gap-2 bg-secondary text-primary font-bold px-8 py-3.5 rounded text-sm hover:bg-secondary/90 transition-colors"
            >
              Browse Courses
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
