// Simple file storage utility for passport photos
// In a real implementation, this would use a proper file storage service

interface StoredFile {
  id: string;
  fileName: string;
  base64Data: string;
  uploadedAt: Date;
}

class FileStorage {
  private static instance: FileStorage;
  private files: Map<string, StoredFile> = new Map();

  static getInstance(): FileStorage {
    if (!FileStorage.instance) {
      FileStorage.instance = new FileStorage();
    }
    return FileStorage.instance;
  }

  // Store a file and return its ID
  storeFile(id: string, fileName: string, base64Data: string): string {
    const file: StoredFile = {
      id,
      fileName,
      base64Data,
      uploadedAt: new Date()
    };
    
    this.files.set(id, file);
    return id;
  }

  // Retrieve a file by ID
  getFile(id: string): StoredFile | null {
    return this.files.get(id) || null;
  }

  // Get all files
  getAllFiles(): StoredFile[] {
    return Array.from(this.files.values());
  }

  // Delete a file
  deleteFile(id: string): boolean {
    return this.files.delete(id);
  }

  // Download file (creates download link)
  downloadFile(id: string): void {
    const file = this.getFile(id);
    if (!file) {
      console.error('File not found:', id);
      return;
    }

    // Create download link
    const link = document.createElement('a');
    link.href = file.base64Data;
    link.download = file.fileName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }

  // Get file URL for display
  getFileUrl(id: string): string | null {
    const file = this.getFile(id);
    return file ? file.base64Data : null;
  }
}

export default FileStorage.getInstance();
