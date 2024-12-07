import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  /**
   * https://nextjs.org/docs/app/api-reference/file-conventions/metadata/sitemap
   *
   * http://localhost:3000/sitemap.xml
   */
  return [
    {
      url: "https://goldoge.vercel.app/",
      lastModified: new Date(),
    },
  ];
}
