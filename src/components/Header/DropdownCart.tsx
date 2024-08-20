import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { faCartShopping } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const DropdownCart = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [cartItems, setCartItems] = useState([
    // Example cart items, replace with actual data
    { id: 1, name: 'Product 1', price: 100000, quantity: 2 },
    { id: 2, name: 'Product 2', price: 150000, quantity: 1 },
  ]);

  const trigger = useRef(null);
  const dropdown = useRef(null);

  useEffect(() => {
    const clickHandler = ({ target }) => {
      if (!dropdown.current) return;
      if (
        !dropdownOpen ||
        dropdown.current.contains(target) ||
        trigger.current.contains(target)
      )
        return;
      setDropdownOpen(false);
    };
    document.addEventListener('click', clickHandler);
    return () => document.removeEventListener('click', clickHandler);
  }, [dropdownOpen]);

  useEffect(() => {
    const keyHandler = ({ keyCode }) => {
      if (!dropdownOpen || keyCode !== 27) return;
      setDropdownOpen(false);
    };
    document.addEventListener('keydown', keyHandler);
    return () => document.removeEventListener('keydown', keyHandler);
  }, [dropdownOpen]);

  // Calculate the total quantity of cart items
  const totalQuantity = cartItems.reduce(
    (total, item) => total + item.quantity,
    0,
  );

  // Calculate the total price of cart items
  const totalPrice = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0,
  );

  return (
    <li className="relative">
      <button
        ref={trigger}
        onClick={() => setDropdownOpen(!dropdownOpen)}
        className="relative flex h-8.5 w-8.5 items-center justify-center rounded-full border-[0.5px] border-stroke bg-gray hover:text-primary dark:border-strokedark dark:bg-meta-4 dark:text-white"
      >
        <FontAwesomeIcon icon={faCartShopping} />
        {totalQuantity > 0 && (
          <span className="absolute top-0 right-0 h-4 w-4 flex items-center justify-center text-xs font-medium text-white bg-red-600 rounded-full">
            {totalQuantity}
          </span>
        )}
      </button>

      <div
        ref={dropdown}
        className={`absolute -right-27 mt-2.5 flex h-90 w-75 flex-col rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark sm:right-0 sm:w-80 ${
          dropdownOpen ? 'block' : 'hidden'
        }`}
      >
        <div className="px-4.5 py-3">
          <h5 className="text-sm font-medium text-bodydark2">Shopping Cart</h5>
        </div>

        <ul className="flex h-auto flex-col overflow-y-auto">
          {cartItems.length === 0 ? (
            <li className="px-4.5 py-3 text-sm">Your cart is empty.</li>
          ) : (
            cartItems.map((item) => (
              <li
                key={item.id}
                className="flex justify-between border-t border-stroke px-4.5 py-3 hover:bg-gray-2 dark:border-strokedark dark:hover:bg-meta-4"
              >
                <div className="flex flex-col">
                  <span className="text-sm text-black dark:text-white">
                    {item.name}
                  </span>
                  <span className="text-xs text-gray-500 dark:text-gray-300">
                    {item.quantity} x {formatRupiah(item.price)}
                  </span>
                </div>
                <span className="text-sm text-black dark:text-white">
                  {formatRupiah(item.price * item.quantity)}
                </span>
              </li>
            ))
          )}
        </ul>

        {cartItems.length > 0 && (
          <div className="flex justify-between px-4.5 py-3 border-t border-stroke bg-gray-50 dark:border-strokedark dark:bg-meta-4">
            <span className="text-sm font-medium text-bodydark2">Total:</span>
            <span className="text-sm font-medium text-black dark:text-white">
              {formatRupiah(totalPrice)}
            </span>
          </div>
        )}

        {cartItems.length > 0 && (
          <div className="px-4.5 py-3">
            <Link
              to="/checkout"
              className="block text-center text-primary hover:underline"
            >
              Go to Checkout
            </Link>
          </div>
        )}
      </div>
    </li>
  );
};

// Utility function to format rupiah currency
const formatRupiah = (amount) => {
  const formatter = new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
  });
  return formatter.format(amount);
};

export default DropdownCart;
