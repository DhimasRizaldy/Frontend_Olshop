import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom'; // Untuk mendapatkan parameter rute dinamis
import { getNotificationById } from '../../../../services/admin/notification/services-notification';

const DetailNotifications = () => {
  const { notificationId } = useParams(); // Ekstrak notificationId dari URL
  const [notification, setNotification] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNotification = async () => {
      try {
        const response = await getNotificationById(notificationId); // Gunakan notificationId dinamis
        if (response.status === true) {
          setNotification(response.data);
        } else {
          console.error('Gagal mengambil notifikasi:', response.message);
        }
      } catch (error) {
        console.error('Terjadi kesalahan saat mengambil notifikasi:', error);
      } finally {
        setLoading(false);
      }
    };

    if (notificationId) {
      fetchNotification(); // Ambil hanya jika notificationId ada
    }
  }, [notificationId]); // Jalankan ulang jika notificationId berubah

  if (loading) {
    return (
      <div className="max-w-6xl mx-auto px-4 py-6 mt-12">
        <div className="bg-white shadow-md rounded-lg p-6 animate-pulse">
          <div className="h-6 bg-gray-300 rounded w-3/4 mb-4"></div>
          <div className="h-4 bg-gray-300 rounded w-5/6 mb-2"></div>
          <div className="h-4 bg-gray-300 rounded w-5/6 mb-2"></div>
          <div className="h-4 bg-gray-300 rounded w-1/4 mb-4"></div>
          <div className="h-4 bg-gray-300 rounded w-1/2 mb-2"></div>
          <div className="h-4 bg-gray-300 rounded w-1/2"></div>
        </div>
      </div>
    );
  }

  if (!notification) {
    return (
      <div className="max-w-6xl mx-auto px-4 py-6 mt-12">
        <div className="bg-white shadow-md rounded-lg p-6">
          <p className="text-gray-700">Notifikasi tidak ditemukan.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-6 mt-12">
      <div className="bg-white shadow-md rounded-lg p-6">
        <p className="text-gray-700 mb-2">{notification.body}</p>
        <p className="text-gray-500 mb-4">{notification.description}</p>
        <div className="text-sm text-gray-400">
          <p>
            Dibuat Pada: {new Date(notification.createdAt).toLocaleString()}
          </p>
          <p>
            Diperbarui Pada: {new Date(notification.updatedAt).toLocaleString()}
          </p>
        </div>
        {notification.transactionId && (
          <Link
            to={`/transaction-me/${notification.transactionId}`}
            className="mt-4 inline-block bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
            rel="noopener noreferrer"
          >
            Lihat Transaksi
          </Link>
        )}
      </div>
    </div>
  );
};

export default DetailNotifications;
