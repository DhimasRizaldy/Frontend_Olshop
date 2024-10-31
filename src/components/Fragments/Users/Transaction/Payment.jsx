import React, { useEffect, useState } from 'react';
import { checkoutPayment } from '../../../../services/users/payment/servives-payment';
import {
  getAddress,
  addAddress,
} from '../../../../services/admin/address/services-address';
import { getPromo } from '../../../../services/admin/promo/services-promo';
import { formatRupiah } from '../../../../utils/constants/function';
import {
  fetchCities,
  fetchProvinces,
  fetchShippingCost,
} from '../../../../services/users/rajaongkir/rajaongkir-services';
import Swal from 'sweetalert2';
import { useLocation } from 'react-router-dom';
import ModalAddAddress from './ModalAddAddress';

const PaymentsMe = () => {
  const location = useLocation();
  const [cartItems, setCartItems] = useState(
    location.state?.selectedCartItems || [],
  );
  const [discountCode, setDiscountCode] = useState('');
  const [address, setAddress] = useState({});
  const [selectedAddress, setSelectedAddress] = useState('');
  const [addresses, setAddresses] = useState([]);
  const [selectedPromo, setSelectedPromo] = useState('');
  const [promos, setPromos] = useState([]);
  const [provId, setProvId] = useState('');
  const [cityId, setCityId] = useState('');
  const [provinces, setProvinces] = useState([]);
  const [cities, setCities] = useState([]);
  const [shippingCost, setShippingCost] = useState(0);
  const [total, setTotal] = useState(0);
  const [shippingOptions, setShippingOptions] = useState([]);
  const [showPaymentPopup, setShowPaymentPopup] = useState(false);
  const [paymentUrl, setPaymentUrl] = useState('');
  const [showAddAddressPopup, setShowAddAddressPopup] = useState(false);
  const [subtotal, setSubtotal] = useState(0); // Tambahkan definisi subtotal
  const [discount, setDiscount] = useState(0); // Tambahkan definisi discount
  const [selectedCourier, setSelectedCourier] = useState(''); // Tambahkan definisi selectedCourier

  // Fetch data on component mount
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [addressResponse, promoResponse, provincesData] =
          await Promise.all([getAddress(), getPromo(), fetchProvinces()]);

        if (addressResponse.success) {
          const filteredAddresses = addressResponse.data.filter(
            (addr) => !addr.isDelete,
          );
          setAddresses(filteredAddresses || []);
        } else {
          console.error('Failed to fetch addresses');
        }

        if (promoResponse.success) {
          const now = new Date();
          setPromos(
            promoResponse.data.filter(
              (promo) => new Date(promo.expiresAt) > now,
            ),
          );
        } else {
          console.error('Failed to fetch promotions');
        }

        if (Array.isArray(provincesData)) {
          setProvinces(provincesData);
        } else {
          console.error('Expected an array of provinces');
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const fetchCitiesByProvince = async () => {
      if (provId) {
        try {
          const citiesData = await fetchCities(provId);
          if (Array.isArray(citiesData)) {
            setCities(citiesData);
          } else {
            console.error('Expected an array of cities');
          }
        } catch (error) {
          console.error('Error fetching cities:', error);
        }
      }
    };

    fetchCitiesByProvince();
  }, [provId]);

  useEffect(() => {
    const calculateShipping = async () => {
      if (provId && cityId) {
        try {
          const weight = 1000;
          const couriers = ['jne', 'pos', 'jnt'];
          const allShippingOptions = [];

          for (const courier of couriers) {
            await fetchShippingCost(
              provId,
              cityId,
              weight,
              courier,
              (options) => {
                allShippingOptions.push(...options);
              },
            );
          }

          console.log('Shipping options:', allShippingOptions); // Tambahkan log untuk memeriksa data
          setShippingOptions(allShippingOptions);
        } catch (error) {
          console.error('Error fetching shipping cost:', error);
        }
      }
    };

    calculateShipping();
  }, [provId, cityId]);

  useEffect(() => {
    setTotal(subtotal - discount + shippingCost);
  }, [subtotal, discount, shippingCost]);

  useEffect(() => {
    setSubtotal(
      cartItems.reduce((sum, item) => {
        const finalPrice = item.products.promoPrice || item.products.price;
        return sum + finalPrice * item.qty;
      }, 0),
    );
  }, [cartItems]);

  const handleApplyDiscount = () => {
    const promo = promos.find((p) => p.promoId === selectedPromo);
    setDiscount(promo ? subtotal * (promo.discount / 100) : 0);
  };

  const handleCheckout = async () => {
    try {
      const confirmation = await Swal.fire({
        title: 'Konfirmasi Transaksi',
        text: 'Apakah Anda ingin melanjutkan pembayaran?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Ya, lanjutkan',
      });

      if (confirmation.isConfirmed) {
        const cartIds = cartItems.map((item) => item.cartId);
        const ongkirValue = shippingCost;
        const courier = selectedCourier;
        const promoId = selectedPromo || null;
        const addressId = selectedAddress;

        if (!courier) {
          Swal.fire('Error', 'Kurir tidak valid atau tidak ada', 'error');
          return;
        }

        const response = await checkoutPayment({
          cartIds,
          promoId,
          addressId,
          ongkirValue,
          courier,
        });

        if (response?.success && response.data.token) {
          handlePaymentProcess(response.data.token);
        } else {
          Swal.fire('Sukses', 'Transaksi berhasil dibuat', 'success').then(() =>
            handlePaymentProcess(response.data.token),
          );
        }
      }
    } catch (error) {
      console.error('Terjadi kesalahan saat checkout:', error);
      Swal.fire('Error', 'Terjadi kesalahan saat memproses transaksi', 'error');
    }
  };

  const handlePaymentProcess = (token) => {
    window.snap.pay(token, {
      onSuccess: handleSuccess,
      onPending: handlePending,
      onError: handleError,
      onClose: handleClose,
    });
  };

  const handleSuccess = (result) => {
    localStorage.setItem(
      'transactionId',
      result.order_id || result.transaction_id,
    );
    window.location.href = '/payment-success';
  };

  const handlePending = () => {
    Swal.fire(
      'Pembayaran Tertunda',
      'Pembayaran sedang diproses.',
      'info',
    ).then(() => {
      window.location.href = '/transaction-me';
    });
  };

  const handleError = () => {
    Swal.fire('Kesalahan Pembayaran', 'Terjadi kesalahan.', 'error').then(
      () => {
        window.location.href = '/transaction-me';
      },
    );
  };

  const handleClose = () => {
    Swal.fire('Pembayaran Ditutup', 'Popup pembayaran ditutup.', 'info').then(
      () => {
        window.location.href = '/transaction-me';
      },
    );
  };

  const handleAddressChange = async (e) => {
    const selectedAddr = addresses.find(
      (addr) => addr.addressId === e.target.value,
    );
    if (selectedAddr) {
      setSelectedAddress(e.target.value);
      setCityId(selectedAddr.cityId);
      setProvId(selectedAddr.provinceId);

      const weight = 1000;
      const couriers = ['jne', 'pos', 'jnt'];
      const allShippingOptions = [];

      for (const courier of couriers) {
        await fetchShippingCost(
          selectedAddr.provinceId,
          selectedAddr.cityId,
          weight,
          courier,
          (options) => {
            allShippingOptions.push(...options);
          },
        );
      }

      console.log('Shipping options:', allShippingOptions); // Tambahkan log untuk memeriksa data
      setShippingOptions(allShippingOptions);
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-6 mt-12">
      <h1 className="text-3xl font-bold mb-6">Checkout</h1>
      {/* Alamat Pengiriman */}
      <div className="bg-white shadow-md rounded-lg p-4 mb-6">
        <h2 className="text-xl font-semibold mb-4">Alamat Pengiriman</h2>

        {/* Dropdown untuk Alamat */}
        <select
          className="w-full border border-gray-300 rounded-md p-2 mb-2"
          value={selectedAddress}
          onChange={handleAddressChange}
        >
          <option value="">Pilih Alamat</option>
          {addresses.map((addr) => (
            <option key={addr.addressId} value={addr.addressId}>
              {addr.nameAddress} - {addr.address}, {addr.cityName},{' '}
              {addr.provinceName}, {addr.postalCode}
            </option>
          ))}
        </select>
        <button
          onClick={() => setShowAddAddressPopup(true)}
          className="bg-primary text-white rounded-md p-2 mt-2"
        >
          Tambah Alamat
        </button>
      </div>

      {/* Bagian Alamat Pengiriman */}
      <div className="bg-white shadow-md rounded-lg p-4 mb-6">
        <h2 className="text-xl font-semibold mb-4">Opsi Pengiriman</h2>
        {shippingOptions.length > 0 ? (
          <div>
            {shippingOptions.map((option, index) => (
              <div key={index} className="mb-4">
                <input
                  type="radio"
                  id={`shippingOption-${index}`}
                  name="shippingOption"
                  value={option.cost[0].value}
                  onChange={(e) => {
                    setShippingCost(Number(e.target.value));
                    setSelectedCourier(option.service);
                  }}
                />
                <label htmlFor={`shippingOption-${index}`} className="ml-2">
                  {option.service} - {option.description} - (Estimasi{' '}
                  {option.cost[0].etd} Hari) -{' '}
                  {formatRupiah(option.cost[0].value)}
                </label>
              </div>
            ))}
          </div>
        ) : (
          <p>Pilih alamat pengiriman untuk melihat opsi pengiriman.</p>
        )}
      </div>

      {/* Bagian Ringkasan Pesanan */}
      <div className="bg-white shadow-md rounded-lg p-4 mb-6">
        <h2 className="text-xl font-semibold mb-4">Ringkasan Pesanan</h2>
        {cartItems.length > 0 ? (
          cartItems.map((item) => {
            const finalPrice = item.products.promoPrice || item.products.price;
            return (
              <div key={item.cartId} className="flex items-center mb-4">
                <img
                  src={item.products.image}
                  alt={item.products.name}
                  className="w-20 h-20 mr-4"
                />
                <div>
                  <h3 className="text-lg font-semibold">
                    {item.products.name}
                  </h3>
                  <p className="text-gray-600">
                    {formatRupiah(finalPrice)} x {item.qty}
                  </p>
                </div>
              </div>
            );
          })
        ) : (
          <p>Tidak ada barang di keranjang.</p>
        )}
      </div>

      {/* Bagian Kode Diskon */}
      <div className="bg-white shadow-md rounded-lg p-4 mb-6">
        <h2 className="text-xl font-semibold mb-4">Kode Diskon</h2>
        <select
          className="w-full border border-gray-300 rounded-md p-2 mb-2"
          value={selectedPromo}
          onChange={(e) => setSelectedPromo(e.target.value)}
        >
          <option value="">Pilih Promo</option>
          {promos.map((promo) => (
            <option key={promo.promoId} value={promo.promoId}>
              {promo.codePromo} - {promo.discount}%
            </option>
          ))}
        </select>
        <button
          onClick={handleApplyDiscount}
          className="bg-primary text-white rounded-md p-2 mt-2"
        >
          Terapkan Diskon
        </button>
        {discount > 0 && <p>Diskon Diterapkan: {formatRupiah(discount)}</p>}
      </div>

      {/* Tombol Checkout */}
      <div className="bg-white shadow-md rounded-lg p-4 mb-6">
        <div className="bg-white rounded-lg p-6 mb-6">
          <div className="space-y-4">
            <h3 className="text-base md:text-lg font-semibold text-gray-700">
              Subtotal:{' '}
              <span className="font-medium text-gray-900">
                {formatRupiah(subtotal)}
              </span>
            </h3>
            <h3 className="text-base md:text-lg font-semibold text-gray-700">
              Diskon:{' '}
              <span className="font-medium text-gray-900">
                {formatRupiah(discount)}
              </span>
            </h3>
            <h3 className="text-base md:text-lg font-semibold text-gray-700">
              Biaya Pengiriman:{' '}
              <span className="font-medium text-gray-900">
                {formatRupiah(shippingCost)}
              </span>
            </h3>
            <h2 className="text-xl md:text-2xl font-bold text-gray-800">
              Total: <span className="text-primary">{formatRupiah(total)}</span>
            </h2>
          </div>
          <button
            onClick={handleCheckout}
            className="bg-primary text-white rounded-lg p-3 mt-4 w-full transition duration-300 ease-in-out hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-primary-dark focus:ring-opacity-50"
          >
            Checkout
          </button>
        </div>
      </div>

      {/* Modal Pembayaran */}
      {showPaymentPopup && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded shadow-lg">
            <h2 className="text-lg font-bold mb-4">Lanjutkan ke Pembayaran</h2>
            <a
              href={paymentUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition duration-300"
            >
              Pergi ke Pembayaran
            </a>
            <button
              onClick={() => setShowPaymentPopup(false)}
              className="mt-4 bg-gray-300 text-black px-4 py-2 rounded-md hover:bg-gray-400 transition duration-300"
            >
              Tutup
            </button>
          </div>
          <div className="fixed inset-0 bg-black opacity-50"></div>
        </div>
      )}

      {/* Modal Tambah Alamat */}
      <ModalAddAddress
        show={showAddAddressPopup}
        onClose={() => setShowAddAddressPopup(false)}
      />
    </div>
  );
};

export default PaymentsMe;
