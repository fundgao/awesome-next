"use client";

import React, { useEffect, useRef, useState } from "react";
import {
  AreaSeries,
  BarSeries,
  BaselineSeries,
  createChart,
  CandlestickSeries,
} from "lightweight-charts";
import dayjs from "dayjs";
import { NavigationMenuMexc } from "@/components/ui/NavigationMenu";

export default function Page() {
  const chartContainerRef = useRef(null);
  const [data, setData] = useState([]);

  return (
    <>
      <NavigationMenuMexc />
      <div className="relative w-full bg-[#0d0e0f]">
        <div className="content relative max-w-[1200px] mx-auto">
          <div className="wrapper-banner relative">
            <video
              playsInline
              className="w-[100%] h-auto object-cover object-[50% 50%]"
              muted
              autoPlay
              loop
              src="/video/mexc2.mp4"
              preload="none"
              x5-playsinline="true"
              x5-video-player-type="h5-page"
            />
            <div
              className="absolute w-[100%] h-[100%] top-0 z-10 overflow-hidden"
              style={{
                padding: "80px",
                boxShadow: "0 0 80px 80px #0d0e0f inset",
                boxSizing: "border-box",
              }}
            ></div>
          </div>
          <div className="wrapper-bouns mt-28 flex gap-3 justify-between">
            <div className="h-36 rounded-2xl bg-[#111621] flex-1 p-6 hover:bg-[#131722] cursor-pointer">
              <p className="title text-[#87909f]">注册领取超高奖励</p>
              <p className="description text-white mt-6">
                <span className="text-4xl">8,000</span>
                <span className="pl-2 text-sm">USDT</span>
              </p>
            </div>
            <div className="h-36 rounded-2xl bg-[#111621] flex-1 p-6 hover:bg-[#131722] cursor-pointer">
              <p className="title text-[#87909f]">热币数量全球第一</p>
              <p className="description text-white mt-6">
                <span className="text-4xl">2,943</span>
                <span className="pl-2 text-sm">现货</span>
                <span className="text-4xl ml-12">1,102</span>
                <span className="pl-2 text-sm">合约</span>
              </p>
            </div>
            <div className="h-36 rounded-2xl bg-[#111621] flex-1 p-6 hover:bg-[#131722] cursor-pointer">
              <p className="title text-[#87909f]">天天送币</p>
              <p className="description text-white mt-6">
                <span className="text-4xl">52.21%</span>
                <span className="pl-2 text-sm">MX空投累计年收益率</span>
              </p>
            </div>
          </div>
          <div className="wrapper-hot-ranks mt-28">
            <h2 className="text-[#f2f4f6] text-4xl text-center">
              热币数量全球第一
            </h2>
            <p className="mt-4 text-[#87909f] text-xl text-center">
              上币最多最快
            </p>
            <div className="hot-ranks"></div>
          </div>
        </div>
      </div>
    </>
  );
}
