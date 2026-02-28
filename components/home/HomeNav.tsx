"use client"

import Link from "next/link"
import { useState, useEffect } from "react"
import { Menu, X } from "lucide-react"

const navLinks = [
  { label: "Compare RTOs", href: "#courses" },
  { label: "About", href: "https://cpp41419.com.au/about" },
  { label: "Contact", href: "https://cpp41419.com.au/contact" },
  { label: "Verify RTO", href: "https://training.gov.au", external: true },
]

export default function HomeNav() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <header
      className={`fixed top-1 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? "bg-primary/95 backdrop-blur-md shadow-lg shadow-black/30" : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2.5 group">
            <span className="text-secondary font-bold text-xl tracking-tight font-mono">CPP41419</span>
            <span className="hidden sm:block text-white/40 text-xs font-medium mt-1 uppercase tracking-widest">
              Comparison Platform
            </span>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-1" aria-label="Main navigation">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                target={link.external ? "_blank" : undefined}
                rel={link.external ? "noopener noreferrer" : undefined}
                className="px-4 py-2 text-sm font-medium text-white/70 hover:text-secondary transition-colors rounded-md hover:bg-white/5"
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="#courses"
              className="ml-4 bg-secondary text-primary text-sm font-bold px-5 py-2 rounded-md hover:bg-secondary/90 transition-colors"
            >
              Start Comparing
            </Link>
          </nav>

          {/* Mobile toggle */}
          <button
            className="md:hidden text-white/70 hover:text-white p-2"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileOpen}
          >
            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden bg-primary border-t border-white/10">
          <nav className="max-w-7xl mx-auto px-4 py-4 flex flex-col gap-1" aria-label="Mobile navigation">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                target={link.external ? "_blank" : undefined}
                rel={link.external ? "noopener noreferrer" : undefined}
                className="px-4 py-3 text-sm font-medium text-white/70 hover:text-secondary rounded-md hover:bg-white/5 transition-colors"
                onClick={() => setMobileOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="#courses"
              className="mt-2 bg-secondary text-primary text-sm font-bold px-5 py-3 rounded-md text-center hover:bg-secondary/90 transition-colors"
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
