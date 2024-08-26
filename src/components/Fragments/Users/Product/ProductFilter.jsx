import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { formatRupiah } from '../../../../utils/constants/function';
import { Link } from 'react-router-dom';

// Fetch categories from the API
const fetchCategories = async () => {
  const response = await axios.get(
    'https://backend-olshop.vercel.app/api/v1/category',
  );
  return response.data.data;
};

// Fetch products from the API based on filters
const fetchProducts = async (filters) => {
  const { search, category, minRating, maxRating, sort, page, limit } = filters;
  const url = new URL('https://backend-olshop.vercel.app/api/v1/product');

  if (search) url.searchParams.append('search', search);
  if (category) url.searchParams.append('category', category);
  if (minRating !== undefined) url.searchParams.append('minRating', minRating);
  if (maxRating !== undefined) url.searchParams.append('maxRating', maxRating);
  if (sort) url.searchParams.append('filter', sort);
  if (page) url.searchParams.append('page', page);
  if (limit) url.searchParams.append('limit', limit);

  // console.log('Fetching URL:', url.toString());

  const response = await axios.get(url.toString());
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

const ProductFilter = () => {
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedRatings, setSelectedRatings] = useState([]);
  const [sort, setSort] = useState(null);
  const [page, setPage] = useState(1);
  const [limit] = useState(10);
  const [loading, setLoading] = useState(true);
  const [noData, setNoData] = useState(false);

  useEffect(() => {
    const loadData = async () => {
      try {
        const categoriesData = await fetchCategories();
        setCategories(categoriesData);

        const filters = {
          category: selectedCategories
            .map((id) => {
              const category = categories.find((cat) => cat.categoryId === id);
              return category ? category.name : '';
            })
            .join(','),
          minRating:
            selectedRatings.length > 0
              ? Math.min(...selectedRatings)
              : undefined,
          maxRating:
            selectedRatings.length > 0
              ? Math.max(...selectedRatings)
              : undefined,
          sort,
          page,
          limit,
        };
        const productsData = await fetchProducts(filters);
        setProducts(productsData);

        // Set the noData state based on whether productsData is empty
        setNoData(productsData.length === 0);
      } catch (error) {
        console.error('Failed to fetch data', error);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [selectedCategories, selectedRatings, sort, page, limit]);

  const handleCategoryChange = async (category) => {
    let newSelectedCategories;
    if (category === 'all') {
      newSelectedCategories = [];
    } else {
      newSelectedCategories = selectedCategories.includes(category)
        ? selectedCategories.filter((c) => c !== category)
        : [...selectedCategories, category];
    }

    setSelectedCategories(newSelectedCategories);

    const filters = {
      category: newSelectedCategories
        .map((id) => {
          const category = categories.find((cat) => cat.categoryId === id);
          return category ? category.name : '';
        })
        .join(','),
      minRating:
        selectedRatings.length > 0 ? Math.min(...selectedRatings) : undefined,
      maxRating:
        selectedRatings.length > 0 ? Math.max(...selectedRatings) : undefined,
      sort,
      page,
      limit,
    };
    const productsData = await fetchProducts(filters);
    setProducts(productsData);

    // Set the noData state based on whether productsData is empty
    setNoData(productsData.length === 0);
  };

  const handleRatingChange = (ratingValue) => {
    setSelectedRatings((prevRatings) =>
      prevRatings.includes(ratingValue)
        ? prevRatings.filter((rating) => rating !== ratingValue)
        : [...prevRatings, ratingValue],
    );
  };

  const handleSortChange = (sortOption) => {
    setSort(sortOption);
  };

  const handlePageChange = (pageNumber) => {
    setPage(pageNumber);
  };

  if (loading) return <p>Loading...</p>;

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
          className="w-full md:w-1/4 bg-white p-4 rounded-lg shadow-md mb-4 md:mb-0 md:mr-6"
        >
          <h2 className="text-xl font-semibold mb-4">Filter</h2>
          {/* All Products Button */}
          <button
            onClick={() => handleCategoryChange('all')}
            className="w-full mb-4 bg-green-500 text-white py-2 rounded-lg hover:bg-green-600"
          >
            All Products
          </button>
          {/* Filter by Category */}
          <div className="mb-4">
            <h3 className="text-lg font-medium mb-2">Category</h3>
            <div className="space-y-2">
              {categories.map((category) => (
                <label key={category.categoryId} className="flex items-center">
                  <input
                    type="checkbox"
                    checked={selectedCategories.includes(category.categoryId)}
                    onChange={() => handleCategoryChange(category.categoryId)}
                    className="form-checkbox h-4 w-4 text-blue-600"
                  />
                  <span className="ml-2 text-gray-700">{category.name}</span>
                </label>
              ))}
            </div>
          </div>
          {/* Filter by Rating */}
          <div className="mb-4">
            <h3 className="text-lg font-medium mb-2">Rating</h3>
            <div className="space-y-2">
              {[1, 2, 3, 4, 5].map((rating) => (
                <label key={rating} className="flex items-center">
                  <input
                    type="checkbox"
                    checked={selectedRatings.includes(rating)}
                    onChange={() => handleRatingChange(rating)}
                    className="form-checkbox h-4 w-4 text-yellow-500"
                  />
                  <span className="ml-2 text-gray-700">
                    {rating} Star{rating > 1 ? 's' : ''}
                  </span>
                </label>
              ))}
            </div>
          </div>
        </div>

        {/* Products Grid */}
        <div className="w-full md:w-3/4">
          {noData ? (
            <p className="text-center text-gray-500">No products found</p>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {products.map((product) => (
                <ProductCard key={product.productId} product={product} />
              ))}
            </div>
          )}
          {/* Pagination */}
          <div className="flex justify-center mt-6">
            <button
              onClick={() => handlePageChange(page - 1)}
              disabled={page <= 1}
              className="px-4 py-2 bg-blue-500 text-white rounded-lg mr-2 disabled:opacity-50"
            >
              Previous
            </button>
            <button
              onClick={() => handlePageChange(page + 1)}
              className="px-4 py-2 bg-blue-500 text-white rounded-lg"
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductFilter;
