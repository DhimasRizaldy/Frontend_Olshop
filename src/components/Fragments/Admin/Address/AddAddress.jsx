import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { addAddress } from '../../../../services/admin/address/services-address';
import { getWHOAMI } from '../../../../services/auth/admin/getDataUser';

const AddAddress = () => {
  const [nameAddress, setNameAddress] = useState('');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [country, setCountry] = useState('');
  const [postalCode, setPostalCode] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [role, setRole] = useState('USER'); // Default role
  const navigate = useNavigate();

  // Fetch user role
  useEffect(() => {
    const fetchUserRole = async () => {
      try {
        const response = await getWHOAMI();
        setRole(response.data.role || 'USER'); // Default to 'USER' if role not found
      } catch (error) {
        console.error('Error fetching user role:', error);
      }
    };
    fetchUserRole();
  }, []);

  // Handle submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!nameAddress || !address || !city || !country || !postalCode) {
      toast.error('Harap isi semua kolom dengan lengkap');
      return;
    }

    const addressData = {
      nameAddress,
      address,
      city,
      country,
      postalCode,
    };

    setIsLoading(true);

    try {
      await addAddress(addressData, setIsLoading);
      toast.success('Address added successfully!');
      setNameAddress('');
      setAddress('');
      setCity('');
      setCountry('');
      setPostalCode('');
      navigate(role === 'USER' ? '/users/profile' : '/admin/profile'); // Redirect based on role
    } catch (error) {
      toast.error('Failed to add address');
      console.error('Error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <ToastContainer />
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
              placeholder="Name Address"
              value={nameAddress}
              onChange={(e) => setNameAddress(e.target.value)}
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
              placeholder="Address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
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
              placeholder="City"
              value={city}
              onChange={(e) => setCity(e.target.value)}
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
              placeholder="Country"
              value={country}
              onChange={(e) => setCountry(e.target.value)}
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
              placeholder="Postal Code"
              value={postalCode}
              onChange={(e) => setPostalCode(e.target.value)}
            />
          </div>
        </div>
        <div className="w-full sm:w-1/2"></div>
      </div>

      <div className="flex justify-end gap-4.5">
        <Link to={role === 'USER' ? '/users/profile' : '/admin/profile'}>
          <button
            className="flex justify-center rounded border border-stroke py-2 px-6 font-medium text-black hover:shadow-1 dark:border-strokedark dark:text-white"
            type="button" // Change type to button to avoid form submission
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

export default AddAddress;
