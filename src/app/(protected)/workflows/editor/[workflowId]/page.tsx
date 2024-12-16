import { getWorkflowById } from "@/data/workflow/get-workflow";

type WorklfowEditProps = {
  params: Promise<{ workflowId: string }>;
};

export default async function WorkflowEdit({ params }: WorklfowEditProps) {
  const { workflowId } = await params;

  const workflow = await getWorkflowById(workflowId);

  return (
    <div>
      <h1>Workflow Edit: {JSON.stringify(workflow)}</h1>
    </div>
  );
}
