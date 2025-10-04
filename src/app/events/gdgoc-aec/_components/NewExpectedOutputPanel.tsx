// "use client";

// import { Eye, EyeOff, Terminal } from "lucide-react";
// import { useState } from "react";

// interface ExpectedOutputPanelProps {
//   expectedOutput: string;
// }

// function NewExpectedOutputPanel({ expectedOutput }: ExpectedOutputPanelProps) {
//   const hasContent = expectedOutput && expectedOutput.trim() !== "";

//   return (
//     // The outer container no longer dictates a fixed height.
//     <div className="relative h-full min-h-56 flex flex-col xl:max-w-[64vw]">
//       {/* Height and flex properties are now conditional and applied here */}
//       <div
//         className={`relative bg-[#181825] rounded-xl p-3 ring-1 ring-gray-800/50 flex flex-col transition-all duration-300`}>
//         {/* Header */}
//         <div className="flex items-center justify-between mb-2">
//           <div className="flex items-center gap-2">
//             <div className="flex items-center justify-center w-6 h-6 rounded-lg bg-[#1e1e2e] ring-1 ring-gray-800/50">
//               <Terminal className="w-4 h-4 text-white" />
//             </div>
//             <span className="text-sm font-medium text-gray-300">
//               Expected Output
//             </span>
//           </div>
//         </div>

//           <div className="relative flex-1 flex flex-col overflow-auto">
//             <div
//               className="relative bg-[#1e1e2e]/50 backdrop-blur-sm border border-[#313244] 
//             rounded-xl p-3 h-full overflow-auto font-mono text-sm flex-1"
//             >
//               {hasContent ? (
//                 <div className="space-y-2 overflow-auto">
//                   <pre className="whitespace-pre-wrap text-gray-300 overflow-auto">
//                     {expectedOutput} <br />
//                     Valid <br />
//                     Valid <br />
//                     Valid <br />
//                     Valid <br />
//                     Valid <br />
//                   </pre>
//                 </div>
//               ) : (
//                 <div className="h-full flex flex-col items-center justify-center text-gray-500">
//                   <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-gray-800/50 ring-1 ring-gray-700/50 mb-4">
//                     <Terminal className="w-6 h-6" />
//                   </div>
//                   <p className="text-center">No expected output available...</p>
//                 </div>
//               )}
//             </div>
//           </div>
//       </div>
//     </div>
//   );
// }

// export default NewExpectedOutputPanel;











// "use client";

// import { Terminal } from "lucide-react";

// interface ExpectedOutputPanelProps {
//   expectedOutput: string;
// }

// function NewExpectedOutputPanel({ expectedOutput }: ExpectedOutputPanelProps) {
//   const hasContent = expectedOutput && expectedOutput.trim() !== "";

//   return (
//     // Outer wrapper: fills available height in flex parent
//     <div className="flex flex-col flex-1 min-h-56">
//       <div
//         className="flex flex-col flex-1 bg-[#181825] rounded-xl p-3 ring-1 ring-gray-800/50"
//       >
//         {/* Header */}
//         <div className="flex items-center justify-between mb-2">
//           <div className="flex items-center gap-2">
//             <div className="flex items-center justify-center w-6 h-6 rounded-lg bg-[#1e1e2e] ring-1 ring-gray-800/50">
//               <Terminal className="w-4 h-4 text-white" />
//             </div>
//             <span className="text-sm font-medium text-gray-300">
//               Expected Output
//             </span>
//           </div>
//         </div>

//         {/* Scrollable content */}
//         <div className="flex-1 overflow-auto">
//           <div
//             className="bg-[#1e1e2e]/50 backdrop-blur-sm border border-[#313244] 
//               rounded-xl p-3 font-mono text-sm text-gray-300 whitespace-pre-wrap"
//           >
//             {hasContent ? (
//               <pre className="flex-1 overflow-auto">{expectedOutput}</pre>
//             ) : (
//               <div className="h-full flex flex-col items-center justify-center text-gray-500">
//                 <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-gray-800/50 ring-1 ring-gray-700/50 mb-4">
//                   <Terminal className="w-6 h-6" />
//                 </div>
//                 <p className="text-center">No expected output available...</p>
//               </div>
//             )}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default NewExpectedOutputPanel;









"use client";

import { Terminal } from "lucide-react";

interface ExpectedOutputPanelProps {
  expectedOutput: string;
}

function NewExpectedOutputPanel({ expectedOutput }: ExpectedOutputPanelProps) {
  const hasContent = expectedOutput && expectedOutput.trim() !== "";

  return (
    // Outer wrapper that flexes within parent
    <div className="flex flex-col flex-1 min-h-56">
      {/* Card container stretches full height */}
      <div className="flex flex-col flex-1 bg-[#181825] rounded-xl p-3 ring-1 ring-gray-800/50">
        
        {/* Header */}
        <div className="flex items-center justify-between mb-2 shrink-0">
          <div className="flex items-center gap-2">
            <div className="flex items-center justify-center w-6 h-6 rounded-lg bg-[#1e1e2e] ring-1 ring-gray-800/50">
              <Terminal className="w-4 h-4 text-white" />
            </div>
            <span className="text-sm font-medium text-gray-300">
              Expected Output
            </span>
          </div>
        </div>

        {/* Scrollable section */}
        <div className="flex-1 overflow-auto">
          <div
            className="h-full bg-[#1e1e2e]/50 backdrop-blur-sm border border-[#313244] 
              rounded-xl p-3 font-mono text-sm text-gray-300 whitespace-pre-wrap overflow-auto"
          >
            {hasContent ? (
              <pre className="overflow-auto">{expectedOutput}</pre>
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

      </div>
    </div>
  );
}

export default NewExpectedOutputPanel;
