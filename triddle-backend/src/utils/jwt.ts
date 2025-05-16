import jwt from 'jsonwebtoken';
import { IUser } from '../types';

interface JWTPayload {
  userId: string;
  email: string;
  role: string;
}

export class JWTUtils {
  private static readonly JWT_SECRET = process.env.JWT_SECRET as string;
  private static readonly JWT_EXPIRES_IN = '7d';
  private static readonly REFRESH_TOKEN_EXPIRES_IN = '30d';

  static generateAccessToken(user: IUser): string {
    if (!this.JWT_SECRET) {
      throw new Error('JWT_SECRET is not defined');
    }

    const payload: JWTPayload = {
      userId: user._id.toString(),
      email: user.email,
      role: user.role
    };

    return jwt.sign(payload, this.JWT_SECRET, {
      expiresIn: this.JWT_EXPIRES_IN,
      issuer: 'triddle',
      audience: 'triddle-users'
    });
  }

  static generateRefreshToken(user: IUser): string {
    if (!this.JWT_SECRET) {
      throw new Error('JWT_SECRET is not defined');
    }

    const payload: JWTPayload = {
      userId: user._id.toString(),
      email: user.email,
      role: user.role
    };

    return jwt.sign(payload, this.JWT_SECRET, {
      expiresIn: this.REFRESH_TOKEN_EXPIRES_IN,
      issuer: 'triddle',
      audience: 'triddle-refresh'
    });
  }

  static verifyToken(token: string): JWTPayload {
    if (!this.JWT_SECRET) {
      throw new Error('JWT_SECRET is not defined');
    }

    try {
      return jwt.verify(token, this.JWT_SECRET) as JWTPayload;
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
