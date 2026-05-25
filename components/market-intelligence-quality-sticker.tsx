"use client"

import { cn } from "@/lib/utils"
import { Medal } from "lucide-react"

export type QualityWinner = "llm" | "mcp" | "tie" | "both"

export type QualityStickerProps = {
  verdict: string
  detail: string
  winner: QualityWinner
  /** Slight tilt for sticky-note feel; use -2, 0, or 2 */
  tilt?: -2 | 0 | 2
  className?: string
}

const WINNER_META: Record<QualityWinner, { name: string; sticker: string; tape: string; medal: string }> = {
  mcp: {
    name: "MCP",
    medal: "text-purple-600 dark:text-purple-400",
    sticker:
      "bg-purple-50 dark:bg-purple-950/90 border-purple-300/80 dark:border-purple-600/80 text-purple-950 dark:text-purple-50 shadow-purple-200/50 dark:shadow-purple-900/40",
    tape: "bg-purple-300/70 dark:bg-purple-600/50",
  },
  llm: {
    name: "LLM",
    medal: "text-gray-600 dark:text-gray-400",
    sticker:
      "bg-gray-50 dark:bg-gray-900/95 border-gray-300/80 dark:border-gray-600/80 text-gray-900 dark:text-gray-100 shadow-gray-200/60 dark:shadow-black/30",
    tape: "bg-gray-300/70 dark:bg-gray-600/50",
  },
  tie: {
    name: "TIE",
    medal: "text-amber-600 dark:text-amber-400",
    sticker:
      "bg-amber-50 dark:bg-amber-950/90 border-amber-300/80 dark:border-amber-600/70 text-amber-950 dark:text-amber-50 shadow-amber-200/50 dark:shadow-amber-900/30",
    tape: "bg-amber-300/70 dark:bg-amber-600/50",
  },
  both: {
    name: "BOTH",
    medal: "text-slate-600 dark:text-slate-400",
    sticker:
      "bg-slate-50 dark:bg-slate-900/95 border-slate-300/80 dark:border-slate-600/80 text-slate-900 dark:text-slate-100 shadow-slate-200/50 dark:shadow-black/30",
    tape: "bg-slate-300/70 dark:bg-slate-600/50",
  },
}

const TILT_CLASS: Record<-2 | 0 | 2, string> = {
  [-2]: "-rotate-2 motion-reduce:rotate-0",
  0: "rotate-0",
  2: "rotate-2 motion-reduce:rotate-0",
}

/** Fixed width; height grows with wrapped copy */
export const QUALITY_STICKER_WIDTH = "w-[8.5rem] max-w-[8.5rem]"

export function MarketIntelligenceQualitySticker({
  verdict,
  detail,
  winner,
  tilt = 0,
  className,
}: QualityStickerProps) {
  const { name, sticker, tape, medal } = WINNER_META[winner]
  const winnerLabel = `${name} WINS`

  return (
    <div
      role="note"
      aria-label={`${winnerLabel}. ${verdict}. ${detail}`}
      className={cn(
        "relative shrink-0 rounded-md border px-2.5 py-2.5 shadow-md",
        QUALITY_STICKER_WIDTH,
        sticker,
        TILT_CLASS[tilt],
        className
      )}
    >
      <div
        aria-hidden
        className={cn(
          "absolute -top-1.5 left-1/2 h-3 w-10 -translate-x-1/2 rounded-sm opacity-90",
          tape
        )}
      />
      <div className="flex items-center gap-1 mb-1.5 pt-0.5">
        <Medal className={cn("w-3 h-3 shrink-0 fill-current/25 stroke-[2.25]", medal)} aria-hidden />
        <span className="text-[10px] font-bold uppercase tracking-wide opacity-90">{winnerLabel}</span>
      </div>
      <p className="text-[11px] font-semibold leading-snug break-words">{verdict}</p>
      <p className="text-[10px] leading-relaxed mt-1.5 opacity-85 break-words">{detail}</p>
    </div>
  )
}
