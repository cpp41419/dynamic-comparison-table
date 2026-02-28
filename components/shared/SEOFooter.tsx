import Link from "next/link"
import { ExternalLink } from "lucide-react"

export function SEOFooter() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-white border-t border-soft-grey mt-16">
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-16">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          {/* About Section */}
          <section>
            <h3 className="text-lg font-bold text-foreground mb-4">EdTech FinTech</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Revolutionizing vocational education with DeFi features, NFT credentials, and crypto-friendly learning paths.
            </p>
          </section>

          {/* Platform Links */}
          <section>
            <h4 className="text-sm font-bold text-foreground uppercase tracking-wide mb-4">
              Platform
            </h4>
            <nav className="space-y-3">
              <Link
                href="/"
                className="text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                Compare Courses
              </Link>
              <Link
                href="/compare"
                className="text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                Advanced Comparison
              </Link>
              <Link
                href="/rto"
                className="text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                RTO Directory
              </Link>
            </nav>
          </section>

          {/* Features */}
          <section>
            <h4 className="text-sm font-bold text-foreground uppercase tracking-wide mb-4">
              Features
            </h4>
            <nav className="space-y-3">
              <a
                href="#crypto-accepted"
                className="text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                Crypto Payments
              </a>
              <a
                href="#nft-credentials"
                className="text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                NFT Credentials
              </a>
              <a
                href="#defi-rewards"
                className="text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                DeFi Rewards
              </a>
            </nav>
          </section>

          {/* Connect */}
          <section>
            <h4 className="text-sm font-bold text-foreground uppercase tracking-wide mb-4">
              Connect
            </h4>
            <nav className="space-y-3">
              <a
                href="https://twitter.com/edtech-fintech"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-muted-foreground hover:text-foreground transition-colors inline-flex items-center gap-1"
              >
                Twitter <ExternalLink className="h-3 w-3" />
              </a>
              <a
                href="https://linkedin.com/company/edtech-fintech"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-muted-foreground hover:text-foreground transition-colors inline-flex items-center gap-1"
              >
                LinkedIn <ExternalLink className="h-3 w-3" />
              </a>
              <a
                href="mailto:support@edtech-fintech.com"
                className="text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                Contact
              </a>
            </nav>
          </section>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-soft-grey pt-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <p className="text-xs text-muted-foreground">
              © {currentYear} EdTech FinTech Course Comparison Platform. All rights reserved.
            </p>

            <nav className="flex flex-wrap gap-6 text-xs text-muted-foreground">
              <Link
                href="/privacy"
                className="hover:text-foreground transition-colors"
              >
                Privacy Policy
              </Link>
              <Link
                href="/terms"
                className="hover:text-foreground transition-colors"
              >
                Terms of Service
              </Link>
              <Link
                href="/sitemap"
                className="hover:text-foreground transition-colors"
              >
                Sitemap
              </Link>
              <a
                href="/robots.txt"
                className="hover:text-foreground transition-colors"
              >
                Robots.txt
              </a>
            </nav>
          </div>
        </div>
      </div>
    </footer>
  )
}
