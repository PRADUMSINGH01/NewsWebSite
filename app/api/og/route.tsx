import { ImageResponse } from 'next/og';
import { NextRequest } from 'next/server';

export const runtime = 'edge';
export const revalidate = 86400; // Cache aggressively on Vercel CDN for 24h

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);

    const rawTitle = searchParams.get('title');
    const title = rawTitle || 'Hmar Duniya';
    
    const rawUrl = searchParams.get('url');
    const firebaseUrl = rawUrl || ''; // Next.js searchParams already automatically decodes the URI! No need to decodeURIComponent again!

    let bgImageSrc: any = null;

    // Fetch the remote Firebase image as an ArrayBuffer since Next.js Edge runtime prefers ArrayBuffers for Satori images
    if (firebaseUrl) {
      try {
        const bgRes = await fetch(firebaseUrl);
        if (bgRes.ok) {
          bgImageSrc = await bgRes.arrayBuffer();
        } else {
            console.error("Firebase BG Image Fetch Failed:", bgRes.status);
        }
      } catch (err) {
        console.error("Fetch background image error:", err);
      }
    }

    return new ImageResponse(
      (
        <div
          style={{
            display: 'flex',
            height: '100%',
            width: '100%',
            alignItems: 'center',
            justifyContent: 'center',
            flexDirection: 'column',
            backgroundColor: '#111',
          }}
        >
          {bgImageSrc && (
            <img
              src={bgImageSrc}
              alt="Background"
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

          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              padding: '60px',
              position: 'relative',
              zIndex: 10,
              color: 'white',
              width: '100%',
              alignItems: 'flex-start',
              justifyContent: 'flex-end',
            }}
          >
             {/* Tag Pill */}
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
              समाचार
            </div>

            <h1
              style={{
                fontSize: '64px',
                fontWeight: 'bold',
                fontFamily: 'sans-serif',
                lineHeight: 1.2,
                maxHeight: '160px',
                overflow: 'hidden',
                textShadow: '0 4px 6px rgba(0,0,0,0.6)',
                margin: 0,
              }}
            >
              {title}
            </h1>
          </div>
        </div>
      ),
      {
        width: 1200,
        height: 630,
      }
    );
  } catch (e: any) {
    console.error("OG Image Generation error", e);
    return new Response(`Failed to generate the image`, {
      status: 500,
    });
  }
}
