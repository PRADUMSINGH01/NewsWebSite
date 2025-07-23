// app/components/SubHome.jsx

import Image from "next/image";

// Reusable "Read More" link
const ReadMoreLink = ({ href }) => (
  <a
    href={href}
    className="text-blue-600 dark:text-blue-400 font-semibold hover:underline flex items-center text-sm group mt-4"
  >
    पूरा पढ़ें
    <svg
      className="w-4 h-4 ml-1 transition-transform duration-300 group-hover:translate-x-1"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        d="M14 5l7 7m0 0l-7 7m7-7H3"
      />
    </svg>
  </a>
);

export default function SubHome() {
  const mainFeatureArticle = {
    title: "भारत में AI का भविष्य: अवसर और चुनौतियाँ",
    category: "विश्लेषण",
    author: "सुनीता शर्मा",
    date: "22 जुलाई, 2025",
    description:
      "आर्टिफिशियल इंटेलिजेंस (AI) भारत के तकनीकी परिदृश्य को तेजी से बदल रहा है। यह स्वास्थ्य सेवा से लेकर कृषि तक हर क्षेत्र में क्रांति लाने की क्षमता रखता है, लेकिन इसके साथ ही नैतिक और रोजगार संबंधी चुनौतियाँ भी हैं।",
    image:
      "https://images.pexels.com/photos/8386440/pexels-photo-8386440.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    link: "#",
  };

  const trendingArticles = [
    {
      id: 1,
      title: "इलेक्ट्रिक वाहनों पर नई सब्सिडी नीति की घोषणा, कीमतें होंगी कम",
      category: "व्यापार",
      image:
        "https://images.pexels.com/photos/3802607/pexels-photo-3802607.jpeg?auto=compress&cs=tinysrgb&w=160&h=160&fit=crop&dpr=1",
      link: "#",
    },
    {
      id: 2,
      title:
        "विशेषज्ञों ने आगामी त्योहारी सीजन के लिए नए स्वास्थ्य दिशानिर्देश जारी किए",
      category: "स्वास्थ्य",
      image:
        "https://images.pexels.com/photos/3992933/pexels-photo-3992933.jpeg?auto=compress&cs=tinysrgb&w=160&h=160&fit=crop&dpr=1",
      link: "#",
    },
    {
      id: 3,
      title:
        "क्या भारतीय टीम आगामी टेस्ट सीरीज के लिए तैयार है? एक गहन विश्लेषण।",
      category: "खेल",
      image:
        "https://images.pexels.com/photos/248547/pexels-photo-248547.jpeg?auto=compress&cs=tinysrgb&w=160&h=160&fit=crop&dpr=1",
      link: "#",
    },
    {
      id: 4,
      title:
        "वैश्विक अर्थव्यवस्था पर तनाव का असर, भारतीय बाजार पर क्या होगा प्रभाव?",
      category: "अंतर्राष्ट्रीय",
      image:
        "https://images.pexels.com/photos/210600/pexels-photo-210600.jpeg?auto=compress&cs=tinysrgb&w=160&h=160&fit=crop&dpr=1",
      link: "#",
    },
  ];

  return (
    <div className="bg-white dark:bg-slate-800/50 my-12 rounded-xl p-6 md:p-8 border border-slate-200 dark:border-slate-700">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column: Main Feature */}
        <div className="lg:col-span-2">
          <div className="relative w-full h-64 md:h-80 rounded-lg overflow-hidden mb-4 group">
            <Image
              src={mainFeatureArticle.image}
              alt={mainFeatureArticle.title}
              layout="fill"
              objectFit="cover"
              className="transition-transform duration-300 group-hover:scale-105"
            />
          </div>
          <span className="bg-amber-100 dark:bg-amber-900/30 text-amber-800 dark:text-amber-300 px-3 py-1 rounded-full text-xs font-semibold">
            {mainFeatureArticle.category}
          </span>
          <h2 className="text-2xl md:text-3xl font-bold my-3 text-slate-900 dark:text-white">
            {mainFeatureArticle.title}
          </h2>
          <p className="text-sm text-slate-500 dark:text-slate-400 mb-3">
            {mainFeatureArticle.author} द्वारा &bull; {mainFeatureArticle.date}
          </p>
          <p className="text-slate-600 dark:text-slate-300 line-clamp-3">
            {mainFeatureArticle.description}
          </p>
          <ReadMoreLink href={mainFeatureArticle.link} />
        </div>

        {/* Right Column: Trending List */}
        <div className="lg:col-span-1">
          <h3 className="text-xl font-bold text-slate-900 dark:text-white border-b-2 border-blue-600 pb-2 mb-4">
            सर्वाधिक पठित
          </h3>
          <div className="space-y-4">
            {trendingArticles.map((article) => (
              <a
                href={article.link}
                key={article.id}
                className="flex items-center gap-4 group"
              >
                <div className="relative w-20 h-20 rounded-md overflow-hidden flex-shrink-0">
                  <Image
                    src={article.image}
                    alt={article.title}
                    layout="fill"
                    objectFit="cover"
                  />
                </div>
                <div>
                  <span className="text-blue-600 dark:text-blue-400 text-xs font-semibold">
                    {article.category}
                  </span>
                  <h4 className="font-semibold text-slate-800 dark:text-slate-200 group-hover:underline line-clamp-2 leading-tight">
                    {article.title}
                  </h4>
                </div>
              </a>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
