import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { formatRupiah } from '../../../../utils/constants/function';
import { Link } from 'react-router-dom';
import ProductCardSkeleton from './ProductCardSkeleton';

const fetchCategories = async () => {
  const response = await axios.get(
    'https://backend-olshop.vercel.app/api/v1/category',
  );
  return response.data.data;
};

const fetchProducts = async (filters) => {
  const {
    search,
    category,
    minRating,
    maxRating,
    sort,
    page,
    limit,
    discount,
  } = filters;
  const url = new URL('https://backend-olshop.vercel.app/api/v1/product');

  if (search) url.searchParams.append('search', search);
  if (category) url.searchParams.append('category', category);
  if (minRating !== undefined) url.searchParams.append('minRating', minRating);
  if (maxRating !== undefined) url.searchParams.append('maxRating', maxRating);
  if (sort) url.searchParams.append('filter', sort);
  if (page) url.searchParams.append('page', page);
  if (limit) url.searchParams.append('limit', limit);
  if (discount) url.searchParams.append('discount', discount);

  const response = await axios.get(url.toString());
  const productsData = response.data.data;

  const filteredProducts = discount
    ? productsData.filter((product) => product.promoPrice > 0)
    : productsData;

  return {
    products: filteredProducts,
    total: response.data.total,
  };
};

const formatNumber = (number) => {
  return number.toLocaleString('id-ID');
};

const ProductCard = ({ product }) => {
  const roundedRating = Math.round(product.averageRating);

  return (
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
          Stok: {formatNumber(product.stock)}
        </p>
        <div className="flex mt-1">
          <p className="text-sm text-gray-600">
            Terjual: {formatNumber(product.totalSold)}
          </p>{' '}
          &nbsp;
          <p className="text-sm text-gray-600">
            Ulasan: {formatNumber(product.totalReview)}
          </p>
        </div>
        <button className="mt-3 w-full bg-primary text-white py-2 rounded-lg flex items-center justify-center hover:bg-blue-600 transition duration-200">
          Beli Sekarang
        </button>
      </div>
    </Link>
  );
};

const ProductFilter = () => {
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedRatings, setSelectedRatings] = useState([]);
  const [sort, setSort] = useState(null);
  const [page, setPage] = useState(1);
  const [limit] = useState(12);
  const [loading, setLoading] = useState(true);
  const [noData, setNoData] = useState(false);
  const [totalProducts, setTotalProducts] = useState(0);
  const [hasMoreProducts, setHasMoreProducts] = useState(true);
  const [discount, setDiscount] = useState(false);

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
          discount,
        };
        const { products: productsData, total } = await fetchProducts(filters);

        setProducts(productsData);
        setTotalProducts(total);
        setHasMoreProducts(productsData.length > 0);
        setNoData(productsData.length === 0);
      } catch (error) {
        console.error('Gagal mengambil data', error);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [selectedCategories, selectedRatings, sort, page, limit, discount]);

  const handleCategoryChange = async (category) => {
    let newSelectedCategories;
    if (category === 'all') {
      newSelectedCategories = [];
      setSelectedRatings([]);
      setDiscount(false);
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
      discount,
    };
    const { products: productsData, total } = await fetchProducts(filters);

    setProducts(productsData);
    setTotalProducts(total);
    setHasMoreProducts(productsData.length > 0);
    setNoData(productsData.length === 0);
  };

  const handleRatingChange = (ratingValue) => {
    setSelectedRatings((prevRatings) =>
      prevRatings.includes(ratingValue)
        ? prevRatings.filter((rating) => rating !== ratingValue)
        : [...prevRatings, ratingValue],
    );
  };

  const handlePageChange = (pageNumber) => {
    setPage(pageNumber);
  };

  const handleDiscountChange = () => {
    setDiscount((prevDiscount) => !prevDiscount);
  };

  const totalPages = Math.ceil(totalProducts / limit);

  return (
    <div className="max-w-6xl mx-auto px-4 py-6 mt-12">
      <div className="flex flex-col md:flex-row">
        <button
          onClick={() =>
            document.getElementById('filter-section').classList.toggle('hidden')
          }
          className="md:hidden bg-blue-500 text-white py-2 px-4 rounded-lg mb-4"
        >
          Filter
        </button>

        <div
          id="filter-section"
          className="w-full md:w-1/4 bg-white p-4 rounded-lg shadow-md mb-4 md:mb-0 md:mr-6"
        >
          <h2 className="text-xl font-semibold mb-4">Filter</h2>
          <button
            onClick={() => handleCategoryChange('all')}
            className="w-full mb-4 bg-green-500 text-white py-2 rounded-lg hover:bg-green-600"
          >
            Semua Produk
          </button>
          <div className="mb-4">
            <h3 className="text-lg font-medium mb-2">Kategori</h3>
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
                    {rating} Bintang{rating > 1 ? '' : ''}
                  </span>
                </label>
              ))}
            </div>
          </div>
          <div className="mb-4">
            <h3 className="text-lg font-medium mb-2">Diskon</h3>
            <label className="flex items-center">
              <input
                type="checkbox"
                checked={discount}
                onChange={handleDiscountChange}
                className="form-checkbox h-4 w-4 text-red-500"
              />
              <span className="ml-2 text-gray-700">Produk Diskon</span>
            </label>
          </div>
        </div>

        <div className="w-full md:w-3/4">
          {loading ? (
            <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {Array.from({ length: 12 }).map((_, index) => (
                <ProductCardSkeleton key={index} />
              ))}
            </div>
          ) : noData ? (
            <p className="text-center text-gray-500">
              Tidak ada produk ditemukan
            </p>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {products.map((product) => (
                <ProductCard key={product.productId} product={product} />
              ))}
            </div>
          )}
          <div className="flex justify-center mt-6">
            <button
              onClick={() => handlePageChange(page - 1)}
              disabled={page <= 1}
              className="px-4 py-2 bg-blue-500 text-white rounded-lg mr-2 disabled:opacity-50"
            >
              Sebelumnya
            </button>
            <span className="px-4 py-2">Halaman {page}</span>
            <button
              onClick={() => handlePageChange(page + 1)}
              disabled={page >= totalPages || !hasMoreProducts}
              className="px-4 py-2 bg-blue-500 text-white rounded-lg"
            >
              Selanjutnya
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductFilter;
