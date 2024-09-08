import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { getTransactionById } from '../../../../services/admin/transaction/services-transaction';
import { checkoutPaymentNotification } from '../../../../services/users/payment/servives-payment';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

const HandleSuccessPay = () => {
  const [transaction, setTransaction] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  // Get query parameter from URL
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const orderId = params.get('order_id'); // Ambil order_id dari query string

    console.log('Order ID from URL:', orderId); // Debug log

    const fetchTransaction = async () => {
      try {
        if (orderId) {
          const response = await getTransactionById(orderId);
          if (response) {
            setTransaction(response);
          } else {
            throw new Error('Transaction not found');
          }
        } else {
          throw new Error('Transaction ID is missing');
        }
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchTransaction();
  }, []);

  // Send Payment Notification to Backend
  useEffect(() => {
    const handlePaymentNotification = async () => {
      if (transaction && transaction.transaction_status === 'settlement') {
        try {
          await checkoutPaymentNotification({
            transactionId: transaction.transactionId, // Gunakan ID dari data transaksi
            transaction_status: transaction.transaction_status,
            payment_type: transaction.payment_type,
          });

          Swal.fire({
            title: 'Payment Success',
            text: 'Your payment has been successfully processed.',
            icon: 'success',
            confirmButtonText: 'OK',
          }).then(() => {
            navigate('/'); // Redirect to Home or another page
          });
        } catch (error) {
          console.error('Failed to send payment notification:', error);
        }
      }
    };

    if (transaction) {
      handlePaymentNotification();
    }
  }, [transaction, navigate]);

  if (loading) {
    return (
      <div className="max-w-6xl mx-auto px-4 py-6 mt-12 text-center">
        <Skeleton count={5} />
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-6xl mx-auto px-4 py-6 mt-12 text-center">
        <div
          className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative"
          role="alert"
        >
          <strong className="font-bold">Error!</strong>
          <span className="block sm:inline">{error}</span>
          <button
            onClick={() => navigate('/')}
            className="mt-4 inline-block bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
          >
            Go to Home
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-6 mt-12 text-center">
      <div className="bg-white shadow-md rounded-lg p-6">
        <h1 className="text-2xl font-bold mb-4">Payment Status</h1>
        {transaction && transaction.transaction_status === 'settlement' ? (
          <div>
            <p className="text-lg font-semibold mb-2">Transaction ID:</p>
            <p className="mb-4 text-gray-700">{transaction.transactionId}</p>
            <p className="text-lg font-semibold mb-2">Status:</p>
            <p className="mb-4 text-gray-700">
              {transaction.transaction_status}
            </p>
            <p className="text-lg font-semibold mb-2">Payment Type:</p>
            <p className="mb-4 text-gray-700">{transaction.payment_type}</p>
            <button
              onClick={() => navigate('/')}
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
            >
              Go to Home
            </button>
          </div>
        ) : (
          <div>
            <p className="text-lg font-semibold mb-2">Transaction ID:</p>
            <p className="mb-4 text-gray-700">{transaction.transactionId}</p>
            <p className="text-lg font-semibold mb-2">Status:</p>
            <p className="mb-4 text-gray-700">
              {transaction.transaction_status}
            </p>
            <p className="text-lg font-semibold mb-2">Payment Type:</p>
            <p className="mb-4 text-gray-700">{transaction.payment_type}</p>
            <button
              onClick={() => navigate('/')}
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
            >
              Go to Home
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default HandleSuccessPay;
