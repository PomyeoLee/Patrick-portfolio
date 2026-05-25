"use client"

import {
  BookOpen,
  Cpu,
  Database,
  GitBranch,
  Layers,
  Target,
  Workflow,
  Wrench,
} from "lucide-react"
import { Badge } from "@/components/ui/badge"

const TAGS = [
  "FastMCP",
  "MCP",
  "Python",
  "Azure Container Apps",
  "API Integration",
  "Pharma Data",
  "ClinicalTrials.gov",
  "PubMed",
  "OpenFDA",
  "Open Targets",
  "CMS",
  "DailyMed",
]

const DATA_SOURCES = [
  {
    name: "ClinicalTrials.gov",
    content: "Trials, phases, sponsors",
    coverage: "Global",
    usOnly: false,
  },
  {
    name: "PubMed",
    content: "Publications, trends",
    coverage: "Global literature",
    usOnly: false,
  },
  {
    name: "OpenFDA FAERS",
    content: "Adverse events",
    coverage: "US FDA-approved drugs",
    usOnly: true,
  },
  {
    name: "Open Targets",
    content: "Disease–target associations",
    coverage: "Curated (EFO diseases)",
    usOnly: false,
  },
  {
    name: "CMS Medicare Part D",
    content: "Outpatient spending",
    coverage: "US Medicare Part D",
    usOnly: true,
  },
  {
    name: "DailyMed",
    content: "Drug labels",
    coverage: "US FDA labels",
    usOnly: true,
  },
]

const MCP_TOOLS = [
  {
    name: "check_data_availability",
    role: "Entry-point probe: tests which of the six APIs have data for the given indication and drugs, auto-resolves ICD-10, MeSH, search terms, and Ensembl targets, and returns a ready-to-use config for downstream tools.",
  },
  {
    name: "run_pipeline",
    role: "End-to-end workflow in one call—runs enabled collectors, aggregates results into a market analysis JSON, and builds a Markdown narrative prompt suitable for LLM report generation.",
  },
  {
    name: "run_collectors",
    role: "Runs only the data-collection stage for selected sources (or all enabled ones) without re-running analysis or prompt generation—useful when refreshing raw API data.",
  },
  {
    name: "get_clinical_trials",
    role: "Queries ClinicalTrials.gov for trial counts, phases, statuses, and sponsors matched to the resolved disease and drug search terms.",
  },
  {
    name: "get_publications",
    role: "Queries PubMed for publication volume, trends, and recent articles relevant to the indication and competitive drug set.",
  },
  {
    name: "get_adverse_events",
    role: "Queries OpenFDA FAERS for adverse-event profiles and reporting patterns for US FDA-approved drugs in the config (US-only source).",
  },
  {
    name: "get_gene_targets",
    role: "Queries Open Targets for disease–gene associations, returning top targets with Ensembl IDs linked to the resolved EFO disease.",
  },
  {
    name: "get_drug_spending",
    role: "Queries CMS Medicare Part D for outpatient spending and claim volumes by drug (US-only; often empty for specialty or hospital-administered drugs).",
  },
  {
    name: "get_drug_labels",
    role: "Queries DailyMed for FDA-approved label text—indications, warnings, and related label sections for drugs in the config (US-only).",
  },
  {
    name: "build_prompt",
    role: "Regenerates the Markdown narrative prompt from an existing analysis JSON on disk without re-querying APIs—local development and prompt iteration only.",
  },
  {
    name: "load_segmentation_summary",
    role: "Loads a saved patient-segmentation report summary to inject market-segment context into analysis or prompt generation.",
  },
  {
    name: "list_configs",
    role: "Lists available market_config YAML files in the local workspace so agents can pick or reference a saved indication setup.",
  },
  {
    name: "create_config",
    role: "Generates a new market_config YAML from an indication and optional drug list using the same auto-resolution logic as check_data_availability.",
  },
  {
    name: "get_pipeline_status",
    role: "Returns per-collector success, failure, and timing from the most recent pipeline run—local use for debugging and agent follow-up.",
  },
]

const PROJECT_STRUCTURE = `market-intelligence-mcp/
└── market_intelligence/
    ├── mcp_server.py              # FastMCP entry (stdio / HTTP)
    ├── mcp_config.json            # Cursor MCP config example
    ├── market_config.yaml         # Example indication + drugs config
    ├── market_intelligence.py     # CLI pipeline orchestration
    ├── analyze_market_data.py     # Analysis aggregation
    ├── market_prompt_template.py  # Narrative prompt template
    ├── requirements_mcp.txt
    │
    ├── mi_server/
    │   ├── tools.py               # MCP tool implementations
    │   ├── config.py              # Config load + auto-resolution
    │   └── pipeline.py            # Collectors, probe, analyze, prompt
    │
    ├── collectors/
    │   ├── base_collector.py
    │   ├── clinicaltrials_collector.py
    │   ├── pubmed_collector.py
    │   ├── openfda_collector.py
    │   ├── opentargets_collector.py
    │   ├── cms_collector.py
    │   └── dailymed_collector.py
    │
    └── docs/
        ├── Agent_Workflow_MCP_Settings.md
        ├── Foundry_Agent_Setup.md
        └── Deployment.md`

export function MarketIntelligenceProjectDetail() {
  return (
    <div className="space-y-8">
      {/* Project Overview */}
      <section className="bg-white dark:bg-gray-800 rounded-xl shadow p-7">
        <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
          <Target className="w-5 h-5 text-purple-600" />
          Project Overview
        </h2>

        <h3 className="font-semibold text-lg mb-2">Purpose</h3>
        <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
          Build an <strong>MCP (Model Context Protocol) server</strong> that lets AI agents gather{" "}
          <strong>therapeutic-area market intelligence</strong> from public medical and pharmaceutical APIs in one
          place. The project wraps six open data sources behind a consistent tool interface so agents can check which
          sources have data for a given disease and drug set, pull structured facts (trials, publications, safety,
          targets, spending, labels), and run an end-to-end pipeline that produces analysis and a ready-to-use narrative
          prompt. It supports both <strong>local use</strong> (Cursor IDE, stdio) and <strong>hosted deployment</strong>{" "}
          (Azure Container Apps, HTTP/SSE) for agents such as Microsoft Foundry.
        </p>

        <h3 className="font-semibold text-lg mb-2">Problem</h3>
        <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-3">
          Market intelligence for a therapy area usually means working across many separate APIs, each with different
          query rules, identifiers, and response shapes. Analysts and agents must also assemble supporting metadata by
          hand—ICD-10 codes, MeSH terms, Ensembl gene IDs, and search strings—before queries return useful results.
        </p>
        <ul className="text-sm text-gray-700 dark:text-gray-300 space-y-1 list-disc list-inside mb-4">
          <li>Repeated manual setup for every new indication or drug list</li>
          <li>Large, inconsistent raw API payloads that are hard for LLMs to use</li>
          <li>No clear view of which sources actually have data before running expensive calls</li>
        </ul>

        <h3 className="font-semibold text-lg mb-2">Expected Outcome</h3>
        <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-2">
          When an agent provides an <strong>indication</strong> and optional <strong>drug names</strong>, the system
          delivers:
        </p>
        <ol className="text-sm text-gray-700 dark:text-gray-300 space-y-1 list-decimal list-inside mb-4">
          <li>
            <strong>A resolved configuration</strong> — targets, codes, and search terms filled in automatically where
            possible
          </li>
          <li>
            <strong>Source-level availability</strong> — which of the six APIs can answer for that scenario, with plain
            reasons when one cannot
          </li>
          <li>
            <strong>Structured market data</strong> — aggregated trial, literature, safety, target, spending, and label
            information
          </li>
          <li>
            <strong>A market intelligence narrative</strong> — either a synthesized report (per-source workflow) or a
            Markdown prompt from the full pipeline, suitable for further analysis or presentation
          </li>
        </ol>
        <p className="text-gray-700 dark:text-gray-300 leading-relaxed text-sm">
          The outcome is faster, more consistent therapeutic-area research: one MCP connection instead of six ad hoc
          integrations, with less configuration work for the agent and clearer limits on US-only or partial data
          sources.
        </p>

        <div className="flex flex-wrap gap-2 mt-5">
          {TAGS.map((tag) => (
            <Badge key={tag} variant="outline" className="bg-purple-100/50 dark:bg-purple-900/50">
              {tag}
            </Badge>
          ))}
        </div>
      </section>

      {/* Architecture */}
      <section className="bg-white dark:bg-gray-800 rounded-xl shadow p-7">
        <h2 className="text-2xl font-bold mb-5 flex items-center gap-2">
          <GitBranch className="w-5 h-5 text-purple-600" />
          Architecture
        </h2>
        <pre className="text-xs sm:text-sm font-mono bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg p-4 overflow-x-auto text-gray-800 dark:text-gray-200 mb-5 leading-relaxed">
{`MCP Client (Cursor / Foundry)
        │  stdio or HTTP/SSE
        ▼
mcp_server.py  →  mi_server/tools.py
              →  mi_server/config.py      (auto-resolution)
              →  mi_server/pipeline.py   (collectors, analyze, prompt)
        │
        ▼
collectors/  →  ClinicalTrials.gov, PubMed, OpenFDA, Open Targets, CMS, DailyMed`}
        </pre>
        <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
          <strong>3-stage pipeline</strong> (when using <code className="text-purple-700 dark:text-purple-300">run_pipeline</code>):
        </p>
        <div className="space-y-4">
          <div>
            <h3 className="font-semibold text-lg mb-1">1. Collect</h3>
            <p className="text-gray-700 dark:text-gray-300 text-sm leading-relaxed">
              Query enabled sources in memory via collectors under <code className="text-xs">collectors/</code>.
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-lg mb-1">2. Analyze</h3>
            <p className="text-gray-700 dark:text-gray-300 text-sm leading-relaxed">
              Aggregate structured outputs via <code className="text-xs">analyze_market_data.py</code>.
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-lg mb-1">3. Prompt</h3>
            <p className="text-gray-700 dark:text-gray-300 text-sm leading-relaxed">
              Build a Markdown narrative via <code className="text-xs">market_prompt_template.py</code>.
            </p>
          </div>
        </div>
      </section>

      {/* Workflows */}
      <section className="bg-white dark:bg-gray-800 rounded-xl shadow p-7">
        <h2 className="text-2xl font-bold mb-5 flex items-center gap-2">
          <Workflow className="w-5 h-5 text-purple-600" />
          Workflows
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
            <h3 className="font-semibold mb-3 text-purple-700 dark:text-purple-400">Pipeline mode (2 steps)</h3>
            <ol className="text-sm text-gray-600 dark:text-gray-400 space-y-2 list-decimal list-inside">
              <li>
                <code className="text-xs text-purple-700 dark:text-purple-300">check_data_availability</code> — probe
                sources, return config
              </li>
              <li>
                <code className="text-xs text-purple-700 dark:text-purple-300">run_pipeline(resolved_config=...)</code> —
                collect, analyze, prompt
              </li>
            </ol>
          </div>
          <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
            <h3 className="font-semibold mb-3 text-purple-700 dark:text-purple-400">Per-source mode</h3>
            <ol className="text-sm text-gray-600 dark:text-gray-400 space-y-2 list-decimal list-inside">
              <li>
                <code className="text-xs text-purple-700 dark:text-purple-300">check_data_availability</code> — see which
                sources have data
              </li>
              <li>
                Call individual tools for each available source (
                <code className="text-xs">get_clinical_trials</code>, <code className="text-xs">get_publications</code>,
                etc.)
              </li>
              <li>Client agent synthesizes the final report</li>
            </ol>
          </div>
        </div>
      </section>

      {/* Data Sources */}
      <section className="bg-white dark:bg-gray-800 rounded-xl shadow p-7">
        <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
          <Database className="w-5 h-5 text-purple-600" />
          Data Sources
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead>
              <tr className="border-b border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-400">
                <th className="py-2 pr-4 font-semibold">Source</th>
                <th className="py-2 pr-4 font-semibold">Content</th>
                <th className="py-2 font-semibold">Coverage</th>
              </tr>
            </thead>
            <tbody>
              {DATA_SOURCES.map((src) => (
                <tr key={src.name} className="border-b border-gray-100 dark:border-gray-700 last:border-0">
                  <td className="py-3 pr-4 font-medium text-gray-800 dark:text-gray-200">
                    {src.name}
                    {src.usOnly && (
                      <span className="ml-2 text-xs font-normal text-amber-600 dark:text-amber-400">US</span>
                    )}
                  </td>
                  <td className="py-3 pr-4 text-gray-600 dark:text-gray-400">{src.content}</td>
                  <td className="py-3 text-gray-600 dark:text-gray-400">{src.coverage}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="text-xs text-gray-500 dark:text-gray-500 mt-4">
          OpenFDA, CMS, and DailyMed are US-focused; CMS often has no data for hospital-administered or specialty drugs.
        </p>
      </section>

      {/* MCP Tools */}
      <section className="bg-white dark:bg-gray-800 rounded-xl shadow p-7">
        <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
          <Layers className="w-5 h-5 text-purple-600" />
          MCP Tools
        </h2>
        <div className="space-y-3">
          {MCP_TOOLS.map((tool) => (
            <div
              key={tool.name}
              className="flex flex-col sm:flex-row sm:items-start gap-1 sm:gap-4 border-b border-gray-100 dark:border-gray-700 last:border-0 pb-3 last:pb-0"
            >
              <code className="text-sm font-mono text-purple-700 dark:text-purple-300 shrink-0">{tool.name}</code>
              <p className="text-sm text-gray-600 dark:text-gray-400">{tool.role}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Auto-Resolution */}
      <section className="bg-white dark:bg-gray-800 rounded-xl shadow p-7">
        <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
          <Wrench className="w-5 h-5 text-purple-600" />
          Auto-Resolution
        </h2>
        <p className="text-gray-700 dark:text-gray-300 text-sm leading-relaxed mb-3">
          From <code className="text-xs">indication</code> + <code className="text-xs">drugs.approved</code>,{" "}
          <code className="text-xs">mi_server/config.py</code> builds the full config:
        </p>
        <ul className="space-y-2 text-gray-700 dark:text-gray-300 text-sm list-disc list-inside">
          <li>
            <strong>ICD-10 / MeSH / search terms</strong> — pre-seeded for 12 common indications; fallback uses
            indication name
          </li>
          <li>
            <strong>Gene targets</strong> — Open Targets GraphQL (EFO disease + top targets with Ensembl IDs)
          </li>
        </ul>
        <p className="text-gray-700 dark:text-gray-300 text-sm leading-relaxed mt-3">
          Agents should use Ensembl IDs from <code className="text-xs">check_data_availability</code>, not hard-coded
          symbols.
        </p>
      </section>

      {/* Project Structure */}
      <section className="bg-white dark:bg-gray-800 rounded-xl shadow p-7">
        <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
          <BookOpen className="w-5 h-5 text-purple-600" />
          Project Structure
        </h2>
        <pre className="text-xs font-mono bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg p-4 overflow-x-auto text-gray-800 dark:text-gray-200 leading-relaxed">
          {PROJECT_STRUCTURE}
        </pre>
      </section>

      <section className="bg-white dark:bg-gray-800 rounded-xl shadow p-7">
        <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
          <Cpu className="w-5 h-5 text-purple-600" />
          Tech Stack
        </h2>
        <ul className="text-sm text-gray-700 dark:text-gray-300 space-y-1 list-disc list-inside">
          <li>Python + FastMCP</li>
          <li>Transport: stdio (local) · HTTP/SSE (Azure Container Apps)</li>
          <li>Hosting: Azure Container Apps (optional)</li>
        </ul>
      </section>
    </div>
  )
}
