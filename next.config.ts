/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.pexels.com",
      },
      { 
        protocol: "https", 
        hostname: "firebasestorage.googleapis.com", 
        pathname: "/**" 
      },
    ],
    // Firebase Storage returns 412 to Next.js image optimization proxy
    // Required until images are migrated to a CDN that supports optimization
    unoptimized: true,
  },
  async headers() {
    return [
      {
        source: "/api/og",
        headers: [
          {
            key: "Access-Control-Allow-Origin",
            value: "*",
          },
          {
            key: "Access-Control-Allow-Methods",
            value: "GET, OPTIONS",
          },
        ],
      },
    ];
  },
};

module.exports = nextConfig;
