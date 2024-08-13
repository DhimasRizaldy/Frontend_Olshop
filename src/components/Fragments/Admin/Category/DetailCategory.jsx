import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { getCategoryById } from '../../../../services/admin/category/services-category';

const DetailCategory = () => {
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
            type="submit"
          >
            Back
          </button>
        </Link>
      </div>
    </form>
  );
};

export default DetailCategory;
