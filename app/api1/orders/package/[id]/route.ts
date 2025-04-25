import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth-options";
import { db } from "@/lib/db";
import jwt from "jsonwebtoken";

// Interface for JWT payload
interface JwtPayload {
  id: string;
  email: string;
  exp?: number;
  iat?: number;
}

// Map PackageOrder Prisma object to frontend format
const mapPackageOrderData = (order: any) => {
  return {
    id: order.id,
    packageName: order.packageName,
    packageType: order.packageType,
    bookingReference: order.bookingReference,
    startDate: order.startDate,
    endDate: order.endDate,
    duration: order.duration,
    destination: order.destination,
    departureCity: order.departureCity,
    currency: order.currency,
    salesAgent: order.salesAgent,
    bookingStatus: order.bookingStatus,

    // Financial information
    financialItems: order.financialItems || [],
    totalPrice: order.totalPrice,
    agencyCommission: order.agencyCommission,
    commissionAmount: order.commissionAmount,

    // Inclusions
    includedItems: order.includedItems || [],

    // Passenger information
    passengers: order.passengers || [],

    // Accommodations, transportations, activities
    accommodations: order.accommodations || [],
    transportations: order.transportations || [],
    activities: order.activities || [],

    // Payment records
    paymentRecords: order.paymentRecords || [],

    // Additional information
    additionalNotes: order.additionalNotes,
    itineraryDetails: order.itineraryDetails,

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
        }
      : null,

    // Metadata
    createdAt: order.createdAt,
    updatedAt: order.updatedAt,
  };
};

export async function GET(request: NextRequest, { params }: any) {
  try {
    // Check authentication first
    let userId: string;
    const session = await getServerSession(authOptions);

    if (!session || !session.user) {
      // If no server session, try token-based auth
      const authHeader = request.headers.get("authorization");
      if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
      }

      const token = authHeader.split(" ")[1];
      try {
        const decoded = jwt.verify(
          token,
          process.env.JWT_SECRET as string
        ) as JwtPayload;
        userId = decoded.id;
      } catch (error) {
        return NextResponse.json({ error: "Invalid token" }, { status: 401 });
      }
    } else {
      userId = session.user.id;
    }

    const id = params.id;

    // Get the package order
    const packageOrder = await db.packageOrder.findUnique({
      where: { id },
      include: {
        createdBy: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
        customer: true,
      },
    });

    if (!packageOrder) {
      return NextResponse.json(
        { error: "Package order not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      packageOrder: mapPackageOrderData(packageOrder),
    });
  } catch (error) {
    console.error("Error getting package order:", error);
    return NextResponse.json(
      { error: "Failed to get package order" },
      { status: 500 }
    );
  }
}

export async function PUT(request: NextRequest, { params }: any) {
  try {
    // Check authentication first
    let userId: string;
    const session = await getServerSession(authOptions);

    if (!session || !session.user) {
      // If no server session, try token-based auth
      const authHeader = request.headers.get("authorization");
      if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
      }

      const token = authHeader.split(" ")[1];
      try {
        const decoded = jwt.verify(
          token,
          process.env.JWT_SECRET as string
        ) as JwtPayload;
        userId = decoded.id;
      } catch (error) {
        return NextResponse.json({ error: "Invalid token" }, { status: 401 });
      }
    } else {
      userId = session.user.id;
    }

    const id = params.id;

    // Parse request body
    const data = await request.json();

    // Get the existing order to check if it exists
    const existingOrder = await db.packageOrder.findUnique({
      where: { id },
    });

    if (!existingOrder) {
      return NextResponse.json(
        { error: "Package order not found" },
        { status: 404 }
      );
    }

    // Process passenger data to match schema
    const passengers =
      data.passengers?.map((passenger: any) => ({
        isPrimary: passenger.isPrimary || false,
        firstName: passenger.firstName,
        lastName: passenger.lastName,
        dateOfBirth: passenger.dateOfBirth
          ? new Date(passenger.dateOfBirth)
          : new Date(),
        gender: passenger.gender || "Unknown",
        nationality: passenger.nationality || "",
        phone: passenger.phone,
        email: passenger.email,
        passportNumber: passenger.passportNumber,
        passportExpiry: passenger.passportExpiry
          ? new Date(passenger.passportExpiry)
          : undefined,
      })) || [];

    // Process financial items to match schema
    const financialItems = (data.financialItems || []).map((item: any) => ({
      item: item.item,
      amount: parseFloat(item.amount.toString()),
      notes: item.notes,
    }));

    // Process included items to match schema
    const includedItems = (data.includedItems || []).map((item: any) => ({
      itemType: item.itemType,
      description: item.description,
      value: item.value ? parseFloat(item.value.toString()) : undefined,
    }));

    // Process payment records to match schema
    const paymentRecords = (data.paymentRecords || []).map((record: any) => ({
      paymentMethod: record.paymentMethod,
      paymentDate: new Date(record.paymentDate),
      amount: parseFloat(record.amount.toString()),
      reference: record.reference,
    }));

    // Process accommodations to match schema
    const accommodations = (data.accommodations || []).map(
      (accommodation: any) => ({
        hotelName: accommodation.hotelName,
        roomType: accommodation.roomType,
        checkIn: new Date(accommodation.checkIn),
        checkOut: new Date(accommodation.checkOut),
        location: accommodation.location,
        confirmationNumber: accommodation.confirmationNumber,
        includesBreakfast: accommodation.includesBreakfast,
        specialRequests: accommodation.specialRequests,
      })
    );

    // Process transportations to match schema
    const transportations = (data.transportations || []).map(
      (transportation: any) => ({
        type: transportation.type,
        departureDate: new Date(transportation.departureDate),
        departureTime: transportation.departureTime,
        departureLocation: transportation.departureLocation,
        arrivalDate: new Date(transportation.arrivalDate),
        arrivalTime: transportation.arrivalTime,
        arrivalLocation: transportation.arrivalLocation,
        carrierName: transportation.carrierName,
        carrierNumber: transportation.carrierNumber,
        confirmationNumber: transportation.confirmationNumber,
      })
    );

    // Process activities to match schema
    const activities = (data.activities || []).map((activity: any) => ({
      name: activity.name,
      date: new Date(activity.date),
      time: activity.time,
      location: activity.location,
      duration: activity.duration,
      confirmationNumber: activity.confirmationNumber,
      description: activity.description,
    }));

    // Update package order with transaction to ensure all updates happen atomically
    const updatedOrder = await db.$transaction(async (prisma: any) => {
      // Update the order
      const updated = await prisma.packageOrder.update({
        where: { id },
        data: {
          packageName: data.packageName,
          packageType: data.packageType,
          bookingReference: data.bookingReference,
          startDate: data.startDate ? new Date(data.startDate) : undefined,
          endDate: data.endDate ? new Date(data.endDate) : undefined,
          duration: data.duration,
          destination: data.destination,
          departureCity: data.departureCity,
          currency: data.currency,
          salesAgent: data.salesAgent,
          bookingStatus: data.bookingStatus,

          // Use the processed arrays that match our schema types
          passengers: passengers.length > 0 ? passengers : undefined,
          financialItems:
            financialItems.length > 0 ? financialItems : undefined,
          includedItems: includedItems.length > 0 ? includedItems : undefined,
          paymentRecords:
            paymentRecords.length > 0 ? paymentRecords : undefined,
          accommodations:
            accommodations.length > 0 ? accommodations : undefined,
          transportations:
            transportations.length > 0 ? transportations : undefined,
          activities: activities.length > 0 ? activities : undefined,

          // Financial summary
          totalPrice:
            data.totalPrice !== undefined
              ? parseFloat(data.totalPrice.toString())
              : undefined,
          agencyCommission:
            data.agencyCommission !== undefined
              ? parseFloat(data.agencyCommission.toString())
              : undefined,
          commissionAmount:
            data.commissionAmount !== undefined
              ? parseFloat(data.commissionAmount.toString())
              : undefined,

          // Additional information
          additionalNotes: data.additionalNotes,
          itineraryDetails: data.itineraryDetails,

          // Always update the updatedAt timestamp
          updatedAt: new Date(),
        },
        include: {
          createdBy: {
            select: {
              id: true,
              name: true,
              email: true,
            },
          },
          customer: true,
        },
      });

      return updated;
    });

    return NextResponse.json({
      message: "Package order updated successfully",
      packageOrder: mapPackageOrderData(updatedOrder),
    });
  } catch (error) {
    console.error("Error updating package order:", error);
    return NextResponse.json(
      { error: "Failed to update package order" },
      { status: 500 }
    );
  }
}

export async function DELETE(request: NextRequest, { params }: any) {
  try {
    // Check authentication first
    let userId: string;
    const session = await getServerSession(authOptions);

    if (!session || !session.user) {
      // If no server session, try token-based auth
      const authHeader = request.headers.get("authorization");
      if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
      }

      const token = authHeader.split(" ")[1];
      try {
        const decoded = jwt.verify(
          token,
          process.env.JWT_SECRET as string
        ) as JwtPayload;
        userId = decoded.id;
      } catch (error) {
        return NextResponse.json({ error: "Invalid token" }, { status: 401 });
      }
    } else {
      userId = session.user.id;
    }

    const id = params.id;

    // Check if order exists
    const existingOrder = await db.packageOrder.findUnique({
      where: { id },
    });

    if (!existingOrder) {
      return NextResponse.json(
        { error: "Package order not found" },
        { status: 404 }
      );
    }

    // Delete order
    await db.packageOrder.delete({
      where: { id },
    });

    return NextResponse.json({ message: "Package order deleted successfully" });
  } catch (error) {
    console.error("Error deleting package order:", error);
    return NextResponse.json(
      { error: "Failed to delete package order" },
      { status: 500 }
    );
  }
}

export async function OPTIONS() {
  return new NextResponse(null, {
    status: 204,
    headers: {
      "Access-Control-Allow-Methods": "GET, PUT, DELETE, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type, Authorization",
      "Access-Control-Max-Age": "86400",
    },
  });
}
