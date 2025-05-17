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

// Add form schemas
export const formSchemas = {
  createForm: Joi.object({
    title: Joi.string().required(),
    description: Joi.string().allow(''),
    fields: Joi.array().items(
      Joi.object({
        type: Joi.string().valid('text', 'textarea', 'select', 'checkbox', 'radio', 'file').required(),
        label: Joi.string().required(),
        placeholder: Joi.string().allow(''),
        required: Joi.boolean().default(false),
        options: Joi.array().items(Joi.string()).when('type', {
          is: Joi.string().valid('select', 'checkbox', 'radio'),
          then: Joi.array().min(1).required(),
          otherwise: Joi.array().optional(),
        }),
      })
    ).min(1).required(),
    isPublished: Joi.boolean().default(false),
    expiresAt: Joi.date().allow(null),
  }),
  updateForm: Joi.object({
    title: Joi.string(),
    description: Joi.string().allow(''),
    fields: Joi.array().items(
      Joi.object({
        type: Joi.string().valid('text', 'textarea', 'select', 'checkbox', 'radio', 'file'),
        label: Joi.string(),
        placeholder: Joi.string().allow(''),
        required: Joi.boolean(),
        options: Joi.array().items(Joi.string()),
      })
    ),
    isPublished: Joi.boolean(),
    expiresAt: Joi.date().allow(null),
  }),
  submitForm: Joi.object({
    responses: Joi.array().items(
      Joi.object({
        fieldId: Joi.string().required(),
        value: Joi.alternatives().try(
          Joi.string(),
          Joi.array().items(Joi.string()),
          Joi.boolean(),
        ).required(),
      })
    ).min(1).required(),
  }),
  submitResponse: Joi.object({
    formId: Joi.string().required(),
    answers: Joi.array().items(
      Joi.object({
        questionId: Joi.string().required(),
        value: Joi.alternatives().try(
          Joi.string(),
          Joi.array().items(Joi.string()),
          Joi.boolean(),
          Joi.number()
        ).required(),
      })
    ).min(1).required(),
  }),
};

// The validate function
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