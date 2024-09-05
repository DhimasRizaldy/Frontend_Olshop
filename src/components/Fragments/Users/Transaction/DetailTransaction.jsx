import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Skeleton from 'react-loading-skeleton'; // Import Skeleton
import { formatRupiah } from '../../../../utils/constants/function';
import { getTransactionById } from '../../../../services/admin/transaction/services-transaction';

const DetailTransactionMe = () => {
  const { transactionId } = useParams();
  const [transactionDetail, setTransactionDetail] = useState(null);

  useEffect(() => {
    if (transactionId) {
      const fetchTransactionDetail = async () => {
        try {
          const response = await getTransactionById(transactionId);
          console.log(response); // Log the response for debugging
          if (response.success) {
            setTransactionDetail(response.data);
          } else {
            console.error(
              'Error fetching transaction detail:',
              response.message,
            );
          }
        } catch (error) {
          console.error('Error fetching transaction detail:', error);
        }
      };
      fetchTransactionDetail();
    }
  }, [transactionId]);

  // Function to set the color for payment and shipping status
  const getStatusColor = (status) => {
    switch (status) {
      case 'Success':
      case 'Completed':
        return 'bg-green-500 text-white';
      case 'Expired':
      case 'Failed':
      case 'Cancel':
        return 'bg-red-500 text-white';
      case 'Pending':
        return 'bg-yellow-500 text-white';
      case 'On Process':
      case 'Shipped':
        return 'bg-blue-500 text-white';
      case 'Delivered':
      case 'Accepted':
        return 'bg-green-500 text-white';
      default:
        return 'bg-gray-500 text-white';
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-6 mt-10">
      <div className="bg-white shadow-md rounded-lg p-6">
        <h1 className="text-3xl font-bold text-center mb-8">
          Transaction Details
        </h1>

        <div className="flex justify-end mb-6 gap-4">
          <button
            onClick={() => window.print()}
            className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition duration-300"
          >
            Print
          </button>
          <button
            onClick={() => console.log('Download PDF')}
            className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 transition duration-300"
          >
            Download PDF
          </button>
          {transactionDetail ? (
            transactionDetail.status_payment === 'Pending' &&
            transactionDetail.paymentUrl && (
              <a
                href={transactionDetail.paymentUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-primary text-white px-4 py-2 rounded-md hover:bg-primary transition duration-300"
              >
                Bayar
              </a>
            )
          ) : (
            <Skeleton width={100} height={35} />
          )}
        </div>

        <div className="border-b border-gray-200 pb-4 mb-4">
          <h2 className="text-2xl font-semibold mb-2">Transaction Overview</h2>
          <p className="text-gray-600 mb-2">
            <strong>Transaction ID:</strong>{' '}
            {transactionDetail ? (
              transactionDetail.transactionId
            ) : (
              <Skeleton width={150} />
            )}
          </p>
          <p className="text-gray-600 mb-2">
            <strong>Date:</strong>{' '}
            {transactionDetail ? (
              new Date(transactionDetail.transaction_time).toLocaleDateString()
            ) : (
              <Skeleton width={150} />
            )}
          </p>
          <p className="text-gray-600 mb-2">
            <strong>Status:</strong>
            <span
              className={`${
                transactionDetail
                  ? getStatusColor(transactionDetail.status_payment)
                  : 'bg-gray-300 text-gray-600'
              } py-1 px-2 rounded-full text-xs`}
            >
              {transactionDetail ? (
                transactionDetail.status_payment
              ) : (
                <Skeleton width={100} />
              )}
            </span>
          </p>
          <p className="text-gray-600 mb-2">
            <strong>Total Amount:</strong>{' '}
            {transactionDetail ? (
              formatRupiah(transactionDetail.total)
            ) : (
              <Skeleton width={150} />
            )}
          </p>
        </div>

        <div className="border-b border-gray-200 pb-4 mb-4">
          <h2 className="text-xl font-semibold mb-2">User Information</h2>
          <p className="text-gray-600 mb-2">
            <strong>Name:</strong>{' '}
            {transactionDetail ? (
              transactionDetail.users.username.trim()
            ) : (
              <Skeleton width={150} />
            )}
          </p>
          <p className="text-gray-600 mb-2">
            <strong>Email:</strong>{' '}
            {transactionDetail ? (
              transactionDetail.users.email
            ) : (
              <Skeleton width={200} />
            )}
          </p>
        </div>

        <div className="border-b border-gray-200 pb-4 mb-4">
          <h2 className="text-xl font-semibold mb-2">Delivery Address</h2>
          <p className="text-gray-600 mb-2">
            <strong>Street:</strong>{' '}
            {transactionDetail ? (
              transactionDetail.address.address
            ) : (
              <Skeleton width={200} />
            )}
          </p>
          <p className="text-gray-600 mb-2">
            <strong>City:</strong>{' '}
            {transactionDetail ? (
              transactionDetail.address.city
            ) : (
              <Skeleton width={150} />
            )}
          </p>
          <p className="text-gray-600 mb-2">
            <strong>Postal Code:</strong>{' '}
            {transactionDetail ? (
              transactionDetail.address.postalCode
            ) : (
              <Skeleton width={100} />
            )}
          </p>
          <p className="text-gray-600 mb-2">
            <strong>Country:</strong>{' '}
            {transactionDetail ? (
              transactionDetail.address.country.trim()
            ) : (
              <Skeleton width={150} />
            )}
          </p>
        </div>

        <div className="border-b border-gray-200 pb-4 mb-4">
          <h2 className="text-xl font-semibold mb-2">Shipping Information</h2>
          <p className="text-gray-600 mb-2">
            <strong>Courier:</strong>{' '}
            {transactionDetail ? (
              transactionDetail.courier
            ) : (
              <Skeleton width={150} />
            )}
          </p>
          <p className="text-gray-600 mb-2">
            <strong>Shipping Status:</strong>
            <span
              className={`${
                transactionDetail
                  ? getStatusColor(transactionDetail.shippingStatus)
                  : 'bg-gray-300 text-gray-600'
              } py-1 px-2 rounded-full text-xs`}
            >
              {transactionDetail ? (
                transactionDetail.shippingStatus
              ) : (
                <Skeleton width={100} />
              )}
            </span>
          </p>
          <p className="text-gray-600 mb-2">
            <strong>Receipt:</strong>{' '}
            {transactionDetail ? (
              transactionDetail.receiptDelivery
            ) : (
              <Skeleton width={200} />
            )}
          </p>
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-2">Payment Information</h2>
          <p className="text-gray-600 mb-2">
            <strong>Payment Method:</strong>{' '}
            {transactionDetail ? (
              transactionDetail.payment_type
            ) : (
              <Skeleton width={150} />
            )}
          </p>
          <p className="text-gray-600 mb-2">
            <strong>Amount Paid:</strong>{' '}
            {transactionDetail ? (
              formatRupiah(transactionDetail.total)
            ) : (
              <Skeleton width={150} />
            )}
          </p>
        </div>
      </div>
    </div>
  );
};

export default DetailTransactionMe;
