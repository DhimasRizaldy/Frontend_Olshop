import React from 'react';

// Data produk yang bisa diambil dari API atau file data
const products = [
  {
    id: 1,
    imageUrl: 'https://via.placeholder.com/300',
    name: 'Nama Produk 1',
    originalPrice: 150000,
    discountedPrice: 100000,
    stock: 50,
    sold: 10,
  },
  {
    id: 2,
    imageUrl: 'https://via.placeholder.com/300',
    name: 'Nama Produk 2',
    originalPrice: 250000,
    discountedPrice: 200000,
    stock: 20,
    sold: 15,
  },
  // Tambahkan produk lainnya di sini...
];

const ProductCard = ({ product }) => (
  <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
    <div className="relative">
      <img
        src={product.imageUrl}
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
    </div>
    <div className="p-4">
      <h2 className="text-lg font-semibold mb-2">{product.name}</h2>
      <p className="text-gray-500 line-through">
        Rp {product.originalPrice.toLocaleString('id-ID')}
      </p>
      <p className="text-red-500 font-bold">
        Rp {product.discountedPrice.toLocaleString('id-ID')}
      </p>
      <p className="text-sm text-gray-600 mt-1">
        Stok: {product.stock} | Terjual: {product.sold}
      </p>
      <button className="mt-3 w-full bg-primary text-white py-2 rounded-lg flex items-center justify-center hover:bg-blue-600 transition duration-200">
        Beli Sekarang
      </button>
    </div>
  </div>
);

const ProductNew = () => {
  return (
    <>
      <div class="max-w-6xl mx-auto px-4 py-6">
        <h1 class="text-2xl font-bold mb-4">Produk Terbaru</h1>
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
      {/* button selengkapnya */}
      <div className="text-center mt-6">
        <a
          href="#"
          className="bg-primary text-white px-6 py-2 rounded-md hover:bg-blue-700 transition duration-300"
        >
          Lihat Produk Terbaru Selengkapnya
        </a>
      </div>
    </>
  );
};

export default ProductNew;
