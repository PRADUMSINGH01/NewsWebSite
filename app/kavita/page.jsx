"use client";
import ProfessionalLoader from "@/components/Loading";
import React, { useState, useEffect } from "react";
import { fetchCollection } from "@/components/server/fetchnews";
import BackButton from "@/components/BackButton";
import {
  Search,
  BookOpen,
  User,
  Calendar,
  Share2,
  Twitter,
  MessageCircle,
  Heart,
  Image as ImageIcon,
} from "lucide-react";

// श्रेणियाँ
const CATEGORIES = ["सभी", "प्रेम", "प्रकृति", "शोक", "प्रेरणा", "जीवन"];

// फ्लोटिंग शेप्स कम्पोनेंट
function FloatingShapes() {
  return (
    <>
      <BackButton />
      <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-32 h-32 sm:w-48 sm:h-48 md:w-64 md:h-64 bg-gradient-to-br from-blue-100 to-blue-50 rounded-full opacity-60 animate-float-slow"></div>
        <div className="absolute top-1/3 right-1/4 w-24 h-24 sm:w-36 sm:h-36 md:w-48 md:h-48 bg-gradient-to-br from-green-100 to-green-50 rounded-full opacity-40 animate-float-medium"></div>
        <div className="absolute bottom-1/4 left-1/3 w-20 h-20 sm:w-28 sm:h-28 md:w-32 md:h-32 bg-gradient-to-br from-amber-100 to-amber-50 rounded-full opacity-50 animate-float-fast"></div>
        <div className="absolute top-1/2 right-1/3 w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 opacity-30">
          <div className="grid grid-cols-3 gap-1 sm:gap-2">
            {[...Array(9)].map((_, i) => (
              <div
                key={i}
                className="w-1 h-1 sm:w-1.5 sm:h-1.5 md:w-2 md:h-2 bg-gray-400 rounded-full animate-pulse"
                style={{ animationDelay: `${i * 0.2}s` }}
              />
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

// पोएम कार्ड कम्पोनेंट
function PoemCard({ poem }) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const [showShareMenu, setShowShareMenu] = useState(false);
  const [imageError, setImageError] = useState(false);

  // Map Firestore data to component expected structure
  const poemData = {
    id: poem.id || poem.slug,
    title: poem.title,
    poet: poem.poet,
    avatar: poem.avatar,
    // Use createdAt timestamp to get year
    year: poem.createdAt
      ? new Date(poem.createdAt.seconds * 1000).getFullYear()
      : "Unknown",
    // Use first tag as category or default to "जीवन"
    category: poem.tags && poem.tags.length > 0 ? poem.tags[0] : "जीवन",
    // Use text as content
    content: poem.text || "",
    // Default likes to 0 since it's not in Firestore
    likes: poem.likes || 0,
  };

  const contentToShow = isExpanded
    ? poemData.content
    : poemData.content.split("\n").slice(0, 2).join("\n");

  const handleShare = (platform) => {
    const text = `${poemData.title} - ${
      poemData.poet
    }\n\n${poemData.content.substring(0, 100)}...`;
    const url = window.location.href;

    const shareUrls = {
      twitter: `https://twitter.com/intent/tweet?text=${encodeURIComponent(
        text + "\n\n" + url
      )}`,
      whatsapp: `https://wa.me/?text=${encodeURIComponent(text + "\n" + url)}`,
    };

    window.open(shareUrls[platform], "_blank");
    setShowShareMenu(false);
  };

  const handleImageError = () => {
    setImageError(true);
  };

  return (
    <div className="bg-white/80 backdrop-blur-sm rounded-xl border border-gray-200/60 hover:border-blue-300/60 transition-all duration-500 hover:shadow-lg group">
      <div className="p-4 sm:p-6">
        {/* Header Section */}
        <div className="mb-4">
          <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 mb-3">
            <h3 className="text-lg sm:text-xl font-semibold text-gray-900 group-hover:text-blue-700 transition-colors duration-300 line-clamp-2">
              {poemData.title}
            </h3>
            <span className="bg-gradient-to-r from-blue-100 to-blue-50 text-blue-700 px-2 py-1 sm:px-3 sm:py-1 rounded-full text-xs sm:text-sm border border-blue-200 w-fit">
              {poemData.category}
            </span>
          </div>
          <div className="flex flex-col xs:flex-row gap-2 xs:gap-4 text-sm text-gray-600">
            <div className="flex items-center gap-2">
              {poemData.avatar && !imageError ? (
                <div className="flex items-center gap-2">
                  <img
                    src={poemData.avatar}
                    alt={poemData.poet}
                    className="w-5 h-5 sm:w-6 sm:h-6 rounded-full object-cover border border-gray-300"
                    onError={handleImageError}
                  />
                  <span className="text-gray-700 font-medium text-sm sm:text-base">
                    {poemData.poet}
                  </span>
                </div>
              ) : (
                <div className="flex items-center gap-1">
                  <User size={14} className="text-blue-600 sm:w-4 sm:h-4" />
                  <span className="text-sm sm:text-base">{poemData.poet}</span>
                </div>
              )}
            </div>
            <div className="flex items-center gap-1">
              <Calendar size={14} className="text-green-600 sm:w-4 sm:h-4" />
              <span className="text-sm sm:text-base">{poemData.year}</span>
            </div>
          </div>
        </div>

        {/* Avatar and poem content section */}
        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 mb-4">
          {/* Avatar section - only show if avatar exists */}
          {poemData.avatar && !imageError && (
            <div className="flex justify-center sm:justify-start sm:flex-shrink-0">
              <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-lg overflow-hidden border border-gray-200 shadow-sm">
                <img
                  src={poemData.avatar}
                  alt={`${poemData.poet} का अवतार`}
                  className="w-full h-full object-cover"
                  onError={handleImageError}
                />
              </div>
            </div>
          )}

          {/* Poem content */}
          <div className="flex-1 relative">
            <div className="absolute -left-2 sm:-left-4 top-0 w-0.5 sm:w-1 h-full bg-gradient-to-b from-blue-200 to-green-200 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            <pre className="text-gray-700 leading-6 sm:leading-7 whitespace-pre-wrap font-serif text-sm sm:text-[15px] pl-1 sm:pl-2 overflow-hidden">
              {contentToShow}
            </pre>
            {poemData.content.split("\n").length > 2 && (
              <button
                onClick={() => setIsExpanded(!isExpanded)}
                className="text-blue-600 hover:text-blue-800 text-xs sm:text-sm font-medium mt-2 transition-colors duration-200 flex items-center gap-1"
              >
                <BookOpen size={12} className="sm:w-3.5 sm:h-3.5" />
                {isExpanded ? "कम देखें" : "पूरी कविता पढ़ें"}
              </button>
            )}
          </div>
        </div>

        {/* Actions Section */}
        <div className="flex flex-col xs:flex-row items-stretch xs:items-center justify-between gap-3 pt-4 border-t border-gray-200/60">
          <div className="flex items-center gap-2 justify-center xs:justify-start">
            <button
              onClick={() => setIsLiked(!isLiked)}
              className={`flex items-center gap-1 sm:gap-2 px-2 sm:px-3 py-1.5 sm:py-2 rounded-lg transition-all duration-300 flex-1 xs:flex-none justify-center ${
                isLiked
                  ? "bg-red-50 text-red-600 border border-red-200 shadow-sm"
                  : "bg-gray-50 text-gray-600 border border-gray-200 hover:bg-gray-100"
              }`}
            >
              <Heart
                size={14}
                className={`sm:w-4 sm:h-4 ${isLiked ? "animate-pulse" : ""}`}
                fill={isLiked ? "currentColor" : "none"}
              />
              <span className="text-xs sm:text-sm">
                {poemData.likes + (isLiked ? 1 : 0)}
              </span>
            </button>

            <div className="relative flex-1 xs:flex-none">
              <button
                onClick={() => setShowShareMenu(!showShareMenu)}
                className="flex items-center gap-1 sm:gap-2 px-2 sm:px-3 py-1.5 sm:py-2 rounded-lg bg-gray-50 text-gray-600 border border-gray-200 hover:bg-gray-100 transition-all duration-300 w-full justify-center"
              >
                <Share2 size={14} className="sm:w-4 sm:h-4" />
                <span className="text-xs sm:text-sm hidden xs:inline">
                  शेयर
                </span>
              </button>

              {showShareMenu && (
                <div className="absolute bottom-full mb-2 left-1/2 transform -translate-x-1/2 xs:left-0 xs:transform-none bg-white rounded-lg shadow-lg border border-gray-200 p-2 animate-fade-in z-10 min-w-[120px]">
                  <button
                    onClick={() => handleShare("twitter")}
                    className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-blue-50 text-blue-600 w-full transition-colors duration-200 text-sm"
                  >
                    <Twitter size={14} />
                    <span>Twitter</span>
                  </button>
                  <button
                    onClick={() => handleShare("whatsapp")}
                    className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-green-50 text-green-600 w-full transition-colors duration-200 text-sm"
                  >
                    <MessageCircle size={14} />
                    <span>WhatsApp</span>
                  </button>
                </div>
              )}
            </div>
          </div>

          <button className="flex items-center gap-1 sm:gap-2 px-3 sm:px-4 py-2 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-lg hover:from-blue-700 hover:to-blue-800 transition-all duration-300 shadow-sm hover:shadow-md group/btn text-sm sm:text-base justify-center">
            <BookOpen
              size={14}
              className="sm:w-4 sm:h-4 group-hover/btn:animate-bounce"
            />
            <span className="font-medium">पढ़ें</span>
          </button>
        </div>
      </div>
    </div>
  );
}

// मुख्य कम्पोनेंट
function HindiPoemsCollection() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("सभी");
  const [poems, setPoems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let mounted = true;
    async function load() {
      try {
        setLoading(true);
        const items = await fetchCollection("kavita");
        if (!mounted) return;

        // Filter only published poems and map to expected structure
        const publishedPoems = items
          .filter((item) => item.published !== false) // Include only published poems
          .map((item) => ({
            ...item,
            // Ensure all required fields are present
            text: item.text || "",
            tags: item.tags || [],
            poet: item.poet || "अज्ञात",
            title: item.title || "बिना शीर्षक",
            avatar: item.avatar || null,
          }));

        setPoems(publishedPoems);
      } catch (err) {
        if (!mounted) return;
        setError(err.message || "डेटा लोड करने में त्रुटि");
      } finally {
        if (!mounted) return;
        setLoading(false);
      }
    }
    load();
    return () => (mounted = false);
  }, []);

  const filteredPoems = poems.filter((poem) => {
    const matchesSearch =
      poem.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      poem.poet.toLowerCase().includes(searchQuery.toLowerCase()) ||
      poem.text.toLowerCase().includes(searchQuery.toLowerCase());

    // Use first tag as category for filtering
    const poemCategory =
      poem.tags && poem.tags.length > 0 ? poem.tags[0] : "जीवन";
    const matchesCategory =
      selectedCategory === "सभी" || poemCategory === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  if (loading) return <ProfessionalLoader />;
  if (error)
    return <div className="p-4 text-red-600 text-center">त्रुटि: {error}</div>;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50 relative">
      <FloatingShapes />

      {/* Header */}
      <div className="relative">
        <div className="bg-white/70 backdrop-blur-sm border-b border-gray-200/60">
          <div className="max-w-6xl mx-auto px-3 sm:px-4 lg:px-6 py-6 sm:py-8 text-center">
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent mb-3 sm:mb-4 animate-fade-in">
              हिंदी कविता संग्रह
            </h1>
            <p className="text-gray-600 text-sm sm:text-base lg:text-lg max-w-2xl mx-auto leading-relaxed px-2">
              हिंदी साहित्य की श्रेष्ठ कविताओं का सुंदर संकलन
            </p>
          </div>
        </div>
      </div>

      {/* Search & Filter */}
      <div className="relative max-w-6xl mx-auto px-3 sm:px-4 lg:px-6 py-6 sm:py-8">
        <div className="mb-6 sm:mb-8">
          <div className="relative max-w-xl mx-auto mb-4 sm:mb-6">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4 sm:w-5 sm:h-5" />
            <input
              type="text"
              placeholder="कविता, कवि या शब्द खोजें..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 sm:pl-12 pr-4 py-2.5 sm:py-3 border border-gray-300 rounded-xl bg-white/80 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300 shadow-sm text-sm sm:text-base"
            />
          </div>

          <div className="flex flex-wrap gap-1.5 sm:gap-2 justify-center">
            {CATEGORIES.map((category, index) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-3 py-1.5 sm:px-4 sm:py-2 rounded-lg transition-all duration-300 transform hover:scale-105 text-xs sm:text-sm ${
                  category === selectedCategory
                    ? "bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-lg"
                    : "bg-white/80 text-gray-700 border border-gray-300 hover:border-blue-300 shadow-sm"
                } animate-fade-in`}
                style={{ animationDelay: `${index * 100}ms` }}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* Results Count */}
        {filteredPoems.length > 0 && (
          <div className="mb-4 sm:mb-6 text-center">
            <p className="text-gray-600 text-sm sm:text-base">
              {filteredPoems.length} कविता
              {filteredPoems.length !== 1 ? "एँ" : ""} मिली
              {filteredPoems.length !== 1 ? "ं" : ""}
            </p>
          </div>
        )}

        {/* Poems Grid */}
        {filteredPoems.length === 0 ? (
          <div className="text-center py-8 sm:py-12 animate-fade-in">
            <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 sm:p-8 max-w-md mx-auto border border-gray-200/60">
              <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-2">
                कोई कविता नहीं मिली
              </h3>
              <p className="text-gray-600 mb-4 text-sm sm:text-base">
                कृपया अलग कीवर्ड या श्रेणी आज़माएं
              </p>
              <button
                onClick={() => {
                  setSearchQuery("");
                  setSelectedCategory("सभी");
                }}
                className="bg-gradient-to-r from-blue-600 to-blue-700 text-white px-5 sm:px-6 py-2 rounded-lg hover:from-blue-700 hover:to-blue-800 transition-all duration-300 shadow-sm hover:shadow-md text-sm sm:text-base"
              >
                सभी कविताएं देखें
              </button>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
            {filteredPoems.map((poem, index) => (
              <div
                key={poem.slug || poem.id || index}
                className="animate-fade-in-up"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <PoemCard poem={poem} />
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Footer */}
      <footer className="bg-white/70 backdrop-blur-sm border-t border-gray-200/60 mt-8 sm:mt-12">
        <div className="max-w-6xl mx-auto px-3 sm:px-4 lg:px-6 py-4 sm:py-6 text-center">
          <p className="text-gray-600 text-xs sm:text-sm">
            © 2024 हिंदी कविता संग्रह - साहित्य की सुंदरता को संजोते हुए
          </p>
        </div>
      </footer>

      {/* Custom Animations */}
      <style jsx global>{`
        @keyframes float-slow {
          0%,
          100% {
            transform: translateY(0px) rotate(0deg);
          }
          50% {
            transform: translateY(-10px) rotate(180deg);
          }
        }
        @keyframes float-medium {
          0%,
          100% {
            transform: translateX(0px) translateY(0px);
          }
          50% {
            transform: translateX(5px) translateY(-8px);
          }
        }
        @keyframes float-fast {
          0%,
          100% {
            transform: translateY(0px) scale(1);
          }
          50% {
            transform: translateY(-5px) scale(1.03);
          }
        }
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(8px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        @keyframes fade-in-up {
          from {
            opacity: 0;
            transform: translateY(15px) scale(0.98);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }
        .animate-float-slow {
          animation: float-slow 8s ease-in-out infinite;
        }
        .animate-float-medium {
          animation: float-medium 6s ease-in-out infinite;
        }
        .animate-float-fast {
          animation: float-fast 4s ease-in-out infinite;
        }
        .animate-fade-in {
          animation: fade-in 0.5s ease-out;
        }
        .animate-fade-in-up {
          animation: fade-in-up 0.5s ease-out;
        }

        /* Custom breakpoint for extra small devices */
        @media (min-width: 475px) {
          .xs\\:flex-row {
            flex-direction: row;
          }
          .xs\\:justify-start {
            justify-content: flex-start;
          }
          .xs\\:flex-none {
            flex: none;
          }
          .xs\\:inline {
            display: inline;
          }
        }

        /* Line clamp utility */
        .line-clamp-2 {
          overflow: hidden;
          display: -webkit-box;
          -webkit-box-orient: vertical;
          -webkit-line-clamp: 2;
        }

        /* Improve pre tag responsiveness */
        pre {
          white-space: pre-wrap;
          word-wrap: break-word;
          font-family: inherit;
        }
      `}</style>
    </div>
  );
}

export default HindiPoemsCollection;
