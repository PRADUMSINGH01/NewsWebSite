// app/page.jsx — Server Component with caching
import React, { cache } from "react";
import Link from "next/link";
import { fetchCollection } from "@/components/server/fetchnews";
import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import Icon from "@/app/icon";
// ── ISR: Disabled for development ──
export const revalidate = 0;

// ── Data fetching ──
const getCachedNews = async () => {
  try {
    const raw = await fetchCollection("news");
    return (raw || []).map((item) => {
      let createdAtStr = null;
      if (item.createdAt && typeof item.createdAt.toDate === "function") {
        createdAtStr = item.createdAt.toDate().toISOString();
      } else if (item.time) {
        const d = new Date(item.time);
        if (!isNaN(d.getTime())) createdAtStr = d.toISOString();
      }
      return { ...item, createdAt: createdAtStr, time: createdAtStr };
    });
  } catch (err) {
    console.error("[Home] Failed to fetch news:", err);
    return [];
  }
};

const getCachedTicker = async () => {
  try {
    const raw = await fetchCollection("ticker");
    return raw.map((t) => t.title).filter(Boolean);
  } catch {
    return [];
  }
};

/* ── Helper ── */
function formatDate(iso) {
  if (!iso) return "";
  try {
    return new Date(iso).toLocaleDateString("hi-IN", {
      day: "2-digit", month: "short", year: "numeric",
    });
  } catch { return ""; }
}

const normalize = (tag) => (tag || "").toString().trim().toLowerCase();

/* ═══════════════════════════════════════════════════════════════ */
/* ─── COMPONENTS ─────────────────────────────────────────────── */
/* ═══════════════════════════════════════════════════════════════ */

/* ── Breaking News Ticker ── */
const Ticker = ({ items }) => (
  <div className="overflow-hidden relative h-7 flex-1">
    <div
      className="absolute inset-0 flex items-center animate-marquee whitespace-nowrap"
      style={{ color: "var(--text-primary)", fontSize: "0.875rem", fontWeight: 500 }}
    >
      {items.concat(items).map((text, i) => (
        <span key={i} className="inline-flex items-center mx-6">
          <span
            className="w-1.5 h-1.5 rounded-full mr-2.5 flex-shrink-0"
            style={{ background: "var(--brand-accent)" }}
          />
          {text}
        </span>
      ))}
    </div>
  </div>
);

/* ── Article Card ── */
const ArticleCard = ({ article }) => (
  <Link href={`/Read-full-news/${article.slug}`} className="article-card">
    <div className="card-image">
      <img src={article.img} alt={article.title} loading="lazy" />
      <span className="card-tag">{article.tag}</span>
    </div>
    <div className="card-body">
      <h3 className="card-title">{article.title}</h3>
      <p className="card-excerpt">{article.excerpt}</p>
      <div className="card-meta">
        <div className="card-author">
          {article.avatar && <img src={article.avatar} alt={article.author} />}
          <div>
            <div style={{ color: "var(--text-primary)", fontSize: "0.8125rem", fontWeight: 500 }}>
              {article.author}
            </div>
            <div style={{ fontSize: "0.6875rem", color: "var(--text-muted)" }}>
              {formatDate(article.createdAt)}
            </div>
          </div>
        </div>
        <span className="card-cta">और पढ़ें →</span>
      </div>
    </div>
  </Link>
);

/* ── Compact Sidebar Item ── */
const TrendingItem = ({ article, index }) => (
  <Link
    href={`/Read-full-news/${article.slug}`}
    className="group flex gap-3 items-start py-3"
    style={{ borderBottom: "1px solid var(--border-subtle)" }}
  >
    <span
      className="flex-shrink-0 w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold"
      style={{ background: "var(--bg-muted)", color: "var(--brand-primary)" }}
    >
      {String(index + 1).padStart(2, "0")}
    </span>
    <div className="flex-1 min-w-0">
      <h4
        className="text-sm font-semibold line-clamp-2 leading-snug group-hover:opacity-70 transition-opacity"
        style={{ fontFamily: "var(--font-hindi)", color: "var(--text-primary)" }}
      >
        {article.title}
      </h4>
      <span className="text-xs mt-1 block" style={{ color: "var(--text-muted)" }}>
        {formatDate(article.createdAt)}
      </span>
    </div>
    <div
      className="w-16 h-12 flex-shrink-0 rounded-lg overflow-hidden"
      style={{ background: "var(--bg-muted)" }}
    >
      <img
        src={article.img}
        alt=""
        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        loading="lazy"
      />
    </div>
  </Link>
);

/* ── Section Header ── */
const SectionHeader = ({ title, href }) => (
  <div className="flex items-center justify-between mb-5">
    <div className="section-header" style={{ marginBottom: 0 }}>
      <h2>{title}</h2>
    </div>
    {href && (
      <Link
        href={href}
        className="text-xs font-bold px-3 py-1.5 rounded-full transition-colors"
        style={{
          color: "var(--brand-primary)",
          border: "1px solid var(--border-light)",
        }}
      >
        सब देखें →
      </Link>
    )}
  </div>
);

/* ═══════════════════════════════════════════════════════════════ */
/* ─── HOME PAGE ──────────────────────────────────────────────── */
/* ═══════════════════════════════════════════════════════════════ */
export default async function Home() {
  // Parallel data fetching with cache
  const [data, tickerItems] = await Promise.all([
    getCachedNews(),
    getCachedTicker(),
  ]);

  // Category-based filtering
  const sports = data.filter((a) => normalize(a.tag) === "खेल");
  const entertainment = data.filter((a) => normalize(a.tag) === "फ़िल्मी दुनिया");
  const tech = data.filter((a) => normalize(a.tag) === "टेक");

  // JSON-LD
  const websiteJsonLd = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Hmar Duniya",
    url: "https://www.hmarduniya.in",
    potentialAction: {
      "@type": "SearchAction",
      target: "https://www.hmarduniya.in/news/होम?q={search_term_string}",
      "query-input": "required name=search_term_string",
    },
  };

  return (
    <div style={{ fontFamily: "var(--font-latin)" }}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }}
      />

      {/* ─── Breaking Ticker ─── */}
      {tickerItems.length > 0 && (
        <div style={{ background: "#fffbeb", borderBottom: "1px solid #fde68a" }}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2 flex items-center gap-3">
            <span
              className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider flex-shrink-0"
              style={{ background: "var(--brand-accent)", color: "white" }}
            >
              LIVE
            </span>
            <Ticker items={tickerItems} />
          </div>
        </div>
      )}

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* ─── Hero ─── */}
        <section className="pt-5 sm:pt-7">
          {data.length > 0 && (
            <Hero lead={data[0]} trending={data.slice(1, 5)} />
          )}
        </section>

        {/* ─── ताज़ा खबरें ─── */}
        <section className="mt-8 sm:mt-10">
          <SectionHeader title="ताज़ा खबरें" href="/news/होम" />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
            {data.slice(1, 5).map((a) => (
              <ArticleCard key={a.id} article={a} />
            ))}
          </div>
        </section>

        {/* ─── खेल + Trending Sidebar ─── */}
        <section className="mt-8 sm:mt-10">
          <div className="lg:flex lg:gap-8">
            {/* Sports */}
            <div className="flex-1 min-w-0">
              <SectionHeader
                title="खेल"
                href={`/news/${encodeURIComponent("खेल")}`}
              />
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
                {(sports.length >= 4 ? sports : data.slice(5, 9)).slice(0, 4).map((a) => (
                  <ArticleCard key={a.id} article={a} />
                ))}
              </div>
            </div>

            {/* Trending Sidebar */}
            <aside className="lg:w-80 flex-shrink-0 mt-8 lg:mt-0">
              <div
                className="rounded-2xl p-5 sticky top-24"
                style={{
                  background: "var(--bg-card)",
                  border: "1px solid var(--border-light)",
                  boxShadow: "var(--shadow-card)",
                }}
              >
                <h3
                  className="text-base font-bold pb-3 mb-1 flex items-center gap-2"
                  style={{
                    fontFamily: "var(--font-hindi)",
                    color: "var(--text-primary)",
                    borderBottom: "2px solid var(--brand-primary)",
                  }}
                >
                  🔥 ट्रेंडिंग
                </h3>
                {data.slice(0, 6).map((a, i) => (
                  <TrendingItem key={a.id} article={a} index={i} />
                ))}
              </div>
            </aside>
          </div>
        </section>

        {/* ─── मनोरंजन (with featured card) ─── */}
        {entertainment.length > 0 && (
          <section className="mt-8 sm:mt-10">
            <SectionHeader
              title="मनोरंजन"
              href={`/news/${encodeURIComponent("फ़िल्मी दुनिया")}`}
            />
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 sm:gap-5">
              {/* Large featured */}
              <Link
                href={`/Read-full-news/${entertainment[0].slug}`}
                className="lg:col-span-6 group block relative rounded-2xl overflow-hidden"
                style={{ minHeight: "300px", background: "var(--bg-muted)" }}
              >
                <img
                  src={entertainment[0].img}
                  alt={entertainment[0].title}
                  className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                />
                <div
                  className="absolute inset-0 flex items-end"
                  style={{
                    background: "linear-gradient(to top, rgba(0,0,0,0.85), rgba(0,0,0,0.3) 50%, transparent)",
                  }}
                >
                  <div className="p-5 sm:p-7 w-full">
                    <span
                      className="inline-block px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide mb-3"
                      style={{ background: "var(--brand-accent)", color: "white" }}
                    >
                      {entertainment[0].tag}
                    </span>
                    <h3
                      className="text-lg sm:text-2xl font-extrabold leading-tight line-clamp-2 text-white"
                      style={{ fontFamily: "var(--font-hindi)" }}
                    >
                      {entertainment[0].title}
                    </h3>
                    <p className="text-sm mt-2 line-clamp-2 text-white/70 max-w-lg">
                      {entertainment[0].excerpt}
                    </p>
                  </div>
                </div>
              </Link>

              {/* Smaller cards */}
              <div className="lg:col-span-6 grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
                {entertainment.slice(1, 5).map((a) => (
                  <ArticleCard key={a.id} article={a} />
                ))}
              </div>
            </div>
          </section>
        )}

        {/* ─── टेक्नोलॉजी ─── */}
        {tech.length > 0 && (
          <section className="mt-8 sm:mt-10">
            <SectionHeader
              title="टेक्नोलॉजी"
              href={`/news/${encodeURIComponent("टेक")}`}
            />
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
              {tech.slice(0, 4).map((a) => (
                <ArticleCard key={a.id} article={a} />
              ))}
            </div>
          </section>
        )}

        {/* ─── और खबरें ─── */}
        <section className="mt-8 sm:mt-10 mb-10">
          <SectionHeader title="और खबरें" href="/news/होम" />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
            {data.slice(9, 17).map((a) => (
              <ArticleCard key={a.id} article={a} />
            ))}
          </div>

          {/* View All CTA */}
          <div className="text-center mt-8">
            <Link
              href="/news/होम"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-sm font-bold transition-all duration-200 hover:shadow-lg hover:opacity-90"
              style={{ background: "var(--brand-primary)", color: "white" }}
            >
              सभी खबरें देखें
              <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </Link>
          </div>
        </section>

      </main>

      <Footer />
    </div>
  );
}
