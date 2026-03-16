// app/api/views/[slug]/route.js
// Uses the existing client Firebase SDK (no firebase-admin needed)
// POST → increment views by 1, return new count
// GET  → return current count without incrementing

import { NextResponse } from "next/server";
import { db } from "@/components/server/firebase";
import { doc, getDoc, setDoc, updateDoc, increment } from "firebase/firestore";

// ── GET /api/views/[slug] ─────────────────────────────────────────────────────
export async function GET(request, { params }) {
  try {
    const slug = decodeURIComponent((await params).slug || "");
    if (!slug) return NextResponse.json({ views: 0 });

    const ref  = doc(db, "views", slug);
    const snap = await getDoc(ref);

    return NextResponse.json(
      { views: snap.exists() ? (snap.data()?.views ?? 0) : 0 },
      { headers: { "Cache-Control": "no-store" } }
    );
  } catch (err) {
    console.error("GET /api/views error:", err);
    return NextResponse.json({ views: 0 });
  }
}

// ── POST /api/views/[slug] ────────────────────────────────────────────────────
export async function POST(request, { params }) {
  try {
    const slug = decodeURIComponent((await params).slug || "");
    if (!slug) return NextResponse.json({ views: 0 });

    const ref  = doc(db, "views", slug);
    const snap = await getDoc(ref);

    if (snap.exists()) {
      // Atomically increment
      await updateDoc(ref, { views: increment(1) });
    } else {
      // First view — create the doc
      await setDoc(ref, { views: 1, slug });
    }

    const updated = await getDoc(ref);
    const views   = updated.data()?.views ?? 1;

    return NextResponse.json(
      { views },
      { headers: { "Cache-Control": "no-store" } }
    );
  } catch (err) {
    console.error("POST /api/views error:", err);
    return NextResponse.json({ views: 0 });
  }
}
