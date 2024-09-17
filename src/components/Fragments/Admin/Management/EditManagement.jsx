import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
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
  const [purchasePrice, setPurchasePrice] = useState(''); // Tambahkan state untuk purchasePrice
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
        ); // Set purchasePrice
        setDateStockIn(formatDate(response.data.dateStockIn));
      } catch (error) {
        toast.error('Failed to fetch manage stok data');
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
        toast.error('Failed to fetch products or suppliers');
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
      purchasePrice: BigInt(purchasePrice), // Konversi ke BigInt
      dateStockIn,
    };

    setIsLoading(true);

    try {
      await editManageStok(manageStockId, manageStokData);
      toast.success('Manage Stok successfully updated!');
    } catch (error) {
      toast.error('Failed to update manage stok. Please try again.');
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
            <label className="mb-3 block font-medium text-black dark:text-white">
              Supplier
            </label>
            <div className="relative">
              <select
                className="w-full rounded border border-stroke py-3 px-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                value={supplierId}
                onChange={(e) => setSupplierId(e.target.value)}
                disabled={isLoading}
              >
                <option value="" disabled>
                  Select a supplier
                </option>
                {supplierOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div className="w-full sm:w-1/2">
            <label className="mb-3 block font-medium text-black dark:text-white">
              Product
            </label>
            <div className="relative">
              <select
                className="w-full rounded border border-stroke py-3 px-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                value={productId}
                onChange={(e) => setProductId(e.target.value)}
                disabled={isLoading}
              >
                <option value="" disabled>
                  Select a product
                </option>
                {productOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
        <div className="mb-5.5 flex flex-col gap-5.5 sm:flex-row">
          <div className="w-full sm:w-1/2">
            <label className="mb-3 block font-medium text-black dark:text-white">
              Stock In
            </label>
            <div className="relative">
              <input
                className="w-full rounded border border-stroke py-3 px-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                type="number"
                name="stockIn"
                id="stockIn"
                value={stockIn}
                onChange={(e) => setStockIn(e.target.value)}
                disabled={isLoading}
              />
            </div>
          </div>
          <div className="w-full sm:w-1/2">
            <label className="mb-3 block font-medium text-black dark:text-white">
              Purchase Price
            </label>
            <div className="relative">
              <input
                className="w-full rounded border border-stroke py-3 px-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                type="text"
                name="purchasePrice"
                id="purchasePrice"
                value={formatRupiah(purchasePrice)}
                onChange={(e) => setPurchasePrice(e.target.value)}
                disabled={isLoading}
              />
            </div>
          </div>
        </div>
        <div className="mb-5.5 flex flex-col gap-5.5 sm:flex-row">
          <div className="w-full sm:w-1/2">
            <label className="mb-3 block text-sm font-medium text-black dark:text-white">
              Date Stock In
            </label>
            <div className="relative">
              <input
                className="w-full rounded border border-stroke py-3 px-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                type="date"
                name="dateStockIn"
                id="dateStockIn"
                value={dateStockIn}
                onChange={(e) => setDateStockIn(e.target.value)}
                disabled={isLoading}
              />
            </div>
          </div>
        </div>

        <div className="flex justify-end gap-4.5">
          <Link to="/management">
            <button
              className="flex justify-center rounded border border-stroke py-2 px-6 font-medium text-black hover:shadow-1 dark:border-strokedark dark:text-white"
              type="button"
              disabled={isLoading}
            >
              Cancel
            </button>
          </Link>
          <button
            className="flex justify-center rounded bg-primary py-2 px-6 font-medium text-gray hover:bg-opacity-90"
            type="submit"
            disabled={isLoading}
          >
            {isLoading ? 'Updating...' : 'Update'}
          </button>
        </div>
      </form>
    </>
  );
};

export default EditManagement;
