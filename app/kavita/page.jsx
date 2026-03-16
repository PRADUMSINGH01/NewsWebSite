"use client";
import React, { useState, useEffect } from "react";
import { fetchCollection } from "@/components/server/fetchnews";
import BackButton from "@/components/BackButton";
import { Search, BookOpen, Heart, Share2, MessageCircle, Twitter } from "lucide-react";

const CATEGORIES = ["सभी", "प्रेम", "प्रकृति", "शोक", "प्रेरणा", "जीवन"];

/* ─── Poem Card — same visual language as home ArticleCard ──── */
function PoemCard({ poem }) {
  const [expanded, setExpanded] = useState(false);
  const [liked, setLiked]       = useState(false);
  const [menu, setMenu]         = useState(false);

  const title    = poem.title   || "बिना शीर्षक";
  const poet     = poem.poet    || "अज्ञात";
  const avatar   = poem.avatar  || "/avatar-placeholder.png";
  const text     = poem.text    || "";
  const tag      = (poem.tags && poem.tags[0]) || "जीवन";
  const slug     = poem.slug    || poem.id;
  const likes    = poem.likes   || 0;

  const lines      = text.split("\n");
  const preview    = lines.slice(0, 4).join("\n");
  const hasMore    = lines.length > 4;

  function share(platform) {
    const shareText = `${title} — ${poet}\n\n${text.substring(0, 100)}...`;
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
      {/* Top colour bar */}
      <div className="h-1 bg-gradient-to-r from-[#0f4c4c] to-teal-400" />

      <div className="p-5 sm:p-6">
        {/* Header row */}
        <div className="flex items-start justify-between gap-3 mb-4">
          <div>
            <span className="inline-block bg-[#0f4c4c]/10 text-[#0f4c4c] text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wide mb-2">
              {tag}
            </span>
            <h2 className="text-lg sm:text-xl font-bold text-gray-900 leading-snug group-hover:text-[#0f4c4c] transition-colors font-['Noto_Sans_Devanagari']">
              {title}
            </h2>
          </div>
        </div>

        {/* Poet row */}
        <div className="flex items-center gap-2 mb-4">
          <img src={avatar} alt={poet}
            className="w-8 h-8 rounded-full object-cover border border-gray-200"
            onError={(e) => { e.target.src = "/avatar-placeholder.png"; }}
          />
          <div>
            <p className="text-sm font-semibold text-gray-800">{poet}</p>
            <p className="text-xs text-gray-400">कवि</p>
          </div>
        </div>

        {/* Poem text */}
        <div className="border-l-4 border-[#0f4c4c]/20 pl-4 mb-4">
          <pre className="whitespace-pre-wrap font-serif text-[15px] sm:text-base text-gray-700 leading-7 font-['Noto_Sans_Devanagari']">
            {expanded ? text : preview}
          </pre>
          {hasMore && (
            <button
              onClick={() => setExpanded(!expanded)}
              className="mt-3 inline-flex items-center gap-1 text-sm font-semibold text-[#0f4c4c] hover:text-[#0a7f7f] transition-colors"
            >
              <BookOpen className="w-3.5 h-3.5" />
              {expanded ? "कम देखें" : "पूरी कविता पढ़ें"}
            </button>
          )}
        </div>

        {/* Action row — same style as home page card footer */}
        <div className="flex items-center justify-between pt-4 border-t border-gray-100">
          <div className="flex items-center gap-2">
            {/* Like */}
            <button
              onClick={() => setLiked(!liked)}
              className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium transition-all duration-200 ${
                liked
                  ? "bg-red-50 text-red-500 border border-red-200"
                  : "bg-gray-50 text-gray-500 border border-gray-200 hover:bg-gray-100"
              }`}
            >
              <Heart className={`w-4 h-4 ${liked ? "fill-current" : ""}`} />
              <span>{likes + (liked ? 1 : 0)}</span>
            </button>

            {/* Share */}
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
          </div>

          <a
            href={`/kavita/${slug}`}
            className="text-sm font-semibold text-[#0f4c4c] hover:text-[#0a7f7f] transition-colors"
          >
            और पढ़ें →
          </a>
        </div>
      </div>
    </article>
  );
}

/* ─── Main page ─────────────────────────────────────────────── */
export default function KavitaPage() {
  const [poems,    setPoems]    = useState([]);
  const [loading,  setLoading]  = useState(true);
  const [error,    setError]    = useState(null);
  const [search,   setSearch]   = useState("");
  const [category, setCategory] = useState("सभी");

  useEffect(() => {
    let active = true;
    (async () => {
      try {
        const items = await fetchCollection("kavita");
        if (!active) return;
        setPoems(
          items
            .filter(i => i.published !== false)
            .map(i => ({
              ...i,
              text:  i.text  || "",
              tags:  i.tags  || [],
              poet:  i.poet  || "अज्ञात",
              title: i.title || "बिना शीर्षक",
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

  const filtered = poems.filter(p => {
    const q = search.toLowerCase();
    const matchSearch = !q ||
      p.title.toLowerCase().includes(q) ||
      p.poet.toLowerCase().includes(q) ||
      p.text.toLowerCase().includes(q);
    const pCat = (p.tags && p.tags[0]) || "जीवन";
    const matchCat = category === "सभी" || pCat === category;
    return matchSearch && matchCat;
  });

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center bg-white">
      <div className="flex flex-col items-center gap-4">
        <div className="w-12 h-12 rounded-full border-4 border-[#0f4c4c] border-t-transparent animate-spin" />
        <p className="text-gray-500 font-['Noto_Sans_Devanagari']">कविताएं लोड हो रही हैं...</p>
      </div>
    </div>
  );

  if (error) return (
    <div className="p-6 text-red-500 text-center">त्रुटि: {error}</div>
  );

  return (
    <div className="min-h-screen bg-white text-gray-900 font-['Noto_Sans_Devanagari']">
      <BackButton />

      {/* ── Page hero banner ── */}
      <div className="bg-gradient-to-r from-[#0f4c4c] to-teal-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14">
          <div className="flex items-center gap-3 mb-3">
            <span className="text-3xl">📜</span>
            <span className="text-xs font-bold uppercase tracking-widest text-teal-200">हिंदी साहित्य</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold leading-tight mb-2">
            हिंदी कविता संग्रह
          </h1>
          <p className="text-teal-100 text-base sm:text-lg max-w-xl">
            हिंदी साहित्य की श्रेष्ठ कविताओं का सुंदर संकलन
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
              placeholder="कविता, कवि या शब्द खोजें..."
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
            {category === "सभी" ? "सभी कविताएं" : `${category} — कविताएं`}
          </h2>
          <span className="text-sm text-gray-500">{filtered.length} कविताएं</span>
        </div>

        {/* ── Grid ── */}
        {filtered.length === 0 ? (
          <div className="text-center py-16">
            <p className="text-5xl mb-4">📭</p>
            <h3 className="text-xl font-bold text-gray-800 mb-2">कोई कविता नहीं मिली</h3>
            <p className="text-gray-500 mb-5">कृपया अलग कीवर्ड या श्रेणी आज़माएं</p>
            <button
              onClick={() => { setSearch(""); setCategory("सभी"); }}
              className="bg-[#0f4c4c] text-white px-6 py-2.5 rounded-full font-semibold hover:bg-[#0a7f7f] transition-colors"
            >
              सभी कविताएं देखें
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
            {filtered.map((poem, i) => (
              <PoemCard key={poem.slug || poem.id || i} poem={poem} />
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
