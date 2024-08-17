import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { getProductById } from '../../../../services/admin/product/services-product';
import { getCategories } from '../../../../services/admin/category/services-category';

const DetailProduct = () => {
  //
  const { productId } = useParams();
  const [name, setName] = useState('');
  const [categoryId, setCategoryId] = useState('');
  const [price, setPrice] = useState(0);
  const [promoPrice, setPromoPrice] = useState(0);
  const [weight, setWeight] = useState(0);
  const [stock, setStock] = useState(0);
  const [description, setDescription] = useState('');
  const [image, setImage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [categoryOptions, setCategoryOptions] = useState([]);

  useEffect(() => {
    const fetchProductData = async () => {
      try {
        const response = await getProductById(productId);
        setName(response.data.name);
        setCategoryId(response.data.categoryId);
        setPrice(response.data.price);
        setPromoPrice(response.data.promoPrice);
        setWeight(response.data.weight);
        setStock(response.data.stock);
        setDescription(response.data.description);
        setImage(response.data.image);
      } catch (error) {
        toast.error('Failed to fetch product data');
        console.error('Error fetching product data:', error.message);
      }
    };

    fetchProductData();
  }, [productId]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await getCategories();
        const categories = response.data;
        const categoryOptions = categories.map((category) => ({
          value: category.categoryId,
          label: category.name,
        }));
        setCategoryOptions(categoryOptions);
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };
    fetchCategories();
  }, []);

  return (
    <form action="#">
      <div className="mb-5.5 flex flex-col gap-5.5 sm:flex-row">
        <div className="w-full sm:w-1/2">
          <label className="mb-3 block font-medium text-black dark:text-white">
            Name
          </label>
          <div className="relative">
            <input
              className="w-full rounded border border-stroke py-3 px-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
              type="text"
              name="name"
              id="name"
              value={name || ''}
              onChange={(e) => setName(e.target.value)}
              disabled
            />
          </div>
        </div>
        <div className="w-full sm:w-1/2">
          <label className="mb-3 block font-medium text-black dark:text-white">
            Category
          </label>
          <div className="relative">
            <input
              className="w-full rounded border border-stroke py-3 px-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
              type="text"
              name="categoryId"
              id="categoryId"
              value={name || ''}
              onChange={(e) => setCategoryId(e.target.value)}
              disabled
            />
          </div>
        </div>
      </div>
      <div className="mb-5.5 flex flex-col gap-5.5 sm:flex-row">
        <div className="w-full sm:w-1/2">
          <label className="mb-3 block font-medium text-black dark:text-white">
            Price
          </label>
          <div className="relative">
            <input
              className="w-full rounded border border-stroke py-3 px-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
              type="number"
              name="price"
              id="price"
              value={price || ''}
              onChange={(e) => setPrice(e.target.value)}
              disabled
            />
          </div>
        </div>
        <div className="w-full sm:w-1/2">
          <label className="mb-3 block font-medium text-black dark:text-white">
            Promo Price
          </label>
          <div className="relative">
            <input
              className="w-full rounded border border-stroke py-3 px-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
              type="number"
              name="promoPrice"
              id="promoPrice"
              value={promoPrice || ''}
              onChange={(e) => setPromoPrice(e.target.value)}
              disabled
            />
          </div>
        </div>
      </div>
      <div className="mb-5.5 flex flex-col gap-5.5 sm:flex-row">
        <div className="w-full sm:w-1/2">
          <label className="mb-3 block font-medium text-black dark:text-white">
            Weight
          </label>
          <div className="relative">
            <input
              className="w-full rounded border border-stroke py-3 px-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
              type="number"
              name="Weight"
              id="Weight"
              value={weight || ''}
              onChange={(e) => setWeight(e.target.value)}
              disabled
            />
          </div>
        </div>
        <div className="w-full sm:w-1/2">
          <label className="mb-3 block font-medium text-black dark:text-white">
            Stock
          </label>
          <div className="relative">
            <input
              className="w-full rounded border border-stroke py-3 px-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
              type="number"
              name="stock"
              id="stock"
              value={stock || ''}
              onChange={(e) => setStock(e.target.value)}
              placeholder="0"
              disabled
            />
          </div>
        </div>
      </div>
      <div className="mb-5.5 flex flex-col gap-5.5 sm:flex-row">
        <div className="w-full sm:w-1/2">
          <label className="mb-3 block font-medium text-black dark:text-white">
            description
          </label>
          <div className="relative">
            <textarea
              className="w-full rounded border border-stroke py-3 px-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
              type="text"
              rows={6}
              name="description"
              id="description"
              value={description || ''}
              onChange={(e) => setDescription(e.target.value)}
              disabled
            />
          </div>
        </div>
        <div className="w-full sm:w-1/2">
          <label className="mb-3 block font-medium text-black dark:text-white">
            Image
          </label>
          <td className="relative">
            {image ? (
              <img
                src={
                  typeof image === 'string' ? image : URL.createObjectURL(image)
                }
                alt="image"
                className="h-10 w-10 rounded-full object-cover"
              />
            ) : (
              <p className="text-black dark:text-white">No image</p>
            )}
          </td>
          <div className="relative"></div>
        </div>
      </div>

      <div className="flex justify-end gap-4.5">
        <Link to="/product">
          <button
            className="flex justify-center rounded border border-stroke py-2 px-6 font-medium text-black hover:shadow-1 dark:border-strokedark dark:text-white"
            type="submit"
          >
            Back
          </button>
        </Link>
      </div>
    </form>
  );
};

export default DetailProduct;
