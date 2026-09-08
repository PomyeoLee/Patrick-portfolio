import Link from "next/link"
import { ArrowLeft, BarChart2, ChevronRight, Database, GitBranch, Layers, Search } from "lucide-react"
import { Badge } from "@/components/ui/badge"

export default function EcommerceMethodologyPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-950">
      <div className="bg-white dark:bg-gray-800 shadow-sm">
        <div className="container mx-auto max-w-5xl px-4 py-4 flex items-center gap-4">
          <Link
            href="/project-detail-ecommerce"
            className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400 hover:text-purple-600 dark:hover:text-purple-400 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Dashboards
          </Link>
        </div>
      </div>

      <div className="container mx-auto max-w-5xl px-4 py-12">
        <div className="mb-10">
          <h1 className="text-4xl font-bold mb-3 leading-tight">Dataset, Methods &amp; Results</h1>
          <p className="text-lg text-gray-600 dark:text-gray-400 mb-5">
            Supporting detail for E-Commerce Customer &amp; Product Analytics
          </p>
          <div className="flex flex-wrap gap-2">
            {["Dataset", "Methodology", "Technical Details", "Results"].map((tag) => (
              <Badge key={tag} variant="outline" className="bg-purple-100/50 dark:bg-purple-900/50">
                {tag}
              </Badge>
            ))}
          </div>
        </div>

        <section className="mb-10 bg-white dark:bg-gray-800 rounded-xl shadow p-7">
          <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
            <Database className="w-5 h-5 text-purple-600" />
            Dataset
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
              <h3 className="font-semibold mb-2 text-purple-700 dark:text-purple-400">Source Tables</h3>
              <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-1 list-disc list-inside">
                <li>Orders: timestamps, status, payment, shipping</li>
                <li>Order items: SKU, quantity, price, discount</li>
                <li>Customers: unique IDs, location, first-order date</li>
                <li>Products: category, catalog attributes</li>
              </ul>
            </div>
            <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
              <h3 className="font-semibold mb-2 text-purple-700 dark:text-purple-400">Analytical Grain</h3>
              <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-1 list-disc list-inside">
                <li>Customer-level RFM and lifetime value views</li>
                <li>Monthly cohorts for retention and repeat rate</li>
                <li>SKU and category performance rollups</li>
                <li>Basket-level item pairs for affinity rules</li>
              </ul>
            </div>
          </div>
        </section>

        <section className="mb-10 bg-white dark:bg-gray-800 rounded-xl shadow p-7">
          <h2 className="text-2xl font-bold mb-5 flex items-center gap-2">
            <GitBranch className="w-5 h-5 text-purple-600" />
            Methodology
          </h2>
          <div className="space-y-5">
            <div>
              <h3 className="font-semibold text-lg mb-2">1. Data Cleaning &amp; Feature Engineering</h3>
              <p className="text-gray-700 dark:text-gray-300 text-sm leading-relaxed">
                Orders were filtered to completed transactions, refunds were netted from revenue, and
                timestamps were aligned to a consistent calendar. Derived fields included order value,
                items per basket, days since last purchase, and first-order cohort month.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-lg mb-2">2. Exploratory Analysis</h3>
              <p className="text-gray-700 dark:text-gray-300 text-sm leading-relaxed">
                Revenue, order volume, and average order value were tracked over time. Category mix,
                geographic concentration, and discount leakage were reviewed to separate growth from
                one-off promotions.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-lg mb-2">3. RFM Customer Segmentation</h3>
              <p className="text-gray-700 dark:text-gray-300 text-sm leading-relaxed">
                Recency, frequency, and monetary scores were computed per customer and mapped into
                actionable tiers (Champions, Loyal, At Risk, Hibernating). Segment profiles were joined
                to category preferences so campaigns could target value, not just volume.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-lg mb-2">4. Cohort Retention</h3>
              <p className="text-gray-700 dark:text-gray-300 text-sm leading-relaxed">
                Customers were grouped by first-purchase month. Repeat-purchase rates and revenue per
                cohort were tracked across subsequent months to show whether acquisition quality was
                improving or decaying.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-lg mb-2">5. Product Affinity</h3>
              <p className="text-gray-700 dark:text-gray-300 text-sm leading-relaxed">
                Market-basket analysis scored co-purchased SKUs with support, confidence, and lift.
                High-lift pairs were used to recommend bundles and on-site cross-sell placements without
                relying on a black-box recommender.
              </p>
            </div>
          </div>
        </section>

        <section className="mb-10 bg-white dark:bg-gray-800 rounded-xl shadow p-7">
          <h2 className="text-2xl font-bold mb-5 flex items-center gap-2">
            <Layers className="w-5 h-5 text-purple-600" />
            Technical Details
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
              <h3 className="font-semibold mb-3 text-purple-700 dark:text-purple-400">Data &amp; Preprocessing</h3>
              <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-1 list-disc list-inside">
                <li>SQL joins across order, item, customer, product</li>
                <li>Pandas cleaning and date features</li>
                <li>Refund and outlier handling</li>
                <li>Customer and SKU grain tables</li>
              </ul>
            </div>
            <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
              <h3 className="font-semibold mb-3 text-purple-700 dark:text-purple-400">Analytics</h3>
              <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-1 list-disc list-inside">
                <li>RFM scoring and segment mapping</li>
                <li>Cohort retention matrices</li>
                <li>Category and SKU contribution</li>
                <li>Association rules (support / lift)</li>
              </ul>
            </div>
            <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
              <h3 className="font-semibold mb-3 text-purple-700 dark:text-purple-400">Delivery</h3>
              <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-1 list-disc list-inside">
                <li>Databricks Lakeview dashboards for stakeholders</li>
                <li>KPI cards, trends, and segment mix</li>
                <li>Product affinity views for merchandising</li>
                <li>Reproducible Python / SQL notebooks</li>
              </ul>
            </div>
          </div>
        </section>

        <section className="mb-10 bg-white dark:bg-gray-800 rounded-xl shadow p-7">
          <h2 className="text-2xl font-bold mb-5 flex items-center gap-2">
            <BarChart2 className="w-5 h-5 text-purple-600" />
            Results
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            {[
              {
                stat: "4 tiers",
                label:
                  "RFM segments used to separate high-value repeat buyers from at-risk and dormant customers",
              },
              {
                stat: "Cohorts",
                label: "Month-one repeat rate tracked so acquisition quality can be compared over time",
              },
              {
                stat: "Lift rules",
                label: "Item pairs ranked by lift to prioritize bundles and cross-sell placements",
              },
              {
                stat: "Category mix",
                label: "Revenue concentrated in a few categories, focusing merchandising effort",
              },
            ].map((item, i) => (
              <div key={i} className="border-l-4 border-purple-600 pl-4 py-2">
                <div className="text-2xl font-bold text-purple-600 dark:text-purple-400">{item.stat}</div>
                <div className="text-sm text-gray-600 dark:text-gray-400 mt-1">{item.label}</div>
              </div>
            ))}
          </div>
        </section>

        <section className="mb-10 bg-white dark:bg-gray-800 rounded-xl shadow p-7">
          <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
            <Search className="w-5 h-5 text-purple-600" />
            Business Implications
          </h2>
          <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
            Champions and Loyal customers justify retention spend and exclusive offers, while At Risk
            customers are better served with win-back timing based on recency rather than broad discounts.
            Hibernating accounts can be deprioritized when budget is limited.
          </p>
          <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
            High-lift product pairs give merchandising a concrete list of bundles, and category
            concentration shows where catalog depth and inventory risk actually matter. The same metric
            layer can feed CRM campaigns, homepage merchandising, and weekly business reviews without
            rebuilding the pipeline.
          </p>
        </section>

        <div className="flex flex-wrap items-center justify-center gap-3">
          <Link
            href="/project-detail-ecommerce"
            className="inline-flex items-center gap-2 rounded-lg border border-gray-300 bg-white px-6 py-3 font-medium text-gray-700 transition-colors hover:bg-gray-50 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-200 dark:hover:bg-gray-700"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Dashboards
          </Link>
          <Link
            href="/#projects"
            className="inline-flex items-center gap-2 rounded-lg bg-purple-600 px-6 py-3 font-medium text-white transition-colors hover:bg-purple-700"
          >
            Back to Portfolio
            <ChevronRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  )
}
