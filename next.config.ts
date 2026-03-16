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
    // Helps bypass 412 errors from Firebase Storage tokens by skipping Next.js internal image optimization
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
