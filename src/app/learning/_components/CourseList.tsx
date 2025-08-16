import React, { useMemo, useState } from "react";

export default function CourseList({ courses, onSelect, selected }: any) {
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return courses;
    return courses.filter((c: any) => `${c.title} ${c.description} ${c.lang}`.toLowerCase().includes(q));
  }, [query, courses]);

  return (
    <div className="frost-panel p-6 rounded-2xl">
      <h3 className="text-lg font-semibold text-white">Learning Paths</h3>
      <p className="text-sm text-gray-400 mt-2">Choose a path by language or level.</p>

      <div className="mt-4">
        <input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search courses" className="w-full p-2 bg-zinc-900 rounded-md text-white outline-none" />
      </div>

      <div className="mt-4 flex flex-col gap-2">
        {filtered.map((c: any) => (
          <button key={c.id} onClick={() => onSelect(c)} className={`text-left p-3 rounded-md transition-all ${selected?.id === c.id ? 'bg-white/5' : 'hover:bg-white/3'}`}>
            <div className="flex items-center justify-between">
              <div>
                <div className="font-medium text-white">{c.title}</div>
                <div className="text-xs text-gray-400">{c.lang} • {c.level}</div>
              </div>
              <div className="text-xs text-gray-300">{c.lessons.length} lessons</div>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}