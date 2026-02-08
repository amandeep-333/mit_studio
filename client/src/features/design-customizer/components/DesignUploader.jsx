import React from 'react';
import { Upload, Loader } from 'lucide-react';

const DesignUploader = ({ onFileUpload, isUploading }) => {
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      onFileUpload(file);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-xl font-semibold mb-4 text-gray-800">Upload Your Design</h2>
      <label className="flex flex-col items-center justify-center w-full h-40 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-blue-500 transition-colors">
        <div className="flex flex-col items-center justify-center pt-5 pb-6">
          {isUploading ? (
            <>
              <Loader className="w-10 h-10 mb-3 text-blue-500 animate-spin" />
              <p className="text-sm text-gray-500">Uploading...</p>
            </>
          ) : (
            <>
              <Upload className="w-10 h-10 mb-3 text-gray-400" />
              <p className="mb-2 text-sm text-gray-500">
                <span className="font-semibold">Click to upload</span> or drag and drop
              </p>
              <p className="text-xs text-gray-500">PNG, JPG, SVG (MAX. 5MB)</p>
            </>
          )}
        </div>
        <input 
          type="file" 
          className="hidden" 
          accept="image/*" 
          onChange={handleFileChange} 
          disabled={isUploading} 
        />
      </label>
    </div>
  );
};

export default DesignUploader;