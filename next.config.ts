import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: ["f003.backblazeb2.com", "localhost", "127.0.0.1"],
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;
