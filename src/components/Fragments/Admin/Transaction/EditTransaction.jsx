import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {
  editTransaction,
  getTransactionById,
} from '../../../../services/admin/transaction/services-transaction';

const EditTransaction = () => {
  const { transactionId } = useParams();
  const [statusPayment, setStatusPayment] = useState(''); 
  const [shippingStatus, setShippingStatus] = useState(''); 
  const [receiptDelivery, setReceiptDelivery] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchTransactionData = async () => {
      try {
        const response = await getTransactionById(transactionId);
        setStatusPayment(response.data.status_payment);
        setShippingStatus(response.data.shippingStatus);
        setReceiptDelivery(response.data.receiptDelivery);
      } catch (error) {
        toast.error('Failed to fetch transaction data');
        console.error('Error:', error);
      }
    };

    fetchTransactionData();
  }, [transactionId]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!statusPayment || !shippingStatus || !receiptDelivery) {
      toast.error('Please fill in all fields');
      return;
    }

    const transactionData = {
      status_payment: statusPayment,
      shippingStatus: shippingStatus,
      receiptDelivery: receiptDelivery,
    };

    setIsLoading(true);

    try {
      await editTransaction(transactionId, transactionData);
      toast.success('Transaction successfully updated!');
    } catch (error) {
      toast.error('Failed to update transaction. Please try again.');
      console.error('Error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <ToastContainer />
      <form onSubmit={handleSubmit}>
        <div className="mb-5.5 flex flex-col gap-5.5 sm:flex-row">
          <div className="w-full sm:w-1/2">
            <label className="mb-3 block text-sm font-medium text-black dark:text-white">
              Status Payment
            </label>
            <div className="relative">
              <select
                className="w-full rounded border border-stroke py-3 px-4.5 text-black dark:border-strokedark dark:bg-meta-4 dark:text-white"
                value={statusPayment}
                onChange={(e) => setStatusPayment(e.target.value)}
                disabled={isLoading}
              >
                <option value="Success">Success</option>
                <option value="Expired">Expired</option>
                <option value="Pending">Pending</option>
              </select>
            </div>
          </div>
          <div className="w-full sm:w-1/2">
            <label className="mb-3 block text-sm font-medium text-black dark:text-white">
              Shipping Status
            </label>
            <div className="relative">
              <select
                className="w-full rounded border border-stroke py-3 px-4.5 text-black dark:border-strokedark dark:bg-meta-4 dark:text-white"
                value={shippingStatus}
                onChange={(e) => setShippingStatus(e.target.value)}
                disabled={isLoading}
              >
                <option value="Pending">Pending</option>
                <option value="On Process">On Process</option>
                <option value="Shipped">Shipped</option>
                <option value="Delivered">Delivered</option>
                <option value="Accepted">Accepted</option>
                <option value="Cancel">Cancel</option>
              </select>
            </div>
          </div>
        </div>
        <div className="mb-5.5">
          <label className="mb-3 block text-sm font-medium text-black dark:text-white">
            Receipt Delivery
          </label>
          <div className="relative">
            <input
              className="w-full rounded border border-stroke py-3 px-4.5 text-black dark:border-strokedark dark:bg-meta-4 dark:text-white"
              type="text"
              name="receiptDelivery"
              id="receiptDelivery"
              value={receiptDelivery}
              onChange={(e) => setReceiptDelivery(e.target.value)}
              disabled={isLoading}
            />
          </div>
        </div>

        <div className="flex justify-end gap-4.5">
          <Link to="/transaction">
            <button
              className="flex justify-center rounded border border-stroke py-2 px-6 font-medium text-black hover:shadow-1 dark:border-strokedark dark:text-white"
              type="button"
              disabled={isLoading}
            >
              Cancel
            </button>
          </Link>
          <button
            className="flex justify-center rounded bg-primary py-2 px-6 font-medium text-gray hover:bg-opacity-90"
            type="submit"
            disabled={isLoading}
          >
            {isLoading ? 'Updating...' : 'Update'}
          </button>
        </div>
      </form>
    </>
  );
};

export default EditTransaction;
