import { storage } from '@/lib/firebase';
import { ref, uploadBytes, getDownloadURL, deleteObject, StorageReference } from 'firebase/storage';

export interface StoredFileData {
  url: string;
  fileName: string;
  uploadedAt: Date;
}

class FirebaseStorageService {
  private static instance: FirebaseStorageService;

  static getInstance(): FirebaseStorageService {
    if (!FirebaseStorageService.instance) {
      FirebaseStorageService.instance = new FirebaseStorageService();
    }
    return FirebaseStorageService.instance;
  }

  // Upload a file to Firebase Storage
  async uploadFile(
    folder: string, 
    fileName: string,
    file: File
  ): Promise<StoredFileData> {
    try {
      console.log('Starting file upload:', { folder, fileName, fileSize: file.size });
      
      // Create a reference to the file location
      const storageRef = ref(storage, `${folder}/${fileName}`);
      console.log('Storage reference created:', storageRef.fullPath);
      
      // Upload the file
      const snapshot = await uploadBytes(storageRef, file);
      console.log('File uploaded successfully:', snapshot.ref.fullPath);
      
      // Get the download URL
      const downloadURL = await getDownloadURL(snapshot.ref);
      console.log('Download URL obtained:', downloadURL);
      
      return {
        url: downloadURL,
        fileName: fileName,
        uploadedAt: new Date()
      };
    } catch (error) {
      console.error('Error uploading file:', error);
      console.error('Error details:', JSON.stringify(error, null, 2));
      throw new Error('Failed to upload file to Firebase Storage');
    }
  }

  // Get download URL for a file
  async getFileDownloadURL(folder: string, fileName: string): Promise<string | null> {
    try {
      const storageRef = ref(storage, `${folder}/${fileName}`);
      return await getDownloadURL(storageRef);
    } catch (error) {
      console.error('Error getting download URL:', error);
      return null;
    }
  }

  // Delete a file from Firebase Storage
  async deleteFile(folder: string, fileName: string): Promise<boolean> {
    try {
      const storageRef = ref(storage, `${folder}/${fileName}`);
      await deleteObject(storageRef);
      return true;
    } catch (error) {
      console.error('Error deleting file:', error);
      return false;
    }
  }

  // Upload passport photo for mini tournament registration
  async uploadPassportPhoto(
    file: File, 
    registrationId: string
  ): Promise<StoredFileData> {
    console.log('Uploading passport photo:', { 
      fileName: file.name, 
      fileSize: file.size, 
      fileType: file.type,
      registrationId 
    });
    
    const fileName = `${registrationId}_passport_photo.jpg`;
    return this.uploadFile('passport-photos', fileName, file);
  }

  // Get passport photo URL
  async getPassportPhotoURL(registrationId: string): Promise<string | null> {
    const fileName = `${registrationId}_passport_photo.jpg`;
    return this.getFileDownloadURL('passport-photos', fileName);
  }

  // Delete passport photo
  async deletePassportPhoto(registrationId: string): Promise<boolean> {
    const fileName = `${registrationId}_passport_photo.jpg`;
    return this.deleteFile('passport-photos', fileName);
  }

  // Download file (creates download link)
  downloadFile(url: string, fileName: string): void {
    const link = document.createElement('a');
    link.href = url;
    link.download = fileName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }
}

export default FirebaseStorageService.getInstance();
