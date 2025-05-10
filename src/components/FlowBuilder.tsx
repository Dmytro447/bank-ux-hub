"use client";
import React, { useCallback, useState } from "react";
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
  // nodes & edges state hooks: data type and id type
  const [nodes, setNodes, onNodesChange] = useNodesState<{ label: string }>([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState<Edge<unknown>>([]);
  const [flowTitle, setFlowTitle] = useState("");
  const createFlow = trpc.flow.create.useMutation();

  // connect handler
  const onConnect = useCallback(
    (connection: Connection) => {
      setEdges((eds) => addEdge(connection, eds));
    },
    [setEdges]
  );

  // add new node
  const addNode = () => {
    const id = `node_${Date.now()}`;
    const newNode: StepNode = {
      id,
      data: { label: `Step ${nodes.length + 1}` },
      position: { x: 250, y: 25 + nodes.length * 100 },
    };
    setNodes((nds) => nds.concat(newNode));
  };

  // save flow
  const saveFlow = () => {
    console.log("Saving flow...");
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
    <div className="h-full w-full flex flex-col">
      {/* toolbar */}
      <div className="p-4 bg-white shadow flex flex-wrap gap-2">
        <input
          type="text"
          placeholder="Flow Title"
          value={flowTitle}
          onChange={(e) => setFlowTitle(e.target.value)}
          className="border px-2 py-1 rounded flex-grow min-w-[200px]"
        />
        <button
          onClick={addNode}
          className="bg-blue-500 text-white px-4 py-1 rounded">
          Add Step
        </button>
        <button
          onClick={saveFlow}
          //   disabled={createFlow.isLoading}
          className="bg-green-500 text-white px-4 py-1 rounded disabled:opacity-50">
          {/* {createFlow.isLoading ? "Saving..." : "Save Flow"} */} Save flow
        </button>
      </div>

      {/* canvas */}
      <div className="flex-grow">
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
