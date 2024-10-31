import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { getCategories } from '../../../../services/admin/category/services-category';
import { addProduct } from '../../../../services/admin/product/services-product';
import Select from 'react-select'; // Library untuk combobox dengan pencarian

// Fungsi untuk format ribuan
const formatNumber = (num) => {
  return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
};

// Fungsi untuk memvalidasi input angka
const validateNumberInput = (value) => {
  if (isNaN(value)) {
    toast.error('Input harus berupa angka');
    return false;
  }
  return true;
};

const AddProduct = () => {
  const [name, setName] = useState('');
  const [categoryId, setCategoryId] = useState('');
  const [price, setPrice] = useState('');
  const [promoPrice, setPromoPrice] = useState('');
  const [weight, setWeight] = useState('');
  const [stock, setStock] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [categoryOptions, setCategoryOptions] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await getCategories();
        const categories = response.data;
        const categoryOptions = categories.map((category) => ({
          value: category.categoryId,
          label: category.name,
        }));
        setCategoryOptions(categoryOptions);
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };
    fetchCategories();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name || !categoryId || !price || !weight || !stock || !description) {
      toast.error('Harap isi semua kolom dengan lengkap');
      return;
    }

    // Validasi harga promo harus lebih kecil dari harga normal
    if (parseInt(promoPrice) >= parseInt(price)) {
      toast.error('Harga promo harus lebih kecil dari harga normal');
      return;
    }

    const productData = {
      name,
      categoryId,
      price: parseInt(price.toString().replace(/\./g, ''), 10),
      promoPrice: parseInt(promoPrice.toString().replace(/\./g, ''), 10),
      weight: parseInt(weight.toString().replace(/\./g, ''), 10),
      stock: parseInt(stock.toString().replace(/\./g, ''), 10),
      description,
      image,
    };

    setIsLoading(true);

    try {
      await addProduct(productData, setIsLoading);
      toast.success('Produk berhasil ditambahkan!');
      setName('');
      setCategoryId('');
      setPrice('');
      setPromoPrice('');
      setWeight('');
      setStock('');
      setDescription('');
      setImage(null);
    } catch (error) {
      console.error('Error menambahkan produk:', error);
      toast.error(
        error.response?.data?.message ||
          'Terjadi kesalahan saat menambahkan produk',
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <ToastContainer />
      <div className="mb-5.5 flex flex-col gap-5.5 sm:flex-row">
        <div className="w-full sm:w-1/2">
          <label className="mb-3 block font-medium text-black dark:text-white">
            Nama Produk
          </label>
          <div className="relative">
            <input
              className="w-full rounded border border-stroke py-3 px-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
              type="text"
              name="name"
              id="name"
              placeholder="Nama Produk"
              value={name || ''}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
        </div>
        <div className="w-full sm:w-1/2">
          <label className="mb-3 block font-medium text-black dark:text-white">
            Kategori
          </label>
          <div className="relative">
            <Select
              options={categoryOptions}
              value={categoryOptions.find(
                (option) => option.value === categoryId,
              )}
              onChange={(selectedOption) => setCategoryId(selectedOption.value)}
              isDisabled={isLoading}
              placeholder="Pilih Kategori..."
              isSearchable // Mengaktifkan fitur pencarian
            />
          </div>
        </div>
      </div>
      <div className="mb-5.5 flex flex-col gap-5.5 sm:flex-row">
        <div className="w-full sm:w-1/2">
          <label className="mb-3 block font-medium text-black dark:text-white">
            Harga
          </label>
          <div className="relative">
            <input
              className="w-full rounded border border-stroke py-3 px-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
              type="text"
              name="price"
              id="price"
              placeholder="0.00"
              value={formatNumber(price) || ''}
              onChange={(e) => {
                const value = e.target.value.replace(/\./g, '');
                if (validateNumberInput(value)) {
                  setPrice(value);
                }
              }}
            />
          </div>
        </div>
        <div className="w-full sm:w-1/2">
          <label className="mb-3 block font-medium text-black dark:text-white">
            Harga Promo
          </label>
          <div className="relative">
            <input
              className="w-full rounded border border-stroke py-3 px-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
              type="text"
              name="promoPrice"
              id="promoPrice"
              placeholder="0.00"
              value={formatNumber(promoPrice) || ''}
              onChange={(e) => {
                const value = e.target.value.replace(/\./g, '');
                if (validateNumberInput(value)) {
                  setPromoPrice(value);
                }
              }}
            />
          </div>
        </div>
      </div>
      <div className="mb-5.5 flex flex-col gap-5.5 sm:flex-row">
        <div className="w-full sm:w-1/2">
          <label className="mb-3 block font-medium text-black dark:text-white">
            Berat (gram)
          </label>
          <div className="relative">
            <input
              className="w-full rounded border border-stroke py-3 px-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
              type="text"
              name="weight"
              id="weight"
              placeholder="0.00"
              value={formatNumber(weight) || ''}
              onChange={(e) => {
                const value = e.target.value.replace(/\./g, '');
                if (validateNumberInput(value)) {
                  setWeight(value);
                }
              }}
            />
          </div>
        </div>
        <div className="w-full sm:w-1/2">
          <label className="mb-3 block font-medium text-black dark:text-white">
            Stok
          </label>
          <div className="relative">
            <input
              className="w-full rounded border border-stroke py-3 px-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
              type="text"
              name="stock"
              id="stock"
              placeholder="0"
              value={formatNumber(stock) || ''}
              onChange={(e) => {
                const value = e.target.value.replace(/\./g, '');
                if (validateNumberInput(value)) {
                  setStock(value);
                }
              }}
            />
          </div>
        </div>
      </div>
      <div className="mb-5.5 flex flex-col gap-5.5 sm:flex-row">
        <div className="w-full sm:w-1/2">
          <label className="mb-3 block font-medium text-black dark:text-white">
            Deskripsi
          </label>
          <div className="relative">
            <textarea
              className="w-full rounded border border-stroke py-3 px-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
              type="text"
              rows={6}
              name="description"
              id="description"
              placeholder="Deskripsi Produk..."
              value={description || ''}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
        </div>
        <div className="w-full sm:w-1/2">
          <label className="mb-3 block font-medium text-black dark:text-white">
            Foto Produk
          </label>
          <div className="relative">
            <input
              type="file"
              accept="image/*"
              className="w-full cursor-pointer rounded-lg border-[1.5px] border-stroke bg-transparent outline-none transition file:mr-5 file:border-collapse file:cursor-pointer file:border-0 file:border-r file:border-solid file:border-stroke file:bg-whiter file:py-3 file:px-5 file:hover:bg-primary file:hover:bg-opacity-10 focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:file:border-form-strokedark dark:file:bg-white/30 dark:file:text-white dark:focus:border-primary"
              onChange={(e) => setImage(e.target.files[0])}
            />
          </div>
        </div>
      </div>
      {/* Tombol simpan dan batal */}
      <div className="flex justify-end gap-4.5">
        <Link to="/product">
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

export default AddProduct;
