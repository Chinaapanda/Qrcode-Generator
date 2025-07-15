import { useRef, useState } from "react";

interface UseFileUploadOptions {
  onFileSelect: (file: File, dataUrl: string) => void;
  onFileRemove?: () => void;
}

export const useFileUpload = ({
  onFileSelect,
  onFileRemove,
}: UseFileUploadOptions) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [fileDataUrl, setFileDataUrl] = useState<string | null>(null);

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const dataUrl = e.target?.result as string;
        setFileDataUrl(dataUrl);
        onFileSelect(file, dataUrl);
      };
      reader.readAsDataURL(file);
    }
  };

  const removeFile = () => {
    setFileDataUrl(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
    onFileRemove?.();
  };

  const triggerFileUpload = () => {
    fileInputRef.current?.click();
  };

  return {
    fileInputRef,
    fileDataUrl,
    handleFileUpload,
    removeFile,
    triggerFileUpload,
  };
};
