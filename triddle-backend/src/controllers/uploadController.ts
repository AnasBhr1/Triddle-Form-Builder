import { Request, Response } from 'express';
import multer from 'multer';
import { cloudinary } from '../config/cloudinary';
import { ResponseUtils } from '../utils/response';
import { v4 as uuidv4 } from 'uuid';
import path from 'path';

// Configure multer for file uploads
const storage = multer.memoryStorage();

const fileFilter = (req: Request, file: Express.Multer.File, cb: multer.FileFilterCallback) => {
  // Allow all file types for now - validation will be done per form question
  cb(null, true);
};

export const upload = multer({
  storage,
  fileFilter,
  limits: {
    fileSize: 100 * 1024 * 1024, // 100MB max file size
    files: 10 // Max 10 files per upload
  }
});

export class UploadController {
  static async uploadFile(req: Request, res: Response): Promise<void> {
    try {
      if (!req.file) {
        ResponseUtils.error(res, 'No file provided', 400);
        return;
      }
      
      const file = req.file;
      const uniqueFilename = `${uuidv4()}-${file.originalname}`;
      
      // Upload to Cloudinary
      const uploadOptions: any = {
        folder: 'triddle/uploads',
        public_id: uniqueFilename,
        resource_type: 'auto', // Automatically detect file type
        access_mode: 'public'
      };
      
      // Convert buffer to base64 for Cloudinary upload
      const base64File = `data:${file.mimetype};base64,${file.buffer.toString('base64')}`;
      
      const result = await cloudinary.uploader.upload(base64File, uploadOptions);
      
      const fileData = {
        originalName: file.originalname,
        filename: uniqueFilename,
        url: result.secure_url,
        size: file.size,
        mimetype: file.mimetype,
        cloudinaryId: result.public_id
      };
      
      ResponseUtils.success(res, fileData, 'File uploaded successfully', 201);
    } catch (error) {
      console.error('File upload error:', error);
      ResponseUtils.error(res, 'Failed to upload file', 500);
    }
  }
  
  static async uploadMultipleFiles(req: Request, res: Response): Promise<void> {
    try {
      if (!req.files || !Array.isArray(req.files) || req.files.length === 0) {
        ResponseUtils.error(res, 'No files provided', 400);
        return;
      }
      
      const files = req.files as Express.Multer.File[];
      const uploadPromises = files.map(async (file) => {
        const uniqueFilename = `${uuidv4()}-${file.originalname}`;
        
        const uploadOptions: any = {
          folder: 'triddle/uploads',
          public_id: uniqueFilename,
          resource_type: 'auto',
          access_mode: 'public'
        };
        
        const base64File = `data:${file.mimetype};base64,${file.buffer.toString('base64')}`;
        const result = await cloudinary.uploader.upload(base64File, uploadOptions);
        
        return {
          originalName: file.originalname,
          filename: uniqueFilename,
          url: result.secure_url,
          size: file.size,
          mimetype: file.mimetype,
          cloudinaryId: result.public_id
        };
      });
      
      const uploadedFiles = await Promise.all(uploadPromises);
      
      ResponseUtils.success(res, uploadedFiles, 'Files uploaded successfully', 201);
    } catch (error) {
      console.error('Multiple file upload error:', error);
      ResponseUtils.error(res, 'Failed to upload files', 500);
    }
  }
  
  static async deleteFile(req: Request, res: Response): Promise<void> {
    try {
      const { cloudinaryId } = req.params;
      
      if (!cloudinaryId) {
        ResponseUtils.error(res, 'Cloudinary ID required', 400);
        return;
      }
      
      // Delete from Cloudinary
      await cloudinary.uploader.destroy(cloudinaryId);
      
      ResponseUtils.success(res, null, 'File deleted successfully');
    } catch (error) {
      console.error('File deletion error:', error);
      ResponseUtils.error(res, 'Failed to delete file', 500);
    }
  }
  
  // Validate file upload based on form question settings
  static validateFileUpload(
    file: Express.Multer.File,
    settings: {
      maxSize: number;
      allowedTypes: string[];
      multiple: boolean;
    }
  ): string | null {
    // Check file size
    if (file.size > settings.maxSize) {
      return `File size exceeds maximum allowed size of ${settings.maxSize / (1024 * 1024)}MB`;
    }
    
    // Check file type
    if (settings.allowedTypes.length > 0 && !settings.allowedTypes.includes(file.mimetype)) {
      return `File type ${file.mimetype} is not allowed. Allowed types: ${settings.allowedTypes.join(', ')}`;
    }
    
    return null; // No validation errors
  }
  
  static async validateAndUploadFormFile(req: Request, res: Response): Promise<void> {
    try {
      if (!req.file) {
        ResponseUtils.error(res, 'No file provided', 400);
        return;
      }
      
      // Get validation settings from request body
      const settings = {
        maxSize: parseInt(req.body.maxSize) || 10 * 1024 * 1024, // Default 10MB
        allowedTypes: req.body.allowedTypes ? JSON.parse(req.body.allowedTypes) : [],
        multiple: req.body.multiple === 'true'
      };
      
      // Validate file
      const validationError = UploadController.validateFileUpload(req.file, settings);
      if (validationError) {
        ResponseUtils.error(res, validationError, 400);
        return;
      }
      
      // Proceed with upload
      await UploadController.uploadFile(req, res);
    } catch (error) {
      console.error('Validated file upload error:', error);
      ResponseUtils.error(res, 'Failed to upload file', 500);
    }
  }
}