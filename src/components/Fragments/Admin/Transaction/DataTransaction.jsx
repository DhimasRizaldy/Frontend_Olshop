import React, { useEffect, useState } from 'react';
import {
  faPenToSquare,
  faTrash,
  faEye,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom';
import DataTable from 'react-data-table-component';
import { getWHOAMI } from '../../../../services/auth/admin/getDataUser';
import {
  getTransactionMe,
  getTransaction,
} from '../../../../services/admin/transaction/services-transaction';
import { formatRupiah } from '../../../../utils/constants/function';

const DataTransaction = () => {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [role, setRole] = useState('');

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

  const columns = [
    { name: 'No', selector: (row, index) => index + 1, sortable: true },
    {
      name: 'TransactionId',
      selector: (row) => row.transactionId,
      sortable: true,
    },
    {
      name: 'Username',
      selector: (row) => row.users?.username || 'N/A', // Display username
      sortable: true,
    },
    {
      name: 'CartId',
      selector: (row) => row.cartId,
      sortable: true,
    },
    {
      name: 'PromoCode',
      selector: (row) => row.promo?.codePromo || 'N/A', // Display codePromo
      sortable: true,
    },
    {
      name: 'Address',
      selector: (row) => row.address?.nameAddress || 'N/A', // Display nameAddress
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
          {role === 'ADMIN' && (
            <>
              <Link to={`/edit-transaction/${row.transactionId}`}>
                <button className="hover:text-primary">
                  <FontAwesomeIcon icon={faPenToSquare} />
                </button>
              </Link>
              <button className="hover:text-primary">
                <FontAwesomeIcon icon={faTrash} />
              </button>
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
        <div className="max-w-full overflow-x-auto">
          <DataTable columns={columns} data={transactions} pagination />
        </div>
      </div>
    </div>
  );
};

export default DataTransaction;
