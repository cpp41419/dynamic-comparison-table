export interface Course {
    code: string
    qualification: string
    riskProfile: "HIGH RISK" | "MODERATE" | "SAFE HARBOUR" | "CRITICAL"
    trend: string
    marketMean: string
    auditAction: string
}

export const courses: Course[] = [
    {
        code: "BSB50820",
        qualification: "Dip. Project Mgmt",
        riskProfile: "HIGH RISK",
        trend: "Volatility",
        marketMean: "$3,000",
        auditAction: "Audit Hidden Costs",
    },
    {
        code: "BSB50420",
        qualification: "Dip. Leadership",
        riskProfile: "MODERATE",
        trend: "Price Drop",
        marketMean: "$3,500",
        auditAction: "Check Support Quality",
    },
    {
        code: "BSB40520",
        qualification: "Cert IV Leadership",
        riskProfile: "SAFE HARBOUR",
        trend: "Stable",
        marketMean: "$2,350",
        auditAction: "Standard Enrolment",
    },
    {
        code: "CPP51122",
        qualification: "Dip. Property",
        riskProfile: "MODERATE",
        trend: "Vertical",
        marketMean: "$4,750",
        auditAction: "Verify Agency Logic",
    },
    {
        code: "CPP41419",
        qualification: "Cert IV Real Estate",
        riskProfile: "SAFE HARBOUR",
        trend: "Signal",
        marketMean: "$3,250",
        auditAction: "Validated Pathway",
    },
    {
        code: "CPP-GUIDE",
        qualification: "Licensing Handbook",
        riskProfile: "SAFE HARBOUR",
        trend: "Static",
        marketMean: "FREE",
        auditAction: "High-Value Anchor",
    },
    {
        code: "FNS50322",
        qualification: "Dip. Mortgage Broking",
        riskProfile: "SAFE HARBOUR",
        trend: "Stable",
        marketMean: "$2,300",
        auditAction: "Standard Enrolment",
    },
    {
        code: "FNS40821",
        qualification: "Cert IV Finance",
        riskProfile: "CRITICAL",
        trend: "On Sale",
        marketMean: "$1,600",
        auditAction: "Liquidity Alert",
    },
    {
        code: "HLT54121",
        qualification: "Diploma of Nursing",
        riskProfile: "HIGH RISK",
        trend: "Inelastic",
        marketMean: "$20,000",
        auditAction: "Clinical Placement Audit",
    },
    {
        code: "CHC33021",
        qualification: "Cert III Individual Support",
        riskProfile: "MODERATE",
        trend: "Volatility",
        marketMean: "$2,500",
        auditAction: "Check RTO Reputation",
    },
    {
        code: "CHC43015",
        qualification: "Cert IV Ageing Support",
        riskProfile: "SAFE HARBOUR",
        trend: "Stable",
        marketMean: "$3,000",
        auditAction: "Standard Enrolment",
    },
    {
        code: "UEE30820",
        qualification: "Cert III Electrotechnology",
        riskProfile: "MODERATE",
        trend: "Licensing",
        marketMean: "$8,500",
        auditAction: "Verify Apprentice Funding",
    },
]
