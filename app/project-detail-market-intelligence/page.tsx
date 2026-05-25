import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { MarketIntelligenceProjectTabs } from "@/components/market-intelligence-project-tabs"

export default function MarketIntelligenceProjectPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-950">
      <div className="bg-white dark:bg-gray-800 shadow-sm sticky top-0 z-10">
        <div className="container mx-auto max-w-[90rem] px-4 py-4 flex items-center gap-4">
          <Link
            href="/#projects"
            className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400 hover:text-purple-600 dark:hover:text-purple-400 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Portfolio
          </Link>
        </div>
      </div>

      <div className="container mx-auto max-w-[90rem] px-4 py-12">
        <div className="mb-10">
          <h1 className="text-4xl font-bold mb-3 leading-tight">Market Intelligence MCP</h1>
          <p className="text-lg text-gray-600 dark:text-gray-400 mb-5">
            FastMCP Server for Pharma Competitive Landscape Analysis
          </p>
          <div className="flex flex-wrap gap-2">
            {["FastMCP", "MCP", "API Integration", "Pharma Data", "Python"].map((tag) => (
              <Badge key={tag} variant="outline" className="bg-purple-100/50 dark:bg-purple-900/50">
                {tag}
              </Badge>
            ))}
          </div>
        </div>

        <MarketIntelligenceProjectTabs />
      </div>
    </div>
  )
}
