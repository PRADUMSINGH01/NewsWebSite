"use client";
import React, { useEffect, useState } from "react";

/**
 * Props:
 * - post?: object            // full post data (preferred, server-provided)
 * - postId?: string          // id to fetch from /api/posts/[id]
 * - fetchRelated?: boolean   // whether to fetch related posts by tag
 *
 * Endpoint assumptions (change to match your backend):
 * - GET /api/posts/{id} -> returns post object
 * - GET /api/posts?tag=TAG&limit=3 -> returns array of related posts
 */

const UserIcon = ({ className = "w-5 h-5" }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
    <circle cx="12" cy="7" r="4"></circle>
  </svg>
);

const CalendarIcon = ({ className = "w-5 h-5" }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
    <line x1="16" y1="2" x2="16" y2="6"></line>
    <line x1="8" y1="2" x2="8" y2="6"></line>
    <line x1="3" y1="10" x2="21" y2="10"></line>
  </svg>
);

const TwitterIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    width="18"
    height="18"
    fill="currentColor"
    className="inline-block"
  >
    <path d="M22.46 6c-.77.35-1.6.58-2.46.69a4.2 4.2 0 0 0 1.84-2.32 8.3 8.3 0 0 1-2.65 1.02A4.15 4.15 0 0 0 11.1 9.03a11.8 11.8 0 0 1-8.56-4.34 4.1 4.1 0 0 0 1.28 5.53 4.07 4.07 0 0 1-1.88-.52v.05a4.15 4.15 0 0 0 3.33 4.07 4.2 4.2 0 0 1-1.87.07 4.16 4.16 0 0 0 3.88 2.88A8.33 8.33 0 0 1 2 18.58a11.76 11.76 0 0 0 6.29 1.84c7.55 0 11.69-6.26 11.69-11.69v-.53A8.36 8.36 0 0 0 22.46 6z" />
  </svg>
);

/* ------------------------- Utility: format date ------------------------- */
function formatDate(post) {
  const hindiMonths = [
    "जनवरी",
    "फ़रवरी",
    "मार्च",
    "अप्रैल",
    "मई",
    "जून",
    "जुलाई",
    "अगस्त",
    "सितंबर",
    "अक्टूबर",
    "नवंबर",
    "दिसंबर",
  ];

  if (post?.time && /^\d{1,2}-\d{1,2}-\d{4}$/.test(post.time)) {
    const [d, m, y] = post.time.split("-").map(Number);
    const monthName = hindiMonths[m - 1] || post.time;
    return `${d} ${monthName}, ${y}`;
  }

  if (post?.createdAt) {
    try {
      const parsed = new Date(String(post.createdAt).replace(" at ", " "));
      if (!Number.isNaN(parsed.getTime())) {
        const d = parsed.getDate();
        const m = parsed.getMonth();
        const y = parsed.getFullYear();
        return `${d} ${hindiMonths[m]}, ${y}`;
      }
    } catch (e) {}
  }

  return post.time || post.createdAt || "तिथि उपलब्ध नहीं";
}

/* ------------------------- Main component ------------------------- */
export default function SimpleNewsPost({
  post: initialPost = null,
  postId = null,
  fetchRelated = false,
}) {
  const [post, setPost] = useState(initialPost);
  const [related, setRelated] = useState(null);
  const [loading, setLoading] = useState(!initialPost && !!postId);
  const [error, setError] = useState(null);

  // Fetch post by ID if initialPost not provided
  useEffect(() => {
    if (initialPost) return; // already have data
    if (!postId) return; // nothing to fetch

    const controller = new AbortController();
    setLoading(true);
    setError(null);

    (async () => {
      try {
        // Replace this endpoint to match your backend (Firestore function / Next API)
        const res = await fetch(`/api/posts/${encodeURIComponent(postId)}`, {
          signal: controller.signal,
        });
        if (!res.ok) throw new Error(`Failed to load post: ${res.status}`);
        const data = await res.json();
        setPost(data);
      } catch (err) {
        if (err.name !== "AbortError") setError(err.message || "Unknown error");
      } finally {
        setLoading(false);
      }
    })();

    return () => controller.abort();
  }, [initialPost, postId]);

  // Optionally fetch related posts by tag
  useEffect(() => {
    if (!fetchRelated) return;
    if (!post?.tag) return;

    const controller = new AbortController();
    (async () => {
      try {
        // Endpoint: GET /api/posts?tag=<tag>&limit=3
        const res = await fetch(
          `/api/posts?tag=${encodeURIComponent(post.tag)}&limit=3`,
          { signal: controller.signal }
        );
        if (!res.ok) throw new Error("Failed to load related posts");
        const data = await res.json();
        // filter out the current post if present
        const filtered = Array.isArray(data)
          ? data.filter(
              (p) =>
                String(p?.id || p?.time || p?.title) !==
                String(post?.id || post?.time || post?.title)
            )
          : [];
        setRelated(filtered);
      } catch (err) {
        // non-fatal; just leave related null
      }
    })();
    return () => controller.abort();
  }, [fetchRelated, post?.tag, post?.id, post?.time, post?.title]);

  const dateLabel = formatDate(post || {});

  // Render logic for article content (keeps behavior from previous component)
  const renderContent = (contentArray) => {
    if (!Array.isArray(contentArray) || contentArray.length === 0) {
      return (
        <>
          {post?.excerpt ? (
            <p className="mb-4 text-gray-700">{post.excerpt}</p>
          ) : null}
          <p className="text-gray-700">
            पूरा लेख प्रकाशित होते ही यहाँ दिखेगा।
          </p>
        </>
      );
    }

    return contentArray.map((block, idx) => {
      if (typeof block === "string") {
        return (
          <p key={idx} className="mb-4 text-gray-800">
            {block}
          </p>
        );
      }
      if (block && typeof block === "object") {
        if (block.text)
          return (
            <p key={idx} className="mb-4 text-gray-800">
              {block.text}
            </p>
          );
        if (block.paragraph)
          return (
            <p key={idx} className="mb-4 text-gray-800">
              {block.paragraph}
            </p>
          );
        return (
          <pre
            key={idx}
            className="mb-4 p-3 rounded bg-gray-50 text-sm text-gray-700 overflow-x-auto"
          >
            {JSON.stringify(block)}
          </pre>
        );
      }
      return null;
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 antialiased">
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link
        rel="preconnect"
        href="https://fonts.gstatic.com"
        crossOrigin="anonymous"
      />
      <link
        href="https://fonts.googleapis.com/css2?family=Noto+Sans+Devanagari:wght@400;700&display=swap"
        rel="stylesheet"
      />

      <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <article className="bg-white rounded-xl shadow-sm overflow-hidden">
          <div className="md:flex md:items-start">
            <div className="md:flex-1">
              {/* Loading / placeholder image */}
              {loading ? (
                <div className="w-full h-56 md:h-80 bg-gray-100 animate-pulse" />
              ) : (
                <img
                  src={post?.img || "/placeholder-1200x600.png"}
                  alt={post?.title || "लेख चित्र"}
                  className="w-full h-56 md:h-80 object-cover"
                />
              )}

              <div className="p-6 md:p-8">
                <div className="flex items-center gap-3 mb-4">
                  <span className="inline-flex items-center bg-red-100 text-red-700 text-sm font-semibold px-3 py-1 rounded-full">
                    {post?.tag || "समाचार"}
                  </span>
                </div>

                {/* Title / loading */}
                <h1
                  className="text-2xl md:text-4xl font-extrabold leading-tight mb-4"
                  style={{ fontFamily: "'Noto Sans Devanagari', sans-serif" }}
                >
                  {loading ? (
                    <span className="inline-block w-64 h-8 bg-gray-200 animate-pulse rounded" />
                  ) : (
                    post?.title || "शीर्षक उपलब्ध नहीं"
                  )}
                </h1>

                {/* Excerpt */}
                {!loading && post?.excerpt ? (
                  <p className="text-gray-700 text-base md:text-lg mb-6">
                    {post.excerpt}
                  </p>
                ) : null}

                {/* Meta row */}
                <div className="flex flex-wrap items-center text-sm text-gray-500 gap-4 mb-6">
                  <span className="inline-flex items-center gap-2">
                    <UserIcon className="w-4 h-4" />
                    {post?.author || "लेखक"}
                  </span>
                  <span className="inline-flex items-center gap-2">
                    <CalendarIcon className="w-4 h-4" />
                    {dateLabel}
                  </span>
                  <span className="inline-flex items-center gap-2">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      className="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <path d="M15 10l4.553-2.276A2 2 0 0 1 22 9.618V17a2 2 0 0 1-2 2h-6" />
                      <path d="M10 14L4.447 16.276A2 2 0 0 1 2 14.382V7a2 2 0 0 1 2-2h6" />
                    </svg>
                    {post?.views ?? 0} बार देखा गया
                  </span>
                </div>

                {/* Content */}
                <div
                  className="prose prose-lg max-w-none text-gray-800"
                  style={{ fontFamily: "'Noto Sans Devanagari', sans-serif" }}
                >
                  {loading ? (
                    <>
                      <div className="h-4 bg-gray-200 rounded w-3/4 mb-3 animate-pulse" />
                      <div className="h-4 bg-gray-200 rounded w-full mb-3 animate-pulse" />
                      <div className="h-4 bg-gray-200 rounded w-5/6 mb-3 animate-pulse" />
                    </>
                  ) : error ? (
                    <p className="text-red-600">त्रुटि: {error}</p>
                  ) : (
                    renderContent(post?.content)
                  )}
                </div>

                {/* share + tags */}
                <div className="mt-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                  <div className="flex flex-wrap gap-2">
                    <span className="text-sm font-semibold text-gray-700 mr-2">
                      टैग:
                    </span>
                    <span className="text-xs bg-gray-200 px-3 py-1 rounded-full">
                      #{(post?.tag || "समाचार").replace(/\s+/g, "")}
                    </span>
                  </div>

                  <div className="flex items-center gap-3">
                    <span className="text-sm font-semibold text-gray-700">
                      शेयर करें:
                    </span>
                    <button
                      aria-label="ट्विटर पर साझा करें"
                      className="p-2 rounded-md hover:bg-gray-100"
                    >
                      <TwitterIcon />
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Sidebar: related posts (renders only if related array exists or fetchRelated is false and related received via prop) */}
            {(related && related.length > 0) ||
            (!fetchRelated &&
              Array.isArray(initialPost?.related) &&
              initialPost.related.length > 0) ? (
              <aside className="hidden md:block md:w-80 lg:w-96 bg-gray-50 border-l border-gray-100">
                <div className="p-6">
                  <h3 className="text-lg font-bold mb-4">यह भी पढ़ें</h3>
                  <div className="space-y-4">
                    {(related && related.length > 0
                      ? related
                      : initialPost?.related || []
                    ).map((r, i) => (
                      <a
                        key={i}
                        href={r.link || "#"}
                        className="flex gap-3 items-start group"
                      >
                        <img
                          src={r.image || "/placeholder-600x400.png"}
                          alt={r.title}
                          className="w-20 h-16 object-cover rounded-md flex-shrink-0"
                        />
                        <div>
                          <h4 className="text-sm font-semibold group-hover:text-red-600">
                            {r.title}
                          </h4>
                          <p className="text-xs text-gray-600 mt-1">
                            {r.excerpt}
                          </p>
                        </div>
                      </a>
                    ))}
                  </div>
                </div>
              </aside>
            ) : null}
          </div>
        </article>

        {/* Author bio */}
        <section className="mt-12">
          <div className="bg-white rounded-lg shadow-sm p-6 flex flex-col sm:flex-row items-center gap-4">
            <img
              src={post?.avatar || "/avatar-placeholder.png"}
              alt={post?.author || "लेखक"}
              className="w-20 h-20 rounded-full object-cover"
            />
            <div>
              <h4 className="font-bold">{post?.author || "लेखक"}</h4>
              <p className="text-sm text-gray-600">
                {post?.author
                  ? `लेखक — ${post.author}`
                  : "लेखक जानकारी उपलब्ध नहीं"}{" "}
                {post?.published ? " · प्रकाशित" : " · ड्राफ्ट"}
              </p>
              <a
                href={post?.authorLink || "#"}
                className="text-sm font-semibold text-red-600 mt-2 inline-block"
              >
                {post?.author
                  ? `${post.author} के और लेख पढ़ें →`
                  : "और पढ़ें →"}
              </a>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
