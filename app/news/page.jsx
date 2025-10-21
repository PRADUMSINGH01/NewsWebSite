"use client";

import React, { useMemo, useState, useEffect, useCallback, useRef } from "react";
import {
  Search,
  Filter,
  Calendar,
  Clock,
  Bookmark,
  Share2,
  Grid,
  List,
  Star,
  User,
  Mail,
  Loader,
  Eye,
  Heart,
  TrendingUp,
  ArrowRight,
  Check,
  Image as ImageIcon,
} from "lucide-react";

/* ------------------- Enhanced SAMPLE DATA ------------------- */
const SAMPLE_ARTICLES = [
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
    tag: "मनोरंजन",
    title: "सिनेमा का भविष्य: ओटीटी प्लेटफॉर्म्स और बड़े पर्दे की जंग",
    excerpt:
      "क्या डिजिटल रिलीज फिल्मों के बॉक्स ऑफिस कलेक्शन को प्रभावित कर रही हैं? जानिए विशेषज्ञों की राय और उद्योग के नए ट्रेंड्स के बारे में।",
    author: "प्रिया मेहरा",
    time: "5 घंटे पहले",
    publishedAt: new Date(Date.now() - 5 * 60 * 60 * 1000).toISOString(),
    img: "https://images.unsplash.com/photo-1594909122845-11baa439b7bf?auto=format&fit=crop&w=1600&h=900&q=80",
    credit: "Unsplash / A. B.",
    avatar: "https://i.pravatar.cc/96?img=2",
    featured: false,
    readMinutes: 6,
    likes: 89,
    shares: 15,
    views: 890,
    trending: false,
  },
  {
    id: 3,
    tag: "खेल",
    title: "विश्व कप फाइनल: भारत की शानदार जीत, देशभर में जश्न का माहौल",
    excerpt:
      "आखिरी ओवर के रोमांच में टीम इंडिया ने दिखाया दम, कप्तान के शतक ने दिलाई ऐतिहासिक जीत। यह जीत क्रिकेट इतिहास में स्वर्णिम अक्षरों में दर्ज हो गई है।",
    author: "विक्रम सिंह",
    time: "8 घंटे पहले",
    publishedAt: new Date(Date.now() - 8 * 60 * 60 * 1000).toISOString(),
    img: "https://images.unsplash.com/photo-1599586120429-48281b6f0ece?auto=format&fit=crop&w=1600&h=900&q=80",
    credit: "Unsplash / S. M.",
    avatar: "https://i.pravatar.cc/96?img=3",
    featured: false,
    readMinutes: 5,
    likes: 256,
    shares: 42,
    views: 2100,
    trending: true,
  },
  {
    id: 4,
    tag: "टेक",
    title:
      "आर्टिफिशियल इंटेलिजेंस: क्या यह नौकरियां खत्म कर देगा या नए अवसर पैदा करेगा?",
    excerpt:
      "एआई के बढ़ते प्रभाव से उद्योग जगत में बड़े बदलाव की उम्मीद है, जानिए आपके करियर पर क्या होगा असर और कैसे तैयारी करें भविष्य के लिए।",
    author: "अंजलि गुप्ता",
    time: "1 दिन पहले",
    publishedAt: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
    img: "https://images.unsplash.com/photo-1550745165-9bc0b252726a?auto=format&fit=crop&w=1600&h=900&q=80",
    credit: "Unsplash / L. R.",
    avatar: "https://i.pravatar.cc/96?img=4",
    featured: false,
    readMinutes: 7,
    likes: 178,
    shares: 31,
    views: 1560,
    trending: false,
  },
  {
    id: 5,
    tag: "स्वास्थ्य",
    title: "योग और मेडिटेशन: आधुनिक जीवनशैली में मानसिक स्वास्थ्य का महत्व",
    excerpt:
      "विशेषज्ञ बता रहे हैं कि कैसे नियमित योग और ध्यान तनाव कम करने में मददगार साबित हो सकता है। नई शोध के नतीजे चौंकाने वाले हैं।",
    author: "डॉ. सुमन शर्मा",
    time: "1 दिन पहले",
    publishedAt: new Date(Date.now() - 26 * 60 * 60 * 1000).toISOString(),
    img: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&w=1600&h=900&q=80",
    credit: "Unsplash / Y. P.",
    avatar: "https://i.pravatar.cc/96?img=5",
    featured: true,
    readMinutes: 5,
    likes: 203,
    shares: 37,
    views: 1890,
    trending: true,
  },
  {
    id: 6,
    tag: "शिक्षा",
    title: "नई शिक्षा नीति: भारतीय शिक्षा प्रणाली में बदलाव के मायने",
    excerpt:
      "नई शिक्षा नीति 2023 के तहत होने वाले बदलावों का विश्लेषण और इससे छात्रों के भविष्य पर क्या प्रभाव पड़ेगा, जानिए पूरी जानकारी।",
    author: "डॉ. राजीव मिश्रा",
    time: "2 दिन पहले",
    publishedAt: new Date(Date.now() - 48 * 60 * 60 * 1000).toISOString(),
    img: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&w=1600&h=900&q=80",
    credit: "Unsplash / E. S.",
    avatar: "https://i.pravatar.cc/96?img=6",
    featured: false,
    readMinutes: 8,
    likes: 167,
    shares: 29,
    views: 1430,
    trending: false,
  },
];

/* ------------------- Enhanced Utility Functions ------------------- */
function formatRelative(dateISO) {
  try {
    const d = new Date(dateISO);
    const diff = Date.now() - d.getTime();
    const mins = Math.floor(diff / (60 * 1000));
    if (mins < 1) return "अभी अभी";
    if (mins < 60) return `${mins} मिनट पहले`;
    const hrs = Math.floor(mins / 60);
    if (hrs < 24) return `${hrs} घंटे पहले`;
    const days = Math.floor(hrs / 24);
    return `${days} दिन पहले`;
  } catch {
    return "";
  }
}

function formatNumber(num) {
  if (num >= 1000000) {
    return (num / 1000000).toFixed(1) + 'M';
  }
  if (num >= 1000) {
    return (num / 1000).toFixed(1) + 'K';
  }
  return num.toString();
}

/* ------------------- Enhanced Custom Hooks ------------------- */
function useSavedArticles() {
  const [saved, setSaved] = useState(new Set());

  useEffect(() => {
    const raw = localStorage.getItem("news_saved");
    if (raw) {
      try {
        const arr = JSON.parse(raw);
        setSaved(new Set(arr));
      } catch (error) {
        console.error("Error loading saved articles:", error);
      }
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("news_saved", JSON.stringify(Array.from(saved)));
  }, [saved]);

  const toggleSave = useCallback((id) => {
    setSaved((prev) => {
      const newSaved = new Set(prev);
      if (newSaved.has(id)) {
        newSaved.delete(id);
      } else {
        newSaved.add(id);
      }
      return newSaved;
    });
  }, []);

  return { saved, toggleSave };
}

function useImageLoader(src) {
  const [status, setStatus] = useState('loading');
  const [loadedSrc, setLoadedSrc] = useState(null);

  useEffect(() => {
    if (!src) {
      setStatus('error');
      return;
    }

    setStatus('loading');
    setLoadedSrc(null);

    const img = new Image();
    img.src = src;

    const handleLoad = () => {
      setStatus('loaded');
      setLoadedSrc(src);
    };

    const handleError = () => {
      setStatus('error');
    };

    img.addEventListener('load', handleLoad);
    img.addEventListener('error', handleError);

    return () => {
      img.removeEventListener('load', handleLoad);
      img.removeEventListener('error', handleError);
    };
  }, [src]);

  return { status, loadedSrc };
}

/* ------------------- Enhanced Image Component ------------------- */
const ProgressiveImage = React.memo(({ 
  src, 
  alt, 
  className = "", 
  containerClassName = "",
  fallback = <div className="w-full h-full bg-gradient-to-br from-gray-200 to-gray-300 flex items-center justify-center">
    <ImageIcon className="w-8 h-8 text-gray-400" />
  </div>
}) => {
  const { status, loadedSrc } = useImageLoader(src);

  return (
    <div className={`relative overflow-hidden ${containerClassName}`}>
      {status === 'loading' && (
        <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-gray-100 to-gray-200">
          <div className="flex flex-col items-center gap-2">
            <Loader className="w-6 h-6 text-gray-400 animate-spin" />
            <span className="text-xs text-gray-500">Loading...</span>
          </div>
        </div>
      )}
      
      {status === 'error' && (
        <div className="absolute inset-0">
          {fallback}
        </div>
      )}
      
      {status === 'loaded' && loadedSrc && (
        <img
          src={loadedSrc}
          alt={alt}
          className={`w-full h-full object-cover transition-opacity duration-500 ${className}`}
          loading="lazy"
          onError={(e) => {
            e.target.style.display = 'none';
          }}
        />
      )}
    </div>
  );
});

ProgressiveImage.displayName = 'ProgressiveImage';

/* ------------------- Enhanced ArticleCard Component ------------------- */
const ArticleCard = React.memo(({ article, view = "grid", onToggleSave, isSaved }) => {
  const [isSharing, setIsSharing] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const cardRef = useRef(null);

  const handleShare = async () => {
    setIsSharing(true);
    try {
      if (navigator.share) {
        await navigator.share({
          title: article.title,
          text: article.excerpt,
          url: window.location.href,
        });
      } else {
        await navigator.clipboard.writeText(window.location.href);
        // In real app, use a toast notification
        alert("लिंक क्लिपबोर्ड में कॉपी हो गया");
      }
    } catch (error) {
      console.error("Error sharing:", error);
    } finally {
      setIsSharing(false);
    }
  };

  const handleLike = () => {
    setIsLiked(!isLiked);
  };

  return (
    <article
      ref={cardRef}
      className={`group bg-white rounded-2xl overflow-hidden shadow-lg border border-gray-100 hover:shadow-2xl transition-all duration-500 hover:translate-y-[-4px] ${
        view === "list" ? "md:flex md:gap-6" : ""
      } ${article.trending ? 'ring-2 ring-yellow-400' : ''}`}
      aria-labelledby={`title-${article.id}`}
    >
      <div className={`${view === "list" ? "md:w-2/5" : ""} relative overflow-hidden`}>
        <ProgressiveImage
          src={article.img}
          alt={article.title}
          className="group-hover:scale-105 transition-transform duration-700"
          containerClassName="aspect-[16/10]"
        />
        
        <div className="absolute top-4 left-4 flex flex-wrap gap-2">
          <span className="bg-gradient-to-r from-[#0f4c4c] to-[#1a6b6b] text-white text-xs px-3 py-2 rounded-full font-semibold uppercase tracking-wide shadow-lg backdrop-blur-sm">
            {article.tag}
          </span>
          
          {article.featured && (
            <span className="bg-gradient-to-r from-yellow-400 to-yellow-500 text-black text-xs px-3 py-2 rounded-full font-semibold flex items-center gap-1 shadow-lg backdrop-blur-sm">
              <Star size={12} className="fill-current" /> FEATURED
            </span>
          )}
          
          {article.trending && (
            <span className="bg-gradient-to-r from-red-500 to-pink-500 text-white text-xs px-3 py-2 rounded-full font-semibold flex items-center gap-1 shadow-lg backdrop-blur-sm">
              <TrendingUp size={12} /> TRENDING
            </span>
          )}
        </div>

        {/* Overlay gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
      </div>

      <div className="p-6 flex-1 flex flex-col">
        <div className="flex-1">
          <h3
            id={`title-${article.id}`}
            className="font-bold text-xl leading-tight text-gray-900 group-hover:text-[#0f4c4c] transition-colors duration-300 line-clamp-2 mb-3"
          >
            {article.title}
          </h3>

          <p className="text-gray-700 leading-relaxed line-clamp-3 mb-4">
            {article.excerpt}
          </p>

          <div className="flex items-center gap-4 text-sm text-gray-600 mb-4">
            <div className="flex items-center gap-3">
              <div className="relative">
                <ProgressiveImage
                  src={article.avatar}
                  alt={article.author}
                  containerClassName="w-10 h-10 rounded-full"
                  fallback={
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-100 to-blue-200 flex items-center justify-center">
                      <User size={16} className="text-blue-600" />
                    </div>
                  }
                />
              </div>
              <div>
                <div className="font-semibold text-gray-800">
                  {article.author}
                </div>
                <div className="text-xs text-gray-500 flex items-center gap-1">
                  <Calendar size={12} /> 
                  {formatRelative(article.publishedAt)}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-100 pt-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4 text-sm text-gray-500">
              <div className="flex items-center gap-1">
                <Clock size={14} />
                <span>{article.readMinutes} min</span>
              </div>
              
              <div className="flex items-center gap-4">
                <button 
                  onClick={handleLike}
                  className={`flex items-center gap-1 transition-colors duration-200 ${
                    isLiked ? 'text-red-500' : 'hover:text-red-500'
                  }`}
                >
                  <Heart size={14} className={isLiked ? 'fill-current' : ''} />
                  <span>{formatNumber(article.likes + (isLiked ? 1 : 0))}</span>
                </button>
                
                <div className="flex items-center gap-1">
                  <Eye size={14} />
                  <span>{formatNumber(article.views)}</span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                aria-label={isSharing ? "Sharing..." : "Share article"}
                disabled={isSharing}
                className="p-2 rounded-xl hover:bg-gray-50 transition-all duration-200 disabled:opacity-50 group/share hover:scale-110"
                onClick={handleShare}
              >
                {isSharing ? (
                  <Loader size={16} className="animate-spin" />
                ) : (
                  <Share2 size={16} className="group-hover/share:text-[#0f4c4c]" />
                )}
              </button>

              <button
                aria-label={isSaved ? "Remove from saved" : "Save article"}
                className={`p-2 rounded-xl transition-all duration-300 group/save hover:scale-110 ${
                  isSaved 
                    ? "text-yellow-500 bg-yellow-50" 
                    : "hover:bg-gray-50 hover:text-yellow-500"
                }`}
                onClick={() => onToggleSave?.(article.id)}
              >
                <Bookmark 
                  size={16} 
                  className={isSaved ? "fill-current" : ""} 
                />
              </button>
            </div>
          </div>
          
          <a
            href={`/article/${article.id}`}
            className="mt-4 w-full flex items-center justify-center gap-2 py-3 px-4 bg-gradient-to-r from-[#0f4c4c] to-[#1a6b6b] text-white font-semibold rounded-xl hover:shadow-lg transition-all duration-300 group/readmore hover:gap-3"
          >
            <span>पूरा पढ़ें</span>
            <ArrowRight size={16} className="group-hover/readmore:translate-x-1 transition-transform" />
          </a>
        </div>
      </div>
    </article>
  );
});

ArticleCard.displayName = 'ArticleCard';

/* ------------------- Enhanced FeaturedArticle Component ------------------- */
const FeaturedArticle = React.memo(({ article, onToggleSave, isSaved }) => {
  const [isLiked, setIsLiked] = useState(false);

  return (
    <article className="relative bg-white rounded-3xl overflow-hidden shadow-2xl border border-gray-200 group">
      <div className="relative h-[500px] bg-gradient-to-br from-gray-900 to-gray-800">
        <ProgressiveImage
          src={article.img}
          alt={article.title}
          containerClassName="w-full h-full"
        />
        
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent"></div>
        
        <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
          <div className="flex items-center gap-3 mb-4 flex-wrap">
            <span className="bg-yellow-400 text-black px-4 py-2 rounded-full text-sm font-semibold flex items-center gap-2 shadow-lg">
              <Star size={16} className="fill-current" /> FEATURED STORY
            </span>
            <span className="bg-white/20 backdrop-blur-sm text-white px-4 py-2 rounded-full text-sm font-semibold border border-white/30">
              {article.tag}
            </span>
            {article.trending && (
              <span className="bg-red-500 text-white px-4 py-2 rounded-full text-sm font-semibold flex items-center gap-2 shadow-lg">
                <TrendingUp size={16} /> TRENDING
              </span>
            )}
          </div>
          
          <h2 className="text-4xl lg:text-5xl font-bold mb-6 leading-tight max-w-4xl">
            {article.title}
          </h2>
          
          <p className="text-xl text-gray-200 mb-8 leading-relaxed max-w-3xl">
            {article.excerpt}
          </p>
          
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
            <div className="flex items-center gap-6">
              <div className="flex items-center gap-4">
                <ProgressiveImage
                  src={article.avatar}
                  alt={article.author}
                  containerClassName="w-14 h-14 rounded-full ring-4 ring-white/50"
                  fallback={
                    <div className="w-14 h-14 rounded-full bg-gradient-to-br from-blue-200 to-blue-300 flex items-center justify-center ring-4 ring-white/50">
                      <User size={20} className="text-blue-700" />
                    </div>
                  }
                />
                <div>
                  <div className="font-bold text-lg">{article.author}</div>
                  <div className="text-gray-300">{article.credit}</div>
                </div>
              </div>
              
              <div className="flex items-center gap-6 text-gray-300">
                <div className="flex items-center gap-2">
                  <Calendar size={16} />
                  <span>{formatRelative(article.publishedAt)}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock size={16} />
                  <span>{article.readMinutes} min read</span>
                </div>
                <button 
                  onClick={() => setIsLiked(!isLiked)}
                  className={`flex items-center gap-2 transition-colors ${
                    isLiked ? 'text-red-400' : 'hover:text-red-400'
                  }`}
                >
                  <Heart size={16} className={isLiked ? 'fill-current' : ''} />
                  <span>{formatNumber(article.likes + (isLiked ? 1 : 0))}</span>
                </button>
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              <button
                className="px-8 py-4 bg-white text-gray-900 font-bold rounded-xl hover:bg-gray-100 transition-all duration-300 transform hover:scale-105 shadow-lg flex items-center gap-2"
              >
                Read Full Story
                <ArrowRight size={18} />
              </button>
              <button
                className="p-4 rounded-xl bg-white/10 backdrop-blur-sm hover:bg-white/20 border border-white/30 transition-all duration-300 transform hover:scale-110"
                onClick={() => onToggleSave?.(article.id)}
              >
                <Bookmark 
                  size={20} 
                  className={isSaved ? "fill-yellow-400 text-yellow-400" : "text-white"} 
                />
              </button>
            </div>
          </div>
        </div>
      </div>
    </article>
  );
});

FeaturedArticle.displayName = 'FeaturedArticle';

/* ------------------- Enhanced Sidebar Components ------------------- */
const TrendingTags = React.memo(({ tags, activeTag, onTagClick }) => (
  <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-lg">
    <h4 className="font-bold text-xl mb-6 text-gray-900 flex items-center gap-3">
      <TrendingUp size={20} className="text-[#0f4c4c]" />
      Trending Categories
    </h4>
    <div className="flex flex-wrap gap-3">
      {tags.slice(0, 12).map((tag) => (
        <button
          key={tag}
          onClick={() => onTagClick(tag)}
          className={`px-4 py-3 rounded-xl border-2 transition-all duration-300 text-sm font-semibold hover:scale-105 ${
            activeTag === tag
              ? "bg-gradient-to-r from-[#0f4c4c] to-[#1a6b6b] text-white border-transparent shadow-lg"
              : "bg-white text-gray-700 border-gray-200 hover:border-[#0f4c4c] hover:text-[#0f4c4c] hover:shadow-md"
          }`}
        >
          {tag}
        </button>
      ))}
    </div>
  </div>
));

TrendingTags.displayName = 'TrendingTags';

const SavedArticles = React.memo(({ saved, articles }) => (
  <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-lg">
    <h4 className="font-bold text-xl mb-6 text-gray-900 flex items-center gap-3">
      <Bookmark size={20} className="text-[#0f4c4c]" />
      Saved Articles
      <span className="bg-[#0f4c4c] text-white text-xs px-2 py-1 rounded-full">
        {saved.size}
      </span>
    </h4>
    {saved.size === 0 ? (
      <div className="text-center py-8">
        <Bookmark size={48} className="mx-auto text-gray-300 mb-4" />
        <div className="text-gray-500 mb-2">No saved articles yet</div>
        <div className="text-sm text-gray-400">Save articles to read later</div>
      </div>
    ) : (
      <div className="space-y-4">
        {Array.from(saved).slice(0, 5).map((id) => {
          const item = articles.find((a) => a.id === Number(id));
          if (!item) return null;
          return (
            <div key={id} className="flex items-center gap-4 p-4 rounded-xl hover:bg-gray-50 transition-all duration-200 group">
              <ProgressiveImage
                src={item.avatar}
                alt={item.author}
                containerClassName="w-12 h-12 rounded-full flex-shrink-0"
                fallback={
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-green-100 to-green-200 flex items-center justify-center">
                    <User size={16} className="text-green-600" />
                  </div>
                }
              />
              <div className="flex-1 min-w-0">
                <div className="font-semibold text-gray-900 text-sm line-clamp-2 leading-tight group-hover:text-[#0f4c4c] transition-colors">
                  {item.title}
                </div>
                <div className="text-xs text-gray-500 mt-1 flex items-center gap-2">
                  <Calendar size={12} />
                  {formatRelative(item.publishedAt)}
                </div>
              </div>
              <Check size={16} className="text-green-500 flex-shrink-0" />
            </div>
          );
        })}
      </div>
    )}
  </div>
));

SavedArticles.displayName = 'SavedArticles';

const Newsletter = React.memo(() => {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    setIsSubscribed(true);
    setEmail("");
    setIsSubmitting(false);
    
    // Reset after 3 seconds
    setTimeout(() => setIsSubscribed(false), 3000);
  };

  if (isSubscribed) {
    return (
      <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-2xl p-8 text-white text-center">
        <Check className="w-16 h-16 mx-auto mb-4" />
        <h4 className="font-bold text-2xl mb-2">Subscribed!</h4>
        <p className="text-green-100">
          Thank you for subscribing to our newsletter
        </p>
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-br from-[#0f4c4c] to-[#1a6b6b] rounded-2xl p-8 text-white relative overflow-hidden">
      <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-16 translate-x-16"></div>
      <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/5 rounded-full -translate-x-12 translate-y-12"></div>
      
      <div className="relative z-10">
        <div className="flex items-center gap-3 mb-4">
          <Mail size={24} />
          <h4 className="font-bold text-2xl">Stay Updated</h4>
        </div>
        <p className="text-white/90 mb-6 leading-relaxed text-lg">
          Get the latest news and insights delivered directly to your inbox. Weekly digest, free forever.
        </p>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email address"
            className="w-full px-6 py-4 rounded-2xl bg-white/10 backdrop-blur-sm border-2 border-white/20 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-white/50 focus:border-white/30 text-base transition-all duration-300"
            required
          />
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full px-6 py-4 bg-white text-[#0f4c4c] font-bold rounded-2xl hover:bg-gray-100 transition-all duration-300 disabled:opacity-50 flex items-center justify-center gap-3 text-lg hover:scale-105"
          >
            {isSubmitting ? (
              <>
                <Loader size={20} className="animate-spin" />
                Subscribing...
              </>
            ) : (
              <>
                Subscribe Now
                <ArrowRight size={20} />
              </>
            )}
          </button>
        </form>
        <p className="text-white/60 text-sm mt-4 text-center">
          No spam, unsubscribe at any time
        </p>
      </div>
    </div>
  );
});

Newsletter.displayName = 'Newsletter';

/* ------------------- Enhanced Main NewsFeed Component ------------------- */
export default function NewsFeed({
  articles = SAMPLE_ARTICLES,
  columns = { sm: 1, md: 2, lg: 2 },
}) {
  const [query, setQuery] = useState("");
  const [activeTag, setActiveTag] = useState("All");
  const [view, setView] = useState("grid");
  const [sort, setSort] = useState("latest");
  const [pageSize, setPageSize] = useState(6);
  const [isLoading, setIsLoading] = useState(false);
  const { saved, toggleSave } = useSavedArticles();

  const tags = useMemo(() => {
    const tagSet = new Set();
    articles.forEach((article) => article.tag && tagSet.add(article.tag));
    return ["All", ...Array.from(tagSet)];
  }, [articles]);

  const filteredArticles = useMemo(() => {
    const queryLower = query.trim().toLowerCase();
    let filtered = articles.filter((article) => {
      const matchesTag = activeTag === "All" || article.tag === activeTag;
      const matchesQuery = !queryLower || 
        article.title.toLowerCase().includes(queryLower) ||
        article.excerpt.toLowerCase().includes(queryLower) ||
        article.author.toLowerCase().includes(queryLower) ||
        article.tag.toLowerCase().includes(queryLower);
      return matchesTag && matchesQuery;
    });

    if (sort === "latest") {
      filtered.sort((a, b) => new Date(b.publishedAt) - new Date(a.publishedAt));
    } else {
      filtered.sort((a, b) => 
        (b.trending ? 2 : 0) + (b.featured ? 1 : 0) + b.views / 1000 - 
        ((a.trending ? 2 : 0) + (a.featured ? 1 : 0) + a.views / 1000)
      );
    }

    return filtered;
  }, [articles, query, activeTag, sort]);

  const visibleArticles = filteredArticles.slice(0, pageSize);
  const featuredArticle = visibleArticles.find(article => article.featured);
  const nonFeaturedArticles = featuredArticle 
    ? visibleArticles.filter(article => article.id !== featuredArticle.id)
    : visibleArticles;

  const gridClass = `grid gap-8 ${
    view === "grid" 
      ? `grid-cols-1 ${columns.sm ? `sm:grid-cols-${columns.sm}` : ''} ${columns.md ? `md:grid-cols-${columns.md}` : ''} ${columns.lg ? `lg:grid-cols-${columns.lg}` : ''}`
      : "flex flex-col"
  }`;

  const handleLoadMore = async () => {
    setIsLoading(true);
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    setPageSize(prev => prev + 6);
    setIsLoading(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50/30 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Enhanced Header Section */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-3 bg-white/80 backdrop-blur-sm border border-gray-200 rounded-2xl px-6 py-3 mb-6 shadow-lg">
            <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
            <span className="text-sm font-semibold text-gray-700">LIVE UPDATES</span>
          </div>
          <h1 className="text-5xl lg:text-7xl font-black text-gray-900 mb-6 leading-tight">
            Latest <span className="text-transparent bg-gradient-to-r from-[#0f4c4c] to-[#1a6b6b] bg-clip-text">News</span>
          </h1>
          <p className="text-xl lg:text-2xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Stay informed with real-time updates, breaking news, and in-depth analysis from trusted sources worldwide.
          </p>
        </div>

        {/* Enhanced Controls Section */}
        <div className="mb-12 bg-white/80 backdrop-blur-sm rounded-3xl p-8 shadow-xl border border-gray-200/50">
          <div className="flex flex-col xl:flex-row gap-6 items-start xl:items-center justify-between">
            <div className="flex flex-col lg:flex-row gap-6 w-full xl:w-auto">
              <div className="relative flex-1 max-w-xl">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-6 h-6" />
                <input
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
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
                    <option key={tag} value={tag}>{tag}</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="flex items-center gap-6 w-full xl:w-auto">
              <select
                value={sort}
                onChange={(e) => setSort(e.target.value)}
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

        {/* Enhanced Results Count */}
        <div className="mb-8 flex items-center justify-between">
          <div className="text-lg text-gray-600">
            Found <span className="font-bold text-[#0f4c4c]">{filteredArticles.length}</span> articles
            {query && <span> for "<span className="font-semibold">{query}</span>"</span>}
            {activeTag !== "All" && <span> in <span className="font-semibold">{activeTag}</span></span>}
          </div>
          <div className="flex items-center gap-4 text-sm text-gray-500">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-yellow-400 rounded-full"></div>
              <span>Featured</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-red-500 rounded-full"></div>
              <span>Trending</span>
            </div>
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 xl:grid-cols-4 gap-8">
          {/* Articles Section */}
          <div className="xl:col-span-3">
            {visibleArticles.length === 0 ? (
              <div className="bg-white rounded-3xl p-16 text-center border border-gray-200 shadow-xl">
                <div className="w-24 h-24 bg-gradient-to-br from-gray-100 to-gray-200 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Search size={40} className="text-gray-400" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">No articles found</h3>
                <p className="text-gray-600 max-w-md mx-auto text-lg mb-8">
                  {query ? `No results found for "${query}". Try different keywords or filters.` : 'Try adjusting your search criteria or browse all categories.'}
                </p>
                <button
                  onClick={() => { setQuery(''); setActiveTag('All'); }}
                  className="px-8 py-4 bg-gradient-to-r from-[#0f4c4c] to-[#1a6b6b] text-white font-bold rounded-2xl hover:shadow-xl transition-all duration-300 transform hover:scale-105"
                >
                  Browse All Articles
                </button>
              </div>
            ) : (
              <>
                {/* Featured Article */}
                {featuredArticle && (
                  <div className="mb-12">
                    <FeaturedArticle 
                      article={featuredArticle} 
                      onToggleSave={toggleSave}
                      isSaved={saved.has(featuredArticle.id)}
                    />
                  </div>
                )}

                {/* Articles Grid/List */}
                <div className={gridClass}>
                  {nonFeaturedArticles.map((article) => (
                    <ArticleCard
                      key={article.id}
                      article={article}
                      view={view}
                      onToggleSave={toggleSave}
                      isSaved={saved.has(article.id)}
                    />
                  ))}
                </div>

                {/* Enhanced Load More */}
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
                          Load More Articles
                          <span className="bg-white/20 px-3 py-1 rounded-full text-sm">
                            {filteredArticles.length - pageSize}
                          </span>
                        </>
                      )}
                    </button>
                  </div>
                )}
              </>
            )}
          </div>

          {/* Enhanced Sidebar */}
          <aside className="space-y-8">
            <TrendingTags 
              tags={tags} 
              activeTag={activeTag} 
              onTagClick={setActiveTag} 
            />
            
            <SavedArticles 
              saved={saved} 
              articles={articles} 
            />
            
            <Newsletter />
          </aside>
        </div>
      </div>
    </div>
  );
}