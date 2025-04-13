import { NavigationMenuMexc } from "@/components/ui/NavigationMenu";
import styles from "./page.module.scss";
import { TipsIcon, PlayCircleOutlined } from "@/components/svg/index";
import { Checkbox } from "@/components/ui/checkbox";

export default function Page() {
  return (
    <>
      <NavigationMenuMexc />
      <div className={styles.ExchangePage}>
        <div className="wrapper-headline px-4 flex items-center relative">
          <div className="cursor-pointer absolute right-4">
            <PlayCircleOutlined />
          </div>
        </div>
        <div className="wrapper-markets">自选币列表</div>
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
