"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Search as SearchIcon,
  Globe as GlobeIcon,
  Bell as BellIcon,
  User as UserIcon,
  Mail as MailIcon,
  X as XIcon,
} from "lucide-react";
import Logo from "@/public/logo.png";

// Professional, compact, accessible header with no burger menu.
// - Desktop: logo | full nav | controls (login/subscribe/search/lang)
// - Mobile: compact single-row header + horizontally scrollable category bar
// - Search opens a modal on all sizes; categories are fully linked and accessible

export default function Header({ setShowSearch: parentShowSearch }) {
  const pathname = usePathname?.() ?? "/";
  const [showSearch, setShowSearch] = useState(false);
  const [lang, setLang] = useState("hi");
  const searchInputRef = useRef(null);

  useEffect(() => {
    if (showSearch) searchInputRef.current?.focus();
  }, [showSearch]);

  const navItems = [
    { t: "होम", url: "/news/होम" },
    { t: "टेक", url: "/news/टेक" },
    { t: "खेल", url: "/news/खेल" },
    { t: "कविता", url: "/kavita" },
    { t: "कहानी", url: "/kahani" },
    { t: "रोचक तथ्य", url: "/news/रोचक तथ्य" },
    { t: "फ़िल्मी दुनिया", url: "/news/फ़िल्मी दुनिया" },
    { t: "फोटो गैलरी", url: "/photo-gallery" },
  ];

  // helper to mark active link
  const isActive = (url) => {
    try {
      const u = new URL(url, "http://example.com");
      return pathname.startsWith(u.pathname);
    } catch (e) {
      return pathname === url;
    }
  };

  return (
    <>
      {/* Top utility bar */}
      <div className="bg-[#f8fafb] text-xs sm:text-sm text-gray-600 border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 flex items-center justify-between h-8 sm:h-10">
          <div className="flex items-center gap-3">
            <span className="font-medium">इंडिया एडिशन</span>
            <span className="hidden sm:inline text-gray-400">|</span>
            <time
              className="hidden sm:inline"
              dateTime={new Date().toISOString()}
            >
              {new Date().toLocaleDateString("hi-IN", {
                weekday: "long",
                day: "numeric",
                month: "long",
                year: "numeric",
              })}
            </time>
          </div>

          <div className="flex items-center gap-3">
            <Link
              href="/login"
              className="hidden sm:inline text-xs hover:text-[#0f4c4c] focus:outline-none focus:ring-2 focus:ring-[#0f4c4c]/30 rounded-sm px-2 py-1"
            >
              <UserIcon className="inline-block -mt-0.5 mr-1" size={14} /> लॉग
              इन
            </Link>
            <Link
              href="/subscribe"
              className="text-xs px-3 py-1 rounded-full bg-[#0f4c4c] text-white font-semibold hover:opacity-95 focus:outline-none focus:ring-2 focus:ring-[#0f4c4c]/40"
            >
              सब्सक्राइब
            </Link>
          </div>
        </div>
      </div>

      {/* Main header */}
      <header className="sticky top-0 z-50 bg-white/95 border-b border-gray-200 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
          {/* Row: compact height on mobile */}
          <div className="flex items-center justify-between h-12 sm:h-16">
            {/* logo */}
            <div className="flex items-center gap-3">
              <Link
                href="/"
                aria-label="देश खबर होमपेज"
                className="flex items-center gap-3"
              >
                <div className="w-24 h-8 sm:w-36 mb-3 sm:h-12 flex items-center justify-center">
                  <Image
                    src={Logo}
                    alt="Logo"
                    width={220}
                    height={72}
                    priority
                  />
                </div>
                <div className="hidden sm:flex flex-col leading-tight"></div>
              </Link>
            </div>

            {/* desktop nav */}
            <nav
              className="hidden md:flex items-center gap-1 md:gap-2 lg:gap-4"
              aria-label="मुख्य नेविगेशन"
            >
              {navItems.map((item, i) => (
                <Link
                  key={i}
                  href={item.url}
                  className={`text-sm font-medium px-3 py-2 rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-[#0f4c4c]/20 ${
                    isActive(item.url)
                      ? "text-[#0f4c4c] bg-gray-50"
                      : "text-gray-700 hover:text-[#0f4c4c] hover:bg-gray-50"
                  }`}
                  aria-current={isActive(item.url) ? "page" : undefined}
                >
                  {item.t}
                </Link>
              ))}
            </nav>

            {/* controls */}
            <div className="flex items-center gap-2">
              <button
                onClick={() => {
                  setShowSearch(true);
                  parentShowSearch?.(true);
                }}
                aria-label="खोजें"
                className="p-2 rounded-md hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-[#0f4c4c]/30"
              >
                <SearchIcon className="h-5 w-5 text-gray-700" />
              </button>

              <div className="hidden sm:flex items-center gap-2 border rounded-full px-2 py-1">
                <GlobeIcon className="h-4 w-4 text-gray-700" />
                <label htmlFor="site-lang" className="sr-only">
                  Site language
                </label>
                <select
                  id="site-lang"
                  value={lang}
                  onChange={(e) => setLang(e.target.value)}
                  className="bg-transparent text-sm focus:outline-none"
                >
                  <option value="hi">हिंदी</option>
                  <option value="en">English</option>
                </select>
              </div>

              <Link
                href="/alerts"
                className="hidden sm:inline p-2 rounded-md hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-[#0f4c4c]/30"
              >
                <BellIcon className="h-5 w-5 text-gray-700" />
              </Link>
            </div>
          </div>

          {/* category strip: single-line, touch-friendly, does not take vertical space on small screens */}
          <div className="mt-1 md:hidden">
            <nav
              aria-label="श्रेणियाँ"
              className="overflow-x-auto no-scrollbar"
            >
              <ul className="inline-flex items-center gap-2 whitespace-nowrap text-sm px-1 py-2">
                {navItems.map((c, i) => (
                  <li key={i} className="flex-shrink-0">
                    <Link
                      href={c.url}
                      className={`inline-block px-3 py-1.5 rounded-full text-xs sm:text-sm transition-colors focus:outline-none focus:ring-2 focus:ring-[#0f4c4c]/20 ${
                        isActive(c.url)
                          ? "bg-[#0f4c4c] text-white"
                          : "bg-white text-gray-700 hover:bg-gray-50 hover:text-[#0f4c4c]"
                      }`}
                    >
                      {c.t}
                    </Link>
                  </li>
                ))}

                {/* overflow affordance */}
                <li className="flex-shrink-0">
                  <Link
                    href="/news/सभी"
                    className="inline-block px-3 py-1.5 rounded-full text-xs sm:text-sm bg-gray-100 text-gray-700"
                  >
                    सब देखें
                  </Link>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </header>

      {/* Search modal (accessible) - toggled via state. It does not rely on parent but will call parentShowSearch if provided. */}
      {/* Search modal: full-screen fixed overlay, top-most, accessible */}
      {showSearch && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="search-dialog-title"
          className="fixed inset-0 z-[99999] flex items-start sm:items-center justify-center p-4 sm:p-6"
        >
          {/* Backdrop (click to close) */}
          <div
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            onClick={() => setShowSearch(false)}
          />

          {/* Modal panel */}
          <div
            // Stop propagation so clicks inside the panel don't close it via backdrop handler
            onClick={(e) => e.stopPropagation()}
            className="relative w-full sm:max-w-2xl max-h-[85vh] overflow-y-auto bg-white rounded-lg shadow-2xl ring-1 ring-black/10"
          >
            <div className="flex items-center gap-2 px-4 py-3 border-b border-gray-100">
              <input
                ref={searchInputRef}
                id="search-dialog-title"
                type="search"
                placeholder="खोजें..."
                // set autofocus programmatically in effect (safer cross-browser)
                className="w-full px-3 py-2 text-sm bg-gray-50 rounded-md focus:outline-none focus:ring-2 focus:ring-[#0f4c4c]/30"
                aria-label="खोज टेक्स्ट"
              />

              <button
                onClick={() => setShowSearch(false)}
                className="p-2 rounded-md hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-[#0f4c4c]/30"
                aria-label="बंद करें"
              >
                <XIcon className="h-5 w-5 text-gray-700" />
              </button>
            </div>

            <div className="px-4 py-3 text-sm text-gray-600">
              सुझाव: आज की प्रमुख खबरें, लेख का शीर्षक, या खोज शब्द लिखें।
            </div>
          </div>
        </div>
      )}

      {/* small helper CSS to hide scrollbar but keep scrollable area */}
      <style jsx>{`
        .no-scrollbar {
          -ms-overflow-style: none; /* IE and Edge */
          scrollbar-width: none; /* Firefox */
        }
        .no-scrollbar::-webkit-scrollbar {
          display: none; /* Safari and Chrome */
        }
      `}</style>
    </>
  );
}
