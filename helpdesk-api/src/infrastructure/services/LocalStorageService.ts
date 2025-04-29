import fs from 'fs';
import path from 'path';
import { promisify } from 'util';
import { StorageService, FileInfo } from '../../application/services/StorageService';

const writeFileAsync = promisify(fs.writeFile);
const unlinkAsync = promisify(fs.unlink);
const mkdirAsync = promisify(fs.mkdir);

export class LocalStorageService implements StorageService {
  private readonly uploadDir: string;
  private readonly baseUrl: string;

  constructor() {
    this.uploadDir = path.join(process.cwd(), 'uploads');
    this.baseUrl = 'http://localhost:3000/uploads';
    this.ensureUploadDirExists();
  }

  private async ensureUploadDirExists(): Promise<void> {
    try {
      await mkdirAsync(this.uploadDir, { recursive: true });
    } catch (error) {
      console.error('Error creating upload directory:', error);
    }
  }

  async uploadFile(file: FileInfo, folder: string): Promise<string> {
    const folderPath = path.join(this.uploadDir, folder);
    await mkdirAsync(folderPath, { recursive: true });

    const fileName = `${Date.now()}-${file.originalname.replace(/\s+/g, '-')}`;
    const filePath = path.join(folderPath, fileName);

    await writeFileAsync(filePath, file.buffer);

    return `${this.baseUrl}/${folder}/${fileName}`;
  }

  async deleteFile(url: string): Promise<void> {
    const fileUrl = new URL(url);
    const relativePath = fileUrl.pathname;
    const filePath = path.join(process.cwd(), relativePath);

    try {
      await unlinkAsync(filePath);
    } catch (error) {
      console.error('Error deleting file:', error);
      throw error;
    }
  }
}
