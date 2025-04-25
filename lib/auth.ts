import jwt from 'jsonwebtoken';
import crypto from 'crypto';

// 基础配置
export const AUTH_CONFIG = {
  JWT_SECRET: process.env.JWT_SECRET || 'your-secret-key',
  JWT_EXPIRES_IN: process.env.JWT_EXPIRES_IN || '7d',
  PASSWORD_HASH_ITERATIONS: 10000,
  PASSWORD_HASH_ALGORITHM: 'sha512',
  PASSWORD_KEY_LENGTH: 64,
  TOKEN_TYPE: 'Bearer'
};

// 用户类型定义
export interface UserPayload {
  id: string;
  email: string;
  name?: string | null;
  role: string;
}

/**
 * 密码工具函数
 */
// 密码加密
export async function hashPassword(password: string): Promise<string> {
  const salt = crypto.randomBytes(16).toString('hex');
  const hash = crypto.pbkdf2Sync(
    password, 
    salt, 
    AUTH_CONFIG.PASSWORD_HASH_ITERATIONS, 
    AUTH_CONFIG.PASSWORD_KEY_LENGTH, 
    AUTH_CONFIG.PASSWORD_HASH_ALGORITHM
  ).toString('hex');
  
  return `pbkdf2:${AUTH_CONFIG.PASSWORD_HASH_ITERATIONS}:${salt}:${hash}`;
}

// 密码验证
export async function verifyPassword(password: string, hashedPassword: string): Promise<boolean> {
  try {
    const [algorithm, iterations, salt, originalHash] = hashedPassword.split(':');
    
    if (algorithm !== 'pbkdf2') {
      return false;
    }
    
    const hash = crypto.pbkdf2Sync(
      password, 
      salt, 
      parseInt(iterations, 10), 
      AUTH_CONFIG.PASSWORD_KEY_LENGTH, 
      AUTH_CONFIG.PASSWORD_HASH_ALGORITHM
    ).toString('hex');
    
    return hash === originalHash;
  } catch (error) {
    console.error('Password verification error:', error);
    return false;
  }
}

/**
 * JWT工具函数
 */
// 生成令牌
export function generateToken(user: UserPayload): string {
  const payload = {
    sub: user.id,
    email: user.email,
    role: user.role,
    name: user.name
  };
  
  try {
    // @ts-ignore: TypeScript 无法正确处理 jwt 类型
    return jwt.sign(payload, AUTH_CONFIG.JWT_SECRET, { 
      expiresIn: AUTH_CONFIG.JWT_EXPIRES_IN 
    });
  } catch (error) {
    console.error('Token generation error:', error);
    throw new Error('Unable to generate token');
  }
}

// 验证令牌
export function verifyToken(token: string): any {
  try {
    // @ts-ignore: TypeScript 无法正确处理 jwt 类型
    return jwt.verify(token, AUTH_CONFIG.JWT_SECRET);
  } catch (error) {
    console.error('Token verification error:', error);
    throw new Error('Invalid token');
  }
}

// 从请求头中提取令牌
export function extractTokenFromHeader(authHeader: string | null): string {
  if (!authHeader || !authHeader.startsWith(`${AUTH_CONFIG.TOKEN_TYPE} `)) {
    throw new Error('No valid token provided');
  }
  
  return authHeader.substring(AUTH_CONFIG.TOKEN_TYPE.length + 1);
} 