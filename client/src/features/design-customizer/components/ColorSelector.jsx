import React from 'react';
import { TSHIRT_COLORS } from '@/constants/designConfig.js';
const ColorSelector = ({ selectedColor, onColorChange, printType }) => {
  if (printType !== 'regular') return null;

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-xl font-semibold mb-4 text-gray-800">Choose Color</h2>
      <div className="flex gap-3 flex-wrap">
        {TSHIRT_COLORS.map((color) => (
          <button
            key={color.value}
            onClick={() => onColorChange(color.value)}
            className={`w-12 h-12 rounded-full border-4 transition-all ${
              selectedColor === color.value 
                ? 'border-blue-600 scale-110' 
                : 'border-gray-300 hover:border-gray-400'
            }`}
            style={{ backgroundColor: color.hex }}
            title={color.name}
          />
        ))}
      </div>
    </div>
  );
};

export default ColorSelector;