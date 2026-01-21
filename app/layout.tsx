import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import { getCourseConfig, generateCourseMetadata } from '@/lib/course-config'
import './globals.css'

const _geist = Geist({ subsets: ["latin"] });
const _geistMono = Geist_Mono({ subsets: ["latin"] });

export const viewport = {
  width: 'device-width',
  initialScale: 1,
}

// Generate dynamic metadata based on course context
const courseConfig = getCourseConfig()
const courseMetadata = generateCourseMetadata(courseConfig)

export const metadata: Metadata = {
  title: courseMetadata.title,
  description: courseMetadata.description,
  generator: 'Authority Design System',
  keywords: courseMetadata.keywords,
  authors: [{ name: 'Antigravity' }],
  robots: 'index, follow',
  alternates: {
    canonical: courseMetadata.canonical,
  },
  openGraph: {
    title: courseMetadata.openGraph.title,
    description: courseMetadata.openGraph.description,
    url: courseMetadata.openGraph.url,
    siteName: courseMetadata.openGraph.siteName,
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`font-sans antialiased`}>
        {children}
        {/* <Analytics /> */}
      </body>
    </html>
  )
}
