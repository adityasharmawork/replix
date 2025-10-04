"use client";

import { useCodeEditorStore } from "@/store/useCodeEditorStore";
import { AlertTriangle, CheckCircle, Clock, Copy, Cross, Crosshair, CrosshairIcon, CrossIcon, Terminal } from "lucide-react";
import { SignedIn, SignedOut, useUser } from "@clerk/nextjs";
import { useState } from "react";
import RunningCodeSkeleton from "@/app/editor/_components/RunningCodeSkeleton";
import { useRoom } from "../hooks/useRoom";
import { useParams } from "next/navigation";

interface ExpectedOutputPanelProps {
    expectedOutput: string;
}

function EventOutputPanel ({ expectedOutput }: ExpectedOutputPanelProps) {

    // const params = useParams();
    // const roomId = params.roomId as string;
    
    // const { room, loading } = useRoom(roomId);
  
    //   const { user, isSignedIn } = useUser();
    //   const email = user?.primaryEmailAddress?.emailAddress;
    //   console.log(email);
    //   const name = user?.fullName;
    //   console.log(name);


  const { output, error, isRunning } = useCodeEditorStore();
  const [isCopied, setIsCopied] = useState(false);

  const hasContent = error || output;

  const handleCopy = async () => {
    if(!hasContent) return;
    await navigator.clipboard.writeText(error || output);
    setIsCopied(true);

    setTimeout(() => {
      setIsCopied(false);
    }, 2000);
  }

  // async function saveExecution() {
  //   const language = localStorage.getItem('editor-language');
  //   const code = localStorage.getItem(`editor-code-${language}`);
  //   let status = "Accepted";

  //   if(output === room?.expectedOutput) {
  //     status = "Accepted";
  //   } else {
  //     status = "Rejected";
  //   }

  //     const executionData = {
  //       email,
  //       name,
  //       room: roomId,
  //       question: room?.title,
  //       executionSuccessful: true,
  //       error,
  //       status,
  //       output,
  //       expectedOutput: room?.expectedOutput,
  //       code,
  //       language,
  //       date: Date.now()
  //   };

  //   const apiUrl = 'https://replix-mindmaze-backend.onrender.com/api/save'; 

  //   try {
  //       const response = await fetch(apiUrl, {
  //           method: 'POST',
  //           headers: {
  //               'Content-Type': 'application/json' 
  //           },
  //           body: JSON.stringify(executionData) 
  //       });

  //       if (!response.ok) {
  //           const errorData = await response.json();
  //           throw new Error(`HTTP error! Status: ${response.status}, Message: ${errorData.message}`);
  //       }

  //       const result = await response.json();
  //       console.log('Execution saved successfully:', result);
  //       return result;

  //   } catch (error) {
  //         console.error('Failed to save execution:', error);
  //   }
  // }

  // saveExecution();

  return (
    <div className="relative h-full min-h-56 flex flex-col xl:max-w-[34vw] xl:ml-72">
      <div className="relative bg-[#181825] rounded-xl p-3 ring-1 ring-gray-800/50 flex-1 flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2">
            <div className="flex items-center justify-center w-6 h-6 rounded-lg bg-[#1e1e2e] ring-1 ring-gray-800/50">
              {/* <Terminal className="w-4 h-4 text-primary-400" /> */}
              <Terminal className="w-4 h-4 text-white" />
            </div>
            <span className="text-sm font-medium text-gray-300">Output</span>
          </div>

          {hasContent && (
            <button
              onClick={handleCopy}
              className="flex items-center gap-1.5 px-2.5 py-1.5 text-xs text-gray-400 hover:text-gray-300 bg-[#1e1e2e] 
              rounded-lg ring-1 ring-gray-800/50 hover:ring-gray-700/50 transition-all"
            >
              {isCopied ? (
                <>
                  <CheckCircle className="w-3.5 h-3.5" />
                  Copied!
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5" />
                  Copy
                </>
              )}
            </button>
          )}
        </div>

        {/* Output Area */}
        <div className="relative flex-1 flex flex-col">
          <div
            className="relative bg-[#1e1e2e]/50 backdrop-blur-sm border border-[#313244] 
          rounded-xl p-3 h-full overflow-auto font-mono text-sm flex-1"
          >
            {isRunning ? (
              <RunningCodeSkeleton />
            ) : error ? (
              <div className="flex items-start gap-3 text-red-400">
                <AlertTriangle className="w-5 h-5 flex-shrink-0 mt-1" />
                <div className="space-y-1">
                  <div className="font-medium">Execution Error</div>
                  <pre className="whitespace-pre-wrap text-red-400/80">{error}</pre>
                </div>
              </div>
            ) : output ? (
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-emerald-400 mb-3">
                  <CheckCircle className="w-5 h-5" />
                  <span className="font-medium">Execution Successful</span>
                  </div>
                  {(output === expectedOutput) ? (
                    <div>
                    <div className="flex items-center gap-2 text-emerald-400 mb-3">
                        <CheckCircle className="w-5 h-5" />
                        <span className="font-medium">Accepted</span>
                    </div>
                    <br />
                    </div>
                  ) : (
                    <div>
                    <div className="flex items-center gap-2 text-red-400 mb-3">
                        <CrosshairIcon className="w-5 h-5" />
                        <span className="font-medium">Wrong Answer</span>
                    </div>
                    <br />
                    </div>
                  ) }
                {/* </div> */}
                <pre className="whitespace-pre-wrap text-gray-300">{output}</pre>
              </div>
            ) : (
              <div className="h-full flex flex-col items-center justify-center text-gray-500">
                <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-gray-800/50 ring-1 ring-gray-700/50 mb-4">
                  <Clock className="w-6 h-6" />
                </div>
                <SignedIn>
                  <p className="text-center">Run your code to see the output here...</p>
                </SignedIn>
                <SignedOut>
                  <p className="text-center">Sign in to run your code...</p>
                </SignedOut>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default EventOutputPanel