import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { getProductById } from '../../../../services/admin/product/services-product';
import { getCategories } from '../../../../services/admin/category/services-category';
import { formatRupiah } from '../../../../utils/constants/function';

const DetailProduct = () => {
  const { productId } = useParams();
  const [product, setProduct] = useState({});
  const [categoryName, setCategoryName] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchProductData = async () => {
      try {
        setIsLoading(true);
        const response = await getProductById(productId);
        setProduct(response.data);
        setIsLoading(false);
      } catch (error) {
        toast.error('Failed to fetch product data');
        setIsLoading(false);
        console.error('Error fetching product data:', error.message);
      }
    };

    fetchProductData();
  }, [productId]);

  useEffect(() => {
    const fetchCategoryName = async () => {
      try {
        const response = await getCategories();
        const category = response.data.find(
          (cat) => cat.categoryId === product.categoryId,
        );
        if (category) setCategoryName(category.name);
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };

    if (product.categoryId) fetchCategoryName();
  }, [product.categoryId]);

  return (
    <div className="container mx-auto p-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <img
            src={
              product.image
                ? typeof product.image === 'string'
                  ? product.image
                  : URL.createObjectURL(product.image)
                : '/path/to/placeholder-image.jpg'
            }
            alt={product.name}
            className="w-full h-auto rounded-lg shadow-lg"
          />
        </div>
        <div className="flex flex-col justify-between">
          <div>
            <h1 className="text-3xl font-bold mb-4">{product.name}</h1>
            <p className="text-xl text-gray-700 mb-4">
              <span className="font-semibold">Category:</span> {categoryName}
            </p>
            <p className="text-2xl text-red-500 font-bold mb-4">
              {formatRupiah(product.promoPrice || product.price)}
            </p>
            {product.promoPrice > 0 && (
              <p className="text-gray-500 line-through mb-4">
                {formatRupiah(product.price)}
              </p>
            )}
            <p className="mb-6">
              <span className="font-semibold">Description:</span>{' '}
              {product.description}
            </p>
          </div>
          <div className="grid grid-cols-2 gap-4 mb-6">
            <div>
              <p className="text-gray-700">
                <span className="font-semibold">Weight:</span> {product.weight}{' '}
                g
              </p>
            </div>
            <div>
              <p className="text-gray-700">
                <span className="font-semibold">Stock:</span> {product.stock}
              </p>
            </div>
          </div>
          <Link to="/product">
            <button className="w-full md:w-auto inline-block px-8 py-3 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 transition-colors">
              Back to Products
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default DetailProduct;
