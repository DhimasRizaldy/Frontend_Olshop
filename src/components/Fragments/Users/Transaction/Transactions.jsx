import React from 'react';

// Contoh data transaksi
const transactionsMe = [
  {
    id: 'TX12345',
    customerName: 'John Doe',
    date: '2024-08-23',
    amount: '$150.00',
    status: 'Completed',
  },
  {
    id: 'TX67890',
    customerName: 'Jane Smith',
    date: '2024-08-22',
    amount: '$250.00',
    status: 'Pending',
  },
  {
    id: 'TX12346',
    customerName: 'Alice Johnson',
    date: '2024-08-20',
    amount: '$100.00',
    status: 'Completed',
  },
  {
    id: 'TX67891',
    customerName: 'Bob Brown',
    date: '2024-08-19',
    amount: '$200.00',
    status: 'Pending',
  },
];

const statusColors = {
  Completed: 'bg-green-500',
  Pending: 'bg-yellow-500',
};

const TransactionsMe = () => {
  return (
    <div className="max-w-6xl mx-auto px-4 py-6 mt-14">
      <h1 className="text-3xl font-bold text-center mb-8">Transaction Data</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {transactionsMe.map((transaction) => (
          <div
            key={transaction.id}
            className="bg-white shadow-md rounded-lg p-6"
          >
            <h2 className="text-lg font-semibold mb-2">
              Transaction ID: {transaction.id}
            </h2>
            <p className="text-gray-600 mb-1">
              <strong>Customer Name:</strong> {transaction.customerName}
            </p>
            <p className="text-gray-600 mb-1">
              <strong>Date:</strong> {transaction.date}
            </p>
            <p className="text-gray-600 mb-1">
              <strong>Amount:</strong> {transaction.amount}
            </p>
            <p className="text-gray-600 mb-4">
              <strong>Status:</strong>
              <span
                className={`bg-white text-white py-1 px-2 rounded-full text-xs ${statusColors[transaction.status]}`}
              >
                {transaction.status}
              </span>
            </p>
            <div className="flex space-x-2">
              <button className="bg-blue-500 text-white py-1 px-3 rounded-lg text-sm">
                View
              </button>
              <button className="bg-red-500 text-white py-1 px-3 rounded-lg text-sm">
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TransactionsMe;
