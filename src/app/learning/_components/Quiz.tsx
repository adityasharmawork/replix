// import React, { useState } from "react";

// export default function Quiz({ quiz, onFinish }: any) {
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
//                 <input type="radio" name={q.id} checked={answers[q.id]===i} onChange={() => setAnswer(q.id, i)} />
//                 <span className="text-gray-300">{opt}</span>
//               </label>
//             ))}
//           </div>
//         </div>
//       ))}

//       <div className="flex gap-2">
//         <button onClick={submit} className="px-4 py-2 bg-white text-black rounded-md">Submit Quiz</button>
//       </div>
//     </div>
//   );
// }















import React, { useState } from "react";

export default function Quiz({ quiz, onFinish }: any) {
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [submitted, setSubmitted] = useState(false);
  const [score, setScore] = useState<{ correct: number; pct: number } | null>(
    null
  );

  function setAnswer(qId: string, idx: number) {
    setAnswers((s) => ({ ...s, [qId]: idx }));
  }

  function submit() {
    let correct = 0;
    for (const q of quiz.questions) {
      if (answers[q.id] === q.correct) correct++;
    }
    const pct = Math.round((correct / quiz.questions.length) * 100);
    setScore({ correct, pct });
    setSubmitted(true);
    onFinish(pct);
  }

  return (
    <div className="flex justify-center items-center min-h-[80vh] min-w-[40vw] pr-32">
      <div className="w-full max-w-xl bg-zinc-800 p-6 rounded-lg shadow-lg">
        {quiz.questions.map((q: any) => (
          <div key={q.id} className="p-4 bg-zinc-900 rounded-md mb-3">
            <div className="font-medium text-white">{q.q}</div>
            <div className="mt-2 flex flex-col gap-2">
              {q.a.map((opt: string, i: number) => (
                <label key={i} className="inline-flex items-center gap-2">
                  <input
                    type="radio"
                    name={q.id}
                    checked={answers[q.id] === i}
                    onChange={() => setAnswer(q.id, i)}
                  />
                  <span className="text-gray-300">{opt}</span>
                </label>
              ))}
            </div>
          </div>
        ))}

        {!submitted ? (
          <div className="flex justify-center mt-4">
            <button
              onClick={submit}
              className="px-6 py-2 bg-white text-black rounded-md font-medium hover:bg-gray-200 transition"
            >
              Submit Quiz
            </button>
          </div>
        ) : (
          <div className="mt-6 text-center text-white">
            <p className="text-lg font-semibold">
              You scored {score?.correct} / {quiz.questions.length} (
              {score?.pct}%)
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
