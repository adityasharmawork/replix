"use client";

import { useCodeEditorStore } from "@/store/useCodeEditorStore";
import { Clock, Gauge } from "lucide-react";

function PerformancePanel() {
  const runTimeMs = useCodeEditorStore(s => s.runTimeMs);
  
  return (
    <div className="relative flex flex-col mt-1 h-full w-full">
      {/* MODIFIED: Reduced padding (p-2), added flex items-center justify-between, and set fixed height (h-12) */}
      <div className="relative bg-[#181825] rounded-lg p-2 ring-1 ring-gray-800/50 flex items-center justify-between  xl:h-16">
        {/* Left Part: Panel Icon + Name */}
        <div className="xl:flex xl:items-center gap-1.5"> {/* Adjusted gap */}
          <div className="ml-4 flex items-center justify-center w-8 h-8 rounded bg-[#1e1e2e] ring-1 ring-gray-800/50">
            {/* <Gauge className="w-6 h-6 xl:w-8 xl:h-8 text-primary-400" /> Smaller icon */}
            <Gauge className="w-6 h-6 xl:w-8 xl:h-8 text-white" /> {/* Smaller icon */}
          </div>
          <span className="text-xs xl:text-sm font-medium text-gray-300 hidden sm:inline">Performance</span>
          <span className="text-xs xl:text-sm font-medium text-gray-300 sm:hidden">Performance</span> {/* Shorter for small screens */}
        </div>

        {/* Right Part: Metrics or Placeholder */}
        {runTimeMs !== null ? (
          <div className="flex items-center gap-1 text-sm xl:text-lg">
            <Clock className="w-2 h-2 xl:w-6 xl:h-6 text-blue-400" />
            <span className="text-blue-400 ml-1" >Execution Wall Time - </span>
            <span className="ml-1 mr-5 font-semibold text-gray-300">{runTimeMs.toFixed(1)} ms</span>
          </div>
        ) : (
          <div className="flex items-center gap-1 text-md text-gray-500">
            <Clock className="w-6 h-6" />
            <span className="ml-2 hidden min-[380px]:inline">Run to see metrics...</span> {/* Responsive placeholder */}
            <span className="ml-1 min-[380px]:hidden inline">No metrics</span>
          </div>
        )}
      </div>
    </div>
  );
}

export default PerformancePanel;