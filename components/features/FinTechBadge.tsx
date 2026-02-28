"use client"

import { Bitcoin, Gift, Zap, Lock, TrendingUp } from "lucide-react"

export type FinTechFeature = 
  | "crypto-accepted"
  | "nft-credential"
  | "learn-now-pay-later"
  | "stake-to-learn"
  | "dao-access"
  | "defi-rewards"

interface FinTechBadgeProps {
  feature: FinTechFeature
  size?: "sm" | "md" | "lg"
}

export function FinTechBadge({ feature, size = "md" }: FinTechBadgeProps) {
  const config = {
    "crypto-accepted": {
      label: "Crypto Accepted",
      icon: Bitcoin,
      color: "bg-blue-50 text-blue-700 border-blue-200",
    },
    "nft-credential": {
      label: "NFT Credential",
      icon: Gift,
      color: "bg-purple-50 text-purple-700 border-purple-200",
    },
    "learn-now-pay-later": {
      label: "Learn Now, Pay Later",
      icon: Zap,
      color: "bg-amber-50 text-amber-700 border-amber-200",
    },
    "stake-to-learn": {
      label: "Stake-to-Learn",
      icon: Lock,
      color: "bg-green-50 text-green-700 border-green-200",
    },
    "dao-access": {
      label: "DAO Access",
      icon: TrendingUp,
      color: "bg-indigo-50 text-indigo-700 border-indigo-200",
    },
    "defi-rewards": {
      label: "DeFi Rewards",
      icon: TrendingUp,
      color: "bg-cyan-50 text-cyan-700 border-cyan-200",
    },
  }

  const { label, icon: Icon, color } = config[feature]

  const sizeClasses = {
    sm: "px-2 py-0.5 text-xs gap-1",
    md: "px-3 py-1 text-sm gap-1.5",
    lg: "px-4 py-2 text-base gap-2",
  }

  const iconSizes = {
    sm: "h-3 w-3",
    md: "h-4 w-4",
    lg: "h-5 w-5",
  }

  return (
    <div
      className={`inline-flex items-center rounded-full border font-semibold ${color} ${sizeClasses[size]}`}
    >
      <Icon className={iconSizes[size]} aria-hidden="true" />
      <span>{label}</span>
    </div>
  )
}

interface FinTechBadgeListProps {
  features: FinTechFeature[]
  size?: "sm" | "md" | "lg"
  className?: string
}

export function FinTechBadgeList({ features, size = "sm", className = "" }: FinTechBadgeListProps) {
  return (
    <div className={`flex flex-wrap gap-2 ${className}`}>
      {features.map((feature) => (
        <FinTechBadge key={feature} feature={feature} size={size} />
      ))}
    </div>
  )
}

export function FinTechBadgeCompact({ feature }: { feature: FinTechFeature }) {
  const icons = {
    "crypto-accepted": Bitcoin,
    "nft-credential": Gift,
    "learn-now-pay-later": Zap,
    "stake-to-learn": Lock,
    "dao-access": TrendingUp,
    "defi-rewards": TrendingUp,
  }

  const Icon = icons[feature]

  return (
    <span
      className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-gray-100 text-gray-700"
      title={feature.replace(/-/g, " ")}
    >
      <Icon className="h-3.5 w-3.5" aria-label={feature.replace(/-/g, " ")} />
    </span>
  )
}
