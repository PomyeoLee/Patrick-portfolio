"use client"

import type { ReactNode } from "react"
import { Bot, Database } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import {
  ReportBulletList,
  ReportSectionBlock,
  ReportSubheading,
  ReportTable,
} from "@/components/market-intelligence-report-table"
import {
  MarketIntelligenceQualitySticker,
  type QualityStickerProps,
} from "@/components/market-intelligence-quality-sticker"

/** Uniform body + heading color for the entire LLM (left) column */
const LLM_COLUMN_CLASS =
  "text-gray-700 dark:text-gray-300 [&_h2]:!text-gray-700 dark:[&_h2]:!text-gray-300 [&_h3]:!text-gray-700 dark:[&_h3]:!text-gray-300 [&_p]:!text-gray-700 dark:[&_p]:!text-gray-300 [&_li]:!text-gray-700 dark:[&_li]:!text-gray-300 [&_th]:!text-gray-700 dark:[&_th]:!text-gray-300 [&_td]:!text-gray-700 dark:[&_td]:!text-gray-300 [&_strong]:!text-gray-700 dark:[&_strong]:!text-gray-300 [&_span]:!text-gray-700 dark:[&_span]:!text-gray-300"

/** Purple backdrop + frame behind the entire right column (desktop) */
const MCP_COLUMN_BACKDROP =
  "hidden xl:block pointer-events-none absolute top-3 right-3 bottom-3 left-[calc(50%+0.375rem)] rounded-xl border-2 border-purple-500 dark:border-purple-500 bg-purple-50/40 dark:bg-purple-950/30 shadow-[0_0_0_1px_rgba(147,51,234,0.15)]"

const MCP_CELL_CLASS = "min-w-0 px-4 sm:px-5 xl:py-0"

/** Horizontal inset so center stickers sit in empty gutter, not over copy */
const STICKER_GUTTER_X = "xl:pr-[6.25rem]"
const STICKER_GUTTER_X_R = "xl:pl-[6.25rem]"

/** One row: left + right cells share the same top edge; optional center-gutter quality sticker */
function AlignedSectionRow({
  llm,
  mcp,
  sticker,
}: {
  llm: ReactNode
  mcp: ReactNode
  sticker?: QualityStickerProps
}) {
  return (
    <div className="relative">
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-8 xl:gap-4 items-start">
        <div
          className={`${MCP_CELL_CLASS} ${LLM_COLUMN_CLASS} ${sticker ? STICKER_GUTTER_X : ""}`}
        >
          {llm}
        </div>
        <div
          className={`${MCP_CELL_CLASS} max-xl:rounded-xl max-xl:border-2 max-xl:border-purple-500 max-xl:bg-purple-50/40 max-xl:dark:bg-purple-950/30 max-xl:py-4 ${sticker ? STICKER_GUTTER_X_R : ""}`}
        >
          {mcp}
        </div>
      </div>

      {sticker && (
        <>
          <div className="hidden xl:flex absolute left-1/2 top-8 -translate-x-1/2 z-10 pointer-events-none items-start justify-center">
            <MarketIntelligenceQualitySticker {...sticker} />
          </div>
          <div className="xl:hidden flex justify-center mt-4 px-2">
            <MarketIntelligenceQualitySticker {...sticker} />
          </div>
        </>
      )}
    </div>
  )
}

function LlmHeader() {
  return (
    <div className="space-y-2">
      <h2 className="text-sm font-bold leading-snug">Lung Cancer Market Report</h2>
      <div className="text-xs space-y-0.5">
        <p>
          <span className="font-medium">Indication:</span> Lung Cancer (ICD-10: C34)
        </p>
        <p>
          <span className="font-medium">Data collected:</span> May 25, 2026
        </p>
        <p>
          <span className="font-medium">LLM:</span> Gemini 3.1 Pro with required structure
        </p>
      </div>
    </div>
  )
}

function McpHeader() {
  return (
    <div className="space-y-2">
      <h2 className="text-sm font-bold leading-snug text-gray-900 dark:text-gray-100">Lung Cancer Market Intelligence Report</h2>
      <div className="text-xs text-gray-600 dark:text-gray-400 space-y-0.5">
        <p>
          <span className="font-medium">Indication:</span> Lung Cancer (ICD-10: C34)
        </p>
        <p>
          <span className="font-medium">Data collected:</span> May 25, 2026
        </p>
        <p>
          <span className="font-medium">Sources:</span> ClinicalTrials.gov, FDA FAERS, PubMed, Open Targets,
          DailyMed (CMS Part D: no outpatient data for these agents)
        </p>
      </div>
    </div>
  )
}

function ExecutiveSummaryLlm() {
  return (
    <ReportSectionBlock title="Executive Summary">
      <p className="text-xs text-gray-700 dark:text-gray-300 leading-relaxed">
        The treatment paradigm for lung cancer, particularly Non-Small Cell Lung Cancer (NSCLC), underwent a profound
        transformation in 2025 and early 2026. The FDA approved an unprecedented seven new precision therapies within a
        single year, shifting the standard of care from broad cytotoxic approaches toward hyper-segmented, biomarker-driven
        strategies. The commercial landscape is now dominated by Antibody-Drug Conjugates (ADCs) and next-generation
        Tyrosine Kinase Inhibitors (TKIs) targeting specific alterations such as HER2, EGFR exon 20, c-MET, and ROS1.
      </p>
      <p className="text-xs text-gray-700 dark:text-gray-300 leading-relaxed">
        For pharmaceutical executives, competitive advantage now hinges on diagnostic partnerships, mitigating unique
        toxicity profiles (like interstitial lung disease), and demonstrating superior efficacy in post-immunotherapy
        resistance settings.
      </p>
    </ReportSectionBlock>
  )
}

function ExecutiveSummaryMcp() {
  return (
    <ReportSectionBlock title="Executive Summary">
      <p className="text-xs text-gray-700 dark:text-gray-300 leading-relaxed">
        The lung cancer market is large, biomarker-driven, and heavily concentrated in immunotherapy and targeted therapy.{" "}
        <strong>1,000+</strong> clinical trials are registered on ClinicalTrials.gov, with <strong>272</strong> Phase 2 and{" "}
        <strong>73</strong> Phase 3 studies active or completed—signaling intense late-stage competition. NCI (32 trials),
        AstraZeneca (17), and major academic centers lead sponsor activity.
      </p>
      <p className="text-xs text-gray-700 dark:text-gray-300 leading-relaxed">
        Among the four benchmarked approved therapies, pembrolizumab (Keytruda) has the broadest clinical footprint (30
        active trials) and the highest FAERS volume (100,872 reports). Osimertinib (Tagrisso) anchors the EGFR-mutant NSCLC
        segment. Durvalumab (Imfinzi) is differentiated in chemoradiation-consolidation and IO-combination settings. Sotorasib
        (Lumakras) is first-in-class KRAS G12C with a narrower trial base (2 active trials) but the highest diarrhea rate in
        FAERS cross-comparison (9.74%).
      </p>
      <p className="text-xs text-gray-700 dark:text-gray-300 leading-relaxed">
        Scientific output is accelerating: PubMed returned <strong>400</strong> unique articles over three years, with{" "}
        <strong>181</strong> in 2025 alone. Top validated targets: EGFR (0.90), KRAS (0.86), ERBB2 (0.84), ALK (0.83), ROS1
        (0.82).
      </p>
    </ReportSectionBlock>
  )
}

function IndicationOverviewLlm() {
  return (
    <ReportSectionBlock title="1. Indication Overview">
      <ReportBulletList
        items={[
          "Disease: Malignant neoplasm of bronchus and lung (ICD-10: C34)",
          "Subtypes: Non-Small Cell Lung Cancer (NSCLC, ~85%) and Small Cell Lung Cancer (SCLC, ~15%)",
          "Epidemiology: Lung cancer remains the leading cause of cancer-related mortality globally; overall survival (OS) rates are steadily increasing due to targeted precision treatments",
          "Market Dynamics: The addressable patient population is highly fragmented. Comprehensive genomic profiling via Next-Generation Sequencing (NGS) is now a mandatory precursor to treatment selection, effectively turning advanced NSCLC into a collection of genetically defined rare diseases",
        ]}
      />
    </ReportSectionBlock>
  )
}

function IndicationOverviewMcp() {
  return (
    <ReportSectionBlock title="1. Indication Overview">
      <p className="text-xs text-gray-700 dark:text-gray-300 leading-relaxed">
        Lung cancer spans NSCLC, SCLC, and molecular subtypes defined by driver mutations. Open Targets links the indication
        to a dense target network:
      </p>
      <ReportTable
        headers={["Target", "Score", "Drugs", "Strategic Role"]}
        rows={[
          ["EGFR", "0.90", "79", "Dominant NSCLC driver; crowded TKI/ADC landscape"],
          ["KRAS", "0.86", "3", "G12C niche; sotorasib/adagrasib approved/pipeline"],
          ["ERBB2 (HER2)", "0.84", "47", "Emerging NSCLC biomarker; ADC activity"],
          ["ALK", "0.83", "12", "Mature TKI class"],
          ["ROS1", "0.82", "4", "Fusion-driven; repotrectinib, entrectinib"],
          ["MET", "0.82", "—", "Resistance / exon 14 skipping"],
          ["TP53", "0.82", "—", "Ubiquitous; harder to drug directly"],
        ]}
      />
      <p className="text-xs text-gray-600 dark:text-gray-400">
        EGFR shows the deepest pipeline: 10+ Phase 3 candidates plus approved afatinib, lazertinib, neratinib. KRAS is
        narrower (3 drugs): sotorasib, adagrasib, Phase 2 salirasib.
      </p>
    </ReportSectionBlock>
  )
}

function TreatmentLandscapeLlm() {
  return (
    <ReportSectionBlock title="2. Treatment Landscape">
      <p className="text-xs text-gray-700 dark:text-gray-300 leading-relaxed mb-2">
        Recent regulatory actions in 2025 and 2026 have cemented precision oncology as the backbone of NSCLC management.
      </p>
      <ReportSubheading>2.1 Approved Therapies</ReportSubheading>
      <ReportSubheading>Antibody-Drug Conjugates (ADCs)</ReportSubheading>
      <ReportBulletList
        items={[
          "Telisotuzumab vedotin: Approved May 2025 for stage IV non-squamous NSCLC with strong c-MET protein overexpression following prior systemic therapy",
          "Datopotamab deruxtecan (Dato-DXd): TROP-2 directed ADC approved for metastatic EGFR-mutated NSCLC after EGFR-targeted therapy and platinum-based chemotherapy",
        ]}
      />
      <ReportSubheading>Next-Generation TKIs &amp; Biologics</ReportSubheading>
      <ReportBulletList
        items={[
          "Rybrevant Faspro (amivantamab SC): Approved December 2025 for EGFR-mutated NSCLC; subcutaneous formulation reduces infusion times and infusion-related reactions vs. IV",
          "HER2-Mutant NSCLC: FDA approved sevabertinib (Hyrnuo) and zongertinib for activating HER2 mutations—competing with fam-trastuzumab deruxtecan",
          "EGFR Exon 20 Insertions: Sunvozertinib approved July 2025 for durable responses post-chemotherapy",
          "ROS1 Alterations: Taletrectinib approved for treatment-naïve and previously treated ROS1-rearranged NSCLC",
        ]}
      />
      <ReportSubheading>2.2 Pipeline Highlights</ReportSubheading>
      <p className="text-xs text-gray-600 dark:text-gray-400 mb-1">
        The 2026 pipeline focuses on targeted protein degradation and overcoming PD-1/PD-L1 resistance.
      </p>
      <ReportBulletList
        items={[
          "Plinabulin (BeyondSpring): Phase 3 DUBLIN-4 confirmatory trial in 2026 for EGFR wild-type NSCLC post-checkpoint inhibitors; may restore IO sensitivity",
          "TRI-611 (TRIANA Biomedicines): Molecular glue degrader for ALK-positive NSCLC; FDA Fast Track designation March 2026",
          "PDL1V / PF-08046054 (Pfizer): Early-stage PD-L1 therapy; ctDNA reduction correlates with radiographic response",
          "Zidesamtinib (Nuvalent): Phase 1/2 ARROS-1 for advanced ROS1-positive solid tumors; data updates anticipated at ASCO 2026",
        ]}
      />
      <ReportSubheading>2.3 Competitive Positioning Matrix</ReportSubheading>
      <ReportTable
        headers={["Target / Pathway", "Lead Approved Agents", "Key Pipeline Competitors", "Target Patient Segment"]}
        rows={[
          ["EGFR (Classic)", "Osimertinib, Rybrevant SC", "Plinabulin (Post-IO)", "1L & 2L NSCLC"],
          ["EGFR (Exon 20)", "Sunvozertinib, Amivantamab", "Undisclosed TKIs", "Post-platinum NSCLC"],
          ["c-MET", "Telisotuzumab vedotin", "Various bispecifics", "High c-MET overexpressors"],
          ["HER2", "Sevabertinib, Zongertinib, T-DXd", "Undisclosed TKIs", "HER2-mutant & IHC3+ NSCLC"],
          ["TROP-2", "Dato-DXd", "Sacituzumab govitecan", "EGFR-mutant post-TKI"],
          ["ROS1 / ALK", "Taletrectinib, Repotrectinib", "TRI-611, Zidesamtinib", "TKI-resistant alterations"],
        ]}
      />
    </ReportSectionBlock>
  )
}

function TreatmentLandscapeMcp() {
  return (
    <ReportSectionBlock title="2. Treatment Landscape">
      <ReportSubheading>2.1 Approved Therapies</ReportSubheading>
      <ReportTable
        headers={["Drug", "Brand", "Key Indication", "Boxed Warning", "Active Trials"]}
        rows={[
          ["Pembrolizumab", "Keytruda / QLEX", "NSCLC, melanoma, HNSCC, urothelial, MPM", "Immune-mediated AE", "30"],
          ["Osimertinib", "Tagrisso", "EGFR ex19/L858R: adjuvant, locally advanced, metastatic", "ILD/pneumonitis", "16"],
          ["Durvalumab", "Imfinzi", "NSCLC post-cCRT consolidation; IO combos", "Immune-mediated AE", "15"],
          ["Sotorasib", "Lumakras", "KRAS G12C+ NSCLC (accelerated approval)", "Hepatotoxicity", "2"],
        ]}
      />
      <p className="text-xs text-gray-600 dark:text-gray-400">
        Keytruda: PD-1 backbone; QLEX subcutaneous (2025). Tagrisso: reference EGFR TKI. Imfinzi: PACIFIC-like consolidation.
        Lumakras: smaller G12C pool (~13% NSCLC).
      </p>
      <ReportSubheading>2.2 Pipeline (configured)</ReportSubheading>
      <ReportTable
        headers={["Drug", "Sponsor", "Active Trials", "Notes"]}
        rows={[
          ["Adagrasib", "Mirati", "1", "KRAS G12C; competes with sotorasib"],
          ["Datopotamab deruxtecan", "AstraZeneca/Daiichi", "3", "TROP2 ADC; hot modality in NSCLC"],
        ]}
      />
      <ReportSubheading>2.3 Competitive Landscape (ClinicalTrials.gov)</ReportSubheading>
      <ReportTable
        headers={["Phase bucket", "Count"]}
        rows={[
          ["Phase 2", "272"],
          ["Not applicable / observational", "376"],
          ["Phase 1", "165"],
          ["Phase 1/2", "74"],
          ["Phase 3", "73"],
          ["Phase 4", "20"],
        ]}
      />
      <p className="text-xs text-gray-600 dark:text-gray-400">
        Status: 386 completed, 159 recruiting, 103 terminated. Top sponsors: NCI (32), AstraZeneca (17), MD Anderson (15).
        White space limited in PD-1/EGFR; differentiation shifts to ADCs, KRAS beyond G12C, neoadjuvant IO.
      </p>
    </ReportSectionBlock>
  )
}

function SafetyBenchmarkingLlm() {
  return (
    <ReportSectionBlock title="3. Safety Benchmarking">
      <p className="text-xs text-gray-700 dark:text-gray-300 leading-relaxed mb-2">
        As survival extends, tolerability and long-term toxicity management dictate market share among therapies with
        similar efficacy profiles.
      </p>
      <ReportBulletList
        items={[
          "ADC Toxicity Profiles: Dato-DXd and telisotuzumab vedotin carry distinct risks vs. classical chemotherapy. Interstitial lung disease (ILD) remains a class-wide concern and major driver of discontinuation. Dato-DXd is associated with stomatitis and ocular toxicities; telisotuzumab vedotin requires monitoring for peripheral neuropathy",
          "TKI Safety: Next-generation TKIs (sevabertinib, sunvozertinib) offer manageable profiles but require monitoring for QTc prolongation, hepatotoxicity, and GI disruptions",
          "Formulation Advantages: Subcutaneous amivantamab drastically minimizes infusion-related reactions (IRRs) vs. intravenous predecessor—a leap in patient safety and clinic workflow efficiency",
        ]}
      />
    </ReportSectionBlock>
  )
}

function SafetyBenchmarkingMcp() {
  return (
    <ReportSectionBlock title="3. Safety Benchmarking (FDA FAERS)">
      <ReportTable
        headers={["Drug", "Total Reports", "Dominant Signals"]}
        rows={[
          ["Pembrolizumab", "100,872", "Progression (11.6%), death (5.7%), diarrhea (5.5%)"],
          ["Osimertinib", "31,127", "Death (11.1%), progression (3.2%), resistance (1.1%)"],
          ["Durvalumab", "19,144", "Death (3.5%), pneumonitis (0.9%), radiation pneumonitis (0.8%)"],
          ["Sotorasib", "3,121", "NSCLC codes, diarrhea (9.7%), hepatotoxicity"],
        ]}
      />
      <ReportSubheading>Cross-drug AE rates (% of reports)</ReportSubheading>
      <ReportTable
        headers={["AE", "Pembrolizumab", "Osimertinib", "Durvalumab", "Sotorasib"]}
        rows={[
          ["Diarrhea", "5.47%", "5.17%", "3.09%", "9.74%"],
          ["Fatigue", "4.91%", "3.14%", "2.24%", "3.11%"],
          ["Decreased appetite", "3.20%", "2.50%", "1.43%", "2.02%"],
          ["Nausea", "3.45%", "2.27%", "1.63%", "3.36%"],
        ]}
      />
      <p className="text-xs text-gray-600 dark:text-gray-400 italic">
        Caveat: FAERS is spontaneous reporting; rates are not incidence.
      </p>
    </ReportSectionBlock>
  )
}

function PayerAccessLlm() {
  return (
    <ReportSectionBlock title="4. Payer & Market Access Context">
      <p className="text-xs text-gray-700 dark:text-gray-300 leading-relaxed mb-2">
        Market access in the 2026 lung cancer space is tightly controlled by payer mandates surrounding molecular testing.
      </p>
      <ReportBulletList
        items={[
          "Diagnostic Gatekeeping: Payers require FDA-approved companion diagnostics (CDx) or validated NGS panels before authorizing targeted therapies; broad-panel liquid and tissue NGS is a strict prerequisite for reimbursement",
          "Prior Authorization & Step Therapy: For post-line agents like Dato-DXd or sunvozertinib, payers mandate documented progression on required prior lines (e.g., EGFR-targeted therapy and platinum chemotherapy)",
          "Value-Based Contracting: Premium pricing of ADCs and novel TKIs drives increasing pressure for agreements tethered to real-world durability of response and overall survival (OS)",
        ]}
      />
    </ReportSectionBlock>
  )
}

function PayerAccessMcp() {
  return (
    <ReportSectionBlock title="4. Payer & Market Access">
      <p className="text-xs text-gray-700 dark:text-gray-300 leading-relaxed">
        <strong>CMS Medicare Part D:</strong> No spending records for pembrolizumab, osimertinib, durvalumab, or sotorasib.
      </p>
      <p className="text-xs text-gray-600 dark:text-gray-400">
        Part D captures retail/outpatient oral fills; IV IO and many oral oncolytics flow through Part B, 340B, or specialty
        pharmacy. Access strategy should emphasize Medicare Part B ASP, hospital outpatient, biomarker prior auth, and
        patient assistance—not Part D formulary alone.
      </p>
    </ReportSectionBlock>
  )
}

function LiteratureLlm() {
  return (
    <ReportSectionBlock title="5. Literature & Scientific Trends">
      <p className="text-xs text-gray-700 dark:text-gray-300 leading-relaxed mb-2">
        Scientific literature in early 2026 is heavily skewed toward resistance mechanisms and novel modalities.
      </p>
      <ReportBulletList
        items={[
          "Targeted Protein Degradation: Fast-track designation of TRI-611 marks a shift toward molecular glues and PROTACs designed to eliminate oncogenic drivers entirely, rather than only inhibiting kinase activity",
          "ctDNA as a Surrogate: Liquid biopsies are transitioning from diagnostic tool to dynamic monitoring standard; trials increasingly use early ctDNA clearance as a surrogate for clinical efficacy, accelerating signal finding in Phase 1/2 studies",
        ]}
      />
    </ReportSectionBlock>
  )
}

function LiteratureMcp() {
  return (
    <ReportSectionBlock title="5. Literature & Scientific Trends">
      <ReportTable
        headers={["Metric", "Value"]}
        rows={[
          ["Unique articles (3-yr)", "400"],
          ["2024 publications", "154"],
          ["2025 publications", "181"],
          ["2026 YTD (partial)", "25"],
        ]}
      />
      <p className="text-xs text-gray-600 dark:text-gray-400">
        Themes: neoadjuvant/perioperative chemo-IO, SCLC IO, EGFR TKI resistance, organoids, amivantamab toxicity management.
      </p>
      <ReportTable
        headers={["Author", "Publications"]}
        rows={[
          ["Zhang Li", "8"],
          ["Yang Fan, Zhang Jian, Fan Yun, Cheng Ying, Wu Lin, Le Xiuning, Kim Dong-Wan", "4 each"],
          ["Jänne Pasi A, Cappuzzo Federico", "3 each"],
        ]}
      />
      <p className="text-xs text-gray-600 dark:text-gray-400">+22% 2024→2025 publication velocity in this sample.</p>
    </ReportSectionBlock>
  )
}

function SegmentationImplicationsLlm() {
  return (
    <ReportSectionBlock title="6. Cross-Reference: Segmentation Implications">
      <p className="text-xs text-gray-700 dark:text-gray-300 leading-relaxed mb-2">
        For commercial and clinical strategy teams, the NSCLC market can no longer be viewed as a monolith.
      </p>
      <ReportBulletList
        items={[
          "Commercial Targeting: Sales forces must engage molecular pathologists and specialized thoracic oncologists—not only community oncologists. Delayed NGS turnaround risks initiating chemo-immunotherapy instead of targeted therapy, resulting in lost market share",
          "Clinical Trial Design: Future trials should adopt adaptive master protocol designs (umbrella or basket trials) to efficiently recruit narrow patient slivers (e.g., ROS1-positive patients resistant to first-generation TKI)",
        ]}
      />
    </ReportSectionBlock>
  )
}

function StrategicImplicationsMcp() {
  return (
    <ReportSectionBlock title="6. Strategic Implications">
      <ReportTable
        headers={["Theme", "Finding", "Implication"]}
        rows={[
          ["IO crowding", "Pembrolizumab in 30 active trials", "Biomarker- or setting-specific differentiation"],
          ["EGFR maturity", "79 drugs on EGFR; Tagrisso entrenched", "Compete on resistance, CNS, tolerability, ADCs"],
          ["KRAS G12C", "Small pipeline; 2 approved", "Line sequencing, combos, G12C-negative biology"],
          ["ADC wave", "Dato-DXd (TROP2) in pipeline", "TROP2 validated; ILD risk shapes share"],
          ["Safety narrative", "Durvalumab lung signals; sotorasib GI/hepatic", "Medical affairs / monitoring as access enablers"],
          ["Payer blind spot", "No Part D data", "Use Part B / specialty pharmacy for true access analytics"],
        ]}
      />
    </ReportSectionBlock>
  )
}

function DataSourcesLlm() {
  return (
    <ReportSectionBlock title="7. Data Sources & Methodology">
      <ReportBulletList
        items={[
          "Regulatory Data: FDA Novel Drug Approvals and Fast Track Designations (2025–Q2 2026)",
          "Clinical Trial Registries: Ongoing Phase 1–3 results (e.g., DUBLIN-3, ARROS-1, DESTINY-Lung01)",
          "Scientific Literature: Peer-reviewed publications and anticipated ASCO 2026 abstracts",
          "Financial & Corporate Disclosures: Q1 2026 earnings reports and pipeline updates from major oncology manufacturers and clinical-stage biotech firms",
        ]}
      />
      <p className="text-xs text-gray-500 dark:text-gray-500 italic mt-3">Report generated: May 25, 2026</p>
    </ReportSectionBlock>
  )
}

function DataSourcesMcp() {
  return (
    <ReportSectionBlock title="7. Data Sources & Methodology">
      <ReportTable
        headers={["Source", "Status", "Notes"]}
        rows={[
          ["ClinicalTrials.gov", "Success", "1,000-trial cap; lung / NSCLC / SCLC terms"],
          ["FDA FAERS (OpenFDA)", "Success", "US-approved drugs only"],
          ["PubMed", "Success", "400 articles; 3-year window"],
          ["Open Targets", "Success", "Top 5 targets auto-resolved"],
          ["DailyMed", "Success", "US labels for 4 approved drugs"],
          ["CMS Medicare Part D", "No data", "Expected for infusion/specialty oncology"],
        ]}
      />
      <p className="text-xs text-gray-600 dark:text-gray-400">
        Configured drugs: pembrolizumab, osimertinib, durvalumab, sotorasib (approved); adagrasib, datopotamab deruxtecan
        (pipeline).
      </p>
      <p className="text-xs text-gray-500 dark:text-gray-500 italic">Report generated: May 25, 2026</p>
    </ReportSectionBlock>
  )
}

export function MarketIntelligenceComparison() {
  return (
    <div className="space-y-6">
      <p className="text-sm text-gray-600 dark:text-gray-400 w-full text-left leading-relaxed">
        MCP improves the system by introducing a structured, tool-driven data pipeline that collects biomedical
        information directly from authoritative public APIs and organizes it before any language model reasoning
        occurs. Instead of relying on the model&apos;s internal knowledge, it uses dedicated collectors to retrieve
        clinical trials, publications, safety data, drug labels, gene–disease links, and payer information in a
        consistent format. This data is then standardized through a configuration layer and processed in a pipeline
        that aggregates it into clear analytical domains such as competitive landscape, safety, literature trends, and
        market access. The result is a structured, reusable dataset that can be reliably used for downstream analysis.
        The key benefit is that the LLM operates on curated, up-to-date, and consistently structured inputs rather than
        raw or inferred information, making the overall system more systematic, maintainable, and suitable for real-world
        market intelligence workflows.
      </p>

      <div className="relative rounded-xl border border-gray-200 dark:border-gray-700 shadow-lg bg-white dark:bg-gray-800 overflow-hidden p-3 sm:p-4">
        <div aria-hidden className={MCP_COLUMN_BACKDROP} />

        <div className="relative z-10 space-y-8 xl:space-y-6 pb-2">
          <AlignedSectionRow
            llm={
              <div className="flex items-center gap-3 py-2 xl:py-3 xl:px-1 rounded-lg bg-gray-50 dark:bg-gray-900/50">
                <div className="w-11 h-11 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center shrink-0">
                  <Bot className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-bold text-xl leading-tight">LLM Research</h3>
                  <Badge variant="outline" className="mt-1.5 text-sm bg-gray-100 dark:bg-gray-800">
                    No live API data
                  </Badge>
                </div>
              </div>
            }
            mcp={
              <div className="flex items-center gap-3 py-2 xl:py-3 xl:px-1 xl:rounded-t-lg">
                <div className="w-11 h-11 rounded-full bg-purple-200 dark:bg-purple-800 flex items-center justify-center shrink-0">
                  <Database className="w-5 h-5 text-purple-700 dark:text-purple-300" />
                </div>
                <div>
                  <h3 className="font-bold text-xl leading-tight text-purple-900 dark:text-purple-100">MCP-Based Research</h3>
                  <Badge
                    variant="outline"
                    className="mt-1.5 text-sm bg-purple-100/80 dark:bg-purple-900/50 border-purple-400 dark:border-purple-600"
                  >
                    Live API orchestration
                  </Badge>
                </div>
              </div>
            }
          />

          <AlignedSectionRow llm={<LlmHeader />} mcp={<McpHeader />} />
          <AlignedSectionRow
            llm={<ExecutiveSummaryLlm />}
            mcp={<ExecutiveSummaryMcp />}
            sticker={{
              winner: "mcp",
              verdict: "Why better: provable scale",
              detail: "MCP ties trial, safety, and literature counts to live APIs; LLM states impact without traceable figures.",
              tilt: -2,
            }}
          />
          <AlignedSectionRow
            llm={<IndicationOverviewLlm />}
            mcp={<IndicationOverviewMcp />}
            sticker={{
              winner: "mcp",
              verdict: "Why better: ranked targets",
              detail: "MCP scores and drug counts show where to compete; LLM epidemiology doesn't prioritize EGFR vs KRAS.",
              tilt: 0,
            }}
          />
          <AlignedSectionRow
            llm={<TreatmentLandscapeLlm />}
            mcp={<TreatmentLandscapeMcp />}
            sticker={{
              winner: "both",
              verdict: "Why both: split jobs",
              detail: "LLM names 2025–26 approvals and modality story; MCP adds trial phases, sponsors, and configured drug depth.",
              tilt: -2,
            }}
          />
          <AlignedSectionRow
            llm={<SafetyBenchmarkingLlm />}
            mcp={<SafetyBenchmarkingMcp />}
            sticker={{
              winner: "mcp",
              verdict: "Why better: comparable AEs",
              detail: "MCP FAERS % rates benchmark products across drugs; LLM class-risk prose can't rank diarrhea or ILD side by side.",
              tilt: 2,
            }}
          />
          <AlignedSectionRow
            llm={<PayerAccessLlm />}
            mcp={<PayerAccessMcp />}
            sticker={{
              winner: "llm",
              verdict: "Why better: payer logic",
              detail: "LLM explains CDx gatekeeping and step therapy; MCP only documents missing Part D—not how access actually works.",
              tilt: 0,
            }}
          />
          <AlignedSectionRow
            llm={<LiteratureLlm />}
            mcp={<LiteratureMcp />}
            sticker={{
              winner: "mcp",
              verdict: "Why better: momentum",
              detail: "MCP publication counts, YoY growth, and author concentration show scientific heat; LLM thematic bullets don't quantify velocity.",
              tilt: -2,
            }}
          />
          <AlignedSectionRow
            llm={<SegmentationImplicationsLlm />}
            mcp={<StrategicImplicationsMcp />}
            sticker={{
              winner: "mcp",
              verdict: "Why better: exec scan",
              detail: "MCP theme→finding→implication rows drive BD decisions fast; LLM commercial prose is harder to scan under time pressure.",
              tilt: 2,
            }}
          />
          <AlignedSectionRow
            llm={<DataSourcesLlm />}
            mcp={<DataSourcesMcp />}
            sticker={{
              winner: "mcp",
              verdict: "Why better: audit trail",
              detail: "MCP shows each API success or gap for diligence; LLM source category lists don't prove anything was actually queried.",
              tilt: 0,
            }}
          />
        </div>
      </div>
    </div>
  )
}
