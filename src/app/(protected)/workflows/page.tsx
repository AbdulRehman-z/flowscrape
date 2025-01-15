import { getWorkflowsAction } from "@/actions/workflow/get-workflow-action";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import CreateWorkflowDialog from "@/components/workflow/create-workflow-dialog";
import WorkflowCard from "@/components/workflow/workflow-card";
import { AlertCircle, ArrowLeftIcon, InboxIcon, Link } from "lucide-react";
import { Suspense } from "react";


// export const revalidate = 120// 2 minutes

export default function Page() {
  return (
    <section className="flex flex-1 h-full flex-col section-padding">
      < div className="flex  justify-between" >
        <div className="flex flex-col justify-start space-y- ">
          <h1 className="text-3xl font-bold">Workflows</h1>
          <p className=" text-muted-foreground">
            Manage your workflows here.
          </p>
        </div>
        <CreateWorkflowDialog triggerText="Create Workflow" />
      </div >

      <div className="h-full p-6">
        <Suspense fallback={<UserWorkflowsSkeleton />}>
          <UserWorkflows />
        </Suspense>
      </div>
    </section >
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
  try {
    const workflows = await getWorkflowsAction()
    if (!workflows || workflows.length === 0) {
      return (
        <div className="flex flex-col items-center mt-40 justify-center gap-y-5">
          <div className="flex flex-col items-center gap-y-3">
            <div className="bg-accent rounded-full size-20 p-4 flex items-center justify-center">
              <InboxIcon size={40} />
            </div>
            <div className="flex flex-col gap-y-1 text-center">
              <p className="font-bold">
                You have no workflows
              </p>
              <p className="text-muted-foreground text-sm">
                Click on the button below to create one
              </p>
            </div>
          </div>

          <CreateWorkflowDialog triggerText="Create your first workflow" />
        </div >
      )
    }
    // console.log(workflows)
    return (
      <div className="space-y-2">
        {
          workflows.map((workflow, index) => (
            <WorkflowCard key={index} workflow={workflow} />
          ))
        }
      </div>
    )
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred'
    return (
      <div className="container mx-auto px-4 py-8">
        <Alert variant="destructive" className="mb-4">
          <div className="flex flex-col space-y-2">
            <div className="flex items-center">
              <AlertCircle className="h-5 w-5" />
              <AlertTitle className="ml-2 text-lg font-bold">{errorMessage}</AlertTitle>
            </div>
            <AlertDescription className="text-base leading-relaxed my-2">
              <p>
                The workflows you&apos;re looking for could not be found. It may have been deleted or you might not have permission to access it.
              </p>
            </AlertDescription>
          </div>
        </Alert>
        <Link href="/dashboard">
          <Button variant="secondary">
            <ArrowLeftIcon />
            Back to dashboard
          </Button>
        </Link>
      </div>
    )
  }
}
