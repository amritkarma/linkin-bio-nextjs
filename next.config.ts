import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '8000',
        // pathname: '',
        // search: '',
      },
      {
        protocol: 'https',
        hostname: 'www.pexels.com',
        // port: '',
        // pathname: '',
        // search: '',
      },
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
        // port: '',
        // pathname: '',
        // search: '',
      },
    ],
  },
};

export default nextConfig;
