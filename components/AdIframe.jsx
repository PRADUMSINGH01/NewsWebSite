// AdIframe.jsx
"use client";
import React, { useEffect, useRef, useState } from "react";

/**
 * Standard sizes (width x height). We choose the largest standard slot
 * whose width is <= containerWidth. If none fit, we pick the smallest and scale it down.
 */
const STANDARD_SIZES = [
  { w: 160, h: 600 },
  { w: 728, h: 90 },
  { w: 336, h: 280 },
  { w: 300, h: 250 },
  { w: 320, h: 50 },
];

function chooseBestSize(containerWidth, defaultW, defaultH) {
  if (!containerWidth) return { w: defaultW, h: defaultH };
  // find sizes that fit
  const candidates = STANDARD_SIZES.filter((s) => s.w <= containerWidth).sort((a, b) => b.w - a.w);
  if (candidates.length > 0) return candidates[0];
  // no candidate fits (very narrow container) -> pick smallest and scale
  return STANDARD_SIZES[STANDARD_SIZES.length - 1];
}

/**
 * Props:
 * - keyValue: ad key
 * - format, width, height, params, className
 * - lazy (default: true) -> use IntersectionObserver to lazy-load
 * - offset (default: '200px') -> rootMargin for lazy load
 * - debug -> shows overlay with chosen size (for dev)
 */
export default function AdIframe({
  keyValue = "ea47bb194fc68c42baa2c7c829e15e3f",
  format = "iframe",
  width = 728,
  height = 90,
  params = {},
  className = "",
  lazy = true,
  offset = "200px",
  debug = false,
}) {
  const containerRef = useRef(null);
  const adInnerRef = useRef(null);
  const [containerWidth, setContainerWidth] = useState(null);
  const [adSize, setAdSize] = useState({ w: width, h: height });
  const [visible, setVisible] = useState(!lazy); // if lazy -> start false, will become true when in view

  // ResizeObserver to track container width for responsive behavior
  useEffect(() => {
    const el = containerRef.current;
    if (!el) {
      setContainerWidth(typeof window !== "undefined" ? window.innerWidth : null);
      return;
    }

    const ro = new ResizeObserver((entries) => {
      const w = Math.max(0, Math.round(entries[0].contentRect.width));
      setContainerWidth(w);
    });

    ro.observe(el);
    // initial set
    setContainerWidth(Math.round(el.getBoundingClientRect().width));

    return () => ro.disconnect();
  }, []);

  // IntersectionObserver for lazy loading (only inject scripts when in/near viewport)
  useEffect(() => {
    if (!lazy) return undefined;
    const el = containerRef.current;
    if (!el || typeof IntersectionObserver === "undefined") {
      // fallback -> mark visible immediately
      setVisible(true);
      return undefined;
    }

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisible(true);
            io.disconnect();
          }
        });
      },
      { root: null, rootMargin: offset, threshold: 0.01 }
    );

    io.observe(el);
    return () => io.disconnect();
  }, [lazy, offset]);

  // pick best ad size for current container width
  useEffect(() => {
    const best = chooseBestSize(containerWidth, width, height);
    setAdSize((old) => (old.w === best.w && old.h === best.h ? old : best));
  }, [containerWidth, width, height]);

  // mount / unmount ad scripts when visible and adSize (or key) changes
  useEffect(() => {
    if (!visible) return undefined; // don't mount until visible (lazy)
    const node = adInnerRef.current;
    if (!node || typeof window === "undefined") return undefined;

    // Clear previous
    node.innerHTML = "";

    // Create config script (must run before the loader)
    const configScript = document.createElement("script");
    configScript.type = "text/javascript";
    configScript.text = `
      atOptions = {
        key: '${String(keyValue)}',
        format: '${String(format)}',
        height: ${Number(adSize.h)},
        width: ${Number(adSize.w)},
        params: ${JSON.stringify(params || {})}
      };
    `;

    // Create loader script
    const loaderScript = document.createElement("script");
    loaderScript.type = "text/javascript";
    loaderScript.src = `//www.highperformanceformat.com/${encodeURIComponent(String(keyValue))}/invoke.js`;
    loaderScript.async = true;

    // Append scripts in order
    node.appendChild(configScript);
    node.appendChild(loaderScript);

    // Cleanup before next injection / unmount
    return () => {
      if (node) node.innerHTML = "";
    };
    // intentionally include only values that should trigger remount
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [visible, adSize.w, adSize.h, keyValue, JSON.stringify(params), format]);

  // compute scale so the chosen ad never overflows container
  const scale = containerWidth && adSize.w ? Math.min(1, containerWidth / adSize.w) : 1;
  const wrapperHeight = Math.round(adSize.h * scale);

  return (
    <div
      ref={containerRef}
      className={`w-full flex justify-center my-6 px-4 ${className}`}
      aria-label="ad-wrapper"
      style={{ minHeight: wrapperHeight }}
    >
      <div
        className="relative flex items-start justify-center"
        style={{
          width: `${Math.round(adSize.w)}px`,
          height: `${Math.round(adSize.h)}px`,
        }}
        aria-hidden={!visible}
      >
        {/* Scaled visual wrapper so the ad fits narrow containers */}
        <div
          style={{
            transform: `scale(${scale})`,
            transformOrigin: "top center",
            width: `${adSize.w}px`,
            height: `${adSize.h}px`,
            overflow: "hidden",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <div
            ref={adInnerRef}
            style={{ width: `${adSize.w}px`, height: `${adSize.h}px` }}
            className="ad-inner"
          />
        </div>

        {/* optional small sticky loader / placeholder while lazy-loading */}
        {!visible && (
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-md shadow-sm">
              Loading ad…
            </div>
          </div>
        )}

        {/* debug overlay to show chosen slot & scale (dev only) */}
        {debug && (
          <div className="absolute left-1 top-1 bg-black/60 text-white text-xs px-2 py-1 rounded">
            {adSize.w}×{adSize.h} (scale: {scale.toFixed(2)})
          </div>
        )}
      </div>

      {/* accessibility + fallback for no-JS users */}
      <noscript className="sr-only">Ads require JavaScript to load.</noscript>
    </div>
  );
}
