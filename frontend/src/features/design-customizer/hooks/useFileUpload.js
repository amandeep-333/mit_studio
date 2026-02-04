import { useState } from 'react';
import { uploadDesignFile } from '../../../services/api';

export const useFileUpload = (onSuccess, onError) => {
  const [isUploading, setIsUploading] = useState(false);
  const [uploadedDesign, setUploadedDesign] = useState(null);
  const [uploadedFileUrl, setUploadedFileUrl] = useState(null);

  const handleFileUpload = async (file) => {
    if (!file || !file.type.startsWith('image/')) {
      onError?.('Please select a valid image file');
      return;
    }

    setIsUploading(true);

    // Read file as data URL for preview
    const reader = new FileReader();
    reader.onload = (event) => {
      setUploadedDesign(event.target.result);
    };
    reader.readAsDataURL(file);

    // Upload file to server
    try {
      const response = await uploadDesignFile(file);
      setUploadedFileUrl(response.fileUrl);
      onSuccess?.('Design uploaded successfully!');
    } catch (error) {
      console.error('Upload error:', error);
      onError?.('Error uploading design');
      setUploadedDesign(null);
    } finally {
      setIsUploading(false);
    }
  };

  const clearUpload = () => {
    setUploadedDesign(null);
    setUploadedFileUrl(null);
  };

  return {
    isUploading,
    uploadedDesign,
    uploadedFileUrl,
    handleFileUpload,
    clearUpload,
  };
};