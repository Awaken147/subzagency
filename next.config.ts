import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",
  typescript: {
    ignoreBuildErrors: true,
  },
  reactStrictMode: false,
  allowedDevOrigins: [
    "preview-chat-3fc7b84e-2936-4d14-953a-ed37cf73a734.space-z.ai",
  ],
};

export default nextConfig;
