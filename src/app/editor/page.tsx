"use client";

import { useRef } from "react";
import EditorPanel from "./_components/EditorPanel";
import Header from "./_components/Header";
import OutputPanel from "./_components/OutputPanel";
import InputPanel from "./_components/InputPanel";
import PerformancePanel from "./_components/PerformancePanel";
import AIAssistantPanel from "./_components/AIAssistantPanel";

export default function Home() {
  const stdinRef = useRef<HTMLTextAreaElement>(null);
  return (
    <div className="min-h-screen flex flex-col">
      <div className="w-full mx-auto px-2 py-2 flex-1 flex flex-col">
        <Header stdinRef={stdinRef}/>
          
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 flex-1">
          {/* <div className="flex flex-col md:max-h-[calc(100vh-200px)] xl:min-w-[64vw] md:h-full "> */}
          <div className="flex flex-col md:max-h-[calc(100vh-110px)] xl:min-w-[64vw] ">
            <EditorPanel />
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-1">
              <PerformancePanel />
              <AIAssistantPanel />
            </div>
          </div>
          <div className="flex flex-col md:max-h-[calc(100vh-100px)] md:h-full min-h-[50vh]">
            <OutputPanel />
            <InputPanel stdinRef={stdinRef} />
            {/* <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 xl:pl-72">
              <PerformancePanel />
              <AIAssistantPanel />
            </div> */}
            {/* <textarea id="stdin" className="text-white h-[60vh] bg-slate-800" ref={stdinRef} placeholder="Enter input here" /> */}
          </div>
        </div>
      </div>
    </div>
  );
}
