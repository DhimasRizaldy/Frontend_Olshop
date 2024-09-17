import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { addCategory } from '../../../../services/admin/category/services-category';

const AddCategory = () => {
  const [name, setName] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name) {
      toast.error('Harap isi semua kolom dengan lengkap');
      return;
    }

    const categoryData = { name };

    setIsLoading(true);

    try {
      // Simulate a delay of 3 seconds
      await new Promise((resolve) => setTimeout(resolve, 2000));

      await addCategory(categoryData, setIsLoading);
      // toast.success('Category added successfully!');
      // Optionally clear the input field after success
      setName('');
    } catch (error) {
      toast.error('Failed to add category');
      // console.error('Error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleNameChange = (e) => {
    const value = e.target.value;
    const regex = /^[A-Za-z\s]*$/; // Only allows letters and spaces
    if (regex.test(value)) {
      setName(value);
    } else {
      toast.error('Input hanya boleh berisi huruf dan spasi');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {/* Toast Container for notifications */}
      <ToastContainer />

      <div className="mb-5.5 flex flex-col gap-5.5 sm:flex-row">
        <div className="w-full sm:w-1/2">
          <label
            className="mb-3 block font-medium text-black dark:text-white"
            htmlFor="name"
          >
            Name
          </label>
          <div className="relative">
            <input
              className="w-full rounded border border-stroke py-3 px-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
              type="text"
              name="name"
              id="name"
              placeholder="Category Name"
              value={name}
              onChange={handleNameChange}
            />
          </div>
        </div>
      </div>

      <div className="flex justify-end gap-4.5">
        <Link to="/category">
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
          {isLoading ? 'Loading...' : 'Save'}
        </button>
      </div>
    </form>
  );
};

export default AddCategory;
