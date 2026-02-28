import Link from "next/link"
import { ArrowUpRight, Globe, Mail, MapPin, ShieldCheck } from "lucide-react"

const domains = [
  {
    code: "CPP41419",
    label: "cpp41419.com.au",
    href: "https://cpp41419.com.au",
    desc: "Certificate IV in Real Estate Practice — analysis, comparison, and consumer protection.",
    category: "Property",
  },
  {
    code: "CPP51122",
    label: "cpp51122.com.au",
    href: "https://cpp51122.com.au",
    desc: "Diploma of Property (Agency Management) — advanced analysis platform.",
    category: "Property",
  },
  {
    code: "BSB50820",
    label: "bsb50820.com.au",
    href: "https://bsb50820.com.au",
    desc: "Diploma of Project Management — independent RTO comparison.",
    category: "Business",
  },
  {
    code: "BSB50420",
    label: "bsb50420.com.au",
    href: "https://bsb50420.com.au",
    desc: "Diploma of Leadership & Management — RTO comparison platform.",
    category: "Business",
  },
  {
    code: "FNS50322",
    label: "fns50322.com.au",
    href: "https://fns50322.com.au",
    desc: "Diploma of Finance & Mortgage Broking Management — independent analysis.",
    category: "Finance",
  },
  {
    code: "HLT54121",
    label: "hlt54121.com.au",
    href: "https://hlt54121.com.au",
    desc: "Diploma of Nursing — compliance-driven RTO analysis and comparison.",
    category: "Health",
  },
]

const platformLinks = [
  { label: "Compare RTOs", href: "#courses" },
  { label: "Course Index", href: "#courses" },
  { label: "Risk Profiles", href: "#courses" },
  { label: "Market Pricing", href: "#courses" },
  { label: "Compliance Analysis", href: "#courses" },
]

const resourceLinks = [
  { label: "About the Platform", href: "https://cpp41419.com.au/about", external: true },
  { label: "Tribune Reports", href: "https://cpp41419.com.au", external: true },
  { label: "State Licensing Guides", href: "https://cpp41419.com.au", external: true },
  { label: "Career Pathways", href: "https://cpp41419.com.au", external: true },
  { label: "Contact Us", href: "https://cpp41419.com.au/contact", external: true },
]

const legalLinks = [
  { label: "Privacy Policy", href: "#" },
  { label: "Terms of Use", href: "#" },
  { label: "Editorial Standards", href: "#" },
  { label: "Disclaimer", href: "#" },
  { label: "Compliance Report", href: "#" },
]

const verifyLinks = [
  { label: "training.gov.au", href: "https://training.gov.au" },
  { label: "asqa.gov.au", href: "https://asqa.gov.au" },
  { label: "accc.gov.au", href: "https://accc.gov.au" },
  { label: "oaic.gov.au", href: "https://oaic.gov.au" },
  { label: "fairtrading.nsw.gov.au", href: "https://fairtrading.nsw.gov.au" },
]

const categoryColors: Record<string, string> = {
  Property: "text-blue-400 bg-blue-400/10 border-blue-400/20",
  Business: "text-emerald-400 bg-emerald-400/10 border-emerald-400/20",
  Finance: "text-amber-400 bg-amber-400/10 border-amber-400/20",
  Health: "text-rose-400 bg-rose-400/10 border-rose-400/20",
}

export default function SiteFooter() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-primary text-primary-foreground" aria-label="Site footer">
      {/* Gold rule */}
      <div className="h-[3px] bg-secondary" />

      {/* Domain network */}
      <div className="border-b border-white/8 bg-black/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <div className="flex items-center justify-between mb-6 flex-wrap gap-3">
            <div className="flex items-center gap-2.5">
              <Globe className="w-4 h-4 text-secondary" aria-hidden="true" />
              <span className="text-[10px] font-bold uppercase tracking-[0.18em] text-secondary">
                Our Domain Network
              </span>
            </div>
            <p className="text-xs text-white/35">
              Independent analysis platforms across Australia&apos;s key vocational qualifications.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
            {domains.map((d) => (
              <a
                key={d.href}
                href={d.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex flex-col gap-2.5 bg-white/4 hover:bg-secondary/10 border border-white/8 hover:border-secondary/25 rounded-xl p-4 transition-all duration-200"
              >
                <div className="flex items-center justify-between gap-2">
                  <span className="font-mono font-bold text-sm text-white/85 group-hover:text-secondary transition-colors">
                    {d.label}
                  </span>
                  <div className="flex items-center gap-1.5 shrink-0">
                    <span className={`text-[9px] font-bold uppercase tracking-wide px-1.5 py-0.5 rounded border ${categoryColors[d.category]}`}>
                      {d.category}
                    </span>
                    <ArrowUpRight className="w-3.5 h-3.5 text-white/25 group-hover:text-secondary/60 transition-colors" aria-hidden="true" />
                  </div>
                </div>
                <p className="text-xs text-white/40 leading-relaxed">{d.desc}</p>
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* Main footer columns */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-10 mb-12">

          {/* Brand column — wider */}
          <div className="lg:col-span-2">
            <Link href="/" className="inline-flex flex-col mb-5" aria-label="CPP41419 home">
              <span className="text-secondary font-bold text-xl font-mono tracking-tight leading-none">CPP41419</span>
              <span className="text-white/35 text-[9px] font-semibold uppercase tracking-[0.18em] mt-1">
                Comparison Platform
              </span>
            </Link>

            <p className="text-sm text-white/50 leading-relaxed mb-6 max-w-xs">
              Australia&apos;s independent RTO analysis and comparison platform. Not an RTO — 100% editorially independent, funded by no training provider.
            </p>

            <div className="flex flex-col gap-2.5 text-sm text-white/45">
              <a
                href="mailto:hello@cpp41419.com.au"
                className="flex items-center gap-2 hover:text-secondary transition-colors group w-fit"
              >
                <Mail className="w-3.5 h-3.5 text-secondary shrink-0" aria-hidden="true" />
                hello@cpp41419.com.au
              </a>
              <div className="flex items-center gap-2">
                <MapPin className="w-3.5 h-3.5 text-secondary shrink-0" aria-hidden="true" />
                Brisbane &amp; Sydney, Australia
              </div>
            </div>

            {/* Independence badge */}
            <div className="mt-6 inline-flex items-center gap-2 border border-secondary/20 bg-secondary/6 rounded-lg px-3 py-2">
              <ShieldCheck className="w-3.5 h-3.5 text-secondary shrink-0" aria-hidden="true" />
              <span className="text-[10px] font-semibold text-secondary/80 uppercase tracking-wide">
                Not an RTO — Fully Independent
              </span>
            </div>
          </div>

          {/* Platform */}
          <div>
            <h4 className="text-[10px] font-bold uppercase tracking-[0.18em] text-secondary mb-4">Platform</h4>
            <ul className="flex flex-col gap-2.5">
              {platformLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-white/55 hover:text-secondary transition-colors inline-flex items-center gap-1 group"
                  >
                    {link.label}
                    <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-60 transition-opacity" aria-hidden="true" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h4 className="text-[10px] font-bold uppercase tracking-[0.18em] text-secondary mb-4">Resources</h4>
            <ul className="flex flex-col gap-2.5">
              {resourceLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    target={link.external ? "_blank" : undefined}
                    rel={link.external ? "noopener noreferrer" : undefined}
                    className="text-sm text-white/55 hover:text-secondary transition-colors inline-flex items-center gap-1 group"
                  >
                    {link.label}
                    <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-60 transition-opacity" aria-hidden="true" />
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="text-[10px] font-bold uppercase tracking-[0.18em] text-secondary mb-4">Legal</h4>
            <ul className="flex flex-col gap-2.5">
              {legalLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-white/55 hover:text-secondary transition-colors inline-flex items-center gap-1 group"
                  >
                    {link.label}
                    <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-60 transition-opacity" aria-hidden="true" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Verify */}
          <div>
            <h4 className="text-[10px] font-bold uppercase tracking-[0.18em] text-secondary mb-4">Verify</h4>
            <ul className="flex flex-col gap-2.5">
              {verifyLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-white/55 hover:text-secondary transition-colors inline-flex items-center gap-1 group font-mono text-xs"
                  >
                    {link.label}
                    <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-60 transition-opacity" aria-hidden="true" />
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-white/8 pt-7 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <p className="text-xs text-white/35 leading-relaxed max-w-xl">
            &copy; {currentYear} CPP41419.com.au. All rights reserved. This platform is NOT a Registered Training Organisation and does not deliver training or issue qualifications. Independent editorial platform operated by{" "}
            <a
              href="https://cpp41419.com.au"
              className="underline underline-offset-2 hover:text-secondary transition-colors"
              target="_blank"
              rel="noopener noreferrer"
            >
              Antigravity
            </a>
            .
          </p>
          <div className="flex items-center gap-4 shrink-0">
            <div className="flex items-center gap-1.5 text-xs text-white/35">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" aria-hidden="true" />
              Compliance: 95/100
            </div>
            <span className="text-xs text-white/25">Audited Mar 2025</span>
          </div>
        </div>
      </div>
    </footer>
  )
}
