"use client"

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { MarketIntelligenceDisplay } from "@/components/market-intelligence-display"
import { MarketIntelligenceProjectDetail } from "@/components/market-intelligence-project-detail"
import { cn } from "@/lib/utils"

const tabTriggerClass =
  "rounded-2xl py-2.5 text-sm font-semibold transition-colors text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200 data-[state=active]:bg-purple-600 data-[state=active]:text-white data-[state=active]:shadow-md dark:data-[state=active]:bg-purple-500 data-[state=active]:hover:text-white"

export function MarketIntelligenceProjectTabs() {
  return (
    <Tabs defaultValue="display" className="w-full">
      <TabsList className="grid h-auto w-full max-w-lg grid-cols-2 gap-2 mb-8 rounded-3xl border border-gray-200 bg-gray-100/90 p-2 dark:border-gray-700 dark:bg-gray-800/90">
        <TabsTrigger value="display" className={cn(tabTriggerClass)}>
          Report Comparison
        </TabsTrigger>
        <TabsTrigger value="detail" className={cn(tabTriggerClass)}>
          Project Detail
        </TabsTrigger>
      </TabsList>
      <TabsContent value="display" className="mt-0">
        <MarketIntelligenceDisplay />
      </TabsContent>
      <TabsContent value="detail" className="mt-0">
        <MarketIntelligenceProjectDetail />
      </TabsContent>
    </Tabs>
  )
}
