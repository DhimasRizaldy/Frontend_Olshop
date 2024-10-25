import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {
  editPromo,
  getPromoById,
} from '../../../../services/admin/promo/services-promo';
import { formatDate } from '../../../../utils/constants/function';

const EditPromo = () => {
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

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!codePromo || !discount || !activeAt || !expiresAt) {
      toast.error('Harap isi semua kolom dengan lengkap');
      return;
    }

    if (parseInt(discount, 10) > 100) {
      toast.error('Diskon tidak boleh lebih dari 100%');
      return;
    }

    const activeDate = new Date(activeAt);
    const expireDate = new Date(expiresAt);

    if (expireDate < activeDate) {
      toast.error(
        'Tanggal kadaluarsa tidak boleh lebih awal dari tanggal aktif',
      );
      return;
    }

    const promoData = {
      codePromo,
      discount: parseInt(discount, 10),
      activeAt: activeDate.toISOString(), // Konversi kembali ke ISO
      expiresAt: expireDate.toISOString(), // Konversi kembali ke ISO
    };

    setIsLoading(true);

    try {
      await editPromo(promoId, promoData);
      toast.success('Promo berhasil diperbarui!');
    } catch (error) {
      toast.error('Gagal memperbarui promo. Silakan coba lagi.');
      console.error('Error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <ToastContainer />
      <form onSubmit={handleSubmit}>
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
                disabled={isLoading}
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
                type="number"
                name="discount"
                id="discount"
                value={discount}
                onChange={(e) => setDiscount(e.target.value)}
                disabled={isLoading}
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
                type="date"
                name="activeAt"
                id="activeAt"
                value={activeAt}
                onChange={(e) => setActiveAt(e.target.value)}
                disabled={isLoading}
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
                type="date"
                name="expiresAt"
                id="expiresAt"
                value={expiresAt}
                onChange={(e) => setExpiresAt(e.target.value)}
                disabled={isLoading}
              />
            </div>
          </div>
        </div>

        <div className="flex justify-end gap-4.5">
          <Link to="/promo">
            <button
              className="flex justify-center rounded border border-stroke py-2 px-6 font-medium text-black hover:shadow-1 dark:border-strokedark dark:text-white"
              type="button"
              disabled={isLoading}
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
    </>
  );
};

export default EditPromo;
