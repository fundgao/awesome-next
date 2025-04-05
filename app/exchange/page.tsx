import { NavigationMenuMexc } from "@/components/ui/NavigationMenu";
import styles from "./page.module.scss";
import { TipsIcon } from "@/components/svg/index";
import { Checkbox } from "@/components/ui/checkbox";

export default function Page() {
  return (
    <>
      <NavigationMenuMexc />
      <div className={styles.ExchangePage}>
        <div className="wrapper-headline">Mexc</div>
        <div className="wrapper-markets">自选币列表</div>
        <div className="wrapper-kline">图表</div>
        <div className="wrapper-orderbook">委托订单</div>
        <div className="wrapper-trade">现货交易</div>
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
