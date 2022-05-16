import { createContext, useState } from 'react';

export const NotificationsContext = createContext(null);

export const NotificationsContextWrapper = ({ children }) => {
  const [notifications, setNotifications] = useState([]);

  const colors = {
    Error: 'red',
    Success: 'green',
  };

  const setNotification = (type, message) => {
    const id = Math.random().toString(36).substring(2, 9);
    setNotifications((prev) => [
      ...prev,
      {
        id,
        type,
        message,
        color: colors[type],
      },
    ]);

    setTimeout(() => {
      deleteNotification(id);
    }, 4000);
  };

  const deleteNotification = (id) => {
    const filtered = notifications.filter((toast) => toast.id !== id);
    setNotifications(filtered);
  };

  return (
    <NotificationsContext.Provider
      value={{
        state: { notifications },
        actions: { setNotification, deleteNotification },
      }}
      children={children}
    />
  );
};
