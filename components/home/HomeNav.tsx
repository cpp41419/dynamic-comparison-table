"use client"

import Link from "next/link"
import { useState, useEffect } from "react"
import { Menu, X, ExternalLink } from "lucide-react"

const navLinks = [
  { label: "Compare RTOs", href: "#courses" },
  { label: "About", href: "https://cpp41419.com.au/about", external: true },
  { label: "Resources", href: "https://cpp41419.com.au", external: true },
  { label: "Contact", href: "https://cpp41419.com.au/contact", external: true },
]

export default function HomeNav() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-primary/97 backdrop-blur-md shadow-2xl shadow-black/40 border-b border-white/8"
          : "bg-transparent"
      }`}
    >
      {/* Gold top rule — always visible */}
      <div className="h-[3px] bg-secondary" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-14">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group" aria-label="CPP41419 Comparison Platform home">
            <div className="flex flex-col leading-none">
              <span className="text-secondary font-bold text-lg tracking-tight font-mono">CPP41419</span>
              <span className="text-white/35 text-[9px] font-semibold uppercase tracking-[0.2em]">
                Comparison Platform
              </span>
            </div>
            <div className="hidden sm:block w-px h-7 bg-white/15" aria-hidden="true" />
            <span className="hidden sm:block text-white/40 text-[10px] uppercase tracking-widest font-medium">
              Australia&apos;s Independent RTO Analyst
            </span>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-0.5" aria-label="Main navigation">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                target={link.external ? "_blank" : undefined}
                rel={link.external ? "noopener noreferrer" : undefined}
                className="flex items-center gap-1 px-3.5 py-2 text-sm font-medium text-white/65 hover:text-white transition-colors rounded-md hover:bg-white/6"
              >
                {link.label}
                {link.external && <ExternalLink className="w-3 h-3 opacity-50" />}
              </Link>
            ))}
            <div className="w-px h-5 bg-white/15 mx-2" aria-hidden="true" />
            <a
              href="https://training.gov.au"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 px-3.5 py-2 text-sm font-medium text-white/40 hover:text-white/70 transition-colors rounded-md hover:bg-white/5"
            >
              Verify RTO
              <ExternalLink className="w-3 h-3" />
            </a>
            <Link
              href="#courses"
              className="ml-3 bg-secondary text-primary text-sm font-bold px-5 py-2 rounded hover:bg-secondary/90 transition-colors"
            >
              Start Comparing
            </Link>
          </nav>

          {/* Mobile toggle */}
          <button
            className="md:hidden text-white/70 hover:text-white p-2 rounded transition-colors"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileOpen}
            aria-controls="mobile-nav"
          >
            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div id="mobile-nav" className="md:hidden bg-primary border-t border-white/10">
          <nav className="max-w-7xl mx-auto px-4 py-4 flex flex-col gap-1" aria-label="Mobile navigation">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                target={link.external ? "_blank" : undefined}
                rel={link.external ? "noopener noreferrer" : undefined}
                className="flex items-center justify-between px-4 py-3 text-sm font-medium text-white/65 hover:text-white rounded hover:bg-white/6 transition-colors"
                onClick={() => setMobileOpen(false)}
              >
                {link.label}
                {link.external && <ExternalLink className="w-3.5 h-3.5 opacity-40" />}
              </Link>
            ))}
            <div className="h-px bg-white/10 my-1" />
            <Link
              href="#courses"
              className="bg-secondary text-primary text-sm font-bold px-5 py-3 rounded text-center hover:bg-secondary/90 transition-colors mt-1"
              onClick={() => setMobileOpen(false)}
            >
              Start Comparing
            </Link>
          </nav>
        </div>
      )}
    </header>
  )
}
