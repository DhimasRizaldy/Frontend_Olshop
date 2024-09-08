import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Swal from 'sweetalert2';
import { getTransactionById } from '../../../../services/admin/transaction/services-transaction';
import { checkoutPaymentNotification } from '../../../../services/users/payment/servives-payment';
import Skeleton from 'react-loading-skeleton';

const HandleSuccessPay = () => {
  const { transaction_id } = useParams();
  const [transaction, setTransaction] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  // Fetch Transaction Data
  useEffect(() => {
    console.log('Transaction ID from URL:', transaction_id); // Debug log
    const fetchTransaction = async () => {
      try {
        if (transaction_id) {
          const response = await getTransactionById(transaction_id);
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
  }, [transaction_id]);

  // Send Payment Notification to Backend
  useEffect(() => {
    const handlePaymentNotification = async () => {
      if (transaction && transaction.transaction_status === 'settlement') {
        try {
          await checkoutPaymentNotification({
            transaction_id: transaction.transaction_id,
            transaction_status: 'settlement',
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
    return <Skeleton count={5} />;
  }

  if (error) {
    return (
      <div>
        <h1>Error</h1>
        <p>{error}</p>
        <button onClick={() => navigate('/')}>Go to Home</button>
      </div>
    );
  }

  return (
    <div>
      <h1>Payment Status</h1>
      {transaction && transaction.transaction_status === 'settlement' ? (
        <div>
          <p>Transaction ID: {transaction.transaction_id}</p>
          <p>Status: {transaction.transaction_status}</p>
          <p>Payment Type: {transaction.payment_type}</p>
          <button onClick={() => navigate('/')}>Go to Home</button>
        </div>
      ) : (
        <div>
          <p>Transaction ID: {transaction.transaction_id}</p>
          <p>Status: {transaction.transaction_status}</p>
          <p>Payment Type: {transaction.payment_type}</p>
          <button onClick={() => navigate('/')}>Go to Home</button>
        </div>
      )}
    </div>
  );
};

export default HandleSuccessPay;
