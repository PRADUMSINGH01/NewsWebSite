import { ImageResponse } from 'next/og';
import { NextRequest } from 'next/server';

export const runtime = 'edge';

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
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                opacity: 0.5, // Darken the image so text pops
              }}
            />
          )}

          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '60px',
              textAlign: 'center',
              width: '100%',
            }}
          >
            <h1
              style={{
                fontSize: 64,
                fontWeight: 'bold',
                color: '#ffffff',
                lineHeight: 1.2,
                marginTop: 0,
                marginBottom: 0,
                textShadow: '0 2px 20px rgba(0,0,0,0.8)',
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
