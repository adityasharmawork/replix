"use client";

import React, { useState } from "react";
import { Mail, Check, Github, Twitter, ArrowRight, Linkedin } from "lucide-react";

export default function ProjectsComingSoon() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "error" | "subscribed">("idle");

  function validateEmail(e: string) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e);
  }

  function handleSubmit(ev: React.FormEvent) {
    ev.preventDefault();
    if (!validateEmail(email)) {
      setStatus("error");
      return;
    }

    // Simulated subscription flow (no network call)
    setStatus("subscribed");
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-zinc-900 via-slate-900 to-indigo-950 text-white flex items-center justify-center p-6">
      <div className="relative w-full max-w-6xl">
        {/* Decorative blurred backgrounds */}
        <div className="pointer-events-none absolute -inset-20 blur-3xl opacity-30" style={{ background: "linear-gradient(90deg, rgba(99,102,241,0.12), rgba(139,92,246,0.08), rgba(99,102,241,0.12))" }} />

        <header className="relative z-10 flex items-center justify-between mb-8">
          <a href="/" className="inline-flex items-center gap-3 text-sm font-medium">
            <div className="w-9 h-9 rounded-lg bg-white/6 flex items-center justify-center ring-1 ring-white/6">RL</div>
            <span className="hidden sm:inline">Replix Learning</span>
          </a>
          <nav className="flex items-center gap-4 text-sm text-gray-300">
            <a href="/learning" className="hover:underline">Learning</a>
            <a href="/editor" className="hover:underline">Editor</a>
            <a href="#waitlist" className="px-3 py-2 rounded-lg bg-white/5">Projects</a>
          </nav>
        </header>

        <main className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          {/* Left: Hero Card */}
          <section className="p-8 rounded-2xl bg-gradient-to-b from-black/40 to-white/3 ring-1 ring-white/6 backdrop-blur-md">
            <div className="flex items-start gap-4">
              {/* Keep emoji native by isolating it from gradient/text styles */}
              <span className="text-4xl leading-none select-none">🚀</span>
              <div>
                <h1 className="text-3xl md:text-4xl font-extrabold leading-tight">Projects — Coming Soon</h1>
                <p className="mt-3 text-gray-300 max-w-md">We’re building a curated collection of hands-on, instructor-led projects that plug straight into the Replix editor. Expect guided builds, templates, testable deliverables and real-world gradeable tasks.</p>

                <div className="mt-6 flex flex-wrap gap-3">
                  <a href="/learning" className="inline-flex items-center gap-2 px-4 py-2 bg-white text-black rounded-lg font-medium">Explore Learning <ArrowRight className="w-4 h-4" /></a>
                  {/* <a href="#waitlist" className="inline-flex items-center gap-2 px-4 py-2 ring-1 ring-white/10 rounded-lg">Join Waitlist</a> */}
                </div>

                <div className="mt-8 grid grid-cols-2 gap-3 max-w-xs">
                  <div className="p-3 bg-white/3 rounded-lg">
                    <div className="text-sm font-semibold">Guided Builds</div>
                    <div className="text-xs text-gray-300 mt-1">Step-by-step project walkthroughs</div>
                  </div>
                  <div className="p-3 bg-white/3 rounded-lg">
                    <div className="text-sm font-semibold">Assessments</div>
                    <div className="text-xs text-gray-300 mt-1">Automated tests & feedback</div>
                  </div>
                </div>

                {/* <div className="mt-6 flex items-center gap-2 text-sm text-gray-400">
                  <Check className="w-4 h-4" /> <span>First batch launching Q4 — early access by sign-up</span>
                </div> */}
              </div>
            </div>

            <hr className="my-6 border-white/6" />

            {/* Waitlist form */}
            {/* <form id="waitlist" onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 items-stretch sm:items-center">
              <label htmlFor="email" className="sr-only">Email address</label>
              <div className="flex-1">
                <div className={`flex items-center gap-2 rounded-lg px-3 py-2 bg-white/5 ring-1 ${status === "error" ? "ring-red-400" : "ring-white/6"}`}>
                  <Mail className="w-5 h-5 text-gray-200" />
                  <input
                    id="email"
                    value={email}
                    onChange={(e) => { setEmail(e.target.value); setStatus("idle"); }}
                    placeholder="you@company.com"
                    className="bg-transparent outline-none w-full placeholder:text-gray-400"
                    aria-invalid={status === "error"}
                    aria-describedby={status === "error" ? "email-error" : undefined}
                  />
                </div>
                {status === "error" && <p id="email-error" className="mt-2 text-xs text-red-300">Please enter a valid email address.</p>}
                {status === "subscribed" && <p className="mt-2 text-xs text-emerald-300">Thanks — you’re on the waitlist! We’ll notify you by email.</p>}
              </div>

              <button type="submit" className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-500/95 rounded-lg font-semibold hover:scale-[1.02] transition-transform">
                Notify Me
                <ArrowRight className="w-4 h-4" />
              </button>
            </form> */}

          </section>

          {/* Right: Feature panel */}
          <aside className="p-8 rounded-2xl bg-gradient-to-b from-white/3 to-black/20 ring-1 ring-white/6 backdrop-blur-md">
            <h3 className="text-lg font-semibold">What to expect</h3>
            <ul className="mt-4 space-y-3 text-gray-200">
              <li className="flex items-start gap-3">
                <Check className="w-5 h-5 mt-1" />
                <div>
                  <div className="font-medium">Starter templates</div>
                  <div className="text-sm text-gray-400">Boilerplates, configs and tests pre-configured so you can focus on learning.</div>
                </div>
              </li>

              <li className="flex items-start gap-3">
                <Check className="w-5 h-5 mt-1" />
                <div>
                  <div className="font-medium">Integrated editor runs</div>
                  <div className="text-sm text-gray-400">Run, edit and submit projects right inside Replix — no setup required.</div>
                </div>
              </li>

              <li className="flex items-start gap-3">
                <Check className="w-5 h-5 mt-1" />
                <div>
                  <div className="font-medium">Peer reviews & badges</div>
                  <div className="text-sm text-gray-400">Collaborative feedback and recognition for completed projects.</div>
                </div>
              </li>

              <li className="flex items-start gap-3">
                <Check className="w-5 h-5 mt-1" />
                <div>
                  <div className="font-medium">AI-powered hints</div>
                  <div className="text-sm text-gray-400">Contextual prompts and hints to unblock you while building.</div>
                </div>
              </li>
            </ul>

            <hr className="my-6 border-white/6" />

            <div className="text-sm text-gray-300">
              <p className="mb-3">Want early access or want to get your project built? <br/>Drop your interest and we’ll reach out.</p>

              <div className="flex items-center gap-3">
                <a href="https://www.linkedin.com/company/helloreplix" target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 px-3 py-2 bg-white/5 rounded-lg">
                  <Linkedin className="w-4 h-4" /> <span className="text-sm">LinkedIn</span>
                </a>
                <a href="https://x.com/helloreplix" target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 px-3 py-2 bg-white/5 rounded-lg">
                  <Twitter className="w-4 h-4" /> <span className="text-sm">Twitter</span>
                </a>
              </div>
            </div>

            <footer className="mt-8 text-xs text-gray-400">
              <div>Replix Learning — Crafted for focused, hands-on learning.</div>
              <div className="mt-2">Questions? <a href="mailto:contact@replix.co.in" className="underline">contact@replix.co.in</a></div>
            </footer>
          </aside>
        </main>
      </div>
    </div>
  );
}
