"use client"

import dynamic from "next/dynamic"

const MarketIntelligenceComparison = dynamic(
  () =>
    import("@/components/market-intelligence-comparison").then((mod) => mod.MarketIntelligenceComparison),
  {
    ssr: false,
    loading: () => (
      <div className="flex items-center justify-center py-16 text-sm text-gray-500 dark:text-gray-400">
        Loading comparison…
      </div>
    ),
  }
)

export function MarketIntelligenceDisplay() {
  return <MarketIntelligenceComparison />
}
