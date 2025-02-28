import { useState } from 'react';

interface ImageUploadHook {
  selectedImage: any | null;
  filePreview: string | null;
  handleFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  setImageData: (data: any) => void;
}

export const useImageUpload = (initialImageUrl?: string): ImageUploadHook => {
  const [selectedImage, setSelectedImage] = useState<any | null>(
    initialImageUrl ? { url: initialImageUrl } : null
  );
  const [filePreview, setFilePreview] = useState<string | null>(initialImageUrl || null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      
      // Create a preview URL
      const reader = new FileReader();
      reader.onload = () => {
        setFilePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
      
      // Set selectedImage to maintain compatibility with the existing code
      setSelectedImage({
        name: file.name,
        url: URL.createObjectURL(file),
        size: file.size
      });
    }
  };

  const setImageData = (data: any) => {
    setSelectedImage(data);
    if (data && data.url) {
      setFilePreview(data.url);
    }
  };

  return {
    selectedImage,
    filePreview,
    handleFileChange,
    setImageData
  };
}; 