import type { NextConfig } from "next";

const nextConfig = {
    images: {
      remotePatterns: [
        {
          protocol: "https",
          hostname: "img.shields.io",
          port: "",
          pathname: "/**", // Allows all paths under img.shields.io
        },
      ],
    },
  };
  
  export default nextConfig;
