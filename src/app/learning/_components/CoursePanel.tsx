// import React, { useEffect, useState } from "react";
// import LessonViewer from "./LessonViewer";
// import { loadProgress, saveProgress, loadBadges, saveBadges } from "../lib/storage";

// export default function CoursePanel({ course, onBack }: any) {
//   const [progress, setProgress] = useState<{ completed: string[] }>({ completed: [] });

//   useEffect(() => {
//     if (course) setProgress(loadProgress(course.id));
//   }, [course]);

//   if (!course) {
//     return (
//       <div className="frost-panel p-8 rounded-2xl text-center">
//         <h3 className="text-xl font-semibold text-white">Pick a path to start learning</h3>
//         <p className="text-gray-400 mt-2">Select a course on the left and get instant access to lessons, examples and the interactive editor.</p>
//       </div>
//     );
//   }

//   function markLessonComplete(lessonId: string) {
//     const next = { ...progress };
//     if (!next.completed.includes(lessonId)) {
//       next.completed.push(lessonId);
//       setProgress(next);
//       saveProgress(course.id, next);

//       // award badge when done
//       if (next.completed.length >= course.lessons.length) {
//         const badge = `${course.title} — Completed`;
//         const existing = loadBadges();
//         if (!existing.includes(badge)) {
//           const updated = [...existing, badge];
//           saveBadges(updated);
//         }
//       }
//     }
//   }

//   return (
//     <div className="frost-panel p-6 rounded-2xl">
//       <div className="flex items-start justify-between">
//         <div>
//           <h2 className="text-2xl font-semibold text-white">{course.title}</h2>
//           <div className="text-sm text-gray-400">{course.description}</div>
//         </div>
//         <div>
//           <button className="text-sm text-gray-300" onClick={onBack}>Back</button>
//         </div>
//       </div>

//       <div className="mt-6 grid grid-cols-1 lg:grid-cols-4 gap-6">
//         <div className="lg:col-span-1">
//           <div className="bg-zinc-900 p-4 rounded-md">
//             <h4 className="text-sm text-gray-300">Lessons</h4>
//             <ul className="mt-3 space-y-2">
//               {course.lessons.map((l: any, idx: number) => (
//                 <li key={l.id} className="flex items-center justify-between">
//                   <LessonButton lesson={l} onClick={() => {}} completed={progress.completed.includes(l.id)} />
//                 </li>
//               ))}
//             </ul>
//           </div>
//         </div>

//         <div className="lg:col-span-3">
//           <LessonViewer course={course} onComplete={markLessonComplete} />
//         </div>
//       </div>
//     </div>
//   );
// }

// function LessonButton({ lesson, onClick, completed }: any) {
//   return (
//     <div className="flex items-center justify-between w-full">
//       <button className={`text-left w-full p-2 rounded-md ${completed ? 'bg-white/5' : ''}`} onClick={onClick}>
//         <div className="text-sm text-white">{lesson.title}</div>
//         <div className="text-xs text-gray-400">{lesson.length} min</div>
//       </button>
//       <div className="ml-2 text-green-400 text-sm">{completed ? 'Done' : ''}</div>
//     </div>
//   );
// }








import React, { useEffect, useState } from "react";
import LessonViewer from "./LessonViewer";
import { loadProgress, saveProgress, loadBadges, saveBadges } from "../lib/storage";
import { div } from "framer-motion/client";
import Quiz from "./Quiz";

export default function CoursePanel({ course, onBack }: any) {
  const [showQuiz, setShowQuiz] = useState(false);
  const [progress, setProgress] = useState<{ completed: string[] }>({ completed: [] });
  const [activeIdx, setActiveIdx] = useState(0); // ⬅ track selected lesson index

  useEffect(() => {
    if (course) {
      setProgress(loadProgress(course.id));
      setActiveIdx(0); // reset to first lesson when switching courses
    }
  }, [course]);

  if (!course) {
    return (
      <div className="frost-panel p-8 rounded-2xl text-center">
        <h3 className="text-xl font-semibold text-white">Pick a path to start learning</h3>
        <p className="text-gray-400 mt-2">
          Select a course on the left and get instant access to lessons, examples and the interactive editor.
        </p>
      </div>
    );
  }

  function markLessonComplete(lessonId: string) {
    const next = { ...progress };
    if (!next.completed.includes(lessonId)) {
      next.completed.push(lessonId);
      setProgress(next);
      saveProgress(course.id, next);

      if (next.completed.length >= course.lessons.length) {
        const badge = `${course.title} — Completed`;
        const existing = loadBadges();
        if (!existing.includes(badge)) {
          const updated = [...existing, badge];
          saveBadges(updated);
        }
      }
    }
  }

  return (
    <div className="frost-panel p-6 rounded-2xl">
      <div className="flex items-start justify-between">
        <div>
          <h2 className="text-2xl font-semibold text-white">{course.title}</h2>
          <div className="text-sm text-gray-400">{course.description}</div>
        </div>
        <div>
          <button className="text-sm text-gray-300" onClick={onBack}>
            Back
          </button>
        </div>
      </div>

      <div className="mt-6 grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Sidebar Lessons */}
        <div className="lg:col-span-1">
          <div className="bg-zinc-900 p-4 rounded-md">
            <h4 className="text-sm text-gray-300">Lessons</h4>

            {/* <ul className="mt-3 space-y-2">
              {course.lessons.map((l: any, idx: number) => (
                <div>
                  <li key={l.id} className="flex items-center justify-between">
                    <LessonButton
                      lesson={l}
                      // onClick={() => setActiveIdx(idx)} // ⬅ now updates activeIdx
                      onClick={() => { setActiveIdx(idx); setShowQuiz((s) => false); }}
                      completed={progress.completed.includes(l.id)}
                    />
                  </li>
                </div>
              ))}
              <div key="quiz">
                <button className="text-sm text-gray-300" onClick={() => setShowQuiz((s) => !s)}>Quiz</button>
              </div>
            </ul> */}

            <ul className="mt-3 space-y-2">
            {course.lessons.map((l: any, idx: number) => (
              <li
                key={l.id} 
                className="flex items-center justify-between"
              >
                <LessonButton
                  lesson={l}
                  onClick={() => {
                    setActiveIdx(idx);
                    setShowQuiz(false);
                  }}
                  completed={progress.completed.includes(l.id)}
                />
              </li>
            ))}
            <li key="quiz">
              <button
                className="text-sm text-gray-300"
                onClick={() => setShowQuiz((s) => !s)}
              >
                Quiz
              </button>
            </li>
          </ul>


          </div>
        </div>

        {/* Lesson Viewer */}
        <div className="lg:col-span-3">
          {!showQuiz && (
          <LessonViewer
            course={course}
            activeIdx={activeIdx} // ⬅ pass activeIdx
            onChangeLesson={setActiveIdx} // ⬅ let LessonViewer also change
            onComplete={markLessonComplete}
          />
          )}
        {showQuiz && course.quiz && (
          <Quiz quiz={course.quiz} onFinish={(score: number) => { /* placeholder */ }} />
        )}
        </div>
      </div>
    </div>
  );
}

function LessonButton({ lesson, onClick, completed }: any) {
  return (
    <div className="flex items-center justify-between w-full">
      <button
        className={`text-left w-full p-2 rounded-md ${completed ? "bg-white/5" : ""}`}
        onClick={onClick}
      >
        <div className="text-sm text-white">{lesson.title}</div>
        <div className="text-xs text-gray-400">{lesson.length} min</div>
      </button>
      <div className="ml-2 text-green-400 text-sm">{completed ? "Done" : ""}</div>
    </div>
  );
}
