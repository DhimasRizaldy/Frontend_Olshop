import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css'; // Import CSS untuk skeleton loader
import { getProduct } from '../../../../services/admin/product/services-product';
import { formatRupiah } from '../../../../utils/constants/function';

const ProductCardSkeleton = () => (
  <div className="bg-white rounded-lg shadow-md overflow-hidden">
    <Skeleton height={192} width="100%" /> {/* Skeleton untuk gambar produk */}
    <div className="p-4">
      <Skeleton height={20} width="60%" className="mb-2" />{' '}
      {/* Skeleton untuk nama produk */}
      <Skeleton height={20} width="50%" className="mb-1" />{' '}
      {/* Skeleton untuk harga asli */}
      <Skeleton height={20} width="40%" /> {/* Skeleton untuk harga promo */}
      <Skeleton height={20} width="50%" className="mt-1" />{' '}
      {/* Skeleton untuk stok */}
      <Skeleton height={36} width="100%" className="mt-3" />{' '}
      {/* Skeleton untuk tombol "Beli Sekarang" */}
    </div>
  </div>
);

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

const ProductNew = ({ searchTerm }) => {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true); // State untuk melacak status pemuatan data

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await getProduct(); // Asumsikan ini adalah fungsi yang mengambil data dari API
        const filteredProducts = searchTerm
          ? response.data.filter((product) =>
              product.name.toLowerCase().includes(searchTerm.toLowerCase()),
            )
          : response.data;

        const limitedProducts = filteredProducts.slice(0, 8); // Batasi produk menjadi hanya 8 item
        setProducts(limitedProducts); // Menggunakan data produk dari response API
      } catch (error) {
        console.error('Error fetching products:', error);
      } finally {
        setIsLoading(false); // Set loading menjadi false setelah data diambil atau terjadi error
      }
    };

    fetchProducts();
  }, [searchTerm]); // Tambahkan searchTerm sebagai dependensi

  return (
    <>
      <div className="max-w-6xl mx-auto px-4 py-6">
        <h1 className="text-2xl font-bold mb-4">Produk Terbaru</h1>
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {isLoading
            ? Array.from({ length: 8 }, (_, index) => (
                <ProductCardSkeleton key={index} /> // Tampilkan skeleton loader jika sedang memuat
              ))
            : products.map((product) => (
                <ProductCard key={product.productId} product={product} />
              ))}
        </div>
      </div>
      {/* button selengkapnya */}
      <div className="text-center mt-6">
        <Link
          to={'/products'}
          className="bg-primary text-white px-6 py-2 rounded-md hover:bg-blue-700 transition duration-300"
        >
          Lihat Produk Terbaru Selengkapnya
        </Link>
      </div>
    </>
  );
};

export default ProductNew;
