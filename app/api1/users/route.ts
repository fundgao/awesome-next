import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import bcrypt from "bcryptjs";

export async function POST(req: NextRequest) {
  const { email, name, address, password } = await req.json();

  try {
    // 哈希密码
    const hashedPassword = await bcrypt.hash(password || "defaultPassword123", 10);
    
    const user = await prisma.user.create({
      data: {
        email,
        name,
        password: hashedPassword,
        address,
      },
    });
    return NextResponse.json(user, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: "Unable to create user" },
      { status: 500 }
    );
  }
}

export async function GET(req: NextRequest) {
  try {
    const users = await prisma.user.findMany({
      include: { posts: true },
    });
    return NextResponse.json(users, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: "Unable to fetch users" },
      { status: 500 }
    );
  }
}

export async function PUT(req: NextRequest) {
  const { id, email, name, address } = await req.json();

  try {
    const user = await prisma.user.update({
      where: { id },
      data: { email, name, address },
    });
    return NextResponse.json(user, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: "Unable to update user" },
      { status: 500 }
    );
  }
}

export async function DELETE(req: NextRequest) {
  const { id } = await req.json();

  try {
    await prisma.user.delete({ where: { id } });
    return NextResponse.json(null, { status: 204 });
  } catch (error) {
    return NextResponse.json(
      { error: "Unable to delete user" },
      { status: 500 }
    );
  }
}
