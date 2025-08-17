// "use client";

// import React, { useEffect, useMemo, useState } from "react";
// import { motion } from "framer-motion";
// import { Card, CardContent, CardHeader } from "@/components/ui/card"; // shadcn style (project shortcut)
// import { Button } from "@/components/ui/button";
// import { Search } from "lucide-react";
// import CodeShowcase from "@/components/CodeShowcase";
// import NavigationHeader from "@/components/NavigationHeader";
// import ParticlesBackground from "@/components/ParticlesBackground";

// // Replix Learning single-file landing + interactive learning layout
// // - Uses Tailwind + shadcn-style components
// // - Includes hero, learning tracks, course cards, lesson viewer, cheat-sheets, notes, quizzes
// // - Progress stored in localStorage for a simple first-pass implementation

// // --- sample data (replace with API calls later) ---
// const LANGUAGES = [
//   "C++",
//   "Java",
//   "Python",
//   "Rust",
//   "Go",
//   "Swift",
//   "Ruby",
//   "JavaScript",
//   "TypeScript",
//   "C#",
// ];

// const SAMPLE_COURSES = [
//   {
//     id: "python-basics",
//     lang: "Python",
//     title: "Python: From Zero to Building",
//     description: "A beginner-friendly, hands-on pathway to building real Python programs.",
//     level: "Beginner",
//     lessons: [
//       { id: "py-01", title: "Intro & Setup", length: 6 },
//       { id: "py-02", title: "Variables & Types", length: 12 },
//       { id: "py-03", title: "Control Flow", length: 18 },
//       { id: "py-04", title: "Functions & Modules", length: 20 },
//       { id: "py-05", title: "File I/O & Projects", length: 25 },
//     ],
//   },
//   {
//     id: "cpp-roadmap",
//     lang: "C++",
//     title: "C++ Essentials: Systems & Performance",
//     description: "A structured path covering fundamentals to intermediate C++ idioms.",
//     level: "Beginner → Intermediate",
//     lessons: [
//       { id: "cpp-01", title: "Setup & Tooling", length: 8 },
//       { id: "cpp-02", title: "Pointers & Memory", length: 22 },
//       { id: "cpp-03", title: "STL Basics", length: 16 },
//     ],
//   },
// ];

// // ---------- helpers ----------
// const storageKey = (courseId) => `replix_learning_progress_${courseId}`;

// // ---------- components (internal) ----------
// function Hero() {
//   return (
//     <section className="relative pt-28 pb-14 text-center">
//       <div className="max-w-5xl mx-auto">
//         <div className="inline-block relative">
//           <div className="text-sm mb-6 font-mono text-gray-300 inline-flex items-center gap-2 bg-white/3 px-4 py-1.5 rounded-full">
//             <span>New</span>
//             <span className="text-xs text-gray-400">Guided paths • Cheatsheets • Live editor</span>
//           </div>

//           <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight text-white">
//             Replix Learning — Learn to Code the Right Way
//           </h1>
//           <p className="mt-6 text-lg text-gray-300 max-w-3xl mx-auto">
//             Structured, hands-on courses for 10+ languages. Step-by-step lessons, instant code runner, cheatsheets, in-browser examples and progress tracking.
//           </p>

//           <div className="mt-8 flex items-center justify-center gap-3">
//             <Button className="px-6 py-3">Browse Learning Paths</Button>
//             <a href="#tracks" className="inline-flex items-center px-4 py-3 rounded-md ring-1 ring-white/10">Explore tracks</a>
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// }

// function SearchBar({ q, setQ }) {
//   return (
//     <div className="w-full max-w-3xl mx-auto mt-8">
//       <div className="flex items-center gap-2 bg-zinc-900 ring-1 ring-zinc-800 rounded-lg px-3 py-2">
//         <Search className="w-5 h-5 text-gray-300" />
//         <input
//           value={q}
//           onChange={(e) => setQ(e.target.value)}
//           placeholder="Search languages, courses, or topics (e.g. arrays, file IO)"
//           className="bg-transparent placeholder:text-gray-400 outline-none w-full text-white"
//         />
//         <Button size="sm">Search</Button>
//       </div>
//     </div>
//   );
// }

// function TrackGrid({ onSelectCourse }) {
//   return (
//     <div id="tracks" className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
//       {SAMPLE_COURSES.map((c) => (
//         <motion.div key={c.id} whileHover={{ y: -6 }} className="frost-panel p-6 rounded-2xl">
//           <div className="flex items-center justify-between mb-4">
//             <div>
//               <h3 className="text-xl font-semibold text-white">{c.title}</h3>
//               <p className="text-sm text-gray-400 mt-1">{c.description}</p>
//             </div>
//             <div className="text-right">
//               <div className="text-sm text-gray-300">{c.lang}</div>
//               <div className="text-xs text-gray-500">{c.level}</div>
//             </div>
//           </div>

//           <div className="mt-4 flex items-center justify-between">
//             <div className="flex gap-2">
//               <Button size="sm" onClick={() => onSelectCourse(c)} >Start</Button>
//               <Button variant="ghost" size="sm">Preview</Button>
//             </div>
//             <div className="text-sm text-gray-400">{c.lessons.length} lessons</div>
//           </div>
//         </motion.div>
//       ))}
//     </div>
//   );
// }

// function CoursePanel({ course, onSelectLesson, progress, markLessonComplete }) {
//   if (!course) return null;
//   return (
//     <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//       <aside className="md:col-span-1 frost-panel p-6 rounded-xl">
//         <h3 className="text-lg font-semibold text-white">{course.title}</h3>
//         <p className="text-sm text-gray-400 mt-2">{course.description}</p>

//         <div className="mt-6">
//           <h4 className="text-sm text-gray-300">Lessons</h4>
//           <ul className="mt-3 space-y-2">
//             {course.lessons.map((l, idx) => (
//               <li key={l.id} className="flex items-center justify-between">
//                 <button onClick={() => onSelectLesson(l)} className="text-left w-full">
//                   <div className={`p-2 rounded-md w-full ${progress?.completed?.includes(l.id) ? 'bg-white/5' : ''}`}>
//                     <div className="text-sm text-white font-medium">{idx + 1}. {l.title}</div>
//                     <div className="text-xs text-gray-400">{l.length} min</div>
//                   </div>
//                 </button>
//                 <div>
//                   <Button size="sm" onClick={() => markLessonComplete(l.id)}>✓</Button>
//                 </div>
//               </li>
//             ))}
//           </ul>
//         </div>

//         <div className="mt-6 text-sm text-gray-400">
//           <div>Progress: <strong className="text-white">{progress?.completed?.length || 0}/{course.lessons.length}</strong></div>
//         </div>
//       </aside>

//       <main className="md:col-span-2 frost-panel p-6 rounded-xl">
//         <LessonViewer course={course} progress={progress} markLessonComplete={markLessonComplete} />
//       </main>
//     </div>
//   );
// }

// function LessonViewer({ course, progress, markLessonComplete }) {
//   const [active, setActive] = useState(course?.lessons?.[0]);
//   const [showCheatsheet, setShowCheatsheet] = useState(false);
//   const exampleCode = useMemo(() => {
//     // Minimal language-tailored example — replace with real lesson content
//     if (!active) return "";
//     if (course.lang === "Python") return `# ${active.title}\nprint(\"Hello from Replix Learning\")`;
//     if (course.lang === "C++") return `#include <bits/stdc++.h>\nusing namespace std;\nint main(){ cout<<\"Hello Replix\"; }`;
//     return `// ${active.title}\nconsole.log('Hello from Replix');`;
//   }, [active, course]);

//   useEffect(() => {
//     setActive(course.lessons[0]);
//   }, [course]);

//   if (!course) return <div />;

//   return (
//     <div>
//       <div className="flex items-start justify-between gap-4">
//         <div>
//           <h3 className="text-xl font-semibold text-white">{active?.title}</h3>
//           <p className="text-sm text-gray-400 mt-1">{course.lang} • {active?.length} min</p>
//         </div>

//         <div className="flex items-center gap-3">
//           <Button size="sm" onClick={() => setShowCheatsheet(true)}>Cheatsheet</Button>
//           <Button size="sm" variant="outline" onClick={() => markLessonComplete(active.id)}>Mark complete</Button>
//         </div>
//       </div>

//       <div className="mt-6 grid grid-cols-1 lg:grid-cols-2 gap-6">
//         <div className="prose prose-invert max-w-none">
//           <h4 className="text-white">Lesson Notes</h4>
//           <p className="text-gray-300">This lesson explains {active?.title}. You'll see clear examples and incremental hands-on steps. Try the example on the right and experiment with inputs.</p>

//           <ul className="text-gray-300 mt-3 list-disc ml-5">
//             <li>Short summary</li>
//             <li>Key concepts and tips</li>
//             <li>Common pitfalls</li>
//           </ul>

//           <div className="mt-6">
//             <h5 className="text-white">Example</h5>
//             <pre className="rounded-md p-4 bg-zinc-900 text-sm overflow-auto">{exampleCode}</pre>
//           </div>

//           <div className="mt-6">
//             <h5 className="text-white">Exercises</h5>
//             <ol className="text-gray-300 list-decimal ml-5">
//               <li>Try modifying example to accept input</li>
//               <li>Write a small function to do X</li>
//             </ol>
//           </div>
//         </div>

//         <div>
//           <Card className="h-full">
//             <CardHeader>
//               <div className="flex items-center justify-between">
//                 <div className="text-sm font-medium">Interactive Editor</div>
//                 <div className="text-xs text-gray-400">Run your code instantly</div>
//               </div>
//             </CardHeader>
//             <CardContent>
//               {/* Reuse your site's CodeShowcase component that hooks into Replix's runner */}
//               <CodeShowcase initialCode={exampleCode} language={course.lang} />

//               <div className="mt-4 flex items-center gap-2">
//                 <Button size="sm" onClick={() => markLessonComplete(active.id)}>I've finished this lesson</Button>
//                 <Button size="sm" variant="ghost">Ask a doubt</Button>
//               </div>
//             </CardContent>
//           </Card>

//           {showCheatsheet && (
//             <div className="mt-4 p-4 bg-zinc-900 rounded-md">
//               <h4 className="text-white">Cheatsheet — {course.lang}</h4>
//               <ul className="text-gray-300 mt-2 list-disc ml-5">
//                 <li>Common syntax snippets</li>
//                 <li>Quick tips & best practices</li>
//                 <li>1-line solutions to common tasks</li>
//               </ul>
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// }

// export default function ReplixLearningPage() {
//   const [query, setQuery] = useState("");
//   const [selectedCourse, setSelectedCourse] = useState(null);
//   const [progressMap, setProgressMap] = useState({});

//   useEffect(() => {
//     // load progress for the two sample courses if available
//     const map = {};
//     for (const c of SAMPLE_COURSES) {
//       try {
//         const p = JSON.parse(localStorage.getItem(storageKey(c.id)) || "null");
//         map[c.id] = p || { completed: [] };
//       } catch (e) {
//         map[c.id] = { completed: [] };
//       }
//     }
//     setProgressMap(map);
//   }, []);

//   function onSelectCourse(course) {
//     setSelectedCourse(course);
//   }

//   function markLessonComplete(lessonId) {
//     if (!selectedCourse) return;
//     const key = selectedCourse.id;
//     const curr = progressMap[key] || { completed: [] };
//     if (!curr.completed.includes(lessonId)) curr.completed.push(lessonId);
//     const next = { ...progressMap, [key]: curr };
//     setProgressMap(next);
//     try {
//       localStorage.setItem(storageKey(key), JSON.stringify(curr));
//     } catch (e) {}
//   }

//   const filteredLanguages = useMemo(() => {
//     if (!query) return LANGUAGES;
//     return LANGUAGES.filter((l) => l.toLowerCase().includes(query.toLowerCase()));
//   }, [query]);

//   return (
//     <div className="relative min-h-screen selection:bg-white/20 selection:text-white">
//       <ParticlesBackground />
//       <NavigationHeader />

//       <main className="relative pt-24 pb-20 px-4">
//         <div className="max-w-7xl mx-auto">
//           <Hero />

//           <SearchBar q={query} setQ={setQuery} />

//           <section className="mt-12">
//             <h2 className="text-2xl text-white font-bold">Learning Paths</h2>
//             <p className="text-gray-400 mt-2">Choose a guided path by language or by roadmap.</p>

//             <div className="mt-6 flex gap-3 overflow-x-auto pb-3">
//               {filteredLanguages.map((lang) => (
//                 <button
//                   key={lang}
//                   className="px-4 py-2 rounded-full ring-1 ring-zinc-800 bg-white/3 text-white text-sm"
//                 >
//                   {lang}
//                 </button>
//               ))}
//             </div>

//             <TrackGrid onSelectCourse={onSelectCourse} />
//           </section>

//           <section className="mt-12">
//             {selectedCourse ? (
//               <CoursePanel
//                 course={selectedCourse}
//                 onSelectLesson={(l) => { /* for brevity, not implemented: set active lesson */ }}
//                 progress={progressMap[selectedCourse.id]}
//                 markLessonComplete={markLessonComplete}
//               />
//             ) : (
//               <div className="mt-12 frost-panel p-8 rounded-2xl text-center">
//                 <h3 className="text-xl font-semibold text-white">Pick a path to start learning</h3>
//                 <p className="text-gray-400 mt-2">Select a course above and get instant access to lessons, examples and the interactive editor.</p>
//               </div>
//             )}
//           </section>

//           <section className="my-24">
//             <div className="grid md:grid-cols-3 gap-6">
//               <div className="frost-panel p-6 rounded-2xl">
//                 <h4 className="text-lg font-semibold text-white">Cheatsheets</h4>
//                 <p className="text-gray-400 mt-2">One-page quick references for each language — perfect while coding.</p>
//               </div>

//               <div className="frost-panel p-6 rounded-2xl">
//                 <h4 className="text-lg font-semibold text-white">Guided Projects</h4>
//                 <p className="text-gray-400 mt-2">Mini-projects at the end of each path to consolidate learning.</p>
//               </div>

//               <div className="frost-panel p-6 rounded-2xl">
//                 <h4 className="text-lg font-semibold text-white">Progress & Badges</h4>
//                 <p className="text-gray-400 mt-2">Earn badges, track streaks, and display your profile mastery.</p>
//               </div>
//             </div>
//           </section>

//         </div>
//       </main>
//     </div>
//   );
// }


















// "use client";

// import React, { useEffect, useMemo, useState } from "react";
// import { motion } from "framer-motion";
// import { Card, CardContent, CardHeader } from "@/components/ui/card";
// import { Button } from "@/components/ui/button";
// import { Search, Check, ChevronLeft, ChevronRight } from "lucide-react";
// import CodeShowcase from "@/components/CodeShowcase";
// import NavigationHeader from "@/components/NavigationHeader";
// import ParticlesBackground from "@/components/ParticlesBackground";

// // -----------------------------
// // Replix Learning — Fully functional client-only implementation
// // - Single-file page for quick integration (replace src/app/learning/page.tsx)
// // - Uses localStorage to persist progress, badges, quiz results and doubts
// // - Integrates with existing CodeShowcase if present; falls back to a lightweight in-browser JS runner for JS/TS lessons
// // - Includes: search, filter by language, course selection, lesson navigation, cheatsheets, quizzes, badges, doubts
// // - No external state or server required for basic functionality
// // -----------------------------

// // ---------- sample content (replace with real API later) ----------
// const LANGUAGES = [
//   "C++",
//   "Java",
//   "Python",
//   "Rust",
//   "Go",
//   "Swift",
//   "Ruby",
//   "JavaScript",
//   "TypeScript",
//   "C#",
// ];

// const SAMPLE_COURSES = [
//   {
//     id: "python-basics",
//     lang: "Python",
//     title: "Python: From Zero to Building",
//     description: "Beginner-friendly, hands-on pathway to building real Python programs.",
//     level: "Beginner",
//     lessons: [
//       { id: "py-01", title: "Intro & Setup", length: 6, content: "# Python setup and first print statement" },
//       { id: "py-02", title: "Variables & Types", length: 12, content: "# Variables, numbers, strings" },
//       { id: "py-03", title: "Control Flow", length: 18, content: "# if / for / while" },
//       { id: "py-04", title: "Functions & Modules", length: 20, content: "# def, import" },
//       { id: "py-05", title: "File I/O & Projects", length: 25, content: "# open, read, write" },
//     ],
//     quiz: {
//       id: "py-q1",
//       questions: [
//         { id: "q1", q: "What keyword defines a function in Python?", a: ["function", "def", "fn", "fun"], correct: 1 },
//         { id: "q2", q: "Which of these is immutable?", a: ["list", "dict", "tuple", "set"], correct: 2 },
//       ],
//     },
//     cheatsheet: [
//       "print(value) — print to console",
//       "def name(args): — define a function",
//       "for x in iterable: — for loop",
//     ],
//   },

//   {
//     id: "js-roadmap",
//     lang: "JavaScript",
//     title: "JavaScript Essentials",
//     description: "A practical path to modern JavaScript, DOM and Node basics.",
//     level: "Beginner",
//     lessons: [
//       { id: "js-01", title: "Intro & Setup", length: 6, content: "// hello world" },
//       { id: "js-02", title: "Variables & Types", length: 10, content: "// let / const / var" },
//       { id: "js-03", title: "Functions & Scope", length: 16, content: "// function examples" },
//       { id: "js-04", title: "DOM & Events", length: 24, content: "// document.querySelector" },
//     ],
//     quiz: {
//       id: "js-q1",
//       questions: [
//         { id: "q1", q: "Which keyword declares a block-scoped variable?", a: ["var", "let", "const", "def"], correct: 1 },
//       ],
//     },
//     cheatsheet: [
//       "console.log(value)",
//       "const a = 1; // constant",
//       "array.map(fn)",
//     ],
//   },
// ];

// // ---------- helpers ----------
// const storageKey = (k: string) => `replix_learning_${k}`;

// function loadProgress(courseId: string) {
//   try {
//     const raw = localStorage.getItem(storageKey(`progress_${courseId}`));
//     return raw ? JSON.parse(raw) : { completed: [] };
//   } catch (e) {
//     return { completed: [] };
//   }
// }
// function saveProgress(courseId: string, progress: any) {
//   try {
//     localStorage.setItem(storageKey(`progress_${courseId}`), JSON.stringify(progress));
//   } catch (e) {}
// }

// function loadBadges() {
//   try {
//     const raw = localStorage.getItem(storageKey("badges"));
//     return raw ? JSON.parse(raw) : [];
//   } catch (e) {
//     return [];
//   }
// }
// function saveBadges(badges: any[]) {
//   try {
//     localStorage.setItem(storageKey("badges"), JSON.stringify(badges));
//   } catch (e) {}
// }

// function loadQuizResult(quizId: string) {
//   try {
//     const raw = localStorage.getItem(storageKey(`quiz_${quizId}`));
//     return raw ? JSON.parse(raw) : null;
//   } catch (e) {
//     return null;
//   }
// }
// function saveQuizResult(quizId: string, payload: any) {
//   try {
//     localStorage.setItem(storageKey(`quiz_${quizId}`), JSON.stringify(payload));
//   } catch (e) {}
// }

// function useWindowReady() {
//   const [ready, setReady] = useState(false);
//   useEffect(() => setReady(true), []);
//   return ready;
// }

// // ---------- small UI components ----------
// function BadgeList({ badges, onClear }: { badges: string[]; onClear: () => void }) {
//   if (!badges || badges.length === 0) return null;
//   return (
//     <div className="mt-4 flex items-center gap-3">
//       {badges.map((b) => (
//         <div key={b} className="px-3 py-1 bg-white/5 rounded-full text-sm">
//           {b}
//         </div>
//       ))}
//       <button onClick={onClear} className="ml-2 text-xs text-gray-400">Clear</button>
//     </div>
//   );
// }

// function ProgressBar({ completed, total }: { completed: number; total: number }) {
//   const pct = total === 0 ? 0 : Math.round((completed / total) * 100);
//   return (
//     <div className="w-full bg-white/5 rounded-md overflow-hidden h-3">
//       <div style={{ width: `${pct}%` }} className="h-3 bg-gradient-to-r from-green-400 to-blue-400" />
//     </div>
//   );
// }

// // Lightweight in-browser JS runner (only for JS/TS demo)
// function JsRunner({ code, setOutput }: { code: string; setOutput: (s: string) => void }) {
//   function run() {
//     try {
//       // eslint-disable-next-line no-new-func
//       const fn = new Function("console", code);
//       const logs: any[] = [];
//       const consoleProxy = {
//         log: (...args: any[]) => logs.push(args.map(String).join(" ")),
//         error: (...args: any[]) => logs.push(args.map(String).join(" ")),
//       };
//       fn(consoleProxy);
//       setOutput(logs.join("\n") || "(no output)");
//     } catch (err: any) {
//       setOutput(String(err));
//     }
//   }

//   return <Button onClick={run}>Run (JS)</Button>;
// }

// // Quiz component
// function Quiz({ quiz, onFinish }: { quiz: any; onFinish: (score: number) => void }) {
//   const [answers, setAnswers] = useState<Record<string, number>>({});

//   function setAnswer(qId: string, idx: number) {
//     setAnswers((s) => ({ ...s, [qId]: idx }));
//   }

//   function submit() {
//     let correct = 0;
//     for (const q of quiz.questions) {
//       if (answers[q.id] === q.correct) correct++;
//     }
//     const pct = Math.round((correct / quiz.questions.length) * 100);
//     onFinish(pct);
//   }

//   return (
//     <div className="mt-4">
//       {quiz.questions.map((q: any) => (
//         <div key={q.id} className="p-4 bg-zinc-900 rounded-md mb-3">
//           <div className="font-medium text-white">{q.q}</div>
//           <div className="mt-2 flex flex-col gap-2">
//             {q.a.map((opt: string, i: number) => (
//               <label key={i} className="inline-flex items-center gap-2">
//                 <input
//                   type="radio"
//                   name={q.id}
//                   checked={answers[q.id] === i}
//                   onChange={() => setAnswer(q.id, i)}
//                 />
//                 <span className="text-gray-300">{opt}</span>
//               </label>
//             ))}
//           </div>
//         </div>
//       ))}

//       <div className="flex gap-2">
//         <Button onClick={submit}>Submit Quiz</Button>
//       </div>
//     </div>
//   );
// }

// // Doubt board (client-side only)
// function DoubtBoard({ courseId }: { courseId: string | null }) {
//   const [q, setQ] = useState("");
//   const [list, setList] = useState<any[]>([]);

//   useEffect(() => {
//     try {
//       const raw = localStorage.getItem(storageKey(`doubts_${courseId || "global"}`));
//       setList(raw ? JSON.parse(raw) : []);
//     } catch (e) {
//       setList([]);
//     }
//   }, [courseId]);

//   function post() {
//     if (!q.trim()) return;
//     const item = { id: Date.now(), text: q, courseId, answered: false };
//     const next = [item, ...list];
//     setList(next);
//     localStorage.setItem(storageKey(`doubts_${courseId || "global"}`), JSON.stringify(next));
//     setQ("");
//   }

//   return (
//     <div className="mt-6">
//       <h4 className="text-white font-semibold">Ask a Doubt</h4>
//       <div className="mt-2 flex gap-2">
//         <input
//           value={q}
//           onChange={(e) => setQ(e.target.value)}
//           placeholder="What's unclear? Ask here — community and mentors will help"
//           className="flex-1 bg-zinc-900 p-2 rounded-md outline-none text-white"
//         />
//         <Button onClick={post}>Post</Button>
//       </div>

//       <div className="mt-4 space-y-2">
//         {list.map((it) => (
//           <div key={it.id} className="p-3 bg-white/3 rounded-md">
//             <div className="text-sm text-gray-100">{it.text}</div>
//             <div className="text-xs text-gray-400 mt-1">{new Date(it.id).toLocaleString()}</div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }

// // -----------------------------
// // Main page component
// // -----------------------------
// export default function ReplixLearningPage() {
//   const ready = useWindowReady();
//   const [query, setQuery] = useState("");
//   const [selectedCourse, setSelectedCourse] = useState<any | null>(null);
//   const [activeLesson, setActiveLesson] = useState<any | null>(null);
//   const [progress, setProgress] = useState<{ completed: string[] }>({ completed: [] });
//   const [badges, setBadges] = useState<string[]>(loadBadges());
//   const [output, setOutput] = useState("");
//   const [code, setCode] = useState("");
//   const [showCheatsheet, setShowCheatsheet] = useState(false);
//   const [showQuiz, setShowQuiz] = useState(false);

//   useEffect(() => {
//     if (selectedCourse) {
//       setProgress(loadProgress(selectedCourse.id));
//       setActiveLesson(selectedCourse.lessons[0]);
//       setCode(selectedCourse.lessons[0]?.content || "");
//     }
//   }, [selectedCourse]);

//   function selectCourse(c: any) {
//     setSelectedCourse(c);
//     setShowCheatsheet(false);
//     setShowQuiz(false);
//   }

//   function markLessonComplete(lessonId: string) {
//     if (!selectedCourse) return;
//     const current = loadProgress(selectedCourse.id);
//     if (!current.completed.includes(lessonId)) {
//       current.completed.push(lessonId);
//       saveProgress(selectedCourse.id, current);
//       setProgress(current);

//       // award badge if course completed
//       if (current.completed.length >= selectedCourse.lessons.length) {
//         const badge = `${selectedCourse.title} — Completed`;
//         const existing = loadBadges();
//         if (!existing.includes(badge)) {
//           const next = [...existing, badge];
//           setBadges(next);
//           saveBadges(next);
//         }
//       }
//     }
//   }

//   function gotoLesson(idx: number) {
//     const l = selectedCourse.lessons[idx];
//     setActiveLesson(l);
//     setCode(l.content || "");
//     setOutput("");
//   }

//   function runCode() {
//     setOutput("Running...");
//     // If lesson language is JS/TS, run in-browser
//     if (selectedCourse?.lang === "JavaScript" || selectedCourse?.lang === "TypeScript") {
//       try {
//         // Very minimal sandbox: run in Function
//         // Not secure for untrusted code — this is a demo runner
//         // eslint-disable-next-line no-new-func
//         const fn = new Function("console", code);
//         const logs: string[] = [];
//         const consoleProxy = { log: (...args: any[]) => logs.push(args.map(String).join(" ")) };
//         fn(consoleProxy);
//         setOutput(logs.join("\n") || "(no output)");
//       } catch (err: any) {
//         setOutput(String(err));
//       }
//       return;
//     }

//     // For other languages, try to render CodeShowcase if present
//     // CodeShowcase is expected to handle language & code and provide a run UI
//     // We will try to render it in place — if component exists it will show
//     // Fallback: show a message to use Replix runner
//     if (!CodeShowcase) {
//       setOutput("This demo can only run JS in-browser. For other languages, use the Replix runner (open IDE or CodeShowcase).");
//     } else {
//       setOutput("Open the editor panel to run this language using Replix runner.");
//     }
//   }

//   function finishQuiz(score: number) {
//     if (!selectedCourse || !selectedCourse.quiz) return;
//     saveQuizResult(selectedCourse.quiz.id, { score, date: Date.now() });
//     setShowQuiz(false);
//     // award small badge for passing (>=50)
//     if (score >= 50) {
//       const b = `${selectedCourse.title} — Quiz Passed (${score}%)`;
//       const existing = loadBadges();
//       if (!existing.includes(b)) {
//         const next = [...existing, b];
//         setBadges(next);
//         saveBadges(next);
//       }
//     }
//   }

//   return (
//     <div className="relative min-h-screen selection:bg-white/20 selection:text-white">
//       <ParticlesBackground />
//       <NavigationHeader />

//       <main className="relative pt-24 pb-20 px-4">
//         <div className="max-w-7xl mx-auto">
//           {/* Hero */}
//           <section className="text-center mb-12">
//             <div className="max-w-4xl mx-auto">
//               <div className="text-sm mb-4 font-mono text-gray-400 inline-flex items-center gap-2 bg-white/5 px-4 py-1.5 rounded-full">Guided paths • Cheatsheets • Interactive editor</div>
//               <h1 className="text-4xl md:text-5xl font-extrabold leading-tight text-white">Replix Learning — Learn by Building</h1>
//               <p className="mt-4 text-gray-300">Structured, hands-on courses for 10+ languages. Choose a path — follow lessons — run code instantly.</p>

//               <div className="mt-6 flex items-center justify-center gap-3">
//                 <div className="relative max-w-md w-full">
//                   <div className="flex items-center gap-2 bg-zinc-900 ring-1 ring-zinc-800 rounded-md px-3 py-2">
//                     <Search className="w-4 h-4 text-gray-300" />
//                     <input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search courses, topics, languages" className="bg-transparent outline-none text-white w-full" />
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </section>

//           {/* Content */}
//           <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
//             <aside className="lg:col-span-1">
//               <div className="frost-panel p-6 rounded-2xl">
//                 <h3 className="text-lg font-semibold text-white">Learning Paths</h3>
//                 <p className="text-sm text-gray-400 mt-2">Choose a path by language or level.</p>

//                 <div className="mt-4 flex flex-col gap-2">
//                   {SAMPLE_COURSES.filter(c => {
//                     const q = query.trim().toLowerCase();
//                     if (!q) return true;
//                     return `${c.title} ${c.description} ${c.lang}`.toLowerCase().includes(q);
//                   }).map(c => (
//                     <button key={c.id} onClick={() => selectCourse(c)} className={`text-left p-3 rounded-md transition-all ${selectedCourse?.id === c.id ? 'bg-white/5' : 'hover:bg-white/3'}`}>
//                       <div className="flex items-center justify-between">
//                         <div>
//                           <div className="font-medium text-white">{c.title}</div>
//                           <div className="text-xs text-gray-400">{c.lang} • {c.level}</div>
//                         </div>
//                         <div className="text-xs text-gray-300">{c.lessons.length} lessons</div>
//                       </div>
//                     </button>
//                   ))}
//                 </div>

//                 <div className="mt-6">
//                   <h4 className="text-sm text-gray-300">Badges</h4>
//                   <BadgeList badges={badges} onClear={() => { setBadges([]); saveBadges([]); }} />
//                 </div>

//               </div>

//               <div className="mt-6 frost-panel p-4 rounded-2xl">
//                 <h4 className="text-sm font-semibold text-white">Quick Links</h4>
//                 <div className="mt-3 flex flex-col gap-2 text-sm">
//                   <a className="text-gray-300">Cheatsheets</a>
//                   <a className="text-gray-300">Guided Projects</a>
//                   <a className="text-gray-300">Progress</a>
//                 </div>
//               </div>
//             </aside>

//             <section className="lg:col-span-3">
//               {selectedCourse ? (
//                 <div className="frost-panel p-6 rounded-2xl">
//                   <div className="flex items-start justify-between gap-4">
//                     <div>
//                       <h2 className="text-2xl font-semibold text-white">{selectedCourse.title}</h2>
//                       <div className="text-sm text-gray-400">{selectedCourse.description}</div>

//                       <div className="mt-4">
//                         <ProgressBar completed={progress.completed.length} total={selectedCourse.lessons.length} />
//                         <div className="mt-2 text-xs text-gray-400">{progress.completed.length}/{selectedCourse.lessons.length} lessons completed</div>
//                       </div>
//                     </div>

//                     <div className="flex flex-col items-end gap-2">
//                       <div className="text-sm text-gray-300">Language</div>
//                       <div className="px-3 py-1 bg-white/5 rounded-full text-sm">{selectedCourse.lang}</div>
//                       <div className="mt-2">
//                         <Button onClick={() => setShowCheatsheet((s) => !s)} variant="ghost">Cheatsheet</Button>
//                         <Button onClick={() => setShowQuiz((s) => !s)} variant="outline" className="ml-2">Quiz</Button>
//                       </div>
//                     </div>
//                   </div>

//                   <div className="mt-6 grid grid-cols-1 lg:grid-cols-4 gap-6">
//                     <div className="lg:col-span-1">
//                       <div className="bg-zinc-900 p-4 rounded-md">
//                         <h4 className="text-sm text-gray-300">Lessons</h4>
//                         <ul className="mt-3 space-y-2">
//                           {selectedCourse.lessons.map((l: any, idx: number) => (
//                             <li key={l.id} className="flex items-center justify-between">
//                               <button onClick={() => gotoLesson(idx)} className={`text-left w-full p-2 rounded-md ${activeLesson?.id === l.id ? 'bg-white/5' : ''}`}>
//                                 <div className="text-sm text-white">{idx+1}. {l.title}</div>
//                                 <div className="text-xs text-gray-400">{l.length} min</div>
//                               </button>

//                               <div className="ml-2">
//                                 {progress.completed.includes(l.id) ? (
//                                   <div className="text-green-400 text-sm flex items-center gap-1"><Check className="w-4 h-4"/>Done</div>
//                                 ) : (
//                                   <Button size="sm" onClick={() => markLessonComplete(l.id)}>Mark</Button>
//                                 )}
//                               </div>
//                             </li>
//                           ))}
//                         </ul>
//                       </div>

//                       <div className="mt-4">
//                         <DoubtBoard courseId={selectedCourse.id} />
//                       </div>
//                     </div>

//                     <div className="lg:col-span-3">
//                       <div className="p-4 bg-zinc-900 rounded-md">
//                         <div className="flex items-center justify-between">
//                           <div>
//                             <h3 className="text-lg font-semibold text-white">{activeLesson?.title}</h3>
//                             <div className="text-xs text-gray-400">{selectedCourse.lang} • {activeLesson?.length} min</div>
//                           </div>

//                           <div className="flex items-center gap-2">
//                             <Button size="sm" onClick={() => { const idx = selectedCourse.lessons.findIndex((x: any) => x.id === activeLesson?.id); if (idx>0) gotoLesson(idx-1); }}><ChevronLeft /></Button>
//                             <Button size="sm" onClick={() => { const idx = selectedCourse.lessons.findIndex((x: any) => x.id === activeLesson?.id); if (idx<selectedCourse.lessons.length-1) gotoLesson(idx+1); }}><ChevronRight /></Button>
//                           </div>
//                         </div>

//                         <div className="mt-4 grid grid-cols-1 lg:grid-cols-2 gap-4">
//                           <div>
//                             <div className="prose prose-invert max-w-none">
//                               <h4 className="text-white">Lesson Notes</h4>
//                               <p className="text-gray-300">{activeLesson?.content}</p>

//                               <div className="mt-4">
//                                 <h5 className="text-white">Exercises</h5>
//                                 <ol className="text-gray-300 list-decimal ml-5">
//                                   <li>Try the example on the right.</li>
//                                   <li>Modify and experiment with inputs.</li>
//                                 </ol>
//                               </div>
//                             </div>

//                             <div className="mt-4">
//                               <Button onClick={() => markLessonComplete(activeLesson.id)}>I've finished this lesson</Button>
//                             </div>

//                             {showCheatsheet && (
//                               <div className="mt-4 p-4 bg-zinc-800 rounded-md">
//                                 <h5 className="text-white">Cheatsheet</h5>
//                                 <ul className="mt-2 list-disc ml-5 text-gray-300">
//                                   {(selectedCourse.cheatsheet || []).map((c: string, i: number) => <li key={i}>{c}</li>)}
//                                 </ul>
//                               </div>
//                             )}

//                             {showQuiz && selectedCourse.quiz && (
//                               <div className="mt-4">
//                                 <h5 className="text-white">Quiz — Test your knowledge</h5>
//                                 <Quiz quiz={selectedCourse.quiz} onFinish={finishQuiz} />
//                               </div>
//                             )}

//                           </div>

//                           <div>
//                             <div className="bg-zinc-900 p-4 rounded-md">
//                               <div className="flex items-center justify-between mb-3">
//                                 <div className="text-sm text-gray-300">Interactive Editor</div>
//                                 <div className="text-xs text-gray-400">Run code instantly</div>
//                               </div>

//                               {/* If CodeShowcase is available we'll try to use it. Otherwise fallback to a minimal editor + JS runner */}
//                               {typeof CodeShowcase !== "undefined" && CodeShowcase ? (
//                                 <div>
//                                   {/* CodeShowcase is expected to accept initialCode & language. We pass these props if the component supports them. */}
//                                   {/* If your CodeShowcase has a different prop API, adapt the call here. */}
//                                   {/* We still show a minimal editor to allow quick edits (keeps CodeShowcase in sync via initialCode change) */}
//                                   <textarea value={code} onChange={(e) => setCode(e.target.value)} className="w-full h-40 bg-black/60 p-2 rounded-md text-xs font-mono text-white" />
//                                   <div className="mt-3 flex gap-2">
//                                     <Button onClick={runCode}>Run</Button>
//                                     {/* JS quick-run helper */}
//                                     {(selectedCourse.lang === "JavaScript" || selectedCourse.lang === "TypeScript") && (
//                                       <JsRunner code={code} setOutput={setOutput} />
//                                     )}
//                                   </div>
//                                 </div>
//                               ) : (
//                                 <div>
//                                   <textarea value={code} onChange={(e) => setCode(e.target.value)} className="w-full h-40 bg-black/60 p-2 rounded-md text-xs font-mono text-white" />
//                                   <div className="mt-3 flex gap-2">
//                                     <Button onClick={runCode}>Run</Button>
//                                     {(selectedCourse.lang === "JavaScript" || selectedCourse.lang === "TypeScript") && (
//                                       <JsRunner code={code} setOutput={setOutput} />
//                                     )}
//                                   </div>
//                                 </div>
//                               )}

//                               <div className="mt-4 bg-black/40 rounded-md p-3 min-h-[80px]">
//                                 <div className="text-xs text-gray-400">Output</div>
//                                 <pre className="text-sm text-white mt-2 overflow-auto whitespace-pre-wrap">{output}</pre>
//                               </div>

//                             </div>

//                           </div>
//                         </div>

//                       </div>

//                     </div>

//                   </div>

//                 </div>
//               ) : (
//                 <div className="frost-panel p-8 rounded-2xl text-center">
//                   <h3 className="text-xl font-semibold text-white">Pick a path to start learning</h3>
//                   <p className="text-gray-400 mt-2">Select a course on the left and get instant access to lessons, examples and the interactive editor.</p>
//                 </div>
//               )}
//             </section>
//           </div>

//         </div>
//       </main>
//     </div>
//   );
// }






// "use client";

// import React, { useState } from "react";
// import NavigationHeader from "@/components/NavigationHeader";
// import ParticlesBackground from "@/components/ParticlesBackground";
// import CourseList from "./_components/CourseList";
// import CoursePanel from "./_components/CoursePanel";
// import { SAMPLE_COURSES } from "./data/courses";

// export default function LearningPage() {
//   const [selectedCourse, setSelectedCourse] = useState<any | null>(null);

//   return (
//     <div className="relative min-h-screen selection:bg-white/20 selection:text-white">
//       <ParticlesBackground />
//       <NavigationHeader />

//       <main className="relative pt-24 pb-20 px-4">
//         <div className="max-w-7xl mx-auto">
//           <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
//             <aside className="lg:col-span-1">
//               <CourseList courses={SAMPLE_COURSES} onSelect={setSelectedCourse} selected={selectedCourse} />
//             </aside>

//             <section className="lg:col-span-3">
//               <CoursePanel course={selectedCourse} onBack={() => setSelectedCourse(null)} />
//             </section>
//           </div>
//         </div>
//       </main>
//     </div>
//   );
// }












"use client";

import React, { useState } from "react";
import NavigationHeader from "@/components/NavigationHeader";
import ParticlesBackground from "@/components/ParticlesBackground";
import CourseList from "./_components/CourseList";
import CoursePanel from "./_components/CoursePanel";
import { SAMPLE_COURSES } from "./data/courses";
import { Search } from "lucide-react";
import LearningHero from "./_components/LearningHeroSection";

export default function LearningPage() {
  const [query, setQuery] = useState("");
    const [showQuiz, setShowQuiz] = useState(false);

  const [selectedCourse, setSelectedCourse] = useState<any | null>(null);

  return (
    <div className="relative min-h-screen selection:bg-white/20 selection:text-white">
      <ParticlesBackground />
      <NavigationHeader />

      <main className="relative pt-24 pb-20 px-4 mt-4">
        <div className="max-w-7xl mx-auto">

            <section className="text-center mb-12">
             <div className="max-w-4xl mx-auto">
               <div className="text-sm mb-8 font-mono text-gray-400 inline-flex items-center gap-2 bg-white/5 px-4 py-1.5 rounded-full">Guided paths • Cheatsheets • Interactive editor</div>
               <h1 className="text-4xl md:text-5xl font-extrabold leading-tight text-white mb-16">Replix Learning — The Path to Hands-On Learning</h1>
               <p className="mt-4 mb-16 text-gray-300">Structured, hands-on courses for 10+ languages. Choose a path — follow lessons — run code instantly.</p>

                <div className="mt-6 flex items-center justify-center gap-3">
                    <div className="relative max-w-md w-full">
                    {/* <div className="flex items-center gap-2 bg-zinc-900 ring-1 ring-zinc-800 rounded-md px-3 py-2"> */}
                        {/* <Search className="w-4 h-4 text-gray-300" /> */}
                        {/* <input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search courses, topics, languages" className="bg-transparent outline-none text-white w-full" /> */}
                        {/* <input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search courses, topics, languages" className="w-full p-2 bg-zinc-900 rounded-md text-white outline-none" /> */}
                    {/* </div> */}
                    </div>
                </div>
                </div>
           </section>



          <LearningHero onExplore={() => { /* scroll into view or focus the course list */ document.getElementById('learning-list')?.scrollIntoView({ behavior: 'smooth' }); }} />


          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 mb-48">
            <aside className="lg:col-span-1" id="learning-list">
              <CourseList courses={SAMPLE_COURSES} onSelect={setSelectedCourse} selected={selectedCourse} />
            </aside>

            <section className="lg:col-span-3">
              <CoursePanel course={selectedCourse} onBack={() => setSelectedCourse(null)} />
            </section>
          </div>

        
        </div>



        {/* Coming Soon Section */}
        <section className="mt-32 text-center relative">
        <div className="relative z-10">
            <h2 className="text-2xl md:text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-white to-sky-300">
            <span className="text-white">🚀</span> More Features Coming Soon!
            </h2>
            <p className="mt-3 text-gray-400 max-w-lg mx-auto">
            We’re building something bigger, this was the initial experience — Stay tuned for the next evolution of learning.
            </p>
        </div>
        <div className="absolute inset-x-0 -bottom-8 mx-auto w-72 h-72 bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-pink-500/20 blur-3xl rounded-full opacity-50" />
        </section>




      </main>
    </div>
  );
}