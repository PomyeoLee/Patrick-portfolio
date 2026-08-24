"use client"

import Image from "next/image"
import Link from "next/link"
import { Github, Linkedin, Mail, ArrowDown } from "lucide-react"
import type { PersonalInfo } from "@/lib/information"

interface HeroSectionProps {
  info: PersonalInfo
}

/** Block 1 hero — static layout, no Framer Motion yet */
export function HeroSection({ info }: HeroSectionProps) {
  return (
    <section className="relative pt-28 pb-20 md:pt-36 md:pb-28 px-4 overflow-hidden">
      <div className="container mx-auto max-w-6xl">
        <div className="flex flex-col md:flex-row items-center gap-8 md:gap-16">
          <div className="w-full md:w-1/2 space-y-6">
            <div className="flex flex-wrap items-baseline gap-x-3">
              <h1 className="text-4xl md:text-5xl font-bold tracking-tight">{info.name}</h1>
              <p className="text-xl md:text-2xl font-semibold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                {info.title}
              </p>
            </div>
            <p className="text-lg text-gray-600 dark:text-gray-300">{info.mainDescription}</p>
            <div className="flex gap-4 pt-2">
              <Link
                href={info.linkedin}
                target="_blank"
                className="text-gray-600 hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-400 transition-colors"
              >
                <Linkedin className="w-5 h-5" />
              </Link>
              <Link
                href={info.github}
                target="_blank"
                className="text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white transition-colors"
              >
                <Github className="w-5 h-5" />
              </Link>
              <Link
                href={`mailto:${info.email}`}
                className="text-gray-600 hover:text-red-500 dark:text-gray-400 dark:hover:text-red-400 transition-colors"
              >
                <Mail className="w-5 h-5" />
              </Link>
            </div>
          </div>

          <div className="w-full md:w-1/2 flex justify-center">
            <div className="relative w-full aspect-[3/3.5] rounded-lg overflow-hidden shadow-xl">
              <Image src="/images/profile.jpg" alt={info.name} fill className="object-cover" priority />
            </div>
          </div>
        </div>

        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 hidden md:block">
          <Link href="#about" className="text-gray-400 hover:text-purple-600 transition-colors">
            <ArrowDown className="w-6 h-6" />
          </Link>
        </div>
      </div>
    </section>
  )
}
