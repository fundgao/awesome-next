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
    const currency = searchParams.get("currency") || "USD";

    const prisma: any = getPrismaClient();
    if (!prisma) {
      return NextResponse.json(
        { error: "Database connection failed" },
        { status: 500 }
      );
    }

    // Get stats data
    // 1. Total orders count
    const totalOrders = await prisma.cruiseOrder.count();

    // 2. Orders departing within 7 days
    const sevenDaysFromNow = new Date();
    sevenDaysFromNow.setDate(sevenDaysFromNow.getDate() + 7);

    const today = new Date();
    const departingIn7Days = await prisma.cruiseOrder.count({
      where: {
        sailingDate: {
          gte: today,
          lte: sevenDaysFromNow,
        },
      },
    });

    // 3. Orders with payment due within 7 days (assuming final payment is due 30 days before departure)
    const paymentDueDate = new Date();
    paymentDueDate.setDate(paymentDueDate.getDate() + 37); // 7 days + 30 day payment period

    const paymentsDueIn7Days = await prisma.cruiseOrder.count({
      where: {
        sailingDate: {
          gte: sevenDaysFromNow,
          lte: paymentDueDate,
        },
        // Only count orders that haven't been fully paid
        NOT: {
          bookingStatus: "Fully Paid",
        },
      },
    });

    // 4. Calculate total sales
    const ordersWithPrice = await prisma.cruiseOrder.findMany({
      select: {
        salesPrice: true,
      },
    });

    // Calculate total sales
    let totalSales = 0;
    if (ordersWithPrice.length > 0) {
      totalSales = ordersWithPrice.reduce(
        (sum: number, order: { salesPrice: number | null }) =>
          sum + (order.salesPrice || 0),
        0
      );
    }

    // 5. Calculate average order price
    let averageOrderPrice =
      ordersWithPrice.length > 0 ? totalSales / ordersWithPrice.length : 0;

    // 6. Count new customers (added in the last 30 days)
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

    const newCustomers = await prisma.customer.count({
      where: {
        createdAt: {
          gte: thirtyDaysAgo,
        },
      },
    });

    // Apply exchange rate (1 USD = 1.35 CAD)
    const exchangeRate = currency === "CAD" ? 1.35 : 1;

    return NextResponse.json({
      stats: {
        totalOrders,
        newCustomers,
        departingIn7Days,
        paymentsDueIn7Days,
        totalSales: totalSales * exchangeRate,
        averageOrderPrice: averageOrderPrice * exchangeRate,
      },
    });
  } catch (error) {
    console.error("Error fetching stats data:", error);
    return NextResponse.json(
      { error: "Failed to fetch stats data" },
      { status: 500 }
    );
  }
}
