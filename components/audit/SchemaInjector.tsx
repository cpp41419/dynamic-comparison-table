"use client"

import React from "react"
import { EnrichedProvider } from "@/lib/types"
import { getCourseConfig } from "@/lib/course-config"

interface SchemaInjectorProps {
    provider: EnrichedProvider
    courseCode?: string
}

export function SchemaInjector({ provider, courseCode }: SchemaInjectorProps) {
    // Auto-detect course context if not provided
    const config = getCourseConfig()
    const effectiveCourseCode = courseCode || config.courseCode

    const organizationSchema = {
        "@context": "https://schema.org",
        "@type": "EducationalOrganization",
        "@id": `https://training.gov.au/Organisation/Details/${provider.rto_code || provider.id}`,
        "name": provider.name,
        "url": provider.website,
        "sameAs": [
            `https://training.gov.au/Organisation/Details/${provider.rto_code || provider.id}`,
            provider.website_secondary
        ].filter(Boolean),
        "identifier": provider.rto_code,
        "address": {
            "@type": "PostalAddress",
            "addressLocality": provider.state,
            "addressCountry": "AU"
        },
        "sdPublisher": {
            "@type": "Organization",
            "name": "VET Qualification Hub Audit Engine",
            "url": config.siteUrl
        },
        "dateModified": provider.audit.last_audit,
        "review": {
            "@type": "Review",
            "reviewRating": {
                "@type": "Rating",
                "ratingValue": provider.mdpa_score,
                "bestRating": "100"
            },
            "author": {
                "@type": "Organization",
                "name": "VET Audit Engine"
            }
        }
    }

    // If a course code is provided, link this provider to the credential entity
    if (effectiveCourseCode && effectiveCourseCode !== 'GENERIC') {
        (organizationSchema as any).hasOfferCatalog = {
            "@type": "OfferCatalog",
            "name": "VET Qualifications",
            "itemListElement": [
                {
                    "@type": "Offer",
                    "itemOffered": {
                        "@type": "EducationalOccupationalCredential",
                        "@id": `https://training.gov.au/Training/Details/${effectiveCourseCode}`,
                        "name": `${effectiveCourseCode} - ${config.courseName}`,
                        "credentialCategory": "VET Qualification",
                        "recognizedBy": {
                            "@type": "Organization",
                            "name": "Australian Skills Quality Authority (ASQA)"
                        }
                    }
                }
            ]
        }
    }

    // Add breadcrumb schema for navigation
    const breadcrumbSchema = {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        "itemListElement": [
            {
                "@type": "ListItem",
                "position": 1,
                "name": "Home",
                "item": config.siteUrl.replace('/compare', '')
            },
            {
                "@type": "ListItem",
                "position": 2,
                "name": `Compare ${effectiveCourseCode} Providers`,
                "item": config.siteUrl
            }
        ]
    }

    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
            />
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
            />
        </>
    )
}
