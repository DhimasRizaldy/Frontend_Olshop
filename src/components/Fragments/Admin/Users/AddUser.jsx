import React from 'react';
import SelectGroup from '../../../Forms/SelectGroup/SelectGroupOne';
import { Link } from 'react-router-dom';

const options = [
  { value: 'Male', label: 'Male' },
  { value: 'Female', label: 'Female' },
];

const AddUser = () => {
  return (
    <form action="#">
      <div className="mb-5.5 flex flex-col gap-5.5 sm:flex-row">
        <div className="w-full sm:w-1/2">
          <label
            className="text-white"
          >
            Full Name
          </label>
          <div className="relative">
            <input
              className="w-full rounded border border-stroke py-3 px-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
              type="text"
              name="fullName"
              id="fullName"
            />
          </div>
        </div>
        <div className="w-full sm:w-1/2">
          <label
            className="text-white"
          >
            Phone Number
          </label>
          <div className="relative">
            <input
              className="w-full rounded border border-stroke py-3 px-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
              type="text"
              name="phoneNumber"
              id="phoneNumber"
            />
          </div>
        </div>
      </div>
      <div className="mb-5.5 flex flex-col gap-5.5 sm:flex-row">
      <div className="w-full sm:w-1/2">
          <SelectGroup
            label="Gender"
            labelObject="Select Gender"
            options={options}
          />
      </div>
      </div>
      <div className="flex justify-end gap-4.5">
        <Link to="/users">
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
          Save
        </button>
      </div>
    </form>
  );
};

export default AddUser;
