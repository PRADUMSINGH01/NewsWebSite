// app/layout.jsx
import "./globals.css";
import { Inter } from "next/font/google";
import localFont from "next/font/local";
import { Analytics } from "@vercel/analytics/next";
import Header from "@/components/Header";
import ThemeProvider from "@/components/ThemeProvider";

// Premium Latin font — sharp, modern, highly readable
const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

const SITE_URL = "https://www.hmarduniya.in";
const SITE_NAME = "Hmar Duniya";
const SITE_DESCRIPTION =
  "Fast · Reliable · Independent — Trusted national and global news source in Hindi.";
const DEFAULT_OG_IMAGE = `${SITE_URL}/logo.png`;

export const metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${SITE_NAME} - तज़ा खबरें`,
    template: `%s | ${SITE_NAME}`,
  },
  description: SITE_DESCRIPTION,
  keywords: [
    "हिंदी समाचार",
    "Hindi news",
    "ताज़ा खबरें",
    "breaking news",
    "India news",
    "Hmar Duniya",
    "hmarduniya",
  ],
  authors: [{ name: SITE_NAME, url: SITE_URL }],
  creator: SITE_NAME,
  publisher: SITE_NAME,
  formatDetection: { telephone: false },
  openGraph: {
    title: `${SITE_NAME} - तज़ा खबरें`,
    description: SITE_DESCRIPTION,
    url: SITE_URL,
    siteName: SITE_NAME,
    locale: "hi_IN",
    type: "website",
    images: [
      {
        url: DEFAULT_OG_IMAGE,
        width: 1200,
        height: 630,
        alt: SITE_NAME,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: SITE_NAME,
    description: SITE_DESCRIPTION,
    images: [DEFAULT_OG_IMAGE],
  },
  alternates: {
    canonical: SITE_URL,
  },
};

// Organization JSON-LD for Google Knowledge Panel
const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "NewsMediaOrganization",
  name: SITE_NAME,
  url: SITE_URL,
  logo: {
    "@type": "ImageObject",
    url: DEFAULT_OG_IMAGE,
  },
  sameAs: [
    "https://facebook.com/hmarduniya",
    "https://twitter.com/hmarduniya",
    "https://instagram.com/hmarduniya",
    "https://youtube.com/hmarduniya",
  ],
  description: SITE_DESCRIPTION,
};

export default function RootLayout({ children }) {
  return (
    <html lang="hi" className={inter.variable}>
      <head>
        {/* Google Fonts: Noto Sans Devanagari for Hindi text */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Noto+Sans+Devanagari:wght@400;500;600;700;800;900&display=swap"
          rel="stylesheet"
        />
        {/* Organization structured data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(organizationJsonLd),
          }}
        />
      </head>
      <body className="font-sans antialiased">
        <ThemeProvider>
          <Header />
          {children}
          <Analytics />
        </ThemeProvider>
      </body>
    </html>
  );
}
