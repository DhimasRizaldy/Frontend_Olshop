import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getProduct } from '../../../../services/admin/product/services-product';
import { formatRupiah } from '../../../../utils/constants/function';

const ProductDiscount = () => {
  const [products, setProducts] = useState([]); // State untuk menyimpan produk
  const [loading, setLoading] = useState(true); // State untuk mengelola status loading

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await getProduct(); // Mengambil data produk dari API
        const productsData = response.data; // Asumsikan data produk ada di response.data

        // Filter produk yang memiliki promoPrice lebih besar dari 0
        const discountedProducts = productsData.filter(
          (product) => product.promoPrice > 0,
        );

        // Membatasi hanya 4 produk saja yang ditampilkan
        setProducts(discountedProducts.slice(0, 12));
      } catch (error) {
        console.error('Error fetching products:', error);
      } finally {
        setLoading(false); // Set loading ke false setelah data dimuat atau jika terjadi error
      }
    };

    fetchProducts();
  }, []);

  return (
    <div className="max-w-6xl mx-auto px-4 py-6">
      <h1 className="text-2xl font-bold mb-4">Produk Diskon</h1>

      {/* Container Produk */}
      <div className="overflow-x-auto py-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-4">
          {/* Tampilkan skeleton loading jika sedang memuat data */}
          {loading
            ? Array.from({ length: 8 }).map((_, index) => (
                <div
                  key={index}
                  className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
                >
                  <div className="relative animate-pulse">
                    <div className="bg-gray-300 w-full h-48 object-cover"></div>
                    <div className="absolute top-2 right-2 bg-gray-300 rounded-full w-6 h-6"></div>
                  </div>
                  <div className="p-4">
                    <div className="h-4 bg-gray-300 rounded mb-2"></div>
                    <div className="h-4 bg-gray-300 rounded w-1/2 mb-2"></div>
                    <div className="h-4 bg-gray-300 rounded w-1/4 mb-2"></div>
                    <div className="h-8 bg-gray-300 rounded mt-4"></div>
                  </div>
                </div>
              ))
            : // Iterasi melalui produk diskon dan tampilkan
              products.map((product) => {
                const roundedRating = Math.round(product.averageRating);
                return (
                  <Link
                    key={product.productId} // Tambahkan key disini untuk menghindari warning pada console
                    to={`/details-products/${product.productId}`}
                    className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
                  >
                    <div className="relative">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-48 object-cover"
                      />
                      <div className="absolute bottom-2 left-2">
                        <span className="bg-yellow-500 px-2 py-1 text-xs rounded-full text-white">
                          {roundedRating}★
                        </span>
                      </div>
                    </div>
                    <div className="p-4">
                      <h2 className="text-lg font-semibold mb-2">
                        {product.name.length > 20
                          ? product.name.substring(0, 20) + '...'
                          : product.name}
                      </h2>
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
                        <p className="text-gray-500 font-bold">
                          {formatRupiah(product.price)}
                        </p>
                      )}
                      <p className="text-sm text-gray-600 mt-1">
                        Stok: {product.stock}
                      </p>
                      <div className="flex mt-1">
                        <p className="text-sm text-gray-600">
                          Terjual : {product.totalSold}
                        </p>{' '}
                        &nbsp;
                        <p className="text-sm text-gray-600">
                          Ulasan : {product.totalReview}
                        </p>
                      </div>
                      <button className="mt-3 w-full bg-primary text-white py-2 rounded-lg flex items-center justify-center hover:bg-blue-600 transition duration-200">
                        Beli Sekarang
                      </button>
                    </div>
                  </Link>
                );
              })}
        </div>
      </div>

      {/* Button Lihat Produk Diskon Selengkapnya */}
      <div className="text-center mt-6">
        <Link
          to={'/products'}
          className="bg-primary text-white px-6 py-2 rounded-md hover:bg-blue-700 transition duration-300"
        >
          Lihat Produk Diskon Selengkapnya
        </Link>
      </div>
    </div>
  );
};

export default ProductDiscount;
