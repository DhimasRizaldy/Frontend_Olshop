import React, { useEffect, useState } from 'react';
import { getNotificationById } from '../../../../services/admin/notification/services-notification';

const DetailNotifications = () => {
  const [notification, setNotification] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNotification = async () => {
      try {
        const response = await getNotificationById(
          'e329a7a0-2dba-4d42-a522-04a7c8c7f308',
        );
        if (response.status) {
          setNotification(response.data);
        }
      } catch (error) {
        console.error('Error fetching notification:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchNotification();
  }, []);

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

  return (
    <div className="max-w-6xl mx-auto px-4 py-6 mt-12">
      <div className="bg-white shadow-md rounded-lg p-6">
        <h2 className="text-2xl font-bold mb-4">{notification.title}</h2>
        <p className="text-gray-700 mb-2">{notification.body}</p>
        <p className="text-gray-500 mb-4">{notification.description}</p>
        <div className="text-sm text-gray-400">
          <p>Created At: {new Date(notification.createdAt).toLocaleString()}</p>
          <p>Updated At: {new Date(notification.updatedAt).toLocaleString()}</p>
        </div>
        <a
          href={`https://putra-komputer.vercel.app/transaction-me/${notification.transactionId}`}
          className="mt-4 inline-block bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
        >
          View Transaction
        </a>
      </div>
    </div>
  );
};

export default DetailNotifications;
