import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { addPromos } from '../../../../services/admin/promo/services-promo';

const AddPromo = () => {
  const [codePromo, setCodePromo] = useState('');
  const [discount, setDiscount] = useState('');
  const [activeAt, setActiveAt] = useState(null);
  const [expiresAt, setExpiresAt] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate the inputs
    if (!codePromo || !discount || !activeAt || !expiresAt) {
      toast.error('Please fill in all fields');
      return;
    }

    // Create promo data
    const promoData = {
      codePromo,
      discount: parseInt(discount, 10),
      activeAt: new Date(activeAt).toISOString(), // Ensure the date is in ISO string format
      expiresAt: new Date(expiresAt).toISOString(), // Ensure the date is in ISO string format
    };

    setIsLoading(true);

    try {
      // Send data to backend
      await addPromos(promoData, setIsLoading);
      toast.success('Promo added successfully!');
      // Optionally clear the input fields after success
      setCodePromo('');
      setDiscount('');
      setActiveAt(null);
      setExpiresAt(null);
    } catch (error) {
      toast.error('Failed to add promo');
      console.error('Error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {/* Toast Container for notifications */}
      <ToastContainer />

      <div className="mb-5.5 flex flex-col gap-5.5 sm:flex-row">
        <div className="w-full sm:w-1/2">
          <label
            className="mb-3 block text-sm font-medium text-black dark:text-white"
            htmlFor="codePromo"
          >
            Code Promo
          </label>
          <div className="relative">
            <input
              className="w-full rounded border border-stroke py-3 px-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
              type="text"
              name="codePromo"
              id="codePromo"
              placeholder="Code Promo"
              value={codePromo}
              onChange={(e) => setCodePromo(e.target.value)}
            />
          </div>
        </div>
        <div className="w-full sm:w-1/2">
          <label
            className="mb-3 block text-sm font-medium text-black dark:text-white"
            htmlFor="discount"
          >
            Discount
          </label>
          <div className="relative">
            <input
              className="w-full rounded border border-stroke py-3 px-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
              type="number"
              name="discount"
              id="discount"
              placeholder="Discount %"
              value={discount}
              onChange={(e) => setDiscount(e.target.value)}
            />
          </div>
        </div>
      </div>
      <div className="mb-5.5 flex flex-col gap-5.5 sm:flex-row">
        <div className="w-full sm:w-1/2">
          <label
            className="mb-3 block text-sm font-medium text-black dark:text-white"
            htmlFor="activeAt"
          >
            Tanggal Active
          </label>
          <div className="relative">
            <input
              className="w-full rounded border border-stroke py-3 px-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
              type="date"
              name="activeAt"
              id="activeAt"
              placeholder="Date Active"
              value={activeAt}
              onChange={(e) => setActiveAt(e.target.value)}
            />
          </div>
        </div>
        <div className="w-full sm:w-1/2">
          <label
            className="mb-3 block text-sm font-medium text-black dark:text-white"
            htmlFor="expiresAt"
          >
            Tanggal Expires
          </label>
          <div className="relative">
            <input
              className="w-full rounded border border-stroke py-3 px-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
              type="date"
              name="expiresAt"
              id="expiresAt"
              placeholder="Date Expires"
              value={expiresAt}
              onChange={(e) => setExpiresAt(e.target.value)}
            />
          </div>
        </div>
      </div>
      <div className="flex justify-end gap-4.5">
        <Link to="/promo">
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

export default AddPromo;
