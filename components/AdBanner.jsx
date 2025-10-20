"use client";
import Script from "next/script";

export default function AdBanner() {
  return (
    <div className="flex justify-center my-6">
      {/* Ad Container */}
      <div id="ad-container" className="border rounded-md overflow-hidden">
        {/* First script: ad configuration */}
        <Script id="ad-config" strategy="afterInteractive">
          {`
            atOptions = {
              'key': '238e8b8d43de803a5bf28fe2c54f0e30',
              'format': 'iframe',
              'height': 300,
              'width': 160,
              'params': {}
            };
          `}
        </Script>

        {/* Second script: ad source */}
        <Script
          id="ad-script"
          strategy="afterInteractive"
          src="//www.highperformanceformat.com/238e8b8d43de803a5bf28fe2c54f0e30/invoke.js"
        />
      </div>
    </div>
  );
}
