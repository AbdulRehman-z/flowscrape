// "use client"
import { Button } from "@/components/ui/button";
import { BaseEdge, EdgeLabelRenderer, EdgeProps, getSmoothStepPath, useReactFlow } from "@xyflow/react";

export default function DeleteableEdge(props: EdgeProps) {
  const [edgePath, labelX, labelY] = getSmoothStepPath(props)
  const { setEdges } = useReactFlow()
  function handleDelete() {
    setEdges((eds) => eds.filter((e) => e.id !== props.id))
  }

  return (
    <>
      <BaseEdge path={edgePath} style={props.style} markerEnd={props.markerEnd} />
      <EdgeLabelRenderer>
        <div style={{ position: "absolute", transform: `translate(-50%, -50%)  translate(${labelX}px, ${labelY}px)`, pointerEvents: "all" }}>
          <Button className="rounded-full flex justify-center items-center bg-secondary  hover:shadow-lg p-3" size={"icon"} variant={"outline"} onClick={handleDelete}>
            <span>X</span>
          </Button>
        </div>
      </EdgeLabelRenderer>
    </>
  )
}
