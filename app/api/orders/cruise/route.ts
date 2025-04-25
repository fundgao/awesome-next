import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth-options';
import { db } from '@/lib/db';

// Interface for expected request data
interface CruiseOrderRequest {
  reservationNumber?: string;
  bookingStatus: string;
  cruiseLine: string;
  shipName: string;
  itineraryName: string;
  sailingDate: string;
  nights: number;
  cabinCategory: string;
  roomNumber?: string;
  embarkationPort: string;
  currency: string;
  salesAgent: string;
  additionalNotes?: string;
  
  // Financial information
  financialItems: Array<{
    item: string;
    amount: number;
    notes?: string;
  }>;
  salesPrice: number;
  agencyCommission: number;
  commissionAmount?: number;
  
  // Passenger information
  passengers: Array<{
    isPrimary: boolean;
    firstName: string;
    lastName: string;
    dateOfBirth: string;
    gender: string;
    nationality: string;
    phone?: string;
    email?: string;
  }>;
  
  // Bonus items
  bonusItems?: Array<{
    bonusType: string;
    value?: number;
    description?: string;
  }>;
  
  // Payment records
  paymentRecords?: Array<{
    paymentMethod: string;
    paymentDate: string;
    amount: number;
    reference?: string;
  }>;
  
  // Customer information - can be ID or new customer details
  customer?: {
    id?: string;
    firstName?: string;
    lastName?: string;
    email?: string;
    phone?: string;
  };
}

// GET function to retrieve cruise orders
export async function GET(request: NextRequest) {
  try {
    // Get session for authentication
    const session = await getServerSession(authOptions);
    
    if (!session) {
      return NextResponse.json({ error: 'Authentication required' }, { status: 401 });
    }

    // Get search parameters
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '10');
    const search = searchParams.get('search') || '';
    const status = searchParams.get('status') || '';
    
    // Calculate skip for pagination
    const skip = (page - 1) * limit;
    
    // Build where clause for filtering
    const where: any = {};
    
    if (search) {
      where.OR = [
        { reservationNumber: { contains: search } },
        { cruiseLine: { contains: search } },
        { shipName: { contains: search } },
        { itineraryName: { contains: search } },
        { embarkationPort: { contains: search } },
      ];
    }
    
    if (status) {
      where.bookingStatus = status;
    }
    
    // Get total count of matched records
    const total = await db.cruiseOrder.count({ where });
    
    // Get orders with pagination and filtering
    const orders = await db.cruiseOrder.findMany({
      where,
      skip,
      take: limit,
      orderBy: { createdAt: 'desc' },
      include: {
        customer: true,
      },
    });
    
    // Return the results with pagination info
    return NextResponse.json({
      data: orders,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit),
      },
    });
  } catch (error: any) {
    console.error('Error fetching cruise orders:', error);
    return NextResponse.json({ error: error.message || 'Error fetching cruise orders' }, { status: 500 });
  }
}

// POST function to create a new cruise order
export async function POST(request: NextRequest) {
  try {
    // Get session for authentication
    const session = await getServerSession(authOptions);
    
    if (!session) {
      return NextResponse.json({ error: 'Authentication required' }, { status: 401 });
    }
    
    // Parse request body
    const data: CruiseOrderRequest = await request.json();
    
    // Log received data for debugging
    console.log('Received data for cruise order creation:', data);
    
    // Check for required fields
    const requiredFields = [
      'bookingStatus', 'cruiseLine', 'shipName', 'itineraryName', 
      'sailingDate', 'nights', 'cabinCategory', 'embarkationPort',
      'currency', 'salesAgent', 'salesPrice', 'agencyCommission',
      'passengers', 'financialItems'
    ];
    
    const missingFields = requiredFields.filter(field => !data[field as keyof CruiseOrderRequest]);
    
    if (missingFields.length > 0) {
      return NextResponse.json({ 
        error: `Missing required fields: ${missingFields.join(', ')}` 
      }, { status: 400 });
    }
    
    // Ensure there's at least one passenger
    if (!data.passengers || data.passengers.length === 0) {
      return NextResponse.json({ error: 'At least one passenger is required' }, { status: 400 });
    }
    
    // Get user from session
    const user = await db.user.findUnique({
      where: { id: session.user.id },
    });
    
    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }
    
    // Handle customer creation or retrieval
    let customerId = null;
    
    if (data.customer) {
      if (data.customer.id) {
        // Use existing customer
        const existingCustomer = await db.customer.findUnique({
          where: { id: data.customer.id },
        });
        
        if (!existingCustomer) {
          return NextResponse.json({ error: 'Customer not found' }, { status: 404 });
        }
        
        customerId = existingCustomer.id;
      } else if (data.customer.firstName && data.customer.lastName) {
        // Create new customer
        const primaryPassenger = data.passengers.find(p => p.isPrimary);
        
        const newCustomer = await db.customer.create({
          data: {
            firstName: data.customer.firstName,
            lastName: data.customer.lastName,
            email: data.customer.email || primaryPassenger?.email || null,
            phone: data.customer.phone || primaryPassenger?.phone || null,
            customerId: `CUST-${Date.now()}`,
            createdBy: { connect: { id: user.id } },
          },
        });
        
        customerId = newCustomer.id;
      }
    }
    
    // Format passenger records
    const passengerRecords = data.passengers.map(passenger => ({
      isPrimary: passenger.isPrimary,
      firstName: passenger.firstName,
      lastName: passenger.lastName,
      dateOfBirth: new Date(passenger.dateOfBirth),
      gender: passenger.gender,
      nationality: passenger.nationality,
      phone: passenger.phone || null,
      email: passenger.email || null,
    }));
    
    // Format payment records if provided
    const paymentRecords = data.paymentRecords ? data.paymentRecords.map(payment => ({
      paymentMethod: payment.paymentMethod,
      paymentDate: new Date(payment.paymentDate),
      amount: payment.amount,
      reference: payment.reference || null,
    })) : [];
    
    // Format bonus items if provided
    const bonusItems = data.bonusItems ? data.bonusItems.map(item => ({
      bonusType: item.bonusType,
      value: item.value || null,
      description: item.description || null,
    })) : [];
    
    // Format financial items
    const financialItems = data.financialItems.map(item => ({
      item: item.item,
      amount: item.amount,
      notes: item.notes || null,
    }));
    
    // Calculate commission amount if not provided
    const commissionAmount = data.commissionAmount || 
      (data.salesPrice * (data.agencyCommission / 100));
    
    // Create the cruise order
    const cruiseOrder = await db.cruiseOrder.create({
      data: {
        reservationNumber: data.reservationNumber || `CR-${Date.now()}`,
        bookingStatus: data.bookingStatus,
        cruiseLine: data.cruiseLine,
        shipName: data.shipName,
        itineraryName: data.itineraryName,
        sailingDate: new Date(data.sailingDate),
        nights: data.nights,
        cabinCategory: data.cabinCategory,
        roomNumber: data.roomNumber || null,
        embarkationPort: data.embarkationPort,
        currency: data.currency,
        salesAgent: data.salesAgent,
        additionalNotes: data.additionalNotes || null,
        
        financialItems,
        salesPrice: data.salesPrice,
        agencyCommission: data.agencyCommission,
        commissionAmount,
        
        passengers: passengerRecords,
        bonusItems,
        paymentRecords,
        
        createdBy: { connect: { id: user.id } },
        ...(customerId ? { customer: { connect: { id: customerId } } } : {}),
      },
    });
    
    return NextResponse.json({
      message: 'Cruise order created successfully',
      order: cruiseOrder,
    });
  } catch (error: any) {
    console.error('Error creating cruise order:', error);
    return NextResponse.json({ error: error.message || 'Error creating cruise order' }, { status: 500 });
  }
}

// DELETE function to remove a cruise order
export async function DELETE(request: NextRequest) {
  try {
    // Get session for authentication
    const session = await getServerSession(authOptions);
    
    if (!session) {
      return NextResponse.json({ error: 'Authentication required' }, { status: 401 });
    }
    
    // Parse request to get order ID
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    
    if (!id) {
      return NextResponse.json({ error: 'Order ID is required' }, { status: 400 });
    }
    
    // Check if order exists
    const existingOrder = await db.cruiseOrder.findUnique({
      where: { id },
    });
    
    if (!existingOrder) {
      return NextResponse.json({ error: 'Cruise order not found' }, { status: 404 });
    }
    
    // Delete the order
    await db.cruiseOrder.delete({
      where: { id },
    });
    
    return NextResponse.json({
      message: 'Cruise order deleted successfully',
    });
  } catch (error: any) {
    console.error('Error deleting cruise order:', error);
    return NextResponse.json({ error: error.message || 'Error deleting cruise order' }, { status: 500 });
  }
}

// PUT function to update a cruise order
export async function PUT(request: NextRequest) {
  try {
    // Get session for authentication
    const session = await getServerSession(authOptions);
    
    if (!session) {
      return NextResponse.json({ error: 'Authentication required' }, { status: 401 });
    }
    
    // Parse request body
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    
    if (!id) {
      return NextResponse.json({ error: 'Order ID is required' }, { status: 400 });
    }
    
    const data: CruiseOrderRequest = await request.json();
    
    // Check if order exists
    const existingOrder = await db.cruiseOrder.findUnique({
      where: { id },
    });
    
    if (!existingOrder) {
      return NextResponse.json({ error: 'Cruise order not found' }, { status: 404 });
    }
    
    // Format passenger records
    const passengerRecords = data.passengers.map(passenger => ({
      isPrimary: passenger.isPrimary,
      firstName: passenger.firstName,
      lastName: passenger.lastName,
      dateOfBirth: new Date(passenger.dateOfBirth),
      gender: passenger.gender,
      nationality: passenger.nationality,
      phone: passenger.phone || null,
      email: passenger.email || null,
    }));
    
    // Format payment records if provided
    const paymentRecords = data.paymentRecords ? data.paymentRecords.map(payment => ({
      paymentMethod: payment.paymentMethod,
      paymentDate: new Date(payment.paymentDate),
      amount: payment.amount,
      reference: payment.reference || null,
    })) : [];
    
    // Format bonus items if provided
    const bonusItems = data.bonusItems ? data.bonusItems.map(item => ({
      bonusType: item.bonusType,
      value: item.value || null,
      description: item.description || null,
    })) : [];
    
    // Format financial items
    const financialItems = data.financialItems.map(item => ({
      item: item.item,
      amount: item.amount,
      notes: item.notes || null,
    }));
    
    // Calculate commission amount if not provided
    const commissionAmount = data.commissionAmount || 
      (data.salesPrice * (data.agencyCommission / 100));
    
    // Update the cruise order
    const updatedOrder = await db.cruiseOrder.update({
      where: { id },
      data: {
        reservationNumber: data.reservationNumber,
        bookingStatus: data.bookingStatus,
        cruiseLine: data.cruiseLine,
        shipName: data.shipName,
        itineraryName: data.itineraryName,
        sailingDate: new Date(data.sailingDate),
        nights: data.nights,
        cabinCategory: data.cabinCategory,
        roomNumber: data.roomNumber || null,
        embarkationPort: data.embarkationPort,
        currency: data.currency,
        salesAgent: data.salesAgent,
        additionalNotes: data.additionalNotes || null,
        
        financialItems,
        salesPrice: data.salesPrice,
        agencyCommission: data.agencyCommission,
        commissionAmount,
        
        passengers: passengerRecords,
        bonusItems,
        paymentRecords,
        
        // Don't update createdBy or customerId relationships
      }
    });
    
    return NextResponse.json({
      message: 'Cruise order updated successfully',
      order: updatedOrder
    });
  } catch (error: any) {
    console.error('Error updating cruise order:', error);
    return NextResponse.json({ error: error.message || 'Error updating cruise order' }, { status: 500 });
  }
} 