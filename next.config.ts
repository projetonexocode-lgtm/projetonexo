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
        hostname: "cdn.sanity.io",
        pathname: "/images/**",
      },
    ],
  },
  async redirects() {
    const nexoOrigin = "https://nexoservices.vercel.app/";
    const skipOnNexoHost = [
      { type: "host" as const, value: "nexoservices.vercel.app" },
      { type: "host" as const, value: "nexoservices.pt" },
      { type: "host" as const, value: "www.nexoservices.pt" },
    ];

    return [
      {
        source: "/reparacoes",
        destination: nexoOrigin,
        permanent: false,
        missing: skipOnNexoHost,
      },
      {
        source: "/reparações",
        destination: nexoOrigin,
        permanent: false,
        missing: skipOnNexoHost,
      },
    ];
  },
};

export default nextConfig;
