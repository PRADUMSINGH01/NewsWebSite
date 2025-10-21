"use client";

import React, { useState, useEffect } from "react";
import { fetchCollection } from "@/components/server/fetchnews";
import ProfessionalLoader from "@/components/Loading";
import Link from "next/link";
import Footer from "@/components/Footer";
import Logo from "@/public/logo.png";
import Image from "next/image";
import AdBanner from "@/components/AdBanner";
import SimpleAd from "@/components/SimpleAd";
// import EffectiveGateAd from "@/components/EffectiveGateAd";
// import HighPerfAd from "@/components/HighPerfAd";
// --- SVG ICONS --- //
const HomeIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="h-6 w-6"
  >
    <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
    <polyline points="9 22 9 12 15 12 15 22"></polyline>
  </svg>
);
const SearchIcon = ({ className = "h-5 w-5" }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <circle cx="11" cy="11" r="8"></circle>
    <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
  </svg>
);
const BookmarkIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="h-6 w-6"
  >
    <path d="m19 21-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v16z"></path>
  </svg>
);
const MenuIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="h-6 w-6"
  >
    <line x1="4" x2="20" y1="12" y2="12"></line>
    <line x1="4" x2="20" y1="6" y2="6"></line>
    <line x1="4" x2="20" y1="18" y2="18"></line>
  </svg>
);
const GlobeIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="h-4 w-4"
  >
    <circle cx="12" cy="12" r="10"></circle>
    <line x1="2" y1="12" x2="22" y2="12"></line>
    <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path>
  </svg>
);

// --- SAMPLE DATA --- //
const SAMPLE_ARTICLES = [
  {
    id: 1,
    tag: "राजनीति",
    title: "संसद का मानसून सत्र: नए विधेयकों पर होगी गरमागरम बहस",
    excerpt:
      "सरकार इस सत्र में कई महत्वपूर्ण विधेयक पेश करने की तैयारी में है, विपक्ष ने भी अपनी रणनीति बना ली है।",
    author: "रवि प्रकाश",
    time: "2 घंटे पहले",
    img: "https://images.unsplash.com/photo-1602339257297-2519247c9e0d?auto=format&fit=crop&w=1600&q=80",
    credit: "Photo: Unsplash / A. L.",
    avatar: "https://i.pravatar.cc/48?img=1",
  },
  {
    id: 2,
    tag: "मनोरंजन",
    title: "सिनेमा का भविष्य: ओटीटी प्लेटफॉर्म्स और बड़े पर्दे की जंग",
    excerpt:
      "क्या डिजिटल रिलीज फिल्मों के बॉक्स ऑफिस कलेक्शन को प्रभावित कर रही हैं? जानिए विशेषज्ञों की राय।",
    author: "प्रिया मेहरा",
    time: "5 घंटे पहले",
    img: "https://images.unsplash.com/photo-1594909122845-11baa439b7bf?auto=format&fit=crop&w=1600&q=80",
    credit: "Photo: Unsplash / A. B.",
    avatar: "https://i.pravatar.cc/48?img=2",
  },
  {
    id: 3,
    tag: "खेल",
    title: "विश्व कप फाइनल: भारत की शानदार जीत, देशभर में जश्न का माहौल",
    excerpt:
      "आखिरी ओवर के रोमांच में टीम इंडिया ने दिखाया दम, कप्तान के शतक ने दिलाई ऐतिहासिक जीत।",
    author: "विक्रम सिंह",
    time: "8 घंटे पहले",
    img: "https://images.unsplash.com/photo-1599586120429-48281b6f0ece?auto=format&fit=crop&w=1600&q=80",
    credit: "Photo: Unsplash / S. M.",
    avatar: "https://i.pravatar.cc/48?img=3",
  },
  {
    id: 4,
    tag: "टेक",
    title:
      "आर्टिफिशियल इंटेलिजेंस: क्या यह नौकरियां खत्म कर देगा या नए अवसर पैदा करेगा?",
    excerpt:
      "एआई के बढ़ते प्रभाव से उद्योग जगत में बड़े बदलाव की उम्मीद है, जानिए आपके करियर पर क्या होगा असर।",
    author: "अंजलि गुप्ता",
    time: "1 दिन पहले",
    img: "https://images.unsplash.com/photo-1550745165-9bc0b252726a?auto=format&fit=crop&w=1600&q=80",
    credit: "Photo: Unsplash / L. R.",
    avatar: "https://i.pravatar.cc/48?img=4",
  },
];

const Header = ({ setShowSearch }) => {
  const today = new Date();
  const formattedDate = today.toLocaleDateString("hi-IN", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    <>
      <div className="bg-[#f8fafb] text-sm text-gray-600 border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-10">
          <div className="flex items-center gap-4 text-xs">
            <span>इंडिया एडिशन</span>
            <span className="hidden sm:block text-gray-400">|</span>
            <span className="hidden sm:block">{formattedDate}</span>
          </div>
          <div className="flex items-center gap-4">
            <button className="text-xs font-medium hover:text-[#0f4c4c]">
              लॉग इन
            </button>
            <button className="text-xs px-4 py-1.5 rounded-full bg-[#0f4c4c] hover:bg-opacity-90 text-white font-semibold transition-colors">
              सब्सक्राइब करें
            </button>
          </div>
        </div>
      </div>

      <header className="sticky top-0 z-40 backdrop-blur-md border-b border-gray-200/80 bg-white/95 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-20">
          <div className="flex items-center gap-6">
            <a
              href="#"
              className="flex items-center gap-3"
              aria-label="देश खबर होमपेज"
            >
              <div className="w-36 -z-10 h-12 mb-5 rounded-lg flex items-center justify-center">
                <Image src={Logo} alt="Logo" width={300} height={100}></Image>
              </div>
              <div>
                <div className="font-extrabold text-xl leading-5 tracking-tight font-['Noto_Sans_Devanagari'] text-gray-900"></div>
                <div className="text-xs text-gray-500 tracking-wide"></div>
              </div>
            </a>
            <nav
              className="hidden lg:flex items-center gap-1"
              aria-label="मुख्य नेविगेशन"
            >
              {[
                "समाचार",
                "राजनीति",
                "मनोरंजन",
                "खेल",
                "नौकरी",
                "टेक",
                "कविता",
                "कहानी",
                "रोचक तथ्य",
                "फ़िल्मी दुनिया",
              ].map((c) => (
                <a
                  key={c}
                  href="#"
                  className="text-sm font-medium px-4 py-2 rounded-md text-gray-700 hover:bg-gray-100 hover:text-[#0f4c4c] transition-colors"
                >
                  {c}
                </a>
              ))}
            </nav>
          </div>

          <div className="flex items-center gap-4">
            <button
              onClick={() => setShowSearch(true)}
              className="hidden md:flex items-center gap-2 border rounded-full px-4 py-2.5 bg-gray-50 border-gray-200 hover:border-[#0f4c4c]/50 transition-colors"
            >
              <SearchIcon className="h-4 w-4 text-gray-500" />
              <span className="text-sm text-gray-500">खोजें...</span>
            </button>

            <div className="hidden sm:flex items-center gap-2 text-sm bg-white border border-gray-200 rounded-full px-4 py-2">
              <GlobeIcon />
              <select className="bg-transparent focus:outline-none appearance-none text-gray-700">
                <option>हिंदी</option>
                <option>English</option>
              </select>
            </div>
          </div>
        </div>
      </header>
    </>
  );
};

const Ticker = ({ items = [] }) => (
  <div className="flex-1 overflow-hidden relative h-8">
    <div className="absolute inset-0 flex items-center animate-marquee whitespace-nowrap text-sm text-gray-800 font-medium">
      {items.concat(items).map((it, idx) => (
        <Link href={it} key={idx} className="inline-flex items-center mx-6">
          <span className="w-2 h-2 bg-red-500 rounded-full mr-3"></span>
          {it}
        </Link>
      ))}
    </div>
    <style>{`
          @keyframes marquee {
              0% { transform: translateX(0%); }
              100% { transform: translateX(-50%); }
          }
          .animate-marquee {
              animation: marquee 25s linear infinite;
          }
      `}</style>
  </div>
);

const Hero = ({ lead, trending = [] }) => (
  <article className="rounded-xl overflow-hidden shadow-lg bg-white border border-gray-100">
    <div className="lg:flex">
      <div className="lg:w-2/3 relative group">
        <img
          src={lead.img}
          alt={lead.title}
          className="object-cover w-full h-72 lg:h-[450px]"
          loading="lazy"
        />

        <Link href={"/Diwali"}>
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
          <div className="absolute left-0 bottom-0 p-6 md:p-8 w-full">
            <span className="inline-flex items-center px-3 py-1 rounded-full bg-red-600 text-white text-xs font-semibold uppercase tracking-wide">
              {lead.tag}
            </span>
            <h1 className="mt-4 font-bold text-2xl md:text-4xl leading-tight text-white font-['Noto_Sans_Devanagari']">
              {lead.title}
            </h1>
            {/* <p className="mt-3 text-sm text-gray-200 max-w-lg leading-relaxed">
            {lead.excerpt}
          </p> */}
            <div className="mt-4 flex items-center gap-3 text-sm text-white">
              {lead.avatar ? (
                <img
                  src={lead.avatar}
                  alt={lead.author}
                  className="w-10 h-10 rounded-full border-2 border-white/50"
                />
              ) : (
                ""
              )}
              <div className="font-medium">
                {lead.author} • {lead.time}
              </div>
            </div>
          </div>
        </Link>
      </div>
      <aside className="lg:w-1/3 p-6 bg-gray-50 border-l border-gray-100">
        <h2 className="font-bold text-gray-800 text-lg border-b-2 border-[#0f4c4c] pb-3 font-['Noto_Sans_Devanagari']">
          ट्रेंडिंग खबरें
        </h2>
        <ol className="mt-4 space-y-4">
          {trending.map((t) => (
            <li
              key={t.id}
              className="group flex gap-4 items-start pb-4 border-b border-gray-100 last:border-b-0"
            >
              <img
                src={t.img}
                alt={t.title}
                className="w-24 h-16 object-cover rounded-md flex-shrink-0"
                loading="lazy"
              />
              <div className="flex-1">
                <a
                  href={t.title}
                  className="font-semibold text-sm leading-snug text-gray-800 group-hover:text-[#0f4c4c] transition-colors line-clamp-2"
                >
                  {t.title}
                </a>
                <div className="text-xs text-gray-500 mt-2 flex items-center gap-2">
                  <span>{t.author}</span>
                  <span>•</span>
                  <span>{t.time}</span>
                </div>
              </div>
            </li>
          ))}
        </ol>
      </aside>
    </div>
  </article>
);

const ArticleCard = ({ article }) => (
  <article className="group rounded-lg overflow-hidden bg-white border border-gray-100 shadow-sm hover:shadow-lg transition-all duration-300">
    <div className="relative h-48 overflow-hidden">
      <img
        src={article.img}
        alt={article.title}
        className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-300"
        loading="lazy"
      />
      <span className="absolute top-3 left-3 bg-[#0f4c4c] text-white text-xs px-3 py-1 rounded-full font-semibold uppercase tracking-wide">
        {article.tag}
      </span>
    </div>
    <div className="p-5">
      <h3 className="font-bold text-lg leading-snug line-clamp-2 text-gray-900 group-hover:text-[#0f4c4c] font-['Noto_Sans_Devanagari'] transition-colors">
        {article.title}
      </h3>
      <p className="mt-3 text-sm text-gray-600 line-clamp-2 leading-relaxed">
        {article.excerpt}
      </p>
      <div className="mt-4 flex items-center justify-between pt-3 border-t border-gray-100">
        <div className="flex items-center gap-3 text-sm text-gray-500">
          <img
            src={article.avatar}
            alt={article.author}
            className="w-8 h-8 rounded-full"
          />
          <div>
            <div className="font-medium">{article.author}</div>
            <div className="text-xs">{article.time}</div>
          </div>
        </div>
        <a
          href="#"
          className="text-sm font-semibold text-[#0f4c4c] hover:text-[#0a7f7f] transition-colors"
        >
          और पढ़ें →
        </a>
      </div>
    </div>
  </article>
);

const MobileNav = () => (
  <nav className="fixed bottom-0 left-1/2 -translate-x-1/2 w-[calc(100%-2rem)] max-w-md bg-white/95 backdrop-blur-lg rounded-2xl shadow-xl p-2 flex items-center justify-around text-gray-600 border border-gray-100 md:hidden z-50">
    <button className="flex flex-col items-center justify-center text-xs w-16 h-12 rounded-xl text-white bg-[#0f4c4c]">
      <HomeIcon />
      <span>होम</span>
    </button>
    <button className="flex flex-col items-center justify-center text-xs w-16 h-12 rounded-xl hover:bg-gray-50 transition-colors">
      <SearchIcon className="h-6 w-6" />
      <span>खोज</span>
    </button>
    <button className="flex flex-col items-center justify-center text-xs w-16 h-12 rounded-xl hover:bg-gray-50 transition-colors">
      <BookmarkIcon />
      <span>सेव</span>
    </button>
    <button className="flex flex-col items-center justify-center text-xs w-16 h-12 rounded-xl hover:bg-gray-50 transition-colors">
      <MenuIcon />
      <span>मेनू</span>
    </button>
  </nav>
);

export default function App() {
  const [query, setQuery] = useState("");
  const [showSearch, setShowSearch] = useState(false);
  const [tickerItems] = useState([
    "बड़ी खबर: वैश्विक अर्थव्यवस्था में नई चुनौती—विशेष रिपोर्ट",
    "मनोरंजन: फिल्म X ने बॉक्स ऑफिस पर तोड़ा रिकॉर्ड",
    "खेल: कप्तान ने किया चौंकाने वाला फैसला",
  ]);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let mounted = true;

    async function load() {
      try {
        setLoading(true);
        setError(null);
        const items = await fetchCollection("news"); // <-- await the promise
        if (!mounted) return;
        setData(items);
      } catch (err) {
        if (!mounted) return;
        setError(err);
      } finally {
        if (!mounted) return;
        setLoading(false);
      }
    }

    load();
    return () => {
      mounted = false;
    };
  }, []);
  if (loading) return <ProfessionalLoader />;
  if (error) return <div>Error: {error.message || String(error)}</div>;

  return (
    <div className="min-h-screen bg-white text-gray-900 font-['Roboto','Noto_Sans_Devanagari']">
      <Header setShowSearch={setShowSearch} />

      <div className="bg-amber-50 border-y border-amber-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2 flex items-center gap-4">
          <span className="inline-flex items-center px-3 py-1 rounded-full bg-red-600 text-white text-xs font-bold uppercase tracking-wider">
            ब्रेकिंग
          </span>
          <Ticker items={tickerItems} />
        </div>
      </div>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Hero lead={data[0]} trending={data.slice(1, 5)} />

        <section className="my-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 font-['Noto_Sans_Devanagari'] border-l-4 border-[#0f4c4c] pl-4">
            ताज़ा खबरें
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {data.slice(6, 9).map((a) => (
              <ArticleCard key={a.id} article={a} />
            ))}
          </div>
        </section>
        {/* <HighPerfAd /> */}
        {/* <AdBanner /> */}
        <section className="my-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 font-['Noto_Sans_Devanagari'] border-l-4 border-[#0f4c4c] pl-4">
            खेल ताज़ा खबरें
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {data.slice(8, 12).map((a) => (
              <ArticleCard key={a.id} article={a} />
            ))}
          </div>
        </section>
        <h2 className="text-2xl font-bold text-gray-900 mb-6 font-['Noto_Sans_Devanagari'] border-l-4 border-[#0f4c4c] pl-4">
          मनोरंजन ताज़ा खबरें
        </h2>
        {/* <SimpleAd /> */}
        <Hero
          lead={SAMPLE_ARTICLES[0]}
          trending={SAMPLE_ARTICLES.slice(1, 3)}
        />
        <section className="my-12">
          {/* <EffectiveGateAd /> */}

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {data.slice(18, 22).map((a) => (
              <ArticleCard key={a.id} article={a} />
            ))}
          </div>
          {/* <EffectiveGateAd /> */}
        </section>
      </main>

      <MobileNav />
      <Footer />

      {/* Search modal */}
      {showSearch && (
        <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 sm:pt-24">
          <div
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={() => setShowSearch(false)}
          />
          <div className="relative z-50 w-full max-w-2xl px-4">
            <div className="bg-white rounded-xl p-6 shadow-2xl border border-gray-200">
              <div className="flex items-center gap-4">
                <SearchIcon className="h-5 w-5 text-gray-500" />
                <input
                  autoFocus
                  aria-label="search-input"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="खबर, विषय या व्यक्ति खोजें..."
                  className="flex-1 bg-transparent focus:outline-none text-lg placeholder-gray-400"
                />
                <button
                  onClick={() => setShowSearch(false)}
                  className="text-sm text-gray-500 hover:text-gray-700 px-3 py-1 rounded-lg hover:bg-gray-100 transition-colors"
                >
                  रद्द करें
                </button>
              </div>
              <div className="mt-6 border-t border-gray-100 pt-4">
                <h4 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">
                  लोकप्रिय विषय
                </h4>
                <div className="flex flex-wrap gap-2">
                  {[
                    "दिल्ली चुनाव",
                    "बॉलीवुड",
                    "क्रिकेट विश्व कप",
                    "नई नौकरी",
                    "बजट 2024",
                  ].map((tag) => (
                    <button
                      key={tag}
                      className="px-4 py-2 rounded-full bg-gray-100 text-sm text-gray-700 hover:bg-gray-200 transition-colors"
                    >
                      {tag}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
