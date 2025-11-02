"use client";

import React, { useState } from "react";

/**
 * ShareButtons (Next.js / React client component)
 *
 * Improvements in this version:
 * - Clean, modern UI using Tailwind utility classes (compact icons, accessible labels, responsive)
 * - Primary "Share" button attempts to share the image file (Web Share API with files) on supported mobile
 * - Graceful fallbacks: native share -> provider popup windows -> copy-to-clipboard
 * - Proper construction/encoding of the full share URL
 * - Tooltip-like labels for icon-only states (simple CSS-only tooltips)
 *
 * Reminder: to get social preview images when sharing to Facebook/Twitter/WhatsApp, the target page
 * must expose proper Open Graph / Twitter meta tags (og:image, og:title, etc.).
 */

export default function ShareButtons({
  url,
  title = "",
  image,
  className = "",
}) {
  const [copied, setCopied] = useState(false);

  if (!url) return null;

  // Build absolute URL (if user passes a path like '/posts/1')
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
      // fallback to twitter popup
      openCenteredPopup(twitterHref, "twitter-share");
    }
  }

  // Try to share the image file (mobile browsers that support navigator.canShare + files)
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

    // fallback
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
      setTimeout(() => setCopied(false), 1500);
    } catch (e) {
      console.error("Copy failed", e);
    }
  }

  return (
    <div className={`flex items-center gap-2 ${className}`}>
      {/* Primary share button: attempts file share first on mobile */}
      <button
        onClick={handleShareWithImage}
        title="Share"
        aria-label="Share"
        className="group inline-flex items-center gap-3 px-3 py-2 rounded-2xl bg-gradient-to-r from-white to-gray-50 border border-gray-200 shadow-sm hover:shadow-md transition-shadow text-sm"
      >
        <svg
          className="w-5 h-5 text-gray-700"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinecap="round"
          strokeLinejoin="round"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M4 12v7a1 1 0 0 0 1 1h14a1 1 0 0 0 1-1v-7" />
          <polyline points="16 6 12 2 8 6" />
          <line x1="12" y1="2" x2="12" y2="15" />
        </svg>
        <span className="font-medium text-gray-800 hidden sm:inline">
          Share
        </span>
        <span className="text-xs text-gray-500 hidden md:inline">
          Share post with image
        </span>
      </button>

      {/* Icon-only buttons: responsive and accessible */}
      <div className="flex items-center gap-2">
        <a
          onClick={(e) => {
            e.preventDefault();
            openCenteredPopup(whatsappHref, "whatsapp-share");
          }}
          href={whatsappHref}
          rel="noopener noreferrer"
          target="_blank"
          aria-label="Share on WhatsApp"
          title="Share on WhatsApp"
          className="relative group inline-flex items-center justify-center w-10 h-10 rounded-lg border bg-white hover:shadow focus:outline-none"
        >
          <svg
            className="w-5 h-5"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinecap="round"
            strokeLinejoin="round"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M21 15a2 2 0 0 1-2 2h-1l-1 1-2-1-3 1-1-3-1-2 1-2 1-2 1-1 1-1 2-1h1a2 2 0 0 1 2 2z" />
            <path d="M17 11c-.2-.7-1-1.5-1.6-1.6-.9-.1-1.8-.1-2.6.6-.7.7-1.1 1.5-1.2 2.3-.1.8.4 1.6 1 2.2.6.6 1.3 1 2.1 1.1.8.1 1.6 0 2.3-.5.7-.5 1.3-1.2 1.5-2" />
          </svg>
          <span className="sr-only">WhatsApp</span>
          <span className="pointer-events-none absolute -top-8 hidden group-hover:block rounded-md bg-black text-white text-xs px-2 py-1">
            WhatsApp
          </span>
        </a>

        <a
          onClick={(e) => {
            e.preventDefault();
            openCenteredPopup(twitterHref, "twitter-share");
          }}
          href={twitterHref}
          rel="noopener noreferrer"
          target="_blank"
          aria-label="Share on Twitter"
          title="Share on Twitter"
          className="relative group inline-flex items-center justify-center w-10 h-10 rounded-lg border bg-white hover:shadow focus:outline-none"
        >
          <svg
            className="w-5 h-5"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinecap="round"
            strokeLinejoin="round"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M23 3a10.9 10.9 0 0 1-3.14 1.53A4.48 4.48 0 0 0 12 7v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z" />
          </svg>
          <span className="sr-only">Twitter</span>
          <span className="pointer-events-none absolute -top-8 hidden group-hover:block rounded-md bg-black text-white text-xs px-2 py-1">
            Twitter
          </span>
        </a>

        <a
          onClick={(e) => {
            e.preventDefault();
            openCenteredPopup(facebookHref, "facebook-share");
          }}
          href={facebookHref}
          rel="noopener noreferrer"
          target="_blank"
          aria-label="Share on Facebook"
          title="Share on Facebook"
          className="relative group inline-flex items-center justify-center w-10 h-10 rounded-lg border bg-white hover:shadow focus:outline-none"
        >
          <svg
            className="w-5 h-5"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinecap="round"
            strokeLinejoin="round"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M18 2h-3a4 4 0 0 0-4 4v3H8v4h3v8h4v-8h3l1-4h-4V6a1 1 0 0 1 1-1h3z" />
          </svg>
          <span className="sr-only">Facebook</span>
          <span className="pointer-events-none absolute -top-8 hidden group-hover:block rounded-md bg-black text-white text-xs px-2 py-1">
            Facebook
          </span>
        </a>

        <button
          onClick={handleCopy}
          title="Copy link"
          aria-label="Copy link"
          className="relative group inline-flex items-center justify-center w-10 h-10 rounded-lg border bg-white hover:shadow focus:outline-none"
        >
          <svg
            className="w-5 h-5"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinecap="round"
            strokeLinejoin="round"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M10 13a5 5 0 0 0 7 0l1-1a5 5 0 0 0-7-7l-1 1" />
            <path d="M14 11a5 5 0 0 0-7 0l-1 1a5 5 0 0 0 7 7l1-1" />
          </svg>
          <span className="sr-only">Copy link</span>
          <span className="pointer-events-none absolute -top-8 hidden group-hover:block rounded-md bg-black text-white text-xs px-2 py-1">
            {copied ? "Copied" : "Copy"}
          </span>
        </button>
      </div>
    </div>
  );
}
