import Breadcrumb from '../../../Breadcrumbs/Breadcrumb';
import DefaultLayout from '../../../../layout/DefaultLayout';
import DataAddress from '../Address/DataAddress.jsx';
import Button from '../../../Elements/Button/Index.jsx';
import { Link } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import {
  getProfile,
  editProfile,
} from '../../../../services/admin/profile/services-profile.js';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faPhone,
  faUser,
  faEnvelope,
  faCamera,
} from '@fortawesome/free-solid-svg-icons';
import defaultUser from '../../../../images/user/default-user.png';
import { ToastContainer, toast } from 'react-toastify';
import Skeleton from 'react-loading-skeleton'; // Import Skeleton
import 'react-loading-skeleton/dist/skeleton.css'; // Import CSS

const genderOptions = [
  { value: 'Laki-Laki', label: 'Laki-Laki' },
  { value: 'Perempuan', label: 'Perempuan' },
];

const DataProfileAdmin = () => {
  const [profiles, setProfiles] = useState([]);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [fullName, setFullName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [gender, setGender] = useState('');
  const [imageProfile, setImageProfile] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // get profile
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await getProfile();
        setProfiles(response.data || []);
        setUsername(response.data.users.username || '');
        setEmail(response.data.users.email || '');
        setFullName(response.data.fullName || '');
        setPhoneNumber(response.data.phoneNumber || '');
        setGender(response.data.gender || '');
        setImageProfile(response.data.imageProfile || null);
      } catch (error) {
        console.error('Gagal mengambil data profil:', error.message);
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    };
    fetchProfile();
  }, []);

  // handle update
  const handleSubmit = async (e) => {
    e.preventDefault();

    const profileData = {
      username,
      email,
      fullName,
      phoneNumber,
      gender,
      imageProfile,
    };

    setIsLoading(true);

    try {
      await editProfile(profileData);
      setProfiles((prev) => ({ ...prev, ...profileData }));
      toast.success('Profil berhasil diperbarui');
      setTimeout(() => {
        window.location.reload();
      }, 2000); // Reload the page after 2 seconds
    } catch (error) {
      toast.error('Gagal memperbarui profil');
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <DefaultLayout>
        <div className="mx-auto max-w-270">
          <Breadcrumb pageName="Profil" />
          <ToastContainer />
          <div className="grid grid-cols-5 gap-8">
            <div className="col-span-5 xl:col-span-3">
              <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
                <div className="border-b border-stroke py-4 px-7 dark:border-strokedark">
                  <Skeleton height={30} width={150} />
                </div>
                <div className="p-7">
                  <form>
                    <div className="mb-5.5 flex flex-col gap-5.5 sm:flex-row">
                      <div className="relative z-30 mx-auto my-5 h-30 w-full max-w-30 rounded-full bg-white/20 p-1 backdrop-blur sm:h-44 sm:max-w-44 sm:p-3">
                        <Skeleton circle height={150} width={150} />
                      </div>
                    </div>
                    <div className="mb-5.5 flex flex-col gap-5.5 sm:flex-row">
                      <div className="w-full sm:w-1/2">
                        <Skeleton height={40} width={300} />
                      </div>
                      <div className="w-full sm:w-1/2">
                        <Skeleton height={40} width={300} />
                      </div>
                    </div>
                    <div className="mb-5.5 flex flex-col gap-5.5 sm:flex-row">
                      <div className="w-full sm:w-1/2">
                        <Skeleton height={40} width={300} />
                      </div>
                      <div className="w-full sm:w-1/2">
                        <Skeleton height={40} width={300} />
                      </div>
                    </div>
                    <div className="flex justify-end gap-4.5">
                      <Skeleton height={40} width={100} />
                      <Skeleton height={40} width={100} />
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
          <div className="mb-5 mt-4 flex space-x-4">
            <Skeleton height={40} width={120} />
            <Skeleton height={40} width={120} />
          </div>
        </div>
      </DefaultLayout>
    );
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <DefaultLayout>
      <div className="mx-auto max-w-270">
        <Breadcrumb pageName="Profil" />
        <ToastContainer />
        <div className="grid grid-cols-5 gap-8">
          <div className="col-span-5 xl:col-span-3">
            <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
              <div className="border-b border-stroke py-4 px-7 dark:border-strokedark">
                <h3 className="font-medium text-black dark:text-white">
                  Informasi Pribadi
                </h3>
              </div>
              <div className="p-7">
                <form onSubmit={handleSubmit}>
                  <div className="mb-5.5 flex flex-col gap-5.5 sm:flex-row">
                    {/* Photo */}
                    <div className="relative z-30 mx-auto my-5 h-30 w-full max-w-30 rounded-full bg-white/20 p-1 backdrop-blur sm:h-44 sm:max-w-44 sm:p-3">
                      <div className="relative drop-shadow-2">
                        <img
                          src={profiles.imageProfile || defaultUser}
                          alt="profile"
                          className="rounded-full"
                        />
                        <label className="absolute bottom-0 right-0 flex h-8.5 w-8.5 cursor-pointer items-center justify-center rounded-full bg-primary text-white hover:bg-opacity-90 sm:bottom-2 sm:right-2">
                          <FontAwesomeIcon icon={faCamera} />
                          <input
                            type="file"
                            accept="image/*"
                            name="imageProfile"
                            id="imageProfile"
                            className="sr-only"
                            onChange={(e) => setImageProfile(e.target.files[0])}
                            disabled={isLoading}
                          />
                        </label>
                      </div>
                    </div>
                    {/* End Photo */}
                  </div>
                  <div className="mb-5.5 flex flex-col gap-5.5 sm:flex-row">
                    <div className="w-full sm:w-1/2">
                      <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                        Nama Pengguna
                      </label>
                      <div className="relative">
                        <span className="absolute left-4.5 top-4">
                          <FontAwesomeIcon icon={faUser} />
                        </span>
                        <input
                          className="w-full rounded border border-stroke py-3 pl-11.5 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                          type="text"
                          name="username"
                          id="username"
                          placeholder="Nama Pengguna"
                          value={username}
                          onChange={(e) => setUsername(e.target.value)}
                          disabled={isLoading}
                        />
                      </div>
                    </div>

                    <div className="w-full sm:w-1/2">
                      <label
                        className="mb-3 block text-sm font-medium text-black dark:text-white"
                        htmlFor="emailAddress"
                      >
                        Email
                      </label>
                      <div className="relative">
                        <span className="absolute left-4.5 top-4">
                          <FontAwesomeIcon icon={faEnvelope} />
                        </span>
                        <input
                          className="w-full rounded border border-strok py-3 pl-11.5 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                          type="text"
                          name="email"
                          id="email"
                          placeholder="Alamat Email"
                          value={email || profiles.users?.email || ''}
                          onChange={(e) => setEmail(e.target.value)}
                          disabled={isLoading}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="mb-5.5 flex flex-col gap-5.5 sm:flex-row">
                    <div className="w-full sm:w-1/2">
                      <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                        Nama Lengkap
                      </label>
                      <div className="relative">
                        <span className="absolute left-4.5 top-4">
                          <FontAwesomeIcon icon={faUser} />
                        </span>
                        <input
                          className="w-full rounded border border-stroke py-3 pl-11.5 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                          type="text"
                          name="fullName"
                          id="fullName"
                          placeholder="Nama Lengkap"
                          value={fullName || profiles?.fullName || ''}
                          onChange={(e) => setFullName(e.target.value)}
                          disabled={isLoading}
                        />
                      </div>
                    </div>

                    <div className="w-full sm:w-1/2">
                      <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                        Nomor Telepon
                      </label>
                      <div className="relative">
                        <span className="absolute left-4.5 top-4">
                          <FontAwesomeIcon icon={faPhone} />
                        </span>
                        <input
                          className="w-full rounded border border-stroke py-3 pl-11.5 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                          type="text"
                          name="phoneNumber"
                          id="phoneNumber"
                          placeholder="Nomor Telepon"
                          value={phoneNumber || profiles?.phoneNumber || ''}
                          onChange={(e) => setPhoneNumber(e.target.value)}
                          disabled={isLoading}
                        />
                      </div>
                    </div>
                  </div>

                  <div className="mb-5.5 flex flex-col gap-5.5 sm:flex-row">
                    <div className="w-full sm:w-1/2">
                      <label className="mb-3 block font-medium text-black dark:text-white">
                        Jenis Kelamin
                      </label>
                      <div className="relative">
                        <select
                          className="w-full rounded border border-stroke py-3 px-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                          value={gender}
                          onChange={(e) => setGender(e.target.value)}
                          disabled={isLoading}
                        >
                          <option value="" disabled>
                            Pilih Jenis Kelamin
                          </option>
                          {genderOptions.map((option) => (
                            <option key={option.value} value={option.value}>
                              {option.label}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>

                    <div className="w-full sm:w-1/2">
                      <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                        Akses
                      </label>
                      <div className="relative">
                        <span className="absolute left-4.5 top-4">
                          <FontAwesomeIcon icon={faUser} />
                        </span>
                        <input
                          className="w-full rounded border border-stroke bg-gray py-3 pl-11.5 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                          type="text"
                          name="role"
                          id="role"
                          defaultValue={profiles?.users?.role || ''}
                          disabled
                        />
                      </div>
                    </div>
                  </div>

                  <div className="flex justify-end gap-4.5">
                    <Link to="/admin/profile">
                      <button
                        className="flex justify-center rounded border border-stroke py-2 px-6 font-medium text-black hover:shadow-1 dark:border-strokedark dark:text-white"
                        type="submit"
                      >
                        Batal
                      </button>
                    </Link>
                    <button
                      className="flex justify-center rounded bg-primary py-2 px-6 font-medium text-gray hover:bg-opacity-90"
                      type="submit"
                      disabled={isLoading}
                    >
                      {isLoading ? 'Memperbarui...' : 'Perbarui'}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Address */}
      <div className="mb-5 mt-10 flex space-x-4">
        <Link to="/admin/add-address">
          <Button
            type="submit"
            classname="p-3 font-medium text-white transition border rounded-lg cursor-pointer border-primary bg-primary hover:bg-opacity-90"
          >
            Tambah Data
          </Button>
        </Link>

        <Link to="/change-password">
          <Button
            type="submit"
            classname="p-3 font-medium text-white transition border rounded-lg cursor-pointer border-primary bg-primary hover:bg-opacity-90"
          >
            Ubah Kata Sandi
          </Button>
        </Link>
      </div>

      <div className="flex flex-col gap-10">
        <DataAddress />
      </div>
      {/* End Address */}
    </DefaultLayout>
  );
};

export default DataProfileAdmin;
