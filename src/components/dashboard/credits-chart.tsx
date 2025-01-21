"use client"

import { ChartBarStacked } from "lucide-react"
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts"

import { getCreditsUsageStatsAction } from "@/actions/dashboard/get-credits-stats"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from "@/components/ui/card"
import {
  ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"
// const chartData = [
//   { month: "January", desktop: 186, mobile: 80 },
//   { month: "February", desktop: 305, mobile: 200 },
//   { month: "March", desktop: 237, mobile: 120 },
//   { month: "April", desktop: 73, mobile: 190 },
//   { month: "May", desktop: 209, mobile: 130 },
//   { month: "June", desktop: 214, mobile: 140 },
// ]

const chartConfig = {
  success: {
    label: "Successful phases credits",
    color: "hsl(var(--chart-1))",
  },
  failed: {
    label: "Failed phases credits",
    color: "hsl(var(--chart-2))",
  },
} satisfies ChartConfig

type CreditsStatusChartProps = {
  data: Awaited<ReturnType<typeof getCreditsUsageStatsAction>>
  title: string,
  description: string
}

export function CreditsStatusChart({ data, description, title }: CreditsStatusChartProps) {
  return (
    <Card className="">
      <CardHeader>
        <CardTitle className="gap-x-2 flex items-center">
          <ChartBarStacked size={30} />
          <span>{title}</span>
        </CardTitle>
        <CardDescription>
          {description}
        </CardDescription>
      </CardHeader>
      <CardContent className="mt-3">
        <ChartContainer config={chartConfig} className="h-[195px] w-full">
          <BarChart height={200}
            accessibilityLayer
            data={data}
            margin={{
              left: 12,
              right: 12,
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="date"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              minTickGap={32}
            />
            <ChartLegend content={<ChartLegendContent />} />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent className="" indicator="dot" />}
            />
            <Bar
              min={0}
              dataKey="success"
              type="bump"
              fill="var(--color-success)"
              fillOpacity={0.4}
              stroke="var(--color-success)"
              stackId="a"
            />
            <Bar
              min={0}
              dataKey="failed"
              type="bump"
              fill="var(--color-failed)"
              fillOpacity={0.4}
              stroke="var(--color-failed)"
              stackId="a"
            />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
