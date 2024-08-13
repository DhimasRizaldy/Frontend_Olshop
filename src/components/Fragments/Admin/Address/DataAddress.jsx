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

const DataAddress = () => {
  const [address, setAddress] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // get address
  useEffect(() => {
    const fetchAddress = async () => {
      try {
        const response = await getAddress();
        // console.log('API Response:', response);
        setAddress(response.data || []); // Simpan data kategori dalam state
      } catch (error) {
        console.error('Fetch address failed:', error.message);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchAddress();
  }, []);

  // handle delete
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
            // Update state to remove the deleted address
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

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
      <div className="py-6 px-4 md:px-6 xl:px-7.5">
        <h4 className="text-xl font-semibold text-black dark:text-white">
          Data Address
        </h4>
      </div>

      <div className="rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
        <div className="max-w-full overflow-x-auto">
          <table className="w-full table-auto">
            <thead>
              <tr className="bg-gray-2 text-left dark:bg-meta-4">
                <th className="min-w-[120px] py-4 px-4 font-medium text-black dark:text-white xl:pl-8">
                  No
                </th>
                <th className="min-w-[120px] py-4 px-4 font-medium text-black dark:text-white xl:pl-8">
                  AddressId
                </th>
                <th className="min-w-[120px] py-4 px-4 font-medium text-black dark:text-white xl:pl-8">
                  Name Address
                </th>
                <th className="min-w-[120px] py-4 px-4 font-medium text-black dark:text-white xl:pl-8">
                  Address
                </th>
                <th className="min-w-[120px] py-4 px-4 font-medium text-black dark:text-white">
                  City
                </th>
                <th className="min-w-[120px] py-4 px-4 font-medium text-black dark:text-white">
                  Country
                </th>
                <th className="min-w-[120px] py-4 px-4 font-medium text-black dark:text-white">
                  PostalCode
                </th>
                <th className="py-4 px-4 font-medium text-black dark:text-white">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {address.length > 0 ? (
                address.map((address, index) => (
                  <tr key={address.addressId}>
                    <td className="border-b border-[#eee] py-5 px-4 pl-6 dark:border-strokedark xl:pl-9">
                      <p className="text-black dark:text-white">{index + 1}</p>
                    </td>
                    <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                      <p
                        className={`inline-flex rounded-full bg-opacity-10 py-1 px-3 text-sm font-medium`}
                      >
                        {address.addressId}
                      </p>
                    </td>
                    <td className="border-b border-[#eee] py-5 px-6 pl-6 dark:border-strokedark xl:pl-8">
                      <p className="text-black dark:text-white">
                        {address.nameAddress}
                      </p>
                    </td>
                    <td className="border-b border-[#eee] py-5 px-6 pl-6 dark:border-strokedark xl:pl-8">
                      <p className="text-black dark:text-white">
                        {address.address.length > 15
                          ? `${address.address.slice(0, 15)}...`
                          : address.address}
                      </p>
                    </td>
                    <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                      <p className="text-black dark:text-white">
                        {address.city}
                      </p>
                    </td>
                    <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                      <p className="text-black dark:text-white">
                        {address.country}
                      </p>
                    </td>
                    <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                      <p className="text-black dark:text-white">
                        {address.postalCode}
                      </p>
                    </td>
                    <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                      <div className="flex items-center space-x-3.5">
                        <Link to={`/detail-address/${address.addressId}`}>
                          <button className="hover:text-primary">
                            <FontAwesomeIcon icon={faEye} />
                          </button>
                        </Link>
                        <Link to={`/edit-address/${address.addressId}`}>
                          <button className="hover:text-primary">
                            <FontAwesomeIcon icon={faPenToSquare} />
                          </button>
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
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="4" className="text-center py-5">
                    No address available.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default DataAddress;
