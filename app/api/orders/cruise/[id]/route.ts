import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

// Create a shared PrismaClient instance
let prismaGlobal: PrismaClient | undefined = undefined;

// Get PrismaClient, return undefined if initialization fails
function getPrismaClient() {
  try {
    if (!prismaGlobal) {
      prismaGlobal = new PrismaClient({
        log: ["error", "warn"],
      });
    }
    return prismaGlobal;
  } catch (error) {
    console.error("Failed to initialize Prisma client:", error);
    return undefined;
  }
}

// Map CruiseOrder Prisma object to frontend format
const mapCruiseOrderData = (order: any) => {
  return {
    id: order.id,
    cruiseLine: order.cruiseLine,
    shipName: order.shipName,
    reservationNumber: order.reservationNumber,
    itineraryName: order.itineraryName,
    sailingDate: order.sailingDate,
    returnDate: order.nights
      ? new Date(
          new Date(order.sailingDate).getTime() +
            order.nights * 24 * 60 * 60 * 1000
        )
      : null,
    nights: order.nights,
    cabinCategory: order.cabinCategory,
    roomNumber: order.roomNumber,
    embarkationPort: order.embarkationPort,
    currency: order.currency,
    salesAgent: order.salesAgent,
    bookingStatus: order.bookingStatus,

    // Financial information
    financialItems: order.financialItems || [],
    salesPrice: order.salesPrice,
    agencyCommission: order.agencyCommission,
    commissionAmount: order.commissionAmount,

    // Passenger information
    passengers: order.passengers || [],

    // Bonus items
    bonusItems: order.bonusItems || [],

    // Payment records
    paymentRecords: order.paymentRecords || [],

    // Additional notes
    additionalNotes: order.additionalNotes,

    // Relationships
    createdBy: order.createdBy
      ? {
          id: order.createdBy.id,
          name: order.createdBy.name,
          email: order.createdBy.email,
        }
      : null,

    customer: order.customer
      ? {
          id: order.customer.id,
          firstName: order.customer.firstName,
          lastName: order.customer.lastName,
          email: order.customer.email,
          phone: order.customer.phone,
          address: order.customer.address,
        }
      : null,

    // Metadata
    createdAt: order.createdAt,
    updatedAt: order.updatedAt,
  };
};

// Parse date strings to Date objects
const parseDate = (dateStr: string | Date | null | undefined): Date | null => {
  if (!dateStr) return null;
  if (dateStr instanceof Date) return dateStr;

  try {
    return new Date(dateStr);
  } catch (error) {
    console.error("Error parsing date:", error);
    return null;
  }
};

// GET /api/orders/cruise/[id] - Get a single cruise order by ID
export async function GET(req: NextRequest, { params }: any) {
  try {
    const id = params.id;
    console.log("获取游轮订单详情, ID:", id);

    if (!id) {
      return NextResponse.json(
        { error: "Order ID is required" },
        { status: 400 }
      );
    }

    const prisma = getPrismaClient();
    if (!prisma) {
      return NextResponse.json(
        { error: "Database connection failed" },
        { status: 500 }
      );
    }

    if (!(prisma as any).CruiseOrder) {
      console.error("Prisma client 中没有 CruiseOrder 模型");
      return NextResponse.json(
        { error: "Database model not found" },
        { status: 500 }
      );
    }

    try {
      const cruiseOrder = await (prisma as any).CruiseOrder.findUnique({
        where: {
          id: id,
        },
        include: {
          createdBy: {
            select: {
              id: true,
              name: true,
              email: true,
            },
          },
          customer: {
            select: {
              id: true,
              firstName: true,
              lastName: true,
              email: true,
              phone: true,
              address: true,
            },
          },
        },
      });

      if (!cruiseOrder) {
        return NextResponse.json(
          { error: "Cruise order not found" },
          { status: 404 }
        );
      }

      const mappedOrder = mapCruiseOrderData(cruiseOrder);

      return NextResponse.json({
        cruiseOrder: mappedOrder,
      });
    } catch (dbError: any) {
      console.error("Database query error:", dbError);
      return NextResponse.json(
        { error: `Failed to get cruise order: ${dbError.message}` },
        { status: 500 }
      );
    }
  } catch (error: any) {
    console.error("Error getting cruise order:", error);
    return NextResponse.json(
      { error: `Failed to get cruise order: ${error.message}` },
      { status: 500 }
    );
  }
}

// PUT /api/orders/cruise/[id] - Update a cruise order
export async function PUT(req: NextRequest, { params }: any) {
  try {
    const id = params.id;
    console.log("更新游轮订单, ID:", id);

    if (!id) {
      return NextResponse.json(
        { error: "Order ID is required" },
        { status: 400 }
      );
    }

    const prisma = getPrismaClient();
    if (!prisma) {
      return NextResponse.json(
        { error: "Database connection failed" },
        { status: 500 }
      );
    }

    if (!(prisma as any).CruiseOrder) {
      console.error("Prisma client 中没有 CruiseOrder 模型");
      return NextResponse.json(
        { error: "Database model not found" },
        { status: 500 }
      );
    }

    const body = await req.json();

    // Format additional passengers and primary passenger
    const allPassengers: any[] = [];

    if (body.passengers) {
      const primaryPassenger = body.passengers[0] || {};
      allPassengers.push({ ...primaryPassenger, isPrimary: true });
    }

    if (body.additionalPassengers) {
      const additionalPassengers = body.additionalPassengers.map((p: any) => ({
        ...p,
        isPrimary: false,
      }));
      allPassengers.push(...additionalPassengers);
    }

    // Format dates in all collections
    const formatPassengers =
      allPassengers.length > 0
        ? allPassengers.map((passenger: any) => ({
            ...passenger,
            dateOfBirth: parseDate(passenger.dateOfBirth),
          }))
        : undefined;

    const paymentRecords = body.paymentRecords
      ? body.paymentRecords.map((record: any) => ({
          ...record,
          paymentDate: parseDate(record.paymentDate),
        }))
      : undefined;

    try {
      // Prepare update data
      const updateData: any = {};

      // Basic cruise info
      if (body.cruiseLine !== undefined)
        updateData.cruiseLine = body.cruiseLine;
      if (body.shipName !== undefined) updateData.shipName = body.shipName;
      if (body.reservationNumber !== undefined)
        updateData.reservationNumber = body.reservationNumber;
      if (body.itineraryName !== undefined)
        updateData.itineraryName = body.itineraryName;
      if (body.sailingDate !== undefined)
        updateData.sailingDate = parseDate(body.sailingDate);
      if (body.nights !== undefined) updateData.nights = body.nights;
      if (body.cabinCategory !== undefined)
        updateData.cabinCategory = body.cabinCategory;
      if (body.roomNumber !== undefined)
        updateData.roomNumber = body.roomNumber;
      if (body.embarkationPort !== undefined)
        updateData.embarkationPort = body.embarkationPort;
      if (body.currency !== undefined) updateData.currency = body.currency;
      if (body.salesAgent !== undefined)
        updateData.salesAgent = body.salesAgent;
      if (body.bookingStatus !== undefined)
        updateData.bookingStatus = body.bookingStatus;
      if (body.additionalNotes !== undefined)
        updateData.additionalNotes = body.additionalNotes;

      // Financial information
      if (body.financialItems !== undefined)
        updateData.financialItems = body.financialItems;
      if (body.salesPrice !== undefined)
        updateData.salesPrice = body.salesPrice;
      if (body.agencyCommission !== undefined)
        updateData.agencyCommission = body.agencyCommission;
      if (body.commissionAmount !== undefined)
        updateData.commissionAmount = body.commissionAmount;

      // Collections
      if (formatPassengers) updateData.passengers = formatPassengers;
      if (body.bonusItems !== undefined)
        updateData.bonusItems = body.bonusItems;
      if (paymentRecords) updateData.paymentRecords = paymentRecords;

      // Customer relationship
      if (body.customerId) {
        updateData.customer = {
          connect: { id: body.customerId },
        };
      }

      // Update the cruise order
      const updatedOrder = await (prisma as any).CruiseOrder.update({
        where: { id },
        data: updateData,
        include: {
          createdBy: {
            select: {
              id: true,
              name: true,
              email: true,
            },
          },
          customer: {
            select: {
              id: true,
              firstName: true,
              lastName: true,
              email: true,
              phone: true,
            },
          },
        },
      });

      const mappedOrder = mapCruiseOrderData(updatedOrder);

      return NextResponse.json({
        cruiseOrder: mappedOrder,
        message: "Cruise order updated successfully",
      });
    } catch (dbError: any) {
      console.error("Database update error:", dbError);
      return NextResponse.json(
        { error: `Failed to update cruise order: ${dbError.message}` },
        { status: 500 }
      );
    }
  } catch (error: any) {
    console.error("Error updating cruise order:", error);
    return NextResponse.json(
      { error: `Failed to update cruise order: ${error.message}` },
      { status: 500 }
    );
  }
}

// DELETE /api/orders/cruise/[id] - Delete a cruise order
export async function DELETE(req: NextRequest, { params }: any) {
  try {
    const id = params.id;
    console.log("删除游轮订单, ID:", id);

    if (!id) {
      return NextResponse.json(
        { error: "Order ID is required" },
        { status: 400 }
      );
    }

    const prisma = getPrismaClient();
    if (!prisma) {
      return NextResponse.json(
        { error: "Database connection failed" },
        { status: 500 }
      );
    }

    if (!(prisma as any).CruiseOrder) {
      console.error("Prisma client 中没有 CruiseOrder 模型");
      return NextResponse.json(
        { error: "Database model not found" },
        { status: 500 }
      );
    }

    try {
      await (prisma as any).CruiseOrder.delete({
        where: { id },
      });

      return NextResponse.json({
        message: "Cruise order deleted successfully",
      });
    } catch (dbError: any) {
      console.error("Database delete error:", dbError);
      return NextResponse.json(
        { error: `Failed to delete cruise order: ${dbError.message}` },
        { status: 500 }
      );
    }
  } catch (error: any) {
    console.error("Error deleting cruise order:", error);
    return NextResponse.json(
      { error: `Failed to delete cruise order: ${error.message}` },
      { status: 500 }
    );
  }
}
