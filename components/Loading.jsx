// ProfessionalLoader.jsx
import React from "react";

export default function ProfessionalLoader() {
  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center  text-white">
      {/* Logo or site name */}
      <h1 className="text-2xl font-semibold tracking-wide mb-6">
        <span className=" bg-clip-text text-transparent">hmarduniya</span>
      </h1>

      {/* Simple spinner */}
      <div className="w-12 h-12 border-4 border-white/20 border-t-indigo-400 rounded-full animate-spin" />

      {/* Subtext */}
      <p className="mt-6 text-sm text-white/60">
        Loading latest news... please wait
      </p>
    </div>
  );
}
