import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import Editor from "@/components/workflow/workflow-editor";
import { getWorkflowById } from "@/data/workflow/get-workflow";
import { AlertCircle } from "lucide-react";

type WorklfowEditProps = {
  params: Promise<{ workflowId: string }>;
};

export default async function WorkflowEdit({ params }: WorklfowEditProps) {
  const { workflowId } = await params;

  const workflows = await getWorkflowById(workflowId);
  const workflow = workflows[0];

  if (!workflow) {
    return (
      <Alert variant="destructive">
        <AlertCircle className="h-5 w-5 mr-2" />
        <AlertTitle>Error</AlertTitle>
        <AlertDescription>
          Something went wrong, please try again
        </AlertDescription>
      </Alert>
    );
  }

  return (
    <div className="w-full h-full">
      <Editor workflow={workflow} />
    </div>

  );
}
