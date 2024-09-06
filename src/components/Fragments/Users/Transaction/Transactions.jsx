import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom'; // Ensure you import Link if using it
import { getTransactionMe } from '../../../../services/admin/transaction/services-transaction';
import { formatRupiah } from '../../../../utils/constants/function';
import {
  AiOutlineCar,
  AiOutlineClockCircle,
  AiOutlineCheckCircle,
  AiOutlineCloseCircle,
} from 'react-icons/ai';

const statusColors = {
  Success: 'bg-green-500',
  Pending: 'bg-yellow-500',
  Expired: 'bg-red-500',
  Failed: 'bg-red-500',
  Cancel: 'bg-red-500',
};

const shippingStatusColors = {
  'On Process': 'bg-yellow-500',
  Pending: 'bg-yellow-500',
  Cancel: 'bg-red-500',
  Delivered: 'bg-green-500',
  Accepted: 'bg-green-500',
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
  const [filteredTransactions, setFilteredTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [filter, setFilter] = useState('All');

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const response = await getTransactionMe();
        if (response.success) {
          setTransactions(response.data);
          setFilteredTransactions(response.data);
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

  // Fungsi untuk mengubah filter
  const handleFilterChange = (status) => {
    setFilter(status);
    if (status === 'All') {
      setFilteredTransactions(transactions);
    } else {
      setFilteredTransactions(
        transactions.filter(
          (transaction) => transaction.shippingStatus === status,
        ),
      );
    }
  };

  const handleFilterChangePay = (status) => {
    setFilter(status);
    if (status === 'All') {
      setFilteredTransactions(transactions);
    } else {
      setFilteredTransactions(
        transactions.filter(
          (transaction) => transaction.status_payment === status,
        ),
      );
    }
  };

  // Hitung total untuk setiap status
  const countByStatus = (status) => {
    return transactions.filter(
      (transaction) => transaction.shippingStatus === status,
    ).length;
  };

  const countByStatusPay = (status) => {
    return transactions.filter(
      (transaction) => transaction.status_payment === status,
    ).length;
  };
  return (
    <div className="max-w-6xl mx-auto px-4 py-6 mt-14">
      <h1 className="text-2xl md:text-3xl font-bold text-center mb-8">
        Transactions
      </h1>

      {/* Filter Header */}
      <div className="flex justify-around mb-6">
        <div
          className="text-center cursor-pointer"
          onClick={() => handleFilterChangePay('Pending')}
        >
          <AiOutlineClockCircle className="text-yellow-500 text-2xl mx-auto" />
          <p>Belum Bayar</p>
          <span>{countByStatusPay('Pending')}</span>
        </div>
        <div
          className="text-center cursor-pointer"
          onClick={() => handleFilterChange('On Process')}
        >
          <AiOutlineClockCircle className="text-yellow-500 text-2xl mx-auto" />
          <p>Dikemas</p>
          <span>{countByStatus('On Process')}</span>
        </div>
        <div
          className="text-center cursor-pointer"
          onClick={() => handleFilterChange('Delivered')}
        >
          <AiOutlineCar className="text-green-500 text-2xl mx-auto" />
          <p>Dikirim</p>
          <span>{countByStatus('Delivered')}</span>
        </div>
        <div
          className="text-center cursor-pointer"
          onClick={() => handleFilterChange('Accepted')}
        >
          <AiOutlineCheckCircle className="text-blue-500 text-2xl mx-auto" />
          <p>Diterima</p>
          <span>{countByStatus('Accepted')}</span>
        </div>
        <div
          className="text-center cursor-pointer"
          onClick={() => handleFilterChange('Cancel')}
        >
          <AiOutlineCloseCircle className="text-red-500 text-2xl mx-auto" />
          <p>Dibatalkan</p>
          <span>{countByStatus('Cancel')}</span>
        </div>
      </div>

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
      ) : filteredTransactions.length === 0 ? (
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
        filteredTransactions.map((transaction) => (
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
                  ? new Date(transaction.createdAt).toLocaleString('id-ID', {
                      dateStyle: 'medium',
                      timeStyle: 'short',
                    })
                  : 'N/A'}
              </p>

              <p className="text-sm md:text-base text-gray-700">
                <strong>Amount:</strong> {formatRupiah(transaction.total)}
              </p>
              <p className="text-sm md:text-base text-gray-700">
                <strong>Status Payment:</strong>
                <span
                  className={`text-white py-1 px-2 rounded-full text-xs md:text-sm ${statusColors[transaction.status_payment] || 'bg-gray-500'}`}
                >
                  {transaction.status_payment}
                </span>
              </p>
              <p className="text-sm md:text-base text-gray-700 mb-4">
                <strong>Shipping Status:</strong>
                <span
                  className={`text-white py-1 px-2 rounded-full text-xs md:text-sm ${shippingStatusColors[transaction.shippingStatus] || 'bg-gray-500'}`}
                >
                  {transaction.shippingStatus}
                </span>
              </p>
            </div>
            <div className="flex space-x-2">
              <Link to={`/transaction-me/${transaction.transactionId}`}>
                <button className="bg-blue-500 text-white py-2 px-4 rounded-lg text-sm md:text-base">
                  View
                </button>
              </Link>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default TransactionsMe;
