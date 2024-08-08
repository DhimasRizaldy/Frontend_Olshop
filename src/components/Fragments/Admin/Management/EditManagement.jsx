import React from 'react';
import DatePickerOne from '../../../../components/Forms/DatePicker/DatePickerOne';
import { Link } from 'react-router-dom';

const EditManagement = () => {
  return (
    <form action="#">
      <div className="mb-5.5 flex flex-col gap-5.5 sm:flex-row">
      <div className="w-full sm:w-1/2">
          <label
            className="mb-3 block font-medium text-black dark:text-white"
          >
            Supplier Id
          </label>
          <div className="relative">
            <input
              className="w-full rounded border border-stroke py-3 px-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
              type="text"
              name="supplierId"
              id="supplierId"
            />
          </div>
        </div>
        <div className="w-full sm:w-1/2">
          <label
            className="mb-3 block font-medium text-black dark:text-white"
          >
            Product Id
          </label>
          <div className="relative">
            <input
              className="w-full rounded border border-stroke py-3 px-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
              type="text"
              name="ProductId"
              id="ProductId"
            />
          </div>
        </div>
      </div>
      <div className="mb-5.5 flex flex-col gap-5.5 sm:flex-row">
        <div className="w-full sm:w-1/2">
          <label
            className="mb-3 block font-medium text-black dark:text-white"
            htmlFor="stockIn"
          >
            StockIn
          </label>
          <div className="relative">
            <input
              className="w-full rounded border border-stroke py-3 px-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
              type="text"
              name="stockIn"
              id="stockIn"
              placeholder="0"
            />
          </div>
        </div>
        <div className="w-full sm:w-1/2">
          <DatePickerOne label="Date Stock In" />
        </div>
      </div>

      <div className="flex justify-end gap-4.5">
        <Link to="/management">
          <button
            className="flex justify-center rounded border border-stroke py-2 px-6 font-medium text-black hover:shadow-1 dark:border-strokedark dark:text-white"
            type="submit"
          >
            Cancel
          </button>
        </Link>
        <button
          className="flex justify-center rounded bg-primary py-2 px-6 font-medium text-gray hover:bg-opacity-90"
          type="submit"
        >
          Update
        </button>
      </div>
    </form>
  );
};

export default EditManagement;
