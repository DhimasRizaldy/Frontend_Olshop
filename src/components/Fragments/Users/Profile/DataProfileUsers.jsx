import UserLayouts from '../../../../layout/UserLayouts.jsx';
import DataAddress from '../../Admin/Address/DataAddress.jsx';
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

const genderOptions = [
  { value: 'Laki-Laki', label: 'Laki-Laki' },
  { value: 'Perempuan', label: 'Perempuan' },
];

const DataProfileUsers = () => {
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
        console.error('Fetch profile failed:', error.message);
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

    console.log('username:', username);
    console.log('email:', email);
    console.log('fullName:', fullName);
    console.log('phoneNumber:', phoneNumber);
    console.log('gender:', gender);
    console.log('imageProfile:', imageProfile);

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
      const response = await editProfile(profileData);
      setProfiles((prev) => ({ ...prev, ...profileData }));
      toast.success('Profile updated successfully');
      setTimeout(() => {
        window.location.reload();
      }, 2000); // Reload the page after 2 seconds
    } catch (error) {
      toast.error('Failed to update profile');
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <UserLayouts>
      <div className="max-w-6xl mx-auto px-4 py-6 mt-12">
        <div className="max-w-6xl mx-auto px-4 py-6">
          <ToastContainer />
          <div className="grid grid-cols-5 gap-8">
            <div className="col-span-5 xl:col-span-3">
              <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
                <div className="border-b border-stroke py-4 px-7 dark:border-strokedark">
                  <h3 className="font-medium text-black dark:text-white">
                    Personal Information
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
                              onChange={(e) =>
                                setImageProfile(e.target.files[0])
                              }
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
                          Username
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
                            placeholder="username"
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
                          Email Address
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
                            placeholder="Email Address"
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
                          Fullname
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
                            placeholder="Fullname"
                            value={fullName || profiles?.fullName || ''}
                            onChange={(e) => setFullName(e.target.value)}
                            disabled={isLoading}
                          />
                        </div>
                      </div>

                      <div className="w-full sm:w-1/2">
                        <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                          Phone Number
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
                            placeholder="Phone Number"
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
                          Gender
                        </label>
                        <div className="relative">
                          <select
                            className="w-full rounded border border-stroke py-3 px-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                            value={gender}
                            onChange={(e) => setGender(e.target.value)}
                            disabled={isLoading}
                          >
                            <option value="" disabled>
                              Select Gender
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
                          Role
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
                      <Link to="/users/profile">
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
                        disabled={isLoading}
                      >
                        {isLoading ? 'Updating...' : 'Update'}
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Address */}
        <div className="mb-5 mt-4 flex space-x-4 max-w-6xl mx-auto px-4 py-6">
          <Link to="/users/add-address">
            <Button
              type="submit"
              classname="p-3 font-medium text-white transition border rounded-lg cursor-pointer border-primary bg-primary hover:bg-opacity-90"
            >
              Add Data
            </Button>
          </Link>

          <Link to="/change-password">
            <Button
              type="submit"
              classname="p-3 font-medium text-white transition border rounded-lg cursor-pointer border-primary bg-primary hover:bg-opacity-90"
            >
              Change Password
            </Button>
          </Link>
        </div>

        <div className="flex flex-col gap-10">
          <DataAddress />
        </div>
        {/* End Address */}
      </div>
    </UserLayouts>
  );
};

export default DataProfileUsers;
