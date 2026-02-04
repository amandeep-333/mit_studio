import React from 'react';
import { PRODUCTS } from '../../../constants/designConfig';

const ProductSelector = ({ selectedProduct, onProductChange }) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-xl font-semibold mb-4 text-gray-800">Select Product</h2>
      <div className="grid grid-cols-2 gap-2">
        {PRODUCTS.map((product) => (
          <button
            key={product.value}
            onClick={() => onProductChange(product.value)}
            className={`py-3 px-4 rounded-lg text-sm font-medium transition-all ${
              selectedProduct === product.value 
                ? 'bg-blue-600 text-white shadow-md' 
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            {product.name}
          </button>
        ))}
      </div>
    </div>
  );
};

export default ProductSelector;