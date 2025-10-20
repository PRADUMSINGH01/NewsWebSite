"use client";
import React, { useState } from "react";

// --- SVG आइकन कंपोनेंट्स ---
// वास्तविक प्रोजेक्ट में, आप react-icons जैसी लाइब्रेरी का उपयोग करेंगे,
// लेकिन एक ही फ़ाइल के लिए, इनलाइन SVG बेहतर हैं।

const TwitterIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="currentColor"
    className="text-gray-500 hover:text-gray-800 transition-colors duration-300"
  >
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"></path>
  </svg>
);

const FacebookIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="currentColor"
    className="text-gray-500 hover:text-blue-600 transition-colors duration-300"
  >
    <path d="M12 2.04c-5.5 0-10 4.49-10 10.02 0 5 3.66 9.15 8.44 9.9v-7.02H7.9V12h2.55V9.8c0-2.52 1.5-3.9 3.8-3.9 1.1 0 2.22.2 2.22.2v2.5h-1.3c-1.22 0-1.6.73-1.6 1.52V12h2.8l-.45 2.98h-2.35v7.02c4.78-.75 8.44-4.9 8.44-9.9C22 6.53 17.5 2.04 12 2.04z"></path>
  </svg>
);

const LinkedinIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="currentColor"
    className="text-gray-500 hover:text-blue-700 transition-colors duration-300"
  >
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.225 0z"></path>
  </svg>
);

const UserIcon = ({ className }) => (
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
    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
    <circle cx="12" cy="7" r="4"></circle>
  </svg>
);

const CalendarIcon = ({ className }) => (
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
    <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
    <line x1="16" y1="2" x2="16" y2="6"></line>
    <line x1="8" y1="2" x2="8" y2="6"></line>
    <line x1="3" y1="10" x2="21" y2="10"></line>
  </svg>
);

// --- हेडर कंपोनेंट ---
const Header = () => {
  return (
    <header className="bg-white/90 backdrop-blur-md sticky top-0 z-50 border-b border-gray-200 shadow-sm">
      <nav className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex-shrink-0">
            <a
              href="#"
              className="text-3xl font-bold text-red-700 hover:text-red-800 transition-colors tracking-tight"
            >
              आज की खबर
            </a>
          </div>
          <div className="hidden md:flex md:space-x-8">
            <a
              href="#"
              className="text-gray-700 hover:text-red-700 font-medium"
            >
              होम
            </a>
            <a
              href="#"
              className="text-red-700 hover:text-red-700 font-semibold border-b-2 border-red-600"
            >
              ब्लॉग
            </a>
            <a
              href="#"
              className="text-gray-700 hover:text-red-700 font-medium"
            >
              हमारे बारे में
            </a>
            <a
              href="#"
              className="text-gray-700 hover:text-red-700 font-medium"
            >
              संपर्क
            </a>
          </div>
          <button className="md:hidden p-2 rounded-md text-gray-500 hover:text-gray-700 hover:bg-gray-100">
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16m-7 6h7"
              ></path>
            </svg>
          </button>
        </div>
      </nav>
    </header>
  );
};

// --- मुख्य समाचार कंपोनेंट ---
const BlogPost = () => {
  return (
    <main className="bg-gray-100 py-12 md:py-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <article className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="p-6 md:p-10">
            {/* --- पोस्ट हेडर --- */}
            <header className="mb-8">
              <span className="bg-red-100 text-red-700 text-sm font-semibold px-3 py-1 rounded-full mb-4 inline-block">
                प्रौद्योगिकी
              </span>
              <h1 className="text-3xl md:text-5xl font-extrabold text-gray-900 leading-tight mb-4">
                डिजिटल इंडिया मिशन: सरकार ने किसानों के लिए 'कृषि-मित्र' पोर्टल
                लॉन्च किया
              </h1>
              <p className="text-lg md:text-xl text-gray-600">
                यह नया पोर्टल किसानों को मौसम की जानकारी, बाजार भाव और सरकारी
                योजनाओं तक सीधी पहुंच प्रदान करेगा, जिससे उनकी आय दोगुनी करने
                में मदद मिलेगी।
              </p>
              <div className="flex items-center text-sm text-gray-500 space-x-4 mt-6 pt-4 border-t border-gray-200">
                <span className="inline-flex items-center">
                  <UserIcon className="w-4 h-4 mr-1.5" />
                  संवाददाता, रवि शर्मा
                </span>
                <span className="inline-flex items-center">
                  <CalendarIcon className="w-4 h-4 mr-1.5" />
                  २१ अक्टूबर, २०२५
                </span>
              </div>
            </header>

            {/* --- विशेष रुप से प्रदर्शित छवि --- */}
            <figure className="mb-8 rounded-lg overflow-hidden">
              <img
                src="https://placehold.co/1200x600/dc2626/ffffff?text=कृषि-मित्र+पोर्टल&font=noto+sans"
                alt="नए कृषि-मित्र पोर्टल का एक प्रतीकात्मक représentation"
                className="w-full h-auto object-cover"
              />
              <figcaption className="text-center text-sm text-gray-500 mt-2">
                कृषि-मित्र पोर्टल का उद्देश्य प्रौद्योगिकी के माध्यम से किसानों
                को सशक्त बनाना है।
              </figcaption>
            </figure>

            {/* --- पोस्ट सामग्री --- */}
            <div
              className="prose prose-lg max-w-none text-gray-800 leading-relaxed"
              style={{ fontFamily: "'Noto Sans Devanagari', sans-serif" }}
            >
              <p>
                <strong>नई दिल्ली:</strong> डिजिटल इंडिया कार्यक्रम को एक और
                बढ़ावा देते हुए, केंद्र सरकार ने आज 'कृषि-मित्र' नामक एक
                महत्वाकांक्षी पोर्टल लॉन्च किया। इस पहल का उद्देश्य देश भर के
                करोड़ों किसानों को नवीनतम तकनीक से जोड़ना और उन्हें महत्वपूर्ण
                जानकारी सीधे उनके मोबाइल फोन पर उपलब्ध कराना है।
              </p>

              <h2>'कृषि-मित्र' की मुख्य विशेषताएं</h2>
              <p>
                यह पोर्टल एक एकीकृत मंच के रूप में काम करेगा जहाँ किसान कई
                सेवाओं का लाभ उठा सकते हैं। कृषि मंत्रालय के एक वरिष्ठ अधिकारी
                ने बताया कि पोर्टल पर वास्तविक समय में मौसम के पूर्वानुमान, सभी
                प्रमुख मंडियों के नवीनतम बाजार भाव और बीज और उर्वरकों पर सब्सिडी
                जैसी सरकारी योजनाओं की विस्तृत जानकारी उपलब्ध होगी।
              </p>

              <blockquote>
                <p>
                  "प्रौद्योगिकी किसानों के लिए एक गेम-चेंजर हो सकती है।
                  'कृषि-मित्र' यह सुनिश्चित करने की दिशा में एक कदम है कि हमारे
                  अन्नदाताओं को उनकी मेहनत का सही मूल्य मिले।"
                </p>
                <cite>– माननीय कृषि मंत्री</cite>
              </blockquote>

              <h2>किसानों के जीवन पर प्रभाव</h2>
              <p>
                विशेषज्ञों का मानना है कि यह पोर्टल बिचौलियों की भूमिका को कम
                करने में मदद करेगा और किसानों को अपनी उपज के लिए बेहतर मूल्य
                प्राप्त करने में सक्षम बनाएगा। इसके अलावा, फसल सलाहकार मॉड्यूल
                किसानों को मिट्टी के स्वास्थ्य और कीट प्रबंधन पर वैज्ञानिक सलाह
                प्रदान करेगा, जिससे फसल की पैदावार में सुधार होने की उम्मीद है।
              </p>

              <p>
                पोर्टल को एक सरल इंटरफ़ेस के साथ डिज़ाइन किया गया है जिसे कम
                तकनीक-प्रेमी उपयोगकर्ता भी आसानी से नेविगेट कर सकते हैं। यह कई
                क्षेत्रीय भाषाओं में उपलब्ध होगा, जिससे इसकी पहुंच और उपयोगिता
                बढ़ेगी। सरकार ने इस पोर्टल के बारे में जागरूकता फैलाने और
                किसानों को इसके उपयोग के लिए प्रशिक्षित करने के लिए देशव्यापी
                अभियान चलाने की भी योजना बनाई है।
              </p>

              <ul>
                <li>
                  <strong>मौसम की सटीक जानकारी:</strong> बुवाई और कटाई के लिए
                  बेहतर योजना।
                </li>
                <li>
                  <strong>पारदर्शी बाजार भाव:</strong> उपज का सही मूल्य
                  सुनिश्चित करना।
                </li>
                <li>
                  <strong>विशेषज्ञ सलाह:</strong> फसल उत्पादकता में वृद्धि।
                </li>
                <li>
                  <strong>सीधा लाभ हस्तांतरण:</strong> सरकारी योजनाओं का लाभ
                  सीधे बैंक खातों में।
                </li>
              </ul>
              <p>
                यह पहल निश्चित रूप से प्रधानमंत्री के 2025 तक किसानों की आय को
                दोगुना करने के दृष्टिकोण को साकार करने में एक लंबा रास्ता तय
                करेगी। 'कृषि-मित्र' पोर्टल सिर्फ एक वेबसाइट नहीं है, बल्कि
                ग्रामीण भारत के डिजिटल सशक्तिकरण का प्रतीक है।
              </p>
            </div>
          </div>

          {/* --- पोस्ट फुटर टैग और शेयर के साथ --- */}
          <footer className="px-6 md:px-10 py-6 border-t border-gray-200 flex flex-col sm:flex-row items-center justify-between">
            <div className="flex flex-wrap gap-2 mb-4 sm:mb-0">
              <span className="text-sm font-semibold text-gray-700 mr-2">
                टैग:
              </span>
              <a
                href="#"
                className="text-xs bg-gray-200 hover:bg-gray-300 text-gray-800 font-medium py-1 px-3 rounded-full transition-colors"
              >
                #डिजिटलइंडिया
              </a>
              <a
                href="#"
                className="text-xs bg-gray-200 hover:bg-gray-300 text-gray-800 font-medium py-1 px-3 rounded-full transition-colors"
              >
                #किसान
              </a>
              <a
                href="#"
                className="text-xs bg-gray-200 hover:bg-gray-300 text-gray-800 font-medium py-1 px-3 rounded-full transition-colors"
              >
                #प्रौद्योगिकी
              </a>
            </div>
            <div className="flex items-center space-x-3">
              <span className="text-sm font-semibold text-gray-700">
                शेयर करें:
              </span>
              <a href="#" aria-label="ट्विटर पर साझा करें">
                <TwitterIcon />
              </a>
              <a href="#" aria-label="फेसबुक पर साझा करें">
                <FacebookIcon />
              </a>
              <a href="#" aria-label="लिंक्डइन पर साझा करें">
                <LinkedinIcon />
              </a>
            </div>
          </footer>
        </article>
      </div>
    </main>
  );
};

// --- लेखक बायो कंपोनेंट ---
const AuthorBio = () => {
  return (
    <section className="bg-white py-12 md:py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gray-100 rounded-lg p-8 flex flex-col md:flex-row items-center gap-8">
          <img
            src="https://placehold.co/120x120/fca5a5/1e293b?text=RS&font=noto+sans"
            alt="लेखक रवि शर्मा"
            className="w-24 h-24 md:w-32 md:h-32 rounded-full object-cover flex-shrink-0 border-4 border-white shadow-md"
          />
          <div>
            <h3 className="text-xl font-bold text-gray-800">
              रवि शर्मा के बारे में
            </h3>
            <p className="text-gray-700 mt-2">
              रवि शर्मा एक अनुभवी पत्रकार हैं, जिन्हें कृषि और प्रौद्योगिकी
              रिपोर्टिंग में एक दशक से अधिक का अनुभव है। वह ग्रामीण भारत को
              सशक्त बनाने वाली कहानियों को उजागर करने के लिए जाने जाते हैं।
            </p>
            <a
              href="#"
              className="text-red-600 hover:text-red-800 font-semibold mt-4 inline-block"
            >
              रवि के और लेख पढ़ें →
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

// --- संबंधित पोस्ट कंपोनेंट ---
const RelatedPosts = () => {
  const posts = [
    {
      image:
        "https://placehold.co/600x400/fb923c/ffffff?text=अर्थव्यवस्था&font=noto+sans",
      category: "अर्थव्यवस्था",
      title: "स्टार्टअप इंडिया: छोटे शहरों से उभर रहे नए यूनिकॉर्न",
      description:
        "कैसे भारत के टियर-2 और टियर-3 शहर देश की स्टार्टअप क्रांति के अगले केंद्र बन रहे हैं।",
    },
    {
      image:
        "https://placehold.co/600x400/60a5fa/ffffff?text=स्वास्थ्य&font=noto+sans",
      category: "स्वास्थ्य",
      title: "आयुष्मान भारत योजना ने पार किया 5 करोड़ का आंकड़ा",
      description:
        "जानें कैसे यह स्वास्थ्य बीमा योजना गरीबों के लिए जीवन रक्षक साबित हो रही है।",
    },
    {
      image:
        "https://placehold.co/600x400/4ade80/ffffff?text=पर्यावरण&font=noto+sans",
      category: "पर्यावरण",
      title: "सौर ऊर्जा में भारत की बड़ी छलांग, नए रिकॉर्ड स्थापित",
      description:
        "नवीकरणीय ऊर्जा के क्षेत्र में भारत कैसे एक वैश्विक नेता के रूप में उभर रहा है।",
    },
  ];

  return (
    <section className="bg-gray-100 pb-16 md:pb-24">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-extrabold text-gray-900 text-center mb-10">
          यह भी पढ़ें
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.map((post, index) => (
            <div
              key={index}
              className="bg-white rounded-lg shadow-lg overflow-hidden group transform hover:-translate-y-2 transition-transform duration-300"
            >
              <img
                src={post.image}
                alt={post.title}
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <p className="text-sm font-semibold text-red-600 mb-2">
                  {post.category}
                </p>
                <h3 className="text-lg font-bold text-gray-800 mb-3 group-hover:text-red-700 transition-colors">
                  {post.title}
                </h3>
                <p className="text-gray-700 text-sm leading-relaxed">
                  {post.description}
                </p>
                <a
                  href="#"
                  className="text-sm font-semibold text-gray-900 mt-4 inline-block hover:text-red-600"
                >
                  पूरा पढ़ें &rarr;
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// --- फुटर कंपोनेंट ---
const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="max-w-6xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="md:flex md:items-center md:justify-between">
          <div className="flex justify-center space-x-6 md:order-2">
            <a href="#" className="hover:text-white">
              <TwitterIcon />
            </a>
            <a href="#" className="hover:text-white">
              <FacebookIcon />
            </a>
            <a href="#" className="hover:text-white">
              <LinkedinIcon />
            </a>
          </div>
          <p className="mt-8 text-center text-base text-gray-400 md:mt-0 md:order-1">
            &copy; २०२५ आज की खबर। सर्वाधिकार सुरक्षित।
          </p>
        </div>
      </div>
    </footer>
  );
};

// --- ऐप कंपोनेंट (सब कुछ एक साथ लाना) ---
export default function App() {
  return (
    <div className="font-sans antialiased text-gray-800 bg-white">
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link
        rel="preconnect"
        href="https://fonts.gstatic.com"
        crossOrigin="true"
      />
      <link
        href="https://fonts.googleapis.com/css2?family=Noto+Sans+Devanagari:wght@400;700&display=swap"
        rel="stylesheet"
      />

      <Header />
      <BlogPost />
      <AuthorBio />
      <RelatedPosts />
      <Footer />
    </div>
  );
}
