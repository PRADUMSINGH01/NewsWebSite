"use client";

import React, { useMemo, useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import {
  Search,
  Clock,
  Eye,
  TrendingUp,
  Mail,
  BookOpen,
  User,
  Calendar,
  Home,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

type Article = {
  id: number;
  tag: string;
  title: string;
  excerpt: string;
  author: string;
  time: string;
  publishedAt: string;
  img: string;
  avatar: string;
  featured: boolean;
  readMinutes: number;
  views: number;
  trending: boolean;
};

type NewsFeedProps = {
  articles?: Article[];
};

const PAGE_SIZE = 6; // Articles per page
const PAGINATION_RANGE = 3; // Number of page buttons to show around current page

const SAMPLE_ARTICLES: Article[] = [
  // ... (your existing SAMPLE_ARTICLES array remains the same)
  {
    id: 1,
    tag: "राजनीति",
    title: "संसद का मानसून सत्र: नए विधेयकों पर होगी गरमागरम बहस",
    excerpt:
      "सरकार इस सत्र में कई महत्वपूर्ण विधेयक पेश करने की तैयारी में है, विपक्ष ने भी अपनी रणनीति बना ली है।",
    author: "रवि प्रकाश",
    time: "2 घंटे पहले",
    publishedAt: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
    img: "https://images.unsplash.com/photo-1602339257297-2519247c9e9d?auto=format&fit=crop&w=600&h=400&q=80",
    avatar: "https://i.pravatar.cc/96?img=1",
    featured: true,
    readMinutes: 4,
    views: 1250,
    trending: true,
  },
  {
    id: 2,
    tag: "अर्थव्यवस्था",
    title: "बजट 2026: क्या बदलेंगे टैक्स नियम?",
    excerpt:
      "विशेषज्ञों का कहना है कि आगामी बजट में मध्यम वर्ग के लिए राहत संभव है।",
    author: "संगीता मेहता",
    time: "6 घंटे पहले",
    publishedAt: new Date(Date.now() - 6 * 60 * 60 * 1000).toISOString(),
    img: "https://images.unsplash.com/photo-1559526324-593bc073d938?auto=format&fit=crop&w=600&h=400&q=80",
    avatar: "https://i.pravatar.cc/96?img=5",
    featured: false,
    readMinutes: 5,
    views: 980,
    trending: false,
  },
  {
    id: 3,
    tag: "टेक्नोलॉजी",
    title: "नया स्मार्टफोन लॉन्च: क्या है खास?",
    excerpt:
      "बाजार में आया नया स्मार्टफोन शक्तिशाली कैमरा और लंबी बैटरी लाइफ के साथ।",
    author: "नीलू शर्मा",
    time: "1 दिन पहले",
    publishedAt: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
    img: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=600&h=400&q=80",
    avatar: "https://i.pravatar.cc/96?img=12",
    featured: false,
    readMinutes: 6,
    views: 4300,
    trending: true,
  },
  {
    id: 4,
    tag: "खेल",
    title: "क्रिकेट विश्व कप: रोमांचक मुकाबला होने की उम्मीद",
    excerpt:
      "टीमें फॉर्म में लौट आई हैं और दर्शकों को बेहतरीन मुकाबले देखने को मिल सकता है।",
    author: "अजय वर्मा",
    time: "3 दिन पहले",
    publishedAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
    img: "https://images.unsplash.com/photo-1521412644187-c49fa049e84d?auto=format&fit=crop&w=600&h=400&q=80",
    avatar: "https://i.pravatar.cc/96?img=20",
    featured: false,
    readMinutes: 7,
    views: 2100,
    trending: false,
  },
  {
    id: 5,
    tag: "राजनीति",
    title: "राज्य चुनाव: नई रणनीति पर चर्चा",
    excerpt: "आगामी राज्य चुनावों को लेकर सभी दल नई रणनीति बना रहे हैं।",
    author: "प्रकाश जोशी",
    time: "4 घंटे पहले",
    publishedAt: new Date(Date.now() - 4 * 60 * 60 * 1000).toISOString(),
    img: "https://images.unsplash.com/photo-1540910419892-4a36d2c3266c?auto=format&fit=crop&w=600&h=400&q=80",
    avatar: "https://i.pravatar.cc/96?img=7",
    featured: false,
    readMinutes: 5,
    views: 3200,
    trending: true,
  },
  {
    id: 6,
    tag: "अर्थव्यवस्था",
    title: "शेयर बाजार में तेजी, निवेशकों को मिला फायदा",
    excerpt:
      "वैश्विक बाजारों में सुधार के साथ घरेलू शेयर बाजार में तेजी देखने को मिली।",
    author: "अनिल कुमार",
    time: "8 घंटे पहले",
    publishedAt: new Date(Date.now() - 8 * 60 * 60 * 1000).toISOString(),
    img: "https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?auto=format&fit=crop&w=600&h=400&q=80",
    avatar: "https://i.pravatar.cc/96?img=9",
    featured: false,
    readMinutes: 4,
    views: 2800,
    trending: false,
  },
  {
    id: 7,
    tag: "टेक्नोलॉजी",
    title: "AI टेक्नोलॉजी में नया ब्रेकथ्रू",
    excerpt:
      "वैज्ञानिकों ने कृत्रिम बुद्धिमत्ता के क्षेत्र में नई सफलता हासिल की है।",
    author: "डॉ. स्मिता",
    time: "1 दिन पहले",
    publishedAt: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
    img: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&w=600&h=400&q=80",
    avatar: "https://i.pravatar.cc/96?img=15",
    featured: false,
    readMinutes: 6,
    views: 5100,
    trending: true,
  },
  {
    id: 8,
    tag: "खेल",
    title: "फुटबॉल लीग: नए सत्र की तैयारियां",
    excerpt: "नए सत्र के लिए सभी टीमें अपनी तैयारियों में जुट गई हैं।",
    author: "राहुल मेहता",
    time: "2 दिन पहले",
    publishedAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
    img: "https://images.unsplash.com/photo-1575361204480-aadea25e6e68?auto=format&fit=crop&w=600&h=400&q=80",
    avatar: "https://i.pravatar.cc/96?img=18",
    featured: false,
    readMinutes: 3,
    views: 1900,
    trending: false,
  },
];

const ArticleCard = ({ article }: { article: Article }) => {
  const router = useRouter();

  const handleReadMore = () => {
    // Navigate to article detail page or open modal
    router.push(`/article/${article.id}`);
  };

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

        <button
          onClick={handleReadMore}
          className="w-full mt-3 bg-blue-600 text-white py-2 rounded text-sm font-medium hover:bg-blue-700 transition-colors"
        >
          पूरा पढ़ें
        </button>
      </div>
    </article>
  );
};

const FeaturedArticle = ({ article }: { article: Article }) => {
  const router = useRouter();

  const handleReadMore = () => {
    router.push(`/article/${article.id}`);
  };

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
            <button
              onClick={handleReadMore}
              className="bg-gray-900 text-white px-4 py-2 rounded text-sm font-medium hover:bg-gray-800 transition-colors"
            >
              पढ़ें
            </button>
          </div>
        </div>
      </div>
    </article>
  );
};

const SearchBar = ({
  value,
  onChange,
}: {
  value: string;
  onChange: (value: string) => void;
}) => {
  return (
    <div className="relative mb-8">
      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="खबरें खोजें..."
        className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
      />
    </div>
  );
};

const CategoryFilter = ({
  categories,
  activeCategory,
}: {
  categories: string[];
  activeCategory: string;
}) => {
  const router = useRouter();
  const params = useParams();

  const handleCategoryClick = (category: string) => {
    if (category === "सभी") {
      router.push("/news/सभी");
    } else {
      // Use the current dynamic route structure
      router.push(`/news/${encodeURIComponent(category)}`);
    }
  };

  return (
    <div className="flex flex-wrap gap-2 mb-6">
      {categories.map((category) => (
        <button
          key={category}
          onClick={() => handleCategoryClick(category)}
          className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
            category === activeCategory
              ? "bg-blue-600 text-white"
              : "bg-gray-100 text-gray-700 hover:bg-gray-200"
          }`}
        >
          {category}
        </button>
      ))}
    </div>
  );
};

const Pagination = ({
  currentPage,
  totalPages,
  onPageChange,
}: {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}) => {
  if (totalPages <= 1) return null;

  const getPageNumbers = () => {
    const pages = [];
    const startPage = Math.max(1, currentPage - PAGINATION_RANGE);
    const endPage = Math.min(totalPages, currentPage + PAGINATION_RANGE);

    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }
    return pages;
  };

  const pageNumbers = getPageNumbers();

  return (
    <div className="flex items-center justify-center gap-2 mt-8">
      {/* Previous Button */}
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className={`flex items-center gap-1 px-3 py-2 rounded text-sm font-medium transition-colors ${
          currentPage === 1
            ? "text-gray-400 cursor-not-allowed"
            : "text-gray-700 hover:bg-gray-100"
        }`}
      >
        <ChevronLeft size={16} />
        पिछला
      </button>

      {/* First Page */}
      {currentPage > PAGINATION_RANGE + 1 && (
        <>
          <button
            onClick={() => onPageChange(1)}
            className="px-3 py-2 rounded text-sm font-medium text-gray-700 hover:bg-gray-100 transition-colors"
          >
            1
          </button>
          {currentPage > PAGINATION_RANGE + 2 && (
            <span className="px-2 text-gray-400">...</span>
          )}
        </>
      )}

      {/* Page Numbers */}
      {pageNumbers.map((page) => (
        <button
          key={page}
          onClick={() => onPageChange(page)}
          className={`px-3 py-2 rounded text-sm font-medium transition-colors ${
            page === currentPage
              ? "bg-blue-600 text-white"
              : "text-gray-700 hover:bg-gray-100"
          }`}
        >
          {page}
        </button>
      ))}

      {/* Last Page */}
      {currentPage < totalPages - PAGINATION_RANGE && (
        <>
          {currentPage < totalPages - PAGINATION_RANGE - 1 && (
            <span className="px-2 text-gray-400">...</span>
          )}
          <button
            onClick={() => onPageChange(totalPages)}
            className="px-3 py-2 rounded text-sm font-medium text-gray-700 hover:bg-gray-100 transition-colors"
          >
            {totalPages}
          </button>
        </>
      )}

      {/* Next Button */}
      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className={`flex items-center gap-1 px-3 py-2 rounded text-sm font-medium transition-colors ${
          currentPage === totalPages
            ? "text-gray-400 cursor-not-allowed"
            : "text-gray-700 hover:bg-gray-100"
        }`}
      >
        अगला
        <ChevronRight size={16} />
      </button>
    </div>
  );
};

const Newsletter = () => {
  const [email, setEmail] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      alert("धन्यवाद! आप सब्सक्राइब हो चुके हैं।");
      setEmail("");
    }
  };

  return (
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
      <form onSubmit={handleSubmit} className="flex gap-2">
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
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
  );
};

const Breadcrumb = ({ currentCategory }: { currentCategory: string }) => {
  const router = useRouter();

  return (
    <nav className="flex items-center gap-2 text-sm text-gray-600 mb-6">
      <button
        onClick={() => router.push("/news")}
        className="flex items-center gap-1 hover:text-blue-600 transition-colors"
      >
        <Home size={16} />
        होम
      </button>
      <span>/</span>
      <span className="text-gray-900 font-medium">{currentCategory}</span>
    </nav>
  );
};

// This is the main component that will be used for dynamic routes
export default function CategoryNewsPage({
  articles = SAMPLE_ARTICLES,
}: NewsFeedProps) {
  const params = useParams();
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  // Get category from URL parameter - this will be the dynamic [id]
  const categoryId = params.id as string;

  // Decode the category name from URL
  const currentCategory = categoryId ? decodeURIComponent(categoryId) : "सभी";

  const categories = useMemo(() => {
    const allCategories = articles.map((article) => article.tag);
    return ["सभी", ...Array.from(new Set(allCategories))];
  }, [articles]);

  const filteredArticles = useMemo(() => {
    let filtered = articles;

    // Filter by URL category if it exists and is not "सभी"
    if (categoryId && currentCategory !== "सभी") {
      filtered = filtered.filter((article) => article.tag === currentCategory);
    }

    // Filter by search query
    if (searchQuery) {
      filtered = filtered.filter(
        (article) =>
          article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          article.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
          article.author.toLowerCase().includes(searchQuery.toLowerCase()) ||
          article.tag.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    return filtered;
  }, [articles, categoryId, currentCategory, searchQuery]);

  // Reset to page 1 when filters/search/category change
  useEffect(() => {
    setCurrentPage(1);
  }, [categoryId, searchQuery, articles]);

  const featuredArticle = filteredArticles.find((article) => article.featured);
  const regularArticles = filteredArticles.filter(
    (article) => !article.featured
  );

  // Calculate pagination
  const totalPages = Math.ceil(regularArticles.length / PAGE_SIZE);
  const startIndex = (currentPage - 1) * PAGE_SIZE;
  const endIndex = startIndex + PAGE_SIZE;
  const paginatedRegularArticles = regularArticles.slice(startIndex, endIndex);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    // Scroll to top when page changes
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const displayedCount =
    (featuredArticle && currentPage === 1 ? 1 : 0) +
    paginatedRegularArticles.length;

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
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
        {/* Breadcrumb for category pages */}
        {currentCategory !== "सभी" && (
          <Breadcrumb currentCategory={currentCategory} />
        )}

        {/* Search */}
        <SearchBar value={searchQuery} onChange={setSearchQuery} />

        {/* Categories */}
        <CategoryFilter
          categories={categories}
          activeCategory={currentCategory}
        />

        {/* Results Info */}
        <div className="mb-6">
          <p className="text-gray-600 text-sm">
            पृष्ठ {currentPage} का {totalPages} - {displayedCount} दिखाए जा रहे
            / कुल {filteredArticles.length} लेख
            {searchQuery && ` — "${searchQuery}" के लिए`}
            {currentCategory !== "सभी" && ` — श्रेणी: ${currentCategory}`}
          </p>
        </div>

        {/* Featured Article - Only show on first page */}
        {featuredArticle && currentPage === 1 && (
          <FeaturedArticle article={featuredArticle} />
        )}

        {/* Articles Grid */}
        {filteredArticles.length === 0 ? (
          <div className="text-center py-12">
            <Search className="w-12 h-12 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              कोई लेख नहीं मिला
            </h3>
            <p className="text-gray-600 text-sm mb-4">
              {searchQuery
                ? `"${searchQuery}" के लिए कोई परिणाम नहीं मिले।`
                : "कृपया अलग श्रेणी चुनें।"}
            </p>
            <button
              onClick={() => {
                setSearchQuery("");
                router.push("/news");
              }}
              className="bg-blue-600 text-white px-4 py-2 rounded text-sm font-medium hover:bg-blue-700 transition-colors"
            >
              सभी खबरें देखें
            </button>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {paginatedRegularArticles.map((article) => (
                <ArticleCard key={article.id} article={article} />
              ))}
            </div>

            {/* Pagination */}
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={handlePageChange}
            />
          </>
        )}

        {/* Newsletter */}
        <Newsletter />
      </main>

      {/* Footer */}
      <footer className="border-t border-gray-200 mt-12">
        <div className="max-w-6xl mx-auto px-4 py-6">
          <div className="text-center text-gray-600 text-sm">
            <p>© 2024 समाचार. सभी अधिकार सुरक्षित।</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
