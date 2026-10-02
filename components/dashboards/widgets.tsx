"use client"

import { useMemo, useRef, useState, type ReactNode } from "react"
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Line,
  LineChart,
  Pie,
  PieChart,
  Scatter,
  ScatterChart,
  XAxis,
  YAxis,
} from "recharts"
import { ChartContainer, ChartTooltip, type ChartConfig } from "@/components/ui/chart"
import { formatCompact, formatInteger, type DashboardRow } from "@/lib/dashboard-snapshot"

/** Databricks AI/BI default categorical palette, in assignment order. */
export const PALETTE = ["#077A9D", "#FFAB00", "#00A972", "#FF3621", "#8BCAE7", "#AB4057", "#99DDB4", "#FCA4A1", "#919191", "#BF7080"]
export const TEAL = PALETTE[0]
export const BLUES = ["#deebf7", "#9ecae1", "#4292c6", "#08306b"]
export const REDS = ["#fee0d2", "#fc9272", "#de2d26", "#67000d"]

export const AXIS_LABEL = { fill: "currentColor", fontSize: 11, fontWeight: 600 }
export const TICK = { fontSize: 10 }
export const CHART = "aspect-auto w-full text-[10px]"
export const singleConfig = { value: { label: "Value", color: TEAL } } satisfies ChartConfig

export const compact2 = new Intl.NumberFormat("en-US", { notation: "compact", maximumFractionDigits: 2 })
const decimal2 = new Intl.NumberFormat("en-US", { maximumFractionDigits: 2 })

export const axisNumber = (n: number) => (Math.abs(n) >= 1000 ? formatCompact(n) : decimal2.format(n))
export const valueText = (n: number) => (Number.isInteger(n) ? formatInteger(n) : decimal2.format(n))
export const counterText = (n: number) => (Math.abs(n) >= 1000 ? compact2.format(n) : decimal2.format(n))

export function rampColor(stops: string[], t: number) {
  const clamped = Math.min(1, Math.max(0, Number.isFinite(t) ? t : 0))
  const scaled = clamped * (stops.length - 1)
  const i = Math.min(stops.length - 2, Math.floor(scaled))
  const local = scaled - i
  const a = stops[i].match(/\w\w/g)!.map((h) => parseInt(h, 16))
  const b = stops[i + 1].match(/\w\w/g)!.map((h) => parseInt(h, 16))
  return `rgb(${a.map((v, k) => Math.round(v + (b[k] - v) * local)).join(",")})`
}

type Value = string | number | null | undefined

/** Databricks' default ordering for un-sorted axes: numeric ascending, otherwise plain string order. */
export function compareValues(a: Value, b: Value) {
  if (typeof a === "number" && typeof b === "number") return a - b
  const sa = String(a)
  const sb = String(b)
  return sa < sb ? -1 : sa > sb ? 1 : 0
}

const uniqueSorted = (values: Value[]) => Array.from(new Set(values)).sort(compareValues)
const num = (v: Value) => (typeof v === "number" ? v : Number(v ?? 0))

export function Widget({ title, className, children }: { title?: string; className?: string; children: ReactNode }) {
  return (
    <div
      className={`min-w-0 rounded border border-[#e0e3e7] bg-white p-3 text-gray-700 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300 ${className ?? ""}`}
    >
      {title ? <h3 className="mb-2 text-[13px] font-semibold text-gray-900 dark:text-gray-100">{title}</h3> : null}
      {children}
    </div>
  )
}

export function Counter({ title, value, className }: { title: string; value: string; className?: string }) {
  return (
    <Widget className={`flex flex-col ${className ?? ""}`}>
      <h3 className="text-[13px] font-semibold leading-tight text-gray-900 dark:text-gray-100">{title}</h3>
      <p className="flex flex-1 items-center justify-center py-2 text-2xl text-gray-900 dark:text-gray-100">{value}</p>
    </Widget>
  )
}

export function TooltipBox({ title, rows }: { title?: ReactNode; rows: [string, ReactNode][] }) {
  return (
    <div className="grid min-w-[9rem] gap-0.5 rounded border border-[#e0e3e7] bg-white px-2.5 py-1.5 text-xs shadow-lg dark:border-gray-700 dark:bg-gray-900">
      {title ? <div className="font-semibold text-gray-900 dark:text-gray-100">{title}</div> : null}
      {rows.map(([k, v]) => (
        <div key={k} className="flex justify-between gap-4">
          <span className="text-gray-500 dark:text-gray-400">{k}</span>
          <span className="font-semibold tabular-nums text-gray-900 dark:text-gray-100">{v}</span>
        </div>
      ))}
    </div>
  )
}

type TooltipRenderProps<T> = { active?: boolean; payload?: { payload: T }[] }

export function tooltip<T>(render: (row: T) => ReactNode) {
  function RowTooltip({ active, payload }: TooltipRenderProps<T>) {
    if (!active || !payload?.length) return null
    return <>{render(payload[0].payload)}</>
  }
  return <ChartTooltip cursor={{ fillOpacity: 0.1 }} content={<RowTooltip />} />
}

export function GradientLegend({
  title,
  stops,
  max,
  min,
  format,
}: {
  title: string
  stops: string[]
  max: number
  min: number
  format: (n: number) => string
}) {
  const ticks = [max, min + (max - min) * 0.75, min + (max - min) * 0.5, min + (max - min) * 0.25, min]
  return (
    <div className="flex w-24 shrink-0 flex-col pl-2">
      <p className="mb-1.5 text-[10px] font-semibold leading-tight">{title}</p>
      <div className="flex h-40 max-h-full gap-1.5">
        <div className="w-3 rounded-sm" style={{ background: `linear-gradient(to top, ${stops.join(", ")})` }} />
        <div className="flex flex-col justify-between text-[10px] tabular-nums">
          {ticks.map((t, i) => (
            <span key={i}>{format(t)}</span>
          ))}
        </div>
      </div>
    </div>
  )
}

export function CategoryLegend({ title, items }: { title: string; items: { label: string; color: string }[] }) {
  return (
    <div className="w-28 shrink-0 pl-2 text-[11px]">
      <p className="mb-1 font-semibold">{title}</p>
      {items.map((i) => (
        <div key={i.label} className="flex items-center gap-1.5 leading-5" title={i.label}>
          <span className="h-2 w-2 shrink-0 rounded-full" style={{ backgroundColor: i.color }} />
          <span className="truncate">{i.label}</span>
        </div>
      ))}
    </div>
  )
}

/** Fixed-size canvas like the Databricks embed: optional page tabs pinned on top, widgets scroll inside. */
export function DashboardFrame({ pages }: { pages: { id: string; label: string; content: ReactNode }[] }) {
  const [active, setActive] = useState(pages[0]?.id)
  const scrollRef = useRef<HTMLDivElement>(null)
  const current = pages.find((p) => p.id === active) ?? pages[0]

  return (
    <div className="flex h-[640px] flex-col overflow-hidden rounded-lg border border-[#e0e3e7] bg-[#f6f7f9] dark:border-gray-700 dark:bg-gray-950/60 md:h-auto md:aspect-video">
      {pages.length > 1 ? (
        <div role="tablist" className="flex shrink-0 gap-5 border-b border-[#e0e3e7] px-3 pt-2 dark:border-gray-700">
          {pages.map((p) => (
            <button
              key={p.id}
              type="button"
              role="tab"
              aria-selected={current.id === p.id}
              onClick={() => {
                setActive(p.id)
                scrollRef.current?.scrollTo({ top: 0 })
              }}
              className={`-mb-px border-b-2 px-1 pb-1.5 text-sm transition-colors ${
                current.id === p.id
                  ? "border-[#2272b4] font-semibold text-gray-900 dark:border-[#4299e0] dark:text-gray-100"
                  : "border-transparent text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100"
              }`}
            >
              {p.label}
            </button>
          ))}
        </div>
      ) : null}
      <div ref={scrollRef} className="min-h-0 flex-1 overflow-y-auto overscroll-contain p-3">
        {current?.content}
      </div>
    </div>
  )
}

/* ------------------------------------------------------------------ */
/* Generic charts used by the e-commerce dashboards                    */
/* ------------------------------------------------------------------ */

type AxisProps = { xLabel: string; yLabel: string; height?: number }

function categoryAxisHeight(labels: Value[], rotate: boolean) {
  if (!rotate) return 30
  const longest = Math.max(...labels.map((l) => String(l).length), 1)
  return Math.min(110, longest * 5.5 + 26)
}

function longestLabel(labels: Value[]) {
  return Math.max(...labels.map((l) => String(l).length), 1)
}

function crowdedLabels(labels: Value[]) {
  return labels.length >= 6 && longestLabel(labels) >= 7
}

function SingleLineTick({ x, y, payload }: { x?: number; y?: number; payload?: { value: Value } }) {
  return (
    <text x={x} y={y} dy={3} textAnchor="end" fontSize={9} fill="currentColor" className="fill-gray-600 dark:fill-gray-400">
      {String(payload?.value ?? "")}
    </text>
  )
}

function pivot(rows: DashboardRow[], category: string, series: string, value: string) {
  const seriesKeys = uniqueSorted(rows.map((r) => r[series])).map(String)
  const categories = uniqueSorted(rows.map((r) => r[category]))
  const byCategory = new Map<Value, Record<string, Value>>(categories.map((c) => [c, { [category]: c }]))
  for (const r of rows) byCategory.get(r[category])![String(r[series])] = num(r[value])
  return { data: Array.from(byCategory.values()), seriesKeys }
}

export function BarChartWidget({
  data,
  category,
  value,
  xLabel,
  yLabel,
  horizontal = false,
  rotateLabels,
  categoryWidth,
  height = 260,
  colorBy,
}: AxisProps & {
  data: DashboardRow[]
  category: string
  value: string
  horizontal?: boolean
  rotateLabels?: boolean
  categoryWidth?: number
  colorBy?: { field: string; label: string }
}) {
  const sorted = useMemo(() => [...data].sort((a, b) => compareValues(a[category], b[category])), [data, category])
  const labels = sorted.map((r) => r[category])
  const rotate = rotateLabels ?? crowdedLabels(labels)
  const axisWidth = categoryWidth ?? Math.min(140, longestLabel(labels) * 5 + 18)
  const colorRange = colorBy ? [Math.min(...data.map((r) => num(r[colorBy.field]))), Math.max(...data.map((r) => num(r[colorBy.field])))] : null
  const fillFor = (r: DashboardRow) =>
    colorBy && colorRange ? rampColor(BLUES, (num(r[colorBy.field]) - colorRange[0]) / (colorRange[1] - colorRange[0] || 1)) : TEAL

  const chart = (
    <ChartContainer config={singleConfig} className={`${CHART} flex-1`} style={{ height }}>
      <BarChart data={sorted} layout={horizontal ? "vertical" : "horizontal"} margin={{ left: 8, right: 12, top: 8, bottom: 16 }} barCategoryGap={horizontal ? 1 : "10%"}>
        <CartesianGrid horizontal={!horizontal} vertical={horizontal} />
        {horizontal ? (
          <>
            <XAxis type="number" tick={TICK} tickFormatter={axisNumber} label={{ value: xLabel, position: "insideBottom", offset: -10, ...AXIS_LABEL }} />
            <YAxis type="category" dataKey={category} width={axisWidth} interval={0} tick={<SingleLineTick />} label={{ value: yLabel, angle: -90, position: "insideLeft", ...AXIS_LABEL }} />
          </>
        ) : (
          <>
            <XAxis
              dataKey={category}
              interval={rotateLabels ? "preserveStartEnd" : 0}
              angle={rotate ? 90 : 0}
              textAnchor={rotate ? "start" : "middle"}
              height={categoryAxisHeight(labels, rotate)}
              tick={TICK}
              label={{ value: xLabel, position: "insideBottom", offset: -10, ...AXIS_LABEL }}
            />
            <YAxis tick={TICK} tickFormatter={axisNumber} width={48} label={{ value: yLabel, angle: -90, position: "insideLeft", ...AXIS_LABEL }} />
          </>
        )}
        {tooltip<DashboardRow>((r) => (
          <TooltipBox
            title={String(r[category])}
            rows={[
              [horizontal ? xLabel : yLabel, valueText(num(r[value]))],
              ...(colorBy ? ([[colorBy.label, valueText(num(r[colorBy.field]))]] as [string, ReactNode][]) : []),
            ]}
          />
        ))}
        <Bar isAnimationActive={false} dataKey={value} fill={TEAL}>
          {colorBy ? sorted.map((r, i) => <Cell key={i} fill={fillFor(r)} />) : null}
        </Bar>
      </BarChart>
    </ChartContainer>
  )

  if (!colorBy || !colorRange) return chart
  return (
    <div className="flex">
      {chart}
      <GradientLegend title={colorBy.label} stops={BLUES} min={colorRange[0]} max={colorRange[1]} format={(n) => decimal2.format(Math.round(n))} />
    </div>
  )
}

export function StackedBarChartWidget({
  data,
  category,
  series,
  value,
  xLabel,
  yLabel,
  seriesLabel,
  height = 260,
}: AxisProps & { data: DashboardRow[]; category: string; series: string; value: string; seriesLabel: string }) {
  const { data: rows, seriesKeys } = useMemo(() => pivot(data, category, series, value), [data, category, series, value])
  const colorOf = (key: string) => PALETTE[seriesKeys.indexOf(key) % PALETTE.length]
  const stackOrder = [...seriesKeys].reverse()
  const labels = rows.map((r) => r[category])
  const rotate = crowdedLabels(labels)

  return (
    <div className="flex">
      <ChartContainer config={singleConfig} className={`${CHART} flex-1`} style={{ height }}>
        <BarChart data={rows} margin={{ left: 8, right: 8, top: 8, bottom: 16 }}>
          <CartesianGrid vertical={false} />
          <XAxis
            dataKey={category}
            interval={0}
            angle={rotate ? 90 : 0}
            textAnchor={rotate ? "start" : "middle"}
            height={categoryAxisHeight(labels, rotate)}
            tick={TICK}
            label={{ value: xLabel, position: "insideBottom", offset: -10, ...AXIS_LABEL }}
          />
          <YAxis tick={TICK} tickFormatter={axisNumber} width={48} label={{ value: yLabel, angle: -90, position: "insideLeft", ...AXIS_LABEL }} />
          {tooltip<Record<string, Value>>((r) => (
            <TooltipBox title={String(r[category])} rows={seriesKeys.map((k) => [k, r[k] == null ? "–" : valueText(num(r[k]))] as [string, ReactNode])} />
          ))}
          {stackOrder.map((k) => (
            <Bar key={k} isAnimationActive={false} dataKey={(r: Record<string, Value>) => r[k] ?? 0} stackId="stack" fill={colorOf(k)} />
          ))}
        </BarChart>
      </ChartContainer>
      <CategoryLegend title={seriesLabel} items={seriesKeys.map((k) => ({ label: k, color: colorOf(k) }))} />
    </div>
  )
}

export function LineChartWidget({
  data,
  x,
  y,
  series,
  seriesLabel,
  xLabel,
  yLabel,
  numericX = false,
  rotateLabels = false,
  height = 260,
}: AxisProps & {
  data: DashboardRow[]
  x: string
  y: string
  series?: string
  seriesLabel?: string
  numericX?: boolean
  rotateLabels?: boolean
}) {
  const { rows, seriesKeys } = useMemo(() => {
    if (!series) return { rows: [...data].sort((a, b) => compareValues(a[x], b[x])) as Record<string, Value>[], seriesKeys: [y] }
    const p = pivot(data, x, series, y)
    return { rows: p.data, seriesKeys: p.seriesKeys }
  }, [data, x, y, series])
  const colorOf = (key: string) => PALETTE[seriesKeys.indexOf(key) % PALETTE.length]

  const chart = (
    <ChartContainer config={singleConfig} className={`${CHART} flex-1`} style={{ height }}>
      <LineChart data={rows} margin={{ left: 8, right: 12, top: 8, bottom: 16 }}>
        <CartesianGrid vertical={false} />
        <XAxis
          dataKey={x}
          type={numericX ? "number" : "category"}
          domain={numericX ? ["dataMin", "dataMax"] : undefined}
          allowDecimals={false}
          interval={numericX ? undefined : 0}
          angle={rotateLabels ? 90 : 0}
          textAnchor={rotateLabels ? "start" : "middle"}
          height={categoryAxisHeight(rows.map((r) => r[x]), rotateLabels)}
          tick={TICK}
          label={{ value: xLabel, position: "insideBottom", offset: -10, ...AXIS_LABEL }}
        />
        <YAxis tick={TICK} tickFormatter={axisNumber} width={48} label={{ value: yLabel, angle: -90, position: "insideLeft", ...AXIS_LABEL }} />
        <ChartTooltip
          cursor={{ stroke: "currentColor", strokeDasharray: "3 3", strokeOpacity: 0.6 }}
          content={({ active, payload }) =>
            active && payload?.length ? (
              <TooltipBox
                title={String((payload[0].payload as Record<string, Value>)[x])}
                rows={seriesKeys
                  .filter((k) => (payload[0].payload as Record<string, Value>)[k] != null)
                  .map((k) => [series ? k : yLabel, valueText(num((payload[0].payload as Record<string, Value>)[k]))] as [string, ReactNode])}
              />
            ) : null
          }
        />
        {seriesKeys.map((k) => (
          <Line
            key={k}
            isAnimationActive={false}
            dataKey={(r: Record<string, Value>) => r[k] ?? null}
            type="linear"
            stroke={colorOf(k)}
            strokeWidth={1.5}
            dot={false}
            activeDot={{ r: 3.5 }}
            connectNulls={false}
          />
        ))}
      </LineChart>
    </ChartContainer>
  )

  if (!series) return chart
  return (
    <div className="flex">
      {chart}
      <CategoryLegend title={seriesLabel ?? series} items={seriesKeys.map((k) => ({ label: k, color: colorOf(k) }))} />
    </div>
  )
}

export function AreaChartWidget({
  data,
  x,
  y,
  xLabel,
  yLabel,
  numericX = false,
  rotateLabels = false,
  height = 260,
}: AxisProps & { data: DashboardRow[]; x: string; y: string; numericX?: boolean; rotateLabels?: boolean }) {
  const rows = useMemo(() => [...data].sort((a, b) => compareValues(a[x], b[x])), [data, x])
  return (
    <ChartContainer config={singleConfig} className={CHART} style={{ height }}>
      <AreaChart data={rows} margin={{ left: 8, right: 12, top: 8, bottom: 16 }}>
        <CartesianGrid vertical={false} />
        <XAxis
          dataKey={x}
          type={numericX ? "number" : "category"}
          domain={numericX ? ["dataMin", "dataMax"] : undefined}
          tickCount={numericX ? 16 : undefined}
          interval={numericX ? undefined : 0}
          angle={rotateLabels ? 90 : 0}
          textAnchor={rotateLabels ? "start" : "middle"}
          height={categoryAxisHeight(rows.map((r) => r[x]), rotateLabels)}
          tick={TICK}
          label={{ value: xLabel, position: "insideBottom", offset: -10, ...AXIS_LABEL }}
        />
        <YAxis tick={TICK} tickFormatter={axisNumber} width={48} label={{ value: yLabel, angle: -90, position: "insideLeft", ...AXIS_LABEL }} />
        <ChartTooltip
          cursor={{ stroke: "currentColor", strokeDasharray: "3 3", strokeOpacity: 0.6 }}
          content={({ active, payload }) =>
            active && payload?.length ? (
              <TooltipBox
                title={`${xLabel}: ${(payload[0].payload as DashboardRow)[x]}`}
                rows={[[yLabel, valueText(num((payload[0].payload as DashboardRow)[y]))]]}
              />
            ) : null
          }
        />
        <Area isAnimationActive={false} dataKey={y} type="linear" fill={TEAL} fillOpacity={0.45} stroke={TEAL} strokeWidth={1.5} activeDot={{ r: 3.5, fill: TEAL }} />
      </AreaChart>
    </ChartContainer>
  )
}

export function ScatterChartWidget({ data, x, y, xLabel, yLabel, label, height = 260 }: AxisProps & { data: DashboardRow[]; x: string; y: string; label?: string }) {
  return (
    <ChartContainer config={singleConfig} className={CHART} style={{ height }}>
      <ScatterChart margin={{ left: 8, right: 12, top: 8, bottom: 16 }}>
        <CartesianGrid />
        <XAxis type="number" dataKey={x} tick={TICK} tickFormatter={axisNumber} label={{ value: xLabel, position: "insideBottom", offset: -10, ...AXIS_LABEL }} />
        <YAxis type="number" dataKey={y} tick={TICK} tickFormatter={axisNumber} width={48} label={{ value: yLabel, angle: -90, position: "insideLeft", ...AXIS_LABEL }} />
        {tooltip<DashboardRow>((r) => (
          <TooltipBox
            title={label ? String(r[label]) : undefined}
            rows={[
              [xLabel, valueText(num(r[x]))],
              [yLabel, valueText(num(r[y]))],
            ]}
          />
        ))}
        <Scatter
          isAnimationActive={false}
          data={data}
          fill={TEAL}
          shape={(p: { cx?: number; cy?: number }) => <circle cx={p.cx} cy={p.cy} r={2.5} fill={TEAL} fillOpacity={0.85} />}
        />
      </ScatterChart>
    </ChartContainer>
  )
}

export function HeatmapWidget({
  data,
  x,
  y,
  value,
  xLabel,
  yLabel,
  valueLabel,
  yDescending = false,
  stops = BLUES,
  height = 240,
}: AxisProps & {
  data: DashboardRow[]
  x: string
  y: string
  value: string
  valueLabel: string
  yDescending?: boolean
  stops?: string[]
}) {
  const xs = useMemo(() => uniqueSorted(data.map((r) => r[x])), [data, x])
  const ys = useMemo(() => {
    const sorted = uniqueSorted(data.map((r) => r[y]))
    return yDescending ? sorted.reverse() : sorted
  }, [data, y, yDescending])
  const lookup = useMemo(() => new Map(data.map((r) => [`${r[x]}|${r[y]}`, num(r[value])])), [data, x, y, value])
  const values = data.map((r) => num(r[value]))
  const min = Math.min(...values)
  const max = Math.max(...values)
  const labelEvery = Math.max(1, Math.ceil(xs.length / 24))

  return (
    <div className="flex" style={{ height }}>
      <div className="flex w-5 shrink-0 items-center justify-center">
        <span className="-rotate-90 whitespace-nowrap text-[11px] font-semibold">{yLabel}</span>
      </div>
      <div className="flex min-w-0 flex-1 flex-col">
        <div className="grid min-h-0 flex-1" style={{ gridTemplateColumns: `3rem repeat(${xs.length}, minmax(0, 1fr))`, gridTemplateRows: `repeat(${ys.length}, minmax(0, 1fr))` }}>
          {ys.map((yv) => (
            <div key={String(yv)} className="contents">
              <div className="flex items-center truncate pr-1 text-[10px]">{String(yv)}</div>
              {xs.map((xv) => {
                const v = lookup.get(`${xv}|${yv}`)
                if (v === undefined) return <div key={String(xv)} />
                return (
                  <div
                    key={String(xv)}
                    title={`${yLabel} ${yv} · ${xLabel} ${xv}: ${valueText(v)} ${valueLabel}`}
                    className="border-[0.5px] border-white/50 dark:border-gray-900/50"
                    style={{ backgroundColor: rampColor(stops, (v - min) / (max - min || 1)) }}
                  />
                )
              })}
            </div>
          ))}
        </div>
        <div className="grid" style={{ gridTemplateColumns: `3rem repeat(${xs.length}, minmax(0, 1fr))` }}>
          <div />
          {xs.map((xv, i) => (
            <div key={String(xv)} className="pt-1 text-center text-[10px]">
              {i % labelEvery === 0 ? String(xv) : ""}
            </div>
          ))}
        </div>
        <p className="text-center text-[11px] font-semibold">{xLabel}</p>
      </div>
      <GradientLegend title={valueLabel} stops={stops} min={min} max={max} format={axisNumber} />
    </div>
  )
}

export function DonutWidget({
  data,
  category,
  value,
  legendTitle,
  valueLabel,
  height = 260,
}: {
  data: DashboardRow[]
  category: string
  value: string
  legendTitle: string
  valueLabel: string
  height?: number
}) {
  const slices = useMemo(
    () =>
      [...data]
        .sort((a, b) => num(b[value]) - num(a[value]))
        .map((r, i) => ({ name: String(r[category]), value: num(r[value]), color: PALETTE[i % PALETTE.length] })),
    [data, category, value]
  )
  const total = slices.reduce((s, r) => s + r.value, 0)

  return (
    <div className="flex">
      <ChartContainer config={singleConfig} className={`${CHART} flex-1`} style={{ height }}>
        <PieChart>
          {tooltip<{ name: string; value: number }>((r) => (
            <TooltipBox title={r.name} rows={[[valueLabel, valueText(r.value)], ["Share", `${((r.value / total) * 100).toFixed(1)}%`]]} />
          ))}
          <Pie isAnimationActive={false} data={slices} dataKey="value" nameKey="name" innerRadius="45%" outerRadius="85%" startAngle={90} endAngle={-270} stroke="white" strokeWidth={1}>
            {slices.map((s) => (
              <Cell key={s.name} fill={s.color} />
            ))}
          </Pie>
        </PieChart>
      </ChartContainer>
      <CategoryLegend title={legendTitle} items={slices.map((s) => ({ label: s.name, color: s.color }))} />
    </div>
  )
}

export function FunnelWidget({
  data,
  stage,
  value,
  stageLabel,
  valueLabel,
  height = 300,
}: {
  data: DashboardRow[]
  stage: string
  value: string
  stageLabel: string
  valueLabel: string
  height?: number
}) {
  const rows = useMemo(() => {
    const sorted = [...data].sort((a, b) => compareValues(a[stage], b[stage]))
    const max = Math.max(...sorted.map((r) => num(r[value])))
    return sorted.map((r) => ({ stage: String(r[stage]), value: num(r[value]), offset: (max - num(r[value])) / 2 }))
  }, [data, stage, value])

  return (
    <ChartContainer config={singleConfig} className={CHART} style={{ height }}>
      <BarChart data={rows} layout="vertical" margin={{ left: 8, right: 12, top: 8, bottom: 16 }} barCategoryGap="12%">
        <XAxis type="number" tick={false} tickLine={false} axisLine={false} height={20} label={{ value: valueLabel, position: "insideBottom", offset: -6, ...AXIS_LABEL }} />
        <YAxis type="category" dataKey="stage" width={110} interval={0} tick={{ fontSize: 9 }} label={{ value: stageLabel, angle: -90, position: "insideLeft", ...AXIS_LABEL }} />
        {tooltip<(typeof rows)[number]>((r) => <TooltipBox title={r.stage} rows={[[valueLabel, valueText(r.value)]]} />)}
        <Bar isAnimationActive={false} dataKey="offset" stackId="funnel" fill="transparent" />
        <Bar isAnimationActive={false} dataKey="value" stackId="funnel" fill={TEAL} />
      </BarChart>
    </ChartContainer>
  )
}
