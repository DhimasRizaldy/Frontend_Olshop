import React, { useState, useEffect } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {
  editAddress,
  getAddressById,
} from '../../../../services/admin/address/services-address';
import { getWHOAMI } from '../../../../services/auth/admin/getDataUser';

const EditAddress = () => {
  const { addressId } = useParams();
  const navigate = useNavigate();
  const [nameAddress, setnameAddress] = useState('');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [country, setCountry] = useState('');
  const [postalCode, setPostalCode] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [userRole, setUserRole] = useState('');

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

    const fetchUserRole = async () => {
      try {
        const response = await getWHOAMI();
        setUserRole(response.data.user.role);
      } catch (error) {
        toast.error('Failed to fetch user role');
        console.error('Error:', error);
      }
    };

    fetchAddressData();
    fetchUserRole();
  }, [addressId]);

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
      await editAddress(addressId, addressData);
      toast.success('Address successfully updated!');
    } catch (error) {
      toast.error('Failed to update address. Please try again.');
      console.error('Error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCancel = () => {
    if (userRole === 'ADMIN') {
      navigate('/admin/profile');
    } else if (userRole === 'USER') {
      navigate('/users/profile');
    }
  };

  return (
    <>
      <ToastContainer />
      <form onSubmit={handleSubmit}>
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
                disabled={isLoading}
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
                disabled={isLoading}
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
                disabled={isLoading}
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
                disabled={isLoading}
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
                disabled={isLoading}
              />
            </div>
          </div>
          <div className="w-full sm:w-1/2"></div>
        </div>

        <div className="flex justify-end gap-4.5">
          <button
            className={`flex justify-center rounded border border-stroke py-2 px-6 font-medium ${isLoading ? 'text-gray-400 border-gray-300' : 'text-black hover:shadow-1 dark:border-strokedark dark:text-white'}`}
            type="button"
            onClick={handleCancel}
            disabled={isLoading}
          >
            Cancel
          </button>
          <button
            className={`flex justify-center rounded py-2 px-6 font-medium ${isLoading ? 'bg-gray-400 text-gray-200' : 'bg-primary text-gray hover:bg-opacity-90'}`}
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

export default EditAddress;
