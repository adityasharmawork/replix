// src/components/QuestionPanel.tsx
"use client";

import React, { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import DOMPurify from "isomorphic-dompurify";
import { HelpCircle, BookOpen, Eye, EyeOff, Clock, HardDrive, ExternalLink } from "lucide-react";

type Example = { input: string; output: string; explanation?: string };

type EventProps = {
  // event / room based props (optional)
  roomId?: string;
  question?: string;
  difficulty?: "Easy" | "Medium" | "Hard" | string;
  tags?: string[];
  description?: string;
  inputFormat?: string;
  outputFormat?: string;
  examples?: Example[];
  timeLimit?: string;
  memoryLimit?: string;
};

type PracticeProps = {
  // leetcode mode: pass slug to fetch remote detail from proxy
  slug?: string;
};

type Props = EventProps & PracticeProps;

export default function QuestionPanel(props: Props) {
  const {
    roomId,
    question,
    difficulty,
    tags = [],
    description,
    inputFormat,
    outputFormat,
    examples = [],
    timeLimit,
    memoryLimit,
    slug,
  } = props;

  // Local state for LeetCode fetch
  const [detailLoading, setDetailLoading] = useState(false);
  const [detailError, setDetailError] = useState<string | null>(null);
  const [detailData, setDetailData] = useState<any | null>(null);

  // Collapse state
  const [isCollapsed, setIsCollapsed] = useState(false);

  // If slug present, fetch LeetCode problem; otherwise, use passed-in event props.
  useEffect(() => {
    if (!slug) {
      setDetailData(null);
      setDetailError(null);
      setDetailLoading(false);
      return;
    }

    let cancelled = false;
    setDetailLoading(true);
    setDetailError(null);
    setDetailData(null);

    const url = `/api/leetcode/problem/${encodeURIComponent(slug)}`;
    fetch(url)
      .then(async (res) => {
        if (!res.ok) {
          const body = await res.json().catch(() => ({}));
          throw new Error(body?.error ?? `HTTP ${res.status}`);
        }
        return res.json();
      })
      .then((data) => {
        if (cancelled) return;
        setDetailData(data);
      })
      .catch((err) => {
        if (cancelled) return;
        console.error("Error fetching problem detail:", err);
        setDetailError(String(err?.message || err));
      })
      .finally(() => {
        if (!cancelled) setDetailLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, [slug]);

  // Helper: get the active values (either event props or detail data)
  const active = useMemo(() => {
    if (detailData) {
      // adapt fields from the API response to our UI shape
      return {
        title: detailData.title ?? question,
        frontendId: detailData.questionFrontendId ?? detailData.questionId ?? undefined,
        difficulty: detailData.difficulty ?? detailData.isPaidOnly ? "Paid" : detailData.difficulty ?? difficulty,
        tags: (detailData.topicTags ?? []).map((t: any) => t.name).filter(Boolean),
        descriptionHtml: detailData.content ?? description,
        inputFormat: detailData.inputFormat ?? inputFormat,
        outputFormat: detailData.outputFormat ?? outputFormat,
        examples:
          // If API didn't provide `examples` array separately, we let the content HTML include examples.
          detailData.examples && Array.isArray(detailData.examples)
            ? detailData.examples
            : examples,
        timeLimit: detailData.timeLimit ?? timeLimit,
        memoryLimit: detailData.memoryLimit ?? memoryLimit,
        stats: (() => {
          try {
            return detailData.stats ? JSON.parse(detailData.stats) : null;
          } catch {
            return null;
          }
        })(),
        acRate: (() => {
          try {
            const s = detailData.stats;
            if (!s) return null;
            const parsed = typeof s === "string" ? JSON.parse(s) : s;
            return parsed?.acRate ?? null;
          } catch {
            return null;
          }
        })(),
        externalUrl: detailData.url ?? undefined,
        hints: detailData.hints ?? undefined,
        similarQuestions: (() => {
          try {
            const raw = detailData.similarQuestions;
            if (!raw) return [];
            return typeof raw === "string" ? JSON.parse(raw) : raw;
          } catch {
            return [];
          }
        })(),
      };
    }

    // event fallback (use the passed props)
    return {
      title: question,
      frontendId: undefined,
      difficulty: difficulty ?? "Unknown",
      tags,
      descriptionHtml: description,
      inputFormat,
      outputFormat,
      examples,
      timeLimit,
      memoryLimit,
      stats: null,
      acRate: null,
      externalUrl: undefined,
      hints: undefined,
      similarQuestions: [],
    };
  }, [detailData, question, difficulty, tags, description, inputFormat, outputFormat, examples, timeLimit, memoryLimit]);

  const getDifficultyColor = (diff: string | undefined) => {
    switch ((diff || "").toLowerCase()) {
      case "easy":
        return "text-green-400 bg-green-900/10";
      case "medium":
        return "text-yellow-400 bg-yellow-900/10";
      case "hard":
        return "text-red-400 bg-red-900/10";
      default:
        return "text-gray-400 bg-white/3";
    }
  };

  const renderSanitizedHtml = (html?: string) => {
    if (!html) return null;
    // Allow iframe tags commonly used in solutions
    const clean = DOMPurify.sanitize(html, {
      ADD_TAGS: ["iframe"],
      ADD_ATTR: ["allow", "allowfullscreen", "frameborder", "scrolling", "src"],
    });
    return <div dangerouslySetInnerHTML={{ __html: clean }} className="prose max-w-none text-sm text-gray-200" />;
  };

  return (
    <div className="relative mb-3 flex flex-col">
      <div className="relative bg-[#181825] rounded-xl p-3 ring-1 ring-gray-800/50 flex flex-col select-none">
        {/* Header */}
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2">
            <div className="flex items-center justify-center w-6 h-6 rounded-lg bg-[#1e1e2e] ring-1 ring-gray-800/50">
              <HelpCircle className="w-4 h-4 text-white" />
            </div>

            <div className="flex flex-col">
              <div className="flex items-center gap-2">
                <h2 className="text-sm font-medium text-gray-300">{active.title ?? "Untitled problem"}</h2>
                {active.frontendId && <span className="text-xs px-2 py-0.5 rounded-full bg-[#1e1e2e] ring-1 ring-gray-800/50 text-gray-400">#{active.frontendId}</span>}
                <span className={`text-xs px-2 py-0.5 rounded-full ${getDifficultyColor(active.difficulty)}`}>{active.difficulty}</span>
                {roomId && <span className="text-xs px-2 py-0.5 rounded bg-[#1e1e2e] text-gray-400 ring-1 ring-gray-700/50">Room: {roomId}</span>}
              </div>
              <div className="text-xs text-gray-400">{active.acRate ? `${active.acRate} acceptance` : (active.stats ? `${active.stats?.totalAccepted ?? "-"} accepted` : "")}</div>
            </div>
          </div>

          <button
            onClick={() => setIsCollapsed((s) => !s)}
            className="flex items-center gap-1.5 px-2.5 py-1.5 text-xs text-gray-400 hover:text-gray-300 bg-[#1e1e2e] rounded-lg ring-1 ring-gray-800/50 hover:ring-gray-700/50 transition-all"
          >
            {isCollapsed ? (
              <>
                <Eye className="w-3.5 h-3.5" />
                Show
              </>
            ) : (
              <>
                <EyeOff className="w-3.5 h-3.5" />
                Hide
              </>
            )}
          </button>
        </div>

        {/* collapsed notice */}
        {isCollapsed ? (
          <div className="py-6 text-center text-sm text-gray-400">Problem hidden — click Show to view description and examples.</div>
        ) : (
          <div className="relative flex flex-col">
            <div className="relative bg-[#1e1e2e]/50 backdrop-blur-sm border border-[#313244] rounded-xl p-3 overflow-auto max-h-[70vh]">
              {/* Title row and tags */}
              <div className="flex items-start gap-3 mb-4">
                <BookOpen className="w-5 h-5 flex-shrink-0 mt-1 text-blue-400" />
                <div className="space-y-2 flex-1">
                  <h3 className="font-medium text-gray-200 text-lg">{active.title}</h3>

                  <div className="flex flex-wrap gap-2">
                    {(active.tags || []).map((t: string, i: number) => (
                      <span key={i} className="text-xs px-2 py-1 rounded bg-gray-800/70 text-gray-400 ring-1 ring-gray-700/50">
                        {t}
                      </span>
                    ))}
                    {active.timeLimit && <span className="text-xs px-2 py-1 rounded bg-gray-800/70 text-gray-400 ring-1 ring-gray-700/50">TL: {active.timeLimit}</span>}
                    {active.memoryLimit && <span className="text-xs px-2 py-1 rounded bg-gray-800/70 text-gray-400 ring-1 ring-gray-700/50">ML: {active.memoryLimit}</span>}
                  </div>
                </div>
              </div>

              {/* Description / content (HTML sanitized) */}
              <div className="space-y-3 mb-4">
                <div className="text-sm font-medium text-gray-300">Problem statement</div>
                {detailLoading ? (
                  <div className="animate-pulse space-y-3">
                    <div className="h-4 bg-white/6 rounded w-3/4" />
                    <div className="h-3 bg-white/6 rounded w-1/2" />
                    <div className="h-40 bg-white/6 rounded" />
                  </div>
                ) : detailError ? (
                  <div className="text-rose-300 text-sm">Failed to load problem: {detailError}</div>
                ) : (
                  <>
                    {active.descriptionHtml ? (
                      <div className="text-sm text-gray-400 leading-relaxed whitespace-pre-wrap">{renderSanitizedHtml(active.descriptionHtml)}</div>
                    ) : (
                      <div className="text-sm text-gray-400">No description available.</div>
                    )}
                  </>
                )}
              </div>

              {/* IO formats */}
              {(active.inputFormat || active.outputFormat) && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  {active.inputFormat && (
                    <div>
                      <div className="text-sm font-medium text-gray-300">Input Format</div>
                      <div className="text-sm text-gray-400 leading-relaxed whitespace-pre-wrap bg-[#0d0f12] rounded-lg p-2 mt-1">{active.inputFormat}</div>
                    </div>
                  )}
                  {active.outputFormat && (
                    <div>
                      <div className="text-sm font-medium text-gray-300">Output Format</div>
                      <div className="text-sm text-gray-400 leading-relaxed whitespace-pre-wrap bg-[#0d0f12] rounded-lg p-2 mt-1">{active.outputFormat}</div>
                    </div>
                  )}
                </div>
              )}

              {/* Examples */}
              {Array.isArray(active.examples) && active.examples.length > 0 && (
                <div className="space-y-3 mb-4">
                  <div className="text-sm font-medium text-gray-300">Examples</div>
                  {active.examples.map((ex: any, idx: number) => (
                    <div key={idx} className="bg-[#0d0f12] rounded-lg p-3">
                      {ex.input !== undefined && (
                        <>
                          <div className="text-xs text-gray-400 mb-1">Input:</div>
                          <pre className="text-sm text-gray-300 bg-black/50 rounded p-2 font-mono whitespace-pre-wrap">{ex.input}</pre>
                        </>
                      )}
                      {ex.output !== undefined && (
                        <>
                          <div className="text-xs text-gray-400 mt-2 mb-1">Output:</div>
                          <pre className="text-sm text-gray-300 bg-black/50 rounded p-2 font-mono whitespace-pre-wrap">{ex.output}</pre>
                        </>
                      )}
                      {ex.explanation && (
                        <>
                          <div className="text-xs text-gray-400 mt-2 mb-1">Explanation:</div>
                          <div className="text-sm text-gray-400">{ex.explanation}</div>
                        </>
                      )}
                    </div>
                  ))}
                </div>
              )}

              {/* Hints (collapsible) */}
              {active.hints && active.hints.length > 0 && (
                <details className="mt-3 bg-white/3 p-3 rounded">
                  <summary className="font-medium">Hints</summary>
                  <ul className="mt-2 list-disc pl-5 text-sm text-gray-200 space-y-2">
                    {active.hints.map((h: string, i: number) => (
                      <li key={i}>{h}</li>
                    ))}
                  </ul>
                </details>
              )}

              {/* Similar questions */}
              {Array.isArray(active.similarQuestions) && active.similarQuestions.length > 0 && (
                <div className="mt-4">
                  <div className="text-sm font-medium text-gray-300">Similar questions</div>
                  <ul className="mt-2 space-y-2 text-sm">
                    {active.similarQuestions.slice(0, 8).map((s: any, i: number) => (
                      <li key={i}>
                        <Link href={`/practice/leetcode/${s.titleSlug || s.title_slug}`} className="text-white/90 hover:underline">
                          {s.title} <span className="text-xs text-gray-400">({s.difficulty || ""})</span>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* External link */}
              {active.externalUrl && (
                <div className="mt-4 flex justify-end">
                  <a href={active.externalUrl} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 text-sm text-white/90 hover:underline">
                    View on LeetCode <ExternalLink className="w-4 h-4" />
                  </a>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
