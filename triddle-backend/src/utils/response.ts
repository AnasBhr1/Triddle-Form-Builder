import { Response } from 'express';
import { IApiResponse } from '../types';

export class ResponseUtils {
  static success<T>(res: Response, data: T, message: string = 'Success', statusCode: number = 200): Response {
    const response: IApiResponse<T> = {
      success: true,
      message,
      data
    };
    return res.status(statusCode).json(response);
  }

  static error(res: Response, message: string = 'Error', statusCode: number = 500, error?: string): Response {
    const response: IApiResponse = {
      success: false,
      message,
      error
    };
    return res.status(statusCode).json(response);
  }

  static validationError(res: Response, message: string = 'Validation failed', errors?: any): Response {
    const response: IApiResponse = {
      success: false,
      message,
      error: errors
    };
    return res.status(400).json(response);
  }

  static unauthorized(res: Response, message: string = 'Unauthorized'): Response {
    return this.error(res, message, 401);
  }

  static forbidden(res: Response, message: string = 'Forbidden'): Response {
    return this.error(res, message, 403);
  }

  static notFound(res: Response, message: string = 'Resource not found'): Response {
    return this.error(res, message, 404);
  }

  static paginated<T>(
    res: Response,
    data: T[],
    total: number,
    page: number,
    limit: number,
    message: string = 'Success'
  ): Response {
    const response: IApiResponse<T[]> = {
      success: true,
      message,
      data,
      meta: {
        pagination: {
          page,
          limit,
          total,
          pages: Math.ceil(total / limit)
        }
      }
    };
    return res.status(200).json(response);
  }
}