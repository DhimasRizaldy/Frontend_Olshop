import React, { useState } from 'react';

// Contoh data kategori dan produk
const categories = ['Electronics', 'Fashion', 'Home Appliances'];
const products = [
  {
    id: 1,
    name: 'Nama Produk 1',
    price: 100000,
    originalPrice: 150000,
    stock: 50,
    sold: 10,
    image: 'https://via.placeholder.com/300',
  },
  {
    id: 2,
    name: 'Nama Produk 2',
    price: 150000,
    originalPrice: 200000,
    stock: 20,
    sold: 5,
    image: 'https://via.placeholder.com/300',
  },
  // Tambahkan lebih banyak produk sesuai kebutuhan
];

const ProductFilter = () => {
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [priceRange, setPriceRange] = useState([0, 1000000]);
  const [rating, setRating] = useState(null);

  const handleCategoryChange = (category) => {
    setSelectedCategories((prev) =>
      prev.includes(category)
        ? prev.filter((c) => c !== category)
        : [...prev, category],
    );
  };

  const handlePriceChange = (event) => {
    const value = Number(event.target.value);
    setPriceRange([0, value]);
  };

  const handleRatingChange = (rating) => {
    setRating(rating);
  };

  const filteredProducts = products.filter((product) => {
    const inPriceRange =
      product.price >= priceRange[0] && product.price <= priceRange[1];
    // Tambahkan filter untuk kategori dan rating jika diperlukan
    return inPriceRange;
  });

  return (
    <div className="max-w-6xl mx-auto px-4 py-6 mt-12">
      <div className="flex flex-col md:flex-row">
        {/* Sidebar Filter */}
        <button
          onClick={() =>
            document.getElementById('filter-section').classList.toggle('hidden')
          }
          className="md:hidden bg-blue-500 text-white py-2 px-4 rounded-lg mb-4"
        >
          Filter
        </button>

        {/* Sidebar Filter */}
        <div
          id="filter-section"
          className="w-full md:w-1/4 bg-white p-4 rounded-lg shadow-md mb-4 md:mb-0 md:mr-6 hidden md:block"
        >
          <h2 className="text-xl font-semibold mb-4">Filter</h2>
          {/* Filter by Category */}
          <div className="mb-4">
            <h3 className="text-lg font-medium mb-2">Category</h3>
            <div className="space-y-2">
              {categories.map((category) => (
                <label key={category} className="flex items-center">
                  <input
                    type="checkbox"
                    checked={selectedCategories.includes(category)}
                    onChange={() => handleCategoryChange(category)}
                    className="form-checkbox h-4 w-4 text-blue-600"
                  />
                  <span className="ml-2 text-gray-700">{category}</span>
                </label>
              ))}
            </div>
          </div>
          {/* Filter by Price */}
          <div className="mb-4">
            <h3 className="text-lg font-medium mb-2">Price</h3>
            <input
              type="range"
              min="0"
              max="1000000"
              step="10000"
              value={priceRange[1]}
              onChange={handlePriceChange}
              className="w-full"
            />
            <div className="flex justify-between text-gray-600 text-sm mt-1">
              <span>Rp {priceRange[0]}</span>
              <span>Rp {priceRange[1]}</span>
            </div>
          </div>
          {/* Filter by Rating */}
          <div className="mb-4">
            <h3 className="text-lg font-medium mb-2">Rating</h3>
            <div className="space-y-2">
              {[4, 3].map((ratingValue) => (
                <label key={ratingValue} className="flex items-center">
                  <input
                    type="radio"
                    name="rating"
                    checked={rating === ratingValue}
                    onChange={() => handleRatingChange(ratingValue)}
                    className="form-radio h-4 w-4 text-blue-600"
                  />
                  <span className="ml-2 text-gray-700">
                    {ratingValue} stars & above
                  </span>
                </label>
              ))}
            </div>
          </div>
        </div>

        {/* Product Grid */}
        <div className="w-full md:w-3/4">
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {filteredProducts.map((product) => (
              <div
                key={product.id}
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
                </div>
                <div className="p-4">
                  <h2 className="text-lg font-semibold mb-2">{product.name}</h2>
                  <p className="text-gray-500 line-through">
                    Rp {product.originalPrice.toLocaleString()}
                  </p>
                  <p className="text-red-500 font-bold">
                    Rp {product.price.toLocaleString()}
                  </p>
                  <p className="text-sm text-gray-600 mt-1">
                    Stok: {product.stock} | Terjual: {product.sold}
                  </p>
                  <button className="mt-3 w-full bg-blue-500 text-white py-2 rounded-lg flex items-center justify-center hover:bg-blue-600 transition duration-200">
                    Beli Sekarang
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductFilter;
