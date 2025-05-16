"use client";

import { useCodeEditorStore } from "@/store/useCodeEditorStore";
import { Clock, Gauge } from "lucide-react";

function PerformancePanel() {
  const runTimeMs = useCodeEditorStore(s => s.runTimeMs);
  
  return (
    <div className="relative flex min-h-56 flex-col mt-2 w-full">
    {/* // <div className="relative flex flex-col mt-2 w-auto md:max-w-lg h-auto ml-56"> */}
      <div className="relative bg-[#181825] rounded-xl p-3 ring-1 ring-gray-800/50 flex-1 flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2">
            <div className="flex items-center justify-center w-6 h-6 rounded-lg bg-[#1e1e2e] ring-1 ring-gray-800/50">
              <Gauge className="w-4 h-4 text-primary-400" />
            </div>
            <span className="text-sm font-medium text-gray-300">Performance</span>
          </div>
        </div>

        {/* Performance Metrics Area */}
        <div className="relative flex-1 flex flex-col">
          <div
            className="relative bg-[#1e1e2e]/50 backdrop-blur-sm border border-[#313244] 
          rounded-xl p-3 overflow-auto font-mono text-sm flex-1"
          >
            {runTimeMs !== null ? (
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-blue-400 mb-3">
                  <Clock className="w-5 h-5" />
                  <span className="font-medium">Execution Wall Time</span>
                </div>
                <div className="flex items-center">
                  <span className="text-lg font-semibold text-gray-300">{runTimeMs.toFixed(2)} ms</span>
                </div>
              </div>
            ) : (
              <div className="h-full flex flex-col items-center justify-center text-gray-500">
                <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-gray-800/50 ring-1 ring-gray-700/50 mb-4">
                  <Clock className="w-6 h-6" />
                </div>
                <p className="text-center">Run your code to see performance metrics...</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default PerformancePanel;