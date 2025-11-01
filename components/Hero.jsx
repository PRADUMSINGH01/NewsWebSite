"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";

/** CONFIG: change these to your real assets if needed */
const DEFAULT_PLACEHOLDER = "/images/placeholder-16x9.png";
const DEFAULT_AVATAR = "/images/avatar-placeholder.png";

/** Helper: accept Firebase Timestamp, Date, number, or ISO string */
function parseDate(v) {
  if (!v) return null;
  if (typeof v === "object" && typeof v.toDate === "function")
    return v.toDate();
  if (v instanceof Date) return v;
  const n = Number(v);
  if (!Number.isNaN(n)) return new Date(n);
  const d = new Date(String(v));
  return isNaN(d.getTime()) ? null : d;
}
function formatDate(v) {
  const d = parseDate(v);
  if (!d) return "तिथि उपलब्ध नहीं";
  return new Intl.DateTimeFormat("hi-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }).format(d);
}

/** Professional Hero component */
export default function Hero({ lead = {}, trending = [] }) {
  const leadTitle = lead?.title || "शीर्ष समाचार उपलब्ध नहीं";
  const leadImg = lead?.img || DEFAULT_PLACEHOLDER;
  const leadTag = lead?.tag || "मुख्य";
  const leadSlug = lead?.slug ? encodeURIComponent(lead.slug) : "";

  return (
    <article
      className="rounded-xl overflow-hidden shadow-lg bg-white border border-gray-100"
      aria-labelledby="hero-title"
    >
      <div className="lg:flex">
        {/* HERO LEFT */}
        <div className="lg:w-2/3 relative group">
          {/* image container ensures stable aspect ratio and no CLS */}
          <div className="relative w-full h-72 md:h-96 lg:h-[480px] bg-gray-100">
            <Image
              src={leadImg}
              alt={leadTitle}
              fill
              priority // hero should be prioritized for LCP
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 70vw, 800px"
              style={{ objectFit: "cover" }}
              className="block"
            />
          </div>

          {/* overlay — whole panel clickable */}
          <Link
            href={leadSlug ? `/Read-full-news/${leadSlug}` : "#"}
            aria-label={`लेख पढ़ें: ${leadTitle}`}
            className="absolute inset-0 flex items-end"
          >
            {/* gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/30 to-transparent pointer-events-none" />

            {/* content */}
            <div className="relative w-full p-4 md:p-8">
              <div className="max-w-3xl">
                <span className="inline-flex items-center px-3 py-1 rounded-full bg-red-600 text-white text-xs font-semibold uppercase tracking-wide">
                  {leadTag}
                </span>

                <h1
                  id="hero-title"
                  className="mt-3 md:mt-4 font-extrabold text-2xl md:text-4xl leading-tight text-white font-['Noto_Sans_Devanagari'] drop-shadow-sm"
                  title={leadTitle}
                >
                  {leadTitle}
                </h1>

                <div className="mt-4 flex items-center gap-3 text-sm text-white/90">
                  <div className="w-10 h-10 relative rounded-full overflow-hidden flex-shrink-0 border-2 border-white/50 bg-gray-200">
                    <Image
                      src={lead?.avatar || DEFAULT_AVATAR}
                      alt={lead?.author || "लेखक"}
                      fill
                      sizes="40px"
                      style={{ objectFit: "cover" }}
                    />
                  </div>

                  <div className="text-sm">
                    <div className="font-medium">
                      {lead?.author || "अज्ञात लेखक"}
                    </div>
                    <time className="text-xs text-white/80 block">
                      {formatDate(lead?.createdAt)}
                    </time>
                  </div>
                </div>
              </div>
            </div>
          </Link>
        </div>

        {/* TRENDING RIGHT */}
        <aside className="lg:w-1/3 p-6 bg-gray-50 border-l border-gray-100">
          <h2 className="flex items-center justify-between font-bold text-gray-800 text-lg border-b-2 border-[#0f4c4c] pb-3 font-['Noto_Sans_Devanagari']">
            <span>ट्रेंडिंग खबरें</span>
            <Link
              href="/news/सभी"
              className="text-xs text-gray-500 hover:underline"
            >
              सब देखें
            </Link>
          </h2>

          <ol className="mt-4 space-y-4" aria-label="Trending list">
            {trending.length === 0 ? (
              <li className="text-sm text-gray-500 py-3">
                कोई ट्रेंडिंग खबर नहीं
              </li>
            ) : (
              trending.map((t, i) => {
                const thumb = t?.img || DEFAULT_PLACEHOLDER;
                const slug = t?.slug ? encodeURIComponent(t.slug) : "";
                return (
                  <li
                    key={t.id ?? t.slug ?? i}
                    className="group flex gap-4 items-start pb-4 border-b border-gray-100 last:border-b-0"
                  >
                    <div className="w-24 h-16 relative rounded-md overflow-hidden flex-shrink-0 bg-gray-100">
                      <Link
                        href={slug ? `/Read-full-news/${slug}` : "#"}
                        className="block w-full h-full"
                      >
                        <Image
                          src={thumb}
                          alt={t?.title || "thumb"}
                          fill
                          sizes="96px"
                          style={{ objectFit: "cover" }}
                          className="transition-transform duration-200 group-hover:scale-105"
                          // lazy loading by default for non-priority images
                        />
                      </Link>
                    </div>

                    <div className="flex-1">
                      <Link
                        href={slug ? `/Read-full-news/${slug}` : "#"}
                        className="block font-semibold text-sm leading-snug text-gray-800 group-hover:text-[#0f4c4c] transition-colors line-clamp-2"
                        title={t?.title}
                      >
                        {t?.title || "शीर्षक उपलब्ध नहीं है"}
                      </Link>

                      <div className="text-xs text-gray-500 mt-2 flex items-center gap-2">
                        <span>{t?.author || "अज्ञात"}</span>
                        <span>•</span>
                        <span>{formatDate(t?.createdAt)}</span>
                      </div>
                    </div>
                  </li>
                );
              })
            )}
          </ol>
        </aside>
      </div>
    </article>
  );
}
