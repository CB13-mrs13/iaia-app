/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "standalone",
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {},
  // SUPPRIME la section "experimental" ou du moins "devTools"
  // experimental: {
  //   devTools: false,
  // 06-10-2025 essai pour re-synchroniser avec firebase },
};

export default nextConfig;