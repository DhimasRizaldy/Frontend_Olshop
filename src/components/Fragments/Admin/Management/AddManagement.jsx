import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Select from 'react-select';
import { addManageStok } from '../../../../services/admin/manageStok/services-manageStok';
import { getProduct } from '../../../../services/admin/product/services-product';
import { getSupplier } from '../../../../services/admin/supplier/services-supplier';

const AddManagement = () => {
  const [supplierId, setSupplierId] = useState('');
  const [productId, setProductId] = useState('');
  const [stockIn, setStockIn] = useState('');
  const [purchasePrice, setPurchasePrice] = useState('');
  const [dateStockIn, setDateStockIn] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [productOptions, setProductOptions] = useState([]);
  const [supplierOptions, setSupplierOptions] = useState([]);

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
        toast.error('Gagal memuat produk atau supplier');
        console.error('Error fetching products or suppliers:', error);
      }
    };

    fetchProductsAndSuppliers();
  }, []);

  const formatRupiah = (value) => {
    if (!value) return '';
    return value.replace(/\D/g, '').replace(/\B(?=(\d{3})+(?!\d))/g, '.');
  };

  const handleStockInChange = (e) => {
    const formattedValue = formatRupiah(e.target.value);
    setStockIn(formattedValue);
  };

  const handlePurchasePriceChange = (e) => {
    const formattedValue = formatRupiah(e.target.value);
    setPurchasePrice(formattedValue);
  };

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
      stockIn: parseInt(stockIn.replace(/\./g, ''), 10),
      purchasePrice: BigInt(purchasePrice.replace(/\./g, '')),
      dateStockIn: new Date(dateStockIn).toISOString(),
    };

    setIsLoading(true);

    try {
      await addManageStok(manageStokData);
      toast.success('Data stok berhasil ditambahkan!');
      setSupplierId('');
      setProductId('');
      setStockIn('');
      setPurchasePrice('');
      setDateStockIn('');
    } catch (error) {
      toast.error('Gagal menambahkan data stok');
      console.error('Error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <ToastContainer />
      <div className="mb-5.5 flex flex-col gap-5.5 sm:flex-row">
        {/* Supplier Select */}
        <div className="w-full sm:w-1/2">
          <label className="mb-3 block font-medium text-black dark:text-white">
            Supplier
          </label>
          <div className="relative">
            <Select
              options={supplierOptions}
              value={supplierOptions.find(
                (option) => option.value === supplierId,
              )}
              onChange={(selectedOption) =>
                setSupplierId(selectedOption?.value || '')
              }
              isDisabled={isLoading}
              placeholder="Cari dan pilih supplier"
              className="text-black dark:text-white"
            />
          </div>
        </div>
        {/* Product Select */}
        <div className="w-full sm:w-1/2">
          <label className="mb-3 block font-medium text-black dark:text-white">
            Produk
          </label>
          <div className="relative">
            <Select
              options={productOptions}
              value={productOptions.find(
                (option) => option.value === productId,
              )}
              onChange={(selectedOption) =>
                setProductId(selectedOption?.value || '')
              }
              isDisabled={isLoading}
              placeholder="Cari dan pilih produk"
              className="text-black dark:text-white"
            />
          </div>
        </div>
      </div>
      <div className="mb-5.5 flex flex-col gap-5.5 sm:flex-row">
        {/* Stock Input */}
        <div className="w-full sm:w-1/2">
          <label className="mb-3 block font-medium text-black dark:text-white">
            Jumlah Stok Masuk
          </label>
          <div className="relative">
            <input
              className="w-full rounded border border-stroke py-3 px-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
              type="text"
              name="stockIn"
              id="stockIn"
              value={stockIn || ''}
              onChange={handleStockInChange}
              placeholder="0"
            />
          </div>
        </div>
        {/* Purchase Price Input */}
        <div className="w-full sm:w-1/2">
          <label className="mb-3 block font-medium text-black dark:text-white">
            Harga Modal
          </label>
          <div className="relative">
            <input
              className="w-full rounded border border-stroke py-3 px-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
              type="text"
              name="purchasePrice"
              id="purchasePrice"
              value={purchasePrice || ''}
              onChange={handlePurchasePriceChange}
              placeholder="0"
            />
          </div>
        </div>
      </div>
      <div className="mb-5.5 flex flex-col gap-5.5 sm:flex-row">
        {/* Date Input */}
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
              placeholder="Pilih tanggal"
              value={dateStockIn || ''}
              onChange={(e) => setDateStockIn(e.target.value)}
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
            Batal
          </button>
        </Link>
        <button
          className="flex justify-center rounded bg-primary py-2 px-6 font-medium text-gray hover:bg-opacity-90"
          type="submit"
          disabled={isLoading}
        >
          {isLoading ? 'Menyimpan...' : 'Simpan'}
        </button>
      </div>
    </form>
  );
};

export default AddManagement;
