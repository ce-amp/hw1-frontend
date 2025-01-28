/** @type {import('next').NextConfig} */

const nextConfig = {
  output: "standalone",
  async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination: "http://quiz-backend:8000/api/:path*",
      },
    ];
  },
};

export default nextConfig;
