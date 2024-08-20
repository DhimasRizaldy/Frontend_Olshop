import React from 'react';
import { NavLink } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faBox,
  faList,
  faGauge,
  faTag,
  faCartShopping,
  faComment,
  faUser,
  faBoxesStacked,
  faTruckField,
} from '@fortawesome/free-solid-svg-icons';

const BottomNavBar = ({ userRole }) => {
  const menuItems = [
    { to: '/dashboard', icon: faGauge, label: 'Dashboard' },
    { to: '/product', icon: faBoxesStacked, label: 'Product' },
    { to: '/promo', icon: faTag, label: 'Promo' },
    { to: '/transaction', icon: faCartShopping, label: 'Transaction' },
    ...(userRole === 'ADMIN'
      ? [
          { to: '/users', icon: faUser, label: 'Users' },
          { to: '/supplier', icon: faTruckField, label: 'Supplier' },
          { to: '/management', icon: faBox, label: 'Management Product' },
          { to: '/category', icon: faList, label: 'Category Product' },
          { to: '/rating', icon: faComment, label: 'Rating' },
        ]
      : []),
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 flex justify-around bg-black text-white py-2 px-4 lg:hidden">
      {menuItems.map((item, index) => (
        <NavLink
          key={index}
          to={item.to}
          className={({ isActive }) =>
            `flex flex-col items-center ${
              isActive ? 'text-yellow-500' : 'text-white'
            }`
          }
        >
          <FontAwesomeIcon icon={item.icon} />
          <span className="text-xs">{item.label}</span>
        </NavLink>
      ))}
    </nav>
  );
};

export default BottomNavBar;
