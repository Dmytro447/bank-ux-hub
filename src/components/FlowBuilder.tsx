// "use client";
// import React, { useCallback, useState } from "react";
// import ReactFlow, {
//   ReactFlowProvider,
//   useNodesState,
//   useEdgesState,
//   addEdge,
//   Controls,
//   Background,
//   MiniMap,
//   Connection,
//   Node,
//   Edge,
// } from "reactflow";
// import "reactflow/dist/style.css";
// import { trpc } from "@/utils/trpc";

// // Define Node type with label
// export type StepNode = Node<{ label: string }, string>;

// export default function FlowBuilder() {
//   // nodes & edges state hooks: data type and id type
//   const [nodes, setNodes, onNodesChange] = useNodesState<{ label: string }>([]);
//   const [edges, setEdges, onEdgesChange] = useEdgesState<Edge<unknown>>([]);
//   const [flowTitle, setFlowTitle] = useState("");
//   const createFlow = trpc.flow.create.useMutation();

//   // connect handler
//   const onConnect = useCallback(
//     (connection: Connection) => {
//       setEdges((eds) => addEdge(connection, eds));
//     },
//     [setEdges]
//   );

//   // add new node
//   const addNode = () => {
//     const id = `node_${Date.now()}`;
//     const newNode: StepNode = {
//       id,
//       data: { label: `Step ${nodes.length + 1}` },
//       position: { x: 250, y: 25 + nodes.length * 100 },
//     };
//     setNodes((nds) => nds.concat(newNode));
//   };

//   // save flow
//   const saveFlow = () => {
//     console.log("Saving flow...");
//     const steps = nodes.map((node, index) => ({
//       order: index,
//       title: node.data.label,
//       notes: "",
//       image: undefined,
//     }));

//     createFlow.mutate(
//       { title: flowTitle, steps },
//       { onSuccess: () => alert("Flow saved!") }
//     );
//   };

//   return (
//     <div className="h-full w-full flex flex-col">
//       {/* toolbar */}
//       <div className="p-4 bg-white shadow flex flex-wrap gap-2">
//         <input
//           type="text"
//           placeholder="Flow Title"
//           value={flowTitle}
//           onChange={(e) => setFlowTitle(e.target.value)}
//           className="border px-2 py-1 rounded flex-grow min-w-[200px]"
//         />
//         <button
//           onClick={addNode}
//           className="bg-blue-500 text-white px-4 py-1 rounded">
//           Add Step
//         </button>
//         <button
//           onClick={saveFlow}
//           //   disabled={createFlow.isLoading}
//           className="bg-green-500 text-white px-4 py-1 rounded disabled:opacity-50">
//           {/* {createFlow.isLoading ? "Saving..." : "Save Flow"} */} Save flow
//         </button>
//       </div>

//       {/* canvas */}
//       <div className="flex-grow">
//         <ReactFlowProvider>
//           <ReactFlow
//             nodes={nodes}
//             edges={edges}
//             onNodesChange={onNodesChange}
//             onEdgesChange={onEdgesChange}
//             onConnect={onConnect}
//             fitView>
//             <MiniMap />
//             <Controls />
//             <Background gap={12} size={1} />
//           </ReactFlow>
//         </ReactFlowProvider>
//       </div>
//     </div>
//   );
// }

"use client";

import React, { useCallback, useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import ReactFlow, {
  ReactFlowProvider,
  useNodesState,
  useEdgesState,
  addEdge,
  Controls,
  Background,
  MiniMap,
  Connection,
  Node,
  Edge,
} from "reactflow";
import "reactflow/dist/style.css";
import { trpc } from "@/utils/trpc";

// Define Node type with label
export type StepNode = Node<{ label: string }, string>;

export default function FlowBuilder() {
  const [nodes, setNodes, onNodesChange] = useNodesState<{ label: string }>([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState<Edge<unknown>>([]);
  const [flowTitle, setFlowTitle] = useState("");
  const createFlow = trpc.flow.create.useMutation();

  const onConnect = useCallback(
    (connection: Connection) => {
      setEdges((eds) => addEdge(connection, eds));
    },
    [setEdges]
  );

  const addNode = () => {
    const id = `node_${Date.now()}`;
    const newNode: StepNode = {
      id,
      data: { label: `Step ${nodes.length + 1}` },
      position: { x: 250, y: 25 + nodes.length * 100 },
    };
    setNodes((nds) => nds.concat(newNode));
  };

  const saveFlow = () => {
    const steps = nodes.map((node, index) => ({
      order: index,
      title: node.data.label,
      notes: "",
      image: undefined,
    }));

    createFlow.mutate(
      { title: flowTitle, steps },
      { onSuccess: () => alert("Flow saved!") }
    );
  };

  return (
    <div className="h-full w-full flex flex-col gap-4">
      <Card>
        <CardHeader>
          <CardTitle>Створення UX Flow</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-wrap gap-4 items-end">
          <div className="flex flex-col space-y-1">
            <Label htmlFor="flow-title">Назва флоу</Label>
            <Input
              id="flow-title"
              placeholder="Наприклад: Onboarding flow"
              value={flowTitle}
              onChange={(e) => setFlowTitle(e.target.value)}
              className="min-w-[200px]"
            />
          </div>
          <Button onClick={addNode} variant="default">
            ➕ Додати крок
          </Button>
          <Button onClick={saveFlow}>💾 Зберегти флоу</Button>
        </CardContent>
      </Card>

      <div className="flex-grow h-full">
        <ReactFlowProvider>
          <ReactFlow
            nodes={nodes}
            edges={edges}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            onConnect={onConnect}
            fitView>
            <MiniMap />
            <Controls />
            <Background gap={12} size={1} />
          </ReactFlow>
        </ReactFlowProvider>
      </div>
    </div>
  );
}
