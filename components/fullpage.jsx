"use client";
import React from "react";

// Simple responsive news post + related posts (No navbar, no footer)

const UserIcon = ({ className = "w-5 h-5" }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
    <circle cx="12" cy="7" r="4"></circle>
  </svg>
);

const CalendarIcon = ({ className = "w-5 h-5" }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
    <line x1="16" y1="2" x2="16" y2="6"></line>
    <line x1="8" y1="2" x2="8" y2="6"></line>
    <line x1="3" y1="10" x2="21" y2="10"></line>
  </svg>
);

const TwitterIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    width="18"
    height="18"
    fill="currentColor"
    className="inline-block"
  >
    <path d="M22.46 6c-.77.35-1.6.58-2.46.69a4.2 4.2 0 0 0 1.84-2.32 8.3 8.3 0 0 1-2.65 1.02A4.15 4.15 0 0 0 11.1 9.03a11.8 11.8 0 0 1-8.56-4.34 4.1 4.1 0 0 0 1.28 5.53 4.07 4.07 0 0 1-1.88-.52v.05a4.15 4.15 0 0 0 3.33 4.07 4.2 4.2 0 0 1-1.87.07 4.16 4.16 0 0 0 3.88 2.88A8.33 8.33 0 0 1 2 18.58a11.76 11.76 0 0 0 6.29 1.84c7.55 0 11.69-6.26 11.69-11.69v-.53A8.36 8.36 0 0 0 22.46 6z" />
  </svg>
);

// Related posts data (static placeholders)
const RELATED = [
  {
    title: "स्टार्टअप इंडिया: छोटे शहरों से नई चमक",
    excerpt:
      "टियर-2 और टियर-3 शहरों से निकलते स्टार्टअप्स किस तरह अवसर बना रहे हैं।",
    image: "https://placehold.co/600x400/fb923c/ffffff?text=स्टार्टअप",
  },
  {
    title: "आयुष्मान योजना ने दिए 5 करोड़ लाभ",
    excerpt: "यह योजना किस तरह आम लोगों की जिंदगी बदल रही है।",
    image: "https://placehold.co/600x400/60a5fa/ffffff?text=स्वास्थ्य",
  },
  {
    title: "सौर ऊर्जा का नया रिकॉर्ड",
    excerpt: "भारत ने सौर ऊर्जा में नया महत्वाकांक्षी लक्ष्य हासिल किया।",
    image: "https://placehold.co/600x400/4ade80/ffffff?text=ऊर्जा",
  },
];

export default function SimpleNewsPost() {
  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 antialiased">
      {/* font preconnect (keeps things self-contained for copy/paste) */}
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link
        rel="preconnect"
        href="https://fonts.gstatic.com"
        crossOrigin="anonymous"
      />
      <link
        href="https://fonts.googleapis.com/css2?family=Noto+Sans+Devanagari:wght@400;700&display=swap"
        rel="stylesheet"
      />

      <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <article className="bg-white rounded-xl shadow-sm overflow-hidden">
          <div className="md:flex md:items-start">
            <div className="md:flex-1">
              <img
                src="https://placehold.co/1200x600/dc2626/ffffff?text=कृषि-मित्र+पोर्टल&font=noto+sans"
                alt="कृषि-मित्र पोर्टल"
                className="w-full h-56 md:h-80 object-cover"
              />
              <div className="p-6 md:p-8">
                <div className="flex items-center gap-3 mb-4">
                  <span className="inline-flex items-center bg-red-100 text-red-700 text-sm font-semibold px-3 py-1 rounded-full">
                    प्रौद्योगिकी
                  </span>
                </div>

                <h1
                  className="text-2xl md:text-4xl font-extrabold leading-tight mb-4"
                  style={{ fontFamily: "'Noto Sans Devanagari', sans-serif" }}
                >
                  डिजिटल इंडिया: सरकार ने किसानों के लिए 'कृषि-मित्र' पोर्टल
                  लॉन्च किया
                </h1>

                <p className="text-gray-700 text-base md:text-lg mb-6">
                  नया पोर्टल किसानों को मौसम, मंडी भाव और सरकारी योजनाओं की सीधी
                  जानकारी देगा — उद्देश्य: आय में वृद्धि और पारदर्शिता।
                </p>

                <div className="flex flex-wrap items-center text-sm text-gray-500 gap-4 mb-6">
                  <span className="inline-flex items-center gap-2">
                    <UserIcon className="w-4 h-4" />
                    संवाददाता — रवि शर्मा
                  </span>
                  <span className="inline-flex items-center gap-2">
                    <CalendarIcon className="w-4 h-4" />
                    21 अक्टूबर, 2025
                  </span>
                </div>

                <div
                  className="prose prose-lg max-w-none text-gray-800"
                  style={{ fontFamily: "'Noto Sans Devanagari', sans-serif" }}
                >
                  <p>
                    <strong>नई दिल्ली:</strong> डिजिटल इंडिया के तहत केंद्र
                    सरकार ने 'कृषि-मित्र' पोर्टल लॉन्च किया है। इसका उद्देश्य
                    किसानों को तकनीक के माध्यम से जोड़ना और उन्हें तुरंत उपयोगी
                    जानकारी उपलब्ध कराना है।
                  </p>

                  <h2>मुख्य विशेषताएं</h2>
                  <ul>
                    <li>रियल-टाइम मौसम पूर्वानुमान और क्षेत्रीय सलाह</li>
                    <li>बाजार भाव और मंडियों की पारदर्शिता</li>
                    <li>बीज, उर्वरक और सब्सिडी जानकारी</li>
                    <li>क्षेत्रीय भाषाओं में सरल इंटरफ़ेस</li>
                  </ul>

                  <p>
                    सरकार ने कहा है कि पोर्टल फसल सलाह, कीट प्रबंधन और मिट्टी
                    स्वास्थ्य संबंधी सुझाव भी देगा, जिससे किसान बेहतर निर्णय ले
                    सकेंगे।
                  </p>

                  <p>
                    यह पहल प्रधानमंत्री के 2025 तक किसानों की आय दोगुनी करने के
                    लक्ष्य को आगे बढ़ाने की कोशिश है।
                  </p>
                </div>

                {/* share + tags row */}
                <div className="mt-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                  <div className="flex flex-wrap gap-2">
                    <span className="text-sm font-semibold text-gray-700 mr-2">
                      टैग:
                    </span>
                    <span className="text-xs bg-gray-200 px-3 py-1 rounded-full">
                      #डिजिटलइंडिया
                    </span>
                    <span className="text-xs bg-gray-200 px-3 py-1 rounded-full">
                      #किसान
                    </span>
                    <span className="text-xs bg-gray-200 px-3 py-1 rounded-full">
                      #प्रौद्योगिकी
                    </span>
                  </div>

                  <div className="flex items-center gap-3">
                    <span className="text-sm font-semibold text-gray-700">
                      शेयर करें:
                    </span>
                    <button
                      aria-label="ट्विटर पर साझा करें"
                      className="p-2 rounded-md hover:bg-gray-100"
                    >
                      <TwitterIcon />
                    </button>
                    {/* Add more icons if desired */}
                  </div>
                </div>
              </div>
            </div>

            {/* Sidebar (on md+ shows related posts) */}
            <aside className="hidden md:block md:w-80 lg:w-96 bg-gray-50 border-l border-gray-100">
              <div className="p-6">
                <h3 className="text-lg font-bold mb-4">यह भी पढ़ें</h3>
                <div className="space-y-4">
                  {RELATED.map((r, i) => (
                    <a
                      key={i}
                      href="#"
                      className="flex gap-3 items-start group"
                    >
                      <img
                        src={r.image}
                        alt={r.title}
                        className="w-20 h-16 object-cover rounded-md flex-shrink-0"
                      />
                      <div>
                        <h4 className="text-sm font-semibold group-hover:text-red-600">
                          {r.title}
                        </h4>
                        <p className="text-xs text-gray-600 mt-1">
                          {r.excerpt}
                        </p>
                      </div>
                    </a>
                  ))}
                </div>
              </div>
            </aside>
          </div>
        </article>

        {/* Related posts block for small screens - below the article */}
        <section className="mt-10 md:hidden">
          <h3 className="text-2xl font-extrabold mb-6 text-gray-900">
            यह भी पढ़ें
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {RELATED.map((r, i) => (
              <article
                key={i}
                className="bg-white rounded-lg shadow-sm overflow-hidden"
              >
                <img
                  src={r.image}
                  alt={r.title}
                  className="w-full h-40 object-cover"
                />
                <div className="p-4">
                  <h4 className="text-sm font-bold mb-2">{r.title}</h4>
                  <p className="text-xs text-gray-600">{r.excerpt}</p>
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* Author bio (keeps layout simple and responsive) */}
        <section className="mt-12">
          <div className="bg-white rounded-lg shadow-sm p-6 flex flex-col sm:flex-row items-center gap-4">
            <img
              src="https://placehold.co/96x96/fca5a5/1e293b?text=RS"
              alt="रवि शर्मा"
              className="w-20 h-20 rounded-full object-cover"
            />
            <div>
              <h4 className="font-bold">रवि शर्मा</h4>
              <p className="text-sm text-gray-600">
                अनुभवी संवाददाता — कृषि और प्रौद्योगिकी रिपोर्टिंग
              </p>
              <a
                href="#"
                className="text-sm font-semibold text-red-600 mt-2 inline-block"
              >
                रवि के और लेख पढ़ें →
              </a>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
