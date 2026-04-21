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
    const url = await this.getFileDownloadURL('passport-photos', fileName);
    
    // Modify URL to force download behavior
    if (url && url.includes('firebasestorage.googleapis.com')) {
      // Remove existing download parameter if any
      const baseUrl = url.split('?')[0];
      // Add alt=media and download parameters
      return `${baseUrl}?alt=media&download=1`;
    }
    
    return url;
  }

  // Delete passport photo
  async deletePassportPhoto(registrationId: string): Promise<boolean> {
    const fileName = `${registrationId}_passport_photo.jpg`;
    return this.deleteFile('passport-photos', fileName);
  }

  // Upload student ID document for college/MOBA tournament registration
  async uploadStudentIdDocument(
    file: File, 
    registrationId: string
  ): Promise<StoredFileData> {
    console.log('Uploading student ID document:', { 
      fileName: file.name, 
      fileSize: file.size, 
      fileType: file.type,
      registrationId 
    });
    
    // Get file extension
    const fileExtension = file.name.split('.').pop() || 'pdf';
    const fileName = `${registrationId}_student_id.${fileExtension}`;
    return this.uploadFile('student-ids', fileName, file);
  }

  // Get student ID document URL
  async getStudentIdDocumentURL(registrationId: string): Promise<string | null> {
    // Try common file extensions
    const extensions = ['pdf', 'jpg', 'jpeg', 'png'];
    
    for (const ext of extensions) {
      const fileName = `${registrationId}_student_id.${ext}`;
      const url = await this.getFileDownloadURL('student-ids', fileName);
      if (url) {
        // Modify URL to force download behavior
        if (url.includes('firebasestorage.googleapis.com')) {
          // Remove existing download parameter if any
          const baseUrl = url.split('?')[0];
          // Add alt=media and download parameters
          return `${baseUrl}?alt=media&download=1`;
        }
        return url;
      }
    }
    
    return null;
  }

  // Delete student ID document
  async deleteStudentIdDocument(registrationId: string): Promise<boolean> {
    // Try to delete with common file extensions
    const extensions = ['pdf', 'jpg', 'jpeg', 'png'];
    
    for (const ext of extensions) {
      const fileName = `${registrationId}_student_id.${ext}`;
      const deleted = await this.deleteFile('student-ids', fileName);
      if (deleted) {
        return true;
      }
    }
    
    return false;
  }

  // Download file (fetches blob and creates download link)
  async downloadFile(url: string, fileName: string): Promise<void> {
    try {
      console.log('Attempting to download file:', { url, fileName });

      // Fetch the file as a blob to handle cross-origin downloads
      const response = await fetch(url, { mode: 'cors' });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const blob = await response.blob();
      const blobUrl = window.URL.createObjectURL(blob);

      // Create download link using blob URL (same-origin, so download attribute works)
      const link = document.createElement('a');
      link.href = blobUrl;
      link.download = fileName;
      link.style.display = 'none';

      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      // Clean up the blob URL
      window.URL.revokeObjectURL(blobUrl);

      console.log('Download initiated for:', fileName);

    } catch (error) {
      console.error('Download error:', error);
      alert('Download failed. Please try again.');
    }
  }

  // Helper method to convert blob to data URL
  private async blobToDataURL(blob: Blob): Promise<string> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = reject;
      reader.readAsDataURL(blob);
    });
  }
}

export default FirebaseStorageService.getInstance();
