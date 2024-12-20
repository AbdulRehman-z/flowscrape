"use client"

import { WorkflowType } from "@/types/workflow-types";
import { ReactFlowProvider } from "@xyflow/react";
import FlowEditor from "./workflow-flow-editor";
import Topbar from "./topbar/topbar";
import TaskMenu from "./task-menu";

type EditorProps = {
  workflow: WorkflowType
}

export default function Editor({ workflow }: EditorProps) {
  return (
    <ReactFlowProvider>
      <div className="grid h-screen grid-cols-[auto_1fr] grid-rows-[auto_1fr]">
        <div className="row-span-2">
          <TaskMenu />
        </div>

        <div className="col-start-2">
          <Topbar
            workflowId={workflow.id}
            title="Workflow Editor"
            subtitle={workflow.name}
          />
        </div>

        <div className="col-start-2 overflow-hidden">
          <FlowEditor workflow={workflow} />
        </div>
      </div>
    </ReactFlowProvider>
  )
}
