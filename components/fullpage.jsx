"use client";
import React from "react";
import ShareButtons from "./ShareButton";
import ViewCounter from "./ViewCounter";
import { usePathname } from "next/navigation";

/* ─── Hindi months ──────────────────────────────────────────── */
const HINDI_MONTHS = [
  "जनवरी", "फ़रवरी", "मार्च", "अप्रैल", "मई", "जून",
  "जुलाई", "अगस्त", "सितंबर", "अक्टूबर", "नवंबर", "दिसंबर",
];

/* ─── Helpers ────────────────────────────────────────────────── */
function normalizePost(raw) {
  if (!raw) return {};
  if (raw.data && typeof raw.data === "object") return { id: raw.id, ...raw.data };
  return raw;
}

function getDateFromPost(post) {
  if (!post) return null;
  if (post.time && /^\d{1,2}-\d{1,2}-\d{4}$/.test(post.time)) {
    const [d, m, y] = post.time.split("-").map(Number);
    return new Date(y, m - 1, d);
  }
  const createdAt = post.createdAt || post.created_at || post.created;
  if (createdAt) {
    if (createdAt instanceof Date) return createdAt;
    if (typeof createdAt === "string") {
      const p = new Date(createdAt);
      if (!isNaN(p)) return p;
    }
    if (typeof createdAt === "object" && createdAt.seconds) {
      return new Date(Number(createdAt.seconds) * 1000);
    }
    if (createdAt.toDate) {
      try { return createdAt.toDate(); } catch { }
    }
  }
  if (post.time) {
    const p = new Date(post.time);
    if (!isNaN(p)) return p;
  }
  return null;
}

function formatDateLabel(post) {
  const date = getDateFromPost(post);
  if (!date) return "";
  const m = HINDI_MONTHS[date.getMonth()] ||
    date.toLocaleString("hi-IN", { month: "long" });
  return `${date.getDate()} ${m}, ${date.getFullYear()}`;
}

/* ─── Content renderer ───────────────────────────────────────── */
function renderContentArray(arr) {
  if (!Array.isArray(arr) || arr.length === 0)
    return (
      <p className="mb-5 text-gray-600 italic">
        पूरा लेख प्रकाशित होते ही यहाँ दिखेगा।
      </p>
    );

  return arr.map((block, idx) => {
    if (Array.isArray(block))
      return <div key={idx} className="mb-4">{renderContentArray(block)}</div>;

    if (typeof block === "string")
      return (
        <p key={idx} className="mb-5 text-gray-800 leading-[1.9] text-[17px] sm:text-[18px]">
          {block}
        </p>
      );

    if (!block) return null;

    if (block.type === "subheading")
      return (
        <h2 key={idx} className="text-xl sm:text-2xl font-bold mb-3 mt-8 text-gray-900 leading-snug">
          {block.text || block.content || block.headingText}
        </h2>
      );

    if (block.text || block.paragraph)
      return (
        <p key={idx} className="mb-5 text-gray-800 leading-[1.9] text-[17px] sm:text-[18px]">
          {block.text || block.paragraph}
        </p>
      );

    if (block.type === "image" || block.img || block.src) {
      const src = block.src || block.img;
      return (
        <figure key={idx} className="mb-6 -mx-4 sm:mx-0">
          <img
            src={src}
            alt={block.alt || block.caption || "लेख चित्र"}
            className="w-full sm:rounded-xl object-cover max-h-[400px]"
          />
          {block.caption && (
            <figcaption className="text-sm text-gray-500 mt-2 text-center px-4 sm:px-0">
              {block.caption}
            </figcaption>
          )}
        </figure>
      );
    }

    if (block.type === "list" || Array.isArray(block.items))
      return (
        <ul key={idx} className="list-disc pl-6 mb-5 text-gray-800 space-y-1 text-[17px]">
          {(block.items || []).map((it, i) => (
            <li key={i}>{typeof it === "string" ? it : it.text || JSON.stringify(it)}</li>
          ))}
        </ul>
      );

    return (
      <p key={idx} className="mb-5 text-gray-800 leading-relaxed">
        {block.toString ? block.toString() : JSON.stringify(block)}
      </p>
    );
  });
}

/* ─── Small components ───────────────────────────────────────── */
const TagBadge = ({ children }) => (
  <span className="inline-flex items-center bg-[#0f4c4c]/10 text-[#0f4c4c] text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wide">
    {children}
  </span>
);

const ArticleCard = ({ article }) => (
  <a
    href={`/Read-full-news/${article.slug || "#"}`}
    className="group flex sm:flex-col gap-3 sm:gap-0 rounded-xl overflow-hidden bg-white border border-gray-100 shadow-sm hover:shadow-md transition-all duration-300"
  >
    <div className="relative w-28 h-24 sm:w-full sm:h-40 flex-shrink-0 overflow-hidden bg-gray-100">
      <img
        src={article.img || "/placeholder-600x400.png"}
        alt={article.title}
        className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-300"
        loading="lazy"
      />
      <span className="absolute top-2 left-2 bg-[#0f4c4c] text-white text-[10px] px-2 py-0.5 rounded-full font-bold uppercase tracking-wide">
        {article.tag || "समाचार"}
      </span>
    </div>
    <div className="p-3 sm:p-4 flex flex-col justify-center">
      <h3 className="font-semibold text-sm sm:text-base line-clamp-2 text-gray-900 group-hover:text-[#0f4c4c] leading-snug font-['Noto_Sans_Devanagari']">
        {article.title}
      </h3>
      <p className="mt-1 text-xs text-gray-500 hidden sm:block line-clamp-2">{article.excerpt}</p>
      <span className="mt-2 text-xs font-bold text-[#0f4c4c]">और पढ़ें →</span>
    </div>
  </a>
);

/* ─── Main Component ─────────────────────────────────────────── */
function rand0to5() { return Math.floor(Math.random() * 6); }

export default function SimpleNewsPost({ post: rawPost = {}, relatedArticles = [] }) {
  const post = normalizePost(rawPost);
  const dateLabel = formatDateLabel(post);
  const title = post?.title || "शीर्षक उपलब्ध नहीं";
  const excerpt = post?.excerpt || "";
  const avatar = post?.avatar || "/avatar-placeholder.png";
  const author = post?.author || "लेखक";
  const tag = post?.tag || "समाचार";
  const pathname = usePathname();

  const SITE_URL = typeof window !== "undefined"
    ? window.location.origin
    : "https://www.hmarduniya.in";
  const ogImageUrl = `${SITE_URL}/api/og?title=${encodeURIComponent(title)}&tag=${encodeURIComponent(tag)}`;
  const articleUrl = `https://www.hmarduniya.in${pathname}`;

  // Use server-provided related articles instead of client-side fetch
  const data = relatedArticles;

  const renStart = Math.max(0, Math.min(rand0to5(), Math.max(0, data.length - 4)));
  const renEnd = Math.min(data.length, renStart + 4);

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 font-['Noto_Sans_Devanagari']">

      {/* Skip link */}
      <a href="#content" className="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 focus:bg-white focus:px-3 focus:py-2 focus:rounded-lg focus:shadow focus:z-50">
        सामग्री पर जाएं
      </a>

      {/* ── Main ── */}
      <main id="content" className="max-w-7xl mx-auto px-0 sm:px-4 md:px-6 lg:px-8 pb-12">

        <div className="md:flex md:items-start md:gap-8 lg:gap-10">

          {/* ──────────── ARTICLE COLUMN ──────────── */}
          <article className="md:flex-1 bg-white sm:rounded-2xl sm:shadow-sm sm:border sm:border-gray-100 overflow-hidden">

            {/* ── Hero Image (edge-to-edge on mobile) ── */}
            <div className="relative w-full aspect-[16/9] sm:aspect-[2/1] bg-gray-200 overflow-hidden">
              <img
                src={post?.img || "/placeholder-1200x600.png"}
                alt={title}
                className="w-full h-full object-cover"
                loading="eager"
              />
              {/* Tag overlay on hero */}
              <div className="absolute top-3 left-3">
                <TagBadge>{tag}</TagBadge>
              </div>
            </div>

            {/* ── Article Header ── */}
            <header className="px-4 pt-5 pb-4 sm:px-6 sm:pt-7 md:px-10 md:pt-9">

              {/* Title */}
              <h1 className="text-[22px] sm:text-3xl md:text-4xl lg:text-5xl font-extrabold leading-tight text-gray-900 mb-3 tracking-tight">
                {title}
              </h1>

              {/* Excerpt */}
              {excerpt && (
                <p className="text-gray-500 text-base sm:text-lg leading-relaxed mb-5 font-medium border-l-4 border-[#0f4c4c]/30 pl-3">
                  {excerpt}
                </p>
              )}

              {/* Author + Date + Views row */}
              <div className="flex items-center justify-between flex-wrap gap-3 py-4 border-t border-b border-gray-100">
                <div className="flex items-center gap-3">
                  <img
                    src={avatar}
                    alt={author}
                    className="w-10 h-10 rounded-full object-cover ring-2 ring-[#0f4c4c]/10 shrink-0"
                  />
                  <div>
                    <p className="text-sm font-bold text-gray-900 leading-tight">{author}</p>
                    <div className="flex items-center gap-3 mt-0.5">
                      {dateLabel && (
                        <time
                          className="text-xs text-gray-400 font-medium"
                          dateTime={post?.createdAt ? new Date(post.createdAt).toISOString() : ""}
                        >
                          {dateLabel}
                        </time>
                      )}
                      <span className="text-gray-300">•</span>
                      <ViewCounter slug={post?.slug} size="sm" showLabel={true} />
                    </div>
                  </div>
                </div>

                {/* Share – top */}
                <div className="shrink-0">
                  <ShareButtons image={ogImageUrl} title={title} url={articleUrl} />
                </div>
              </div>
            </header>

            {/* ── Article Body ── */}
            <div className="px-4 pt-5 pb-8 sm:px-6 md:px-10">
              <div className="max-w-none">
                {renderContentArray(post?.content || post?.content?.blocks || [])}
              </div>

              {/* ── Article Footer: Tags + Share ── */}
              <footer className="mt-10 pt-6 border-t border-gray-100 flex flex-col gap-5">
                {/* Tags */}
                <div className="flex flex-wrap items-center gap-2">
                  <span className="text-xs font-bold text-gray-400 uppercase tracking-widest">Tags</span>
                  <span className="text-xs bg-[#0f4c4c]/10 text-[#0f4c4c] font-bold px-3 py-1 rounded-full">
                    #{(tag).replace(/\s+/g, "")}
                  </span>
                </div>

                {/* Share bottom */}
                <div className="flex items-center gap-3">
                  <span className="text-xs font-bold text-gray-400 uppercase tracking-widest">Share</span>
                  <ShareButtons image={ogImageUrl} title={title} url={articleUrl} />
                </div>
              </footer>
            </div>

            {/* ── Author Card ── */}
            <div className="mx-4 mb-6 sm:mx-6 md:mx-10 p-4 rounded-xl bg-gray-50 border border-gray-100 flex items-center gap-4">
              <img
                src={avatar}
                alt={author}
                className="w-14 h-14 rounded-full object-cover ring-2 ring-white shadow shrink-0"
              />
              <div>
                <p className="font-bold text-gray-900">{author}</p>
                <a
                  href={post?.authorLink || "#"}
                  className="text-xs font-semibold text-[#0f4c4c] mt-1 inline-block hover:underline"
                >
                  {author} के और लेख →
                </a>
              </div>
            </div>

          </article>

          {/* ──────────── SIDEBAR (desktop only) ──────────── */}
          <aside className="hidden md:block md:w-72 lg:w-80 shrink-0">
            <div className="sticky top-24 bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
              <h3 className="text-base font-bold text-gray-900 mb-4 pb-3 border-b border-gray-100">
                📰 यह भी पढ़ें
              </h3>
              <div className="space-y-4">
                {data
                  .slice(Math.min(3, data.length), Math.min(6, data.length))
                  .map((r, i) => (
                    <a
                      key={i}
                      href={`/Read-full-news/${r.slug || "#"}`}
                      className="flex gap-3 items-start group"
                    >
                      <img
                        src={r.img || "/placeholder-600x400.png"}
                        alt={r.title}
                        className="w-20 h-16 object-cover rounded-lg flex-shrink-0 group-hover:opacity-80 transition-opacity"
                      />
                      <div>
                        <h4 className="text-sm font-semibold text-gray-900 group-hover:text-[#0f4c4c] line-clamp-2 leading-snug">
                          {r.title}
                        </h4>
                        <p className="text-xs text-gray-500 mt-1 line-clamp-2">{r.excerpt}</p>
                      </div>
                    </a>
                  ))}
              </div>
            </div>
          </aside>

        </div>

        {/* ──────────── RELATED (mobile: 2-col, desktop: 4-col) ──────────── */}
        <section className="mt-10 px-4 sm:px-0">
          <h2 className="text-lg sm:text-2xl font-bold text-gray-900 mb-5 border-l-4 border-[#0f4c4c] pl-3">
            और खबरें पढ़ें
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 sm:gap-5">
            {data.slice(renStart, renEnd).map((a) => (
              <ArticleCard key={a.id || a.slug || a.title} article={a} />
            ))}
          </div>
        </section>

      </main>
    </div>
  );
}
