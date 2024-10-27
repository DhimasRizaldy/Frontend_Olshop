import React, { useEffect, useState } from 'react';
import {
  getCarts,
  deleteCarts,
  updateCarts,
} from '../../../../services/users/carts/services-carts';
import { formatRupiah } from '../../../../utils/constants/function';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';

const SkeletonLoader = () => (
  <div className="bg-white shadow-md rounded-lg p-4 mb-4 animate-pulse">
    <div className="flex flex-col md:flex-row justify-between items-center border-b border-gray-200 pb-4 mb-4">
      <div className="flex items-center">
        <div className="w-20 h-20 bg-gray-200 rounded-md mr-4"></div>
        <div>
          <div className="h-4 bg-gray-200 rounded mb-2"></div>
          <div className="h-4 bg-gray-200 rounded"></div>
        </div>
      </div>
      <div className="flex items-center mt-4 md:mt-0">
        <div className="h-4 bg-gray-200 rounded mr-2"></div>
        <div className="h-4 bg-gray-200 rounded ml-2"></div>
        <div className="h-4 bg-gray-200 rounded ml-6"></div>
      </div>
    </div>
  </div>
);

const CartsMe = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [unauthorized, setUnauthorized] = useState(false);
  const [updatePending, setUpdatePending] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [selectedItems, setSelectedItems] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCartItems = async () => {
      try {
        const response = await getCarts();
        if (response.success) {
          const filteredCarts = response.data.filter(
            (item) => !item.isCheckout,
          );
          setCartItems(filteredCarts);
        } else if (response.status === 401) {
          setUnauthorized(true);
        } else {
          setError('Gagal mengambil item keranjang');
        }
      } catch (error) {
        console.error('Error fetching cart items:', error);
        setError('Terjadi kesalahan saat mengambil item keranjang');
      } finally {
        setLoading(false);
      }
    };

    fetchCartItems();
  }, []);

  const handleQuantityChange = (id, change, stock) => {
    const updatedItems = cartItems.map((item) =>
      item.cartId === id
        ? {
            ...item,
            qty: Math.max(Math.min(item.qty + change, stock), 1),
          }
        : item,
    );
    setCartItems(updatedItems);
    setUpdatePending(true);
  };

  const handleUpdateCarts = async () => {
    if (!updatePending) return;

    setUpdatePending(false);
    try {
      for (const item of cartItems) {
        await updateCarts(item.cartId, { qty: item.qty });
      }
    } catch (error) {
      console.error('Error updating cart:', error);
    }
  };

  useEffect(() => {
    if (updatePending) {
      const timer = setTimeout(() => {
        handleUpdateCarts();
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [updatePending, cartItems]);

  const handleDelete = async (id) => {
    Swal.fire({
      title: 'Apakah Anda yakin?',
      text: 'Anda tidak akan dapat mengembalikan ini!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Ya, hapus!',
      cancelButtonText: 'Batal',
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const response = await deleteCarts(id);
          if (response.success) {
            const updatedItems = cartItems.filter((item) => item.cartId !== id);
            setCartItems(updatedItems);
            Swal.fire('Dihapus!', 'Item Anda telah dihapus.', 'success');
          } else {
            throw new Error('Gagal menghapus item keranjang');
          }
        } catch (error) {
          console.error('Error deleting cart item:', error);
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Gagal menghapus item keranjang',
          });
        }
      }
    });
  };

  const calculateTotalPrice = () => {
    return selectedItems.reduce((total, id) => {
      const item = cartItems.find((item) => item.cartId === id);
      const finalPrice =
        item?.products?.promoPrice || item?.products?.price || 0;
      return total + finalPrice * (item?.qty || 0);
    }, 0);
  };

  const handleCheckout = () => {
    if (selectedItems.length === 0) {
      Swal.fire({
        icon: 'warning',
        title: 'Tidak ada produk yang dipilih',
        text: 'Silakan pilih produk terlebih dahulu sebelum melanjutkan ke pembayaran.',
      });
      return;
    }

    Swal.fire({
      title: 'Lanjutkan ke Pembayaran?',
      text: 'Apakah Anda ingin melanjutkan ke halaman pembayaran?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Ya, lanjutkan',
      cancelButtonText: 'Batal',
    }).then((result) => {
      if (result.isConfirmed) {
        const selectedCartItems = cartItems.filter((item) =>
          selectedItems.includes(item.cartId),
        );

        navigate('/payment-me', { state: { selectedCartItems } });
      }
    });
  };

  const handleSelectAll = (e) => {
    if (e.target.checked) {
      setSelectedItems(cartItems.map((item) => item.cartId));
    } else {
      setSelectedItems([]);
    }
  };

  const handleSelectItem = (id) => {
    setSelectedItems((prevSelected) =>
      prevSelected.includes(id)
        ? prevSelected.filter((itemId) => itemId !== id)
        : [...prevSelected, id],
    );
  };

  if (loading) {
    return (
      <div className="max-w-6xl mx-auto px-4 py-6 mt-12">
        <h1 className="text-2xl md:text-3xl font-bold mb-6">
          Keranjang Belanja
        </h1>
        {Array(3)
          .fill()
          .map((_, index) => (
            <SkeletonLoader key={index} />
          ))}
      </div>
    );
  }

  if (unauthorized) {
    return (
      <div className="max-w-6xl mx-auto px-4 py-6 mt-12 text-center">
        <h1 className="text-2xl md:text-3xl font-bold mb-6">
          Tidak Terotorisasi
        </h1>
        <p className="text-gray-600 text-base">
          Silakan masuk untuk melihat item keranjang Anda.{' '}
          <a href="/login" className="text-blue-500 underline">
            Masuk di sini
          </a>
        </p>
      </div>
    );
  }

  if (error && cartItems.length === 0) {
    return (
      <div className="max-w-6xl mx-auto px-4 py-6 mt-12 text-center">
        <h1 className="text-2xl md:text-3xl font-bold mb-6">
          Tidak Ada Item di Keranjang
        </h1>
        <p className="text-gray-600 text-base">
          Tidak ada item di keranjang Anda saat ini. Silakan tambahkan item ke
          keranjang Anda untuk melanjutkan ke pembayaran.
        </p>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-6 mt-12">
      <h1 className="text-2xl md:text-3xl font-bold mb-6">Keranjang Belanja</h1>

      <div className="bg-white shadow-md rounded-lg p-4 mb-4">
        <div className="flex items-center mb-4">
          <input
            type="checkbox"
            className="w-6 h-6"
            checked={selectedItems.length === cartItems.length}
            onChange={handleSelectAll}
          />
          <label className="ml-2">Pilih Semua</label>
        </div>
        {cartItems.map((item) => {
          const finalPrice = item.products.promoPrice || item.products.price;
          return (
            <div
              key={item.cartId}
              className="flex flex-col md:flex-row items-start border-b border-gray-200 pb-4 mb-4"
            >
              <div className="flex items-center mb-4 md:mb-0 flex-grow">
                <input
                  type="checkbox"
                  className="w-6 h-6 mr-4"
                  checked={selectedItems.includes(item.cartId)}
                  onChange={() => handleSelectItem(item.cartId)}
                />
                <img
                  src={item.products?.image || 'https://via.placeholder.com/80'}
                  alt={item.products?.name || 'Product'}
                  className="w-20 h-20 object-cover rounded-md mr-4"
                />
                <div className="flex-grow">
                  <h2 className="text-sm md:text-base font-semibold">
                    {item.products?.name || 'Nama Produk'}
                  </h2>
                  <p className="text-gray-600 text-sm md:text-base">
                    Harga: {formatRupiah(finalPrice)}
                  </p>
                  <p className="text-gray-600 font-semibold text-sm md:text-base mt-1">
                    Total: {formatRupiah(finalPrice * item.qty)}
                  </p>
                  {item.products?.stock <= 0 && (
                    <p className="text-red-500 text-sm mt-1">Stok habis</p>
                  )}
                </div>
              </div>
              <div className="flex items-center">
                <button
                  className={`bg-gray-200 text-gray-700 px-2 py-1 rounded-md font-semibold ${
                    item.products?.stock <= 0 ? 'cursor-not-allowed' : ''
                  }`}
                  onClick={() =>
                    handleQuantityChange(
                      item.cartId,
                      -1,
                      item.products?.stock || 0,
                    )
                  }
                  disabled={item.products?.stock <= 0}
                >
                  -
                </button>
                <input
                  type="text"
                  value={item.qty}
                  readOnly
                  className="text-center w-12 border border-gray-300 rounded-md"
                />
                <button
                  className={`bg-gray-200 text-gray-700 px-2 py-1 rounded-md font-semibold ml-2 ${
                    item.products?.stock <= 0 ? 'cursor-not-allowed' : ''
                  }`}
                  onClick={() =>
                    handleQuantityChange(
                      item.cartId,
                      1,
                      item.products?.stock || 0,
                    )
                  }
                  disabled={item.products?.stock <= 0}
                >
                  +
                </button>
                <button
                  className="text-red-600 ml-4"
                  onClick={() => handleDelete(item.cartId)}
                >
                  <FontAwesomeIcon icon={faTrash} />
                </button>
              </div>
            </div>
          );
        })}
      </div>

      <div className="bg-white shadow-md rounded-lg p-4 mt-6 flex justify-between items-center">
        <h2 className="text-lg font-semibold">Total</h2>
        <p className="text-lg font-semibold">
          {formatRupiah(calculateTotalPrice())}
        </p>
        <button
          onClick={handleCheckout}
          className="bg-blue-500 text-white px-4 py-2 rounded-md font-semibold"
        >
          Checkout
        </button>
      </div>
    </div>
  );
};

export default CartsMe;
