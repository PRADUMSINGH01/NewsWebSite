// app/layout.jsx
"use client";

import { useState, useEffect } from "react";
import "./globals.css";
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
       

        <main className="container mx-auto px-4 py-6">{children}</main>

        <Analytics />

      
      
      </body>
    </html>
  );
}
