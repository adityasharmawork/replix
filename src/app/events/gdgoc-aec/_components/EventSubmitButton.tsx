"use client";

import { getExecutionResult, useCodeEditorStore } from "@/store/useCodeEditorStore";
import { useUser } from "@clerk/nextjs";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, Gauge } from "lucide-react";
import { useParams } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";
import { useRoom } from "../hooks/useRoom";
import { useMutation } from "convex/react";
import { api } from "../../../../../convex/_generated/api";
import { saveDetailedExecution } from "@/lib/eventExecutionUtils";
import { StardustReviewModal } from "./StardustReviewModal";
import { FeedbackModal } from "./FeedbackModal";


interface SubmissionSuccessModalProps {
  isOpen: boolean;
  onClose: () => void;
}

function SubmissionSuccessModal({ isOpen, onClose }: SubmissionSuccessModalProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm"
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside the modal
            className="relative mt-32 flex flex-col items-center gap-6 rounded-lg bg-white p-8 text-center shadow-2xl"
          >
            <h2 className="text-2xl font-bold text-gray-800">
              Submission Saved! 🎉
            </h2>
            <p className="text-gray-600">
              Your solution has been successfully recorded.
            </p>
            <button
              onClick={onClose}
              className="mt-4 inline-flex items-center gap-2 rounded-md bg-gray-800 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
            >
              <ArrowLeft className="h-4 w-4" />
              Missed something? Back to Code
            </button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function EventSubmitButton({ testInput }: { testInput: string }) {
  const { user } = useUser();
  const { runCode, language, isRunning } = useCodeEditorStore();
  const params = useParams();
  const roomId = params.roomId as string;
  const { room } = useRoom(roomId);
  
  // State to manage modal visibility
  const [isModalOpen, setIsModalOpen] = useState(false);

  // const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);

  const [isFeedbackModalOpen, setIsFeedbackModalOpen] = useState(false);

  const savedExecution = useMutation(api.codeExecutions.saveExecution);

  const handleRun = async () => {
    const stdin = testInput ?? "";
    await runCode(stdin);
    const result = getExecutionResult();

    if (result?.error) {
      toast.error("Error running your code", { icon: "❌" });
    } else {
      toast.success("Code ran successfully", { icon: "🎉" });
    }

    if (user && result && room) {
      await savedExecution({
        language,
        code: result.code,
        output: result.output,
        error: result.error || undefined,
      });
      console.log("Basic execution saved to Convex.");

      await saveDetailedExecution({ result, room, user, roomId, language });

      toast.success("Submitted Successfully", { icon: "✅" });
      
      // Open the modal after everything is done
      // setIsModalOpen(true);
      // setIsReviewModalOpen(true);

      setIsFeedbackModalOpen(true);
    }
  };

  return (
    <>
      <motion.button
        onClick={handleRun}
        // disabled={isRunning}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        className={`group relative inline-flex items-center gap-2 px-4 py-1.5 disabled:cursor-not-allowed focus:outline-none`}
      >
        <div className="absolute inset-0 rounded-md bg-white opacity-100 transition-opacity group-hover:opacity-90" />
        <div className="relative flex items-center gap-2">
          <div className="relative flex h-4 w-4 items-center justify-center">
            <Gauge className="h-4 w-4 text-black fill-black/20 transition-transform group-hover:scale-110 group-hover:fill-black/30" />
          </div>
          <span className="text-sm font-medium text-black">
            {/* {isRunning ? "SUBMIT" : "SUBMIT"} */}
            SUBMIT
          </span>
        </div>
      </motion.button>
      
      {/* Render the modal */}
      {/* <SubmissionSuccessModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      /> */}

      {/* <StardustReviewModal
        isOpen={isReviewModalOpen}
        onClose={() => setIsReviewModalOpen(false)}
      /> */}

      <FeedbackModal
        isOpen={isFeedbackModalOpen}
        onClose={() => setIsFeedbackModalOpen(false)}
      />

    </>
  );
}

export default EventSubmitButton;













// "use client";

// import { getExecutionResult, useCodeEditorStore } from "@/store/useCodeEditorStore";
// import { useUser } from "@clerk/nextjs";
// import { motion } from "framer-motion";
// import { Gauge } from "lucide-react";
// import { useParams } from "next/navigation";
// import toast from "react-hot-toast";
// import { useRoom } from "../hooks/useRoom";

// // Convex Imports
// import { useMutation } from "convex/react";
// import { api } from "../../../../../convex/_generated/api";

// // Import your new helper functions
// import { saveDetailedExecution } from "@/lib/eventExecutionUtils";


// function EventSubmitButton ({ testInput }: { testInput: string }) {
//   const { user } = useUser();
//   const { runCode, language, isRunning } = useCodeEditorStore();
//   const params = useParams();
//   const roomId = params.roomId as string;
//   const { room } = useRoom(roomId);
  
//   // 1. Convex mutation hook is kept as requested
//   const savedExecution = useMutation(api.codeExecutions.saveExecution);
  
//   const handleRun = async () => {
//     const stdin = testInput ?? "";
//     await runCode(stdin);
//     const result = getExecutionResult();

//     if (result?.error) {
//       toast.error("Error running your code", { icon: '❌' });
//     } else {
//       toast.success("Code ran successfully", { icon: '🎉' });
//     }

//     if (user && result && room) {
//       // 2. First, save the basic execution result to Convex
//       await savedExecution({
//         language,
//         code: result.code,
//         output: result.output,
//         error: result.error || undefined,
//       });
//       console.log("Basic execution saved to Convex.");

//       // 3. Second, save the detailed result (with test case analysis) to your local API
//       await saveDetailedExecution({ result, room, user, roomId, language });
      
//       toast.success("Submitted Successfully", { icon: '✅' });
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
//       <div className="absolute inset-0 bg-white rounded-md opacity-100 transition-opacity group-hover:opacity-90" />
//       <div className="relative flex items-center gap-2">
//         <div className="relative flex items-center justify-center w-4 h-4">
//           <Gauge className="w-4 h-4 text-black fill-black/20 transition-transform group-hover:scale-110 group-hover:fill-black/30" />
//         </div>
//         <span className="text-sm font-medium text-black">
//           {isRunning ? "SUBMITTING..." : "SUBMIT"}
//         </span>
//       </div>
//     </motion.button>
//   );
// }

// export default EventSubmitButton;





















// "use client";

// import { getExecutionResult, useCodeEditorStore } from "@/store/useCodeEditorStore";
// import { useUser } from "@clerk/nextjs";
// import { useMutation } from "convex/react";
// import { motion } from "framer-motion";
// import { Gauge, Loader2, Play, Sparkle } from "lucide-react";
// import { api } from "../../../../../convex/_generated/api";
// import { RefObject } from "react";
// import toast from "react-hot-toast";
// import { resourceLimits } from "worker_threads";
// import { useParams } from "next/navigation";
// import { useRoom } from "../hooks/useRoom";

// function EventSubmitButton ({ testInput }: { testInput: string }) {
//   const { user } = useUser();
//   const { runCode, language, isRunning } = useCodeEditorStore();
//   const savedExecution = useMutation(api.codeExecutions.saveExecution);

//     const params = useParams();
//     const roomId = params.roomId as string;
    
//     const { room, loading } = useRoom(roomId);
  
//     const email = user?.primaryEmailAddress?.emailAddress;
//     console.log(email);
//     const name = user?.fullName;
//     console.log(name);


//   const handleRun = async () => {
//     const stdin = testInput ?? "";
//     await runCode(stdin);
//     // await runCode();
//     const result = getExecutionResult();
//     console.log(result);

//     if (result?.error) {
//       // Compile/run error: inline panel handles it, but toast adds UX boost
//       toast.error("Error running your code", {  
//         icon: '❌',
//       });
//     } else {
//       toast.success("Code ran successfully", {
//         // icon: '✅',
//         icon: '🎉',
//       });
//     }

//     if(user && result) {
//       await savedExecution({
//         language,
//         code: result.code,
//         output: result.output,
//         error: result.error || undefined,
//       });
      
//       await saveExecution(result);
//       console.log("after calling saveExecution()");
//       toast.success("Submitted Successfully", {
//         // icon: '✅',
//         icon: '✅',
//       });
//     }
//   }




// async function getTestCasesPassedCount(problemData: any) {
//     // Destructure the new testCasesCount property
//     const { title, description, inputFormat, outputFormat, testInput, actualOutput, expectedOutput, testCasesCount } = problemData;

//     // IMPORTANT: Replace with your actual Gemini API Key
//     const GEMINI_API_KEY = 'YOUR_GEMINI_API_KEY';
//     const GEMINI_API_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${GEMINI_API_KEY}`;

//     // The prompt is updated to include the total test case count for better context.
//     const prompt = `
// You are an automated test case evaluator. Your task is to compare the actual output against the expected output for a given programming problem.

// Problem Title: ${title}
// Problem Description: ${description}
// Total number of test cases: ${testCasesCount}

// Test Inputs (each test case is on a new line or follows the problem's specific input format):
// ---
// ${testInput}
// ---

// Expected Outputs (corresponding to each test input):
// ---
// ${expectedOutput}
// ---

// Actual User Output:
// ---
// ${actualOutput}
// ---

// Based on a line-by-line comparison of the 'Actual User Output' and the 'Expected Outputs', determine how many test cases passed out of the total of ${testCasesCount}.
// IMPORTANT: Respond ONLY with the number of passed test cases out of the total, in the format "X/Y" (e.g., "9/10", "25/32"). Do not include any other text, explanation, or formatting.
//     `;

//     try {
//         const response = await fetch(GEMINI_API_URL, {
//             method: 'POST',
//             headers: {
//                 'Content-Type': 'application/json',
//             },
//             body: JSON.stringify({
//                 contents: [{ parts: [{ text: prompt }] }],
//             }),
//         });

//         if (!response.ok) {
//             console.error("Gemini API Error Response:", await response.text());
//             return null;
//         }

//         const data = await response.json();
//         const resultText = data.candidates[0]?.content?.parts[0]?.text?.trim();
        
//         if (resultText && /^\d+\/\d+$/.test(resultText)) {
//             return resultText;
//         } else {
//             console.warn("Gemini did not return the expected format. Received:", resultText);
//             return null;
//         }

//     } catch (error) {
//         console.error('Failed to call Gemini API:', error);
//         return null;
//     }
// }




//   async function saveExecution(result: any) {
//     let status = "Error";
//     let testCasesPassed = null;
//     // Use the new, reliable testCasesCount from the room data
//     const totalCases = room?.testCasesCount || 0;

//     if (result?.error === null) {
//         if (result?.output.trim() === room?.expectedOutput.trim()) {
//             status = "Accepted";
//             // Set the count directly using the totalCases variable
//             if (totalCases > 0) {
//               testCasesPassed = `${totalCases}/${totalCases}`;
//             }
//         } else {
//             status = "Wrong Answer";
//             // Call Gemini and pass the new testCasesCount property
//             testCasesPassed = await getTestCasesPassedCount({
//                 title: room?.title,
//                 description: room?.description,
//                 inputFormat: room?.inputFormat,
//                 outputFormat: room?.outputFormat,
//                 testInput: room?.testInput,
//                 actualOutput: result?.output,
//                 expectedOutput: room?.expectedOutput,
//                 testCasesCount: totalCases // Pass the count to the helper
//             });
//         }
//     }

//     const executionData = {
//         email,
//         name,
//         room: roomId,
//         question: room?.title,
//         executionSuccessful: result?.error === null,
//         error: result?.error,
//         status,
//         testCasesPassed, // This will now be correctly populated
//         output: result?.output,
//         expectedOutput: room?.expectedOutput,
//         code: result?.code,
//         language,
//         date: Date.now()
//     };

//     const apiUrl = 'https://replix-mindmaze-backend.onrender.com/api/save';

//     try {
//         const response = await fetch(apiUrl, {
//             method: 'POST',
//             headers: {
//                 'Content-Type': 'application/json'
//             },
//             body: JSON.stringify(executionData)
//         });

//         if (!response.ok) {
//             const errorData = await response.json();
//             throw new Error(`HTTP error! Status: ${response.status}, Message: ${errorData.message}`);
//         }

//         const responseData = await response.json();
//         console.log('Execution saved successfully:', responseData);
//         return responseData;

//     } catch (error) {
//         console.error('Failed to save execution:', error);
//     }
// }




//   // async function saveExecution(result: any) {
//   //     let status = "Accepted";

//   //     if(result?.output === room?.expectedOutput) {
//   //       status = "Accepted";
//   //     } else {
//   //       status = "Rejected";  
//   //     }

//   //       const executionData = {
//   //         email,
//   //         name,
//   //         room: roomId,
//   //         question: room?.title,
//   //         executionSuccessful: (result?.error === null) ? true : false,
//   //         error: result?.error,
//   //         status,
//   //         output: result?.output,
//   //         expectedOutput: room?.expectedOutput,
//   //         code: result?.code,
//   //         language,
//   //         date: Date.now()
//   //     };

//     //   const apiUrl = 'https://replix-mindmaze-backend.onrender.com/api/save'; 

//     //   try {
//     //       const response = await fetch(apiUrl, {
//     //           method: 'POST',
//     //           headers: {
//     //               'Content-Type': 'application/json' 
//     //           },
//     //           body: JSON.stringify(executionData) 
//     //       });

//     //       if (!response.ok) {
//     //           const errorData = await response.json();
//     //           throw new Error(`HTTP error! Status: ${response.status}, Message: ${errorData.message}`);
//     //       }

//     //       const result = await response.json();
//     //       console.log('Execution saved successfully:', result);
//     //       return result;

//     //   } catch (error) {
//     //         console.error('Failed to save execution:', error);
//     //   }
//     // }

  

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
//         //   <>
//         //   <div className="relative">
//         //     <Gauge className="w-4 h-4 animate-spin text-black/80" />
//         //     {/* <div className="absolute inset-0 blur animate-pulse" /> */}
//         //   </div>
//         //   <span className="text-sm font-medium text-black">SUBMIT</span>
//         //   </>
//         <>
//           <div className="relative flex items-center justify-center w-4 h-4">
//             <Gauge className="w-4 h-4 text-black fill-black/20 transition-transform group-hover:scale-110 group-hover:fill-black/30" />
//           </div>
//           <span className="text-sm font-medium text-black">
//             SUBMIT
//           </span>
//           </>
//         ) : (
//           <>
//           <div className="relative flex items-center justify-center w-4 h-4">
//             <Gauge className="w-4 h-4 text-black fill-black/20 transition-transform group-hover:scale-110 group-hover:fill-black/30" />
//           </div>
//           <span className="text-sm font-medium text-black">
//             SUBMIT
//           </span>
//           </>
//         )}
//       </div>

//     </motion.button>
//   );
// }

// export default EventSubmitButton




















































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

// function EventSubmitButton ({ testInput }: { testInput: string }) {
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

// export default EventSubmitButton;