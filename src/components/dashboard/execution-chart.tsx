"use client"

import { Layers2 } from "lucide-react"
import { Area, AreaChart, CartesianGrid, XAxis } from "recharts"

import { getWorkflowExecutionsStatsAction } from "@/actions/dashboard/get-executions-stats"
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
    label: "Success",
    color: "hsl(var(--chart-1))",
  },
  failed: {
    label: "Failed",
    color: "hsl(var(--chart-2))",
  },
} satisfies ChartConfig

type ExecutionStatusChartProps = {
  data: Awaited<ReturnType<typeof getWorkflowExecutionsStatsAction>>
}

export function ExecutionsStatusChart({ data }: ExecutionStatusChartProps) {
  return (
    <Card className="">
      <CardHeader>
        <CardTitle className="gap-x-2 flex items-center">
          <Layers2 size={30} />
          <span>Workflow execution status</span>
        </CardTitle>
        <CardDescription>
          Daily number of failed and successful executions
        </CardDescription>
      </CardHeader>
      <CardContent className="mt-3">
        <ChartContainer config={chartConfig} className="h-[195px] w-full">
          <AreaChart
            height={200}
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
              content={<ChartTooltipContent indicator="dot" />}
            />
            <Area
              min={0}
              dataKey="success"
              type="bump"
              fill="var(--color-success)"
              fillOpacity={0.4}
              stroke="var(--color-success)"
              stackId="a"
            />
            <Area
              min={0}
              dataKey="failed"
              type="bump"
              fill="var(--color-failed)"
              fillOpacity={0.4}
              stroke="var(--color-failed)"
              stackId="a"
            />
          </AreaChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
