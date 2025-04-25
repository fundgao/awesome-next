import NextAuth from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { PrismaClient } from "@prisma/client";
import { authOptions } from "@/lib/auth-options";

const prisma = new PrismaClient();

// 扩展Session用户类型
declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      name?: string | null;
      email?: string | null;
      image?: string | null;
      role?: string;
    }
  }
  
  // 扩展User类型，添加role属性
  interface User {
    id: string;
    name?: string | null;
    email?: string | null;
    image?: string | null;
    role?: string;
  }
}

// 扩展JWT令牌类型
declare module "next-auth/jwt" {
  interface JWT {
    id?: string;
    role?: string;
  }
}

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST }; 