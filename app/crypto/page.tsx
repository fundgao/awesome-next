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
      <div className="relative w-full h-screen bg-[#0d0e0f]"></div>
    </>
  );
}
