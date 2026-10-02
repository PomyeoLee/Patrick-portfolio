"use client"

import type { ReactNode } from "react"
import {
  AreaChartWidget,
  BarChartWidget,
  Counter,
  DashboardFrame,
  DonutWidget,
  FunnelWidget,
  HeatmapWidget,
  LineChartWidget,
  ScatterChartWidget,
  StackedBarChartWidget,
  Widget,
  counterText,
} from "@/components/dashboards/widgets"
import { useDashboardSnapshot, type DashboardRow } from "@/lib/dashboard-snapshot"

type Datasets = Record<string, DashboardRow[]>

const kpi = (d: Datasets, dataset: string, field: string) => counterText(Number(d[dataset]?.[0]?.[field] ?? 0))

function ExecutiveOverview({ d }: { d: Datasets }) {
  return (
    <div className="grid grid-cols-2 gap-2 md:grid-cols-12">
      <Counter className="md:col-span-3" title="Active Customers" value={kpi(d, "a1000001", "active_customers")} />
      <Counter className="md:col-span-3" title="Purchasing Customers" value={kpi(d, "a1000001", "purchasing_customers")} />
      <Counter className="md:col-span-3" title="Total Purchases" value={kpi(d, "a1000001", "total_purchases")} />
      <Counter className="md:col-span-3" title="Purchase Rate % (baseline 4.14%)" value={kpi(d, "a1000001", "purchase_rate_pct")} />
      <Counter className="md:col-span-3" title="Cart Add Rate %" value={kpi(d, "a1000001", "cart_add_rate_pct")} />
      <Counter className="md:col-span-3" title="Cart Abandonment % (baseline 60.9%)" value={kpi(d, "a1000001", "cart_abandonment_rate_pct")} />
      <Counter className="md:col-span-3" title="Search Lift Index (baseline 6.8x)" value={kpi(d, "a1000002", "search_lift_index")} />
      <Counter className="md:col-span-3" title="Churn Rate % (baseline 62.7%)" value={kpi(d, "a1000001", "churn_rate_pct")} />

      <Widget title="1.1a Monthly Active Customers" className="col-span-2 md:col-span-6">
        <LineChartWidget data={d.a1000003} x="month_label" y="active_customers" xLabel="Month" yLabel="Active Customers" rotateLabels />
      </Widget>
      <Widget title="1.1b Monthly Purchases" className="col-span-2 md:col-span-6">
        <LineChartWidget data={d.a1000003} x="month_label" y="total_purchases" xLabel="Month" yLabel="Purchases" rotateLabels />
      </Widget>
      <Widget title="1.2 Purchase Rate Over Time (vs 4.14% baseline)" className="col-span-2 md:col-span-6">
        <LineChartWidget data={d.a1000003} x="month_label" y="purchase_rate_pct" xLabel="Month" yLabel="Purchase Rate %" rotateLabels />
      </Widget>
      <Widget title="1.3 Engagement Mix by Month" className="col-span-2 md:col-span-6">
        <StackedBarChartWidget data={d.a1000004} category="month_label" series="metric_name" value="metric_value" xLabel="Month" yLabel="Customers" seriesLabel="Stage" />
      </Widget>
      <Widget title="1.6 Seasonality Heatmap (purchases by week × weekday)" className="col-span-2 md:col-span-12">
        <HeatmapWidget data={d.a1000007} x="week_of_year" y="day_of_week" value="purchase_count" xLabel="Week of Year" yLabel="Day of Week" valueLabel="Purchases" />
      </Widget>
      <Widget title="1.4 Top 10 Categories" className="col-span-2 md:col-span-6">
        <BarChartWidget data={d.a1000005} category="category_label" value="purchase_count" xLabel="Purchases" yLabel="Category" horizontal />
      </Widget>
      <Widget title="1.5 Top 20 Products" className="col-span-2 md:col-span-6">
        <BarChartWidget data={d.a1000006} category="sku_label" value="purchase_count" xLabel="Purchases" yLabel="SKU" horizontal />
      </Widget>
    </div>
  )
}

function ConversionFunnel({ d }: { d: Datasets }) {
  return (
    <div className="grid grid-cols-1 gap-2 md:grid-cols-12">
      <Counter className="md:col-span-4" title="Session Conversion Rate %" value={kpi(d, "a2000001", "session_conversion_rate")} />
      <Counter className="md:col-span-4" title="Total Sessions" value={kpi(d, "a2000001", "total_sessions")} />
      <Counter className="md:col-span-4" title="Converting Sessions" value={kpi(d, "a2000001", "converting_sessions")} />

      <Widget title="2.1 Lifetime Conversion Funnel" className="md:col-span-6">
        <FunnelWidget data={d.a2000002} stage="stage" value="customer_count" stageLabel="Stage" valueLabel="Customers" />
      </Widget>
      <Widget title="2.2 Cart→Purchase Time Decay (mark ~60 min ≈ 74%)" className="md:col-span-6">
        <AreaChartWidget data={d.a2000003} x="minutes_to_purchase" y="cumulative_pct" xLabel="Minutes to Purchase" yLabel="Cumulative % of Purchases" numericX height={300} />
      </Widget>
      <Widget title="2.3 Monthly Conversion vs Cart-to-Purchase (baseline 4.14%)" className="md:col-span-6">
        <LineChartWidget data={d.a2000004} x="month_label" y="rate_pct" series="rate_type" seriesLabel="Metric" xLabel="Month" yLabel="Rate %" rotateLabels />
      </Widget>
      <Widget title="2.5 Search Impact (searchers ≈ 6.8x lift)" className="md:col-span-6">
        <BarChartWidget data={d.a2000005} category="group_label" value="purchase_rate_pct" xLabel="Group" yLabel="Purchase Rate %" />
      </Widget>
      <Widget title="2.4 Cart Activity Heatmap (hour × weekday)" className="md:col-span-6">
        <HeatmapWidget data={d.a2000007} x="hour_of_day" y="day_of_week" value="cart_adds" xLabel="Hour of Day" yLabel="Day of Week" valueLabel="Cart Adds" />
      </Widget>
      <Widget title="2.6 Events per Customer: Buyers vs Non-Buyers" className="md:col-span-6">
        <StackedBarChartWidget data={d.a2000006} category="event_bucket" series="customer_type" value="customer_count" xLabel="Event Count Bucket" yLabel="Customers" seriesLabel="Type" />
      </Widget>
    </div>
  )
}

function ProductPerformance({ d }: { d: Datasets }) {
  return (
    <div className="grid grid-cols-1 gap-2 md:grid-cols-12">
      <Widget title="3.1 Top 20 Products by Purchases" className="md:col-span-6">
        <BarChartWidget data={d.a3000001} category="sku_label" value="purchase_count" xLabel="Purchases" yLabel="SKU" horizontal />
      </Widget>
      <Widget title="3.2 Top Categories by Purchases (color = conversion %)" className="md:col-span-6">
        <BarChartWidget
          data={d.a3000002}
          category="category_label"
          value="purchase_count"
          xLabel="Purchases"
          yLabel="Category"
          horizontal
          colorBy={{ field: "buyer_conversion_pct", label: "Buyer Conversion %" }}
        />
      </Widget>
      <Widget title="3.3 Cart Adds vs Purchases by Category" className="md:col-span-6">
        <ScatterChartWidget data={d.a3000003} x="cart_add_count" y="purchase_count" xLabel="Cart Adds" yLabel="Purchases" label="category_label" />
      </Widget>
      <Widget title="3.4 Cart Removal Rate by Category (alert if > 30%)" className="md:col-span-6">
        <BarChartWidget data={d.a3000004} category="category_label" value="cart_removal_pct" xLabel="Removal Rate %" yLabel="Category" horizontal />
      </Widget>
      <Widget title="3.5 Purchases by Price Bucket" className="md:col-span-6">
        <BarChartWidget data={d.a3000005} category="price_label" value="purchase_count" xLabel="Price Bucket" yLabel="Purchases" rotateLabels />
      </Widget>
      <Widget title="3.6 High-Intent Low-Close SKUs (cart>50, conv<10%)" className="md:col-span-6">
        <BarChartWidget data={d.a3000006} category="sku_label" value="cart_add_count" xLabel="Cart Adds" yLabel="SKU" horizontal />
      </Widget>
    </div>
  )
}

function CustomerSegmentation({ d }: { d: Datasets }) {
  return (
    <div className="grid grid-cols-1 gap-2 md:grid-cols-12">
      <Widget title="4.1 Behavioral Segment Distribution" className="md:col-span-6">
        <DonutWidget data={d.a4000001} category="behavioral_segment" value="customer_count" legendTitle="Segment" valueLabel="Customers" />
      </Widget>
      <Widget title="4.2 RFM Score Heatmap (color = customer count)" className="md:col-span-6">
        <HeatmapWidget data={d.a4000002} x="recency_score" y="frequency_score" value="customer_count" xLabel="Recency Score" yLabel="Frequency Score" valueLabel="Customers" yDescending height={260} />
      </Widget>
      <Widget title="4.3 Avg Estimated CLV by RFM Segment" className="md:col-span-6">
        <BarChartWidget data={d.a4000003} category="rfm_segment" value="avg_estimated_clv" xLabel="RFM Segment" yLabel="Avg Estimated CLV" />
      </Widget>
      <Widget title="4.4 Win-back Urgency Panel" className="md:col-span-6">
        <BarChartWidget data={d.a4000004} category="winback_urgency" value="customer_count" xLabel="Urgency" yLabel="Customers" />
      </Widget>
      <Widget title="4.7 Cohort Retention Heatmap" className="md:col-span-12">
        <HeatmapWidget data={d.a4000006} x="month_offset" y="cohort_label" value="retention_pct" xLabel="Months Since Acquisition" yLabel="Cohort" valueLabel="Retention %" />
      </Widget>
      <Widget title="4.5 High-Value Inactive Watchlist (top 20)" className="md:col-span-12">
        <BarChartWidget data={d.a4000005} category="client_label" value="estimated_clv" xLabel="Estimated CLV" yLabel="Client" horizontal height={300} />
      </Widget>
    </div>
  )
}

function SearchDiscovery({ d }: { d: Datasets }) {
  return (
    <div className="grid grid-cols-1 gap-2 md:grid-cols-12">
      <Counter className="md:col-span-4" title="Search Lift Index (baseline 6.8x)" value={kpi(d, "a5000001", "search_lift_index")} />
      <Counter className="md:col-span-4" title="Total Searchers" value={kpi(d, "a5000001", "total_searchers")} />
      <Counter className="md:col-span-4" title="Searcher Purchase Rate %" value={kpi(d, "a5000002", "purchase_rate_pct")} />

      <Widget title="5.1 Search Volume Over Time" className="md:col-span-6">
        <AreaChartWidget data={d.a5000003} x="month_label" y="search_events" xLabel="Month" yLabel="Search Events" rotateLabels />
      </Widget>
      <Widget title="5.2 Unique Searchers Over Time" className="md:col-span-6">
        <LineChartWidget data={d.a5000003} x="month_label" y="unique_searchers" xLabel="Month" yLabel="Unique Searchers" rotateLabels />
      </Widget>
      <Widget title="5.2 Search Impact on Conversion" className="md:col-span-6">
        <BarChartWidget data={d.a5000004} category="group_label" value="purchase_rate_pct" xLabel="Group" yLabel="Purchase Rate %" />
      </Widget>
      <Widget title="5.5 Search Timing in Purchase Journey" className="md:col-span-6">
        <DonutWidget data={d.a5000005} category="search_timing_label" value="customer_count" legendTitle="Timing" valueLabel="Customers" />
      </Widget>
      <Widget title="5.6 Avg Searches by Behavioral Segment" className="md:col-span-6">
        <BarChartWidget data={d.a5000006} category="behavioral_segment" value="avg_searches" xLabel="Segment" yLabel="Avg Searches" />
      </Widget>
      <Widget title="5.7 Repeat Search Distribution (Purchaser vs Non-Purchaser)" className="md:col-span-6">
        <StackedBarChartWidget data={d.a5000007} category="search_bucket" series="buyer_status" value="customer_count" xLabel="Search Frequency" yLabel="Customers" seriesLabel="Status" />
      </Widget>
    </div>
  )
}

function CohortRetention({ d }: { d: Datasets }) {
  return (
    <div className="grid grid-cols-1 gap-2 md:grid-cols-12">
      <Counter className="md:col-span-4" title="Avg Month-1 Retention % (baseline 10.9%)" value={kpi(d, "a6000001", "avg_month1_retention")} />
      <Counter className="md:col-span-4" title="Total Cohorts" value={kpi(d, "a6000001", "total_cohorts")} />
      <Counter className="md:col-span-4" title="Total Customers" value={kpi(d, "a6000001", "total_customers")} />

      <Widget title="6.1 Cohort Retention Heatmap (primary)" className="md:col-span-12">
        <HeatmapWidget data={d.a6000002} x="month_offset" y="cohort_label" value="retention_pct" xLabel="Months Since Acquisition" yLabel="Acquisition Cohort" valueLabel="Retention %" height={280} />
      </Widget>
      <Widget title="6.2 Month-1 Retention Trend" className="md:col-span-6">
        <LineChartWidget data={d.a6000003} x="cohort_label" y="retention_pct" xLabel="Cohort" yLabel="Month-1 Retention %" rotateLabels />
      </Widget>
      <Widget title="6.3 Cohort Size (Acquisition Volume)" className="md:col-span-6">
        <BarChartWidget data={d.a6000004} category="cohort_label" value="new_customers" xLabel="Cohort" yLabel="New Customers" />
      </Widget>
      <Widget title="6.4 Cohort Retention Curves" className="md:col-span-6">
        <LineChartWidget data={d.a6000005} x="month_offset" y="retention_pct" series="cohort_label" seriesLabel="Cohort" xLabel="Months Since Acquisition" yLabel="Retention %" numericX />
      </Widget>
      <Widget title="6.6 Search vs No-Search Retention by Segment" className="md:col-span-6">
        <StackedBarChartWidget data={d.a6000006} category="behavioral_segment" series="search_status" value="still_active_pct" xLabel="Segment" yLabel="Still Active %" seriesLabel="Search in Journey" />
      </Widget>
    </div>
  )
}

const LAYOUTS: Record<string, (props: { d: Datasets }) => ReactNode> = {
  "01f1a7c1e26114608f65e40f35654a44": ExecutiveOverview,
  "01f1a7b0e313131dab068140923e564d": ConversionFunnel,
  "01f1a7c2d9ea18cf9279ce15088b14eb": ProductPerformance,
  "01f1a7c2da7410aebd531eb12d92a64b": CustomerSegmentation,
  "01f1a7b450501be08f41c14ae629ab10": SearchDiscovery,
  "01f1a7b450931683895f7f606a47de58": CohortRetention,
}

export function EcommerceNativeDashboard({ dashboardId }: { dashboardId: string }) {
  const state = useDashboardSnapshot(dashboardId)
  const Layout = LAYOUTS[dashboardId]

  if (state.status === "error" || !Layout) {
    return (
      <div className="flex h-64 items-center justify-center rounded-lg border border-gray-200 text-sm text-gray-600 dark:border-gray-700 dark:text-gray-400">
        Dashboard data could not be loaded. Please refresh the page.
      </div>
    )
  }
  if (state.status === "loading") {
    return (
      <div className="flex h-64 items-center justify-center rounded-lg border border-[#e0e3e7] bg-[#f6f7f9] dark:border-gray-700 dark:bg-gray-950/60">
        <div className="h-9 w-9 animate-spin rounded-full border-2 border-purple-600 border-t-transparent" />
      </div>
    )
  }
  return <DashboardFrame pages={[{ id: "main", label: state.snapshot.displayName, content: <Layout d={state.snapshot.datasets} /> }]} />
}
