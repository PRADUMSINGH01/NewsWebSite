// app/components/SimpleAd.jsx
"use client";
import Script from "next/script";

export default function SimpleAd() {
  return (
    <div className="flex justify-center my-6">
      <div className="ad-wrapper w-[160px] h-[300px] rounded shadow-md overflow-hidden">
        {/* If this ad requires a configuration object above the script, include it here as a Script with inline content */}
        {/* Example: 
        <Script id="ad-config" strategy="afterInteractive">
          {`var atOptions = {...};`}
        </Script>
        */}

        {/* The ad script itself */}
        <Script
          id="effectivegatecpm-ad"
          src="https://pl27892215.effectivegatecpm.com/55/cc/8e/55cc8e6bb11898a7db897848ea885762.js"
          strategy="afterInteractive"
          onError={(e) => {
            // optional error handling
            console.error("Ad script failed to load", e);
          }}
        />
      </div>
    </div>
  );
}
