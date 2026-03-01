import Link from "next/link"
import { ArrowLeft, BarChart2, Database, GitBranch, Layers, Map, TrendingUp } from "lucide-react"
import { Badge } from "@/components/ui/badge"

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
            {["Python", "XGBoost", "Pandas", "Google Mobility Data", "CDC Data", "Seaborn", "Scikit-learn", "Correlation Analysis"].map((tag) => (
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
            This study explores whether and how changes in human mobility patterns drove COVID-19 transmission dynamics across the United States. By merging Google&apos;s COVID-19 Community Mobility Reports with CDC county-level case and death data, the project quantifies lag-adjusted correlations between six mobility categories and weekly new case counts, assesses the effectiveness of stay-at-home policies, and surfaces geographic and demographic moderators through gradient-boosted tree models.
          </p>
          <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
            The findings provide actionable insights for public health officials designing non-pharmaceutical interventions and for policymakers evaluating the trade-off between economic activity and epidemic control.
          </p>
        </section>

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
                <li>Weekly confirmed case counts and death counts per county</li>
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
                Raw CSV files from Google and CDC were ingested with Pandas. County FIPS codes were used as the join key. Missing mobility values (&lt;3% of records) were linearly interpolated; counties with &gt;30% missing case data were dropped. The final panel dataset contained ~750,000 county-week observations.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-lg mb-2">2. Exploratory Data Analysis &amp; Feature Engineering</h3>
              <p className="text-gray-700 dark:text-gray-300 text-sm leading-relaxed">
                Seaborn heatmaps and rolling 7-day average plots were used to identify mobility trend shifts during major policy events. Lag features (7-, 14-, 21-day) were engineered for each mobility category to capture the incubation delay between exposure and confirmed diagnosis. Interaction terms between mobility and population density were added to capture urban vs. rural heterogeneity.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-lg mb-2">3. Correlation Analysis</h3>
              <p className="text-gray-700 dark:text-gray-300 text-sm leading-relaxed">
                Pearson and Spearman correlations were computed between each lagged mobility feature and weekly case incidence. Cross-correlation functions (CCF) identified the optimal lag window—typically 10–14 days—at which mobility had the strongest predictive signal on reported case counts.
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
          </div>
        </section>

        {/* Tech Details */}
        <section className="mb-10 bg-white dark:bg-gray-800 rounded-xl shadow p-7">
          <h2 className="text-2xl font-bold mb-5 flex items-center gap-2">
            <Layers className="w-5 h-5 text-purple-600" />
            Technical Details
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
              <h3 className="font-semibold mb-3 text-purple-700 dark:text-purple-400">Data Processing</h3>
              <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-1 list-disc list-inside">
                <li>Pandas for data wrangling</li>
                <li>NumPy for numerical ops</li>
                <li>FIPS-based county joins</li>
                <li>Linear interpolation for gaps</li>
                <li>Rolling window aggregation</li>
              </ul>
            </div>
            <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
              <h3 className="font-semibold mb-3 text-purple-700 dark:text-purple-400">Modeling</h3>
              <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-1 list-disc list-inside">
                <li>XGBoost (gradient boosting)</li>
                <li>Scikit-learn pipeline</li>
                <li>Time-series CV (no leakage)</li>
                <li>SHAP for interpretability</li>
                <li>ITS for causal inference</li>
              </ul>
            </div>
            <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
              <h3 className="font-semibold mb-3 text-purple-700 dark:text-purple-400">Visualization</h3>
              <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-1 list-disc list-inside">
                <li>Matplotlib / Seaborn</li>
                <li>Choropleth maps (Plotly)</li>
                <li>Correlation heatmaps</li>
                <li>SHAP beeswarm plots</li>
                <li>Time-series trend lines</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Key Findings */}
        <section className="mb-10 bg-white dark:bg-gray-800 rounded-xl shadow p-7">
          <h2 className="text-2xl font-bold mb-5 flex items-center gap-2">
            <BarChart2 className="w-5 h-5 text-purple-600" />
            Key Findings
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              { stat: "−0.72", label: "Pearson r between retail mobility and new cases at 14-day lag (statistically significant, p < 0.001)" },
              { stat: "10–14 days", label: "Optimal predictive lag between mobility decline and observed case reduction, consistent with COVID-19 incubation period" },
              { stat: "Top 3 features", label: "Retail & Recreation, Workplaces, and Transit Station mobility ranked highest in SHAP feature importance" },
              { stat: "~18% reduction", label: "Estimated average case incidence drop within 3 weeks of stay-at-home order enactment (ITS analysis)" },
            ].map((item, i) => (
              <div key={i} className="border-l-4 border-purple-600 pl-4 py-2">
                <div className="text-2xl font-bold text-purple-600 dark:text-purple-400">{item.stat}</div>
                <div className="text-sm text-gray-600 dark:text-gray-400 mt-1">{item.label}</div>
              </div>
            ))}
          </div>
        </section>

        {/* Geographic Insights */}
        <section className="mb-10 bg-white dark:bg-gray-800 rounded-xl shadow p-7">
          <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
            <Map className="w-5 h-5 text-purple-600" />
            Geographic &amp; Demographic Insights
          </h2>
          <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
            SHAP interaction plots revealed that the mobility–incidence relationship was significantly stronger in high-density urban counties than in rural counties, suggesting that mobility reductions are more effective interventions in densely populated areas. Counties with lower median household income showed higher baseline incidence regardless of mobility level, pointing to structural socioeconomic drivers of transmission.
          </p>
          <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
            Choropleth time-lapse maps animated the evolution of both mobility and case incidence across pandemic waves, making the spatial alignment of mobility troughs and subsequent case declines visually intuitive for non-technical stakeholders.
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
