import React from 'react';

// Contoh data notifikasi
const notifications = [
  {
    id: 1,
    type: 'unread',
    title: 'New Message from John Doe',
    message: 'You have a new message. Click here to read more...',
    timestamp: '2024-08-23 10:00 AM',
  },
  {
    id: 2,
    type: 'unread',
    title: 'Your Order #12345 has been shipped',
    message: 'Your order is on the way. Click here to track it...',
    timestamp: '2024-08-22 09:30 AM',
  },
  {
    id: 3,
    type: 'read',
    title: 'Discount Offer just for you!',
    message: 'Get 20% off on your next purchase. Valid until 2024-08-30.',
    timestamp: '2024-08-21 02:00 PM',
  },
  {
    id: 4,
    type: 'read',
    title: 'Profile Update Successful',
    message: 'Your profile information has been updated successfully.',
    timestamp: '2024-08-20 05:45 PM',
  },
];

const statusClasses = {
  unread: 'bg-blue-50 border-blue-400 text-blue-800 hover:text-blue-900',
  read: 'bg-gray-100 border-gray-300 text-gray-800 hover:text-gray-800',
};

const NotificationsMe = () => {
  return (
    <div className="max-w-6xl mx-auto px-4 py-6 mt-12">
      <h1 className="text-3xl font-bold mb-6">Notifications</h1>
      {notifications.map((notification) => (
        <div
          key={notification.id}
          className={`p-4 rounded-md shadow-md mb-4 flex justify-between items-center border-l-4 ${statusClasses[notification.type]}`}
        >
          <div>
            <h2 className="text-lg font-semibold">{notification.title}</h2>
            <p className="text-gray-700">{notification.message}</p>
            <span className="text-sm text-gray-500">
              {notification.timestamp}
            </span>
          </div>
          <button
            className={`font-semibold ${statusClasses[notification.type].replace('text-', 'hover:text-')}`}
          >
            {notification.type === 'unread' ? 'Mark as Read' : 'Read Again'}
          </button>
        </div>
      ))}
    </div>
  );
};

export default NotificationsMe;
