import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "img.shields.io",
        port: "",
        pathname: "/**", // Allows all paths under img.shields.io
      },
    ],
    dangerouslyAllowSVG: true, // Explicitly allow SVG images (safe for trusted sources like Shields.io)
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;", // Optional: Enhance security
  },
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/,
      use: ["@svgr/webpack"], // Transform SVG into React components
    });

    // Add rule for font files (EOT, WOFF, TTF, SVG) from slick-carousel
    config.module.rules.push({
      test: /\.(eot|woff|woff2|ttf|svg)$/,
      type: "asset/resource",
      generator: {
        filename: "static/fonts/[name][ext][query]",
      },
    });

    return config;
  },
};

export default nextConfig;