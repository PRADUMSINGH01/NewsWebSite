// Add this line at the very top of the file
"use client";

import Image from "next/image";
import { useState } from "react";
import SubHome from "../components/SubHome";
// Helper component for icons to keep the main component cleaner
const Icon = ({ path, className = "w-5 h-5" }) => (
  <svg
    className={className}
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      d={path}
    />
  </svg>
);

export default function Home() {
  // 1. State to manage the selected category
  const [selectedCategory, setSelectedCategory] = useState("सभी");

  const newsArticles = [
    {
      id: 1,
      title: "टी20 विश्व कप 2024: भारत ने 17 साल बाद खिताब जीता",
      description:
        "बारबाडोस में खेले गए फाइनल मुकाबले में भारत ने दक्षिण अफ्रीका को 7 रनों से हराकर दूसरी बार टी20 विश्व कप का खिताब अपने नाम किया।",
      category: "खेल",
      date: "29 जून, 2024",
      image:
        "https://images.pexels.com/photos/163452/cricket-bat-ball-grass-163452.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      link: "#",
    },
    {
      id: 2,
      title:
        "नई सरकार का शपथ ग्रहण: नरेंद्र मोदी ने तीसरी बार प्रधानमंत्री पद की शपथ ली",
      description:
        "नरेंद्र मोदी ने अपने 71 मंत्रियों के साथ लगातार तीसरी बार प्रधानमंत्री पद की शपथ ली। इस समारोह में कई देशों के राष्ट्राध्यक्ष शामिल हुए।",
      category: "राजनीति",
      date: "9 जून, 2024",
      image:
        "https://images.pexels.com/photos/1559286/pexels-photo-1559286.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      link: "#",
    },
    {
      id: 3,
      title: "कल्कि 2898 एडी: बॉक्स ऑफिस पर रिकॉर्ड तोड़ कमाई",
      description:
        "प्रभास और दीपिका पादुकोण अभिनीत साइंस-फिक्शन फिल्म 'कल्कि 2898 एडी' ने दुनिया भर में बॉक्स ऑफिस पर शानदार शुरुआत की है।",
      category: "मनोरंजन",
      date: "5 जुलाई, 2024",
      image:
        "https://images.pexels.com/photos/7991579/pexels-photo-7991579.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      link: "#",
    },
    {
      id: 4,
      title: "भारतीय शेयर बाजार में बजट के बाद उछाल, सेंसेक्स 77,000 के पार",
      description:
        "केंद्रीय बजट 2024 की घोषणाओं के बाद निवेशकों में उत्साह देखा गया, जिससे सेंसेक्स और निफ्टी ने नए रिकॉर्ड स्तर बनाए।",
      category: "व्यापार",
      date: "23 जुलाई, 2024",
      image:
        "https://images.pexels.com/photos/7788657/pexels-photo-7788657.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      link: "#",
    },
    {
      id: 5,
      title:
        "ISRO का 'पुष्पक' विमान सफल लैंडिंग: भारत की अंतरिक्ष में एक और छलांग",
      description:
        "इसरो ने अपने रीयूजेबल लॉन्च व्हीकल (RLV) 'पुष्पक' का तीसरा सफल लैंडिंग प्रयोग पूरा किया। यह भारत को अंतरिक्ष प्रक्षेपण लागत कम करने में मदद करेगा।",
      category: "तकनीक",
      date: "23 जून, 2024",
      image:
        "https://images.pexels.com/photos/586056/pexels-photo-586056.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      link: "#",
    },
    {
      id: 6,
      title: "भारत में मानसून की प्रगति, कई राज्यों में भारी बारिश का अलर्ट",
      description:
        "मानसून अब पूरे देश में सक्रिय हो गया है। मौसम विभाग ने अगले कुछ दिनों में महाराष्ट्र, गुजरात और मध्य प्रदेश समेत कई राज्यों में भारी बारिश की चेतावनी जारी की है।",
      category: "मौसम",
      date: "15 जुलाई, 2024",
      image:
        "https://images.pexels.com/photos/459469/pexels-photo-459469.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      link: "#",
    },
  ];

  const categories = [
    "सभी",
    "खेल",
    "राजनीति",
    "मनोरंजन",
    "व्यापार",
    "तकनीक",
    "मौसम",
  ];

  // 2. Filter articles based on the selected category
  const filteredArticles = newsArticles.filter(
    (article) =>
      selectedCategory === "सभी" || article.category === selectedCategory
  );

  return (
    <div className="bg-slate-50 dark:bg-slate-900 text-slate-800 dark:text-slate-200">
      <SubHome />
      <div className="container mx-auto px-4 py-8 md:py-12">
        <header className="flex justify-between items-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold tracking-tight">
            ताजा खबरें
          </h1>
          <div className="flex items-center space-x-2">
            <button className="hidden sm:block px-4 py-2 text-sm font-semibold bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-300">
              सभी देखें
            </button>
            <button className="px-3 py-2 border border-slate-300 dark:border-slate-700 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors duration-300">
              <Icon path="M4 6h16M4 12h16m-7 6h7" className="w-5 h-5" />
            </button>
          </div>
        </header>

        {/* Featured News Banner */}
        <div className="mb-12 rounded-xl p-6 md:p-8 text-white relative overflow-hidden bg-gradient-to-r from-slate-900 to-slate-700">
          <div
            className="absolute inset-0 bg-cover bg-center opacity-20"
            style={{
              backgroundImage:
                "url('https://images.pexels.com/photos/586056/pexels-photo-586056.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1')",
            }}
          ></div>
          <div className="relative z-10 max-w-2xl">
            <span className="bg-white/10 backdrop-blur-sm px-3 py-1 rounded-full text-sm font-medium">
              मुख्य समाचार
            </span>
            <h2 className="text-2xl md:text-4xl font-bold mt-4 leading-tight">
              ISRO का नया कीर्तिमान: XPoSat मिशन सफलतापूर्वक लॉन्च
            </h2>
            <p className="mt-3 opacity-80">
              भारतीय अंतरिक्ष अनुसंधान संगठन (ISRO) ने PSLV-C58 रॉकेट से देश के
              पहले एक्स-रे पोलारिमीटर सैटेलाइट (XPoSat) को सफलतापूर्वक लॉन्च
              किया।
            </p>
            <button className="mt-6 px-6 py-2.5 bg-white text-blue-600 rounded-lg font-semibold hover:bg-slate-100 transition-colors duration-300 flex items-center group">
              पूरा पढ़ें
              <Icon
                path="M17 8l4 4m0 0l-4 4m4-4H3"
                className="w-5 h-5 ml-2 transition-transform duration-300 group-hover:translate-x-1"
              />
            </button>
          </div>
        </div>

        {/* News Categories */}
        <div className="flex overflow-x-auto pb-4 mb-8 -mx-4 px-4">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)} // 3. Set category on click
              className={`px-4 py-2 mr-3 whitespace-nowrap rounded-full text-sm font-semibold transition-colors duration-300 ${
                selectedCategory === cat
                  ? "bg-blue-600 text-white" // Active style
                  : "bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-300 dark:hover:bg-slate-700" // Inactive style
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* News Grid - 4. Map over the filtered list */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredArticles.map((article) => (
            <div
              key={article.id}
              className="bg-white dark:bg-slate-800/50 rounded-xl shadow-md hover:shadow-xl overflow-hidden border border-slate-200 dark:border-slate-700 transition-all duration-300 group"
            >
              <div className="relative w-full h-48 overflow-hidden">
                <Image
                  src={article.image}
                  alt={article.title}
                  layout="fill"
                  objectFit="cover"
                  className="transition-transform duration-300 group-hover:scale-105"
                />
              </div>

              <div className="p-5">
                <div className="flex justify-between items-center mb-3">
                  <span className="bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300 px-3 py-1 rounded-full text-xs font-semibold">
                    {article.category}
                  </span>
                  <span className="text-slate-500 dark:text-slate-400 text-xs font-medium">
                    {article.date}
                  </span>
                </div>

                <h2 className="text-lg font-bold mb-2 text-slate-900 dark:text-white line-clamp-2">
                  {article.title}
                </h2>
                <p className="text-slate-600 dark:text-slate-400 mb-4 line-clamp-3 text-sm leading-relaxed">
                  {article.description}
                </p>

                <div className="flex justify-between items-center mt-4">
                  <a
                    href={article.link}
                    className="text-blue-600 dark:text-blue-400 font-semibold hover:underline flex items-center text-sm group/link"
                  >
                    पूरा पढ़ें
                    <Icon
                      path="M14 5l7 7m0 0l-7 7m7-7H3"
                      className="w-4 h-4 ml-1 transition-transform duration-300 group-hover/link:translate-x-1"
                    />
                  </a>

                  <div className="flex space-x-1">
                    <button className="p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors">
                      <Icon path="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
                    </button>
                    <button className="p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors">
                      <Icon path="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
