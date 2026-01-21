// Main components
export { default as CourseSelection } from './components/course-selection'
export { default as ComparisonTable } from './components/ComparisonTable'

// Comparison components
export { ComparisonHeader } from './components/comparison/ComparisonHeader'
export { CourseGrid } from './components/comparison/CourseGrid'
export { HeroSection } from './components/comparison/HeroSection'
export { Footer } from './components/comparison/Footer'

// Audit components
export { AuditEngineInjected } from './components/audit/AuditEngineInjected'
export { TrustSignature } from './components/audit/TrustSignature'
export { AccountabilityScorecard } from './components/audit/AccountabilityScorecard'
export { SustainabilityGauge } from './components/audit/SustainabilityGauge'
export { SchemaInjector } from './components/audit/SchemaInjector'

// Utilities
export { parseData } from './lib/parse-data'
export { calculateMarketAlpha, getSustainabilityVerdict } from './lib/audit-engine'
export { getCourseConfig, generateCourseMetadata, detectCourseContext } from './lib/course-config'

// Types
export type { EnrichedProvider } from './lib/types'
