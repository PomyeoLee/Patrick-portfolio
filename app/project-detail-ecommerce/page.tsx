import Link from "next/link"
import { ArrowLeft, ChevronDown, Database, GitBranch, Layers, ShoppingBag } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { EcommerceDatabricksDashboards } from "@/components/ecommerce-databricks-dashboards"

export default function EcommerceAnalyticsProjectPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-950">
      <div className="bg-white dark:bg-gray-800 shadow-sm">
        <div className="container mx-auto max-w-5xl px-4 py-4 flex items-center gap-4">
          <Link
            href="/#projects"
            className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400 hover:text-purple-600 dark:hover:text-purple-400 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Portfolio
          </Link>
        </div>
      </div>

      <div className="container mx-auto max-w-5xl px-4 py-12">
        <div className="mb-10">
          <h1 className="text-4xl font-bold mb-5 leading-tight">
            E-Commerce Customer &amp; Product Analytics
          </h1>
          <div className="flex flex-wrap gap-2">
            {[
              "KPI",
              "Funnel",
              "Customer Segmentation",
              "RFM",
              "Cohort",
              "Churn & Retention",
              "Customer Lifecycle",
              "Product Performance",
              "SQL",
              "Business Intelligence",
            ].map((tag) => (
              <Badge key={tag} variant="outline" className="bg-purple-100/50 dark:bg-purple-900/50">
                {tag}
              </Badge>
            ))}
          </div>
        </div>

        <section className="mb-10 bg-white dark:bg-gray-800 rounded-xl shadow p-7">
          <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
            <ShoppingBag className="w-5 h-5 text-purple-600" />
            Project Overview
          </h2>
          <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
            Retail teams often have large volumes of customer behavior data but limited visibility into who to retain, which products drive conversion, and where customers drop off. This project transforms{" "}
            <strong>200M+ e-commerce events</strong> into a decision-ready analytics layer for understanding customer behavior, product performance, conversion, search, and retention.
          </p>
          <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
            The project uses Python, SQL, and Databricks to build a scalable{" "}
            <strong>Bronze → Silver → Gold</strong> data architecture and six interactive AI/BI dashboards covering RFM segmentation, cohort retention, product performance, funnel analysis, and search-driven conversion.
          </p>
          <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
            The analysis identified key business insights, including a{" "}
            <strong>4.14% purchase rate</strong>, <strong>60.9% cart abandonment</strong>,{" "}
            <strong>6.8× higher conversion</strong> among search users, and{" "}
            <strong>62.7% customer inactivity</strong>, highlighting opportunities for conversion optimization
            and customer retention.
          </p>
        </section>

        <EcommerceDatabricksDashboards />

        <section className="mb-10 bg-white dark:bg-gray-800 rounded-xl shadow p-7">
          <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
            <Layers className="w-5 h-5 text-purple-600" />
            Cross-Dashboard Business Recommendations
          </h2>

          <div className="space-y-4 text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
            <p>
              The six dashboards tell one story: this is a browse-heavy business with a thin
              purchase core. About <strong>84%</strong> of identities are browsers, and only{" "}
              <strong>4.08%</strong> ever buy. Nearly everyone who is active already browsed or
              searched (<strong>98.7%</strong>), but only <strong>10.5%</strong> add to cart—so the
              leak is cart and checkout, not awareness.
            </p>
            <p>
              When people do convert after a cart add, they move fast: median{" "}
              <strong>7.1 minutes</strong>, with <strong>63.5%</strong> buying within 15 minutes and{" "}
              <strong>73.7%</strong> within an hour. Searchers convert at{" "}
              <strong>19.63%</strong> versus <strong>2.85%</strong> for non-searchers (~
              <strong>6.9×</strong>) and account for about <strong>35%</strong> of buyers, yet most
              people never search at all. Cart demand that fails often dies on specific high-intent,
              low-close SKUs and uneven categories—not from a lack of traffic.
            </p>
            <p>
              Among buyers, about half already repeat, and Power + Repeat (~
              <strong>457K</strong>) are the durable base. Newer cohorts do not stick like June
              (Month-1 activity retention <strong>35.7%</strong> vs mid-teens to ~20% later). The
              clean win-back file is <strong>~83K</strong> repeat buyers inactive more than 90 days—
              not RFM “Champions,” which are currently untrustworthy because scoring is inverted.
              Volume grew through November; conversion quality did not. Improve the journey for
              people already on site before scaling acquisition.
            </p>
          </div>

          <h3 className="text-lg font-semibold mt-6 mb-3 text-purple-700 dark:text-purple-400">
            Priority actions
          </h3>
          <ol className="space-y-3 list-decimal list-outside ml-5 text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
            <li>
              <span className="font-medium text-gray-800 dark:text-gray-200">
                Ship a same-session cart recovery path.
              </span>{" "}
              Shorten checkout after add-to-cart; surface shipping, size, stock, and price holds in
              the first 15–60 minutes—when ~74% of successful cart→buy already happens (D2).
            </li>
            <li>
              <span className="font-medium text-gray-800 dark:text-gray-200">
                Put search in the primary nav and empty states; run ranking tests to cart and purchase.
              </span>{" "}
              Searchers buy at ~6.9× the rate of non-searchers and are ~35% of buyers—make starting
              a search harder to miss (D2, D5).
            </li>
            <li>
              <span className="font-medium text-gray-800 dark:text-gray-200">
                Open a weekly merchandising triage on high-cart / &lt;10% close SKUs and high-removal
                categories (e.g. Cat 699).
              </span>{" "}
              Fix price, stock, variants, or cut the SKU; promote efficient categories (2964, 1096)
              alongside volume leaders (D1, D3).
            </li>
            <li>
              <span className="font-medium text-gray-800 dark:text-gray-200">
                Launch three CRM journeys only: Cart Users, second-purchase for One-Time buyers, and
                personal win-back to the ~83K repeat buyers inactive &gt;90 days.
              </span>{" "}
              Do not blast the ~12M browser “At Risk” pool or route on RFM Champion labels until
              scores are fixed (D4).
            </li>
            <li>
              <span className="font-medium text-gray-800 dark:text-gray-200">
                Freeze paid acquisition scale-up; staff and promo calendar for the November peak.
              </span>{" "}
              Keep Month-1 activity retention as a go/no-go gate before spending more on top-of-funnel
              (D1, D5, D6).
            </li>
          </ol>
        </section>

        <details className="mb-10 group bg-white dark:bg-gray-800 rounded-xl shadow overflow-hidden">
          <summary className="cursor-pointer list-none flex items-start justify-between gap-4 p-7 select-none [&::-webkit-details-marker]:hidden">
            <div className="min-w-0 flex-1">
              <h2 className="text-2xl font-bold flex items-center gap-2">
                <Database className="w-5 h-5 text-purple-600 shrink-0" />
                Dataset &amp; Methodology
              </h2>
              <p className="mt-2 text-sm leading-relaxed text-gray-600 dark:text-gray-400 group-open:hidden">
                ~200M anonymized e-commerce events (Jun–Dec 2022) → Databricks Bronze → Silver →
                Gold → six AI/BI dashboards.
              </p>
            </div>
            <ChevronDown className="w-5 h-5 shrink-0 mt-1 text-gray-500 transition-transform duration-200 group-open:rotate-180" />
          </summary>

          <div className="px-7 pb-7 space-y-10 border-t border-gray-100 dark:border-gray-700 pt-6">
            {/* Dataset */}
            <div className="space-y-5">
              <div>
                <h3 className="text-lg font-semibold mb-2 flex items-center gap-2 text-purple-700 dark:text-purple-400">
                  <Database className="w-4 h-4" />
                  Dataset
                </h3>
                <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
                  Synerise-style anonymized e-commerce event parquets spanning ~5.5 months
                  (2022-06 → 2022-12). All IDs are anonymized integers. There is{" "}
                  <strong>no true revenue / order value</strong> — financial metrics use price-bucket
                  proxies.
                </p>
              </div>

              <ul className="space-y-3">
                {[
                  {
                    file: "page_visit",
                    scale: "~199M rows",
                    role: "Page views (client, timestamp, URL ID)",
                  },
                  {
                    file: "product_buy",
                    scale: "~2.3M rows",
                    role: "Purchases (client, timestamp, SKU)",
                  },
                  {
                    file: "add_to_cart / remove_from_cart",
                    scale: "Cart-scale",
                    role: "Cart adds and removals by SKU",
                  },
                  {
                    file: "search_query",
                    scale: "Search-scale",
                    role: "Search events (20-dim embedding, not text)",
                  },
                  {
                    file: "product_properties",
                    scale: "Catalog",
                    role: "SKU metadata: category, price bucket, embedding",
                  },
                ].map((event) => (
                  <li
                    key={event.file}
                    className="flex flex-col gap-0.5 sm:flex-row sm:items-baseline sm:justify-between sm:gap-4"
                  >
                    <div className="min-w-0">
                      <p className="text-sm font-semibold text-gray-900 dark:text-gray-100">
                        {event.file}
                      </p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">{event.role}</p>
                    </div>
                    <span className="shrink-0 text-xs font-medium text-purple-700 dark:text-purple-300 sm:text-right">
                      {event.scale}
                    </span>
                  </li>
                ))}
              </ul>

              <div className="border-l-2 border-purple-300 dark:border-purple-700 pl-4">
                <p className="text-xs font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-400 mb-2">
                  Interpretation limits
                </p>
                <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-1.5 list-disc list-inside">
                  <li>SKU / category / price / URL are numeric IDs only (e.g. SKU 123, Category 4)</li>
                  <li>Search “queries” are embeddings — not readable strings</li>
                  <li>
                    <code>estimated_clv</code> is a price-bucket proxy, not true revenue
                  </li>
                  <li>Product PDP views are not isolated; only generic page visits</li>
                  <li>Sessions are inferred (30-minute inactivity gap), not provided by the source</li>
                </ul>
              </div>
            </div>

            {/* Methodology */}
            <div className="space-y-5">
              <div>
                <h3 className="text-lg font-semibold mb-2 flex items-center gap-2 text-purple-700 dark:text-purple-400">
                  <GitBranch className="w-4 h-4" />
                  Methodology
                </h3>
                <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
                  Built as a medallion analytics stack on Databricks (Unity Catalog: bronze / silver /
                  gold), then published as six AI/BI Lakeview dashboards.
                </p>
              </div>

              <ol className="space-y-4">
                <li className="flex gap-3">
                  <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-purple-100 dark:bg-purple-900/50 text-xs font-bold text-purple-700 dark:text-purple-300">
                    1
                  </span>
                  <div>
                    <p className="font-semibold text-sm text-gray-900 dark:text-gray-100">
                      Bronze — raw ingest
                    </p>
                    <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed mt-1">
                      Parquets land in a UC Volume, then mirror into Bronze Delta tables with ingest
                      metadata (<code>_ingested_at</code>, <code>_source_file</code>).
                    </p>
                  </div>
                </li>
                <li className="flex gap-3">
                  <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-purple-100 dark:bg-purple-900/50 text-xs font-bold text-purple-700 dark:text-purple-300">
                    2
                  </span>
                  <div>
                    <p className="font-semibold text-sm text-gray-900 dark:text-gray-100">
                      Silver — clean, sessionize, unify
                    </p>
                    <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed mt-1">
                      Parse timestamps, filter nulls, join product properties, assign{" "}
                      <code>session_id</code> when a client&apos;s event gap exceeds{" "}
                      <strong>30 minutes</strong>, and union all event types into{" "}
                      <code>events_unified</code>.
                    </p>
                  </div>
                </li>
                <li className="flex gap-3">
                  <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-purple-100 dark:bg-purple-900/50 text-xs font-bold text-purple-700 dark:text-purple-300">
                    3
                  </span>
                  <div>
                    <p className="font-semibold text-sm text-gray-900 dark:text-gray-100">
                      Gold — analytics tables (4 parallel builds)
                    </p>
                    <ul className="mt-2 text-sm text-gray-600 dark:text-gray-400 space-y-2">
                      <li>
                        <strong className="text-gray-800 dark:text-gray-200">Customer</strong> —
                        activity / purchase / cart / search features; RFM &amp; behavioral segments
                        (Power Buyer → Browser); win-back urgency; CLV proxy
                      </li>
                      <li>
                        <strong className="text-gray-800 dark:text-gray-200">Product</strong> — SKU,
                        category, and price-bucket metrics (purchases, cart adds, conversion, removal
                        rate)
                      </li>
                      <li>
                        <strong className="text-gray-800 dark:text-gray-200">Funnel</strong> — monthly
                        conversion rates, session metrics, cart→purchase timing, cohort retention
                        matrix
                      </li>
                      <li>
                        <strong className="text-gray-800 dark:text-gray-200">Search</strong> — monthly
                        volume, journey timing, and searcher vs non-searcher conversion lift
                      </li>
                    </ul>
                  </div>
                </li>
                <li className="flex gap-3">
                  <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-purple-100 dark:bg-purple-900/50 text-xs font-bold text-purple-700 dark:text-purple-300">
                    4
                  </span>
                  <div>
                    <p className="font-semibold text-sm text-gray-900 dark:text-gray-100">
                      Delivery — six Lakeview dashboards
                    </p>
                    <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed mt-1">
                      D1 Executive Overview · D2 Conversion &amp; Funnel · D3 Product &amp; Category ·
                      D4 Segmentation &amp; Retention · D5 Search &amp; Discovery · D6 Cohort
                      Retention — all querying Gold / Silver tables.
                    </p>
                  </div>
                </li>
              </ol>
            </div>
          </div>
        </details>

        <div className="text-center">
          <Link
            href="/#projects"
            className="inline-flex items-center gap-2 px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors font-medium"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Portfolio
          </Link>
        </div>
      </div>
    </div>
  )
}
