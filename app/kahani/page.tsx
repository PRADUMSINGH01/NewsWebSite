"use client";

import React, { useState, useMemo } from "react";
import {
  BookOpen,
  Clock,
  User,
  Heart,
  Share2,
  Bookmark,
  ChevronLeft,
  ChevronRight,
  Home,
  Search,
  Filter,
} from "lucide-react";

type Story = {
  id: number;
  title: string;
  author: string;
  content: string[];
  category: string;
  readTime: number;
  likes: number;
  publishedDate: string;
  moral: string;
  ageGroup: string;
  featured: boolean;
  tags: string[];
};

const SAMPLE_STORIES: Story[] = [
  {
    id: 1,
    title: "लालच का फल",
    author: "रविन्द्र नाथ टैगोर",
    content: [
      "एक गाँव में एक किसान रहता था। उसके पास एक छोटा सा खेत था जिसमें वह अनाज उगाता था। एक दिन उसे खेत में एक जादुई घड़ा मिला।",
      "घड़े से एक देवता प्रकट हुए और बोले, 'तुम्हें इस घड़े से जो भी चाहिए मिल सकता है, लेकिन याद रहे, लालच बुरी बला है।'",
      "किसान ने पहले तो थोड़ा सा अनाज माँगा। घड़े से अनाज भर गया। फिर उसने सोना माँगा। घड़ा सोने से भर गया।",
      "धीरे-धीरे किसान लालची होता गया। उसने और भी सोना माँगा। अचानक घड़ा गायब हो गया और सारा सोना भी गायब हो गया।",
      "किसान को समझ आया कि लालच का कोई फल नहीं होता। वह वापस मेहनत से खेती करने लगा और खुशहाल जीवन जीने लगा।"
    ],
    category: "नैतिक कहानी",
    readTime: 4,
    likes: 234,
    publishedDate: "2024-01-15",
    moral: "लालच बुरी बला है",
    ageGroup: "सभी उम्र",
    featured: true,
    tags: ["नैतिक", "लालच", "किसान"]
  },
  {
    id: 2,
    title: "बुद्धिमान बंदर",
    author: "प्रेमचंद",
    content: [
      "एक जंगल में बहुत सारे बंदर रहते थे। एक दिन उन्हें एक पेड़ पर बहुत सारे केले लगे हुए दिखे।",
      "केले बहुत ऊँचे थे और कोई भी बंदर उन तक नहीं पहुँच पा रहा था। सभी बंदर हैरान थे।",
      "तभी एक बूढ़ा बंदर बोला, 'क्यों न हम सब मिलकर एक पिरामिड बनाएं?'",
      "सभी बंदरों ने मिलकर एक दूसरे के कंधों पर चढ़कर पिरामिड बनाया और केले तोड़कर खाए।",
      "इस कहानी से हमें सीख मिलती है कि एकता में बहुत ताकत होती है।"
    ],
    category: "जानवरों की कहानी",
    readTime: 3,
    likes: 189,
    publishedDate: "2024-01-10",
    moral: "एकता में बल है",
    ageGroup: "बच्चे",
    featured: false,
    tags: ["एकता", "बंदर", "जंगल"]
  },
  {
    id: 3,
    title: "सच्ची मित्रता",
    author: "महादेवी वर्मा",
    content: [
      "राजू और सोहन बचपन के दोस्त थे। वे हमेशा साथ रहते थे और एक दूसरे की मदद करते थे।",
      "एक दिन राजू बीमार पड़ गया। सोहन ने उसकी देखभाल की और डॉक्टर को बुलाया।",
      "राजू के ठीक होने पर सोहन ने उसे अपनी बचत से उपहार दिया। राजू की आँखों में आँसू आ गए।",
      "उसने कहा, 'सच्चा दोस्त वही होता है जो मुसीबत के समय काम आए।'",
      "दोनों की दोस्ती और मजबूत हो गई और वे आजीवन दोस्त बने रहे।"
    ],
    category: "मित्रता",
    readTime: 5,
    likes: 312,
    publishedDate: "2024-01-08",
    moral: "सच्चा मित्र ही संकट में काम आता है",
    ageGroup: "किशोर",
    featured: true,
    tags: ["मित्रता", "सच्चाई", "बचपन"]
  },
  {
    id: 4,
    title: "मेहनत का फल",
    author: "हरिवंश राय बच्चन",
    content: [
      "एक गाँव में रामू नाम का एक लड़का रहता था। वह बहुत गरीब था लेकिन मेहनती था।",
      "रामू सुबह जल्दी उठकर खेत में काम करता और शाम को पढ़ाई करता।",
      "उसके माता-पिता ने उसे पढ़ने के लिए शहर भेजा। रामू ने मेहनत से पढ़ाई की और इंजीनियर बन गया।",
      "वह अपने माता-पिता को गाँव से शहर ले आया और उनकी अच्छे से देखभाल की।",
      "मेहनत और लगन से इंसान कुछ भी हासिल कर सकता है।"
    ],
    category: "प्रेरणादायक",
    readTime: 4,
    likes: 267,
    publishedDate: "2024-01-05",
    moral: "मेहनत का फल मीठा होता है",
    ageGroup: "सभी उम्र",
    featured: false,
    tags: ["मेहनत", "सफलता", "प्रेरणा"]
  },
  {
    id: 5,
    title: "अहंकार का अंत",
    author: "जयशंकर प्रसाद",
    content: [
      "एक राजा था जो बहुत अहंकारी था। वह सोचता था कि वह दुनिया का सबसे ताकतवर व्यक्ति है।",
      "एक दिन एक साधु ने उसे समझाया कि अहंकार मनुष्य का सबसे बड़ा शत्रु है।",
      "राजा ने साधु की बात नहीं मानी। कुछ दिनों बाद राजा का राज्य दुश्मनों ने घेर लिया।",
      "कोई भी राजा की मदद के लिए नहीं आया क्योंकि उसने सबके साथ बुरा व्यवहार किया था।",
      "राजा को अपनी गलती का एहसास हुआ और उसने सबसे माफी माँगी। तब सबने मिलकर दुश्मनों को हराया।"
    ],
    category: "ऐतिहासिक",
    readTime: 6,
    likes: 198,
    publishedDate: "2024-01-03",
    moral: "अहंकार मनुष्य का सबसे बड़ा शत्रु है",
    ageGroup: "वयस्क",
    featured: false,
    tags: ["अहंकार", "राजा", "सीख"]
  }
];

const StoryCard = ({ story, onRead }: { story: Story; onRead: (story: Story) => void }) => {
  const [isLiked, setIsLiked] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(false);

  const handleLike = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsLiked(!isLiked);
  };

  const handleBookmark = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsBookmarked(!isBookmarked);
  };

  return (
    <div 
      onClick={() => onRead(story)}
      className="bg-white rounded-lg border border-gray-200 overflow-hidden hover:shadow-lg transition-all duration-300 cursor-pointer group"
    >
      <div className="p-6">
        <div className="flex items-center justify-between mb-3">
          <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
            {story.category}
          </span>
          {story.featured && (
            <span className="bg-red-100 text-red-800 px-2 py-1 rounded text-xs font-medium">
              Featured
            </span>
          )}
        </div>

        <h3 className="font-bold text-gray-900 mb-3 text-lg leading-tight group-hover:text-blue-600 transition-colors">
          {story.title}
        </h3>

        <p className="text-gray-600 text-sm mb-4 line-clamp-2">
          {story.content[0]}
        </p>

        <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1">
              <User size={14} />
              <span>{story.author}</span>
            </div>
            <div className="flex items-center gap-1">
              <Clock size={14} />
              <span>{story.readTime} min</span>
            </div>
          </div>
          <span className="bg-green-100 text-green-800 px-2 py-1 rounded text-xs">
            {story.ageGroup}
          </span>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button
              onClick={handleLike}
              className={`flex items-center gap-1 text-sm ${
                isLiked ? "text-red-600" : "text-gray-500"
              }`}
            >
              <Heart size={16} fill={isLiked ? "currentColor" : "none"} />
              {story.likes + (isLiked ? 1 : 0)}
            </button>
            <button className="flex items-center gap-1 text-sm text-gray-500">
              <Share2 size={16} />
            </button>
          </div>
          <button
            onClick={handleBookmark}
            className={`${isBookmarked ? "text-blue-600" : "text-gray-500"}`}
          >
            <Bookmark size={16} fill={isBookmarked ? "currentColor" : "none"} />
          </button>
        </div>
      </div>
    </div>
  );
};

const StoryReader = ({ story, onBack }: { story: Story; onBack: () => void }) => {
  const [currentPage, setCurrentPage] = useState(0);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [isLiked, setIsLiked] = useState(false);

  const totalPages = story.content.length;

  const nextPage = () => {
    if (currentPage < totalPages - 1) {
      setCurrentPage(currentPage + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8">
      <div className="max-w-4xl mx-auto px-4">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <button
            onClick={onBack}
            className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors"
          >
            <ChevronLeft size={20} />
            वापस
          </button>
          <div className="flex items-center gap-4">
            <button
              onClick={() => setIsLiked(!isLiked)}
              className={`flex items-center gap-1 ${
                isLiked ? "text-red-600" : "text-gray-600"
              }`}
            >
              <Heart size={20} fill={isLiked ? "currentColor" : "none"} />
              <span>{story.likes + (isLiked ? 1 : 0)}</span>
            </button>
            <button
              onClick={() => setIsBookmarked(!isBookmarked)}
              className={isBookmarked ? "text-blue-600" : "text-gray-600"}
            >
              <Bookmark size={20} fill={isBookmarked ? "currentColor" : "none"} />
            </button>
          </div>
        </div>

        {/* Story Content */}
        <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
          <div className="text-center mb-8">
            <span className="bg-blue-100 text-blue-800 px-4 py-2 rounded-full text-sm font-medium mb-4 inline-block">
              {story.category}
            </span>
            <h1 className="text-3xl font-bold text-gray-900 mb-4">{story.title}</h1>
            <div className="flex items-center justify-center gap-6 text-gray-600 mb-2">
              <div className="flex items-center gap-1">
                <User size={16} />
                <span>{story.author}</span>
              </div>
              <div className="flex items-center gap-1">
                <Clock size={16} />
                <span>{story.readTime} मिनट</span>
              </div>
            </div>
          </div>

          {/* Page Content */}
          <div className="prose prose-lg max-w-none mb-8">
            <div className="text-gray-800 leading-relaxed text-justify text-lg">
              {story.content[currentPage]}
            </div>
          </div>

          {/* Pagination */}
          <div className="flex items-center justify-between pt-8 border-t border-gray-200">
            <button
              onClick={prevPage}
              disabled={currentPage === 0}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
                currentPage === 0
                  ? "text-gray-400 cursor-not-allowed"
                  : "text-blue-600 hover:bg-blue-50"
              }`}
            >
              <ChevronLeft size={20} />
              पिछला
            </button>

            <div className="flex items-center gap-2">
              {Array.from({ length: totalPages }).map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentPage(index)}
                  className={`w-3 h-3 rounded-full transition-colors ${
                    currentPage === index ? "bg-blue-600" : "bg-gray-300"
                  }`}
                />
              ))}
            </div>

            <button
              onClick={nextPage}
              disabled={currentPage === totalPages - 1}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
                currentPage === totalPages - 1
                  ? "text-gray-400 cursor-not-allowed"
                  : "text-blue-600 hover:bg-blue-50"
              }`}
            >
              अगला
              <ChevronRight size={20} />
            </button>
          </div>
        </div>

        {/* Moral of the Story */}
        {currentPage === totalPages - 1 && (
          <div className="bg-yellow-50 border border-yellow-200 rounded-2xl p-6">
            <h3 className="font-semibold text-yellow-800 mb-2 flex items-center gap-2">
              <BookOpen size={20} />
              कहानी की सीख
            </h3>
            <p className="text-yellow-700">{story.moral}</p>
          </div>
        )}
      </div>
    </div>
  );
};

const SearchAndFilter = ({
  searchQuery,
  onSearchChange,
  selectedCategory,
  onCategoryChange,
}: {
  searchQuery: string;
  onSearchChange: (value: string) => void;
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
}) => {
  const categories = ["सभी", ...Array.from(new Set(SAMPLE_STORIES.map(story => story.category)))];

  return (
    <div className="space-y-4 mb-8">
      {/* Search Bar */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="कहानी खोजें..."
          className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        />
      </div>

      {/* Category Filter */}
      <div className="flex flex-wrap gap-2">
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => onCategoryChange(category)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
              category === selectedCategory
                ? "bg-blue-600 text-white"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          >
            {category}
          </button>
        ))}
      </div>
    </div>
  );
};

export default function HindiKahani() {
  const [selectedStory, setSelectedStory] = useState<Story | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("सभी");

  const filteredStories = useMemo(() => {
    return SAMPLE_STORIES.filter((story) => {
      const matchesSearch = story.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          story.author.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          story.content.some(para => para.toLowerCase().includes(searchQuery.toLowerCase()));
      
      const matchesCategory = selectedCategory === "सभी" || story.category === selectedCategory;
      
      return matchesSearch && matchesCategory;
    });
  }, [searchQuery, selectedCategory]);

  if (selectedStory) {
    return <StoryReader story={selectedStory} onBack={() => setSelectedStory(null)} />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-6xl mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="bg-blue-600 text-white p-2 rounded-lg">
                <BookOpen size={24} />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">हिंदी कहानियाँ</h1>
                <p className="text-gray-600 text-sm">नैतिक और प्रेरणादायक कहानियों का संग्रह</p>
              </div>
            </div>
            <div className="text-sm text-gray-500">
              {filteredStories.length} कहानियाँ
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 py-8">
        {/* Search and Filter */}
        <SearchAndFilter
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          selectedCategory={selectedCategory}
          onCategoryChange={setSelectedCategory}
        />

        {/* Featured Stories */}
        {selectedCategory === "सभी" && (
          <div className="mb-8">
            <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
              <BookOpen size={20} />
              विशेष कहानियाँ
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {SAMPLE_STORIES.filter(story => story.featured).map((story) => (
                <StoryCard key={story.id} story={story} onRead={setSelectedStory} />
              ))}
            </div>
          </div>
        )}

        {/* All Stories */}
        <div>
          <h2 className="text-xl font-bold text-gray-900 mb-4">
            {selectedCategory === "सभी" ? "सभी कहानियाँ" : `${selectedCategory} कहानियाँ`}
          </h2>
          
          {filteredStories.length === 0 ? (
            <div className="text-center py-12">
              <BookOpen className="w-12 h-12 text-gray-300 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">कोई कहानी नहीं मिली</h3>
              <p className="text-gray-600 text-sm">
                {searchQuery ? `"${searchQuery}" के लिए कोई परिणाम नहीं मिले` : "कृपया अलग श्रेणी चुनें"}
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredStories.map((story) => (
                <StoryCard key={story.id} story={story} onRead={setSelectedStory} />
              ))}
            </div>
          )}
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t mt-12">
        <div className="max-w-6xl mx-auto px-4 py-6">
          <div className="text-center text-gray-600 text-sm">
            <p>© 2024 हिंदी कहानियाँ. सभी अधिकार सुरक्षित।</p>
            <p className="mt-1">नैतिक शिक्षा और मनोरंजन का बेहतरीन स्रोत</p>
          </div>
        </div>
      </footer>
    </div>
  );
}