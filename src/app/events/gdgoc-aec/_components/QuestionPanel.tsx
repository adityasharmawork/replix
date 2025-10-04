// "use client";

// import { HelpCircle, BookOpen, Eye, EyeOff } from "lucide-react";
// import { useState } from "react";

// interface QuestionPanelProps {
//   question?: string;
//   difficulty?: "Easy" | "Medium" | "Hard";
//   tags?: string[];
//   description?: string;
// }

// function QuestionPanel({ 
//   question = "Sample Coding Problem", 
//   difficulty = "Medium",
//   tags = ["Array", "Two Pointers", "Hash Table"],
//   description = "Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target. You may assume that each input would have exactly one solution, and you may not use the same element twice."
// }: QuestionPanelProps) {
  
//   const [isCollapsed, setIsCollapsed] = useState(false);

//   const getDifficultyColor = (diff: string) => {
//     switch (diff) {
//       case "Easy": return "text-green-400";
//       case "Medium": return "text-yellow-400";
//       case "Hard": return "text-red-400";
//       default: return "text-gray-400";
//     }
//   };

//   const toggleCollapse = () => {
//     setIsCollapsed(!isCollapsed);
//   };

//   return (
//     <div className="relative mb-3 flex flex-col">
//       <div className="relative bg-[#181825] rounded-xl p-3 ring-1 ring-gray-800/50 flex flex-col">
//         {/* Header */}
//         <div className="flex items-center justify-between mb-2">
//           <div className="flex items-center gap-2">
//             <div className="flex items-center justify-center w-6 h-6 rounded-lg bg-[#1e1e2e] ring-1 ring-gray-800/50">
//               <HelpCircle className="w-4 h-4 text-white" />
//             </div>
//             <span className="text-sm font-medium text-gray-300">Problem</span>
//             <span className={`text-xs px-2 py-0.5 rounded-full bg-[#1e1e2e] ring-1 ring-gray-800/50 ${getDifficultyColor(difficulty)}`}>
//               {difficulty}
//             </span>
//           </div>

//           <button
//             onClick={toggleCollapse}
//             className="flex items-center gap-1.5 px-2.5 py-1.5 text-xs text-gray-400 hover:text-gray-300 bg-[#1e1e2e] 
//             rounded-lg ring-1 ring-gray-800/50 hover:ring-gray-700/50 transition-all"
//           >
//             {isCollapsed ? (
//               <>
//                 <Eye className="w-3.5 h-3.5" />
//                 Show
//               </>
//             ) : (
//               <>
//                 <EyeOff className="w-3.5 h-3.5" />
//                 Hide
//               </>
//             )}
//           </button>
//         </div>

//         {/* Content Area */}
//         {!isCollapsed && (
//           <div className="relative flex flex-col">
//             <div className="relative bg-[#1e1e2e]/50 backdrop-blur-sm border border-[#313244] rounded-xl p-3 overflow-auto">
//               {/* Question Title */}
//               <div className="flex items-start gap-3 mb-4">
//                 <BookOpen className="w-5 h-5 flex-shrink-0 mt-1 text-blue-400" />
//                 <div className="space-y-2 flex-1">
//                   <h3 className="font-medium text-gray-200 text-lg">{question}</h3>
                  
//                   {/* Tags */}
//                   <div className="flex flex-wrap gap-2">
//                     {tags.map((tag, index) => (
//                       <span 
//                         key={index}
//                         className="text-xs px-2 py-1 rounded bg-gray-800/70 text-gray-400 ring-1 ring-gray-700/50"
//                       >
//                         {tag}
//                       </span>
//                     ))}
//                   </div>
//                 </div>
//               </div>

//               {/* Description */}
//               <div className="space-y-3">
//                 <div className="text-sm font-medium text-gray-300">Description:</div>
//                 <div className="text-sm text-gray-400 leading-relaxed whitespace-pre-wrap">
//                   {description}
//                 </div>
//               </div>

//               {/* Example Section (Optional) */}
//               <div className="mt-4 pt-4 border-t border-gray-700/50">
//                 <div className="text-sm font-medium text-gray-300 mb-2">Example:</div>
//                 <div className="bg-[#1a1a1a] rounded-lg p-3 font-mono text-sm">
//                   <div className="text-gray-400">Input: nums = [2,7,11,15], target = 9</div>
//                   <div className="text-gray-400 mt-1">Output: [0,1]</div>
//                   <div className="text-gray-500 mt-2">Explanation: Because nums[0] + nums[1] == 9, we return [0, 1].</div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }

// export default QuestionPanel;



































// Updated QuestionPanel.tsx to handle room data
"use client";

import { HelpCircle, BookOpen, Eye, EyeOff, Clock, HardDrive } from "lucide-react";
import { useState } from "react";

interface Example {
  input: string;
  output: string;
  explanation: string;
}

interface QuestionPanelProps {
  roomId: string;
  question: string;
  difficulty: "Easy" | "Medium" | "Hard";
  tags: string[];
  description: string;
  inputFormat: string;
  outputFormat: string;
  examples: Example[];
  timeLimit: string;
  memoryLimit: string;
}

function QuestionPanel({ 
  roomId,
  question,
  difficulty,
  tags,
  description,
  inputFormat,
  outputFormat,
  examples,
  timeLimit,
  memoryLimit
}: QuestionPanelProps) {
  
  const [isCollapsed, setIsCollapsed] = useState(false);

  const getDifficultyColor = (diff: string) => {
    switch (diff) {
      case "Easy": return "text-green-400";
      case "Medium": return "text-yellow-400";
      case "Hard": return "text-red-400";
      default: return "text-gray-400";
    }
  };

  const toggleCollapse = () => {
    setIsCollapsed(prev => !prev);
  };

  return (
    <div className="relative mb-3 flex flex-col">
      <div className="relative bg-[#181825] rounded-xl p-3 ring-1 ring-gray-800/50 flex flex-col select-none">
        {/* Header */}
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2">
            <div className="flex items-center justify-center w-6 h-6 rounded-lg bg-[#1e1e2e] ring-1 ring-gray-800/50">
              <HelpCircle className="w-4 h-4 text-white" />
            </div>
            <span className="text-sm font-medium text-gray-300">Problem</span>
            <span className={`text-xs px-2 py-0.5 rounded-full bg-[#1e1e2e] ring-1 ring-gray-800/50 ${getDifficultyColor(difficulty)}`}>{difficulty}</span>
            <span className="text-xs px-2 py-0.5 rounded bg-[#1e1e2e] text-gray-400 ring-1 ring-gray-700/50">Room: {roomId}</span>
            <div className="flex items-center gap-2 ml-2">
              {/* <div className="flex items-center gap-1 text-xs text-gray-400">
                <Clock className="w-3 h-3" />
                {timeLimit}
              </div>
              <div className="flex items-center gap-1 text-xs text-gray-400">
                <HardDrive className="w-3 h-3" />
                {memoryLimit}
              </div> */}
            </div>
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

        {/* Content Area */}
        {!isCollapsed && (
          <div className="relative flex flex-col">
            <div className="relative bg-[#1e1e2e]/50 backdrop-blur-sm border border-[#313244] rounded-xl p-3 overflow-auto max-h-[60vh]">
              {/* Question Title */}
              <div className="flex items-start gap-3 mb-4">
                <BookOpen className="w-5 h-5 flex-shrink-0 mt-1 text-blue-400" />
                <div className="space-y-2 flex-1">
                  <h3 className="font-medium text-gray-200 text-lg">{question}</h3>
                  {/* Tags */}
                  <div className="flex flex-wrap gap-2">
                    {tags.map((tag, index) => (
                      <span 
                        key={index}
                        className="text-xs px-2 py-1 rounded bg-gray-800/70 text-gray-400 ring-1 ring-gray-700/50"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Description */}
              <div className="space-y-3 mb-4">
                <div className="text-sm font-medium text-gray-300">Description:</div>
                <div className="text-sm text-gray-400 leading-relaxed whitespace-pre-wrap">
                  {description}
                </div>
              </div>

              {/* Input/Output Format */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div className="space-y-2">
                  <div className="text-sm font-medium text-gray-300">Input Format:</div>
                  <div className="text-sm text-gray-400 leading-relaxed whitespace-pre-wrap bg-[#1a1a1a] rounded-lg p-2">
                    {inputFormat}
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="text-sm font-medium text-gray-300">Output Format:</div>
                  <div className="text-sm text-gray-400 leading-relaxed whitespace-pre-wrap bg-[#1a1a1a] rounded-lg p-2">
                    {outputFormat}
                  </div>
                </div>
              </div>

              {/* Examples */}
              <div className="space-y-3">
                <div className="text-sm font-medium text-gray-300">Examples:</div>
                {examples.map((example, index) => (
                  <div key={index} className="bg-[#1a1a1a] rounded-lg p-3">
                    <div className="text-sm font-medium text-gray-300 mb-2">Example {index + 1}:</div>
                    <div className="space-y-2">
                      <div>
                        <div className="text-xs text-gray-400 mb-1">Input:</div>
                        <pre className="text-sm text-gray-300 bg-[#0d1117] rounded p-2 font-mono whitespace-pre-wrap">{example.input}</pre>
                      </div>
                      <div>
                        <div className="text-xs text-gray-400 mb-1">Output:</div>
                        <pre className="text-sm text-gray-300 bg-[#0d1117] rounded p-2 font-mono whitespace-pre-wrap">{example.output}</pre>
                      </div>
                      <div>
                        <div className="text-xs text-gray-400 mb-1">Explanation:</div>
                        <div className="text-sm text-gray-400">{example.explanation}</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default QuestionPanel;
