import type { NextConfig } from "next";

const isStaticExport = process.env.IS_STATIC_EXPORT === "true";

const nextConfig: NextConfig = {
  output: isStaticExport ? "export" : undefined,
  /* config options here */
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
