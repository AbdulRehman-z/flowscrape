"use client"

import { createFlowNode } from "@/lib/workflow/create-flow-node";
import { AppNodeType } from "@/types/app-node-types";
import { TaskTypeEnum } from "@/types/task-type";
import { WorkflowType } from "@/types/workflow-types";
import { addEdge, Background, BackgroundVariant, Connection, Controls, Edge, getOutgoers, ReactFlow, useEdgesState, useNodesState, useReactFlow } from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import { Loader2Icon, Target } from "lucide-react";
import { useTheme } from "next-themes";
import React, { useCallback, useEffect } from "react";
import DeleteableEdge from "./edges/deleteable-edge";
import NodeComponent from "./nodes/node-component";
import { TaskREgistery } from "@/lib/workflow/task/task-registery";

const nodeTypes = {
  FlowScrapeNode: NodeComponent
}

const edgeTypes = {
  default: DeleteableEdge
}

const fitViewOptions = {
  padding: 1
}

type FlowEditorProps = {
  workflow: WorkflowType
}

export default function FlowEditor({ workflow }: FlowEditorProps) {
  const [nodes, setNodes, onNodesChange] = useNodesState<AppNodeType>([])
  const [edges, setEdges, onEdgesChange] = useEdgesState<Edge>([])
  const [mounted, setMounted] = React.useState(false)
  const { setViewport, screenToFlowPosition, updateNodeData } = useReactFlow();
  const { theme, systemTheme } = useTheme()
  const currentTheme = theme === 'system' ? systemTheme : theme

  useEffect(() => {
    setMounted(true)

    const flow = JSON.parse(workflow.defination)
    if (!flow) return
    setNodes(flow.nodes || [])
    setEdges(flow.edges || [])
    if (!flow.viewport) return
    const { x = 0, y = 0, zoom = 1 } = flow.viewport
    setViewport({ x, y, zoom })
  }, [workflow, setEdges, setNodes, setViewport])

  const handleDragOver = useCallback((event: React.DragEvent) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = 'move';
  }, [])

  const handleDrop = useCallback((event: React.DragEvent) => {
    event.preventDefault()

    const position = screenToFlowPosition({
      x: event.clientX,
      y: event.clientY
    })
    const taskType = event.dataTransfer.getData("application/reactflow")
    if (typeof taskType === undefined) return
    const node = createFlowNode(taskType as TaskTypeEnum, position)
    setNodes((nds) => nds.concat(node))
  }, [setNodes, screenToFlowPosition])


  const onConnect = useCallback((connection: Connection) => {
    setEdges((eds) => addEdge({ ...connection, animated: true }, eds))
    if (!connection.targetHandle) return
    const node = nodes.find((node) => node.id === connection.target)
    if (!node) return
    const nodeInputs = node.data.inputs

    delete nodeInputs[connection.targetHandle]
    updateNodeData(node.id, {
      inputs: {
        ...nodeInputs,
        [connection.targetHandle]: ""
      }
    })
  }, [setEdges, nodes, updateNodeData])


  const isValidConnection = useCallback((connection: Connection | Edge) => {
    // check for connection between two eddes on the same node
    if (connection.source === connection.target) return false

    // check for connection between nodes of the same taskParam type
    const sourceNode = nodes.find((node) => node.id === connection.source)
    const targetNode = nodes.find((node) => node.id === connection.target)
    if (!sourceNode || !targetNode) {
      console.error("sourceNode or targetNode is undefined")
      return false
    }

    const sourceTask = TaskREgistery[sourceNode.data.type]
    const targetTask = TaskREgistery[targetNode.data.type]

    const output = sourceTask.outputs.find((output) => output.name === connection.sourceHandle)
    if (!output) {
      console.error("output is undefined")
      return false
    }

    const input = targetTask.inputs.find((input) => input.name === connection.targetHandle)
    if (!input) {
      console.error("input is undefined")
      return false
    }

    // check if the input and output types are the same
    if (input.type !== output.type) {
      console.error("input and output types are not the same")
      return false
    }

    const hasCycle = (node: AppNodeType, visited = new Set()) => {
      if (visited.has(node.id)) return true;
      visited.add(node.id);

      for (const outgoer of getOutgoers(node, nodes, edges)) {
        if (outgoer.id === connection.source) return true;
        if (hasCycle(outgoer, visited)) return true;
      }
    }

    const detectedCycle = hasCycle(targetNode)
    return !detectedCycle

  }, [nodes, edges])

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
        edgeTypes={edgeTypes}
        onConnect={onConnect}
        isValidConnection={isValidConnection}
        fitViewOptions={fitViewOptions}
        fitView
        onDragOver={handleDragOver}
        onDrop={handleDrop}
        colorMode={currentTheme as "light" | "dark"}
      >
        <Controls position="top-left" fitViewOptions={fitViewOptions} />
        <Background variant={BackgroundVariant.Dots} gap={12} size={1} />
      </ReactFlow>
    </main>
  );
}
