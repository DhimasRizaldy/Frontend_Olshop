import React, { useEffect, useState } from 'react';
import { checkoutPayment } from '../../../../services/users/payment/servives-payment';
import { getAddress } from '../../../../services/admin/address/services-address';
import { getPromo } from '../../../../services/admin/promo/services-promo';
import { getCarts } from '../../../../services/users/carts/services-carts';
import { formatRupiah } from '../../../../utils/constants/function';
import {
  fetchCities,
  fetchProvinces,
  fetchShippingCost,
} from '../../../../utils/constants/apiRajaOngkir';

const PaymentsMe = () => {
  const [cartItems, setCartItems] = useState([]);
  const [discountCode, setDiscountCode] = useState('');
  const [address, setAddress] = useState({});
  const [selectedAddress, setSelectedAddress] = useState('');
  const [addresses, setAddresses] = useState([]);
  const [selectedPromo, setSelectedPromo] = useState('');
  const [promos, setPromos] = useState([]);
  const [provinceId, setProvinceId] = useState('');
  const [cityId, setCityId] = useState('');
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
    const fetchData = async () => {
      try {
        const cartResponse = await getCarts();
        if (cartResponse.success && Array.isArray(cartResponse.data)) {
          setCartItems(cartResponse.data);
          setSubtotal(
            cartResponse.data.reduce(
              (sum, item) => sum + item.products.price * item.qty,
              0,
            ),
          );
        } else {
          console.error(
            'Error: cartResponse is not an array or success is false',
          );
        }

        const addressResponse = await getAddress();
        setAddresses(addressResponse.data || []);

        const promoResponse = await getPromo();
        if (promoResponse.success) {
          // Filter promos that haven't expired yet
          const now = new Date();
          const validPromos = promoResponse.data.filter(
            (promo) => new Date(promo.expiresAt) > now,
          );
          setPromos(validPromos);
        } else {
          console.error('Failed to fetch promotions');
        }

        setTotal(subtotal - discount + shippingCost);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [subtotal, discount, shippingCost]);

  useEffect(() => {
    if (provinceId) {
      fetchCities(provinceId).then(setCities).catch(console.error);
    }
  }, [provinceId]);

  useEffect(() => {
    if (shippingOption) {
      fetchShippingCost(shippingOption)
        .then(setShippingOptions)
        .catch(console.error);
    }
  }, [shippingOption]);

  const handleApplyDiscount = () => {
    // Apply the discount logic
    const promo = promos.find((p) => p.promoId === selectedPromo);
    if (promo) {
      setDiscount(subtotal * (promo.discount / 100));
    } else {
      setDiscount(0);
    }
  };

  const handleCheckout = async () => {
    try {
      const response = await checkoutPayment({
        cartItems,
        discountCode,
        address: selectedAddress,
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

  useEffect(() => {
    setTotal(subtotal - discount + shippingCost);
  }, [subtotal, discount, shippingCost]);

  return (
    <div className="max-w-6xl mx-auto px-4 py-6 mt-12">
      <h1 className="text-3xl font-bold mb-6">Checkout</h1>

      {/* Shipping Address Section */}
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
        {cartItems.length > 0 ? (
          cartItems.map((item) => (
            <div key={item.cartId} className="flex items-center mb-4">
              <img
                src={item.products.image}
                alt={item.products.name}
                className="w-20 h-20 mr-4"
              />
              <div>
                <h3 className="text-lg font-semibold">{item.products.name}</h3>
                <p className="text-gray-600">
                  {formatRupiah(item.products.price)} x {item.qty}
                </p>
              </div>
            </div>
          ))
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

      {/* Payment Method Section */}
      <div className="bg-white shadow-md rounded-lg p-4 mb-6">
        <h2 className="text-xl font-semibold mb-4">Payment Method</h2>
        <select
          className="w-full border border-gray-300 rounded-md p-2"
          value={paymentMethod}
          onChange={(e) => setPaymentMethod(e.target.value)}
        >
          <option value="">Select Payment Method</option>
          <option value="credit_card">Credit Card</option>
          <option value="bank_transfer">Bank Transfer</option>
          <option value="cod">Cash on Delivery</option>
        </select>
      </div>

      {/* Checkout Button */}
      <div className="flex flex-col bg-white shadow-md rounded-lg p-4 space-y-4 md:space-y-6">
        <div className="bg-white shadow-md rounded-lg p-4 mb-6">
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">
              Subtotal: {formatRupiah(subtotal)}
            </h3>
            <h3 className="text-lg font-semibold">
              Discount: {formatRupiah(discount)}
            </h3>
            <h3 className="text-lg font-semibold">
              Shipping Cost: {formatRupiah(shippingCost)}
            </h3>
            <h2 className="text-2xl font-bold">Total: {formatRupiah(total)}</h2>
          </div>
          <button
            onClick={handleCheckout}
            className="bg-primary text-white rounded-md p-2 mt-4 justify-center "
          >
            Checkout
          </button>
        </div>
      </div>
    </div>
  );
};

export default PaymentsMe;
