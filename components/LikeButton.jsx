"use client";

import React, { useState } from "react";
import { Heart } from "lucide-react";
import clsx from "clsx";

export default function LikeButton({
  initialLikes = 0,
  initiallyLiked = false,
  onToggle,
}) {
  const [liked, setLiked] = useState(initiallyLiked);
  const [likes, setLikes] = useState(initialLikes);

  const handleToggle = () => {
    const newLiked = !liked;
    setLiked(newLiked);
    setLikes((prev) => prev + (newLiked ? 1 : -1));
    if (onToggle) onToggle(newLiked);
  };

  return (
    <button
      onClick={handleToggle}
      aria-pressed={liked}
      aria-label={liked ? "Unlike" : "Like"}
      className={clsx(
        "flex items-center gap-2 px-3 py-2 rounded-full border transition-all",
        "hover:bg-gray-100 focus:ring-2 focus:ring-[#0f4c4c]/30",
        liked ? "text-red-500 border-red-300" : "text-gray-600 border-gray-200"
      )}
    >
      <Heart
        className={clsx(
          "w-5 h-5 transition-transform duration-200",
          liked && "fill-red-500 scale-110"
        )}
      />
      <span className="text-sm font-medium select-none">{likes}</span>
    </button>
  );
}
