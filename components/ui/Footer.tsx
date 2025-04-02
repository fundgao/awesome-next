export const Footer = () => {
  return (
    <footer className="py-16 relative w-full bg-[#0d0e0f] border-t-[1px] border-[#3b3e46]">
      <div className="content relative max-w-[1200px] mx-auto flex justify-between">
        <div className="company">
          <p className="text-[#f2f4f6] text-lg">公司</p>
          <div className="text-[#f2f4f6] text-sm mt-4">
            <p className="py-2 hover:text-[#1463ff] cursor-pointer">关于</p>
            <p className="py-2 hover:text-[#1463ff] cursor-pointer">资产安全</p>
            <p className="py-2 hover:text-[#1463ff] cursor-pointer">用户协议</p>
            <p className="py-2 hover:text-[#1463ff] cursor-pointer">隐私政策</p>
            <p className="py-2 hover:text-[#1463ff] cursor-pointer">风险告知</p>
            <p className="py-2 hover:text-[#1463ff] cursor-pointer">联系我们</p>
          </div>
        </div>
        <div className="product">
          <p className="text-[#f2f4f6] text-lg">产品</p>
          <div className="text-[#f2f4f6] text-sm mt-4">
            <p className="py-2 hover:text-[#1463ff] cursor-pointer">买币</p>
            <p className="py-2 hover:text-[#1463ff] cursor-pointer">P2P</p>
            <p className="py-2 hover:text-[#1463ff] cursor-pointer">闪兑</p>
            <p className="py-2 hover:text-[#1463ff] cursor-pointer">现货交易</p>
            <p className="py-2 hover:text-[#1463ff] cursor-pointer">合约交易</p>
            <p className="py-2 hover:text-[#1463ff] cursor-pointer">跟单交易</p>
          </div>
        </div>
        <div className="support">
          <p className="text-[#f2f4f6] text-lg">支持</p>
          <div className="text-[#f2f4f6] text-sm mt-4">
            <p className="py-2 hover:text-[#1463ff] cursor-pointer">联系客服</p>
            <p className="py-2 hover:text-[#1463ff] cursor-pointer">提交咨询</p>
            <p className="py-2 hover:text-[#1463ff] cursor-pointer">改进建议</p>
            <p className="py-2 hover:text-[#1463ff] cursor-pointer">
              举报异常资金
            </p>
            <p className="py-2 hover:text-[#1463ff] cursor-pointer">司法协助</p>
            <p className="py-2 hover:text-[#1463ff] cursor-pointer">
              官方验证通道
            </p>
          </div>
        </div>
        <div className="cooperation">
          <p className="text-[#f2f4f6] text-lg">合作</p>
          <div className="text-[#f2f4f6] text-sm mt-4">
            <p className="py-2 hover:text-[#1463ff] cursor-pointer">上币申请</p>
            <p className="py-2 hover:text-[#1463ff] cursor-pointer">
              P2P商家申请
            </p>
            <p className="py-2 hover:text-[#1463ff] cursor-pointer">API</p>
            <p className="py-2 hover:text-[#1463ff] cursor-pointer">机构服务</p>
            <p className="py-2 hover:text-[#1463ff] cursor-pointer">代理计划</p>
          </div>
        </div>
        <div className="study">
          <p className="text-[#f2f4f6] text-lg">学习</p>
          <div className="text-[#f2f4f6] text-sm mt-4">
            <p className="py-2 hover:text-[#1463ff] cursor-pointer">帮助中心</p>
            <p className="py-2 hover:text-[#1463ff] cursor-pointer">新手学院</p>
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
  );
};
