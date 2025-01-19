import { getStatsCardsValues, getStatsCardsValuesAction } from "@/actions/dashboard/get-card-stats";
import { getWorkflowExecutionsStats } from "@/actions/dashboard/get-executions-stats";
import { getPeriodsAction } from "@/actions/dashboard/get-periods-action";
import ExecutionsChart, { ExecutionsStatusChart } from "@/components/dashboard/execution-chart";
import PeriodSelector from "@/components/dashboard/period-selector";
import StatsCard from "@/components/dashboard/stats-card";
import { Skeleton } from "@/components/ui/skeleton";
import { Period } from "@/types/dashboard-types";
import { CirclePlayIcon, CoinsIcon, WaypointsIcon } from "lucide-react";
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
    <section className="flex flex-1 flex-col gap-y-7   section-padding">
      <div className="flex w-full items-center justify-between">
        {/* left side */}
        <div className="flex flex-col gap-y-2">
          <h1 className="font-bold text-3xl">Dashboard</h1>
          <p className="text-muted-foreground text-base">Showing workflow executions stats</p>
        </div>
        {/* right side */}
        <div className="">
          <Suspense fallback={<Skeleton className="h-10 w-20" />}>
            <PeriodSelectorWrapper selectedPeriod={period} />
          </Suspense>
        </div>
      </div>
      {/* main */}
      <div className="flex flex-col gap-y-10">
        <Suspense fallback={<StatsCardSkeleton type="card" />}>
          <StatsCards selectedPeriod={period} />
        </Suspense>
        <Suspense fallback={<StatsCardSkeleton type="executions" />}>
          <StatsExecutionStatus selectedPeriod={period} />
        </Suspense>
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


type StatsCardSkeletonProps = {
  type?: "card" | "executions"
}

function StatsCardSkeleton({ type }: StatsCardSkeletonProps) {
  return (
    <div className="grid grid-cols-1 gap-y-7 md:grid-cols-2 lg:grid-cols-3 gap-x-5">
      {type === "card" ? (
        <Skeleton className="h-1/3 w-full" />
      ) : (
        Array.from({ length: 3 }, (_, i) => (
          <Skeleton key={i} className="h-32 w-72" />
        ))
      )}
    </div>
  )
}

type StatsCardsProps = {
  selectedPeriod: Period
}

async function StatsCards({ selectedPeriod }: StatsCardsProps) {
  const stats = await getStatsCardsValuesAction(selectedPeriod)

  return (
    <div className="grid grid-cols-1 gap-y-7 md:grid-cols-2 lg:grid-cols-3 gap-x-5">
      <StatsCard
        title="Workflows executions"
        value={stats.workflowExecutions}
        icon={CirclePlayIcon}
      />
      <StatsCard
        title="Credits spent"
        value={stats.creditsConsumed}
        icon={CoinsIcon}
      />
      <StatsCard
        title="Phase Executions"
        value={stats.workflowExecutions}
        icon={WaypointsIcon}
      />
    </div>
  )
}

async function StatsExecutionStatus({ selectedPeriod }: StatsCardsProps) {
  const executions = await getWorkflowExecutionsStats(selectedPeriod)
  return (
    <div className="h-[500px]">
      <ExecutionsStatusChart data={executions} />
    </div>
  )
}
