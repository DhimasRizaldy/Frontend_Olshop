import React, { useEffect, useState } from 'react';
import {
  faPenToSquare,
  faTrash,
  faEye,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom';
import { getTransaction } from '../../../../services/admin/transaction/services-transaction';
import { formatRupiah } from '../../../../utils/constants/function';
import DataTable from 'react-data-table-component';

const DataTransaction = () => {
  const [transactions, setTransaction] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatusPay, setFilterStatusPay] = useState('All');
  const [filterStatusShip, setFilterStatusShip] = useState('All');

  // get transaction
  useEffect(() => {
    const fetchTransaction = async () => {
      try {
        const response = await getTransaction();
        setTransaction(response.data || []); // Simpan data transaksi dalam state
      } catch (error) {
        console.error('Fetch transaction failed:', error.message);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchTransaction();
  }, []);

  // Filter transactions based on search term and selected filters
  const filteredTransactions = transactions.filter((transaction) => {
    const matchesSearchTerm = transaction.user.email
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesStatusPay =
      filterStatusPay === 'All' ||
      transaction.status_payment === filterStatusPay;
    const matchesStatusShip =
      filterStatusShip === 'All' ||
      transaction.shippingStatus === filterStatusShip;
    return matchesSearchTerm && matchesStatusPay && matchesStatusShip;
  });

  const columns = [
    {
      name: 'No',
      selector: (row, index) => index + 1,
      sortable: true,
    },
    {
      name: 'TransactionId',
      selector: (row) => row.transactionId,
      sortable: true,
    },
    {
      name: 'UserId',
      selector: (row) => row.user.email,
      sortable: true,
    },
    {
      name: 'CartId',
      selector: (row) => row.cartId,
      sortable: true,
    },
    {
      name: 'PromoId',
      selector: (row) => row.promo.codePromo,
      sortable: true,
    },
    {
      name: 'AddressId',
      selector: (row) => row.address.name,
      sortable: true,
    },
    {
      name: 'Discount',
      selector: (row) => formatRupiah(row.discount),
      sortable: true,
    },
    {
      name: 'Total',
      selector: (row) => formatRupiah(row.total),
      sortable: true,
    },
    {
      name: 'PaymentType',
      selector: (row) => row.payment_type,
      sortable: true,
    },
    {
      name: 'Courier',
      selector: (row) => row.courier,
      sortable: true,
    },
    {
      name: 'ReceiptDelivery',
      selector: (row) => row.receiptDelivery,
      sortable: true,
    },
    {
      name: 'StatusPay',
      selector: (row) => (
        <button className="bg-success text-white px-3 py-1 rounded-md">
          {row.status_payment}
        </button>
      ),
      sortable: true,
    },
    {
      name: 'StatusShip',
      selector: (row) => (
        <button className="bg-warning text-white px-3 py-1 rounded-md">
          {row.shippingStatus}
        </button>
      ),
      sortable: true,
    },
    {
      name: 'Action',
      selector: (row) => (
        <div className="flex items-center space-x-3.5">
          <Link to={`/detail-transaction/${row.transactionId}`}>
            <button className="hover:text-primary">
              <FontAwesomeIcon icon={faEye} />
            </button>
          </Link>
          <Link to={`/edit-transaction/${row.transactionId}`}>
            <button className="hover:text-primary">
              <FontAwesomeIcon icon={faPenToSquare} />
            </button>
          </Link>
          <button className="hover:text-primary">
            <FontAwesomeIcon icon={faTrash} />
          </button>
        </div>
      ),
    },
  ];

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
      <div className="py-6 px-4 md:px-6 xl:px-7.5">
        <h4 className="text-xl font-semibold text-black dark:text-white">
          Data Transaction
        </h4>
      </div>

      <div className="rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
        <div className="flex justify-between pb-4">
          <div>
            <input
              type="text"
              placeholder="Search by user email"
              className="px-4 py-2 border rounded-md"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="flex space-x-2">
            <button
              onClick={() => setFilterStatusPay('All')}
              className="px-4 py-2 bg-gray-200 rounded-md hover:bg-gray-300 cursor-pointer"
            >
              All
            </button>
            <button
              onClick={() => setFilterStatusPay('Pending')}
              className="px-4 py-2 bg-gray-200 rounded-md hover:bg-gray-300 cursor-pointer"
            >
              Pending
            </button>
            <button
              onClick={() => setFilterStatusPay('Paid')}
              className="px-4 py-2 bg-gray-200 rounded-md hover:bg-gray-300 cursor-pointer"
            >
              Paid
            </button>
            <button
              onClick={() => setFilterStatusPay('Cancel')}
              className="px-4 py-2 bg-gray-200 rounded-md hover:bg-gray-300 cursor-pointer"
            >
              Cancel
            </button>
          </div>
          <div className="flex space-x-2">
            <button
              onClick={() => setFilterStatusShip('All')}
              className="px-4 py-2 bg-gray-200 rounded-md hover:bg-gray-300 cursor-pointer"
            >
              All
            </button>
            <button
              onClick={() => setFilterStatusShip('On Process')}
              className="px-4 py-2 bg-gray-200 rounded-md hover:bg-gray-300 cursor-pointer"
            >
              On Process
            </button>
            <button
              onClick={() => setFilterStatusShip('Dikemas')}
              className="px-4 py-2 bg-gray-200 rounded-md hover:bg-gray-300 cursor-pointer"
            >
              Dikemas
            </button>
            <button
              onClick={() => setFilterStatusShip('Dikirim')}
              className="px-4 py-2 bg-gray-200 rounded-md hover:bg-gray-300 cursor-pointer"
            >
              Dikirim
            </button>
            <button
              onClick={() => setFilterStatusShip('Di Perjalanan')}
              className="px-4 py-2 bg-gray-200 rounded-md hover:bg-gray-300 cursor-pointer"
            >
              Di Perjalanan
            </button>
            <button
              onClick={() => setFilterStatusShip('Sudah Diterima')}
              className="px-4 py-2 bg-gray-200 rounded-md hover:bg-gray-300 cursor-pointer"
            >
              Sudah Diterima
            </button>
          </div>
        </div>
        <div className="max-w-full overflow-x-auto">
          <DataTable columns={columns} data={filteredTransactions} pagination />
        </div>
      </div>
    </div>
  );
};

export default DataTransaction;
