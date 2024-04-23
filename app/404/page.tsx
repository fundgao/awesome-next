import Image from 'next/image';
import Head from 'next/head';
import Link from 'next/link';

export default function Page() {
  return (
    <div className='relative w-full h-screen select-none'>
      <Head>
        <title>My page title</title>
      </Head>
      <Image
        className='w-full h-screen object-cover'
        src="/image/404/404_3.jpg"
        width={500}
        height={500}
        alt="Picture of the author"
      />
      <div className='text-wrapper absolute inset-y-1/3 w-max	h-max inset-x-1/4'>
        <p className="text1 text-white text-lg">对不起！</p>
        <p className="text2 text-lg text-blue-600 mt-1.5">您要找的页面找不到了</p>
        <p className="text3 text-8xl mt-1.5 bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text	" style={{
          WebkitTextFillColor: 'transparent'
        }}>404</p>
        <Link href="/" className='block w-max text-white text-lg bg-purple-950 py-2.5 px-5 rounded-2xl mt-3.5'>回到首页</Link>
      </div>
    </div>
  );
}