import React from 'react';

const Notification = ({ notification }) => {
  if (!notification) return null;

  return (
    <div className={`fixed top-4 right-4 z-50 px-6 py-3 rounded-lg shadow-lg ${
      notification.type === 'error' ? 'bg-red-500 text-white' : 'bg-green-500 text-white'
    }`}>
      {notification.message}
    </div>
  );
};

export default Notification;