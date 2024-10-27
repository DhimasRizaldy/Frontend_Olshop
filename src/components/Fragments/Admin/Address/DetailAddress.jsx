import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getAddressById } from '../../../../services/admin/address/services-address';
import { getWHOAMI } from '../../../../services/auth/admin/getDataUser';
import { toast } from 'react-toastify';

const DetailAddress = () => {
  const { addressId } = useParams();
  const [nameAddress, setNameAddress] = useState('');
  const [address, setAddress] = useState('');
  const [cityName, setCityName] = useState('');
  const [provinceName, setProvinceName] = useState('');
  const [postalCode, setPostalCode] = useState('');
  const [role, setRole] = useState('USER'); // Default role
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAddressData = async () => {
      try {
        const response = await getAddressById(addressId);
        console.log('Address Data:', response); // Tambahkan log untuk memeriksa data yang diterima
        const addressData = response.data;
        setNameAddress(addressData.nameAddress || '');
        setAddress(addressData.address || '');
        setCityName(addressData.cityName || '');
        setProvinceName(addressData.provinceName || '');
        setPostalCode(addressData.postalCode || '');
      } catch (error) {
        console.error('Gagal mengambil data alamat:', error);
      }
    };

    const fetchUserRole = async () => {
      try {
        const response = await getWHOAMI();
        setRole(response.data.user.role);
      } catch (error) {
        toast.error('Gagal mengambil peran pengguna');
        console.error('Error:', error);
      }
    };

    fetchAddressData();
    fetchUserRole();
  }, [addressId]);

  const handleCancel = () => {
    if (role === 'ADMIN') {
      navigate('/admin/profile');
    } else if (role === 'USER') {
      navigate('/users/profile');
    }
  };

  return (
    <form>
      <div className="mb-5.5 flex flex-col gap-5.5 sm:flex-row">
        <div className="w-full sm:w-1/2">
          <label className="mb-3 block text-sm font-medium text-black dark:text-white">
            Nama Alamat
          </label>
          <div className="relative">
            <input
              className="w-full rounded border border-stroke py-3 px-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
              type="text"
              name="nameAddress"
              id="nameAddress"
              value={nameAddress}
              onChange={(e) => setNameAddress(e.target.value)}
              disabled
            />
          </div>
        </div>
        <div className="w-full sm:w-1/2">
          <label className="mb-3 block text-sm font-medium text-black dark:text-white">
            Alamat Lengkap
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
            Provinsi
          </label>
          <div className="relative">
            <input
              className="w-full rounded border border-stroke py-3 px-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
              type="text"
              name="provinceName"
              id="provinceName"
              value={provinceName}
              onChange={(e) => setProvinceName(e.target.value)}
              disabled
            />
          </div>
        </div>
        <div className="w-full sm:w-1/2">
          <label className="mb-3 block text-sm font-medium text-black dark:text-white">
            Kota
          </label>
          <div className="relative">
            <input
              className="w-full rounded border border-stroke py-3 px-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
              type="text"
              name="cityName"
              id="cityName"
              value={cityName}
              onChange={(e) => setCityName(e.target.value)}
              disabled
            />
          </div>
        </div>
      </div>
      <div className="mb-5.5 flex flex-col gap-5.5 sm:flex-row">
        <div className="w-full sm:w-1/2">
          <label className="mb-3 block text-sm font-medium text-black dark:text-white">
            Kode Pos
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
        <button
          className="flex justify-center rounded border border-stroke py-2 px-6 font-medium text-black hover:shadow-1 dark:border-strokedark dark:text-white"
          type="button"
          onClick={handleCancel}
        >
          Kembali
        </button>
      </div>
    </form>
  );
};

export default DetailAddress;
