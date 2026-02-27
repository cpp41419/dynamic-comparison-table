export type ExpertType = "guardian" | "optimizer" | "authority" | "sonic" | null;

export interface ExpertMetrics {
  complianceScore: number; // 0-100: regulatory alignment
  costEffectiveness: number; // 0-100: value for money
  qualityScore: number; // 0-100: trust & reviews
  uxRating: number; // 0-100: digital experience
  registrationStatus: "active" | "inactive" | "pending";
  trustScore: number; // 0-100: overall trust
  mobileUXScore: number; // 0-100: mobile usability
}

export interface Course extends ExpertMetrics {
  id: string;
  code: string;
  title: string;
  provider: string;
  price: number;
  duration: string;
  rating: number;
  reviews: number;
  highlight: string;
  score: number;
}

export const experts = [
  {
    id: "guardian",
    name: "Guardian",
    title: "Compliance Specialist",
    description: "Focuses on regulatory alignment, status, and registration validity.",
    icon: "🛡️",
    color: "from-blue-600 to-blue-700",
    accentColor: "text-blue-600",
    bgColor: "bg-blue-50 dark:bg-blue-950/20",
    borderColor: "border-blue-200 dark:border-blue-800",
    sortBy: ["complianceScore", "registrationStatus", "trustScore"],
  },
  {
    id: "optimizer",
    name: "Optimizer",
    title: "Budget Strategist",
    description: "Prioritizes cost-efficiency without compromising registration status.",
    icon: "💰",
    color: "from-emerald-600 to-emerald-700",
    accentColor: "text-emerald-600",
    bgColor: "bg-emerald-50 dark:bg-emerald-950/20",
    borderColor: "border-emerald-200 dark:border-emerald-800",
    sortBy: ["costEffectiveness", "complianceScore", "qualityScore"],
  },
  {
    id: "authority",
    name: "Authority",
    title: "Quality Auditor",
    description: "Highlights providers with the highest trust scores and reviews.",
    icon: "⭐",
    color: "from-amber-600 to-amber-700",
    accentColor: "text-amber-600",
    bgColor: "bg-amber-50 dark:bg-amber-950/20",
    borderColor: "border-amber-200 dark:border-amber-800",
    sortBy: ["trustScore", "qualityScore", "rating"],
  },
  {
    id: "sonic",
    name: "Sonic",
    title: "UX Researcher",
    description: "Focuses on digital experience, speed, and mobile usability.",
    icon: "⚡",
    color: "from-violet-600 to-violet-700",
    accentColor: "text-violet-600",
    bgColor: "bg-violet-50 dark:bg-violet-950/20",
    borderColor: "border-violet-200 dark:border-violet-800",
    sortBy: ["mobileUXScore", "uxRating", "rating"],
  },
];

export function filterAndRankCourses(
  courses: Course[],
  expertType: ExpertType
): Course[] {
  if (!expertType) return courses;

  const expert = experts.find((e) => e.id === expertType);
  if (!expert) return courses;

  // Filter: Only show courses with valid registration status for Guardian
  let filtered = courses;
  if (expertType === "guardian") {
    filtered = courses.filter((c) => c.registrationStatus === "active");
  }

  // Rank based on expert priorities
  return filtered.sort((a, b) => {
    for (const metric of expert.sortBy) {
      const aValue = a[metric as keyof Course] as number;
      const bValue = b[metric as keyof Course] as number;

      if (aValue !== bValue) {
        return bValue - aValue;
      }
    }
    return 0;
  });
}

export function getExpertBadgeText(expert: ExpertType, course: Course): string {
  switch (expert) {
    case "guardian":
      return `Compliance Score: ${course.complianceScore}%`;
    case "optimizer":
      return `Value Score: ${course.costEffectiveness}%`;
    case "authority":
      return `Trust Score: ${course.trustScore}%`;
    case "sonic":
      return `UX Score: ${course.mobileUXScore}%`;
    default:
      return "";
  }
}

export function getExpertMetricColor(expert: ExpertType, value: number): string {
  if (value >= 80) return "text-emerald-600 dark:text-emerald-400";
  if (value >= 60) return "text-amber-600 dark:text-amber-400";
  return "text-red-600 dark:text-red-400";
}
