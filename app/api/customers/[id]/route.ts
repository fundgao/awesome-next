import { NextRequest, NextResponse } from "next/server";
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

// 将Prisma Customer对象映射为前端需要的格式
const mapCustomerData = (customer: any) => {
  return {
    id: customer.id,
    uid: customer.customerId || `CID-${Math.floor(Math.random() * 100000)}`,
    name: `${customer.firstName} ${customer.lastName}`,
    firstName: customer.firstName,
    lastName: customer.lastName,
    type: customer.membershipLevel || "silver",
    sales: customer.salesRepresentative || "Unknown Rep",
    joinDate: customer.joinDate
      ? new Date(customer.joinDate)
          .toISOString()
          .split("T")[0]
          .replace(/-/g, "/")
      : "Unknown",
    gender: customer.gender || "Unknown",
    birthday: customer.dateOfBirth
      ? new Date(customer.dateOfBirth)
          .toISOString()
          .split("T")[0]
          .replace(/-/g, "/")
      : "Unknown",
    nationality: customer.nationality || "Unknown",
    phone: customer.phone || "N/A",
    email: customer.email || "N/A",
    // 添加其他需要的字段
    address: customer.address,
    emergencyContact: customer.emergencyContact,
    travelPreferences: customer.travelPreferences,
    status: customer.status,
    referredBy: customer.referredBy,
    notes: customer.notes,
    newsletter: customer.newsletter,
    createdAt: customer.createdAt,
    updatedAt: customer.updatedAt,
  };
};

// GET /api/customers/:id - 获取单个客户
export async function GET(request: Request, { params }: any) {
  try {
    const prisma: any = getPrismaClient();

    if (!prisma) {
      throw new Error("无法初始化数据库连接");
    }

    const { id } = params;

    // 获取客户数据
    const customer = await prisma.customer.findUnique({
      where: { id },
      include: {
        createdBy: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
      },
    });

    if (!customer) {
      return NextResponse.json({ error: "客户不存在" }, { status: 404 });
    }

    // 转换为前端期望的格式
    const mappedCustomer = mapCustomerData(customer);

    return NextResponse.json(mappedCustomer);
  } catch (error) {
    console.error(`Error fetching customer ${params.id}:`, error);
    return NextResponse.json({ error: "获取客户信息失败" }, { status: 500 });
  }
}

// PATCH /api/customers/:id - 更新客户
export async function PATCH(request: Request, { params }: any) {
  try {
    const prisma: any = getPrismaClient();

    if (!prisma) {
      throw new Error("无法初始化数据库连接");
    }

    const { id } = params;
    const data = await request.json();

    // 检查客户是否存在
    const existingCustomer = await prisma.customer.findUnique({
      where: { id },
    });

    if (!existingCustomer) {
      return NextResponse.json({ error: "客户不存在" }, { status: 404 });
    }

    // 准备更新数据
    const updateData: any = {
      // 只包含Prisma Customer模型中的字段
      ...(data.firstName !== undefined && { firstName: data.firstName }),
      ...(data.lastName !== undefined && { lastName: data.lastName }),
      ...(data.gender !== undefined && { gender: data.gender }),
      ...(data.dateOfBirth !== undefined && {
        dateOfBirth: data.dateOfBirth ? new Date(data.dateOfBirth) : null,
      }),
      ...(data.nationality !== undefined && { nationality: data.nationality }),
      ...(data.passportNumber !== undefined && {
        passportNumber: data.passportNumber,
      }),
      ...(data.passportExpiry !== undefined && {
        passportExpiry: data.passportExpiry
          ? new Date(data.passportExpiry)
          : null,
      }),
      ...(data.email !== undefined && { email: data.email }),
      ...(data.phone !== undefined && { phone: data.phone }),
      ...(data.alternativePhone !== undefined && {
        alternativePhone: data.alternativePhone,
      }),
      ...(data.address !== undefined && { address: data.address }),
      ...(data.emergencyContact !== undefined && {
        emergencyContact: data.emergencyContact,
      }),
      ...(data.travelPreferences !== undefined && {
        travelPreferences: data.travelPreferences,
      }),
      ...(data.membershipLevel !== undefined && {
        membershipLevel: data.membershipLevel,
      }),
      ...(data.salesRepresentative !== undefined && {
        salesRepresentative: data.salesRepresentative,
      }),
      ...(data.joinDate !== undefined && {
        joinDate: data.joinDate ? new Date(data.joinDate) : null,
      }),
      ...(data.referredBy !== undefined && { referredBy: data.referredBy }),
      ...(data.notes !== undefined && { notes: data.notes }),
      ...(data.newsletter !== undefined && { newsletter: data.newsletter }),
      ...(data.status !== undefined && { status: data.status }),
    };

    // 更新客户
    const updatedCustomer = await prisma.customer.update({
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
      },
    });

    // 转换为前端期望的格式
    const mappedCustomer = mapCustomerData(updatedCustomer);

    return NextResponse.json(mappedCustomer);
  } catch (error) {
    console.error(`Error updating customer ${params.id}:`, error);
    return NextResponse.json({ error: "更新客户信息失败" }, { status: 500 });
  }
}

// DELETE /api/customers/:id - 删除客户
export async function DELETE(request: Request, { params }: any) {
  try {
    const prisma: any = getPrismaClient();

    if (!prisma) {
      throw new Error("无法初始化数据库连接");
    }

    const { id } = params;

    // 检查客户是否存在
    const existingCustomer = await prisma.customer.findUnique({
      where: { id },
    });

    if (!existingCustomer) {
      return NextResponse.json({ error: "客户不存在" }, { status: 404 });
    }

    // 删除客户
    await prisma.customer.delete({
      where: { id },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error(`Error deleting customer ${params.id}:`, error);
    return NextResponse.json({ error: "删除客户失败" }, { status: 500 });
  }
}
