// "use client";
// import React, { useState, useEffect, useRef } from "react";
// import {
//   X,
//   ChevronLeft,
//   ChevronRight,
//   Download,
//   Image as ImageIcon,
//   ZoomIn,
//   Share2,
// } from "lucide-react";

// /**
//  * NewsGalleryProfessional
//  * A polished, accessible and responsive photo gallery for news sites.
//  *
//  * Props:
//  *  - images: Array<{ src, alt?, caption?, photographer?, date? }>
//  *  - columns: tailwind column breakpoints (optional)
//  *  - showThumbnails: boolean
//  *
//  * Features added in this professional version:
//  *  - Clean responsive grid with captions
//  *  - Hover card elevation, subtle transitions
//  *  - Thumbnail strip with active indicator (desktop)
//  *  - Accessible lightbox with prev/next/close, keyboard support
//  *  - Download and share (copy link) actions
//  *  - Image loading skeletons
//  *  - Photographer + date metadata in the lightbox
//  */
// function NewsGalleryProfessional({
//   images = [],
//   columns = { sm: 2, md: 3, lg: 4 },
//   showThumbnails = true,
// }) {
//   const imgs = images.length ? images : DEFAULT_IMAGES;
//   const [openIndex, setOpenIndex] = useState(-1);
//   const [loaded, setLoaded] = useState(() => new Set());
//   const closeButtonRef = useRef(null);
//   const thumbListRef = useRef(null);

//   useEffect(() => {
//     function onKey(e) {
//       if (openIndex === -1) return;
//       if (e.key === "Escape") setOpenIndex(-1);
//       if (e.key === "ArrowLeft") setOpenIndex((i) => Math.max(0, i - 1));
//       if (e.key === "ArrowRight")
//         setOpenIndex((i) => Math.min(imgs.length - 1, i + 1));
//     }
//     window.addEventListener("keydown", onKey);
//     return () => window.removeEventListener("keydown", onKey);
//   }, [openIndex, imgs.length]);

//   useEffect(() => {
//     // when opening lightbox, focus close button
//     if (openIndex > -1) closeButtonRef.current?.focus();
//   }, [openIndex]);

//   useEffect(() => {
//     // scroll active thumbnail into view
//     if (thumbListRef.current && openIndex > -1) {
//       const node = thumbListRef.current.querySelector(
//         `[data-idx=\"${openIndex}\"]`
//       );
//       node?.scrollIntoView({
//         behavior: "smooth",
//         inline: "center",
//         block: "nearest",
//       });
//     }
//   }, [openIndex]);

//   const gridCols = `grid-cols-1 sm:grid-cols-${columns.sm} md:grid-cols-${columns.md} lg:grid-cols-${columns.lg}`;

//   function onImageLoad(i) {
//     setLoaded((s) => new Set(s).add(i));
//   }

//   function formatDate(d) {
//     try {
//       if (!d) return "";
//       const dt = new Date(d);
//       return dt.toLocaleDateString("hi-IN", {
//         year: "numeric",
//         month: "short",
//         day: "numeric",
//       });
//     } catch {
//       return d;
//     }
//   }

//   async function copyLink(src) {
//     try {
//       await navigator.clipboard.writeText(src);
//       alert("लिंक कॉपी हो गया — अब आप इसे शेयर कर सकते हैं。");
//     } catch {
//       alert("कॉपि नहीं कर पाए — कृपया मैन्युअली कॉपी करें।");
//     }
//   }

//   return (
//     <section className="w-full">
//       <div className={`grid gap-6 ${gridCols}`}>
//         {imgs.map((img, i) => (
//           <figure
//             key={i}
//             role="button"
//             tabIndex={0}
//             onClick={() => setOpenIndex(i)}
//             onKeyDown={(e) => (e.key === "Enter" ? setOpenIndex(i) : null)}
//             className="relative bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-lg transition-shadow duration-200 focus:outline-none focus:ring-2 focus:ring-red-400"
//             aria-label={img.caption || img.alt || `Image ${i + 1}`}
//           >
//             {/* skeleton */}
//             <div
//               className={`w-full h-52 md:h-44 lg:h-56 bg-gray-100 ${
//                 loaded.has(i) ? "" : "animate-pulse"
//               }`}
//             >
//               <img
//                 src={img.src}
//                 alt={img.alt ?? img.caption ?? `image-${i}`}
//                 loading="lazy"
//                 decoding="async"
//                 onLoad={() => onImageLoad(i)}
//                 className={`w-full h-full object-cover ${
//                   loaded.has(i) ? "" : "hidden"
//                 }`}
//               />
//             </div>

//             <figcaption className="p-4">
//               <h4 className="text-sm md:text-base font-semibold text-gray-900 leading-tight truncate">
//                 {img.caption}
//               </h4>
//               {img.photographer || img.date ? (
//                 <div className="mt-2 text-xs text-gray-500 flex flex-wrap gap-3">
//                   {img.photographer && <span>📸 {img.photographer}</span>}
//                   {img.date && (
//                     <time dateTime={img.date}>{formatDate(img.date)}</time>
//                   )}
//                 </div>
//               ) : null}
//             </figcaption>

//             {/* subtle overlay icon */}
//             <div className="absolute top-3 right-3 bg-white/90 rounded-full p-2 shadow-sm">
//               <ImageIcon size={16} />
//             </div>
//           </figure>
//         ))}
//       </div>

//       {/* Desktop thumbnail strip */}
//       {showThumbnails && (
//         <div
//           className="mt-6 hidden md:flex items-center gap-3 overflow-x-auto no-scrollbar"
//           ref={thumbListRef}
//         >
//           {imgs.map((img, i) => (
//             <button
//               key={i}
//               data-idx={i}
//               onClick={() => setOpenIndex(i)}
//               className={`flex-shrink-0 rounded-md overflow-hidden border ${
//                 openIndex === i
//                   ? "ring-2 ring-red-400 border-transparent"
//                   : "border-gray-200"
//               } focus:outline-none`}
//               aria-label={`Open image ${i + 1}`}
//             >
//               <img
//                 src={img.src}
//                 alt={img.alt ?? img.caption}
//                 className="w-36 h-24 object-cover"
//               />
//             </button>
//           ))}
//         </div>
//       )}

//       {/* LIGHTBOX */}
//       {openIndex > -1 && (
//         <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
//           <div
//             className="absolute inset-0 bg-black/70 backdrop-blur-sm"
//             onClick={() => setOpenIndex(-1)}
//             aria-hidden
//           />

//           <div className="relative max-w-6xl w-full mx-auto">
//             <div className="bg-white rounded-lg shadow-xl overflow-hidden">
//               <div className="flex items-center justify-between p-3 border-b">
//                 <div className="flex items-center gap-3">
//                   <button
//                     ref={closeButtonRef}
//                     onClick={() => setOpenIndex(-1)}
//                     className="p-2 rounded-md hover:bg-gray-100"
//                     aria-label="Close gallery"
//                   >
//                     <X size={18} />
//                   </button>
//                   <div className="text-sm text-gray-700">
//                     {openIndex + 1} / {imgs.length}
//                   </div>
//                 </div>

//                 <div className="flex items-center gap-2">
//                   <a
//                     href={imgs[openIndex].src}
//                     download
//                     className="p-2 rounded-md hover:bg-gray-100"
//                     aria-label="Download image"
//                   >
//                     <Download size={16} />
//                   </a>

//                   <button
//                     onClick={() => copyLink(imgs[openIndex].src)}
//                     className="p-2 rounded-md hover:bg-gray-100"
//                     aria-label="Copy image link"
//                   >
//                     <Share2 size={16} />
//                   </button>

//                   <button
//                     onClick={() => {
//                       const el = document.fullscreenElement;
//                       const imgEl = document.getElementById("lg-open-img");
//                       if (!el && imgEl?.requestFullscreen)
//                         imgEl.requestFullscreen();
//                       else if (document.exitFullscreen)
//                         document.exitFullscreen();
//                     }}
//                     className="p-2 rounded-md hover:bg-gray-100"
//                     aria-label="Toggle fullscreen"
//                   >
//                     <ZoomIn size={16} />
//                   </button>
//                 </div>
//               </div>

//               <div className="md:flex">
//                 <div className="md:flex-1 flex items-center justify-center bg-black/5 p-4">
//                   <div className="max-h-[78vh] w-full flex items-center justify-center">
//                     <img
//                       id="lg-open-img"
//                       src={imgs[openIndex].src}
//                       alt={imgs[openIndex].alt}
//                       className="max-h-[78vh] w-auto max-w-full object-contain"
//                     />
//                   </div>
//                 </div>

//                 <aside className="md:w-80 p-4 border-l bg-gray-50">
//                   <h3 className="text-lg font-semibold">
//                     {imgs[openIndex].caption}
//                   </h3>
//                   {imgs[openIndex].photographer || imgs[openIndex].date ? (
//                     <div className="mt-2 text-sm text-gray-600 flex flex-col gap-1">
//                       {imgs[openIndex].photographer && (
//                         <span>📸 {imgs[openIndex].photographer}</span>
//                       )}
//                       {imgs[openIndex].date && (
//                         <time dateTime={imgs[openIndex].date}>
//                           {formatDate(imgs[openIndex].date)}
//                         </time>
//                       )}
//                     </div>
//                   ) : null}

//                   {imgs[openIndex].alt && (
//                     <p className="mt-3 text-sm text-gray-700">
//                       {imgs[openIndex].alt}
//                     </p>
//                   )}

//                   <div className="mt-6 flex gap-3">
//                     <button
//                       onClick={() => setOpenIndex((i) => Math.max(0, i - 1))}
//                       className="flex-1 flex items-center justify-center gap-2 px-4 py-2 rounded-md bg-white border hover:bg-gray-50"
//                       aria-label="Previous image"
//                     >
//                       <ChevronLeft size={18} />
//                       पिछला
//                     </button>

//                     <button
//                       onClick={() =>
//                         setOpenIndex((i) => Math.min(imgs.length - 1, i + 1))
//                       }
//                       className="flex-1 flex items-center justify-center gap-2 px-4 py-2 rounded-md bg-white border hover:bg-gray-50"
//                       aria-label="Next image"
//                     >
//                       अगला
//                       <ChevronRight size={18} />
//                     </button>
//                   </div>
//                 </aside>
//               </div>
//             </div>
//           </div>
//         </div>
//       )}
//     </section>
//   );
// }

// // Professional placeholder images
// const DEFAULT_IMAGES = [
//   {
//     src: "https://placehold.co/1600x1000/0ea5a4/ffffff?text=News+1",
//     caption: "किसान मंडी — ताज़ा उपज",
//     alt: "किसान मंडी में उपज से भरी ट्रॉली",
//     photographer: "रवि शर्मा",
//     date: "2025-10-20",
//   },
//   {
//     src: "https://placehold.co/1600x1000/f97316/ffffff?text=News+2",
//     caption: "स्वच्छता अभियान — नदी तट",
//     alt: "स्वच्छता अभियान के दौरान कार्यकर्ता",
//     photographer: "नीता कुमारी",
//     date: "2025-09-15",
//   },
//   {
//     src: "https://placehold.co/1600x1000/60a5fa/ffffff?text=News+3",
//     caption: "स्थानीय स्टार्टअप — टीम मीट",
//     alt: "स्टार्टअप टीम चर्चा करते हुए",
//     photographer: "संजय मिश्रा",
//     date: "2025-08-05",
//   },
//   {
//     src: "https://placehold.co/1600x1000/86efac/065f46?text=News+4",
//     caption: "सौर परियोजना उद्घाटन",
//     alt: "सौर पैनलों की पंक्ति",
//     photographer: "अंजलि",
//     date: "2025-07-30",
//   },
// ];

// export default NewsGalleryProfessional;


const page  = ()=>{
  return <div></div>
}

export default page
