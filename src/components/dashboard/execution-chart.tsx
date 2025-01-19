"use client"

import { ChartBarStacked, TrendingUp } from "lucide-react"
import { Area, AreaChart, CartesianGrid, XAxis } from "recharts"

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"
import { getWorkflowExecutionsStats } from "@/actions/dashboard/get-executions-stats"
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
  data: Awaited<ReturnType<typeof getWorkflowExecutionsStats>>
}

export function ExecutionsStatusChart({ data }: ExecutionStatusChartProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="gap-x-2 flex items-center">
          <ChartBarStacked size={30} />
          <span>Workflow execution status</span>
        </CardTitle>
        <CardDescription>
          Daily number of failed and successful executions
        </CardDescription>
      </CardHeader>
      <CardContent className="mt-3">
        <ChartContainer config={chartConfig} className="h-[500px] w-full">
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
              tickFormatter={(value) => {
                console.log({ value })
                const date = new Date(value)
                return date.toLocaleDateString("en-US", { month: "short", day: "numeric" })
              }}
            />
            <ChartLegend />
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
