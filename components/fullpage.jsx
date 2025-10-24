"use client";
import React, { useEffect, useState } from "react";
import AdIframe from "@/components/AdIframe";
import ProfessionalLoader from "./Loading";
import { fetchCollection } from "./server/fetchnews";
import BackButton from "@/components/BackButton";
/* ------------------- Icons ------------------- */
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

/* ------------------------- Helpers ------------------------- */

const HINDI_MONTHS = [
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

const ArticleCard = ({ article }) => (
  <article className="group rounded-lg overflow-hidden bg-white border border-gray-100 shadow-sm hover:shadow-lg transition-all duration-300">
    <div className="relative h-48 overflow-hidden">
      <img
        src={article.img}
        alt={article.title}
        className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-300"
        loading="lazy"
      />
      <span className="absolute top-3 left-3 bg-[#0f4c4c] text-white text-xs px-3 py-1 rounded-full font-semibold uppercase tracking-wide">
        {article.tag}
      </span>
    </div>
    <div className="p-5">
      <h3 className="font-bold text-lg leading-snug line-clamp-2 text-gray-900 group-hover:text-[#0f4c4c] font-['Noto_Sans_Devanagari'] transition-colors">
        {article.title}
      </h3>
      <p className="mt-3 text-sm text-gray-600 line-clamp-2 leading-relaxed">
        {article.excerpt}
      </p>
      <div className="mt-4 flex items-center justify-between pt-3 border-t border-gray-100">
        <div className="flex items-center gap-3 text-sm text-gray-500">
          <img
            src={article.avatar}
            alt={article.author}
            className="w-8 h-8 rounded-full"
          />
          <div>
            <div className="font-medium">{article.author}</div>
            <div className="text-xs">{article.time}</div>
          </div>
        </div>
        <a
          href={`Read-full-news/${article.slug}`}
          className="text-sm font-semibold text-[#0f4c4c] hover:text-[#0a7f7f] transition-colors"
        >
          और पढ़ें →
        </a>
      </div>
    </div>
  </article>
);

/**
 * Normalize incoming "post" shape.
 * Accepts:
 *  - Firestore doc shape: { id, data: { ... } }
 *  - Plain data object: { title, content, ... }
 */
function normalizePost(raw) {
  if (!raw) return {};
  // If it's the Firestore wrapper: { id, data: { ... } }
  if (raw.data && typeof raw.data === "object") {
    return { id: raw.id, ...raw.data };
  }
  return raw;
}

/**
 * Convert various createdAt/time shapes to JS Date.
 * Handles:
 *  - string like "21-10-2025"
 *  - Firestore timestamp object { seconds, nanoseconds, type: 'firestore/...' }
 *  - native Date
 *  - ISO string
 */
function getDateFromPost(post) {
  if (!post) return null;

  // 1) explicit `time` field in format dd-mm-yyyy (as in your example)
  if (post.time && /^\d{1,2}-\d{1,2}-\d{4}$/.test(post.time)) {
    const [d, m, y] = post.time.split("-").map(Number);
    return new Date(y, m - 1, d);
  }

  // 2) Firestore timestamp shape: { seconds, nanoseconds }
  const createdAt = post.createdAt || post.created_at || post.created;
  if (createdAt && typeof createdAt === "object") {
    // If it's already a JS Date
    if (createdAt instanceof Date) return createdAt;
    // Firestore stamp
    if (
      (typeof createdAt.seconds === "number" ||
        typeof createdAt.seconds === "string") &&
      typeof createdAt.nanoseconds === "number"
    ) {
      const secs = Number(createdAt.seconds);
      const nanos = Number(createdAt.nanoseconds || 0);
      return new Date(secs * 1000 + Math.round(nanos / 1000000));
    }
    // Sometimes stringified object: try to parse date string if present
    if (createdAt.toDate && typeof createdAt.toDate === "function") {
      try {
        return createdAt.toDate();
      } catch (e) {
        // continue
      }
    }
  }

  // 3) If createdAt is text or ISO
  if (typeof createdAt === "string") {
    const parsed = new Date(createdAt);
    if (!Number.isNaN(parsed.getTime())) return parsed;
  }

  // 4) fallback to post.time if it's a full date string
  if (post.time && typeof post.time === "string") {
    const parsed = new Date(post.time);
    if (!Number.isNaN(parsed.getTime())) return parsed;
  }

  return null;
}

function formatDateLabel(post) {
  const date = getDateFromPost(post);
  if (!date) return "तिथि उपलब्ध नहीं";
  const d = date.getDate();
  const m = date.getMonth();
  const y = date.getFullYear();
  const monthName =
    HINDI_MONTHS[m] || date.toLocaleString("hi-IN", { month: "long" });
  return `${d} ${monthName}, ${y}`;
}

/* ------------------------- Content renderer ------------------------- */

/**
 * Render content blocks flexibly.
 * Accepts array of:
 *  - simple strings
 *  - objects like { text }, { paragraph }, { type: 'image', src, caption }, { type: 'list', items: [...] }
 *  - nested arrays
 */
function renderContentArray(contentArray) {
  if (!Array.isArray(contentArray) || contentArray.length === 0) {
    return (
      <p className="mb-4 text-gray-700">
        पूरा लेख प्रकाशित होते ही यहाँ दिखेगा।
      </p>
    );
  }

  return contentArray.map((block, idx) => {
    // nested arrays
    if (Array.isArray(block)) {
      return (
        <div key={idx} className="mb-4">
          {renderContentArray(block)}
        </div>
      );
    }

    // plain string
    if (typeof block === "string") {
      return (
        <p key={idx} className="mb-4 text-gray-800 leading-relaxed">
          {block}
        </p>
      );
    }

    // object blocks
    if (typeof block === "object" && block !== null) {
      // subheading - FIXED: This condition should come first
      if (block.type === "subheading") {
        return (
          <h3
            key={idx}
            className="text-xl font-bold mb-3 mt-6 text-gray-900"
            style={{ fontFamily: "'Noto Sans Devanagari', sans-serif" }}
          >
            {block.text || block.content || block.headingText}
          </h3>
        );
      }

      // common fallback properties
      if (block.text || block.paragraph) {
        return (
          <p key={idx} className="mb-4 text-gray-800 leading-relaxed">
            {block.text || block.paragraph}
          </p>
        );
      }

      // image block
      if (block.type === "image" || block.img || block.src) {
        const src = block.src || block.img;
        return (
          <figure key={idx} className="mb-6">
            <img
              src={src}
              alt={block.alt || block.caption || "लेख चित्र"}
              className="w-full max-h-[480px] object-cover rounded-md"
            />
            {block.caption ? (
              <figcaption className="text-sm text-gray-600 mt-2">
                {block.caption}
              </figcaption>
            ) : null}
          </figure>
        );
      }

      // list block
      if (block.type === "list" || Array.isArray(block.items)) {
        return (
          <ul key={idx} className="list-disc pl-6 mb-4 text-gray-800">
            {(block.items || []).map((it, i) => (
              <li key={i} className="mb-1">
                {typeof it === "string" ? it : it.text || JSON.stringify(it)}
              </li>
            ))}
          </ul>
        );
      }

      // code / json
      if (block.code || block.json) {
        const text = block.code || JSON.stringify(block.json, null, 2);
        return (
          <pre
            key={idx}
            className="mb-4 p-3 rounded bg-gray-50 text-sm text-gray-700 overflow-x-auto"
          >
            {text}
          </pre>
        );
      }

      // fallback: show stringified but readable
      return (
        <p key={idx} className="mb-4 text-gray-800">
          {block.toString ? block.toString() : JSON.stringify(block)}
        </p>
      );
    }

    return null;
  });
}

/* ------------------------- Main component ------------------------- */
/**
 * Usage:
 * <SimpleNewsPost post={firestoreDoc} />
 * or
 * <SimpleNewsPost post={postData} />
 */

function rand0to10() {
  return Math.floor(Math.random() * 11); // 0..10
}

export default function SimpleNewsPost({ post: rawPost = {} }) {
  const post = normalizePost(rawPost);
  const dateLabel = formatDateLabel(post);
  const hasImage = Boolean(post?.img);
  const related = Array.isArray(post?.related) ? post.related : [];

  // safe fields with fallbacks
  const title = post?.title || post?.data?.title || "शीर्षक उपलब्ध नहीं";
  const excerpt = post?.excerpt || "";
  const avatar = post?.avatar || "/avatar-placeholder.png";
  const author = post?.author || "लेखक";
  const views = typeof post?.views === "number" ? post.views : 0;
  const likes = typeof post?.likes === "number" ? post.likes : 0;
  const published = Boolean(post?.published);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const renmin = rand0to10();
  const renmax = rand0to10();
  useEffect(() => {
    let mounted = true;

    async function load() {
      try {
        setLoading(true);
        setError(null);
        const items = await fetchCollection("news"); // <-- await the promise
        if (!mounted) return;
        setData(items);
      } catch (err) {
        if (!mounted) return;
        setError(err);
      } finally {
        if (!mounted) return;
        setLoading(false);
      }
    }

    load();
    return () => {
      mounted = false;
    };
  }, []);

  if (loading) return <ProfessionalLoader />;
  if (error) return <div>Error: {error.message || String(error)}</div>;
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
      {/* <AdIframe
        keyValue="ea47bb194fc68c42baa2c7c829e15e3f"
        width={728}
        height={90}
        format="iframe"
        params={{}}
        className="mx-auto my-4"
      /> */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <article className="bg-white rounded-xl shadow-sm overflow-hidden">
          <div className="md:flex md:items-start">
            <div className="md:flex-1">
              {/* Hero Image */}
              <div className="w-full h-56 md:h-80 bg-gray-100 overflow-hidden">
                <img
                  src={post?.img || "/placeholder-1200x600.png"}
                  alt={title}
                  className="w-full h-full object-cover"
                />
              </div>
              {/* <AdIframe
                keyValue="ea47bb194fc68c42baa2c7c829e15e3f"
                width={728}
                height={90}
                format="iframe"
                params={{}}
                className="mx-auto my-4"
              /> */}
              <div className="p-6 md:p-8">
                <div className="flex items-center gap-3 mb-4">
                  <span className="inline-flex items-center bg-red-100 text-red-700 text-sm font-semibold px-3 py-1 rounded-full">
                    {post?.tag || "समाचार"}
                  </span>
                </div>

                <h1
                  className="text-2xl md:text-4xl font-extrabold leading-tight mb-4"
                  style={{ fontFamily: "'Noto Sans Devanagari', sans-serif" }}
                >
                  {title}
                </h1>

                {/* Excerpt */}
                {excerpt ? (
                  <p className="text-gray-700 text-base md:text-lg mb-6">
                    {excerpt}
                  </p>
                ) : null}

                {/* Meta */}
                <div className="flex flex-wrap items-center text-sm text-gray-500 gap-4 mb-6">
                  <span className="inline-flex items-center gap-2">
                    <UserIcon className="w-4 h-4" />
                    {author}
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
                    {views} बार देखा गया
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
                      <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78L12 21.23l8.84-8.84a5.5 5.5 0 0 0 0-7.78z" />
                    </svg>
                    {likes} लाइक्स
                  </span>
                </div>

                {/* Content */}
                <div
                  className="prose prose-lg max-w-none text-gray-800"
                  style={{ fontFamily: "'Noto Sans Devanagari', sans-serif" }}
                >
                  {renderContentArray(
                    post?.content || post?.content?.blocks || []
                  )}
                </div>
                {/* <AdIframe
                  keyValue="ea47bb194fc68c42baa2c7c829e15e3f"
                  width={728}
                  height={90}
                  format="iframe"
                  params={{}}
                  className="mx-auto my-4"
                /> */}
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
                    <a
                      href={
                        title
                          ? `https://twitter.com/intent/tweet?text=${encodeURIComponent(
                              title + (excerpt ? " — " + excerpt : "")
                            )}`
                          : "#"
                      }
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="ट्विटर पर साझा करें"
                      className="p-2 rounded-md hover:bg-gray-100"
                    >
                      <TwitterIcon />
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Sidebar: related posts if provided */}
            {related.length > 0 ? (
              <aside className="hidden md:block md:w-80 lg:w-96 bg-gray-50 border-l border-gray-100">
                <div className="p-6">
                  <h3 className="text-lg font-bold mb-4">यह भी पढ़ें</h3>
                  <div className="space-y-4">
                    {related.map((r, i) => (
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
              src={avatar}
              alt={author}
              className="w-20 h-20 rounded-full object-cover"
            />
            <div>
              <h4 className="font-bold">{author}</h4>
              <a
                href={post?.authorLink || "#"}
                className="text-sm font-semibold text-red-600 mt-2 inline-block"
              >
                {author ? `${author} के और लेख पढ़ें →` : "और पढ़ें →"}
              </a>
              <BackButton
                isFixed={true}
                showLabel={true}
                variant="light"
                size="lg"
              />
            </div>
          </div>
        </section>

        <section className="my-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 font-['Noto_Sans_Devanagari'] border-l-4 border-[#0f4c4c] pl-4">
            खबरें
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {data.slice(renmin, renmax).map((a) => (
              <ArticleCard key={a.id} article={a} />
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}
