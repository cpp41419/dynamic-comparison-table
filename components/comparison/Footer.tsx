"use client"

import Link from "next/link"
import "@/app/course-page.css"

export default function Footer() {
    const currentYear = new Date().getFullYear()
    
    return (
        <footer className="bg-slate-900 text-slate-100 mt-20">
            {/* Main Footer Content */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
                    {/* Brand Section */}
                    <div className="col-span-1">
                        <h3 className="text-lg font-bold text-amber-400 mb-2">Vet Intell</h3>
                        <p className="text-slate-300 text-sm">
                            Intelligent course comparison and selection tools for veterinary education professionals.
                        </p>
                    </div>

                    {/* Navigation */}
                    <div>
                        <h4 className="font-semibold text-white mb-4">Navigation</h4>
                        <ul className="space-y-2 text-slate-300 text-sm">
                            <li><Link href="/" className="hover:text-amber-400 transition">Home</Link></li>
                            <li><Link href="/compare" className="hover:text-amber-400 transition">Compare Courses</Link></li>
                            <li><Link href="#" className="hover:text-amber-400 transition">Resources</Link></li>
                            <li><Link href="#" className="hover:text-amber-400 transition">Blog</Link></li>
                        </ul>
                    </div>

                    {/* Support */}
                    <div>
                        <h4 className="font-semibold text-white mb-4">Support</h4>
                        <ul className="space-y-2 text-slate-300 text-sm">
                            <li><Link href="#" className="hover:text-amber-400 transition">Help Center</Link></li>
                            <li><Link href="#" className="hover:text-amber-400 transition">Contact Us</Link></li>
                            <li><Link href="#" className="hover:text-amber-400 transition">Feedback</Link></li>
                            <li><Link href="#" className="hover:text-amber-400 transition">API Docs</Link></li>
                        </ul>
                    </div>

                    {/* Legal */}
                    <div>
                        <h4 className="font-semibold text-white mb-4">Legal</h4>
                        <ul className="space-y-2 text-slate-300 text-sm">
                            <li><Link href="#" className="hover:text-amber-400 transition">Privacy Policy</Link></li>
                            <li><Link href="#" className="hover:text-amber-400 transition">Terms of Service</Link></li>
                            <li><Link href="#" className="hover:text-amber-400 transition">Disclaimer</Link></li>
                            <li><Link href="#" className="hover:text-amber-400 transition">Cookie Policy</Link></li>
                        </ul>
                    </div>
                </div>

                {/* Divider */}
                <div className="border-t border-slate-700 pt-8">
                    <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                        <p className="text-slate-400 text-sm">
                            © {currentYear} Vet Intell. All rights reserved. | Trusted by veterinary education professionals worldwide.
                        </p>
                        <div className="flex gap-4">
                            <Link href="#" className="text-slate-400 hover:text-amber-400 transition text-sm">Twitter</Link>
                            <Link href="#" className="text-slate-400 hover:text-amber-400 transition text-sm">LinkedIn</Link>
                            <Link href="#" className="text-slate-400 hover:text-amber-400 transition text-sm">GitHub</Link>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    )
}
