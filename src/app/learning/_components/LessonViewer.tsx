// import React, { useEffect, useState } from "react";
// import CodeEditor from "./editor/CodeEditor";
// import Quiz from "./Quiz";

// export default function LessonViewer({ course, onComplete }: any) {
//   const [activeIdx, setActiveIdx] = useState(0);
//   const [code, setCode] = useState("");
//   const [output, setOutput] = useState("");
//   const [showQuiz, setShowQuiz] = useState(false);

//   useEffect(() => {
//     if (course) {
//       setActiveIdx(0);
//       setCode(course.lessons[0]?.content || "");
//       setOutput("");
//       setShowQuiz(false);
//     }
//   }, [course]);

//   if (!course) return null;

//   const lesson = course.lessons[activeIdx];

//   function goto(idx: number) {
//     setActiveIdx(idx);
//     setCode(course.lessons[idx].content || "");
//     setOutput("");
//   }

//   function run() {
//     setOutput("Running...");
//     if (course.lang === "JavaScript" || course.lang === "TypeScript") {
//       try {
//         // minimal demo runner — not secure for untrusted code
//         // eslint-disable-next-line no-new-func
//         const fn = new Function("console", code);
//         const logs: string[] = [];
//         const consoleProxy = { log: (...args: any[]) => logs.push(args.map(String).join(" ")) };
//         fn(consoleProxy);
//         setOutput(logs.join("\n") || "(no output)");
//       } catch (err: any) {
//         setOutput(String(err));
//       }
//     } else {
//       setOutput("Use the Replix runner for this language (IDE) — this is a JS demo runner.");
//     }
//   }

//   return (
//     <div>
//       <div className="flex items-center justify-between mb-4">
//         <div>
//           <h3 className="text-lg font-semibold text-white">{lesson.title}</h3>
//           <div className="text-xs text-gray-400">{course.lang} • {lesson.length} min</div>
//         </div>
//         <div className="flex items-center gap-2">
//           <button className="text-sm text-gray-300" onClick={() => onComplete(lesson.id)}>Mark complete</button>
//           <button className="text-sm text-gray-300" onClick={() => setShowQuiz((s) => !s)}>Quiz</button>
//         </div>
//       </div>

//       <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
//         <div>
//           <div className="prose prose-invert">
//             <p className="text-gray-300">{lesson.content}</p>
//           </div>

//           <div className="mt-4">
//             <button onClick={() => onComplete(lesson.id)} className="px-4 py-2 bg-white text-black rounded-md">I've finished this lesson</button>
//           </div>

//           {showQuiz && course.quiz && <Quiz quiz={course.quiz} onFinish={(score: number) => { /* placeholder */ }} />}
//         </div>

//         <div>
//           <CodeEditor value={lesson.code} onChange={setCode} />
//           {/* <div className="mt-3 flex gap-2">
//             <button onClick={run} className="px-4 py-2 bg-white text-black rounded-md">Run</button>
//           </div>

//           <div className="mt-4 bg-black/40 rounded-md p-3 min-h-[80px]">
//             <div className="text-xs text-gray-400">Output</div>
//             <pre className="text-sm text-white mt-2 overflow-auto whitespace-pre-wrap">{output}</pre>
//           </div> */}

//         </div>
//       </div>

//       <div className="mt-6 flex items-center gap-2">
//         {course.lessons.map((l: any, i: number) => (
//           <button key={l.id} onClick={() => goto(i)} className={`px-3 py-1 rounded-md text-sm ${i===activeIdx? 'bg-white/5' : 'bg-white/3/10'}`}>{i+1}</button>
//         ))}
//       </div>
//     </div>
//   );
// }












// import React, { useEffect, useState } from "react";
// import CodeEditor from "./editor/CodeEditor";
// import Quiz from "./Quiz";

// export default function LessonViewer({ course, onComplete, activeIdx, onChangeLesson }: any) {
//   const [code, setCode] = useState("");
//   const [output, setOutput] = useState("");
//   const [showQuiz, setShowQuiz] = useState(false);

//   useEffect(() => {
//     if (course && activeIdx != null) {
//       setCode(course.lessons[activeIdx]?.content || "");
//       setOutput("");
//       setShowQuiz(false);
//     }
//   }, [course, activeIdx]);

//   if (!course) return null;
//   const lesson = course.lessons[activeIdx];

//   function run() {
//     setOutput("Running...");
//     if (course.lang === "JavaScript" || course.lang === "TypeScript") {
//       try {
//         const fn = new Function("console", code);
//         const logs: string[] = [];
//         const consoleProxy = { log: (...args: any[]) => logs.push(args.map(String).join(" ")) };
//         fn(consoleProxy);
//         setOutput(logs.join("\n") || "(no output)");
//       } catch (err: any) {
//         setOutput(String(err));
//       }
//     } else {
//       setOutput("Use the Replix runner for this language (IDE) — this is a JS demo runner.");
//     }
//   }

//   return (
//     <div>
//       {/* Lesson Header */}
//       <div className="flex items-center justify-between mb-4">
//         <div>
//           <h3 className="text-lg font-semibold text-white">{lesson.title}</h3>
//           <div className="text-xs text-gray-400">
//             {course.lang} • {lesson.length} min
//           </div>
//         </div>
//         <div className="flex items-center gap-2">
//           <button className="text-sm text-gray-300" onClick={() => onComplete(lesson.id)}>
//             Mark complete
//           </button>
//           <button className="text-sm text-gray-300" onClick={() => setShowQuiz((s) => !s)}>
//             Quiz
//           </button>
//         </div>
//       </div>

//       {/* Content + Editor */}
//       <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
//         <div>
//           <div className="prose prose-invert">
//             <p className="text-gray-300">{lesson.content}</p>
//           </div>
//           <div className="mt-4">
//             <button
//               onClick={() => onComplete(lesson.id)}
//               className="px-4 py-2 bg-white text-black rounded-md"
//             >
//               I've finished this lesson
//             </button>
//           </div>
//           {showQuiz && course.quiz && (
//             <Quiz quiz={course.quiz} onFinish={(score: number) => { /* placeholder */ }} />
//           )}
//         </div>

//         <div>
//           <CodeEditor value={lesson.code || code} onChange={setCode} />
//         </div>
//       </div>

//       {/* Lesson Navigation */}
//       <div className="mt-6 flex items-center gap-2">
//         {course.lessons.map((l: any, i: number) => (
//           <button
//             key={l.id}
//             onClick={() => onChangeLesson(i)} // ⬅ tell parent to change
//             className={`px-3 py-1 rounded-md text-sm ${i === activeIdx ? "bg-white/5" : "bg-white/10"}`}
//           >
//             {i + 1}
//           </button>
//         ))}
//       </div>
//     </div>
//   );
// }







"use client";


import React, { useEffect, useState } from "react";
import CodeEditor from "./editor/CodeEditor";
import Quiz from "./Quiz";
export default function LessonViewer({ course, onComplete, activeIdx, onChangeLesson }: any) {
  
  const [code, setCode] = useState("");
  const [output, setOutput] = useState("");
  const [showQuiz, setShowQuiz] = useState(false);


  useEffect(() => {
    if (course && activeIdx != null) {
      setCode(course.lessons[activeIdx]?.content || "");
      setOutput("");
      setShowQuiz(false);
    }
  }, [course, activeIdx]);

  if (!course) return null;
  const lesson = course.lessons[activeIdx];

  //   function run() {
  //     // setOutput("Running...");
  //     // if (course.lang === "JavaScript" || course.lang === "TypeScript") {
  //     //   try {
  //     //     // minimal demo runner — not secure for untrusted code
  //     //     // eslint-disable-next-line no-new-func
  //     //     const fn = new Function("console", code);
  //     //     const logs: string[] = [];
  //     //     const consoleProxy = { log: (...args: any[]) => logs.push(args.map(String).join(" ")) };
  //     //     fn(consoleProxy);
  //     //     setOutput(logs.join("\n") || "(no output)");
  //     //   } catch (err: any) {
  //     //     setOutput(String(err));
  //     //   }
  //     // } else {
  //       setOutput("Use the Replix Editor for this language (IDE)\nThis is a demo runner");
  //     // }
  //     // console.log(course.lang.toLowerCase());
  //     // console.log(lesson.code);

  //     let language: string = ( course?.lang === "C++" ) ? "cpp" : course.lang.toLowerCase();

  //     localStorage.setItem("editor-language", language);
  //     localStorage.setItem(`editor-language-${language}`, lesson.code);

  //     Response.redirect("/editor");
  // }


  function run() {
    setOutput("Use the Replix Editor for this language (IDE)\nThis is a demo runner");

    let language: string = (course?.lang === "C++") ? "cpp" : course.lang.toLowerCase();

    localStorage.setItem("editor-language", language);
    localStorage.setItem(`editor-language-${language}`, lesson.code);

    console.log(localStorage.getItem("editor-language"));
    console.log(localStorage.getItem(`editor-language-${language}`));

    // redirect("/editor");
    window.open("/editor", "_blank");

    // console.log(localStorage.getItem("editor-language"));
    // console.log(localStorage.getItem(`editor-language-${language}`));
  }



  return (
    <div className="flex flex-col h-full">
      {/* Lesson Header */}
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-lg font-semibold text-white">{lesson.title}</h3>
          <div className="text-xs text-gray-400">
            {course.lang} • {lesson.length} min
          </div>
        </div>
        <div className="flex items-center gap-2">
          {/* <button className="text-sm text-gray-300" onClick={() => onComplete(lesson.id)}>
            Mark complete
          </button> */}
          {/* <button className="text-sm text-gray-300" onClick={() => setShowQuiz((s) => !s)}>
            Quiz
          </button> */}
        </div>
      </div>

      {/* Content + Editor */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 flex-grow">
        <div>
          {/* <div className="prose prose-invert">
            <p className="text-gray-300">{lesson.content}</p>
          </div> */}
          <div className="prose prose-invert whitespace-pre-line text-gray-300 mt-16">
            {lesson.content}
          </div>
          <div className="mt-32">
            <button
              onClick={() => onComplete(lesson.id)}
              className="px-4 py-2 bg-white text-black rounded-md"
            >
              I've finished this lesson
            </button>
          </div>
          {/* {showQuiz && course.quiz && ( */}
            {/* <Quiz quiz={course.quiz} onFinish={(score: number) => { /* placeholder */ }
          {/* )} */}
        </div>

        <div className="mt-16">
          <CodeEditor value={lesson.code || code} onChange={setCode} />
          <div className="mt-3 flex gap-2">
             <button onClick={run} className="px-4 py-2 bg-white text-black rounded-md">Run</button>
           </div>

           <div className="mt-4 bg-black/40 rounded-md p-3 min-h-[80px]">
             <div className="text-xs text-gray-400">Output</div>
             <pre className="text-sm text-white mt-2 overflow-auto whitespace-pre-wrap">{output}</pre>
           </div>
        </div>

        {/* {showQuiz && course.quiz && (
          // <Quiz quiz={course.quiz} onFinish={(score: number) => { /* placeholder */ }
        {/* )} */}
      </div>

      {/* Lesson Navigation at Bottom */}
      <div className="mt-6 flex items-center gap-2 justify-center">
        {course.lessons.map((l: any, i: number) => (
          <button
            key={l.id}
            onClick={() => onChangeLesson(i)}
            className={`px-3 py-1 rounded-md text-sm ${i === activeIdx ? "bg-white/5" : "bg-white/10"}`}
          >
            {i + 1}
          </button>
        ))}
      </div>
    </div>
  );
}
