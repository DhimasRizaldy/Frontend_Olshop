import React, { useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import {
  faPenToSquare,
  faTrash,
  faEye,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom';
import {
  getAddress,
  deleteAddress,
} from '../../../../services/admin/address/services-address';
import { getWHOAMI } from '../../../../services/auth/admin/getDataUser';

const DataAddress = () => {
  const [address, setAddress] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [userRole, setUserRole] = useState('');

  // Fetch addresses
  useEffect(() => {
    const fetchAddress = async () => {
      try {
        const response = await getAddress();
        setAddress(response.data || []);
      } catch (error) {
        console.error('Fetch address failed:', error.message);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchAddress();
  }, []);

  // Fetch user role
  useEffect(() => {
    const fetchUserRole = async () => {
      try {
        const response = await getWHOAMI();
        const user = response.data.user;
        setUserRole(user.role);
      } catch (error) {
        console.error('Error fetching user data:', error.message);
      }
    };

    fetchUserRole();
  }, []);

  // Handle delete
  const handleDelete = async (addressId, addressName) => {
    Swal.fire({
      title: 'Are you sure?',
      text: `You are about to delete the address "${addressName}". You won't be able to revert this!`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const response = await deleteAddress(addressId);
          if (response.success) {
            Swal.fire(
              'Deleted!',
              `Address "${addressName}" has been deleted.`,
              'success',
            );
            setAddress(
              address.filter((address) => address.addressId !== addressId),
            );
          }
        } catch (error) {
          console.error('Error deleting address:', error.message);
          Swal.fire('Error!', error.message, 'error');
        }
      }
    });
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="p-4">
      <h4 className="text-2xl font-bold text-gray-800 dark:text-gray-200 mb-6">
        Data Address
      </h4>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {address.length > 0 ? (
          address.map((address) => (
            <div
              key={address.addressId}
              className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden"
            >
              <div className="p-4">
                <h5 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-3">
                  {address.nameAddress}
                </h5>
                <p className="text-gray-600 dark:text-gray-400 mb-1">
                  <strong>Address:</strong>{' '}
                  {address.address.length > 40
                    ? `${address.address.slice(0, 40)}...`
                    : address.address}
                </p>
                <p className="text-gray-600 dark:text-gray-400 mb-1">
                  <strong>City:</strong> {address.city}
                </p>
                <p className="text-gray-600 dark:text-gray-400 mb-1">
                  <strong>Country:</strong> {address.country}
                </p>
                <p className="text-gray-600 dark:text-gray-400 mb-1">
                  <strong>Postal Code:</strong> {address.postalCode}
                </p>
              </div>
              <div className="flex justify-end p-4 space-x-2 bg-gray-100 dark:bg-gray-700">
                <Link
                  to={`/${userRole === 'USER' ? 'users' : 'admin'}/detail-address/${address.addressId}`}
                  className="hover:text-primary"
                >
                  <FontAwesomeIcon icon={faEye} />
                </Link>
                <Link
                  to={`/${userRole === 'USER' ? 'users' : 'admin'}/edit-address/${address.addressId}`}
                  className="hover:text-primary"
                >
                  <FontAwesomeIcon icon={faPenToSquare} />
                </Link>
                <button
                  className="hover:text-primary"
                  onClick={() =>
                    handleDelete(address.addressId, address.nameAddress)
                  }
                >
                  <FontAwesomeIcon icon={faTrash} />
                </button>
              </div>
            </div>
          ))
        ) : (
          <div className="col-span-full text-center text-gray-500 dark:text-gray-400 py-6">
            No address available.
          </div>
        )}
      </div>
    </div>
  );
};

export default DataAddress;
