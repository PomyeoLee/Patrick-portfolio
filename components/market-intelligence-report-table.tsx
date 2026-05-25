import type { ReactNode } from "react"
import { cn } from "@/lib/utils"

type ReportTableProps = {
  headers: string[]
  rows: string[][]
  className?: string
}

export function ReportTable({ headers, rows, className }: ReportTableProps) {
  return (
    <div className={cn("overflow-x-auto -mx-1", className)}>
      <table className="w-full text-xs border-collapse min-w-[280px]">
        <thead>
          <tr className="border-b border-gray-200 dark:border-gray-600">
            {headers.map((h) => (
              <th
                key={h}
                className="text-left py-2 px-2 font-semibold text-gray-700 dark:text-gray-300 whitespace-nowrap"
              >
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, i) => (
            <tr key={i} className="border-b border-gray-100 dark:border-gray-700/80 last:border-0">
              {row.map((cell, j) => (
                <td key={j} className="py-2 px-2 text-gray-600 dark:text-gray-400 align-top">
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export function ReportSectionBlock({
  title,
  children,
  className,
}: {
  title?: string
  children: ReactNode
  className?: string
}) {
  return (
    <div className={cn("space-y-3", className)}>
      {title && <h3 className="text-lg font-bold text-purple-800 dark:text-purple-300 leading-snug">{title}</h3>}
      {children}
    </div>
  )
}

export function ReportMutedNote({ children }: { children: ReactNode }) {
  return (
    <p className="text-xs italic text-amber-700/90 dark:text-amber-400/90 bg-amber-50 dark:bg-amber-950/30 border border-amber-200/60 dark:border-amber-800/40 rounded px-2 py-1.5">
      {children}
    </p>
  )
}

export function ReportBulletList({ items }: { items: string[] }) {
  return (
    <ul className="text-xs text-gray-700 dark:text-gray-300 space-y-1.5 list-disc list-inside leading-relaxed">
      {items.map((item) => (
        <li key={item}>{item}</li>
      ))}
    </ul>
  )
}

export function ReportSubheading({ children }: { children: ReactNode }) {
  return <p className="text-base font-semibold text-gray-800 dark:text-gray-200 mt-3 first:mt-0 leading-snug">{children}</p>
}

export function ReportUnavailable() {
  return (
    <div className="flex items-center justify-center min-h-[120px] rounded-lg border border-dashed border-gray-200 dark:border-gray-600 bg-gray-50/80 dark:bg-gray-900/40 px-4">
      <p className="text-xs text-center text-gray-500 dark:text-gray-500">
        Not included in standard LLM-only workflow
      </p>
    </div>
  )
}
