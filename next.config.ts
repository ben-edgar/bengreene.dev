import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  output: "export", // 🔥 Enables static HTML export
  basePath: "/bengreene.dev", // Required for GitHub Pages subdirectory deployment
  assetPrefix: "/bengreene.dev", // Required for correct asset paths on GitHub Pages
  images: { unoptimized: true }, // Required for GitHub Pages
  reactCompiler: true,
};

export default nextConfig;
