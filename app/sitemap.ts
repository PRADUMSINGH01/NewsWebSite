// app/sitemap.ts
import type { MetadataRoute } from "next";
import { fetchCollection } from "@/components/server/fetchnews";

export const revalidate = 86400; // 24 hours
const BASE_URL = "https://www.hmarduniya.in";

/** Possible Firestore-like timestamp shape (client / serialized) */
interface FirestoreTimestampLike {
  seconds?: unknown;
  nanoseconds?: unknown;
  _seconds?: unknown;
  _nanoseconds?: unknown;
  toDate?: unknown;
}

interface Post {
  slug: string;
  updatedAt?: unknown;
  modifiedAt?: unknown;
  createdAt?: unknown;
  publishedAt?: unknown;
}

/** Narrowing helpers (no `any`) */
function isPost(obj: unknown): obj is Post {
  if (typeof obj !== "object" || obj === null) return false;
  const rec = obj as Record<string, unknown>;
  return typeof rec.slug === "string";
}

function isDateLike(obj: unknown): obj is Date {
  return obj instanceof Date;
}

function isFirestoreTimestampLike(obj: unknown): obj is FirestoreTimestampLike {
  if (typeof obj !== "object" || obj === null) return false;
  const rec = obj as Record<string, unknown>;
  // detect common shapes: has numeric seconds/nanoseconds or _seconds/_nanoseconds
  return (
    (typeof rec.seconds === "number" && typeof rec.nanoseconds === "number") ||
    (typeof rec._seconds === "number" &&
      typeof rec._nanoseconds === "number") ||
    typeof rec.toDate === "function"
  );
}

/** Normalize many date shapes -> ISO or null */
function normalizeToISO(dateLike: unknown): string | null {
  if (!dateLike) return null;

  // Date instance
  if (isDateLike(dateLike)) {
    return Number.isFinite(dateLike.getTime()) ? dateLike.toISOString() : null;
  }

  // Firestore Timestamp or similar
  if (isFirestoreTimestampLike(dateLike)) {
    const rec = dateLike as FirestoreTimestampLike;

    // Prefer existing toDate() if present (Firestore admin/client)
    if (typeof rec.toDate === "function") {
      try {
        const d = (rec.toDate as () => Date)();
        if (d instanceof Date && Number.isFinite(d.getTime()))
          return d.toISOString();
      } catch {
        // continue to numeric conversion fallback
      }
    }

    // numeric fields fallback (seconds + nanoseconds)
    const seconds =
      typeof rec.seconds === "number"
        ? rec.seconds
        : typeof rec._seconds === "number"
        ? rec._seconds
        : undefined;

    const nanoseconds =
      typeof rec.nanoseconds === "number"
        ? rec.nanoseconds
        : typeof rec._nanoseconds === "number"
        ? rec._nanoseconds
        : 0;

    if (typeof seconds === "number") {
      const ms = seconds * 1000 + Math.floor((nanoseconds ?? 0) / 1_000_000);
      const d = new Date(ms);
      return Number.isFinite(d.getTime()) ? d.toISOString() : null;
    }

    return null;
  }

  // Number (unix ms)
  if (typeof dateLike === "number") {
    const d = new Date(dateLike);
    return Number.isFinite(d.getTime()) ? d.toISOString() : null;
  }

  // String parsing (ISO or yyyy-mm-dd)
  if (typeof dateLike === "string") {
    const parsed = new Date(dateLike);
    if (Number.isFinite(parsed.getTime())) return parsed.toISOString();

    const isoMatch = dateLike.match(/^(\d{4})-(\d{2})-(\d{2})$/);
    if (isoMatch) {
      const iso = new Date(
        `${isoMatch[1]}-${isoMatch[2]}-${isoMatch[3]}T00:00:00.000Z`
      );
      return Number.isFinite(iso.getTime()) ? iso.toISOString() : null;
    }
  }

  return null;
}

/** Try to extract DD-MM-YY or DD-MM-YYYY from slug and convert (existing fallback you already use) */
function extractDateFromSlug(slug: string): string | null {
  const m = slug.match(/(\d{1,2})[-_](\d{1,2})[-_](\d{2,4})/);
  if (!m) return null;
  const day = Number(m[1]);
  const month = Number(m[2]);
  let year = Number(m[3]);
  if (String(m[3]).length === 2) year += 2000;
  if (!(year >= 1900 && month >= 1 && month <= 12 && day >= 1 && day <= 31))
    return null;
  const iso = new Date(Date.UTC(year, month - 1, day, 0, 0, 0, 0));
  return Number.isFinite(iso.getTime()) ? iso.toISOString() : null;
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const raw = await fetchCollection("news");

  if (!Array.isArray(raw)) {
    console.warn(
      "[sitemap] fetchCollection('news') did not return an array",
      raw
    );
    return [
      { url: `${BASE_URL}/`, lastModified: new Date().toISOString() },
      {
        url: `${BASE_URL}/about`,
        lastModified: new Date("2025-01-01").toISOString(),
      },
    ];
  }

  const posts = raw.filter(isPost);

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: `${BASE_URL}/`, lastModified: new Date().toISOString() },
    {
      url: `${BASE_URL}/about`,
      lastModified: new Date("2025-01-01").toISOString(),
    },
  ];

  const dynamicRoutes: MetadataRoute.Sitemap = posts.map((p) => {
    const candidate =
      p.updatedAt ?? p.modifiedAt ?? p.publishedAt ?? p.createdAt ?? null;

    let normalized = normalizeToISO(candidate);

    if (!normalized) {
      normalized = extractDateFromSlug(p.slug);
      if (normalized) {
        console.info(
          "[sitemap] used slug date fallback for",
          p.slug,
          normalized
        );
      }
    }

    if (!normalized) {
      console.warn("[sitemap] invalid date for post, omitting lastModified", {
        slug: p.slug,
        updatedAt: p.updatedAt,
        modifiedAt: p.modifiedAt,
        createdAt: p.createdAt,
        publishedAt: p.publishedAt,
      });
      return { url: `${BASE_URL}/Read-full-news/${p.slug}` };
    }

    return {
      url: `${BASE_URL}/Read-full-news/${p.slug}`,
      lastModified: normalized,
    };
  });

  return [...staticRoutes, ...dynamicRoutes];
}
