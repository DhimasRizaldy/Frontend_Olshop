import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import { formatRupiah } from '../../../../utils/constants/function';

// Skeleton component for loading state
const SkeletonCard = () => (
  <div className="bg-white rounded-lg shadow-md overflow-hidden animate-pulse">
    <div className="relative bg-gray-300 h-48"></div>
    <div className="p-4">
      <div className="h-4 bg-gray-300 rounded mb-2"></div>
      <div className="h-4 bg-gray-300 rounded w-1/2 mb-2"></div>
      <div className="h-6 bg-gray-300 rounded w-1/3 mb-2"></div>
      <div className="h-4 bg-gray-300 rounded w-3/4 mb-2"></div>
      <div className="h-8 bg-gray-300 rounded mt-3"></div>
    </div>
  </div>
);

// Fetch products based on categoryId
const fetchProductsByCategory = async (categoryId) => {
  // console.log(`Fetching products for categoryId: ${categoryId}`);
  const response = await axios.get(
    `https://backend-olshop.vercel.app/api/v1/product?category=${categoryId}`,
  );
  // console.log('Products fetched:', response.data.data);
  return response.data.data;
};

const ProductCard = ({ product }) => (
  <Link
    to={`/details-products/${product.productId}`}
    className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
  >
    <div className="relative">
      <img
        src={product.image}
        alt={product.name}
        className="w-full h-48 object-cover"
      />
      <div className="absolute top-2 right-2">
        <svg
          className="w-6 h-6 text-gray-700"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M4.318 6.318a4.5 4.5 0 016.364 0l.318.318.318-.318a4.5 4.5 0 016.364 6.364l-6.682 6.682a.75.75 0 01-1.06 0l-6.682-6.682a4.5 4.5 0 010-6.364z"
          />
        </svg>
      </div>
      <div className="absolute bottom-2 left-2">
        <span className="bg-yellow-500 px-2 py-1 text-xs rounded-full text-white">
          {product.averageRating}★
        </span>
      </div>
    </div>
    <div className="p-4">
      <h2 className="text-lg font-semibold mb-2">{product.name}</h2>
      {product.promoPrice > 0 ? (
        <>
          <p className="text-gray-500 line-through">
            {formatRupiah(product.price)}
          </p>
          <p className="text-red-500 font-bold">
            {formatRupiah(product.promoPrice)}
          </p>
        </>
      ) : (
        <p className="text-gray-500 font-bold">{formatRupiah(product.price)}</p>
      )}
      <p className="text-sm text-gray-600 mt-1">Stok: {product.stock}</p>
      <button className="mt-3 w-full bg-primary text-white py-2 rounded-lg flex items-center justify-center hover:bg-blue-600 transition duration-200">
        Beli Sekarang
      </button>
    </div>
  </Link>
);

const ProductCategory = () => {
  const { categoryId } = useParams(); // Get the categoryId from URL
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [noData, setNoData] = useState(false);

  useEffect(() => {
    const loadProducts = async () => {
      // console.log(`Category ID from URL: ${categoryId}`);
      try {
        const productsData = await fetchProductsByCategory(categoryId);
        // console.log('Products data:', productsData);
        setProducts(productsData);
        setNoData(productsData.length === 0);
      } catch (error) {
        console.error('Failed to fetch products', error);
      } finally {
        setLoading(false);
      }
    };

    loadProducts();
  }, [categoryId]);

  if (loading)
    return (
      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {[...Array(4)].map((_, index) => (
          <SkeletonCard key={index} />
        ))}
      </div>
    );

  return (
    <>
      <div className="max-w-6xl mx-auto px-4 py-6 mt-12">
        <h1 className="text-2xl font-bold text-center text-gray-800 mb-8">
          Product category
        </h1>
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {noData ? (
              <p className="text-center text-gray-500">No products found</p>
            ) : (
              products.map((product) => (
                <ProductCard key={product.productId} product={product} />
              ))
            )}
          </div>
      </div>
    </>
  );
};

export default ProductCategory;