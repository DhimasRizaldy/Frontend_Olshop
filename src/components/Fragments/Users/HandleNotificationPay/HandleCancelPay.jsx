import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { checkoutPaymentNotification } from '../../../../services/users/payment/servives-payment';

const HandleCancelPay = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    handleCancelPayment();
  }, []);

  const handleCancelPayment = async () => {
    const transactionId = localStorage.getItem('transactionId');

    if (!transactionId) {
      Swal.fire('Error!', 'ID Transaksi tidak ditemukan.', 'error');
      return;
    }

    const data = {
      transactionId,
      transaction_status: 'cancel',
      payment_type: '-',
    };

    try {
      setLoading(true);
      await checkoutPaymentNotification(data);

      // Tampilkan pesan sukses dan navigasi ke halaman /transaction-me
      Swal.fire(
        'Sukses!',
        'Status pembayaran berhasil diperbarui.',
        'success',
      ).then(() => {
        // Hapus transactionId dari localStorage
        localStorage.removeItem('transactionId');
        // Arahkan ke halaman /transaction-me
        navigate('/transaction-me');
      });
    } catch (error) {
      console.error('Error updating payment status:', error);
      // Tampilkan pesan sukses dan navigasi ke halaman /transaction-me meskipun terjadi error
      Swal.fire(
        'Sukses!',
        'Status pembayaran berhasil diperbarui.',
        'success',
      ).then(() => {
        // Hapus transactionId dari localStorage
        localStorage.removeItem('transactionId');
        // Arahkan ke halaman /transaction-me
        navigate('/transaction-me');
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-6 mt-12">
      <div className="bg-white shadow-md rounded-lg p-6 text-center">
        <h1 className="text-2xl font-bold text-red-600 mb-4">
          Pembayaran Dibatalkan
        </h1>
        <p className="text-gray-700 mb-6">
          Pembayaran Anda telah dibatalkan. Jika ini adalah kesalahan, silakan
          coba lagi.
        </p>
        <button
          onClick={handleCancelPayment}
          disabled={loading}
          className={`w-full md:w-auto px-6 py-3 bg-red-500 text-white font-semibold rounded-lg shadow-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-400 focus:ring-opacity-75 ${
            loading ? 'cursor-not-allowed' : ''
          }`}
        >
          {loading ? 'Memuat...' : 'Konfirmasi Pembatalan Pembayaran'}
        </button>
      </div>
    </div>
  );
};

export default HandleCancelPay;
