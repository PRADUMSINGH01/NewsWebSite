"use client";

import React, { useMemo, useState } from "react";
import { Search, Clock, Eye, TrendingUp, Mail, BookOpen } from "lucide-react";

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
  avatar: string;
  featured: boolean;
  readMinutes: number;
  views: number;
  trending: boolean;
};

type NewsFeedProps = {
  articles?: Article[];
};

/* ------------------- SAMPLE DATA ------------------- */

const SAMPLE_ARTICLES: Article[] = [
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
    tag: "स्वास्थ्य",
    title: "डाइट मिथ्स: क्या सच है क्या मिथक?",
    excerpt:
      "पोषण विशेषज्ञ बताते हैं कि रोजमर्रा की गलतफहमियाँ कैसे आपके लक्ष्य रोक सकती हैं।",
    author: "डॉ. मीरा",
    time: "5 दिन पहले",
    publishedAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
    img: "https://images.unsplash.com/photo-1549576490-b0b4831ef60a?auto=format&fit=crop&w=600&h=400&q=80",
    avatar: "https://i.pravatar.cc/96?img=8",
    featured: false,
    readMinutes: 3,
    views: 720,
    trending: false,
  },
  {
    id: 6,
    tag: "मनोरंजन",
    title: "नया फिल्मी ट्रेलर हुआ रिलीज़: समीक्षा",
    excerpt:
      "ट्रेलर में दिखी कहानी और प्रदर्शन ने दर्शकों की जिज्ञासा बढ़ा दी है।",
    author: "रेखा कपूर",
    time: "12 घंटे पहले",
    publishedAt: new Date(Date.now() - 12 * 60 * 60 * 1000).toISOString(),
    img: "https://images.unsplash.com/photo-1511659009414-79f6a2f6b1a8?auto=format&fit=crop&w=600&h=400&q=80",
    avatar: "https://i.pravatar.cc/96?img=3",
    featured: false,
    readMinutes: 4,
    views: 5400,
    trending: true,
  },
];

/* ------------------- Simple Components ------------------- */

function ArticleCard({ article }: { article: Article }) {
  return (
    <article className="bg-white rounded-lg border border-gray-200 hover:shadow-md transition-all duration-300">
      <div className="flex flex-col h-full">
        <div className="relative h-48 overflow-hidden">
          <img
            src={article.img}
            alt={article.title}
            className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
          />
          <div className="absolute top-3 left-3">
            <span className="bg-red-600 text-white px-3 py-1 rounded text-sm font-medium">
              {article.tag}
            </span>
          </div>
          {article.trending && (
            <div className="absolute top-3 right-3 bg-white p-1 rounded-full shadow-sm">
              <TrendingUp size={16} className="text-red-600" />
            </div>
          )}
        </div>

        <div className="p-5 flex-1 flex flex-col">
          <h3 className="font-bold text-lg text-gray-900 mb-3 leading-tight">
            {article.title}
          </h3>
          <p className="text-gray-600 text-sm mb-4 line-clamp-2 flex-1">
            {article.excerpt}
          </p>

          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <img
                src={article.avatar}
                alt={article.author}
                className="w-6 h-6 rounded-full object-cover"
              />
              <span className="text-sm text-gray-700">{article.author}</span>
            </div>
            <div className="flex items-center gap-3 text-xs text-gray-500">
              <div className="flex items-center gap-1">
                <Clock size={12} />
                {article.time}
              </div>
              <div className="flex items-center gap-1">
                <Eye size={12} />
                {article.views.toLocaleString()}
              </div>
            </div>
          </div>

          <button className="w-full bg-gray-900 text-white py-2 rounded-lg hover:bg-red-700 transition-colors duration-200 font-medium flex items-center justify-center gap-2">
            <BookOpen size={16} />
            पूरा पढ़ें ({article.readMinutes} मिनट)
          </button>
        </div>
      </div>
    </article>
  );
}

function FeaturedArticle({ article }: { article: Article }) {
  return (
    <article className="bg-white rounded-lg border border-gray-200 overflow-hidden mb-8">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="relative h-64 lg:h-80">
          <img
            src={article.img}
            alt={article.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute top-4 left-4">
            <span className="bg-red-600 text-white px-4 py-2 rounded-lg text-sm font-medium">
              {article.tag}
            </span>
          </div>
        </div>

        <div className="p-6 flex flex-col">
          <div className="flex-1">
            <span className="bg-orange-100 text-orange-800 px-3 py-1 rounded text-sm font-medium mb-4 inline-block">
              मुख्य खबर
            </span>
            <h2 className="text-2xl font-bold text-gray-900 mb-4 leading-tight">
              {article.title}
            </h2>
            <p className="text-gray-700 mb-6 leading-relaxed text-lg">
              {article.excerpt}
            </p>
          </div>

          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <img
                src={article.avatar}
                alt={article.author}
                className="w-10 h-10 rounded-full object-cover border-2 border-gray-100"
              />
              <div>
                <div className="text-sm font-semibold text-gray-900">
                  {article.author}
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Clock size={14} />
                  {article.time} • {article.readMinutes} मिनट
                </div>
              </div>
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <Eye size={16} />
              {article.views.toLocaleString()}
            </div>
          </div>

          <button className="w-full bg-gray-900 text-white py-3 rounded-lg hover:bg-red-700 transition-colors duration-200 font-medium text-lg flex items-center justify-center gap-2">
            <BookOpen size={20} />
            पूरी खबर पढ़ें
          </button>
        </div>
      </div>
    </article>
  );
}

function CategoryFilter({
  categories,
  activeCategory,
  onSelect,
}: {
  categories: string[];
  activeCategory: string;
  onSelect: (category: string) => void;
}) {
  return (
    <div className="flex overflow-x-auto gap-2 py-4 mb-6 scrollbar-hide">
      {categories.map((category) => (
        <button
          key={category}
          onClick={() => onSelect(category)}
          className={`px-4 py-2 rounded-lg whitespace-nowrap transition-colors duration-200 ${
            category === activeCategory
              ? "bg-red-600 text-white shadow-sm"
              : "bg-gray-100 text-gray-700 hover:bg-gray-200"
          }`}
        >
          {category}
        </button>
      ))}
    </div>
  );
}

function Newsletter() {
  const [email, setEmail] = useState("");

  const subscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    alert("धन्यवाद! आप सब्सक्राइब हो चुके हैं।");
    setEmail("");
  };

  return (
    <div className="bg-gray-50 rounded-lg p-6 border border-gray-200 mt-12">
      <div className="flex items-center gap-2 mb-3">
        <Mail size={20} className="text-red-600" />
        <h3 className="font-bold text-lg text-gray-900">
          न्यूज़लेटर सब्सक्राइब करें
        </h3>
      </div>
      <p className="text-gray-600 mb-4">
        दिन की शीर्ष कहानियां अपने इनबॉक्स में प्राप्त करें।
      </p>
      <form onSubmit={subscribe} className="flex gap-2">
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="आपका ईमेल पता"
          className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500"
          required
        />
        <button
          type="submit"
          className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors duration-200 font-medium"
        >
          सब्सक्राइब
        </button>
      </form>
    </div>
  );
}

/* ------------------- Main Component ------------------- */

function HindiNewsPage({ articles = SAMPLE_ARTICLES }: NewsFeedProps) {
  const [query, setQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("सभी");

  const categories = useMemo(() => {
    const categorySet = new Set<string>();
    articles.forEach((article) => article.tag && categorySet.add(article.tag));
    return ["सभी", ...Array.from(categorySet)];
  }, [articles]);

  const filteredArticles = useMemo(() => {
    const queryLower = query.trim().toLowerCase();
    const filtered = articles.filter((article) => {
      const matchesCategory =
        activeCategory === "सभी" || article.tag === activeCategory;
      const matchesQuery =
        !queryLower ||
        article.title.toLowerCase().includes(queryLower) ||
        article.excerpt.toLowerCase().includes(queryLower) ||
        article.author.toLowerCase().includes(queryLower);
      return matchesCategory && matchesQuery;
    });

    return filtered.sort(
      (a, b) =>
        new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
    );
  }, [articles, query, activeCategory]);

  const featuredArticle = filteredArticles.find((article) => article.featured);
  const regularArticles = featuredArticle
    ? filteredArticles.filter((article) => !article.featured)
    : filteredArticles;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Simple Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6">
          <div className="text-center"></div>
        </div>
      </div>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        {/* Search Bar */}
        <div className="mb-8">
          <div className="relative max-w-2xl mx-auto">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="खबरें खोजें..."
              className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500 text-lg"
            />
          </div>
        </div>

        {/* Live Indicator */}
        <div className="flex items-center justify-center mb-6">
          <div className="flex items-center gap-2 bg-red-50 px-4 py-2 rounded-full border border-red-200">
            <div className="w-2 h-2 bg-red-600 rounded-full animate-pulse" />
            <span className="text-sm font-medium text-red-700">लाइव अपडेट</span>
          </div>
        </div>

        {/* Category Filter */}
        <CategoryFilter
          categories={categories}
          activeCategory={activeCategory}
          onSelect={setActiveCategory}
        />

        {/* Results Info */}
        <div className="mb-6">
          <p className="text-gray-600">
            <span className="font-semibold text-red-600">
              {filteredArticles.length}
            </span>{" "}
            लेख मिले
            {query && (
              <span>
                {" "}
                "<span className="font-medium">{query}</span>" के लिए
              </span>
            )}
            {activeCategory !== "सभी" && (
              <span>
                {" "}
                श्रेणी: <span className="font-medium">{activeCategory}</span>
              </span>
            )}
          </p>
        </div>

        {/* Featured Article */}
        {featuredArticle && <FeaturedArticle article={featuredArticle} />}

        {/* Articles Grid */}
        {filteredArticles.length === 0 ? (
          <div className="text-center py-12">
            <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-4">
              <Search size={24} className="text-gray-400" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">
              कोई लेख नहीं मिला
            </h3>
            <p className="text-gray-600 mb-4">
              {query
                ? `"${query}" के लिए कोई परिणाम नहीं मिले। कृपया अलग कीवर्ड आज़माएं।`
                : "कृपया अलग श्रेणी चुनें।"}
            </p>
            <button
              onClick={() => {
                setQuery("");
                setActiveCategory("सभी");
              }}
              className="bg-red-600 text-white px-6 py-2 rounded-lg hover:bg-red-700 transition-colors duration-200 font-medium"
            >
              सभी लेख देखें
            </button>
          </div>
        ) : (
          <>
            {/* Regular Articles */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {regularArticles.map((article) => (
                <ArticleCard key={article.id} article={article} />
              ))}
            </div>

            {/* Load More */}
            {filteredArticles.length > 6 && (
              <div className="text-center mt-12">
                <button className="bg-white text-red-600 px-8 py-3 rounded-lg border border-red-600 hover:bg-red-50 transition-colors duration-200 font-medium">
                  और लेख देखें
                </button>
              </div>
            )}
          </>
        )}

        {/* Newsletter */}
        <Newsletter />
      </main>

      {/* Simple Footer */}
    </div>
  );
}

export default function Page() {
  return <HindiNewsPage />;
}
