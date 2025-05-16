// "use client";

// import { useState } from "react";
// import { useCodeEditorStore } from "@/store/useCodeEditorStore";
// import { Bot, X, Copy, Code, Sparkles, Loader2 } from "lucide-react";

// function AIAssistantPanel() {
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [prompt, setPrompt] = useState("");
//   const [isGenerating, setIsGenerating] = useState(false);
//   const [generatedCode, setGeneratedCode] = useState("");
//   const [error, setError] = useState("");
  
//   const { setCode } = useCodeEditorStore();
  
//   const handleGenerateClick = () => {
//     setIsModalOpen(true);
//   };
  
//   const closeModal = () => {
//     setIsModalOpen(false);
//     // Reset states when closing modal
//     setGeneratedCode("");
//     setError("");
//   };
  
//   const handlePromptSubmit = async (e: any) => {
//     e.preventDefault();
    
//     if (!prompt.trim()) return;
    
//     setIsGenerating(true);
//     setGeneratedCode("");
//     setError("");
    
//     try {
//       const response = await fetch('/api/generate-code', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({ prompt }),
//       });
      
//       const data = await response.json();
      
//       if (!response.ok) {
//         throw new Error(data.error || 'Failed to generate code');
//       }
      
//       setGeneratedCode(data.code);
//     } catch (err: any) {
//       console.error('Error generating code:', err);
//       setError(err.message || 'An error occurred while generating code');
//     } finally {
//       setIsGenerating(false);
//     }
//   };
  
//   const applyGeneratedCode = () => {
//     if (generatedCode) {
//       setCode(generatedCode);
//       closeModal();
//     }
//   };
  
//   const copyToClipboard = async () => {
//     if (generatedCode) {
//       await navigator.clipboard.writeText(generatedCode);
//     }
//   };
  
//   return (
//     <div className="relative flex flex-col mt-2 w-auto">
//       <div className="relative bg-[#181825] rounded-xl p-3 ring-1 ring-gray-800/50 flex flex-col">
//         {/* Header */}
//         <div className="flex items-center justify-between mb-2">
//           <div className="flex items-center gap-2">
//             <div className="flex items-center justify-center w-6 h-6 rounded-lg bg-[#1e1e2e] ring-1 ring-gray-800/50">
//               <Bot className="w-4 h-4 text-primary-400" />
//             </div>
//             <span className="text-sm font-medium text-gray-300">AI Assistant</span>
//           </div>
//         </div>

//         {/* AI Assistant Panel Content */}
//         <div className="relative flex-1 flex flex-col">
//           <div
//             className="relative bg-[#1e1e2e]/50 backdrop-blur-sm border border-[#313244] 
//             rounded-xl p-4 overflow-auto font-mono text-sm flex-1"
//           >
//             <div className="h-full flex flex-col items-center justify-center">
//               <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-gray-800/50 ring-1 ring-gray-700/50 mb-4">
//                 <Sparkles className="w-6 h-6 text-primary-400" />
//               </div>
//               <p className="text-center text-gray-400 mb-4">
//                 Let AI help you generate code for your project
//               </p>
//               <button
//                 onClick={handleGenerateClick}
//                 className="flex items-center gap-2 px-4 py-2 bg-primary-600 text-white 
//                   rounded-lg hover:bg-primary-700 transition-colors"
//               >
//                 <Sparkles className="w-4 h-4" />
//                 Generate with AI
//               </button>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* AI Generation Modal */}
//       {isModalOpen && (
//         <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
//           <div 
//             className="bg-[#181825] rounded-xl w-full max-w-3xl max-h-[80vh] flex flex-col 
//               ring-1 ring-gray-800/50 shadow-xl overflow-hidden"
//           >
//             {/* Modal Header */}
//             <div className="flex items-center justify-between p-4 border-b border-gray-800">
//               <div className="flex items-center gap-2">
//                 <Bot className="w-5 h-5 text-primary-400" />
//                 <h2 className="text-lg font-medium text-gray-200">AI Code Generation</h2>
//               </div>
//               <button 
//                 onClick={closeModal}
//                 className="text-gray-400 hover:text-gray-200 transition-colors"
//               >
//                 <X className="w-5 h-5" />
//               </button>
//             </div>
            
//             {/* Modal Content */}
//             <div className="flex-1 overflow-auto p-4">
//               {/* Prompt Input Form */}
//               <form onSubmit={handlePromptSubmit} className="mb-4">
//                 <label className="block text-sm font-medium text-gray-300 mb-2">
//                   Describe the code you want to generate
//                 </label>
//                 <textarea
//                   value={prompt}
//                   onChange={(e) => setPrompt(e.target.value)}
//                   placeholder="e.g., Generate a binary search algorithm in C++"
//                   className="w-full min-h-32 bg-[#1e1e2e] text-gray-300 rounded-lg p-3 
//                     ring-1 ring-gray-800/50 focus:ring-primary-400/50 outline-none"
//                   required
//                 />
//                 <div className="mt-3 flex justify-end">
//                   <button
//                     type="submit"
//                     disabled={isGenerating || !prompt.trim()}
//                     className="flex items-center gap-2 px-4 py-2 bg-primary-600 text-white 
//                       rounded-lg hover:bg-primary-700 transition-colors disabled:opacity-50 
//                       disabled:cursor-not-allowed"
//                   >
//                     {isGenerating ? (
//                       <>
//                         <Loader2 className="w-4 h-4 animate-spin" />
//                         Generating...
//                       </>
//                     ) : (
//                       <>
//                         <Sparkles className="w-4 h-4" />
//                         Generate
//                       </>
//                     )}
//                   </button>
//                 </div>
//               </form>
              
//               {/* Generated Code Output */}
//               {generatedCode && (
//                 <div className="mt-4">
//                   <div className="flex items-center justify-between mb-2">
//                     <div className="flex items-center gap-2 text-gray-300">
//                       <Code className="w-4 h-4" />
//                       <span className="font-medium">Generated Code</span>
//                     </div>
//                     <div className="flex items-center gap-2">
//                       <button
//                         onClick={copyToClipboard}
//                         className="flex items-center gap-1 px-2 py-1 text-xs text-gray-400 
//                           hover:text-gray-300 bg-[#1e1e2e] rounded-lg ring-1 ring-gray-800/50 
//                           hover:ring-gray-700/50 transition-all"
//                       >
//                         <Copy className="w-3.5 h-3.5" />
//                         Copy
//                       </button>
//                     </div>
//                   </div>
//                   <pre className="bg-[#1e1e2e] p-3 rounded-lg text-gray-300 overflow-auto max-h-60">
//                     {generatedCode}
//                   </pre>
//                 </div>
//               )}
              
//               {/* Error Message */}
//               {error && (
//                 <div className="mt-4 p-3 bg-red-900/20 border border-red-900/50 rounded-lg text-red-400">
//                   <p className="font-medium mb-1">Error</p>
//                   <p>{error}</p>
//                 </div>
//               )}
//             </div>
            
//             {/* Modal Footer */}
//             {generatedCode && (
//               <div className="border-t border-gray-800 p-4 flex justify-between">
//                 <button
//                   onClick={closeModal}
//                   className="px-4 py-2 text-gray-400 hover:text-gray-300 bg-[#1e1e2e] 
//                     rounded-lg ring-1 ring-gray-800/50 hover:ring-gray-700/50 transition-all"
//                 >
//                   Cancel
//                 </button>
//                 <button
//                   onClick={applyGeneratedCode}
//                   className="px-4 py-2 bg-primary-600 text-white rounded-lg 
//                     hover:bg-primary-700 transition-colors"
//                 >
//                   Apply to Editor
//                 </button>
//               </div>
//             )}
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }

// export default AIAssistantPanel;



















"use client";

import React, { useState, FormEvent } from "react";
import { useCodeEditorStore } from "@/store/useCodeEditorStore";
import { Bot, X, Copy, Code, Sparkles, Loader2 } from "lucide-react";

const AIAssistantPanel: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [prompt, setPrompt] = useState<string>("");
  const [isGenerating, setIsGenerating] = useState<boolean>(false);
  const [generatedCode, setGeneratedCode] = useState<string>("");
  const [error, setError] = useState<string>("");

//   const { setCode } = useCodeEditorStore();

  const handleGenerateClick = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setGeneratedCode("");
    setError("");
  };

  const handlePromptSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!prompt.trim()) return;

    setIsGenerating(true);
    setGeneratedCode("");
    setError("");

    try {
      const response = await fetch("/api/generate-code", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt }),
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.error || "Failed to generate code");

      setGeneratedCode(data.code as string);
    } catch (err: any) {
      console.error("Error generating code:", err);
      setError(err.message ?? "An error occurred while generating code");
    } finally {
      setIsGenerating(false);
    }
  };

//   const applyGeneratedCode = () => {
//     if (generatedCode) {
//       setCode(generatedCode);
//       closeModal();
//     }
//   };

  const copyToClipboard = async () => {
    if (generatedCode) {
      await navigator.clipboard.writeText(generatedCode);
    }
  };

  return (
    <div className="relative flex flex-col mt-2 w-full min-h-36 h-auto">
      <div className="relative bg-[#181825] rounded-xl p-3 ring-1 ring-gray-800/50 flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2">
            <div className="flex items-center justify-center w-6 h-6 rounded-lg bg-[#1e1e2e] ring-1 ring-gray-800/50">
              <Bot className="w-4 h-4 text-primary-400" />
            </div>
            <span className="text-sm font-medium text-gray-300">AI Assistant</span>
          </div>
        </div>

        {/* AI Assistant Panel Content */}
        <div className="relative flex-1 flex flex-col">
          <div
            className="relative bg-[#1e1e2e]/50 backdrop-blur-sm border border-[#313244] 
            rounded-xl p-4 overflow-auto font-mono text-sm flex-1"
          >
            <div className="h-full flex flex-col items-center justify-center">
              <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-gray-800/50 ring-1 ring-gray-700/50 mb-4">
                <Sparkles className="w-6 h-6 text-primary-400" />
              </div>
              <p className="text-center text-gray-400 mb-4">
                Let AI help you generate code
              </p>
              <button
                onClick={handleGenerateClick}
                className="flex items-center gap-2 px-4 py-2 bg-primary-600 text-white 
                  rounded-lg hover:bg-primary-700 transition-colors"
              >
                <Sparkles className="w-4 h-4" />
                Generate with AI
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* AI Generation Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div
            className="bg-[#181825] rounded-xl w-full max-w-3xl max-h-[80vh] flex flex-col 
              ring-1 ring-gray-800/50 shadow-xl overflow-hidden"
          >
            {/* Modal Header */}
            <div className="flex items-center justify-between p-4 border-b border-gray-800">
              <div className="flex items-center gap-2">
                <Bot className="w-5 h-5 text-primary-400" />
                <h2 className="text-lg font-medium text-gray-200">AI Code Generation</h2>
              </div>
              <button
                onClick={closeModal}
                className="text-gray-400 hover:text-gray-200 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Content */}
            <div className="flex-1 overflow-auto p-4">
              {/* Prompt Input Form */}
              <form onSubmit={handlePromptSubmit} className="mb-4">
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Describe the code you want to generate
                </label>
                <textarea
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  placeholder="e.g., Generate a binary search algorithm in C++"
                  className="w-full min-h-32 bg-[#1e1e2e] text-gray-300 rounded-lg p-3 
                    ring-1 ring-gray-800/50 focus:ring-primary-400/50 outline-none"
                  required
                />
                <div className="mt-3 flex justify-end">
                  <button
                    type="submit"
                    disabled={isGenerating || !prompt.trim()}
                    className="flex items-center gap-2 px-4 py-2 bg-primary-600 text-white 
                      rounded-lg hover:bg-primary-700 transition-colors disabled:opacity-50 
                      disabled:cursor-not-allowed"
                  >
                    {isGenerating ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        Generating...
                      </>
                    ) : (
                      <>
                        <Sparkles className="w-4 h-4" />
                        Generate
                      </>
                    )}
                  </button>
                </div>
              </form>

              {/* Generated Code Output */}
              {generatedCode && (
                <div className="mt-4">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2 text-gray-300">
                      <Code className="w-4 h-4" />
                      <span className="font-medium">Generated Code</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={copyToClipboard}
                        className="flex items-center gap-1 px-2 py-1 text-xs text-gray-400 
                          hover:text-gray-300 bg-[#1e1e2e] rounded-lg ring-1 ring-gray-800/50 
                          hover:ring-gray-700/50 transition-all"
                      >
                        <Copy className="w-3.5 h-3.5" />
                        Copy
                      </button>
                    </div>
                  </div>
                  <pre className="bg-[#1e1e2e] p-3 rounded-lg text-gray-300 overflow-auto max-h-60">
                    {generatedCode}
                  </pre>
                </div>
              )}

              {/* Error Message */}
              {error && (
                <div className="mt-4 p-3 bg-red-900/20 border border-red-900/50 rounded-lg text-red-400">
                  <p className="font-medium mb-1">Error</p>
                  <p>{error}</p>
                </div>
              )}
            </div>

            {/* Modal Footer */}
            {generatedCode && (
              <div className="border-t border-gray-800 p-4 flex justify-between">
                <button
                  onClick={closeModal}
                  className="px-4 py-2 text-gray-400 hover:text-gray-300 bg-[#1e1e2e] 
                    rounded-lg ring-1 ring-gray-800/50 hover:ring-gray-700/50 transition-all"
                >
                  Cancel
                </button>
                {/* <button
                  onClick={applyGeneratedCode}
                  className="px-4 py-2 bg-primary-600 text-white rounded-lg 
                    hover:bg-primary-700 transition-colors"
                >
                  Apply to Editor
                </button> */}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default AIAssistantPanel;
