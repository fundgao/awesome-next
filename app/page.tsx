import Image from "next/image";
import Marquee from "@/components/ui/marquee";
import { VelocityScroll } from "@/components/ui/scroll-text";

export default function Home() {
  return (
    <main className="relative w-full h-screen">
      <video
        playsInline
        className="w-full h-full object-cover object-[50% 50%]"
        muted
        autoPlay
        loop
        src="/video/ai16z.mini.mp4"
        preload="none"
        x5-playsinline="true"
        x5-video-player-type="h5-page"
      />
      <div className="absolute w-full h-full top-0 z-10 overflow-hidden">
        <div className="marquee-top pt-[6px]">
          <VelocityScroll
            defaultVelocity={2}
            numRows={1}
            className="text-white px-2"
          >
            &nbsp;&nbsp;Goldoge 金狗科技 助您暴富&nbsp;&nbsp;🚀
          </VelocityScroll>
        </div>
        <div className="marquee-bottom w-full absolute bottom-4">
          <VelocityScroll
            defaultVelocity={-2}
            numRows={1}
            className="text-white px-2"
          >
            &nbsp;&nbsp;Goldoge 金狗科技 助您暴富&nbsp;&nbsp;🚀
          </VelocityScroll>
        </div>
        <div className="content-top mt-40 flex justify-center">
          <a
            className="text-white text-2xl font-bold"
            href="https://goldog.netlify.app"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Image
              src="/vercel.svg"
              alt="Vercel Logo"
              className="inline-block"
              width={100}
              height={24}
              priority
            />
            Goldoge 金狗科技
          </a>
        </div>
      </div>
    </main>
  );
}
