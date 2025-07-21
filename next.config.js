
/** @type {import('next').NextConfig} */

// This line is essential for Next.js to load environment variables from .env files
require('dotenv').config({ path: './.env.local' });

const nextConfig = {
  /* config options here */
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'placehold.co',
        port: '',
        pathname: '/**',
      },
    ],
  },
  // We need to opt-in to this experimental feature to allow local images.
  experimental: {
    serverComponentsExternalPackages: ['@react-pdf/renderer'],
    outputFileTracingIncludes: {
      '/**': ['./public/**/*'],
    },
  },
};

module.exports = nextConfig;
