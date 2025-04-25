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

    // Define date range based on timeframe
    const dateRange = getDateRangeForTimeframe(timeframe);

    // Get all cruise orders within date range
    const orders = await prisma.cruiseOrder.findMany({
      where: {
        createdAt: {
          gte: dateRange.start,
          lte: dateRange.end,
        },
      },
      include: {
        createdBy: true,
      },
    });

    // Sample product type colors
    const productTypeColors = {
      Caribbean: "#1E88E5",
      Alaska: "#43A047",
      Europe: "#E53935",
      Mediterranean: "#FDD835",
      Asia: "#8E24AA",
      Australia: "#FB8C00",
      Other: "#546E7A",
    };

    // Sample agent colors
    const agentColors = {
      Default: "#0088FE",
      Second: "#00C49F",
      Third: "#FFBB28",
      Fourth: "#FF8042",
      Fifth: "#8884d8",
    };

    // Generate distribution data

    // 1. Product types (by cruise line)
    const productTypes = new Map<string, number>();
    for (const order of orders) {
      const cruiseLine = order.cruiseLine || "Other";
      productTypes.set(cruiseLine, (productTypes.get(cruiseLine) || 0) + 1);
    }

    // Convert to array and sort by count (descending)
    const productTypeArray = Array.from(productTypes.entries())
      .map(([name, value], index) => ({
        name,
        value,
        color:
          productTypeColors[name as keyof typeof productTypeColors] ||
          Object.values(productTypeColors)[
            index % Object.values(productTypeColors).length
          ],
      }))
      .sort((a, b) => b.value - a.value);

    // 2. Agent sales (by created user)
    const agentSales = new Map<string, number>();
    for (const order of orders) {
      const agentName = order.createdBy?.name || "Unknown Agent";
      agentSales.set(agentName, (agentSales.get(agentName) || 0) + 1);
    }

    // Convert to array and sort by count (descending)
    const agentSalesArray = Array.from(agentSales.entries())
      .map(([name, value], index) => ({
        name,
        value,
        color:
          Object.values(agentColors)[index % Object.values(agentColors).length],
      }))
      .sort((a, b) => b.value - a.value)
      .slice(0, 5); // Take only top 5 agents

    // Return the distribution data
    return NextResponse.json({
      data: {
        productTypes: productTypeArray,
        agentSales: agentSalesArray,
      },
    });
  } catch (error) {
    console.error("Error fetching distribution data:", error);
    return NextResponse.json(
      { error: "Failed to fetch distribution analysis" },
      { status: 500 }
    );
  }
}

// Helper function to get date range based on timeframe
function getDateRangeForTimeframe(timeframe: string): {
  start: Date;
  end: Date;
} {
  const end = new Date(); // Current date
  let start = new Date();

  if (timeframe === "Monthly") {
    // Last 30 days
    start.setDate(start.getDate() - 30);
  } else if (timeframe === "Quarterly") {
    // Last 90 days
    start.setDate(start.getDate() - 90);
  } else if (timeframe === "Yearly") {
    // Last 365 days
    start.setDate(start.getDate() - 365);
  }

  return { start, end };
}
