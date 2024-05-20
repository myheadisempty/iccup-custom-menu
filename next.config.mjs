/** @type {import('next').NextConfig} */
const nextConfig = {
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
