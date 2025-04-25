import type { NextConfig } from "next";

const withBundleAnalyzer = require("@next/bundle-analyzer")({
  enabled: process.env.ANALYZE === "true",
});

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
};

export default withBundleAnalyzer(nextConfig);
