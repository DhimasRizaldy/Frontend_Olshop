import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import DropdownUser from './DropdownUser';
import { getWHOAMI } from '../../services/auth/admin/getDataUser';
import { getNotification } from '../../services/admin/notification/services-notification.js';
import { getCarts } from '../../services/users/carts/services-carts';
import Button from '../Elements/Button/Index.jsx';

const Header = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [unreadNotificationsCount, setUnreadNotificationsCount] = useState(0);
  const [cartItemsCount, setCartItemsCount] = useState(0);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await getWHOAMI();
        setUserData(response.data);
      } catch (error) {
        // console.error('Failed to fetch user data', error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const response = await getNotification();
        const unreadCount = response.data.filter(
          (notification) => !notification.isRead,
        ).length;
        setUnreadNotificationsCount(unreadCount);
      } catch (error) {
        console.error('Failed to fetch notifications', error);
      }
    };

    fetchNotifications();
  }, []);

  useEffect(() => {
    const fetchCarts = async () => {
      try {
        const response = await getCarts();
        const uncheckoutItemsCount = response.data.filter(
          (cartItem) => !cartItem.isCheckout,
        ).length;
        setCartItemsCount(uncheckoutItemsCount);
      } catch (error) {
        console.error('Failed to fetch cart items', error);
      }
    };

    fetchCarts();
  }, []);

  const isUserLoggedIn = userData !== null;

  useEffect(() => {
    const fetchSearchResults = async () => {
      if (searchTerm.trim() === '') {
        setSearchResults([]);
        return;
      }
      try {
        const response = await axios.get(
          `https://backend-olshop.vercel.app/api/v1/product?search=${searchTerm}`,
        );
        setSearchResults(response.data.data);
      } catch (error) {
        // console.error('Error fetching search results:', error);
      }
    };

    const debounceTimer = setTimeout(fetchSearchResults, 300);

    return () => clearTimeout(debounceTimer);
  }, [searchTerm]);

  return (
    <header className="bg-white shadow-md fixed w-full top-0 z-50">
      <div className="container mx-auto px-4 py-2 flex flex-wrap justify-between items-center">
        {/* Logo and Title */}
        <div className="flex items-center space-x-4">
          <Link to={'/'}>
            <img
              src="https://ik.imagekit.io/xnl4hkzkx/logo.png?updatedAt=1724600025658"
              alt="Logo"
              className="w-10 h-10"
            />
          </Link>
          <span className="ml-2 text-2xl font-extrabold hidden md:block text-black">
            Putra Komputer
          </span>
        </div>

        {/* Search Bar */}
        <div className="relative flex-1 mx-4">
          <input
            type="text"
            placeholder="Search Product"
            className="w-full sm:w-64 md:w-full px-4 py-2 rounded-full border border-gray-300"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          {searchResults.length > 0 && (
            <div className="absolute top-full left-0 w-full bg-white border border-gray-300 mt-2 rounded-lg shadow-lg z-50">
              <div className="flex flex-col divide-y divide-gray-200">
                {searchResults.map((product) => (
                  <Link
                    key={product.productId}
                    to={`/details-products/${product.productId}`}
                    className="flex items-center p-3 hover:bg-gray-100"
                  >
                    <img
                      src={product.image || 'https://via.placeholder.com/80'}
                      alt={product.name}
                      className="w-16 h-16 object-cover rounded-md"
                    />
                    <div className="ml-3 flex-1">
                      <h4 className="text-sm font-semibold text-gray-800">
                        {product.name}
                      </h4>
                      <p className="text-xs text-gray-600">
                        {product.price
                          ? `Rp ${product.price.toLocaleString('id-ID')}`
                          : 'Harga tidak tersedia'}
                      </p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center space-x-4">
          <Link to={'/'} className="text-black hover:text-blue-500">
            Home
          </Link>
          <Link to={'/products'} className="text-black hover:text-blue-500">
            Product
          </Link>
          <Link
            to={'/promo-voucher'}
            className="text-black hover:text-blue-500"
          >
            Promo
          </Link>
          <Link
            to={'/transaction-me'}
            className="text-black hover:text-blue-500"
          >
            Transaksi
          </Link>

          {/* Notification Icon */}
          <Link
            to={'/notification-me'}
            className="relative text-black hover:text-blue-500"
          >
            <svg
              className="w-8 h-7"
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
            {unreadNotificationsCount > 0 && (
              <span className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-red-100 bg-red-600 rounded-full">
                {unreadNotificationsCount}
              </span>
            )}
          </Link>

          {/* Cart Icon */}
          <Link
            to={'/carts'}
            className="relative text-black hover:text-blue-500"
          >
            <svg
              className="w-8 h-7"
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
            {cartItemsCount > 0 && (
              <span className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-red-100 bg-red-600 rounded-full">
                {cartItemsCount}
              </span>
            )}
          </Link>

          {isUserLoggedIn ? (
            <DropdownUser userData={userData} />
          ) : (
            <Link to={'/login'}>
              <Button classname="p-2 font-medium text-white transition border rounded-lg cursor-pointer border-primary bg-primary hover:bg-opacity-90">
                Login
              </Button>
            </Link>
          )}
        </div>

        {/* Mobile Icons and Links */}
        <div className="md:hidden flex items-center space-x-4">
          {/* Search Icon */}
          <button
            className="text-black hover:text-blue-500"
            onClick={() => document.getElementById('mobile-search').focus()}
          ></button>
          {/* User Icon */}
          <button
            className="text-black hover:text-blue-500"
            onClick={() =>
              document.getElementById('mobile-menu').classList.toggle('hidden')
            }
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
                d="M4 6h16M4 12h16m-7 6h7"
              />
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        id="mobile-menu"
        className="absolute top-16 left-0 w-full bg-white border border-gray-300 rounded-lg shadow-lg hidden"
      >
        <div className="flex flex-col p-4 space-y-2">
          <Link
            to={'/carts'}
            className="text-black hover:text-blue-500 flex items-center"
          >
            Cart
            {cartItemsCount > 0 && (
              <span className="ml-2 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-red-100 bg-red-600 rounded-full">
                {cartItemsCount}
              </span>
            )}
          </Link>
          {isUserLoggedIn ? (
            <DropdownUser userData={userData} />
          ) : (
            <Link to={'/login'}>
              <Button classname="p-2 font-medium text-white transition border rounded-lg cursor-pointer border-primary bg-primary hover:bg-opacity-90">
                Login
              </Button>
            </Link>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
