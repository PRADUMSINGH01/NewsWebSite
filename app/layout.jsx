// app/layout.jsx
"use client";
import { useState, useEffect } from "react";
import "./globals.css";
import { Analytics } from "@vercel/analytics/next";
export default function RootLayout({ children }) {
  const [theme, setTheme] = useState("light");

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme) setTheme(savedTheme);
  }, []);

  useEffect(() => {
    document.documentElement.className = theme;
    localStorage.setItem("theme", theme);
  }, [theme]);

  return (
    <html lang="hi">
      <body>
        <main className="container mx-auto px-4 py-6">{children}</main>
        <Analytics />
      </body>
    </html>
  );
}
