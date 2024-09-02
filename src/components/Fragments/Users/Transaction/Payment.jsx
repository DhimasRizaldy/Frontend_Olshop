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
} from '../../../../services/users/rajaongkir/rajaongkir-services';

const PaymentsMe = () => {
  const [cartItems, setCartItems] = useState([]);
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
  const [paymentMethod, setPaymentMethod] = useState('');
  const [subtotal, setSubtotal] = useState(0);
  const [discount, setDiscount] = useState(0);
  const [shippingCost, setShippingCost] = useState(0);
  const [total, setTotal] = useState(0);
  const [shippingOptions, setShippingOptions] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch Cart Data
        const cartResponse = await getCarts();
        if (cartResponse.success && Array.isArray(cartResponse.data)) {
          setCartItems(cartResponse.data);
          const calculatedSubtotal = cartResponse.data.reduce(
            (sum, item) => sum + item.products.price * item.qty,
            0,
          );
          setSubtotal(calculatedSubtotal);
        } else {
          console.error(
            'Error: cartResponse is not an array or success is false',
          );
        }

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
          const data = await fetchShippingCost(provId, cityId, weight, courier);
          if (Array.isArray(data)) {
            setShippingOptions(data); // Set state with fetched data

            // Find the relevant cost from shipping options
            const selectedOption = data.find(
              (option) => option.service === shippingOption,
            );
            if (selectedOption) {
              setShippingCost(selectedOption.costs[0].value);
            }
          } else {
            console.error('Expected an array of shipping options');
          }
        } catch (error) {
          console.error('Error fetching shipping cost:', error);
        }
      }
    };

    calculateShippingCost();
  }, [provId, cityId, shippingOption]); // Fetch shipping cost when dependencies change

  useEffect(() => {
    // Recalculate total whenever subtotal, discount, or shippingCost changes
    setTotal(subtotal - discount + shippingCost);
  }, [subtotal, discount, shippingCost]);

  const handleApplyDiscount = () => {
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
        discountCode: selectedPromo,
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
          value={provId}
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

        {/* Shipping Option */}
        <select
          className="w-full border border-gray-300 rounded-md p-2 mb-2"
          value={shippingOption}
          onChange={(e) => setShippingOption(e.target.value)}
        >
          <option value="">Select Shipping Option</option>
          {shippingOptions.map((option) => (
            <option key={option.service} value={option.service}>
              {option.service}
            </option>
          ))}
        </select>

        {/* Payment Method */}
        <select
          className="w-full border border-gray-300 rounded-md p-2 mb-2"
          value={paymentMethod}
          onChange={(e) => setPaymentMethod(e.target.value)}
        >
          <option value="">Select Payment Method</option>
          <option value="credit_card">Credit Card</option>
          <option value="bank_transfer">Bank Transfer</option>
        </select>

        {/* Promo Code */}
        <div className="mb-4">
          <input
            type="text"
            placeholder="Enter Promo Code"
            className="w-full border border-gray-300 rounded-md p-2 mb-2"
            value={discountCode}
            onChange={(e) => setDiscountCode(e.target.value)}
          />
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded-md"
            onClick={handleApplyDiscount}
          >
            Apply Discount
          </button>
        </div>

        {/* Cart Items */}
        <div className="mb-4">
          <h3 className="text-lg font-semibold">Cart Items</h3>
          <ul>
            {cartItems.map((item) => (
              <li key={item.id} className="flex justify-between py-2">
                <span>{item.products.name}</span>
                <span>
                  {formatRupiah(item.products.price)} x {item.qty}
                </span>
              </li>
            ))}
          </ul>
        </div>

        {/* Totals */}
        <div className="border-t pt-4">
          <div className="flex justify-between py-2">
            <span>Subtotal:</span>
            <span>{formatRupiah(subtotal)}</span>
          </div>
          <div className="flex justify-between py-2">
            <span>Discount:</span>
            <span>{formatRupiah(discount)}</span>
          </div>
          <div className="flex justify-between py-2">
            <span>Shipping Cost:</span>
            <span>{formatRupiah(shippingCost)}</span>
          </div>
          <div className="flex justify-between py-2 font-bold">
            <span>Total:</span>
            <span>{formatRupiah(total)}</span>
          </div>
        </div>

        {/* Checkout Button */}
        <button
          className="bg-green-500 text-white px-6 py-3 rounded-md mt-4"
          onClick={handleCheckout}
        >
          Proceed to Checkout
        </button>
      </div>
    </div>
  );
};

export default PaymentsMe;
