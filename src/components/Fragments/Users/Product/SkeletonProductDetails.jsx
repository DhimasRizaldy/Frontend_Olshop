import React from 'react';

const SkeletonProductDetails = () => {
  return (
    <div className="max-w-6xl mx-auto px-4 py-6 mt-12">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="flex justify-center items-center">
          <div className="w-full h-64 bg-gray-200 rounded-lg shadow-md animate-pulse"></div>
        </div>
        <div>
          <div className="h-8 bg-gray-200 rounded mb-4 animate-pulse"></div>
          <div className="h-4 bg-gray-200 rounded mb-4 animate-pulse w-3/4"></div>
          <div className="h-4 bg-gray-200 rounded mb-4 animate-pulse w-1/2"></div>
          <div className="h-4 bg-gray-200 rounded mb-4 animate-pulse w-1/4"></div>
          <div className="h-4 bg-gray-200 rounded mb-4 animate-pulse w-3/4"></div>
          <div className="flex items-center mb-4">
            {[...Array(5)].map((_, index) => (
              <svg
                key={index}
                className="w-6 h-6 text-gray-300 mr-1 animate-pulse"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87L18.18 21 12 17.27 5.82 21 7 14.14 2 9.27l6.91-1.01L12 2z" />
              </svg>
            ))}
          </div>
          <div className="mb-4">
            <div className="h-4 bg-gray-200 rounded mb-2 animate-pulse w-1/2"></div>
            <div className="h-4 bg-gray-200 rounded mb-2 animate-pulse w-1/3"></div>
            <div className="h-4 bg-gray-200 rounded mb-2 animate-pulse w-1/4"></div>
          </div>
          <div className="h-10 bg-gray-200 rounded mb-4 animate-pulse w-1/4"></div>
          <div className="border-t mt-6">
            <ul className="flex border-b">
              <li className="mr-6">
                <div className="h-6 bg-gray-200 rounded mb-2 animate-pulse w-24"></div>
              </li>
              <li>
                <div className="h-6 bg-gray-200 rounded mb-2 animate-pulse w-24"></div>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div className="mt-6" id="product-reviews">
        <h2 className="text-2xl font-bold mb-4 h-8 bg-gray-200 rounded animate-pulse w-1/4"></h2>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {[...Array(3)].map((_, index) => (
            <div
              key={index}
              className="bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300"
            >
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-gray-200 rounded-full animate-pulse"></div>
                <div className="flex-1">
                  <div className="h-4 bg-gray-200 rounded mb-2 animate-pulse w-3/4"></div>
                  <div className="flex items-center mb-2">
                    {[...Array(5)].map((_, starIndex) => (
                      <svg
                        key={starIndex}
                        className="w-5 h-5 text-gray-300"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87L18.18 21 12 17.27 5.82 21 7 14.14 2 9.27l6.91-1.01L12 2z" />
                      </svg>
                    ))}
                  </div>
                  <div className="h-4 bg-gray-200 rounded mb-2 animate-pulse w-3/4"></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SkeletonProductDetails;
