"use client";

import React, { useMemo, useState, useEffect } from "react";
import {
  Search,
  Filter,
  Grid,
  List,
  Loader,
  Image as ImageIcon,
} from "lucide-react";

/* ------------------- Types ------------------- */

type Article = {
  id: number;
  tag: string;
  title: string;
  excerpt: string;
  author: string;
  time: string;
  publishedAt: string;
  img: string;
  credit: string;
  avatar: string;
  featured: boolean;
  readMinutes: number;
  likes: number;
  shares: number;
  views: number;
  trending: boolean;
};

type Columns = { sm?: number; md?: number; lg?: number };

type NewsFeedProps = {
  articles?: Article[];
  columns?: Columns;
};

type Sort = "latest" | "popular" | "trending";

/* ------------------- SAMPLE DATA ------------------- */

const SAMPLE_ARTICLES: Article[] = [
  {
    id: 1,
    tag: "राजनीति",
    title: "संसद का मानसून सत्र: नए विधेयकों पर होगी गरमागरम बहस",
    excerpt:
      "सरकार इस सत्र में कई महत्वपूर्ण विधेयक पेश करने की तैयारी में है, विपक्ष ने भी अपनी रणनीति बना ली है। आर्थिक सुधार और शिक्षा नीति पर विशेष ध्यान दिया जाएगा।",
    author: "रवि प्रकाश",
    time: "2 घंटे पहले",
    publishedAt: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
    img: "https://images.unsplash.com/photo-1602339257297-2519247c9e9d?auto=format&fit=crop&w=1600&h=900&q=80",
    credit: "Unsplash / A. L.",
    avatar: "https://i.pravatar.cc/96?img=1",
    featured: true,
    readMinutes: 4,
    likes: 142,
    shares: 28,
    views: 1250,
    trending: true,
  },
  {
    id: 2,
    tag: "अर्थव्यवस्था",
    title: "बजट 2026: क्या बदलेंगे टैक्स नियम?",
    excerpt:
      "विशेषज्ञों का कहना है कि आगामी बजट में मध्यम वर्ग के लिए राहत संभव है, लेकिन कुछ फाइलिंग नियम सख्त हो सकते हैं।",
    author: "संगीता मेहता",
    time: "6 घंटे पहले",
    publishedAt: new Date(Date.now() - 6 * 60 * 60 * 1000).toISOString(),
    img: "https://images.unsplash.com/photo-1559526324-593bc073d938?auto=format&fit=crop&w=1600&h=900&q=80",
    credit: "Unsplash / Finance",
    avatar: "https://i.pravatar.cc/96?img=5",
    featured: false,
    readMinutes: 5,
    likes: 98,
    shares: 12,
    views: 980,
    trending: false,
  },
  {
    id: 3,
    tag: "टेक",
    title: "नया स्मार्टफोन लॉन्च: क्या है खास?",
    excerpt:
      "बाजार में आया नया स्मार्टफोन शक्तिशाली कैमरा और लंबी बैटरी लाइफ के साथ। यहाँ हमने प्रमुख फीचर्स का विश्लेषण किया है।",
    author: "नीलू शर्मा",
    time: "1 दिन पहले",
    publishedAt: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
    img: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=1600&h=900&q=80",
    credit: "Unsplash / Tech",
    avatar: "https://i.pravatar.cc/96?img=12",
    featured: false,
    readMinutes: 6,
    likes: 320,
    shares: 54,
    views: 4300,
    trending: true,
  },
  {
    id: 4,
    tag: "खेल",
    title: "क्रिकेट विश्व कप: रोमांचक मुकाबला होने की उम्मीद",
    excerpt:
      "टीमें फॉर्म में लौट आई हैं और दर्शकों को बेहतरीन मुकाबले देखने को मिल सकता है। कप्तानों ने रणनीति पर जोर दिया।",
    author: "अजय वर्मा",
    time: "3 दिन पहले",
    publishedAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
    img: "https://images.unsplash.com/photo-1521412644187-c49fa049e84d?auto=format&fit=crop&w=1600&h=900&q=80",
    credit: "Unsplash / Sports",
    avatar: "https://i.pravatar.cc/96?img=20",
    featured: false,
    readMinutes: 7,
    likes: 210,
    shares: 30,
    views: 2100,
    trending: false,
  },
  {
    id: 5,
    tag: "स्वास्थ्य",
    title: "डाइट मिथ्स: क्या सच है क्या मिथक?",
    excerpt:
      "पोषण विशेषज्ञ बताते हैं कि रोजमर्रा की गलतफहमियाँ कैसे आपके लक्ष्य रोक सकती हैं और किन आदतों को अपनाना चाहिए।",
    author: "डॉ. मीरा",
    time: "5 दिन पहले",
    publishedAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
    img: "https://images.unsplash.com/photo-1549576490-b0b4831ef60a?auto=format&fit=crop&w=1600&h=900&q=80",
    credit: "Unsplash / Health",
    avatar: "https://i.pravatar.cc/96?img=8",
    featured: false,
    readMinutes: 3,
    likes: 85,
    shares: 9,
    views: 720,
    trending: false,
  },
  {
    id: 6,
    tag: "मनोरंजन",
    title: "नया फिल्मी ट्रेलर हुआ रिलीज़: समीक्षा",
    excerpt:
      "ट्रेलर में दिखी कहानी और प्रदर्शन ने दर्शकों की जिज्ञासा बढ़ा दी है — यहाँ पहली नज़र की समीक्षा पढ़ें।",
    author: "रेखा कपूर",
    time: "12 घंटे पहले",
    publishedAt: new Date(Date.now() - 12 * 60 * 60 * 1000).toISOString(),
    img: "https://images.unsplash.com/photo-1511659009414-79f6a2f6b1a8?auto=format&fit=crop&w=1600&h=900&q=80",
    credit: "Unsplash / Movies",
    avatar: "https://i.pravatar.cc/96?img=3",
    featured: false,
    readMinutes: 4,
    likes: 470,
    shares: 80,
    views: 5400,
    trending: true,
  },
  {
    id: 7,
    tag: "टेक",
    title: "AI में नई रिसर्च: मॉडल्स और सीमाएँ",
    excerpt:
      "शोधकर्ता बताते हैं कि अभी किन-किन सीमाओं पर काम करना बाकी है और अगला कदम क्या हो सकता है।",
    author: "अरविंद",
    time: "8 घंटे पहले",
    publishedAt: new Date(Date.now() - 8 * 60 * 60 * 1000).toISOString(),
    img: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=1600&h=900&q=80",
    credit: "Unsplash / AI",
    avatar: "https://i.pravatar.cc/96?img=7",
    featured: false,
    readMinutes: 10,
    likes: 610,
    shares: 120,
    views: 7800,
    trending: true,
  },
];

/* ------------------- Image Loader Hook & ProgressiveImage ------------------- */

function useImageLoader(src?: string) {
  const [status, setStatus] = useState<"loading" | "loaded" | "error">(
    src ? "loading" : "error"
  );
  const [loadedSrc, setLoadedSrc] = useState<string | null>(null);

  useEffect(() => {
    if (!src) {
      setStatus("error");
      return;
    }

    setStatus("loading");
    setLoadedSrc(null);

    const img = new Image();
    img.src = src;

    const handleLoad = () => {
      setStatus("loaded");
      setLoadedSrc(src);
    };

    const handleError = () => {
      setStatus("error");
    };

    img.addEventListener("load", handleLoad);
    img.addEventListener("error", handleError);

    return () => {
      img.removeEventListener("load", handleLoad);
      img.removeEventListener("error", handleError);
    };
  }, [src]);

  return { status, loadedSrc };
}

const ProgressiveImage = React.memo(
  ({
    src,
    alt,
    className = "",
    containerClassName = "",
    fallback = (
      <div className="w-full h-full bg-gradient-to-br from-gray-200 to-gray-300 flex items-center justify-center">
        <ImageIcon className="w-8 h-8 text-gray-400" />
      </div>
    ),
  }: {
    src?: string;
    alt?: string;
    className?: string;
    containerClassName?: string;
    fallback?: React.ReactNode;
  }) => {
    const { status, loadedSrc } = useImageLoader(src);

    return (
      <div className={`relative overflow-hidden ${containerClassName}`}>
        {status === "loading" && (
          <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-gray-100 to-gray-200">
            <div className="flex flex-col items-center gap-2">
              <Loader className="w-6 h-6 text-gray-400 animate-spin" />
              <span className="text-xs text-gray-500">Loading...</span>
            </div>
          </div>
        )}

        {status === "error" && (
          <div className="absolute inset-0">{fallback}</div>
        )}

        {status === "loaded" && loadedSrc && (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={loadedSrc}
            alt={alt}
            className={`w-full h-full object-cover transition-opacity duration-500 ${className}`}
            loading="lazy"
            onError={(e) => {
              (e.target as HTMLImageElement).style.display = "none";
            }}
          />
        )}
      </div>
    );
  }
);

ProgressiveImage.displayName = "ProgressiveImage";

/* ------------------- Small UI Components ------------------- */

function FeaturedArticle({ article }: { article: Article }) {
  return (
    <article className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start bg-white rounded-3xl overflow-hidden shadow-xl border border-gray-100">
      <div className="lg:col-span-2 relative h-64 lg:h-80">
        <ProgressiveImage
          src={article.img}
          alt={article.title}
          containerClassName="w-full h-full"
        />
        <div className="absolute left-6 bottom-6 bg-white/80 backdrop-blur-sm px-4 py-2 rounded-full text-sm font-semibold">
          {article.tag}
        </div>
      </div>

      <div className="p-6 flex flex-col gap-4">
        <h2 className="text-2xl font-bold leading-tight">{article.title}</h2>
        <p className="text-gray-600">{article.excerpt}</p>
        <div className="mt-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img
              src={article.avatar}
              alt={article.author}
              className="w-10 h-10 rounded-full object-cover"
            />
            <div>
              <div className="text-sm font-medium">{article.author}</div>
              <div className="text-xs text-gray-500">
                {article.time} • {article.readMinutes} min read
              </div>
            </div>
          </div>
          <div className="text-sm text-gray-500">
            {article.views.toLocaleString()} views
          </div>
        </div>
      </div>
    </article>
  );
}

function ArticleCard({ article }: { article: Article }) {
  return (
    <article className="flex flex-col md:flex-row gap-4 p-6">
      <div className="w-full md:w-48 h-36 rounded-xl overflow-hidden flex-shrink-0">
        <ProgressiveImage
          src={article.img}
          alt={article.title}
          containerClassName="w-full h-full"
        />
      </div>
      <div className="flex-1 flex flex-col justify-between">
        <div>
          <div className="text-xs text-[#0f4c4c] font-semibold mb-1">
            {article.tag}
          </div>
          <h3 className="text-lg font-semibold leading-snug">
            {article.title}
          </h3>
          <p className="text-sm text-gray-600 mt-2 line-clamp-3">
            {article.excerpt}
          </p>
        </div>
        <div className="mt-4 flex items-center justify-between text-sm text-gray-500">
          <div className="flex items-center gap-3">
            <img
              src={article.avatar}
              alt={article.author}
              className="w-8 h-8 rounded-full object-cover"
            />
            <div>
              <div className="font-medium">{article.author}</div>
              <div className="text-xs">{article.time}</div>
            </div>
          </div>
          <div className="text-xs">{article.views.toLocaleString()} views</div>
        </div>
      </div>
    </article>
  );
}

function TrendingTags({
  tags,
  activeTag,
  onSelect,
}: {
  tags: string[];
  activeTag: string;
  onSelect: (t: string) => void;
}) {
  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
      <h4 className="font-semibold mb-4">Trending tags</h4>
      <div className="flex flex-wrap gap-3">
        {tags.map((t) => (
          <button
            key={t}
            onClick={() => onSelect(t)}
            className={`px-4 py-2 rounded-full text-sm ${
              t === activeTag
                ? "bg-[#0f4c4c] text-white"
                : "bg-gray-100 text-gray-700"
            }`}
          >
            {t}
          </button>
        ))}
      </div>
    </div>
  );
}

function SavedArticles() {
  // static placeholder — replace with real saved state as needed
  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
      <h4 className="font-semibold mb-4">Saved for later</h4>
      <div className="text-sm text-gray-600">
        You haven&lsquo;t saved any articles yet.
      </div>
    </div>
  );
}

function Newsletter() {
  const [email, setEmail] = useState("");
  const [saved, setSaved] = useState(false);

  const subscribe = (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!email) return;
    setSaved(true);
    setEmail("");
    // integrate API call here
  };

  return (
    <form
      onSubmit={subscribe}
      className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100"
    >
      <h4 className="font-semibold mb-3">Subscribe to newsletter</h4>
      <p className="text-sm text-gray-600 mb-4">
        Get the day&lsquo;s top stories in your inbox.
      </p>
      {saved ? (
        <div className="text-sm text-green-600">
          Thanks — you&lsquo;re subscribed!
        </div>
      ) : (
        <div className="flex gap-2">
          <input
            type="email"
            value={email}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setEmail(e.target.value)
            }
            placeholder="Your email"
            className="flex-1 px-4 py-3 border rounded-2xl focus:outline-none"
          />
          <button className="px-4 py-3 bg-[#0f4c4c] text-white rounded-2xl">
            Subscribe
          </button>
        </div>
      )}
    </form>
  );
}

/* ------------------- Main Component ------------------- */

function NewsFeed({
  articles = SAMPLE_ARTICLES,
  columns = { sm: 1, md: 2, lg: 2 },
}: NewsFeedProps) {
  const [query, setQuery] = useState("");
  const [activeTag, setActiveTag] = useState("All");
  const [view, setView] = useState<"grid" | "list">("grid");
  const [sort, setSort] = useState<Sort>("latest");
  const [pageSize, setPageSize] = useState(6);
  const [isLoading, setIsLoading] = useState(false);

  const tags = useMemo(() => {
    const tagSet = new Set<string>();
    articles.forEach((article) => article.tag && tagSet.add(article.tag));
    return ["All", ...Array.from(tagSet)];
  }, [articles]);

  const filteredArticles = useMemo(() => {
    const queryLower = query.trim().toLowerCase();
    const filtered = articles.filter((article) => {
      const matchesTag = activeTag === "All" || article.tag === activeTag;
      const matchesQuery =
        !queryLower ||
        article.title.toLowerCase().includes(queryLower) ||
        article.excerpt.toLowerCase().includes(queryLower) ||
        article.author.toLowerCase().includes(queryLower) ||
        article.tag.toLowerCase().includes(queryLower);
      return matchesTag && matchesQuery;
    });

    if (sort === "latest") {
      filtered.sort(
        (a, b) =>
          new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
      );
    } else {
      filtered.sort(
        (a, b) =>
          (b.trending ? 2 : 0) +
          (b.featured ? 1 : 0) +
          b.views / 1000 -
          ((a.trending ? 2 : 0) + (a.featured ? 1 : 0) + a.views / 1000)
      );
    }

    return filtered;
  }, [articles, query, activeTag, sort]);

  const visibleArticles = filteredArticles.slice(0, pageSize);
  const featuredArticle = visibleArticles.find((article) => article.featured);
  const nonFeaturedArticles = featuredArticle
    ? visibleArticles.filter((article) => article.id !== featuredArticle.id)
    : visibleArticles;

  // build safe classes for responsive columns (avoids dynamic template strings)
  const smCols = columns?.sm ?? 1;
  const mdCols = columns?.md ?? 2;
  const lgCols = columns?.lg ?? 2;

  const mapCols = (prefix: string | null, n: number) => {
    const map: Record<number, string> = {
      1: `${prefix ? prefix + ":" : ""}grid-cols-1`,
      2: `${prefix ? prefix + ":" : ""}grid-cols-2`,
      3: `${prefix ? prefix + ":" : ""}grid-cols-3`,
      4: `${prefix ? prefix + ":" : ""}grid-cols-4`,
    };
    return map[n] || "";
  };

  const gridClass =
    view === "grid"
      ? `grid gap-8 ${mapCols(null, 1)} ${mapCols("sm", smCols)} ${mapCols(
          "md",
          mdCols
        )} ${mapCols("lg", lgCols)}`
      : "flex flex-col";

  const handleLoadMore = async () => {
    setIsLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 800));
    setPageSize((prev) => prev + 6);
    setIsLoading(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50/30 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-3 bg-white/80 backdrop-blur-sm border border-gray-200 rounded-2xl px-6 py-3 mb-6 shadow-lg">
            <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse" />
            <span className="text-sm font-semibold text-gray-700">
              LIVE UPDATES
            </span>
          </div>
          <h1 className="text-5xl lg:text-7xl font-black text-gray-900 mb-6 leading-tight">
            Latest{" "}
            <span className="text-transparent bg-gradient-to-r from-[#0f4c4c] to-[#1a6b6b] bg-clip-text">
              News
            </span>
          </h1>
          <p className="text-xl lg:text-2xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Stay informed with real-time updates, breaking news, and in-depth
            analysis from trusted sources worldwide.
          </p>
        </div>

        {/* Controls */}
        <div className="mb-12 bg-white/80 backdrop-blur-sm rounded-3xl p-8 shadow-xl border border-gray-200/50">
          <div className="flex flex-col xl:flex-row gap-6 items-start xl:items-center justify-between">
            <div className="flex flex-col lg:flex-row gap-6 w-full xl:w-auto">
              <div className="relative flex-1 max-w-xl">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-6 h-6" />
                <input
                  value={query}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setQuery(e.target.value)
                  }
                  placeholder="Search for news, topics, or authors..."
                  className="w-full pl-12 pr-6 py-4 border-2 border-gray-200 rounded-2xl bg-white focus:outline-none focus:ring-4 focus:ring-[#0f4c4c]/20 focus:border-[#0f4c4c] transition-all duration-300 text-lg shadow-sm"
                />
              </div>

              <div className="flex items-center gap-4">
                <Filter className="text-gray-400 w-6 h-6" />
                <select
                  value={activeTag}
                  onChange={(e) => setActiveTag(e.target.value)}
                  className="px-6 py-4 border-2 border-gray-200 rounded-2xl bg-white focus:outline-none focus:ring-4 focus:ring-[#0f4c4c]/20 focus:border-[#0f4c4c] transition-all duration-300 text-lg font-medium shadow-sm"
                >
                  {tags.map((tag) => (
                    <option key={tag} value={tag}>
                      {tag}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="flex items-center gap-6 w-full xl:w-auto">
              <select
                value={sort}
                onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
                  setSort(e.target.value as Sort)
                }
                className="px-6 py-4 border-2 border-gray-200 rounded-2xl bg-white focus:outline-none focus:ring-4 focus:ring-[#0f4c4c]/20 focus:border-[#0f4c4c] transition-all duration-300 text-lg font-medium shadow-sm"
              >
                <option value="latest">Latest</option>
                <option value="popular">Most Popular</option>
                <option value="trending">Trending</option>
              </select>

              <div className="flex items-center gap-2 border-2 border-gray-200 bg-white rounded-2xl p-2 shadow-sm">
                <button
                  onClick={() => setView("grid")}
                  className={`p-3 rounded-xl transition-all duration-300 ${
                    view === "grid"
                      ? "bg-gradient-to-r from-[#0f4c4c] to-[#1a6b6b] text-white shadow-lg"
                      : "text-gray-600 hover:bg-gray-50 hover:text-[#0f4c4c]"
                  }`}
                >
                  <Grid size={20} />
                </button>
                <button
                  onClick={() => setView("list")}
                  className={`p-3 rounded-xl transition-all duration-300 ${
                    view === "list"
                      ? "bg-gradient-to-r from-[#0f4c4c] to-[#1a6b6b] text-white shadow-lg"
                      : "text-gray-600 hover:bg-gray-50 hover:text-[#0f4c4c]"
                  }`}
                >
                  <List size={20} />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Results count */}
        <div className="mb-8 flex items-center justify-between">
          <div className="text-lg text-gray-600">
            Found{" "}
            <span className="font-bold text-[#0f4c4c]">
              {filteredArticles.length}
            </span>{" "}
            articles
            {query && (
              <span>
                {" "}
                for &quot;<span className="font-semibold">{query}</span>&quot;
              </span>
            )}
            {activeTag !== "All" && (
              <span>
                {" "}
                in <span className="font-semibold">{activeTag}</span>
              </span>
            )}
          </div>
          <div className="flex items-center gap-4 text-sm text-gray-500">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-yellow-400 rounded-full" />
              <span>Featured</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-red-500 rounded-full" />
              <span>Trending</span>
            </div>
          </div>
        </div>

        {/* Main Grid */}
        <div className="grid grid-cols-1 xl:grid-cols-4 gap-8">
          {/* Articles */}
          <div className="xl:col-span-3">
            {visibleArticles.length === 0 ? (
              <div className="bg-white rounded-3xl p-16 text-center border border-gray-200 shadow-xl">
                <div className="w-24 h-24 bg-gradient-to-br from-gray-100 to-gray-200 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Search size={40} className="text-gray-400" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">
                  No articles found
                </h3>
                <p className="text-gray-600 max-w-md mx-auto text-lg mb-8">
                  {query
                    ? `No results found for "${query}". Try different keywords or filters.`
                    : "Try adjusting your search criteria or browse all categories."}
                </p>
                <button
                  onClick={() => {
                    setQuery("");
                    setActiveTag("All");
                  }}
                  className="px-8 py-4 bg-gradient-to-r from-[#0f4c4c] to-[#1a6b6b] text-white font-bold rounded-2xl hover:shadow-xl transition-all duration-300 transform hover:scale-105"
                >
                  Browse All Articles
                </button>
              </div>
            ) : (
              <>
                {/* Featured */}
                {featuredArticle && (
                  <div className="mb-12">
                    <FeaturedArticle article={featuredArticle} />
                  </div>
                )}

                {/* Articles grid/list */}
                <div className={gridClass}>
                  {nonFeaturedArticles.map((article) => (
                    <div
                      key={article.id}
                      className="group bg-white rounded-2xl overflow-hidden shadow-lg border border-gray-100 hover:shadow-2xl transition-all duration-500"
                    >
                      <ArticleCard article={article} />
                    </div>
                  ))}
                </div>

                {/* Load more */}
                {filteredArticles.length > pageSize && (
                  <div className="mt-16 flex justify-center">
                    <button
                      onClick={handleLoadMore}
                      disabled={isLoading}
                      className="px-12 py-6 bg-gradient-to-r from-[#0f4c4c] to-[#1a6b6b] text-white font-bold rounded-2xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:transform-none disabled:hover:shadow-none flex items-center gap-4 text-lg"
                    >
                      {isLoading ? (
                        <>
                          <Loader size={24} className="animate-spin" />
                          Loading...
                        </>
                      ) : (
                        <>
                          Load More Articles n{" "}
                          <span className="bg-white/20 px-3 py-1 rounded-full text-sm">
                            {Math.max(0, filteredArticles.length - pageSize)}
                          </span>
                        </>
                      )}
                    </button>
                  </div>
                )}
              </>
            )}
          </div>

          {/* Sidebar */}
          <aside className="space-y-8">
            <TrendingTags
              tags={tags.slice(1, 8)}
              activeTag={activeTag}
              onSelect={setActiveTag}
            />
            <SavedArticles />
            <Newsletter />
          </aside>
        </div>
      </div>
    </div>
  );
}

/* ---------- Route default export (fix) ---------- */

// Keep the client behavior for this page — default-export a Page component that renders the NewsFeed.
export default function Page() {
  return <NewsFeed />;
}
