"use client";

import { Eye, EyeOff, Terminal } from "lucide-react";
import { useState } from "react";

interface ExpectedOutputPanelProps {
  expectedOutput: string;
}

function ExpectedOutputPanel({ expectedOutput }: ExpectedOutputPanelProps) {
  const hasContent = expectedOutput && expectedOutput.trim() !== "";
  const [isCollapsed, setIsCollapsed] = useState(true);

  const toggleCollapse = () => {
    setIsCollapsed((prev) => !prev);
  };

  return (
    // The outer container no longer dictates a fixed height.
    <div className="mt-2 relative flex flex-col xl:max-w-[34vw] xl:ml-72">
      {/* Height and flex properties are now conditional and applied here */}
      <div
        className={`relative bg-[#181825] rounded-xl p-3 ring-1 ring-gray-800/50 flex flex-col transition-all duration-300 ${
          !isCollapsed ? "flex-1 min-h-56" : ""
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2">
            <div className="flex items-center justify-center w-6 h-6 rounded-lg bg-[#1e1e2e] ring-1 ring-gray-800/50">
              <Terminal className="w-4 h-4 text-white" />
            </div>
            <span className="text-sm font-medium text-gray-300">
              Expected Output
            </span>
          </div>
          <button
            onClick={toggleCollapse}
            className="flex items-center gap-1.5 px-2.5 py-1.5 text-xs text-gray-400 hover:text-gray-300 bg-[#1e1e2e] 
            rounded-lg ring-1 ring-gray-800/50 hover:ring-gray-700/50 transition-all"
          >
            {isCollapsed ? (
              <>
                <Eye className="w-3.5 h-3.5" />
                Show
              </>
            ) : (
              <>
                <EyeOff className="w-3.5 h-3.5" />
                Hide
              </>
            )}
          </button>
        </div>

        {/* Collapsible Content */}
        {!isCollapsed && (
          <div className="relative flex-1 flex flex-col overflow-auto">
            <div
              className="relative bg-[#1e1e2e]/50 backdrop-blur-sm border border-[#313244] 
            rounded-xl p-3 h-full overflow-auto font-mono text-sm flex-1"
            >
              {hasContent ? (
                <div className="space-y-2">
                  <pre className="whitespace-pre-wrap text-gray-300">
                    {expectedOutput}
                  </pre>
                </div>
              ) : (
                <div className="h-full flex flex-col items-center justify-center text-gray-500">
                  <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-gray-800/50 ring-1 ring-gray-700/50 mb-4">
                    <Terminal className="w-6 h-6" />
                  </div>
                  <p className="text-center">No expected output available...</p>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default ExpectedOutputPanel;