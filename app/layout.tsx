import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import { getCourseConfig, generateCourseMetadata } from '@/lib/course-config'
import { generateOrganizationSchema, generateSearchActionSchema, renderSchemaScript } from '@/lib/structured-data'
import './globals.css'

const _geist = Geist({ subsets: ["latin"] });
const _geistMono = Geist_Mono({ subsets: ["latin"] });

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#FFFFFF',
  colorScheme: 'light',
  viewportFit: 'cover',
  userScalable: true,
}

// Generate dynamic metadata based on course context
const courseConfig = getCourseConfig()
const courseMetadata = generateCourseMetadata(courseConfig)

export const metadata: Metadata = {
  title: {
    default: 'EdTech FinTech Course Comparison | Compare DeFi Programs & NFT Credentials',
    template: '%s | Course Comparison Platform',
  },
  description: courseMetadata.description || 'Compare vocational courses with DeFi features, NFT credentials, and crypto payment options. Find the best RTO providers for your education.',
  generator: 'Next.js + Authority Design System',
  keywords: [
    'course comparison',
    'EdTech platform',
    'FinTech courses',
    'DeFi education',
    'NFT credentials',
    'crypto learning',
    'vocational training',
    'RTO comparison',
    'online education',
    'blockchain courses',
    courseMetadata.keywords || 'education, courses'
  ].filter(Boolean),
  authors: [{ name: 'EdTech FinTech Team' }],
  creator: 'EdTech FinTech Platform',
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  alternates: {
    canonical: courseMetadata.canonical || 'https://edtech-fintech-platform.com',
  },
  openGraph: {
    title: courseMetadata.openGraph?.title || 'EdTech FinTech Course Comparison Platform',
    description: courseMetadata.openGraph?.description || 'Compare DeFi-enabled courses, NFT credentials, and financial incentives for vocational training.',
    url: courseMetadata.openGraph?.url || 'https://edtech-fintech-platform.com',
    siteName: courseMetadata.openGraph?.siteName || 'EdTech FinTech Comparison',
    type: 'website',
    locale: 'en_AU',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'EdTech FinTech Course Comparison Platform',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'EdTech FinTech Course Comparison',
    description: 'Compare DeFi-enabled vocational courses with NFT credentials',
    images: ['/twitter-image.jpg'],
  },
  verification: {
    google: 'google-site-verification-code',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const organizationSchema = generateOrganizationSchema()
  const searchActionSchema = generateSearchActionSchema()

  return (
    <html lang="en" className="scroll-smooth">
      <head>
        {/* Organization Schema */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: renderSchemaScript(organizationSchema),
          }}
        />
        {/* Search Action Schema */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: renderSchemaScript(searchActionSchema),
          }}
        />
        {/* Preconnect to external resources */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body className={`font-sans antialiased bg-white text-foreground`}>
        {children}
        {/* <Analytics /> */}
      </body>
    </html>
  )
}
