import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Select from 'react-select';
import {
  editProduct,
  getProductById,
} from '../../../../services/admin/product/services-product';
import { getCategories } from '../../../../services/admin/category/services-category';

// Fungsi untuk format angka dengan pemisah ribuan
const formatRupiah = (number) => {
  if (number == null) return '';
  return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
};

// Fungsi untuk memvalidasi input angka
const validateNumberInput = (value) => {
  if (isNaN(value)) {
    toast.error('Input harus berupa angka');
    return false;
  }
  return true;
};

const EditProduct = () => {
  const { productId } = useParams();
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
    const fetchProductData = async () => {
      try {
        const response = await getProductById(productId);
        setName(response.data.name);
        setCategoryId(response.data.categoryId);
        setPrice(response.data.price);
        setPromoPrice(response.data.promoPrice);
        setWeight(response.data.weight);
        setStock(response.data.stock);
        setDescription(response.data.description);
        setImage(response.data.image);
      } catch (error) {
        toast.error('Gagal mengambil data produk');
        console.error('Error fetching product data:', error.message);
      }
    };

    fetchProductData();
  }, [productId]);

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

    if (parseFloat(price) < parseFloat(promoPrice)) {
      toast.error('Harga promo tidak boleh lebih besar dari harga asli');
      return;
    }

    if (
      !name ||
      !categoryId ||
      !price ||
      promoPrice === null ||
      !weight ||
      !stock ||
      !description
    ) {
      toast.error('Harap isi semua kolom dengan lengkap');
      return;
    }

    const productData = {
      name,
      categoryId,
      price: parseFloat(price),
      promoPrice: parseFloat(promoPrice),
      weight: parseFloat(weight),
      stock: parseInt(stock, 10),
      description,
      image,
    };

    setIsLoading(true);

    try {
      await editProduct(productId, productData);
      toast.success('Produk berhasil diperbarui');
      setIsLoading(false);
    } catch (error) {
      console.error('Error updating product:', error);
      toast.error(error.response?.data?.message || 'Gagal memperbarui produk');
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
              Nama Produk
            </label>
            <div className="relative">
              <input
                className="w-full rounded border border-stroke py-3 px-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                type="text"
                name="name"
                id="name"
                value={name || ''}
                onChange={(e) => setName(e.target.value)}
                disabled={isLoading}
              />
            </div>
          </div>

          {/* ComboBox dengan pencarian */}
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
                onChange={(option) => setCategoryId(option.value)}
                isDisabled={isLoading}
                placeholder="Pilih kategori"
                isSearchable
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
                value={formatRupiah(price) || ''}
                onChange={(e) => {
                  const value = e.target.value.replace(/\./g, '');
                  if (validateNumberInput(value)) {
                    setPrice(value);
                  }
                }}
                disabled={isLoading}
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
                value={promoPrice === 0 ? '0' : formatRupiah(promoPrice) || ''}
                onChange={(e) => {
                  const value = e.target.value.replace(/\./g, '');
                  if (validateNumberInput(value)) {
                    setPromoPrice(value);
                  }
                }}
                disabled={isLoading}
              />
            </div>
          </div>
        </div>

        <div className="mb-5.5 flex flex-col gap-5.5 sm:flex-row">
          <div className="w-full sm:w-1/2">
            <label className="mb-3 block font-medium text-black dark:text-white">
              Berat
            </label>
            <div className="relative">
              <input
                className="w-full rounded border border-stroke py-3 px-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                type="text"
                name="weight"
                id="weight"
                value={formatRupiah(weight) || ''}
                onChange={(e) => {
                  const value = e.target.value.replace(/\./g, '');
                  if (validateNumberInput(value)) {
                    setWeight(value);
                  }
                }}
                disabled={isLoading}
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
                value={formatRupiah(stock) || ''}
                onChange={(e) => {
                  const value = e.target.value.replace(/\./g, '');
                  if (validateNumberInput(value)) {
                    setStock(value);
                  }
                }}
                placeholder="0"
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
                value={description || ''}
                onChange={(e) => setDescription(e.target.value)}
                disabled={isLoading}
              />
            </div>
          </div>
          <div className="w-full sm:w-1/2">
            <label className="mb-3 block font-medium text-black dark:text-white">
              Foto Produk
            </label>
            <div className="relative">
              {image ? (
                <img
                  src={
                    typeof image === 'string'
                      ? image
                      : URL.createObjectURL(image)
                  }
                  alt="image"
                  className="h-10 w-10 rounded-full object-cover"
                />
              ) : (
                <p className="text-black dark:text-white">Tidak ada gambar</p>
              )}
            </div>
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

        <div className="flex justify-end gap-4.5">
          <Link to="/product">
            <button
              className="flex justify-center rounded border border-stroke py-2 px-6 font-medium text-black hover:shadow-1 dark:border-strokedark dark:text-white"
              type="button"
              disabled={isLoading}
            >
              Batal
            </button>
          </Link>
          <button
            className="flex justify-center rounded bg-primary py-2 px-6 font-medium text-gray hover:shadow-1"
            type="submit"
            disabled={isLoading}
          >
            {isLoading ? 'Loading...' : 'Simpan'}
          </button>
        </div>
      </form>
    </>
  );
};

export default EditProduct;
