import React from 'react';
import { Move, Maximize2 } from 'lucide-react';
import { PRINT_TYPES } from '../../constants/designConfig';

const PrintTypeSelector = ({ printType, onPrintTypeChange }) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-xl font-semibold mb-4 text-gray-800">Print Type</h2>
      <div className="space-y-3">
        {PRINT_TYPES.map((type) => (
          <button
            key={type.value}
            onClick={() => onPrintTypeChange(type.value)}
            className={`w-full p-4 rounded-lg border-2 transition-all text-left ${
              printType === type.value 
                ? 'border-blue-600 bg-blue-50' 
                : 'border-gray-200 hover:border-gray-300'
            }`}
          >
            <div className="flex items-start gap-3">
              {type.value === 'regular' ? (
                <Move className={`w-5 h-5 mt-0.5 ${printType === type.value ? 'text-blue-600' : 'text-gray-400'}`} />
              ) : (
                <Maximize2 className={`w-5 h-5 mt-0.5 ${printType === type.value ? 'text-blue-600' : 'text-gray-400'}`} />
              )}
              <div className="flex-1">
                <div className={`font-semibold ${printType === type.value ? 'text-blue-600' : 'text-gray-900'}`}>
                  {type.name}
                </div>
                <div className="text-xs text-gray-500 mt-1">{type.description}</div>
              </div>
            </div>
          </button>
        ))}
      </div>
      {printType === 'aop' && (
        <div className="mt-3 p-3 bg-amber-50 border border-amber-200 rounded-lg">
          <p className="text-xs text-amber-800">
            <span className="font-semibold">Note:</span> AOP designs will cover the entire garment. 
            High-resolution images recommended (min 3000x3000px).
          </p>
        </div>
      )}
    </div>
  );
};

export default PrintTypeSelector;