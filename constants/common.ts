export const REFRESH_TOKEN_KEY = "REFRESH_TOKEN"; //refreshToken
export const AUTH_TOKEN_KEY = "AUTH_TOKEN";
export const USER_KEY = "USER_KEY";

/**
 * 抹茶交易所 API 文档
 * https://mexcdevelop.github.io/apidocs/spot_v3_cn/#b122f813d5
 */
export const ORDER_STATUS: any = {
  NEW: "未成交",
  FILLED: "已成交",
  CANCELED: "已撤销",
  PARTIAL_FILLED: "部分成交",
  PARTIAL_CANCELED: "部分撤销",
};

export const ORDER_TYPE: any = {
  LIMIT: "限价",
  MARKET: "市价",
  LIMIT_MAKER: "限价挂单",
  IMMEDIATE_OR_CANCEL: "立即成交或取消",
  FILL_OR_KILL: "全部成交或取消",
};

export const ORDER_SIDE: any = {
  BUY: "买入",
  SELL: "卖出",
};

export const ORDER_DIRECTION: any = {
  BUY: "买入",
  SELL: "卖出",
};
// 时间间隔
export const INTERVAL_MAP: any = {
  "1m": "1分钟",
  "5m": "5分钟",
  "15m": "15分钟",
  "30m": "30分钟",
  "1h": "1小时",
  "4h": "4小时",
  "1d": "1天",
  "1w": "1周",
  "1M": "1月",
};

// 变动类型
export const CHANGE_TYPE_MAP: any = {
  WITHDRAW: "提现",
  WITHDRAW_FEE: "提现手续费",
  DEPOSIT: "充值",
  DEPOSIT_FEE: "充值手续费",
  ENTRUST: "委托成交",
  ENTRUST_PLACE: "委托下单",
  ENTRUST_CANCEL: "委托撤单",
  ENTRUST_UNFROZEN: "订单冻结资金返还",
  TRADE: "交易",
  TRADE_FEE: "交易手续费",
  TRANSFER: "转账",
  REFERRAL: "推荐奖励",
  BONUS: "分红",
  REWARD: "奖励",
  OTHER: "其他",
  SUGAR: "空投",
};
