import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { getCategories } from '../../../../services/admin/category/services-category';
import { addProduct } from '../../../../services/admin/product/services-product';

const AddProduct = () => {
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

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name || !categoryId || !price || !weight || !stock || !description) {
      toast.error('Harap isi semua kolom dengan lengkap');
      return;
    }

    const productData = {
      name,
      categoryId,
      price: parseInt(price, 10),
      promoPrice: parseInt(promoPrice, 10),
      weight: parseInt(weight, 10),
      stock: parseInt(stock, 10),
      description,
      image,
    };

    setIsLoading(true);

    try {
      await addProduct(productData, setIsLoading);
      toast.success('Product added successfully!');
      setName('');
      setCategoryId('');
      setPrice('');
      setPromoPrice('');
      setWeight('');
      setStock('');
      setDescription('');
      setImage('');
    } catch (error) {
      console.error('Error adding Product:', error);
      toast.error(error.response?.data?.message || 'Error adding Product');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <ToastContainer />
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
              placeholder="Product Name"
              value={name || ''}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
        </div>
        <div className="w-full sm:w-1/2">
          <label className="mb-3 block font-medium text-black dark:text-white">
            Category
          </label>
          <div className="relative">
            <select
              className="w-full rounded border border-stroke py-3 px-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
              value={categoryId}
              onChange={(e) => setCategoryId(e.target.value)}
              disabled={isLoading}
            >
              <option value="" disabled>
                Select a category
              </option>
              {categoryOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
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
              placeholder="0.00"
              value={price || ''}
              onChange={(e) => setPrice(e.target.value)}
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
              placeholder="0.00"
              value={promoPrice || ''}
              onChange={(e) => setPromoPrice(e.target.value)}
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
              placeholder="0.00 gram"
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
              placeholder="Product Description"
              value={description || ''}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
        </div>
        <div className="w-full sm:w-1/2">
          <label className="mb-3 block font-medium text-black dark:text-white">
            Image
          </label>
          <div className="relative">
            <input
              type="file"
              accept="image/*"
              className="w-full cursor-pointer rounded-lg border-[1.5px] border-stroke bg-transparent outline-none transition file:mr-5 file:border-collapse file:cursor-pointer file:border-0 file:border-r file:border-solid file:border-stroke file:bg-whiter file:py-3 file:px-5 file:hover:bg-primary file:hover:bg-opacity-10 focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:file:border-form-strokedark dark:file:bg-white/30 dark:file:text-white dark:focus:border-primary"
              onChange={(e) => setImage(e.target.files[0])}
            />
          </div>
        </div>
      </div>

      <div className="flex justify-end gap-4.5">
        <Link to="/product">
          <button
            className="flex justify-center rounded border border-stroke py-2 px-6 font-medium text-black hover:shadow-1 dark:border-strokedark dark:text-white"
            type="button"
          >
            Cancel
          </button>
        </Link>
        <button
          className="flex justify-center rounded bg-primary py-2 px-6 font-medium text-gray hover:bg-opacity-90"
          type="submit"
          disabled={isLoading}
        >
          {isLoading ? 'Saving...' : 'Save'}
        </button>
      </div>
    </form>
  );
};

export default AddProduct;
