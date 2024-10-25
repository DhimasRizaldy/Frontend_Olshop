import React, { useEffect, useState } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
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
        <h2 className="text-lg font-bold mb-4">Lanjutkan ke Pembayaran</h2>
        <a
          href={paymentUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition duration-300"
        >
          Pergi ke Pembayaran
        </a>
        <button
          onClick={onClose}
          className="mt-4 bg-gray-300 text-black px-4 py-2 rounded-md hover:bg-gray-400 transition duration-300"
        >
          Tutup
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
            setTransactionDetail(response.data);
            const userId = response.data.userId;
            localStorage.setItem('userId', userId);
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
    localStorage.setItem('transactionId', transactionId);
  }, [transactionId]);

  const handlePaymentClick = () => {
    if (transactionDetail?.token) {
      window.snap.pay(transactionDetail.token, {
        onSuccess: function (result) {
          Swal.fire('Berhasil!', 'Pembayaran berhasil!', 'success').then(() => {
            window.location.href = '/payment-success';
          });
        },
        onPending: function (result) {
          Swal.fire('Tertunda!', 'Pembayaran tertunda.', 'info');
        },
        onError: function (result) {
          Swal.fire('Gagal!', 'Pembayaran gagal.', 'error');
        },
        onClose: function () {
          Swal.fire('Ditutup!', 'Popup pembayaran ditutup.', 'info');
        },
      });
    } else {
      Swal.fire(
        'Gagal!',
        'Token pembayaran tidak ditemukan atau detail transaksi belum dimuat',
        'error',
      );
    }
  };

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
          receiptDelivery: transactionDetail.receiptDelivery,
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

  const printInvoice = () => {
    window.print();
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
      <div className="print-area">
        <div className="bg-white shadow-md rounded-lg p-6">
          <h1 className="text-3xl font-bold text-center mb-8">
            Detail Transaksi
          </h1>

          <div className="flex justify-end mb-6 gap-4">
            {transactionDetail &&
              transactionDetail.status_payment !== 'Cancelled' &&
              transactionDetail.status_payment === 'Success' && (
                <a
                  onClick={printInvoice}
                  className="no-print bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition duration-300"
                >
                  Cetak
                </a>
              )}
          </div>

          <div className="border-b border-gray-200 pb-4 mb-4">
            <h2 className="text-2xl font-semibold mb-2">Ringkasan Transaksi</h2>
            <p className="text-gray-600 mb-2">
              <strong>ID Transaksi:</strong>{' '}
              {transactionDetail ? (
                transactionDetail.transactionId
              ) : (
                <Skeleton width={150} />
              )}
            </p>
            <p className="text-gray-600 mb-2">
              <strong>Tanggal:</strong>{' '}
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
              <strong>Status Pembayaran:</strong>{' '}
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
              <strong>Metode Pembayaran:</strong>{' '}
              {transactionDetail ? (
                transactionDetail.payment_type
              ) : (
                <Skeleton width={150} />
              )}
            </p>
            <p className="text-gray-600 mb-2">
              <strong>Total:</strong>{' '}
              {transactionDetail ? (
                formatRupiah(transactionDetail.total)
              ) : (
                <Skeleton width={150} />
              )}
            </p>
            <p className="text-gray-600 mb-2">
              <strong>Diskon:</strong>{' '}
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
            <h2 className="text-xl font-semibold mb-2">Informasi Pengguna</h2>
            <p className="text-gray-600 mb-2">
              <strong>Nama:</strong>{' '}
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
              <strong>Telepon:</strong>{' '}
              {transactionDetail ? (
                transactionDetail.user.phoneNumber
              ) : (
                <Skeleton width={200} />
              )}
            </p>
          </div>

          <div className="border-b border-gray-200 pb-4 mb-4">
            <h2 className="text-xl font-semibold mb-2">Alamat Pengiriman</h2>
            <p className="text-gray-600 mb-2">
              <strong>Nama Alamat:</strong>{' '}
              {transactionDetail ? (
                transactionDetail.address.nameAddress
              ) : (
                <Skeleton width={200} />
              )}
            </p>
            <p className="text-gray-600 mb-2">
              <strong>Jalan:</strong>{' '}
              {transactionDetail ? (
                transactionDetail.address.address
              ) : (
                <Skeleton width={200} />
              )}
            </p>
            <p className="text-gray-600 mb-2">
              <strong>Kota:</strong>{' '}
              {transactionDetail ? (
                transactionDetail.address.city
              ) : (
                <Skeleton width={150} />
              )}
            </p>
            <p className="text-gray-600 mb-2">
              <strong>Kode Pos:</strong>{' '}
              {transactionDetail ? (
                transactionDetail.address.postalCode
              ) : (
                <Skeleton width={100} />
              )}
            </p>
            <p className="text-gray-600 mb-2">
              <strong>Negara:</strong>{' '}
              {transactionDetail ? (
                transactionDetail.address.country
              ) : (
                <Skeleton width={150} />
              )}
            </p>
          </div>

          <div className="border-b border-gray-200 pb-4 mb-4">
            <h2 className="text-xl font-semibold mb-2">Informasi Pengiriman</h2>
            <p className="text-gray-600 mb-2">
              <strong>Kurir:</strong>{' '}
              {transactionDetail ? (
                transactionDetail.courier
              ) : (
                <Skeleton width={150} />
              )}
            </p>
            <p className="text-gray-600 mb-2">
              <strong>Status Pengiriman:</strong>{' '}
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
            <h2 className="text-xl font-semibold mb-2">Informasi Promo</h2>
            <p className="text-gray-600 mb-2">
              <strong>Kode Promo:</strong>{' '}
              {transactionDetail ? (
                transactionDetail.promo?.codePromo || '-'
              ) : (
                <Skeleton width={150} />
              )}
            </p>
            <p className="text-gray-600 mb-2">
              <strong>Diskon Promo:</strong>{' '}
              {transactionDetail ? (
                transactionDetail.promo?.discount ? (
                  `${transactionDetail.promo.discount}%`
                ) : (
                  '-'
                )
              ) : (
                <Skeleton width={150} />
              )}
            </p>
          </div>

          <div className="border-b border-gray-200 pb-4 mb-4">
            <h2 className="text-xl font-semibold mb-2">Detail Keranjang</h2>
            {transactionDetail ? (
              transactionDetail.cartDetails.map((cartDetails, index) => {
                const finalPrice =
                  cartDetails.productPromoPrice || cartDetails.productPrice;
                return (
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
                        <strong>Nama Produk:</strong> {cartDetails.productName}
                      </p>
                      <p className="text-gray-600 mb-2">
                        <strong>Harga:</strong> {formatRupiah(finalPrice)}
                      </p>
                      <p className="text-gray-600 mb-2">
                        <strong>Kuantitas:</strong>{' '}
                        {cartDetails.productQuantity}
                      </p>
                      <p className="text-gray-600 mb-2">
                        <strong>Total Harga:</strong>{' '}
                        {formatRupiah(finalPrice * cartDetails.productQuantity)}
                      </p>
                    </div>
                  </div>
                );
              })
            ) : (
              <Skeleton count={3} />
            )}
          </div>
          <div className="mt-6 flex gap-4">
            {transactionDetail &&
              transactionDetail.status_payment === 'Pending' &&
              transactionDetail.shippingStatus === 'Pending' && (
                <button
                  className="no-print bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition duration-300"
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
                  className="no-print bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition duration-300"
                  onClick={handleConfirmOrder}
                >
                  Konfirmasi Penerima
                </button>
              )}

            {transactionDetail &&
              transactionDetail.shippingStatus === 'Accepted' && (
                <Link to="/products">
                  <button
                    className="no-print bg-yellow-500 text-white px-4 py-2 rounded-md hover:bg-yellow-600 transition duration-300"
                    onClick={() => console.log('Kasih Review')}
                  >
                    Kasih Review
                  </button>
                </Link>
              )}

            {transactionDetail &&
              transactionDetail.shippingStatus !== 'Pending' &&
              transactionDetail.shippingStatus !== 'Cancel' &&
              transactionDetail.shippingStatus !== 'On Process' && (
                <Link to="/order-tracking">
                  <button
                    className="no-print bg-green-500 text-white px-4 py-2 rounded-md hover:bg-yellow-600 transition duration-300"
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
                  className="no-print bg-yellow-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition duration-300"
                >
                  Bayar
                </button>
              )}
          </div>
        </div>
      </div>
      <PaymentModal
        isOpen={showPaymentPopup}
        onClose={() => setShowPaymentPopup(false)}
        paymentUrl={paymentUrl}
      />
    </div>
  );
};

export default DetailTransactionMe;
