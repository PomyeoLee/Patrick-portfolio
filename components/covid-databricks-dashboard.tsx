"use client"

import { DatabricksDashboardEmbed } from "@/components/databricks-dashboard-embed"

export function CovidDatabricksDashboard() {
  return (
    <DatabricksDashboardEmbed
      title="Interactive Lakeview Dashboard"
      description="Live AI/BI dashboard built on Databricks, embedded with real-time data access via server-side token authentication (service principal). Explore the full pipeline interactively."
    />
  )
}
