"use client";
import React, { useState } from "react";
import Image from "next/image";
import {
  Search as SearchIcon,
  Globe as GlobeIcon,
  Menu as MenuIcon,
  X as XIcon,
} from "lucide-react";
import Logo from "@/public/logo.png";

const Header = ({ setShowSearch }) => {
  const [open, setOpen] = useState(false);

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
          <div className="flex flex-col md:flex-row items-center gap-6">
            <a
              href="/"
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

            {/* mobile menu button */}
            <button
              onClick={() => setOpen(!open)}
              className="md:hidden absolute right-4 top-6 border border-gray-200 rounded-md p-2 bg-white"
            >
              {open ? (
                <XIcon className="h-5 w-5" />
              ) : (
                <MenuIcon className="h-5 w-5" />
              )}
            </button>

            {/* nav links */}
            <nav
              className={`${
                open ? "flex" : "hidden"
              } md:flex flex-col md:flex-row items-center gap-1 md:gap-1 bg-white md:bg-transparent absolute md:static top-16 left-0 w-full md:w-auto border md:border-0 border-gray-200 md:shadow-none shadow-sm`}
              aria-label="मुख्य नेविगेशन"
            >
              {[
                { t: "समाचार", url: "/news/सभी" },
                { t: "टेक", url: "/news/टेक" },
                { t: "खेल", url: "/news/खेल" },
                { t: "कविता", url: "kavita" },
                { t: "कहानी", url: "kahani" },
                { t: "रोचक तथ्य", url: "/news/रोचक-तथ्य" },
                { t: "फ़िल्मी दुनिया", url: "/news/फ़िल्मी दुनिया" },
                { t: "फोटो गैलरी", url: "photo-gallery" },
              ].map((c, i) => (
                <a
                  key={i}
                  href={c.url}
                  onClick={() => setOpen(false)}
                  className="text-sm font-medium px-4 py-2 rounded-md text-gray-700 hover:bg-gray-100 hover:text-[#0f4c4c] transition-colors w-full md:w-auto text-center"
                >
                  {c.t}
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

export default Header;
