import React, { useEffect, useState } from 'react';
import { getNotification } from '../../../../services/admin/notification/services-notification';

const statusClasses = {
  unread: 'bg-blue-50 border-blue-400 text-blue-800 hover:text-blue-900',
  read: 'bg-gray-100 border-gray-300 text-gray-800 hover:text-gray-800',
};

const NotificationSkeleton = () => (
  <div className="p-4 rounded-md shadow-md mb-4 flex flex-col md:flex-row justify-between items-center border-l-4 bg-gray-200 animate-pulse">
    <div className="flex-1 mb-4 md:mb-0">
      <div className="h-6 bg-gray-300 rounded w-3/4 mb-2"></div>
      <div className="h-4 bg-gray-300 rounded w-5/6 mb-2"></div>
      <div className="h-4 bg-gray-300 rounded w-1/4"></div>
    </div>
    <div className="h-8 w-24 bg-gray-300 rounded"></div>
  </div>
);

const NotificationsMe = () => {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const response = await getNotification();
        if (response.status && response.data) {
          setNotifications(response.data);
        }
      } catch (error) {
        console.error('Error fetching notifications:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchNotifications();
  }, []);

  const handleMarkAsRead = (id) => {
    setNotifications((prevNotifications) =>
      prevNotifications.map((notification) =>
        notification.notificationId === id
          ? { ...notification, isRead: true }
          : notification,
      ),
    );
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-6 mt-12">
      <h1 className="text-2xl md:text-3xl font-bold mb-6">Notifications</h1>
      {loading ? (
        <>
          <NotificationSkeleton />
          <NotificationSkeleton />
          <NotificationSkeleton />
        </>
      ) : notifications.length === 0 ? (
        <div className="text-center">
          <h2 className="text-xl md:text-2xl font-semibold text-gray-800 mb-4">
            No Notifications Available
          </h2>
          <p className="text-base md:text-base text-gray-600">
            There are no notifications to display at the moment. Please check
            back later.
          </p>
        </div>
      ) : (
        notifications.map((notification) => (
          <div
            key={notification.notificationId}
            className={`p-4 rounded-md shadow-md mb-4 flex flex-col md:flex-row justify-between items-start border-l-4 ${
              statusClasses[notification.isRead ? 'read' : 'unread']
            }`}
          >
            <div className="flex-1 mb-4 md:mb-0">
              <h2 className="text-lg md:text-lg font-semibold">
                {notification.title}
              </h2>
              <p className="text-base md:text-base text-gray-700">
                {notification.body}
              </p>
              <span className="text-sm md:text-sm text-gray-500">
                {new Date(notification.createdAt).toLocaleString()}
              </span>
            </div>
            <button
              className={`mt-2 md:mt-0 font-semibold ${statusClasses[
                notification.isRead ? 'read' : 'unread'
              ].replace('text-', 'hover:text-')}`}
              onClick={() => handleMarkAsRead(notification.notificationId)}
            >
              {notification.isRead ? 'Read Again' : 'Mark as Read'}
            </button>
          </div>
        ))
      )}
    </div>
  );
};

export default NotificationsMe;
