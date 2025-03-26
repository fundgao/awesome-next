"use client";

import React, { useEffect, useRef, useState } from "react";
import {
  AreaSeries,
  BarSeries,
  BaselineSeries,
  createChart,
} from "lightweight-charts";
import dayjs from "dayjs";

export default function Page() {
  const chartContainerRef = useRef(null);
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "https://api.coingecko.com/api/v3/coins/bitcoin/market_chart?vs_currency=usd&days=30&interval=daily"
        );
        const result = await response.json();
        const formattedData = result.prices.map(([time, price]) => ({
          time: dayjs(time).format("YYYY-MM-DD"),
          open: parseFloat((price * 0.95).toFixed(2)),
          high: parseFloat((price * 1.05).toFixed(2)),
          low: parseFloat((price * 0.95).toFixed(2)),
          close: price,
        }));
        formattedData.pop();
        console.log("formattedData", formattedData);
        setData(formattedData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    if (!chartContainerRef.current || data.length === 0) return; // 确保容器已渲染

    const chart = createChart(chartContainerRef.current, {
      width: chartContainerRef.current.clientWidth,
      height: 400,
      layout: { backgroundColor: "#ffffff", textColor: "#000" },
      grid: {
        vertLines: { color: "#e1ecf2" },
        horzLines: { color: "#e1ecf2" },
      },
    });

    const candleSeries = chart.addSeries(AreaSeries, {
      lineColor: "#2962FF",
      topColor: "#2962FF",
      bottomColor: "rgba(41, 98, 255, 0.28)",
    });
    console.log("candleSeries data", data);

    // candleSeries.setData(data);

    const handleResize = () => {
      chart.applyOptions({ width: chartContainerRef.current.clientWidth });
    };
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      chart.remove();
    };
  }, [data]);

  return <div ref={chartContainerRef} className="w-full h-[400px]" />;
}
