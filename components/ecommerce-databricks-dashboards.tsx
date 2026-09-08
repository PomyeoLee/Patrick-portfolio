"use client"

import { useRef, useState } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { DatabricksDashboardEmbed } from "@/components/databricks-dashboard-embed"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { cn } from "@/lib/utils"

type DashboardNarrative = {
  id: string
  tabLabel: string
  dashboardId: string
  title: string
  question: string
  findings: string[]
  implications: string[]
  actions: string[]
}

const ECOMMERCE_DASHBOARDS: DashboardNarrative[] = [
  {
    id: "executive",
    tabLabel: "Executive Overview",
    dashboardId: "01f1a7c1e26114608f65e40f35654a44",
    title: "Dashboard 1 — Executive Overview",
    question: "How is the business performing, and where should management focus its attention?",
    findings: [
      "Monthly active identities increased from approximately 1.40M in June to 6.20M in November.",
      "November was the peak full month for purchases, with approximately 529K purchases.",
      "The lifetime purchase rate was 4.08%, indicating a browse-heavy business.",
      "Searchers converted at 19.63%, compared with 2.85% for non-searchers.",
      "Approximately 61.52% of identities were inactive for 45+ days.",
    ],
    implications: [
      "The business is growing primarily through increased activity and traffic, but customer engagement does not consistently translate into purchases. Management should focus on improving conversion and retention rather than measuring success only through traffic growth.",
    ],
    actions: [
      "Prioritize browse-to-cart conversion.",
      "Investigate the search-to-purchase journey.",
      "Monitor customer inactivity and repeat purchase behavior.",
      "Use monthly seasonality to support staffing and promotional planning.",
    ],
  },
  {
    id: "conversion",
    tabLabel: "Conversion & Funnel",
    dashboardId: "01f1a7b0e313131dab068140923e564d",
    title: "Dashboard 2 — Conversion & Funnel Analysis",
    question:
      "Where do customers drop out of the purchase journey, and how quickly do high-intent customers convert?",
    findings: [
      "Approximately 98.7% of active identities browsed or searched, while only 10.5% added products to their cart.",
      "Among identities that ever added to cart, approximately 39.0% purchased.",
      "63.5% of buyers with a prior cart addition purchased within 15 minutes.",
      "73.7% purchased within 60 minutes.",
      "Searchers converted at 19.63%, compared with 2.85% for non-searchers.",
    ],
    implications: [
      "The largest opportunity is not simply attracting more visitors. It is helping existing visitors move from browsing to cart addition and completing purchases while their intent is still high.",
      "Search appears to be a particularly strong conversion lever, while the short time between cart addition and purchase suggests that timely interventions may be effective.",
    ],
    actions: [
      "Improve product discovery and the browse-to-cart experience.",
      "Reduce friction during checkout.",
      "Investigate cart abandonment within the first 15–60 minutes.",
      "Improve search placement, relevance, and search-to-cart pathways.",
      "Avoid scaling acquisition before conversion efficiency improves.",
    ],
  },
  {
    id: "product",
    tabLabel: "Product & Category",
    dashboardId: "01f1a7c2d9ea18cf9279ce15088b14eb",
    title: "Dashboard 3 — Product & Category Performance",
    question: "Which products and categories generate demand, and which create conversion friction?",
    findings: [
      "Category 258 generated the highest purchase volume, with approximately 53K purchases.",
      "Category 2964 had a higher cart-to-buyer conversion rate of approximately 51%.",
      "Several high-intent SKUs received hundreds of cart additions but had close rates below 10%.",
      "Some categories showed unusually high removal rates, indicating potential product, pricing, or data-grain issues.",
    ],
    implications: [
      "High sales volume does not necessarily mean high conversion efficiency. The business should distinguish between categories that generate demand and categories that successfully convert that demand.",
      "High-intent, low-close products should be investigated as potential sources of customer friction.",
    ],
    actions: [
      "Create a product-level friction queue.",
      "Investigate high-cart, low-purchase SKUs.",
      "Review pricing, availability, product information, and checkout behavior.",
      "Separate high-volume categories from high-efficiency categories.",
      "Validate unusually high removal rates before making operational decisions.",
    ],
  },
  {
    id: "segmentation",
    tabLabel: "Customer Segmentation",
    dashboardId: "01f1a7c2da7410aebd531eb12d92a64b",
    title: "Dashboard 4 — Customer Segmentation & Retention",
    question:
      "Who are the customers, which segments create value, and where should retention efforts focus?",
    findings: [
      "Approximately 84.4% of identities were classified as Browsers.",
      "Repeat and Power buyers together represented approximately 457K customers, or about half of buyers.",
      "Approximately 82,955 repeat buyers had been inactive for more than 90 days.",
      "These inactive repeat buyers had a relatively high average proxy CLV.",
      "The current RFM labels were not reliable and should not be used for business decisions until the scoring direction is corrected.",
    ],
    implications: [
      "The customer base is dominated by low-engagement identities, while a smaller group of repeat buyers represents a concentrated retention opportunity.",
      "Broadly targeting all inactive identities would be inefficient because most inactive identities are browsers rather than established customers.",
    ],
    actions: [
      "Prioritize win-back campaigns for inactive repeat buyers.",
      "Protect and grow Repeat and Power buyer segments.",
      "Use behavioral segments instead of the current RFM labels.",
      "Avoid treating all inactive identities as equally valuable.",
      "Develop separate strategies for browsers, cart users, one-time buyers, and repeat buyers.",
    ],
  },
  {
    id: "search",
    tabLabel: "Search & Discovery",
    dashboardId: "01f1a7b450501be08f41c14ae629ab10",
    title: "Dashboard 5 — Search & Discovery",
    question:
      "How does search behavior relate to purchase conversion, and where can search improve the customer journey?",
    findings: [
      "Searchers converted at 19.63%, compared with 2.85% for non-searchers.",
      "Searchers represented approximately 7.3% of identities but 35.2% of buyers.",
      "Approximately 1.31M searchers never purchased.",
      "Purchaser-searchers averaged 16.8 searches, compared with 6.0 searches among searchers who never purchased.",
    ],
    implications: [
      "Search is associated with substantially higher purchase intent. However, many searchers still fail to purchase, suggesting opportunities to improve search relevance, product discovery, and the transition from search to cart.",
      "The relationship is observational and does not establish that search alone causes higher conversion.",
    ],
    actions: [
      "Improve search relevance and ranking.",
      "Investigate searchers with high activity but no purchase.",
      "Improve search-to-product and search-to-cart pathways.",
      "Identify potential unmet demand through search behavior.",
      "Evaluate search performance by category and product.",
    ],
  },
  {
    id: "cohort",
    tabLabel: "Cohort Retention",
    dashboardId: "01f1a7b450931683895f7f606a47de58",
    title: "Dashboard 6 — Cohort Retention",
    question: "Do customers continue engaging with the business after their first activity?",
    findings: [
      "June’s Month 1 activity retention was approximately 35.7%.",
      "July–October cohorts showed Month 1 retention between approximately 15% and 20%.",
      "Later cohorts did not demonstrate a clear improvement in retention.",
      "November retention is incomplete because the observation window ends in December.",
    ],
    implications: [
      "Customer retention is a structural challenge. Increasing traffic without improving repeat engagement may produce short-term growth without creating a stronger customer base.",
      "The current analysis measures activity retention, not repurchase retention.",
    ],
    actions: [
      "Improve the post-purchase and post-visit customer experience.",
      "Monitor repeat purchase behavior separately from general activity.",
      "Develop retention strategies for first-time buyers.",
      "Avoid interpreting incomplete cohorts as final retention performance.",
      "Evaluate whether acquisition channels produce customers who return.",
    ],
  },
]

const tabTriggerClass =
  "rounded-xl px-2 py-1.5 text-[11px] sm:text-xs font-semibold leading-tight whitespace-normal text-center transition-colors text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200 data-[state=active]:bg-purple-600 data-[state=active]:text-white data-[state=active]:shadow-md dark:data-[state=active]:bg-purple-500 data-[state=active]:hover:text-white"

const navArrowClass =
  "inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-gray-200 bg-white text-purple-600 shadow-sm transition-colors hover:bg-purple-50 hover:border-purple-300 disabled:pointer-events-none disabled:opacity-40 dark:border-gray-600 dark:bg-gray-700 dark:text-purple-300 dark:hover:bg-gray-600"

function NarrativeBlock({
  heading,
  paragraphs,
  bullets,
}: {
  heading: string
  paragraphs?: string[]
  bullets?: string[]
}) {
  return (
    <div className="mt-6">
      <h3 className="text-lg font-semibold mb-3 text-purple-700 dark:text-purple-400">{heading}</h3>
      {paragraphs?.map((text) => (
        <p key={text} className="text-gray-700 dark:text-gray-300 text-sm leading-relaxed mb-3 last:mb-0">
          {text}
        </p>
      ))}
      {bullets ? (
        <ul className="space-y-2 list-disc list-inside text-gray-700 dark:text-gray-300 text-sm leading-relaxed">
          {bullets.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      ) : null}
    </div>
  )
}

export function EcommerceDatabricksDashboards() {
  const [activeTab, setActiveTab] = useState(ECOMMERCE_DASHBOARDS[0].id)
  const sectionRef = useRef<HTMLElement>(null)
  const activeIndex = ECOMMERCE_DASHBOARDS.findIndex((d) => d.id === activeTab)
  const safeIndex = activeIndex >= 0 ? activeIndex : 0
  const canGoPrev = safeIndex > 0
  const canGoNext = safeIndex < ECOMMERCE_DASHBOARDS.length - 1

  const selectTab = (id: string) => {
    setActiveTab(id)
    // Defer so the new tab content mounts before scrolling.
    requestAnimationFrame(() => {
      sectionRef.current?.scrollIntoView({ behavior: "smooth", block: "start" })
    })
  }

  const goPrev = () => {
    if (!canGoPrev) return
    selectTab(ECOMMERCE_DASHBOARDS[safeIndex - 1].id)
  }

  const goNext = () => {
    if (!canGoNext) return
    selectTab(ECOMMERCE_DASHBOARDS[safeIndex + 1].id)
  }

  return (
    <section
      ref={sectionRef}
      className="relative mb-10 scroll-mt-0 rounded-xl bg-white p-7 shadow dark:bg-gray-800"
    >
      <Tabs value={activeTab} onValueChange={selectTab} className="w-full">
        <h2 className="mb-3 text-2xl font-bold">Interactive Lakeview Dashboards</h2>

        {/* Floating tab bar — sticks to the top of the page while scrolling */}
        <div className="sticky top-0 z-30 -mx-7 mb-6 border-b border-gray-200 bg-white/95 px-7 py-3 shadow-sm backdrop-blur dark:border-gray-700 dark:bg-gray-800/95">
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={goPrev}
              disabled={!canGoPrev}
              aria-label="Previous dashboard"
              className={navArrowClass}
            >
              <ChevronLeft className="h-5 w-5" />
            </button>

            <div className="min-w-0 flex-1">
              <TabsList className="grid h-auto w-full grid-cols-2 gap-1.5 rounded-2xl border border-gray-200 bg-gray-100/90 p-1.5 sm:grid-cols-3 lg:grid-cols-6 dark:border-gray-700 dark:bg-gray-700/50">
                {ECOMMERCE_DASHBOARDS.map((dashboard) => (
                  <TabsTrigger key={dashboard.id} value={dashboard.id} className={cn(tabTriggerClass)}>
                    {dashboard.tabLabel}
                  </TabsTrigger>
                ))}
              </TabsList>
            </div>

            <button
              type="button"
              onClick={goNext}
              disabled={!canGoNext}
              aria-label="Next dashboard"
              className={navArrowClass}
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>
        </div>

        {ECOMMERCE_DASHBOARDS.map((dashboard) => (
          <TabsContent key={dashboard.id} value={dashboard.id} className="mt-0 focus-visible:ring-0">
            <DatabricksDashboardEmbed
              unframed
              dashboardId={dashboard.dashboardId}
              title={dashboard.title}
              description={dashboard.question}
            >
              <NarrativeBlock heading="Key Findings" bullets={dashboard.findings} />
              <NarrativeBlock heading="Business Implications" paragraphs={dashboard.implications} />
              <NarrativeBlock heading="Recommended Actions" bullets={dashboard.actions} />
            </DatabricksDashboardEmbed>
          </TabsContent>
        ))}
      </Tabs>
    </section>
  )
}

