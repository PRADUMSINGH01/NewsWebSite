// app/components/HighPerfAd.jsx
"use client";
import Script from "next/script";

export default function HighPerfAd() {
  return (
    <div className="flex justify-center my-6">
      {/* Reserve space to avoid layout shift — adjust size to match the ad */}
      <div
        id="highperf-ad-238e8b8d43de803a5bf28fe2c54f0e30"
        className="w-[160px] h-[300px] overflow-hidden"
        aria-hidden="true"
      />

      {/* Inline config must be present BEFORE the provider script */}
      <Script id="highperf-ad-config" strategy="afterInteractive">
        {`
          atOptions = {
            'key' : '238e8b8d43de803a5bf28fe2c54f0e30',
            'format' : 'iframe',
            'height' : 300,
            'width' : 160,
            'params' : {}
          };
        `}
      </Script>

      {/* External provider script */}
      <Script
        id="highperf-ad-invoke"
        src="https://www.highperformanceformat.com/238e8b8d43de803a5bf28fe2c54f0e30/invoke.js"
        strategy="afterInteractive"
        async
      />
    </div>
  );
}
