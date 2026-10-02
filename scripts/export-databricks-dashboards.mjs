// Exports every Lakeview dashboard the service principal can see.
//   .dashboard-export/<id>/        raw definition, metadata and query results (gitignored)
//   public/data/dashboards/<id>.json  typed snapshot read by the native dashboards on the site
// Usage: npm run dashboards:export
// Optional: DATABRICKS_SQL_TOKEN (e.g. a personal access token) is tried when the service principal
// lacks read access on a dataset's tables.
import fs from "node:fs"
import path from "node:path"
import { fileURLToPath } from "node:url"

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..")
const rawDir = path.join(root, ".dashboard-export")
const snapshotDir = path.join(root, "public", "data", "dashboards")

const envFile = path.join(root, ".env.local")
if (fs.existsSync(envFile)) {
  for (const line of fs.readFileSync(envFile, "utf8").split("\n")) {
    const m = line.match(/^\s*([A-Z0-9_]+)\s*=\s*"?([^"]*)"?\s*$/)
    if (m && !process.env[m[1]]) process.env[m[1]] = m[2]
  }
}

const ws = process.env.DATABRICKS_WORKSPACE_URL.replace(/\/$/, "")
const wsId = process.env.DATABRICKS_WORKSPACE_ID
const warehouseId = process.env.DATABRICKS_WAREHOUSE_ID
const fallbackSqlToken = process.env.DATABRICKS_SQL_TOKEN
const basic = Buffer.from(
  `${process.env.DATABRICKS_CLIENT_ID}:${process.env.DATABRICKS_CLIENT_SECRET}`
).toString("base64")

const KNOWN_IDS = [
  process.env.DATABRICKS_DASHBOARD_ID,
  "01f1a7c1e26114608f65e40f35654a44",
  "01f1a7b0e313131dab068140923e564d",
  "01f1a7c2d9ea18cf9279ce15088b14eb",
  "01f1a7c2da7410aebd531eb12d92a64b",
  "01f1a7b450501be08f41c14ae629ab10",
  "01f1a7b450931683895f7f606a47de58",
].filter(Boolean)

// Datasets whose raw result exceeds the 10k row limit; reduced to the resolution their chart needs.
const SQL_OVERRIDES = {
  // D2 cart→purchase CDF is grouped by fractional minutes; keep the last cumulative value per whole minute.
  a2000003: (sql) =>
    `SELECT CAST(FLOOR(minutes_to_purchase) AS INT) AS minutes_to_purchase, MAX(cumulative_pct) AS cumulative_pct
     FROM (${sql}) GROUP BY 1 ORDER BY 1`,
}

const NUMERIC_TYPES = /^(TINYINT|SMALLINT|INT|BIGINT|LONG|FLOAT|DOUBLE|DECIMAL)/i

const tokRes = await fetch(`${ws}/oidc/v1/token?o=${wsId}`, {
  method: "POST",
  headers: { "Content-Type": "application/x-www-form-urlencoded", Authorization: `Basic ${basic}` },
  body: new URLSearchParams({ grant_type: "client_credentials", scope: "all-apis" }),
})
if (!tokRes.ok) throw new Error(`token ${tokRes.status}: ${await tokRes.text()}`)
const token = (await tokRes.json()).access_token

async function api(p, init = {}, bearer = token) {
  const res = await fetch(`${ws}${p}`, {
    ...init,
    headers: { Authorization: `Bearer ${bearer}`, "Content-Type": "application/json", ...(init.headers ?? {}) },
  })
  const text = await res.text()
  let body
  try {
    body = JSON.parse(text)
  } catch {
    body = text
  }
  return { ok: res.ok, status: res.status, body }
}

function paramToStatement(p) {
  const vals = p.defaultSelection?.values?.values ?? []
  if (p.defaultSelection?.range || vals.length !== 1) return null
  return { name: p.keyword, value: String(vals[0].value), type: p.dataType ?? "STRING" }
}

async function runSqlAs(statement, parameters, bearer) {
  let r = await api(
    `/api/2.0/sql/statements`,
    {
      method: "POST",
      body: JSON.stringify({
        warehouse_id: warehouseId,
        statement,
        parameters,
        wait_timeout: "50s",
        on_wait_timeout: "CONTINUE",
        format: "JSON_ARRAY",
        disposition: "INLINE",
        row_limit: 10000,
      }),
    },
    bearer
  )
  while (r.ok && ["PENDING", "RUNNING"].includes(r.body.status?.state)) {
    await new Promise((s) => setTimeout(s, 3000))
    r = await api(`/api/2.0/sql/statements/${r.body.statement_id}`, {}, bearer)
  }
  if (!r.ok || r.body.status?.state !== "SUCCEEDED") return { error: r.body.status?.error ?? r.body }

  const columns = r.body.manifest.schema.columns.map((c) => ({ name: c.name, type: c.type_text }))
  const rows = []
  let chunk = r.body.result
  while (chunk) {
    rows.push(...(chunk.data_array ?? []))
    if (!chunk.next_chunk_internal_link) break
    chunk = (await api(chunk.next_chunk_internal_link, {}, bearer)).body
  }
  return { columns, rowCount: rows.length, truncated: !!r.body.manifest.truncated, rows }
}

async function runSql(statement, parameters) {
  const first = await runSqlAs(statement, parameters, token)
  if (!first.error || !fallbackSqlToken) return first
  const second = await runSqlAs(statement, parameters, fallbackSqlToken)
  return second.error ? { error: { servicePrincipal: first.error, fallbackToken: second.error } } : second
}

function toRecords({ columns, rows }) {
  return rows.map((row) =>
    Object.fromEntries(
      columns.map((c, i) => {
        const v = row[i]
        return [c.name, v !== null && NUMERIC_TYPES.test(c.type) ? Number(v) : v]
      })
    )
  )
}

const ids = new Set(KNOWN_IDS)
let pageToken
do {
  const q = new URLSearchParams({ page_size: "100", ...(pageToken ? { page_token: pageToken } : {}) })
  const r = await api(`/api/2.0/lakeview/dashboards?${q}`)
  if (!r.ok) {
    console.log("list dashboards failed:", r.status, JSON.stringify(r.body))
    break
  }
  for (const d of r.body.dashboards ?? []) ids.add(d.dashboard_id)
  pageToken = r.body.next_page_token
} while (pageToken)

fs.mkdirSync(snapshotDir, { recursive: true })
const summary = []

for (const id of ids) {
  const dir = path.join(rawDir, id)
  fs.mkdirSync(dir, { recursive: true })
  const draft = await api(`/api/2.0/lakeview/dashboards/${id}`)
  const published = await api(`/api/2.0/lakeview/dashboards/${id}/published`)
  fs.writeFileSync(path.join(dir, "metadata.json"), JSON.stringify({ draft: draft.body, published: published.body }, null, 2))

  const name = draft.body?.display_name ?? published.body?.display_name
  const entry = { id, name, datasets: [], pages: [] }
  if (!draft.ok || !draft.body.serialized_dashboard) {
    entry.error = `definition unavailable (draft ${draft.status}, published ${published.status})`
    summary.push(entry)
    console.log(`✗ ${id}: ${entry.error}`)
    continue
  }
  const def = JSON.parse(draft.body.serialized_dashboard)
  fs.writeFileSync(path.join(dir, "definition.json"), JSON.stringify(def, null, 2))

  entry.pages = (def.pages ?? []).map((pg) => ({
    name: pg.displayName ?? pg.name,
    widgets: (pg.layout ?? []).map((l) => ({
      name: l.widget?.name,
      type: l.widget?.spec?.widgetType,
      title: l.widget?.spec?.frame?.title,
      datasets: (l.widget?.queries ?? []).map((q) => q.query?.datasetName),
    })),
  }))

  const snapshotDatasets = {}
  for (const ds of def.datasets ?? []) {
    const rawSql = (ds.queryLines ?? [ds.query]).join("").trim().replace(/;$/, "")
    const sql = SQL_OVERRIDES[ds.name] ? SQL_OVERRIDES[ds.name](rawSql) : rawSql
    const params = ds.parameters ?? []
    const stmtParams = params.map(paramToStatement)
    const dsEntry = { name: ds.name, displayName: ds.displayName, parameters: params, sql }
    const safe = (ds.displayName ?? ds.name).replace(/[^\w.-]+/g, "_")
    if (stmtParams.some((p) => p === null)) {
      dsEntry.result = { error: "skipped: parameter with range/multi default not auto-bindable" }
    } else {
      const res = await runSql(sql, stmtParams)
      if (res.error) {
        dsEntry.result = { error: res.error }
      } else {
        dsEntry.result = { rowCount: res.rowCount, truncated: res.truncated, columns: res.columns }
        fs.writeFileSync(path.join(dir, `data_${safe}.json`), JSON.stringify(res, null, 2))
        snapshotDatasets[ds.name] = toRecords(res)
      }
    }
    entry.datasets.push(dsEntry)
    const r = dsEntry.result
    console.log(
      `${r.error ? "✗" : "✓"} ${name} / ${ds.displayName ?? ds.name}: ${
        r.error ? JSON.stringify(r.error).slice(0, 200) : r.rowCount + " rows"
      }`
    )
  }

  for (const d of entry.datasets) if (d.result.truncated) console.log(`  ⚠ ${name} / ${d.name} hit the row limit`)
  const complete = entry.datasets.length > 0 && entry.datasets.every((d) => !d.result.error)
  if (complete) {
    fs.writeFileSync(
      path.join(snapshotDir, `${id}.json`),
      JSON.stringify({ dashboardId: id, displayName: name, exportedAt: new Date().toISOString(), datasets: snapshotDatasets })
    )
  }
  entry.snapshot = complete ? `public/data/dashboards/${id}.json` : null
  summary.push(entry)
}

fs.writeFileSync(path.join(rawDir, "summary.json"), JSON.stringify(summary, null, 2))
console.log(`\nDone: ${summary.length} dashboards.`)
for (const e of summary) console.log(`  ${e.snapshot ? "snapshot ✓" : "snapshot ✗"}  ${e.name ?? e.id}`)
