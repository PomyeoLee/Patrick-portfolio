"use client"

import { useTheme } from "next-themes"
import { LayoutDashboard } from "lucide-react"
import { useCallback, useEffect, useRef, useState, type ReactNode } from "react"
import type { DatabricksDashboard } from "@databricks/aibi-client"

type EmbedConfig = {
  accessToken: string
  expiresIn?: number
  tokenExpiresAt?: number
  serverTimeMs?: number
  instanceUrl: string
  workspaceId: string
  dashboardId: string
  displayName?: string | null
}

type DatabricksDashboardEmbedProps = {
  dashboardId?: string
  title?: string
  description?: string
  children?: ReactNode
  unframed?: boolean
  /** Defer iframe init until near the viewport; keep mounted after first load. */
  lazyUntilVisible?: boolean
}

export function DatabricksDashboardEmbed({
  dashboardId,
  title,
  description,
  children,
  unframed = false,
  lazyUntilVisible = false,
}: DatabricksDashboardEmbedProps) {
  const hostRef = useRef<HTMLElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const dashboardRef = useRef<DatabricksDashboard | null>(null)
  const { resolvedTheme } = useTheme()
  const [isVisible, setIsVisible] = useState(!lazyUntilVisible)
  const [status, setStatus] = useState<"loading" | "ready" | "error">("loading")
  const [errorMessage, setErrorMessage] = useState<string | null>(null)
  const [heading, setHeading] = useState(title ?? "")

  const fetchEmbedConfig = useCallback(async (): Promise<EmbedConfig> => {
    const url = dashboardId
      ? `/api/databricks/embed-token?${new URLSearchParams({ dashboardId }).toString()}`
      : "/api/databricks/embed-token"
    const res = await fetch(url, { cache: "no-store" })
    const data = await res.json()
    if (!res.ok) {
      const err = data as { error?: string; hint?: string }
      throw new Error([err.error, err.hint].filter(Boolean).join(" "))
    }
    return data as EmbedConfig
  }, [dashboardId])

  const remainingTokenSeconds = useCallback((cfg: EmbedConfig): number | null => {
    if (typeof cfg.tokenExpiresAt === "number" && cfg.tokenExpiresAt > 0) {
      return Math.floor(cfg.tokenExpiresAt - Date.now() / 1000)
    }
    if (typeof cfg.expiresIn === "number" && cfg.expiresIn > 0) {
      if (typeof cfg.serverTimeMs === "number" && cfg.serverTimeMs > 0) {
        const elapsedSeconds = (Date.now() - cfg.serverTimeMs) / 1000
        return Math.floor(cfg.expiresIn - elapsedSeconds)
      }
      return Math.floor(cfg.expiresIn)
    }
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
    setHeading(title ?? "")
  }, [title, dashboardId])

  useEffect(() => {
    if (!lazyUntilVisible || isVisible) return
    const el = hostRef.current
    if (!el) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return
        setIsVisible(true)
        observer.disconnect()
      },
      { rootMargin: "200px 0px", threshold: 0.01 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [lazyUntilVisible, isVisible])

  useEffect(() => {
    if (!isVisible) return

    let cancelled = false
    let getNewTokenInFlight: Promise<string> | null = null

    async function run() {
      if (!containerRef.current) return

      setStatus("loading")
      setErrorMessage(null)

      try {
        const config = await fetchFreshEnoughConfig(300)
        if (cancelled || !containerRef.current) return

        // Prefer the authored title when provided (e.g. "Dashboard 1 — Executive Overview").
        // Fall back to Databricks display name only when no title was passed.
        if (!title && config.displayName) {
          setHeading(config.displayName.replace(/^(?:Dashboard\s*\d+|D\d+)\s*[—–-]\s*/i, "").trim())
        }

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
  }, [isVisible, fetchFreshEnoughConfig, resolvedTheme, dashboardId, title])

  const showLoading = !isVisible || status === "loading"

  const content = (
    <>
      <h2
        className={
          unframed
            ? "mb-2 flex items-center gap-2 text-lg font-semibold"
            : "mb-4 flex items-center gap-2 text-2xl font-bold"
        }
      >
        <LayoutDashboard
          className={
            unframed
              ? "h-4 w-4 shrink-0 text-purple-600"
              : "h-5 w-5 shrink-0 text-purple-600"
          }
        />
        {heading}
      </h2>
      {description ? (
        <p className="text-gray-600 dark:text-gray-400 text-sm mb-5 leading-relaxed">{description}</p>
      ) : null}
      <div className="rounded-lg border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900/50 relative w-full aspect-video overflow-hidden">
        {showLoading && (
          <div className="absolute inset-0 flex items-center justify-center z-10 bg-gray-50/90 dark:bg-gray-900/90">
            <div className="flex flex-col items-center gap-3">
              <div className="h-9 w-9 border-2 border-purple-600 border-t-transparent rounded-full animate-spin" />
              <p className="text-sm text-gray-600 dark:text-gray-400">Loading dashboard…</p>
            </div>
          </div>
        )}

        {isVisible && status === "error" && (
          <div className="absolute inset-0 flex items-center justify-center p-8 z-10 overflow-y-auto">
            <div className="max-w-xl text-center space-y-3">
              <p className="text-sm font-medium text-gray-800 dark:text-gray-200">
                Dashboard could not be embedded
              </p>
              <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed text-left">{errorMessage}</p>
              {dashboardId ? (
                <p className="text-xs text-gray-500 dark:text-gray-500 text-left font-mono break-all">
                  Dashboard ID: {dashboardId}
                </p>
              ) : null}
            </div>
          </div>
        )}

        <div
          ref={containerRef}
          className="absolute inset-0 w-full h-full min-h-0 overflow-hidden"
          aria-busy={showLoading}
        />
      </div>
      {children}
    </>
  )

  if (unframed) {
    return <div ref={hostRef}>{content}</div>
  }

  return (
    <section
      ref={hostRef}
      className="mb-10 bg-white dark:bg-gray-800 rounded-xl shadow p-7 overflow-hidden"
    >
      {content}
    </section>
  )
}
