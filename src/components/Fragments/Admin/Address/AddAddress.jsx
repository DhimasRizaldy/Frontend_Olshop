import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Select from 'react-select';
import { addAddress } from '../../../../services/admin/address/services-address';
import { getWHOAMI } from '../../../../services/auth/admin/getDataUser';
import {
  fetchCities,
  fetchProvinces,
} from '../../../../services/users/rajaongkir/rajaongkir-services';

const AddAddress = () => {
  const [nameAddress, setNameAddress] = useState('');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [cityName, setCityName] = useState('');
  const [province, setProvince] = useState('');
  const [provinceName, setProvinceName] = useState('');
  const [postalCode, setPostalCode] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [role, setRole] = useState('USER'); // Default role
  const [cities, setCities] = useState([]);
  const [provinces, setProvinces] = useState([]);
  const navigate = useNavigate();

  // Fetch user role
  useEffect(() => {
    const fetchUserRole = async () => {
      try {
        const response = await getWHOAMI();
        setRole(response.data.role || 'USER'); // Default to 'USER' if role not found
      } catch (error) {
        console.error('Gagal mengambil peran pengguna:', error);
      }
    };
    fetchUserRole();
  }, []);

  // Fetch provinces from Raja Ongkir
  useEffect(() => {
    const fetchProvinceData = async () => {
      try {
        const results = await fetchProvinces();
        const provinceOptions = results.map((province) => ({
          value: province.province_id,
          label: province.province,
        }));
        setProvinces(provinceOptions);
      } catch (error) {
        console.error('Gagal mengambil data provinsi:', error);
      }
    };
    fetchProvinceData();
  }, []);

  // Fetch cities from Raja Ongkir based on selected province
  useEffect(() => {
    const fetchCityData = async () => {
      if (province) {
        try {
          const results = await fetchCities(province);
          const cityOptions = results.map((city) => ({
            value: city.city_id,
            label: city.city_name,
          }));
          setCities(cityOptions);
        } catch (error) {
          console.error('Gagal mengambil data kota:', error);
        }
      }
    };
    fetchCityData();
  }, [province]);

  // Handle submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!nameAddress || !address || !city || !province || !postalCode) {
      toast.error('Harap isi semua kolom dengan lengkap');
      return;
    }

    const addressData = {
      nameAddress,
      address,
      city: cityName, // Mengirimkan nama kota
      country: provinceName, // Mengirimkan nama provinsi
      postalCode,
    };

    setIsLoading(true);

    try {
      await addAddress(addressData);
      toast.success('Alamat berhasil ditambahkan!');
      setNameAddress('');
      setAddress('');
      setCity('');
      setCityName('');
      setProvince('');
      setProvinceName('');
      setPostalCode('');
      navigate(role === 'USER' ? '/users/profile' : '/admin/profile'); // Redirect based on role
    } catch (error) {
      toast.error('Gagal menambahkan alamat');
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
            Nama Alamat
          </label>
          <div className="relative">
            <input
              className="w-full rounded border border-stroke py-3 px-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
              type="text"
              name="nameAddress"
              id="nameAddress"
              placeholder="Nama Alamat"
              value={nameAddress}
              onChange={(e) => setNameAddress(e.target.value)}
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
              placeholder="Alamat"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
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
            <Select
              options={provinces}
              value={provinces.find((option) => option.value === province)}
              onChange={(option) => {
                setProvince(option.value);
                setProvinceName(option.label);
              }}
              isSearchable
              placeholder="Pilih Provinsi"
            />
          </div>
        </div>
        <div className="w-full sm:w-1/2">
          <label className="mb-3 block text-sm font-medium text-black dark:text-white">
            Kota
          </label>
          <div className="relative">
            <Select
              options={cities}
              value={cities.find((option) => option.value === city)}
              onChange={(option) => {
                setCity(option.value);
                setCityName(option.label);
              }}
              isSearchable
              placeholder="Pilih Kota"
              isDisabled={!province} // Disable if province is not selected
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
              placeholder="Kode Pos"
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

export default AddAddress;
