import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactStrictMode: true,
  eslint: {
    // Evita que el build de Vercel falle por errores de ESLint
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;
