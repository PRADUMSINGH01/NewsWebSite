import { ImageResponse } from 'next/og';

export const runtime = 'edge';

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);

    // Dynamic params
    const title = searchParams.get('title') || 'Hmar Duniya - तज़ा खबरें';
    const tag = searchParams.get('tag') || 'समाचार';

    return new ImageResponse(
      (
        <div
          style={{
            height: '100%',
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-start',
            justifyContent: 'center',
            backgroundColor: '#ffffff',
            backgroundImage: 'radial-gradient(circle at 25px 25px, #f8fafb 2%, transparent 0%), radial-gradient(circle at 75px 75px, #f8fafb 2%, transparent 0%)',
            backgroundSize: '100px 100px',
            padding: '80px',
          }}
        >
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              marginBottom: '40px',
            }}
          >
            <div
              style={{
                backgroundColor: '#0f4c4c',
                color: 'white',
                padding: '12px 24px',
                borderRadius: '9999px',
                fontSize: '24px',
                fontWeight: 'bold',
                textTransform: 'uppercase',
                letterSpacing: '0.05em',
              }}
            >
              {tag}
            </div>
          </div>
          <div
            style={{
              fontSize: '60px',
              fontWeight: '900',
              color: '#111827',
              lineHeight: 1.2,
              marginBottom: '40px',
              maxWidth: '960px',
              fontFamily: 'sans-serif',
            }}
          >
            {title}
          </div>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              marginTop: 'auto',
            }}
          >
            <div
              style={{
                fontSize: '32px',
                fontWeight: 'bold',
                color: '#0f4c4c',
                borderLeft: '6px solid #0f4c4c',
                paddingLeft: '20px',
              }}
            >
              Hmar Duniya
            </div>
          </div>
        </div>
      ),
      {
        width: 1200,
        height: 630,
      }
    );
  } catch (e) {
    console.error(e);
    return new Response('Failed to generate OG image', { status: 500 });
  }
}
