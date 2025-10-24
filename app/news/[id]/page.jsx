"use client";
// app/news/[id]/page.jsx
import React, { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { useParams, useSearchParams, useRouter } from "next/navigation";
import ProfessionalLoader from "@/components/Loading";
import BackButton from "@/components/BackButton";
import {
  Search,
  Clock,
  Eye,
  TrendingUp,
  Mail,
  User,
  Calendar,
  Home,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { fetchCollection } from "@/components/server/fetchnews";

const PAGE_SIZE = 6;
const PAGINATION_RANGE = 3;

/* ---------- Presentational pieces (pure functions, client-safe) ---------- */

const ArticleCard = ({ article }) => {
  return (
    <article className="group bg-white rounded-lg border border-gray-200 overflow-hidden hover:shadow-md transition-all duration-300">
      <div className="relative aspect-[16/10] overflow-hidden">
        <img
          src={article.img}
          alt={article.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute top-3 left-3">
          <span className="bg-black/80 text-white px-2 py-1 rounded text-xs font-medium">
            {article.tag}
          </span>
        </div>
        {article.trending && (
          <div className="absolute top-3 right-3 bg-red-500 text-white p-1 rounded">
            <TrendingUp size={14} />
          </div>
        )}
      </div>

      <div className="p-4">
        <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2 leading-tight">
          {article.title}
        </h3>
        <p className="text-gray-600 text-sm mb-3 line-clamp-2">
          {article.excerpt}
        </p>

        <div className="flex items-center justify-between text-xs text-gray-500 mb-3">
          <div className="flex items-center gap-1">
            <User size={12} />
            <span>{article.author}</span>
          </div>
          <div className="flex items-center gap-1">
            <Clock size={12} />
            <span>{article.time}</span>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <span className="text-xs text-gray-500">
            {article.readMinutes} min read
          </span>
          <span className="text-xs text-gray-500 flex items-center gap-1">
            <Eye size={12} />
            {article.views}
          </span>
        </div>

        <Link
          href={`/article/${article.id}`}
          className="w-full mt-3 block bg-blue-600 text-white py-2 rounded text-sm font-medium text-center hover:bg-blue-700 transition-colors"
        >
          पूरा पढ़ें
        </Link>
      </div>
    </article>
  );
};

const FeaturedArticle = ({ article }) => {
  if (!article) return null;
  return (
    <article className="bg-white rounded-lg border border-gray-200 overflow-hidden mb-8">
      <div className="grid md:grid-cols-2 gap-6">
        <div className="relative aspect-[4/3] md:aspect-auto">
          <img
            src={article.img}
            alt={article.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute top-4 left-4">
            <span className="bg-red-600 text-white px-3 py-1 rounded text-sm font-medium">
              {article.tag}
            </span>
          </div>
        </div>

        <div className="p-6">
          <div className="flex items-center gap-2 text-sm text-red-600 font-medium mb-4">
            <div className="w-2 h-2 bg-red-600 rounded-full animate-pulse" />
            मुख्य खबर
          </div>

          <h2 className="text-xl font-bold text-gray-900 mb-4 leading-tight">
            {article.title}
          </h2>
          <p className="text-gray-600 mb-6 leading-relaxed">
            {article.excerpt}
          </p>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <img
                src={article.avatar}
                alt={article.author}
                className="w-8 h-8 rounded-full"
              />
              <div>
                <div className="text-sm font-medium text-gray-900">
                  {article.author}
                </div>
                <div className="flex items-center gap-2 text-xs text-gray-500">
                  <Clock size={12} />
                  {article.time}
                </div>
              </div>
            </div>
            <Link
              href={`/article/${article.id}`}
              className="bg-gray-900 text-white px-4 py-2 rounded text-sm font-medium hover:bg-gray-800 transition-colors"
            >
              पढ़ें
            </Link>
          </div>
        </div>
      </div>
    </article>
  );
};

/* -------- Pagination helper (client-side links) -------- */
const buildUrl = ({ category, q, page }) => {
  const categoryPath =
    category && category !== "सभी" ? encodeURIComponent(category) : "सभी";
  const params = new URLSearchParams();
  if (q) params.set("q", q);
  if (page) params.set("page", String(page));
  const qs = params.toString();
  return `/news/${categoryPath}${qs ? `?${qs}` : ""}`;
};

const PaginationBlock = ({ currentPage, totalPages, category, q }) => {
  if (totalPages <= 1) return null;

  const getPageNumbers = () => {
    const pages = [];
    const startPage = Math.max(1, currentPage - PAGINATION_RANGE);
    const endPage = Math.min(totalPages, currentPage + PAGINATION_RANGE);
    for (let i = startPage; i <= endPage; i++) pages.push(i);
    return pages;
  };

  const pages = getPageNumbers();

  return (
    <div className="flex items-center justify-center gap-2 mt-8">
      <Link
        href={buildUrl({ category, q, page: Math.max(1, currentPage - 1) })}
        className={`flex items-center gap-1 px-3 py-2 rounded text-sm font-medium transition-colors ${
          currentPage === 1
            ? "text-gray-400 pointer-events-none"
            : "text-gray-700 hover:bg-gray-100"
        }`}
      >
        <ChevronLeft size={16} />
        पिछला
      </Link>

      {currentPage > PAGINATION_RANGE + 1 && (
        <>
          <Link
            href={buildUrl({ category, q, page: 1 })}
            className="px-3 py-2 rounded text-sm font-medium text-gray-700 hover:bg-gray-100"
          >
            1
          </Link>
          {currentPage > PAGINATION_RANGE + 2 && (
            <span className="px-2 text-gray-400">...</span>
          )}
        </>
      )}

      {pages.map((p) => (
        <Link
          key={p}
          href={buildUrl({ category, q, page: p })}
          className={`px-3 py-2 rounded text-sm font-medium transition-colors ${
            p === currentPage
              ? "bg-blue-600 text-white"
              : "text-gray-700 hover:bg-gray-100"
          }`}
        >
          {p}
        </Link>
      ))}

      {currentPage < totalPages - PAGINATION_RANGE && (
        <>
          {currentPage < totalPages - PAGINATION_RANGE - 1 && (
            <span className="px-2 text-gray-400">...</span>
          )}
          <Link
            href={buildUrl({ category, q, page: totalPages })}
            className="px-3 py-2 rounded text-sm font-medium text-gray-700 hover:bg-gray-100"
          >
            {totalPages}
          </Link>
        </>
      )}

      <Link
        href={buildUrl({
          category,
          q,
          page: Math.min(totalPages, currentPage + 1),
        })}
        className={`flex items-center gap-1 px-3 py-2 rounded text-sm font-medium transition-colors ${
          currentPage === totalPages
            ? "text-gray-400 pointer-events-none"
            : "text-gray-700 hover:bg-gray-100"
        }`}
      >
        अगला
        <ChevronRight size={16} />
      </Link>
    </div>
  );
};

/* ------------------- Main client page ------------------- */
export default function CategoryNewsPage() {
  // client hooks for route + query
  const params = useParams(); // returns { id: '...' } in client components
  const searchParams = useSearchParams(); // URLSearchParams-like
  const router = useRouter();

  const [SAMPLE_ARTICLES, setSAMPLE_ARTICLES] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // load data on client
  useEffect(() => {
    let mounted = true;

    async function load() {
      try {
        setLoading(true);
        setError(null);
        const items = await fetchCollection("news");
        if (!mounted) return;
        setSAMPLE_ARTICLES(items ?? []);
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

  // category from route params
  const categoryId = params?.id ?? null;
  const currentCategory = categoryId ? decodeURIComponent(categoryId) : "सभी";

  // query params via useSearchParams()
  const q = (searchParams?.get("q") ?? "").trim();
  const pageParamRaw = searchParams?.get("page") ?? "1";
  const pageParam = parseInt(pageParamRaw, 10);
  const currentPage = Number.isNaN(pageParam) || pageParam < 1 ? 1 : pageParam;

  // categories list (depending on loaded articles)
  const categories = useMemo(() => {
    const all = SAMPLE_ARTICLES.map((a) => a.tag).filter(Boolean);
    return ["सभी", ...Array.from(new Set(all))];
  }, [SAMPLE_ARTICLES]);

  // filter articles by category and search
  const filtered = useMemo(() => {
    let arr = SAMPLE_ARTICLES || [];
    if (categoryId && currentCategory !== "सभी") {
      arr = arr.filter((a) => a.tag === currentCategory);
    }
    if (q) {
      const lower = q.toLowerCase();
      arr = arr.filter(
        (a) =>
          (a.title || "").toLowerCase().includes(lower) ||
          (a.excerpt || "").toLowerCase().includes(lower) ||
          (a.author || "").toLowerCase().includes(lower) ||
          (a.tag || "").toLowerCase().includes(lower)
      );
    }
    return arr;
  }, [SAMPLE_ARTICLES, categoryId, currentCategory, q]);

  const featuredArticle = filtered.find((a) => a.featured);
  const regularArticles = filtered.filter((a) => !a.featured);

  const totalPages = Math.max(1, Math.ceil(regularArticles.length / PAGE_SIZE));
  const startIndex = (currentPage - 1) * PAGE_SIZE;
  const endIndex = startIndex + PAGE_SIZE;
  const paginatedRegularArticles = regularArticles.slice(startIndex, endIndex);

  const displayedCount =
    (featuredArticle && currentPage === 1 ? 1 : 0) +
    paginatedRegularArticles.length;

  // loading / error states
  if (loading) return <ProfessionalLoader />;
  if (error) return <div>Error: {error.message || String(error)}</div>;

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <BackButton className="sm:left-6 left-2 shadow-2xl" />
      <header className="border-b border-gray-200">
        <div className="max-w-6xl mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">समाचार</h1>
              <p className="text-gray-600 text-sm">ताज़ा खबरें और अपडेट</p>
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-500">
              <Calendar size={16} />
              <span>{new Date().toLocaleDateString("hi-IN")}</span>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 py-8">
        {/* Breadcrumb */}
        {currentCategory !== "सभी" && (
          <nav className="flex items-center gap-2 text-sm text-gray-600 mb-6">
            <Link
              href="/news"
              className="flex items-center gap-1 hover:text-blue-600 transition-colors"
            >
              <Home size={16} />
              होम
            </Link>
            <span>/</span>
            <span className="text-gray-900 font-medium">{currentCategory}</span>
          </nav>
        )}

        {/* Search form (client handled) */}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            const form = e.currentTarget;
            const formData = new FormData(form);
            const newQ = formData.get("q") ?? "";
            // navigate keeping category path
            router.push(
              buildUrl({
                category: currentCategory,
                q: String(newQ).trim(),
                page: 1,
              })
            );
          }}
          className="relative mb-8"
        >
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            name="q"
            defaultValue={q}
            placeholder="खबरें खोजें..."
            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </form>

        {/* Category pills */}
        <div className="flex flex-wrap gap-2 mb-6">
          {categories.map((cat) => (
            <Link
              key={cat}
              href={buildUrl({ category: cat, q, page: 1 })}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                cat === currentCategory
                  ? "bg-blue-600 text-white"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              {cat}
            </Link>
          ))}
        </div>

        {/* Results info */}
        <div className="mb-6">
          <p className="text-gray-600 text-sm">
            पृष्ठ {currentPage} का {totalPages} - {displayedCount} दिखाए जा रहे
            / कुल {filtered.length} लेख
            {q && ` — "${q}" के लिए`}
            {currentCategory !== "सभी" && ` — श्रेणी: ${currentCategory}`}
          </p>
        </div>

        {/* Featured */}
        {featuredArticle && currentPage === 1 && (
          <FeaturedArticle article={featuredArticle} />
        )}

        {/* Grid */}
        {filtered.length === 0 ? (
          <div className="text-center py-12">
            <Search className="w-12 h-12 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              कोई लेख नहीं मिला
            </h3>
            <p className="text-gray-600 text-sm mb-4">
              {q
                ? `"${q}" के लिए कोई परिणाम नहीं मिले।`
                : "कृपया अलग श्रेणी चुनें।"}
            </p>
            <Link
              href="/news"
              className="bg-blue-600 text-white px-4 py-2 rounded text-sm font-medium hover:bg-blue-700 transition-colors"
            >
              सभी खबरें देखें
            </Link>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {paginatedRegularArticles.map((article) => (
                <ArticleCard key={article.id} article={article} />
              ))}
            </div>

            <PaginationBlock
              currentPage={currentPage}
              totalPages={totalPages}
              category={currentCategory}
              q={q}
            />
          </>
        )}

        {/* Newsletter */}
        <div className="bg-gray-50 rounded-lg p-6 border border-gray-200 mt-12">
          <div className="flex items-center gap-3 mb-3">
            <Mail className="text-blue-600 w-5 h-5" />
            <h3 className="font-semibold text-gray-900">
              न्यूज़लेटर सब्सक्राइब करें
            </h3>
          </div>
          <p className="text-gray-600 text-sm mb-4">
            दिन की शीर्ष कहानियां अपने इनबॉक्स में प्राप्त करें।
          </p>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              // handle subscribe action client-side or call an API
              alert("धन्यवाद! आप सब्सक्राइब हो चुके हैं।");
            }}
            className="flex gap-2"
          >
            <input
              type="email"
              name="email"
              placeholder="आपका ईमेल पता"
              className="flex-1 px-3 py-2 border border-gray-300 rounded text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
              required
            />
            <button
              type="submit"
              className="bg-blue-600 text-white px-4 py-2 rounded text-sm font-medium hover:bg-blue-700 transition-colors"
            >
              सब्सक्राइब
            </button>
          </form>
        </div>
      </main>

      <footer className="border-t border-gray-200 mt-12">
        <div className="max-w-6xl mx-auto px-4 py-6">
          <div className="text-center text-gray-600 text-sm">
            <p>© {new Date().getFullYear()} समाचार. सभी अधिकार सुरक्षित।</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
