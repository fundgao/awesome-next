import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

// 获取Prisma客户端实例
const getPrismaClient = () => {
  try {
    return new PrismaClient();
  } catch (error) {
    console.error("Failed to initialize Prisma client:", error);
    return null;
  }
};

export async function GET() {
  try {
    const prisma: any = getPrismaClient();

    if (!prisma) {
      throw new Error("无法初始化数据库连接");
    }

    // 获取所有客户数量
    const totalCustomers = await prisma.customer.count();

    // 获取30天内新增的客户数量
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
    const newCustomers = await prisma.customer.count({
      where: {
        createdAt: {
          gte: thirtyDaysAgo,
        },
      },
    });

    // 获取未来7天内出发的订单数量（示例逻辑，实际根据订单模型调整）
    // 由于我们没有真实的订单数据模型，这里使用模拟数据
    const departingSoon = 15;

    // 计算平均消费（示例逻辑）
    // 由于我们没有真实的订单金额数据，这里使用模拟数据
    const avgSpending = totalCustomers > 0 ? 8500 : 0;

    // 构建统计数据
    const stats = {
      totalCustomers,
      newCustomers,
      departingSoon,
      avgSpending,
    };

    return NextResponse.json(stats);
  } catch (error) {
    console.error("Error fetching customer stats:", error);
    return NextResponse.json(
      { error: "获取客户统计信息失败" },
      { status: 500 }
    );
  } finally {
    // 由于Next.js API路由处理完成后会自动断开连接，这里不需要显式关闭
  }
}
