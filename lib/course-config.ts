/**
 * Course Configuration & Context Detection
 * 
 * Detects the course context from environment variables or domain
 * and generates course-specific metadata for SEO uniqueness.
 */

export interface CourseConfig {
    courseCode: string
    courseName: string
    siteUrl: string
    deploymentMode: 'route' | 'subdomain' | 'standalone'
    state?: string
}

/**
 * Course metadata mapping
 * Add your courses here to auto-generate proper titles and descriptions
 */
const COURSE_METADATA: Record<string, { name: string; description: string }> = {
    CPP41419: {
        name: "Certificate IV in Real Estate Practice",
        description: "Compare CPP41419 training providers with registry-validated compliance data, sustainability metrics, and true cost analysis."
    },
    BSB40520: {
        name: "Certificate IV in Leadership and Management",
        description: "Compare BSB40520 training providers with independent audit data, market intelligence, and institutional accountability scores."
    },
    CHC43015: {
        name: "Certificate IV in Ageing Support",
        description: "Compare CHC43015 training providers with compliance verification, sustainability benchmarks, and transparent cost breakdowns."
    },
    CHC33021: {
        name: "Certificate III in Individual Support",
        description: "Compare CHC33021 training providers with registry-validated data, attrition risk analysis, and market positioning."
    },
    UEE30820: {
        name: "Certificate III in Electrotechnology Electrician",
        description: "Compare UEE30820 training providers with technical audit scores, compliance verification, and true cost transparency."
    },
    // Add more courses as needed
}

/**
 * Detects course context from environment or domain
 */
export function detectCourseContext(): CourseConfig {
    // Priority 1: Explicit environment variables
    const envCourseCode = process.env.NEXT_PUBLIC_COURSE_CODE
    const envSiteUrl = process.env.NEXT_PUBLIC_SITE_URL
    const envDeploymentMode = process.env.NEXT_PUBLIC_DEPLOYMENT_MODE as 'route' | 'subdomain' | 'standalone'
    const envState = process.env.NEXT_PUBLIC_STATE

    if (envCourseCode && envSiteUrl) {
        return {
            courseCode: envCourseCode.toUpperCase(),
            courseName: COURSE_METADATA[envCourseCode.toUpperCase()]?.name || envCourseCode,
            siteUrl: envSiteUrl,
            deploymentMode: envDeploymentMode || 'route',
            state: envState
        }
    }

    // Priority 2: Detect from domain (for production deployments)
    if (typeof window !== 'undefined') {
        const hostname = window.location.hostname
        const detectedCode = detectCourseCodeFromDomain(hostname)

        if (detectedCode) {
            return {
                courseCode: detectedCode,
                courseName: COURSE_METADATA[detectedCode]?.name || detectedCode,
                siteUrl: `https://${hostname}`,
                deploymentMode: hostname.startsWith('compare.') ? 'subdomain' : 'route',
                state: envState
            }
        }
    }

    // Fallback: Generic comparison engine
    return {
        courseCode: 'GENERIC',
        courseName: 'VET Training Providers',
        siteUrl: envSiteUrl || 'https://rto-comparison.com.au',
        deploymentMode: 'standalone',
        state: envState
    }
}

/**
 * Attempts to extract course code from domain name
 * Examples:
 * - cpp41419.com.au -> CPP41419
 * - compare.cpp41419.com.au -> CPP41419
 * - bsb40520.edu.au -> BSB40520
 */
function detectCourseCodeFromDomain(hostname: string): string | null {
    // Remove 'compare.' prefix if present
    const cleanHostname = hostname.replace(/^compare\./, '')

    // Extract potential course code (first part of domain)
    const parts = cleanHostname.split('.')
    if (parts.length === 0) return null

    const potentialCode = parts[0].toUpperCase()

    // Validate it matches known course pattern (3-6 letters + 5 digits)
    const coursePattern = /^[A-Z]{3,6}\d{5}$/
    if (coursePattern.test(potentialCode) && COURSE_METADATA[potentialCode]) {
        return potentialCode
    }

    return null
}

/**
 * Generates course-specific metadata for SEO
 */
export function generateCourseMetadata(config: CourseConfig) {
    const metadata = COURSE_METADATA[config.courseCode]
    const isGeneric = config.courseCode === 'GENERIC'

    return {
        title: isGeneric
            ? 'RTO Comparison Tool | Compare Training Providers & True Costs'
            : `Compare ${config.courseCode} Providers | ${metadata?.name || config.courseName}`,

        description: metadata?.description ||
            `Independent comparison of ${config.courseCode} training providers with registry-validated data, sustainability metrics, and trust signals.`,

        canonical: config.siteUrl,

        keywords: isGeneric
            ? ['RTO', 'VET', 'Training Providers', 'Comparison', 'Course Costs', 'Compliance']
            : ['RTO', 'VET', config.courseCode, config.courseName, 'Training Providers', 'Comparison', 'Compliance'],

        openGraph: {
            title: isGeneric
                ? 'RTO Comparison Tool'
                : `Compare ${config.courseCode} Training Providers`,
            description: metadata?.description || `Independent comparison of ${config.courseCode} providers`,
            url: config.siteUrl,
            siteName: isGeneric ? 'RTO Comparison' : `${config.courseCode} Provider Comparison`,
            type: 'website'
        }
    }
}

/**
 * Gets the current course configuration (memoized for performance)
 */
let cachedConfig: CourseConfig | null = null

export function getCourseConfig(): CourseConfig {
    if (!cachedConfig) {
        cachedConfig = detectCourseContext()
    }
    return cachedConfig
}

/**
 * Resets the cached configuration (useful for testing)
 */
export function resetCourseConfig() {
    cachedConfig = null
}
