import React, { useEffect, useState } from 'react';
import { faPenToSquare, faEye } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom';
import DataTable from 'react-data-table-component';
import { getWHOAMI } from '../../../../services/auth/admin/getDataUser';
import {
  getTransactionMe,
  getTransaction,
} from '../../../../services/admin/transaction/services-transaction';
import { formatRupiah } from '../../../../utils/constants/function';
import {
  AiOutlineCar,
  AiOutlineClockCircle,
  AiOutlineCheckCircle,
  AiOutlineCloseCircle,
} from 'react-icons/ai';

const DataTransaction = () => {
  const [transactions, setTransactions] = useState([]);
  const [filteredTransactions, setFilteredTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [role, setRole] = useState('');
  const [statusPaymentFilter, setStatusPaymentFilter] = useState('All');
  const [statusShippingFilter, setStatusShippingFilter] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchUserRole = async () => {
      try {
        const response = await getWHOAMI();
        setRole(response.data.user.role);
      } catch (error) {
        setError(error.message);
      }
    };
    fetchUserRole();
  }, []);

  useEffect(() => {
    const fetchTransactions = async () => {
      setLoading(true);
      setError(null);
      try {
        let response;
        if (role === 'USER') {
          response = await getTransactionMe();
        } else if (role === 'ADMIN') {
          response = await getTransaction();
        }
        setTransactions(response.data || []);
        setFilteredTransactions(response.data || []);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };
    if (role) {
      fetchTransactions();
    }
  }, [role]);

  // Fungsi untuk mengubah filter shipping status
  const handleFilterChange = (status) => {
    setStatusShippingFilter(status);
  };

  // Fungsi untuk mengubah filter payment status
  const handleFilterChangePay = (status) => {
    setStatusPaymentFilter(status);
  };

  // Hitung total untuk setiap status shipping
  const countByStatus = (status) => {
    return transactions.filter(
      (transaction) => transaction.shippingStatus === status,
    ).length;
  };

  // Hitung total untuk setiap status payment
  const countByStatusPay = (status) => {
    if (status === 'Success') {
      return transactions.filter(
        (transaction) =>
          transaction.status_payment === 'Success' &&
          transaction.shippingStatus === 'Pending',
      ).length;
    }
    return transactions.filter(
      (transaction) => transaction.status_payment === status,
    ).length;
  };

  const handleFilter = () => {
    let filteredData = transactions;

    if (statusPaymentFilter !== 'All') {
      filteredData = filteredData.filter(
        (transaction) => transaction.status_payment === statusPaymentFilter,
      );
    }

    if (statusShippingFilter !== 'All') {
      filteredData = filteredData.filter(
        (transaction) => transaction.shippingStatus === statusShippingFilter,
      );
    }

    if (searchTerm) {
      filteredData = filteredData.filter(
        (transaction) =>
          transaction.transactionId
            .toLowerCase()
            .includes(searchTerm.toLowerCase()) ||
          (transaction.users?.username || 'N/A')
            .toLowerCase()
            .includes(searchTerm.toLowerCase()),
      );
    }

    setFilteredTransactions(filteredData);
  };

  useEffect(() => {
    handleFilter();
  }, [statusPaymentFilter, statusShippingFilter, searchTerm, transactions]);

  const columns = [
    { name: 'No', selector: (row, index) => index + 1, sortable: true },
    {
      name: 'TransactionId',
      selector: (row) => row.transactionId,
      sortable: true,
    },
    {
      name: 'Username',
      selector: (row) => row.users?.username || 'N/A',
      sortable: true,
    },
    {
      name: 'PromoCode',
      selector: (row) => row.promo?.codePromo || 'N/A',
      sortable: true,
    },
    {
      name: 'Address',
      selector: (row) => row.address?.nameAddress || 'N/A',
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
    { name: 'Courier', selector: (row) => row.courier, sortable: true },
    {
      name: 'ReceiptDelivery',
      selector: (row) => row.receiptDelivery,
      sortable: true,
    },
    {
      name: 'StatusPay',
      selector: (row) => {
        const getColor = (status) => {
          switch (status) {
            case 'Pending':
              return 'bg-warning';
            case 'Success':
              return 'bg-success';
            case 'Cancelled':
              return 'bg-danger';
            default:
              return 'bg-secondary';
          }
        };
        return (
          <button
            className={`${getColor(row.status_payment)} text-white px-3 py-1 rounded-md`}
          >
            {row.status_payment}
          </button>
        );
      },
      sortable: true,
    },
    {
      name: 'StatusShip',
      selector: (row) => {
        const getColor = (status) => {
          switch (status) {
            case 'Pending':
            case 'On Process':
              return 'bg-warning';
            case 'Delivered':
            case 'Accepted':
              return 'bg-success';
            case 'Cancel':
              return 'bg-danger';
            default:
              return 'bg-secondary';
          }
        };
        return (
          <button
            className={`${getColor(row.shippingStatus)} text-white px-3 py-1 rounded-md`}
          >
            {row.shippingStatus}
          </button>
        );
      },
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
          {role === 'ADMIN' && (
            <>
              <Link to={`/edit-transaction/${row.transactionId}`}>
                <button className="hover:text-primary">
                  <FontAwesomeIcon icon={faPenToSquare} />
                </button>
              </Link>
            </>
          )}
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
          {role === 'USER' ? 'My Transactions' : 'All Transactions'}
        </h4>
      </div>

      <div className="rounded-sm border border-stroke bg-white px-5 pt-6.5 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark">
        <div>
          {/* Filter Header */}
          <div className="flex justify-around mb-6 flex-wrap">
            <div className="text-center w-1/6 sm:w-1/6 mb-4">
              <AiOutlineClockCircle className="text-yellow-500 text-xl sm:text-2xl mx-auto" />
              <p className="text-xs sm:text-base">Belum Bayar</p>
              <span className="text-xs sm:text-base">
                {countByStatusPay('Pending')}
              </span>
            </div>
            <div className="text-center w-1/6 sm:w-1/6 mb-4">
              <AiOutlineClockCircle className="text-green-500 text-xl sm:text-2xl mx-auto" />
              <p className="text-xs sm:text-base">Sudah Bayar</p>
              <span className="text-xs sm:text-base">
                {countByStatusPay('Success')}
              </span>
            </div>
            <div className="text-center w-1/6 sm:w-1/6 mb-4">
              <AiOutlineClockCircle className="text-yellow-500 text-xl sm:text-2xl mx-auto" />
              <p className="text-xs sm:text-base">Dikemas</p>
              <span className="text-xs sm:text-base">
                {countByStatus('On Process')}
              </span>
            </div>
            <div className="text-center w-1/6 sm:w-1/6 mb-4">
              <AiOutlineCar className="text-green-500 text-xl sm:text-2xl mx-auto" />
              <p className="text-xs sm:text-base">Dikirim</p>
              <span className="text-xs sm:text-base">
                {countByStatus('Delivered')}
              </span>
            </div>
            <div className="text-center w-1/6 sm:w-1/6 mb-4">
              <AiOutlineCheckCircle className="text-blue-500 text-xl sm:text-2xl mx-auto" />
              <p className="text-xs sm:text-base">Diterima</p>
              <span className="text-xs sm:text-base">
                {countByStatus('Accepted')}
              </span>
            </div>
            <div className="text-center w-1/6 sm:w-1/6 mb-4">
              <AiOutlineCloseCircle className="text-red-500 text-xl sm:text-2xl mx-auto" />
              <p className="text-xs sm:text-base">Dibatalkan</p>
              <span className="text-xs sm:text-base">
                {countByStatus('Cancel')}
              </span>
            </div>
          </div>
        </div>
        <div className="flex mb-4 space-x-4">
          <div>
            <label
              htmlFor="statusPaymentFilter"
              className="mr-2 text-black dark:text-white"
            >
              Filter by Payment Status:
            </label>
            <select
              id="statusPaymentFilter"
              value={statusPaymentFilter}
              onChange={(e) => handleFilterChangePay(e.target.value)}
              className="border border-gray-300 rounded-md p-2"
            >
              <option value="All">All</option>
              <option value="Pending">Pending</option>
              <option value="Success">Success</option>
              <option value="Cancelled">Cancelled</option>
            </select>
          </div>

          <div>
            <label
              htmlFor="statusShippingFilter"
              className="mr-2 text-black dark:text-white"
            >
              Filter by Shipping Status:
            </label>
            <select
              id="statusShippingFilter"
              value={statusShippingFilter}
              onChange={(e) => handleFilterChange(e.target.value)}
              className="border border-gray-300 rounded-md p-2"
            >
              <option value="All">All</option>
              <option value="Pending">Pending</option>
              <option value="On Process">On Process</option>
              <option value="Delivered">Delivered</option>
              <option value="Accepted">Accepted</option>
              <option value="Cancel">Cancel</option>
            </select>
          </div>

          <div>
            <label
              htmlFor="searchTerm"
              className="mr-2 text-black dark:text-white"
            >
              Search:
            </label>
            <input
              type="text"
              id="searchTerm"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="border border-gray-300 rounded-md p-2"
              placeholder="Search by TransactionId or Username"
            />
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
