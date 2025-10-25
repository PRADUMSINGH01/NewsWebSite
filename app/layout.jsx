// app/layout.jsx
"use client";

import { useState, useEffect } from "react";
import "./globals.css";
import Script from "next/script";
import { Analytics } from "@vercel/analytics/next";

export default function RootLayout({ children }) {
  const [theme, setTheme] = useState("light");

  // read theme on mount (safe for SSR)
  useEffect(() => {
    try {
      const savedTheme = localStorage.getItem("theme");
      if (savedTheme) setTheme(savedTheme);
    } catch (e) {
      // ignore (e.g., privacy mode)
    }
  }, []);

  // apply & persist theme when it changes
  useEffect(() => {
    if (typeof document !== "undefined") {
      document.documentElement.className = theme;
    }
    try {
      localStorage.setItem("theme", theme);
    } catch (e) {
      // ignore
    }
  }, [theme]);

  return (
    <html lang="hi">
      <head />
      <body>
        {/* Example ad vendor script (keeps the original src you had) */}
        <Script
          id="effectivegate-invoke-1"
          strategy="afterInteractive"
          src="//pl27892278.effectivegatecpm.com/c7494d3736eb47b5beedea4ed44e4eed/invoke.js"
        />
        <div id="container-c7494d3736eb47b5beedea4ed44e4eed" />

        <main className="container mx-auto px-4 py-6">{children}</main>

        <Analytics />

        {/* HighPerformanceFormat ad: inlined atOptions must run before loader */}
        <Script
          id="highperf-config-b3e206ab"
          strategy="afterInteractive"
        >
          {`atOptions = {'key' : 'b3e206ab09875edff65f1e106e654a4c','format' : 'iframe','height' : 60,'width' : 468,'params' : {}};`}
        </Script>

        <Script
          id="highperf-loader-b3e206ab"
          strategy="afterInteractive"
          src="//www.highperformanceformat.com/b3e206ab09875edff65f1e106e654a4c/invoke.js"
        />

        {/* Another vendor script (converted to Script) */}
        <Script
          id="effectivegate-invoke-2"
          strategy="afterInteractive"
          src="//pl27892315.effectivegatecpm.com/4d/71/c9/4d71c9a1893eae6d17dfbc886d638a03.js"
        />

        {/* Fallback for users with JS disabled */}
        <noscript>
          <div style={{ textAlign: "center", padding: "8px 0", fontSize: 12 }}>
            Some page features (including ads) require JavaScript to load.
          </div>
        </noscript>
      </body>
    </html>
  );
}
