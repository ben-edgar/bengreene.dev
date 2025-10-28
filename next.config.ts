import type { NextConfig } from "next";

// Base path for deployment - configurable via environment variable
// - Local development: leave NEXT_PUBLIC_BASE_PATH unset (defaults to "")
// - GitHub Pages subdirectory: set to "/bengreene.dev"
// - Custom domain: leave unset or set to ""
const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";

const nextConfig: NextConfig = {
  /* config options here */
  output: "export", // 🔥 Enables static HTML export
  basePath, // Configurable base path for subdirectory deployment
  assetPrefix: basePath, // Ensures _next/ assets use the same base path
  images: { unoptimized: true }, // Required for static export
  reactCompiler: true,
};

export default nextConfig;
