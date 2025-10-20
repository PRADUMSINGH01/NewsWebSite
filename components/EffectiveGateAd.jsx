"use client";
import Script from "next/script";

export default function EffectiveGateAd() {
  return (
    <div className="flex justify-center my-6">
      {/* Ad Container */}
      <div id="container-c7494d3736eb47b5beedea4ed44e4eed" className="w-[300px] h-[250px] border rounded-md overflow-hidden shadow-md" />

      {/* Ad Script */}
      <Script
        id="effectivegate-ad-script"
        src="https://pl27892278.effectivegatecpm.com/c7494d3736eb47b5beedea4ed44e4eed/invoke.js"
        strategy="afterInteractive"
        async
      />
    </div>
  );
}
