// app/(routes)/articles/[Id]/page.jsx
import { getBySlugClient, fetchCollection } from "@/components/server/fetchnews";
import SimpleNewsPost from "@/components/fullpage";
import { notFound } from "next/navigation";
import { cache } from "react";

const SITE_URL = "https://www.hmarduniya.in";
const SITE_NAME = "Hmar Duniya";
const DEFAULT_OG_IMAGE = `${SITE_URL}/logo.png`;

function safeDecode(str) {
  if (!str) return str;
  let prev = str;
  for (let i = 0; i < 3; i++) {
    try {
      const dec = decodeURIComponent(prev);
      if (dec === prev) break;
      prev = dec;
    } catch (e) {
      break;
    }
  }
  return prev;
}

// Memoize the data fetch so it's only executed once per request
const getPost = cache(async (slug) => {
  return await getBySlugClient(slug);
});

// Server-side fetch for related articles (replaces client-side useEffect in fullpage.jsx)
const getRelatedArticles = cache(async () => {
  try {
    const rawData = await fetchCollection("news");
    // Serialize Firebase Timestamps to plain strings for client component consumption
    return (rawData || []).map(item => {
      let createdAtStr = null;
      if (item.createdAt && typeof item.createdAt.toDate === "function") {
        createdAtStr = item.createdAt.toDate().toISOString();
      } else if (item.time) {
        createdAtStr = new Date(item.time).toISOString();
      }
      return {
        id: item.id,
        title: item.title || "",
        slug: item.slug || "",
        img: item.img || "",
        tag: item.tag || "",
        excerpt: item.excerpt || "",
        author: item.author || "",
        avatar: item.avatar || "",
        createdAt: createdAtStr,
        time: createdAtStr,
      };
    });
  } catch (err) {
    console.error("Error fetching related articles:", err);
    return [];
  }
});

/** Safely parse a date from post data */
function getDateISO(postData) {
  try {
    if (postData?.createdAt && typeof postData.createdAt.toDate === "function") {
      return postData.createdAt.toDate().toISOString();
    }
    if (postData?.time) {
      const d = new Date(postData.time);
      if (!isNaN(d.getTime())) return d.toISOString();
    }
  } catch { }
  return new Date().toISOString();
}

/** Ensure image URL is absolute and accessible */
function resolveImageUrl(img) {
  if (!img) return DEFAULT_OG_IMAGE;
  // Already absolute
  if (img.startsWith("http://") || img.startsWith("https://")) return img;
  // Relative path — make absolute
  return `${SITE_URL}${img.startsWith("/") ? "" : "/"}${img}`;
}

export async function generateMetadata(props) {
  const params = await props.params;
  const raw = params?.Id;
  const slugFromParams = Array.isArray(raw) ? raw.join("/") : raw ?? "";
  const decodedSlug = safeDecode(slugFromParams);

  if (!decodedSlug) return {};

  try {
    const post = await getPost(decodedSlug);
    if (!post) return {};

    const postData = post.data || post;
    const title = postData?.title || "Hmar Duniya News";
    const excerpt = postData?.excerpt || postData?.summary || "";
    const tag = postData?.tag || "समाचार";
    const url = `${SITE_URL}/Read-full-news/${decodedSlug}`;
    const author = postData?.author || SITE_NAME;
    const datePublished = getDateISO(postData);
    
    // Specifically define dynamic open graph URL for social media fallback (such as strict twitter cards)
    const ogImageUrl = `${SITE_URL}/Read-full-news/${decodedSlug}/opengraph-image`;

    return {
      title: title,
      description: excerpt,
      alternates: {
        canonical: url,
      },
      openGraph: {
        title: title,
        description: excerpt,
        url: url,
        siteName: SITE_NAME,
        locale: "hi_IN",
        type: "article",
        publishedTime: datePublished,
        authors: [author],
      },
      twitter: {
        card: "summary_large_image",
        title: title,
        description: excerpt,
        images: [ogImageUrl],
      }, 
    };
  } catch (err) {
    return {};
  }
}

export default async function Page(props) {
  const params = await props.params;
  const raw = params?.Id; // could be string or array for catch-all

  // normalize to single string (join arrays with '/')
  const slugFromParams = Array.isArray(raw) ? raw.join("/") : raw ?? "";

  // decode any percent-encoding (handles Hindi / other non-ascii)
  const decodedSlug = safeDecode(slugFromParams);

  if (!decodedSlug) return notFound();

  try {
    // Try fetching with decoded slug first
    let post = await getPost(decodedSlug);

    if (!post) {
      return notFound();
    }

    const postData = post.data || post;
    const title = postData?.title || "Hmar Duniya News";
    const excerpt = postData?.excerpt || postData?.summary || "";
    const img = resolveImageUrl(postData?.img);
    const author = postData?.author || SITE_NAME;
    const url = `${SITE_URL}/Read-full-news/${decodedSlug}`;
    const tag = postData?.tag || "समाचार";

    const datePublished = getDateISO(postData);

    const jsonLd = {
      "@context": "https://schema.org",
      "@type": "NewsArticle",
      headline: title,
      image: [img],
      datePublished: datePublished,
      dateModified: datePublished,
      author: [
        {
          "@type": "Person",
          name: author,
          url: `${SITE_URL}/news`,
        },
      ],
      publisher: {
        "@type": "Organization",
        name: SITE_NAME,
        logo: {
          "@type": "ImageObject",
          url: DEFAULT_OG_IMAGE,
        },
      },
      description: excerpt,
      mainEntityOfPage: {
        "@type": "WebPage",
        "@id": url,
      },
      articleSection: tag,
      inLanguage: "hi",
      keywords: [tag, "Hindi news", "हिंदी समाचार", title.slice(0, 60)],
    };

    return (
      <>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        {/* Pass serialized post + server-fetched related articles to Client Component */}
        <SimpleNewsPost post={{
          ...postData,
          id: post.id || postData.id,
          createdAt: datePublished,
          time: datePublished
        }} relatedArticles={await getRelatedArticles()} />
      </>
    );
  } catch (err) {
    console.error("Error fetching post for slug:", decodedSlug, err);
    return notFound();
  }
}
