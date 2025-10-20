"use client"
// app/components/ArticlePage.jsx
import Head from "next/head";
import Image from "next/image";
import { useEffect, useState } from "react";
import { Facebook, Twitter, Share2, Clock, Calendar, User, Menu, X } from "lucide-react";

/**
 * Fully Responsive Article Page with enhanced mobile experience
 * - Mobile-first responsive design
 * - Touch-friendly interactive elements
 * - Optimized typography for all screen sizes
 * - Collapsible navigation for mobile
 */

export default function ArticlePage() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [progress, setProgress] = useState(0);

  // Enhanced article data with comprehensive content
  const article = {
    title: "चंद्रयान-4: भारत का अगला महत्वाकांक्षी चंद्र मिशन - पूरी जानकारी और विश्लेषण",
    subtitle: "चंद्रमा से नमूना वापसी से लेकर सतह पर स्थायी प्रयोगशाला स्थापित करने तक - जानिए इसरो की अगली बड़ी योजना के बारे में सब कुछ",
    category: "विज्ञान एवं प्रौद्योगिकी",
    author: { 
      name: "डॉ. आलोक सिंह", 
      url: "#",
      bio: "अंतरिक्ष विज्ञान विशेषज्ञ और इसरो के पूर्व वैज्ञानिक",
      image: "/author-alok.jpg"
    },
    datePublished: "2025-07-23",
    readTime: "12 मिनट पढ़ा",
    url: "https://hmarduniya.example/articles/chandrayaan-4",
    heroImage: {
      src: "https://images.pexels.com/photos/1769356/pexels-photo-1769356.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      alt: "चंद्रमा की सतह और पृथ्वी का मनमोहक दृश्य",
      caption: "चंद्रमा की सतह का एक विस्तृत दृश्य जहाँ भविष्य के मिशन संचालित होंगे। (प्रतीकात्मक चित्र)",
      width: 1200,
      height: 700,
    },
    content: [
      {
        type: "paragraph",
        text: "चंद्रयान-3 की ऐतिहासिक सफलता के बाद भारतीय अंतरिक्ष अनुसंधान संगठन (ISRO) ने अपना नजर अब चंद्रयान-4 पर केंद्रित कर लिया है। यह मिशन न केवल भारत के लिए बल्कि वैश्विक अंतरिक्ष अनुसंधान के लिए एक मील का पत्थर साबित होगा। चंद्रयान-4 का प्राथमिक लक्ष्य चंद्रमा की सतह से नमूने एकत्र कर उन्हें पृथ्वी पर वापस लाना है, जो भारत की तकनीकी क्षमताओं में एक महत्वपूर्ण छलांग होगी।"
      },
      {
        type: "heading",
        text: "चंद्रयान-4 मिशन का व्यापक दृष्टिकोण"
      },
      {
        type: "paragraph",
        text: "चंद्रयान-4 मिशन को इसरो की सबसे जटिल और चुनौतीपूर्ण परियोजनाओं में से एक माना जा रहा है। इस मिशन में एक ऑर्बिटर, एक लैंडर, एक रोवर और एक एसेंट मॉड्यूल शामिल होंगे, जो मिलकर चंद्रमा की सतह से नमूने एकत्र करने और उन्हें पृथ्वी पर वापस लाने का कार्य करेंगे। यह मिशन न केवल वैज्ञानिक अनुसंधान के लिए महत्वपूर्ण है बल्कि भारत को अंतरिक्ष प्रौद्योगिकी के क्षेत्र में एक वैश्विक नेता के रूप में स्थापित करने में भी मदद करेगा।"
      },
      {
        type: "subheading",
        text: "मिशन के प्रमुख उद्देश्य"
      },
      {
        type: "paragraph",
        text: "चंद्रयान-4 के मुख्य उद्देश्यों में चंद्रमा की सतह की रासायनिक संरचना का विस्तृत अध्ययन, खनिज संसाधनों का मापन, जल बर्फ की उपस्थिति की पुष्टि, और चंद्रमा के आंतरिक संरचना का विश्लेषण शामिल है। इसके अलावा, यह मिशन भविष्य में चंद्रमा पर मानव बस्तियों की संभावनाओं का मार्ग भी प्रशस्त करेगा।"
      },
      {
        type: "heading",
        text: "मिशन का तकनीकी विन्यास और संरचना"
      },
      {
        type: "paragraph",
        text: "चंद्रयान-4 एक जटिल और बहु-चरणीय मिशन होगा जिसमें कई उन्नत तकनीकी घटक शामिल होंगे। मिशन का कुल वजन लगभग 4000 किलोग्राम होने का अनुमान है, जो इसे भारत का अब तक का सबसे भारी चंद्र मिशन बनाएगा।"
      },
      {
        type: "subheading",
        text: "प्रमुख तकनीकी घटक"
      },
      {
        type: "paragraph",
        text: "1. ऑर्बिटर मॉड्यूल: यह मिशन का मुख्य नियंत्रण केंद्र होगा जो चंद्रमा की कक्षा में स्थापित किया जाएगा। इसमें उच्च-रिज़ॉल्यूशन कैमरे, स्पेक्ट्रोमीटर और अन्य वैज्ञानिक उपकरण लगे होंगे।\n\n2. लैंडर मॉड्यूल: यह चंद्रमा की सतह पर सॉफ्ट लैंडिंग करेगा और रोवर को तैनात करेगा। इसमें थ्रस्टर्स, सेंसर्स और नेविगेशन सिस्टम का उन्नत संयोजन होगा।\n\n3. रोवर: यह स्वचालित वाहन चंद्रमा की सतह पर घूमकर विभिन्न प्रकार के नमूने एकत्र करेगा।\n\n4. एसेंट मॉड्यूल: यह नमूनों से भरा कैप्सूल चंद्रमा की सतह से उड़ान भरकर ऑर्बिटर से जुड़ेगा और फिर पृथ्वी पर वापस आएगा।"
      },
      // ... (remaining content remains the same as previous version)
    ],
    tags: ["इसरो", "अंतरिक्ष", "चंद्रयान-4", "भारतीय अंतरिक्ष कार्यक्रम", "विज्ञान", "प्रौद्योगिकी"],
    relatedPosts: [
      {
        id: 1,
        title: "गगनयान मिशन: भारत का पहला मानवयुक्त अंतरिक्ष अभियान कब लॉन्च होगा?",
        image: "https://images.pexels.com/photos/5439/earth-space.jpg?auto=compress&cs=tinysrgb&w=400",
        link: "#",
        category: "मानव अंतरिक्ष उड़ान"
      },
      {
        id: 2,
        title: "मंगलयान-2: भारत के अगले मंगल मिशन की तैयारियाँ और नई रणनीतियाँ",
        image: "https://images.pexels.com/photos/58603/mars-mars-rover-space-travel-robot-58603.jpeg?auto=compress&cs=tinysrgb&w=400",
        link: "#",
        category: "मंगल मिशन"
      },
      {
        id: 3,
        title: "एडिटिया L1 मिशन: सूर्य का अध्ययन करने वाला भारत का पहला उपग्रह",
        image: "https://images.pexels.com/photos/2150/sky-space-dark-galaxy.jpg?auto=compress&cs=tinysrgb&w=400",
        link: "#",
        category: "सौर अध्ययन"
      },
    ],
  };

  // Reading progress tracking
  useEffect(() => {
    const onScroll = () => {
      const articleEl = document.getElementById("article-body");
      if (!articleEl) return setProgress(0);
      const rect = articleEl.getBoundingClientRect();
      const winH = window.innerHeight;
      const total = articleEl.scrollHeight - winH;
      const scrolled = Math.min(Math.max(window.scrollY - articleEl.offsetTop + 120, 0), total || 1);
      const pct = total > 0 ? Math.round((scrolled / total) * 100) : 0;
      setProgress(Math.min(Math.max(pct, 0), 100));
    };
    
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  // Content rendering helpers with responsive classes
  const renderBlock = (block, i) => {
    if (block.type === "heading") {
      return (
        <h2 
          key={i} 
          className="text-2xl md:text-3xl font-bold mt-8 md:mt-12 mb-4 md:mb-6 text-gray-900 border-l-4 border-blue-500 pl-3 md:pl-4"
        >
          {block.text}
        </h2>
      );
    }
    if (block.type === "subheading") {
      return (
        <h3 
          key={i} 
          className="text-xl md:text-2xl font-semibold mt-6 md:mt-8 mb-3 md:mb-4 text-gray-800"
        >
          {block.text}
        </h3>
      );
    }
    if (block.type === "paragraph") {
      return (
        <p 
          key={i} 
          className="text-base md:text-lg leading-relaxed md:leading-loose text-gray-700 mb-4 md:mb-6"
        >
          {block.text.split('\n').map((line, idx) => (
            <span key={idx}>
              {line}
              {idx < block.text.split('\n').length - 1 && <br />}
            </span>
          ))}
        </p>
      );
    }
    if (block.type === "blockquote") {
      return (
        <blockquote 
          key={i} 
          className="pl-4 md:pl-6 border-l-4 border-blue-400 italic text-lg md:text-xl text-gray-800 bg-blue-50 py-3 md:py-4 my-6 md:my-8 rounded-r-lg"
        >
          {block.text}
        </blockquote>
      );
    }
    return null;
  };

  // Enhanced Related card component with responsive design
  const RelatedCard = ({ post }) => (
    <a 
      href={post.link} 
      className="flex items-start gap-3 md:gap-4 group bg-white rounded-lg p-3 md:p-4 shadow-sm hover:shadow-md transition-shadow duration-300 border border-gray-100"
    >
      <div className="w-16 h-12 md:w-20 md:h-16 rounded-md overflow-hidden flex-shrink-0 bg-gray-100">
        <Image 
          src={post.image} 
          alt={post.title} 
          width={80} 
          height={64} 
          className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-300" 
        />
      </div>
      <div className="flex-1 min-w-0">
        <span className="text-xs font-medium text-blue-600 bg-blue-50 px-2 py-1 rounded-full">
          {post.category}
        </span>
        <h4 className="text-sm font-semibold text-gray-900 mt-1 line-clamp-2 group-hover:text-blue-600 transition-colors">
          {post.title}
        </h4>
      </div>
    </a>
  );

  // Share functionality
  const shareUrl = encodeURIComponent(article.url);
  const shareText = encodeURIComponent(article.title + " — hmarduniya");

  return (
    <>
      <Head>
        <title>{article.title} | hmarduniya - विज्ञान और प्रौद्योगिकी का विश्वसनीय स्रोत</title>
        <meta name="description" content={article.subtitle} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="keywords" content="चंद्रयान-4, इसरो, भारतीय अंतरिक्ष कार्यक्रम, चंद्रमा मिशन, नमूना वापसी, अंतरिक्ष विज्ञान" />
        <meta name="author" content={article.author.name} />
        <meta property="og:title" content={article.title} />
        <meta property="og:description" content={article.subtitle} />
        <meta property="og:image" content={article.heroImage.src} />
        <meta property="og:url" content={article.url} />
        <meta property="og:type" content="article" />
        <meta property="article:published_time" content={article.datePublished} />
        <meta property="article:author" content={article.author.name} />
        <meta property="article:section" content={article.category} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={article.title} />
        <meta name="twitter:description" content={article.subtitle} />
        <meta name="twitter:image" content={article.heroImage.src} />
        <link rel="canonical" href={article.url} />
      </Head>

      {/* Mobile Navigation Overlay */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 lg:hidden">
          <div className="absolute right-4 top-4">
            <button 
              onClick={() => setIsMobileMenuOpen(false)}
              className="bg-white rounded-full p-2 shadow-lg"
            >
              <X size={24} />
            </button>
          </div>
        </div>
      )}

      {/* Enhanced Progress bar */}
      <div className="fixed top-0 left-0 right-0 h-1 z-40 bg-gray-100">
        <div 
          style={{ width: `${progress}%` }} 
          className="h-1 bg-gradient-to-r from-blue-500 to-blue-600 transition-all duration-150 shadow-lg" 
        />
      </div>

      {/* Mobile Header */}
    

      <main className="bg-gradient-to-br from-blue-50 to-white min-h-screen py-6 md:py-8 lg:py-12">
        <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 md:gap-8 lg:gap-10">
            {/* Main Article Content */}
            <article className="lg:col-span-8">
              <header className="mb-6 md:mb-8 bg-white rounded-xl md:rounded-2xl p-4 md:p-6 lg:p-8 shadow-sm border border-gray-100">
                <div className="flex flex-wrap items-center gap-2 mb-3 md:mb-4">
                  <span className="bg-blue-100 text-blue-700 text-xs md:text-sm font-semibold px-2 md:px-3 py-1 rounded-full">
                    {article.category}
                  </span>
                  <div className="flex items-center gap-2 text-xs md:text-sm text-gray-500">
                    <Clock size={12} className="md:size-14" />
                    <span>{article.readTime}</span>
                  </div>
                </div>
                
                <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 leading-tight mb-3 md:mb-4">
                  {article.title}
                </h1>
                
                <p className="text-lg md:text-xl text-gray-700 leading-relaxed mb-4 md:mb-6">
                  {article.subtitle}
                </p>

                {/* Enhanced Author Info - Responsive */}
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pt-4 md:pt-6 border-t border-gray-100">
                  <div className="flex items-center gap-3 md:gap-4">
                    <div className="w-10 h-10 md:w-12 md:h-12 lg:w-14 lg:h-14 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center text-white font-bold text-sm md:text-base lg:text-lg shadow-md">
                      {article.author.name.split(" ").map(n => n[0]).slice(0,2).join("")}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <User size={14} className="text-gray-400 flex-shrink-0" />
                        <div className="font-semibold text-gray-900 text-sm md:text-base truncate">
                          {article.author.name}
                        </div>
                      </div>
                      <div className="text-xs md:text-sm text-gray-600 mt-1 line-clamp-1">
                        {article.author.bio}
                      </div>
                      <div className="flex items-center gap-2 text-xs text-gray-500 mt-1">
                        <Calendar size={12} />
                        <time dateTime={article.datePublished}>
                          {new Date(article.datePublished).toLocaleDateString("hi-IN", { 
                            day: "numeric", 
                            month: "long", 
                            year: "numeric" 
                          })}
                        </time>
                      </div>
                    </div>
                  </div>

                  {/* Social Share Buttons - Responsive */}
                  <div className="flex items-center gap-2 md:gap-3">
                    <span className="text-xs md:text-sm text-gray-500 font-medium hidden sm:block">
                      शेयर करें:
                    </span>
                    <div className="flex items-center gap-1 md:gap-2">
                      <a 
                        href={`https://www.facebook.com/sharer/sharer.php?u=${shareUrl}`} 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 hover:bg-blue-600 hover:text-white transition-all duration-200 shadow-sm"
                        aria-label="Facebook पर शेयर करें"
                      >
                        <Facebook size={14} className="md:size-18" />
                      </a>
                      <a 
                        href={`https://twitter.com/intent/tweet?text=${shareText}&url=${shareUrl}`} 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 hover:bg-blue-600 hover:text-white transition-all duration-200 shadow-sm"
                        aria-label="Twitter पर शेयर करें"
                      >
                        <Twitter size={14} className="md:size-18" />
                      </a>
                      <button 
                        onClick={() => {
                          navigator.clipboard?.writeText(article.url);
                          // Add toast notification here in real implementation
                        }}
                        className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 hover:bg-blue-600 hover:text-white transition-all duration-200 shadow-sm"
                        aria-label="लिंक कॉपी करें"
                      >
                        <Share2 size={14} className="md:size-18" />
                      </button>
                    </div>
                  </div>
                </div>
              </header>

              {/* Hero Image with Enhanced Responsive Styling */}
              <figure className="mb-6 md:mb-8 bg-white rounded-xl md:rounded-2xl overflow-hidden shadow-sm border border-gray-100">
                <div className="relative aspect-video md:aspect-auto">
                  <Image 
                    src={article.heroImage.src} 
                    alt={article.heroImage.alt} 
                    width={article.heroImage.width} 
                    height={article.heroImage.height} 
                    className="w-full h-full object-cover"
                    priority 
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 30vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                </div>
                {article.heroImage.caption && (
                  <figcaption className="px-4 md:px-6 py-3 md:py-4 text-xs md:text-sm text-gray-600 bg-gray-50 border-t border-gray-100">
                    {article.heroImage.caption}
                  </figcaption>
                )}
              </figure>

              {/* Article Body with Improved Responsive Typography */}
              <div id="article-body" className="bg-white rounded-xl md:rounded-2xl p-4 md:p-6 lg:p-8 shadow-sm border border-gray-100">
                <div className="max-w-3xl mx-auto">
                  {article.content.map((b, i) => renderBlock(b, i))}
                </div>

                {/* Enhanced Tags Section - Responsive */}
                <div className="mt-8 md:mt-12 pt-6 md:pt-8 border-t border-gray-100">
                  <h3 className="text-base md:text-lg font-semibold text-gray-900 mb-3 md:mb-4">टैग्स:</h3>
                  <div className="flex flex-wrap gap-2 md:gap-3">
                    {article.tags.map((t) => (
                      <a 
                        key={t} 
                        href={`/?tag=${encodeURIComponent(t)}`} 
                        className="px-3 py-1 md:px-4 md:py-2 rounded-full bg-gray-100 text-gray-700 hover:bg-blue-100 hover:text-blue-700 transition-all duration-200 text-xs md:text-sm font-medium shadow-sm"
                      >
                        #{t}
                      </a>
                    ))}
                  </div>
                </div>
              </div>

              {/* Footer */}
              <div className="mt-6 md:mt-8 text-center text-xs md:text-sm text-gray-500 px-4">
                © {new Date().getFullYear()} hmarduniya - सभी अधिकार सुरक्षित। यह लेख शैक्षिक उद्देश्यों के लिए तैयार किया गया है।
              </div>
            </article>

            {/* Enhanced Sidebar - Responsive */}
            <aside className="lg:col-span-4">
              <div className="sticky top-20 lg:top-24 space-y-4 md:space-y-6">
                {/* Related Posts */}
                <div className="bg-white rounded-xl md:rounded-2xl shadow-sm border border-gray-100 p-4 md:p-6">
                  <h3 className="text-lg md:text-xl font-bold text-gray-900 mb-3 md:mb-4 pb-2 md:pb-3 border-b border-gray-100">
                    संबंधित लेख
                  </h3>
                  <div className="space-y-3 md:space-y-4">
                    {article.relatedPosts.map((p) => (
                      <RelatedCard key={p.id} post={p} />
                    ))}
                  </div>
                </div>

                {/* Share Widget - Responsive */}
                <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl md:rounded-2xl p-4 md:p-6 text-white">
                  <h3 className="text-base md:text-lg font-bold mb-2 md:mb-3">यह लेख शेयर करें</h3>
                  <p className="text-blue-100 text-xs md:text-sm mb-3 md:mb-4">
                    इस जानकारी को और लोगों तक पहुँचाने में मदद करें
                  </p>
                  <div className="grid grid-cols-2 gap-2 md:flex md:flex-wrap md:gap-2">
                    <a 
                      href={`https://www.facebook.com/sharer/sharer.php?u=${shareUrl}`} 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-lg px-3 py-2 text-center transition-all duration-200 text-xs md:text-sm font-medium"
                    >
                      Facebook
                    </a>
                    <a 
                      href={`https://twitter.com/intent/tweet?text=${shareText}&url=${shareUrl}`} 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-lg px-3 py-2 text-center transition-all duration-200 text-xs md:text-sm font-medium"
                    >
                      Twitter
                    </a>
                    <button 
                      onClick={() => navigator.clipboard?.writeText(article.url)} 
                      className="bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-lg px-3 py-2 text-center transition-all duration-200 text-xs md:text-sm font-medium col-span-2 md:col-span-1"
                    >
                      लिंक कॉपी
                    </button>
                  </div>
                </div>

                {/* Newsletter Signup - Responsive */}
                <div className="bg-white rounded-xl md:rounded-2xl shadow-sm border border-gray-100 p-4 md:p-6">
                  <h3 className="text-base md:text-lg font-bold text-gray-900 mb-2">न्यूज़लेटर सब्सक्राइब करें</h3>
                  <p className="text-gray-600 text-xs md:text-sm mb-3 md:mb-4">
                    विज्ञान और तकनीक की नवीनतम जानकारी सीधे अपने इनबॉक्स में पाएं
                  </p>
                  <div className="space-y-2 md:space-y-3">
                    <input 
                      type="email" 
                      placeholder="आपका ईमेल पता" 
                      className="w-full px-3 md:px-4 py-2 md:py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all text-sm md:text-base"
                    />
                    <button className="w-full bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 md:py-3 rounded-lg transition-all duration-200 shadow-sm text-sm md:text-base">
                      सब्सक्राइब करें
                    </button>
                  </div>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </main>

      {/* Mobile Bottom Navigation */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-3 z-30">
        <div className="flex justify-around items-center">
          <button className="flex flex-col items-center gap-1 text-gray-600">
            <div className="w-6 h-6 bg-gray-200 rounded"></div>
            <span className="text-xs">होम</span>
          </button>
          <button className="flex flex-col items-center gap-1 text-gray-600">
            <div className="w-6 h-6 bg-gray-200 rounded"></div>
            <span className="text-xs">खोजें</span>
          </button>
          <button className="flex flex-col items-center gap-1 text-blue-600">
            <div className="w-6 h-6 bg-blue-100 rounded"></div>
            <span className="text-xs">पढ़ें</span>
          </button>
          <button className="flex flex-col items-center gap-1 text-gray-600">
            <div className="w-6 h-6 bg-gray-200 rounded"></div>
            <span className="text-xs">बचाये</span>
          </button>
        </div>
      </div>
    </>
  );
}