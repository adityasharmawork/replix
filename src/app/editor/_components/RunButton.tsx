"use client";

import { getExecutionResult, useCodeEditorStore } from "@/store/useCodeEditorStore";
import { useUser } from "@clerk/nextjs";
import { useMutation } from "convex/react";
import { motion } from "framer-motion";
import { Loader2, Play } from "lucide-react";
import { api } from "../../../../convex/_generated/api";
import { RefObject } from "react";
import toast from "react-hot-toast";

function RunButton ({ stdinRef }: { stdinRef: RefObject<HTMLTextAreaElement> }) {
  const { user } = useUser();
  const { runCode, language, isRunning } = useCodeEditorStore();
  const savedExecution = useMutation(api.codeExecutions.saveExecution);

  const handleRun = async () => {
    const stdin = stdinRef.current?.value ?? "";
    await runCode(stdin);
    // await runCode();
    const result = getExecutionResult();

    if (result?.error) {
      // Compile/run error: inline panel handles it, but toast adds UX boost
      toast.error("Error running your code", {  
        icon: '❌',
      });
    } else {
      toast.success("Code ran successfully", {
        // icon: '✅',
        icon: '🎉',
      });
    }

    if(user && result) {
      await savedExecution({
        language,
        code: result.code,
        output: result.output,
        error: result.error || undefined,
      });
    }
  }

  return (
    <motion.button
      onClick={handleRun}
      disabled={isRunning}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className={`group relative inline-flex items-center gap-2 px-4 py-1.5 disabled:cursor-not-allowed focus:outline-none`}
    >
      {/* Clean minimal background */}
      <div className="absolute inset-0 bg-white rounded-md opacity-100 transition-opacity group-hover:opacity-90" />

      <div className="relative flex items-center gap-2">
        {isRunning ? (
          <>
          <div className="relative">
            <Loader2 className="w-4 h-4 animate-spin text-black/80" />
            <div className="absolute inset-0 blur animate-pulse" />
          </div>
          <span className="text-sm font-medium text-black">Running...</span>
          </>
        ) : (
          <>
          <div className="relative flex items-center justify-center w-4 h-4">
            <Play className="w-4 h-4 text-black fill-black/20 transition-transform group-hover:scale-110 group-hover:fill-black/30" />
          </div>
          <span className="text-sm font-medium text-black">
            Run Code
          </span>
          </>
        )}
      </div>

    </motion.button>
  );
}

export default RunButton