import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Select from 'react-select';
import {
  editManageStok,
  getManageStokById,
} from '../../../../services/admin/manageStok/services-manageStok';
import { getProduct } from '../../../../services/admin/product/services-product';
import { getSupplier } from '../../../../services/admin/supplier/services-supplier';
import { formatDate } from '../../../../utils/constants/function';
import { formatRupiah } from '../../../../utils/constants/function';

const EditManagement = () => {
  const { manageStockId } = useParams();
  const [supplierId, setSupplierId] = useState('');
  const [productId, setProductId] = useState('');
  const [stockIn, setStockIn] = useState('');
  const [purchasePrice, setPurchasePrice] = useState('');
  const [dateStockIn, setDateStockIn] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [productOptions, setProductOptions] = useState([]);
  const [supplierOptions, setSupplierOptions] = useState([]);

  useEffect(() => {
    const fetchManageStokData = async () => {
      try {
        const response = await getManageStokById(manageStockId);
        setSupplierId(response.data.supplierId);
        setProductId(response.data.productId);
        setStockIn(response.data.stockIn);
        setPurchasePrice(
          response.data.purchasePrice
            ? response.data.purchasePrice.toString()
            : '',
        );
        setDateStockIn(formatDate(response.data.dateStockIn));
      } catch (error) {
        toast.error('Gagal mengambil data stok');
        console.error('Error fetching manage stok data:', error.message);
      }
    };

    fetchManageStokData();
  }, [manageStockId]);

  useEffect(() => {
    const fetchProductsAndSuppliers = async () => {
      try {
        const productsResponse = await getProduct();
        const suppliersResponse = await getSupplier();

        const productOptions = productsResponse.data.map((product) => ({
          value: product.productId,
          label: product.name,
        }));

        const supplierOptions = suppliersResponse.data.map((supplier) => ({
          value: supplier.supplierId,
          label: supplier.name,
        }));

        setProductOptions(productOptions);
        setSupplierOptions(supplierOptions);
      } catch (error) {
        toast.error('Gagal mengambil data produk atau supplier');
        console.error('Error fetching products or suppliers:', error);
      }
    };

    fetchProductsAndSuppliers();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !supplierId ||
      !productId ||
      !stockIn ||
      !dateStockIn ||
      !purchasePrice
    ) {
      toast.error('Harap isi semua kolom dengan lengkap');
      return;
    }

    const manageStokData = {
      supplierId,
      productId,
      stockIn: parseInt(stockIn, 10),
      purchasePrice: BigInt(purchasePrice),
      dateStockIn,
    };

    setIsLoading(true);

    try {
      await editManageStok(manageStockId, manageStokData);
      toast.success('Stok berhasil diperbarui');
    } catch (error) {
      toast.error('Gagal memperbarui stok. Silakan coba lagi.');
      console.error('Error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const formatNumber = (value) => {
    if (!value) return '';
    return new Intl.NumberFormat('id-ID').format(value);
  };


  return (
    <>
      <ToastContainer />
      <form onSubmit={handleSubmit}>
        <div className="mb-5.5 flex flex-col gap-5.5 sm:flex-row">
          <div className="w-full sm:w-1/2">
            <label className="mb-3 block font-medium text-black dark:text-white">
              Supplier
            </label>
            <Select
              className="w-full"
              options={supplierOptions}
              value={supplierOptions.find(
                (option) => option.value === supplierId,
              )}
              onChange={(selectedOption) => setSupplierId(selectedOption.value)}
              isDisabled={isLoading}
              placeholder="Cari supplier..."
            />
          </div>
          <div className="w-full sm:w-1/2">
            <label className="mb-3 block font-medium text-black dark:text-white">
              Produk
            </label>
            <Select
              className="w-full"
              options={productOptions}
              value={productOptions.find(
                (option) => option.value === productId,
              )}
              onChange={(selectedOption) => setProductId(selectedOption.value)}
              isDisabled={isLoading}
              placeholder="Cari produk..."
            />
          </div>
        </div>

        {/* Form fields for StockIn, PurchasePrice, DateStockIn */}
        <div className="mb-5.5 flex flex-col gap-5.5 sm:flex-row">
          <div className="w-full sm:w-1/2">
            <label className="mb-3 block font-medium text-black dark:text-white">
              Stok Masuk
            </label>
            <input
              className="w-full rounded border border-stroke py-3 px-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
              type="text" // Ubah tipe dari "number" ke "text" agar kita bisa memasukkan format angka
              value={formatNumber(stockIn)}
              onChange={(e) => setStockIn(e.target.value.replace(/\D/g, ''))} // Hanya izinkan angka
              disabled={isLoading}
            />
          </div>

          <div className="w-full sm:w-1/2">
            <label className="mb-3 block font-medium text-black dark:text-white">
              Harga Beli
            </label>
            <input
              className="w-full rounded border border-stroke py-3 px-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
              type="text"
              value={formatRupiah(purchasePrice)}
              onChange={(e) => setPurchasePrice(e.target.value)}
              disabled={isLoading}
            />
          </div>
        </div>
        <div className="mb-5.5 flex flex-col gap-5.5 sm:flex-row">
          <div className="w-full sm:w-1/2">
            <label className="mb-3 block font-medium text-black dark:text-white">
              Tanggal Stok Masuk
            </label>
            <input
              className="w-full rounded border border-stroke py-3 px-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
              type="date"
              value={dateStockIn}
              onChange={(e) => setDateStockIn(e.target.value)}
              disabled={isLoading}
            />
          </div>
        </div>

        <div className="flex justify-end gap-4.5">
          <Link to="/management">
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

export default EditManagement;
