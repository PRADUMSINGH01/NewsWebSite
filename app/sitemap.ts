// app/sitemap.ts
import type { MetadataRoute } from "next";
import { fetchCollection } from "@/components/server/fetchnews";

export const revalidate = 86400; // 24 hours
const BASE_URL = "https://hmarduniya.in";

/** Try to parse many possible date shapes and return either an ISO string or null */
function normalizeToISO(dateLike: unknown): string | null {
  if (!dateLike) return null;

  // If already a Date
  if (dateLike instanceof Date) {
    if (!isNaN(dateLike.getTime())) return dateLike.toISOString();
    return null;
  }

  // If number (timestamp)
  if (typeof dateLike === "number") {
    const d = new Date(dateLike);
    return isNaN(d.getTime()) ? null : d.toISOString();
  }

  // If string - try parse
  if (typeof dateLike === "string") {
    // Some sources already give YYYY-MM-DD, which is valid for sitemaps.
    // We'll try Date constructor then fallback to simple YYYY-MM-DD check.
    const parsed = new Date(dateLike);
    if (!isNaN(parsed.getTime())) return parsed.toISOString();

    // fallback: match YYYY-MM-DD
    const simple = dateLike.match(/^(\d{4})-(\d{2})-(\d{2})$/);
    if (simple) {
      // make a midnight UTC date from YYYY-MM-DD
      const iso = new Date(
        `${simple[1]}-${simple[2]}-${simple[3]}T00:00:00.000Z`
      );
      return !isNaN(iso.getTime()) ? iso.toISOString() : null;
    }
  }

  return null;
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const posts = await fetchCollection("news"); // your data fetching

  // Static routes — use full ISO strings
  const staticRoutes: MetadataRoute.Sitemap = [
    { url: `${BASE_URL}/`, lastModified: new Date().toISOString() },
    {
      url: `${BASE_URL}/about`,
      lastModified: new Date("2025-01-01").toISOString(),
    },
  ];

  // Map dynamic posts -> sitemap entries with validated lastModified
  const dynamicRoutes: MetadataRoute.Sitemap = posts.map((p: any) => {
    const normalized = normalizeToISO(
      p?.updatedAt || p?.modifiedAt || p?.createdAt
    );
    if (!normalized) {
      // log for debugging (server console)
      // NOTE: this runs server-side, so check your terminal or deployment logs
      console.warn(`[sitemap] invalid date for post`, {
        slug: p?.slug,
        updatedAt: p?.updatedAt,
      });
      return { url: `${BASE_URL}/Read-full-news/${p.slug}` }; // omit lastModified if invalid
    }
    return {
      url: `${BASE_URL}/Read-full-news/${p.slug}`,
      lastModified: normalized,
    };
  });

  return [...staticRoutes, ...dynamicRoutes];
}
