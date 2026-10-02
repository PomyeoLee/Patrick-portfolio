"use client"

import { useMemo } from "react"
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Legend,
  Line,
  LineChart,
  ReferenceLine,
  Scatter,
  ScatterChart,
  XAxis,
  YAxis,
  ZAxis,
} from "recharts"
import { ChartContainer, ChartTooltip, type ChartConfig } from "@/components/ui/chart"
import {
  AXIS_LABEL,
  BLUES,
  CHART,
  CategoryLegend,
  Counter,
  DashboardFrame,
  GradientLegend,
  PALETTE,
  REDS,
  TEAL,
  TICK,
  TooltipBox,
  Widget,
  compact2,
  rampColor,
  singleConfig,
  tooltip,
} from "@/components/dashboards/widgets"
import { formatCompact, formatDate, formatInteger, type DashboardSnapshot } from "@/lib/dashboard-snapshot"

type WeeklyTrend = { week_start: string; weekly_new_cases_national: number; rolling_4w_national_avg: number }
type StateTotals = { state_abbrev: string; state_name: string; cumulative_cases: number; cumulative_deaths: number; cfr_pct: number }
type StateCfr = { state_abbrev: string; state_name: string; total_cases: number; total_deaths: number; case_fatality_pct: number }
type YearMonth = { submission_year: number; submission_month: number; national_new_cases: number }
type MobilityDaily = { date: string; mobility_composite: number; new_cases_7d_avg: number }
type MobilityScatter = { avg_mobility: number; avg_cases: number; wave: string }
type StateCorrelation = { state_abbrev: string; pearson_r: number }
type CategoryCorrelation = { mobility_col: string; pearson_r: number }
type WaveSummary = { wave: string; avg_mobility: number; avg_daily_cases: number }
type NationalSummary = { national_cumulative_cases: number; national_daily_cases: number; national_cumulative_deaths: number }

function YearMonthHeatmap({ rows }: { rows: YearMonth[] }) {
  const years = Array.from(new Set(rows.map((r) => r.submission_year))).sort((a, b) => b - a)
  const lookup = new Map(rows.map((r) => [`${r.submission_year}-${r.submission_month}`, r.national_new_cases]))
  const max = Math.max(...rows.map((r) => r.national_new_cases), 1)

  return (
    <div className="flex">
      <div className="flex min-w-0 flex-1 items-stretch">
        <div className="flex w-5 items-center justify-center">
          <span className="-rotate-90 text-[11px] font-semibold">Year</span>
        </div>
        <div className="min-w-0 flex-1 overflow-x-auto">
          <div className="grid min-w-[560px]" style={{ gridTemplateColumns: "2.5rem repeat(12, minmax(0, 1fr))" }}>
            {years.map((year) => (
              <div key={year} className="contents">
                <div className="flex items-center text-[10px]">{year}</div>
                {Array.from({ length: 12 }, (_, i) => {
                  const value = lookup.get(`${year}-${i + 1}`)
                  if (value === undefined) return <div key={i} className="h-12" />
                  return (
                    <div
                      key={i}
                      title={`${year}-${String(i + 1).padStart(2, "0")}: ${formatInteger(value)} new cases`}
                      className="h-12 border-[0.5px] border-white/40 dark:border-gray-900/40"
                      style={{ backgroundColor: rampColor(REDS, value / max) }}
                    />
                  )
                })}
              </div>
            ))}
            <div />
            {Array.from({ length: 12 }, (_, i) => (
              <div key={i} className="pt-1 text-center text-[10px]">
                {i + 1}
              </div>
            ))}
          </div>
          <p className="text-center text-[11px] font-semibold">Month</p>
        </div>
      </div>
      <GradientLegend title="Sum of National New Cases" stops={REDS} min={0} max={max} format={(n) => (n === 0 ? "0" : formatCompact(n))} />
    </div>
  )
}

const weeklyConfig = {
  rolling_4w_national_avg: { label: "4-Week Rolling Avg", color: PALETTE[0] },
  weekly_new_cases_national: { label: "Weekly New Cases", color: PALETTE[1] },
} satisfies ChartConfig

const STATE_AXIS_WIDTH = 124

function OverviewPage({ d }: { d: DashboardSnapshot["datasets"] }) {
  const national = (d.d3d4a220 as NationalSummary[])[0]
  const stateCfr = d["93bab72e"] as StateCfr[]
  const weekly = d.ds_daily_trend as WeeklyTrend[]
  const topCases = useMemo(
    () => [...(d.ds_state_cases as StateTotals[])].sort((a, b) => b.cumulative_cases - a.cumulative_cases),
    [d.ds_state_cases]
  )
  const topCfr = useMemo(() => [...(d.ds_state_geo as StateTotals[])].sort((a, b) => b.cfr_pct - a.cfr_pct), [d.ds_state_geo])
  const avgCfr = stateCfr.reduce((s, r) => s + r.case_fatality_pct, 0) / stateCfr.length
  const dataThrough = weekly.reduce((max, r) => (r.week_start > max ? r.week_start : max), "")
  const cfrMin = Math.min(...stateCfr.map((r) => r.case_fatality_pct))
  const cfrMax = Math.max(...stateCfr.map((r) => r.case_fatality_pct))

  return (
    <div className="grid grid-cols-2 gap-2 md:grid-cols-12">
      <Counter className="md:col-span-2" title="National Cumulative Cases" value={compact2.format(national.national_cumulative_cases)} />
      <Counter className="md:col-span-2" title="National Daily Cases" value={compact2.format(national.national_daily_cases)} />
      <Counter className="md:col-span-3" title="National Cumulative Deaths" value={compact2.format(national.national_cumulative_deaths)} />
      <Counter className="md:col-span-2" title="Case Fatality Rate (%)" value={avgCfr.toFixed(2)} />
      <Counter className="col-span-2 md:col-span-3" title="Data Through" value={dataThrough} />

      <Widget title="National Weekly New Cases" className="col-span-2 md:col-span-7">
        <ChartContainer config={weeklyConfig} className={`${CHART} h-[280px]`}>
          <LineChart data={weekly} margin={{ left: 8, right: 8, top: 4, bottom: 16 }}>
            <CartesianGrid vertical={false} />
            <XAxis dataKey="week_start" tick={TICK} minTickGap={36} label={{ value: "Date", position: "insideBottom", offset: -10, ...AXIS_LABEL }} />
            <YAxis tick={TICK} tickFormatter={formatCompact} width={48} label={{ value: "Values", angle: -90, position: "insideLeft", ...AXIS_LABEL }} />
            {tooltip<WeeklyTrend>((r) => (
              <TooltipBox
                title={r.week_start}
                rows={[
                  ["Weekly New Cases", formatInteger(r.weekly_new_cases_national)],
                  ["4-Week Rolling Avg", formatInteger(r.rolling_4w_national_avg)],
                ]}
              />
            ))}
            <Line isAnimationActive={false} dataKey="rolling_4w_national_avg" type="monotone" stroke="var(--color-rolling_4w_national_avg)" strokeWidth={1.5} dot={false} />
            <Line isAnimationActive={false} dataKey="weekly_new_cases_national" type="monotone" stroke="var(--color-weekly_new_cases_national)" strokeWidth={1.5} dot={false} />
            <Legend
              layout="vertical"
              align="right"
              verticalAlign="top"
              iconType="plainline"
              wrapperStyle={{ fontSize: 12, paddingLeft: 8 }}
              formatter={(key: string) => weeklyConfig[key as keyof typeof weeklyConfig]?.label ?? key}
            />
          </LineChart>
        </ChartContainer>
      </Widget>

      <Widget title="Top 20 States by Cumulative Cases" className="col-span-2 md:col-span-5">
        <ChartContainer config={singleConfig} className={`${CHART} h-[280px]`}>
          <BarChart data={topCases} layout="vertical" margin={{ left: 4, right: 12, bottom: 16 }} barCategoryGap={1}>
            <CartesianGrid horizontal={false} />
            <XAxis type="number" tick={TICK} tickFormatter={formatCompact} label={{ value: "Sum of Cumulative Cases", position: "insideBottom", offset: -10, ...AXIS_LABEL }} />
            <YAxis type="category" dataKey="state_name" width={STATE_AXIS_WIDTH} interval={0} tick={{ fontSize: 9 }} label={{ value: "State Name", angle: -90, position: "insideLeft", ...AXIS_LABEL }} />
            {tooltip<StateTotals>((r) => <TooltipBox title={r.state_name} rows={[["Sum of Cumulative Cases", formatInteger(r.cumulative_cases)]]} />)}
            <Bar isAnimationActive={false} dataKey="cumulative_cases" fill={TEAL} />
          </BarChart>
        </ChartContainer>
      </Widget>

      <Widget title="Top 20 States by Case Fatality Rate" className="col-span-2 md:col-span-6">
        <ChartContainer config={singleConfig} className={`${CHART} h-[280px]`}>
          <BarChart data={topCfr} layout="vertical" margin={{ left: 4, right: 12, bottom: 16 }} barCategoryGap={1}>
            <CartesianGrid horizontal={false} />
            <XAxis type="number" tick={TICK} label={{ value: "Sum of Case Fatality Rate(%)", position: "insideBottom", offset: -10, ...AXIS_LABEL }} />
            <YAxis type="category" dataKey="state_name" width={STATE_AXIS_WIDTH} interval={0} tick={{ fontSize: 9 }} label={{ value: "State Name", angle: -90, position: "insideLeft", ...AXIS_LABEL }} />
            {tooltip<StateTotals>((r) => <TooltipBox title={r.state_name} rows={[["Case Fatality Rate (%)", r.cfr_pct]]} />)}
            <Bar isAnimationActive={false} dataKey="cfr_pct" fill={TEAL} />
          </BarChart>
        </ChartContainer>
      </Widget>

      <Widget title="State Scale: Cases vs Deaths with Fatality Rate" className="col-span-2 md:col-span-6">
        <div className="flex">
          <ChartContainer config={singleConfig} className={`${CHART} h-[280px] flex-1`}>
            <ScatterChart margin={{ left: 8, right: 8, top: 8, bottom: 16 }}>
              <CartesianGrid />
              <XAxis type="number" dataKey="total_cases" tick={TICK} tickFormatter={formatCompact} label={{ value: "Total Cases", position: "insideBottom", offset: -10, ...AXIS_LABEL }} />
              <YAxis type="number" dataKey="total_deaths" tick={TICK} tickFormatter={formatCompact} width={48} label={{ value: "Total Deaths", angle: -90, position: "insideLeft", ...AXIS_LABEL }} />
              <ZAxis type="number" dataKey="total_deaths" range={[20, 500]} />
              {tooltip<StateCfr>((r) => (
                <TooltipBox
                  title={r.state_name}
                  rows={[
                    ["Total Cases", formatInteger(r.total_cases)],
                    ["Total Deaths", formatInteger(r.total_deaths)],
                    ["Fatality Rate (%)", r.case_fatality_pct],
                  ]}
                />
              ))}
              <Scatter isAnimationActive={false} data={stateCfr} fillOpacity={0.85}>
                {stateCfr.map((r) => (
                  <Cell key={r.state_abbrev} fill={rampColor(BLUES, (r.case_fatality_pct - cfrMin) / (cfrMax - cfrMin || 1))} />
                ))}
              </Scatter>
            </ScatterChart>
          </ChartContainer>
          <GradientLegend title="Fatality Rate (%)" stops={BLUES} min={cfrMin} max={cfrMax} format={(n) => n.toFixed(1)} />
        </div>
      </Widget>

      <Widget title="Year × Month: National New Cases" className="col-span-2 md:col-span-12">
        <YearMonthHeatmap rows={d.ds_heatmap as YearMonth[]} />
      </Widget>
    </div>
  )
}

function CategoryCorrelationChart({ rows, yLabel }: { rows: CategoryCorrelation[]; yLabel: string }) {
  const sorted = useMemo(() => [...rows].sort((a, b) => a.mobility_col.localeCompare(b.mobility_col)), [rows])
  return (
    <ChartContainer config={singleConfig} className={`${CHART} h-[300px]`}>
      <BarChart data={sorted} margin={{ left: 4, right: 4, top: 8, bottom: 16 }}>
        <CartesianGrid vertical={false} />
        <XAxis
          dataKey="mobility_col"
          interval={0}
          angle={90}
          textAnchor="start"
          height={96}
          tick={TICK}
          label={{ value: "Mobility Category", position: "insideBottom", offset: -10, ...AXIS_LABEL }}
        />
        <YAxis tick={TICK} width={40} label={{ value: yLabel, angle: -90, position: "insideLeft", ...AXIS_LABEL }} />
        <ReferenceLine y={0} stroke="currentColor" strokeOpacity={0.4} />
        {tooltip<CategoryCorrelation>((r) => <TooltipBox title={r.mobility_col} rows={[[yLabel, r.pearson_r]]} />)}
        <Bar isAnimationActive={false} dataKey="pearson_r" fill={TEAL} />
      </BarChart>
    </ChartContainer>
  )
}

function MobilityPage({ d }: { d: DashboardSnapshot["datasets"] }) {
  const monthly = useMemo(() => {
    const buckets = new Map<string, { sum: number; n: number }>()
    for (const r of d.ds_mobility_ts as MobilityDaily[]) {
      const key = r.date.slice(0, 7)
      const b = buckets.get(key) ?? { sum: 0, n: 0 }
      b.sum += r.mobility_composite
      b.n += 1
      buckets.set(key, b)
    }
    return Array.from(buckets, ([month, b]) => ({ month, mobility: +(b.sum / b.n).toFixed(1) })).sort((a, b) =>
      a.month.localeCompare(b.month)
    )
  }, [d.ds_mobility_ts])

  const stateCorr = useMemo(
    () => [...(d.ds_correlation as StateCorrelation[])].sort((a, b) => a.state_abbrev.localeCompare(b.state_abbrev)),
    [d.ds_correlation]
  )
  const waves = useMemo(() => [...(d.ds_waves as WaveSummary[])].sort((a, b) => a.wave.localeCompare(b.wave)), [d.ds_waves])
  const waveTicks = useMemo(() => {
    const floor = Math.min(0, Math.floor(Math.min(...waves.map((w) => w.avg_mobility)) / 10) * 10)
    return Array.from({ length: -floor / 10 + 1 }, (_, i) => floor + i * 10)
  }, [waves])
  const scatter = d.ds_scatter as MobilityScatter[]
  const waveColors = useMemo(() => {
    const keys = Array.from(new Set(scatter.map((r) => r.wave))).sort()
    return keys.map((key, i) => ({ key, label: key, color: PALETTE[i % PALETTE.length] }))
  }, [scatter])

  return (
    <div className="grid grid-cols-1 gap-2 md:grid-cols-12">
      <Widget title="US Composite Mobility % vs Baseline — 2020–2022" className="md:col-span-12">
        <ChartContainer config={singleConfig} className={`${CHART} h-[260px]`}>
          <AreaChart data={monthly} margin={{ left: 8, right: 8, top: 8, bottom: 4 }}>
            <CartesianGrid />
            <XAxis dataKey="month" tick={TICK} tickFormatter={(v: string) => formatDate(`${v}-01`, { month: "short", year: "numeric" })} minTickGap={48} />
            <YAxis tick={TICK} width={48} label={{ value: "Average Mobility Composite", angle: -90, position: "insideLeft", dy: 70, ...AXIS_LABEL }} />
            <ChartTooltip
              cursor={{ stroke: "currentColor", strokeDasharray: "3 3", strokeOpacity: 0.6 }}
              content={({ active, payload }) =>
                active && payload?.length ? (
                  <TooltipBox
                    title={formatDate(`${payload[0].payload.month}-01`, { month: "short", year: "numeric" })}
                    rows={[["Average Mobility Composite", payload[0].payload.mobility]]}
                  />
                ) : null
              }
            />
            <Area isAnimationActive={false} dataKey="mobility" type="linear" baseValue={0} fill={TEAL} fillOpacity={0.55} stroke={TEAL} strokeWidth={1.5} activeDot={{ r: 4, fill: TEAL }} />
          </AreaChart>
        </ChartContainer>
      </Widget>

      <Widget title="Composite Mobility vs New Cases: Person r(correlation coefficient) by State" className="md:col-span-9">
        <ChartContainer config={singleConfig} className={`${CHART} h-[260px]`}>
          <BarChart data={stateCorr} margin={{ left: 8, right: 4, top: 8, bottom: 16 }} barCategoryGap={1}>
            <CartesianGrid vertical={false} />
            <XAxis dataKey="state_abbrev" angle={45} textAnchor="start" height={40} tick={TICK} label={{ value: "State", position: "insideBottom", offset: -10, ...AXIS_LABEL }} />
            <YAxis tick={TICK} width={40} label={{ value: "Sum of r", angle: -90, position: "insideLeft", ...AXIS_LABEL }} />
            <ReferenceLine y={0} stroke="currentColor" strokeOpacity={0.4} />
            {tooltip<StateCorrelation>((r) => <TooltipBox title={r.state_abbrev} rows={[["Sum of r", r.pearson_r]]} />)}
            <Bar isAnimationActive={false} dataKey="pearson_r" fill={TEAL} />
          </BarChart>
        </ChartContainer>
      </Widget>

      <Widget title="Avg Mobility % by Pandemic Wave" className="md:col-span-3">
        <ChartContainer config={singleConfig} className={`${CHART} h-[260px]`}>
          <BarChart data={waves} margin={{ left: 4, right: 4, top: 8, bottom: 16 }}>
            <CartesianGrid vertical={false} />
            <XAxis dataKey="wave" interval={0} angle={90} textAnchor="start" height={72} tick={TICK} label={{ value: "wave", position: "insideBottom", offset: -10, ...AXIS_LABEL }} />
            <YAxis
              tick={TICK}
              width={40}
              domain={[waveTicks[0], 0]}
              ticks={waveTicks}
              label={{ value: "Sum of Avg-Mobility", angle: -90, position: "insideLeft", dy: 50, ...AXIS_LABEL }}
            />
            {tooltip<WaveSummary>((r) => <TooltipBox title={r.wave} rows={[["Sum of Avg-Mobility", r.avg_mobility]]} />)}
            <Bar isAnimationActive={false} dataKey="avg_mobility" fill={TEAL} />
          </BarChart>
        </ChartContainer>
      </Widget>

      <Widget title="Mobility vs New Cases: Monthly Scatter (2020–2022)" className="md:col-span-6">
        <div className="flex">
          <ChartContainer config={singleConfig} className={`${CHART} h-[300px] flex-1`}>
            <ScatterChart margin={{ left: 8, right: 8, top: 8, bottom: 16 }}>
              <CartesianGrid />
              <XAxis type="number" dataKey="avg_mobility" tick={TICK} label={{ value: "Average Mobility", position: "insideBottom", offset: -10, ...AXIS_LABEL }} />
              <YAxis type="number" dataKey="avg_cases" tick={TICK} tickFormatter={formatCompact} width={48} label={{ value: "Average Cases", angle: -90, position: "insideLeft", ...AXIS_LABEL }} />
              <ReferenceLine x={0} stroke="currentColor" strokeOpacity={0.4} />
              {tooltip<MobilityScatter>((r) => (
                <TooltipBox
                  title={r.wave}
                  rows={[
                    ["Average Mobility", r.avg_mobility],
                    ["Average Cases", formatInteger(r.avg_cases)],
                  ]}
                />
              ))}
              {waveColors.map((w) => (
                <Scatter isAnimationActive={false} key={w.key} data={scatter.filter((r) => r.wave === w.key)} fill={w.color} shape={(p: { cx?: number; cy?: number }) => <circle cx={p.cx} cy={p.cy} r={3} fill={w.color} />} />
              ))}
            </ScatterChart>
          </ChartContainer>
          <CategoryLegend title="wave" items={waveColors} />
        </div>
      </Widget>

      <Widget title="Mobility Category vs Cases" className="md:col-span-3">
        <CategoryCorrelationChart rows={d.ds_category_corr_cases as CategoryCorrelation[]} yLabel="r" />
      </Widget>

      <Widget title="Mobility Category vs Deaths" className="md:col-span-3">
        <CategoryCorrelationChart rows={d.ds_category_corr_deaths as CategoryCorrelation[]} yLabel="pearson_r" />
      </Widget>
    </div>
  )
}

export function CovidNativeDashboard({ snapshot }: { snapshot: DashboardSnapshot }) {
  return (
    <DashboardFrame
      pages={[
        { id: "overview", label: "COVID Overview", content: <OverviewPage d={snapshot.datasets} /> },
        { id: "mobility", label: "Mobility Analysis", content: <MobilityPage d={snapshot.datasets} /> },
      ]}
    />
  )
}
