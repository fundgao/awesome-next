/** @type {import('next').NextConfig} */

const nextConfig = {
  experimental: {
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
