"use client";

import React, { useState, useEffect } from "react";
import { Search, BookOpen, User, Calendar, Share2, Twitter, MessageCircle, Heart } from "lucide-react";

// कविताओं का डेटा
const HINDI_POEMS = [
  {
    id: 1,
    title: "मधुशाला",
    poet: "हरिवंश राय बच्चन",
    content: `मदिरालय जाने को घर से चलता है पीनेवला,
'किस पथ से जाऊँ?' असमंजस में है वह भोलाभाला,
अलग-अलग पथ बतलाते सब, पर मैं यह बतलाता हूँ -
'राह पकड़ तू एक चला चल, पा जाएगा मधुशाला।'`,
    category: "प्रेम",
    year: "1935",
    likes: 1247
  },
  {
    id: 2,
    title: "चंपा काले-काले अच्छर नहीं चीन्हती",
    poet: "सूर्यकांत त्रिपाठी 'निराला'",
    content: `चंपा काले-काले अच्छर नहीं चीन्हती,
कभी नहीं देखी उसने किताब,
कभी नहीं सुना उसने पढ़ना,
कभी नहीं लिखा उसने कुछ भी।`,
    category: "प्रकृति",
    year: "1938",
    likes: 892
  },
  {
    id: 3,
    title: "आओ मिलकर बचाएँ",
    poet: "महादेवी वर्मा",
    content: `आओ मिलकर बचाएँ,
इस धरती का वैभव,
आओ मिलकर सजाएँ,
इसका स्वर्ग-सा श्रृंगार।`,
    category: "प्रकृति",
    year: "1940",
    likes: 756
  },
  {
    id: 4,
    title: "सरोज स्मृति",
    poet: "सूर्यकांत त्रिपाठी 'निराला'",
    content: `हाय, वह अब नहीं है!
वह अब नहीं है!
वह जो थी मेरे जीवन की एकमात्र सहारा,
वह जो थी मेरे अंधकार में एक किरण प्यारा।`,
    category: "शोक",
    year: "1935",
    likes: 1567
  }
];

// श्रेणियाँ
const CATEGORIES = ["सभी", "प्रेम", "प्रकृति", "शोक", "प्रेरणा", "जीवन"];

// फ्लोटिंग शेप्स कम्पोनेंट
function FloatingShapes() {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
      {/* एनिमेटेड सर्कल */}
      <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-gradient-to-br from-blue-100 to-blue-50 rounded-full opacity-60 animate-float-slow"></div>
      <div className="absolute top-1/3 right-1/4 w-48 h-48 bg-gradient-to-br from-green-100 to-green-50 rounded-full opacity-40 animate-float-medium"></div>
      <div className="absolute bottom-1/4 left-1/3 w-32 h-32 bg-gradient-to-br from-amber-100 to-amber-50 rounded-full opacity-50 animate-float-fast"></div>
      
      {/* डॉट्स पैटर्न */}
      <div className="absolute top-1/2 right-1/3 w-24 h-24 opacity-30">
        <div className="grid grid-cols-3 gap-2">
          {[...Array(9)].map((_, i) => (
            <div key={i} className="w-2 h-2 bg-gray-400 rounded-full animate-pulse" 
                 style={{ animationDelay: `${i * 0.2}s` }} />
          ))}
        </div>
      </div>
    </div>
  );
}

// पोएम कार्ड कम्पोनेंट
function PoemCard({ poem }) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const [showShareMenu, setShowShareMenu] = useState(false);

  const contentToShow = isExpanded ? poem.content : poem.content.split('\n').slice(0, 2).join('\n');

  const handleShare = (platform) => {
    const text = `${poem.title} - ${poem.poet}\n\n${poem.content.substring(0, 100)}...`;
    const url = window.location.href;
    
    const shareUrls = {
      twitter: `https://twitter.com/intent/tweet?text=${encodeURIComponent(text + "\\n\\n" + url)}`,
      whatsapp: `https://wa.me/?text=${encodeURIComponent(text + "\\n" + url)}`
    };

    window.open(shareUrls[platform], '_blank');
    setShowShareMenu(false);
  };

  return (
    <div className="bg-white/80 backdrop-blur-sm rounded-xl border border-gray-200/60 hover:border-blue-300/60 transition-all duration-500 hover:shadow-lg group">
      <div className="p-6">
        {/* हेडर */}
        <div className="mb-4">
          <div className="flex items-start justify-between mb-3">
            <h3 className="text-xl font-semibold text-gray-900 group-hover:text-blue-700 transition-colors duration-300">
              {poem.title}
            </h3>
            <span className="bg-gradient-to-r from-blue-100 to-blue-50 text-blue-700 px-3 py-1 rounded-full text-sm border border-blue-200">
              {poem.category}
            </span>
          </div>
          
          <div className="flex items-center gap-4 text-sm text-gray-600">
            <div className="flex items-center gap-1">
              <User size={16} className="text-blue-600" />
              <span>{poem.poet}</span>
            </div>
            <div className="flex items-center gap-1">
              <Calendar size={16} className="text-green-600" />
              <span>{poem.year}</span>
            </div>
          </div>
        </div>

        {/* कविता की सामग्री */}
        <div className="mb-4 relative">
          <div className="absolute -left-4 top-0 w-1 h-full bg-gradient-to-b from-blue-200 to-green-200 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
          <pre className="text-gray-700 leading-7 whitespace-pre-wrap font-serif text-[15px] pl-2">
            {contentToShow}
          </pre>
          {poem.content.split('\n').length > 2 && (
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="text-blue-600 hover:text-blue-800 text-sm font-medium mt-2 transition-colors duration-200 flex items-center gap-1"
            >
              <BookOpen size={14} />
              {isExpanded ? "कम देखें" : "पूरी कविता पढ़ें"}
            </button>
          )}
        </div>

        {/* एक्शन बटन */}
        <div className="flex items-center justify-between pt-4 border-t border-gray-200/60">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsLiked(!isLiked)}
              className={`flex items-center gap-2 px-3 py-2 rounded-lg transition-all duration-300 ${
                isLiked
                  ? 'bg-red-50 text-red-600 border border-red-200 shadow-sm'
                  : 'bg-gray-50 text-gray-600 border border-gray-200 hover:bg-gray-100'
              }`}
            >
              <Heart 
                size={16} 
                fill={isLiked ? "currentColor" : "none"} 
                className={isLiked ? "animate-pulse" : ""}
              />
              <span className="text-sm">{poem.likes + (isLiked ? 1 : 0)}</span>
            </button>

            {/* शेयर मेनू */}
            <div className="relative">
              <button
                onClick={() => setShowShareMenu(!showShareMenu)}
                className="flex items-center gap-2 px-3 py-2 rounded-lg bg-gray-50 text-gray-600 border border-gray-200 hover:bg-gray-100 transition-all duration-300"
              >
                <Share2 size={16} />
              </button>
              
              {showShareMenu && (
                <div className="absolute bottom-full mb-2 left-0 bg-white rounded-lg shadow-lg border border-gray-200 p-2 animate-fade-in">
                  <button
                    onClick={() => handleShare('twitter')}
                    className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-blue-50 text-blue-600 w-full transition-colors duration-200"
                  >
                    <Twitter size={16} />
                    <span className="text-sm">Twitter</span>
                  </button>
                  <button
                    onClick={() => handleShare('whatsapp')}
                    className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-green-50 text-green-600 w-full transition-colors duration-200"
                  >
                    <MessageCircle size={16} />
                    <span className="text-sm">WhatsApp</span>
                  </button>
                </div>
              )}
            </div>
          </div>

          <button className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-lg hover:from-blue-700 hover:to-blue-800 transition-all duration-300 shadow-sm hover:shadow-md group/btn">
            <BookOpen size={16} className="group-hover/btn:animate-bounce" />
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
  const [isLoading, setIsLoading] = useState(true);

  // लोडिंग एनिमेशन
  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  // कविताओं को फिल्टर करना
  const filteredPoems = HINDI_POEMS.filter(poem => {
    const matchesSearch = poem.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                        poem.poet.toLowerCase().includes(searchQuery.toLowerCase()) ||
                        poem.content.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === "सभी" || poem.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">कविताएं लोड हो रही हैं...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50 relative">
      {/* एनिमेटेड बैकग्राउंड */}
      <FloatingShapes />
      
      {/* हेडर */}
      <div className="relative">
        <div className="bg-white/70 backdrop-blur-sm border-b border-gray-200/60">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8">
            <div className="text-center">
              <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent mb-4 animate-fade-in">
                हिंदी कविता संग्रह
              </h1>
              <p className="text-gray-600 text-lg max-w-2xl mx-auto leading-relaxed">
                हिंदी साहित्य की श्रेष्ठ कविताओं का सुंदर संकलन
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 py-8">
        {/* सर्च और फिल्टर */}
        <div className="mb-8">
          {/* सर्च बार */}
          <div className="relative max-w-xl mx-auto mb-6">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="कविता, कवि या शब्द खोजें..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-xl bg-white/80 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300 shadow-sm"
            />
          </div>

          {/* श्रेणी फिल्टर */}
          <div className="flex flex-wrap gap-2 justify-center">
            {CATEGORIES.map((category, index) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-lg transition-all duration-300 transform hover:scale-105 ${
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

        {/* परिणाम जानकारी */}
        <div className="mb-6 text-center animate-fade-in">
          <p className="text-gray-600">
            <span className="font-semibold text-blue-600">{filteredPoems.length}</span> कविताएं मिलीं
            {searchQuery && (
              <span>
                {" "}"<span className="font-medium">{searchQuery}</span>" के लिए
              </span>
            )}
          </p>
        </div>

        {/* कविताओं का ग्रिड */}
        {filteredPoems.length === 0 ? (
          <div className="text-center py-12 animate-fade-in">
            <div className="w-20 h-20 bg-gradient-to-br from-blue-100 to-green-100 rounded-full flex items-center justify-center mx-auto mb-4 shadow-inner">
              <Search size={32} className="text-gray-400" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">कोई कविता नहीं मिली</h3>
            <p className="text-gray-600 mb-4">
              कृपया अलग कीवर्ड या श्रेणी आज़माएं
            </p>
            <button
              onClick={() => {
                setSearchQuery("");
                setSelectedCategory("सभी");
              }}
              className="bg-gradient-to-r from-blue-600 to-blue-700 text-white px-6 py-2 rounded-lg hover:from-blue-700 hover:to-blue-800 transition-all duration-300 shadow-sm hover:shadow-md"
            >
              सभी कविताएं देखें
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filteredPoems.map((poem, index) => (
              <div 
                key={poem.id}
                className="animate-fade-in-up"
                style={{ animationDelay: `${index * 150}ms` }}
              >
                <PoemCard poem={poem} />
              </div>
            ))}
          </div>
        )}

        {/* स्टेटिस्टिक्स */}
        <div className="mt-12 text-center animate-fade-in">
          <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 border border-gray-200/60 shadow-sm max-w-md mx-auto">
            <h3 className="font-semibold text-gray-900 mb-4">कविता संग्रह</h3>
            <div className="grid grid-cols-3 gap-4 text-center">
              <div>
                <div className="text-2xl font-bold text-blue-600">{HINDI_POEMS.length}</div>
                <div className="text-gray-600 text-sm">कविताएं</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-green-600">
                  {[...new Set(HINDI_POEMS.map(p => p.poet))].length}
                </div>
                <div className="text-gray-600 text-sm">कवि</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-amber-600">
                  {CATEGORIES.length - 1}
                </div>
                <div className="text-gray-600 text-sm">श्रेणियाँ</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* फूटर */}
      <footer className="bg-white/70 backdrop-blur-sm border-t border-gray-200/60 mt-12">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-6">
          <div className="text-center">
            <p className="text-gray-600 text-sm">
              © 2024 हिंदी कविता संग्रह - साहित्य की सुंदरता को संजोते हुए
            </p>
          </div>
        </div>
      </footer>

      {/* कस्टम एनिमेशन स्टाइल */}
      <style jsx>{`
        @keyframes float-slow {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(180deg); }
        }
        @keyframes float-medium {
          0%, 100% { transform: translateX(0px) translateY(0px); }
          50% { transform: translateX(10px) translateY(-15px); }
        }
        @keyframes float-fast {
          0%, 100% { transform: translateY(0px) scale(1); }
          50% { transform: translateY(-10px) scale(1.05); }
        }
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes fade-in-up {
          from { 
            opacity: 0; 
            transform: translateY(20px) scale(0.95); 
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
          animation: fade-in 0.6s ease-out;
        }
        .animate-fade-in-up {
          animation: fade-in-up 0.6s ease-out;
        }
      `}</style>
    </div>
  );
}

export default HindiPoemsCollection;