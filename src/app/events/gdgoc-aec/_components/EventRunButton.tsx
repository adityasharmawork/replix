"use client";

import { getExecutionResult, useCodeEditorStore } from "@/store/useCodeEditorStore";
import { useUser } from "@clerk/nextjs";
import { useMutation } from "convex/react";
import { motion } from "framer-motion";
import { Loader2, Play } from "lucide-react";
import { api } from "../../../../../convex/_generated/api";
import toast from "react-hot-toast";


function EventRunButton ({ testInput }: { testInput: string }) {
  const { user } = useUser();
  const { runCode, language, isRunning } = useCodeEditorStore();
  const savedExecution = useMutation(api.codeExecutions.saveExecution);


  const handleRun = async () => {
    const stdin = testInput ?? "";
    await runCode(stdin);
    // await runCode();
    const result = getExecutionResult();
    // console.log(result);

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

export default EventRunButton




















































// "use client";

// import { getExecutionResult, useCodeEditorStore } from "@/store/useCodeEditorStore";
// import { useUser } from "@clerk/nextjs";
// import { useMutation } from "convex/react";
// import { motion } from "framer-motion";
// import { Loader2, Play } from "lucide-react";
// import { api } from "../../../../../convex/_generated/api";
// import { RefObject } from "react";
// import toast from "react-hot-toast";
// import { resourceLimits } from "worker_threads";
// import { useParams } from "next/navigation";
// import { useRoom } from "../hooks/useRoom";

// function EventRunButton ({ testInput }: { testInput: string }) {
//   const { user } = useUser();
//   const { runCode, language, isRunning } = useCodeEditorStore();
//   const savedExecution = useMutation(api.codeExecutions.saveExecution); // This is your Convex mutation

//   const params = useParams();
//   const roomId = params.roomId as string;

//   const { room, loading } = useRoom(roomId);

//   const email = user?.primaryEmailAddress?.emailAddress;
//   console.log(email);
//   const name = user?.fullName;
//   console.log(name);

//   // Define saveExecution as a regular function or move its logic directly
//   // It's generally better to define helper functions outside the main component render
//   // or at least before their first use.
//   // For simplicity, I'm keeping it inside handleRun for now, but hoisting it is an option.

//   const handleRun = async () => {
//     const stdin = testInput ?? "";
//     await runCode(stdin);
//     const result = getExecutionResult();
//     console.log(result);

//     if (result?.error) {
//       toast.error("Error running your code", {
//         icon: '❌',
//       });
//     } else {
//       toast.success("Code ran successfully", {
//         icon: '🎉',
//       });
//     }

//     if(user && result) {
//       // Call your Convex mutation first
//       await savedExecution({
//         language,
//         code: result.code,
//         output: result.output,
//         error: result.error || undefined,
//       });

//       // --- This is where the correction happens ---
//       // Now, call the function responsible for hitting your local API
//       let status = "Accepted";

//       if(result?.output === room?.expectedOutput) {
//         status = "Accepted";
//       } else {
//         status = "Rejected";
//       }

//       const executionData = {
//           email,
//           name,
//           room: roomId,
//           question: room?.title,
//           // Corrected executionSuccessful logic: It's true if no error, false if there's an error.
//           executionSuccessful: (result?.error === null || result?.error === undefined || result?.error === "") ? true : false,
//           error: result?.error,
//           status,
//           output: result?.output,
//           expectedOutput: room?.expectedOutput,
//           code: result?.code,
//           language,
//           date: Date.now()
//       };

//       const apiUrl = 'https://replix-mindmaze-backend.onrender.com/api/save';

//       try {
//           const response = await fetch(apiUrl, {
//               method: 'POST',
//               headers: {
//                   'Content-Type': 'application/json'
//               },
//               body: JSON.stringify(executionData)
//           });

//           if (!response.ok) {
//               const errorData = await response.json();
//               throw new Error(`HTTP error! Status: ${response.status}, Message: ${errorData.message}`);
//           }

//           const apiResult = await response.json(); // Renamed to avoid conflict with 'result' from getExecutionResult
//           console.log('Execution saved to local API successfully:', apiResult);

//       } catch (error) {
//             console.error('Failed to save execution to local API:', error);
//       }
//       // --- End of correction ---
//     }
//   }

//   return (
//     <motion.button
//       onClick={handleRun}
//       disabled={isRunning}
//       whileHover={{ scale: 1.02 }}
//       whileTap={{ scale: 0.98 }}
//       className={`group relative inline-flex items-center gap-2 px-4 py-1.5 disabled:cursor-not-allowed focus:outline-none`}
//     >
//       {/* Clean minimal background */}
//       <div className="absolute inset-0 bg-white rounded-md opacity-100 transition-opacity group-hover:opacity-90" />

//       <div className="relative flex items-center gap-2">
//         {isRunning ? (
//           <>
//           <div className="relative">
//             <Loader2 className="w-4 h-4 animate-spin text-black/80" />
//             <div className="absolute inset-0 blur animate-pulse" />
//           </div>
//           <span className="text-sm font-medium text-black">Running...</span>
//           </>
//         ) : (
//           <>
//           <div className="relative flex items-center justify-center w-4 h-4">
//             <Play className="w-4 h-4 text-black fill-black/20 transition-transform group-hover:scale-110 group-hover:fill-black/30" />
//           </div>
//           <span className="text-sm font-medium text-black">
//             Run Code
//           </span>
//           </>
//         )}
//       </div>

//     </motion.button>
//   );
// }

// export default EventRunButton;