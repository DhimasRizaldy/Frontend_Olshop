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
  getManageStok,
  deleteManageStok,
} from '../../../../services/admin/manageStok/services-manageStok';

const DataManagement = () => {
  const [manageStoks, setManageStok] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // get manage stok
  useEffect(() => {
    const fetchManageStok = async () => {
      try {
        const response = await getManageStok();
        // console.log('API Response:', response);
        setManageStok(response.data || []); // Simpan data kategori dalam state
      } catch (error) {
        console.error('Fetch manage stok failed:', error.message);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchManageStok();
  }, []);

  // handle delete
  const handleDelete = async (manageStockId, manageStokName) => {
    Swal.fire({
      title: 'Are you sure?',
      text: `You are about to delete the manage stok "${manageStokName}". You won't be able to revert this!`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const response = await deleteManageStok(manageStockId);
          if (response.success) {
            Swal.fire(
              'Deleted!',
              `Manage stok "${manageStokName}" has been deleted.`,
              'success',
            );
            // Update state to remove the deleted manage stok
            setManageStok(
              manageStoks.filter(
                (manageStok) => manageStok.manageStockId !== manageStockId,
              ),
            );
          }
        } catch (error) {
          console.error('Error deleting manage stok:', error.message);
          Swal.fire('Error', error.message, 'error');
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
          Data Management Product
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
                  MProductId
                </th>
                <th className="min-w-[120px] py-4 px-4 font-medium text-black dark:text-white xl:pl-8">
                  SupplierId
                </th>
                <th className="min-w-[120px] py-4 px-4 font-medium text-black dark:text-white">
                  ProductId
                </th>
                <th className="min-w-[120px] py-4 px-4 font-medium text-black dark:text-white">
                  StockIn
                </th>
                <th className="min-w-[120px] py-4 px-4 font-medium text-black dark:text-white">
                  DateStockIn
                </th>
                <th className="py-4 px-4 font-medium text-black dark:text-white">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {manageStoks.length > 0 ? (
                manageStoks.map((manageStok, index) => (
                  <tr key={manageStok.manageStockId}>
                    <td className="border-b border-[#eee] py-5 px-4 pl-6 dark:border-strokedark xl:pl-9">
                      <p className="text-black dark:text-white">{index + 1}</p>
                    </td>
                    <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                      <p
                        className={`inline-flex rounded-full bg-opacity-10 py-1 px-3 text-sm font-medium`}
                      >
                        {manageStok.manageStockId}
                      </p>
                    </td>
                    <td className="border-b border-[#eee] py-5 px-5 dark:border-strokedark xl:pl-9">
                      <p
                        className={`inline-flex rounded-full bg-opacity-10 py-1 px-3 text-sm font-medium`}
                      >
                        {manageStok.supplier.name}
                      </p>
                    </td>
                    <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                      <p
                        className={`inline-flex rounded-full bg-opacity-10 py-1 px-3 text-sm font-medium`}
                      >
                        {manageStok.product.name}
                      </p>
                    </td>
                    <td className="border-b border-[#eee] py-5 px-8 dark:border-strokedark">
                      <p className="text-black dark:text-white">
                        {manageStok.stockIn}
                      </p>
                    </td>
                    <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                      <p className="text-black dark:text-white">
                        {manageStok.dateStockIn}
                      </p>
                    </td>
                    <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                      <div className="flex items-center space-x-3.5">
                        <Link
                          to={`/detail-management/${manageStok.manageStockId}`}
                        >
                          <button className="hover:text-primary">
                            <FontAwesomeIcon icon={faEye} />
                          </button>
                        </Link>
                        <Link
                          to={`/edit-management/${manageStok.manageStockId}`}
                        >
                          <button className="hover:text-primary">
                            <FontAwesomeIcon icon={faPenToSquare} />
                          </button>
                        </Link>
                        <button
                          className="hover:text-primary"
                          onClick={() =>
                            handleDelete(
                              manageStok.manageStockId,
                              manageStok.product.name,
                            )
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
                    No manage stok available.
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

export default DataManagement;
