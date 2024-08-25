import React from 'react';

const ProductDiscount = () => {
  // Array produk contoh
  const products = [
    {
      id: 1,
      imageUrl: 'https://via.placeholder.com/300',
      nama: 'Nama Produk 1',
      hargaAsli: 'Rp 150.000',
      hargaDiskon: 'Rp 100.000',
      stok: 50,
      terjual: 10,
    },
    {
      id: 2,
      imageUrl: 'https://via.placeholder.com/300',
      nama: 'Nama Produk 2',
      hargaAsli: 'Rp 200.000',
      hargaDiskon: 'Rp 150.000',
      stok: 30,
      terjual: 5,
    },
    {
      id: 3,
      imageUrl: 'https://via.placeholder.com/300',
      nama: 'Nama Produk 3',
      hargaAsli: 'Rp 250.000',
      hargaDiskon: 'Rp 200.000',
      stok: 20,
      terjual: 8,
    },
    {
      id: 4,
      imageUrl: 'https://via.placeholder.com/300',
      nama: 'Nama Produk 4',
      hargaAsli: 'Rp 300.000',
      hargaDiskon: 'Rp 250.000',
      stok: 10,
      terjual: 12,
    },
  ];

  return (
    <div className="max-w-6xl mx-auto px-4 py-6">
      <h1 className="text-2xl font-bold mb-4">Produk Diskon</h1>

      {/* Container Produk */}
      <div className="overflow-x-auto py-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-4">
          {/* Iterasi melalui produk dan tampilkan */}
          {products.map((product) => (
            <div
              key={product.id}
              className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
            >
              <div className="relative">
                <img
                  src={product.imageUrl}
                  alt={product.nama}
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
                <h2 className="text-lg font-semibold mb-2">{product.nama}</h2>
                <p className="text-gray-500 line-through">
                  {product.hargaAsli}
                </p>
                <p className="text-red-500 font-bold">{product.hargaDiskon}</p>
                <p className="text-sm text-gray-600 mt-1">
                  Stok: {product.stok} | Terjual: {product.terjual}
                </p>
                <button className="mt-3 w-full bg-primary text-white py-2 rounded-lg flex items-center justify-center hover:bg-blue-600 transition duration-200">
                  Beli Sekarang
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Button Lihat Produk Diskon Selengkapnya */}
      <div className="text-center mt-6">
        <a
          href="#"
          className="bg-primary text-white px-6 py-2 rounded-md hover:bg-blue-700 transition duration-300"
        >
          Lihat Produk Diskon Selengkapnya
        </a>
      </div>
    </div>
  );
};

export default ProductDiscount;
