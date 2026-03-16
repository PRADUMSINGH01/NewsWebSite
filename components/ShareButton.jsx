"use client";

import React, { useState } from "react";
import { Share2, MessageCircle, Twitter, Facebook, Link as LinkIcon, Check } from "lucide-react";

export default function ShareButton({ url, title = "", image, className = "" }) {
  const [copied, setCopied] = useState(false);

  if (!url) return null;

  const shareUrl = url.startsWith("http")
    ? url
    : `https://www.hmarduniya.in${url}`;
  const encodedShareUrl = encodeURIComponent(shareUrl);
  const encodedTitle = encodeURIComponent(title || "");

  const whatsappHref = `https://api.whatsapp.com/send?text=${encodeURIComponent(
    title ? title + " " + shareUrl : shareUrl
  )}`;
  const twitterHref = `https://twitter.com/intent/tweet?text=${encodedTitle}&url=${encodedShareUrl}`;
  const facebookHref = `https://www.facebook.com/sharer/sharer.php?u=${encodedShareUrl}`;

  function openCenteredPopup(href, name = "share") {
    const width = 640;
    const height = 480;
    const left = window.screenX + Math.max(0, (window.innerWidth - width) / 2);
    const top = window.screenY + Math.max(0, (window.innerHeight - height) / 2);
    window.open(
      href,
      name,
      `toolbar=0,status=0,width=${width},height=${height},left=${left},top=${top}`
    );
  }

  async function handleNativeShare() {
    if (navigator.share) {
      try {
        await navigator.share({
          title,
          text: title,
          url: shareUrl,
        });
      } catch (e) {
        console.debug("Native share failed", e);
      }
    } else {
      openCenteredPopup(twitterHref, "twitter-share");
    }
  }

  async function handleShareWithImage() {
    if (!image || !navigator.share) {
      return handleNativeShare();
    }
    try {
      const res = await fetch(image, { mode: "cors" });
      const blob = await res.blob();
      const file = new File(
        [blob],
        `share-image${getExtensionFromMime(blob.type)}`,
        { type: blob.type }
      );
      if (navigator.canShare && navigator.canShare({ files: [file] })) {
        await navigator.share({
          title,
          text: title,
          files: [file],
          url: shareUrl,
        });
        return;
      }
    } catch (err) {
      console.debug("file share failed", err);
    }
    return handleNativeShare();
  }

  function getExtensionFromMime(mime) {
    if (!mime) return ".jpg";
    if (mime.includes("png")) return ".png";
    if (mime.includes("gif")) return ".gif";
    if (mime.includes("jpeg") || mime.includes("jpg")) return ".jpg";
    return ".jpg";
  }

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (e) {
      console.error("Copy failed", e);
    }
  }

  return (
    <div className={`flex flex-wrap items-center gap-2 sm:gap-3 ${className}`}>
      {/* Primary Action */}
      <button
        onClick={handleShareWithImage}
        className="group relative inline-flex items-center justify-center gap-2 px-4 py-2 text-sm font-semibold rounded-full bg-gray-900 text-white shadow-sm hover:shadow hover:bg-gray-800 hover:-translate-y-0.5 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-gray-900 focus:ring-offset-2"
        aria-label="Share article"
      >
        <Share2 className="w-4 h-4" />
        <span>Share</span>
      </button>

      {/* Social Icons Container (Glassmorphic Pill) */}
      <div className="flex items-center gap-1 p-1 bg-gray-50/80 backdrop-blur-sm border border-gray-100 rounded-full shadow-sm">
        
        {/* WhatsApp */}
        <a
          href={whatsappHref}
          onClick={(e) => {
            e.preventDefault();
            openCenteredPopup(whatsappHref, "whatsapp-share");
          }}
          className="relative group flex items-center justify-center w-8 h-8 rounded-full text-gray-400 hover:text-white hover:bg-[#25D366] hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 focus:outline-none"
          aria-label="Share on WhatsApp"
        >
          <MessageCircle className="w-4 h-4" />
          <span className="pointer-events-none absolute -top-10 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity bg-gray-900 text-white text-[10px] uppercase font-bold tracking-wider px-2 py-1 rounded shadow-lg whitespace-nowrap">
            WhatsApp
          </span>
        </a>

        {/* Twitter / X */}
        <a
          href={twitterHref}
          onClick={(e) => {
            e.preventDefault();
            openCenteredPopup(twitterHref, "twitter-share");
          }}
          className="relative group flex items-center justify-center w-8 h-8 rounded-full text-gray-400 hover:text-white hover:bg-black hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 focus:outline-none"
          aria-label="Share on X"
        >
          <Twitter className="w-4 h-4" />
          <span className="pointer-events-none absolute -top-10 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity bg-gray-900 text-white text-[10px] uppercase font-bold tracking-wider px-2 py-1 rounded shadow-lg whitespace-nowrap">
            X (Twitter)
          </span>
        </a>

        {/* Facebook */}
        <a
          href={facebookHref}
          onClick={(e) => {
            e.preventDefault();
            openCenteredPopup(facebookHref, "facebook-share");
          }}
          className="relative group flex items-center justify-center w-8 h-8 rounded-full text-gray-400 hover:text-white hover:bg-[#1877F2] hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 focus:outline-none"
          aria-label="Share on Facebook"
        >
          <Facebook className="w-4 h-4" />
          <span className="pointer-events-none absolute -top-10 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity bg-gray-900 text-white text-[10px] uppercase font-bold tracking-wider px-2 py-1 rounded shadow-lg whitespace-nowrap">
            Facebook
          </span>
        </a>

        {/* Copy Link */}
        <button
          onClick={handleCopy}
          className="relative group flex items-center justify-center w-8 h-8 rounded-full text-gray-400 hover:text-gray-900 hover:bg-gray-200 hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 focus:outline-none"
          aria-label="Copy link"
        >
          {copied ? (
            <Check className="w-4 h-4 text-green-600" />
          ) : (
            <LinkIcon className="w-4 h-4" />
          )}
          <span className="pointer-events-none absolute -top-10 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity bg-gray-900 text-white text-[10px] uppercase font-bold tracking-wider px-2 py-1 rounded shadow-lg whitespace-nowrap">
            {copied ? "Copied!" : "Copy Link"}
          </span>
        </button>
        
      </div>
    </div>
  );
}
