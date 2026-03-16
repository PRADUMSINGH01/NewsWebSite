"use client";
import React, { useEffect, useState } from "react";
import ProfessionalLoader from "./Loading";
import { fetchCollection } from "./server/fetchnews";
import ShareButtons from "./ShareButton";
import { usePathname } from "next/navigation";
/* ------------------- Small UI pieces (kept in-file for simplicity) ------------------- */

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
    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
    <circle cx="12" cy="7" r="4" />
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
    <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
    <line x1="16" y1="2" x2="16" y2="6" />
    <line x1="8" y1="2" x2="8" y2="6" />
    <line x1="3" y1="10" x2="21" y2="10" />
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

/* ------------------------- Helpers (unchanged behaviour) ------------------------- */

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

function normalizePost(raw) {
  if (!raw) return {};
  if (raw.data && typeof raw.data === "object")
    return { id: raw.id, ...raw.data };
  return raw;
}

function getDateFromPost(post) {
  if (!post) return null;

  if (post.time && /^\d{1,2}-\d{1,2}-\d{4}$/.test(post.time)) {
    const [d, m, y] = post.time.split("-").map(Number);
    return new Date(y, m - 1, d);
  }

  const createdAt = post.createdAt || post.created_at || post.created;
  if (createdAt && typeof createdAt === "object") {
    if (createdAt instanceof Date) return createdAt;
    if (
      (typeof createdAt.seconds === "number" ||
        typeof createdAt.seconds === "string") &&
      typeof createdAt.nanoseconds === "number"
    ) {
      const secs = Number(createdAt.seconds);
      const nanos = Number(createdAt.nanoseconds || 0);
      return new Date(secs * 1000 + Math.round(nanos / 1000000));
    }
    if (createdAt.toDate && typeof createdAt.toDate === "function") {
      try {
        return createdAt.toDate();
      } catch (e) { }
    }
  }

  if (typeof createdAt === "string") {
    const parsed = new Date(createdAt);
    if (!Number.isNaN(parsed.getTime())) return parsed;
  }

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

/* Render content blocks (kept same logic but tighter markup for readability) */
function renderContentArray(contentArray) {
  if (!Array.isArray(contentArray) || contentArray.length === 0) {
    return (
      <p className="mb-4 text-gray-700">
        पूरा लेख प्रकाशित होते ही यहाँ दिखेगा।
      </p>
    );
  }

  return contentArray.map((block, idx) => {
    if (Array.isArray(block))
      return (
        <div key={idx} className="mb-4">
          {renderContentArray(block)}
        </div>
      );
    if (typeof block === "string")
      return (
        <p key={idx} className="mb-4 text-gray-800 leading-relaxed">
          {block}
        </p>
      );
    if (!block) return null;

    if (block.type === "subheading") {
      return (
        <h2
          key={idx}
          className="text-2xl font-bold mb-3 mt-6 text-gray-900"
          style={{ fontFamily: "'Noto Sans Devanagari', sans-serif" }}
        >
          {block.text || block.content || block.headingText}
        </h2>
      );
    }

    if (block.text || block.paragraph) {
      return (
        <p key={idx} className="mb-4 text-gray-800 leading-relaxed">
          {block.text || block.paragraph}
        </p>
      );
    }

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

    return (
      <p key={idx} className="mb-4 text-gray-800">
        {block.toString ? block.toString() : JSON.stringify(block)}
      </p>
    );
  });
}
/* ------------------------- Small visual components ------------------------- */

const TagBadge = ({ children }) => (
  <span className="inline-flex items-center bg-[#0f4c4c]/10 text-[#0f4c4c] text-sm font-semibold px-3 py-1 rounded-full">
    {children}
  </span>
);

const MetaItem = ({ icon, children }) => (
  <span className="inline-flex items-center gap-2 text-sm text-gray-500">
    <span className="w-4 h-4 inline-flex items-center justify-center text-gray-500">
      {icon}
    </span>
    <span>{children}</span>
  </span>
);

/* ArticleCard kept but tightened for consistency */
const ArticleCard = ({ article }) => (
  <article className="group rounded-lg overflow-hidden bg-white border border-gray-100 shadow-sm hover:shadow-lg transition-all duration-300">
    <div className="relative h-40 overflow-hidden">
      <img
        src={article.img || "/placeholder-600x400.png"}
        alt={article.title}
        className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-300"
        loading="lazy"
      />
      <span className="absolute top-3 left-3 bg-[#0f4c4c] text-white text-xs px-3 py-1 rounded-full font-semibold uppercase tracking-wide">
        {article.tag || "समाचार"}
      </span>
    </div>
    <div className="p-4 sm:p-5">
      <h3 className="font-semibold text-lg line-clamp-2 text-gray-900 group-hover:text-[#0f4c4c] font-['Noto_Sans_Devanagari']">
        {article.title}
      </h3>
      <p className="mt-2 text-sm text-gray-600 line-clamp-2">
        {article.excerpt}
      </p>
      <div className="mt-4 flex items-center justify-between pt-3 border-t border-gray-100">
        <div className="flex items-center gap-3 text-sm text-gray-500">
          <img
            src={article.avatar || "/avatar-placeholder.png"}
            alt={article.author || "लेखक"}
            className="w-8 h-8 rounded-full"
          />
          <div>
            <div className="font-medium text-gray-900">
              {article.author || "लेखक"}
            </div>
            <div className="text-xs text-gray-500">{article.time}</div>
          </div>
        </div>
        <a
          href={`/Read-full-news/${article.slug || "#"}`}
          className="text-sm font-semibold text-[#0f4c4c] hover:text-[#0a7f7f] transition-colors"
        >
          और पढ़ें →
        </a>
      </div>
    </div>
  </article>
);

/* ------------------------- Main improved page with share features ------------------------- */

function rand0to10() {
  return Math.floor(Math.random() * 11);
}

export default function SimpleNewsPost({ post: rawPost = {} }) {
  // keep original logic / shape
  const post = normalizePost(rawPost);
  const dateLabel = formatDateLabel(post);
  const title = post?.title || post?.data?.title || "शीर्षक उपलब्ध नहीं";
  const excerpt = post?.excerpt || "";
  const avatar = post?.avatar || "/avatar-placeholder.png";
  const author = post?.author || "लेखक";
  const pathname = usePathname();
  
  const tag = post?.tag || "समाचार";
  const SITE_URL = typeof window !== "undefined" ? window.location.origin : "https://www.hmarduniya.in";
  const ogImageUrl = `${SITE_URL}/api/og?title=${encodeURIComponent(title)}&tag=${encodeURIComponent(tag)}`;

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // share state
  const [currentUrl, setCurrentUrl] = useState("");
  const [copied, setCopied] = useState(false);

  // safer random slice (avoids empty slice)
  const renStart = Math.max(
    0,
    Math.min(Math.floor(rand0to10() % 5), Math.max(0, data.length - 1))
  );
  const renEnd = Math.min(data.length, renStart + 4);

  useEffect(() => {
    let mounted = true;
    async function load() {
      try {
        setLoading(true);
        setError(null);
        const items = await fetchCollection("news");
        if (!mounted) return;
        setData(Array.isArray(items) ? items : []);
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

  // set current url on client side
  useEffect(() => {
    if (typeof window !== "undefined") {
      setCurrentUrl(window.location.href);
    }
  }, []);

  async function handleCopyLink() {
    try {
      if (!currentUrl) return;
      await navigator.clipboard.writeText(currentUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (e) {
      console.error("copy failed", e);
    }
  }

  function handleWhatsAppShare() {
    if (typeof window === "undefined") return;
    const text = `${title}${excerpt ? " — " + excerpt : ""}\n\n${currentUrl}`;
    const encoded = encodeURIComponent(text);
    const wa = `https://api.whatsapp.com/send?text=${encoded}`;
    window.open(wa, "_blank");
  }

  if (error)
    return (
      <div className="text-red-500 p-4">
        Error: {error.message || String(error)}
      </div>
    );

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 antialiased font-['Noto_Sans_Devanagari']">
      {/* skip link for accessibility */}
      <a
        href="#content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:bg-white focus:px-3 focus:py-2 focus:rounded shadow"
      >
        Jump to content
      </a>

      <main id="content" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
        <div className="md:flex md:items-start md:gap-8 lg:gap-12">
          {/* MAIN COLUMN */}
          <article className="md:flex-1 bg-white rounded-2xl shadow-sm overflow-hidden border border-gray-100">
            <header className="p-6 md:p-8 lg:p-10 pb-6 w-full max-w-4xl mx-auto">
              {/* Top metadata & Actions */}
              <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
                <TagBadge>{post?.tag || "समाचार"}</TagBadge>
                <div className="flex items-center gap-3">
                  <span className="hidden sm:inline-block text-xs font-bold text-gray-400 uppercase tracking-wider">
                    Share
                  </span>
                  <ShareButtons
                    image={ogImageUrl}
                    title={title}
                    url={`https://www.hmarduniya.in${pathname}`}
                  />
                </div>
              </div>

              {/* Title */}
              <h1 className="text-3xl md:text-5xl lg:text-6xl font-extrabold leading-tight mb-5 text-gray-900 font-['Noto_Sans_Devanagari'] tracking-tight">
                {title}
              </h1>

              {/* Excerpt */}
              {excerpt ? (
                <p className="text-gray-600 text-lg md:text-xl lg:text-2xl leading-relaxed mb-8 font-medium font-['Noto_Sans_Devanagari']">
                  {excerpt}
                </p>
              ) : null}

              {/* Author & Date Box */}
              <div className="flex items-center justify-between py-5 border-y border-gray-100 bg-gray-50/50 -mx-6 md:-mx-8 lg:-mx-10 px-6 md:px-8 lg:px-10 mb-2">
                <div className="flex items-center gap-4">
                  <img
                    src={avatar}
                    alt={author}
                    className="w-12 h-12 rounded-full object-cover ring-4 ring-white shadow-sm"
                  />
                  <div>
                    <p className="text-base font-bold text-gray-900 line-clamp-1">
                      {author}
                    </p>
                    <time
                      className="text-sm text-gray-500 font-medium"
                      dateTime={post?.createdAt ? new Date(post.createdAt).toISOString() : ""}
                    >
                      {dateLabel}
                    </time>
                  </div>
                </div>
              </div>
            </header>

            {/* Featured Image */}
            <div className="w-full h-64 md:h-96 lg:h-[500px] bg-gray-100 overflow-hidden relative">
              <img
                src={post?.img || "/placeholder-1200x600.png"}
                alt={title}
                className="w-full h-full object-cover"
                loading="eager"
              />
            </div>

            <div className="p-6 md:p-8 lg:p-10 w-full max-w-4xl mx-auto">
              <div className="prose prose-lg md:prose-xl prose-blue max-w-none text-gray-800 leading-relaxed font-['Noto_Sans_Devanagari']">
                {renderContentArray(
                  post?.content || post?.content?.blocks || []
                )}
              </div>

              {/* Footer Share & Tags */}
              <footer className="mt-12 pt-8 border-t border-gray-100 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6">
                <div className="flex flex-wrap gap-3 items-center">
                  <span className="text-sm font-bold text-gray-400 uppercase tracking-widest">
                    Tags
                  </span>
                  <span className="text-sm bg-gray-100 text-gray-800 font-semibold px-4 py-2 rounded-full hover:bg-gray-200 transition-colors cursor-pointer shadow-sm">
                    #{((post?.tag || "समाचार").replace(/\s+/g, ""))}
                  </span>
                </div>

                <div className="flex items-center gap-4">
                  <span className="text-sm font-bold text-gray-400 uppercase tracking-widest">
                    Share
                  </span>
                  <ShareButtons
                    image={ogImageUrl}
                    title={title}
                    url={`https://www.hmarduniya.in${pathname}`}
                  />
                </div>
              </footer>
            </div>
          </article>

            {/* SIDEBAR */}
            <aside className="hidden md:block md:w-80 lg:w-96 bg-white border-l border-gray-100">
              <div className="p-6 sticky top-24">
                <h3 className="text-lg font-bold mb-4 text-gray-900">
                  यह भी पढ़ें
                </h3>
                <div className="space-y-4">
                  {data
                    .slice(Math.min(3, data.length), Math.min(6, data.length))
                    .map((r, i) => (
                      <a
                        key={i}
                        href={r.link || "#"}
                        className="flex gap-3 items-start group"
                      >
                        <img
                          src={r.img || "/placeholder-600x400.png"}
                          alt={r.title}
                          className="w-20 h-16 object-cover rounded-md flex-shrink-0"
                        />
                        <div>
                          <h4 className="text-sm font-semibold group-hover:text-[#0f4c4c] text-gray-900">
                            {r.title}
                          </h4>
                          <p className="text-xs text-gray-600 mt-1 line-clamp-2">
                            {r.excerpt}
                          </p>
                        </div>
                      </a>
                    ))}
                </div>

                {/* optional ad slot (kept but commented) */}
                {/* <div className="mt-6">
                  <AdIframe keyValue="..." width={300} height={250} format="iframe" params={{}} />
                </div> */}
              </div>
            </aside>
          </div>

        {/* author */}
        <section className="mt-12">
          <div className="bg-white rounded-lg shadow-sm p-6 flex flex-col sm:flex-row items-center gap-4">
            <img
              src={avatar}
              alt={author}
              className="w-20 h-20 rounded-full object-cover"
            />
            <div>
              <h4 className="font-bold text-gray-900">{author}</h4>
              <a
                href={post?.authorLink || "#"}
                className="text-sm font-semibold text-[#0f4c4c] mt-2 inline-block"
              >
                {author ? `${author} के और लेख पढ़ें →` : "और पढ़ें →"}
              </a>
              <div className="mt-3"></div>
            </div>
          </div>
        </section>

        {/* related grid */}
        <section className="my-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 border-l-4 border-[#0f4c4c] pl-4 font-['Noto_Sans_Devanagari']">
            खबरें
          </h2>
          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[1, 2, 3, 4].map(i => (
                <div key={i} className="rounded-lg overflow-hidden bg-white border border-gray-100 shadow-sm animate-pulse">
                  <div className="h-40 bg-gray-200" />
                  <div className="p-4 space-y-3">
                    <div className="h-4 bg-gray-200 rounded w-3/4" />
                    <div className="h-3 bg-gray-200 rounded w-1/2" />
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {data.slice(renStart, renEnd).map((a) => (
                <ArticleCard key={a.id || a.slug || a.title} article={a} />
              ))}
            </div>
          )}
        </section>
      </main>
    </div>
  );
}
