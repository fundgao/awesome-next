import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  /**
   * https://nextjs.org/docs/app/api-reference/file-conventions/metadata/sitemap
   *
   * http://localhost:3000/sitemap.xml
   */
  return [
    {
      url: "https://ai16z.netlify.app/",
      lastModified: new Date(),
    },
    {
      url: "https://goldog.netlify.app/",
      lastModified: new Date(),
    },
  ];
}
