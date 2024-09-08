import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import Skeleton from 'react-loading-skeleton';
import Swal from 'sweetalert2';
import { getTransactionById } from '../../../../services/admin/transaction/services-transaction';
import { checkoutPaymentNotification } from '../../../../services/users/payment/servives-payment';

const HandleCancelPay = () => {
  const { transaction_id } = useParams();
  const [transaction, setTransaction] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTransaction = async () => {
      try {
        const response = await getTransactionById(transaction_id);
        setTransaction(response);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchTransaction();
  }, [transaction_id]);

  useEffect(() => {
    if (transaction && transaction.transaction_status === 'settlement') {
      Swal.fire({
        title: 'Payment Success',
        text: 'Your payment has been successfully processed.',
        icon: 'success',
        confirmButtonText: 'OK',
      });
    } else if (transaction) {
      Swal.fire({
        title: 'Payment Failed',
        text: 'Your payment has not been processed.',
        icon: 'error',
        confirmButtonText: 'OK',
      });
    }
  }, [transaction]);

  if (loading) {
    return <Skeleton count={5} />;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <h1>Payment Status</h1>
      {transaction && transaction.transaction_status === 'settlement' ? (
        <div>
          <p>Transaction ID: {transaction.transaction_id}</p>
          <p>Status: {transaction.transaction_status}</p>
          <p>Payment Type: {transaction.payment_type}</p>
          <Link to="/">Go to Home</Link>
        </div>
      ) : (
        <div>
          <p>Transaction ID: {transaction.transaction_id}</p>
          <p>Status: {transaction.transaction_status}</p>
          <p>Payment Type: {transaction.payment_type}</p>
          <Link to="/">Go to Home</Link>
        </div>
      )}
    </div>
  );
};

export default HandleCancelPay;
