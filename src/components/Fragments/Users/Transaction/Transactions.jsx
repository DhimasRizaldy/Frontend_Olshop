import React, { useEffect, useState } from 'react';
import { getTransactionMe } from '../../../../services/admin/transaction/services-transaction';
import { formatRupiah } from '../../../../utils/constants/function';

const statusColors = {
  Completed: 'bg-green-500',
  Pending: 'bg-yellow-500',
  Canceled: 'bg-red-500',
};

const TransactionSkeleton = () => (
  <div className="p-4 rounded-md shadow-md mb-4 flex flex-col md:flex-row justify-between items-center border-l-4 bg-gray-200 animate-pulse">
    <div className="flex-1 mb-4 md:mb-0">
      <div className="h-6 bg-gray-300 rounded w-3/4 mb-2"></div>
      <div className="h-4 bg-gray-300 rounded w-1/2 mb-2"></div>
      <div className="h-4 bg-gray-300 rounded w-1/3 mb-2"></div>
      <div className="h-4 bg-gray-300 rounded w-2/3 mb-4"></div>
      <div className="flex space-x-2">
        <div className="h-8 bg-gray-300 rounded w-20"></div>
        <div className="h-8 bg-gray-300 rounded w-20"></div>
      </div>
    </div>
  </div>
);

const TransactionsMe = () => {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const response = await getTransactionMe();
        if (response.success) {
          setTransactions(response.data);
        } else {
          setError('Failed to fetch transactions');
        }
      } catch (error) {
        console.error('Error fetching transactions:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchTransactions();
  }, []);

  return (
    <div className="max-w-6xl mx-auto px-4 py-6 mt-14">
      <h1 className="text-2xl md:text-3xl font-bold text-center mb-8">
        Transactions
      </h1>
      {loading ? (
        <>
          <TransactionSkeleton />
          <TransactionSkeleton />
          <TransactionSkeleton />
        </>
      ) : error ? (
        <div className="text-center text-red-500">
          <h2 className="text-xl md:text-2xl font-semibold mb-4">{error}</h2>
          <p className="text-sm md:text-base text-gray-600">
            Anda Belum Login Silakan Login Terlebih Dahulu
          </p>
        </div>
      ) : transactions.length === 0 ? (
        <div className="text-center">
          <h2 className="text-xl md:text-2xl font-semibold text-gray-800 mb-4">
            No Transactions Available
          </h2>
          <p className="text-sm md:text-base text-gray-600">
            There are no transactions to display at the moment. Please check
            back later.
          </p>
        </div>
      ) : (
        transactions.map((transaction) => (
          <div
            key={transaction.transactionId}
            className="p-4 rounded-md shadow-md mb-4 flex flex-col md:flex-row justify-between items-start border-l-4 bg-white border-gray-300"
          >
            <div className="flex-1 mb-4 md:mb-0">
              <h2 className="text-base md:text-lg font-semibold">
                Transaction ID: {transaction.transactionId}
              </h2>
              <p className="text-sm md:text-base text-gray-700">
                <strong>Customer Name:</strong> {transaction.users.username}
              </p>
              <p className="text-sm md:text-base text-gray-700">
                <strong>Date:</strong>{' '}
                {transaction.createdAt
                  ? new Date(transaction.createdAt).toLocaleDateString()
                  : 'N/A'}
              </p>
              <p className="text-sm md:text-base text-gray-700">
                <strong>Amount:</strong> {formatRupiah(transaction.total)}
              </p>
              <p className="text-sm md:text-base text-gray-700 mb-4">
                <strong>Status:</strong>
                <span
                  className={`text-white py-1 px-2 rounded-full text-xs md:text-sm ${statusColors[transaction.status_payment] || 'bg-gray-500'}`}
                >
                  {transaction.status_payment}
                </span>
              </p>
            </div>
            <div className="flex space-x-2">
              <button className="bg-blue-500 text-white py-2 px-4 rounded-lg text-sm md:text-base">
                View
              </button>
              <button className="bg-red-500 text-white py-2 px-4 rounded-lg text-sm md:text-base">
                Delete
              </button>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default TransactionsMe;
