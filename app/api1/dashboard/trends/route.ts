import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

// Use the same PrismaClient getter method as other routes
let prismaGlobal: PrismaClient | undefined = undefined;

function getPrismaClient() {
  try {
    if (!prismaGlobal) {
      prismaGlobal = new PrismaClient({
        log: ["error"],
      }) as any; // Using 'any' to bypass TypeScript errors
    }
    return prismaGlobal;
  } catch (error) {
    console.error("Failed to initialize Prisma client:", error);
    return undefined;
  }
}

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const timeframe = searchParams.get("timeframe") || "Monthly";

    const prisma: any = getPrismaClient();
    if (!prisma) {
      return NextResponse.json(
        { error: "Database connection failed" },
        { status: 500 }
      );
    }

    // Get all cruise orders
    const orders = await prisma.cruiseOrder.findMany({
      select: {
        createdAt: true,
      },
      orderBy: {
        createdAt: "asc",
      },
    });

    // Generate trend data based on timeframe
    let trendData: { name: string; orders: number }[] = [];

    if (timeframe === "Monthly") {
      // Group orders by month
      const monthlyData = new Map<string, number>();

      // Month names
      const months = [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec",
      ];

      // Initialize all months
      for (const month of months) {
        monthlyData.set(month, 0);
      }

      // Count orders by month
      for (const order of orders) {
        const month = months[new Date(order.createdAt).getMonth()];
        monthlyData.set(month, (monthlyData.get(month) || 0) + 1);
      }

      // Convert Map to array format expected by the client
      trendData = months.map((month) => ({
        name: month,
        orders: monthlyData.get(month) || 0,
      }));
    } else if (timeframe === "Quarterly") {
      // Group orders by quarter
      const quarterlyData = new Map<string, number>();

      // Initialize all quarters
      for (let i = 1; i <= 4; i++) {
        quarterlyData.set(`Q${i}`, 0);
      }

      // Count orders by quarter
      for (const order of orders) {
        const month = new Date(order.createdAt).getMonth();
        const quarter = `Q${Math.floor(month / 3) + 1}`;
        quarterlyData.set(quarter, (quarterlyData.get(quarter) || 0) + 1);
      }

      // Convert Map to array format
      trendData = Array.from(quarterlyData.entries()).map(
        ([quarter, count]) => ({
          name: quarter,
          orders: count,
        })
      );

      // Sort by quarter
      trendData.sort((a, b) => a.name.localeCompare(b.name));
    } else if (timeframe === "Yearly") {
      // Group orders by year
      const yearlyData = new Map<string, number>();

      // Count orders by year
      for (const order of orders) {
        const year = new Date(order.createdAt).getFullYear().toString();
        yearlyData.set(year, (yearlyData.get(year) || 0) + 1);
      }

      // Convert Map to array format
      trendData = Array.from(yearlyData.entries()).map(([year, count]) => ({
        name: year,
        orders: count,
      }));

      // Sort by year
      trendData.sort((a, b) => a.name.localeCompare(b.name));
    }

    // Return the trend data
    return NextResponse.json({
      data: trendData,
    });
  } catch (error) {
    console.error("Error fetching trend data:", error);
    return NextResponse.json(
      { error: "Failed to fetch order trends" },
      { status: 500 }
    );
  }
}
