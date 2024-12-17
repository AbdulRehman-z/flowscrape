"use client"

import { createFlowNode } from "@/lib/workflow/create-flow-node";
import { TaskType } from "@/types/task-type";
import { WorkflowType } from "@/types/workflow-types";
import { Background, BackgroundVariant, Controls, ReactFlow, useEdgesState, useNodesState } from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import { Loader2Icon } from "lucide-react";
import { useTheme } from "next-themes";
import React, { useEffect } from "react";
import { BeatLoader } from "react-spinners";
import NodeComponent from "./nodes/node-component";

type FlowEditorProps = {
  workflow: WorkflowType
}

const nodeTypes = {
  FlowScrapeNode: NodeComponent
}

const fitViewOptions = {
  padding: 1,
}

export default function FlowEditor({ workflow }: FlowEditorProps) {
  const [nodes, setNodes, onNodesChange] = useNodesState([
    createFlowNode(TaskType.LAUNCH_BROWSER)
  ])
  const [edges, setEdges, onEdgesChange] = useEdgesState([])
  const [mounted, setMounted] = React.useState(false)
  const { theme, systemTheme } = useTheme()
  const currentTheme = theme === 'system' ? systemTheme : theme

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return (
      <main className="w-full h-full relative flex items-center justify-center">
        <Loader2Icon className="animate-spin" size={50} />
      </main>
    )
  }
  const flowStyle = {
    width: '100%',
    height: '100%',
  }

  return (
    <main className="w-full h-full relative">
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        style={flowStyle}
        nodeTypes={nodeTypes}
        fitViewOptions={fitViewOptions}
        fitView
        colorMode={currentTheme as "light" | "dark"}
      >
        <Controls position="top-left" fitViewOptions={fitViewOptions} />
        <Background variant={BackgroundVariant.Dots} gap={12} size={1} />
      </ReactFlow>
    </main>
  );
}
