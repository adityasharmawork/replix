// "use client";
// import React, { useEffect, useState } from "react";
// import Link from "next/link";
// import DOMPurify from "isomorphic-dompurify";
// import { ExternalLink } from "lucide-react";

// type ProblemDetail = {
//   questionId: string;
//   questionFrontendId: string;
//   title: string;
//   content: string; // HTML
//   likes?: number;
//   dislikes?: number;
//   stats?: string; // JSON string
//   similarQuestions?: string; // JSON string of objects
//   topicTags?: { name: string }[];
//   companyTags?: any;
//   difficulty?: string;
//   isPaidOnly?: boolean;
//   url?: string;
//   hints?: string[];
//   solution?: any;
// };

// export default function QuestionPanel({ slug }: { slug: string }) {
//   const [detail, setDetail] = useState<ProblemDetail | null>(null);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState<string | null>(null);

//   useEffect(() => {
//     if (!slug) return;
//     let cancelled = false;
//     setLoading(true);
//     setError(null);
//     fetch(`/api/leetcode/problem/${encodeURIComponent(slug)}`)
//       .then(async (res) => {
//         if (!res.ok) {
//           const body = await res.json().catch(() => ({}));
//           throw new Error(body?.error ?? `HTTP ${res.status}`);
//         }
//         return res.json();
//       })
//       .then((data: ProblemDetail) => {
//         if (cancelled) return;
//         setDetail(data);
//       })
//       .catch((err) => {
//         if (cancelled) return;
//         console.error("fetch problem detail:", err);
//         setError(String(err?.message || err));
//         setDetail(null);
//       })
//       .finally(() => {
//         if (!cancelled) setLoading(false);
//       });
//     return () => {
//       cancelled = true;
//     };
//   }, [slug]);

//   const renderContent = (html: string) => {
//     try {
//       const clean = DOMPurify.sanitize(html, { ADD_TAGS: ["iframe"], ADD_ATTR: ["allow", "allowfullscreen", "frameborder", "scrolling"] });
//       return <div dangerouslySetInnerHTML={{ __html: clean }} />;
//     } catch (e) {
//       // fallback: render raw
//       return <div dangerouslySetInnerHTML={{ __html: html }} />;
//     }
//   };

//   if (loading) {
//     return (
//       <div className="p-6 frost-panel rounded-2xl">
//         <div className="animate-pulse h-8 bg-white/6 rounded mb-4 w-3/4" />
//         <div className="animate-pulse h-6 bg-white/6 rounded mb-2 w-1/3" />
//         <div className="animate-pulse h-48 bg-white/6 rounded" />
//       </div>
//     );
//   }

//   if (error) {
//     return (
//       <div className="p-6 frost-panel rounded-2xl text-rose-300">
//         Error loading problem: {error}
//       </div>
//     );
//   }

//   if (!detail) {
//     return (
//       <div className="p-6 frost-panel rounded-2xl text-gray-300">Select a problem to view details.</div>
//     );
//   }

//   const similar: { title: string; titleSlug: string; difficulty?: string }[] = (() => {
//     try {
//       if (!detail.similarQuestions) return [];
//       return JSON.parse(detail.similarQuestions);
//     } catch (e) {
//       return [];
//     }
//   })();

//   let stats: { totalAccepted?: string; totalSubmission?: string; acRate?: string } = {};
//   try {
//     stats = detail.stats ? JSON.parse(detail.stats) : {};
//   } catch (e) {}

//   return (
//     <aside className="max-w-2xl w-full p-6 frost-panel rounded-2xl overflow-y-auto">
//       <div className="flex flex-col gap-3">
//         <div className="flex items-start justify-between gap-4">
//           <div>
//             <h2 className="text-2xl font-semibold text-white">{detail.title}</h2>
//             <div className="text-sm text-gray-400 mt-1">#{detail.questionFrontendId} • {detail.difficulty}</div>
//           </div>

//           <div className="flex flex-col items-end gap-2">
//             <a href={detail.url} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 text-sm text-white/90 hover:text-white">
//               Open on LeetCode
//               <ExternalLink className="w-4 h-4" />
//             </a>
//             <div className="text-xs text-gray-400 mt-1">{stats.acRate ? `${stats.acRate} acceptance` : ""}</div>
//           </div>
//         </div>

//         {/* tags & meta */}
//         <div className="flex flex-wrap gap-2 mt-2">
//           {(detail.topicTags || []).map((t) => (
//             <span key={t.name} className="text-xs px-2 py-1 rounded-full bg-white/6">{t.name}</span>
//           ))}
//           {detail.companyTags && <span className="text-xs px-2 py-1 rounded-full bg-white/6">Companies</span>}
//           {detail.isPaidOnly && <span className="text-xs px-2 py-1 rounded-full bg-amber-500/20">Paid</span>}
//         </div>

//         {/* stats row */}
//         <div className="grid grid-cols-3 gap-4 mt-4 text-sm text-gray-300">
//           <div>
//             <div className="text-xs">Accepted</div>
//             <div className="font-medium text-white">{stats.totalAccepted ?? "-"}</div>
//           </div>
//           <div>
//             <div className="text-xs">Submissions</div>
//             <div className="font-medium text-white">{stats.totalSubmission ?? "-"}</div>
//           </div>
//           <div>
//             <div className="text-xs">Likes</div>
//             <div className="font-medium text-white">{detail.likes ?? "-"}</div>
//           </div>
//         </div>

//         <hr className="border-t border-white/6 my-4" />

//         {/* content */}
//         <div className="prose max-w-none text-sm text-gray-200">{renderContent(detail.content || "")}</div>

//         {/* hints (collapsible) */}
//         {detail.hints && detail.hints.length > 0 && (
//           <details className="mt-6 bg-white/3 p-4 rounded">
//             <summary className="font-medium">Hints</summary>
//             <ul className="mt-2 list-disc pl-5 text-sm text-gray-200 space-y-2">
//               {detail.hints.map((h, i) => (
//                 <li key={i}>{h}</li>
//               ))}
//             </ul>
//           </details>
//         )}

//         {/* similar questions */}
//         {similar.length > 0 && (
//           <div className="mt-6">
//             <h4 className="text-sm text-gray-300 font-semibold mb-2">Similar questions</h4>
//             <ul className="space-y-2 text-sm">
//               {similar.slice(0, 8).map((s) => (
//                 <li key={s.titleSlug}>
//                   <Link href={`/practice/leetcode/${s.titleSlug}`} className="text-white/90 hover:underline">
//                     {s.title} <span className="text-xs text-gray-400">({s.difficulty || ""})</span>
//                   </Link>
//                 </li>
//               ))}
//             </ul>
//           </div>
//         )}

//         <div className="h-8" />
//       </div>
//     </aside>
//   );
// }























// // src/components/QuestionPanel.tsx
// "use client";

// import React, { useEffect, useState } from "react";
// import Link from "next/link";
// import DOMPurify from "isomorphic-dompurify";
// import { ExternalLink } from "lucide-react";

// type ProblemDetail = {
//   questionId: string;
//   questionFrontendId: string;
//   title: string;
//   content: string; // HTML
//   likes?: number;
//   dislikes?: number;
//   stats?: string; // JSON string
//   similarQuestions?: string; // JSON string of objects
//   topicTags?: { name: string }[];
//   companyTags?: any;
//   difficulty?: string;
//   isPaidOnly?: boolean;
//   url?: string;
//   hints?: string[];
//   solution?: any;
// };

// export default function QuestionPanel({ slug }: { slug: string }) {
//   const [detail, setDetail] = useState<ProblemDetail | null>(null);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState<string | null>(null);

//   useEffect(() => {
//     if (!slug) return;
//     let cancelled = false;
//     setLoading(true);
//     setError(null);
//     fetch(`/api/leetcode/problem/${encodeURIComponent(slug)}`)
//       .then(async (res) => {
//         if (!res.ok) {
//           const body = await res.json().catch(() => ({}));
//           throw new Error(body?.error ?? `HTTP ${res.status}`);
//         }
//         return res.json();
//       })
//       .then((data: ProblemDetail) => {
//         if (cancelled) return;
//         setDetail(data);
//       })
//       .catch((err) => {
//         if (cancelled) return;
//         console.error("fetch problem detail:", err);
//         setError(String(err?.message || err));
//         setDetail(null);
//       })
//       .finally(() => {
//         if (!cancelled) setLoading(false);
//       });
//     return () => {
//       cancelled = true;
//     };
//   }, [slug]);

//   const renderContent = (html: string) => {
//     try {
//       const clean = DOMPurify.sanitize(html, {
//         ADD_TAGS: ["iframe"],
//         ADD_ATTR: ["allow", "allowfullscreen", "frameborder", "scrolling", "src"],
//       });
//       return <div dangerouslySetInnerHTML={{ __html: clean }} />;
//     } catch (e) {
//       return <div dangerouslySetInnerHTML={{ __html: html }} />;
//     }
//   };

//   if (loading) {
//     return (
//       <div className="p-6 frost-panel rounded-2xl w-full h-full">
//         <div className="animate-pulse h-8 bg-white/6 rounded mb-4 w-3/4" />
//         <div className="animate-pulse h-6 bg-white/6 rounded mb-2 w-1/3" />
//         <div className="animate-pulse h-48 bg-white/6 rounded" />
//       </div>
//     );
//   }

//   if (error) {
//     return (
//       <div className="p-6 frost-panel rounded-2xl w-full h-full text-rose-300">
//         Error loading problem: {error}
//       </div>
//     );
//   }

//   if (!detail) {
//     return (
//       <div className="p-6 frost-panel rounded-2xl w-full h-full text-gray-300">Select a problem to view details.</div>
//     );
//   }

//   const similar: { title: string; titleSlug: string; difficulty?: string }[] = (() => {
//     try {
//       if (!detail.similarQuestions) return [];
//       return JSON.parse(detail.similarQuestions);
//     } catch (e) {
//       return [];
//     }
//   })();

//   let stats: { totalAccepted?: string; totalSubmission?: string; acRate?: string } = {};
//   try {
//     stats = detail.stats ? JSON.parse(detail.stats) : {};
//   } catch (e) {}

//   return (
//     // Make the aside take full width of its parent and allow scrolling within available height
//     <aside className="w-full h-full p-6 frost-panel rounded-2xl overflow-auto">
//       <div className="flex flex-col gap-3 min-h-[40vh]">
//         <div className="flex items-start justify-between gap-4">
//           <div>
//             <h2 className="text-4xl font-semibold text-white mb-2">{detail.title}</h2>
//             <div className="text-md text-gray-400 mt-1">#{detail.questionFrontendId} &nbsp; &nbsp; • &nbsp; &nbsp; {detail.difficulty}</div>
//           </div>

          
//         </div>

//         {/* tags & meta */}
//         <div className="flex flex-wrap gap-2 my-4">
//           {(detail.topicTags || []).map((t) => (
//             <span key={t.name} className="text-xs px-2 py-1 rounded-full bg-white/6">{t.name}</span>
//           ))}
//           {detail.companyTags && <span className="text-xs px-2 py-1 rounded-full bg-white/6">Companies</span>}
//           {/* {detail.isPaidOnly && <span className="text-xs px-2 py-1 rounded-full bg-amber-500/20">Paid</span>} */}
//         </div>



//         {/* content */}
//         <div className="prose max-w-none text-md text-gray-200">{renderContent(detail.content || "")}</div>

//         {/* hints (collapsible) */}
//         {detail.hints && detail.hints.length > 0 && (
//           <details className="mt-6 bg-white/3 p-4 rounded">
//             <summary className="font-medium">Hints</summary>
//             <ul className="mt-2 list-disc pl-5 text-sm text-gray-200 space-y-2">
//               {detail.hints.map((h, i) => (
//                 <li key={i}>{h}</li>
//               ))}
//             </ul>
//           </details>
//         )}


//         {/* stats row */}
//         <hr className="border-t border-white/6 mt-4" />

//         <div className="grid grid-cols-3 gap-4 mt-4 text-sm text-gray-300">
//           <div>
//             <div className="text-xs">Accepted</div>
//             <div className="font-medium text-white">{stats.totalAccepted ?? "-"}</div>
//           </div>
//           <div>
//             <div className="text-xs">Submissions</div>
//             <div className="font-medium text-white">{stats.totalSubmission ?? "-"}</div>
//           </div>
//           <div>
//             <div className="text-xs">Likes</div>
//             <div className="font-medium text-white">{detail.likes ?? "-"}</div>
//           </div>
//         </div>

//         <hr className="border-t border-white/6 my-4" />

//         {/* similar questions */}
//         {similar.length > 0 && (
//           <div className="mt-6">
//             <h4 className="text-sm text-gray-300 font-semibold mb-2">Similar questions</h4>
//             <ul className="space-y-2 text-sm">
//               {similar.slice(0, 8).map((s) => (
//                 <li key={s.titleSlug}>
//                   <Link href={`/practice/leetcode/${s.titleSlug}`} className="text-white/90 hover:underline">
//                     {s.title} <span className="text-xs text-gray-400">({s.difficulty || ""})</span>
//                   </Link>
//                 </li>
//               ))}
//             </ul>
//           </div>
//         )}

//         <div className="flex flex-col items-end gap-2">
//             <a href={detail.url} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 text-sm text-white/90 hover:text-white">
//               Open on LeetCode
//               <ExternalLink className="w-4 h-4" />
//             </a>
//             <div className="text-xs text-gray-400 mt-1">{stats.acRate ? `${stats.acRate} acceptance` : ""}</div>
//           </div>

//         <div className="h-8" />
//       </div>
//     </aside>
//   );
// }










// // src/components/QuestionPanel.tsx
// "use client";

// import React, { useEffect, useState } from "react";
// import Link from "next/link";
// import DOMPurify from "isomorphic-dompurify";
// import { ExternalLink, HelpCircle, Eye, EyeOff } from "lucide-react";

// type ProblemDetail = {
//   questionId: string;
//   questionFrontendId: string;
//   title: string;
//   content: string; // HTML
//   likes?: number;
//   dislikes?: number;
//   stats?: string; // JSON string
//   similarQuestions?: string; // JSON string of objects
//   topicTags?: { name: string }[];
//   companyTags?: any;
//   difficulty?: "Easy" | "Medium" | "Hard";
//   isPaidOnly?: boolean;
//   url?: string;
//   hints?: string[];
//   solution?: any;
// };

// export default function QuestionPanel({ slug }: { slug: string }) {
//   const [detail, setDetail] = useState<ProblemDetail | null>(null);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState<string | null>(null);
//   const [isCollapsed, setIsCollapsed] = useState(false);

//   useEffect(() => {
//     if (!slug) return;
//     let cancelled = false;
//     setLoading(true);
//     setError(null);
//     setDetail(null); // Reset detail on new slug
//     setIsCollapsed(false); // Default to open when a new problem is fetched
    
//     fetch(`/api/leetcode/problem/${encodeURIComponent(slug)}`)
//       .then(async (res) => {
//         if (!res.ok) {
//           const body = await res.json().catch(() => ({}));
//           throw new Error(body?.error ?? `HTTP ${res.status}`);
//         }
//         return res.json();
//       })
//       .then((data: ProblemDetail) => {
//         if (cancelled) return;
//         setDetail(data);
//       })
//       .catch((err) => {
//         if (cancelled) return;
//         console.error("fetch problem detail:", err);
//         setError(String(err?.message || err));
//         setDetail(null);
//       })
//       .finally(() => {
//         if (!cancelled) setLoading(false);
//       });
      
//     return () => {
//       cancelled = true;
//     };
//   }, [slug]);
  
//   const toggleCollapse = () => {
//     setIsCollapsed(prev => !prev);
//   };

//   const getDifficultyColor = (diff: string | undefined) => {
//     switch (diff) {
//       case "Easy": return "text-green-400";
//       case "Medium": return "text-yellow-400";
//       case "Hard": return "text-red-400";
//       default: return "text-gray-400";
//     }
//   };

//   const renderContent = (html: string) => {
//     try {
//       const clean = DOMPurify.sanitize(html, {
//         ADD_TAGS: ["iframe"],
//         ADD_ATTR: ["allow", "allowfullscreen", "frameborder", "scrolling", "src"],
//       });
//       return <div dangerouslySetInnerHTML={{ __html: clean }} />;
//     } catch (e) {
//       return <div dangerouslySetInnerHTML={{ __html: html }} />;
//     }
//   };

//   if (loading) {
//     return (
//       <div className="p-6 bg-[#181825] rounded-xl ring-1 ring-gray-800/50 w-full h-full">
//         <div className="animate-pulse h-8 bg-gray-700/50 rounded mb-4 w-3/4" />
//         <div className="animate-pulse h-6 bg-gray-700/50 rounded mb-2 w-1/3" />
//         <div className="animate-pulse h-48 bg-gray-700/50 rounded" />
//       </div>
//     );
//   }

//   if (error) {
//     return (
//       <div className="p-6 bg-[#181825] rounded-xl ring-1 ring-gray-800/50 w-full h-full text-rose-400">
//         Error loading problem: {error}
//       </div>
//     );
//   }

//   if (!detail) {
//     return (
//       <div className="p-6 bg-[#181825] rounded-xl ring-1 ring-gray-800/50 w-full h-full text-gray-400">
//         Select a problem to view details.
//       </div>
//     );
//   }
  
//   const similar: { title: string; titleSlug: string; difficulty?: string }[] = (() => {
//     try {
//       if (!detail.similarQuestions) return [];
//       return JSON.parse(detail.similarQuestions);
//     } catch (e) {
//       return [];
//     }
//   })();

//   let stats: { totalAccepted?: string; totalSubmission?: string; acRate?: string } = {};
//   try {
//     stats = detail.stats ? JSON.parse(detail.stats) : {};
//   } catch (e) {}

//   return (
//     <div className="relative flex flex-col w-full h-full">
//       <div className="relative bg-[#181825] rounded-xl p-3 ring-1 ring-gray-800/50 flex flex-col select-none">
//         {/* Header */}
//         <div className="flex items-center justify-between mb-2">
//           <div className="flex items-center gap-2 flex-wrap">
//             <div className="flex items-center justify-center w-6 h-6 rounded-lg bg-[#1e1e2e] ring-1 ring-gray-800/50">
//               <HelpCircle className="w-4 h-4 text-white" />
//             </div>
//             <span className="text-sm font-medium text-gray-300 truncate max-w-[200px] md:max-w-xs">{detail.title}</span>
//             <span className={`text-xs px-2 py-0.5 rounded-full bg-[#1e1e2e] ring-1 ring-gray-800/50 ${getDifficultyColor(detail.difficulty)}`}>
//               {detail.difficulty}
//             </span>
//           </div>

//           <button
//             onClick={toggleCollapse}
//             className="flex items-center gap-1.5 px-2.5 py-1.5 text-xs text-gray-400 hover:text-gray-300 bg-[#1e1e2e] rounded-lg ring-1 ring-gray-800/50 hover:ring-gray-700/50 transition-all flex-shrink-0"
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
//             <div className="relative bg-[#1e1e2e]/50 backdrop-blur-sm border border-[#313244] rounded-xl p-4 overflow-auto max-h-[75vh]">
//               {/* tags & meta */}
//               <div className="flex flex-wrap gap-2 mb-4">
//                 {(detail.topicTags || []).map((t) => (
//                   <span key={t.name} className="text-xs px-2 py-1 rounded bg-gray-800/70 text-gray-400 ring-1 ring-gray-700/50">{t.name}</span>
//                 ))}
//               </div>

//               {/* content */}
//               <div className="prose prose-sm md:prose-base prose-invert max-w-none text-gray-300">{renderContent(detail.content || "")}</div>

//               {/* hints (collapsible) */}
//               {detail.hints && detail.hints.length > 0 && (
//                 <details className="mt-6 bg-gray-800/50 p-4 rounded-lg">
//                   <summary className="font-medium cursor-pointer text-gray-300">Hints</summary>
//                   <ul className="mt-2 list-disc pl-5 text-sm text-gray-400 space-y-2">
//                     {detail.hints.map((h, i) => (
//                       <li key={i} dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(h) }} />
//                     ))}
//                   </ul>
//                 </details>
//               )}

//               {/* stats row */}
//               <hr className="border-t border-gray-700/50 mt-6" />
//               <div className="grid grid-cols-3 gap-4 mt-4 text-sm text-gray-300">
//                 <div>
//                   <div className="text-xs text-gray-400">Accepted</div>
//                   <div className="font-medium text-white">{stats.totalAccepted ?? "-"}</div>
//                 </div>
//                 <div>
//                   <div className="text-xs text-gray-400">Submissions</div>
//                   <div className="font-medium text-white">{stats.totalSubmission ?? "-"}</div>
//                 </div>
//                 <div>
//                   <div className="text-xs text-gray-400">Likes</div>
//                   <div className="font-medium text-white">{detail.likes ?? "-"}</div>
//                 </div>
//               </div>

//               {/* similar questions */}
//               {similar.length > 0 && (
//                 <>
//                   <hr className="border-t border-gray-700/50 my-4" />
//                   <div className="mt-4">
//                     <h4 className="text-sm text-gray-300 font-semibold mb-2">Similar questions</h4>
//                     <ul className="space-y-2 text-sm">
//                       {similar.slice(0, 8).map((s) => (
//                         <li key={s.titleSlug}>
//                           <Link href={`/practice/leetcode/${s.titleSlug}`} className="text-blue-400 hover:underline">
//                             {s.title} <span className="text-xs text-gray-400">({s.difficulty || ""})</span>
//                           </Link>
//                         </li>
//                       ))}
//                     </ul>
//                   </div>
//                 </>
//               )}
              
//               <hr className="border-t border-gray-700/50 my-4" />
//               <div className="flex flex-col items-end gap-2 mt-4">
//                 <a href={detail.url} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 text-sm text-blue-400 hover:text-blue-300">
//                   Open on LeetCode
//                   <ExternalLink className="w-4 h-4" />
//                 </a>
//                 <div className="text-xs text-gray-400 mt-1">{stats.acRate ? `${stats.acRate} acceptance` : ""}</div>
//               </div>

//             </div>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }



















"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import DOMPurify from "isomorphic-dompurify";
import { ExternalLink, HelpCircle, Eye, EyeOff } from "lucide-react";

// Define the type for the props, including the new state and toggle handler
type QuestionPanelProps = {
  slug: string;
  isCollapsed: boolean;
  onToggleCollapse: () => void;
};

type ProblemDetail = {
  questionId: string;
  questionFrontendId: string;
  title: string;
  content: string;
  likes?: number;
  dislikes?: number;
  stats?: string;
  similarQuestions?: string;
  topicTags?: { name: string }[];
  difficulty?: "Easy" | "Medium" | "Hard";
  url?: string;
  hints?: string[];
};

// Update the function signature to accept the new props
export default function QuestionPanel({ slug, isCollapsed, onToggleCollapse }: QuestionPanelProps) {
  const [detail, setDetail] = useState<ProblemDetail | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!slug) return;
    let cancelled = false;
    setLoading(true);
    setError(null);
    setDetail(null);
    
    fetch(`/api/leetcode/problem/${encodeURIComponent(slug)}`)
      .then(async (res) => {
        if (!res.ok) {
          const body = await res.json().catch(() => ({}));
          throw new Error(body?.error ?? `HTTP ${res.status}`);
        }
        return res.json();
      })
      .then((data: ProblemDetail) => {
        if (cancelled) return;
        setDetail(data);
      })
      .catch((err) => {
        if (cancelled) return;
        console.error("fetch problem detail:", err);
        setError(String(err?.message || err));
        setDetail(null);
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });
      
    return () => {
      cancelled = true;
    };
  }, [slug]);
  
  const getDifficultyColor = (diff: string | undefined) => {
    switch (diff) {
      case "Easy": return "text-green-400";
      case "Medium": return "text-yellow-400";
      case "Hard": return "text-red-400";
      default: return "text-gray-400";
    }
  };

  const renderContent = (html: string) => {
    try {
      const clean = DOMPurify.sanitize(html);
      return <div dangerouslySetInnerHTML={{ __html: clean }} />;
    } catch (e) {
      return <div dangerouslySetInnerHTML={{ __html: html }} />;
    }
  };

  // Restored full loading, error, and detail guards
  if (loading) {
    return (
      <div className="flex items-center justify-center w-full h-full p-6 bg-[#181825] rounded-xl ring-1 ring-gray-800/50">
        <p className="text-gray-400">Loading Problem...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center w-full h-full p-6 bg-[#181825] rounded-xl ring-1 ring-gray-800/50">
        <p className="text-red-400">Error: {error}</p>
      </div>
    );
  }

  if (!detail) {
    return (
      <div className="flex items-center justify-center w-full h-full p-6 bg-[#181825] rounded-xl ring-1 ring-gray-800/50">
        <p className="text-gray-400">Select a problem to view details.</p>
      </div>
    );
  }
  
  // Restored JSON parsing logic
  const similar: { title: string; titleSlug: string; difficulty?: string }[] = (() => {
    try {
      if (!detail.similarQuestions) return [];
      return JSON.parse(detail.similarQuestions);
    } catch (e) {
      return [];
    }
  })();

  let stats: { totalAccepted?: string; totalSubmission?: string; acRate?: string } = {};
  try {
    stats = detail.stats ? JSON.parse(detail.stats) : {};
  } catch (e) {}

  return (
    <div className="relative flex flex-col w-full h-full">
      <div className="relative bg-[#181825] rounded-xl p-3 ring-1 ring-gray-800/50 flex flex-col select-none h-full">
        {/* Header */}
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2 flex-wrap">
            <div className="flex items-center justify-center w-6 h-6 rounded-lg bg-[#1e1e2e] ring-1 ring-gray-800/50">
              <HelpCircle className="w-4 h-4 text-white" />
            </div>
            <span className="text-sm font-medium text-gray-300 truncate max-w-[200px] md:max-w-xs">{detail.title}</span>
            <span className={`text-xs px-2 py-0.5 rounded-full bg-[#1e1e2e] ring-1 ring-gray-800/50 ${getDifficultyColor(detail.difficulty)}`}>
              {detail.difficulty}
            </span>
          </div>

          <button
            onClick={onToggleCollapse}
            className="flex items-center gap-1.5 px-2.5 py-1.5 text-xs text-gray-400 hover:text-gray-300 bg-[#1e1e2e] rounded-lg ring-1 ring-gray-800/50 hover:ring-gray-700/50 transition-all flex-shrink-0"
          >
            {isCollapsed ? (
              <><Eye className="w-3.5 h-3.5" /> Show</>
            ) : (
              <><EyeOff className="w-3.5 h-3.5" /> Hide</>
            )}
          </button>
        </div>

        {/* Content Area */}
        {!isCollapsed && (
          <div className="relative flex flex-col flex-1 min-h-0">
            <div className="relative bg-[#1e1e2e]/50 backdrop-blur-sm border border-[#313244] rounded-xl p-4 overflow-auto h-full">
              
              {/* --- START OF RESTORED CONTENT --- */}
              
              {/* tags & meta */}
              <div className="flex flex-wrap gap-2 mb-4">
                {(detail.topicTags || []).map((t) => (
                  <span key={t.name} className="text-xs px-2 py-1 rounded bg-gray-800/70 text-gray-400 ring-1 ring-gray-700/50">{t.name}</span>
                ))}
              </div>

              {/* content */}
              <div className="prose prose-sm md:prose-base prose-invert max-w-none text-gray-300">{renderContent(detail.content || "")}</div>

              {/* hints (collapsible) */}
              {detail.hints && detail.hints.length > 0 && (
                <details className="mt-6 bg-gray-800/50 p-4 rounded-lg">
                  <summary className="font-medium cursor-pointer text-gray-300">Hints</summary>
                  <ul className="mt-2 list-disc pl-5 text-sm text-gray-400 space-y-2">
                    {detail.hints.map((h, i) => (
                      <li key={i} dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(h) }} />
                    ))}
                  </ul>
                </details>
              )}

              {/* stats row */}
              <hr className="border-t border-gray-700/50 mt-6" />
              <div className="grid grid-cols-3 gap-4 mt-4 text-sm text-gray-300">
                <div>
                  <div className="text-xs text-gray-400">Accepted</div>
                  <div className="font-medium text-white">{stats.totalAccepted ?? "-"}</div>
                </div>
                <div>
                  <div className="text-xs text-gray-400">Submissions</div>
                  <div className="font-medium text-white">{stats.totalSubmission ?? "-"}</div>
                </div>
                <div>
                  <div className="text-xs text-gray-400">Likes</div>
                  <div className="font-medium text-white">{detail.likes ?? "-"}</div>
                </div>
              </div>

              {/* similar questions */}
              {similar.length > 0 && (
                <>
                  <hr className="border-t border-gray-700/50 my-4" />
                  <div className="mt-4">
                    <h4 className="text-sm text-gray-300 font-semibold mb-2">Similar questions</h4>
                    <ul className="space-y-2 text-sm">
                      {similar.slice(0, 8).map((s) => (
                        <li key={s.titleSlug}>
                          <Link href={`/practice/leetcode/${s.titleSlug}`} className="text-blue-400 hover:underline">
                            {s.title} <span className="text-xs text-gray-400">({s.difficulty || ""})</span>
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                </>
              )}
              
              <hr className="border-t border-gray-700/50 my-4" />
              <div className="flex flex-col items-end gap-2 mt-4">
                <a href={detail.url} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 text-sm text-blue-400 hover:text-blue-300">
                  Open on LeetCode
                  <ExternalLink className="w-4 h-4" />
                </a>
                <div className="text-xs text-gray-400 mt-1">{stats.acRate ? `${stats.acRate} acceptance` : ""}</div>
              </div>
              {/* --- END OF RESTORED CONTENT --- */}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}