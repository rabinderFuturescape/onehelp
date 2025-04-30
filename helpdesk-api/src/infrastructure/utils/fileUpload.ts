import { Request } from 'express';
import multer from 'multer';
import { v4 as uuidv4 } from 'uuid';
import path from 'path';
import fs from 'fs';
import { config } from '../config/env';

// Create upload directory if it doesn't exist
const uploadDir = path.resolve(process.cwd(), config.upload.path);
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

// Configure multer to use memory storage
const storage = multer.memoryStorage();

// File filter to check allowed file types
const fileFilter = (req: Request, file: Express.Multer.File, cb: multer.FileFilterCallback) => {
  const allowedTypes = config.upload.allowedTypes;
  
  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error(`File type not allowed. Allowed types: ${allowedTypes.join(', ')}`));
  }
};

// Configure multer
export const upload = multer({
  storage,
  limits: {
    fileSize: config.upload.maxSize,
  },
  fileFilter,
});

// Function to save file buffer to disk
export const saveFileBuffer = async (
  fileBuffer: Buffer,
  originalname: string,
  mimetype: string
): Promise<string> => {
  // Generate unique filename
  const extension = path.extname(originalname);
  const filename = `${uuidv4()}${extension}`;
  const filepath = path.join(uploadDir, filename);
  
  // Write buffer to file
  await fs.promises.writeFile(filepath, fileBuffer);
  
  // Return the relative path to the file
  return `${config.upload.path}/${filename}`;
};

// Function to delete file
export const deleteFile = async (filePath: string): Promise<void> => {
  const fullPath = path.resolve(process.cwd(), filePath);
  
  // Check if file exists
  if (fs.existsSync(fullPath)) {
    await fs.promises.unlink(fullPath);
  }
};

// Function to get file as buffer
export const getFileAsBuffer = async (filePath: string): Promise<Buffer> => {
  const fullPath = path.resolve(process.cwd(), filePath);
  
  // Check if file exists
  if (!fs.existsSync(fullPath)) {
    throw new Error(`File not found: ${filePath}`);
  }
  
  // Read file as buffer
  return fs.promises.readFile(fullPath);
};
