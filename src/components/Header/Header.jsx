import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <header className="bg-white shadow-md fixed w-full top-0 z-50">
      <div className="container mx-auto px-4 py-2 flex justify-between items-center">
        {/* Logo and Search (Both Desktop and Mobile) */}
        <div className="flex items-center space-x-4">
          {/* Logo */}
          <Link to={'/'}>
            <img
              src="https://via.placeholder.com/40"
              alt="Logo"
              className="w-10 h-10"
            />
          </Link>
          <span className="ml-2 text-xl font-bold hidden md:block">
            Toko Online
          </span>
        </div>

        {/* Search Bar (Both Desktop and Mobile) */}
        <div className="flex-1 mx-4">
          <input
            type="text"
            placeholder="Search Product"
            className="w-full px-4 py-2 rounded-full border border-gray-300"
          />
        </div>

        {/* Icons (Desktop) */}
        <div className="hidden md:flex items-center space-x-4">
          {/* Home Link */}
          <Link to={'/'} className="text-gray-700 hover:text-blue-500">
            Home
          </Link>
          {/* Product Link */}
          <Link to={'/products'} className="text-gray-700 hover:text-blue-500">
            Product
          </Link>
          {/* Promo Link */}
          <Link
            to={'/promo-voucher'}
            className="text-gray-700 hover:text-blue-500"
          >
            Promo
          </Link>
          {/* Transaction Link */}
          <Link
            to={'/transaction-me'}
            className="text-gray-700 hover:text-blue-500"
          >
            Transaksi
          </Link>

          {/* Notification Icon */}
          <Link
            to={'/notification-me'}
            className="relative text-gray-700 hover:text-blue-500"
          >
            <svg
              className="w-6 h-6"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6 6 0 10-12 0v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
              />
            </svg>
            <span className="absolute top-0 right-0 inline-block w-2 h-2 bg-red-600 rounded-full ring-2 ring-white"></span>
          </Link>
          {/* Cart Icon */}
          <Link
            to={'/carts'}
            className="relative text-gray-700 hover:text-blue-500"
          >
            <svg
              className="w-6 h-6"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2 9m5-9v9m4-9v9m4-9l2 9M5 21h14"
              />
            </svg>
            <span className="absolute top-0 right-0 inline-block w-2 h-2 bg-red-600 rounded-full ring-2 ring-white"></span>
          </Link>
          {/* Profile Icon */}
          <a href="#">
            <img
              src="https://via.placeholder.com/40"
              alt="Profile"
              className="w-10 h-10 rounded-full"
            />
          </a>
        </div>

        {/* Icons (Mobile) */}
        <div className="md:hidden flex items-center space-x-4">
          {/* Carts Icon */}
          <Link
            to={'/carts'}
            className="relative text-gray-700 hover:text-blue-500"
          >
            <svg
              className="w-6 h-6"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2 9m5-9v9m4-9v9m4-9l2 9M5 21h14"
              />
            </svg>
            <span className="absolute top-0 right-0 inline-block w-2 h-2 bg-red-600 rounded-full ring-2 ring-white"></span>
          </Link>
          {/* Profile Icon */}
          <a href="#">
            <img
              src="https://via.placeholder.com/40"
              alt="Profile"
              className="w-10 h-10 rounded-full"
            />
          </a>
        </div>
      </div>
    </header>
  );
};

export default Header;
