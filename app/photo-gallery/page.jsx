"use client";

import React, { useState, useEffect } from "react";
import { Search, Grid, List, Filter, X, ZoomIn, Download, Share2, Heart, ChevronLeft, ChevronRight } from "lucide-react";

// फोटो डेटा
const PHOTOS = [
  {
    id: 1,
    src: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=500&h=500&fit=crop",
    alt: "पर्वत और झील",
    category: "प्रकृति",
    title: "हिमालय की सुंदरता",
    likes: 234,
    downloads: 89,
    featured: true
  },
  {
    id: 2,
    src: "https://images.unsplash.com/photo-1518837695005-2083093ee35b?w=500&h=500&fit=crop",
    alt: "ऐतिहासिक इमारत",
    category: "स्थापत्य",
    title: "प्राचीन स्थापत्य",
    likes: 156,
    downloads: 45,
    featured: false
  },
  {
    id: 3,
    src: "https://images.unsplash.com/photo-1545569341-9eb8b30979d9?w=500&h=500&fit=crop",
    alt: "जापानी मंदिर",
    category: "संस्कृति",
    title: "जापानी संस्कृति",
    likes: 189,
    downloads: 67,
    featured: true
  },
  {
    id: 4,
    src: "https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=500&h=500&fit=crop",
    alt: "प्राकृतिक दृश्य",
    category: "प्रकृति",
    title: "हरियाली",
    likes: 278,
    downloads: 92,
    featured: false
  },
  {
    id: 5,
    src: "https://images.unsplash.com/photo-1682686581556-a3f0ee0ed556?w=500&h=500&fit=crop",
    alt: "समुद्र तट",
    category: "प्रकृति",
    title: "समुद्र की लहरें",
    likes: 312,
    downloads: 124,
    featured: true
  },
  {
    id: 6,
    src: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=500&h=500&fit=crop",
    alt: "पर्वत",
    category: "प्रकृति",
    title: "बर्फीले पहाड़",
    likes: 198,
    downloads: 56,
    featured: false
  },
  {
    id: 7,
    src: "https://images.unsplash.com/photo-1464822759844-dfa3776cde74?w=500&h=500&fit=crop",
    alt: "उत्तरी लाइट्स",
    category: "प्रकृति",
    title: "उत्तरी ध्रुवीय प्रकाश",
    likes: 445,
    downloads: 178,
    featured: true
  },
  {
    id: 8,
    src: "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=500&h=500&fit=crop",
    alt: "जंगल",
    category: "प्रकृति",
    title: "रहस्यमयी जंगल",
    likes: 167,
    downloads: 49,
    featured: false
  }
];

// श्रेणियाँ
const CATEGORIES = ["सभी", "प्रकृति", "स्थापत्य", "संस्कृति", "यात्रा"];

// फ्लोटिंग बैकग्राउंड एलिमेंट्स
function FloatingBackground() {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
      <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-gradient-to-br from-blue-100/40 to-purple-100/30 rounded-full animate-float-slow"></div>
      <div className="absolute top-1/3 right-1/4 w-56 h-56 bg-gradient-to-br from-green-100/30 to-cyan-100/20 rounded-full animate-float-medium"></div>
      <div className="absolute bottom-1/4 left-1/3 w-40 h-40 bg-gradient-to-br from-amber-100/20 to-orange-100/10 rounded-full animate-float-fast"></div>
    </div>
  );
}

// फोटो ग्रिड आइटम
function PhotoCard({ photo, onPhotoClick, onLike }) {
  const [isLiked, setIsLiked] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);

  const handleLike = () => {
    setIsLiked(!isLiked);
    onLike(photo.id, !isLiked);
  };

  return (
    <div className="group relative bg-white/80 backdrop-blur-sm rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 border border-gray-200/60 hover:border-blue-300/60">
      {/* इमेज कंटेनर */}
      <div className="relative overflow-hidden">
        <img
          src={photo.src}
          alt={photo.alt}
          className={`w-full h-64 object-cover transition-transform duration-700 group-hover:scale-110 ${
            imageLoaded ? 'opacity-100' : 'opacity-0'
          }`}
          onLoad={() => setImageLoaded(true)}
        />
        
        {/* लोडिंग स्टेट */}
        {!imageLoaded && (
          <div className="absolute inset-0 bg-gradient-to-br from-gray-100 to-gray-200 animate-pulse flex items-center justify-center">
            <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
          </div>
        )}

        {/* ओवरले कंटेंट */}
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-all duration-500 flex items-center justify-center opacity-0 group-hover:opacity-100">
          <div className="flex gap-3 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
            <button
              onClick={() => onPhotoClick(photo)}
              className="bg-white/90 text-gray-900 p-3 rounded-full hover:bg-white hover:scale-110 transition-all duration-300 shadow-lg"
            >
              <ZoomIn size={20} />
            </button>
            <button className="bg-white/90 text-gray-900 p-3 rounded-full hover:bg-white hover:scale-110 transition-all duration-300 shadow-lg">
              <Download size={20} />
            </button>
          </div>
        </div>

        {/* बैज */}
        {photo.featured && (
          <div className="absolute top-3 left-3 bg-gradient-to-r from-amber-500 to-orange-500 text-white px-3 py-1 rounded-full text-sm font-medium shadow-lg">
            Featured
          </div>
        )}
        <div className="absolute top-3 right-3 bg-black/60 text-white px-3 py-1 rounded-full text-sm backdrop-blur-sm">
          {photo.category}
        </div>
      </div>

      {/* फोटो डिटेल्स */}
      <div className="p-4">
        <h3 className="font-semibold text-gray-900 mb-2 group-hover:text-blue-700 transition-colors duration-300">
          {photo.title}
        </h3>
        
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4 text-sm text-gray-600">
            <button
              onClick={handleLike}
              className={`flex items-center gap-1 transition-all duration-300 ${
                isLiked ? 'text-red-600 scale-110' : 'text-gray-600 hover:text-red-600'
              }`}
            >
              <Heart size={16} fill={isLiked ? "currentColor" : "none"} />
              <span>{photo.likes + (isLiked ? 1 : 0)}</span>
            </button>
            <div className="flex items-center gap-1">
              <Download size={16} />
              <span>{photo.downloads}</span>
            </div>
          </div>
          
          <button className="text-gray-600 hover:text-blue-600 transition-colors duration-300">
            <Share2 size={16} />
          </button>
        </div>
      </div>
    </div>
  );
}

// लाइटबॉक्स/मोडल कम्पोनेंट
function Lightbox({ photo, isOpen, onClose, onNext, onPrev, hasNext, hasPrev }) {
  const [imageLoaded, setImageLoaded] = useState(false);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen || !photo) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-sm animate-fade-in">
      {/* क्लोज बटन */}
      <button
        onClick={onClose}
        className="absolute top-4 right-4 z-10 bg-white/10 hover:bg-white/20 text-white p-3 rounded-full backdrop-blur-sm transition-all duration-300 hover:scale-110"
      >
        <X size={24} />
      </button>

      {/* नेविगेशन बटन */}
      {hasPrev && (
        <button
          onClick={onPrev}
          className="absolute left-4 top-1/2 transform -translate-y-1/2 z-10 bg-white/10 hover:bg-white/20 text-white p-3 rounded-full backdrop-blur-sm transition-all duration-300 hover:scale-110"
        >
          <ChevronLeft size={24} />
        </button>
      )}
      
      {hasNext && (
        <button
          onClick={onNext}
          className="absolute right-4 top-1/2 transform -translate-y-1/2 z-10 bg-white/10 hover:bg-white/20 text-white p-3 rounded-full backdrop-blur-sm transition-all duration-300 hover:scale-110"
        >
          <ChevronRight size={24} />
        </button>
      )}

      {/* इमेज कंटेनर */}
      <div className="relative max-w-4xl max-h-full w-full">
        <img
          src={photo.src}
          alt={photo.alt}
          className={`w-full h-auto max-h-[80vh] object-contain rounded-lg transition-opacity duration-500 ${
            imageLoaded ? 'opacity-100' : 'opacity-0'
          }`}
          onLoad={() => setImageLoaded(true)}
        />
        
        {!imageLoaded && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-12 h-12 border-4 border-white border-t-transparent rounded-full animate-spin"></div>
          </div>
        )}

        {/* इमेज इनफो */}
        <div className="absolute bottom-4 left-4 right-4 bg-black/60 text-white p-4 rounded-lg backdrop-blur-sm transform translate-y-0 opacity-100 transition-all duration-500">
          <h3 className="text-xl font-semibold mb-2">{photo.title}</h3>
          <div className="flex items-center justify-between text-sm">
            <span className="bg-blue-600 px-3 py-1 rounded-full">{photo.category}</span>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-1">
                <Heart size={16} />
                <span>{photo.likes}</span>
              </div>
              <div className="flex items-center gap-1">
                <Download size={16} />
                <span>{photo.downloads}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// मुख्य फोटो गैलरी कम्पोनेंट
function PhotoGallery() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("सभी");
  const [viewMode, setViewMode] = useState("grid");
  const [selectedPhoto, setSelectedPhoto] = useState(null);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [photos, setPhotos] = useState(PHOTOS);
  const [isLoading, setIsLoading] = useState(true);

  // लोडिंग सिमुलेशन
  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1500);
    return () => clearTimeout(timer);
  }, []);

  // फिल्टर फोटो
  const filteredPhotos = photos.filter(photo => {
    const matchesSearch = photo.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         photo.category.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === "सभी" || photo.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  // लाइक फंक्शन
  const handleLike = (photoId, isLiked) => {
    setPhotos(prevPhotos =>
      prevPhotos.map(photo =>
        photo.id === photoId
          ? { ...photo, likes: photo.likes + (isLiked ? 1 : -1) }
          : photo
      )
    );
  };

  // लाइटबॉक्स फंक्शन
  const openLightbox = (photo) => {
    setSelectedPhoto(photo);
    setIsLightboxOpen(true);
  };

  const closeLightbox = () => {
    setIsLightboxOpen(false);
    setSelectedPhoto(null);
  };

  const goToNext = () => {
    const currentIndex = filteredPhotos.findIndex(p => p.id === selectedPhoto.id);
    const nextIndex = (currentIndex + 1) % filteredPhotos.length;
    setSelectedPhoto(filteredPhotos[nextIndex]);
  };

  const goToPrev = () => {
    const currentIndex = filteredPhotos.findIndex(p => p.id === selectedPhoto.id);
    const prevIndex = (currentIndex - 1 + filteredPhotos.length) % filteredPhotos.length;
    setSelectedPhoto(filteredPhotos[prevIndex]);
  };

  const hasNext = selectedPhoto && filteredPhotos.length > 1;
  const hasPrev = selectedPhoto && filteredPhotos.length > 1;

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600 text-lg">गैलरी लोड हो रही है...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 relative">
      {/* एनिमेटेड बैकग्राउंड */}
      <FloatingBackground />
      
      {/* हेडर */}
      <div className="relative bg-white/70 backdrop-blur-sm border-b border-gray-200/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
          <div className="text-center">
            <h1 className="text-4xl lg:text-5xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-4">
              फोटो गैलरी
            </h1>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              सुंदर तस्वीरों का संग्रह - प्रकृति, स्थापत्य और संस्कृति की झलक
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        {/* कंट्रोल्स */}
        <div className="mb-8 space-y-4">
          {/* सर्च और व्यू कंट्रोल */}
          <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
            {/* सर्च बार */}
            <div className="relative flex-1 max-w-xl">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="तस्वीरें खोजें..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-xl bg-white/80 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300 shadow-sm"
              />
            </div>

            {/* व्यू कंट्रोल */}
            <div className="flex items-center gap-4">
              {/* व्यू मोड */}
              <div className="flex items-center gap-1 bg-white/80 backdrop-blur-sm rounded-lg p-1 border border-gray-300 shadow-sm">
                <button
                  onClick={() => setViewMode("grid")}
                  className={`p-2 rounded-lg transition-all duration-300 ${
                    viewMode === "grid" 
                      ? "bg-blue-600 text-white shadow-sm" 
                      : "text-gray-600 hover:text-blue-600"
                  }`}
                >
                  <Grid size={20} />
                </button>
                <button
                  onClick={() => setViewMode("list")}
                  className={`p-2 rounded-lg transition-all duration-300 ${
                    viewMode === "list" 
                      ? "bg-blue-600 text-white shadow-sm" 
                      : "text-gray-600 hover:text-blue-600"
                  }`}
                >
                  <List size={20} />
                </button>
              </div>
            </div>
          </div>

          {/* कैटेगरी फिल्टर */}
          <div className="flex items-center gap-4 flex-wrap justify-center">
            <div className="flex items-center gap-2 text-gray-600">
              <Filter size={20} />
              <span className="font-medium">श्रेणी:</span>
            </div>
            {CATEGORIES.map((category, index) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-lg transition-all duration-300 transform hover:scale-105 ${
                  category === selectedCategory
                    ? "bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-lg"
                    : "bg-white/80 text-gray-700 border border-gray-300 hover:border-blue-300 shadow-sm"
                }`}
                style={{ animationDelay: `${index * 100}ms` }}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* रिजल्ट्स इनफो */}
        <div className="mb-6 text-center">
          <p className="text-gray-600">
            <span className="font-semibold text-blue-600">{filteredPhotos.length}</span> तस्वीरें मिलीं
            {searchQuery && (
              <span>
                {" "}"<span className="font-medium">{searchQuery}</span>" के लिए
              </span>
            )}
            {selectedCategory !== "सभी" && (
              <span>
                {" "}श्रेणी: <span className="font-medium">{selectedCategory}</span>
              </span>
            )}
          </p>
        </div>

        {/* फोटो ग्रिड */}
        {filteredPhotos.length === 0 ? (
          <div className="text-center py-12">
            <div className="w-20 h-20 bg-gradient-to-br from-blue-100 to-purple-100 rounded-full flex items-center justify-center mx-auto mb-4 shadow-inner">
              <Search size={32} className="text-gray-400" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">कोई तस्वीर नहीं मिली</h3>
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
              सभी तस्वीरें देखें
            </button>
          </div>
        ) : (
          <div className={`grid gap-6 ${
            viewMode === "grid" 
              ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4" 
              : "grid-cols-1"
          }`}>
            {filteredPhotos.map((photo, index) => (
              <div 
                key={photo.id}
                className="animate-fade-in-up"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <PhotoCard 
                  photo={photo} 
                  onPhotoClick={openLightbox}
                  onLike={handleLike}
                />
              </div>
            ))}
          </div>
        )}

        {/* स्टेटिस्टिक्स */}
        <div className="mt-12 text-center">
          <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 border border-gray-200/60 shadow-sm max-w-2xl mx-auto">
            <h3 className="font-semibold text-gray-900 mb-6">गैलरी सांख्यिकी</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
              <div>
                <div className="text-3xl font-bold text-blue-600">{PHOTOS.length}</div>
                <div className="text-gray-600">कुल तस्वीरें</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-green-600">
                  {PHOTOS.reduce((sum, photo) => sum + photo.likes, 0)}
                </div>
                <div className="text-gray-600">पसंद</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-amber-600">
                  {PHOTOS.reduce((sum, photo) => sum + photo.downloads, 0)}
                </div>
                <div className="text-gray-600">डाउनलोड</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-purple-600">
                  {CATEGORIES.length - 1}
                </div>
                <div className="text-gray-600">श्रेणियाँ</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* लाइटबॉक्स */}
      <Lightbox
        photo={selectedPhoto}
        isOpen={isLightboxOpen}
        onClose={closeLightbox}
        onNext={goToNext}
        onPrev={goToPrev}
        hasNext={hasNext}
        hasPrev={hasPrev}
      />

      {/* फूटर */}
      <footer className="bg-white/70 backdrop-blur-sm border-t border-gray-200/60 mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6">
          <div className="text-center">
            <p className="text-gray-600 text-sm">
              © 2024 फोटो गैलरी - सुंदर क्षणों को संजोते हुए
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

export default PhotoGallery;