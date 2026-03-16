"use client";
import React, { useState, useEffect } from "react";
import { fetchCollection } from "@/components/server/fetchnews";
import BackButton from "@/components/BackButton";
import { Search, BookOpen, Clock, User, Share2, MessageCircle, Twitter } from "lucide-react";

const CATEGORIES = ["सभी", "प्रेम कहानी", "रोमांच", "प्रेरणा", "हास्य", "जीवन", "रहस्य"];

function formatReadTime(text = "") {
  const words = text.trim().split(/\s+/).length;
  const mins  = Math.max(1, Math.ceil(words / 200));
  return `${mins} मिनट पढ़ें`;
}

/* ─── Story Card ────────────────────────────────────────────── */
function StoryCard({ story }) {
  const [expanded, setExpanded] = useState(false);
  const [menu, setMenu]         = useState(false);

  const title   = story.title   || "बिना शीर्षक";
  const author  = story.author  || "अज्ञात";
  const avatar  = story.avatar  || "/avatar-placeholder.png";
  const text    = story.text    || story.content || story.excerpt || "";
  const tag     = (story.tags && story.tags[0]) || story.tag || "कहानी";
  const slug    = story.slug    || story.id;
  const img     = story.img;

  const PREVIEW_LENGTH = 300;
  const hasMore  = text.length > PREVIEW_LENGTH;
  const preview  = text.slice(0, PREVIEW_LENGTH);
  const readTime = formatReadTime(text);

  function share(platform) {
    const shareText = `${title} — ${author}\n\n${text.substring(0, 100)}...`;
    const url = window.location.href;
    const urls = {
      twitter:  `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText + "\n" + url)}`,
      whatsapp: `https://wa.me/?text=${encodeURIComponent(shareText + "\n" + url)}`,
    };
    window.open(urls[platform], "_blank");
    setMenu(false);
  }

  return (
    <article className="group bg-white rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden">
      {/* Cover image (if available) */}
      {img && (
        <div className="relative h-44 overflow-hidden">
          <img
            src={img}
            alt={title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            loading="lazy"
          />
          <span className="absolute top-3 left-3 bg-[#0f4c4c] text-white text-xs px-3 py-1 rounded-full font-bold uppercase tracking-wide">
            {tag}
          </span>
        </div>
      )}

      <div className="p-5 sm:p-6">
        {/* Category pill (if no image) */}
        {!img && (
          <span className="inline-block bg-[#0f4c4c]/10 text-[#0f4c4c] text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wide mb-3">
            {tag}
          </span>
        )}

        {/* Title */}
        <h2 className="text-lg sm:text-xl font-bold text-gray-900 leading-snug mb-3 group-hover:text-[#0f4c4c] transition-colors font-['Noto_Sans_Devanagari']">
          {title}
        </h2>

        {/* Author + Read time */}
        <div className="flex items-center gap-3 mb-4">
          <img src={avatar} alt={author}
            className="w-8 h-8 rounded-full object-cover border border-gray-200"
            onError={e => { e.target.src = "/avatar-placeholder.png"; }}
          />
          <div>
            <p className="text-sm font-semibold text-gray-800">{author}</p>
            <div className="flex items-center gap-1 text-xs text-gray-400">
              <Clock className="w-3 h-3" />
              {readTime}
            </div>
          </div>
        </div>

        {/* Story preview */}
        <div className="border-l-4 border-[#0f4c4c]/20 pl-4 mb-4 text-gray-700 text-[15px] leading-relaxed font-['Noto_Sans_Devanagari']">
          {expanded ? text : preview}
          {!expanded && hasMore && "..."}
          {hasMore && (
            <button
              onClick={() => setExpanded(!expanded)}
              className="block mt-2 inline-flex items-center gap-1 text-sm font-semibold text-[#0f4c4c] hover:text-[#0a7f7f] transition-colors"
            >
              <BookOpen className="w-3.5 h-3.5" />
              {expanded ? "कम देखें" : "पूरी कहानी पढ़ें"}
            </button>
          )}
        </div>

        {/* Footer row */}
        <div className="flex items-center justify-between pt-4 border-t border-gray-100">
          <div className="relative">
            <button
              onClick={() => setMenu(!menu)}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium bg-gray-50 text-gray-500 border border-gray-200 hover:bg-gray-100 transition-colors"
            >
              <Share2 className="w-4 h-4" />
              <span className="hidden sm:inline">शेयर</span>
            </button>
            {menu && (
              <div className="absolute bottom-full mb-2 left-0 bg-white rounded-xl shadow-lg border border-gray-100 p-2 z-20 min-w-[130px]">
                <button onClick={() => share("twitter")}
                  className="flex items-center gap-2 w-full px-3 py-2 rounded-lg text-sm text-gray-700 hover:bg-gray-50">
                  <Twitter className="w-4 h-4 text-sky-500" /> X / Twitter
                </button>
                <button onClick={() => share("whatsapp")}
                  className="flex items-center gap-2 w-full px-3 py-2 rounded-lg text-sm text-gray-700 hover:bg-gray-50">
                  <MessageCircle className="w-4 h-4 text-green-500" /> WhatsApp
                </button>
              </div>
            )}
          </div>

          <a
            href={`/kahani/${slug}`}
            className="text-sm font-semibold text-[#0f4c4c] hover:text-[#0a7f7f] transition-colors"
          >
            और पढ़ें →
          </a>
        </div>
      </div>
    </article>
  );
}

/* ─── Main ──────────────────────────────────────────────────── */
export default function KahaniPage() {
  const [stories,  setStories]  = useState([]);
  const [loading,  setLoading]  = useState(true);
  const [error,    setError]    = useState(null);
  const [search,   setSearch]   = useState("");
  const [category, setCategory] = useState("सभी");

  useEffect(() => {
    let active = true;
    (async () => {
      try {
        const items = await fetchCollection("kahani");
        if (!active) return;
        setStories(
          items
            .filter(i => i.published !== false)
            .map(i => ({
              ...i,
              text:   i.text   || i.content || "",
              tags:   i.tags   || [],
              author: i.author || "अज्ञात",
              title:  i.title  || "बिना शीर्षक",
            }))
        );
      } catch (e) {
        if (active) setError(e.message);
      } finally {
        if (active) setLoading(false);
      }
    })();
    return () => { active = false; };
  }, []);

  const filtered = stories.filter(s => {
    const q = search.toLowerCase();
    const matchSearch = !q ||
      s.title.toLowerCase().includes(q) ||
      s.author.toLowerCase().includes(q) ||
      s.text.toLowerCase().includes(q);
    const sCat = (s.tags && s.tags[0]) || s.tag || "कहानी";
    const matchCat = category === "सभी" || sCat === category;
    return matchSearch && matchCat;
  });

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center bg-white">
      <div className="flex flex-col items-center gap-4">
        <div className="w-12 h-12 rounded-full border-4 border-[#0f4c4c] border-t-transparent animate-spin" />
        <p className="text-gray-500 font-['Noto_Sans_Devanagari']">कहानियाँ लोड हो रही हैं...</p>
      </div>
    </div>
  );

  if (error) return (
    <div className="p-6 text-red-500 text-center">त्रुटि: {error}</div>
  );

  return (
    <div className="min-h-screen bg-white text-gray-900 font-['Noto_Sans_Devanagari']">
      <BackButton />

      {/* ── Page hero ── */}
      <div className="bg-gradient-to-r from-[#0f4c4c] to-teal-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14">
          <div className="flex items-center gap-3 mb-3">
            <span className="text-3xl">📖</span>
            <span className="text-xs font-bold uppercase tracking-widest text-teal-200">हिंदी साहित्य</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold leading-tight mb-2">
            हिंदी कहानी संग्रह
          </h1>
          <p className="text-teal-100 text-base sm:text-lg max-w-xl">
            हिंदी साहित्य की रोचक कहानियों और लघु कथाओं का संग्रह
          </p>
        </div>
      </div>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">

        {/* ── Search + Filters ── */}
        <div className="mb-8">
          <div className="relative max-w-xl mb-5">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="text"
              placeholder="कहानी, लेखक या शब्द खोजें..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-xl bg-white focus:outline-none focus:ring-2 focus:ring-[#0f4c4c]/30 focus:border-[#0f4c4c] shadow-sm text-sm transition-all"
            />
          </div>

          <div className="flex flex-wrap gap-2">
            {CATEGORIES.map(cat => (
              <button
                key={cat}
                onClick={() => setCategory(cat)}
                className={`px-4 py-1.5 rounded-full text-sm font-semibold transition-all duration-200 ${
                  category === cat
                    ? "bg-[#0f4c4c] text-white shadow-sm"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* ── Section heading ── */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-900 border-l-4 border-[#0f4c4c] pl-4">
            {category === "सभी" ? "सभी कहानियाँ" : `${category} — कहानियाँ`}
          </h2>
          <span className="text-sm text-gray-500">{filtered.length} कहानियाँ</span>
        </div>

        {/* ── Grid ── */}
        {filtered.length === 0 ? (
          <div className="text-center py-16">
            <p className="text-5xl mb-4">📭</p>
            <h3 className="text-xl font-bold text-gray-800 mb-2">कोई कहानी नहीं मिली</h3>
            <p className="text-gray-500 mb-5">कृपया अलग कीवर्ड या श्रेणी आज़माएं</p>
            <button
              onClick={() => { setSearch(""); setCategory("सभी"); }}
              className="bg-[#0f4c4c] text-white px-6 py-2.5 rounded-full font-semibold hover:bg-[#0a7f7f] transition-colors"
            >
              सभी कहानियाँ देखें
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
            {filtered.map((story, i) => (
              <StoryCard key={story.slug || story.id || i} story={story} />
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
