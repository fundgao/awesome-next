import { NextResponse } from "next/server";

// 模拟订单数据库
const customerOrders = {
  "1": [
    {
      id: "D-2023-1204",
      destination: "Paris, France",
      departureDate: "2023/12/20",
      amount: 4200,
    },
    {
      id: "D-2023-0815",
      destination: "Tokyo, Japan",
      departureDate: "2023/8/28",
      amount: 3850,
    },
    {
      id: "D-2022-0623",
      destination: "Rome, Italy",
      departureDate: "2022/6/30",
      amount: 2950,
    },
    {
      id: "D-2021-1114",
      destination: "New York, USA",
      departureDate: "2021/11/25",
      amount: 1450,
    },
  ],
  "2": [
    {
      id: "D-2023-0905",
      destination: "Beijing, China",
      departureDate: "2023/9/15",
      amount: 3200,
    },
    {
      id: "D-2022-0712",
      destination: "Sydney, Australia",
      departureDate: "2022/7/30",
      amount: 4100,
    },
  ],
  "3": [
    {
      id: "D-2023-0405",
      destination: "Mexico City, Mexico",
      departureDate: "2023/4/20",
      amount: 1800,
    },
    {
      id: "D-2022-1210",
      destination: "Barcelona, Spain",
      departureDate: "2022/12/24",
      amount: 2600,
    },
    {
      id: "D-2022-0620",
      destination: "Cancun, Mexico",
      departureDate: "2022/6/28",
      amount: 2100,
    },
  ],
  "4": [
    {
      id: "D-2023-0714",
      destination: "London, UK",
      departureDate: "2023/7/25",
      amount: 3600,
    },
    {
      id: "D-2022-1105",
      destination: "Las Vegas, USA",
      departureDate: "2022/11/12",
      amount: 1900,
    },
    {
      id: "D-2021-0824",
      destination: "Toronto, Canada",
      departureDate: "2021/8/30",
      amount: 2400,
    },
  ],
};

export async function GET(request: Request, { params }: any) {
  try {
    const { id } = params;

    // 在实际应用中，此处应该从数据库查询指定客户的订单
    // 这里使用模拟数据
    const orders = customerOrders[id as keyof typeof customerOrders] || [];

    return NextResponse.json({ orders });
  } catch (error) {
    console.error(`Error fetching orders for customer ${params.id}:`, error);
    return NextResponse.json({ error: "获取客户订单失败" }, { status: 500 });
  }
}
