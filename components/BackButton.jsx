// components/BackButton.jsx
"use client";

import React, { forwardRef } from "react";
import { ChevronLeft, ArrowBigLeft } from "lucide-react";
import { useRouter } from "next/navigation";

/** tiny classnames helper */
function cn(...parts) {
  return parts.filter(Boolean).join(" ");
}

/**
 * BackButton props:
 * - href?: string            navigate to this url instead of history.back()
 * - className?: string       additional/dynamic classes
 * - label?: string           default "Back"
 * - size?: "sm"|"md"|"lg"    controls padding/text size (default "md")
 * - variant?: "solid"|"ghost"|"light"  visual style (default "solid")
 * - isFixed?: boolean        fixed top-left vs inline relative (default true)
 * - showLabel?: boolean      show label on sm+ (default true)
 * - onClick?: (e) => void    custom click handler (called before nav)
 */
const BackButton = forwardRef(function BackButton(
  {
    href,
    className = "",
    label = "Back",
    size = "md",
    variant = "solid",
    isFixed = true,
    showLabel = true,
    onClick,
    ...props
  },
  ref
) {
  let router = null;
  try {
    router = useRouter();
  } catch (e) {
    router = null;
  }

  const sizeMap = {
    sm: "px-2 py-1 text-sm",
    md: "px-3 py-2 text-base",
    lg: "px-4 py-2.5 text-lg",
  };

  const variantMap = {
    solid: "bg-black text-white hover:bg-black/90",
    light: "bg-white text-black shadow-sm hover:shadow-md",
    ghost: "bg-transparent text-black hover:bg-black/5",
  };

  const positionClass = isFixed
    ? "fixed top-6 md:left-10 left-4  z-50"
    : "relative";

  const base =
    "inline-flex items-center gap-2 rounded-lg transition-shadow transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500";

  const iconClass = "w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6";

  const labelClass = showLabel ? "hidden sm:inline" : "sr-only";

  const finalClass = cn(
    positionClass,
    base,
    sizeMap[size] ?? sizeMap.md,
    variantMap[variant] ?? variantMap.solid,
    className
  );

  const goBack = (e) => {
    if (typeof onClick === "function") onClick(e);
    if (e?.defaultPrevented) return;
    e?.preventDefault();

    if (href) {
      if (router && typeof router.push === "function") {
        router.push(href);
      } else {
        window.location.href = href;
      }
      return;
    }

    if (router && typeof router.back === "function") {
      router.back();
    } else if (
      typeof window !== "undefined" &&
      window.history &&
      window.history.length > 1
    ) {
      window.history.back();
    } else if (href) {
      window.location.href = href;
    } else {
      window.location.href = "/";
    }
  };

  return (
    <button
      ref={ref}
      type="button"
      onClick={goBack}
      className={finalClass}
      aria-label={label}
      {...props}
    >
      <ArrowBigLeft className={iconClass} aria-hidden="true" />
    </button>
  );
});

export default BackButton;
