"use client"

import React, { useState, useMemo, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { parseData } from "@/lib/parse-data"
import type { Course } from "@/components/course-selection"
import type { EnrichedProvider } from "@/lib/types"
import { Users } from "lucide-react"

// Sub-components
import { ComparisonHeader } from "./comparison/ComparisonHeader"
import { ProviderTable } from "./comparison/ProviderTable"
import { EnquiryDialog } from "./comparison/EnquiryDialog"
import { ComparisonVisuals } from "./comparison/ComparisonVisuals"
import { IntentAgents, type IntentType } from "./comparison/IntentAgents"
import { ScenarioSelector, type Scenario } from "./comparison/ScenarioSelector"

const transformProviderData = (provider: EnrichedProvider) => {
  const audit = provider.audit
  const regulatory = audit.groups.regulatory
  const ux = audit.groups.ux
  const intent = audit.groups.intent
  const authority = audit.groups.authority
  const commercial = audit.groups.commercial

  return {
    id: provider.id,
    name: provider.name,
    score: provider.mdpa_score,
    overallScore: (provider.mdpa_score || 0).toString(),
    website: provider.website,
    website_secondary: provider.website_secondary,
    phone: provider.phone,
    email: provider.email,
    rto_code: provider.rto_code,
    price: provider.price,
    type: provider.type,
    status: provider.status,
    data: {
      "ASQA Registration": provider.status === "active" ? "Pass" : "Fail",
      "Scope Match": regulatory.score >= 60 ? "Pass" : "Fail",
      "Page Speed": Math.round(ux.score),
      "Mobile Usability": Math.round((ux.score + intent.score) / 2),
      "Course Completeness": Math.min(5, Math.max(1, Math.round(intent.score / 20))),
      "Price Transparency": Math.min(5, Math.max(1, Math.round(commercial.score / 20))),
      "Google Reviews": Number((3 + authority.score / 50).toFixed(1)),
      "Review Volume": Math.round(10 + (provider.mdpa_score || 0) * 2),
      "Review Recency": Math.min(5, Math.max(1, Math.round(authority.score / 20))),
    },
    rawScores: {
      regulatory: regulatory.score,
      ux: ux.score,
      intent: intent.score,
      authority: authority.score,
      commercial: commercial.score,
    }
  }
}

const generateStateProvidersData = () => {
  const providers = parseData()
  const states = ["NSW", "VIC", "QLD", "WA", "SA", "TAS", "ACT", "NT"]

  const stateProviders = Object.fromEntries(states.map(s => [s, [] as any[]]))

  providers.forEach((provider) => {
    const transformed = transformProviderData(provider)
    const state = provider.state

    if (stateProviders[state]) {
      stateProviders[state].push(transformed)
    }

    if (state === "Multi" || state === "National") {
      states.forEach((s) => {
        if (!stateProviders[s].find((p) => p.id === transformed.id)) {
          stateProviders[s].push({ ...transformed, id: `${transformed.id}-${s.toLowerCase()}` })
        }
      })
    }
  })

  // Sort providers by score
  Object.keys(stateProviders).forEach((state) => {
    stateProviders[state].sort((a, b) => b.score - a.score)
  })

  return {
    states: Object.fromEntries(Object.entries(stateProviders).map(([state, providers]) => [state, { providers }])),
    categories: {
      Compliance: ["ASQA Registration", "Scope Match"],
      Technical: ["Page Speed", "Mobile Usability"],
      Content: ["Course Completeness", "Price Transparency"],
      Trust: ["Google Reviews", "Review Volume", "Review Recency"],
    },
  }
}

const getWinner = (providers: any[], metric: string) => {
  if (!providers || providers.length === 0) return null

  if (metric === "ASQA Registration" || metric === "Scope Match") {
    const passProviders = providers.filter((p) => p.data[metric] === "Pass")
    return passProviders.length > 0 ? passProviders[0].id : providers[0].id
  }

  return providers.reduce((best, current) =>
    Number(current.data[metric]) > Number(best.data[metric]) ? current : best,
  ).id
}

const formatMetricValue = (metric: string, value: any) => {
  if (metric === "ASQA Registration" || metric === "Scope Match") return value
  if (metric === "Page Speed" || metric === "Mobile Usability") return `${value}/100`
  if (metric === "Course Completeness" || metric === "Price Transparency" || metric === "Review Recency") return `${value}/5`
  if (metric === "Google Reviews") return `${value} ★`
  if (metric === "Review Volume") return `${value} reviews`
  return value
}

interface ComparisonTableProps {
  selectedCourse: Course
}

export default function ComparisonTable({ selectedCourse }: ComparisonTableProps) {
  const stateProvidersData = useMemo(() => generateStateProvidersData(), [])
  const [selectedState, setSelectedState] = useState<string>("NSW")
  const [selectedProviders, setSelectedProviders] = useState<string[]>(["none", "none", "none"])
  const [enquiryProvider, setEnquiryProvider] = useState<any>(null)
  const [activeAgent, setActiveAgent] = useState<IntentType | null>(null)
  const [currentScenario, setCurrentScenario] = useState<string | null>(null)

  const handleStateSelect = (state: string) => {
    setSelectedState(state)
    const stateData = stateProvidersData.states[state]
    if (stateData && stateData.providers.length > 0) {
      const topProviders = stateData.providers.slice(0, 3).map((p: any) => p.id)
      setSelectedProviders([topProviders[0] || "none", topProviders[1] || "none", topProviders[2] || "none"])
    } else {
      setSelectedProviders(["none", "none", "none"])
    }
    setActiveAgent(null) // Reset agent on state change
    setCurrentScenario(null)
  }

  const handleProviderSelect = (index: number, providerId: string) => {
    const newProviders = [...selectedProviders]
    newProviders[index] = providerId
    setSelectedProviders(newProviders)
    setActiveAgent(null) // Reset agent on manual selection
    setCurrentScenario(null)
  }

  const handleSelectAgent = (intent: IntentType) => {
    setActiveAgent(intent)
    setCurrentScenario(null)
    const currentProviders = stateProvidersData.states[selectedState]?.providers || []
    if (currentProviders.length === 0) return

    let sorted = [...currentProviders]

    switch (intent) {
      case "compliance":
        sorted.sort((a, b) => {
          if (a.status === "active" && b.status !== "active") return -1
          if (a.status !== "active" && b.status === "active") return 1
          return b.rawScores.regulatory - a.rawScores.regulatory
        })
        break
      case "value":
        sorted.sort((a, b) => {
          const priceA = a.price || 99999
          const priceB = b.price || 99999
          if (priceA !== priceB) return priceA - priceB
          return b.score - a.score
        })
        break
      case "authority":
        sorted.sort((a, b) => b.rawScores.authority - a.rawScores.authority)
        break
      case "student-first":
        sorted.sort((a, b) => (b.rawScores.ux + b.rawScores.intent) - (a.rawScores.ux + a.rawScores.intent))
        break
    }

    const top3 = sorted.slice(0, 3).map(p => p.id)
    setSelectedProviders([top3[0] || "none", top3[1] || "none", top3[2] || "none"])
  }

  const handleSelectScenario = (scenario: Scenario) => {
    setCurrentScenario(scenario.id)
    setSelectedState(scenario.state)

    // First update the providers for the new state
    const currentProviders = stateProvidersData.states[scenario.state]?.providers || []
    if (currentProviders.length === 0) return

    // Then apply the agent logic
    setActiveAgent(scenario.intent)

    let sorted = [...currentProviders]
    switch (scenario.intent) {
      case "compliance":
        sorted.sort((a, b) => {
          if (a.status === "active" && b.status !== "active") return -1
          if (a.status !== "active" && b.status === "active") return 1
          return b.rawScores.regulatory - a.rawScores.regulatory
        })
        break
      case "value":
        sorted.sort((a, b) => {
          const priceA = a.price || 99999
          const priceB = b.price || 99999
          if (priceA !== priceB) return priceA - priceB
          return b.score - a.score
        })
        break
      case "authority":
        sorted.sort((a, b) => b.rawScores.authority - a.rawScores.authority)
        break
      case "student-first":
        sorted.sort((a, b) => (b.rawScores.ux + b.rawScores.intent) - (a.rawScores.ux + a.rawScores.intent))
        break
    }

    const top3 = sorted.slice(0, 3).map(p => p.id)
    setSelectedProviders([top3[0] || "none", top3[1] || "none", top3[2] || "none"])
  }

  const handleEnquirySubmit = async (formData: any) => {
    if (!enquiryProvider) return

    try {
      const response = await fetch("/api/submit-enquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          courseName: enquiryProvider.name,
          providerId: enquiryProvider.id,
          state: selectedState,
          courseCode: selectedCourse.code,
          courseQualification: selectedCourse.qualification,
        }),
      })

      if (response.ok) {
        alert("Enquiry submitted successfully! The RTO will contact you shortly.")
        setEnquiryProvider(null)
      } else {
        throw new Error("Failed to submit")
      }
    } catch (error) {
      console.error("Enquiry error:", error)
      alert("Failed to submit enquiry. Please try again or contact support.")
    }
  }

  const states = Object.keys(stateProvidersData.states)
  const currentProviders = stateProvidersData.states[selectedState]?.providers || []
  const compareProviders = selectedProviders
    .map((id) => currentProviders.find((p: any) => p.id === id))
    .filter(Boolean)

  const winnerProvider = compareProviders.length > 0
    ? compareProviders.reduce((best: any, current: any) =>
      Number.parseFloat(current.overallScore) > Number.parseFloat(best.overallScore) ? current : best
    )
    : null

  const agentCategoryMap: Record<IntentType, string> = {
    compliance: "Compliance",
    value: "Content",
    authority: "Trust",
    "student-first": "Technical",
  }

  return (
    <div className="w-full max-w-7xl mx-auto p-4 md:p-8 space-y-8 animate-in fade-in duration-700">
      <Card className="overflow-hidden border-none shadow-xl bg-white/50 backdrop-blur-sm">
        <ComparisonHeader
          course={selectedCourse}
          states={states}
          selectedState={selectedState}
          onStateSelect={handleStateSelect}
          providerCount={currentProviders.length}
        />

        <CardContent className="space-y-12 relative">
          {/* Top Scenarios Toolbar */}
          <div className="pt-6 border-t border-primary/5 pb-2">
            <ScenarioSelector onSelectScenario={handleSelectScenario} currentScenario={currentScenario} />
          </div>

          {/* Intent Agents Section */}
          <div className="space-y-6">
            <IntentAgents onSelectAgent={handleSelectAgent} activeAgent={activeAgent} />
          </div>

          <div className="space-y-6">
            <div className="flex flex-col space-y-2">
              <h3 className="text-lg font-bold text-primary flex items-center gap-2">
                <Users className="w-5 h-5 text-secondary" />
                Selected Providers
              </h3>
              <p className="text-sm text-muted-foreground">
                You can manually adjust the providers in each slot below.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {[0, 1, 2].map((i) => (
                <div key={i} className="space-y-2">
                  <Label className="text-xs font-bold text-primary/60 uppercase">Compare Slot {i + 1}</Label>
                  <Select
                    value={selectedProviders[i]}
                    onValueChange={(val) => handleProviderSelect(i, val)}
                  >
                    <SelectTrigger className="w-full h-11 border-primary/10 focus:ring-secondary focus:border-secondary transition-all bg-white/80">
                      <SelectValue placeholder="Select RTO..." />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="none">Empty Slot</SelectItem>
                      {currentProviders.map((p) => (
                        <SelectItem key={p.id} value={p.id} className="focus:bg-primary/5 cursor-pointer">
                          <div className="flex items-center justify-between w-full gap-4">
                            <span className="font-bold text-primary truncate">{p.name}</span>
                            <span className="marker-highlight text-primary font-black text-[10px] shrink-0 border border-secondary/20">
                              {p.score}
                            </span>
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              ))}
            </div>
          </div>

          {compareProviders.length > 0 && (
            <div className="animate-in slide-in-from-bottom-4 duration-500">
              <ComparisonVisuals compareProviders={compareProviders} activeAgent={activeAgent} />
            </div>
          )}

          {compareProviders.length > 0 ? (
            <ProviderTable
              compareProviders={compareProviders}
              categories={stateProvidersData.categories}
              getWinner={getWinner}
              formatMetricValue={formatMetricValue}
              onEnquiry={setEnquiryProvider}
              winnerProvider={winnerProvider}
              highlightCategory={activeAgent ? agentCategoryMap[activeAgent] : undefined}
              stickyOffset={120} // Account for sticky ComparisonHeader
            />
          ) : (
            <div className="flex flex-col items-center justify-center py-20 bg-muted/20 rounded-2xl border-2 border-dashed border-primary/5">
              <p className="text-muted-foreground font-medium">Please select up to three RTOs above to start your comparison.</p>
            </div>
          )}
        </CardContent>
      </Card>

      <EnquiryDialog
        isOpen={!!enquiryProvider}
        onOpenChange={(open) => !open && setEnquiryProvider(null)}
        provider={enquiryProvider}
        course={selectedCourse}
        onSubmit={handleEnquirySubmit}
      />
    </div>
  )
}
