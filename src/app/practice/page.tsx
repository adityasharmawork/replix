"use client"

import React, { useEffect, useState } from "react";
import Link from "next/link";
import NavigationHeader from "@/components/NavigationHeader";
import ParticlesBackground from "@/components/ParticlesBackground";
import { Terminal, Star, Github, ArrowRight, Code } from "lucide-react";
import { SignedIn, SignedOut } from "@clerk/nextjs";

export default function PracticeComingSoon() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState("idle");
  const [mockProgress, setMockProgress] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("replix_practice_progress") || "{}");
    } catch (e) {
      return {};
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem("replix_practice_progress", JSON.stringify(mockProgress));
    } catch (e) {}
  }, [mockProgress]);

//   function handleSubmit(e: React.FormEvent) {
//     e.preventDefault();
//     if (!email || !/^[\w-.]+@[\w-]+\.[a-z]{2,}$/i.test(email)) {
//       setStatus("error");
//       setTimeout(() => setStatus("idle"), 2200);
//       return;
//     }

//     setStatus("saving");
//     try {
//       const subscribers = JSON.parse(localStorage.getItem("replix_practice_subscribers") || "[]");
//       if (!subscribers.includes(email)) {
//         subscribers.push(email);
//         localStorage.setItem("replix_practice_subscribers", JSON.stringify(subscribers));
//       }
//       setTimeout(() => setStatus("done"), 700);
//     } catch (err) {
//       setStatus("error");
//       setTimeout(() => setStatus("idle"), 1600);
//     }
//   }

  // quick mock: simulate completing a sample problem (only client-side)
//   function completeSample(id: string) {
//     setMockProgress((prev) => ({ ...prev, [id]: (prev[id] || 0) + 1 }));
//   }

  const practiceTeasers = [
    { id: "p1", title: "Arrays & Pointers", level: "Beginner", desc: "Core array problems and two-pointer patterns." },
    { id: "p2", title: "Recursion & Backtracking", level: "Intermediate", desc: "Classic recursion and subset generation." },
    { id: "p3", title: "Graphs Basics", level: "Intermediate", desc: "BFS, DFS and shortest paths (teasers)." },
    { id: "p4", title: "Dynamic Programming", level: "Advanced", desc: "Intro DP patterns with clear walkthroughs." },
    { id: "p5", title: "System Design Intro", level: "Advanced", desc: "Small case-studies and design prompts." },
    { id: "p6", title: "Mock Interviews", level: "All", desc: "Guided interview-style questions with hints." },
  ];

  return (
    <div className="relative min-h-screen selection:bg-white/20 selection:text-white">
      <ParticlesBackground />
      <NavigationHeader />

      <main className="relative pt-28 pb-20 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <div className="relative inline-block mb-8">
            <div className="text-sm mb-6 font-mono text-gray-400 inline-flex items-center gap-2 bg-white/4 px-4 py-1.5 rounded-full">
              <Terminal className="w-4 h-4" />
              <span>Practice playground</span>
            </div>

            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-4 leading-tight">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-300 via-indigo-300 to-purple-300">
                Practice
              </span>
              <span className="block mt-3 text-lg text-gray-400">— Coming Soon</span>
            </h1>

            <p className="text-lg text-gray-300 max-w-2xl mx-auto mt-4">
              Hands-on problems, curated tracks and instant feedback — we're polishing the best experience for you!
            </p>

            {/* <form onSubmit={} className="mt-8 flex items-center justify-center gap-3">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your@work.email"
                className="w-80 md:w-96 bg-white/5 text-white placeholder-gray-400 px-4 py-3 rounded-md ring-1 ring-white/6 focus:outline-none focus:ring-2 focus:ring-white/20 transition"
              />

              <button
                type="submit"
                className={`px-5 py-3 rounded-md font-medium transition-all duration-200 shadow-glow-white
                  ${status === "done" ? "bg-green-400 text-black" : "bg-white text-black hover:bg-gray-200"}`}
              >
                {status === "saving" ? "Saving..." : status === "done" ? "You're in!" : "Notify me"}
              </button>
            </form> */}
            {/* {status === "error" && (
              <p className="mt-3 text-sm text-rose-400">Please enter a valid email address.</p>
            )} */}

            <div className="mt-16 flex items-center justify-center gap-4 text-gray-400">
              <Star className="w-4 h-4" />
              <span className="text-sm">Early access & contributor badges for active members</span>
            </div>
          </div>

          {/* Practice teaser grid */}
          {/* <section className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {practiceTeasers.map((t) => (
              <article
                key={t.id}
                className="relative group overflow-hidden frost-panel p-6 rounded-2xl hover:scale-[1.02] transition-transform duration-300"
                aria-hidden
              >
                <div className="absolute -inset-0.5 bg-white/6 rounded-2xl blur opacity-40" />

                <div className="relative z-10 flex flex-col gap-4">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-lg bg-zinc-900 flex items-center justify-center ring-1 ring-zinc-800">
                      <Code className="w-5 h-5 text-white" />
                    </div>
                    <div className="text-left">
                      <h3 className="text-lg font-semibold text-white">{t.title}</h3>
                      <p className="text-sm text-gray-400 mt-1">{t.desc}</p>
                    </div>
                  </div>

                  <div className="mt-2 text-sm text-gray-300">Track progress, get hints and view sample solutions when we launch.</div>

                  <div className="flex items-center justify-between mt-4">
                    <div className="flex items-center gap-3 text-gray-400 text-sm">
                      <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-white/6 text-gray-200">{t.level}</span>
                      <span className="hidden sm:inline">{mockProgress[t.id] ? `${mockProgress[t.id]} attempts` : "0 attempts"}</span>
                    </div>

                    <div className="flex items-center gap-3">
                      <button
                        onClick={() => completeSample(t.id)}
                        className="inline-flex items-center gap-2 text-sm font-medium text-white/90 hover:text-white transition disabled:opacity-60"
                        aria-label={`Complete sample for ${t.title}`}
                      >
                        Try sample
                      </button>

                      <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-white/6 text-gray-200">
                        Coming soon
                      </span>
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </section> */}

          

          {/* Footer CTA */}
          <div className="mt-16 bg-white/3 ring-1 ring-white/10 p-8 rounded-2xl inline-block">
            <div className="flex flex-col md:flex-row items-center gap-6">
              <div className="flex items-center gap-4">
                <div className="p-3 rounded-lg bg-zinc-900 ring-1 ring-zinc-800">
                  <Star className="w-6 h-6 text-white" />
                </div>
                <div className="text-left">
                  <h4 className="text-lg font-semibold text-white">Loving Replix?</h4>
                  <p className="text-sm text-gray-300">Please Consider Starring us on GitHub! It motivates us to bring better for you!</p>
                </div>
              </div>

              <div className="ml-auto flex gap-4">
                {/* <Link href="/" className="inline-flex items-center gap-2 px-4 py-2 rounded-md bg-white/6 ring-1 ring-white/8 hover:bg-white/8 transition">
                  <span className="text-sm">Back home</span>
                </Link> */}

                <Link href="https://github.com/adityasharmawork/replix" target="_blank" className="inline-flex items-center gap-2 px-4 py-2 rounded-md bg-white text-black hover:bg-gray-200 transition">
                  <span className="text-sm">Star on GitHub</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>

        </div>
      </main>
    </div>
  );
}
