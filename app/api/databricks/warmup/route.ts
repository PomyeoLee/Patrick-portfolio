import { NextResponse } from "next/server"
import { fetchServicePrincipalToken, getServicePrincipalConfig } from "@/lib/databricks-auth"

export const dynamic = "force-dynamic"
export const revalidate = 0

const noStoreHeaders = {
  "Cache-Control": "no-store, no-cache, must-revalidate, max-age=0",
  Pragma: "no-cache",
}

/**
 * Wakes the SQL warehouse behind the embedded dashboards. A stopped warehouse makes embedded
 * tiles fail with "The request could not be processed by the warehouse", so the client polls
 * this until `ready` before initializing the dashboard. Submitting a statement auto-starts the
 * warehouse and only requires CAN USE for the service principal.
 */
export async function GET() {
  const warehouseId = process.env.DATABRICKS_WAREHOUSE_ID
  if (!warehouseId) {
    return NextResponse.json({ ready: true, skipped: true }, { headers: noStoreHeaders })
  }

  try {
    const { workspaceUrl, workspaceId } = getServicePrincipalConfig()
    const token = await fetchServicePrincipalToken()

    const res = await fetch(
      `${workspaceUrl}/api/2.0/sql/statements?o=${encodeURIComponent(workspaceId)}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
        body: JSON.stringify({
          warehouse_id: warehouseId,
          statement: "SELECT 1",
          wait_timeout: "10s",
          on_wait_timeout: "CONTINUE",
        }),
      }
    )

    if (!res.ok) {
      const text = await res.text()
      throw new Error(`Warehouse warm-up failed (${res.status}): ${text}`)
    }

    const json = (await res.json()) as { status?: { state?: string } }
    const state = json.status?.state ?? "UNKNOWN"

    return NextResponse.json({ ready: state === "SUCCEEDED", state }, { headers: noStoreHeaders })
  } catch (e) {
    const message = e instanceof Error ? e.message : "Unknown error"
    return NextResponse.json({ ready: false, error: message }, { status: 503, headers: noStoreHeaders })
  }
}
