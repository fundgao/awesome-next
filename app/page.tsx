import Image from "next/image";

export default function Home() {
  return (
    <main className="relative w-full h-screen">
      <video
        playsInline
        className="w-full h-full object-cover object-[50% 50%]"
        muted
        autoPlay
        loop
        src="/video/ai16z.min.mp4"
        preload="none"
        x5-playsinline="true"
        x5-video-player-type="h5-page"
      />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center z-10">
        <a
          className="pointer-events-none flex place-items-center gap-2 p-8 lg:pointer-events-auto lg:p-0"
          href="https://goldog.netlify.app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            src="/vercel.svg"
            alt="Vercel Logo"
            className="dark:invert"
            width={100}
            height={24}
            priority
          />
          Goldoge 金狗科技
        </a>
      </div>
    </main>
  );
}
