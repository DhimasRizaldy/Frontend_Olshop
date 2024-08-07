import React from 'react';
import SelectGroup from '../../../Forms/SelectGroup/SelectGroupOne';
import DatePickerOne from '../../../Forms/DatePicker/DatePickerOne';
import { Link } from 'react-router-dom';

const options = [
  { value: 'USA', label: 'USA' },
  { value: 'UK', label: 'UK' },
  { value: 'Canada', label: 'Canada' },
];

const DetailPromo = () => {
  return (
    <form action="#">
      <div className="mb-5.5 flex flex-col gap-5.5 sm:flex-row">
        <div className="w-full sm:w-1/2">
          <SelectGroup
            label="SupplierId"
            labelObject="Select Supplier"
            options={options}
            disabled
          />
        </div>
        <div className="w-full sm:w-1/2">
          <SelectGroup
            label="ProductId"
            labelObject="Select Product"
            options={options}
            disabled
          />
        </div>
      </div>
      <div className="mb-5.5 flex flex-col gap-5.5 sm:flex-row">
        <div className="w-full sm:w-1/2">
          <label
            className="mb-3 block text-sm font-medium text-black dark:text-white"
            htmlFor="stokIn"
          >
            StokIn
          </label>
          <div className="relative">
            <input
              className="w-full rounded border border-stroke py-3 px-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
              type="text"
              name="stokIn"
              id="stokIn"
              placeholder="10"
              defaultValue="10"
              disabled
            />
          </div>
        </div>

        <div className="w-full sm:w-1/2">
          <DatePickerOne label="Tanggal Masuk" disabled />
        </div>
      </div>

      <div className="flex justify-end gap-4.5">
        <Link to="/promo">
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

export default DetailPromo;
