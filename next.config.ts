import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  webpack(config) {
    config.module.rules.push({
      test: /\.module\.scss$/,
      use: [
        {
          loader: "css-loader",
          options: {
            modules: {
              mode: "global", // 默认全局作用域
            },
          },
        },
        "sass-loader",
      ],
    });
    return config;
  },
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

export default nextConfig;
