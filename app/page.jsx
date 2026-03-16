import Script from "next/script";
import React from "react";
import { fetchCollection } from "@/components/server/fetchnews";
import ProfessionalLoader from "@/components/Loading";
import Link from "next/link";
import Footer from "@/components/Footer";
import Logo from "@/public/logo.png";
import Image from "next/image";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
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

// const Header = ({ setShowSearch }) => {
//   const today = new Date();
//   const formattedDate = today.toLocaleDateString("hi-IN", {
//     weekday: "long",
//     day: "numeric",
//     month: "long",
//     year: "numeric",
//   });

//   return (
//     <>
//       <div className="bg-[#f8fafb] text-sm text-gray-600 border-b border-gray-200">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-10">
//           <div className="flex items-center gap-4 text-xs">
//             <span>इंडिया एडिशन</span>
//             <span className="hidden sm:block text-gray-400">|</span>
//             <span className="hidden sm:block">{formattedDate}</span>
//           </div>
//           <div className="flex items-center gap-4">
//             <button className="text-xs font-medium hover:text-[#0f4c4c]">
//               लॉग इन
//             </button>
//             <button className="text-xs px-4 py-1.5 rounded-full bg-[#0f4c4c] hover:bg-opacity-90 text-white font-semibold transition-colors">
//               सब्सक्राइब करें
//             </button>
//           </div>
//         </div>
//       </div>

//       <header className="sticky top-0 z-40 backdrop-blur-md border-b border-gray-200/80 bg-white/95 shadow-sm">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-20">
//           <div className="flex flex-col md:flex items-center gap-6">
//             <a
//               href="/"
//               className="flex items-center gap-3"
//               aria-label="देश खबर होमपेज"
//             >
//               <div className="w-36 -z-10 h-12 mb-5 rounded-lg flex items-center justify-center">
//                 <Image src={Logo} alt="Logo" width={300} height={100}></Image>
//               </div>
//               <div>
//                 <div className="font-extrabold text-xl leading-5 tracking-tight font-['Noto_Sans_Devanagari'] text-gray-900"></div>
//                 <div className="text-xs text-gray-500 tracking-wide"></div>
//               </div>
//             </a>

//             {/* mobile menu button */}
//             <button
//               onClick={() => setOpen(!open)}
//               className="md:hidden absolute right-4 top-6 border border-gray-200 rounded-md p-2 bg-white"
//             >
//               {open ? (
//                 <XIcon className="h-5 w-5" />
//               ) : (
//                 <MenuIcon className="h-5 w-5" />
//               )}
//             </button>

//             {/* nav links */}
//             <nav
//               className={`${
//                 open ? "flex" : "hidden"
//               } md:flex flex-col md:flex-row items-center gap-1 md:gap-1 bg-white md:bg-transparent absolute md:static top-16 left-0 w-full md:w-auto border md:border-0 border-gray-200 md:shadow-none shadow-sm`}
//               aria-label="मुख्य नेविगेशन"
//             >
//               {[
//                 { t: "समाचार", url: "/news/सभी" },
//                 { t: "टेक", url: "/news/टेक" },
//                 { t: "खेल", url: "/news/खेल" },
//                 { t: "कविता", url: "kavita" },
//                 { t: "कहानी", url: "kahani" },
//                 { t: "रोचक तथ्य", url: "/news/रोचक-तथ्य" },
//                 { t: "फ़िल्मी दुनिया", url: "/news/फ़िल्मी दुनिया" },
//                 { t: "फोटो गैलरी", url: "photo-gallery" },
//               ].map((c, i) => (
//                 <a
//                   key={i}
//                   href={c.url}
//                   onClick={() => setOpen(false)}
//                   className="text-sm font-medium px-4 py-2 rounded-md text-gray-700 hover:bg-gray-100 hover:text-[#0f4c4c] transition-colors w-full md:w-auto text-center"
//                 >
//                   {c.t}
//                 </a>
//               ))}
//             </nav>
//           </div>

//           <div className="flex items-center gap-4">
//             <button
//               onClick={() => setShowSearch(true)}
//               className="hidden md:flex items-center gap-2 border rounded-full px-4 py-2.5 bg-gray-50 border-gray-200 hover:border-[#0f4c4c]/50 transition-colors"
//             >
//               <SearchIcon className="h-4 w-4 text-gray-500" />
//               <span className="text-sm text-gray-500">खोजें...</span>
//             </button>

//             <div className="hidden sm:flex items-center gap-2 text-sm bg-white border border-gray-200 rounded-full px-4 py-2">
//               <GlobeIcon />
//               <select className="bg-transparent focus:outline-none appearance-none text-gray-700">
//                 <option>हिंदी</option>
//                 <option>English</option>
//               </select>
//             </div>
//           </div>
//         </div>
//       </header>
//     </>
//   );
// };

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

// const Hero = ({ lead, trending = [] }) => (
//   <article className="rounded-xl overflow-hidden shadow-lg bg-white border border-gray-100">
//     <div className="lg:flex">
//       <div className="lg:w-2/3 relative group">
//         <img
//           src={lead.img}
//           alt={lead.title}
//           className="object-cover w-full h-72 lg:h-[450px]"
//           loading="lazy"
//         />

//         <Link href={`Read-full-news/${lead.slug}`}>
//           <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
//           <div className="absolute left-0 bottom-0 p-6 md:p-8 w-full">
//             <span className="inline-flex items-center px-3 py-1 rounded-full bg-red-600 text-white text-xs font-semibold uppercase tracking-wide">
//               {lead.tag}
//             </span>
//             <h1 className="mt-4 font-bold text-2xl md:text-4xl leading-tight text-white font-['Noto_Sans_Devanagari']">
//               {lead.title}
//             </h1>
//             {/* <p className="mt-3 text-sm text-gray-200 max-w-lg leading-relaxed">
//             {lead.excerpt}
//           </p> */}
//             <div className="mt-4 flex items-center gap-3 text-sm text-white">
//               {lead.avatar ? (
//                 <img
//                   src={lead.avatar}
//                   alt={lead.author}
//                   className="w-10 h-10 rounded-full border-2 border-white/50"
//                 />
//               ) : (
//                 ""
//               )}
//               <div className="font-medium">
//                 {lead.author} •{" "}
//                 {lead?.createdAt?.toDate
//                   ? lead.createdAt.toDate().toLocaleString("en-IN", {
//                       day: "2-digit",
//                       month: "short",
//                       year: "numeric",
//                       hour: "2-digit",
//                       minute: "2-digit",
//                     })
//                   : "No Date"}
//               </div>
//             </div>
//           </div>
//         </Link>
//       </div>
//       <aside className="lg:w-1/3 p-6 bg-gray-50 border-l border-gray-100">
//         <h2 className="font-bold text-gray-800 text-lg border-b-2 border-[#0f4c4c] pb-3 font-['Noto_Sans_Devanagari']">
//           ट्रेंडिंग खबरें
//         </h2>
//         <ol className="mt-4 space-y-4">
//           {trending.map((t) => (
//             <li
//               key={t.id}
//               className="group flex gap-4 items-start pb-4 border-b border-gray-100 last:border-b-0"
//             >
//               <img
//                 src={t.img}
//                 alt={t.title}
//                 className="w-24 h-16 object-cover rounded-md flex-shrink-0"
//                 loading="lazy"
//               />
//               <div className="flex-1">
//                 <a
//                   href={`Read-full-news/${t.slug}`}
//                   className="font-semibold text-sm leading-snug text-gray-800 group-hover:text-[#0f4c4c] transition-colors line-clamp-2"
//                 >
//                   {t.title}
//                 </a>
//                 <div className="text-xs text-gray-500 mt-2 flex items-center gap-2">
//                   <span>{t.author}</span>
//                   <span>•</span>
//                   <span>
//                     {t?.createdAt?.toDate
//                       ? t.createdAt.toDate().toLocaleString("en-IN", {
//                           day: "2-digit",
//                           month: "short",
//                           year: "numeric",
//                           hour: "2-digit",
//                           minute: "2-digit",
//                         })
//                       : "No Date"}
//                   </span>
//                 </div>
//               </div>
//             </li>
//           ))}
//         </ol>
//       </aside>
//     </div>
//   </article>
// );

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
            <div className="text-xs">
              {" "}
              {article?.createdAt
                ? new Date(article.createdAt).toLocaleString("en-IN", {
                    day: "2-digit",
                    month: "short",
                    year: "numeric",
                    hour: "2-digit",
                    minute: "2-digit",
                  })
                : "No Date"}
            </div>
          </div>
        </div>
        <a
          href={`Read-full-news/${article.slug}`}
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

export default async function Home() {

  let data = [];
  try {
    const rawData = await fetchCollection("news");
    // Serialize Firebase Timestamps into ISO strings to safely pass to Client Components
    data = rawData.map(item => {
      let createdAtStr = null;
      if (item.createdAt && typeof item.createdAt.toDate === "function") {
        createdAtStr = item.createdAt.toDate().toISOString();
      } else if (item.time) {
        createdAtStr = new Date(item.time).toISOString();
      }
      return {
        ...item,
        createdAt: createdAtStr,
        time: createdAtStr
      };
    });
  } catch (err) {
    console.error("Error fetching news for home page:", err);
  }

  // Ticker: fetch from dedicated `ticker` collection in Firebase
  let tickerItems = ["ताज़ा खबरें..."];
  try {
    const tickerData = await fetchCollection("ticker");
    const titles = tickerData.map(t => t.title).filter(Boolean);
    if (titles.length > 0) tickerItems = titles;
  } catch (err) {
    console.error("Error fetching ticker:", err);
  }

  function normalizeTag(tag) {
    if (!tag) return "";
    return tag.toString().trim().toLowerCase();
  }

  const TARGET = "फ़िल्मी दुनिया";
  const educationArticles = data.filter(
    (article) => normalizeTag(article.tag) === normalizeTag(TARGET)
  );

  const sport = "खेल";
  const sport_result = data.filter(
    (artical) => normalizeTag(artical.tag) === normalizeTag(sport)
  );

  const lead = educationArticles[0] ?? data[0] ?? null;
  const trending =
    educationArticles.length > 1
      ? educationArticles.slice(1, 4)
      : data.slice(1, 4);

  const sport_lead = sport_result[0] ?? data[0] ?? null;
  const tranding =
    sport_result.length > 1 ? sport_result.slice(0, 4) : data.slice(1, 4);

  const websiteJsonLd = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "Hmar Duniya",
    "url": "https://www.hmarduniya.in",
    "potentialAction": {
      "@type": "SearchAction",
      "target": "https://www.hmarduniya.in/?q={search_term_string}",
      "query-input": "required name=search_term_string"
    }
  };

  return (
    <div className="min-h-screen bg-white text-gray-900 font-['Roboto','Noto_Sans_Devanagari']">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }}
      />
      <div className="bg-amber-50 border-y border-amber-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2 flex items-center gap-4">
          <span className="inline-flex items-center px-3 py-1 rounded-full bg-red-600 text-white text-xs font-bold uppercase tracking-wider">
            ब्रेकिंग
          </span>
          <Ticker items={tickerItems} />
        </div>
      </div>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {data.length > 0 && <Hero lead={data[0]} trending={data.slice(1, 5)} />}

        <section className="my-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 font-['Noto_Sans_Devanagari'] border-l-4 border-[#0f4c4c] pl-4">
            ताज़ा खबरें
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {data.slice(6, 10).map((a) => (
              <ArticleCard key={a.id} article={a} />
            ))}
          </div>
        </section>

        <section className="my-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 font-['Noto_Sans_Devanagari'] border-l-4 border-[#0f4c4c] pl-4">
            खेल ताज़ा खबरें
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {tranding.map((a) => (
              <ArticleCard key={a.id} article={a} />
            ))}
          </div>
        </section>
        
        <h2 className="text-2xl font-bold text-gray-900 mb-6 font-['Noto_Sans_Devanagari'] border-l-4 border-[#0f4c4c] pl-4">
          मनोरंजन ताज़ा खबरें
        </h2>
        
        {lead && <Hero lead={lead} trending={trending} />}
        
        <section className="my-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {data.slice(18, 22).map((a) => (
              <ArticleCard key={a.id} article={a} />
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
