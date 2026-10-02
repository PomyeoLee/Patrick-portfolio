"use client"

import { useEffect, useState } from "react"

export type DashboardRow = Record<string, string | number | null>

/** Written by `npm run dashboards:export` to public/data/dashboards/<dashboardId>.json */
export type DashboardSnapshot = {
  dashboardId: string
  displayName: string
  exportedAt: string
  datasets: Record<string, DashboardRow[]>
}

type SnapshotState =
  | { status: "loading" }
  | { status: "ready"; snapshot: DashboardSnapshot }
  | { status: "error"; error: string }

export function useDashboardSnapshot(dashboardId: string): SnapshotState {
  const [state, setState] = useState<SnapshotState>({ status: "loading" })

  useEffect(() => {
    let cancelled = false
    setState({ status: "loading" })
    fetch(`/data/dashboards/${dashboardId}.json`)
      .then(async (res) => {
        if (!res.ok) throw new Error(`Snapshot request failed (${res.status})`)
        return (await res.json()) as DashboardSnapshot
      })
      .then((snapshot) => {
        if (!cancelled) setState({ status: "ready", snapshot })
      })
      .catch((e: unknown) => {
        if (!cancelled) setState({ status: "error", error: e instanceof Error ? e.message : String(e) })
      })
    return () => {
      cancelled = true
    }
  }, [dashboardId])

  return state
}

const compactFormatter = new Intl.NumberFormat("en-US", { notation: "compact", maximumFractionDigits: 1 })
const integerFormatter = new Intl.NumberFormat("en-US", { maximumFractionDigits: 0 })

export const formatCompact = (n: number) => compactFormatter.format(n)
export const formatInteger = (n: number) => integerFormatter.format(n)

export function formatDate(value: string, options: Intl.DateTimeFormatOptions) {
  const iso = value.length === 10 ? `${value}T00:00:00Z` : value
  return new Intl.DateTimeFormat("en-US", { timeZone: "UTC", ...options }).format(new Date(iso))
}
