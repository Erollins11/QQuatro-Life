import type { NextConfig } from "next";

function getCmsRemotePattern() {
  const cmsBaseUrl = process.env.CMS_BASE_URL?.trim();

  if (!cmsBaseUrl) {
    return [];
  }

  try {
    const parsed = new URL(cmsBaseUrl);

    return [
      {
        protocol: parsed.protocol.replace(":", "") as "http" | "https",
        hostname: parsed.hostname,
        port: parsed.port,
        pathname: "/**",
      },
    ];
  } catch {
    return [];
  }
}

const nextConfig: NextConfig = {
  images: {
    remotePatterns: getCmsRemotePattern(),
  },
};

export default nextConfig;
