import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {
  addSupplier,
  getSupplierById,
} from '../../../../services/admin/supplier/services-supplier';

const AddSupplier = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [existingSuppliers, setExistingSuppliers] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchSuppliers = async () => {
      try {
        const suppliers = await getSupplierById();
        setExistingSuppliers(suppliers.data); // Ganti dengan struktur data yang sesuai
      } catch (error) {
        console.error('Error fetching suppliers:', error);
      }
    };

    fetchSuppliers();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validasi input
    if (!name || !email || !address || !phoneNumber) {
      toast.error('Harap isi semua kolom dengan lengkap');
      return;
    }

    // Cek duplikasi email dan nomor telepon
    const isEmailExists = existingSuppliers.some(
      (supplier) => supplier.email === email,
    );
    const isPhoneExists = existingSuppliers.some(
      (supplier) => supplier.phoneNumber === phoneNumber,
    );

    if (isEmailExists) {
      toast.error('Email sudah terdaftar');
      return;
    }

    if (isPhoneExists) {
      toast.error('Nomor Telepon sudah terdaftar');
      return;
    }

    // Buat data supplier
    const supplierData = {
      name,
      email,
      address,
      phoneNumber,
    };

    setIsLoading(true);

    try {
      // Kirim data ke backend
      await addSupplier(supplierData, setIsLoading);
      toast.success('Supplier berhasil ditambahkan!');
      // Bersihkan input setelah berhasil
      setName('');
      setEmail('');
      setAddress('');
      setPhoneNumber('');
    } catch (error) {
      toast.error('Gagal menambahkan supplier');
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
          <label
            className="mb-3 block text-sm font-medium text-black dark:text-white"
            htmlFor="name"
          >
            Nama Toko
          </label>
          <div className="relative">
            <input
              className="w-full rounded border border-stroke py-3 px-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
              type="text"
              name="name"
              id="name"
              placeholder="Nama Toko"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
        </div>
        <div className="w-full sm:w-1/2">
          <label className="mb-3 block text-sm font-medium text-black dark:text-white">
            Email
          </label>
          <div className="relative">
            <input
              className="w-full rounded border border-stroke py-3 px-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
              type="email"
              name="email"
              id="email"
              placeholder="JhonDoe@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
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
              className="w-full rounded border border-stroke py-3 px-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
              type="text"
              name="address"
              id="address"
              placeholder="jln.alamat"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />
          </div>
        </div>
        <div className="w-full sm:w-1/2">
          <label className="mb-3 block text-sm font-medium text-black dark:text-white">
            Nomor Telepon
          </label>
          <div className="relative">
            <input
              className="w-full rounded border border-stroke py-3 px-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
              type="text"
              name="phoneNumber"
              id="phoneNumber"
              placeholder="08957872813"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
            />
          </div>
        </div>
      </div>
      <div className="flex justify-end gap-4.5">
        <Link to="/supplier">
          <button
            className="flex justify-center rounded border border-stroke py-2 px-6 font-medium text-black hover:shadow-1 dark:border-strokedark dark:text-white"
            type="button"
          >
            Batal
          </button>
        </Link>
        <button
          className="flex justify-center rounded bg-primary py-2 px-6 font-medium text-gray hover:bg-opacity-90"
          type="submit"
          disabled={isLoading}
        >
          {isLoading ? 'Memuat...' : 'Simpan'}
        </button>
      </div>
    </form>
  );
};

export default AddSupplier;
