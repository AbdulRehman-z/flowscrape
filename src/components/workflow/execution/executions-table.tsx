"use client";

import { getWorkflowExecutions } from "@/actions/workflow/get-workflow-executions";
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useGetWorkflowExecutions } from "@/hooks/workflow/use-get-workflow-executions";
import { DatesToDurationString, formatDate } from "@/lib/utils";
import { formatDistanceToNow } from "date-fns";
import { useRouter } from "next/navigation";

type ExecutionsTableProps = {
  workflowId: string
  initialData: Awaited<ReturnType<typeof getWorkflowExecutions>>
}

export default function ExecutionsTable({ workflowId, initialData }: ExecutionsTableProps) {
  const { executions } = useGetWorkflowExecutions(workflowId, initialData)
  const router = useRouter();
  return (
    <Table className="border-collapse w-full shadow-sm rounded-lg overflow-hidden">
      <TableCaption className="p-4 text-sm font-medium">List of recent workflow executions.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="px-6 py-4 text-left font-semibold">Id</TableHead>
          <TableHead className="px-6 py-4 text-left font-semibold">Execution Method</TableHead>
          <TableHead className="px-6 py-4 text-left font-semibold">Status</TableHead>
          <TableHead className="px-6 py-4 text-left font-semibold">Created At</TableHead>
          <TableHead className="px-6 py-4 text-left font-semibold">Time Taken</TableHead>
          <TableHead className="px-6 py-4 text-left font-semibold">Credits Consumed</TableHead>
          <TableHead className="px-6 py-4 text-left font-semibold">Last run </TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {executions.map((execution) => (
          <TableRow onClick={() =>
            router.push(`/workflows/executions/${workflowId}/${execution.id}`)
          } key={execution.id} className="border-t cursor-pointer">
            <TableCell className="px-6 py-4">{execution.id}</TableCell>
            <TableCell className="px-6 py-4">{execution.trigger}</TableCell>
            <TableCell className="px-6 py-4">{execution.status}</TableCell>
            <TableCell className="px-6 py-4">{formatDate(execution.startedAt)}</TableCell>
            <TableCell className="px-6 py-4">{DatesToDurationString(execution.completedAt, execution.startedAt)}</TableCell>
            <TableCell className="px-6 py-4">{execution.creditsConsumed}</TableCell>
            <TableCell className="px-6 py-4">{formatDistanceToNow(execution.startedAt, { addSuffix: true })}</TableCell>
          </TableRow >
        ))
        }
      </TableBody>
    </Table >
  )
}
