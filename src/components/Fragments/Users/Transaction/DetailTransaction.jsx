import React, { useEffect, useState } from 'react';
import { Link, useParams, navigate } from 'react-router-dom';
import Skeleton from 'react-loading-skeleton';
import { formatRupiah } from '../../../../utils/constants/function';
import {
  getTransactionById,
  editTransaction,
} from '../../../../services/admin/transaction/services-transaction';
import Swal from 'sweetalert2';

// Modal Component
const PaymentModal = ({ isOpen, onClose, paymentUrl }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded shadow-lg">
        <h2 className="text-lg font-bold mb-4">Proceed to Payment</h2>
        <a
          href={paymentUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition duration-300"
        >
          Go to Payment
        </a>
        <button
          onClick={onClose}
          className="mt-4 bg-gray-300 text-black px-4 py-2 rounded-md hover:bg-gray-400 transition duration-300"
        >
          Close
        </button>
      </div>
      <div className="fixed inset-0 bg-black opacity-50"></div>
    </div>
  );
};

const DetailTransactionMe = () => {
  const { transactionId } = useParams();
  const [transactionDetail, setTransactionDetail] = useState(null);
  const [showPaymentPopup, setShowPaymentPopup] = useState(false);
  const [paymentUrl, setPaymentUrl] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    if (transactionId) {
      const fetchTransactionDetail = async () => {
        try {
          const response = await getTransactionById(transactionId);
          if (response.success) {
            setTransactionDetail(response.data); // Store the transaction data
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

  useEffect(() => {
    // Simpan transactionId dari URL ke localStorage
    localStorage.setItem('transactionId', transactionId);
  }, [transactionId]);

  // Bisa digunakan
  const handlePaymentClick = () => {
    if (transactionDetail?.token) {
      window.snap.pay(transactionDetail.token, {
        onSuccess: function (result) {
          Swal.fire('Success!', 'Payment successful!', 'success').then(() => {
            // Arahkan ke halaman payment success
            window.location.href = '/payment-success';
          });
        },
        onPending: function (result) {
          Swal.fire('Pending!', 'Payment is pending.', 'info');
        },
        onError: function (result) {
          Swal.fire('Error!', 'Payment failed.', 'error');
        },
        onClose: function () {
          Swal.fire('Closed!', 'Payment popup closed.', 'info');
        },
      });
    } else {
      Swal.fire(
        'Error!',
        'Payment token not found or transaction details not loaded',
        'error',
      );
    }
  };
  // handle payment
  const handleCancelOrder = async () => {
    try {
      const result = await Swal.fire({
        title: 'Batalkan Pesanan?',
        text: 'Apakah kamu yakin ingin membatalkan pesanan ini?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Ya, Batalkan!',
        cancelButtonText: 'Tidak',
      });

      if (result.isConfirmed) {
        const response = await editTransaction(transactionId, {
          status_payment: 'Cancelled',
          shippingStatus: 'Cancel',
          receiptDelivery: '-',
        });

        if (response.success) {
          Swal.fire('Berhasil!', 'Pesanan telah dibatalkan.', 'success').then(
            () => {
              setTransactionDetail((prevState) => ({
                ...prevState,
                status_payment: 'Cancelled',
                shippingStatus: 'Cancel',
              }));
              // Redirect ke halaman /payment-cancel
              navigate('/payment-cancel');
            },
          );
        } else {
          Swal.fire(
            'Gagal!',
            `Pesanan dengan ID ${transactionId} gagal dibatalkan. ${response.message}`,
            'error',
          );
        }
      }
    } catch (error) {
      Swal.fire(
        'Error!',
        `Terjadi kesalahan saat membatalkan pesanan dengan ID ${transactionId}.`,
        'error',
      );
    }
  };

  // handle confirmation transaction
  const handleConfirmOrder = async () => {
    try {
      const result = await Swal.fire({
        title: 'Konfirmasi Pesanan Sampai?',
        text: 'Apakah Pesanan ini sudah selesai?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Ya, Konfirmasi!',
        cancelButtonText: 'Tidak',
      });

      if (result.isConfirmed) {
        const response = await editTransaction(transactionId, {
          status_payment: 'Success',
          shippingStatus: 'Accepted',
          receiptDelivery: transactionDetail.receiptDelivery, // Menggunakan nilai yang sudah ada
        });

        if (response.success) {
          Swal.fire('Berhasil!', 'Pesanan telah Sampai.', 'success');
          setTransactionDetail((prevState) => ({
            ...prevState,
            status_payment: 'Success',
            shippingStatus: 'Accepted',
          }));
        } else {
          Swal.fire(
            'Gagal!',
            `Pesanan dengan ID ${transactionId} gagal dikonfirmasi. ${response.message}`,
            'error',
          );
        }
      }
    } catch (error) {
      Swal.fire(
        'Error!',
        `Terjadi kesalahan saat konfirmasi pesanan dengan ID ${transactionId}.`,
        'error',
      );
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Success':
      case 'Completed':
        return 'bg-green-500 text-white';
      case 'Cancelled':
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
          {transactionDetail &&
            transactionDetail.status_payment !== 'Cancelled' &&
            transactionDetail.status_payment === 'Success' && (
              <a
                onClick={() => window.print()}
                className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition duration-300"
              >
                Print
              </a>
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
            {transactionDetail && transactionDetail.transaction_time
              ? new Date(transactionDetail.transaction_time).toLocaleString(
                  'id-ID',
                  {
                    dateStyle: 'medium',
                    timeStyle: 'short',
                  },
                )
              : '-'}
          </p>

          <p className="text-gray-600 mb-2">
            <strong>Status Payment:</strong>{' '}
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
            <strong>Payment Method:</strong>{' '}
            {transactionDetail ? (
              transactionDetail.payment_type
            ) : (
              <Skeleton width={150} />
            )}
          </p>
          <p className="text-gray-600 mb-2">
            <strong>Total Amount:</strong>{' '}
            {transactionDetail ? (
              formatRupiah(transactionDetail.total)
            ) : (
              <Skeleton width={150} />
            )}
          </p>
          <p className="text-gray-600 mb-2">
            <strong>Discount:</strong>{' '}
            {transactionDetail ? (
              formatRupiah(transactionDetail.discount)
            ) : (
              <Skeleton width={150} />
            )}
          </p>
          <p className="text-gray-600 mb-2">
            <strong>Ongkir:</strong>{' '}
            {transactionDetail ? (
              formatRupiah(transactionDetail.ongkirValue)
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
              transactionDetail.user.username
            ) : (
              <Skeleton width={150} />
            )}
          </p>
          <p className="text-gray-600 mb-2">
            <strong>Email:</strong>{' '}
            {transactionDetail ? (
              transactionDetail.user.email
            ) : (
              <Skeleton width={200} />
            )}
          </p>
          <p className="text-gray-600 mb-2">
            <strong>Phone:</strong>{' '}
            {transactionDetail ? (
              transactionDetail.user.phoneNumber
            ) : (
              <Skeleton width={200} />
            )}
          </p>
        </div>

        <div className="border-b border-gray-200 pb-4 mb-4">
          <h2 className="text-xl font-semibold mb-2">Delivery Address</h2>
          <p className="text-gray-600 mb-2">
            <strong>Name Address:</strong>{' '}
            {transactionDetail ? (
              transactionDetail.address.nameAddress
            ) : (
              <Skeleton width={200} />
            )}
          </p>
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
              transactionDetail.address.country
            ) : (
              <Skeleton width={150} />
            )}
          </p>
        </div>

        <div className="border-b border-gray-200 pb-4 mb-4">
          <h2 className="text-xl font-semibold mb-2">Shipping Information</h2>
          <p className="text-gray-600 mb-2">
            <strong>Kurir:</strong>{' '}
            {transactionDetail ? (
              transactionDetail.courier
            ) : (
              <Skeleton width={150} />
            )}
          </p>
          <p className="text-gray-600 mb-2">
            <strong>Shipping Status:</strong>{' '}
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
            <strong>No Resi:</strong>{' '}
            {transactionDetail ? (
              transactionDetail.receiptDelivery
            ) : (
              <Skeleton width={200} />
            )}
          </p>
        </div>

        <div className="border-b border-gray-200 pb-4 mb-4">
          <h2 className="text-xl font-semibold mb-2">Promo Information</h2>
          <p className="text-gray-600 mb-2">
            <strong>Promo Code:</strong>{' '}
            {transactionDetail ? (
              transactionDetail.promo.codePromo
            ) : (
              <Skeleton width={150} />
            )}
          </p>
          <p className="text-gray-600 mb-2">
            <strong>Promo Discount:</strong>{' '}
            {transactionDetail ? (
              `${transactionDetail.promo.discount}%`
            ) : (
              <Skeleton width={150} />
            )}
          </p>
        </div>

        <div className="border-b border-gray-200 pb-4 mb-4">
          <h2 className="text-xl font-semibold mb-2">Cart Details</h2>
          {transactionDetail ? (
            transactionDetail.cartDetails.map((cartDetails, index) => (
              <div
                key={index}
                className="border-t border-gray-200 pt-2 mt-2 flex items-center"
              >
                <img
                  src={cartDetails.productImage}
                  alt={cartDetails.productName}
                  className="w-20 h-20 object-cover mr-4"
                />
                <div>
                  <p className="text-gray-600 mb-2">
                    <strong>Product Name:</strong> {cartDetails.productName}
                  </p>
                  <p className="text-gray-600 mb-2">
                    <strong>Price:</strong>{' '}
                    {formatRupiah(cartDetails.productPrice)}
                  </p>
                  <p className="text-gray-600 mb-2">
                    <strong>Quantity:</strong> {cartDetails.productQuantity}
                  </p>
                  <p className="text-gray-600 mb-2">
                    <strong>Total Price:</strong>{' '}
                    {formatRupiah(cartDetails.totalPricePerProduct)}
                  </p>
                </div>
              </div>
            ))
          ) : (
            <Skeleton count={3} />
          )}
        </div>
        <div className="mt-6 flex gap-4">
          {transactionDetail &&
            transactionDetail.status_payment === 'Pending' &&
            transactionDetail.shippingStatus === 'Pending' && (
              <button
                className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition duration-300"
                onClick={handleCancelOrder}
              >
                Batalkan Pesanan
              </button>
            )}

          {transactionDetail &&
            transactionDetail.shippingStatus !== 'Pending' &&
            transactionDetail.shippingStatus !== 'On Process' &&
            transactionDetail.shippingStatus !== 'Accepted' &&
            transactionDetail.shippingStatus !== 'Cancel' && (
              <button
                className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition duration-300"
                onClick={handleConfirmOrder}
              >
                Konfirmasi Penerima
              </button>
            )}

          {transactionDetail &&
            transactionDetail.shippingStatus === 'Accepted' && (
              <button
                className="bg-yellow-500 text-white px-4 py-2 rounded-md hover:bg-yellow-600 transition duration-300"
                onClick={() => console.log('Kasih Review')}
              >
                Kasih Review
              </button>
            )}

          {transactionDetail &&
            transactionDetail.shippingStatus !== 'Pending' &&
            transactionDetail.shippingStatus !== 'Cancel' &&
            transactionDetail.shippingStatus !== 'On Process' && (
              <Link to="/order-tracking">
                <button
                  className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-yellow-600 transition duration-300"
                  onClick={() => console.log('Lacak Paket')}
                >
                  Lacak Paket
                </button>
              </Link>
            )}

          {transactionDetail &&
            transactionDetail.status_payment === 'Pending' && (
              <button
                onClick={handlePaymentClick}
                className="bg-yellow-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition duration-300"
              >
                Bayar
              </button>
            )}
        </div>
      </div>
      {/* Payment Modal */}
      <PaymentModal
        isOpen={showPaymentPopup}
        onClose={() => setShowPaymentPopup(false)}
        paymentUrl={paymentUrl}
      />
    </div>
  );
};

export default DetailTransactionMe;
