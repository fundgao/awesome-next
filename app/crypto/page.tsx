"use client";

import React, { useEffect, useRef, useState } from "react";
import dayjs from "dayjs";
import { NavigationMenuMexc } from "@/components/ui/NavigationMenu";
import Image from "next/image";

export default function Page() {
  return (
    <>
      <NavigationMenuMexc />
      <div className="relative w-full bg-[#0d0e0f]">
        <div className="content relative max-w-[1200px] mx-auto">
          <div className="wrapper-banner relative scale-125">
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
          <div className="wrapper-register absolute w-[1200px] top-32 left-1/2 transform -translate-x-1/2 z-20">
            <h2 className="text-[#f2f4f6] text-4xl">
              注册即送<span className="text-[#ff5e13]">8,000</span>USDT
            </h2>
            <p className="mt-4 text-[#87909f] text-xl">专业数字资产交易平台</p>
            <div className="mt-8">
              <input
                className="w-[300px] h-12 bg-[#111621] border-[1px] border-[#3b3e46] rounded-2xl text-[#87909f] placeholder-[#3b3e46] px-4"
                type="text"
                placeholder="请输入手机号"
              />
              <button className="w-36 h-12 bg-[#ff5e13] text-white rounded-2xl ml-4">
                立即注册
              </button>
            </div>
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
            <div className="hot-ranks flex gap-3 mt-12">
              <div className="left-card flex-1 rounded-2xl bg-[#111621] py-4 px-8 hover:bg-[#131722] cursor-pointer">
                <div className="title flex gap-6 h-14 items-center">
                  <p className="text-[#f2f4f6] text-xl">热门合约</p>
                  <p className="text-[#6e7583] text-xl">热币榜</p>
                </div>
                <div className="hot-list">
                  <div className="coin-row h-16 flex justify-between items-center">
                    <div className="coin-icon flex gap-4 h-7 items-center">
                      <Image
                        src="/icon/icon-btc.png"
                        alt="coin icon"
                        className="rounded-full"
                        width={28}
                        height={28}
                        priority
                      />
                      <p className="text-[#f2f4f6]">BTCUSDT</p>
                    </div>
                    <p className="price text-[#f2f4f6] text-[16px]">87,200.8</p>
                    <p className="rise text-[#0bba74] text-[16px]">+0.31%</p>
                    <button className="buy-button text-[#1463ff] text-sm h-8 border border-solid border-[#1463ff] px-6 rounded-2xl hover:bg-[#1463ff] hover:text-[#f2f4f6]">
                      交易
                    </button>
                  </div>
                  <div className="coin-row h-16 flex justify-between items-center">
                    <div className="coin-icon flex gap-4 h-7 items-center">
                      <Image
                        src="/icon/icon-eth.png"
                        alt="coin icon"
                        className="rounded-full"
                        width={28}
                        height={28}
                        priority
                      />
                      <p className="text-[#f2f4f6]">ETHUSDT</p>
                    </div>
                    <p className="price text-[#f2f4f6] text-[16px]">2,012.24</p>
                    <p className="rise text-[#0bba74] text-[16px]">+0.38%</p>
                    <button className="buy-button text-[#1463ff] text-sm h-8 border border-solid border-[#1463ff] px-6 rounded-2xl hover:bg-[#1463ff] hover:text-[#f2f4f6]">
                      交易
                    </button>
                  </div>
                  <div className="coin-row h-16 flex justify-between items-center">
                    <div className="coin-icon flex gap-4 h-7 items-center">
                      <Image
                        src="/icon/icon-btc.png"
                        alt="coin icon"
                        className="rounded-full"
                        width={28}
                        height={28}
                        priority
                      />
                      <p className="text-[#f2f4f6]">BNBUSDT</p>
                    </div>
                    <p className="price text-[#f2f4f6] text-[16px]">634.98</p>
                    <p className="rise text-[#ff4761] text-[16px]">-0.30%</p>
                    <button className="buy-button text-[#1463ff] text-sm h-8 border border-solid border-[#1463ff] px-6 rounded-2xl hover:bg-[#1463ff] hover:text-[#f2f4f6]">
                      交易
                    </button>
                  </div>
                  <div className="coin-row h-16 flex justify-between items-center">
                    <div className="coin-icon flex gap-4 h-7 items-center">
                      <Image
                        src="/icon/icon-sol.png"
                        alt="coin icon"
                        className="rounded-full"
                        width={28}
                        height={28}
                        priority
                      />
                      <p className="text-[#f2f4f6]">SOLUSDT</p>
                    </div>
                    <p className="price text-[#f2f4f6] text-[16px]">138.8</p>
                    <p className="rise text-[#0bba74] text-[16px]">+0.80%</p>
                    <button className="buy-button text-[#1463ff] text-sm h-8 border border-solid border-[#1463ff] px-6 rounded-2xl hover:bg-[#1463ff] hover:text-[#f2f4f6]">
                      交易
                    </button>
                  </div>
                  <div className="coin-row h-16 flex justify-between items-center">
                    <div className="coin-icon flex gap-4 h-7 items-center">
                      <Image
                        src="/icon/icon-tut.png"
                        alt="coin icon"
                        className="rounded-full"
                        width={28}
                        height={28}
                        priority
                      />
                      <p className="text-[#f2f4f6]">TUTUSDT</p>
                    </div>
                    <p className="price text-[#f2f4f6] text-[16px]">0.458</p>
                    <p className="rise text-[#0bba74] text-[16px]">+187.95%</p>
                    <button className="buy-button text-[#1463ff] text-sm h-8 border border-solid border-[#1463ff] px-6 rounded-2xl hover:bg-[#1463ff] hover:text-[#f2f4f6]">
                      交易
                    </button>
                  </div>
                  <div className="coin-row h-16 flex justify-between items-center">
                    <div className="coin-icon flex gap-4 h-7 items-center">
                      <Image
                        src="/icon/icon-sui.png"
                        alt="coin icon"
                        className="rounded-full"
                        width={28}
                        height={28}
                        priority
                      />
                      <p className="text-[#f2f4f6]">SUIUSDT</p>
                    </div>
                    <p className="price text-[#f2f4f6] text-[16px]">2.75</p>
                    <p className="rise text-[#0bba74] text-[16px]">+0.78%</p>
                    <button className="buy-button text-[#1463ff] text-sm h-8 border border-solid border-[#1463ff] px-6 rounded-2xl hover:bg-[#1463ff] hover:text-[#f2f4f6]">
                      交易
                    </button>
                  </div>
                  <div className="coin-row h-16 flex justify-between items-center">
                    <div className="coin-icon flex gap-4 h-7 items-center">
                      <Image
                        src="/icon/icon-pi.png"
                        alt="coin icon"
                        className="rounded-full"
                        width={28}
                        height={28}
                        priority
                      />
                      <p className="text-[#f2f4f6]">PIUSDT</p>
                    </div>
                    <p className="price text-[#f2f4f6] text-[16px]">0.84</p>
                    <p className="rise text-[#0bba74] text-[16px]">+2.87%</p>
                    <button className="buy-button text-[#1463ff] text-sm h-8 border border-solid border-[#1463ff] px-6 rounded-2xl hover:bg-[#1463ff] hover:text-[#f2f4f6]">
                      交易
                    </button>
                  </div>
                </div>
              </div>
              <div className="right-card flex-1 h-36 rounded-2xl bg-[#111621] py-4 px-8 hover:bg-[#131722] cursor-pointer">
                <div className="title flex gap-6 h-14 items-center">
                  <p className="text-[#f2f4f6] text-xl">热门合约</p>
                  <p className="text-[#6e7583] text-xl">热币榜</p>
                </div>
                <div className="hot-list">
                  <div className="coin-row h-16 flex justify-between items-center">
                    <div className="coin-icon flex gap-4 h-7 items-center">
                      <Image
                        src="/icon/icon-btc.png"
                        alt="coin icon"
                        className="rounded-full"
                        width={28}
                        height={28}
                        priority
                      />
                      <p className="text-[#f2f4f6]">BTCUSDT</p>
                    </div>
                    <p className="price text-[#f2f4f6] text-[16px]">87,200.8</p>
                    <p className="rise text-[#0bba74] text-[16px]">+0.31%</p>
                    <button className="buy-button text-[#1463ff] text-sm h-8 border border-solid border-[#487ee9] px-6 rounded-2xl">
                      交易
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="wrapper-hold-mx-income mt-28">
            <h2 className="text-[#f2f4f6] text-4xl text-center">
              持有 MX 享多重权益
            </h2>
          </div>
        </div>
      </div>
    </>
  );
}
