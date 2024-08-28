import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faHouse,
  faBell,
  faBox,
  faTag,
  faFileInvoice,
} from '@fortawesome/free-solid-svg-icons';

const BottomNavBar = () => {
  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-boxdark shadow-md md:hidden z-50">
      {/* Menambahkan z-index agar tetap di atas */}
      <div className="flex justify-around items-center py-2">
        {/* Home Icon */}
        <Link
          to={'/'}
          className="text-white hover:text-yellow-400 flex flex-col items-center"
        >
          <FontAwesomeIcon icon={faHouse} />
          <span className="text-xs">Home</span>
        </Link>

        {/* Product Icon */}
        <Link
          to={'/products'}
          className="text-white hover:text-yellow-400 flex flex-col items-center"
        >
          <FontAwesomeIcon icon={faBox} />
          <span className="text-xs">Product</span>
        </Link>

        {/* Promo Icon */}
        <Link
          to={'/promo-voucher'}
          className="text-white hover:text-yellow-400 flex flex-col items-center"
        >
          <FontAwesomeIcon icon={faTag} />
          <span className="text-xs">Promo</span>
        </Link>

        {/* Transaction Icon */}
        <Link
          to={'/transaction-me'}
          className="text-white hover:text-yellow-400 flex flex-col items-center"
        >
          <FontAwesomeIcon icon={faFileInvoice} />
          <span className="text-xs">Transaction</span>
        </Link>

        {/* Notification Icon */}
        <Link
          to={'/notification-me'}
          className="text-white hover:text-yellow-400 flex flex-col items-center"
        >
          <FontAwesomeIcon icon={faBell} />
          <span className="text-xs">Notifications</span>
        </Link>
      </div>
    </nav>
  );
};

export default BottomNavBar;
