import React from 'react';

const ProductCardSkeleton = () => (
  <div className="bg-white rounded-lg shadow-md overflow-hidden animate-pulse">
    <div className="relative">
      <div className="bg-gray-200 h-48 w-full"></div>
      <div className="absolute top-2 right-2">
        <div className="bg-gray-300 w-6 h-6 rounded-full"></div>
      </div>
      <div className="absolute bottom-2 left-2">
        <div className="bg-gray-300 w-16 h-6 rounded-full"></div>
      </div>
    </div>
    <div className="p-4">
      <div className="bg-gray-200 h-6 w-3/4 mb-2"></div>
      <div className="bg-gray-200 h-4 w-1/2 mb-2"></div>
      <div className="bg-gray-200 h-4 w-1/3"></div>
    </div>
  </div>
);

export default ProductCardSkeleton;
