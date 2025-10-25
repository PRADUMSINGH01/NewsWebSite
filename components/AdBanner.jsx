"use client";

import React, { useEffect, useRef, useState } from "react";
import Script from "next/script";

function getAdSize(width) {
  if (width < 420) return { w: 320, h: 50 };
  if (width < 640) return { w: 300, h: 250 };
  if (width < 1024) return { w: 336, h: 280 };
  return { w: 160, h: 600 };
}

export default function AdBanner({ adKey = "238e8b8d43de803a5bf28fe2c54f0e30" }) {
  const [size, setSize] = useState(() => {
    if (typeof window === "undefined") return { w: 300, h: 250 };
    return getAdSize(window.innerWidth);
  });

  const timeoutRef = useRef(null);

  useEffect(() => {
    function handleResize() {
      // debounce resize to avoid thrashing the ad script
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      timeoutRef.current = setTimeout(() => {
        const newSize = getAdSize(window.innerWidth);
        setSize((old) => {
          if (old.w === newSize.w && old.h === newSize.h) return old;
          return newSize;
        });
      }, 150);
    }

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  // use the size as part of the Script id so the Script remounts when size changes
  const scriptIdConfig = `ad-config-${size.w}x${size.h}`;
  const scriptIdSrc = `ad-script-${size.w}x${size.h}`;

  return (
    <div className="w-full flex justify-center my-6 px-4">
      <div className="rounded-md overflow-hidden border bg-white shadow-sm flex items-center justify-center">
        {/* The inner wrapper keeps the ad to the chosen pixel size but is responsive in layout */}
        <div
          className="ad-inner"
          style={{ width: `${size.w}px`, height: `${size.h}px`, minWidth: `${size.w}px`, minHeight: `${size.h}px` }}
          aria-hidden="true"
        >
          {/* Inline configuration — it must run before the external script */}
          <Script id={scriptIdConfig} strategy="afterInteractive">
            {`atOptions = { key: '${adKey}', format: 'iframe', height: ${size.h}, width: ${size.w}, params: {} };`}
          </Script>

          {/* External ad script — Reloads when scriptIdSrc changes (size change) */}
          <Script
            id={scriptIdSrc}
            key={scriptIdSrc}
            strategy="afterInteractive"
            src={`//www.highperformanceformat.com/${adKey}/invoke.js`}
          />
        </div>
      </div>

      {/* Helpful fallback for users with JS disabled or adblockers */}
      <noscript className="sr-only">Ads require JavaScript to load.</noscript>
    </div>
  );
}
