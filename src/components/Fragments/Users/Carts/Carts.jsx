import React, { useState } from 'react';

const initialCartItems = [
  {
    id: 1,
    name: 'Product Name 1',
    price: 50.0,
    quantity: 1,
    image: 'https://via.placeholder.com/80',
  },
  {
    id: 2,
    name: 'Product Name 2',
    price: 30.0,
    quantity: 2,
    image: 'https://via.placeholder.com/80',
  },
  {
    id: 3,
    name: 'Product Name 3',
    price: 40.0,
    quantity: 1,
    image: 'https://via.placeholder.com/80',
  },
];

const CartsMe = () => {
  const [cartItems, setCartItems] = useState(initialCartItems);

  // Menghitung total harga
  const calculateTotal = () => {
    return cartItems
      .reduce((total, item) => total + item.price * item.quantity, 0)
      .toFixed(2);
  };

  // Menangani perubahan jumlah item
  const handleQuantityChange = (id, change) => {
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id
          ? { ...item, quantity: Math.max(item.quantity + change, 1) }
          : item,
      ),
    );
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-6 mt-12">
      <h1 className="text-3xl font-bold mb-6">Shopping Cart</h1>

      {/* Daftar Item Keranjang */}
      <div className="bg-white shadow-md rounded-lg p-4 mb-4">
        {cartItems.map((item) => (
          <div
            key={item.id}
            className="flex justify-between items-center border-b border-gray-200 pb-4 mb-4"
          >
            <div className="flex items-center">
              <img
                src={item.image}
                alt={item.name}
                className="w-20 h-20 object-cover rounded-md mr-4"
              />
              <div>
                <h2 className="text-lg font-semibold">{item.name}</h2>
                <p className="text-gray-600">Price: ${item.price.toFixed(2)}</p>
              </div>
            </div>
            <div className="flex items-center">
              <button
                className="bg-gray-200 text-gray-700 px-3 py-1 rounded-md font-semibold mr-2"
                onClick={() => handleQuantityChange(item.id, -1)}
              >
                -
              </button>
              <span className="text-lg font-semibold">{item.quantity}</span>
              <button
                className="bg-gray-200 text-gray-700 px-3 py-1 rounded-md font-semibold ml-2"
                onClick={() => handleQuantityChange(item.id, 1)}
              >
                +
              </button>
              <p className="text-lg font-semibold ml-6">
                ${(item.price * item.quantity).toFixed(2)}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Total Harga dan Checkout */}
      <div className="flex justify-between items-center bg-white shadow-md rounded-lg p-4">
        <div>
          <h2 className="text-2xl font-bold">Total: ${calculateTotal()}</h2>
          <p className="text-gray-600">
            Includes all applicable taxes and fees
          </p>
        </div>
        <button className="bg-green-500 text-white px-6 py-2 rounded-md font-bold hover:bg-green-600 transition duration-200">
          Proceed to Checkout
        </button>
      </div>
    </div>
  );
};

export default CartsMe;
