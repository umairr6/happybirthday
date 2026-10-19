
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  basePath: "/happybirthday",
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
