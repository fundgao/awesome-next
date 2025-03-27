import { NavigationMenuMexc } from "@/components/ui/NavigationMenu";
import styles from "./page.module.scss";

export default function Page() {
  return (
    <>
      <NavigationMenuMexc />
      <div className={styles.ExchangePage}>
        <div className="wrapper-headline">Mexc</div>
        <div className="wrapper-markets">自选币列表</div>
        <div className="wrapper-kline">图表</div>
        <div className="wrapper-orderbook-deals">委托订单</div>
        <div className="wrapper-trade">现货交易</div>
        <div className="wrapper-orders">当前委托</div>
        <div className="wrapper-balance">资产</div>
      </div>
    </>
  );
}
