import Link from "next/link"
import { ArrowLeft, BarChart2, Database, GitBranch, Layers, Map, TrendingUp } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { CovidDatabricksDashboard } from "@/components/covid-databricks-dashboard"

export default function CovidProjectPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-950">
      {/* Header */}
      <div className="bg-white dark:bg-gray-800 shadow-sm sticky top-0 z-10">
        <div className="container mx-auto max-w-5xl px-4 py-4 flex items-center gap-4">
          <Link
            href="/"
            className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400 hover:text-purple-600 dark:hover:text-purple-400 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Portfolio
          </Link>
        </div>
      </div>

      <div className="container mx-auto max-w-5xl px-4 py-12">
        {/* Title */}
        <div className="mb-10">
          <h1 className="text-4xl font-bold mb-3 leading-tight">
            Impact of Population Mobility on COVID-19 Incidence
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400 mb-5">
            Investigating the Relationship Between Population Mobility and COVID-19 Incidence Rates Across U.S. Counties
          </p>
          <div className="flex flex-wrap gap-2">
            {["Databricks", "PySpark", "Python", "XGBoost", "SQL", "Google Mobility Data", "CDC Data", "Correlation Analysis"].map((tag) => (
              <Badge key={tag} variant="outline" className="bg-purple-100/50 dark:bg-purple-900/50">
                {tag}
              </Badge>
            ))}
          </div>
        </div>

        {/* Overview */}
        <section className="mb-10 bg-white dark:bg-gray-800 rounded-xl shadow p-7">
          <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-purple-600" />
            Project Overview
          </h2>
          <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
            This study explores whether and how changes in human mobility patterns drove COVID-19 transmission dynamics across the United States. By merging Google's COVID-19 Community Mobility Reports with CDC county-level case and death data, the project quantifies lag-adjusted correlations between six mobility categories and weekly new case counts, assesses the effectiveness of stay-at-home policies, and surfaces geographic and demographic moderators through gradient-boosted tree models. The full data pipeline was built and executed on Databricks, leveraging distributed computing for processing large-scale county-week panel data. Interactive Databricks dashboards were developed to communicate national trends, state-level comparisons, and mobility-incidence relationships across pandemic waves.
          </p>
          <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
            The findings provide actionable insights for public health officials designing non-pharmaceutical interventions and for policymakers evaluating the trade-off between economic activity and epidemic control.
          </p>
        </section>

        <CovidDatabricksDashboard />

        {/* Data Sources */}
        <section className="mb-10 bg-white dark:bg-gray-800 rounded-xl shadow p-7">
          <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
            <Database className="w-5 h-5 text-purple-600" />
            Data Sources
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
              <h3 className="font-semibold mb-2 text-purple-700 dark:text-purple-400">Google COVID-19 Community Mobility Reports</h3>
              <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-1 list-disc list-inside">
                <li>Six location categories: Retail &amp; Recreation, Grocery &amp; Pharmacy, Parks, Transit Stations, Workplaces, Residential</li>
                <li>Daily percentage change relative to a pre-pandemic baseline (Jan–Feb 2020)</li>
                <li>County-level granularity for all 50 U.S. states</li>
                <li>Coverage: February 2020 – October 2022</li>
              </ul>
            </div>
            <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
              <h3 className="font-semibold mb-2 text-purple-700 dark:text-purple-400">CDC COVID-19 Case Surveillance</h3>
              <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-1 list-disc list-inside">
                <li>Weekly confirmed case counts and death counts per county (data through 2023-05-08)</li>
                <li>Population-normalized incidence rates (per 100,000 residents)</li>
                <li>Vaccination rate time series from CDC COVID Data Tracker</li>
                <li>State-level policy enactment dates (stay-at-home orders, mask mandates)</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Methodology */}
        <section className="mb-10 bg-white dark:bg-gray-800 rounded-xl shadow p-7">
          <h2 className="text-2xl font-bold mb-5 flex items-center gap-2">
            <GitBranch className="w-5 h-5 text-purple-600" />
            Methodology
          </h2>
          <div className="space-y-5">
            <div>
              <h3 className="font-semibold text-lg mb-2">1. Data Collection &amp; Integration</h3>
              <p className="text-gray-700 dark:text-gray-300 text-sm leading-relaxed">
                Raw CSV files from Google and CDC were ingested with PySpark on Databricks. County FIPS codes were used as the join key. Missing mobility values (&lt;3% of records) were linearly interpolated; counties with &gt;30% missing case data were dropped. The final panel dataset contained ~750,000 county-week observations spanning February 2020 through May 2023.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-lg mb-2">2. Exploratory Data Analysis &amp; Feature Engineering</h3>
              <p className="text-gray-700 dark:text-gray-300 text-sm leading-relaxed">
                Rolling 7-day average plots and heatmaps were used to identify mobility trend shifts during major policy events. Pandemic waves were labeled (Wave 1–3, Delta, Omicron, Post-Omicron) for wave-stratified analysis. Lag features (7-, 14-, 21-day) were engineered for each mobility category to capture the incubation delay between exposure and confirmed diagnosis. Interaction terms between mobility and population density were added to capture urban vs. rural heterogeneity.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-lg mb-2">3. Correlation Analysis</h3>
              <p className="text-gray-700 dark:text-gray-300 text-sm leading-relaxed">
                Pearson correlations were computed between each lagged mobility feature and weekly case incidence at both national and state levels. Cross-correlation functions (CCF) identified the optimal lag window—typically 10–14 days—at which mobility had the strongest predictive signal. State-level correlation coefficients for composite mobility vs. new cases were computed and visualized, revealing meaningful geographic variation in the mobility-transmission relationship.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-lg mb-2">4. Predictive Modeling with XGBoost</h3>
              <p className="text-gray-700 dark:text-gray-300 text-sm leading-relaxed">
                An XGBoost regression model was trained on 80% of the temporal data (earliest weeks) and evaluated on the remaining 20% (most recent weeks) to prevent data leakage. Hyperparameters (max_depth, learning_rate, n_estimators, subsample) were tuned via 5-fold time-series cross-validation. SHAP (SHapley Additive exPlanations) values were computed to interpret global and local feature contributions.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-lg mb-2">5. Policy Impact Assessment</h3>
              <p className="text-gray-700 dark:text-gray-300 text-sm leading-relaxed">
                Interrupted time-series (ITS) analysis was applied around state-level stay-at-home order enactment dates to estimate the causal reduction in mobility and the subsequent lagged reduction in new cases, controlling for pre-existing trends.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-lg mb-2">6. Dashboard Development (Databricks)</h3>
              <p className="text-gray-700 dark:text-gray-300 text-sm leading-relaxed mb-3">
                Two interactive Databricks dashboards were built to communicate findings:
              </p>
              <ul className="text-sm text-gray-700 dark:text-gray-300 space-y-2 list-disc list-inside">
                <li>
                  <span className="font-medium">COVID Overview Dashboard:</span> National KPIs, weekly case trend, state rankings by cumulative cases
                  and case fatality rate, a bubble scatter of cases vs. deaths colored by fatality rate, and a year × month heatmap of national new cases.
                </li>
                <li>
                  <span className="font-medium">Mobility Analysis Dashboard:</span> US composite mobility area chart (2020–2022), state-level correlation bar
                  chart, monthly mobility vs. cases scatter colored by pandemic wave, and mobility category correlation charts against both cases and deaths.
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* Technical Stack */}
        <section className="mb-10 bg-white dark:bg-gray-800 rounded-xl shadow p-7">
          <h2 className="text-2xl font-bold mb-5 flex items-center gap-2">
            <Layers className="w-5 h-5 text-purple-600" />
            Technical Stack
          </h2>
          <div className="border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden">
            <div className="grid grid-cols-1 md:grid-cols-2">
              <div className="bg-gray-50 dark:bg-gray-700/50 px-4 py-3 text-sm font-semibold text-gray-700 dark:text-gray-200">
                Layer
              </div>
              <div className="bg-gray-50 dark:bg-gray-700/50 px-4 py-3 text-sm font-semibold text-gray-700 dark:text-gray-200">
                Tools
              </div>
            </div>
            {[
              { layer: "Cloud Platform", tools: "Databricks (Apache Spark)" },
              { layer: "Data Processing", tools: "PySpark, Pandas, NumPy" },
              { layer: "Modeling", tools: "XGBoost" },
              { layer: "Causal Inference", tools: "Interrupted Time-Series (ITS)" },
              { layer: "Visualization", tools: "Databricks Dashboards" },
              { layer: "Language", tools: "Python" },
            ].map((row, i) => (
              <div key={row.layer} className="grid grid-cols-1 md:grid-cols-2">
                <div className="px-4 py-3 text-sm text-gray-700 dark:text-gray-300 border-t border-gray-200 dark:border-gray-700">
                  {row.layer}
                </div>
                <div
                  className={`px-4 py-3 text-sm text-gray-700 dark:text-gray-300 border-t border-gray-200 dark:border-gray-700 ${
                    i % 2 === 0 ? "md:bg-white dark:md:bg-gray-800" : "md:bg-gray-50/50 dark:md:bg-gray-700/30"
                  }`}
                >
                  {row.tools}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Key Findings */}
        <section className="mb-10 bg-white dark:bg-gray-800 rounded-xl shadow p-7">
          <h2 className="text-2xl font-bold mb-5 flex items-center gap-2">
            <BarChart2 className="w-5 h-5 text-purple-600" />
            Key Findings
          </h2>
          <div className="space-y-6">
            <div>
              <h3 className="font-semibold text-lg mb-2">National Scale</h3>
              <ul className="text-sm text-gray-700 dark:text-gray-300 space-y-1 list-disc list-inside">
                <li>104.72M total cumulative confirmed cases nationally (through May 2023)</li>
                <li>1.13M total deaths; national case fatality rate of 1.06%</li>
                <li>Weekly new cases peaked at ~900K during the Omicron wave (Jan 2022), dwarfing all prior waves</li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold text-lg mb-2">Mobility Trends</h3>
              <ul className="text-sm text-gray-700 dark:text-gray-300 space-y-1 list-disc list-inside">
                <li>
                  US composite mobility dropped to approximately −45% vs. baseline in April 2020 at the height of initial lockdowns, then gradually
                  recovered toward baseline through 2021–2022
                </li>
                <li>Mobility never fully returned to pre-pandemic levels across the study period</li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold text-lg mb-2">Mobility–Incidence Correlation</h3>
              <ul className="text-sm text-gray-700 dark:text-gray-300 space-y-1 list-disc list-inside">
                <li>Pearson r of −0.72 between retail mobility and new cases at 14-day lag (p &lt; 0.001)</li>
                <li>
                  Optimal predictive lag of 10–14 days between mobility decline and observed case reduction, consistent with COVID-19 incubation and
                  reporting delays
                </li>
                <li>
                  State-level correlations varied considerably, with most states showing negative composite mobility–case correlations; a small number of
                  states showed near-zero or weakly positive correlations, likely reflecting confounding from variant waves
                </li>
                <li>
                  Retail &amp; Recreation and Transit Station mobility showed the strongest negative correlations with both cases and deaths; Parks mobility
                  showed the weakest (near-zero) correlation
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold text-lg mb-2">Wave-Stratified Patterns</h3>
              <ul className="text-sm text-gray-700 dark:text-gray-300 space-y-1 list-disc list-inside">
                <li>
                  Mobility restrictions were deepest during Wave 1; subsequent waves saw progressively less mobility reduction despite comparable or
                  larger case surges, suggesting behavioral adaptation over time
                </li>
                <li>
                  The Omicron wave produced the highest case counts despite moderate (not extreme) mobility reductions, consistent with its higher
                  transmissibility
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold text-lg mb-2">State-Level Patterns</h3>
              <ul className="text-sm text-gray-700 dark:text-gray-300 space-y-1 list-disc list-inside">
                <li>California had the highest cumulative case count among all states; Pennsylvania had the highest case fatality rate among the top 20 states</li>
                <li>Top states by cumulative cases (California, Texas, Florida, Illinois, Pennsylvania) aligned with population size</li>
                <li>
                  States with high case fatality rates did not necessarily have the highest total case counts, suggesting CFR is driven by demographic and
                  healthcare capacity factors beyond raw transmission volume
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold text-lg mb-2">Geographic &amp; Demographic Insights</h3>
              <ul className="text-sm text-gray-700 dark:text-gray-300 space-y-1 list-disc list-inside">
                <li>The mobility–incidence relationship was significantly stronger in high-density urban counties than in rural counties</li>
                <li>
                  Counties with lower median household income showed higher baseline incidence regardless of mobility level, pointing to structural
                  socioeconomic drivers of transmission
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* Conclusions */}
        <section className="mb-10 bg-white dark:bg-gray-800 rounded-xl shadow p-7">
          <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
            <Map className="w-5 h-5 text-purple-600" />
            Conclusions
          </h2>
          <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
            This project demonstrates that population mobility is a meaningful leading indicator of COVID-19 transmission, with a consistent 10–14 day
            lag between mobility changes and case outcomes. However, the relationship weakened over successive pandemic waves as population immunity,
            variant characteristics, and behavioral adaptation became increasingly dominant factors. The findings support the use of mobility data for
            early-warning surveillance systems while highlighting that mobility-based interventions are most effective during initial outbreak phases and
            in high-density settings. Socioeconomic vulnerability emerged as an independent predictor of incidence, underscoring the importance of
            equity-focused public health policy.
          </p>
        </section>

        {/* Back */}
        <div className="text-center">
          <Link
            href="/"
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
