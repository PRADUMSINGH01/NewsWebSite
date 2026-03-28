// app/api/views/[slug]/route.js
// Professional Page Views API
// POST → Increment view count + store analytics metadata
// GET  → Return current view count + stats
//
// Firestore collection: "views" — each doc keyed by article slug
// Doc shape: { slug, views, firstViewedAt, lastViewedAt, updatedAt }

import { NextResponse } from "next/server";
import { db } from "@/components/server/firebase";
import {
  doc,
  getDoc,
  setDoc,
  updateDoc,
  increment,
  serverTimestamp,
} from "firebase/firestore";

const CORS_HEADERS = {
  "Cache-Control": "no-store, no-cache, must-revalidate",
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
};

/** Standard JSON response wrapper */
function jsonResponse(data, status = 200) {
  return NextResponse.json(
    { success: status < 400, ...data },
    { status, headers: CORS_HEADERS }
  );
}

/** Decode slug safely */
function decodeSlug(raw) {
  if (!raw) return "";
  try {
    return decodeURIComponent(raw);
  } catch {
    return raw;
  }
}

// ── OPTIONS (CORS preflight) ─────────────────────────────────────────────────
export async function OPTIONS() {
  return new Response(null, { status: 204, headers: CORS_HEADERS });
}

// ── GET /api/views/[slug] ────────────────────────────────────────────────────
// Returns view count and metadata for a specific article
export async function GET(request, { params }) {
  try {
    const slug = decodeSlug((await params).slug);

    if (!slug) {
      return jsonResponse({ error: "slug parameter is required" }, 400);
    }

    const ref = doc(db, "views", slug);
    const snap = await getDoc(ref);

    if (!snap.exists()) {
      return jsonResponse({
        slug,
        views: 0,
        formattedViews: "0",
        isNew: true,
      });
    }

    const data = snap.data();
    const views = data?.views ?? 0;

    return jsonResponse({
      slug,
      views,
      formattedViews: formatViewCount(views),
      firstViewedAt: data?.firstViewedAt ?? null,
      lastViewedAt: data?.lastViewedAt ?? null,
    });
  } catch (err) {
    console.error("[Views API] GET error:", err.message);
    return jsonResponse({ error: "Failed to fetch view count" }, 500);
  }
}

// ── POST /api/views/[slug] ───────────────────────────────────────────────────
// Increments the view count by 1 and records analytics metadata
export async function POST(request, { params }) {
  try {
    const slug = decodeSlug((await params).slug);

    if (!slug) {
      return jsonResponse({ error: "slug parameter is required" }, 400);
    }

    // Extract analytics metadata from the request
    const userAgent = request.headers.get("user-agent") || "unknown";
    const referer = request.headers.get("referer") || "direct";
    const ip =
      request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
      request.headers.get("x-real-ip") ||
      "unknown";

    const ref = doc(db, "views", slug);
    const snap = await getDoc(ref);
    const now = new Date().toISOString();

    if (snap.exists()) {
      // Existing article — atomically increment + update metadata
      await updateDoc(ref, {
        views: increment(1),
        lastViewedAt: now,
        updatedAt: now,
        lastReferer: referer,
      });
    } else {
      // First ever view — create the document
      await setDoc(ref, {
        slug,
        views: 1,
        firstViewedAt: now,
        lastViewedAt: now,
        createdAt: now,
        updatedAt: now,
        lastReferer: referer,
      });
    }

    // Fetch updated count
    const updated = await getDoc(ref);
    const views = updated.data()?.views ?? 1;

    return jsonResponse({
      slug,
      views,
      formattedViews: formatViewCount(views),
      counted: true,
    });
  } catch (err) {
    console.error("[Views API] POST error:", err.message);
    return jsonResponse({ error: "Failed to record view" }, 500);
  }
}

// ── Helpers ──────────────────────────────────────────────────────────────────
function formatViewCount(n) {
  if (n >= 10_000_000) return `${(n / 10_000_000).toFixed(1)} करोड़`;
  if (n >= 100_000) return `${(n / 100_000).toFixed(1)} लाख`;
  if (n >= 1_000) return `${(n / 1_000).toFixed(1)}K`;
  return n.toLocaleString("hi-IN");
}
