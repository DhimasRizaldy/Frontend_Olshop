import React from 'react';

// Dummy data for product details and reviews
const product = {
  name: 'Nama Produk',
  description:
    'Deskripsi singkat produk yang menjelaskan fitur utama dan keunggulan dari produk ini.',
  price: 150000,
  originalPrice: 200000,
  rating: 4.5,
  imageUrl: 'https://via.placeholder.com/600x600',
  reviews: [
    {
      userName: 'Nama Pengguna',
      userImage: 'https://via.placeholder.com/50',
      comment:
        'Komentar ulasan pengguna yang memberikan feedback tentang produk ini. Komentar ini memberikan informasi tambahan tentang pengalaman pengguna dengan produk.',
      rating: 4,
    },
    // Add more reviews as needed
  ],
};

const ProductDetails = () => {
  return (
    <div className="max-w-6xl mx-auto px-4 py-6 mt-12">
      {/* Detail Produk */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Gambar Produk */}
        <div className="flex justify-center items-center">
          <img
            src={product.imageUrl}
            alt={product.name}
            className="w-full h-auto rounded-lg shadow-md"
          />
        </div>

        {/* Informasi Produk */}
        <div>
          <h1 className="text-3xl font-bold mb-4">{product.name}</h1>
          <p className="text-gray-600 mb-4">{product.description}</p>

          <div className="mb-4">
            <p className="text-xl font-bold text-red-500">
              Rp {product.price.toLocaleString()}
            </p>
            <p className="text-gray-500 line-through">
              Rp {product.originalPrice.toLocaleString()}
            </p>
          </div>

          <div className="flex items-center mb-4">
            {/* Star rating */}
            {[...Array(5)].map((_, index) => (
              <svg
                key={index}
                className={`w-6 h-6 ${index < product.rating ? 'text-yellow-500' : 'text-gray-300'} mr-1`}
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87L18.18 21 12 17.27 5.82 21 7 14.14 2 9.27l6.91-1.01L12 2z" />
              </svg>
            ))}
            <p className="text-gray-600">{product.rating}/5</p>
          </div>

          <div className="mb-4">
            <button className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition duration-300">
              Tambah ke Keranjang
            </button>
          </div>

          {/* Tab Detail dan Ulasan */}
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

      {/* Ulasan Produk */}
      <div className="mt-6" id="product-reviews">
        <h2 className="text-2xl font-bold mb-4">Ulasan Produk</h2>

        <div className="space-y-6">
          {product.reviews.map((review, index) => (
            <div key={index} className="flex items-start gap-4">
              <img
                src={review.userImage}
                alt={review.userName}
                className="w-12 h-12 rounded-full object-cover"
              />
              <div>
                <div className="flex items-center mb-2">
                  <h3 className="font-semibold mr-2">{review.userName}</h3>
                  <div className="flex items-center text-yellow-500">
                    {[...Array(5)].map((_, starIndex) => (
                      <svg
                        key={starIndex}
                        className={`w-5 h-5 ${starIndex < review.rating ? 'text-yellow-500' : 'text-gray-300'}`}
                        xmlns="http://www.w3.org/2000/svg"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87L18.18 21 12 17.27 5.82 21 7 14.14 2 9.27l6.91-1.01L12 2z" />
                      </svg>
                    ))}
                  </div>
                </div>
                <p className="text-gray-600">{review.comment}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
