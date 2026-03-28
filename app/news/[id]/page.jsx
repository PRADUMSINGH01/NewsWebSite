// app/news/[id]/page.jsx — Server Component (SEO-optimized)
import React, { cache } from "react";
import Link from "next/link";
import { fetchCollection } from "@/components/server/fetchnews";
import Footer from "@/components/Footer";

// ISR: Rebuild every 5 minutes
export const revalidate = 300;

const PAGE_SIZE = 12;
const SITE_URL = "https://www.hmarduniya.in";

// Cache data fetch (deduplicates across generateMetadata + render)
const getCachedNews = cache(async () => {
  try {
    const raw = await fetchCollection("news");
    return (raw || []).map(serializeArticle);
  } catch (err) {
    console.error("[News] Fetch error:", err);
    return [];
  }
});

/* ── SEO: Dynamic Metadata ─────────────────────────────────── */
export async function generateMetadata(props) {
  const params = await props.params;
  const categoryId = params?.id ? decodeURIComponent(params.id) : "होम";

  const title =
    categoryId === "होम"
      ? "सभी ताज़ा खबरें — Hmar Duniya"
      : `${categoryId} — ताज़ा खबरें और अपडेट | Hmar Duniya`;

  const description =
    categoryId === "होम"
      ? "Hmar Duniya पर पढ़ें सभी ताज़ा ख़बरें — राजनीति, खेल, टेक, मनोरंजन और बहुत कुछ।"
      : `${categoryId} की ताज़ा खबरें और अपडेट — Hmar Duniya पर पढ़ें।`;

  return {
    title,
    description,
    alternates: {
      canonical: `${SITE_URL}/news/${encodeURIComponent(categoryId)}`,
    },
    openGraph: {
      title,
      description,
      url: `${SITE_URL}/news/${encodeURIComponent(categoryId)}`,
      siteName: "Hmar Duniya",
      locale: "hi_IN",
      type: "website",
    },
  };
}

/* ── Helpers ────────────────────────────────────────────────── */
function serializeArticle(item) {
  let createdAtStr = null;
  if (item.createdAt && typeof item.createdAt.toDate === "function") {
    createdAtStr = item.createdAt.toDate().toISOString();
  } else if (item.time) {
    const d = new Date(item.time);
    if (!isNaN(d.getTime())) createdAtStr = d.toISOString();
  }
  return { ...item, createdAt: createdAtStr, time: createdAtStr };
}

function formatDate(iso) {
  if (!iso) return "";
  try {
    return new Date(iso).toLocaleDateString("hi-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  } catch {
    return "";
  }
}

/* ── Icons (inline, no external deps) ──────────────────────── */
const SearchIcon = () => (
  <svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="11" cy="11" r="8" /><path d="M21 21l-4.35-4.35" />
  </svg>
);

const ClockIcon = () => (
  <svg width="12" height="12" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" />
  </svg>
);

const ChevronLeftIcon = () => (
  <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="15 18 9 12 15 6" />
  </svg>
);

const ChevronRightIcon = () => (
  <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="9 6 15 12 9 18" />
  </svg>
);

/* ── Pagination URL Builder ────────────────────────────────── */
function buildUrl(category, page, q) {
  const catPath = encodeURIComponent(category || "होम");
  const params = new URLSearchParams();
  if (q) params.set("q", q);
  if (page && page > 1) params.set("page", String(page));
  const qs = params.toString();
  return `/news/${catPath}${qs ? `?${qs}` : ""}`;
}

/* ── Article Card ──────────────────────────────────────────── */
const ArticleCard = ({ article }) => (
  <Link
    href={`/Read-full-news/${article.slug}`}
    className="article-card group"
  >
    <div className="card-image">
      <img src={article.img} alt={article.title} loading="lazy" />
      <span className="card-tag">{article.tag}</span>
    </div>
    <div className="card-body">
      <h3 className="card-title">{article.title}</h3>
      <p className="card-excerpt">{article.excerpt}</p>
      <div className="card-meta">
        <div className="card-author">
          {article.avatar && (
            <img src={article.avatar} alt={article.author} />
          )}
          <div>
            <div style={{ color: "var(--text-primary)", fontSize: "0.8125rem", fontWeight: 500 }}>
              {article.author}
            </div>
            <div style={{ fontSize: "0.6875rem", color: "var(--text-muted)" }}>
              {formatDate(article.createdAt)}
            </div>
          </div>
        </div>
        <span className="card-cta">पूरा पढ़ें →</span>
      </div>
    </div>
  </Link>
);

/* ── Featured Hero Card ────────────────────────────────────── */
const FeaturedArticle = ({ article }) => {
  if (!article) return null;
  return (
    <Link
      href={`/Read-full-news/${article.slug}`}
      className="group block rounded-2xl overflow-hidden mb-8 relative"
      style={{ background: "var(--bg-muted)", minHeight: "320px" }}
    >
      <img
        src={article.img}
        alt={article.title}
        className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
      />
      <div
        className="absolute inset-0 flex items-end"
        style={{
          background: "linear-gradient(to top, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.4) 40%, transparent 70%)",
        }}
      >
        <div className="p-5 sm:p-8 w-full max-w-3xl">
          <div className="flex items-center gap-3 mb-3">
            <span
              className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide"
              style={{ background: "var(--brand-accent)", color: "white" }}
            >
              {article.tag}
            </span>
            <span className="text-white/60 text-xs font-medium flex items-center gap-1">
              <ClockIcon />
              {formatDate(article.createdAt)}
            </span>
          </div>
          <h2
            className="text-xl sm:text-3xl md:text-4xl font-extrabold leading-tight line-clamp-2 text-white"
            style={{ fontFamily: "var(--font-hindi)" }}
          >
            {article.title}
          </h2>
          <p className="text-sm sm:text-base mt-3 line-clamp-2 text-white/75 max-w-2xl">
            {article.excerpt}
          </p>
          <div className="flex items-center gap-3 mt-4">
            {article.avatar && (
              <img
                src={article.avatar}
                alt={article.author}
                className="w-8 h-8 rounded-full object-cover border-2 border-white/30"
              />
            )}
            <span className="text-white/90 text-sm font-medium">{article.author}</span>
          </div>
        </div>
      </div>
    </Link>
  );
};

/* ── Pagination ────────────────────────────────────────────── */
const Pagination = ({ currentPage, totalPages, category, q }) => {
  if (totalPages <= 1) return null;
  const pages = [];
  const start = Math.max(1, currentPage - 2);
  const end = Math.min(totalPages, currentPage + 2);
  for (let i = start; i <= end; i++) pages.push(i);

  return (
    <nav className="flex items-center justify-center gap-1.5 mt-10" aria-label="Pagination">
      <Link
        href={buildUrl(category, Math.max(1, currentPage - 1), q)}
        className={`flex items-center gap-1 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
          currentPage === 1 ? "pointer-events-none opacity-40" : "hover:bg-gray-100"
        }`}
        style={{ color: "var(--text-secondary)" }}
      >
        <ChevronLeftIcon /> पिछला
      </Link>

      {start > 1 && (
        <>
          <Link href={buildUrl(category, 1, q)} className="px-3 py-2 rounded-lg text-sm font-medium hover:bg-gray-100" style={{ color: "var(--text-secondary)" }}>1</Link>
          {start > 2 && <span className="px-1" style={{ color: "var(--text-muted)" }}>…</span>}
        </>
      )}

      {pages.map((p) => (
        <Link
          key={p}
          href={buildUrl(category, p, q)}
          className={`px-3.5 py-2 rounded-lg text-sm font-semibold transition-colors ${
            p === currentPage ? "" : "hover:bg-gray-100"
          }`}
          style={
            p === currentPage
              ? { background: "var(--brand-primary)", color: "white" }
              : { color: "var(--text-secondary)" }
          }
          aria-current={p === currentPage ? "page" : undefined}
        >
          {p}
        </Link>
      ))}

      {end < totalPages && (
        <>
          {end < totalPages - 1 && <span className="px-1" style={{ color: "var(--text-muted)" }}>…</span>}
          <Link href={buildUrl(category, totalPages, q)} className="px-3 py-2 rounded-lg text-sm font-medium hover:bg-gray-100" style={{ color: "var(--text-secondary)" }}>{totalPages}</Link>
        </>
      )}

      <Link
        href={buildUrl(category, Math.min(totalPages, currentPage + 1), q)}
        className={`flex items-center gap-1 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
          currentPage === totalPages ? "pointer-events-none opacity-40" : "hover:bg-gray-100"
        }`}
        style={{ color: "var(--text-secondary)" }}
      >
        अगला <ChevronRightIcon />
      </Link>
    </nav>
  );
};

/* ═══════════════════════════════════════════════════════════════ */
/* ─── MAIN SERVER PAGE ──────────────────────────────────────── */
/* ═══════════════════════════════════════════════════════════════ */
export default async function CategoryNewsPage(props) {
  const params = await props.params;
  const searchParams = await props.searchParams;

  const categoryId = params?.id ? decodeURIComponent(params.id) : "होम";
  const q = (searchParams?.q ?? "").trim();
  const pageParam = parseInt(searchParams?.page ?? "1", 10);
  const currentPage = isNaN(pageParam) || pageParam < 1 ? 1 : pageParam;

  /* ── Fetch data SERVER-SIDE (cached + deduplicated) ── */
  const allArticles = await getCachedNews();

  /* ── Category list ── */
  const allTags = allArticles.map((a) => a.tag).filter(Boolean);
  const categories = ["होम", ...Array.from(new Set(allTags))];

  /* ── Filter ── */
  let filtered = allArticles;
  if (categoryId && categoryId !== "होम") {
    filtered = filtered.filter((a) => a.tag === categoryId);
  }
  if (q) {
    const lower = q.toLowerCase();
    filtered = filtered.filter(
      (a) =>
        (a.title || "").toLowerCase().includes(lower) ||
        (a.excerpt || "").toLowerCase().includes(lower)
    );
  }

  /* ── Pagination ── */
  const featuredArticle = currentPage === 1 && !q ? filtered[0] : null;
  const regularArticles = featuredArticle ? filtered.slice(1) : filtered;
  const totalPages = Math.max(1, Math.ceil(regularArticles.length / PAGE_SIZE));
  const safePage = Math.min(currentPage, totalPages);
  const startIdx = (safePage - 1) * PAGE_SIZE;
  const paginatedArticles = regularArticles.slice(startIdx, startIdx + PAGE_SIZE);

  /* ── Breadcrumb JSON-LD ── */
  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "होम", item: SITE_URL },
      ...(categoryId !== "होम"
        ? [{ "@type": "ListItem", position: 2, name: categoryId, item: `${SITE_URL}/news/${encodeURIComponent(categoryId)}` }]
        : []),
    ],
  };

  return (
    <div style={{ fontFamily: "var(--font-latin)" }}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />

      {/* ─── Page Header ─── */}
      <div style={{ background: "var(--brand-primary)" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-sm mb-4" style={{ color: "rgba(255,255,255,0.6)" }} aria-label="Breadcrumb">
            <Link href="/" className="hover:text-white transition-colors">होम पेज</Link>
            <span>/</span>
            <span className="text-white font-medium">
              {categoryId === "होम" ? "सभी समाचार" : categoryId}
            </span>
          </nav>

          <h1
            className="text-2xl sm:text-4xl font-extrabold text-white"
            style={{ fontFamily: "var(--font-hindi)" }}
          >
            {categoryId === "होम" ? "📰 सभी समाचार" : categoryId}
          </h1>
          <p className="text-sm sm:text-base mt-2" style={{ color: "rgba(255,255,255,0.7)" }}>
            {filtered.length} {q ? `"${q}" के लिए` : ""} लेख उपलब्ध
          </p>
        </div>
      </div>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">

        {/* ─── Search Bar ─── */}
        <form
          action={`/news/${encodeURIComponent(categoryId)}`}
          method="GET"
          className="mb-6"
        >
          <div className="relative">
            <div className="absolute left-4 top-1/2 -translate-y-1/2" style={{ color: "var(--text-muted)" }}>
              <SearchIcon />
            </div>
            <input
              name="q"
              defaultValue={q}
              placeholder="खबरें खोजें…"
              className="w-full pl-12 pr-4 py-3.5 rounded-xl text-sm font-medium transition-shadow duration-200 focus:ring-2 focus:ring-offset-1"
              style={{
                background: "var(--bg-card)",
                border: "1px solid var(--border-light)",
                color: "var(--text-primary)",
                outline: "none",
                boxShadow: "var(--shadow-card)",
              }}
            />
          </div>
        </form>

        {/* ─── Category Pills ─── */}
        <div className="flex gap-2 overflow-x-auto pb-4 mb-6 hide-scrollbar">
          {categories.map((cat) => (
            <Link
              key={cat}
              href={buildUrl(cat, 1, "")}
              className="px-4 py-2 rounded-full text-sm font-semibold whitespace-nowrap transition-all duration-200 flex-shrink-0"
              style={
                cat === categoryId
                  ? {
                      background: "var(--brand-primary)",
                      color: "white",
                      boxShadow: "0 2px 10px rgba(13,79,79,0.35)",
                    }
                  : {
                      background: "var(--bg-card)",
                      color: "var(--text-secondary)",
                      border: "1px solid var(--border-light)",
                    }
              }
            >
              {cat === "होम" ? "🏠 सभी" : cat}
            </Link>
          ))}
        </div>

        {/* ─── Featured Article (page 1 only) ─── */}
        {featuredArticle && <FeaturedArticle article={featuredArticle} />}

        {/* ─── Articles Grid ─── */}
        {filtered.length === 0 ? (
          <div className="text-center py-20">
            <div className="text-5xl mb-4">🔍</div>
            <h3
              className="text-xl font-bold mb-2"
              style={{ fontFamily: "var(--font-hindi)", color: "var(--text-primary)" }}
            >
              कोई लेख नहीं मिला
            </h3>
            <p className="text-sm mb-6" style={{ color: "var(--text-secondary)" }}>
              {q ? `"${q}" के लिए कोई परिणाम नहीं।` : "इस श्रेणी में अभी कोई लेख नहीं है।"}
            </p>
            <Link
              href="/news/होम"
              className="inline-flex items-center px-5 py-2.5 rounded-full text-sm font-bold transition-opacity hover:opacity-90"
              style={{ background: "var(--brand-primary)", color: "white" }}
            >
              सभी खबरें देखें →
            </Link>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {paginatedArticles.map((article) => (
                <ArticleCard key={article.id} article={article} />
              ))}
            </div>
            <Pagination currentPage={safePage} totalPages={totalPages} category={categoryId} q={q} />
          </>
        )}

        {/* ─── Page Info ─── */}
        {totalPages > 1 && (
          <p className="text-center text-xs mt-4" style={{ color: "var(--text-muted)" }}>
            पृष्ठ {safePage} / {totalPages}
          </p>
        )}
      </main>

      <Footer />
    </div>
  );
}
