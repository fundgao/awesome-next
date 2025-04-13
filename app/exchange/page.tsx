import { NavigationMenuMexc } from "@/components/ui/NavigationMenu";
import styles from "./page.module.scss";
import {
  TipsIcon,
  PlayCircleOutlined,
  StarFilled,
} from "@/components/svg/index";
import { Checkbox } from "@/components/ui/checkbox";
import Image from "next/image";

export default function Page() {
  return (
    <>
      <NavigationMenuMexc />
      <div className={styles.ExchangePage}>
        <div className="wrapper-headline px-4 flex items-center relative">
          <div className="flex items-center gap-2">
            <StarFilled />
            <Image
              src="/mexc/mxlogo.png"
              alt="goldoge Logo"
              width={24}
              height={24}
              priority
            />
            <div className="MX">
              <h1 className="text-[#f2f4f6] text-base font-bold">MX/USDT</h1>
              <p className="text-[#87909f] text-xs">MX Token</p>
            </div>
            <div className="line h-10 w-[1px] bg-[#2b2e33] ml-2 mr-4"></div>
          </div>
          <div className="flex items-center gap-4">
            <div className="coin-price">
              <p className="text-[#f2f4f6] text-base font-bold">2.7024</p>
              <p className="text-[#87909f] text-xs">RM 11.95</p>
            </div>
            <div className="24h-high">
              <p className="text-[#87909f] text-xs">24h 最高价</p>
              <p className="text-[#f2f4f6] text-xs mt-1">2.7495</p>
            </div>
            <div className="24h-low">
              <p className="text-[#87909f] text-xs">24h 最低价</p>
              <p className="text-[#f2f4f6] text-xs mt-1">2.6746</p>
            </div>
            <div className="24h-change">
              <p className="text-[#87909f] text-xs">24h 成交量 (MX)</p>
              <p className="text-[#f2f4f6] text-xs mt-1">2.8M</p>
            </div>
            <div className="24h-volume">
              <p className="text-[#87909f] text-xs">24h 成交额 (USDT)</p>
              <p className="text-[#f2f4f6] text-xs mt-1">7.83M</p>
            </div>
          </div>
          <div className="cursor-pointer absolute right-4">
            <PlayCircleOutlined />
          </div>
        </div>
        <div className="wrapper-markets px-4">
          <div
            className="wrapper-markets-title flex items-center gap-4 text-sm text-[#87909f] h-10"
            style={{ borderBottom: "1px solid #222429" }}
          >
            <p>自选</p>
            <p className="text-[#f2f4f6]">USDT</p>
            <p>USDC</p>
            <p>ETH</p>
            <p>BTC</p>
          </div>
          <div
            className="wrapper-markets-qu flex items-center justify-between gap-3 text-xs text-[#87909f] h-10"
            style={{ borderBottom: "1px solid #222429" }}
          >
            <p className="text-[#f2f4f6]">全部</p>
            <p>主板区</p>
            <p>创新区</p>
            <p>考核区</p>
            <p>Trump</p>
          </div>
        </div>
        <div className="wrapper-kline">
          <div
            className="orderbook-header flex items-center gap-4 h-10 text-sm px-4"
            style={{ borderBottom: "1px solid #222429" }}
          >
            <p className="orderbook-header-title cursor-pointer text-[#f2f4f6]">
              图表
            </p>
            <p className="orderbook-header-title text-[#87909f] hover:text-[#f2f4f6] cursor-pointer">
              币种资料
            </p>
          </div>
        </div>
        <div className="wrapper-orderbook">
          <div
            className="orderbook-header flex items-center gap-4 h-10 text-sm px-4"
            style={{ borderBottom: "1px solid #222429" }}
          >
            <p className="orderbook-header-title cursor-pointer text-[#f2f4f6]">
              委托订单
            </p>
            <p className="orderbook-header-title text-[#87909f] hover:text-[#f2f4f6] cursor-pointer">
              最新成交
            </p>
          </div>
          <div className="orderbook-content mt-2 px-4">
            <div className="orderbook-content-title flex justify-between items-center gap-4 text-[#87909f]">
              <p className="orderbook-content-title-text">价格(USDT)</p>
              <p className="orderbook-content-title-text">数量(MX))</p>
              <p className="orderbook-content-title-text">金额(USDT)</p>
            </div>
          </div>
        </div>
        <div className="wrapper-trade">
          <div
            className="orderbook-header flex items-center gap-4 h-10 text-sm px-4"
            style={{ borderBottom: "1px solid #222429" }}
          >
            <p className="orderbook-header-title cursor-pointer text-[#f2f4f6]">
              现货交易
            </p>
          </div>
        </div>
        <div className="wrapper-orders">
          <div className="orders-header flex justify-between items-center">
            <div className="left flex gap-4 h-10 text-sm items-center">
              <p className="orders-header-title cursor-pointer text-[#f2f4f6]">
                当前委托(0)
              </p>
              <p className="orders-header-title text-[#87909f] hover:text-[#f2f4f6] cursor-pointer">
                历史委托
              </p>
              <p className="orders-header-title text-[#87909f] hover:text-[#f2f4f6] cursor-pointer">
                历史成交
              </p>
              <p className="orders-header-title text-[#87909f] hover:text-[#f2f4f6] cursor-pointer">
                当前持仓(0)
              </p>
              <TipsIcon />
            </div>
            <div className="right flex justify-between items-center gap-2">
              <Checkbox id="terms" className="border-[#606268]" />
              <label
                htmlFor="terms"
                className="text-xs text-[#f2f4f6] cursor-pointer"
              >
                隐藏其他交易对
              </label>
            </div>
          </div>
        </div>
        <div className="wrapper-balance">资产</div>
      </div>
    </>
  );
}
