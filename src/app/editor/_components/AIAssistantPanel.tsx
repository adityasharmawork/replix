// "use client";

// import React, { useState, FormEvent } from "react";
// import { useCodeEditorStore } from "@/store/useCodeEditorStore";
// import { Bot, X, Copy, Code, Sparkles, Loader2 } from "lucide-react";

// const AIAssistantPanel: React.FC = () => {
//   const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
//   const [prompt, setPrompt] = useState<string>("");
//   const [isGenerating, setIsGenerating] = useState<boolean>(false);
//   const [generatedCode, setGeneratedCode] = useState<string>("");
//   const [error, setError] = useState<string>("");

//   const { setCode } = useCodeEditorStore();

//   const handleGenerateClick = () => {
//     setIsModalOpen(true);
//   };

//   const closeModal = () => {
//     setIsModalOpen(false);
//     setGeneratedCode("");
//     setError("");
//   };

//   const handlePromptSubmit = async (e: FormEvent<HTMLFormElement>) => {
//     e.preventDefault();
//     if (!prompt.trim()) return;

//     setIsGenerating(true);
//     setGeneratedCode("");
//     setError("");

//     try {
//       const response = await fetch("/api/generate-code", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ prompt }),
//       });

//       const data = await response.json();
//       if (!response.ok) throw new Error(data.error || "Failed to generate code");

//       setGeneratedCode(data.code as string);
//     } catch (err: any) {
//       console.error("Error generating code:", err);
//       setError(err.message ?? "An error occurred while generating code");
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
//     <div className="relative flex flex-col mt-2 w-full h-auto">
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
//                 <Sparkles className="w-4 h-4 text-primary-400" />
//               </div>
//               <p className="text-center text-gray-400 mb-4">
//                 Let AI help you generate code
//               </p>
//               <button
//                 onClick={handleGenerateClick}
//                 className="flex items-center gap-2 px-5 py-2 bg-primary-600 text-white 
//                   rounded-lg hover:bg-primary-700 transition-colors"
//               >
//                 <Sparkles className="w-4 h-4" />
//                 Generate with AI
//               </button>
//               <button
//                 onClick={handleGenerateClick}
//                 className="flex items-center mt-2 gap-2 px-4 py-2 bg-primary-600 text-white 
//                   rounded-lg hover:bg-primary-700 transition-colors"
//               >
//                 <Sparkles className="w-4 h-4" />
//                 Fix Error with AI
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
//                   Describe the code you want to generate in Language - {localStorage.getItem(`editor-language`)}
//                 </label>
//                 <textarea
//                   value={prompt}
//                   onChange={(e) => setPrompt(e.target.value)}
//                   placeholder="e.g., Generate a Dijkstra's Algorithm Code in C++"
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
// };

// export default AIAssistantPanel;



















// // AIAssistantPanel.tsx
// "use client";

// import React, { useState, FormEvent } from "react";
// import { useCodeEditorStore } from "@/store/useCodeEditorStore";
// import { Bot, X, Copy, Code, Sparkles, Loader2 } from "lucide-react";

// const AIAssistantPanel: React.FC = () => {
//   const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
//   const [prompt, setPrompt] = useState<string>("");
//   const [isGenerating, setIsGenerating] = useState<boolean>(false);
//   const [generatedCode, setGeneratedCode] = useState<string>("");
//   const [error, setError] = useState<string>("");

//   const setCode = useCodeEditorStore(s => s.setCode);
//   const currentLanguage = useCodeEditorStore(s => s.language);


//   const handleGenerateClick = () => {
//     setIsModalOpen(true);
//   };

//   const closeModal = () => {
//     setIsModalOpen(false);
//     // Keep prompt if user just closes, clear generated code and error
//     setGeneratedCode(""); 
//     setError("");
//   };

//   const handlePromptSubmit = async (e: FormEvent<HTMLFormElement>) => {
//     e.preventDefault();
//     if (!prompt.trim()) return;

//     setIsGenerating(true);
//     setGeneratedCode("");
//     setError("");

//     try {
//       // Append language context to the prompt for the API
//       const fullPrompt = `Language: ${currentLanguage}. Task: ${prompt}`;
//       const response = await fetch("/api/generate-code", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ prompt: fullPrompt }), // Send the enhanced prompt
//       });

//       const data = await response.json();
//       if (!response.ok) throw new Error(data.error || "Failed to generate code");

//       setGeneratedCode(data.code as string);
//     } catch (err: any) {
//       console.error("Error generating code:", err);
//       setError(err.message ?? "An error occurred while generating code");
//     } finally {
//       setIsGenerating(false);
//     }
//   };

//   const applyGeneratedCode = () => {
//     if (generatedCode) {
//       setCode(generatedCode);
//       closeModal();
//       setPrompt(""); // Clear prompt after applying
//     }
//   };

//   const copyToClipboard = async () => {
//     if (generatedCode) {
//       await navigator.clipboard.writeText(generatedCode);
//     }
//   };

//   // State for which AI action is active (e.g., "generate" or "fix")
//   const [aiActionType, setAiActionType] = useState<"generate" | "fix">("generate");

//   const openModalForAction = (action: "generate" | "fix") => {
//     setAiActionType(action);
//     // Potentially pre-fill prompt based on action, e.g., if "fix", get current code/error
//     // For now, just opens the modal, and the title/placeholder can adapt.
//     setIsModalOpen(true);
//   };
  
//   const modalTitle = aiActionType === "fix" ? "AI Error Debugger" : "AI Code Generation";
//   const promptPlaceholder = aiActionType === "fix" 
//     ? "Describe the error and paste relevant code to fix..." 
//     : `e.g., Generate a Dijkstra's Algorithm in ${currentLanguage}`;
//   const labelText = aiActionType === "fix" 
//     ? `Describe the error to fix in your ${currentLanguage} code:` 
//     : `Describe the code to generate in ${currentLanguage}:`;


//   return (
//     <div className="relative flex flex-col mt-1 h-full w-full"> {/* h-auto removed, height will be defined by content */}
//       {/* MODIFIED: Reduced padding (p-2), added flex items-center justify-between, and set fixed height (h-12) */}
//       <div className="relative bg-[#181825] rounded-lg p-2 ring-1 ring-gray-800/50 flex items-center justify-between h-16">
//         {/* Left Part: Panel Icon + Name (Optional if too crowded) */}
//         <div className="flex items-center gap-1.5"> {/* Adjusted gap */}
//           <div className="ml-4 flex items-center justify-center w-8 h-8 rounded bg-[#1e1e2e] ring-1 ring-gray-800/50">
//             <Bot className="w-8 h-8 text-primary-400" /> {/* Smaller icon */}
//           </div>
//           <span className="text-sm font-medium text-gray-300 hidden sm:inline">AI Assistant</span>
//           <span className="text-sm font-medium text-gray-300 sm:hidden">AI:</span> {/* Shorter for small screens */}
//         </div>

//         {/* Right Part: Buttons side-by-side */}
//         <div className="flex items-center gap-3 mx-2">
//             <button
//                 onClick={() => openModalForAction("fix")}
//                 className="flex items-center gap-1 px-6 py-1.5 bg-blue-600 text-white  {/* Different color for fix */}
//                           rounded-lg text-md hover:bg-blue-700 transition-colors"
//                 title="Fix error with AI"
//             >
//                 <Sparkles className="w-5 h-5" /> {/* Consider a different icon for "Fix", e.g., a wrench or lightbulb */}
//                 Fix Error with AI
//             </button>
//             <button
//                 onClick={() => openModalForAction("generate")}
//                 className="flex items-center gap-1 px-6 py-1.5 bg-blue-600 text-white 
//                           rounded-lg text-md hover:bg-blue-700 transition-colors"
//                 title="Generate code with AI"
//             >
//                 <Sparkles className="w-5 h-5" />
//                 Generate with AI
//             </button>
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
//                 <Bot className="w-6 h-6 text-primary-400" />
//                 {/* MODIFIED: Dynamic modal title */}
//                 <h2 className="text-xl font-medium text-gray-200">{modalTitle}</h2>
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
//               <form onSubmit={handlePromptSubmit} className="mb-4">
//                 {/* MODIFIED: Dynamic label text */}
//                 <label className="block text-md font-medium text-gray-300 mb-2">
//                   {labelText}
//                 </label>
//                 <textarea
//                   value={prompt}
//                   onChange={(e) => setPrompt(e.target.value)}
//                   // MODIFIED: Dynamic placeholder
//                   placeholder={promptPlaceholder}
//                   className="w-full min-h-32 bg-[#1e1e2e] text-gray-300 rounded-lg p-3 
//                     ring-1 ring-gray-800/50 focus:ring-primary-400/50 outline-none"
//                   required
//                 />
//                 <div className="mt-3 flex justify-end">
//                   <button
//                     type="submit"
//                     disabled={isGenerating || !prompt.trim()}
//                     className="flex items-center gap-2 px-4 py-2 bg-orange-400 text-white 
//                       rounded-lg hover:bg-orange-500 transition-colors disabled:opacity-50 
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
//                         {aiActionType === "fix" ? "Suggest Fix" : "Generate"}
//                       </>
//                     )}
//                   </button>
//                 </div>
//               </form>

//               {generatedCode && (
//                 <div className="mt-4">
//                   <div className="flex items-center justify-between mb-2">
//                     <div className="flex items-center gap-2 text-gray-300">
//                       <Code className="w-4 h-4" />
//                       <span className="font-medium">Generated Code / Suggestion</span>
//                     </div>
//                     <div className="flex items-center gap-2">
//                       <button
//                         onClick={copyToClipboard}
//                         className="flex items-center gap-1 px-3 py-1 text-sm text-gray-400 
//                           hover:text-gray-300 bg-[#1e1e2e] rounded-lg ring-1 ring-gray-800/50 
//                           hover:ring-gray-700/50 transition-all"
//                       >
//                         <Copy className="w-4 h-4 mr-1" />
//                         Copy
//                       </button>
//                     </div>
//                   </div>
//                   <pre className="bg-[#1e1e2e] p-3 rounded-lg text-gray-300 overflow-auto max-h-60">
//                     {generatedCode}
//                   </pre>
//                 </div>
//               )}

//               {error && (
//                 <div className="mt-4 p-3 bg-red-900/20 border border-red-900/50 rounded-lg text-red-400">
//                   <p className="font-medium mb-1">Error</p>
//                   <p>{error}</p>
//                 </div>
//               )}
//             </div>

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
//                   className="px-4 py-2 bg-blue-600 text-white rounded-lg 
//                     hover:bg-blue-700 transition-colors"
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
// };

// export default AIAssistantPanel;














// AIAssistantPanel.tsx
"use client";

import React, { useState, FormEvent, useEffect } from "react";
import { useCodeEditorStore } from "@/store/useCodeEditorStore";
import { Bot, X, Copy, Code, Sparkles, Loader2, ShieldAlert, Wrench } from "lucide-react"; // Added Wrench

const AIAssistantPanel: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [prompt, setPrompt] = useState<string>(""); // For user's error description or generation request
  const [codeToFix, setCodeToFix] = useState<string>(""); // To store code from editor for fixing
  const [isGenerating, setIsGenerating] = useState<boolean>(false);
  const [generatedCode, setGeneratedCode] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [aiActionType, setAiActionType] = useState<"generate" | "fix">("generate");

  const setCodeInEditor = useCodeEditorStore(s => s.setCode);
  const currentLanguage = useCodeEditorStore(s => s.language);

  // Effect to update codeToFix if language changes while modal is open for "fix"
  useEffect(() => {
    if (isModalOpen && aiActionType === "fix") {
      const existingCode = localStorage.getItem(`editor-code-${currentLanguage}`);
      setCodeToFix(existingCode || "// No code found in editor for the current language.");
    }
  }, [currentLanguage, isModalOpen, aiActionType]);


  const openModalForAction = (action: "generate" | "fix") => {
    setAiActionType(action);
    setPrompt(""); // Clear previous user input
    setGeneratedCode("");
    setError("");

    if (action === "fix") {
      const existingCode = localStorage.getItem(`editor-code-${currentLanguage}`);
      setCodeToFix(existingCode || "// No code found in editor for the current language.");
    } else {
      setCodeToFix(""); // Clear if it's a generate action
    }
    setIsModalOpen(true);
  };
  
  const closeModal = () => {
    setIsModalOpen(false);
    setGeneratedCode("");
    setError("");
    setPrompt(""); // Clear prompt input on close
    setCodeToFix(""); // Clear code being fixed on close
  };

  const handlePromptSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!prompt.trim() && aiActionType === "generate") {
        setError("Please describe what you want to generate.");
        return;
    }
    if (!prompt.trim() && aiActionType === "fix") {
        setError("Please describe the error.");
        return;
    }


    setIsGenerating(true);
    setGeneratedCode("");
    setError("");

    let fullApiPrompt = "";

    if (aiActionType === "fix") {
        if (!codeToFix.trim() || codeToFix.startsWith("// No code found")) {
            setError("No code available to fix. Please ensure there is code in your editor.");
            setIsGenerating(false);
            return;
        }
        fullApiPrompt = `You are an AI assistant helping to debug code.
Language: ${currentLanguage}.
Task: Analyze the following code and the error description. Provide a corrected version of the code.
If you provide explanations, clearly separate them from the code block. The primary output should be the corrected code block.

Error Description:
"${prompt}"

---
Code to Fix:
\`\`\`${currentLanguage}
${codeToFix}
\`\`\`

Corrected Code (only the code block):
`;
    } else { // "generate"
        fullApiPrompt = `You are an AI assistant helping to generate code.
Language: ${currentLanguage}.
Task: Generate code based on the following request. Provide only the code block itself without any surrounding text or explanations.

Request:
"${prompt}"

Generated Code (only the code block):
`;
    }

    try {
      const response = await fetch("/api/generate-code", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt: fullApiPrompt }),
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error || `Failed to ${aiActionType === "fix" ? "fix code" : "generate code"} (Status: ${response.status})`);
      }
      setGeneratedCode(data.code as string);
    } catch (err: any) {
      console.error(`Error ${aiActionType === "fix" ? "fixing" : "generating"} code:`, err);
      setError(err.message ?? `An error occurred while ${aiActionType === "fix" ? "fixing" : "generating"} code.`);
    } finally {
      setIsGenerating(false);
    }
  };

  const applyGeneratedCode = () => {
    if (generatedCode) {
      setCodeInEditor(generatedCode);
      closeModal(); // Clears prompt, generatedCode, error, codeToFix
    }
  };

  const copyToClipboard = async () => {
    if (generatedCode) {
      try {
        await navigator.clipboard.writeText(generatedCode);
        // Add a small visual feedback if possible, e.g., toast "Copied!"
      } catch (err) {
        console.error("Failed to copy code to clipboard:", err);
        setError("Failed to copy code."); // Show error in modal
      }
    }
  };
  
  const modalTitle = aiActionType === "fix" ? "AI Error Debugger" : "AI Code Generation";
  const currentActionPromptPlaceholder = aiActionType === "fix" 
    ? "e.g., Getting 'TypeError: cannot read property 'map' of undefined' on line 10..." 
    : `e.g., Generate Dijsktra's Algorithm code in ${currentLanguage}`;
  const currentActionLabelText = aiActionType === "fix" 
    ? `Describe the error in your ${currentLanguage} code:` 
    : `Describe the code you want to generate in ${currentLanguage}:`;

  return (
    <div className="relative flex flex-col mt-1 h-full w-full">
      <div className="relative h-34 bg-[#181825] rounded-lg p-2 ring-1 ring-gray-800/50 xl:flex xl:items-center justify-between xl:h-16">
        <div className="flex items-center gap-1.5">
          <div className="ml-4 flex items-center justify-center w-8 h-8 rounded bg-[#1e1e2e] ring-1 ring-gray-800/50">
            <Bot className="w-6 h-6 xl:w-7 xl:h-7 text-primary-400 " />
          </div>
          <span className="text-sm font-medium text-gray-300 hidden sm:inline">AI Assistant</span>
          <span className="text-sm font-medium text-gray-300 mx-2 my-4 sm:hidden">AI</span>
        </div>

        <div className="xl:flex xl:items-center gap-3 mx-2">
            <button
                onClick={() => openModalForAction("fix")}
                className="flex items-center gap-2 px-2 py-1 mb-1 xl:mb-0 xl:px-4 xl:py-2 bg-red-600 hover:bg-red-700 text-white
                          rounded-lg xl:text-md transition-colors"
                title="Fix error with AI"
            >
                <Wrench className="w-5 h-5" /> 
                Fix Error with AI
            </button>
            <button
                onClick={() => openModalForAction("generate")}
                className="flex items-center gap-2 px-2 py-1 mb-1 xl:mb-0 xl:px-4 xl:py-2 bg-blue-600 hover:bg-blue-700 text-white 
                          rounded-lg text-md transition-colors"
                title="Generate code with AI"
            >
                <Sparkles className="w-5 h-5" />
                Generate Code with AI
            </button>
        </div>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div
            className="bg-[#1e1e2e] border border-gray-700 rounded-xl w-full max-w-3xl max-h-[90vh] flex flex-col 
              shadow-2xl" // Slightly adjusted modal appearance
          >
            <div className="flex items-center justify-between p-4 border-b border-gray-700">
              <div className="flex items-center gap-3">
                {aiActionType === "fix" ? (
                    <Wrench className="w-6 h-6 text-red-400" />
                ) : (
                    <Sparkles className="w-6 h-6 text-blue-400" />
                )}
                <h2 className="text-xl font-semibold text-gray-100">{modalTitle}</h2>
              </div>
              <button
                onClick={closeModal}
                className="text-gray-500 hover:text-gray-200 transition-colors"
                aria-label="Close modal"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-6 space-y-4"> {/* Added space-y for better separation */}
              {aiActionType === "fix" && (
                <div className="space-y-1.5">
                  <label className="block text-sm font-medium text-gray-400">
                    Current code from editor (non-editable):
                  </label>
                  <pre className="bg-[#121212] p-3 rounded-md text-sm text-gray-300 overflow-auto max-h-48 ring-1 ring-gray-700 shadow-inner">
                    {codeToFix || "// No code found in editor or an issue fetching it."}
                  </pre>
                </div>
              )}
              
              <form onSubmit={handlePromptSubmit} className="space-y-3">
                <div>
                  <label htmlFor="aiPromptTextarea" className="block text-md font-medium text-gray-300 mb-2">
                    {currentActionLabelText}
                  </label>
                  <textarea
                    id="aiPromptTextarea"
                    value={prompt}
                    onChange={(e) => setPrompt(e.target.value)}
                    placeholder={currentActionPromptPlaceholder}
                    className="mt-4 w-full min-h-[100px] bg-[#282a36] text-gray-200 rounded-lg p-3 text-md
                      ring-1 ring-gray-700 focus:ring-primary-400/80 outline-none shadow-sm"
                    required
                  />
                </div>
                <div className="flex justify-end">
                  <button
                    type="submit"
                    disabled={isGenerating}
                    className={`flex items-center gap-2 px-5 py-2.5 text-sm font-medium text-white 
                      rounded-lg transition-colors disabled:opacity-60 disabled:cursor-not-allowed
                      ${aiActionType === "fix" 
                        ? "bg-red-600 hover:bg-red-700" 
                        : "bg-blue-600 hover:bg-blue-700"
                      }`}
                  >
                    {isGenerating ? (
                      <>
                        <Loader2 className="w-5 h-5 animate-spin" />
                        {aiActionType === "fix" ? "Analyzing..." : "Generating..."}
                      </>
                    ) : (
                      <>
                        {aiActionType === "fix" ? <Wrench className="w-5 h-5" /> : <Sparkles className="w-5 h-5" />}
                        {aiActionType === "fix" ? "Suggest Fix with AI" : "Generate with AI"}
                      </>
                    )}
                  </button>
                </div>
              </form>

              {error && (
                <div className="mt-2 p-3 bg-red-900/30 border border-red-700/50 rounded-lg text-red-300 text-sm shadow">
                  <div className="flex items-center gap-2">
                    <ShieldAlert className="w-5 h-5 text-red-400"/>
                    <p className="font-semibold">Error</p>
                  </div>
                  <p className="mt-1 opacity-90">{error}</p>
                </div>
              )}

              {generatedCode && (
                <div className="mt-2 space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-gray-300">
                      <Code className="w-5 h-5" />
                      <span className="font-medium text-sm">AI Suggestion:</span>
                    </div>
                    <button
                      onClick={copyToClipboard}
                      className="flex items-center gap-1.5 px-3 py-1.5 text-xs text-gray-400 
                        hover:text-gray-200 bg-[#282a36] rounded-md ring-1 ring-gray-700 
                        hover:ring-gray-600 transition-all shadow-sm"
                      title="Copy code"
                    >
                      <Copy className="w-3.5 h-3.5" />
                      Copy
                    </button>
                  </div>
                  <pre className="bg-[#121212] p-3 rounded-md text-sm text-gray-200 overflow-auto max-h-60 ring-1 ring-gray-700 shadow-inner">
                    {generatedCode}
                  </pre>
                </div>
              )}
            </div>

            {generatedCode && !error && ( // Show footer only if code is generated and no new error during generation
              <div className="border-t border-gray-700 p-4 flex justify-end items-center space-x-3">
                <button
                  onClick={closeModal}
                  className="px-4 py-2 text-sm text-gray-400 hover:text-gray-200 bg-[#282a36] 
                    rounded-lg ring-1 ring-gray-700 hover:ring-gray-600 transition-all shadow-sm"
                >
                  Cancel
                </button>
                <button
                  onClick={applyGeneratedCode}
                  className={`px-5 py-2 text-sm font-medium text-white rounded-lg 
                    hover:opacity-90 transition-opacity shadow-md
                    ${aiActionType === "fix" ? "bg-red-600" : "bg-blue-600"}`}
                >
                  Apply to Editor
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default AIAssistantPanel;