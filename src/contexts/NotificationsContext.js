import { createContext, useState } from 'react';

export const NotificationsContext = createContext(null);

export const NotificationsContextWrapper = ({ children }) => {
  const [notificationState, setNotificationState] = useState({
    toasts: [],
  });

  const setNotification = (type, message, color) => {
    const id = Math.random().toString(36).substring(2, 9);
    const newToast = {
      toast: {
        type,
        message,
        id,
        color,
      },
    };

    setNotificationState({
      toasts: [...notificationState.toasts, newToast.toast],
    });

    setTimeout(() => {
      deleteNotification(id);
    }, 3000);
  };

  const deleteNotification = (id) => {
    const updatedToast = notificationState.toasts.filter((e) => e.id != id);
    setNotificationState(updatedToast.toast);
  };

  return (
    <NotificationsContext.Provider
      value={{
        state: { notificationState },
        actions: { setNotification, deleteNotification },
      }}
      children={children}
    />
  );
};
