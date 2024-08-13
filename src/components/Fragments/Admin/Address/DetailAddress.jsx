import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { getAddressById } from '../../../../services/admin/address/services-address';

const DetailAddress = () => {
  const { addressId } = useParams();
  const [nameAddress, setnameAddress] = useState('');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [country, setCountry] = useState('');
  const [postalCode, setPostalCode] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  //

  useEffect(() => {
    const fetchAddressData = async () => {
      try {
        const response = await getAddressById(addressId);
        setnameAddress(response.data.nameAddress);
        setAddress(response.data.address);
        setCity(response.data.city);
        setCountry(response.data.country);
        setPostalCode(response.data.postalCode);
      } catch (error) {
        toast.error('Failed to fetch address data');
        console.error('Error:', error);
      }
    };

    fetchAddressData();
  }, [addressId]);

  return (
    <form>
      <div className="mb-5.5 flex flex-col gap-5.5 sm:flex-row">
        <div className="w-full sm:w-1/2">
          <label className="mb-3 block text-sm font-medium text-black dark:text-white">
            Name Address
          </label>
          <div className="relative">
            <input
              className="w-full rounded border border-stroke py-3 px-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
              type="text"
              name="nameAddress"
              id="nameAddress"
              value={nameAddress}
              onChange={(e) => setnameAddress(e.target.value)}
              disabled
            />
          </div>
        </div>
        <div className="w-full sm:w-1/2">
          <label className="mb-3 block text-sm font-medium text-black dark:text-white">
            Address
          </label>
          <div className="relative">
            <input
              className="w-full rounded border border-stroke py-3 px-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
              type="text"
              name="address"
              id="address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              disabled
            />
          </div>
        </div>
      </div>
      <div className="mb-5.5 flex flex-col gap-5.5 sm:flex-row">
        <div className="w-full sm:w-1/2">
          <label className="mb-3 block text-sm font-medium text-black dark:text-white">
            City
          </label>
          <div className="relative">
            <input
              className="w-full rounded border border-stroke py-3 px-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
              type="text"
              name="city"
              id="city"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              disabled
            />
          </div>
        </div>
        <div className="w-full sm:w-1/2">
          <label className="mb-3 block text-sm font-medium text-black dark:text-white">
            Country
          </label>
          <div className="relative">
            <input
              className="w-full rounded border border-stroke py-3 px-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
              type="text"
              name="country"
              id="country"
              value={country}
              onChange={(e) => setCountry(e.target.value)}
              disabled
            />
          </div>
        </div>
      </div>
      <div className="mb-5.5 flex flex-col gap-5.5 sm:flex-row">
        <div className="w-full sm:w-1/2">
          <label className="mb-3 block text-sm font-medium text-black dark:text-white">
            Postal Code
          </label>
          <div className="relative">
            <input
              className="w-full rounded border border-stroke py-3 px-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
              type="text"
              name="postalCode"
              id="postalCode"
              value={postalCode}
              onChange={(e) => setPostalCode(e.target.value)}
              disabled
            />
          </div>
        </div>
        <div className="w-full sm:w-1/2"></div>
      </div>

      <div className="flex justify-end gap-4.5">
        <Link to="/address">
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

export default DetailAddress;
