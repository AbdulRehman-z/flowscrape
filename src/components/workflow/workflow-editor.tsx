"use client"

import { WorkflowType } from "@/types/workflow-types";
import { ReactFlowProvider } from "@xyflow/react";
import FlowEditor from "./workflow-flow-editor";

type EditorProps = {
  workflow: WorkflowType
}


export default function Editor({ workflow }: EditorProps) {
  console.log(" executed")
  return (
    <ReactFlowProvider>
      <div className="w-full h-full flex flex-col overflow-hidden">
        <section className="flex-1 overflow-hidden">
          <FlowEditor workflow={workflow} />
        </section>
      </div>
    </ReactFlowProvider>
  )
}
