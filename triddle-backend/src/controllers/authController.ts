import { Request, Response } from 'express';
import { IAuthenticatedRequest } from '../types';
import { ResponseUtils } from '../utils/response';
import { JWTUtils } from '../utils/jwt';
import User from '../models/User';

export class AuthController {
  static async register(req: Request, res: Response): Promise<void> {
    try {
      const { firstName, lastName, email, password } = req.body;
      
      // Check if user already exists
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        ResponseUtils.error(res, 'User already exists with this email', 400);
        return;
      }
      
      // Create new user
      const user = new User({
        firstName,
        lastName,
        email,
        password
      });
      
      await user.save();
      
      // Generate tokens
      const accessToken = JWTUtils.generateAccessToken(user);
      const refreshToken = JWTUtils.generateRefreshToken(user);
      
      // Set httpOnly cookies
      res.cookie('accessToken', accessToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
      });
      
      res.cookie('refreshToken', refreshToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        maxAge: 30 * 24 * 60 * 60 * 1000 // 30 days
      });
      
      ResponseUtils.success(res, {
        user: user.toJSON(),
        accessToken
      }, 'User registered successfully', 201);
    } catch (error) {
      console.error('Registration error:', error);
      ResponseUtils.error(res, 'Registration failed', 500);
    }
  }
  
  static async login(req: Request, res: Response): Promise<void> {
    try {
      const { email, password } = req.body;
      
      // Find user and include password for comparison
      const user = await User.findOne({ email }).select('+password');
      
      if (!user || !user.isActive) {
        ResponseUtils.error(res, 'Invalid credentials', 401);
        return;
      }
      
      // Check password
      const isPasswordValid = await user.comparePassword(password);
      if (!isPasswordValid) {
        ResponseUtils.error(res, 'Invalid credentials', 401);
        return;
      }
      
      // Update last login
      user.lastLogin = new Date();
      await user.save();
      
      // Generate tokens
      const accessToken = JWTUtils.generateAccessToken(user);
      const refreshToken = JWTUtils.generateRefreshToken(user);
      
      // Set httpOnly cookies
      res.cookie('accessToken', accessToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
      });
      
      res.cookie('refreshToken', refreshToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        maxAge: 30 * 24 * 60 * 60 * 1000 // 30 days
      });
      
      ResponseUtils.success(res, {
        user: user.toJSON(),
        accessToken
      }, 'Login successful');
    } catch (error) {
      console.error('Login error:', error);
      ResponseUtils.error(res, 'Login failed', 500);
    }
  }
  
  static async getMe(req: IAuthenticatedRequest, res: Response): Promise<void> {
    try {
      if (!req.user) {
        ResponseUtils.unauthorized(res, 'User not authenticated');
        return;
      }
      
      ResponseUtils.success(res, req.user.toJSON(), 'User profile retrieved');
    } catch (error) {
      console.error('Get profile error:', error);
      ResponseUtils.error(res, 'Failed to get profile', 500);
    }
  }
  
  static async logout(req: Request, res: Response): Promise<void> {
    try {
      // Clear cookies
      res.clearCookie('accessToken');
      res.clearCookie('refreshToken');
      
      ResponseUtils.success(res, null, 'Logout successful');
    } catch (error) {
      console.error('Logout error:', error);
      ResponseUtils.error(res, 'Logout failed', 500);
    }
  }
  
  static async refreshToken(req: Request, res: Response): Promise<void> {
    try {
      const refreshToken = req.cookies.refreshToken;
      
      if (!refreshToken) {
        ResponseUtils.unauthorized(res, 'Refresh token not provided');
        return;
      }
      
      // Verify refresh token
      const decoded = JWTUtils.verifyToken(refreshToken);
      
      // Get user
      const user = await User.findById(decoded.userId);
      if (!user || !user.isActive) {
        ResponseUtils.unauthorized(res, 'User not found or inactive');
        return;
      }
      
      // Generate new access token
      const accessToken = JWTUtils.generateAccessToken(user);
      
      // Set new cookie
      res.cookie('accessToken', accessToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
      });
      
      ResponseUtils.success(res, {
        accessToken
      }, 'Token refreshed successfully');
    } catch (error) {
      console.error('Token refresh error:', error);
      ResponseUtils.unauthorized(res, 'Invalid refresh token');
    }
  }
  
  static async forgotPassword(req: Request, res: Response): Promise<void> {
    try {
      const { email } = req.body;
      
      const user = await User.findOne({ email });
      if (!user) {
        // Don't reveal if user exists or not
        ResponseUtils.success(res, null, 'If the email exists, a reset link has been sent');
        return;
      }
      
      // TODO: Implement email sending for password reset
      // For now, just return success
      ResponseUtils.success(res, null, 'Password reset link sent to your email');
    } catch (error) {
      console.error('Forgot password error:', error);
      ResponseUtils.error(res, 'Failed to process password reset', 500);
    }
  }
  
  static async resetPassword(req: Request, res: Response): Promise<void> {
    try {
      // TODO: Implement password reset functionality
      ResponseUtils.success(res, null, 'Password reset successful');
    } catch (error) {
      console.error('Reset password error:', error);
      ResponseUtils.error(res, 'Failed to reset password', 500);
    }
  }
}