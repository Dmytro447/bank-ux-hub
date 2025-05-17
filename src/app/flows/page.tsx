// app/flows/page.tsx
"use client";

import React from "react";
import { trpc } from "@/utils/trpc";

export default function FlowsPage() {
  const {
    data: flows,
    isLoading,
    isError,
    error,
  } = trpc.flow.getAll.useQuery();

  if (isLoading) return <p>Loading flows...</p>;
  if (isError) return <p>Error: {error.message}</p>;

  return (
    <main className="p-6">
      <h1 className="text-2xl font-bold mb-4">All Flows</h1>
      {flows?.length === 0 ? (
        <p>No flows available.</p>
      ) : (
        <div className="space-y-6">
          {flows?.map((flow) => (
            <section key={flow.id} className="border rounded-lg p-4 shadow-sm">
              <h2 className="text-xl font-semibold">{flow.title}</h2>
              <p className="text-sm text-gray-500">
                Created at: {new Date(flow.createdAt).toLocaleString()}
              </p>
              <ol className="list-decimal list-inside mt-3 space-y-1">
                {flow.steps.map((step) => (
                  <li key={step.id}>
                    <p className="font-medium">{step.title}</p>
                    {step.notes && (
                      <p className="text-gray-600">{step.notes}</p>
                    )}
                  </li>
                ))}
              </ol>
            </section>
          ))}
        </div>
      )}
    </main>
  );
}
