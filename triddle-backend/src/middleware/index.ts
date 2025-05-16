import { Request, Response, NextFunction } from 'express';
import rateLimit from 'express-rate-limit';
import { ResponseUtils } from '../utils/response';

// Rate limiting configurations
export const generalLimiter = rateLimit({
  windowMs: parseInt(process.env.RATE_LIMIT_WINDOW_MS || '900000'), // 15 minutes
  max: parseInt(process.env.RATE_LIMIT_MAX_REQUESTS || '100'), // limit each IP to 100 requests per windowMs
  message: {
    success: false,
    message: 'Too many requests from this IP, please try again later.',
    error: 'Rate limit exceeded'
  },
  standardHeaders: true,
  legacyHeaders: false,
  handler: (req: Request, res: Response) => {
    ResponseUtils.error(res, 'Too many requests, please try again later.', 429);
  }
});

export const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5, // limit each IP to 5 auth requests per windowMs
  message: {
    success: false,
    message: 'Too many authentication attempts, please try again later.',
    error: 'Auth rate limit exceeded'
  },
  skipSuccessfulRequests: true,
  handler: (req: Request, res: Response) => {
    ResponseUtils.error(res, 'Too many authentication attempts, please try again later.', 429);
  }
});

export const uploadLimiter = rateLimit({
  windowMs: 60 * 1000, // 1 minute
  max: 10, // limit each IP to 10 upload requests per minute
  message: {
    success: false,
    message: 'Too many upload attempts, please try again later.',
    error: 'Upload rate limit exceeded'
  },
  handler: (req: Request, res: Response) => {
    ResponseUtils.error(res, 'Too many upload attempts, please try again later.', 429);
  }
});

export const formSubmissionLimiter = rateLimit({
  windowMs: 60 * 1000, // 1 minute
  max: 20, // limit each IP to 20 form submissions per minute
  message: {
    success: false,
    message: 'Too many form submissions, please try again later.',
    error: 'Form submission rate limit exceeded'
  },
  handler: (req: Request, res: Response) => {
    ResponseUtils.error(res, 'Too many form submissions, please try again later.', 429);
  }
});

// Generic error handling middleware
export const errorHandler = (
  error: Error,
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  console.error('Error occurred:', error);
  
  // Handle specific error types
  if (error.name === 'ValidationError') {
    ResponseUtils.validationError(res, 'Validation error', error.message);
    return;
  }
  
  if (error.name === 'CastError') {
    ResponseUtils.error(res, 'Invalid resource ID', 400);
    return;
  }
  
  if (error.name === 'MongoServerError' && (error as any).code === 11000) {
    ResponseUtils.error(res, 'Duplicate field value', 400);
    return;
  }
  
  // Default error response
  const isDevelopment = process.env.NODE_ENV === 'development';
  ResponseUtils.error(
    res,
    'Internal server error',
    500,
    isDevelopment ? error.stack : undefined
  );
};

// 404 handler
export const notFoundHandler = (req: Request, res: Response): void => {
  ResponseUtils.notFound(res, `Route ${req.originalUrl} not found`);
};

// Request logging middleware
export const requestLogger = (req: Request, res: Response, next: NextFunction): void => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.url} - IP: ${req.ip}`);
  next();
};