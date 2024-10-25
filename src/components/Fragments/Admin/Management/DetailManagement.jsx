import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { getManageStokById } from '../../../../services/admin/manageStok/services-manageStok';
import { formatDate } from '../../../../utils/constants/function';
import { formatRupiah } from '../../../../utils/constants/function';

const DetailManagement = () => {
  const { manageStockId } = useParams();
  const [supplierName, setSupplierName] = useState('');
  const [productName, setProductName] = useState('');
  const [stockIn, setStockIn] = useState('');
  const [purchasePrice, setPurchasePrice] = useState('');
  const [dateStockIn, setDateStockIn] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchManageStokData = async () => {
      try {
        const response = await getManageStokById(manageStockId);
        if (response && response.data) {
          const { supplier, product, stockIn, purchasePrice, dateStockIn } =
            response.data;
          setSupplierName(supplier.name);
          setProductName(product.name);
          setStockIn(stockIn);
          setPurchasePrice(purchasePrice ? purchasePrice.toString() : 'N/A');
          setDateStockIn(formatDate(dateStockIn));
        } else {
          throw new Error('Data stok tidak ditemukan');
        }
      } catch (error) {
        toast.error('Gagal mengambil data stok');
        console.error('Error fetching manage stock data:', error.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchManageStokData();
  }, [manageStockId]);

  const formatNumber = (value) => {
    if (!value) return '';
    return new Intl.NumberFormat('id-ID').format(value);
  };

  return (
    <form action="#">
      <div className="mb-5.5 flex flex-col gap-5.5 sm:flex-row">
        <div className="w-full sm:w-1/2">
          <label className="mb-3 block text-sm font-medium text-black dark:text-white">
            Supplier
          </label>
          <div className="relative">
            <input
              className="w-full rounded border border-stroke py-3 px-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
              type="text"
              name="supplierName"
              id="supplierName"
              value={supplierName}
              disabled
            />
          </div>
        </div>
        <div className="w-full sm:w-1/2">
          <label className="mb-3 block text-sm font-medium text-black dark:text-white">
            Produk
          </label>
          <div className="relative">
            <input
              className="w-full rounded border border-stroke py-3 px-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
              type="text"
              name="productName"
              id="productName"
              value={productName}
              disabled
            />
          </div>
        </div>
      </div>
      <div className="mb-5.5 flex flex-col gap-5.5 sm:flex-row">
        <div className="w-full sm:w-1/2">
          <label className="mb-3 block font-medium text-black dark:text-white">
            Stok Masuk
          </label>
          <input
            className="w-full rounded border border-stroke py-3 px-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
            type="text"
            value={formatNumber(stockIn)}
            disabled
          />
        </div>
        <div className="w-full sm:w-1/2">
          <label className="mb-3 block font-medium text-black dark:text-white">
            Harga Beli
          </label>
          <div className="relative">
            <input
              className="w-full rounded border border-stroke py-3 px-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
              type="text"
              name="purchasePrice"
              id="purchasePrice"
              value={formatRupiah(purchasePrice)}
              disabled
            />
          </div>
        </div>
      </div>
      <div className="mb-5.5 flex flex-col gap-5.5 sm:flex-row">
        <div className="w-full sm:w-1/2">
          <label className="mb-3 block text-sm font-medium text-black dark:text-white">
            Tanggal Stok Masuk
          </label>
          <div className="relative">
            <input
              className="w-full rounded border border-stroke py-3 px-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
              type="date"
              name="dateStockIn"
              id="dateStockIn"
              value={dateStockIn}
              disabled
            />
          </div>
        </div>
      </div>

      <div className="flex justify-end gap-4.5">
        <Link to="/management">
          <button
            className="flex justify-center rounded border border-stroke py-2 px-6 font-medium text-black hover:shadow-1 dark:border-strokedark dark:text-white"
            type="button"
          >
            Kembali
          </button>
        </Link>
      </div>
    </form>
  );
};

export default DetailManagement;
