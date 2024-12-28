import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    reactCompiler: true,
  },
  async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination: "https://iccup.com/:path*",
      },
    ];
  },
};

export default nextConfig;
