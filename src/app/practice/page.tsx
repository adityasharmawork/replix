// src/app/practice/page.tsx
"use client";

import React, { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import NavigationHeader from "@/components/NavigationHeader";
import ParticlesBackground from "@/components/ParticlesBackground";
import { Code, ExternalLink } from "lucide-react";

type Problem = {
  id: string;
  frontend_id: string;
  title: string;
  title_slug: string;
  url: string;
  difficulty: "Easy" | "Medium" | "Hard" | string;
  paid_only: boolean;
  has_solution: boolean;
  has_video_solution: boolean;
};

export default function PracticePage() {
  const [platform, setPlatform] = useState<"leetcode" | "codeforces" | "codechef">("leetcode");
  const [problems, setProblems] = useState<Problem[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [q, setQ] = useState("");
  const [difficulty, setDifficulty] = useState<"All" | "Easy" | "Medium" | "Hard">("All");
  const [onlyFree, setOnlyFree] = useState(false);
  const [page, setPage] = useState(1);
  const pageSize = 50; // Changed page size to 50

  useEffect(() => {
    if (platform !== "leetcode") {
      setProblems([]);
      setError(null);
      return;
    }

    let aborted = false;
    setLoading(true);
    setError(null);

    fetch("/api/leetcode/problems")
      .then(async (res) => {
        if (!res.ok) {
          const body = await res.json().catch(() => ({}));
          throw new Error(body?.error ?? `HTTP ${res.status}`);
        }
        return res.json();
      })
      .then((data: any) => {
        if (aborted) return;
        if (!Array.isArray(data)) throw new Error("Invalid response from server proxy");
        setProblems(data as Problem[]);
      })
      .catch((err) => {
        if (aborted) return;
        console.error("Fetch problems error:", err);
        setError(String(err?.message || err));
        setProblems([]);
      })
      .finally(() => {
        if (!aborted) setLoading(false);
      });

    return () => {
      aborted = true;
    };
  }, [platform]);

  useEffect(() => {
    setPage(1);
  }, [q, difficulty, onlyFree, platform]);

  const filtered = useMemo(() => {
    if (platform !== "leetcode") return [];
    return problems.filter((p) => {
      if (difficulty !== "All" && p.difficulty !== difficulty) return false;
      if (onlyFree && p.paid_only) return false;
      if (q.trim()) {
        const term = q.trim().toLowerCase();
        return (
          p.title.toLowerCase().includes(term) ||
          p.title_slug.toLowerCase().includes(term) ||
          p.frontend_id.toString().includes(term)
        );
      }
      return true;
    });
  }, [problems, q, difficulty, onlyFree, platform]);

  // Updated logic: Slice problems up to the current page limit
  const pageItems = filtered.slice(0, page * pageSize);

  return (
    <div className="relative min-h-screen selection:bg-white/20 selection:text-white">
      <ParticlesBackground />
      <NavigationHeader />

      <main className="relative pt-28 pb-20 px-4">
        <div className="max-w-6xl mx-auto">
          <header className="mb-8 text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-300 to-purple-300">
              Practice — Platform Explorer
            </h1>
            <p className="text-gray-300 mt-3">Choose a platform and jump straight into problems inside Replix.</p>
          </header>

          {/* Platform selector */}
          <div className="flex items-center gap-3 justify-center mb-8">
            <button
              onClick={() => setPlatform("leetcode")}
              className={`px-4 py-2 rounded-md font-medium transition ring-1 ${
                platform === "leetcode" ? "bg-white text-black ring-white/30" : "bg-transparent text-white/90 ring-white/10"
              }`}
            >
              LeetCode
            </button>

            <button
              disabled
              title="Coming soon"
              onClick={() => setPlatform("codeforces")}
              className={`px-4 py-2 rounded-md font-medium transition ring-1 ${
                platform === "codeforces" ? "bg-white text-black ring-white/30" : "bg-transparent text-white/60 ring-white/8"
              } opacity-70 cursor-not-allowed`}
            >
              CodeForces (Soon)
            </button>

            <button
              disabled
              title="Coming soon"
              onClick={() => setPlatform("codechef")}
              className={`px-4 py-2 rounded-md font-medium transition ring-1 ${
                platform === "codechef" ? "bg-white text-black ring-white/30" : "bg-transparent text-white/60 ring-white/8"
              } opacity-70 cursor-not-allowed`}
            >
              CodeChef (Soon)
            </button>
          </div>

          {platform !== "leetcode" ? (
            <div className="frost-panel p-8 rounded-2xl text-center">
              <p className="text-gray-300">This platform is coming soon — we're focusing on LeetCode first. Stay tuned!</p>
            </div>
          ) : (
            <div>
              {/* Controls */}
              <div className="flex flex-col md:flex-row items-center gap-4 justify-between mb-6">
                <div className="flex items-center gap-3 w-full md:w-auto">
                  <input
                    value={q}
                    onChange={(e) => setQ(e.target.value)}
                    placeholder="Search by title, slug or id"
                    className="w-full md:w-96 bg-white/5 text-white placeholder-gray-400 px-4 py-2 rounded-md ring-1 ring-white/10 focus:outline-none"
                  />

                  <select
                    value={difficulty}
                    onChange={(e) => setDifficulty(e.target.value as any)}
                    className="bg-zinc-900 text-white px-3 py-2 rounded-md ring-1 ring-white/10 focus:outline-none"
                  >
                    <option>All</option>
                    <option>Easy</option>
                    <option>Medium</option>
                    <option>Hard</option>
                  </select>

                  <label className="inline-flex items-center gap-2 text-sm text-gray-300">
                    <input type="checkbox" checked={onlyFree} onChange={(e) => setOnlyFree(e.target.checked)} className="accent-white" />
                    <span>Only free</span>
                  </label>
                </div>

                <div className="text-sm text-gray-300">{loading ? "Loading problems…" : `${filtered.length} problems`}</div>
              </div>

              {/* show fetch error if any */}
              {error && <div className="frost-panel p-4 rounded-2xl text-center text-rose-300 mb-4">Error fetching problems: {error}</div>}

              {/* List header */}
              <div className="hidden md:grid grid-cols-12 gap-4 text-xs text-gray-400 px-4 py-2 border-b border-white/10 mb-2">
                <div className="col-span-1">#</div>
                <div className="col-span-6">Title</div>
                <div className="col-span-2">Difficulty</div>
                <div className="col-span-2">Paid</div>
                <div className="col-span-1">Open</div>
              </div>

              {/* Items */}
              <div className="space-y-3">
                {loading && page === 1 && (
                  <div className="space-y-2">
                    {Array.from({ length: 8 }).map((_, i) => (
                      <div key={i} className="animate-pulse bg-white/5 p-4 rounded-md h-16" />
                    ))}
                  </div>
                )}

                {!loading && pageItems.length === 0 && !error && (
                  <div className="frost-panel p-8 rounded-2xl text-center text-gray-300">No problems found with current filters.</div>
                )}

                {/* {pageItems.map((p) => (
                // <a href={`/practice/leetcode/${p.title_slug}`} target="_blank">
                <a href={`${p.url}`} target="_blank">
                  <div key={p.id} className="frost-panel p-4 rounded-lg grid grid-cols-12 gap-4 items-center">
                    <div className="col-span-1 text-sm text-gray-300">{p.frontend_id}</div>

                    <div className="col-span-6">
                      <Link href={`/practice/leetcode/${p.title_slug}`} className="text-white font-medium hover:underline">
                        {p.title}
                      </Link>
                      <div className="text-xs text-gray-400 mt-1">{p.title_slug}</div>
                    </div>

                    <div className="col-span-2">
                      <span
                        className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                          p.difficulty === "Easy" ? "bg-green-600/20 text-green-200" : p.difficulty === "Medium" ? "bg-yellow-600/20 text-yellow-200" : "bg-red-600/20 text-red-200"
                        }`}
                      >
                        {p.difficulty}
                      </span>
                    </div>

                    <div className="col-span-2 text-sm text-gray-300">{p.paid_only ? "Paid" : "Free"}</div>

                    <div className="col-span-1 flex items-center justify-end">
                      <a href={p.url} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 text-sm text-white/90 hover:text-white">
                        <ExternalLink className="w-4 h-4" />
                      </a>
                    </div>
                  </div>
                </a>
                ))} */}



                {pageItems.map((p) => (
                // 1. Add `relative` to the parent div to create a positioning context
                // for the stretched link inside it.
                <div key={p.id} className="frost-panel relative p-4 rounded-lg grid grid-cols-12 gap-4 items-center">
                  <div className="col-span-1 text-sm text-gray-300">{p.frontend_id}</div>

                  <div className="col-span-6">
                    <Link
                      href={`/practice/leetcode/${p.title_slug}`}
                      target="_blank"
                      className="text-white font-medium"
                    >
                      {/*
                        2. This pseudo-element is the magic. It's an invisible layer
                          that stretches to fill the parent `div`, making the whole card
                          clickable.
                      */}
                      <span className="after:absolute after:inset-0 after:z-10" />

                      {/* The actual text content */}
                      {p.title}
                    </Link>
                    <div className="text-xs text-gray-400 mt-1">{p.title_slug}</div>
                  </div>

                  <div className="col-span-2">
                    <span
                      className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                        p.difficulty === "Easy" ? "bg-green-600/20 text-green-200" : p.difficulty === "Medium" ? "bg-yellow-600/20 text-yellow-200" : "bg-red-600/20 text-red-200"
                      }`}
                    >
                      {p.difficulty}
                    </span>
                  </div>

                  <div className="col-span-2 text-sm text-gray-300">{p.paid_only ? "Paid" : "Free"}</div>

                  <div className="col-span-1 flex items-center justify-end">
                    {/*
                      3. For any OTHER links inside the card (like this one), we must add
                        `relative` and a higher `z-index` to make them appear and function
                        "on top" of the main stretched link.
                    */}
                    <a
                      href={p.url}
                      target="_blank"
                      rel="noreferrer"
                      className="relative z-20 inline-flex items-center gap-2 text-sm text-white/90 hover:text-white"
                    >
                      <ExternalLink className="w-4 h-4" />
                    </a>
                  </div>
                </div>
              ))}

                
              </div>

              {/* "View More" button - Replaces pagination */}
              <div className="mt-8 flex justify-center">
                {/* This button only shows if there are more problems to load */}
                {pageItems.length < filtered.length && (
                  <button
                    onClick={() => setPage(p => p + 1)}
                    disabled={loading}
                    className="px-8 py-3 rounded-md font-medium transition bg-white text-black hover:bg-gray-200 shadow-glow-white disabled:opacity-50 disabled:cursor-wait"
                  >
                    {loading ? "Loading..." : "View More"}
                  </button>
                )}
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
