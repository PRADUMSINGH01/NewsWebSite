// Footer.jsx
import { Facebook, Twitter, Instagram, Youtube } from "lucide-react";
import Logo from "@/public/logo.png";
import Image from "next/image";
const CATEGORIES = ["राजनीति", "मनोरंजन", "खेल", "टेक", "व्यापार"];
const COMPANY = ["हमारे बारे में", "संपर्क करें", "करियर", "विज्ञापन"];
const LEGAL = ["गोपनीयता नीति", "सेवा की शर्तें"];

export default function Footer() {
  return (
    <footer className="bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800 mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-12 gap-8 items-start">
          {/* Brand */}
          <div className="col-span-2 lg:col-span-4">
            <a
              href="#"
              className="inline-flex items-center gap-3 mb-4 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500 rounded"
              aria-label="देश खबर — Home"
            >
              <div className="w-12  h-12 rounded-lg flex items-center justify-center shadow-sm bg-white">
                <Image
                  src={Logo}
                  alt="Logo"
                  className="rounded-xl "
                  width={400}
                  height={400}
                ></Image>
              </div>

              <div>
                <div className="text-2xl font-extrabold leading-tight text-gray-900 dark:text-white"></div>
                <div className="text-xs text-gray-500 dark:text-gray-400">
                  तेज़ · विश्वसनीय · स्वतंत्र
                </div>
              </div>
            </a>

            <p className="text-sm text-gray-600 dark:text-gray-300 max-w-md leading-relaxed">
              भारत और दुनिया भर से सटीक, भरोसेमंद समाचार और गहराई से विश्लेषण —
              आपके भरोसेमंद स्थानीय और राष्ट्रीय समाचार स्रोत।
            </p>

            <div className="mt-6 flex items-center gap-3">
              {[
                { Icon: Facebook, label: "Facebook" },
                { Icon: Twitter, label: "Twitter" },
                { Icon: Instagram, label: "Instagram" },
                { Icon: Youtube, label: "YouTube" },
              ].map(({ Icon, label }, i) => (
                <a
                  key={i}
                  href="#"
                  aria-label={label}
                  className="inline-flex items-center justify-center w-9 h-9 rounded-md border border-gray-200 dark:border-gray-800 text-gray-600 dark:text-gray-300 hover:bg-[#0a7f7f] hover:text-white transition focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#0a7f7f]"
                >
                  <Icon size={16} />
                </a>
              ))}
            </div>
          </div>

          {/* Links */}
          <nav
            aria-label="Footer Navigation"
            className="col-span-4 lg:col-span-5 grid grid-cols-2 gap-8"
          >
            <div>
              <h3 className="text-sm font-semibold text-gray-800 dark:text-gray-100 uppercase tracking-wider mb-3">
                श्रेणियाँ
              </h3>
              <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-300">
                {CATEGORIES.map((c) => (
                  <li key={c}>
                    <a
                      href="#"
                      className="hover:text-[#0a7f7f] dark:hover:text-[#0a7f7f] transition-colors"
                    >
                      {c}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-semibold text-gray-800 dark:text-gray-100 uppercase tracking-wider mb-3">
                कंपनी
              </h3>
              <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-300">
                {COMPANY.map((c) => (
                  <li key={c}>
                    <a
                      href="#"
                      className="hover:text-[#0a7f7f] dark:hover:text-[#0a7f7f] transition-colors"
                    >
                      {c}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-semibold text-gray-800 dark:text-gray-100 uppercase tracking-wider mb-3">
                कानूनी
              </h3>
              <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-300">
                {LEGAL.map((c) => (
                  <li key={c}>
                    <a
                      href="#"
                      className="hover:text-[#0a7f7f] dark:hover:text-[#0a7f7f] transition-colors"
                    >
                      {c}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </nav>

          {/* Newsletter (compact) */}
          <div className="col-span-2 lg:col-span-3">
            <h3 className="text-sm font-semibold text-gray-800 dark:text-gray-100 uppercase tracking-wider mb-3">
              न्यूज़लेटर
            </h3>

            <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">
              ताज़ा खबरें सीधे आपके इनबॉक्स में — साप्ताहिक सारांश signup करें।
            </p>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                // implement subscribe logic
                // e.g., send to API route
                alert("धन्यवाद — आपने सब्सक्राइब किया (डेमो)।");
              }}
              className="flex gap-2"
            >
              <label htmlFor="footer-email" className="sr-only">
                ईमेल पता
              </label>
              <input
                id="footer-email"
                type="email"
                required
                placeholder="आपका ईमेल"
                className="flex-1 min-w-0 px-3 py-2 rounded-md border border-gray-200 bg-white text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#0a7f7f] focus:border-transparent"
              />
              <button
                type="submit"
                className="px-3 py-2 rounded-md bg-[#0a7f7f] text-white text-sm font-medium hover:bg-[#0e6f6f] focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-[#0a7f7f]"
                aria-label="Subscribe"
              >
                सब्सक्राइब
              </button>
            </form>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-10 pt-6 border-t border-gray-100 dark:border-gray-800 flex flex-col sm:flex-row items-center justify-between gap-3 text-sm text-gray-600 dark:text-gray-400">
          <p>
            &copy; {new Date().getFullYear()} देश खबर मीडिया — सर्वाधिकार
            सुरक्षित।
          </p>
          <div className="flex items-center gap-4">
            <a
              href="#"
              className="hover:text-[#0a7f7f] dark:hover:text-[#0a7f7f] transition"
            >
              उपयोग की शर्तें
            </a>
            <a
              href="#"
              className="hover:text-[#0a7f7f] dark:hover:text-[#0a7f7f] transition"
            >
              गोपनीयता
            </a>
            <span className="text-gray-300 dark:text-gray-700">|</span>
            <span className="text-xs text-gray-500 dark:text-gray-500">
              Crafted by{" "}
              <strong className="text-gray-700 dark:text-gray-200">
                hmarduniya
              </strong>
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
