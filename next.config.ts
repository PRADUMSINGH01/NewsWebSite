/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.pexels.com", // <-- Add this new line
      },
      // You can keep the old ones if you still use them elsewhere
      {
        protocol: "https",
        hostname: "images.livemint.com",
      },
      // ...etc
    ],
  },
};

module.exports = nextConfig;
