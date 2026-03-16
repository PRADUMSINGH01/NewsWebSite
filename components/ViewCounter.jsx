"use client";
// components/ViewCounter.jsx
// - On mount: POSTs to /api/views/[slug] to increment, then displays count
// - Accepts an optional `readOnly` prop to just fetch without incrementing

import React, { useEffect, useState } from "react";

function formatViews(n) {
  if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(1)}M`;
  if (n >= 1_000)     return `${(n / 1_000).toFixed(1)}K`;
  return String(n);
}

export default function ViewCounter({ slug, readOnly = false, className = "" }) {
  const [views,   setViews]   = useState(null);   // null = loading
  const [counted, setCounted] = useState(false);

  useEffect(() => {
    if (!slug) return;

    // Deduplicate within one browser session
    const sessionKey = `viewed_${slug}`;
    const alreadyCounted = typeof sessionStorage !== "undefined"
      ? sessionStorage.getItem(sessionKey)
      : false;

    const method = (!readOnly && !alreadyCounted) ? "POST" : "GET";

    fetch(`/api/views/${encodeURIComponent(slug)}`, { method })
      .then((r) => r.json())
      .then(({ views }) => {
        setViews(views ?? 0);
        if (method === "POST" && typeof sessionStorage !== "undefined") {
          sessionStorage.setItem(sessionKey, "1");
        }
        setCounted(true);
      })
      .catch(() => setViews(0));
  }, [slug, readOnly]);

  if (views === null) {
    // Skeleton
    return (
      <span className={`inline-flex items-center gap-1 text-gray-400 ${className}`}>
        <EyeIcon />
        <span className="w-8 h-3 bg-gray-200 rounded animate-pulse inline-block" />
      </span>
    );
  }

  return (
    <span
      className={`inline-flex items-center gap-1 text-gray-500 text-sm font-medium ${className}`}
      title={`${views.toLocaleString("hi-IN")} views`}
    >
      <EyeIcon />
      <span>{formatViews(views)}</span>
      <span className="hidden sm:inline text-xs text-gray-400">व्यूज़</span>
    </span>
  );
}

function EyeIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="w-4 h-4 text-gray-400"
      aria-hidden="true"
    >
      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  );
}
