import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import jwt from "jsonwebtoken";

const prisma: any = new PrismaClient();

// JWT secret key
const JWT_SECRET =
  process.env.JWT_SECRET || "default-jwt-secret-key-for-development";

interface JwtPayload {
  id: string;
  email: string;
  role: string;
}

export async function GET(request: NextRequest) {
  try {
    // Get token from cookie
    const token = request.cookies.get("token")?.value;

    if (!token) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Verify token
    const decoded = jwt.verify(token, JWT_SECRET) as JwtPayload;

    // Find user by id
    const user = await prisma.user.findUnique({
      where: { id: decoded.id },
    });

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    // Return user without password
    const { password, ...userWithoutPassword } = user as any;

    return NextResponse.json({
      user: userWithoutPassword,
    });
  } catch (error) {
    console.error("Authentication error:", error);
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
}
