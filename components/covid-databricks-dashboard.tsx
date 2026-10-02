"use client"

import { LayoutDashboard } from "lucide-react"
import { CovidNativeDashboard } from "@/components/dashboards/covid-native-dashboard"
import { formatDate, useDashboardSnapshot } from "@/lib/dashboard-snapshot"

const COVID_DASHBOARD_ID = "01f1360c3e9b1353b552230b71ad8da2"

export function CovidDatabricksDashboard() {
  const snapshotState = useDashboardSnapshot(COVID_DASHBOARD_ID)

  return (
    <section className="mb-10 bg-white dark:bg-gray-800 rounded-xl shadow p-7 overflow-hidden">
      <div className="mb-5 max-w-2xl">
        <h2 className="mb-2 flex items-center gap-2 text-2xl font-bold">
          <LayoutDashboard className="h-5 w-5 shrink-0 text-purple-600" />
          Interactive COVID-19 &amp; Mobility Dashboard
        </h2>
        <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">
          Built from the gold-layer tables of the Databricks pipeline: 14 datasets covering national trends, state
          outcomes and mobility correlations. Hover any chart for exact values.
        </p>
        {snapshotState.status === "ready" ? (
          <p className="mt-1 text-xs text-gray-500 dark:text-gray-500">
            Data snapshot exported on{" "}
            {formatDate(snapshotState.snapshot.exportedAt, { month: "short", day: "numeric", year: "numeric" })}
          </p>
        ) : null}
      </div>

      {snapshotState.status === "ready" ? (
        <CovidNativeDashboard snapshot={snapshotState.snapshot} />
      ) : snapshotState.status === "error" ? (
        <div className="flex h-64 items-center justify-center rounded-lg border border-gray-200 dark:border-gray-700 text-sm text-gray-600 dark:text-gray-400">
          Dashboard data could not be loaded. Please refresh the page.
        </div>
      ) : (
        <div className="flex h-64 items-center justify-center">
          <div className="h-9 w-9 border-2 border-purple-600 border-t-transparent rounded-full animate-spin" />
        </div>
      )}
    </section>
  )
}
