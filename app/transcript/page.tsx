"use client"

import Link from "next/link"
import { ArrowLeft, ExternalLink } from "lucide-react"

export default function TranscriptPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-950 px-4 py-10">
      <div className="container mx-auto max-w-5xl">
        <div className="flex items-center justify-between gap-4 mb-6">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-gray-700 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400 transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            Back
          </Link>

          <a
            href="/transcript.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-md border border-gray-200 dark:border-gray-700 bg-white/70 dark:bg-gray-900/40 px-3 py-2 text-sm font-medium text-gray-800 dark:text-gray-200 hover:shadow-sm hover:-translate-y-0.5 transition-all"
          >
            Open PDF
            <ExternalLink className="h-4 w-4" />
          </a>
        </div>

        <div className="rounded-lg overflow-hidden shadow-lg border border-gray-200 dark:border-gray-800 bg-white/70 dark:bg-gray-900/40 backdrop-blur-sm">
          <div className="px-4 py-3 border-b border-gray-200 dark:border-gray-800">
            <h1 className="text-xl font-bold text-gray-900 dark:text-gray-100">Transcript</h1>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              If the preview is blank, use “Open PDF”.
            </p>
          </div>

          <div className="w-full h-[75vh] bg-gray-100 dark:bg-gray-950">
            <iframe
              src="/transcript.pdf"
              title="Transcript PDF"
              className="w-full h-full"
            />
          </div>
        </div>
      </div>
    </div>
  )
}

