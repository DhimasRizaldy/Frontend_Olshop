import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getProductById } from '../../../../services/admin/product/services-product';
import { formatRupiah } from '../../../../utils/constants/function';
import SkeletonDetailProducts from '../../Users/Product/SkeletonProductDetails';

const DetailProducts = () => {
  const { productId } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await getProductById(productId);
        setProduct(response.data);
      } catch (error) {
        console.error('Failed to fetch product:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [productId]);

  if (loading) {
    return <SkeletonDetailProducts />; // tampilkan skeleton saat loading
  }

  if (!product) {
    return <div>Product not found</div>;
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-6 mt-1">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="flex justify-center items-center">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-auto rounded-lg shadow-md"
          />
        </div>
        <div>
          <h1 className="text-3xl font-bold mb-4">{product.name}</h1>
          <p className="text-gray-600 mb-4">{product.description}</p>
          <div className="mb-4">
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
          </div>
          <div className="flex items-center mb-4">
            {[...Array(5)].map((_, index) => (
              <svg
                key={index}
                className={`w-6 h-6 ${index < (product.ratings[0]?.rating || 0) ? 'text-yellow-500' : 'text-gray-300'} mr-1`}
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87L18.18 21 12 17.27 5.82 21 7 14.14 2 9.27l6.91-1.01L12 2z" />
              </svg>
            ))}
            <p className="text-gray-600">{product.ratings[0]?.rating || 0}/5</p>
          </div>
          <div className="mb-4">
            <p className="text-gray-700">
              <strong>Stock:</strong> {product.stock}
            </p>
            <p className="text-gray-700">
              <strong>Weight:</strong> {product.weight} grams
            </p>
            <p className="text-gray-700">
              <strong>Category:</strong>{' '}
              {product.category?.name || 'Unknown Category'}
            </p>
            <p className="text-gray-700">
              <strong>Terjual:</strong> {product.totalSold}
            </p>
            <p className="text-gray-700">
              <strong>Ulasan:</strong> {product.totalReview}
            </p>
          </div>

          <div className="border-t mt-6">
            <ul className="flex border-b">
              <li className="mr-6">
                <a
                  href="#product-details"
                  className="py-2 px-4 text-blue-600 hover:text-blue-800 border-b-2 border-transparent hover:border-blue-600"
                >
                  Detail Produk
                </a>
              </li>
              <li>
                <a
                  href="#product-reviews"
                  className="py-2 px-4 text-gray-600 hover:text-gray-800 border-b-2 border-transparent hover:border-gray-600"
                >
                  Ulasan
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div className="mt-6" id="product-reviews">
        <h2 className="text-2xl font-bold mb-4">Ulasan Produk</h2>
        {product.ratings.length === 0 ? (
          <p className="text-gray-600">Produk belum memiliki ulasan</p>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {product.ratings.map((review, index) => (
              <div
                key={index}
                className="bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300"
              >
                <div className="flex items-start gap-4">
                  <img
                    src={review.image}
                    alt={`Review ${index}`}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  <div className="flex-1">
                    <div className="mb-2">
                      <p className="text-gray-700 font-bold">
                        {review.products?.name || 'Unknown Product'}
                      </p>
                    </div>
                    <div className="flex items-center mb-2">
                      <div className="flex items-center ml-2 text-yellow-500">
                        {[...Array(5)].map((_, starIndex) => (
                          <svg
                            key={starIndex}
                            className={`w-5 h-5 ${
                              starIndex < review.rating
                                ? 'text-yellow-500'
                                : 'text-gray-300'
                            }`}
                            xmlns="http://www.w3.org/2000/svg"
                            fill="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87L18.18 21 12 17.27 5.82 21 7 14.14 2 9.27l6.91-1.01L12 2z" />
                          </svg>
                        ))}
                      </div>
                    </div>
                    <p className="text-gray-700">
                      <strong>
                        {review.users?.username || 'Unknown User'}:
                      </strong>{' '}
                      {review.review}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default DetailProducts;
