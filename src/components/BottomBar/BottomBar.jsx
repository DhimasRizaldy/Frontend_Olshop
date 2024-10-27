import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faHouse,
  faBell,
  faBox,
  faTag,
  faFileInvoice,
} from '@fortawesome/free-solid-svg-icons';
import { getNotification } from '../../services/admin/notification/services-notification';

const BottomNavBar = () => {
  const [unreadNotificationsCount, setUnreadNotificationsCount] = useState(0);
  const location = useLocation();
  const [activeMenu, setActiveMenu] = useState(location.pathname);

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const response = await getNotification();
        const unreadCount = response.data.filter(
          (notification) => !notification.isRead,
        ).length;
        setUnreadNotificationsCount(unreadCount);
      } catch (error) {
        console.error('Gagal mengambil notifikasi', error);
      }
    };

    fetchNotifications();
  }, []);

  useEffect(() => {
    setActiveMenu(location.pathname);
  }, [location.pathname]);

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-boxdark shadow-md md:hidden z-50">
      <div className="flex justify-around items-center py-2">
        {/* Ikon Beranda */}
        <Link
          to={'/'}
          className={`text-white flex flex-col items-center ${
            activeMenu === '/'
              ? 'text-blue-400 border-t-2 border-blue-400'
              : 'hover:text-blue-400'
          }`}
        >
          <FontAwesomeIcon icon={faHouse} />
          <span className="text-xs">Beranda</span>
        </Link>

        {/* Ikon Produk */}
        <Link
          to={'/products'}
          className={`text-white flex flex-col items-center ${
            activeMenu === '/products'
              ? 'text-blue-400 border-t-2 border-blue-400'
              : 'hover:text-blue-400'
          }`}
        >
          <FontAwesomeIcon icon={faBox} />
          <span className="text-xs">Produk</span>
        </Link>

        {/* Ikon Promo */}
        <Link
          to={'/promo-voucher'}
          className={`text-white flex flex-col items-center ${
            activeMenu === '/promo-voucher'
              ? 'text-blue-400 border-t-2 border-blue-400'
              : 'hover:text-blue-400'
          }`}
        >
          <FontAwesomeIcon icon={faTag} />
          <span className="text-xs">Promo</span>
        </Link>

        {/* Ikon Transaksi */}
        <Link
          to={'/transaction-me'}
          className={`text-white flex flex-col items-center ${
            activeMenu === '/transaction-me'
              ? 'text-blue-400 border-t-2 border-blue-400'
              : 'hover:text-blue-400'
          }`}
        >
          <FontAwesomeIcon icon={faFileInvoice} />
          <span className="text-xs">Transaksi</span>
        </Link>

        {/* Ikon Notifikasi */}
        <Link
          to={'/notification-me'}
          className={`text-white flex flex-col items-center relative ${
            activeMenu === '/notification-me'
              ? 'text-blue-400 border-t-2 border-blue-400'
              : 'hover:text-blue-400'
          }`}
        >
          <FontAwesomeIcon icon={faBell} />
          <span className="text-xs">Notifikasi</span>
          {unreadNotificationsCount > 0 && (
            <span className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-red-100 bg-red-600 rounded-full">
              {unreadNotificationsCount}
            </span>
          )}
        </Link>
      </div>
    </nav>
  );
};

export default BottomNavBar;