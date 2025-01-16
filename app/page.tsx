"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { LineShadowText } from "@/components/ui/line-shadow-text";
import { VelocityScroll } from "@/components/ui/scroll-text";
import Link from "next/link";

export default function Home() {
  const [time, setTime] = useState(new Date());
  useEffect(() => {
    const handle = setInterval(() => {
      setTime(new Date());
    }, 1000 * 2);

    return () => {
      clearInterval(handle);
    };
  }, []);

  return (
    <main className="relative w-full h-screen select-none">
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
        <div className="content-top mt-28 flex justify-center flex-col items-center space-y-4">
          <div className="time text-3xl font-semibold text-white font-sans">
            {time.getHours()}:{`00${time.getMinutes()}`.slice(-2)}
          </div>
          <h1 className="font-semibold leading-none tracking-tighter sm:text-3xl md:text-6xl text-white">
            Fund
            <LineShadowText className="italic" shadowColor="white">
              OS
            </LineShadowText>
          </h1>
        </div>
        <div className="content-bottom absolute w-full bottom-[100px]">
          <div className="icons flex justify-center space-x-4">
            <Link href="https://goldog.netlify.app/" target="_blank">
              <Image
                src="/image/ai16z2.avif"
                alt="ai16z Logo"
                className="rounded-3xl"
                width={80}
                height={80}
                priority
              />
              <p className="text-center text-white mt-1">Goldoge</p>
            </Link>
          </div>
          <div className="texts flex justify-center space-x-4 text-white mt-9">
            <Link
              href="https://github.com/fundgao"
              target="_blank"
              className="px-4 py-[4px] bg-slate-600/30 rounded-3xl"
            >
              Github
            </Link>
            <Link
              href="mailto:fundgao@163.com"
              target="_blank"
              className="px-4 py-[4px] bg-slate-600/30 rounded-3xl"
            >
              Email
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
