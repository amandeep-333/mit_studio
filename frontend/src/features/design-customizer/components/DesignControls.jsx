import React from 'react';
import { ZoomIn, ZoomOut, RotateCw, Trash2, Save, Download, Loader } from 'lucide-react';

const DesignControls = ({ 
  designSize, 
  onSizeChange, 
  onRotation, 
  onReset, 
  onSave, 
  onDownload, 
  isSaving,
  printType,
  selectedProduct,
  hasDesign 
}) => {
  if (!hasDesign) return null;

  return (
    <>
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-semibold mb-4 text-gray-800">
          {printType === 'aop' ? 'Pattern Settings' : 'Adjust Design'}
        </h2>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {printType === 'aop' ? 'Pattern Scale' : 'Size'}: {designSize}%
            </label>
            <div className="flex gap-2">
              <button
                onClick={() => onSizeChange(-5)}
                className="flex-1 flex items-center justify-center gap-2 py-2 px-4 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
              >
                <ZoomOut className="w-4 h-4" />
                Smaller
              </button>
              <button
                onClick={() => onSizeChange(5)}
                className="flex-1 flex items-center justify-center gap-2 py-2 px-4 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
              >
                <ZoomIn className="w-4 h-4" />
                Larger
              </button>
            </div>
          </div>
          <button
            onClick={onRotation}
            className="w-full flex items-center justify-center gap-2 py-2 px-4 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
          >
            <RotateCw className="w-4 h-4" />
            Rotate 90°
          </button>
          <button
            onClick={onReset}
            className="w-full flex items-center justify-center gap-2 py-2 px-4 bg-red-50 hover:bg-red-100 text-red-600 rounded-lg transition-colors"
          >
            <Trash2 className="w-4 h-4" />
            Reset Position
          </button>
          {printType === 'aop' && (
            <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
              <p className="text-xs text-blue-800">
                Your pattern will repeat across the entire {selectedProduct}. 
                Adjust scale and position for the perfect look!
              </p>
            </div>
          )}
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="space-y-3">
          <button
            onClick={onSave}
            disabled={isSaving}
            className="w-full flex items-center justify-center gap-2 py-3 px-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-colors disabled:opacity-50"
          >
            {isSaving ? (
              <>
                <Loader className="w-5 h-5 animate-spin" />
                Saving...
              </>
            ) : (
              <>
                <Save className="w-5 h-5" />
                Save & Add to Cart
              </>
            )}
          </button>
          <button
            onClick={onDownload}
            className="w-full flex items-center justify-center gap-2 py-3 px-4 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-lg transition-colors"
          >
            <Download className="w-5 h-5" />
            Download Design
          </button>
        </div>
      </div>
    </>
  );
};

export default DesignControls;