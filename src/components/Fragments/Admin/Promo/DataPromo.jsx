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
  getPromo,
  deletePromo,
} from '../../../../services/admin/promo/services-promo';

const DataPromo = () => {
  const [promo, setPromo] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // get promo
  useEffect(() => {
    const fetchPromo = async () => {
      try {
        const response = await getPromo();
        // console.log('API Response:', response);
        setPromo(response.data || []); // Simpan data promo dalam state
      } catch (error) {
        console.error('Fetch promo failed:', error.message);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchPromo();
  }, []);

  // handle delete
  const handleDelete = async (promoId, promoName) => {
    Swal.fire({
      title: 'Are you sure?',
      text: `You are about to delete the promo "${promoName}". You won't be able to revert this!`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const response = await deletePromo(promoId);
          if (response.success) {
            Swal.fire(
              'Deleted!',
              `Promo "${promoName}" has been deleted.`,
              'success',
            );
            // Update state to remove the deleted promo
            setPromo(promo.filter((promo) => promo.promoId !== promoId));
          }
        } catch (error) {
          console.error('Error deleting promo:', error.message);
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
          Data Promo
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
                  PromoId
                </th>
                <th className="min-w-[120px] py-4 px-4 font-medium text-black dark:text-white xl:pl-8">
                  Code Promo
                </th>
                <th className="min-w-[120px] py-4 px-4 font-medium text-black dark:text-white xl:pl-8">
                  Discount
                </th>
                <th className="min-w-[120px] py-4 px-4 font-medium text-black dark:text-white xl:pl-8">
                  Active
                </th>
                <th className="min-w-[120px] py-4 px-4 font-medium text-black dark:text-white">
                  Expire
                </th>
                <th className="py-4 px-4 font-medium text-black dark:text-white">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {promo.length > 0 ? (
                promo.map((promo, index) => (
                  <tr key={promo.promoId}>
                    <td className="border-b border-[#eee] py-5 px-4 pl-6 dark:border-strokedark xl:pl-9">
                      <p className="text-black dark:text-white">{index + 1}</p>
                    </td>
                    <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                      <p
                        className={`inline-flex rounded-full bg-opacity-10 py-1 px-3 text-sm font-medium`}
                      >
                        {promo.promoId}
                      </p>
                    </td>
                    <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                      <p
                        className={`inline-flex rounded-full bg-opacity-10 py-1 px-3 text-sm font-medium bg-success text-success`}
                      >
                        {promo.codePromo}
                      </p>
                    </td>
                    <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                      <p
                        className={`inline-flex rounded-full bg-opacity-10 py-1 px-3 text-sm font-medium bg-primary text-primary`}
                      >
                        {promo.discount} %
                      </p>
                    </td>
                    <td className="border-b border-[#eee] py-5 px-6 pl-6 dark:border-strokedark xl:pl-8">
                      <p className="text-black dark:text-white">
                        {promo.activeAt}
                      </p>
                    </td>
                    <td className="border-b border-[#eee] py-5 px-6 dark:border-strokedark">
                      <p className="text-black dark:text-white">
                        {promo.expiresAt}
                      </p>
                    </td>
                    <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                      <div className="flex items-center space-x-3.5">
                        <Link to={`/detail-promo/${promo.promoId}`}>
                          <button className="hover:text-primary">
                            <FontAwesomeIcon icon={faEye} />
                          </button>
                        </Link>
                        <Link to={`/edit-promo/${promo.promoId}`}>
                          <button className="hover:text-primary">
                            <FontAwesomeIcon icon={faPenToSquare} />
                          </button>
                        </Link>
                        <button
                          className="hover:text-primary"
                          onClick={() =>
                            handleDelete(promo.promoId, promo.codePromo)
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
                    No promo available.
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

export default DataPromo;
