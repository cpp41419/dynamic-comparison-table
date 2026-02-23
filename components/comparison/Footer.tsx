"use client"

import Link from "next/link"
import { ArrowUpRight, Mail, MapPin, Phone } from "lucide-react"
import "@/app/course-page.css"

export default function Footer() {
    const currentYear = new Date().getFullYear()
    
    const footerLinks = {
        product: [
            { label: "Features", href: "#" },
            { label: "Pricing", href: "#" },
            { label: "Security", href: "#" },
            { label: "Roadmap", href: "#" }
        ],
        company: [
            { label: "About Us", href: "#" },
            { label: "Blog", href: "#" },
            { label: "Careers", href: "#" },
            { label: "Press Kit", href: "#" }
        ],
        resources: [
            { label: "Help Center", href: "#" },
            { label: "Documentation", href: "#" },
            { label: "API Reference", href: "#" },
            { label: "Guides", href: "#" }
        ],
        legal: [
            { label: "Privacy", href: "#" },
            { label: "Terms", href: "#" },
            { label: "Cookies", href: "#" },
            { label: "Compliance", href: "#" }
        ]
    }

    return (
        <footer className="relative bg-gradient-to-br from-primary via-primary to-primary/95 text-primary-foreground mt-24 overflow-hidden">
            {/* Decorative background elements */}
            <div className="absolute top-0 right-0 w-96 h-96 bg-secondary/10 rounded-full blur-3xl -translate-y-1/2" />
            <div className="absolute bottom-0 left-0 w-80 h-80 bg-accent/10 rounded-full blur-3xl translate-y-1/2" />

            <div className="relative z-10">
                {/* Main Content */}
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 mb-12">
                        {/* Brand Section */}
                        <div className="lg:col-span-1">
                            <div className="mb-6">
                                <h3 className="text-xl font-bold text-secondary mb-2">Vet Intell</h3>
                                <p className="text-sm text-primary-foreground/70 leading-relaxed">
                                    Intelligent comparison and selection tools for veterinary education excellence.
                                </p>
                            </div>
                            <div className="space-y-3 text-sm text-primary-foreground/60">
                                <div className="flex items-center gap-2">
                                    <Mail className="w-4 h-4 text-secondary" />
                                    <span>hello@vetintell.com</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <Phone className="w-4 h-4 text-secondary" />
                                    <span>+61 (02) 1234 5678</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <MapPin className="w-4 h-4 text-secondary" />
                                    <span>Sydney, Australia</span>
                                </div>
                            </div>
                        </div>

                        {/* Product Links */}
                        <div>
                            <h4 className="font-semibold text-sm uppercase tracking-wider text-secondary mb-4">Product</h4>
                            <ul className="space-y-2.5">
                                {footerLinks.product.map((link) => (
                                    <li key={link.label}>
                                        <Link href={link.href} className="text-sm text-primary-foreground/70 hover:text-secondary transition-colors duration-200 inline-flex items-center gap-1.5 group">
                                            {link.label}
                                            <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Company Links */}
                        <div>
                            <h4 className="font-semibold text-sm uppercase tracking-wider text-secondary mb-4">Company</h4>
                            <ul className="space-y-2.5">
                                {footerLinks.company.map((link) => (
                                    <li key={link.label}>
                                        <Link href={link.href} className="text-sm text-primary-foreground/70 hover:text-secondary transition-colors duration-200 inline-flex items-center gap-1.5 group">
                                            {link.label}
                                            <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Resources Links */}
                        <div>
                            <h4 className="font-semibold text-sm uppercase tracking-wider text-secondary mb-4">Resources</h4>
                            <ul className="space-y-2.5">
                                {footerLinks.resources.map((link) => (
                                    <li key={link.label}>
                                        <Link href={link.href} className="text-sm text-primary-foreground/70 hover:text-secondary transition-colors duration-200 inline-flex items-center gap-1.5 group">
                                            {link.label}
                                            <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Legal Links */}
                        <div>
                            <h4 className="font-semibold text-sm uppercase tracking-wider text-secondary mb-4">Legal</h4>
                            <ul className="space-y-2.5">
                                {footerLinks.legal.map((link) => (
                                    <li key={link.label}>
                                        <Link href={link.href} className="text-sm text-primary-foreground/70 hover:text-secondary transition-colors duration-200 inline-flex items-center gap-1.5 group">
                                            {link.label}
                                            <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>

                    {/* Bottom Section */}
                    <div className="border-t border-primary-foreground/10 pt-8">
                        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
                            <p className="text-sm text-primary-foreground/60">
                                © {currentYear} Vet Intell. All rights reserved. Trusted by veterinary education professionals.
                            </p>
                            <div className="flex gap-6">
                                <Link href="#" className="text-sm text-primary-foreground/60 hover:text-secondary transition-colors">Twitter</Link>
                                <Link href="#" className="text-sm text-primary-foreground/60 hover:text-secondary transition-colors">LinkedIn</Link>
                                <Link href="#" className="text-sm text-primary-foreground/60 hover:text-secondary transition-colors">GitHub</Link>
                                <Link href="#" className="text-sm text-primary-foreground/60 hover:text-secondary transition-colors">Discord</Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    )
}
