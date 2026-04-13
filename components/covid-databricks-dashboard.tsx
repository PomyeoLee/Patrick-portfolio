"use client"

import { useTheme } from "next-themes"
import { LayoutDashboard } from "lucide-react"
import { useCallback, useEffect, useRef, useState } from "react"
import type { DatabricksDashboard } from "@databricks/aibi-client"

type EmbedConfig = {
  accessToken: string
  expiresIn?: number
  tokenExpiresAt?: number
  serverTimeMs?: number
  instanceUrl: string
  workspaceId: string
  dashboardId: string
}

export function CovidDatabricksDashboard() {
  const containerRef = useRef<HTMLDivElement>(null)
  const dashboardRef = useRef<DatabricksDashboard | null>(null)
  const { resolvedTheme } = useTheme()
  const [status, setStatus] = useState<"loading" | "ready" | "error">("loading")
  const [errorMessage, setErrorMessage] = useState<string | null>(null)

  const fetchEmbedConfig = useCallback(async (): Promise<EmbedConfig> => {
    const res = await fetch("/api/databricks/embed-token", { cache: "no-store" })
    const data = await res.json()
    if (!res.ok) {
      const err = data as { error?: string; hint?: string }
      throw new Error([err.error, err.hint].filter(Boolean).join(" "))
    }
    return data as EmbedConfig
  }, [])

  const remainingTokenSeconds = useCallback((cfg: EmbedConfig): number | null => {
    if (typeof cfg.tokenExpiresAt === "number" && cfg.tokenExpiresAt > 0) {
      return Math.floor(cfg.tokenExpiresAt - Date.now() / 1000)
    }
    if (typeof cfg.expiresIn === "number" && cfg.expiresIn > 0) return Math.floor(cfg.expiresIn)
    return null
  }, [])

  const fetchFreshEnoughConfig = useCallback(
    async (minRemainingSeconds: number): Promise<EmbedConfig> => {
      let last: EmbedConfig | null = null
      for (let attempt = 0; attempt < 3; attempt++) {
        const cfg = await fetchEmbedConfig()
        last = cfg
        const remaining = remainingTokenSeconds(cfg)
        if (remaining === null || remaining >= minRemainingSeconds) return cfg
      }
      return last ?? (await fetchEmbedConfig())
    },
    [fetchEmbedConfig, remainingTokenSeconds]
  )

  useEffect(() => {
    let cancelled = false
    let getNewTokenInFlight: Promise<string> | null = null

    async function run() {
      if (!containerRef.current) return

      setStatus("loading")
      setErrorMessage(null)

      try {
        // Ensure we don't start initialization with a near-expiry token.
        let config = await fetchFreshEnoughConfig(300)
        if (cancelled || !containerRef.current) return

        const { DatabricksDashboard } = await import("@databricks/aibi-client")

        const colorScheme =
          resolvedTheme === "dark" ? "dark" : resolvedTheme === "light" ? "light" : "light dark"

        const dashboard = new DatabricksDashboard({
          instanceUrl: config.instanceUrl,
          workspaceId: config.workspaceId,
          dashboardId: config.dashboardId,
          token: config.accessToken,
          container: containerRef.current,
          colorScheme,
          getNewToken: async () => {
            if (!getNewTokenInFlight) {
              getNewTokenInFlight = (async () => {
                const fresh = await fetchFreshEnoughConfig(300)
                return fresh.accessToken
              })().finally(() => {
                getNewTokenInFlight = null
              })
            }
            return await getNewTokenInFlight
          },
        })

        dashboardRef.current = dashboard
        await dashboard.initialize()
        dashboardRef.current = dashboard
        if (!cancelled) setStatus("ready")
      } catch (e) {
        if (cancelled) return
        setStatus("error")
        setErrorMessage(e instanceof Error ? e.message : "Failed to load dashboard.")
      }
    }

    void run()

    return () => {
      cancelled = true
      dashboardRef.current?.destroy()
      dashboardRef.current = null
    }
  }, [fetchEmbedConfig, resolvedTheme])

  return (
    <section className="mb-10 bg-white dark:bg-gray-800 rounded-xl shadow p-7 overflow-hidden">
      <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
        <LayoutDashboard className="w-5 h-5 text-purple-600 shrink-0" />
        Interactive Lakeview Dashboard
      </h2>
      <p className="text-gray-600 dark:text-gray-400 text-sm mb-5 leading-relaxed">
        Live AI/BI dashboard built on Databricks, embedded with real-time data access via server-side token authentication (service principal). Explore
        the full pipeline interactively.
      </p>

      <div className="rounded-lg border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900/50 relative w-full min-h-[min(85vh,920px)] h-[min(85vh,920px)]">
        {status === "loading" && (
          <div className="absolute inset-0 flex items-center justify-center z-10 bg-gray-50/90 dark:bg-gray-900/90">
            <div className="flex flex-col items-center gap-3">
              <div className="h-9 w-9 border-2 border-purple-600 border-t-transparent rounded-full animate-spin" />
              <p className="text-sm text-gray-600 dark:text-gray-400">Loading dashboard…</p>
            </div>
          </div>
        )}

        {status === "error" && (
          <div className="absolute inset-0 flex items-center justify-center p-8 z-10">
            <div className="max-w-lg text-center space-y-3">
              <p className="text-sm font-medium text-gray-800 dark:text-gray-200">
                Dashboard could not be embedded
              </p>
              <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">{errorMessage}</p>
            </div>
          </div>
        )}

        <div
          ref={containerRef}
          className="absolute inset-0 w-full h-full min-h-0 overflow-hidden"
          aria-busy={status === "loading"}
        />
      </div>
    </section>
  )
}
