import React, { useEffect, useState } from 'react';
import {
  faPenToSquare,
  faTrash,
  faEye,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import {
  getSupplier,
  deleteSupplier,
} from '../../../../services/admin/supplier/services-supplier';

const DataSupplier = () => {
  const [suppliers, setSupplier] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // get supplier
  useEffect(() => {
    const fetchSupplier = async () => {
      try {
        const response = await getSupplier();
        // console.log('API Response:', response);
        setSupplier(response.data || []); // Simpan data kategori dalam state
      } catch (error) {
        console.error('Fetch supplier failed:', error.message);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchSupplier();
  }, []);

  // handle delete
  const handleDelete = async (supplierId, supplierName) => {
    Swal.fire({
      title: 'Are you sure?',
      text: `You are about to delete the supplier "${supplierName}". You won't be able to revert this!`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const response = await deleteSupplier(supplierId);
          if (response.success) {
            Swal.fire(
              'Deleted!',
              `Supplier "${supplierName}" has been deleted.`,
              'success',
            );
            // Update state to remove the deleted supplier
            setSupplier(
              suppliers.filter(
                (supplier) => supplier.supplierId !== supplierId,
              ),
            );
          }
        } catch (error) {
          console.error('Error deleting supplier:', error.message);
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
          Data Supplier
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
                  SupplierId
                </th>
                <th className="min-w-[120px] py-4 px-4 font-medium text-black dark:text-white xl:pl-11">
                  Name
                </th>
                <th className="min-w-[120px] py-4 px-4 font-medium text-black dark:text-white xl:pl-11">
                  Email
                </th>
                <th className="min-w-[120px] py-4 px-4 font-medium text-black dark:text-white xl:pl-11">
                  Address
                </th>
                <th className="min-w-[120px] py-4 px-4 font-medium text-black dark:text-white xl:pl-11">
                  PhoneNumber
                </th>
                <th className="py-4 px-4 font-medium text-black dark:text-white">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {suppliers.length > 0 ? (
                suppliers.map((supplier, index) => (
                  <tr key={supplier.supplierId}>
                    <td className="border-b border-[#eee] py-5 px-4 pl-6 dark:border-strokedark xl:pl-9">
                      <p className="text-black dark:text-white">{index + 1}</p>
                    </td>
                    <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark xl:pl-7">
                      <p
                        className={`inline-flex rounded-full bg-opacity-10 py-1 px-3 text-sm font-medium`}
                      >
                        {supplier.supplierId}
                      </p>
                    </td>
                    <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark xl:pl-11">
                      <p className="text-black dark:text-white">
                        {supplier.name}
                      </p>
                    </td>
                    <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark xl:pl-11">
                      <p className="text-black dark:text-white">
                        {supplier.email}
                      </p>
                    </td>
                    <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark xl:pl-11">
                      <p className="text-black dark:text-white">
                        {supplier.address.length > 15
                          ? `${supplier.address.slice(0, 15)}...`
                          : supplier.address}
                      </p>
                    </td>
                    <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark xl:pl-11">
                      <p className="text-black dark:text-white">
                        {supplier.phoneNumber}
                      </p>
                    </td>
                    <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                      <div className="flex items-center space-x-3.5">
                        <Link to={`/detail-supplier/${supplier.supplierId}`}>
                          <button className="hover:text-primary">
                            <FontAwesomeIcon icon={faEye} />
                          </button>
                        </Link>
                        <Link to={`/edit-supplier/${supplier.supplierId}`}>
                          <button className="hover:text-primary">
                            <FontAwesomeIcon icon={faPenToSquare} />
                          </button>
                        </Link>
                        <button
                          className="hover:text-primary"
                          onClick={() =>
                            handleDelete(supplier.supplierId, supplier.name)
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
                  <td colSpan="8" className="text-center py-5">
                    No supplier available.
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

export default DataSupplier;
