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

    // Parse pagination parameters
    const page = parseInt(searchParams.get("page") || "1");
    const limit = parseInt(searchParams.get("limit") || "10");
    const skip = (page - 1) * limit;

    // Parse filter parameters
    const search = searchParams.get("search") || "";
    const customerName = searchParams.get("customerName") || "";
    const customerPhone = searchParams.get("customerPhone") || "";
    const customerEmail = searchParams.get("customerEmail") || "";
    const orderNumber = searchParams.get("orderNumber") || "";
    const orderType = searchParams.get("orderType") || "";
    const orderDateStart = searchParams.get("orderDateStart") || "";
    const orderDateEnd = searchParams.get("orderDateEnd") || "";
    const departureDateStart = searchParams.get("departureDateStart") || "";
    const departureDateEnd = searchParams.get("departureDateEnd") || "";
    const orderStatus = searchParams.get("orderStatus") || "";
    const salesAgent = searchParams.get("salesAgent") || "";
    const currency = searchParams.get("currency") || "USD";

    const prisma: any = getPrismaClient();
    if (!prisma) {
      return NextResponse.json(
        { error: "Database connection failed" },
        { status: 500 }
      );
    }

    // Build filter conditions
    const whereConditions: any = {};

    // Filter by search term across multiple fields
    if (search) {
      whereConditions.OR = [
        { reservationNumber: { contains: search, mode: "insensitive" } },
        { cruiseLine: { contains: search, mode: "insensitive" } },
        { shipName: { contains: search, mode: "insensitive" } },
        {
          customer: {
            OR: [
              { firstName: { contains: search, mode: "insensitive" } },
              { lastName: { contains: search, mode: "insensitive" } },
              { email: { contains: search, mode: "insensitive" } },
              { phone: { contains: search, mode: "insensitive" } },
            ],
          },
        },
      ];
    }

    // Apply specific filters
    if (customerName) {
      whereConditions.customer = {
        ...whereConditions.customer,
        OR: [
          { firstName: { contains: customerName, mode: "insensitive" } },
          { lastName: { contains: customerName, mode: "insensitive" } },
        ],
      };
    }

    if (customerPhone) {
      whereConditions.customer = {
        ...whereConditions.customer,
        phone: { contains: customerPhone, mode: "insensitive" },
      };
    }

    if (customerEmail) {
      whereConditions.customer = {
        ...whereConditions.customer,
        email: { contains: customerEmail, mode: "insensitive" },
      };
    }

    if (orderNumber) {
      whereConditions.reservationNumber = {
        contains: orderNumber,
        mode: "insensitive",
      };
    }

    if (orderType && orderType !== "All") {
      // Note: For cruise orders, this would always be 'Cruise'
      // In a real app with multiple order types, this would filter by type
    }

    if (orderDateStart) {
      whereConditions.createdAt = {
        ...whereConditions.createdAt,
        gte: new Date(orderDateStart),
      };
    }

    if (orderDateEnd) {
      whereConditions.createdAt = {
        ...whereConditions.createdAt,
        lte: new Date(orderDateEnd),
      };
    }

    if (departureDateStart) {
      whereConditions.sailingDate = {
        ...whereConditions.sailingDate,
        gte: new Date(departureDateStart),
      };
    }

    if (departureDateEnd) {
      whereConditions.sailingDate = {
        ...whereConditions.sailingDate,
        lte: new Date(departureDateEnd),
      };
    }

    if (orderStatus && orderStatus !== "All") {
      whereConditions.bookingStatus = orderStatus;
    }

    if (salesAgent && salesAgent !== "All") {
      whereConditions.salesAgent = salesAgent;
    }

    // Count total matching records
    const totalCount = await prisma.cruiseOrder.count({
      where: whereConditions,
    });

    // Get orders with pagination
    const orders = await prisma.cruiseOrder.findMany({
      where: whereConditions,
      include: {
        customer: true,
        createdBy: true,
      },
      skip,
      take: limit,
      orderBy: {
        createdAt: "desc",
      },
    });

    // Format orders for the response
    const formattedOrders = orders.map((order: any) => {
      // Calculate exchange rate (simplified example)
      const exchangeRate = currency === "CAD" ? 1.35 : 1;

      return {
        id: order.id,
        customerName: order.customer
          ? `${order.customer.firstName} ${order.customer.lastName}`
          : "Unknown Customer",
        customerPhone: order.customer?.phone || "",
        customerEmail: order.customer?.email || "",
        departureDate: order.sailingDate.toISOString().split("T")[0],
        productName: `${order.cruiseLine} - ${order.shipName} - ${order.itineraryName}`,
        supplier: order.cruiseLine,
        supplierConfirmation: order.reservationNumber || "",
        totalPrice: {
          USD: order.salesPrice,
          CAD: order.salesPrice * 1.35,
        },
        agent: order.salesAgent,
        type: "Cruise",
        status: order.bookingStatus,
        orderDate: order.createdAt.toISOString().split("T")[0],
      };
    });

    // Return formatted response
    return NextResponse.json({
      orders: formattedOrders,
      pagination: {
        total: totalCount,
        page,
        limit,
        totalPages: Math.ceil(totalCount / limit),
      },
    });
  } catch (error) {
    console.error("Error fetching orders:", error);
    return NextResponse.json(
      { error: "Failed to fetch orders" },
      { status: 500 }
    );
  }
}
