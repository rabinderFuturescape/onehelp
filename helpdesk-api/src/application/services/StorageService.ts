export interface FileInfo {
  originalname: string;
  mimetype: string;
  buffer: Buffer;
}

export interface StorageService {
  uploadFile(file: FileInfo, folder: string): Promise<string>;
  deleteFile(url: string): Promise<void>;
}
