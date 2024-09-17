import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {
  editCategory,
  getCategoryById,
} from '../../../../services/admin/category/services-category';

const EditCategory = () => {
  const { categoryId } = useParams();
  const [name, setName] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchCategoryData = async () => {
      try {
        const response = await getCategoryById(categoryId);
        setName(response.data.name);
      } catch (error) {
        toast.error('Failed to fetch category data');
        console.error('Error:', error);
      }
    };

    fetchCategoryData();
  }, [categoryId]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name) {
      toast.error('Harap isi semua kolom dengan lengkap');
      return;
    }

    const categoryData = { name };

    setIsLoading(true);

    try {
      await editCategory(categoryId, categoryData);
      toast.success('Category updated successfully!');
    } catch (error) {
      toast.error('Failed to update category');
      console.error('Error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <ToastContainer />
      <form onSubmit={handleSubmit}>
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
                value={name}
                onChange={(e) => setName(e.target.value)}
                disabled={isLoading}
              />
            </div>
          </div>
        </div>

        <div className="flex justify-end gap-4.5">
          <Link to="/category">
            <button
              className="flex justify-center rounded border border-stroke py-2 px-6 font-medium text-black hover:shadow-1 dark:border-strokedark dark:text-white"
              type="button"
              disabled={isLoading}
            >
              Cancel
            </button>
          </Link>
          <button
            className="flex justify-center rounded bg-primary py-2 px-6 font-medium text-gray hover:bg-opacity-90"
            type="submit"
            disabled={isLoading}
          >
            {isLoading ? 'Updating...' : 'Update'}
          </button>
        </div>
      </form>
    </>
  );
};

export default EditCategory;
