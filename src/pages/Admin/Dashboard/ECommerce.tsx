import React, { useEffect, useState } from 'react';
import CardDataStats from '../../../components/CardDataStats';
import DefaultLayout from '../../../layout/DefaultLayout';
import {
  faUsers,
  faUser,
  faBoxesStacked,
  faCartShopping,
  faMoneyBill1,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import DataTransaction from '../../../components/Fragments/Admin/Transaction/DataTransaction.jsx';
import { getUser } from '../../../services/admin/user/services-user';
import { getProduct } from '../../../services/admin/product/services-product';
import {
  getTransaction,
  getTransactionMe,
} from '../../../services/admin/transaction/services-transaction';
import { getWHOAMI } from '../../../services/auth/admin/getDataUser';

const ECommerce: React.FC = () => {
  const [users, setUsers] = useState([]);
  const [products, setProducts] = useState([]);
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [role, setRole] = useState('');

  // get user role
  useEffect(() => {
    const fetchUserRole = async () => {
      try {
        const response = await getWHOAMI();
        setRole(response.data.user.role);
      } catch (error) {
        console.error('Fetch user role failed:', error.message);
        setError(error.message);
      }
    };
    fetchUserRole();
  }, []);

  // get user
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await getUser();
        setUsers(response.data || []); // Simpan data user dalam state
      } catch (error) {
        console.error('Fetch user failed:', error.message);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };
    if (role === 'ADMIN') {
      fetchUser();
    }
  }, [role]);

  // get product
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await getProduct();
        setProducts(response.data || []); // Simpan data produk dalam state
      } catch (error) {
        console.error('Fetch product failed:', error.message);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, []);

  // get transaction
  useEffect(() => {
    const fetchTransaction = async () => {
      try {
        let response;
        if (role === 'USER') {
          response = await getTransactionMe();
        } else if (role === 'ADMIN') {
          response = await getTransaction();
        }
        setTransactions(response.data || []); // Simpan data transaksi dalam state
      } catch (error) {
        console.error('Fetch transaction failed:', error.message);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };
    if (role) {
      fetchTransaction();
    }
  }, [role]);

  // Calculate total users and total admins
  const totalUsers = users.filter((user) => user.role === 'USER').length;
  const totalAdmins = users.filter((user) => user.role === 'ADMIN').length;
  const totalProducts = products.length;
  const totalTransactions = transactions.length;

  // Filter transactions with successful payment status and calculate total payment
  const totalPayment = transactions
    .filter((transaction) => transaction.status_payment === 'Success')
    .reduce((sum, transaction) => sum + transaction.total, 0); // Assuming each transaction has a total field

  return (
    <DefaultLayout>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 xl:grid-cols-4 2xl:gap-7.5">
        {role === 'ADMIN' && (
          <>
            <CardDataStats title="Total Users" total={totalUsers}>
              <FontAwesomeIcon icon={faUsers} />
            </CardDataStats>
            <CardDataStats title="Total Admin" total={totalAdmins}>
              <FontAwesomeIcon icon={faUser} />
            </CardDataStats>
            <CardDataStats title="Total Product" total={totalProducts}>
              <FontAwesomeIcon icon={faBoxesStacked} />
            </CardDataStats>
          </>
        )}
        <CardDataStats title="Total Transaction" total={totalTransactions}>
          <FontAwesomeIcon icon={faCartShopping} />
        </CardDataStats>
        <CardDataStats
          title="Total Credit Payment"
          total={`Rp ${totalPayment.toLocaleString()}`}
        >
          <FontAwesomeIcon icon={faMoneyBill1} />
        </CardDataStats>
      </div>
      <div className="mt-4 flex flex-col gap-10">
        <DataTransaction />
      </div>
    </DefaultLayout>
  );
};

export default ECommerce;
