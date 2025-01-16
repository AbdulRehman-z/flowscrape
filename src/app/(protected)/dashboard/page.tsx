import { getPeriodsAction } from "@/actions/dashboard/get-periods-action";
import PeriodSelector from "@/components/dashboard/period-selector";
import { Skeleton } from "@/components/ui/skeleton";
import { Period } from "@/types/dashboard-types";
import { Suspense } from "react";

type PageProps = {
  searchParams: Promise<Record<string, string>>
}

export default async function Page({ searchParams }: PageProps) {
  const { month, year } = await searchParams

  const currentDate = new Date()
  const period: Period = {
    month: month ? parseInt(month) : currentDate.getMonth(),
    year: year ? parseInt(year) : currentDate.getFullYear()
  }

  return (
    <section className="flex flex-1 flex-col   section-padding">
      <div className="flex w-full items-center justify-between">
        {/* left side */}
        <div className="flex flex-col gap-y-2">
          <h1 className="font-bold text-3xl">Dashboard</h1>
          <p className="text-muted-foreground text-base">Showing workflow executions stats</p>
        </div>
        {/* right side */}
        <div>
          <Suspense fallback={<Skeleton className="h-10 w-20" />}>
            <PeriodSelectorWrapper selectedPeriod={period} />
          </Suspense>
        </div>
      </div>
      <div>
      </div>
    </section>
  )
}


type PeriodSelectorWrapper = {
  selectedPeriod: Period
}

async function PeriodSelectorWrapper({ selectedPeriod }: PeriodSelectorWrapper) {
  const periods = await getPeriodsAction()

  return (
    <PeriodSelector periods={periods} selectedPeriod={selectedPeriod} />
  )
}
