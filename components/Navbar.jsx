// components/Navbar.jsx
"use client";
import { useState } from "react";
import { usePathname } from "next/navigation";

export default function Navbar({ theme, setTheme }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();

  const toggleTheme = () => {
    const themes = ["light", "dark", "reading"];
    const currentIndex = themes.indexOf(theme);
    const nextIndex = (currentIndex + 1) % themes.length;
    setTheme(themes[nextIndex]);
  };

  const navLinks = [
    { title: "मुख्य समाचार", href: "/" },
    { title: "राजनीति", href: "/politics" },
    { title: "खेल", href: "/sports" },
    { title: "मनोरंजन", href: "/entertainment" },
    { title: "व्यापार", href: "/business" },
  ];

  const getThemeIcon = () => {
    switch (theme) {
      case "dark":
        return "🌙";
      case "reading":
        return "📖";
      default:
        return "☀️";
    }
  };

  return (
    <nav className="bg-white dark:bg-gray-900 reading:bg-amber-50 shadow-md">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <div className="text-2xl font-bold text-gray-800 dark:text-white reading:text-amber-900">
              समाचार
            </div>
          </div>

          {/* Desktop Navigation */}
          <div className="flex items-center space-x-8">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className={`${pathname === link.href
                    ? "text-[#0f4c4c] dark:text-[#0a7f7f] reading:text-amber-700 font-bold"
                    : "text-gray-700 dark:text-gray-300 reading:text-amber-900"
                  } hover:text-[#0a7f7f] transition-colors`}
              >
                {link.title}
              </a>
            ))}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={toggleTheme}
              className="mr-4 p-2 rounded-full bg-gray-200 dark:bg-gray-700 reading:bg-amber-200"
              aria-label="Theme switcher"
            >
              <span className="text-xl">{getThemeIcon()}</span>
            </button>

            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2 rounded-md text-gray-700 dark:text-gray-300 reading:text-amber-900"
              aria-label="Menu"
            >
              {isMenuOpen ? (
                <svg
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              ) : (
                <svg
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="hidden bg-white dark:bg-gray-900 reading:bg-amber-50">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className={`${pathname === link.href
                    ? "bg-[#0f4c4c]/10 text-[#0f4c4c] dark:bg-[#0f4c4c]/20 dark:text-[#0a7f7f] reading:bg-amber-100 reading:text-amber-700"
                    : "text-gray-700 dark:text-gray-300 reading:text-amber-900 hover:bg-gray-100 dark:hover:bg-gray-800 reading:hover:bg-amber-100"
                  } block px-3 py-2 rounded-md font-medium`}
              >
                {link.title}
              </a>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
}
