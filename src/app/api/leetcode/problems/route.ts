// src/app/api/leetcode/problems/route.ts
import { NextResponse } from "next/server";

const EXTERNAL = "https://leetcode-api-pied.vercel.app/problems";

export async function GET() {
  try {
    const res = await fetch(EXTERNAL, {
      headers: {
        "User-Agent": "Replix-Server-Proxy/1.0",
      },
      // choose caching strategy: 'no-store' to always revalidate, or 'force-cache'/'default' for CDN caching
      cache: "no-store",
    });

    if (!res.ok) {
      return NextResponse.json({ error: `Upstream error ${res.status}` }, { status: res.status });
    }

    const data = await res.json();

    if (!Array.isArray(data)) {
      return NextResponse.json({ error: "Upstream returned unexpected shape" }, { status: 502 });
    }

    return NextResponse.json(data, {
      status: 200,
      headers: {
        // let CDN cache briefly — adjust values as needed
        "Cache-Control": "public, s-maxage=60, stale-while-revalidate=120",
      },
    });
  } catch (err: any) {
    console.error("LeetCode proxy error:", err);
    return NextResponse.json({ error: err?.message || "Unknown error" }, { status: 500 });
  }
}
