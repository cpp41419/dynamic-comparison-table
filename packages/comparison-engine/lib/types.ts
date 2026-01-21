export interface Metric {
  label: string
  value: number
  weight: number
}

export interface CategoryGroup {
  label: string
  score: number
  metrics: Metric[]
}

export interface SustainableMetrics {
  attrition_risk: number // e.g. 0.8 for 80%
  failure_rate: number   // e.g. 0.7 for 70%
  inventory_depth: "D" | "D+" | "C" | "B" | "A" // Semantic density
  wcag_barrier_count: number
  w3c_compliant: boolean
}

export interface AuditData {
  groups: {
    regulatory: CategoryGroup
    intent: CategoryGroup
    ux: CategoryGroup
    performance: CategoryGroup
    accessibility: CategoryGroup
    commercial: CategoryGroup
    authority: CategoryGroup
  }
  overall_score: number
  last_audit: string
  sustainability?: SustainableMetrics
}

export interface RawProvider {
  id: string
  name: string
  website: string
  website_secondary?: string | null
  state: string
  type: string
  price: number | null
  mdpa_score: number
  status: string
  phone: string | null
  email: string | null
  rto_code: string
  operational_pattern?: string // Ambiguous label for Phoenix/Network signatures
  network_id?: string // For grouping Phoenix siblings
}

export interface EnrichedProvider extends RawProvider {
  contact_name: string
  address: string
  audit: AuditData
}
