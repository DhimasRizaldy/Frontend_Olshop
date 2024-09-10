import React, { useEffect, useState } from 'react';
import { checkoutPayment } from '../../../../services/users/payment/servives-payment';
import { getAddress } from '../../../../services/admin/address/services-address';
import { getPromo } from '../../../../services/admin/promo/services-promo';
import { formatRupiah } from '../../../../utils/constants/function';
import {
  fetchCities,
  fetchProvinces,
  fetchShippingCost,
} from '../../../../services/users/rajaongkir/rajaongkir-services';
import Swal from 'sweetalert2';
import { useLocation } from 'react-router-dom';

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
  const [shippingOption, setShippingOption] = useState('');
  const [subtotal, setSubtotal] = useState(0);
  const [discount, setDiscount] = useState(0);
  const [shippingCost, setShippingCost] = useState(0);
  const [total, setTotal] = useState(0);
  const [shippingOptions, setShippingOptions] = useState([]);
  const [showPaymentPopup, setShowPaymentPopup] = useState(false);
  const [paymentUrl, setPaymentUrl] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch Address Data
        const addressResponse = await getAddress();
        if (addressResponse.success) {
          setAddresses(addressResponse.data || []);
        } else {
          console.error('Failed to fetch addresses');
        }

        // Fetch Promo Data
        const promoResponse = await getPromo();
        if (promoResponse.success) {
          const now = new Date();
          const validPromos = promoResponse.data.filter(
            (promo) => new Date(promo.expiresAt) > now,
          );
          setPromos(validPromos);
        } else {
          console.error('Failed to fetch promotions');
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []); // Empty dependency array to run only on mount

  useEffect(() => {
    const getProvinces = async () => {
      try {
        const data = await fetchProvinces(); // Fetch provinces data
        if (Array.isArray(data)) {
          setProvinces(data); // Set state with fetched data
        } else {
          console.error('Expected an array of provinces');
        }
      } catch (error) {
        console.error('Error fetching provinces:', error);
      }
    };

    getProvinces(); // Call function to fetch provinces
  }, []); // Fetch provinces on component mount

  useEffect(() => {
    const getCities = async () => {
      if (provId) {
        try {
          const data = await fetchCities(provId); // Fetch cities data
          if (Array.isArray(data)) {
            setCities(data); // Set state with fetched data
          } else {
            console.error('Expected an array of cities');
          }
        } catch (error) {
          console.error('Error fetching cities:', error);
        }
      }
    };

    getCities(); // Call function to fetch cities
  }, [provId]); // Fetch cities when provId changes

  useEffect(() => {
    const calculateShippingCost = async () => {
      if (provId && cityId && shippingOption) {
        try {
          const weight = 1000; // Example weight in grams
          const courier = shippingOption;

          // Fetch shipping options
          await fetchShippingCost(
            provId,
            cityId,
            weight,
            courier,
            setShippingOptions,
          );
        } catch (error) {
          console.error('Error fetching shipping cost:', error);
        }
      }
    };

    calculateShippingCost();
  }, [provId, cityId, shippingOption]);

  useEffect(() => {
    if (shippingOptions.length > 0 && shippingOption) {
      const selectedOption = shippingOptions.find(
        (option) => option.service === shippingOption,
      );
      if (selectedOption && selectedOption.costs.length > 0) {
        setShippingCost(selectedOption.costs[0].value);
      } else {
        // Handle case where costs is empty or selectedOption is not found
        setShippingCost(null); // Or set a default value or handle it differently
      }
    }
  }, [shippingOptions, shippingOption]);

  useEffect(() => {
    // Recalculate total whenever subtotal, discount, or shippingCost changes
    setTotal(subtotal - discount + shippingCost);
  }, [subtotal, discount, shippingCost]);

  useEffect(() => {
    // Calculate subtotal whenever cartItems change
    const calculatedSubtotal = cartItems.reduce((sum, item) => {
      const finalPrice = item.products.promoPrice || item.products.price;
      return sum + finalPrice * item.qty;
    }, 0);
    setSubtotal(calculatedSubtotal);
  }, [cartItems]);

  const handleApplyDiscount = () => {
    const promo = promos.find((p) => p.promoId === selectedPromo);
    if (promo) {
      setDiscount(subtotal * (promo.discount / 100));
    } else {
      setDiscount(0);
    }
  };

  // handle checkout
  const handleCheckout = async () => {
    try {
      // Tampilkan konfirmasi sebelum membuat transaksi
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
        // Ambil data yang diperlukan dari state atau props
        const cartIds = cartItems.map((item) => item.cartId); // Pastikan cartItems sudah didefinisikan di state atau props
        const ongkirValue = shippingCost; // Pastikan shippingCost sudah didefinisikan di state atau props
        const courier = shippingOption; // Pastikan shippingOption sudah didefinisikan di state atau props
        const promoId = selectedPromo || null; // Pastikan selectedPromo sudah didefinisikan di state atau props
        const addressId = selectedAddress; // Pastikan selectedAddress sudah didefinisikan di state atau props

        // Panggil fungsi checkoutPayment untuk membuat transaksi
        const response = await checkoutPayment({
          cartIds,
          promoId,
          addressId,
          ongkirValue,
          courier,
        });

        // Periksa apakah transaksi berhasil
        if (response && response.success && response.data.token) {
          // Menyimpan URL pembayaran dan token di state
          setPaymentUrl(response.data.paymentUrl);
          setShowPaymentPopup(true);

          // Menampilkan Midtrans Snap menggunakan token yang diterima dari backend
          window.snap.pay(response.data.token, {
            onSuccess: function (result) {
              Swal.fire(
                'Pembayaran Sukses',
                'Transaksi Anda berhasil.',
                'success',
              ).then(() => {
                // Simpan order_id atau transaction_id ke localStorage
                localStorage.setItem(
                  'transactionId',
                  result.order_id || result.transaction_id,
                );
                // Arahkan ke halaman transaction-me
                window.location.href = '/transaction-me';
              });
              console.log('Pembayaran Sukses:', result);
            },
            onPending: function (result) {
              Swal.fire(
                'Pembayaran Tertunda',
                'Pembayaran Anda sedang diproses, silakan selesaikan nanti.',
                'info',
              ).then(() => {
                // Arahkan ke halaman transaction-me
                window.location.href = '/transaction-me';
              });
              console.log('Pembayaran Tertunda:', result);
            },
            onError: function (result) {
              Swal.fire(
                'Kesalahan Pembayaran',
                'Terjadi kesalahan dalam transaksi Anda.',
                'error',
              ).then(() => {
                // Arahkan ke halaman transaction-me
                window.location.href = '/transaction-me';
              });
              console.log('Kesalahan Pembayaran:', result);
            },
            onClose: function () {
              Swal.fire(
                'Pembayaran Ditutup',
                'Popup pembayaran ditutup.',
                'info',
              ).then(() => {
                // Arahkan ke halaman transaction-me
                window.location.href = '/transaction-me';
              });
              console.log('Popup pembayaran ditutup');
            },
          });
        } else {
          // Jika respons tidak sesuai, tampilkan pesan sukses dan tetap menampilkan popup
          console.log('Checkout berhasil:', response.message);
          Swal.fire('Sukses', 'Transaksi berhasil dibuat', 'success').then(
            () => {
              window.snap.pay(response.data.token, {
                onSuccess: function (result) {
                  Swal.fire(
                    'Pembayaran Sukses',
                    'Transaksi Anda berhasil.',
                    'success',
                  ).then(() => {
                    // Simpan order_id atau transaction_id ke localStorage
                    localStorage.setItem(
                      'transactionId',
                      result.order_id || result.transaction_id,
                    );
                    // Arahkan ke halaman transaction-me
                    window.location.href = '/transaction-me';
                  });
                  console.log('Pembayaran Sukses:', result);
                },
                onPending: function (result) {
                  Swal.fire(
                    'Pembayaran Tertunda',
                    'Pembayaran Anda sedang diproses, silakan selesaikan nanti.',
                    'info',
                  ).then(() => {
                    // Arahkan ke halaman transaction-me
                    window.location.href = '/transaction-me';
                  });
                  console.log('Pembayaran Tertunda:', result);
                },
                onError: function (result) {
                  Swal.fire(
                    'Kesalahan Pembayaran',
                    'Terjadi kesalahan dalam transaksi Anda.',
                    'error',
                  ).then(() => {
                    // Arahkan ke halaman transaction-me
                    window.location.href = '/transaction-me';
                  });
                  console.log('Kesalahan Pembayaran:', result);
                },
                onClose: function () {
                  Swal.fire(
                    'Pembayaran Ditutup',
                    'Popup pembayaran ditutup.',
                    'info',
                  ).then(() => {
                    // Arahkan ke halaman transaction-me
                    window.location.href = '/transaction-me';
                  });
                  console.log('Popup pembayaran ditutup');
                },
              });
            },
          );
        }
      }
    } catch (error) {
      console.error('Terjadi kesalahan saat checkout:', error);
      Swal.fire('Error', 'Terjadi kesalahan saat memproses transaksi', 'error');
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-6 mt-12">
      <h1 className="text-3xl font-bold mb-6">Checkout</h1>
      <div className="bg-white shadow-md rounded-lg p-4 mb-6">
        <h2 className="text-xl font-semibold mb-4">Shipping Address</h2>

        {/* Dropdown for Address */}
        <select
          className="w-full border border-gray-300 rounded-md p-2 mb-2"
          value={selectedAddress}
          onChange={(e) => setSelectedAddress(e.target.value)}
        >
          <option value="">Select Address</option>
          {addresses.map((addr) => (
            <option key={addr.addressId} value={addr.addressId}>
              {addr.nameAddress} - {addr.address}, {addr.city}, {addr.country},{' '}
              {addr.postalCode}
            </option>
          ))}
        </select>

        {/* Dropdown for Province */}
        <select
          className="w-full border border-gray-300 rounded-md p-2 mb-2"
          onChange={(e) => setProvId(e.target.value)}
        >
          <option value="">Select Province</option>
          {provinces.map((province) => (
            <option key={province.province_id} value={province.province_id}>
              {province.province}
            </option>
          ))}
        </select>

        {/* Dropdown for City */}
        <select
          className="w-full border border-gray-300 rounded-md p-2 mb-2"
          value={cityId}
          onChange={(e) => setCityId(e.target.value)}
        >
          <option value="">Select City</option>
          {cities.map((city) => (
            <option key={city.city_id} value={city.city_id}>
              {city.city_name}
            </option>
          ))}
        </select>
      </div>

      {/* Shipping Address Section */}
      <div className="bg-white shadow-md rounded-lg p-4 mb-6">
        <h2 className="text-xl font-semibold mb-4">Shipping Options</h2>
        <select
          className="w-full border border-gray-300 rounded-md p-2"
          value={shippingOption}
          onChange={(e) => {
            setShippingOption(e.target.value);
            fetchShippingCost(
              provId,
              cityId,
              1000,
              e.target.value,
              setShippingOptions,
            );
          }}
        >
          <option value="">Select a Courier</option>
          <option value="jne">JNE</option>
          <option value="pos">Pos Indonesia</option>
          <option value="tiki">TIKI</option>
          <option value="jnt">JNT</option>
          <option value="sicepat">SiCepat</option>
        </select>

        {shippingOptions.length > 0 && (
          <select
            className="w-full border border-gray-300 rounded-md p-2 mt-4"
            onChange={(e) => setShippingCost(Number(e.target.value))}
          >
            <option value="">Select Shipping Service</option>
            {shippingOptions.map((option, index) => (
              <option key={index} value={option.cost[0].value}>
                {option.service} - {option.description} - ( Estimasi{' '}
                {option.cost[0].etd} Hari) - (
                {formatRupiah(option.cost[0].value)} )
              </option>
            ))}
          </select>
        )}
      </div>

      {/* Cart Items and Order Summary Section */}
      <div className="bg-white shadow-md rounded-lg p-4 mb-6">
        <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
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
          <p>No items in the cart.</p>
        )}
      </div>

      {/* Discount Code Section */}
      <div className="bg-white shadow-md rounded-lg p-4 mb-6">
        <h2 className="text-xl font-semibold mb-4">Discount Code</h2>
        <select
          className="w-full border border-gray-300 rounded-md p-2 mb-2"
          value={selectedPromo}
          onChange={(e) => setSelectedPromo(e.target.value)}
        >
          <option value="">Select Promo</option>
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
          Apply Discount
        </button>
        {discount > 0 && <p>Discount Applied: {formatRupiah(discount)}</p>}
      </div>

      {/* Checkout Button */}
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
              Discount:{' '}
              <span className="font-medium text-gray-900">
                {formatRupiah(discount)}
              </span>
            </h3>
            <h3 className="text-base md:text-lg font-semibold text-gray-700">
              Shipping Cost:{' '}
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

      {/* Payment Modal */}
      {showPaymentPopup && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded shadow-lg">
            <h2 className="text-lg font-bold mb-4">Proceed to Payment</h2>
            <a
              href={paymentUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition duration-300"
            >
              Go to Payment
            </a>
            <button
              onClick={() => setShowPaymentPopup(false)}
              className="mt-4 bg-gray-300 text-black px-4 py-2 rounded-md hover:bg-gray-400 transition duration-300"
            >
              Close
            </button>
          </div>
          <div className="fixed inset-0 bg-black opacity-50"></div>
        </div>
      )}
    </div>
  );
};

export default PaymentsMe;
