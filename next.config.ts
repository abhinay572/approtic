import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    formats: ["image/avif", "image/webp"],
    remotePatterns: [
      { protocol: "https", hostname: "**.approtic.in" },
    ],
  },
  experimental: {
    optimizePackageImports: ["lucide-react", "framer-motion"],
  },
  async rewrites() {
    return [
      { source: "/soniclean", destination: "/apps/soniclean" },
      { source: "/soniclean/:path*", destination: "/apps/soniclean/:path*" },
      { source: "/sonicclean", destination: "/apps/soniclean" },
      { source: "/sonicclean/:path*", destination: "/apps/soniclean/:path*" },
    ];
  },
};

export default nextConfig;
