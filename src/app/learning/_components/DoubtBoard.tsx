import React, { useEffect, useState } from "react";
import { storageKey } from "../lib/storage";

export default function DoubtBoard({ courseId }: any) {
  const [q, setQ] = useState("");
  const [list, setList] = useState<any[]>([]);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(storageKey(`doubts_${courseId || "global"}`));
      setList(raw ? JSON.parse(raw) : []);
    } catch (e) { setList([]); }
  }, [courseId]);

  function post() {
    if (!q.trim()) return;
    const item = { id: Date.now(), text: q, courseId, answered: false };
    const next = [item, ...list];
    setList(next);
    localStorage.setItem(storageKey(`doubts_${courseId || "global"}`), JSON.stringify(next));
    setQ("");
  }

  return (
    <div className="mt-6">
      <h4 className="text-white font-semibold">Ask a Doubt</h4>
      <div className="mt-2 flex gap-2">
        <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Ask here" className="flex-1 bg-zinc-900 p-2 rounded-md outline-none text-white" />
        <button onClick={post} className="px-3 py-1 bg-white text-black rounded-md">Post</button>
      </div>

      <div className="mt-4 space-y-2">
        {list.map((it) => (
          <div key={it.id} className="p-3 bg-white/3 rounded-md">
            <div className="text-sm text-gray-100">{it.text}</div>
            <div className="text-xs text-gray-400 mt-1">{new Date(it.id).toLocaleString()}</div>
          </div>
        ))}
      </div>
    </div>
  );
}