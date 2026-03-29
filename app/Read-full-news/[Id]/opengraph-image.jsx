import { ImageResponse } from 'next/og';
import { getBySlugClient } from "@/components/server/fetchnews";

// Next.js automatically uses this exact exported metadata for OG images
export const alt = 'News Article Cover';
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = 'image/png';

// Fallback logic for absolute URLs
function resolveImageUrl(img) {
  const SITE_URL = "https://www.hmarduniya.in";
  const DEFAULT = `${SITE_URL}/logo.png`;
  if (!img) return DEFAULT;
  if (img.startsWith("http://") || img.startsWith("https://")) return img;
  return `${SITE_URL}${img.startsWith("/") ? "" : "/"}${img}`;
}

export default async function Image(props) {
  const params = await props.params;
  
  // Extract slug and fetch article
  const rawId = params?.Id || "";
  const slug = Array.isArray(rawId) ? rawId.join("/") : rawId;
  const decodedSlug = decodeURIComponent(slug);

  let bgImg = resolveImageUrl("");
  let title = "Hmar Duniya News";
  let tag = "समाचार";

  try {
    const post = await getBySlugClient(decodedSlug);
    if (post) {
      const postData = post.data || post;
      title = postData?.title || title;
      bgImg = resolveImageUrl(postData?.img);
      tag = postData?.tag || tag;
    }
  } catch (error) {
    console.error("OG Image fetch error:", error);
  }

  let bgImageSrc = null;
  if (bgImg) {
    try {
      // Fetch the remote image as an ArrayBuffer since Next.js Edge runtime prefers ArrayBuffers for Satori images
      const bgRes = await fetch(bgImg);
      if (bgRes.ok) {
        bgImageSrc = await bgRes.arrayBuffer();
      } else {
        console.error("Firebase BG Image Fetch Failed in OG route:", bgRes.status);
      }
    } catch (err) {
      console.error("Fetch background image error:", err);
    }
  }

  // Create the image layout using the main article image as the primary view for ALL
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start',
          justifyContent: 'flex-end',
          position: 'relative',
        }}
      >
        {/* Main image covering the entire OG frame */}
        {bgImageSrc && (
          <img
            src={bgImageSrc}
            alt={title}
          style={{
            position: 'absolute',
            inset: 0,
            width: '100%',
            height: '100%',
            objectFit: 'cover',
          }}
        />
        )}
        {/* Gradient shadow to make text readable */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background: 'linear-gradient(to top, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0.3) 50%, rgba(0,0,0,0) 100%)',
          }}
        />

        {/* Title and Tag Overlay */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            padding: '60px',
            position: 'relative',
            zIndex: 10,
            color: 'white',
          }}
        >
          <div
            style={{
              padding: '8px 20px',
              backgroundColor: '#0f4c4c',
              color: 'white',
              fontSize: '28px',
              fontWeight: 'bold',
              borderRadius: '99px',
              marginBottom: '20px',
              alignSelf: 'flex-start',
              textTransform: 'uppercase',
            }}
          >
            {tag}
          </div>
          <div
            style={{
              fontSize: '64px',
              fontWeight: 'bold',
              fontFamily: 'sans-serif',
              lineHeight: 1.2,
              maxHeight: '160px',
              overflow: 'hidden',
              textShadow: '0 4px 6px rgba(0,0,0,0.6)',
            }}
          >
            {title}
          </div>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
