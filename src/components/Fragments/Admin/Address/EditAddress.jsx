import React, { useState, useEffect } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Select from 'react-select';
import {
  editAddress,
  getAddressById,
} from '../../../../services/admin/address/services-address';
import { getWHOAMI } from '../../../../services/auth/admin/getDataUser';
import {
  fetchCities,
  fetchProvinces,
} from '../../../../services/users/rajaongkir/rajaongkir-services';

const EditAddress = () => {
  const { addressId } = useParams();
  const navigate = useNavigate();
  const [nameAddress, setNameAddress] = useState('');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [cityName, setCityName] = useState('');
  const [province, setProvince] = useState('');
  const [provinceName, setProvinceName] = useState('');
  const [postalCode, setPostalCode] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [userRole, setUserRole] = useState('');
  const [cities, setCities] = useState([]);
  const [provinces, setProvinces] = useState([]);

  useEffect(() => {
    const fetchAddressData = async () => {
      try {
        const response = await getAddressById(addressId);
        setNameAddress(response.data.nameAddress);
        setAddress(response.data.address);
        setCity(response.data.city);
        setCityName(response.data.city);
        setProvince(response.data.country);
        setProvinceName(response.data.country);
        setPostalCode(response.data.postalCode);
      } catch (error) {
        toast.error('Gagal mengambil data alamat');
        console.error('Error:', error);
      }
    };

    const fetchUserRole = async () => {
      try {
        const response = await getWHOAMI();
        setUserRole(response.data.user.role);
      } catch (error) {
        toast.error('Gagal mengambil peran pengguna');
        console.error('Error:', error);
      }
    };

    fetchAddressData();
    fetchUserRole();
  }, [addressId]);

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
      await editAddress(addressId, addressData);
      toast.success('Alamat berhasil diperbarui!');
      navigate(userRole === 'USER' ? '/users/profile' : '/admin/profile'); // Redirect based on role
    } catch (error) {
      toast.error('Gagal memperbarui alamat. Silakan coba lagi.');
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
                disabled={isLoading}
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
                disabled={isLoading}
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
                isDisabled={isLoading}
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
                isDisabled={!province || isLoading} // Disable if province is not selected or loading
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
            Batal
          </button>
          <button
            className={`flex justify-center rounded py-2 px-6 font-medium ${isLoading ? 'bg-gray-400 text-gray-200' : 'bg-primary text-gray hover:bg-opacity-90'}`}
            type="submit"
            disabled={isLoading}
          >
            {isLoading ? 'Memperbarui...' : 'Perbarui'}
          </button>
        </div>
      </form>
    </>
  );
};

export default EditAddress;
