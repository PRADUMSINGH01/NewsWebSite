// AdIframe.jsx
"use client";
import React, { useEffect, useRef } from "react";

export default function AdIframe({
  keyValue = "ea47bb194fc68c42baa2c7c829e15e3f",
  format = "iframe",
  width = 728,
  height = 90,
  params = {},
  className = "",
}) {
  const containerRef = useRef(null);

  useEffect(() => {
    if (typeof window === "undefined") return;

    // Build the atOptions object as a JS string
    const atOptionsString = `
      atOptions = {
        key: '${keyValue}',
        format: '${format}',
        height: ${Number(height)},
        width: ${Number(width)},
        params: ${JSON.stringify(params)}
      };
    `;

    // Create first script that defines atOptions
    const configScript = document.createElement("script");
    configScript.type = "text/javascript";
    configScript.text = atOptionsString;

    // Create second script that loads the external file
    const loaderScript = document.createElement("script");
    loaderScript.type = "text/javascript";
    loaderScript.src = `//www.highperformanceformat.com/${keyValue}/invoke.js`;
    loaderScript.async = true;

    // Append to container
    const container = containerRef.current;
    if (container) {
      // Clean previous (in case of re-renders)
      container.innerHTML = "";
      container.appendChild(configScript);
      container.appendChild(loaderScript);
    }

    // Cleanup on unmount
    return () => {
      if (container) container.innerHTML = "";
    };
  }, [keyValue, format, width, height, JSON.stringify(params)]);

  // A wrapper div. Styling can be passed via className.
  return (
    <div
      ref={containerRef}
      className={className}
      style={{ width: `${width}px`, height: `${height}px`, overflow: "hidden" }}
      aria-label="advertisement"
    />
  );
}
