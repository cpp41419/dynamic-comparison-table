import Link from "next/link"
import { ArrowUpRight, Globe, Mail, MapPin } from "lucide-react"

const domains = [
  { label: "cpp41419.com.au", href: "https://cpp41419.com.au", desc: "Real Estate Training Analysis" },
  { label: "cpp51122.com.au", href: "https://cpp51122.com.au", desc: "Diploma of Property" },
  { label: "bsb50820.com.au", href: "https://bsb50820.com.au", desc: "Diploma of Project Management" },
  { label: "bsb50420.com.au", href: "https://bsb50420.com.au", desc: "Diploma of Leadership" },
  { label: "fns50322.com.au", href: "https://fns50322.com.au", desc: "Diploma of Mortgage Broking" },
  { label: "hlt54121.com.au", href: "https://hlt54121.com.au", desc: "Diploma of Nursing" },
]

const platformLinks = [
  { label: "Compare RTOs", href: "#courses" },
  { label: "Course Index", href: "#courses" },
  { label: "Risk Profiles", href: "#courses" },
  { label: "Market Pricing", href: "#courses" },
]

const resourceLinks = [
  { label: "About the Platform", href: "https://cpp41419.com.au/about" },
  { label: "Tribune Reports", href: "https://cpp41419.com.au" },
  { label: "State Licensing Guides", href: "https://cpp41419.com.au" },
  { label: "Contact Us", href: "https://cpp41419.com.au/contact" },
]

const legalLinks = [
  { label: "Privacy Policy", href: "#" },
  { label: "Terms of Use", href: "#" },
  { label: "Editorial Standards", href: "#" },
  { label: "Compliance Report", href: "#" },
]

export default function SiteFooter() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-primary text-primary-foreground">
      {/* Gold top rule */}
      <div className="h-1 bg-secondary" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 mb-12">

          {/* Brand column */}
          <div className="lg:col-span-1">
            <Link href="/" className="inline-block mb-4">
              <span className="text-secondary font-bold text-xl font-mono tracking-tight">CPP41419</span>
              <div className="text-white/40 text-xs uppercase tracking-widest mt-0.5">Comparison Platform</div>
            </Link>
            <p className="text-sm text-white/55 leading-relaxed mb-5">
              Australia&apos;s independent RTO analysis and comparison platform. Not an RTO — 100% editorially independent.
            </p>
            <div className="space-y-2 text-sm text-white/50">
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-secondary shrink-0" />
                <a href="mailto:hello@cpp41419.com.au" className="hover:text-secondary transition-colors">
                  hello@cpp41419.com.au
                </a>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-secondary shrink-0" />
                <span>Brisbane &amp; Sydney, Australia</span>
              </div>
            </div>
          </div>

          {/* Platform links */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-widest text-secondary mb-4">Platform</h4>
            <ul className="space-y-2.5">
              {platformLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-white/60 hover:text-secondary transition-colors inline-flex items-center gap-1.5 group"
                  >
                    {link.label}
                    <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources links */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-widest text-secondary mb-4">Resources</h4>
            <ul className="space-y-2.5">
              {resourceLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-white/60 hover:text-secondary transition-colors inline-flex items-center gap-1.5 group"
                  >
                    {link.label}
                    <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal links */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-widest text-secondary mb-4">Legal</h4>
            <ul className="space-y-2.5">
              {legalLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-white/60 hover:text-secondary transition-colors inline-flex items-center gap-1.5 group"
                  >
                    {link.label}
                    <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Verify */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-widest text-secondary mb-4">Verify</h4>
            <ul className="space-y-2.5">
              {[
                { label: "training.gov.au", href: "https://training.gov.au" },
                { label: "asqa.gov.au", href: "https://asqa.gov.au" },
                { label: "accc.gov.au", href: "https://accc.gov.au" },
                { label: "oaic.gov.au", href: "https://oaic.gov.au" },
              ].map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-white/60 hover:text-secondary transition-colors inline-flex items-center gap-1.5 group font-mono"
                  >
                    {link.label}
                    <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Domain network section */}
        <div className="border-t border-white/10 pt-10 mb-8">
          <div className="flex items-center gap-2 mb-5">
            <Globe className="w-4 h-4 text-secondary" />
            <h4 className="text-xs font-bold uppercase tracking-widest text-secondary">Our Domain Network</h4>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
            {domains.map((d) => (
              <a
                key={d.href}
                href={d.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group bg-white/5 hover:bg-secondary/15 border border-white/10 hover:border-secondary/30 rounded-lg p-3 transition-all duration-200"
              >
                <div className="text-xs font-mono font-semibold text-white/80 group-hover:text-secondary transition-colors truncate">
                  {d.label}
                </div>
                <div className="text-xs text-white/40 mt-1 leading-tight">{d.desc}</div>
              </a>
            ))}
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-white/10 pt-6">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <p className="text-xs text-white/40 leading-relaxed max-w-xl">
              &copy; {currentYear} CPP41419.com.au. All rights reserved. This platform is NOT a Registered Training Organisation.
              We do not deliver training or issue qualifications. Built by{" "}
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
            <div className="flex gap-4 shrink-0">
              <span className="inline-flex items-center gap-1.5 text-xs text-white/40">
                <span className="w-2 h-2 rounded-full bg-green-400" />
                Compliance: 95/100
              </span>
              <span className="text-xs text-white/40">Last audit: Dec 2025</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
