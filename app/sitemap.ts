// app/sitemap.ts
import type { MetadataRoute } from "next";
import { fetchCollection } from "@/components/server/fetchnews"; // your data fetching
export const revalidate = 86400; // 24 * 60 * 60 seconds

const BASE_URL = "https://hmarduniya.in";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // Fetch dynamic slugs from your DB / CMS
  const posts = await fetchCollection("news"); // -> [{ slug: 'how-to-next', updatedAt: '2025-10-01' }, ...]

  // Static routes
  const staticRoutes: MetadataRoute.Sitemap = [
    { url: `${BASE_URL}/`, lastModified: new Date().toISOString() },
    { url: `${BASE_URL}/about`, lastModified: "2025-01-01" },
  ];

  // Map dynamic posts -> sitemap entries
  const dynamicRoutes: MetadataRoute.Sitemap = posts.map((p) => ({
    url: `${BASE_URL}/Read-full-news/${p.slug}`,
    lastModified: p.updatedAt, // ISO string
  }));

  return [...staticRoutes, ...dynamicRoutes];
}
