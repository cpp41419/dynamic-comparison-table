import { EnrichedProvider, Course } from "./types"

/**
 * AuditEngine: The core logic for calculating RTO Digital Maturity,
 * Market Alpha, and Learner Sustainability.
 */

export interface MarketMetrics {
    medianPrice: number
    meanScore: number
    providerCount: number
}

export interface SustainabilityVerdict {
    status: "CRITICAL" | "CAUTION" | "STABLE"
    attritionLabel: string
    failureLabel: string
    insight: string
}

export const calculateMarketAlpha = (
    providers: EnrichedProvider[],
    state: string
): MarketMetrics => {
    const stateProviders = providers.filter(p => p.state === state || p.state === "Multi" || p.state === "National")
    const prices = stateProviders.map(p => p.price).filter((p): p is number => p !== null)
    const scores = stateProviders.map(p => p.mdpa_score)

    const sortedPrices = [...prices].sort((a, b) => a - b)
    const medianPrice = sortedPrices.length > 0
        ? sortedPrices[Math.floor(sortedPrices.length / 2)]
        : 0

    const meanScore = scores.length > 0
        ? Math.round(scores.reduce((a, b) => a + b, 0) / scores.length)
        : 0

    return {
        medianPrice,
        meanScore,
        providerCount: stateProviders.length,
    }
}

export const getSustainabilityVerdict = (
    provider: EnrichedProvider,
    market: MarketMetrics
): SustainabilityVerdict => {
    const s = provider.audit.sustainability
    if (!s) {
        return {
            status: "STABLE",
            attritionLabel: "Data Pending",
            failureLabel: "Data Pending",
            insight: "Insufficient inventory data for a sustainability audit."
        }
    }

    const isDPlus = s.inventory_depth === "D+" || s.inventory_depth === "D"
    const isHighRisk = s.attrition_risk >= 0.8
    const priceDiff = provider.price && market.medianPrice
        ? ((provider.price - market.medianPrice) / market.medianPrice) * 100
        : 0

    let status: SustainabilityVerdict["status"] = "STABLE"
    if (isHighRisk || isDPlus) status = "CRITICAL"
    else if (s.wcag_barrier_count > 20) status = "CAUTION"

    const attritionLabel = `${Math.round(s.attrition_risk * 100)}% Continuity Variance`
    const failureLabel = `${Math.round(s.failure_rate * 100)}% Non-Completion Sig.`

    // Computational Insight Generation (The "Clear Insight")
    let insight = ""
    if (status === "CRITICAL") {
        insight = `This provider aligns with a "D Plus" inventory profile. At $${provider.price}, this pricing reflects a ${Math.abs(Math.round(priceDiff))}% ${priceDiff > 0 ? "premium" : "variance"} against the market median, correlating with the 80% 12-month transition signature common in this support class.`
    } else {
        insight = `This provider maintains a competitive digital footprint. Market metadata suggests performance is ${provider.mdpa_score > market.meanScore ? "above" : "below"} the state maturity baseline of ${market.meanScore}.`
    }

    return {
        status,
        attritionLabel,
        failureLabel,
        insight
    }
}

export const getNetworkAffinityLabel = (provider: EnrichedProvider): string | null => {
    if (provider.operational_pattern === "Operational Continuity Profile") {
        return "Shares operational metadata with previously registered entities."
    }
    if (provider.operational_pattern === "Registry Disclosure Pending") {
        return "External regulatory disclosure files are currently under review."
    }
    return null
}
