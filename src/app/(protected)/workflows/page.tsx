import { getUserWorkflowsAction } from "@/actions/workflow/get-workflow-action";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Skeleton } from "@/components/ui/skeleton";
import { AlertCircle, InboxIcon } from "lucide-react";
import { Suspense } from "react";

export default function Page() {
  return (
    <div className="flex flex-1 h-full flex-col">
      <div className="flex flex-col justify-start space-y-2 ">
        <h1 className="text-3xl font-bold">Workflows</h1>
        <p className=" text-muted-foreground">
          Manage your workflows here.
        </p>
      </div>

      <div className="h-full p-6">
        <Suspense fallback={<UserWorkflowsSkeleton />}>
          <UserWorkflows />
        </Suspense>
      </div>

    </div>
  )
}


function UserWorkflowsSkeleton() {
  return (
    <div className="space-y-2">
      {
        [1, 2, 3, 4].map((item, index) => (
          <Skeleton key={index} className="h-32 w-full" />
        ))
      }
    </div>
  )
}


async function UserWorkflows() {
  const workflows = await getUserWorkflowsAction()
  if (!workflows) {
    return (
      <Alert variant="destructive">
        <AlertCircle className="h-5 w-5 mr-2" />
        <AlertTitle>Error</AlertTitle>
        <AlertDescription>
          Something went wrong, please try again
        </AlertDescription>
      </Alert>
    )
  }

  if (workflows.length === 0) {
    return (
      <div className="flex flex-col items-center mt-20 justify-center space-y-2">
        <div className="bg-accent rounded-full size-20 p-4 flex items-center justify-center">
          <InboxIcon size={40} />
        </div>
        <div className="flex flex-col gap-1 text-center">
          <p className="font-bold">
            You have no workflows
          </p>
          <p className="text-muted-foreground text-sm">
            Click on the button below to create one
          </p>
        </div>
      </div >
    )
  }

  return (
    <div className="space-y-2">
      {
        workflows.map((workflow, index) => (
          <WorkflowItem key={index} workflow={workflow} />
        ))
      }
    </div>
  )
}

function WorkflowItem({ workflow }: { workflow: any }) {
  return (
    <div className="flex flex-col space-y-2">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold">{workflow.name}</h2>
      </div>
      <div className="text-muted-foreground">
        {workflow.description}
      </div>
    </div>
  );

}
