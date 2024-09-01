import React, { useEffect, useState } from 'react';
import { getCarts } from '../../../../services/users/carts/services-carts';
import { formatRupiah } from '../../../../utils/constants/function';

// Skeleton Loader Component
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

// Main Component
const CartsMe = () => {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [unauthorized, setUnauthorized] = useState(false); // To handle unauthorized status

  useEffect(() => {
    const fetchCartItems = async () => {
      try {
        const response = await getCarts(); // Call the API function
        if (response.success) {
          setCartItems(response.data); // Store the cart items in state
        } else if (response.status === 401) {
          setUnauthorized(true); // Set unauthorized status if token is not valid
        } else {
          // setError('Failed to fetch cart items');
        }
      } catch (error) {
        console.error('Error fetching cart items:', error);
        // setError('An error occurred while fetching cart items');
      } finally {
        setLoading(false); // Set loading to false after data is fetched
      }
    };

    fetchCartItems();
  }, []);

  // Calculate total price
  const calculateTotal = () => {
    return cartItems
      .reduce(
        (total, item) => total + item.qty * (item.products?.price || 0),
        0,
      )
      .toFixed(2);
  };

  // Handle quantity change
  const handleQuantityChange = (id, change, stock) => {
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.cartId === id
          ? {
              ...item,
              qty: Math.max(Math.min(item.qty + change, stock), 1),
            }
          : item,
      ),
    );
  };

  if (loading) {
    return (
      <div className="max-w-6xl mx-auto px-4 py-6 mt-12">
        <h1 className="text-2xl md:text-3xl font-bold mb-6">Shopping Cart</h1>
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
        <h1 className="text-2xl md:text-3xl font-bold mb-6">Unauthorized</h1>
        <p className="text-gray-600 text-base">
          Please log in to view your cart items.{' '}
          <a href="/login" className="text-blue-500 underline">
            Login here
          </a>
        </p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-6xl mx-auto px-4 py-6 mt-12 text-center">
        <h1 className="text-2xl md:text-3xl font-bold mb-6">Error</h1>
        <p className="text-gray-600 text-base">{error}</p>
      </div>
    );
  }

  if (cartItems.length === 0) {
    return (
      <div className="max-w-6xl mx-auto px-4 py-6 mt-12 text-center">
        <h1 className="text-2xl md:text-3xl font-bold mb-6">
          No Items in Cart
        </h1>
        <p className="text-gray-600 text-base">
          There are no items in your cart at the moment. Please add items to
          your cart to proceed with checkout.
        </p>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-6 mt-12">
      <h1 className="text-2xl md:text-3xl font-bold mb-6">Shopping Cart</h1>

      {/* Cart Items List */}
      <div className="bg-white shadow-md rounded-lg p-4 mb-4">
        {cartItems.map((item) => (
          <div
            key={item.cartId}
            className="flex flex-col md:flex-row justify-between items-center border-b border-gray-200 pb-4 mb-4"
          >
            <div className="flex items-center mb-4 md:mb-0">
              <img
                src={item.products?.image || 'https://via.placeholder.com/80'}
                alt={item.products?.name || 'Product'}
                className="w-20 h-20 object-cover rounded-md mr-4"
              />
              <div>
                <h2 className="text-base md:text-lg font-semibold">
                  {item.products?.name || 'Product Name'}
                </h2>
                <p className="text-gray-600 text-sm md:text-base">
                  Price: {formatRupiah(item.products?.price || 0)}
                </p>
                {item.products?.stock <= 0 && (
                  <p className="text-red-500 text-sm">Out of stock</p>
                )}
              </div>
            </div>
            <div className="flex items-center">
              <button
                className={`bg-gray-200 text-gray-700 px-2 py-1 rounded-md font-semibold mr-2 ${item.products?.stock <= 0 ? 'cursor-not-allowed opacity-50' : ''}`}
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
              <span className="text-base md:text-lg font-semibold">
                {item.qty}
              </span>
              <button
                className={`bg-gray-200 text-gray-700 px-2 py-1 rounded-md font-semibold ml-2 ${item.products?.stock <= 0 ? 'cursor-not-allowed opacity-50' : ''}`}
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
              <p className="text-base md:text-lg font-semibold ml-6">
                {formatRupiah(item.qty * (item.products?.price || 0))}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Total Price and Checkout */}
      <div className="flex flex-col md:flex-row justify-between items-center bg-white shadow-md rounded-lg p-4">
        <div>
          <h2 className="text-xl md:text-2xl font-bold">
            Total: {formatRupiah(calculateTotal())}
          </h2>
          <p className="text-gray-600 text-sm md:text-base">
            Includes all applicable taxes and fees
          </p>
        </div>
        <button className="bg-green-500 text-white px-4 py-2 rounded-md font-bold hover:bg-green-600 transition duration-200">
          Proceed to Checkout
        </button>
      </div>
    </div>
  );
};

export default CartsMe;