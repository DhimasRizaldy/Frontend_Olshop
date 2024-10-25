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
import DataTransactionDash from '../../../components/Fragments/Admin/Transaction/DataTransactionDash.jsx';
import { getUser } from '../../../services/admin/user/services-user';
import { getProduct } from '../../../services/admin/product/services-product';
import {
  getTransaction,
  getTransactionMe,
} from '../../../services/admin/transaction/services-transaction';
import { getWHOAMI } from '../../../services/auth/admin/getDataUser';
import Skeleton from 'react-loading-skeleton'; // Import Skeleton
import 'react-loading-skeleton/dist/skeleton.css'; // Import CSS

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
        console.error('Gagal mengambil peran pengguna:', error.message);
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
        console.error('Gagal mengambil data pengguna:', error.message);
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
        console.error('Gagal mengambil data produk:', error.message);
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
        console.error('Gagal mengambil data transaksi:', error.message);
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

  if (loading) {
    return (
      <DefaultLayout>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 xl:grid-cols-4 2xl:gap-7.5">
          <Skeleton height={150} />
          <Skeleton height={150} />
          <Skeleton height={150} />
          <Skeleton height={150} />
        </div>
        <div className="mt-4 flex flex-col gap-10">
          <Skeleton height={300} />
        </div>
      </DefaultLayout>
    );
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <DefaultLayout>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 xl:grid-cols-4 2xl:gap-7.5">
        {role === 'ADMIN' && (
          <>
            <CardDataStats title="Total Pengguna" total={totalUsers}>
              <FontAwesomeIcon icon={faUsers} />
            </CardDataStats>
            <CardDataStats title="Total Admin" total={totalAdmins}>
              <FontAwesomeIcon icon={faUser} />
            </CardDataStats>
            <CardDataStats title="Total Produk" total={totalProducts}>
              <FontAwesomeIcon icon={faBoxesStacked} />
            </CardDataStats>
          </>
        )}
        <CardDataStats title="Total Transaksi" total={totalTransactions}>
          <FontAwesomeIcon icon={faCartShopping} />
        </CardDataStats>
        <CardDataStats
          title="Total Pembayaran"
          total={`Rp ${totalPayment.toLocaleString()}`}
        >
          <FontAwesomeIcon icon={faMoneyBill1} />
        </CardDataStats>
      </div>
      <div className="mt-4 flex flex-col gap-10">
        <DataTransactionDash />
      </div>
    </DefaultLayout>
  );
};

export default ECommerce;
