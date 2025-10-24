import React from "react";
import Link from "next/link";
import Image from "next/image";
import Logo from "@/public/logo.png";
import {
  Facebook,
  Twitter,
  Instagram,
  Youtube,
  Globe,
  Mail,
  FileText,
  FileQuestion,
} from "lucide-react";

const CATEGORIES = [
  { name: "Politics", href: "/news/समाचार" },
  { name: "Entertainment", href: "/news/टेक" },
  { name: "Sports", href: "/news/खेल" },
  { name: "Technology", href: "/news/शिक्षा" },
  { name: "Moivies", href: "/news/फ़िल्मी दुनिया" },
];

const COMPANY = [
  { name: "About Us", href: "/about-us" },
  { name: "Careers", href: "/careers" },
  { name: "Advertise", href: "/advertise" },
];

const LEGAL = [
  { name: "Privacy Policy", href: "/privacy-Policy" },
  { name: "Cookie Policy", href: "/cookies-policy" },
  { name: "Disclaimer", href: "/Disclaimer" },
  
];


export default function Footer() {
  return (
    <footer className="bg-white text-black border-t border-gray-200 mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-8">
          {/* Brand */}
          <div className="col-span-1 lg:col-span-4">
            <div className="flex items-start gap-4">
              <div className="w-16 h-16 rounded-lg flex items-center justify-center shadow-sm bg-white ring-1 ring-gray-100">
                <Image src={Logo} alt="Desh Khabar" width={48} height={48} className="rounded" />
              </div>

              <div>
                <h2 className="text-lg font-semibold leading-tight">hmarduniya</h2>
                <p className="text-xs text-gray-700 max-w-sm leading-relaxed mt-1">
                  Fast · Reliable · Independent — Trusted national and global news source.
                </p>

                <div className="mt-4 flex items-center gap-2">
                  {[
                    { Icon: Facebook, label: "Facebook", href: "https://facebook.com" },
                    { Icon: Twitter, label: "Twitter", href: "https://twitter.com" },
                    { Icon: Instagram, label: "Instagram", href: "https://instagram.com" },
                    { Icon: Youtube, label: "YouTube", href: "https://youtube.com" },
                  ].map(({ Icon, label, href }) => (
                    <a
                      key={label}
                      href={href}
                      aria-label={label}
                      className="inline-flex items-center justify-center w-9 h-9 rounded-md border border-gray-200 text-gray-700 hover:bg-[#0a7f7f] hover:text-white transition"
                      rel="noopener noreferrer"
                      target="_blank"
                    >
                      <Icon size={16} />
                    </a>
                  ))}
                </div>
              </div>
            </div>

            <p className="mt-6 text-xs text-gray-600">
              Ads displayed on this website are served by Google. Read our <Link href="/privacy-policy" className="underline">Privacy Policy</Link>.
            </p>
          </div>

          {/* Links */}
          <nav aria-label="Footer Navigation" className="col-span-1 lg:col-span-5 grid grid-cols-2 gap-6">
            <div>
              <h3 className="text-sm font-semibold uppercase tracking-wider mb-3">Categories</h3>
              <ul className="space-y-2 text-sm">
                {CATEGORIES.map(({ name, href }) => (
                  <li key={name}>
                    <Link href={href} className="hover:text-[#0a7f7f] transition-colors">
                      {name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-semibold uppercase tracking-wider mb-3">Company</h3>
              <ul className="space-y-2 text-sm">
                {COMPANY.map(({ name, href }) => (
                  <li key={name}>
                    <Link href={href} className="hover:text-[#0a7f7f] transition-colors">
                      {name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-semibold uppercase tracking-wider mb-3">Legal</h3>
              <ul className="space-y-2 text-sm">
                {LEGAL.map(({ name, href }) => (
                  <li key={name}>
                    <Link href={href} className="hover:text-[#0a7f7f] transition-colors">
                      {name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

          
          </nav>

          {/* Newsletter & quick links */}
          <div className="col-span-1 lg:col-span-3">
            <h3 className="text-sm font-semibold uppercase tracking-wider mb-3">Newsletter</h3>
            <p className="text-sm text-gray-700 mb-4">Get the latest headlines in your inbox — Subscribe for our weekly digest.</p>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                alert("Thank you for subscribing (Demo)");
              }}
              className="flex gap-2"
            >
              <label htmlFor="footer-email" className="sr-only">Email Address</label>
              <input id="footer-email" type="email" required placeholder="Your Email" className="flex-1 px-3 py-2 rounded-md border border-gray-200 text-sm placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#0a7f7f]" />
              <button type="submit" className="px-3 py-2 rounded-md bg-[#0a7f7f] text-white text-sm font-medium hover:bg-[#0e6f6f] focus:outline-none">Subscribe</button>
            </form>

            <div className="mt-6 text-xs text-gray-600">
              <p>Essential Links:</p>
              <ul className="mt-2 space-y-1">
                <li><Link href="/privacy-Policy" className="underline">Privacy Policy</Link></li>
                <li><Link href="/contact" className="underline">Contact</Link></li>
                <li><Link href="/sitemap.xml" className="underline">Sitemap</Link></li>
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-10 pt-6 border-t border-gray-100 flex flex-col sm:flex-row items-center justify-between gap-3 text-sm text-gray-700">
          <p className="text-xs">&copy; {new Date().getFullYear()} Desh Khabar Media — All Rights Reserved.</p>

          <div className="flex items-center gap-4">
            <Link href="/terms" className="hover:text-[#0a7f7f]">Terms</Link>
            <Link href="/privacy-Policy" className="hover:text-[#0a7f7f]">Privacy</Link>
            <Link href="/cookie-policy" className="hover:text-[#0a7f7f]">Cookies</Link>
            <span className="text-gray-300">|</span>
            <span className="text-xs text-gray-600">Crafted by <strong className="font-semibold">hmarduniya</strong></span>
          </div>
        </div>
      </div>
    </footer>
  );
}