"use client"

import { useState } from "react"
import { X, ExternalLink, Lock, TrendingUp, Users } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import type { Course } from "@/lib/courses"

interface AuditPanelProps {
  course: Course | null
  isOpen: boolean
  onClose: () => void
}

export function AuditPanel({ course, isOpen, onClose }: AuditPanelProps) {
  const [activeTab, setActiveTab] = useState<"placement" | "salary" | "staking">("placement")

  if (!course) return null

  return (
    <>
      {/* Backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40 transition-opacity duration-200"
          onClick={onClose}
          role="presentation"
        />
      )}

      {/* Slide-in Panel */}
      <div
        className={`fixed right-0 top-0 h-full w-full max-w-lg bg-white border-l border-soft-grey shadow-2xl z-50 transform transition-transform duration-300 overflow-y-auto ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Header */}
        <div className="sticky top-0 bg-white border-b border-soft-grey p-6">
          <div className="flex items-start justify-between gap-4 mb-4">
            <div className="flex-1">
              <h2 className="text-2xl font-bold text-foreground">
                {course.code}
              </h2>
              <p className="text-sm text-muted-foreground mt-1">
                {course.qualification}
              </p>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              aria-label="Close audit panel"
            >
              <X className="h-5 w-5 text-muted-foreground" />
            </button>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-3 gap-3">
            <div className="bg-gray-50 rounded-lg p-3">
              <p className="text-xs text-muted-foreground font-semibold uppercase">
                Placement Rate
              </p>
              <p className="text-lg font-bold text-primary mt-1">92%</p>
            </div>
            <div className="bg-gray-50 rounded-lg p-3">
              <p className="text-xs text-muted-foreground font-semibold uppercase">
                Avg Salary
              </p>
              <p className="text-lg font-bold text-primary mt-1">$75k</p>
            </div>
            <div className="bg-gray-50 rounded-lg p-3">
              <p className="text-xs text-muted-foreground font-semibold uppercase">
                Demand
              </p>
              <p className="text-lg font-bold text-primary mt-1">8.5/10</p>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="border-b border-soft-grey">
          <div className="flex gap-0">
            {[
              { id: "placement", label: "Placement" },
              { id: "salary", label: "Salary" },
              { id: "staking", label: "Staking" },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex-1 px-4 py-3 text-sm font-medium border-b-2 transition-colors ${
                  activeTab === tab.id
                    ? "border-primary text-primary"
                    : "border-transparent text-muted-foreground hover:text-foreground"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Placement Tab */}
          {activeTab === "placement" && (
            <div className="space-y-4">
              <div>
                <h3 className="text-sm font-semibold text-foreground flex items-center gap-2 mb-3">
                  <Users className="h-4 w-4 text-primary" />
                  Smart Audit Results
                </h3>
                <div className="bg-gray-50 rounded-lg p-4 space-y-3">
                  <div>
                    <p className="text-xs text-muted-foreground font-semibold mb-1">
                      Verified Placement Rate
                    </p>
                    <p className="text-base font-bold text-foreground">92% within 6 months</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground font-semibold mb-1">
                      Average Time to Placement
                    </p>
                    <p className="text-base font-bold text-foreground">3.2 months</p>
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-soft-grey">
                <h4 className="text-sm font-semibold text-foreground mb-3">
                  Job Placement Smart Contract
                </h4>
                <Badge variant="secondary" className="mb-3">
                  Verified on Blockchain
                </Badge>
                <p className="text-xs text-muted-foreground leading-relaxed mb-3">
                  Smart contract verifies placement outcomes on-chain. Graduates receive NFT badges upon job placement.
                </p>
                <Button variant="outline" size="sm" className="w-full text-xs gap-1">
                  <ExternalLink className="h-3 w-3" />
                  View Contract
                </Button>
              </div>
            </div>
          )}

          {/* Salary Tab */}
          {activeTab === "salary" && (
            <div className="space-y-4">
              <div>
                <h3 className="text-sm font-semibold text-foreground flex items-center gap-2 mb-3">
                  <TrendingUp className="h-4 w-4 text-primary" />
                  Salary Data
                </h3>
                <div className="bg-gray-50 rounded-lg p-4 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-muted-foreground font-semibold">
                      Average Salary
                    </span>
                    <span className="text-lg font-bold text-foreground">$75,000</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-muted-foreground font-semibold">
                      Range
                    </span>
                    <span className="text-lg font-bold text-foreground">$60k – $95k</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-muted-foreground font-semibold">
                      Salary Growth (3yr)
                    </span>
                    <span className="text-lg font-bold text-green-600">+18%</span>
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-soft-grey">
                <h4 className="text-sm font-semibold text-foreground mb-2">
                  Salary Verification
                </h4>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  Data sourced from anonymized employment records and verified through blockchain attestation.
                </p>
              </div>
            </div>
          )}

          {/* Staking Tab */}
          {activeTab === "staking" && (
            <div className="space-y-4">
              <div>
                <h3 className="text-sm font-semibold text-foreground flex items-center gap-2 mb-3">
                  <Lock className="h-4 w-4 text-primary" />
                  Stake-for-Tuition
                </h3>
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 space-y-3">
                  <div>
                    <p className="text-xs text-blue-700 font-semibold mb-1">
                      Estimated APR
                    </p>
                    <p className="text-2xl font-bold text-blue-900">8.5%</p>
                  </div>
                  <div>
                    <p className="text-xs text-blue-700 font-semibold mb-1">
                      Min. Stake
                    </p>
                    <p className="text-lg font-bold text-blue-900">$1,000 USDC</p>
                  </div>
                  <p className="text-xs text-blue-600 leading-relaxed">
                    Lock USDC tokens to earn yield while supporting educational initiatives. Stake gets returned upon graduation.
                  </p>
                </div>
              </div>

              <Button size="sm" className="w-full">
                Enable Staking
              </Button>

              <div className="pt-4 border-t border-soft-grey">
                <h4 className="text-sm font-semibold text-foreground mb-2">
                  How It Works
                </h4>
                <ol className="text-xs text-muted-foreground space-y-2 list-decimal list-inside">
                  <li>Deposit USDC into the staking contract</li>
                  <li>Earn daily APR on your stake</li>
                  <li>Withdraw any time or use earnings for tuition</li>
                  <li>Receive graduation NFT badge</li>
                </ol>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  )
}
