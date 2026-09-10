import { withPayload } from "@payloadcms/next/withPayload";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "*.public.blob.vercel-storage.com",
        pathname: "/**",
      },
    ],
  },
  async redirects() {
    return [
      {
        source: "/studio",
        destination: "/admin",
        permanent: false,
      },
      {
        source: "/studio/:path*",
        destination: "/admin",
        permanent: false,
      },
      {
        source: "/reparações",
        destination: "/reparacoes",
        permanent: false,
      },
    ];
  },
};

export default withPayload(nextConfig);
