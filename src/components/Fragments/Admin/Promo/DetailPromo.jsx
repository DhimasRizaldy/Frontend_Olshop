import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { getPromoById } from '../../../../services/admin/promo/services-promo';
import { formatDate } from '../../../../utils/constants/function';

const DetailPromo = () => {
  const { promoId } = useParams();
  const [codePromo, setCodePromo] = useState('');
  const [discount, setDiscount] = useState('');
  const [activeAt, setActiveAt] = useState(null);
  const [expiresAt, setExpiresAt] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchPromoData = async () => {
      try {
        const response = await getPromoById(promoId);
        setCodePromo(response.data.codePromo);
        setDiscount(response.data.discount);
        setActiveAt(formatDate(response.data.activeAt)); // Format tanggal
        setExpiresAt(formatDate(response.data.expiresAt)); // Format tanggal
      } catch (error) {
        toast.error('Gagal mengambil data promo');
        console.error('Error:', error);
      }
    };

    fetchPromoData();
  }, [promoId]);

  return (
    <form action="#">
      <div className="mb-5.5 flex flex-col gap-5.5 sm:flex-row">
        <div className="w-full sm:w-1/2">
          <label className="mb-3 block text-sm font-medium text-black dark:text-white">
            Kode Promo
          </label>
          <div className="relative">
            <input
              className="w-full rounded border border-stroke py-3 px-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
              type="text"
              name="codePromo"
              id="codePromo"
              value={codePromo}
              onChange={(e) => setCodePromo(e.target.value)}
              disabled
            />
          </div>
        </div>
        <div className="w-full sm:w-1/2">
          <label className="mb-3 block text-sm font-medium text-black dark:text-white">
            Diskon (%)
          </label>
          <div className="relative">
            <input
              className="w-full rounded border border-stroke py-3 px-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
              type="text"
              name="discount"
              id="discount"
              value={discount}
              onChange={(e) => setDiscount(e.target.value)}
              disabled
            />
          </div>
        </div>
      </div>
      <div className="mb-5.5 flex flex-col gap-5.5 sm:flex-row">
        <div className="w-full sm:w-1/2">
          <label className="mb-3 block text-sm font-medium text-black dark:text-white">
            Tanggal Aktif
          </label>
          <div className="relative">
            <input
              className="w-full rounded border border-stroke py-3 px-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
              type="text"
              name="activeAt"
              id="activeAt"
              value={activeAt}
              onChange={(e) => setActiveAt(e.target.value)}
              disabled
            />
          </div>
        </div>
        <div className="w-full sm:w-1/2">
          <label className="mb-3 block text-sm font-medium text-black dark:text-white">
            Tanggal Kadaluarsa
          </label>
          <div className="relative">
            <input
              className="w-full rounded border border-stroke py-3 px-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
              type="text"
              name="expiresAt"
              id="expiresAt"
              value={expiresAt}
              onChange={(e) => setExpiresAt(e.target.value)}
              disabled
            />
          </div>
        </div>
      </div>

      <div className="flex justify-end gap-4.5">
        <Link to="/promo">
          <button
            className="flex justify-center rounded border border-stroke py-2 px-6 font-medium text-black hover:shadow-1 dark:border-strokedark dark:text-white"
            type="submit"
          >
            Kembali
          </button>
        </Link>
      </div>
    </form>
  );
};

export default DetailPromo;
