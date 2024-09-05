import React, { useEffect, useState } from 'react';
import { formatRupiah } from '../../../../utils/constants/function';
import { getDetailTransaction } from '../../../../services/admin/transaction/services-transaction';

const DetailTransaction = ({ transactionId }) => {
  const [transactionDetail, setTransactionDetail] = useState(null);

  useEffect(() => {
    // Mengambil detail transaksi dari API
    const fetchTransactionDetail = async () => {
      try {
        const response = await getDetailTransaction(transactionId);
        console.log(response); // Tambahkan console.log untuk melihat respons API
        if (response.success) {
          setTransactionDetail(response.data);
        } else {
          console.error('Error fetching transaction detail:', response.message);
        }
      } catch (error) {
        console.error('Error fetching transaction detail:', error);
      }
    };
    fetchTransactionDetail();
  }, [transactionId]);

  if (!transactionDetail) {
    return <div>Loading...</div>;
  }

  // Fungsi untuk mengatur warna status payment dan shipping berdasarkan status
  const getStatusColor = (status) => {
    switch (status) {
      case 'Success':
      case 'Completed':
        return 'bg-green-500 text-white';
      case 'Pending':
        return 'bg-yellow-500 text-white';
      case 'Expired':
      case 'Failed':
        return 'bg-red-500 text-white';
      default:
        return 'bg-gray-500 text-white';
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-6 mt-10">
      <div className="bg-white shadow-md rounded-lg p-6">
        <h1 className="text-3xl font-bold text-center mb-8">
          Transaction Details
        </h1>

        <div className="flex justify-end mb-6 gap-4">
          <button
            onClick={() => window.print()}
            className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition duration-300"
          >
            Print
          </button>
          <button
            onClick={() => console.log('Download PDF')}
            className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 transition duration-300"
          >
            Download PDF
          </button>
        </div>

        <div className="border-b border-gray-200 pb-4 mb-4">
          <h2 className="text-2xl font-semibold mb-2">Transaction Overview</h2>
          <p className="text-gray-600 mb-2">
            <strong>Transaction ID:</strong> {transactionDetail.transactionId}
          </p>
          <p className="text-gray-600 mb-2">
            <strong>Date:</strong>{' '}
            {new Date(transactionDetail.transaction_time).toLocaleDateString()}
          </p>
          <p className="text-gray-600 mb-2">
            <strong>Status:</strong>
            <span
              className={`${getStatusColor(transactionDetail.status_payment)} py-1 px-2 rounded-full text-xs`}
            >
              {transactionDetail.status_payment}
            </span>
          </p>
          <p className="text-gray-600 mb-2">
            <strong>Total Amount:</strong>{' '}
            {formatRupiah(transactionDetail.total)}
          </p>
        </div>

        <div className="border-b border-gray-200 pb-4 mb-4">
          <h2 className="text-xl font-semibold mb-2">User Information</h2>
          <p className="text-gray-600 mb-2">
            <strong>Name:</strong> {transactionDetail.users.username}
          </p>
          <p className="text-gray-600 mb-2">
            <strong>Email:</strong> {transactionDetail.users.email}
          </p>
        </div>

        <div className="border-b border-gray-200 pb-4 mb-4">
          <h2 className="text-xl font-semibold mb-2">Delivery Address</h2>
          <p className="text-gray-600 mb-2">
            <strong>Street:</strong> {transactionDetail.address.address}
          </p>
          <p className="text-gray-600 mb-2">
            <strong>City:</strong> {transactionDetail.address.city}
          </p>
          <p className="text-gray-600 mb-2">
            <strong>Postal Code:</strong> {transactionDetail.address.postalCode}
          </p>
          <p className="text-gray-600 mb-2">
            <strong>Country:</strong> {transactionDetail.address.country}
          </p>
        </div>

        <div className="border-b border-gray-200 pb-4 mb-4">
          <h2 className="text-xl font-semibold mb-2">Shipping Information</h2>
          <p className="text-gray-600 mb-2">
            <strong>Courier:</strong> {transactionDetail.courier}
          </p>
          <p className="text-gray-600 mb-2">
            <strong>Shipping Status:</strong>
            <span
              className={`${getStatusColor(transactionDetail.shippingStatus)} py-1 px-2 rounded-full text-xs`}
            >
              {transactionDetail.shippingStatus}
            </span>
          </p>
        </div>

        <div className="border-b border-gray-200 pb-4 mb-4">
          <h2 className="text-xl font-semibold mb-2">Promo Information</h2>
          <p className="text-gray-600 mb-2">
            <strong>Promo Code:</strong> {transactionDetail.promo.codePromo}
          </p>
          <p className="text-gray-600 mb-2">
            <strong>Discount:</strong> {transactionDetail.promo.discount}%
          </p>
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-2">Payment Information</h2>
          <p className="text-gray-600 mb-2">
            <strong>Payment Method:</strong> {transactionDetail.payment_type}
          </p>
          <p className="text-gray-600 mb-2">
            <strong>Transaction ID:</strong> {transactionDetail.transactionId}
          </p>
          <p className="text-gray-600 mb-2">
            <strong>Amount Paid:</strong>{' '}
            {formatRupiah(transactionDetail.total)}
          </p>
          <p className="text-gray-600 mb-2">
            <strong>Status:</strong>
            <span
              className={`${getStatusColor(transactionDetail.status_payment)} py-1 px-2 rounded-full text-xs`}
            >
              {transactionDetail.status_payment}
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default DetailTransaction;
