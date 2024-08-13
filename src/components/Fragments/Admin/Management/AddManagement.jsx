import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { addManageStok } from '../../../../services/admin/manageStok/services-manageStok';
import { getProduct } from '../../../../services/admin/product/services-product';
import { getSupplier } from '../../../../services/admin/supplier/services-supplier';
import SelectGroup from '../../../../components/Forms/SelectGroup/SelectGroupOne';

const AddManagement = () => {
  const [supplierId, setSupplierId] = useState('');
  const [productId, setProductId] = useState('');
  const [stockIn, setStockIn] = useState('');
  const [dateStockIn, setDateStockIn] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [productOptions, setProductOptions] = useState([]);
  const [supplierOptions, setSupplierOptions] = useState([]);

  useEffect(() => {
    // Fetch products and suppliers when the component mounts
    const fetchProductsAndSuppliers = async () => {
      try {
        const productsResponse = await getProduct();
        // console.log(productsResponse.data);
        const suppliersResponse = await getSupplier();
        // console.log(suppliersResponse.data);

        const productOptions = productsResponse.data.map((product) => ({
          value: product.productId,
          label: product.name, // assuming productName is the name field
        }));

        const supplierOptions = suppliersResponse.data.map((supplier) => ({
          value: supplier.supplierId,
          label: supplier.name, // assuming supplierName is the name field
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

    // console.log('supplierId:', supplierId);
    // console.log('productId:', productId);
    // console.log('stockIn:', stockIn);
    // console.log('dateStockIn:', dateStockIn);

    if (!supplierId || !productId || !stockIn || !dateStockIn) {
      toast.error('Please fill in all fields');
      return;
    }

    const manageStokData = {
      supplierId,
      productId,
      stockIn: parseInt(stockIn, 10),
      dateStockIn: new Date(dateStockIn).toISOString(),
    };

    setIsLoading(true);

    try {
      await addManageStok(manageStokData);
      toast.success('Manage Stock added successfully!');
      setSupplierId('');
      setProductId('');
      setStockIn('');
      setDateStockIn('');
    } catch (error) {
      toast.error('Failed to add manage Stock');
      console.error('Error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <ToastContainer />
      <div className="mb-5.5 flex flex-col gap-5.5 sm:flex-row">
        <div className="w-full sm:w-1/2">
          <SelectGroup
            label="Supplier"
            options={supplierOptions}
            value={supplierId}
            onChange={setSupplierId}
          />
        </div>
        <div className="w-full sm:w-1/2">
          <SelectGroup
            label="Product"
            options={productOptions}
            value={productId}
            onChange={setProductId}
          />
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
              value={stockIn || ''}
              onChange={(e) => setStockIn(e.target.value)}
              placeholder="0"
            />
          </div>
        </div>
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
              placeholder="Date Stock In"
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
            Cancel
          </button>
        </Link>
        <button
          className="flex justify-center rounded bg-primary py-2 px-6 font-medium text-gray hover:bg-opacity-90"
          type="submit"
          disabled={isLoading}
        >
          {isLoading ? 'Saving...' : 'Save'}
        </button>
      </div>
    </form>
  );
};

export default AddManagement;
