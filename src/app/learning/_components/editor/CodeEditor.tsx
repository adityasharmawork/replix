import React from "react";

export default function CodeEditor({ value, onChange }: any) {
  return (
    <textarea value={value} onChange={(e) => onChange(e.target.value)} className="w-full h-44 bg-black/60 p-2 rounded-md text-xs font-mono text-white" />
  );
}