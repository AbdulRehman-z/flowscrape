import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import Editor from "@/components/workflow/workflow-editor";
import { getWorkflowById } from "@/data/workflow/get-workflow";
import { AlertCircle, ArrowLeftIcon } from "lucide-react";
import Link from "next/link";
type WorklfowEditProps = {
  params: Promise<{ workflowId: string }>;
};

export default async function WorkflowEdit({ params }: WorklfowEditProps) {
  const { workflowId } = await params;

  const workflow = await getWorkflowById(workflowId);

  if (!workflow) {
    return (
      <div className="container mx-auto px-4 py-8">
        <Alert variant="destructive" className="mb-4">
          <div className="flex flex-col space-y-2">
            <div className="flex items-center">
              <AlertCircle className="h-5 w-5" />
              <AlertTitle className="ml-2 text-lg font-bold">Workflow Not Found</AlertTitle>
            </div>
            <AlertDescription className="text-base leading-relaxed my-2">
              <p>
                The workflow you&apos;re looking for could not be found. It may have been deleted or you might not have permission to access it.
              </p>
            </AlertDescription>
          </div>
        </Alert>
        <Link href="/workflows">
          <Button variant="secondary">
            <ArrowLeftIcon />
            Back to Workflows
          </Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="w-full h-full">
      <Editor workflow={workflow} />
    </div>

  );
}
