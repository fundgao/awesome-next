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

    const chartOptions = {
      layout: {
        textColor: "black",
        background: { type: "solid", color: "white" },
      },
    };
    const chart = createChart(chartContainerRef.current, chartOptions);
    // const areaSeries = chart.addSeries(AreaSeries, {
    //   lineColor: "#2962FF",
    //   topColor: "#2962FF",
    //   bottomColor: "rgba(41, 98, 255, 0.28)",
    // });
    // areaSeries.setData([
    //   { time: "2018-12-22", value: 32.51 },
    //   { time: "2018-12-23", value: 31.11 },
    //   { time: "2018-12-24", value: 27.02 },
    //   { time: "2018-12-25", value: 27.32 },
    //   { time: "2018-12-26", value: 25.17 },
    //   { time: "2018-12-27", value: 28.89 },
    //   { time: "2018-12-28", value: 25.46 },
    //   { time: "2018-12-29", value: 23.92 },
    //   { time: "2018-12-30", value: 22.68 },
    //   { time: "2018-12-31", value: 22.67 },
    // ]);

    const candlestickSeries = chart.addSeries(CandlestickSeries, {
      upColor: "#26a69a",
      downColor: "#ef5350",
      borderVisible: false,
      wickUpColor: "#26a69a",
      wickDownColor: "#ef5350",
    });
    candlestickSeries.setData(data);

    chart.timeScale().fitContent();
  }, [data]);

  return <div ref={chartContainerRef} className="w-full h-[400px]" />;
}
