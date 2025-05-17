// src/utils/jwt.ts
import jwt from 'jsonwebtoken';
import { IUser } from '../types';

interface JWTPayload {
  userId: string;
  email: string;
  role: string;
}

export class JWTUtils {
  static generateAccessToken(user: IUser): string {
    // Fallback if environment variable is not set
    const secret = process.env.JWT_SECRET || 'your-super-secret-jwt-key-change-this-in-production';
    
    if (!process.env.JWT_SECRET) {
      console.warn('WARNING: JWT_SECRET is not defined, using fallback secret for development');
    }
    
    const payload = {
      userId: user._id.toString(),
      email: user.email,
      role: user.role
    };
    
    // Using 'as any' to bypass TypeScript errors
    return jwt.sign(payload, secret as any, {
      expiresIn: process.env.JWT_EXPIRES_IN || '7d',
      issuer: 'triddle',
      audience: 'triddle-users'
    } as any);
  }

  static generateRefreshToken(user: IUser): string {
    const secret = process.env.JWT_SECRET || 'your-super-secret-jwt-key-change-this-in-production';
    
    if (!process.env.JWT_SECRET) {
      console.warn('WARNING: JWT_SECRET is not defined, using fallback secret for development');
    }
    
    const payload = {
      userId: user._id.toString(),
      email: user.email,
      role: user.role
    };
    
    // Using 'as any' to bypass TypeScript errors
    return jwt.sign(payload, secret as any, {
      expiresIn: process.env.REFRESH_TOKEN_EXPIRES_IN || '30d',
      issuer: 'triddle',
      audience: 'triddle-refresh'
    } as any);
  }

  static verifyToken(token: string): JWTPayload {
    const secret = process.env.JWT_SECRET || 'your-super-secret-jwt-key-change-this-in-production';
    
    try {
      return jwt.verify(token, secret as any) as JWTPayload;
    } catch (error) {
      if (error instanceof jwt.TokenExpiredError) {
        throw new Error('Token has expired');
      } else if (error instanceof jwt.JsonWebTokenError) {
        throw new Error('Invalid token');
      } else {
        throw new Error('Token verification failed');
      }
    }
  }

  static extractTokenFromHeader(authHeader: string | undefined): string | null {
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return null;
    }
    return authHeader.substring(7);
  }
}