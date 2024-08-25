import React from 'react';

// Contoh data diskon
const discountCoupons = [
  {
    id: 1,
    title: '20% Off on Electronics',
    description: 'Valid until: December 31, 2024',
    code: 'ELECTRO20',
    isExpired: false,
    expiryDate: '2024-12-31',
  },
  {
    id: 2,
    title: '50% Off on Fashion',
    description: 'Expired on: July 31, 2024',
    code: 'FASHION50',
    isExpired: true,
    expiryDate: '2024-07-31',
  },
  {
    id: 3,
    title: '15% Off on Groceries',
    description: 'Valid until: November 15, 2024',
    code: 'GROCERY15',
    isExpired: false,
    expiryDate: '2024-11-15',
  },
  {
    id: 4,
    title: '20% Off on Electronics',
    description: 'Valid until: December 31, 2024',
    code: 'ELECTRO20',
    isExpired: false,
    expiryDate: '2024-12-31',
  },
  {
    id: 5,
    title: '50% Off on Fashion',
    description: 'Expired on: July 31, 2024',
    code: 'FASHION50',
    isExpired: true,
    expiryDate: '2024-07-31',
  },
  {
    id: 6,
    title: '15% Off on Groceries',
    description: 'Valid until: November 15, 2024',
    code: 'GROCERY15',
    isExpired: false,
    expiryDate: '2024-11-15',
  },
];

const VoucherPromos = () => {
  return (
    <div className="max-w-6xl mx-auto px-4 py-6 mt-12">
      <h1 className="text-3xl font-bold mb-6">Discounts</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {discountCoupons.map((coupon) => (
          <div
            key={coupon.id}
            className={`bg-white shadow-md rounded-lg p-4 border-l-4 ${
              coupon.isExpired
                ? 'border-red-500 opacity-50'
                : 'border-green-500'
            }`}
          >
            <h2 className="text-xl font-semibold mb-2">{coupon.title}</h2>
            <p className="text-gray-600 mb-4">
              {coupon.description}
              <span
                className={`font-bold ${coupon.isExpired ? 'text-red-600' : 'text-green-600'}`}
              >
                {coupon.isExpired
                  ? `Expired on: ${coupon.expiryDate}`
                  : `Valid until: ${coupon.expiryDate}`}
              </span>
            </p>
            <p className="text-gray-600 mb-2">
              Use code: <span className="font-bold">{coupon.code}</span>
            </p>
            <button
              className={`${
                coupon.isExpired
                  ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  : 'bg-green-500 text-white'
              } px-4 py-2 rounded-md font-bold hover:bg-green-600 transition duration-200`}
              disabled={coupon.isExpired}
            >
              {coupon.isExpired ? 'Expired' : 'Use Now'}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default VoucherPromos;
