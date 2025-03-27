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
      <div className="relative w-full h-screen bg-[#0d0e0f]">
        <div className="content relative max-w-[1200px] mx-auto">
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
      </div>
    </>
  );
}
