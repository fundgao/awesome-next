import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  sassOptions: {
    additionalData: `$var: red;`,
  },
  /* config options here */
  experimental: {
    // DEMO https://github.com/vercel/next-view-transition-example/blob/main/app/card/page.tsx
    viewTransition: true,
    useCache: true,
    turbo: {
      // Example: adding an alias and custom file extension
      resolveAlias: {
        underscore: "lodash",
      },
      resolveExtensions: [".mdx", ".tsx", ".ts", ".jsx", ".js", ".json"],
    },
  },
  withBundleAnalyzer: {
    enabled: process.env.ANALYZE === "true",
  },
};

export default nextConfig;
