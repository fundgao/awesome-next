import type { MetadataRoute } from 'next'
 
export default function robots(): MetadataRoute.Robots {
  /**
   * https://nextjs.org/docs/app/api-reference/file-conventions/metadata/robots#generate-a-robots-file
   * 
   * http://localhost:3000/robots.txt
   */
  return {
    rules: [
      {
        userAgent: 'Googlebot',
        allow: ['/'],
        disallow: '/private/',
      },
      {
        userAgent: ['Applebot', 'Bingbot'],
        disallow: ['/'],
      },
    ],
    sitemap: 'https://acme.com/sitemap.xml',
  }
}