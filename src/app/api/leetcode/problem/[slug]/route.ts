// src/app/api/leetcode/problem/[slug]/route.ts
import { NextResponse } from "next/server";

const EXTERNAL_BASE = "https://leetcode-api-pied.vercel.app/problem";

export async function GET(
  request: Request,
  context: { params: Promise<{ slug: string }> }
) {
  const { slug } = await context.params;
  if (!slug) {
    return NextResponse.json({ error: "Missing slug" }, { status: 400 });
  }

  const url = `${EXTERNAL_BASE}/${encodeURIComponent(slug)}`;
  try {
    const res = await fetch(url, {
      headers: {
        "User-Agent": "Replix-Server-Proxy/1.0",
      },
      cache: "no-store",
    });

    if (!res.ok) {
      return NextResponse.json(
        { error: `Upstream error ${res.status}` },
        { status: res.status }
      );
    }

    const data = await res.json();
    return NextResponse.json(data, {
      status: 200,
      headers: {
        "Cache-Control": "public, s-maxage=60, stale-while-revalidate=120",
      },
    });
  } catch (err: any) {
    console.error("LeetCode problem proxy error:", err);
    return NextResponse.json(
      { error: err?.message || "Unknown error" },
      { status: 500 }
    );
  }
}