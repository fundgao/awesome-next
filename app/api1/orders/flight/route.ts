import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth-options';
import prisma from '@/lib/prisma';
import { z } from 'zod';
import jwt from 'jsonwebtoken';
import { AUTH_CONFIG } from '@/lib/auth';

// Type for JWT payload
interface JwtPayload {
  id?: string;
  sub?: string;
  email?: string;
  role?: string;
  name?: string;
  iat?: number;
  exp?: number;
}

// 使用与login路由相同的JWT密钥作为备选
const FALLBACK_JWT_SECRET = process.env.JWT_SECRET || 'default-jwt-secret-key-for-development';

// GET: Retrieve flight orders (with optional filters)
export async function GET(request: NextRequest) {
  try {
    // Check authentication
    const session = await getServerSession(authOptions);
    if (!session) {
      // Check for JWT token from cookies or Authorization header
      let token = request.cookies.get('token')?.value;
      
      if (!token) {
        const authHeader = request.headers.get('Authorization');
        if (authHeader && authHeader.startsWith('Bearer ')) {
          token = authHeader.substring(7);
        }
      }
      
      if (!token) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
      }
      
      try {
        // 打印token前几个字符和JWT密钥，便于调试(不包含整个token以避免安全问题)
        console.log('GET - Token prefix:', token.substring(0, 10) + '...');
        console.log('GET - Using JWT secret length:', AUTH_CONFIG.JWT_SECRET.length);

        // 直接尝试解码token（无验证）来查看其内容
        const decodedWithoutVerify = jwt.decode(token);
        console.log('GET - Token decoded without verification:', decodedWithoutVerify);
        
        // 验证token
        let decoded;
        try {
          decoded = jwt.verify(token, AUTH_CONFIG.JWT_SECRET) as JwtPayload;
        } catch (verifyError: any) {
          console.error('GET - Token verification error details:', verifyError.message);
          
          // 尝试使用备选JWT密钥
          try {
            console.log('GET - Trying with fallback JWT secret');
            decoded = jwt.verify(token, FALLBACK_JWT_SECRET) as JwtPayload;
            console.log('GET - Fallback JWT verification successful');
          } catch (fallbackError) {
            console.error('GET - Fallback verification also failed');
            throw verifyError; // 抛出原始错误
          }
        }
        
        console.log('GET - Token verified successfully, payload:', {
          id: decoded.id,
          sub: decoded.sub,
          email: decoded.email
        });
        
        // 使用id或sub作为用户ID
        const userId = decoded.id || decoded.sub;
        
        if (!userId) {
          console.error('GET - Token has no user identifier (id or sub)');
          return NextResponse.json({ error: 'Invalid token: No user identifier' }, { status: 401 });
        }
      } catch (err: any) {
        console.error('GET - Token validation failed:', err.message);
        return NextResponse.json({ error: `Invalid token: ${err.message}` }, { status: 401 });
      }
    }

    // Get URL params
    const searchParams = request.nextUrl.searchParams;
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '10');
    const search = searchParams.get('search') || '';
    const status = searchParams.get('status') || '';
    const id = searchParams.get('id') || '';

    // If ID is provided, return single order
    if (id) {
      const flightOrder = await prisma.flightOrder.findUnique({
        where: { id },
        include: {
          createdBy: {
            select: {
              id: true,
              name: true,
              email: true,
            }
          },
          customer: true
        }
      });

      if (!flightOrder) {
        return NextResponse.json({ error: 'Flight order not found' }, { status: 404 });
      }

      return NextResponse.json({ flightOrder });
    }

    // Calculate skip for pagination
    const skip = (page - 1) * limit;

    // Build the where clause based on filters
    let where: any = {};

    if (search) {
      where.OR = [
        { bookingReference: { contains: search, mode: 'insensitive' } },
        { 
          passengers: {
            some: {
              OR: [
                { firstName: { contains: search, mode: 'insensitive' } },
                { lastName: { contains: search, mode: 'insensitive' } },
                { email: { contains: search, mode: 'insensitive' } },
              ]
            }
          }
        },
        {
          flightSegments: {
            some: {
              OR: [
                { from: { contains: search, mode: 'insensitive' } },
                { to: { contains: search, mode: 'insensitive' } },
                { airline: { contains: search, mode: 'insensitive' } },
              ]
            }
          }
        }
      ];
    }

    if (status) {
      where.bookingStatus = status;
    }

    // Get total count for pagination
    const total = await prisma.flightOrder.count({ where });

    // Get flight orders
    const orders = await prisma.flightOrder.findMany({
      where,
      include: {
        customer: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
            email: true
          }
        }
      },
      orderBy: { createdAt: 'desc' },
      skip,
      take: limit
    });

    return NextResponse.json({
      orders,
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit)
    });
  } catch (error: any) {
    console.error('Error getting flight orders:', error);
    return NextResponse.json({ error: error.message || 'Failed to get flight orders' }, { status: 500 });
  }
}

// POST: Create a new flight order
export async function POST(request: NextRequest) {
  try {
    // Check authentication
    const session = await getServerSession(authOptions);
    let userId: string | undefined;
    
    if (!session) {
      // Check for JWT token from cookies or Authorization header
      let token = request.cookies.get('token')?.value;
      
      if (!token) {
        const authHeader = request.headers.get('Authorization');
        if (authHeader && authHeader.startsWith('Bearer ')) {
          token = authHeader.substring(7);
        }
      }
      
      if (!token) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
      }
      
      try {
        // 打印token前几个字符和JWT密钥，便于调试(不包含整个token以避免安全问题)
        console.log('Token prefix:', token.substring(0, 10) + '...');
        console.log('Using JWT secret length:', AUTH_CONFIG.JWT_SECRET.length);

        // 直接尝试解码token（无验证）来查看其内容
        const decodedWithoutVerify = jwt.decode(token);
        console.log('Token decoded without verification:', decodedWithoutVerify);
        
        // 验证token
        let decoded;
        try {
          decoded = jwt.verify(token, AUTH_CONFIG.JWT_SECRET) as JwtPayload;
        } catch (verifyError: any) {
          console.error('Token verification error details:', verifyError.message);
          
          // 尝试使用备选JWT密钥
          try {
            console.log('Trying with fallback JWT secret');
            decoded = jwt.verify(token, FALLBACK_JWT_SECRET) as JwtPayload;
            console.log('Fallback JWT verification successful');
          } catch (fallbackError) {
            console.error('Fallback verification also failed');
            throw verifyError; // 抛出原始错误
          }
        }
        
        console.log('Token verified successfully, payload:', {
          id: decoded.id,
          sub: decoded.sub,
          email: decoded.email
        });
        
        // 使用id或sub作为用户ID
        userId = decoded.id || decoded.sub;
        
        if (!userId) {
          console.error('Token has no user identifier (id or sub)');
          return NextResponse.json({ error: 'Invalid token: No user identifier' }, { status: 401 });
        }
      } catch (err: any) {
        console.error('Token validation failed:', err.message);
        return NextResponse.json({ error: `Invalid token: ${err.message}` }, { status: 401 });
      }
    } else {
      userId = session.user.id;
    }
    
    // Parse request body
    const data = await request.json();
    
    // Check for required fields
    if (!data.bookingReference || !data.bookingType) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }
    
    // Handle customer ID assignment from the data or existing customer
    let customerId = data.customerId;
    
    // If we have a primary passenger with email but no customer ID, look up or create a customer
    if (!customerId && data.passengers && data.passengers.length > 0) {
      const primaryPassenger = data.passengers.find((p: any) => p.isPrimary) || data.passengers[0];
      if (primaryPassenger.email) {
        // Look for existing customer with the same email
        const existingCustomer = await prisma.customer.findFirst({
          where: { email: primaryPassenger.email }
        });
        
        if (existingCustomer) {
          customerId = existingCustomer.id;
        } else {
          // Create a new customer from the primary passenger info
          const newCustomer = await prisma.customer.create({
            data: {
              firstName: primaryPassenger.firstName,
              lastName: primaryPassenger.lastName,
              email: primaryPassenger.email,
              phone: primaryPassenger.phone || '',
              nationality: primaryPassenger.nationality || '',
              createdById: userId,
              customerId: `CUST-${Date.now()}`
            }
          });
          
          customerId = newCustomer.id;
        }
      }
    }

    // Process passenger data to match schema
    const passengers = data.passengers?.map((passenger: any) => ({
      isPrimary: passenger.isPrimary || false,
      firstName: passenger.firstName,
      lastName: passenger.lastName,
      dateOfBirth: passenger.dateOfBirth ? new Date(passenger.dateOfBirth) : new Date(),
      gender: passenger.gender || 'Unknown',
      nationality: passenger.nationality || '',
      phone: passenger.phone,
      email: passenger.email
    })) || [];

    // Process flight segments to match schema
    const flightSegments = data.flightSegments?.map((segment: any, index: number) => ({
      segmentNumber: index + 1,
      airline: segment.airline,
      flightNumber: segment.flightNumber,
      from: segment.from,
      to: segment.to,
      departureDate: new Date(segment.departureDate),
      departureTime: segment.departureTime,
      arrivalDate: new Date(segment.arrivalDate),
      arrivalTime: segment.arrivalTime,
      cabinClass: segment.cabinClass,
      operatedBy: segment.operatedBy,
      duration: segment.duration,
      aircraft: segment.aircraft,
      fareBasis: segment.fareBasis,
      baggage: segment.baggage
    })) || [];

    // Process financial items to match schema
    const financialItems = (data.financialItems || []).map((item: any) => ({
      item: item.item,
      amount: parseFloat(item.amount),
      notes: item.notes
    }));

    // Process ancillary items to match schema
    const ancillaryItems = (data.ancillaryItems || []).map((item: any) => ({
      serviceType: item.serviceType,
      amount: parseFloat(item.amount),
      description: item.description
    }));

    // Process payment records to match schema
    const paymentRecords = (data.paymentRecords || []).map((record: any) => ({
      paymentMethod: record.paymentMethod,
      paymentDate: new Date(record.paymentDate),
      amount: parseFloat(record.amount),
      reference: record.reference
    }));

    // Create flight order
    const flightOrder = await prisma.flightOrder.create({
      data: {
        bookingReference: data.bookingReference,
        bookingType: data.bookingType,
        gdsSystem: data.gdsSystem,
        bookingDate: data.bookingDate ? new Date(data.bookingDate) : new Date(),
        bookingStatus: data.bookingStatus || 'Confirmed',
        currency: data.currency || 'CAD',
        cabinClass: data.cabinClass,
        fareType: data.fareType,
        
        // Use the processed arrays that match our schema types
        flightSegments: flightSegments,
        passengers: passengers,
        financialItems: financialItems,
        ancillaryItems: ancillaryItems,
        paymentRecords: paymentRecords,
        
        // Financial summary
        totalCost: data.financialSummary?.totalCost || 0,
        totalAncillary: data.financialSummary?.totalAncillary || 0,
        serviceFee: data.financialSummary?.serviceFee || 0,
        commissionAmount: data.financialSummary?.commissionAmount || 0,
        commissionRate: data.commissionRate || 0,
        commissionType: data.commissionType || 'Percentage',
        netProfit: data.financialSummary?.netProfit || 0,
        totalPaid: data.financialSummary?.totalPaid || 0,
        balanceDue: data.financialSummary?.balanceDue || 0,
        profitMargin: data.financialSummary?.profitMargin || 0,
        totalAmountDue: data.financialSummary?.totalAmountDue || 0,
        
        // Additional information
        remarks: data.remarks,
        seatSelection: data.seatSelection || false,
        mealRequest: data.mealRequest || false,
        frequentFlyer: data.frequentFlyer || false,
        additionalNotes: data.additionalNotes,
        
        // Relations
        createdBy: { connect: { id: userId } },
        ...(customerId && { customer: { connect: { id: customerId } } })
      },
      include: {
        createdBy: {
          select: {
            id: true,
            name: true,
            email: true,
          }
        },
        customer: true
      }
    });

    return NextResponse.json({ flightOrder }, { status: 201 });
  } catch (error: any) {
    console.error('Error creating flight order:', error);
    return NextResponse.json({ error: error.message || 'Failed to create flight order' }, { status: 500 });
  }
}

// PUT: Update an existing flight order
export async function PUT(request: NextRequest) {
  try {
    // Check authentication
    const session = await getServerSession(authOptions);
    let userId: string | undefined;
    
    if (!session) {
      // Check for JWT token from cookies or Authorization header
      let token = request.cookies.get('token')?.value;
      
      if (!token) {
        const authHeader = request.headers.get('Authorization');
        if (authHeader && authHeader.startsWith('Bearer ')) {
          token = authHeader.substring(7);
        }
      }
      
      if (!token) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
      }
      
      try {
        // 打印token前几个字符，便于调试
        console.log('PUT - Token prefix:', token.substring(0, 10) + '...');
        
        // 验证token
        let decoded;
        try {
          decoded = jwt.verify(token, AUTH_CONFIG.JWT_SECRET) as JwtPayload;
        } catch (verifyError: any) {
          console.error('PUT - Token verification error:', verifyError.message);
          
          // 尝试使用备选JWT密钥
          try {
            decoded = jwt.verify(token, FALLBACK_JWT_SECRET) as JwtPayload;
            console.log('PUT - Fallback JWT verification successful');
          } catch (fallbackError) {
            console.error('PUT - Fallback verification also failed');
            throw verifyError;
          }
        }
        
        // 使用id或sub作为用户ID
        userId = decoded.id || decoded.sub;
        
        if (!userId) {
          console.error('PUT - Token has no user identifier (id or sub)');
          return NextResponse.json({ error: 'Invalid token: No user identifier' }, { status: 401 });
        }
      } catch (err: any) {
        console.error('PUT - Token validation failed:', err.message);
        return NextResponse.json({ error: `Invalid token: ${err.message}` }, { status: 401 });
      }
    } else {
      userId = session.user.id;
    }
    
    // Parse request body
    const data = await request.json();
    
    // Check for required fields
    if (!data.id) {
      return NextResponse.json({ error: 'Missing order ID' }, { status: 400 });
    }
    
    // Get the existing order to check if it exists
    const existingOrder = await prisma.flightOrder.findUnique({
      where: { id: data.id }
    });
    
    if (!existingOrder) {
      return NextResponse.json({ error: 'Flight order not found' }, { status: 404 });
    }

    // Process passenger data to match schema
    const passengers = data.passengers?.map((passenger: any) => ({
      isPrimary: passenger.isPrimary || false,
      firstName: passenger.firstName,
      lastName: passenger.lastName,
      dateOfBirth: passenger.dateOfBirth ? new Date(passenger.dateOfBirth) : new Date(),
      gender: passenger.gender || 'Unknown',
      nationality: passenger.nationality || '',
      phone: passenger.phone,
      email: passenger.email
    })) || [];

    // Process flight segments to match schema
    const flightSegments = data.flightSegments?.map((segment: any, index: number) => ({
      segmentNumber: index + 1,
      airline: segment.airline,
      flightNumber: segment.flightNumber,
      from: segment.from,
      to: segment.to,
      departureDate: new Date(segment.departureDate),
      departureTime: segment.departureTime,
      arrivalDate: new Date(segment.arrivalDate),
      arrivalTime: segment.arrivalTime,
      cabinClass: segment.cabinClass,
      operatedBy: segment.operatedBy,
      duration: segment.duration,
      aircraft: segment.aircraft,
      fareBasis: segment.fareBasis,
      baggage: segment.baggage
    })) || [];

    // Process financial items to match schema
    const financialItems = (data.financialItems || []).map((item: any) => ({
      item: item.item,
      amount: parseFloat(item.amount),
      notes: item.notes
    }));

    // Process ancillary items to match schema
    const ancillaryItems = (data.ancillaryItems || []).map((item: any) => ({
      serviceType: item.serviceType,
      amount: parseFloat(item.amount),
      description: item.description
    }));

    // Process payment records to match schema
    const paymentRecords = (data.paymentRecords || []).map((record: any) => ({
      paymentMethod: record.paymentMethod,
      paymentDate: new Date(record.paymentDate),
      amount: parseFloat(record.amount),
      reference: record.reference
    }));
    
    // Update the order directly
    const updatedOrder = await prisma.flightOrder.update({
      where: { id: data.id },
      data: {
        bookingReference: data.bookingReference,
        bookingType: data.bookingType,
        gdsSystem: data.gdsSystem,
        bookingDate: data.bookingDate ? new Date(data.bookingDate) : undefined,
        bookingStatus: data.bookingStatus,
        currency: data.currency,
        cabinClass: data.cabinClass,
        fareType: data.fareType,
        
        // Use the processed arrays that match our schema types
        flightSegments: flightSegments,
        passengers: passengers,
        financialItems: financialItems,
        ancillaryItems: ancillaryItems,
        paymentRecords: paymentRecords,
        
        // Financial summary
        totalCost: data.financialSummary?.totalCost,
        totalAncillary: data.financialSummary?.totalAncillary,
        serviceFee: data.financialSummary?.serviceFee,
        commissionAmount: data.financialSummary?.commissionAmount,
        commissionRate: data.commissionRate,
        commissionType: data.commissionType,
        netProfit: data.financialSummary?.netProfit,
        totalPaid: data.financialSummary?.totalPaid,
        balanceDue: data.financialSummary?.balanceDue,
        profitMargin: data.financialSummary?.profitMargin,
        totalAmountDue: data.financialSummary?.totalAmountDue,
        
        // Additional information
        remarks: data.remarks,
        seatSelection: data.seatSelection,
        mealRequest: data.mealRequest,
        frequentFlyer: data.frequentFlyer,
        additionalNotes: data.additionalNotes,
        
        // Customer relationship
        ...(data.customerId && { customer: { connect: { id: data.customerId } } })
      },
      include: {
        createdBy: {
          select: {
            id: true,
            name: true,
            email: true
          }
        },
        customer: true
      }
    });
    
    return NextResponse.json({ flightOrder: updatedOrder });
  } catch (error: any) {
    console.error('Error updating flight order:', error);
    return NextResponse.json({ error: error.message || 'Failed to update flight order' }, { status: 500 });
  }
}

// DELETE: Delete a flight order
export async function DELETE(request: NextRequest) {
  try {
    // Check authentication
    const session = await getServerSession(authOptions);
    let userId: string | undefined;
    
    if (!session) {
      // Check for JWT token from cookies or Authorization header
      let token = request.cookies.get('token')?.value;
      
      if (!token) {
        const authHeader = request.headers.get('Authorization');
        if (authHeader && authHeader.startsWith('Bearer ')) {
          token = authHeader.substring(7);
        }
      }
      
      if (!token) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
      }
      
      try {
        // 打印token前几个字符，便于调试
        console.log('DELETE - Token prefix:', token.substring(0, 10) + '...');
        
        // 验证token
        let decoded;
        try {
          decoded = jwt.verify(token, AUTH_CONFIG.JWT_SECRET) as JwtPayload;
        } catch (verifyError: any) {
          console.error('DELETE - Token verification error:', verifyError.message);
          
          // 尝试使用备选JWT密钥
          try {
            decoded = jwt.verify(token, FALLBACK_JWT_SECRET) as JwtPayload;
            console.log('DELETE - Fallback JWT verification successful');
          } catch (fallbackError) {
            console.error('DELETE - Fallback verification also failed');
            throw verifyError;
          }
        }
        
        // 使用id或sub作为用户ID
        userId = decoded.id || decoded.sub;
        
        if (!userId) {
          console.error('DELETE - Token has no user identifier (id or sub)');
          return NextResponse.json({ error: 'Invalid token: No user identifier' }, { status: 401 });
        }
      } catch (err: any) {
        console.error('DELETE - Token validation failed:', err.message);
        return NextResponse.json({ error: `Invalid token: ${err.message}` }, { status: 401 });
      }
    } else {
      userId = session.user.id;
    }
    
    // Get ID from URL params
    const id = request.nextUrl.searchParams.get('id');
    
    if (!id) {
      return NextResponse.json({ error: 'Missing order ID' }, { status: 400 });
    }
    
    // Delete the order directly (Prisma will handle cascading deletes through the schema)
    await prisma.flightOrder.delete({ 
      where: { id } 
    });
    
    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error('Error deleting flight order:', error);
    return NextResponse.json({ error: error.message || 'Failed to delete flight order' }, { status: 500 });
  }
}

// Health check route to test API without authentication
export async function OPTIONS(request: NextRequest) {
  try {
    // Return basic information about the API
    return NextResponse.json({
      status: 'ok',
      version: '1.0',
      environment: process.env.NODE_ENV || 'development',
      auth: {
        methods: ['session', 'jwt-token'],
        configured: Boolean(AUTH_CONFIG.JWT_SECRET)
      },
      timestamp: new Date().toISOString()
    });
  } catch (error: any) {
    console.error('Health check error:', error);
    return NextResponse.json({ 
      status: 'error', 
      error: error.message || 'Unknown error during health check' 
    }, { status: 500 });
  }
} 