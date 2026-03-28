"use client";
// components/ViewCounter.jsx
// Premium view counter with animated count-up, session deduplication,
// and a polished inline display.

import React, { useEffect, useState, useRef } from "react";

/** Format large numbers for display */
function formatViews(n) {
  if (n >= 10_000_000) return `${(n / 10_000_000).toFixed(1)} करोड़`;
  if (n >= 100_000) return `${(n / 100_000).toFixed(1)} लाख`;
  if (n >= 1_000) return `${(n / 1_000).toFixed(1)}K`;
  return n.toLocaleString("hi-IN");
}

/**
 * ViewCounter — displays and optionally increments the view count for an article.
 *
 * Props:
 *   slug      — article slug (required)
 *   readOnly  — if true, only fetches count without incrementing
 *   showLabel — if true, shows "पाठक" label next to count
 *   size      — "sm" | "md" | "lg" — visual size variant
 *   className — extra CSS classes
 */
export default function ViewCounter({
  slug,
  readOnly = false,
  showLabel = true,
  size = "md",
  className = "",
}) {
  const [views, setViews] = useState(null); // null = loading
  const [animate, setAnimate] = useState(false);
  const hasFetched = useRef(false);

  useEffect(() => {
    if (!slug || hasFetched.current) return;
    hasFetched.current = true;

    // Deduplicate within one browser session (prevents refresh-spam)
    const sessionKey = `hd_viewed_${slug}`;
    const alreadyCounted =
      typeof sessionStorage !== "undefined"
        ? sessionStorage.getItem(sessionKey)
        : false;

    const method = !readOnly && !alreadyCounted ? "POST" : "GET";

    fetch(`/api/views/${encodeURIComponent(slug)}`, {
      method,
      headers: { "Content-Type": "application/json" },
    })
      .then((r) => r.json())
      .then((data) => {
        const count = data?.views ?? 0;
        setViews(count);

        // Mark as counted in session
        if (method === "POST" && typeof sessionStorage !== "undefined") {
          sessionStorage.setItem(sessionKey, "1");
        }

        // Trigger count-up animation
        setTimeout(() => setAnimate(true), 100);
      })
      .catch((err) => {
        console.debug("[ViewCounter] fetch error:", err);
        setViews(0);
      });
  }, [slug, readOnly]);

  // Size variants
  const sizes = {
    sm: { icon: "w-3.5 h-3.5", text: "text-xs", gap: "gap-1" },
    md: { icon: "w-4 h-4", text: "text-sm", gap: "gap-1.5" },
    lg: { icon: "w-5 h-5", text: "text-base", gap: "gap-2" },
  };
  const s = sizes[size] || sizes.md;

  // Loading skeleton
  if (views === null) {
    return (
      <span
        className={`inline-flex items-center ${s.gap} ${className}`}
        style={{ color: "var(--text-muted)" }}
      >
        <EyeIcon className={s.icon} />
        <span
          className="inline-block rounded animate-pulse"
          style={{
            width: "2rem",
            height: "0.75rem",
            background: "var(--bg-muted)",
          }}
        />
      </span>
    );
  }

  return (
    <span
      className={`inline-flex items-center ${s.gap} ${s.text} font-medium ${className}`}
      style={{ color: "var(--text-secondary)" }}
      title={`${views.toLocaleString("hi-IN")} पाठकों ने पढ़ा`}
    >
      <EyeIcon className={s.icon} />
      <span
        style={{
          transition: "opacity 0.4s ease, transform 0.4s ease",
          opacity: animate ? 1 : 0,
          transform: animate ? "translateY(0)" : "translateY(4px)",
        }}
      >
        {formatViews(views)}
      </span>
      {showLabel && (
        <span
          className="hidden sm:inline"
          style={{ color: "var(--text-muted)", fontSize: "0.75rem" }}
        >
          पाठक
        </span>
      )}
    </span>
  );
}

/* ─── Eye Icon ───────────────────────────────────────────────── */
function EyeIcon({ className = "w-4 h-4" }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      style={{ color: "var(--text-muted)", flexShrink: 0 }}
      aria-hidden="true"
    >
      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  );
}
