import React from 'react';

const SkeletonPromo = () => {
  return (
    <div className="bg-white shadow-md rounded-lg p-4 border-l-4 border-gray-300 animate-pulse">
      <div className="h-6 bg-gray-300 rounded w-1/2 mb-4"></div>
      <div className="h-4 bg-gray-300 rounded w-3/4 mb-4"></div>
      <div className="h-4 bg-gray-300 rounded w-2/4 mb-4"></div>
      <div className="h-4 bg-gray-300 rounded w-1/3"></div>
    </div>
  );
};

export default SkeletonPromo;
