"use client";

import React, { useEffect, useRef, useState } from "react";
import dayjs from "dayjs";
import { NavigationMenuMexc } from "@/components/ui/NavigationMenu";
import Image from "next/image";
import { MxQrcode, PhoneBG, TipsIcon, Windows } from "@/components/svg/index";

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
              <div className="left-card rounded-2xl bg-[#111621] py-4 px-3 hover:bg-[#131722] cursor-pointer w-[694px]">
                <div className="title flex gap-6 h-14 px-5 items-center">
                  <p className="text-[#f2f4f6] text-xl">热门合约</p>
                  <p className="text-[#6e7583] text-xl">热币榜</p>
                </div>
                <div className="hot-list">
                  <div className="coin-row px-5 h-16 flex justify-between items-center hover:bg-[#b4bfd60f] rounded-xl">
                    <div className="coin-icon flex gap-4 h-7 items-center w-36">
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
                    <p className="price text-[#f2f4f6] text-[16px] w-20">
                      87,200.8
                    </p>
                    <p className="rise text-[#0bba74] text-[16px] w-20">
                      +0.31%
                    </p>
                    <button className="buy-button text-[#1463ff] text-sm h-8 border border-solid border-[#1463ff] px-6 rounded-2xl hover:bg-[#1463ff] hover:text-[#f2f4f6]">
                      交易
                    </button>
                  </div>
                  <div className="coin-row px-5 h-16 flex justify-between items-center hover:bg-[#b4bfd60f] rounded-xl">
                    <div className="coin-icon flex gap-4 h-7 items-center w-36">
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
                    <p className="price text-[#f2f4f6] text-[16px] w-20">
                      2,012.24
                    </p>
                    <p className="rise text-[#0bba74] text-[16px] w-20">
                      +0.38%
                    </p>
                    <button className="buy-button text-[#1463ff] text-sm h-8 border border-solid border-[#1463ff] px-6 rounded-2xl hover:bg-[#1463ff] hover:text-[#f2f4f6]">
                      交易
                    </button>
                  </div>
                  <div className="coin-row px-5 h-16 flex justify-between items-center hover:bg-[#b4bfd60f] rounded-xl">
                    <div className="coin-icon flex gap-4 h-7 items-center w-36">
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
                    <p className="price text-[#f2f4f6] text-[16px] w-20">
                      634.98
                    </p>
                    <p className="rise text-[#ff4761] text-[16px] w-20">
                      -0.30%
                    </p>
                    <button className="buy-button text-[#1463ff] text-sm h-8 border border-solid border-[#1463ff] px-6 rounded-2xl hover:bg-[#1463ff] hover:text-[#f2f4f6]">
                      交易
                    </button>
                  </div>
                  <div className="coin-row px-5 h-16 flex justify-between items-center hover:bg-[#b4bfd60f] rounded-xl">
                    <div className="coin-icon flex gap-4 h-7 items-center w-36">
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
                    <p className="price text-[#f2f4f6] text-[16px] w-20">
                      138.8
                    </p>
                    <p className="rise text-[#0bba74] text-[16px] w-20">
                      +0.80%
                    </p>
                    <button className="buy-button text-[#1463ff] text-sm h-8 border border-solid border-[#1463ff] px-6 rounded-2xl hover:bg-[#1463ff] hover:text-[#f2f4f6]">
                      交易
                    </button>
                  </div>
                  <div className="coin-row px-5 h-16 flex justify-between items-center hover:bg-[#b4bfd60f] rounded-xl">
                    <div className="coin-icon flex gap-4 h-7 items-center w-36">
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
                    <p className="price text-[#f2f4f6] text-[16px] w-20">
                      0.458
                    </p>
                    <p className="rise text-[#0bba74] text-[16px] w-20">
                      +187.95%
                    </p>
                    <button className="buy-button text-[#1463ff] text-sm h-8 border border-solid border-[#1463ff] px-6 rounded-2xl hover:bg-[#1463ff] hover:text-[#f2f4f6]">
                      交易
                    </button>
                  </div>
                  <div className="coin-row px-5 h-16 flex justify-between items-center hover:bg-[#b4bfd60f] rounded-xl">
                    <div className="coin-icon flex gap-4 h-7 items-center w-36">
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
                    <p className="price text-[#f2f4f6] text-[16px] w-20">
                      2.75
                    </p>
                    <p className="rise text-[#0bba74] text-[16px] w-20">
                      +0.78%
                    </p>
                    <button className="buy-button text-[#1463ff] text-sm h-8 border border-solid border-[#1463ff] px-6 rounded-2xl hover:bg-[#1463ff] hover:text-[#f2f4f6]">
                      交易
                    </button>
                  </div>
                  <div className="coin-row px-5 h-16 flex justify-between items-center hover:bg-[#b4bfd60f] rounded-xl">
                    <div className="coin-icon flex gap-4 h-7 items-center w-36">
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
                    <p className="price text-[#f2f4f6] text-[16px] w-20">
                      0.84
                    </p>
                    <p className="rise text-[#0bba74] text-[16px] w-20">
                      +2.87%
                    </p>
                    <button className="buy-button text-[#1463ff] text-sm h-8 border border-solid border-[#1463ff] px-6 rounded-2xl hover:bg-[#1463ff] hover:text-[#f2f4f6]">
                      交易
                    </button>
                  </div>
                </div>
              </div>
              <div className="right-card w-[494px]">
                <div className="rounded-2xl bg-[#111621] py-4 px-3 hover:bg-[#131722] cursor-pointer">
                  <div className="title flex gap-6 h-14 px-5 items-center">
                    <p className="text-[#f2f4f6] text-xl">现货涨幅榜</p>
                    <p className="text-[#6e7583] text-xl">合约涨幅榜</p>
                  </div>
                  <div className="hot-list">
                    <div className="coin-row px-5 h-16 flex justify-between items-center hover:bg-[#b4bfd60f] rounded-xl">
                      <div className="coin-icon flex gap-4 h-7 items-center w-36">
                        <Image
                          src="/icon/icon-hbd.png"
                          alt="coin icon"
                          className="rounded-full"
                          width={28}
                          height={28}
                          priority
                        />
                        <p className="text-[#f2f4f6]">HBDUSDT</p>
                      </div>
                      <p className="price text-[#f2f4f6] text-[16px] w-20">
                        0.822
                      </p>
                      <p className="rise text-[#0bba74] text-[16px] w-20">
                        +1,995.50%
                      </p>
                    </div>
                    <div className="coin-row px-5 h-16 flex justify-between items-center hover:bg-[#b4bfd60f] rounded-xl">
                      <div className="coin-icon flex gap-4 h-7 items-center w-36">
                        <Image
                          src="/icon/icon-kilo.png"
                          alt="coin icon"
                          className="rounded-full"
                          width={28}
                          height={28}
                          priority
                        />
                        <p className="text-[#f2f4f6]">KILOUSDT</p>
                      </div>
                      <p className="price text-[#f2f4f6] text-[16px] w-20">
                        0.08871
                      </p>
                      <p className="rise text-[#0bba74] text-[16px] w-20">
                        +491.40%
                      </p>
                    </div>
                    <div className="coin-row px-5 h-16 flex justify-between items-center hover:bg-[#b4bfd60f] rounded-xl">
                      <div className="coin-icon flex gap-4 h-7 items-center w-36">
                        <Image
                          src="/icon/icon-wal.png"
                          alt="coin icon"
                          className="rounded-full"
                          width={28}
                          height={28}
                          priority
                        />
                        <p className="text-[#f2f4f6]">WALUSDT</p>
                      </div>
                      <p className="price text-[#f2f4f6] text-[16px] w-20">
                        0.4341
                      </p>
                      <p className="rise text-[#0bba74] text-[16px] w-20">
                        +117.45%
                      </p>
                    </div>
                  </div>
                </div>
                <div className="mt-3 rounded-2xl bg-[#111621] py-4 px-3 hover:bg-[#131722] cursor-pointer">
                  <div className="title flex gap-6 h-14 px-5 items-center">
                    <p className="text-[#f2f4f6] text-xl">新币榜</p>
                  </div>
                  <div className="hot-list">
                    <div className="coin-row px-5 h-16 flex justify-between items-center hover:bg-[#b4bfd60f] rounded-xl">
                      <div className="coin-icon flex gap-4 h-7 items-center w-36">
                        <Image
                          src="/icon/icon-corn.png"
                          alt="coin icon"
                          className="rounded-full"
                          width={28}
                          height={28}
                          priority
                        />
                        <p className="text-[#f2f4f6]">CORNUSDT</p>
                      </div>
                      <p className="price text-[#f2f4f6] text-[16px] w-20">
                        即将上线
                      </p>
                      <p className="rise text-[#1463ff] text-[16px] w-20">
                        00:48:30
                      </p>
                    </div>
                    <div className="coin-row px-5 h-16 flex justify-between items-center hover:bg-[#b4bfd60f] rounded-xl">
                      <div className="coin-icon flex gap-4 h-7 items-center w-36">
                        <Image
                          src="/icon/icon-k.png"
                          alt="coin icon"
                          className="rounded-full"
                          width={28}
                          height={28}
                          priority
                        />
                        <p className="text-[#f2f4f6]">KUSDT</p>
                      </div>
                      <p className="price text-[#f2f4f6] text-[16px] w-20">
                        即将上线
                      </p>
                      <p className="rise text-[#1463ff] text-[16px] w-20">
                        77:48:10
                      </p>
                    </div>
                    <div className="coin-row px-5 h-16 flex justify-between items-center hover:bg-[#b4bfd60f] rounded-xl">
                      <div className="coin-icon flex gap-4 h-7 items-center w-36">
                        <Image
                          src="/icon/icon-hbd.png"
                          alt="coin icon"
                          className="rounded-full"
                          width={28}
                          height={28}
                          priority
                        />
                        <p className="text-[#f2f4f6]">HBDUSDT</p>
                      </div>
                      <p className="price text-[#f2f4f6] text-[16px] w-20">
                        0.822
                      </p>
                      <p className="rise text-[#0bba74] text-[16px] w-20">
                        +1,995.50%
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="wrapper-hold-mx-income mt-28">
            <h2 className="text-[#f2f4f6] text-4xl text-center">
              持有 MX 享多重权益
            </h2>
            <div className="mx-income flex gap-3 mt-12">
              <div className="left-card rounded-2xl bg-[#111621] p-6 hover:bg-[#131722] cursor-pointer w-[734px] flex items-center justify-between">
                <div className="left">
                  <Image
                    src="/mexc/mx-partin.png"
                    alt="coin icon"
                    width={48}
                    height={48}
                    priority
                  />
                  <p className="text-[#f2f4f6] text-xl mt-4">
                    交易费率最高享 5 折
                  </p>
                  <p className="text-[#87909f] text-sm mt-12 flex gap-2 items-center">
                    活动累计年收益率
                    <TipsIcon />
                  </p>
                  <p className="text-[#f2f4f6] text-4xl mt-6">52.21%</p>
                </div>
                <Image
                  src="/mexc/mx-rise.png"
                  alt="coin icon"
                  width={400}
                  height={197}
                  priority
                />
              </div>
              <div className="right-card w-[454px]">
                <div className="rounded-2xl bg-[#111621] py-7 px-6 hover:bg-[#131722] cursor-pointer">
                  <Image
                    src="/mexc/mx-trade.png"
                    alt="coin icon"
                    width={48}
                    height={48}
                    priority
                  />
                  <p className="text-[#f2f4f6] text-xl mt-4">
                    交易费率最高享 5 折
                  </p>
                </div>
                <div className="mt-3 rounded-2xl bg-[#111621] py-7 px-6 hover:bg-[#131722] cursor-pointer">
                  <Image
                    src="/mexc/mx-invite.png"
                    alt="coin icon"
                    width={48}
                    height={48}
                    priority
                  />
                  <p className="text-[#f2f4f6] text-xl mt-4">最高 70% 返佣</p>
                </div>
              </div>
            </div>
          </div>
          <div className="wrapper-three-measures mt-28">
            <h2 className="text-[#f2f4f6] text-4xl text-center">
              三大举措守护资产安全
            </h2>
            <p className="mt-4 text-[#87909f] text-xl text-center">
              即时帮您监控资产风险，平台原因造成损失快速全赔
            </p>
            <div className="mt-12 flex gap-3 justify-between">
              <div className="rounded-2xl bg-[#111621] flex-1 pt-10 pb-12 text-center hover:bg-[#131722] cursor-pointer">
                <Image
                  className="m-auto"
                  src="/mexc/coin.png"
                  alt="coin icon"
                  width={100}
                  height={100}
                  priority
                />
                <p className="text-[#f2f4f6] text-xl mt-3">储备金率超 100%</p>
                <p className="text-[#87909f] text-sm mt-6">
                  资产安全透明，您不用担心挤兑风险
                </p>
              </div>
              <div className="rounded-2xl bg-[#111621] flex-1 pt-10 pb-12 text-center hover:bg-[#131722] cursor-pointer">
                <Image
                  className="m-auto"
                  src="/mexc/lock.png"
                  alt="coin icon"
                  width={100}
                  height={100}
                  priority
                />
                <p className="text-[#f2f4f6] text-xl mt-3">资产安全储存</p>
                <p className="text-[#87909f] text-sm mt-6">
                  结合冷存储与热钱包策略，确保您的资产存储安全
                </p>
              </div>
              <div className="rounded-2xl bg-[#111621] flex-1 pt-10 pb-12 text-center hover:bg-[#131722] cursor-pointer">
                <Image
                  className="m-auto"
                  src="/mexc/shield.png"
                  alt="coin icon"
                  width={100}
                  height={100}
                  priority
                />
                <p className="text-[#f2f4f6] text-xl mt-3">合约保险基金</p>
                <p className="text-[#87909f] text-sm mt-6">
                  补偿超过保证金的亏损，让您可以放心交易
                </p>
              </div>
            </div>
          </div>
          <div className="wrapper-three-measures mt-28">
            <h2 className="text-[#f2f4f6] text-4xl text-center">
              随时随地开启交易
            </h2>
            <div className="flex items-center justify-center">
              <div className="phone relative">
                <PhoneBG />
                <Image
                  className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
                  src="/mexc/phone.png"
                  alt="coin icon"
                  width={330}
                  height={542}
                  priority
                />
              </div>
              <div className="download">
                <div className="qrcode flex gap-9 items-center rounded-2xl bg-[#111621] hover:bg-[#131722] cursor-pointer p-10">
                  <MxQrcode />
                  <div className="">
                    <p className="text-[#87909f] text-sm">扫码下载App</p>
                    <p className="text-[#f2f4f6] text-xl mt-1">
                      iOS 和 Android
                    </p>
                  </div>
                </div>
                <div className="other rounded-2xl bg-[#111621] hover:bg-[#131722] cursor-pointer p-10 mt-3">
                  <div className="flex gap-9 items-center">
                    <div className="android flex gap-2 items-center">
                      <Image
                        className="m-auto"
                        src="/mexc/android.png"
                        alt="coin icon"
                        width={32}
                        height={32}
                        priority
                      />
                      <p className="text-[#f2f4f6] text-lg hover:text-[#1463ff]">
                        下载 MEXC
                      </p>
                    </div>
                    <div className="windows flex gap-2 items-center">
                      <Windows />
                      <p className="text-[#f2f4f6] text-lg hover:text-[#1463ff]">
                        Windows
                      </p>
                    </div>
                  </div>
                  <p className="text-[#87909f] text-sm mt-10 hover:text-[#1463ff]">
                    更多选项 &gt;
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <footer className="py-16 relative w-full bg-[#0d0e0f] border-t-[1px] border-[#3b3e46]">
        <div className="content relative max-w-[1200px] mx-auto flex justify-between">
          <div className="company">
            <p className="text-[#f2f4f6] text-lg">公司</p>
            <div className="text-[#f2f4f6] text-sm mt-4">
              <p className="py-2 hover:text-[#1463ff] cursor-pointer">关于</p>
              <p className="py-2 hover:text-[#1463ff] cursor-pointer">
                资产安全
              </p>
              <p className="py-2 hover:text-[#1463ff] cursor-pointer">
                用户协议
              </p>
              <p className="py-2 hover:text-[#1463ff] cursor-pointer">
                隐私政策
              </p>
              <p className="py-2 hover:text-[#1463ff] cursor-pointer">
                风险告知
              </p>
              <p className="py-2 hover:text-[#1463ff] cursor-pointer">
                联系我们
              </p>
            </div>
          </div>
          <div className="product">
            <p className="text-[#f2f4f6] text-lg">产品</p>
            <div className="text-[#f2f4f6] text-sm mt-4">
              <p className="py-2 hover:text-[#1463ff] cursor-pointer">买币</p>
              <p className="py-2 hover:text-[#1463ff] cursor-pointer">P2P</p>
              <p className="py-2 hover:text-[#1463ff] cursor-pointer">闪兑</p>
              <p className="py-2 hover:text-[#1463ff] cursor-pointer">
                现货交易
              </p>
              <p className="py-2 hover:text-[#1463ff] cursor-pointer">
                合约交易
              </p>
              <p className="py-2 hover:text-[#1463ff] cursor-pointer">
                跟单交易
              </p>
            </div>
          </div>
          <div className="support">
            <p className="text-[#f2f4f6] text-lg">支持</p>
            <div className="text-[#f2f4f6] text-sm mt-4">
              <p className="py-2 hover:text-[#1463ff] cursor-pointer">
                联系客服
              </p>
              <p className="py-2 hover:text-[#1463ff] cursor-pointer">
                提交咨询
              </p>
              <p className="py-2 hover:text-[#1463ff] cursor-pointer">
                改进建议
              </p>
              <p className="py-2 hover:text-[#1463ff] cursor-pointer">
                举报异常资金
              </p>
              <p className="py-2 hover:text-[#1463ff] cursor-pointer">
                司法协助
              </p>
              <p className="py-2 hover:text-[#1463ff] cursor-pointer">
                官方验证通道
              </p>
            </div>
          </div>
          <div className="cooperation">
            <p className="text-[#f2f4f6] text-lg">合作</p>
            <div className="text-[#f2f4f6] text-sm mt-4">
              <p className="py-2 hover:text-[#1463ff] cursor-pointer">
                上币申请
              </p>
              <p className="py-2 hover:text-[#1463ff] cursor-pointer">
                P2P商家申请
              </p>
              <p className="py-2 hover:text-[#1463ff] cursor-pointer">API</p>
              <p className="py-2 hover:text-[#1463ff] cursor-pointer">
                机构服务
              </p>
              <p className="py-2 hover:text-[#1463ff] cursor-pointer">
                代理计划
              </p>
            </div>
          </div>
          <div className="study">
            <p className="text-[#f2f4f6] text-lg">学习</p>
            <div className="text-[#f2f4f6] text-sm mt-4">
              <p className="py-2 hover:text-[#1463ff] cursor-pointer">
                帮助中心
              </p>
              <p className="py-2 hover:text-[#1463ff] cursor-pointer">
                新手学院
              </p>
              <p className="py-2 hover:text-[#1463ff] cursor-pointer">
                MEXC Blog
              </p>
              <p className="py-2 hover:text-[#1463ff] cursor-pointer">
                加密货币价格
              </p>
              <p className="py-2 hover:text-[#1463ff] cursor-pointer">
                如何购买加密货币
              </p>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}
