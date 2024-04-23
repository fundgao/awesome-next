import {NextSeo} from 'next-seo';

interface SEO {
  title: string;
  description: string;
  // keywords?: string;
}

// https://blog.csdn.net/SEO_juper/article/details/134216924
export default function SEO({ title, description }: SEO) {
  const seoConfig: SEO = {
    title,
    description
  }

  return (<NextSeo {...seoConfig} />)
}