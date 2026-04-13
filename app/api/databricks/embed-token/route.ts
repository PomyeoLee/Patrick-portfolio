import { NextResponse } from "next/server"

export const dynamic = "force-dynamic"
export const revalidate = 0

function normalizeWorkspaceUrl(url: string) {
  return url.replace(/\/$/, "")
}

function decodeJwtExpSeconds(accessToken: string): number | undefined {
  // JWT: header.payload.signature (base64url)
  const parts = accessToken.split(".")
  if (parts.length < 2) return undefined

  const payloadB64Url = parts[1]
  const payloadB64 = payloadB64Url.replace(/-/g, "+").replace(/_/g, "/")
  const padded = payloadB64 + "=".repeat((4 - (payloadB64.length % 4)) % 4)

  try {
    const json = Buffer.from(padded, "base64").toString("utf8")
    const payload = JSON.parse(json) as { exp?: unknown }
    return typeof payload.exp === "number" ? payload.exp : undefined
  } catch {
    return undefined
  }
}

/**
 * Databricks "embedding for external users" token flow (service principal).
 * See: https://docs.databricks.com/aws/en/dashboards/share/embedding/external-embed
 */
async function mintScopedEmbedToken(): Promise<{ access_token: string; expires_in?: number }> {
  const workspaceUrlRaw = process.env.DATABRICKS_WORKSPACE_URL
  const clientId = process.env.DATABRICKS_CLIENT_ID
  const clientSecret = process.env.DATABRICKS_CLIENT_SECRET
  const dashboardId = process.env.DATABRICKS_DASHBOARD_ID
  const externalViewerId = process.env.DATABRICKS_EXTERNAL_VIEWER_ID ?? "portfolio-public-viewer"
  const externalValue = process.env.DATABRICKS_EXTERNAL_VALUE ?? ""

  if (!workspaceUrlRaw) {
    throw new Error("Set DATABRICKS_WORKSPACE_URL in .env.local.")
  }
  if (!dashboardId) {
    throw new Error("Set DATABRICKS_DASHBOARD_ID in .env.local.")
  }
  if (!clientId || !clientSecret) {
    throw new Error(
      "Set DATABRICKS_CLIENT_ID and DATABRICKS_CLIENT_SECRET (OAuth secret for your embedding service principal)."
    )
  }

  const workspaceUrl = normalizeWorkspaceUrl(workspaceUrlRaw)
  const basicAuth = Buffer.from(`${clientId}:${clientSecret}`).toString("base64")

  const oidcBody = new URLSearchParams({
    grant_type: "client_credentials",
    scope: "all-apis",
  })

  const oidcRes = await fetch(`${workspaceUrl}/oidc/v1/token`, {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      Authorization: `Basic ${basicAuth}`,
    },
    body: oidcBody,
  })

  if (!oidcRes.ok) {
    const text = await oidcRes.text()
    throw new Error(`Databricks OIDC token failed (${oidcRes.status}): ${text}`)
  }

  const oidcJson = (await oidcRes.json()) as { access_token: string }
  const oidcToken = oidcJson.access_token

  const tokenInfoUrl = new URL(
    `${workspaceUrl}/api/2.0/lakeview/dashboards/${dashboardId}/published/tokeninfo`
  )
  tokenInfoUrl.searchParams.set("external_viewer_id", externalViewerId)
  tokenInfoUrl.searchParams.set("external_value", externalValue)

  const tokenInfoRes = await fetch(tokenInfoUrl.toString(), {
    headers: { Authorization: `Bearer ${oidcToken}` },
  })

  if (!tokenInfoRes.ok) {
    const text = await tokenInfoRes.text()
    throw new Error(`Databricks tokeninfo failed (${tokenInfoRes.status}): ${text}`)
  }

  const tokenInfo = (await tokenInfoRes.json()) as Record<string, unknown>
  const authorizationDetails = tokenInfo.authorization_details

  const scopedBody = new URLSearchParams()
  for (const [key, value] of Object.entries(tokenInfo)) {
    if (key === "authorization_details") continue
    if (value === undefined || value === null) continue
    scopedBody.append(
      key,
      typeof value === "object" ? JSON.stringify(value) : String(value)
    )
  }
  scopedBody.set("grant_type", "client_credentials")
  scopedBody.set("authorization_details", JSON.stringify(authorizationDetails))

  const scopedRes = await fetch(`${workspaceUrl}/oidc/v1/token`, {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      Authorization: `Basic ${basicAuth}`,
    },
    body: scopedBody,
  })

  if (!scopedRes.ok) {
    const text = await scopedRes.text()
    throw new Error(`Databricks scoped token failed (${scopedRes.status}): ${text}`)
  }

  return (await scopedRes.json()) as { access_token: string; expires_in?: number }
}

export async function GET() {
  try {
    const tokenData = await mintScopedEmbedToken()
    const workspaceUrlRaw = process.env.DATABRICKS_WORKSPACE_URL
    const workspaceId = process.env.DATABRICKS_WORKSPACE_ID
    const dashboardId = process.env.DATABRICKS_DASHBOARD_ID

    if (!workspaceUrlRaw || !workspaceId || !dashboardId) {
      throw new Error(
        "Missing required env vars: DATABRICKS_WORKSPACE_URL, DATABRICKS_WORKSPACE_ID, DATABRICKS_DASHBOARD_ID."
      )
    }

    const tokenExpiresAt = decodeJwtExpSeconds(tokenData.access_token)
    const nowMs = Date.now()

    return NextResponse.json(
      {
        accessToken: tokenData.access_token,
        expiresIn: tokenData.expires_in ?? 3600,
        tokenExpiresAt,
        serverTimeMs: nowMs,
        instanceUrl: normalizeWorkspaceUrl(workspaceUrlRaw),
        workspaceId,
        dashboardId,
      },
      {
        headers: {
          "Cache-Control": "no-store, no-cache, must-revalidate, max-age=0",
          Pragma: "no-cache",
        },
      }
    )
  } catch (e) {
    const message = e instanceof Error ? e.message : "Unknown error"
    return NextResponse.json(
      {
        error: message,
        hint:
          "Create a service principal for external embedding, grant it access to the published dashboard, and set DATABRICKS_CLIENT_ID / DATABRICKS_CLIENT_SECRET in .env.local.",
      },
      { status: 503 }
    )
  }
}
