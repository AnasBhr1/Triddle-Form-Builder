import { Request, Response, NextFunction } from 'express';
import { JWTUtils } from '../utils/jwt';
import { ResponseUtils } from '../utils/response';
import { IAuthenticatedRequest, UserRole } from '../types';
import User from '../models/User';
import Joi from 'joi';  // Add this import for Joi

export const authenticate = async (
  req: IAuthenticatedRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    // Try to get token from Authorization header
    const authHeader = req.headers.authorization;
    let token = JWTUtils.extractTokenFromHeader(authHeader);
    
    // If no token in header, try to get from cookies
    if (!token && req.cookies.accessToken) {
      token = req.cookies.accessToken;
    }
    
    if (!token) {
      ResponseUtils.unauthorized(res, 'Access token required');
      return;
    }
    
    // Verify token
    const decoded = JWTUtils.verifyToken(token);
    
    // Get user from database
    const user = await User.findById(decoded.userId).select('+password');
    
    if (!user || !user.isActive) {
      ResponseUtils.unauthorized(res, 'User not found or inactive');
      return;
    }
    
    // Update last login
    user.lastLogin = new Date();
    await user.save();
    
    // Attach user to request
    req.user = user;
    next();
  } catch (error) {
    console.error('Authentication error:', error);
    ResponseUtils.unauthorized(res, 'Invalid or expired token');
  }
};

export const authorize = (roles: UserRole[]) => {
  return (req: IAuthenticatedRequest, res: Response, next: NextFunction): void => {
    if (!req.user) {
      ResponseUtils.unauthorized(res, 'Authentication required');
      return;
    }
    
    if (!roles.includes(req.user.role)) {
      ResponseUtils.forbidden(res, 'Insufficient permissions');
      return;
    }
    
    next();
  };
};

// Optional authentication - doesn't fail if no token
export const optionalAuthenticate = async (
  req: IAuthenticatedRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const authHeader = req.headers.authorization;
    let token = JWTUtils.extractTokenFromHeader(authHeader);
    
    if (!token && req.cookies.accessToken) {
      token = req.cookies.accessToken;
    }
    
    if (token) {
      const decoded = JWTUtils.verifyToken(token);
      const user = await User.findById(decoded.userId);
      if (user && user.isActive) {
        req.user = user;
      }
    }
    
    next();
  } catch (error) {
    // Silently fail for optional authentication
    next();
  }
};

// Add the validation related functions below

export const authSchemas = {
  register: Joi.object({
    username: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required(),
    // Add any other fields required for registration
  }),
  login: Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
  }),
  forgotPassword: Joi.object({
    email: Joi.string().email().required(),
  }),
  resetPassword: Joi.object({
    token: Joi.string().required(),
    password: Joi.string().min(6).required(),
    confirmPassword: Joi.string().valid(Joi.ref('password')).required()
      .messages({ 'any.only': 'Passwords must match' }),
  }),
  // You can add other auth schemas as needed
};

// The key fix is in this validate function
export const validate = (schema: Joi.ObjectSchema) => {
  return (req: Request, res: Response, next: NextFunction): void => {
    const { error } = schema.validate(req.body);
    
    if (error) {
      res.status(400).json({
        success: false,
        message: error.details[0].message,
      });
      return;
    }
    
    next();
  };
};