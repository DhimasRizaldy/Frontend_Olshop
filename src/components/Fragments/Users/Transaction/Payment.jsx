import React, { useEffect, useState } from 'react';
import { checkoutPayment } from '../../../../services/users/payment/servives-payment';
import { formatRupiah } from '../../../../utils/constants/function';
import axios from 'axios';

const PaymentsMe = () => {
  const [cartItems, setCartItems] = useState([]);
  const [discountCode, setDiscountCode] = useState('');
  const [address, setAddress] = useState({
    recipient: '',
    street: '',
    city: '',
    state: '',
    postalCode: '',
    country: '',
  });
  const [cityId, setCityId] = useState('');
  const [provinceId, setProvinceId] = useState('');
  const [provinces, setProvinces] = useState([]);
  const [cities, setCities] = useState([]);
  const [shippingOption, setShippingOption] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('');
  const [subtotal, setSubtotal] = useState(0);
  const [discount, setDiscount] = useState(0);
  const [shippingCost, setShippingCost] = useState(0);
  const [total, setTotal] = useState(0);
  const [shippingOptions, setShippingOptions] = useState([]);

  useEffect(() => {
    setCartItems([
      {
        id: 1,
        name: 'Product Name 1',
        price: 50000,
        imageUrl: 'https://via.placeholder.com/80',
      },
    ]);
    setSubtotal(50000);
    setDiscount(15000);
    setShippingCost(5000);
    setTotal(50000 - 15000 + 5000);
    fetchProvinces(); // Fetch provinces when component mounts
  }, []);

  // Fungsi untuk mengambil data provinsi dari Raja Ongkir
  const fetchProvinces = async () => {
    try {
      const response = await axios.get(
        'https://pro.rajaongkir.com/api/province',
        {
          headers: {
            key: 'f774d2c9f8e361a935ba992a1fca0efa', // API key Raja Ongkir
          },
        },
      );
      setProvinces(response.data.rajaongkir.results);
    } catch (error) {
      console.error('Error fetching provinces:', error);
    }
  };

  // Fungsi untuk mengambil data kota berdasarkan provinsi dari Raja Ongkir
  const fetchCities = async (provinceId) => {
    try {
      const response = await axios.get(
        `https://pro.rajaongkir.com/api/city?province=${provinceId}`,
        {
          headers: {
            key: 'f774d2c9f8e361a935ba992a1fca0efa', // API key Raja Ongkir
          },
        },
      );
      setCities(response.data.rajaongkir.results);
    } catch (error) {
      console.error('Error fetching cities:', error);
    }
  };

  // Fungsi untuk mengambil data ongkos kirim dari Raja Ongkir
  const fetchShippingCost = async (courier) => {
    try {
      const response = await axios.post(
        'https://pro.rajaongkir.com/api/cost',
        {
          origin: '501', // Ganti dengan ID kota asal Anda
          destination: cityId, // Menggunakan ID kota tujuan dari input
          weight: 1000, // Ganti dengan berat total dari cart Anda
          courier: courier,
        },
        {
          headers: {
            'Content-Type': 'application/json',
            key: 'f774d2c9f8e361a935ba992a1fca0efa', // API key Raja Ongkir
          },
        },
      );

      if (response.data.rajaongkir.status.code === 200) {
        setShippingOptions(response.data.rajaongkir.results[0].costs); // Simpan opsi pengiriman
      } else {
        console.error(
          'Error fetching shipping cost:',
          response.data.rajaongkir.status.description,
        );
      }
    } catch (error) {
      console.error('Error fetching shipping cost:', error);
    }
  };

  useEffect(() => {
    if (provinceId) {
      fetchCities(provinceId); // Fetch cities when province changes
    }
  }, [provinceId]);

  useEffect(() => {
    if (shippingOption) {
      fetchShippingCost(shippingOption); // Fetch shipping cost when shipping option changes
    }
  }, [shippingOption]);

  const handleApplyDiscount = () => {
    console.log(`Applying discount code: ${discountCode}`);
  };

  const handleCheckout = async () => {
    try {
      const response = await checkoutPayment({
        cartItems,
        discountCode,
        address,
        shippingOption,
        paymentMethod,
        total,
      });

      if (response.status === 200) {
        console.log('Checkout successful:', response.data);
      } else {
        console.log('Checkout failed:', response.message);
      }
    } catch (error) {
      console.error('Error during checkout:', error);
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-6 mt-12">
      <h1 className="text-3xl font-bold mb-6">Checkout</h1>

      {/* Shipping Address Section */}
      <div className="bg-white shadow-md rounded-lg p-4 mb-6">
        <h2 className="text-xl font-semibold mb-4">Shipping Address</h2>
        <input
          type="text"
          placeholder="Recipient Name"
          className="w-full border border-gray-300 rounded-md p-2 mb-2"
          value={address.recipient}
          onChange={(e) =>
            setAddress({ ...address, recipient: e.target.value })
          }
        />
        <input
          type="text"
          placeholder="Street Address"
          className="w-full border border-gray-300 rounded-md p-2 mb-2"
          value={address.street}
          onChange={(e) => setAddress({ ...address, street: e.target.value })}
        />

        {/* Dropdown untuk Provinsi */}
        <select
          className="w-full border border-gray-300 rounded-md p-2 mb-2"
          value={provinceId}
          onChange={(e) => setProvinceId(e.target.value)}
        >
          <option value="">Select Province</option>
          {provinces.map((province) => (
            <option key={province.province_id} value={province.province_id}>
              {province.province}
            </option>
          ))}
        </select>

        {/* Dropdown untuk Kota */}
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

      {/* Shipping Options Section */}
      <div className="bg-white shadow-md rounded-lg p-4 mb-6">
        <h2 className="text-xl font-semibold mb-4">Shipping Options</h2>
        <select
          className="w-full border border-gray-300 rounded-md p-2"
          value={shippingOption}
          onChange={(e) => setShippingOption(e.target.value)}
        >
          <option value="">Select a Courier</option>
          <option value="jne">JNE</option>
          <option value="pos">Pos Indonesia</option>
          <option value="tiki">TIKI</option>
        </select>

        {shippingOptions.length > 0 && (
          <select
            className="w-full border border-gray-300 rounded-md p-2 mt-4"
            onChange={(e) => setShippingCost(Number(e.target.value))}
          >
            <option value="">Select Shipping Service</option>
            {shippingOptions.map((option, index) => (
              <option key={index} value={option.cost[0].value}>
                {option.service} - {option.description} (
                {formatRupiah(option.cost[0].value)})
              </option>
            ))}
          </select>
        )}
      </div>

      {/* Cart Items and Order Summary Section */}
      <div className="bg-white shadow-md rounded-lg p-4 mb-6">
        <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
        <ul>
          {cartItems.map((item) => (
            <li key={item.id} className="flex justify-between mb-2">
              <span>{item.name}</span>
              <span>{formatRupiah(item.price)}</span>
            </li>
          ))}
        </ul>
        <div className="flex justify-between mb-2">
          <span>Subtotal</span>
          <span>{formatRupiah(subtotal)}</span>
        </div>
        <div className="flex justify-between mb-2">
          <span>Discount</span>
          <span>-{formatRupiah(discount)}</span>
        </div>
        <div className="flex justify-between mb-2">
          <span>Shipping</span>
          <span>{formatRupiah(shippingCost)}</span>
        </div>
        <hr className="my-2" />
        <div className="flex justify-between font-semibold">
          <span>Total</span>
          <span>{formatRupiah(total)}</span>
        </div>
      </div>

      {/* Payment Section */}
      <div className="bg-white shadow-md rounded-lg p-4 mb-6">
        <h2 className="text-xl font-semibold mb-4">Payment</h2>
        <select
          className="w-full border border-gray-300 rounded-md p-2"
          value={paymentMethod}
          onChange={(e) => setPaymentMethod(e.target.value)}
        >
          <option value="">Select Payment Method</option>
          <option value="credit_card">Credit Card</option>
          <option value="bank_transfer">Bank Transfer</option>
        </select>
      </div>

      {/* Checkout Button */}
      <button
        onClick={handleCheckout}
        className="bg-blue-500 text-white rounded-md py-2 px-4"
      >
        Checkout
      </button>
    </div>
  );
};

export default PaymentsMe;
