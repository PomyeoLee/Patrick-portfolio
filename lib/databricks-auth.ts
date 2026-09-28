export function normalizeWorkspaceUrl(url: string) {
  return url.replace(/\/$/, "")
}

export function getServicePrincipalConfig() {
  const workspaceUrlRaw = process.env.DATABRICKS_WORKSPACE_URL
  const workspaceId = process.env.DATABRICKS_WORKSPACE_ID
  const clientId = process.env.DATABRICKS_CLIENT_ID
  const clientSecret = process.env.DATABRICKS_CLIENT_SECRET

  if (!workspaceUrlRaw) {
    throw new Error("Set DATABRICKS_WORKSPACE_URL in .env.local.")
  }
  if (!workspaceId) {
    throw new Error("Set DATABRICKS_WORKSPACE_ID in .env.local.")
  }
  if (!clientId || !clientSecret) {
    throw new Error(
      "Set DATABRICKS_CLIENT_ID and DATABRICKS_CLIENT_SECRET (OAuth secret for your embedding service principal)."
    )
  }

  return {
    workspaceUrl: normalizeWorkspaceUrl(workspaceUrlRaw),
    workspaceId,
    basicAuth: Buffer.from(`${clientId}:${clientSecret}`).toString("base64"),
  }
}

export async function fetchServicePrincipalToken(): Promise<string> {
  const { workspaceUrl, workspaceId, basicAuth } = getServicePrincipalConfig()

  const res = await fetch(`${workspaceUrl}/oidc/v1/token?o=${encodeURIComponent(workspaceId)}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      Authorization: `Basic ${basicAuth}`,
    },
    body: new URLSearchParams({ grant_type: "client_credentials", scope: "all-apis" }),
  })

  if (!res.ok) {
    const text = await res.text()
    throw new Error(`Databricks OIDC token failed (${res.status}): ${text}`)
  }

  const json = (await res.json()) as { access_token: string }
  return json.access_token
}
