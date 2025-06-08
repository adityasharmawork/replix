// InputPanel.tsx
"use client";
import { RefObject } from "react";
import { Terminal } from "lucide-react";

interface InputPanelProps {
  stdinRef: RefObject<HTMLTextAreaElement>;
}

export default function InputPanel({ stdinRef }: InputPanelProps) {
  return (
    <div className="relative h-full min-h-56 flex flex-col mt-2 xl:max-w-[34vw] xl:ml-72">
      <div className="relative bg-[#181825] rounded-xl p-3 ring-1 ring-gray-800/50 flex-1 flex flex-col">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2">
            <div className="flex items-center justify-center w-6 h-6 rounded-lg bg-[#1e1e2e] ring-1 ring-gray-800/50">
              {/* <Terminal className="w-4 h-4 text-primary-400" /> */}
              <Terminal className="w-4 h-4 text-white" />
            </div>
            <span className="text-sm font-medium text-gray-300">Standard Input</span>
          </div>
          <button
            onClick={() => { if (stdinRef.current) stdinRef.current.value = "" }}
            className="text-xs text-gray-400 hover:text-gray-300"
            aria-label="Clear input"
          >
            Clear
          </button>
        </div>
        <textarea
          ref={stdinRef}
          placeholder="Enter your program’s input here…"
          className={`
            flex-1
            bg-[#1e1e2e]/50
            backdrop-blur-sm
            border border-[#313244]
            rounded-xl
            p-3
            font-mono text-sm text-gray-200
            placeholder-gray-500
            resize-none
            w-full
            h-full
            overflow-auto
            focus:outline-none focus:ring-2 focus:ring-primary-500
          `}
        />
      </div>
    </div>
  );
}
