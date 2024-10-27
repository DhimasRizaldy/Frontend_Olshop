import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {
  editSupplier,
  getSupplierById,
} from '../../../../services/admin/supplier/services-supplier';

const EditSupplier = () => {
  const { supplierId } = useParams();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchSupplierData = async () => {
      setIsLoading(true);
      try {
        const response = await getSupplierById(supplierId);
        setName(response.data.name);
        setEmail(response.data.email);
        setAddress(response.data.address);
        setPhoneNumber(response.data.phoneNumber);
      } catch (error) {
        toast.error('Gagal mengambil data supplier');
        console.error('Error:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchSupplierData();
  }, [supplierId]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name || !email || !address || !phoneNumber) {
      toast.error('Harap isi semua kolom dengan lengkap');
      return;
    }

    // Validasi nomor telepon
    const phoneNumberPattern = /^[0-9]+$/;
    if (!phoneNumberPattern.test(phoneNumber)) {
      toast.error('Nomor telepon hanya boleh berisi angka');
      return;
    }

    const supplierData = {
      name,
      email,
      address,
      phoneNumber,
    };

    setIsLoading(true);

    try {
      await editSupplier(supplierId, supplierData);
      toast.success('Supplier berhasil diperbarui!');
    } catch (error) {
      toast.error('Gagal memperbarui supplier. Silakan coba lagi.');
      console.error('Error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <ToastContainer />
      <form onSubmit={handleSubmit}>
        <div className="mb-5.5 flex flex-col gap-5.5 sm:flex-row">
          <div className="w-full sm:w-1/2">
            <label
              className="mb-3 block text-sm font-medium text-black dark:text-white"
              htmlFor="name"
            >
              Nama Toko
            </label>
            <div className="relative">
              <input
                className="w-full rounded border border-strokedark py-3 px-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                type="text"
                name="name"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                disabled={isLoading}
              />
            </div>
          </div>
          <div className="w-full sm:w-1/2">
            <label className="mb-3 block text-sm font-medium text-black dark:text-white">
              Email
            </label>
            <div className="relative">
              <input
                className="w-full rounded border border-strokedark py-3 px-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                type="email"
                name="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={isLoading}
              />
            </div>
          </div>
        </div>
        <div className="mb-5.5 flex flex-col gap-5.5 sm:flex-row">
          <div className="w-full sm:w-1/2">
            <label className="mb-3 block text-sm font-medium text-black dark:text-white">
              Alamat
            </label>
            <div className="relative">
              <input
                className="w-full rounded border border-strokedark py-3 px-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                type="text"
                name="address"
                id="address"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                disabled={isLoading}
              />
            </div>
          </div>
          <div className="w-full sm:w-1/2">
            <label className="mb-3 block text-sm font-medium text-black dark:text-white">
              Nomor Telepon
            </label>
            <div className="relative">
              <input
                className="w-full rounded border border-strokedark py-3 px-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                type="text"
                name="phoneNumber"
                id="phoneNumber"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                disabled={isLoading}
              />
            </div>
          </div>
        </div>

        <div className="flex justify-end gap-4.5">
          <Link to="/supplier">
            <button
              className="flex justify-center rounded border border-strokedark py-2 px-6 font-medium text-black hover:shadow-1 dark:border-strokedark dark:text-white"
              type="button"
            >
              Kembali
            </button>
          </Link>
          <button
            className="flex justify-center rounded bg-primary py-2 px-6 font-medium text-gray hover:bg-opacity-90"
            type="submit"
            disabled={isLoading}
          >
            {isLoading ? 'Mengupdate...' : 'Perbarui'}
          </button>
        </div>
      </form>
    </>
  );
};

export default EditSupplier;
